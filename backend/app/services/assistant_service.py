"""Rule-based AI Design Assistant."""

DESIGN_KNOWLEDGE = {
    "motif_suggestions": {
        "kanchipuram": {
            "motifs": ["temple border", "peacock", "mango/paisley", "checks", "rudraksham", "coin dots"],
            "description": "Kanchipuram is known for temple-inspired borders, peacock and mango motifs with heavy zari work.",
        },
        "pochampally": {
            "motifs": ["ikat diamonds", "geometric squares", "chevrons", "zigzag lines", "arrow heads"],
            "description": "Pochampally features geometric ikat patterns created through resist-dyeing technique.",
        },
        "baluchari": {
            "motifs": ["mythological scenes", "kalka (paisley)", "dancing figures", "floral vines", "narrative panels"],
            "description": "Baluchari sarees are famous for elaborate Jacquard-woven mythological scenes.",
        },
        "patola": {
            "motifs": ["nari kunj (dancing girls)", "paan (leaf)", "vohra gaji", "popat kunj (parrots)", "chhabdi"],
            "description": "Patola uses double ikat technique with intricate geometric and figurative patterns.",
        },
        "sambalpuri": {
            "motifs": ["shankha (conch)", "chakra (wheel)", "phula (flower)", "fish", "deer"],
            "description": "Sambalpuri features bandha ikat patterns with nature-inspired traditional motifs.",
        },
        "ilkal": {
            "motifs": ["tope teni join", "kasuti embroidery", "temple gopura", "chariot", "geometric borders"],
            "description": "Ilkal sarees use the unique tope teni technique joining body and pallu.",
        },
        "mangalagiri": {
            "motifs": ["nizam border", "temple border", "plain body", "zari stripes", "minimal patterns"],
            "description": "Mangalagiri is known for lightweight cotton with elegant border patterns and minimal body design.",
        },
    },
    "color_suggestions": {
        "traditional": ["Maroon & Gold", "Red & Green", "Purple & Gold", "Navy & Silver", "Black & Red"],
        "festive": ["Hot Pink & Gold", "Orange & Green", "Red & Gold", "Royal Blue & Silver"],
        "contemporary": ["Teal & Copper", "Olive & Gold", "Dusty Rose & Cream", "Charcoal & Gold"],
        "pastel": ["Blush Pink & Ivory", "Mint & Cream", "Lavender & Silver", "Peach & Gold"],
    },
    "fabric_types": {
        "silk": "Lustrous, durable. Best for grand occasions. Takes rich colors well.",
        "cotton": "Breathable, comfortable. Great for daily wear. Good for block prints.",
        "linen": "Textured, cool. Suitable for summer. Takes natural dyes beautifully.",
        "tussar": "Raw silk with natural golden sheen. Eco-friendly. Perfect for contemporary designs.",
    },
}

RESPONSE_TEMPLATES = {
    "greeting": "Namaste! I'm your AI Design Assistant for WeaveGen. I can help you with:\n\n"
                "🎨 **Motif suggestions** for different textile regions\n"
                "🎭 **Color combinations** for various occasions\n"
                "🧵 **Regional design** inspiration and history\n"
                "✨ **Design tips** for creating unique patterns\n\n"
                "What would you like to explore?",
    "unknown": "I'd be happy to help with textile design questions! Try asking about:\n"
               "- Motif suggestions for a specific region (e.g., 'motifs for Kanchipuram')\n"
               "- Color combinations (e.g., 'traditional color palettes')\n"
               "- Regional textile traditions\n"
               "- Design tips and guidance",
}

def _find_region_in_message(message):
    message_lower = message.lower()
    for region in DESIGN_KNOWLEDGE["motif_suggestions"]:
        if region in message_lower:
            return region
    return None

