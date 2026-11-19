"""
WeaveGen AI - cGAN Design Evaluation Suite
Computes structural contrast, edge frequency, and symmetry coherence metrics
on generated handloom patterns.
"""

import os
import glob
import numpy as np
from PIL import Image

def evaluate_pattern_quality(image_path):
    """Computes quantitative textile design metrics for a synthetic pattern image."""
    img = Image.open(image_path).convert("L")
    arr = np.array(img, dtype=np.float32)

    # 1. Contrast (Spread of tones)
    contrast = float(arr.std())

    # 2. Dynamic Range
    dynamic_range = float(arr.max() - arr.min())

    # 3. Bilateral Symmetry Index [0.0 - 100.0%]
    flipped = np.fliplr(arr)
    mae = np.mean(np.abs(arr - flipped))
    symmetry_score = max(0.0, min(100.0, (1.0 - (mae / 128.0)) * 100.0))

    # 4. Pattern Edge Sharpness (Gradient variance)
    gx, gy = np.gradient(arr)
    edge_energy = float(np.mean(np.sqrt(gx**2 + gy**2)))

    return {
        "file": os.path.basename(image_path),
        "resolution": f"{img.width}x{img.height}",
        "contrast_std": round(contrast, 2),
        "dynamic_range": round(dynamic_range, 2),
        "bilateral_symmetry_pct": round(symmetry_score, 1),
        "edge_energy": round(edge_energy, 2),
        "status": "PASS" if contrast > 15.0 and edge_energy > 2.0 else "REVIEW"
    }

def run_evaluation_suite(output_dir="backend/generated_outputs"):
    """Evaluates all synthesized patterns in the output folder."""
    files = glob.glob(os.path.join(output_dir, "cgan_*.png"))
    if not files:
        print(f"No cGAN images found in {output_dir}")
        return []

    print("=" * 65)
    print("WeaveGen AI - Synthetic Pattern Quality Evaluation Report")
    print(f"Evaluating {len(files)} generated designs in: {output_dir}")
    print("=" * 65)

    results = []
    for f in sorted(files):
        metrics = evaluate_pattern_quality(f)
        results.append(metrics)
        print(f"File: {metrics['file']}")
        print(f"   • Resolution: {metrics['resolution']}")
        print(f"   • Bilateral Symmetry: {metrics['bilateral_symmetry_pct']}%")
        print(f"   • Contrast (Std Dev): {metrics['contrast_std']}")
        print(f"   • Edge Sharpness Energy: {metrics['edge_energy']}")
        print(f"   • Quality Status: {metrics['status']}\n")

    avg_symmetry = np.mean([r["bilateral_symmetry_pct"] for r in results])
    avg_contrast = np.mean([r["contrast_std"] for r in results])
    print(f"Overall Batch Averages -> Symmetry: {avg_symmetry:.1f}% | Contrast: {avg_contrast:.2f}")
    return results

if __name__ == "__main__":
    run_evaluation_suite()
