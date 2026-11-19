"""Textile region routes."""
from fastapi import APIRouter, HTTPException

router = APIRouter()

TEXTILE_REGIONS = [
    {
        "id": "pochampally", "name": "Pochampally", "state": "Telangana",
        "description": "Known for geometric ikat patterns with vibrant colors. Features distinctive diamond and square motifs created through resist-dyeing technique.",
        "signature_motifs": ["ikat_diamond", "geometric_square", "chevron", "zigzag"],
        "signature_colors": ["#8B0000", "#FFD700", "#006400", "#000080", "#FFFFFF"],
        "weave_type": "Ikat",
    },
    {
        "id": "mangalagiri", "name": "Mangalagiri", "state": "Andhra Pradesh",
        "description": "Famous for lightweight cotton sarees with distinctive nizam border patterns and elegant zari work.",
        "signature_motifs": ["nizam_border", "temple_border", "plain_body", "zari_stripe"],
        "signature_colors": ["#FFD700", "#FFFFFF", "#8B4513", "#800020", "#006B3A"],
        "weave_type": "Plain weave with borders",
    },
    {
        "id": "ilkal", "name": "Ilkal", "state": "Karnataka",
        "description": "Characterized by the unique 'tope teni' technique joining body and pallu. Features red and white body with elaborate pallu designs.",
        "signature_motifs": ["tope_teni", "kasuti_embroidery", "temple_gopura", "chariot"],
        "signature_colors": ["#CC0000", "#FFFFFF", "#FFD700", "#800020", "#4B0082"],
        "weave_type": "Tope Teni",
    },
    {
        "id": "baluchari", "name": "Baluchari", "state": "West Bengal",
        "description": "Renowned for elaborate mythological scenes woven into the pallu using Jacquard weaving.",
        "signature_motifs": ["mythological_scene", "kalka", "dancing_figure", "floral_vine"],
        "signature_colors": ["#800020", "#FFD700", "#4B0082", "#006400", "#8B4513"],
        "weave_type": "Jacquard",
    },
    {
        "id": "patola", "name": "Patola", "state": "Gujarat",
        "description": "Double ikat silk sarees with intricate geometric and floral patterns. Among the most prized handloom textiles.",
        "signature_motifs": ["nari_kunj", "paan", "vohra_gaji", "chhabdi", "popat_kunj"],
        "signature_colors": ["#CC0000", "#FFD700", "#006400", "#FFFFFF", "#000000"],
        "weave_type": "Double Ikat",
    },
    {
        "id": "kanchipuram", "name": "Kanchipuram", "state": "Tamil Nadu",
        "description": "Known for heavy zari work and temple-inspired borders. Features contrasting body and pallu with distinctive checks.",
        "signature_motifs": ["temple_border", "peacock", "mango", "checks", "rudraksham"],
        "signature_colors": ["#8B0000", "#FFD700", "#006400", "#4B0082", "#FF6347"],
        "weave_type": "Korvai",
    },
    {
        "id": "sambalpuri", "name": "Sambalpuri", "state": "Odisha",
        "description": "Known for bandha (ikat) patterns featuring traditional motifs like shankha (shell), chakra (wheel), and phula (flower).",
        "signature_motifs": ["shankha", "chakra", "phula", "fish", "deer"],
        "signature_colors": ["#CC0000", "#FFFFFF", "#000000", "#FFD700", "#8B0000"],
        "weave_type": "Bandha (Ikat)",
    },
]

@router.get("/")
async def get_regions():
    return TEXTILE_REGIONS

@router.get("/{region_id}")
async def get_region(region_id: str):
    for region in TEXTILE_REGIONS:
        if region["id"] == region_id:
            return region
    raise HTTPException(status_code=404, detail="Region not found")

@router.get("/{region_id}/motifs")
async def get_region_motifs(region_id: str):
    for region in TEXTILE_REGIONS:
        if region["id"] == region_id:
            return {"region": region["name"], "motifs": region["signature_motifs"], "colors": region["signature_colors"], "weave_type": region["weave_type"]}
    raise HTTPException(status_code=404, detail="Region not found")
