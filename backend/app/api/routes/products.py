"""Product and visualization routes."""
from fastapi import APIRouter, HTTPException, Depends
from app.core.auth import get_current_user

router = APIRouter()

TEXTILE_PRODUCTS = [
    {"id": "saree", "name": "Saree", "description": "Traditional 6-yard drape", "views": ["full", "pallu", "border", "closeup"]},
    {"id": "dupatta", "name": "Dupatta", "description": "Lightweight shawl/scarf", "views": ["full", "border", "closeup"]},
    {"id": "fabric", "name": "Fabric (per meter)", "description": "Unstitched fabric yardage", "views": ["full", "repeat", "closeup"]},
    {"id": "stole", "name": "Stole", "description": "Narrow decorative scarf", "views": ["full", "closeup"]},
    {"id": "lehenga", "name": "Lehenga", "description": "Traditional skirt", "views": ["full", "border", "closeup"]},
    {"id": "kurta_fabric", "name": "Kurta Fabric", "description": "Fabric for kurta/shirt", "views": ["full", "closeup"]},
]

@router.get("/")
async def get_products():
    return TEXTILE_PRODUCTS

@router.get("/{product_id}")
async def get_product(product_id: str):
    for p in TEXTILE_PRODUCTS:
        if p["id"] == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")

@router.post("/visualize")
async def visualize_product(data: dict, user=Depends(get_current_user)):
    from app.services.visualization_service import generate_product_visualization
    design_url = data.get("design_url")
    product_id = data.get("product_id", "saree")
    view = data.get("view", "full")
    if not design_url:
        raise HTTPException(status_code=400, detail="design_url is required")
    result = await generate_product_visualization(design_url, product_id, view)
    return result
