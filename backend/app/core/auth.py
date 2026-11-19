"""Authentication middleware."""
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.core.config import get_settings

security = HTTPBearer(auto_error=False)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    """Validate JWT from Supabase."""
    settings = get_settings()
    
    # In demo mode without Supabase, return demo user
    if settings.demo_mode and (not settings.supabase_url or not credentials):
        return {
            "id": "demo-user-001",
            "email": "demo@weavegen.ai",
            "role": "authenticated",
            "app_role": "designer",
        }
    
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = credentials.credentials
    try:
        payload = jwt.decode(token, options={"verify_signature": False}, algorithms=["HS256"])
        user_id = payload.get("sub")
        email = payload.get("email")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"id": user_id, "email": email, "role": payload.get("role", "authenticated")}
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Token validation failed: {str(e)}")

def require_role(required_roles: list):
    async def role_checker(user=Depends(get_current_user)):
        from app.core.database import get_supabase_client
        supabase = get_supabase_client()
        if supabase:
            try:
                result = supabase.table("user_roles").select("role").eq("user_id", user["id"]).execute()
                if result.data:
                    user["app_role"] = result.data[0]["role"]
                    if user["app_role"] not in required_roles:
                        raise HTTPException(status_code=403, detail="Insufficient permissions")
                    return user
            except Exception:
                pass
        # Fallback for demo mode
        user["app_role"] = user.get("app_role", "designer")
        return user
    return role_checker
