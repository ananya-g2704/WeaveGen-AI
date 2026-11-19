"""Production tools service."""
import os
import uuid

COST_ESTIMATES = {
    "saree": {"cotton": {"simple": 2500, "medium": 4500, "complex": 8000}, "silk": {"simple": 8000, "medium": 15000, "complex": 35000}},
    "dupatta": {"cotton": {"simple": 800, "medium": 1500, "complex": 3000}, "silk": {"simple": 3000, "medium": 6000, "complex": 12000}},
    "fabric": {"cotton": {"simple": 300, "medium": 600, "complex": 1200}, "silk": {"simple": 1500, "medium": 3000, "complex": 6000}},
    "stole": {"cotton": {"simple": 500, "medium": 1000, "complex": 2000}, "silk": {"simple": 2000, "medium": 4000, "complex": 8000}},
    "lehenga": {"cotton": {"simple": 3000, "medium": 6000, "complex": 12000}, "silk": {"simple": 12000, "medium": 25000, "complex": 50000}},
    "kurta_fabric": {"cotton": {"simple": 400, "medium": 800, "complex": 1500}, "silk": {"simple": 2000, "medium": 4000, "complex": 8000}},
}

async def generate_design_specs(design_id, product_type, user_id):
    """Generate design specifications."""
    specs = {
        "design_id": design_id,
        "product_type": product_type,
        "specifications": {
            "dimensions": _get_product_dimensions(product_type),
            "color_codes": "Extract from design analysis",
            "pattern_repeat": {"horizontal": "Based on design", "vertical": "Based on design"},
            "recommended_fabric": ["Cotton", "Silk", "Tussar"],
            "weave_recommendation": "Based on pattern complexity",
        },
        "notes": [
            "These specifications are AI-generated estimates.",
            "Consult with a master weaver for production-ready specifications.",
            "Actual warp-weft details depend on loom type and yarn count.",
        ],
    }
    return specs

def _get_product_dimensions(product_type):
    dimensions = {
        "saree": {"length": "5.5 meters", "width": "1.15 meters", "pallu_length": "0.75 meters", "border_width": "3-6 inches"},
        "dupatta": {"length": "2.5 meters", "width": "1 meter", "border_width": "1-3 inches"},
        "fabric": {"length": "1 meter (per unit)", "width": "1.15 meters"},
        "stole": {"length": "2 meters", "width": "0.5 meters", "border_width": "1-2 inches"},
        "lehenga": {"length": "3-4 meters (circumference)", "width": "1 meter (height)", "border_width": "4-8 inches"},
        "kurta_fabric": {"length": "2.5 meters", "width": "1.15 meters"},
    }
    return dimensions.get(product_type, dimensions["saree"])

async def estimate_production_cost(product_type, fabric_type, complexity, region):
    """Estimate production cost (indicative only)."""
    product_costs = COST_ESTIMATES.get(product_type, COST_ESTIMATES["saree"])
    fabric_costs = product_costs.get(fabric_type, product_costs.get("cotton", {}))
    base_cost = fabric_costs.get(complexity, 5000)
    
    # Regional factor
    region_factors = {
        "kanchipuram": 1.3, "patola": 1.5, "baluchari": 1.2,
        "pochampally": 1.0, "sambalpuri": 1.0, "ilkal": 0.9, "mangalagiri": 0.8,
    }
    factor = region_factors.get(region, 1.0)
    estimated = int(base_cost * factor)
    
    return {
        "estimated_cost_inr": estimated,
        "cost_range": {"min": int(estimated * 0.7), "max": int(estimated * 1.4)},
        "product_type": product_type,
        "fabric_type": fabric_type,
        "complexity": complexity,
        "region": region,
        "disclaimer": "This is an indicative estimate based on configurable assumptions. Actual costs vary significantly based on yarn quality, weaver expertise, loom type, and market conditions. This is NOT a manufacturer quotation.",
    }

async def export_pdf_report(design_id, user_id):
    """Export design specifications as PDF."""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.pdfgen import canvas
        from reportlab.lib.units import inch
    except ImportError:
        return {"error": "ReportLab not installed. Install with: pip install reportlab"}
    
    filename = f"design_report_{design_id[:8]}.pdf"
    filepath = os.path.join("generated_outputs", filename)
    
    c = canvas.Canvas(filepath, pagesize=A4)
    width, height = A4
    
    # Header
    c.setFont("Helvetica-Bold", 20)
    c.drawString(1 * inch, height - 1 * inch, "WeaveGen AI - Design Report")
    
    c.setFont("Helvetica", 12)
    c.drawString(1 * inch, height - 1.5 * inch, f"Design ID: {design_id}")
    
    # Specifications
    c.setFont("Helvetica-Bold", 14)
    c.drawString(1 * inch, height - 2.5 * inch, "Design Specifications")
    
    c.setFont("Helvetica", 11)
    y = height - 3 * inch
    specs = [
        "Product Type: Based on selection",
        "Recommended Fabric: Cotton / Silk",
        "Pattern Complexity: Based on design parameters",
        "Symmetry: Based on design parameters",
        "",
        "Note: These are AI-generated estimates.",
        "Consult with a master weaver for production specifications.",
    ]
    for line in specs:
        c.drawString(1.2 * inch, y, line)
        y -= 0.3 * inch
    
    # Disclaimer
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(1 * inch, 1 * inch, "Generated by WeaveGen AI. For reference purposes only.")
    
    c.save()
    
    return {"file_path": filepath, "filename": filename}
