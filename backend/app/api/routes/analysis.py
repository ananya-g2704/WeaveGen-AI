"""Design analysis routes."""
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from app.core.auth import get_current_user

router = APIRouter()

@router.post("/colors")
async def analyze_colors(image: UploadFile = File(...), n_colors: int = 6, user=Depends(get_current_user)):
    from app.image_processing.color_analysis import extract_color_palette
    contents = await image.read()
    return extract_color_palette(contents, n_colors=n_colors)

@router.post("/symmetry")
async def analyze_symmetry(image: UploadFile = File(...), user=Depends(get_current_user)):
    from app.image_processing.symmetry_analysis import analyze_symmetry as sym_analyze
    contents = await image.read()
    return sym_analyze(contents)

@router.post("/density")
async def analyze_density(image: UploadFile = File(...), user=Depends(get_current_user)):
    from app.image_processing.pattern_analysis import analyze_pattern_density
    contents = await image.read()
    return analyze_pattern_density(contents)

@router.post("/similarity")
async def analyze_similarity(image1: UploadFile = File(...), image2: UploadFile = File(...), user=Depends(get_current_user)):
    from app.image_processing.similarity import calculate_similarity
    contents1 = await image1.read()
    contents2 = await image2.read()
    return calculate_similarity(contents1, contents2)

@router.post("/full")
async def full_analysis(image: UploadFile = File(...), user=Depends(get_current_user)):
    from app.image_processing.color_analysis import extract_color_palette
    from app.image_processing.symmetry_analysis import analyze_symmetry as sym_analyze
    from app.image_processing.pattern_analysis import analyze_pattern_density
    contents = await image.read()
    return {
        "colors": extract_color_palette(contents),
        "symmetry": sym_analyze(contents),
        "density": analyze_pattern_density(contents),
    }
