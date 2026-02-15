import pandas as pd
from sklearn.model_selection import train_test_split
from pathlib import Path

# ==========================================
# 1. SETUP & LOAD
# ==========================================
# Define file paths
DATA_PATH = "data/metadata/merged_training.csv"
OUTPUT_DIR = Path("data/splits")

# Create the output directory if it doesn't exist
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Load the full dataset we created in the previous step
df = pd.read_csv(DATA_PATH)

# ==========================================
# 2. CREATE UNIQUE LIST (The "Lesion-wise" Logic)
# ==========================================
# We get the unique IDs because we want to split based on LESIONS, not images.
# This prevents "Data Leakage" (ensuring the same patient doesn't appear in both Train and Test).
lesions = df["lesion_id"].unique()

# ==========================================
# 3. SPLIT THE IDS
# ==========================================
# Step A: Split into Train (80%) and Temp (20%)
# random_state=42 ensures we get the exact same split every time we run the code.
train_lesions, temp_lesions = train_test_split(
    lesions, test_size=0.2, random_state=42
)

# Step B: Split the Temp (20%) into Validation (10%) and Test (10%)
# We use test_size=0.5 (50% of the temp data) to split the remaining 20% evenly.
val_lesions, test_lesions = train_test_split(
    temp_lesions, test_size=0.5, random_state=42
)

# ==========================================
# 4. ASSIGN IMAGES TO SPLITS
# ==========================================
# Now we go back to the main dataframe (df) and select rows where the 'lesion_id'
# matches our new lists.
train_df = df[df["lesion_id"].isin(train_lesions)]
val_df = df[df["lesion_id"].isin(val_lesions)]
test_df = df[df["lesion_id"].isin(test_lesions)]

# ==========================================
# 5. SAVE TO CSV
# ==========================================
# Save the resulting dataframes to separate CSV files.
# index=False ensures we don't save the row numbers.
train_df.to_csv(OUTPUT_DIR / "train.csv", index=False)
val_df.to_csv(OUTPUT_DIR / "val.csv", index=False)
test_df.to_csv(OUTPUT_DIR / "test.csv", index=False)

# ==========================================
# 6. VERIFICATION STATS
# ==========================================
print("Lesion-wise split completed successfully.")
print("-" * 30)
# Check if the split of IDs is roughly 80% / 10% / 10%
print(f"Train lesions : {len(train_lesions)}")
print(f"Val lesions   : {len(val_lesions)}")
print(f"Test lesions  : {len(test_lesions)}")
print("-" * 30)
# Check the total image count (counts might vary if some lesions have more images than others)
print(f"Train images  : {len(train_df)}")
print(f"Val images    : {len(val_df)}")
print(f"Test images   : {len(test_df)}")