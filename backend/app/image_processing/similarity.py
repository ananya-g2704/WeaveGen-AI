"""Image similarity analysis."""
import numpy as np
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
import io

def calculate_similarity(image_bytes1, image_bytes2):
    """Calculate similarity between two design images."""
    img1 = Image.open(io.BytesIO(image_bytes1)).convert('RGB')
    img2 = Image.open(io.BytesIO(image_bytes2)).convert('RGB')
    
    size = (128, 128)
    img1 = img1.resize(size)
    img2 = img2.resize(size)
    
    arr1 = np.array(img1, dtype=np.float64).flatten()
    arr2 = np.array(img2, dtype=np.float64).flatten()
    
    # Normalize
    arr1 = arr1 / 255.0
    arr2 = arr2 / 255.0
    
    # Cosine similarity
    cos_sim = cosine_similarity(arr1.reshape(1, -1), arr2.reshape(1, -1))[0][0]
    
    # Histogram comparison
    hist_sim = _histogram_similarity(img1, img2)
    
    # Structural similarity (simplified)
    structural_sim = _structural_similarity(arr1, arr2)
    
    overall = (cos_sim * 0.4 + hist_sim * 0.3 + structural_sim * 0.3)
    
    return {
        "overall_similarity": round(float(overall) * 100, 1),
        "cosine_similarity": round(float(cos_sim) * 100, 1),
        "color_histogram_similarity": round(float(hist_sim) * 100, 1),
        "structural_similarity": round(float(structural_sim) * 100, 1),
        "method": "Weighted combination of cosine similarity, color histogram comparison, and structural analysis",
        "note": "Similarity scores are approximate and based on pixel-level comparison. For perceptual similarity, LPIPS would provide more accurate results.",
    }

def _histogram_similarity(img1, img2):
    """Compare color histograms."""
    hist1 = np.array(img1.histogram(), dtype=np.float64)
    hist2 = np.array(img2.histogram(), dtype=np.float64)
    hist1 = hist1 / (hist1.sum() + 1e-10)
    hist2 = hist2 / (hist2.sum() + 1e-10)
    intersection = np.minimum(hist1, hist2).sum()
    return float(intersection)

def _structural_similarity(arr1, arr2):
    """Simplified structural similarity."""
    mean1, mean2 = np.mean(arr1), np.mean(arr2)
    std1, std2 = np.std(arr1), np.std(arr2)
    cov = np.mean((arr1 - mean1) * (arr2 - mean2))
    c1, c2 = 0.01 ** 2, 0.03 ** 2
    ssim = ((2 * mean1 * mean2 + c1) * (2 * cov + c2)) / ((mean1**2 + mean2**2 + c1) * (std1**2 + std2**2 + c2))
    return max(0, float(ssim))
