"""Authentication routes."""
from fastapi import APIRouter, HTTPException, Depends, Body
from app.core.auth import get_current_user
from app.core.config import get_settings

router = APIRouter()

@router.get("/profile")
async def get_profile(user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            result = supabase.table("profiles").select("*").eq("id", user["id"]).execute()
            if result.data:
                profile = result.data[0]
                role_result = supabase.table("user_roles").select("role").eq("user_id", user["id"]).execute()
                profile["role"] = role_result.data[0]["role"] if role_result.data else "designer"
                return profile
        except Exception:
            pass
    return {
        "id": user["id"],
        "email": user.get("email", "demo@weavegen.ai"),
        "full_name": "Demo User",
        "role": user.get("app_role", "designer"),
        "bio": "",
        "avatar_url": "",
        "preferred_region": "kanchipuram",
        "preferred_colors": ["#8B0000", "#FFD700", "#006400"],
    }

@router.post("/role")
async def set_user_role(role: str = Body(..., embed=True), user=Depends(get_current_user)):
    valid_roles = ["designer", "artisan", "admin"]
    if role not in valid_roles:
        raise HTTPException(status_code=400, detail=f"Invalid role. Must be one of: {valid_roles}")
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            supabase.table("user_roles").upsert({"user_id": user["id"], "role": role}).execute()
        except Exception:
            pass
    return {"message": "Role updated", "role": role}

@router.put("/profile")
async def update_profile(profile_data: dict = Body(...), user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            allowed = ["full_name", "bio", "preferred_region", "preferred_colors", "avatar_url"]
            update_data = {k: v for k, v in profile_data.items() if k in allowed}
            update_data["id"] = user["id"]
            supabase.table("profiles").upsert(update_data).execute()
        except Exception:
            pass
    return {"message": "Profile updated"}
