/**
 * WeaveGen AI - Design Generation API Service
 * 
 * Provides an interface that communicates with the FastAPI backend endpoint (/api/designs/generate),
 * with a clearly labelled procedural demo fallback when the backend is offline.
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const TEXTILE_PRODUCTS = [
  { id: 'saree', label: 'Saree', desc: 'Traditional 6-yard drape with Pallu & Border' },
  { id: 'dupatta', label: 'Dupatta', desc: 'Lightweight shawl with 4-side framing' },
  { id: 'fabric', label: 'Fabric (per meter)', desc: 'Continuous running yardage repeat' },
  { id: 'stole', label: 'Stole', desc: 'Narrow decorative scarf' },
  { id: 'lehenga', label: 'Lehenga', desc: 'Flared skirt panel repeat' },
  { id: 'other', label: 'Other Garment', desc: 'Custom unstitched textile' },
];

export const TEXTILE_REGIONS = [
  { 
    id: 'tamil_nadu', 
    name: 'Tamil Nadu', 
    style: 'Kanchipuram Silk',
    motifs: ['Peacock (Mayil)', 'Temple Border (Gopuram)', 'Mango (Manga)', 'Rudraksham', 'Checks (Kattam)'],
    palettes: [
      { name: 'Kanchi Royal', colors: ['#8B0000', '#D4AF37', '#006400', '#4B0082'] },
      { name: 'Crimson & Zari', colors: ['#7B1113', '#D4AF37', '#FDFBF7'] }
    ]
  },
  { 
    id: 'telangana', 
    name: 'Telangana', 
    style: 'Pochampally Ikat',
    motifs: ['Ikat Diamond', 'Chevron Zigzag', 'Square Grid', 'Arrowhead'],
    palettes: [
      { name: 'Pochampally Vibrant', colors: ['#000080', '#D4AF37', '#CC0000', '#FFFFFF'] },
      { name: 'Indigo & Madder', colors: ['#1B263B', '#8B0000', '#E0E1DD'] }
    ]
  },
  { 
    id: 'gujarat', 
    name: 'Gujarat', 
    style: 'Patan Patola Double Ikat',
    motifs: ['Nari Kunj (Dancers)', 'Popat Kunj (Parrots)', 'Paan (Betel Leaf)', 'Chhabdi (Baskets)'],
    palettes: [
      { name: 'Patola Heritage', colors: ['#CC0000', '#D4AF37', '#006400', '#000000'] }
    ]
  },
  { 
    id: 'west_bengal', 
    name: 'West Bengal', 
    style: 'Baluchari Jacquard',
    motifs: ['Mythological Scene', 'Kalka (Paisley)', 'Dancing Courtiers', 'Floral Vines'],
    palettes: [
      { name: 'Baluchari Silk', colors: ['#800020', '#D4AF37', '#4B0082', '#8B4513'] }
    ]
  },
  { 
    id: 'andhra_pradesh', 
    name: 'Andhra Pradesh', 
    style: 'Mangalagiri Cotton',
    motifs: ['Nizam Border', 'Temple Zari', 'Plain Body with Zari Stripes'],
    palettes: [
      { name: 'Mangalagiri Classic', colors: ['#006B3A', '#D4AF37', '#FFFFFF', '#8B4513'] }
    ]
  },
  { 
    id: 'karnataka', 
    name: 'Karnataka', 
    style: 'Ilkal Tope Teni',
    motifs: ['Tope Teni Join', 'Gopura Tower', 'Kasuti Embroidery Motifs'],
    palettes: [
      { name: 'Ilkal Traditional', colors: ['#CC0000', '#FFFFFF', '#D4AF37', '#4B0082'] }
    ]
  },
  { 
    id: 'odisha', 
    name: 'Odisha', 
    style: 'Sambalpuri Bandha',
    motifs: ['Shankha (Conch)', 'Chakra (Wheel)', 'Lotus (Padma)', 'Fish (Matsya)'],
    palettes: [
      { name: 'Sambalpuri Coastal', colors: ['#8B0000', '#FFFFFF', '#000000', '#D4AF37'] }
    ]
  },
  { 
    id: 'other', 
    name: 'Other Regions', 
    style: 'Pan-Indian Fusion',
    motifs: ['Classic Paisley', 'Floral Lattice', 'Geometrical Checks', 'Stripes'],
    palettes: [
      { name: 'Heritage Gold & Maroon', colors: ['#7B1113', '#D4AF37', '#0D4D4D', '#FDFBF7'] }
    ]
  },
];

export const MOTIF_OPTIONS = [
  'Paisley / Mango (Manga)',
  'Temple Border (Gopuram)',
  'Peacock (Mayil)',
  'Ikat Diamond Lattice',
  'Shankha & Chakra',
  'Sacred Lotus',
  'Dancing Figures (Nari Kunj)',
  'Geometric Checks & Chevron',
];

export const DENSITY_OPTIONS = [
  { id: 'low', label: 'Sparse / Minimal', desc: 'Clean negative space with isolated feature buttas' },
  { id: 'medium', label: 'Balanced (Standard)', desc: 'Harmonious distribution of borders and ground motifs' },
  { id: 'high', label: 'Dense / Intricate', desc: 'Heavy all-over zari or double-ikat coverage' },
];

export const SYMMETRY_OPTIONS = [
  { id: 'bilateral', label: 'Bilateral Symmetry', desc: 'Mirrored across vertical center axis (Traditional Korvai)' },
  { id: 'rotational', label: 'Rotational / 4-Fold', desc: 'Quadrilateral symmetry centered around a medallion' },
  { id: 'asymmetric', label: 'Asymmetric Modern', desc: 'Contemporary balance with progressive border flow' },
];

export const DESIGN_STYLES = [
  { id: 'traditional', label: 'Traditional Heritage', desc: 'Strict adherence to historical weaving grammar' },
  { id: 'contemporary', label: 'Contemporary Fusion', desc: 'Traditional motifs reimagined with modern palettes' },
  { id: 'minimalist', label: 'Minimalist Artisan', desc: 'Subtle zari accents on rich solid textures' },
];

/**
 * Procedural SVG Pattern Generator for Demo Mode
 * Clearly identified as procedural simulation when no trained cGAN checkpoint is active.
 */
