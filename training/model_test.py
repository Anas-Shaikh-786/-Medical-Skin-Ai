import torch
import torch.nn as nn
from  torchvision import transforms
from torchvision import models
from torch.utils.data import DataLoader
from dataset import SkinDataset

# 1. Load a Pretrined ResNet
model = models.resnet18(pretrained = True)

#2. Replace the Final Classifier
num_features =  model.fc.in_features # 512
model.fc = nn.Linear(num_features , 3) # 3 medical Classes

#3 Put the model to eval mode
model.eval()


transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean = [0.485,0.456,0.406],
        std = [0.229,0.224,0.225]
    )
])

ds = SkinDataset("data/raw",transform=transform)
loader = DataLoader(ds,batch_size = 2, shuffle = False)

images,labels = next(iter(loader))

# 4. Forward Pass
with torch.no_grad():
    outputs = model(images)

print("Input Shape :" , images.shape )
print("Output Shape : ",outputs.shape)
print(outputs)

