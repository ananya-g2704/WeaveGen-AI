"""Product visualization service."""
from PIL import Image, ImageDraw, ImageFont
import io
import os
import base64
import uuid

PRODUCT_TEMPLATES = {
    "saree": {"width": 800, "height": 1000, "pattern_area": (100, 150, 700, 850), "border_width": 60},
    "dupatta": {"width": 600, "height": 800, "pattern_area": (80, 100, 520, 700), "border_width": 40},
    "fabric": {"width": 600, "height": 600, "pattern_area": (20, 20, 580, 580), "border_width": 0},
    "stole": {"width": 300, "height": 900, "pattern_area": (30, 50, 270, 850), "border_width": 25},
    "lehenga": {"width": 700, "height": 900, "pattern_area": (100, 200, 600, 800), "border_width": 50},
    "kurta_fabric": {"width": 500, "height": 700, "pattern_area": (30, 30, 470, 670), "border_width": 0},
}

async def generate_product_visualization(design_url, product_id, view="full"):
    """Generate product visualization with the design pattern."""
    template = PRODUCT_TEMPLATES.get(product_id, PRODUCT_TEMPLATES["saree"])
    
    # Try to load the design image
    design_img = None
    if design_url.startswith("/static/"):
        filepath = os.path.join("generated_outputs", design_url.replace("/static/", ""))
        if os.path.exists(filepath):
            design_img = Image.open(filepath)
    
    # Create product visualization
    width, height = template["width"], template["height"]
    product_img = Image.new('RGB', (width, height), (245, 240, 235))
    draw = ImageDraw.Draw(product_img)
    
    pa = template["pattern_area"]
    pattern_w = pa[2] - pa[0]
    pattern_h = pa[3] - pa[1]
    
    if design_img:
        # Tile the design across the pattern area
        design_resized = design_img.resize((pattern_w, pattern_h), Image.LANCZOS)
        product_img.paste(design_resized, (pa[0], pa[1]))
    else:
        draw.rectangle([pa[0], pa[1], pa[2], pa[3]], fill=(200, 180, 160))
        draw.text((pa[0] + 20, pa[1] + pattern_h // 2), "Design Preview", fill=(100, 80, 60))
    
    # Draw product outline
    bw = template["border_width"]
    if product_id == "saree":
        _draw_saree_outline(draw, width, height, bw)
    elif product_id == "dupatta":
        _draw_dupatta_outline(draw, width, height, bw)
    elif product_id == "lehenga":
        _draw_lehenga_outline(draw, width, height, bw)
    
    # Add label
    try:
        draw.text((10, height - 30), f"{product_id.title()} - {view.title()} View", fill=(100, 100, 100))
    except Exception:
        pass
    
    # Save
    viz_id = str(uuid.uuid4())
    filename = f"viz_{viz_id}.png"
    filepath = os.path.join("generated_outputs", filename)
    product_img.save(filepath, "PNG")
    
    buffer = io.BytesIO()
    product_img.save(buffer, format="PNG")
    img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
    
    return {
        "image_url": f"/static/{filename}",
        "image_base64": f"data:image/png;base64,{img_base64}",
        "product": product_id,
        "view": view,
    }

def _draw_saree_outline(draw, w, h, bw):
    draw.rectangle([0, 0, w-1, h-1], outline=(139, 69, 19), width=3)
    # Pallu indication
    draw.line([(0, h * 0.7), (w, h * 0.7)], fill=(139, 69, 19), width=2)
    draw.text((10, int(h * 0.7) + 5), "Pallu", fill=(139, 69, 19))

def _draw_dupatta_outline(draw, w, h, bw):
    draw.rectangle([0, 0, w-1, h-1], outline=(139, 69, 19), width=2)

def _draw_lehenga_outline(draw, w, h, bw):
    draw.arc([50, 0, w-50, 200], 0, 180, fill=(139, 69, 19), width=2)
    draw.line([(50, 100), (50, h-1)], fill=(139, 69, 19), width=2)
    draw.line([(w-50, 100), (w-50, h-1)], fill=(139, 69, 19), width=2)
    draw.line([(50, h-1), (w-50, h-1)], fill=(139, 69, 19), width=2)
