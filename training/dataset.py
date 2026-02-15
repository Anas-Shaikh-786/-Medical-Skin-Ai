import os
import pandas as pd
from PIL import Image
from torch.utils.data import Dataset


class SkinDataset(Dataset):
    def __init__(self,csv_file,image_root,transform = None):
        """
        csv_file : path to train.csv / val.csv / test.csv
        image_root : root folder where images are stored
        """


        self.df =  pd.read_csv(csv_file)
        self.image_root = image_root
        self.transform = transform

        # self.image_paths = []
        # self.labels = []

        # self.classes = sorted(os.listdir(root_dir))
        # self.class_to_idx = {cls : i for i ,cls  in enumerate(self.classes)}


        # for cls in self.classes:
        #     cls_path = os.path.join(root_dir,cls)
        #     for img in os.listdir(cls_path):
        #         self.image_paths.append(os.path.join(cls_path,img))
        #         self.labels.append(self.class_to_idx[cls])


        # Label Mapping 
        self.classes = sorted(self.df['diagnosis'].unique())
        self.class_to_idx = {cls : idx for idx , cls in enumerate(self.classes)}

    def __len__(self):
        # return len(self.image_paths)
        return len(self.df)    
    
    def __getitem__(self ,idx):

        # image = Image.open(self.image_paths[idx]).convert('RGB')
        # label = self.labels[idx]

        # if self.transform:
        #     image = self.transform(image)


        row = self.df.iloc[idx]

        image_id = row["isic_id"]
        label_name = row["diagnosis"]
        label = self.class_to_idx[label_name]

       #image path (ISIC images are JPG.)
        image_path = os.path.join(self.image_root,f"{image_id}.jpg")
        image = Image.open(image_path).convert('RGB')
        
        if self.transform:
            image = self.transform(image)

        return image,label
    

if __name__ == "__main__":
    from torchvision import transforms
    from  torch.utils.data import DataLoader


    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    ds = SkinDataset(csv_file = "data/splits/train.csv",
                     image_root="data/raw",
                    transform=transform)
    
    loader = DataLoader(
        ds,
        batch_size = 2,
        shuffle = True
    )

    images,labels = next(iter(loader))
    print(images.shape)
    print(labels)
