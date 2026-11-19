import React, { useState } from 'react';
import { 
  Eye, 
  Shirt, 
  Sparkles, 
  Download, 
  Sliders, 
  Layers, 
  ZoomIn, 
  Maximize2, 
  Check, 
  ArrowRight,
  RotateCcw,
  Palette
} from 'lucide-react';
import { TEXTILE_PRODUCTS } from '../../services/designGenerationService';

export default function ProductVisualizationPage({ onSelectTab, initialPattern = null }) {
  // Default sample pattern if user navigated directly without generating
  const defaultPattern = {
    title: 'Kanchipuram Temple Heritage',
    region: 'Tamil Nadu',
    weave: 'Korvai Silk',
    primaryColor: '#7B1113',
    zariColor: '#D4AF37',
    accentColor: '#0D4D4D',
  };

  const pattern = initialPattern || defaultPattern;

  const [selectedProduct, setSelectedProduct] = useState('saree');
  const [activeView, setActiveView] = useState('full'); // 'full', 'pallu', 'texture'
  const [borderWidth, setBorderWidth] = useState(48); // pixels in simulation
  const [contrastPallu, setContrastPallu] = useState(true);
  const [palluColor, setPalluColor] = useState('#0D4D4D'); // Deep teal contrast for saree
  const [isDownloading, setIsDownloading] = useState(false);

  // Download composited SVG drape
  const handleDownloadDrape = () => {
    setIsDownloading(true);
    setTimeout(() => {
      const svgElement = document.getElementById('garment-drape-svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `weavegen_${selectedProduct}_visualization.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setIsDownloading(false);
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-heritage-sand">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-heritage-cream text-heritage-maroon border border-heritage-sand font-semibold">
              Module 07 & 09
            </span>
            <span className="text-xs font-mono text-heritage-deepTeal font-semibold">
              2D Garment Draping Engine
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-heritage-deepTeal mt-1">
            Product Visualization & Draping
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans">
            Composite synthesized patterns onto traditional Indian garments with precise Pallu, Body, and Border alignment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('generate')}
            className="px-3.5 py-2 bg-white hover:bg-heritage-sand/40 border border-heritage-sand rounded-xl text-xs font-semibold text-slate-700 hover:text-heritage-maroon transition-colors"
          >
            ← Generate Different Pattern
          </button>
          <button
            onClick={handleDownloadDrape}
            disabled={isDownloading}
            className="px-4 py-2 bg-heritage-deepTeal hover:bg-heritage-teal text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Exporting...' : 'Export Drape'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls (Left) + Visualizer Canvas (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Product & View Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Pattern Card */}
          <div className="bg-white border border-heritage-sand rounded-2xl p-5 shadow-xs space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-maroon font-semibold block">
              Active Woven Pattern
            </span>
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl shadow-inner border border-heritage-gold/30 flex items-center justify-center text-white"
                style={{ backgroundColor: pattern.primaryColor || '#7B1113' }}
              >
                <Sparkles className="w-6 h-6 text-heritage-gold" />
              </div>
              <div className="truncate">
                <h4 className="text-sm font-serif font-bold text-heritage-deepTeal truncate">
                  {pattern.title || 'Selected Design'}
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  {pattern.region} • {pattern.weave}
                </p>
              </div>
            </div>
          </div>

          {/* 1. Product Selection */}
          <div className="bg-white border border-heritage-sand rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              1. Select Textile Product
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {TEXTILE_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedProduct === prod.id
                      ? 'border-heritage-deepTeal bg-heritage-deepTeal/5 ring-1 ring-heritage-deepTeal text-heritage-deepTeal font-bold shadow-2xs'
                      : 'border-heritage-sand bg-heritage-cream/20 hover:bg-heritage-sand/40 text-slate-700 text-xs'
                  }`}
                >
                  <div className="text-xs font-serif">{prod.label}</div>
                  <div className="text-[9px] text-slate-500 truncate">{prod.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Draping Camera / View Selection */}
          <div className="bg-white border border-heritage-sand rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              2. Inspection Camera View
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'full', label: 'Full Drape', icon: Eye },
                { id: 'pallu', label: 'Pallu / Border', icon: ZoomIn },
                { id: 'texture', label: 'Yarn Weft', icon: Maximize2 },
              ].map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      activeView === view.id
                        ? 'border-heritage-maroon bg-heritage-maroon/5 ring-1 ring-heritage-maroon text-heritage-maroon font-bold shadow-2xs'
                        : 'border-heritage-sand text-slate-600 hover:bg-heritage-sand/30 text-xs'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px]">{view.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Drape Customization Controls */}
          <div className="bg-white border border-heritage-sand rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              3. Garment Structure Adjustments
            </h3>

            {/* Border Width Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Zari Border Width:</span>
                <span className="font-mono text-heritage-maroon font-bold">{borderWidth / 4} inches</span>
              </div>
              <input
                type="range"
                min="24"
                max="80"
                step="4"
                value={borderWidth}
                onChange={(e) => setBorderWidth(Number(e.target.value))}
                className="w-full accent-heritage-maroon cursor-pointer"
              />
            </div>

            {/* Contrast Pallu Toggle (For Saree) */}
            {selectedProduct === 'saree' && (
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="contrast-pallu" className="text-xs font-medium text-slate-700 cursor-pointer">
                    Contrasting Korvai Pallu:
                  </label>
                  <input
                    id="contrast-pallu"
                    type="checkbox"
                    checked={contrastPallu}
                    onChange={(e) => setContrastPallu(e.target.checked)}
                    className="w-4 h-4 accent-heritage-deepTeal rounded cursor-pointer"
                  />
                </div>

                {contrastPallu && (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">Pallu Dye Color:</span>
                    <div className="flex items-center gap-1.5">
                      {['#0D4D4D', '#000080', '#4B0082', '#006400', '#1E0507'].map((c, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPalluColor(c)}
                          className={`w-5 h-5 rounded-full border-2 transition-transform ${
                            palluColor === c ? 'scale-125 border-heritage-gold shadow-xs' : 'border-white'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Forward to Production Tools */}
          <div className="p-4 bg-heritage-cream/60 border border-heritage-sand rounded-2xl flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold text-heritage-deepTeal block">Ready for production?</span>
              <span className="text-slate-500 text-[11px]">Calculate costs & weave repeat specs</span>
            </div>
            <button
              onClick={() => onSelectTab('production')}
              className="px-3 py-1.5 bg-heritage-deepTeal text-white text-xs font-semibold rounded-lg hover:bg-heritage-teal transition-colors flex items-center gap-1 shadow-2xs"
            >
              <span>Specs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Right Column: Garment Visualizer Canvas */}
        <div className="lg:col-span-8 bg-white border-2 border-heritage-sand rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-heritage-sand/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-heritage-deepTeal font-bold uppercase tracking-wider">
                Interactive 2D Compositing Canvas
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">
              {selectedProduct.toUpperCase()} • {activeView.toUpperCase()} VIEW
            </span>
          </div>

          {/* Canvas Render Frame */}
          <div className="w-full aspect-[4/3] bg-[#EFE8DA] rounded-2xl border border-heritage-sand shadow-inner overflow-hidden relative flex items-center justify-center p-4">
            
            <svg
              id="garment-drape-svg"
              className="w-full h-full max-h-[500px] drop-shadow-2xl transition-all duration-300"
              viewBox="0 0 600 450"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Simulated Woven Pattern Texture */}
                <pattern id="woven-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <rect width="30" height="30" fill={pattern.primaryColor || '#7B1113'} />
                  {/* Gold Butta Dots */}
                  <polygon points="15,6 20,15 15,24 10,15" fill={pattern.zariColor || '#D4AF37'} opacity="0.85" />
                  <circle cx="15" cy="15" r="2" fill={pattern.accentColor || '#0D4D4D'} />
                </pattern>

                {/* Pallu Pattern Texture */}
                <pattern id="pallu-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect width="40" height="40" fill={contrastPallu ? palluColor : (pattern.primaryColor || '#7B1113')} />
                  <polygon points="20,5 35,20 20,35 5,20" fill={pattern.zariColor || '#D4AF37'} opacity="0.9" />
                  <circle cx="20" cy="20" r="4" fill="#FFFFFF" opacity="0.7" />
                </pattern>

                {/* Zari Border Texture */}
                <linearGradient id="zari-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B38728" />
                  <stop offset="50%" stopColor="#FBF5B7" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>

                {/* Realistic Fabric Shadow Overlay */}
                <linearGradient id="fabric-folds" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
                  <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.08" />
                  <stop offset="50%" stopColor="#000000" stopOpacity="0.3" />
                  <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              {/* RENDER BASED ON VIEW AND PRODUCT */}
              {selectedProduct === 'saree' ? (
                activeView === 'full' ? (
                  // Full Saree Drape Simulation
                  <g>
                    {/* Pleated Body Section */}
                    <path d="M 50 60 Q 250 50 420 60 L 420 380 Q 250 395 50 380 Z" fill="url(#woven-pattern)" />
                    
                    {/* Pallu Section (Left / Draped over shoulder) */}
                    <path d="M 420 60 Q 500 50 550 80 L 550 380 Q 480 390 420 380 Z" fill="url(#pallu-pattern)" />
                    
                    {/* Top Zari Border */}
                    <path d="M 50 60 Q 250 50 550 80 L 550 95 Q 250 65 50 75 Z" fill="url(#zari-gradient)" />

                    {/* Bottom Heavy Zari Border */}
                    <rect x="50" y={380 - borderWidth} width="500" height={borderWidth} fill="url(#zari-gradient)" />

                    {/* Temple Triangles along bottom border */}
                    {Array.from({ length: 25 }).map((_, i) => (
                      <polygon 
                        key={i} 
                        points={`${50 + i * 20},${380 - borderWidth} ${60 + i * 20},${380 - borderWidth - 12} ${70 + i * 20},${380 - borderWidth}`}
                        fill={pattern.zariColor || '#D4AF37'}
                      />
                    ))}

                    {/* Fabric Folds Shading */}
                    <path d="M 50 60 Q 250 50 550 80 L 550 380 Q 250 395 50 380 Z" fill="url(#fabric-folds)" opacity="0.6" />
                  </g>
                ) : activeView === 'pallu' ? (
                  // Close-Up of Pallu and Heavy Zari Work
                  <g>
                    <rect x="30" y="30" width="540" height="390" fill="url(#pallu-pattern)" rx="12" />
                    <rect x="30" y="30" width="540" height="70" fill="url(#zari-gradient)" />
                    <rect x="30" y="350" width="540" height="70" fill="url(#zari-gradient)" />

                    {/* Grand Center Medallion on Pallu */}
                    <circle cx="300" cy="210" r="85" fill="none" stroke="url(#zari-gradient)" strokeWidth="6" />
                    <circle cx="300" cy="210" r="60" fill="none" stroke="url(#zari-gradient)" strokeWidth="2" strokeDasharray="6 3" />
                    <polygon points="300,150 340,210 300,270 260,210" fill="url(#zari-gradient)" opacity="0.8" />
                    <circle cx="300" cy="210" r="18" fill={pattern.primaryColor || '#7B1113'} />
                  </g>
                ) : (
                  // Zoomed Thread & Texture View
                  <g>
                    <rect x="30" y="30" width="540" height="390" fill={pattern.primaryColor || '#7B1113'} rx="12" />
                    {Array.from({ length: 30 }).map((_, r) => (
                      <line key={r} x1="30" y1={30 + r * 13} x2="570" y2={30 + r * 13} stroke="#000000" strokeWidth="1" opacity="0.25" />
                    ))}
                    {Array.from({ length: 42 }).map((_, c) => (
                      <line key={c} x1={30 + c * 13} y1="30" x2={30 + c * 13} y2="420" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.2" />
                    ))}
                    {/* Macro Mayil Peacock Silhouette */}
                    <g transform="translate(230, 140) scale(1.6)" fill="url(#zari-gradient)">
                      <path d="M50 10 C30 10 10 30 10 55 C10 80 35 95 55 95 C65 95 80 85 85 70 C90 55 80 35 65 25 C55 17 55 10 50 10 Z" />
                      <circle cx="48" cy="40" r="4" fill="#3B0709" />
                    </g>
                  </g>
                )
              ) : (
                // Generic Garment / Dupatta / Yardage Render
                <g>
                  <rect x="60" y="40" width="480" height="370" fill="url(#woven-pattern)" rx="8" />
                  {/* 4-Side Framing Borders */}
                  <rect x="60" y="40" width="480" height="28" fill="url(#zari-gradient)" />
                  <rect x="60" y="382" width="480" height="28" fill="url(#zari-gradient)" />
                  <rect x="60" y="40" width="28" height="370" fill="url(#zari-gradient)" />
                  <rect x="512" y="40" width="28" height="370" fill="url(#zari-gradient)" />
                  {/* Shading */}
                  <rect x="60" y="40" width="480" height="370" fill="url(#fabric-folds)" opacity="0.4" rx="8" />
                </g>
              )}

              {/* Watermark Label */}
              <text x="300" y="435" fill="#4A0E17" opacity="0.7" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
                WeaveGen AI • 2D Drape Simulation Matrix • Indicative Visual
              </text>
            </svg>

          </div>

          {/* Bottom Spec Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-3 bg-heritage-cream/40 border border-heritage-sand rounded-xl">
              <span className="text-[10px] text-slate-400 block font-mono">Draped Product</span>
              <span className="font-serif font-bold text-heritage-deepTeal">{selectedProduct.toUpperCase()}</span>
            </div>
            <div className="p-3 bg-heritage-cream/40 border border-heritage-sand rounded-xl">
              <span className="text-[10px] text-slate-400 block font-mono">Zari Width</span>
              <span className="font-serif font-bold text-heritage-maroon">{borderWidth / 4} Inches</span>
            </div>
            <div className="p-3 bg-heritage-cream/40 border border-heritage-sand rounded-xl">
              <span className="text-[10px] text-slate-400 block font-mono">Contrast Pallu</span>
              <span className="font-serif font-bold text-emerald-700">{contrastPallu ? 'Enabled' : 'Monochrome'}</span>
            </div>
            <div className="p-3 bg-heritage-cream/40 border border-heritage-sand rounded-xl">
              <span className="text-[10px] text-slate-400 block font-mono">Compositing Mode</span>
              <span className="font-serif font-bold text-slate-700">2D Vector Mesh</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
