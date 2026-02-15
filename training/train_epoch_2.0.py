"""
Skin Disease Classification — v3  (imbalance-fixed)
=====================================================
What changed vs v2 and why:

  1. WeightedRandomSampler          → every batch sees all classes roughly equally.
                                       This is the single biggest fix.  Focal Loss
                                       alone cannot recover when the loader never
                                       shows rare classes.

  2. Full fine-tune (all layers)    → 11 classes, some with < 10 samples.
                                       Freezing most of the network starves rare
                                       classes of gradient signal.  We keep layer-wise
                                       LR so early layers still move slowly.

  3. Focal gamma 3.0                → pushes harder on the hardest samples.

  4. Longer training + patience 10  → rare classes need more epochs to converge.

  5. Per-class threshold tuning     → after training, we sweep the decision
                                       threshold per class on the val set to
                                       maximise macro-recall.  Default argmax
                                       almost always biases toward frequent classes.

Deps:  torch >= 2.0  |  torchvision >= 0.13  |  scikit-learn  |  seaborn  |  matplotlib
"""

import random
import warnings
from contextlib import nullcontext

import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader, WeightedRandomSampler
from torchvision import models, transforms
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

from dataset import SkinDataset

warnings.filterwarnings("ignore")

# ─────────────────────────────────────────────
# AMP guard
# ─────────────────────────────────────────────
USE_AMP = torch.cuda.is_available()
if USE_AMP:
    from torch.amp import autocast, GradScaler

# ─────────────────────────────────────────────
# Seed
# ─────────────────────────────────────────────
SEED = 42


def set_seed(seed: int):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark     = False


# ─────────────────────────────────────────────
# Focal Loss
# ─────────────────────────────────────────────
class FocalLoss(nn.Module):
    def __init__(self, alpha: torch.Tensor, gamma: float = 3.0):
        super().__init__()
        self.alpha = alpha          # (C,)
        self.gamma = gamma

    def forward(self, logits, targets):
        ce     = F.cross_entropy(logits, targets, reduction="none")
        p_t    = torch.exp(-ce)
        alpha_t = self.alpha[targets]
        return (alpha_t * (1.0 - p_t) ** self.gamma * ce).mean()


# ─────────────────────────────────────────────
# WeightedRandomSampler builder
# ─────────────────────────────────────────────
def encode_labels(labels_raw: np.ndarray):
    """
    String labels  →  sorted alphabetical int encoding.
    Returns (labels_int, sorted_class_names).

    Sorting alphabetically is the default behaviour of sklearn's
    LabelEncoder — this keeps us in sync with whatever your
    SkinDataset does internally.
    """
    sorted_names = sorted(set(labels_raw))                       # e.g. ["AKIEC","BCC",...]
    name_to_int  = {name: i for i, name in enumerate(sorted_names)}
    labels_int   = np.array([name_to_int[l] for l in labels_raw], dtype=np.int64)
    return labels_int, sorted_names


def build_sampler(labels_int: np.ndarray) -> WeightedRandomSampler:
    """
    Each sample gets weight = 1 / count_of_its_class.
    Result: every class contributes equally per epoch on average.
    labels_int must already be integer-encoded (use encode_labels first).
    """
    class_counts   = np.bincount(labels_int)                     # (C,)
    class_weights  = 1.0 / class_counts.astype(float)           # (C,)
    sample_weights = class_weights[labels_int]                   # (N,)
    return WeightedRandomSampler(
        weights=sample_weights.tolist(),
        num_samples=len(labels_int),
        replacement=True,                                        # allow repeats of rare classes
    )


# ─────────────────────────────────────────────
# Layer-wise LR  –  now covers ALL layers
# ─────────────────────────────────────────────
def get_lr_groups(model: nn.Module, base_lr: float, decay: float = 0.75):
    """
    EfficientNet-B2 features.0 … features.8  +  classifier.
    Everything is trainable; early layers just get a lower LR.
    """
    tiers = [
        (range(0, 2), decay ** 4),
        (range(2, 4), decay ** 3),
        (range(4, 6), decay ** 2),
        (range(6, 8), decay ** 1),
        (range(8, 9), 1.0),          # last feature block – same as head
    ]
    groups = []
    for idx_range, factor in tiers:
        params = [
            p for n, p in model.named_parameters()
            if any(n.startswith(f"features.{i}") for i in idx_range)
        ]
        if params:
            groups.append({"params": params, "lr": base_lr * factor})

    head = [p for n, p in model.named_parameters() if "classifier" in n]
    if head:
        groups.append({"params": head, "lr": base_lr})
    return groups


