import torch
from PIL import Image
from torchvision import transforms

# 1. Load an Image (Any Image from Computer)
image_path = "sample.png" # Put a sample image in this folder
image = Image.open(image_path).convert("RGB")

# 2. Define a simple transform
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean = [0.485,0.456,0.406],
        std = [0.229,0.224,0.225]
    )
    ])

# 3. Convert  image to tensor
image_tensor = transform(image)

# 4. Print Details
print("Tensor type : ", type(image_tensor))
print("Tensor Shape : ",image_tensor.shape)
print("Min value :" , image_tensor.min().item())
print("Max value :" , image_tensor.max().item())