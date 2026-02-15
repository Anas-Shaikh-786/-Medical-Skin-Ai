import cv2
import numpy as np
import torch
import torch.nn.functional as F

class GradCam:
    def __init__(self,model,target_layer):
        self.model = model
        self.target_layer = target_layer


        self.activations = None
        self.gradients = None

        self._register_hooks()


    def _register_hooks(self):
        def forward_hook(model, input ,output):
            self.activations = output

        def backward_hook(model,grad_input,grad_output):
            self.gradients = grad_output[0]

        self.target_layer.register_forward_hook(forward_hook)
        self.target_layer.register_full_backward_hook(backward_hook)

    
    def generate(self,input_tensor,class_idx = None):
        #Forward Pass
        output = self.model(input_tensor)

        #If class not Specified use Predicted class
        if class_idx is None:
            class_idx = output.argmax(dim=1).item()

        #Backward Pass for the target class
        self.model.zero_grad()
        output[0 , class_idx].backward()

        #Gradients
        gradients = self.gradients[0]

        #Activation 
        activations = self.activations[0]

        # Global average Pooling of Gradients
        weights = gradients.mean(dim=(1,2))

        # weighted sum of Activation

        cam = torch.zeros(activations.shape[1:],device = activations.device)
        for i,w in enumerate(weights):
            cam+=w*activations[i]

        
        # Apply Relu (only positive influence)
        cam = torch.relu(cam)

        #Normalize to [0,1]
        cam-= cam.min()
        cam/= cam.max() + 1e-8

        return cam

def overlay_cam(image,cam,alpha = 0.4):
        """
        image : Original image as numpy array (H,W,3)
        cam : Grad-CAM heatmap (H,W) in [0,1]
        """

        # Resize cam to image size
        cam = cv2.resize(cam, (image.shape[1],image.shape[0]))

        #Convert to heatmap
        heatmap = cv2.applyColorMap(
            np.uint8(255*cam),cv2.COLORMAP_JET
        )

        #Convert BGR to RGB
        heatmap = cv2.cvtColor(heatmap,cv2.COLOR_BGR2RGB)

        #Overlay
        overlay = np.uint8(alpha * heatmap + (1 - alpha)*image)

        return overlay