# ─────────────────────────────────────────────
# Early Stopping
# ─────────────────────────────────────────────
class EarlyStopping:
    def __init__(self, patience: int = 10):
        self.patience    = patience
        self.counter     = 0
        self.best_score  = -1.0
        self.should_stop = False

    def __call__(self, score: float) -> bool:
        if score <= self.best_score:
            self.counter += 1
            print(f"  [EarlyStopping] no improvement → {self.counter}/{self.patience}")
            if self.counter >= self.patience:
                self.should_stop = True
        else:
            self.best_score = score
            self.counter    = 0
        return self.should_stop


# ─────────────────────────────────────────────
# Per-class threshold tuning
#   After training, the default decision rule is
#   argmax(logits).  But argmax is biased toward
#   classes whose logits are naturally higher (i.e.
#   frequent classes).
#
#   We sweep a per-class bias offset on the val
#   set, choosing the offsets that maximise macro-
#   recall.  These offsets are saved and used at
#   inference time.
# ─────────────────────────────────────────────
def tune_thresholds(model, loader, device, num_classes: int) -> torch.Tensor:
    """
    Returns a (C,) tensor of per-class bias offsets.
    At inference: adjusted_logits = logits + offsets  →  argmax(adjusted_logits)
    """
    model.eval()
    all_logits, all_labels = [], []
    with torch.no_grad():
        for images, labels in loader:
            images = images.to(device)
            ctx = autocast("cuda") if USE_AMP else nullcontext()
            with ctx:
                logits = model(images)
            all_logits.append(logits.cpu())
            all_labels.append(labels)

    all_logits = torch.cat(all_logits)          # (N, C)
    all_labels = torch.cat(all_labels).numpy()  # (N,)

    # search range for each class bias
    search = np.linspace(-3.0, 3.0, 61)         # 61 steps, step ≈ 0.1

    best_offsets = torch.zeros(num_classes)
    # greedy coordinate-wise sweep – fast and effective
    for _ in range(3):                          # 3 passes to let interactions settle
        for c in range(num_classes):
            best_recall = -1.0
            best_val    = 0.0
            for v in search:
                trial = best_offsets.clone()
                trial[c] = v
                preds = (all_logits + trial.unsqueeze(0)).argmax(dim=1).numpy()
                # macro recall
                recalls = []
                for k in range(num_classes):
                    mask = all_labels == k
                    if mask.sum() == 0:
                        continue
                    recalls.append((preds[mask] == k).mean())
                macro_r = np.mean(recalls)
                if macro_r > best_recall:
                    best_recall = macro_r
                    best_val    = v
            best_offsets[c] = best_val

    print(f"  Tuned per-class offsets : {best_offsets.round(decimals=2).tolist()}")
    return best_offsets


# ─────────────────────────────────────────────
# Evaluation  –  optionally applies threshold
#   offsets
# ─────────────────────────────────────────────
def evaluate(model, loader, device, class_names, offsets: torch.Tensor = None):
    model.eval()
    all_preds, all_labels = [], []

    with torch.no_grad():
        for images, labels in loader:
            images = images.to(device)
            ctx = autocast("cuda") if USE_AMP else nullcontext()
            with ctx:
                logits = model(images)
            logits = logits.cpu()
            if offsets is not None:
                logits = logits + offsets.unsqueeze(0)
            all_preds.append(logits.argmax(1))
            all_labels.append(labels)

    all_preds  = torch.cat(all_preds).numpy()
    all_labels = torch.cat(all_labels).numpy()

    report_str  = classification_report(all_labels, all_preds, target_names=class_names, digits=4)
    report_dict = classification_report(all_labels, all_preds, target_names=class_names, output_dict=True)

    return {
        "preds":           all_preds,
        "labels":          all_labels,
        "report_str":      report_str,
        "macro_precision": report_dict["macro avg"]["precision"],
        "macro_recall":    report_dict["macro avg"]["recall"],
        "macro_f1":        report_dict["macro avg"]["f1-score"],
    }


