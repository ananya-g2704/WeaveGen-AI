"""WeaveGen AI - FastAPI Backend Application"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="WeaveGen AI",
    description="AI-Powered Handloom Design Platform API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("generated_outputs", exist_ok=True)
app.mount("/static", StaticFiles(directory="generated_outputs"), name="static")

from app.api.routes import auth, designs, regions, products, analysis, ai_assistant, community, production

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(designs.router, prefix="/api/designs", tags=["Designs"])
app.include_router(regions.router, prefix="/api/regions", tags=["Regions"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])
app.include_router(ai_assistant.router, prefix="/api/assistant", tags=["AI Assistant"])
app.include_router(community.router, prefix="/api/community", tags=["Community"])
app.include_router(production.router, prefix="/api/production", tags=["Production"])

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "WeaveGen AI Backend",
        "version": "1.0.0",
        "demo_mode": os.getenv("DEMO_MODE", "true").lower() == "true"
    }
