"""Community routes."""
from fastapi import APIRouter, HTTPException, Depends, Query, Body
from app.core.auth import get_current_user
from typing import Optional
import uuid

router = APIRouter()

DEMO_COMMUNITY_POSTS = [
    {
        "id": "post-1", "user_id": "demo-1", "title": "Kanchipuram Silk Fusion",
        "description": "Modern interpretation of classic temple borders with contemporary color palette.",
        "image_url": "", "tags": ["kanchipuram", "silk", "modern"], "likes_count": 45,
        "created_at": "2024-01-15T10:00:00Z",
        "profiles": {"full_name": "Priya Sharma", "avatar_url": ""},
    },
    {
        "id": "post-2", "user_id": "demo-2", "title": "Pochampally Geometric Dreams",
        "description": "Exploring ikat diamond patterns with AI-generated variations.",
        "image_url": "", "tags": ["pochampally", "ikat", "geometric"], "likes_count": 32,
        "created_at": "2024-01-14T15:30:00Z",
        "profiles": {"full_name": "Ravi Kumar", "avatar_url": ""},
    },
    {
        "id": "post-3", "user_id": "demo-3", "title": "Banarasi Heritage Collection",
        "description": "Traditional motifs reimagined with AI assistance for modern weaving.",
        "image_url": "", "tags": ["banarasi", "heritage", "zari"], "likes_count": 67,
        "created_at": "2024-01-13T09:15:00Z",
        "profiles": {"full_name": "Anita Devi", "avatar_url": ""},
    },
]

@router.get("/posts")
async def get_posts(page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=50), sort: str = Query("latest"), search: Optional[str] = None, tag: Optional[str] = None):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            query = supabase.table("community_posts").select("*, profiles(full_name, avatar_url)", count="exact")
            if search:
                query = query.ilike("title", f"%{search}%")
            if tag:
                query = query.contains("tags", [tag])
            if sort == "popular":
                query = query.order("likes_count", desc=True)
            else:
                query = query.order("created_at", desc=True)
            result = query.range((page-1)*limit, page*limit-1).execute()
            return {"posts": result.data, "total": result.count}
        except Exception:
            pass
    posts = DEMO_COMMUNITY_POSTS
    if search:
        posts = [p for p in posts if search.lower() in p["title"].lower()]
    if tag:
        posts = [p for p in posts if tag in p.get("tags", [])]
    return {"posts": posts, "total": len(posts)}

@router.post("/posts")
async def create_post(data: dict = Body(...), user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    post = {
        "id": str(uuid.uuid4()), "user_id": user["id"],
        "title": data.get("title", ""), "description": data.get("description", ""),
        "image_url": data.get("image_url", ""), "design_id": data.get("design_id"),
        "tags": data.get("tags", []), "likes_count": 0,
    }
    if supabase:
        try:
            supabase.table("community_posts").insert(post).execute()
        except Exception:
            pass
    return post

@router.post("/posts/{post_id}/like")
async def toggle_like(post_id: str, user=Depends(get_current_user)):
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            existing = supabase.table("community_likes").select("*").eq("post_id", post_id).eq("user_id", user["id"]).execute()
            if existing.data:
                supabase.table("community_likes").delete().eq("post_id", post_id).eq("user_id", user["id"]).execute()
                return {"liked": False}
            else:
                supabase.table("community_likes").insert({"post_id": post_id, "user_id": user["id"]}).execute()
                return {"liked": True}
        except Exception:
            pass
    return {"liked": True}
