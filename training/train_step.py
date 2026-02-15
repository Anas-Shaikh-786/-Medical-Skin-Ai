import torch
import torch.nn as nn
from  torchvision import models,transforms
from torch.utils.data import DataLoader
from dataset import SkinDataset

#---Model---
model = models.resnet(pretrained = True)
model.fc = nn.Linear(model.fc.in_features ,3)
model.train()


#----Data---
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485,0.456,0.406],
        std = [0.229,0.224,0.225]
    )
])

dataset = SkinDataset("data/raw",transform=transform)
loader = DataLoader(dataset,batch_size=2,shuffle=True)

images , labels = next(iter(loader))

#---Loss & Optimizer---
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(),lr = 1e-4)

# Training Steup
optimizer.zero_grad()
outputs = model(images)
loss = criterion(outputs,labels),
loss.backward()
optimizer.step()

print("Loss ",loss.item())