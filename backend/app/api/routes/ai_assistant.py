"""AI Design Assistant routes."""
from fastapi import APIRouter, Depends, Body
from app.core.auth import get_current_user
from app.services.assistant_service import get_assistant_response

router = APIRouter()

@router.post("/chat")
async def chat(message: str = Body(..., embed=True), context: dict = Body(default={}), user=Depends(get_current_user)):
    response = await get_assistant_response(message, context, user["id"])
    return response
