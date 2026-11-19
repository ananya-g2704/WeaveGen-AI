"""Design generation service."""
import uuid
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import io
import base64
import math
import random

# Color palettes for different regions
REGION_PALETTES = {
    "pochampally": ["#8B0000", "#FFD700", "#006400", "#000080", "#FFFFFF", "#CC3333"],
    "mangalagiri": ["#FFD700", "#FFFFFF", "#8B4513", "#800020", "#006B3A", "#F5DEB3"],
    "ilkal": ["#CC0000", "#FFFFFF", "#FFD700", "#800020", "#4B0082", "#FF6347"],
    "baluchari": ["#800020", "#FFD700", "#4B0082", "#006400", "#8B4513", "#DAA520"],
    "patola": ["#CC0000", "#FFD700", "#006400", "#FFFFFF", "#000000", "#FF4500"],
    "kanchipuram": ["#8B0000", "#FFD700", "#006400", "#4B0082", "#FF6347", "#DAA520"],
    "sambalpuri": ["#CC0000", "#FFFFFF", "#000000", "#FFD700", "#8B0000", "#2F4F4F"],
}

MOTIF_TYPES = {
    "paisley": "curved_teardrop",
    "peacock": "bird_motif",
    "lotus": "floral_circle",
    "mango": "curved_teardrop",
    "temple": "geometric_tower",
    "geometric": "geometric_pattern",
    "floral": "floral_pattern",
    "ikat": "blurred_geometric",
    "checks": "check_pattern",
    "stripes": "stripe_pattern",
    "diamond": "diamond_pattern",
    "zigzag": "zigzag_pattern",
}

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def generate_textile_pattern(width=512, height=512, motif="paisley", region="kanchipuram",
                              colors=None, symmetry="bilateral", density="medium",
                              complexity="medium", motif_size="medium", seed=None):
    """Generate a textile-inspired pattern image."""
    if seed is not None:
        random.seed(seed)
        np.random.seed(seed)
    
    # Get color palette
    if colors and len(colors) > 0:
        palette = [hex_to_rgb(c) if isinstance(c, str) else c for c in colors]
    else:
        region_colors = REGION_PALETTES.get(region, REGION_PALETTES["kanchipuram"])
        palette = [hex_to_rgb(c) for c in region_colors]
    
    # Background color (darkest or first color)
    bg_color = palette[0] if palette else (139, 0, 0)
    
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Density settings
    density_map = {"low": 0.3, "medium": 0.6, "high": 0.9}
    density_factor = density_map.get(density, 0.6)
    
    # Size settings
    size_map = {"small": 0.5, "medium": 1.0, "large": 1.5}
    size_factor = size_map.get(motif_size, 1.0)
    
    # Complexity settings
    complexity_map = {"simple": 1, "medium": 2, "complex": 3}
    complexity_level = complexity_map.get(complexity, 2)
    
    # Draw border pattern
    _draw_border(draw, width, height, palette, complexity_level)
    
    # Draw main body pattern
    _draw_body_pattern(draw, width, height, palette, motif, density_factor, size_factor, complexity_level)
    
    # Apply symmetry
    if symmetry == "bilateral":
        img = _apply_bilateral_symmetry(img)
    elif symmetry == "radial":
        img = _apply_radial_symmetry(img)
    elif symmetry == "rotational":
        img = _apply_rotational_symmetry(img)
    
    # Add textile texture
    img = _add_textile_texture(img)
    
    return img

