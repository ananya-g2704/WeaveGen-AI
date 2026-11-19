"""Production tools routes."""
from fastapi import APIRouter, HTTPException, Depends, Body
from app.core.auth import get_current_user

router = APIRouter()

@router.post("/specifications")
async def generate_specifications(data: dict = Body(...), user=Depends(get_current_user)):
    from app.services.production_service import generate_design_specs
    return await generate_design_specs(data.get("design_id"), data.get("product_type", "saree"), user["id"])

@router.post("/export-pdf")
async def export_pdf(data: dict = Body(...), user=Depends(get_current_user)):
    from app.services.production_service import export_pdf_report
    from fastapi.responses import FileResponse
    result = await export_pdf_report(data.get("design_id"), user["id"])
    return FileResponse(result["file_path"], media_type="application/pdf", filename=result["filename"])

@router.post("/cost-estimate")
async def estimate_cost(data: dict = Body(...), user=Depends(get_current_user)):
    from app.services.production_service import estimate_production_cost
    return await estimate_production_cost(
        product_type=data.get("product_type", "saree"),
        fabric_type=data.get("fabric_type", "cotton"),
        complexity=data.get("complexity", "medium"),
        region=data.get("region", "kanchipuram"),
    )
