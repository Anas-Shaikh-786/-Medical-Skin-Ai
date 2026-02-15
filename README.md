# 🩺 Medical Skin Lesion AI

AI-assisted clinical decision support system for skin lesion classification with explainability.

## 📌 Overview

This project is an end-to-end deep learning system that classifies skin lesion images into multiple diagnostic categories using transfer learning. It includes:

- 🧠 Deep Learning model (ResNet18, fine-tuned)
- ⚖️ Class imbalance handling
- 🧬 Patient-wise data splitting (no leakage)
- 🔍 Grad-CAM explainability
- ⚡ FastAPI inference backend
- 🎨 React + Tailwind frontend
- 🛡️ Medical safety disclaimer & confidence visualization

> ⚠️ **This system is for research and educational purposes only and does NOT replace professional medical diagnosis.**

## 🏗️ Project Architecture

```
medical-skin-ai/
│
├── api/                # FastAPI backend
├── training/           # Model training scripts
├── explainability/     # Grad-CAM implementation
├── models/             # Saved model weights
├── data/               # Dataset & splits
├── frontend/           # React + Tailwind UI
└── README.md
```

## 🧠 Model Details

- **Backbone**: ResNet18 (Pretrained on ImageNet)
- **Transfer Learning**: Freeze early layers, fine-tune deeper layers
- **Loss Function**: CrossEntropyLoss with class weights
- **Optimization**: Adam optimizer
- **Learning Rate Scheduling**: Adaptive
- **Input Size**: 224×224
- **Explainability**: Grad-CAM on final convolutional block

## 🛑 Preventing Data Leakage

To ensure clinical validity:

- Dataset split is **patient-wise**
- Images from the same lesion **never appear in multiple splits**
- Avoids artificially inflated validation accuracy

## ⚖️ Handling Class Imbalance

Medical datasets are highly imbalanced. We applied:

- Class-weighted CrossEntropyLoss
- Recall-focused evaluation
- Confusion matrix analysis

This reduces the risk of missing malignant cases.

## 🔍 Explainability (Grad-CAM)

Grad-CAM highlights regions the model focuses on for its decision. This helps:

- Increase transparency
- Improve clinician trust
- Validate model attention on lesion areas

## 🚀 Backend (FastAPI)

### Features

- `/predict` endpoint
- `/gradcam` endpoint
- CORS-enabled for frontend communication
- Model loaded once at startup (efficient inference)

### Run Backend

```bash
conda activate medical-ai-setup
uvicorn api.main:app --reload
```

**Backend runs at**: `http://127.0.0.1:8000`  
**Swagger docs**: `http://127.0.0.1:8000/docs`

## 🎨 Frontend (React + Tailwind)

### Features

- Image upload & preview
- Prediction result
- Confidence percentage
- Risk color indicator
- Confidence progress bar
- Grad-CAM visualization
- Medical disclaimer

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

**Frontend runs at**: `http://localhost:5173`

## 🧪 Example Workflow

1. Upload skin lesion image
2. Model predicts diagnostic class
3. Confidence score displayed
4. Grad-CAM shows model attention
5. User sees medical disclaimer

## 📊 Sample Output

```
Prediction: MEL
Confidence: 87.42%
Grad-CAM heatmap highlighting lesion region
```

## 🛠️ Tech Stack

### Machine Learning
- Python
- PyTorch
- torchvision
- pandas
- scikit-learn

### Backend
- FastAPI
- Uvicorn

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

## 📈 Future Improvements

- Docker containerization
- Cloud deployment (AWS/GCP/Azure)
- Logging & audit trail
- Authentication layer
- Model monitoring
- Clinical evaluation metrics dashboard

## ⚠️ Disclaimer

**This system is intended for research and educational use only.** It is not a medical device and does not provide medical advice. Always consult a qualified healthcare professional.

## 👨‍💻 Author

Developed as a full end-to-end AI system demonstrating:

- Deep Learning
- Model explainability
- Backend API development
- Frontend integration
- Production-style ML architecture

## 🎉 Final Note

This project demonstrates the complete lifecycle of an AI system:

**data → training → validation → explainability → API → UI → deployment-ready architecture**

---

Made with ❤️ for advancing medical AI research