function generateDemoPatternSvg(params, variationIndex) {
  const primaryColor = params.colors?.[0] || '#7B1113';
  const secondaryColor = params.colors?.[1] || '#D4AF37';
  const accentColor = params.colors?.[2] || '#0D4D4D';
  
  // Variation shifts
  const rotationAngle = (variationIndex - 1) * 45;
  const scale = 0.85 + (variationIndex * 0.08);

  return `
    <svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-${variationIndex}" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${secondaryColor}" stroke-width="0.7" opacity="0.3"/>
          <circle cx="20" cy="20" r="1.5" fill="${secondaryColor}" opacity="0.6"/>
        </pattern>
      </defs>
      
      <!-- Ground Fabric -->
      <rect width="400" height="400" fill="${primaryColor}" />
      <rect width="400" height="400" fill="url(#grid-${variationIndex})" />

      <!-- Border Bands -->
      <rect x="0" y="0" width="400" height="45" fill="${secondaryColor}" opacity="0.9" />
      <rect x="0" y="355" width="400" height="45" fill="${secondaryColor}" opacity="0.9" />
      <line x1="0" y1="50" x2="400" y2="50" stroke="${accentColor}" stroke-width="3" stroke-dasharray="8 4" />
      <line x1="0" y1="350" x2="400" y2="350" stroke="${accentColor}" stroke-width="3" stroke-dasharray="8 4" />

      <!-- Central Motif Composite -->
      <g transform="translate(200, 200) rotate(${rotationAngle}) scale(${scale})" text-anchor="middle">
        <!-- Outer Diamond -->
        <polygon points="0,-100 100,0 0,100 -100,0" fill="none" stroke="${secondaryColor}" stroke-width="3" />
        <polygon points="0,-85 85,0 0,85 -85,0" fill="${accentColor}" fill-opacity="0.25" stroke="${secondaryColor}" stroke-width="1.5" />
        
        <!-- Sacred Geometry / Motif Center -->
        <circle cx="0" cy="0" r="45" fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="2" />
        <circle cx="0" cy="0" r="30" fill="none" stroke="${secondaryColor}" stroke-width="1.5" stroke-dasharray="4 2" />
        <circle cx="0" cy="0" r="12" fill="${secondaryColor}" />
        
        <!-- Corner Kalash / Gopuram Accents -->
        <polygon points="0,-125 -15,-105 15,-105" fill="${secondaryColor}" />
        <polygon points="0,125 -15,105 15,105" fill="${secondaryColor}" />
        <polygon points="-125,0 -105,-15 -105,15" fill="${secondaryColor}" />
        <polygon points="125,0 105,-15 105,15" fill="${secondaryColor}" />
      </g>

      <!-- Label Watermark -->
      <text x="200" y="380" fill="#FFFFFF" opacity="0.8" font-size="10" font-family="monospace" text-anchor="middle">
        [DEMO SIMULATION • VARIATION ${variationIndex}]
      </text>
    </svg>
  `;
}