def _draw_border(draw, width, height, palette, complexity):
    border_color = palette[1] if len(palette) > 1 else (255, 215, 0)
    accent_color = palette[2] if len(palette) > 2 else (0, 100, 0)
    border_width = max(20, width // 12)
    
    # Outer border
    for i in range(3):
        draw.rectangle([i, i, width-1-i, height-1-i], outline=border_color)
    
    # Main border band
    draw.rectangle([5, 5, border_width, height-6], fill=border_color)
    draw.rectangle([width-border_width-1, 5, width-6, height-6], fill=border_color)
    draw.rectangle([5, 5, width-6, border_width], fill=border_color)
    draw.rectangle([5, height-border_width-1, width-6, height-6], fill=border_color)
    
    # Border motifs (small diamonds/dots)
    if complexity >= 2:
        for y in range(border_width + 10, height - border_width - 10, 30):
            # Left border motifs
            cx, cy = border_width // 2 + 3, y
            s = 6
            draw.polygon([(cx, cy-s), (cx+s, cy), (cx, cy+s), (cx-s, cy)], fill=accent_color)
            # Right border motifs
            cx = width - border_width // 2 - 3
            draw.polygon([(cx, cy-s), (cx+s, cy), (cx, cy+s), (cx-s, cy)], fill=accent_color)

def _draw_body_pattern(draw, width, height, palette, motif, density, size_factor, complexity):
    border_w = max(20, width // 12)
    inner_x1, inner_y1 = border_w + 10, border_w + 10
    inner_x2, inner_y2 = width - border_w - 10, height - border_w - 10
    inner_w = inner_x2 - inner_x1
    inner_h = inner_y2 - inner_y1
    
    if motif in ["checks", "check_pattern"]:
        _draw_checks(draw, inner_x1, inner_y1, inner_w, inner_h, palette, size_factor)
    elif motif in ["stripes", "stripe_pattern"]:
        _draw_stripes(draw, inner_x1, inner_y1, inner_w, inner_h, palette, size_factor)
    elif motif in ["diamond", "diamond_pattern", "ikat"]:
        _draw_diamonds(draw, inner_x1, inner_y1, inner_w, inner_h, palette, density, size_factor)
    elif motif in ["zigzag", "zigzag_pattern"]:
        _draw_zigzag(draw, inner_x1, inner_y1, inner_w, inner_h, palette, size_factor)
    elif motif in ["floral", "lotus", "floral_pattern"]:
        _draw_floral(draw, inner_x1, inner_y1, inner_w, inner_h, palette, density, size_factor)
    elif motif in ["temple", "geometric_tower"]:
        _draw_temple(draw, inner_x1, inner_y1, inner_w, inner_h, palette, density, size_factor)
    else:
        # Default: paisley/teardrop pattern
        _draw_paisley(draw, inner_x1, inner_y1, inner_w, inner_h, palette, density, size_factor)

def _draw_checks(draw, x, y, w, h, palette, size_factor):
    cell = int(30 * size_factor)
    c1 = palette[0] if palette else (139, 0, 0)
    c2 = palette[1] if len(palette) > 1 else (255, 215, 0)
    c3 = palette[2] if len(palette) > 2 else (0, 100, 0)
    for row in range(0, h, cell):
        for col in range(0, w, cell):
            color = c1 if (row // cell + col // cell) % 2 == 0 else c2
            if (row // cell + col // cell) % 3 == 0:
                color = c3
            draw.rectangle([x + col, y + row, x + col + cell - 1, y + row + cell - 1], fill=color)

def _draw_stripes(draw, x, y, w, h, palette, size_factor):
    stripe_w = int(20 * size_factor)
    for i, col in enumerate(range(0, w, stripe_w)):
        color = palette[i % len(palette)]
        draw.rectangle([x + col, y, x + col + stripe_w - 1, y + h], fill=color)

def _draw_diamonds(draw, x, y, w, h, palette, density, size_factor):
    diamond_size = int(25 * size_factor)
    spacing = int(diamond_size * 2.5 / max(density, 0.3))
    c1 = palette[1] if len(palette) > 1 else (255, 215, 0)
    c2 = palette[2] if len(palette) > 2 else (0, 100, 0)
    for row in range(0, h, spacing):
        offset = (row // spacing % 2) * (spacing // 2)
        for col in range(0, w, spacing):
            cx = x + col + offset + spacing // 2
            cy = y + row + spacing // 2
            s = diamond_size
            color = c1 if (row + col) % 2 == 0 else c2
            draw.polygon([(cx, cy-s), (cx+s, cy), (cx, cy+s), (cx-s, cy)], fill=color)
            # Inner diamond
            si = s // 2
            inner_color = palette[3] if len(palette) > 3 else palette[0]
            draw.polygon([(cx, cy-si), (cx+si, cy), (cx, cy+si), (cx-si, cy)], fill=inner_color)

def _draw_zigzag(draw, x, y, w, h, palette, size_factor):
    amp = int(20 * size_factor)
    period = int(40 * size_factor)
    for row in range(0, h, amp * 3):
        color = palette[row // (amp * 3) % len(palette)]
        points = []
        for col in range(0, w + period, period // 2):
            py = y + row + (amp if (col // (period // 2)) % 2 == 0 else 0)
            points.append((x + col, py))
        if len(points) >= 2:
            for i in range(len(points) - 1):
                draw.line([points[i], points[i+1]], fill=color, width=3)

def _draw_floral(draw, x, y, w, h, palette, density, size_factor):
    flower_size = int(20 * size_factor)
    spacing = int(flower_size * 4 / max(density, 0.3))
    for row in range(spacing // 2, h, spacing):
        offset = (row // spacing % 2) * (spacing // 2)
        for col in range(spacing // 2, w, spacing):
            cx = x + col + offset
            cy = y + row
            # Petals
            petal_color = palette[1] if len(palette) > 1 else (255, 215, 0)
            center_color = palette[2] if len(palette) > 2 else (255, 100, 0)
            for angle in range(0, 360, 45):
                rad = math.radians(angle)
                px = cx + int(flower_size * 0.7 * math.cos(rad))
                py = cy + int(flower_size * 0.7 * math.sin(rad))
                draw.ellipse([px - flower_size//3, py - flower_size//3, px + flower_size//3, py + flower_size//3], fill=petal_color)
            # Center
            draw.ellipse([cx - flower_size//4, cy - flower_size//4, cx + flower_size//4, cy + flower_size//4], fill=center_color)

def _draw_temple(draw, x, y, w, h, palette, density, size_factor):
    temple_w = int(40 * size_factor)
    temple_h = int(60 * size_factor)
    spacing = int(temple_w * 2.5 / max(density, 0.3))
    c1 = palette[1] if len(palette) > 1 else (255, 215, 0)
    c2 = palette[2] if len(palette) > 2 else (0, 100, 0)
    for col in range(spacing // 2, w, spacing):
        cx = x + col
        cy = y + h - temple_h
        # Temple base
        draw.rectangle([cx - temple_w//2, cy + temple_h//2, cx + temple_w//2, cy + temple_h], fill=c1)
        # Temple body
        draw.rectangle([cx - temple_w//3, cy + temple_h//4, cx + temple_w//3, cy + temple_h//2], fill=c1)
        # Temple top (triangle)
        draw.polygon([(cx - temple_w//3, cy + temple_h//4), (cx, cy), (cx + temple_w//3, cy + temple_h//4)], fill=c2)
        # Kalash
        draw.ellipse([cx - 4, cy - 8, cx + 4, cy], fill=c2)

def _draw_paisley(draw, x, y, w, h, palette, density, size_factor):
    paisley_size = int(25 * size_factor)
    spacing = int(paisley_size * 4 / max(density, 0.3))
    c1 = palette[1] if len(palette) > 1 else (255, 215, 0)
    c2 = palette[2] if len(palette) > 2 else (0, 100, 0)
    for row in range(spacing // 2, h, spacing):
        offset = (row // spacing % 2) * (spacing // 2)
        for col in range(spacing // 2, w, spacing):
            cx = x + col + offset
            cy = y + row
            # Teardrop shape
            draw.ellipse([cx - paisley_size, cy - paisley_size, cx + paisley_size, cy + paisley_size//2], fill=c1)
            draw.polygon([(cx, cy - paisley_size), (cx + paisley_size//2, cy - paisley_size * 2), (cx - paisley_size//3, cy - paisley_size)], fill=c1)
            # Inner detail
            draw.ellipse([cx - paisley_size//2, cy - paisley_size//2, cx + paisley_size//2, cy + paisley_size//4], fill=c2)

def _apply_bilateral_symmetry(img):
    w, h = img.size
    left_half = img.crop((0, 0, w // 2, h))
    right_half = left_half.transpose(Image.FLIP_LEFT_RIGHT)
    result = Image.new('RGB', (w, h))
    result.paste(left_half, (0, 0))
    result.paste(right_half, (w // 2, 0))
    return result

def _apply_radial_symmetry(img):
    return _apply_bilateral_symmetry(img)

def _apply_rotational_symmetry(img):
    w, h = img.size
    quarter = img.crop((0, 0, w // 2, h // 2))
    result = Image.new('RGB', (w, h))
    result.paste(quarter, (0, 0))
    result.paste(quarter.transpose(Image.FLIP_LEFT_RIGHT), (w // 2, 0))
    result.paste(quarter.transpose(Image.FLIP_TOP_BOTTOM), (0, h // 2))
    result.paste(quarter.transpose(Image.FLIP_LEFT_RIGHT).transpose(Image.FLIP_TOP_BOTTOM), (w // 2, h // 2))
    return result

def _add_textile_texture(img):
    """Add subtle woven texture."""
    w, h = img.size
    texture = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(texture)
    # Horizontal threads
    for y in range(0, h, 3):
        draw.line([(0, y), (w, y)], fill=(0, 0, 0, 15), width=1)
    # Vertical threads
    for x in range(0, w, 3):
        draw.line([(x, 0), (x, h)], fill=(0, 0, 0, 10), width=1)
    img_rgba = img.convert('RGBA')
    result = Image.alpha_composite(img_rgba, texture)
    return result.convert('RGB')

async def generate_design_service(user_id, motif, region, colors, symmetry, density, complexity, motif_size, text_prompt=None, reference_image=None):
    """Generate design variations."""
    settings_module = __import__('app.core.config', fromlist=['get_settings'])
    settings = settings_module.get_settings()
    
    variations = []
    num_variations = 4
    
    for i in range(num_variations):
        seed = random.randint(0, 999999)
        img = generate_textile_pattern(
            width=512, height=512,
            motif=motif, region=region, colors=colors,
            symmetry=symmetry, density=density,
            complexity=complexity, motif_size=motif_size,
            seed=seed + i * 1000,
        )
        
        # Save image
        design_id = str(uuid.uuid4())
        filename = f"{design_id}.png"
        filepath = os.path.join("generated_outputs", filename)
        img.save(filepath, "PNG")
        
        # Convert to base64 for immediate display
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        variations.append({
            "id": design_id,
            "variation_index": i + 1,
            "image_url": f"/static/{filename}",
            "image_base64": f"data:image/png;base64,{img_base64}",
            "parameters": {
                "motif": motif,
                "region": region,
                "colors": colors if colors else REGION_PALETTES.get(region, []),
                "symmetry": symmetry,
                "density": density,
                "complexity": complexity,
                "motif_size": motif_size,
                "seed": seed + i * 1000,
            },
            "is_demo": settings.demo_mode,
        })
    
    # Save to database if available
    from app.core.database import get_supabase_client
    supabase = get_supabase_client()
    if supabase:
        try:
            for v in variations:
                supabase.table("generated_designs").insert({
                    "id": v["id"],
                    "user_id": user_id,
                    "title": f"{motif.title()} {region.title()} Design",
                    "image_url": v["image_url"],
                    "parameters": v["parameters"],
                    "region": region,
                    "motif_type": motif,
                    "is_favorite": False,
                }).execute()
        except Exception:
            pass
    
    return {
        "variations": variations,
        "count": len(variations),
        "demo_mode": settings.demo_mode,
        "message": "Designs generated using procedural pattern engine." if settings.demo_mode else "Designs generated using cGAN model.",
    }

def get_demo_designs(page=1, limit=20):
    """Return demo designs for when database is not configured."""
    return {
        "designs": [],
        "total": 0,
        "page": page,
        "limit": limit,
        "demo_mode": True,
    }