# ─────────────────────────────────────────────
# Confusion-matrix heatmap
# ─────────────────────────────────────────────
def save_confusion_matrix(y_true, y_pred, class_names, path="confusion_matrix.png"):
    cm      = confusion_matrix(y_true, y_pred)
    cm_norm = np.round(cm.astype("float") / cm.sum(axis=1, keepdims=True), 2)

    fig, axes = plt.subplots(1, 2, figsize=(20, 8))

    # ── raw counts ──
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
                xticklabels=class_names, yticklabels=class_names,
                linewidths=0.5, ax=axes[0])
    axes[0].set_title("Raw Counts", fontsize=14, fontweight="bold")
    axes[0].set_xlabel("Predicted")
    axes[0].set_ylabel("Actual")

    # ── normalised (rows = recall) ──
    sns.heatmap(cm_norm, annot=True, fmt=".2f", cmap="YlOrRd",
                xticklabels=class_names, yticklabels=class_names,
                linewidths=0.5,
                cbar_kws={"label": "Normalised (row = Recall)"},
                ax=axes[1])
    axes[1].set_title("Normalised (Recall per class)", fontsize=14, fontweight="bold")
    axes[1].set_xlabel("Predicted")
    axes[1].set_ylabel("Actual")

    for ax in axes:
        ax.set_xticklabels(ax.get_xticklabels(), rotation=30, ha="right")

    plt.tight_layout()
    plt.savefig(path, dpi=150)
    plt.close()
    print(f"  Confusion matrix saved → {path}")


