# For Googel Collab

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import models, transforms
from dataset import SkinDataset
import pandas as pd
import numpy as np
from sklearn.metrics import classification_report, f1_score, recall_score
import copy

def main():
    # =====================
    # 1. Configuration
    # =====================
    DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    BATCH_SIZE = 32
    NUM_WORKERS = 4  # Increased for faster data loading
    LEARNING_RATE = 1e-4
    EPOCHS = 30      # Increased epochs, Early Stopping will handle the rest
    
    print(f"Running on device: {DEVICE}")

    # =====================
    # 2. Data Augmentation
    # =====================
    # specific to skin lesions: rotation/flips are safe; color jitter mimics lighting diffs
    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomVerticalFlip(),      # Lesions have no "up" or "down"
        transforms.RandomRotation(20),        # Rotation invariance
        transforms.ColorJitter(brightness=0.1, contrast=0.1, saturation=0.1),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    # =====================
    # 3. Datasets & Loaders
    # =====================
    train_dataset = SkinDataset(csv_file="data/splits/train.csv", image_root="data/raw", transform=train_transform)
    val_dataset = SkinDataset(csv_file="data/splits/val.csv", image_root="data/raw", transform=val_transform)

    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=NUM_WORKERS)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=NUM_WORKERS)

    print(f"Train samples: {len(train_dataset)} | Val samples: {len(val_dataset)}")

    # =====================
    # 4. Class Weights (Crucial for Medical Imbalance)
    # =====================
    train_df = pd.read_csv("data/splits/train.csv")
    class_counts = train_df["diagnosis"].value_counts().sort_index()
    
    # Calculate weights: Total / (Num_Classes * Count) is standard balanced weighting
    n_samples = class_counts.sum()
    n_classes = len(class_counts)
    class_weights = n_samples / (n_classes * class_counts)
    
    # Convert to tensor
    class_weights_tensor = torch.tensor(class_weights.values, dtype=torch.float).to(DEVICE)
    print("Class Weights calculated:", class_weights_tensor)

    # =====================
    # 5. Model (ResNet50)
    # =====================
    # ResNet50 is deeper and often better for fine-grained medical textures than ResNet18
    model = models.resnet50(pretrained=True)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, n_classes)

    model = model.to(DEVICE)

    # =====================
    # 6. Loss, Optimizer, Scheduler
    # =====================
    criterion = nn.CrossEntropyLoss(weight=class_weights_tensor)
    
    # AdamW usually generalizes better than standard Adam
    optimizer = optim.AdamW(model.parameters(), lr=LEARNING_RATE, weight_decay=1e-4)
    
    # Reduce LR when validation metric stops improving (Dynamic adaptation)
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode='max', factor=0.1, patience=3, verbose=True
    )

    # =====================
    # 7. Training Loop with Early Stopping
    # =====================
    best_recall = 0.0
    best_model_wts = copy.deepcopy(model.state_dict())
    patience = 7
    trigger_times = 0

    for epoch in range(EPOCHS):
        print(f"\nEpoch {epoch+1}/{EPOCHS}")
        
        # --- TRAIN ---
        model.train()
        train_loss = 0.0
        
        for images, labels in train_loader:
            images, labels = images.to(DEVICE), labels.to(DEVICE)
            
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            
        avg_train_loss = train_loss / len(train_loader)

        # --- VALIDATE ---
        model.eval()
        val_loss = 0.0
        all_preds = []
        all_labels = []

        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(DEVICE), labels.to(DEVICE)
                outputs = model(images)
                loss = criterion(outputs, labels)
                val_loss += loss.item()
                
                _, preds = torch.max(outputs, 1)
                all_preds.extend(preds.cpu().numpy())
                all_labels.extend(labels.cpu().numpy())

        avg_val_loss = val_loss / len(val_loader)
        
        # Calculate Medical Metrics
        # weighted recall handles class imbalance in the score calculation
        val_recall = recall_score(all_labels, all_preds, average='weighted')
        val_f1 = f1_score(all_labels, all_preds, average='weighted')
        
        print(f"Train Loss: {avg_train_loss:.4f} | Val Loss: {avg_val_loss:.4f}")
        print(f"Val Recall: {val_recall:.4f}     | Val F1: {val_f1:.4f}")

        # Scheduler Step (Monitor Recall instead of Loss)
        scheduler.step(val_recall)

        # --- CHECKPOINTING (Focus on Recall) ---
        if val_recall > best_recall:
            print(f"--> Recall Improved ({best_recall:.4f} -> {val_recall:.4f}). Saving model.")
            best_recall = val_recall
            best_model_wts = copy.deepcopy(model.state_dict())
            torch.save(model.state_dict(), "best_skin_model.pt")
            trigger_times = 0
        else:
            trigger_times += 1
            print(f"--> No improvement for {trigger_times} epochs.")
            if trigger_times >= patience:
                print("Early stopping triggered.")
                break

    # =====================
    # 8. Final Evaluation
    # =====================
    print("\nLoading Best Model for Final Report...")
    model.load_state_dict(best_model_wts)
    model.eval()
    
    final_preds = []
    final_targets = []
    
    with torch.no_grad():
        for images, labels in val_loader:
            images = images.to(DEVICE)
            outputs = model(images)
            _, preds = torch.max(outputs, 1)
            final_preds.extend(preds.cpu().numpy())
            final_targets.extend(labels.numpy())

    print("\nFinal Classification Report:")
    # This report shows Precision, Recall, and F1 for EVERY class individually
    print(classification_report(final_targets, final_preds, target_names=[f"Class {i}" for i in range(n_classes)]))

if __name__ == "__main__":
    main()