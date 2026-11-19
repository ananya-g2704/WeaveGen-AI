"""Supabase client initialization."""
from supabase import create_client, Client
from app.core.config import get_settings

_client = None

def get_supabase_client() -> Client:
    global _client
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_key:
        return None
    if _client is None:
        _client = create_client(settings.supabase_url, settings.supabase_key)
    return _client
