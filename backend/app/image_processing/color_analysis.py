"""Color palette extraction and analysis."""
import numpy as np
from PIL import Image
from sklearn.cluster import KMeans
import io

def extract_color_palette(image_bytes, n_colors=6):
    """Extract dominant colors using K-Means clustering."""
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((150, 150))
    pixels = np.array(img).reshape(-1, 3)
    
    kmeans = KMeans(n_clusters=n_colors, random_state=42, n_init=10)
    kmeans.fit(pixels)
    
    colors = kmeans.cluster_centers_.astype(int)
    labels = kmeans.labels_
    counts = np.bincount(labels)
    percentages = (counts / len(labels) * 100).round(1)
    
    sorted_indices = np.argsort(-percentages)
    
    palette = []
    for idx in sorted_indices:
        r, g, b = colors[idx]
        hex_color = f"#{r:02x}{g:02x}{b:02x}"
        palette.append({
            "hex": hex_color,
            "rgb": {"r": int(r), "g": int(g), "b": int(b)},
            "percentage": float(percentages[idx]),
            "name": _get_color_name(int(r), int(g), int(b)),
        })
    
    return {
        "palette": palette,
        "n_colors": n_colors,
        "dominant_color": palette[0]["hex"] if palette else None,
        "method": "K-Means clustering",
    }

def _get_color_name(r, g, b):
    """Approximate color name."""
    colors = {
        "Red": (255, 0, 0), "Maroon": (128, 0, 0), "Dark Red": (139, 0, 0),
        "Gold": (255, 215, 0), "Yellow": (255, 255, 0), "Orange": (255, 165, 0),
        "Green": (0, 128, 0), "Dark Green": (0, 100, 0), "Olive": (128, 128, 0),
        "Blue": (0, 0, 255), "Navy": (0, 0, 128), "Teal": (0, 128, 128),
        "Purple": (128, 0, 128), "Indigo": (75, 0, 130), "Violet": (238, 130, 238),
        "White": (255, 255, 255), "Black": (0, 0, 0), "Gray": (128, 128, 128),
        "Brown": (139, 69, 19), "Cream": (255, 253, 208), "Beige": (245, 245, 220),
        "Pink": (255, 192, 203), "Coral": (255, 127, 80),
    }
    min_dist = float('inf')
    closest = "Unknown"
    for name, (cr, cg, cb) in colors.items():
        dist = (r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2
        if dist < min_dist:
            min_dist = dist
            closest = name
    return closest
