"""Pattern density and complexity analysis."""
import numpy as np
from PIL import Image, ImageFilter
import io

def analyze_pattern_density(image_bytes):
    """Analyze pattern density using edge detection."""
    img = Image.open(io.BytesIO(image_bytes)).convert('L')
    img = img.resize((256, 256))
    
    # Edge detection
    edges = img.filter(ImageFilter.FIND_EDGES)
    edge_arr = np.array(edges, dtype=np.float64)
    
    # Density = proportion of significant edges
    threshold = 30
    edge_pixels = np.sum(edge_arr > threshold)
    total_pixels = edge_arr.size
    density_ratio = edge_pixels / total_pixels
    
    # Classify
    if density_ratio > 0.3:
        density_label = "high"
        description = "Dense, intricate pattern with many design elements."
    elif density_ratio > 0.15:
        density_label = "medium"
        description = "Moderate pattern density with balanced design elements."
    else:
        density_label = "low"
        description = "Sparse, minimal pattern with clean spaces."
    
    # Texture analysis using variance
    arr = np.array(img, dtype=np.float64)
    local_var = _local_variance(arr, window=16)
    texture_score = np.mean(local_var)
    
    # Complexity from edge density + texture
    complexity_score = min(100, (density_ratio * 200 + texture_score / 50))
    
    return {
        "density_ratio": round(density_ratio, 3),
        "density_label": density_label,
        "density_description": description,
        "complexity_score": round(complexity_score, 1),
        "edge_pixel_percentage": round(density_ratio * 100, 1),
        "texture_variance": round(texture_score, 1),
        "method": "Edge detection (Pillow FIND_EDGES) with local variance analysis",
    }

def _local_variance(arr, window=16):
    """Calculate local variance across the image."""
    h, w = arr.shape
    variances = []
    for i in range(0, h - window, window):
        for j in range(0, w - window, window):
            block = arr[i:i+window, j:j+window]
            variances.append(np.var(block))
    return np.array(variances) if variances else np.array([0])