/**
 * Main Generation Service Call
 * Connects to FastAPI endpoint or falls back gracefully to 4 procedural demo variations
 */
export async function generateTextileDesign(formData) {
  // Check if real backend is available
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s quick ping

    const healthCheck = await fetch(`${API_BASE_URL}/api/health`, {
      signal: controller.signal,
    }).catch(() => null);

    clearTimeout(timeoutId);

    if (healthCheck && healthCheck.ok) {
      // Connect to real FastAPI cGAN backend
      const formPayload = new FormData();
      formPayload.append('product', formData.product);
      formPayload.append('region', formData.region);
      formPayload.append('motif', formData.motif);
      formPayload.append('density', formData.density);
      formPayload.append('symmetry', formData.symmetry);
      formPayload.append('style', formData.style);
      formPayload.append('colors', JSON.stringify(formData.colors));
      if (formData.referenceImage) {
        formPayload.append('reference_image', formData.referenceImage);
      }
      if (formData.prompt) {
        formPayload.append('text_prompt', formData.prompt);
      }

      const response = await fetch(`${API_BASE_URL}/api/designs/generate`, {
        method: 'POST',
        body: formPayload,
      });

      if (response.ok) {
        const data = await response.json();
        return {
          source: 'fastapi_cgan',
          variations: data.variations,
          isDemo: data.demo_mode || false,
          disclaimer: data.demo_mode 
            ? 'Running in backend demo mode (weights checkpoint pending training).' 
            : 'Generated using trained Conditional GAN weights.',
        };
      }
    }
  } catch (err) {
    console.warn('Backend not responding, switching to client procedural demo mode:', err);
  }

  // --- CLIENT-SIDE DEMO GENERATION FALLBACK ---
  // Simulate network latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const variations = [1, 2, 3, 4].map((vIdx) => {
    const svgCode = generateDemoPatternSvg(formData, vIdx);
    const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`;

    return {
      id: `demo-var-${Date.now()}-${vIdx}`,
      variationNumber: vIdx,
      title: `${formData.motif || 'Handloom'} Pattern — Var ${vIdx}`,
      region: formData.region || 'kanchipuram',
      product: formData.product || 'saree',
      density: formData.density || 'medium',
      symmetry: formData.symmetry || 'bilateral',
      colors: formData.colors || ['#7B1113', '#D4AF37', '#0D4D4D'],
      imagePreview: svgDataUrl,
      isDemo: true,
      parameters: {
        ...formData,
        seed: Math.floor(Math.random() * 999999) + vIdx * 100,
      },
    };
  });

  return {
    source: 'client_procedural_demo',
    isDemo: true,
    variations,
    disclaimer: 'Procedural Demo Pattern (Demo Mode — Not produced by a trained cGAN model. Architecture ready for FastAPI cGAN weights).',
  };
}
