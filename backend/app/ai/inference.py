"""
WeaveGen AI - cGAN Model Inference & Evaluation Pipeline
Loads trained Generator checkpoints and synthesizes conditional handloom patterns.
"""

import os
import io
import base64
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow import keras

from app.ai.dataset_loader import encode_condition_vector, CONDITION_DIM

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
MODEL_PATH = os.path.join(BASE_DIR, "trained_models", "generator_checkpoint.keras")
OUTPUT_DIR = os.path.join(BASE_DIR, "generated_outputs")

_cached_generator = None

def get_loaded_generator(model_path=MODEL_PATH):
    """Loads and caches the trained Generator model."""
    global _cached_generator
    if _cached_generator is not None:
        return _cached_generator

    if not os.path.exists(model_path):
        return None

    try:
        print(f"Loading cGAN Generator weights from {model_path}...")
        _cached_generator = keras.models.load_model(model_path, compile=False)
        print("Generator weights loaded successfully.")
        return _cached_generator
    except Exception as e:
        print(f"Failed to load generator checkpoint: {e}")
        return None

def generate_handloom_designs(
    region="kanchipuram",
    motif="peacock",
    symmetry="bilateral",
    density="medium",
    num_variations=4,
    latent_dim=100
):
    """
    Synthesizes authentic handloom design variations conditioned on specified textile attributes.
    Returns list of PIL images, base64 strings, and evaluation metrics.
    """
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    generator = get_loaded_generator()

    if generator is None:
        return {
            "success": False,
            "error": "No trained Generator checkpoint found. Please train the model with train.py first.",
            "variations": []
        }

    # 1. Encode condition vector
    cond_vec = encode_condition_vector(region=region, motif=motif, symmetry=symmetry, density=density)
    
    # 2. Replicate condition across all requested variations
    conditions_batch = np.tile(cond_vec, (num_variations, 1)).astype(np.float32)

    # 3. Sample random latent noise vectors
    noise_batch = np.random.normal(0, 1, (num_variations, latent_dim)).astype(np.float32)

    # 4. Run Generator Inference
    predictions = generator.predict([noise_batch, conditions_batch], verbose=0)

    # 5. Denormalize from [-1.0, 1.0] to [0, 255]
    denorm_images = ((predictions + 1.0) * 127.5).clip(0, 255).astype(np.uint8)

    results = []
    for idx in range(num_variations):
        pil_img = Image.fromarray(denorm_images[idx])

        # Save to disk
        filename = f"cgan_{region}_{motif}_var{idx+1}_{int(np.random.randint(1000, 9999))}.png"
        filepath = os.path.join(OUTPUT_DIR, filename)
        pil_img.save(filepath, "PNG")

        # Encode to base64
        buf = io.BytesIO()
        pil_img.save(buf, format="PNG")
        b64 = base64.b64encode(buf.getvalue()).decode("utf-8")

        # Compute basic structural evaluation metrics
        arr = denorm_images[idx]
        contrast = float(arr.std())
        brightness = float(arr.mean())

        results.append({
            "variation_index": idx + 1,
            "filename": filename,
            "filepath": filepath,
            "image_url": f"/static/{filename}",
            "image_base64": f"data:image/png;base64,{b64}",
            "metrics": {
                "contrast": round(contrast, 2),
                "brightness": round(brightness, 2),
                "resolution": f"{pil_img.width}x{pil_img.height}",
            }
        })

    return {
        "success": True,
        "region": region,
        "motif": motif,
        "symmetry": symmetry,
        "density": density,
        "variations": results,
        "model_checkpoint": MODEL_PATH,
    }

if __name__ == "__main__":
    res = generate_handloom_designs(region="kanchipuram", motif="peacock", num_variations=4)
    print("Inference result:", res.get("success"), f"({len(res.get('variations', []))} variations generated)")
