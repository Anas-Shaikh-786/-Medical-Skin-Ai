import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import models, transforms
from dataset import SkinDataset
import pandas as pd
import torch

def main():
    

    # ----- Data -----
    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    val_transform = transforms.Compose([
        transforms.Resize((224,224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])
    # Different CSVs → different Datasets → different DataLoaders → no leakage.
    train_dataset = SkinDataset(csv_file="data/splits/train.csv",image_root="data/raw", transform=train_transform)
    val_dataset = SkinDataset(csv_file="data/splits/val.csv", image_root="data/raw",transform=val_transform)

    train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True,num_workers=2)
    val_loader = DataLoader(val_dataset, batch_size=16, shuffle=False,num_workers=2)

    print("Train samples:", len(train_dataset))
    print("Val samples  :", len(val_dataset))

    # ----Compute Class Weight----
    train_df = pd.read_csv("data/splits/train.csv")


    #Counts samples per class
    class_counts = train_df["diagnosis"].value_counts().sort_index()
    print("Class counts:\n",class_counts)


    #Inverse frequency weighting
    total_samples = class_counts.sum()
    class_weights = total_samples /class_counts

    # ----- Model -----

    model = models.resnet18(pretrained = True)
    num_classes = len(class_weights)
    model.fc = nn.Linear(model.fc.in_features, num_classes)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    #Convert to torch tensor
    class_weights = torch.tensor(
        class_weights.values,
        dtype = torch.float
    ).to(device)

    model = model.to(device)

    print("Class Weights :", class_weights)


    # ----- Loss & Optimizer -----
    criterion = nn.CrossEntropyLoss(weight = class_weights)
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)

    # ----- Epoch loop -----
    epochs = 3
   

    for epoch in range(epochs):
        print(f"\nEpoch {epoch+1}/{epochs}")

        # ===== TRAINING =====
        model.train()
        train_loss = 0.0

        for images, labels in train_loader:
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            train_loss += loss.item()

        avg_train_loss = train_loss / len(train_loader)

        # ===== VALIDATION =====
        model.eval()
        val_loss = 0.0
        correct = 0
        total = 0
        with torch.no_grad():
            for images, labels in val_loader:
                images = images.to(device)
                labels = labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                val_loss += loss.item()

                preds = outputs.argmax(dim =1 )
                correct +=(preds == labels).sum().item()
                total+=labels.size(0)

        avg_val_loss = val_loss / len(val_loader)
        val_accuracy = correct / total


        print(f"Train Loss: {avg_train_loss:.4f}")
        print(f"Val   Loss: {avg_val_loss:.4f}")
        print(f"Val   Acc: {val_accuracy:.4f}")




    num_classes = len(class_weights)
    conf_matrix = torch.zeros(num_classes,num_classes,dtype=torch.int64)

    with torch.no_grad():
        for images,labels in val_loader:
            outputs = model(images)
            preds = outputs.argmax(dim = 1)


            for t,p in zip(labels,preds):
                conf_matrix[t,p]+=1

    print("COnfusion Matrix")
    print(conf_matrix)

    torch.save(model.state_dict(), "models/skin_model.pt")
    print("Final model saved to models/skin_model.pt")


if __name__ == "__main__":
    main()