async def get_assistant_response(message, context=None, user_id=None):
    """Generate rule-based assistant response."""
    msg = message.lower().strip()
    
    # Greeting
    if any(word in msg for word in ["hello", "hi", "hey", "namaste", "help", "start"]):
        return {"response": RESPONSE_TEMPLATES["greeting"], "suggestions": ["Show me Kanchipuram motifs", "Suggest color palettes", "Tell me about Pochampally"]}
    
    # Motif suggestions
    if any(word in msg for word in ["motif", "pattern", "design", "suggest"]):
        region = _find_region_in_message(message) or (context or {}).get("region")
        if region and region in DESIGN_KNOWLEDGE["motif_suggestions"]:
            info = DESIGN_KNOWLEDGE["motif_suggestions"][region]
            motif_list = "\n".join([f"  • {m}" for m in info["motifs"]])
            response = f"**{region.title()} Motif Suggestions:**\n\n{info['description']}\n\n**Popular motifs:**\n{motif_list}\n\n💡 **Tip:** Try combining 2-3 motifs with varying sizes for a rich design."
            return {"response": response, "suggestions": [f"Show {region} colors", "More motif ideas", "Design tips"]}
        else:
            all_regions = ", ".join(DESIGN_KNOWLEDGE["motif_suggestions"].keys())
            return {"response": f"I can suggest motifs for these regions: **{all_regions}**.\n\nWhich region interests you?", "suggestions": ["Kanchipuram motifs", "Pochampally motifs", "Patola motifs"]}
    
    # Color suggestions
    if any(word in msg for word in ["color", "colour", "palette", "shade"]):
        category = None
        for cat in DESIGN_KNOWLEDGE["color_suggestions"]:
            if cat in msg:
                category = cat
                break
        
        if category:
            colors = DESIGN_KNOWLEDGE["color_suggestions"][category]
            color_list = "\n".join([f"  🎨 {c}" for c in colors])
            return {"response": f"**{category.title()} Color Palettes:**\n\n{color_list}\n\n💡 **Tip:** Use a dominant color for 60% of the design, secondary for 30%, and accent for 10%.", "suggestions": ["Try another palette", "Design with these colors", "More color tips"]}
        else:
            categories = ", ".join(DESIGN_KNOWLEDGE["color_suggestions"].keys())
            return {"response": f"I have color palettes for: **{categories}**.\n\nWhich style would you like?", "suggestions": ["Traditional palettes", "Contemporary palettes", "Festive palettes"]}
    
    # Regional info
    region = _find_region_in_message(message)
    if region:
        info = DESIGN_KNOWLEDGE["motif_suggestions"][region]
        return {"response": f"**{region.title()} Textiles:**\n\n{info['description']}\n\n**Signature motifs:** {', '.join(info['motifs'])}\n\n🧵 Would you like motif suggestions or color palettes for {region.title()}?", "suggestions": [f"{region.title()} motifs", f"{region.title()} colors", "Compare regions"]}
    
    # Fabric info
    if any(word in msg for word in ["fabric", "silk", "cotton", "material", "cloth"]):
        fabric_info = "\n".join([f"**{k.title()}:** {v}" for k, v in DESIGN_KNOWLEDGE["fabric_types"].items()])
        return {"response": f"**Fabric Types for Handloom:**\n\n{fabric_info}", "suggestions": ["Best for wedding saree", "Daily wear fabrics", "Eco-friendly options"]}
    
    # Design tips
    if any(word in msg for word in ["tip", "advice", "guide", "how to"]):
        return {
            "response": "**Design Tips for Handloom Textiles:**\n\n"
                       "1. 🎯 **Balance:** Combine bold borders with subtle body patterns\n"
                       "2. 🎨 **Color Harmony:** Use complementary colors for contrast, analogous for subtlety\n"
                       "3. 🔄 **Symmetry:** Bilateral symmetry gives a traditional feel; break it for modern designs\n"
                       "4. 📐 **Pattern Density:** Dense for formal wear, sparse for casual\n"
                       "5. 🧵 **Regional Authenticity:** Study traditional motifs before creating variations\n\n"
                       "💡 Remember: AI-generated designs are starting points. Work with artisans for production-ready patterns.",
            "suggestions": ["Motif suggestions", "Color palettes", "Regional styles"],
        }
    
    return {"response": RESPONSE_TEMPLATES["unknown"], "suggestions": ["Show me motifs", "Color palettes", "Regional styles", "Design tips"]}
