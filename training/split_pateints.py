import pandas as pd
from sklearn.model_selection import train_test_split
from pathlib import Path

# Paths
METADATA_PATH = "data/metadata/Training_Metadata.csv"
OUTPUT_DIR = Path("data/splits")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Load metadata
df = pd.read_csv(METADATA_PATH)

# Unique patients
patients = df["lesion_id"].unique()

# Split patients
train_patients, temp_patients = train_test_split(
    patients, test_size=0.2, random_state=42
)

val_patients, test_patients = train_test_split(
    temp_patients, test_size=0.5, random_state=42
)

# Assign images based on lession == patient_id
train_df = df[df["lesion_id"].isin(train_patients)]
val_df   = df[df["lesion_id"].isin(val_patients)]
test_df  = df[df["lesion_id"].isin(test_patients)]

# Save splits
train_df.to_csv(OUTPUT_DIR / "train.csv", index=False)
val_df.to_csv(OUTPUT_DIR / "val.csv", index=False)
test_df.to_csv(OUTPUT_DIR / "test.csv", index=False)

print(" Patient-wise split completed")
print(f"Train patients: {len(train_patients)}")
print(f"Val patients  : {len(val_patients)}")
print(f"Test patients : {len(test_patients)}")
