
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image
import io
import os
import numpy as np
import cv2
from fastapi.middleware.cors import CORSMiddleware
from explainability.grad_cam import GradCam, overlay_cam

# Hugging Face
from huggingface_hub import hf_hub_download

# -----------------------------
# App setup
# -----------------------------

app = FastAPI(
    title="Medical Skin Lesion AI",
    description="AI-assisted skin lesion classification (research use only)",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


os.makedirs("temp", exist_ok=True)

# -----------------------------
# Constants
# -----------------------------
CLASS_NAMES = [
    "AKIEC", "BCC", "BEN_OTH", "BKL", "DF",
    "INF", "MAL_OTH", "MEL", "NV", "SCCKA", "VASC"
]
NUM_CLASSES = len(CLASS_NAMES)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# -----------------------------
# Model Loader (CRITICAL FIX)
# -----------------------------
def load_model():
    model = models.resnet18(weights=None)  # IMPORTANT
    model.fc = nn.Linear(model.fc.in_features, NUM_CLASSES)

    # Turn on when offline(model not on Hugging Face )
    # model.load_state_dict(
    #     torch.load("models/skin_model.pt", map_location=device)
    # )
    model_path = hf_hub_download(
        repo_id ="Anas-Shaikh-786/skin-lession-model",
        filename = 'skin_model.pt'
    )

    model.load_state_dict(
        torch.load(model_path , map_location=device)
    )

    model.to(device)
    model.eval()
    return model

model = load_model()

# -----------------------------
# Image Transform (must match training)
# -----------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def root():
    return {"status": "API is running"}

# -----------------------------
# Prediction Endpoint
# -----------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    input_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(input_tensor)
        probs = F.softmax(outputs, dim=1)
        conf, pred_idx = torch.max(probs, dim=1)

    return {
        "prediction": CLASS_NAMES[pred_idx.item()],
        "confidence": round(conf.item(), 4)
    }

# -----------------------------
# Grad-CAM Endpoint
# -----------------------------
@app.post("/gradcam")
async def gradcam(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    input_tensor = transform(image).unsqueeze(0).to(device)

    cam = GradCam(model, model.layer4)
    heatmap = cam.generate(input_tensor)

    image_np = np.array(image.resize((224, 224)))
    overlay = overlay_cam(image_np, heatmap.detach().cpu().numpy())

    output_path = "temp/gradcam_result.jpg"
    cv2.imwrite(output_path, cv2.cvtColor(overlay, cv2.COLOR_RGB2BGR))

    return FileResponse(output_path, media_type="image/jpeg")
