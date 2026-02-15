import torch
import cv2
from torchvision import models, transforms
import numpy as np
from PIL import Image



from grad_cam import GradCam,overlay_cam

model = models.resnet18(pretrained = True)
model.fc = torch.nn.Linear(model.fc.in_features,3)
model.eval()

target_layer = model.layer4
cam = GradCam(model,target_layer)

image_path = "data/raw/ISIC_0051817.jpg"
image = Image.open(image_path).convert("RGB")


transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

input_tensor = transform(image).unsqueeze(0)

heatmap = cam.generate(input_tensor)

image_np = np.array(image.resize((224,224)))
overlay = overlay_cam(image_np,heatmap.detach().cpu().numpy())

cv2.imwrite("gradcam_result.jpg", cv2.cvtColor(overlay, cv2.COLOR_RGB2BGR))
print("Grad-CAM saved as gradcam_result.jpg")