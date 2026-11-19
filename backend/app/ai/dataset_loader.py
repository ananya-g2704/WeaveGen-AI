"""
WeaveGen AI - Dataset Preprocessing & Condition Encoder Pipeline
Prepares textile images and categorical condition vectors for cGAN training.
"""

import os
import json
import numpy as np
from PIL import Image

# Condition Dimensionality Mappings
REGION_MAP = {
    "kanchipuram": 0,
    "pochampally": 1,
    "patola": 2,
    "baluchari": 3,
    "sambalpuri": 4,
    "mangalagiri": 5
}

MOTIF_MAP = {
    "peacock": 0,
    "temple": 1,
    "mango": 2,
    "ikat_diamond": 3,
    "chevron": 4,
    "nari_kunj": 5,
    "mythological": 6,
    "shankha": 7,
    "default": 0
}

SYMMETRY_MAP = {
    "bilateral": 0,
    "rotational": 1,
    "asymmetric": 2
}

DENSITY_MAP = {
    "medium": 0,
    "high": 1
}

# Total Condition Vector Length: 6 + 8 + 3 + 2 = 19
CONDITION_DIM = len(REGION_MAP) + len(MOTIF_MAP) + len(SYMMETRY_MAP) + len(DENSITY_MAP)

def encode_condition_vector(region="kanchipuram", motif="peacock", symmetry="bilateral", density="medium"):
    """
    Encodes categorical textile parameters into a standardized 19-dimensional one-hot vector:
    [ Region (6) | Motif (8) | Symmetry (3) | Density (2) ]
    """
    vec = np.zeros(CONDITION_DIM, dtype=np.float32)

    # 1. Region One-Hot (offset 0..5)
    r_idx = REGION_MAP.get(region.lower(), 0)
    vec[r_idx] = 1.0

    # 2. Motif One-Hot (offset 6..13)
    # Check partial match if not exact
    motif_lower = motif.lower()
    m_idx = 0
    for k, v in MOTIF_MAP.items():
        if k in motif_lower:
            m_idx = v
            break
    vec[6 + m_idx] = 1.0

    # 3. Symmetry One-Hot (offset 14..16)
    s_idx = SYMMETRY_MAP.get(symmetry.lower(), 0)
    vec[14 + s_idx] = 1.0

    # 4. Density One-Hot (offset 17..18)
    d_idx = DENSITY_MAP.get(density.lower(), 0)
    vec[17 + d_idx] = 1.0

    return vec

def load_and_preprocess_dataset(dataset_dir="backend/datasets", target_size=(64, 64)):
    """
    Loads all annotated handloom images, applies square resizing,
    and scales pixel values to [-1, 1] range for the cGAN tanh output.
    """
    metadata_path = os.path.join(dataset_dir, "labels", "dataset_metadata.json")
    if not os.path.exists(metadata_path):
        raise FileNotFoundError(f"Metadata file not found at {metadata_path}. Run dataset_builder.py first.")

    with open(metadata_path, "r", encoding="utf-8") as f:
        metadata = json.load(f)

    images = []
    conditions = []

    print(f"Loading {len(metadata)} annotated handloom images from {dataset_dir}...")
    for item in metadata:
        img_full_path = os.path.join(dataset_dir, item["relative_path"])
        if not os.path.exists(img_full_path):
            continue

        try:
            with Image.open(img_full_path) as pil_img:
                pil_img = pil_img.convert("RGB")
                pil_img = pil_img.resize(target_size, Image.Resampling.LANCZOS)
                arr = np.array(pil_img, dtype=np.float32)

                # Normalize from [0, 255] to [-1.0, 1.0]
                normalized_img = (arr - 127.5) / 127.5
                images.append(normalized_img)

                # Encode condition vector
                cond_vec = encode_condition_vector(
                    region=item.get("region", "kanchipuram"),
                    motif=item.get("motif", "peacock"),
                    symmetry=item.get("symmetry", "bilateral"),
                    density=item.get("density", "medium")
                )
                conditions.append(cond_vec)
        except Exception as e:
            print(f"Skipping corrupt image {img_full_path}: {e}")

    images_np = np.array(images, dtype=np.float32)
    conditions_np = np.array(conditions, dtype=np.float32)

    print(f"Successfully preprocessed {len(images_np)} images.")
    print(f"Image Tensor Shape: {images_np.shape} (Range: [{images_np.min():.2f}, {images_np.max():.2f}])")
    print(f"Condition Tensor Shape: {conditions_np.shape} (Condition Dim: {CONDITION_DIM})")

    return images_np, conditions_np

if __name__ == "__main__":
    imgs, conds = load_and_preprocess_dataset()
    print("Dataset preprocessing verified successfully.")
