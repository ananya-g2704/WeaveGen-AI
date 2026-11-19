"""Design management routes."""
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form, Query
from app.core.auth import get_current_user
from typing import Optional
import uuid, json

router = APIRouter()

@router.post("/generate")
async def generate_design(
    motif: str = Form("paisley"),
    region: str = Form("kanchipuram"),
    colors: str = Form("[]"),
    symmetry: str = Form("bilateral"),
    density: str = Form("medium"),
    complexity: str = Form("medium"),
    motif_size: str = Form("medium"),
    text_prompt: Optional[str] = Form(None),
    reference_image: Optional[UploadFile] = File(None),
    user=Depends(get_current_user),
):
    from app.services.design_service import generate_design_service
    try:
        color_list = json.loads(colors) if colors else []
    except json.JSONDecodeError:
        color_list = []
    result = await generate_design_service(
        user_id=user["id"], motif=motif, region=region, colors=color_list,
        symmetry=symmetry, density=density, complexity=complexity,
        motif_size=motif_size, text_prompt=text_prompt, reference_image=reference_image,
    )
    return result

@router.get("/")
async def get_designs(
    page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = None, collection: Optional[str] = None,
    favorites_only: bool = False,
    user=Depends(get_current_user),
):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            query = supabase.table("generated_designs").select("*", count="exact").eq("user_id", user["id"])
            if search:
                query = query.ilike("title", f"%{search}%")
            if favorites_only:
                query = query.eq("is_favorite", True)
            result = query.order("created_at", desc=True).range((page-1)*limit, page*limit-1).execute()
            return {"designs": result.data, "total": result.count, "page": page, "limit": limit}
        except Exception:
            pass
    # Demo mode fallback
    from app.services.design_service import get_demo_designs
    return get_demo_designs(page, limit)

@router.get("/stats")
async def get_design_stats(user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            total = supabase.table("generated_designs").select("id", count="exact").eq("user_id", user["id"]).execute()
            favs = supabase.table("design_favourites").select("id", count="exact").eq("user_id", user["id"]).execute()
            return {
                "total_designs": total.count or 0,
                "saved_designs": total.count or 0,
                "favorite_designs": favs.count or 0,
                "community_likes": 0,
            }
        except Exception:
            pass
    return {"total_designs": 12, "saved_designs": 8, "favorite_designs": 3, "community_likes": 24}

@router.get("/{design_id}")
async def get_design(design_id: str, user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            result = supabase.table("generated_designs").select("*").eq("id", design_id).execute()
            if not result.data:
                raise HTTPException(status_code=404, detail="Design not found")
            return result.data[0]
        except HTTPException:
            raise
        except Exception:
            pass
    raise HTTPException(status_code=404, detail="Design not found")

@router.put("/{design_id}")
async def update_design(design_id: str, data: dict, user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            allowed = ["title", "description", "is_favorite", "tags", "metadata"]
            update_data = {k: v for k, v in data.items() if k in allowed}
            supabase.table("generated_designs").update(update_data).eq("id", design_id).execute()
            return {"message": "Design updated"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return {"message": "Design updated (demo mode)"}

@router.delete("/{design_id}")
async def delete_design(design_id: str, user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            supabase.table("generated_designs").delete().eq("id", design_id).execute()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return {"message": "Design deleted"}

@router.post("/{design_id}/favorite")
async def toggle_favorite(design_id: str, user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            existing = supabase.table("design_favourites").select("*").eq("design_id", design_id).eq("user_id", user["id"]).execute()
            if existing.data:
                supabase.table("design_favourites").delete().eq("design_id", design_id).eq("user_id", user["id"]).execute()
                return {"favorited": False}
            else:
                supabase.table("design_favourites").insert({"design_id": design_id, "user_id": user["id"]}).execute()
                return {"favorited": True}
        except Exception:
            pass
    return {"favorited": True}

@router.post("/collections")
async def create_collection(data: dict, user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    collection = {
        "id": str(uuid.uuid4()),
        "user_id": user["id"],
        "name": data.get("name", "Untitled Collection"),
        "description": data.get("description", ""),
    }
    if supabase:
        try:
            supabase.table("design_collections").insert(collection).execute()
        except Exception:
            pass
    return collection

@router.get("/collections/all")
async def get_collections(user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            result = supabase.table("design_collections").select("*").eq("user_id", user["id"]).execute()
            return result.data
        except Exception:
            pass
    return []
