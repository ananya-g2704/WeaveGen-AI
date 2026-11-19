"""Symmetry detection and analysis."""
import numpy as np
from PIL import Image
import io

def analyze_symmetry(image_bytes):
    """Analyze symmetry in a design image."""
    img = Image.open(io.BytesIO(image_bytes)).convert('L')
    img = img.resize((256, 256))
    arr = np.array(img, dtype=np.float64)
    
    # Horizontal symmetry
    flipped_h = np.fliplr(arr)
    h_diff = np.mean(np.abs(arr - flipped_h))
    h_score = max(0, 1 - h_diff / 128) * 100
    
    # Vertical symmetry
    flipped_v = np.flipud(arr)
    v_diff = np.mean(np.abs(arr - flipped_v))
    v_score = max(0, 1 - v_diff / 128) * 100
    
    # Rotational symmetry (180 degrees)
    rotated = np.rot90(arr, 2)
    r_diff = np.mean(np.abs(arr - rotated))
    r_score = max(0, 1 - r_diff / 128) * 100
    
    # Diagonal symmetry
    transposed = arr.T
    if arr.shape == transposed.shape:
        d_diff = np.mean(np.abs(arr - transposed))
        d_score = max(0, 1 - d_diff / 128) * 100
    else:
        d_score = 0
    
    overall = (h_score + v_score + r_score) / 3
    
    symmetry_type = "none"
    if h_score > 70 and v_score > 70:
        symmetry_type = "bilateral (both axes)"
    elif h_score > 70:
        symmetry_type = "horizontal"
    elif v_score > 70:
        symmetry_type = "vertical"
    elif r_score > 70:
        symmetry_type = "rotational"
    
    return {
        "horizontal_score": round(h_score, 1),
        "vertical_score": round(v_score, 1),
        "rotational_score": round(r_score, 1),
        "diagonal_score": round(d_score, 1),
        "overall_score": round(overall, 1),
        "detected_type": symmetry_type,
        "method": "Pixel-wise comparison with flipped/rotated copies",
        "note": "Scores indicate similarity percentage between original and transformed image.",
    }