# ─────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────
def main():
    set_seed(SEED)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Device : {device}   |   AMP : {USE_AMP}")

    # ── hypers ──────────────────────────────
    BATCH_SIZE  = 32
    EPOCHS      = 40                 # more room for rare classes
    BASE_LR     = 2e-4
    LR_DECAY    = 0.75               # steeper decay across tiers
    FOCAL_GAMMA = 3.0                # harder focus on difficult samples
    PATIENCE    = 10

    NUM_WORKERS = 0

    # ── transforms ──────────────────────────
    train_transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.RandomResizedCrop(224, scale=(0.75, 1.0)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomVerticalFlip(),
        transforms.RandomRotation(degrees=40),
        transforms.ColorJitter(brightness=0.25, contrast=0.25, saturation=0.25, hue=0.12),
        transforms.RandAugment(num_ops=2, magnitude=10),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    # ── datasets ────────────────────────────
    train_dataset = SkinDataset(csv_file="data/splits/train.csv", image_root="data/raw", transform=train_transform)
    val_dataset   = SkinDataset(csv_file="data/splits/val.csv",   image_root="data/raw", transform=val_transform)

    # ── sampler  ← KEY FIX ─────────────────
    # CSV has string labels ("AKIEC", "BCC", …).
    # Encode them to ints in sorted order — matches LabelEncoder default
    # that most SkinDataset implementations use internally.
    train_df     = pd.read_csv("data/splits/train.csv")
    labels_int, class_names = encode_labels(train_df["diagnosis"].values)
    num_classes  = len(class_names)

    sampler = build_sampler(labels_int)

    # shuffle=False when using a sampler (they are mutually exclusive)
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE,
                              sampler=sampler, num_workers=NUM_WORKERS, pin_memory=USE_AMP)
    val_loader   = DataLoader(val_dataset,   batch_size=BATCH_SIZE,
                              shuffle=False,  num_workers=NUM_WORKERS, pin_memory=USE_AMP)

    print(f"Train : {len(train_dataset)}   Val : {len(val_dataset)}")

    # ── class info ──────────────────────────
    # Derive counts from the already-encoded int labels so the order
    # is guaranteed to match class_names (index 0 = first sorted name, etc.)
    class_counts = np.bincount(labels_int)                       # (C,) in sorted order

    print("\nClass distribution (train):")
    for name, cnt in zip(class_names, class_counts):
        print(f"    {name:>10s}  →  {cnt:>5d}")

    # Normalised inverse-freq weights for Focal Loss
    total_samples = class_counts.sum()
    raw_w         = total_samples / (num_classes * class_counts.astype(float))
    class_weights = torch.tensor(raw_w, dtype=torch.float32).to(device)
    print(f"\nFocal alpha : {class_weights.cpu().round(decimals=2).tolist()}")

    # ── model  ──────────────────────────────
    model = models.efficientnet_b2(weights="IMAGENET1K_V1")
    model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, num_classes)

    # ── UNFREEZE EVERYTHING  ────────────────
    # Layer-wise LR keeps early layers moving slowly;
    # freezing them starved rare classes last time.
    for p in model.parameters():
        p.requires_grad = True

    model = model.to(device)

    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total     = sum(p.numel() for p in model.parameters())
    print(f"Trainable : {trainable:,} / {total:,}  ({100*trainable/total:.1f}%)")

    # ── loss ────────────────────────────────
    criterion = FocalLoss(alpha=class_weights, gamma=FOCAL_GAMMA)

    # ── optimiser ───────────────────────────
    param_groups = get_lr_groups(model, base_lr=BASE_LR, decay=LR_DECAY)
    optimizer    = torch.optim.AdamW(param_groups, weight_decay=1e-4)

    # ── scheduler ───────────────────────────
    scheduler = torch.optim.lr_scheduler.OneCycleLR(
        optimizer,
        max_lr=[g["lr"] for g in param_groups],
        epochs=EPOCHS,
        steps_per_epoch=len(train_loader),
        pct_start=0.1,
        anneal_strategy="cos",
    )

    # ── AMP scaler ──────────────────────────
    scaler = GradScaler("cuda") if USE_AMP else None

    # ── early stop ──────────────────────────
    early_stop = EarlyStopping(patience=PATIENCE)
    best_f1    = -1.0

    # ── training loop ───────────────────────
    for epoch in range(1, EPOCHS + 1):
        print(f"\n{'='*55}\n  Epoch {epoch}/{EPOCHS}\n{'='*55}")

        model.train()
        train_loss, train_correct, train_total = 0.0, 0, 0

        for images, labels in train_loader:
            images = images.to(device)
            labels = labels.to(device)
            optimizer.zero_grad(set_to_none=True)

            if USE_AMP:
                with autocast("cuda"):
                    outputs = model(images)
                    loss    = criterion(outputs, labels)
                scaler.scale(loss).backward()
                scaler.unscale_(optimizer)
                torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
                scaler.step(optimizer)
                scaler.update()
            else:
                outputs = model(images)
                loss    = criterion(outputs, labels)
                loss.backward()
                torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
                optimizer.step()

            scheduler.step()

            train_loss    += loss.item()
            train_correct += (outputs.argmax(1) == labels).sum().item()
            train_total   += labels.size(0)

        # ── val loss ────────────────────────
        model.eval()
        val_loss = 0.0
        with torch.no_grad():
            for images, labels in val_loader:
                images = images.to(device)
                labels = labels.to(device)
                ctx = autocast("cuda") if USE_AMP else nullcontext()
                with ctx:
                    outputs = model(images)
                    loss    = criterion(outputs, labels)
                val_loss += loss.item()

        # ── metrics (no threshold offsets yet – that's a post-training step) ──
        metrics = evaluate(model, val_loader, device, class_names)

        print(f"\n  Train Loss : {train_loss/len(train_loader):.4f}   "
              f"Train Acc  : {train_correct/train_total:.4f}")
        print(f"  Val   Loss : {val_loss/len(val_loader):.4f}")
        print(f"  Macro Precision : {metrics['macro_precision']:.4f}")
        print(f"  Macro Recall    : {metrics['macro_recall']:.4f}")
        print(f"  Macro F1        : {metrics['macro_f1']:.4f}")
        print(f"\n{metrics['report_str']}")

        # ── checkpoint on best macro-F1 ─────
        if metrics["macro_f1"] > best_f1:
            best_f1 = metrics["macro_f1"]
            torch.save(model.state_dict(), "skin_model_best.pt")
            print("  ★ Best model saved  →  skin_model_best.pt")

        if early_stop(metrics["macro_f1"]):
            print(f"\n  Early stopping at epoch {epoch}.")
            break

    # ─────────────────────────────────────────
    # Post-training: load best, tune thresholds,
    # then do the FINAL eval
    # ─────────────────────────────────────────
    print("\n" + "=" * 55)
    print("  POST-TRAINING: threshold tuning")
    print("=" * 55)

    model.load_state_dict(torch.load("skin_model_best.pt", map_location=device))

    offsets = tune_thresholds(model, val_loader, device, num_classes)

    # save offsets so inference scripts can reuse them
    torch.save(offsets, "class_offsets.pt")
    print("  Offsets saved  →  class_offsets.pt")

    # ─────────────────────────────────────────
    # FINAL evaluation  –  WITH tuned offsets
    # ─────────────────────────────────────────
    print("\n" + "=" * 55)
    print("  FINAL EVALUATION  (best checkpoint + tuned thresholds)")
    print("=" * 55)

    # --- without offsets (baseline) ---
    print("\n  ── Without threshold tuning ──")
    base = evaluate(model, val_loader, device, class_names, offsets=None)
    print(base["report_str"])

    # --- with offsets (tuned) ---
    print("  ── With threshold tuning ──")
    tuned = evaluate(model, val_loader, device, class_names, offsets=offsets)
    print(tuned["report_str"])

    # save the tuned confusion matrix
    save_confusion_matrix(tuned["labels"], tuned["preds"], class_names,
                          path="confusion_matrix.png")

    # also save baseline confusion matrix for comparison
    save_confusion_matrix(base["labels"], base["preds"], class_names,
                          path="confusion_matrix_baseline.png")

    torch.save(model.state_dict(), "skin_model_last.pt")
    print("Last-epoch weights saved  →  skin_model_last.pt")


if __name__ == "__main__":
    main()