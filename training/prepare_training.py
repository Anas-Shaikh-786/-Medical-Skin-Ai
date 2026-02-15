import pandas as pd
from pathlib import Path

# ==========================================
# 1. SETUP PATHS
# ==========================================
# Define where your files are located and where to save the result.
METADATA_PATH = "data/metadata/Training_Metadata.csv"
GT_PATH = "data/metadata/Training_GroundTruth.csv"
OUTPUT_PATH = "data/metadata/merged_training.csv"

# ==========================================
# 2. LOAD DATA
# ==========================================
# Read the CSV files into pandas DataFrames
meta_df = pd.read_csv(METADATA_PATH)
gt_df = pd.read_csv(GT_PATH)

# ==========================================
# 3. PROCESS LABELS (One-Hot -> Categorical)
# ==========================================
# Identify the label columns.
# We assume every column is a disease label EXCEPT 'lesion_id'.
label_cols = [c for c in gt_df.columns if c != "lesion_id"]

# Convert One-Hot Encoding to a single 'diagnosis' column.
# .idxmax(axis=1) looks at each row and finds the column name with the highest value (1.0).
# Example: If a row has MEL=0, NV=1, BCC=0, this returns "NV".
gt_df["diagnosis"] = gt_df[label_cols].idxmax(axis=1)

# Keep only the essential columns: the ID to merge on, and the new label.
# We drop the old one-hot columns (MEL, NV, etc.) to keep the file clean.
gt_df = gt_df[["lesion_id", "diagnosis"]]

# ==========================================
# 4. MERGE DATASETS
# ==========================================
# Combine metadata and labels based on the matching 'lesion_id'.
# how="inner" ensures we only keep rows that exist in BOTH files.
# (This filters out images that might have metadata but no label, or vice versa).
merged_df = meta_df.merge(gt_df, on="lesion_id", how="inner")

# ==========================================
# 5. SAVE OUTPUT
# ==========================================
# Create the folder if it doesn't exist yet.
# parents=True creates any missing parent folders (e.g., creates 'data' AND 'metadata').
# exist_ok=True prevents an error if the folder is already there.
Path("data/metadata").mkdir(parents=True, exist_ok=True)

# Save to CSV without the pandas index numbers (0, 1, 2...)
merged_df.to_csv(OUTPUT_PATH, index=False)

# ==========================================
# 6. VERIFICATION
# ==========================================
print("Merged training data saved successfully.")
print(f"Total Rows: {len(merged_df)}")
print(f"Columns: {list(merged_df.columns)}")