import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  X, 
  Layers, 
  Palette, 
  Sliders, 
  MapPin, 
  Shirt, 
  Feather, 
  HelpCircle,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { 
  TEXTILE_PRODUCTS, 
  TEXTILE_REGIONS, 
  MOTIF_OPTIONS, 
  DENSITY_OPTIONS, 
  SYMMETRY_OPTIONS, 
  DESIGN_STYLES 
} from '../../services/designGenerationService';

export default function DesignForm({ onGenerate, isGenerating }) {
  // Form State
  const [product, setProduct] = useState('saree');
  const [region, setRegion] = useState('tamil_nadu');
  const [motif, setMotif] = useState(MOTIF_OPTIONS[0]);
  const [density, setDensity] = useState('medium');
  const [symmetry, setSymmetry] = useState('bilateral');
  const [style, setStyle] = useState('traditional');
  const [colors, setColors] = useState(['#7B1113', '#D4AF37', '#0D4D4D', '#FDFBF7']);
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);
  const [referencePreview, setReferencePreview] = useState(null);

  // Active region's presets
  const selectedRegionData = TEXTILE_REGIONS.find((r) => r.id === region) || TEXTILE_REGIONS[0];

  const handleRegionChange = (newRegionId) => {
    setRegion(newRegionId);
    const regionObj = TEXTILE_REGIONS.find((r) => r.id === newRegionId);
    if (regionObj && regionObj.palettes?.[0]) {
      setColors(regionObj.palettes[0].colors);
    }
    if (regionObj && regionObj.motifs?.[0]) {
      setMotif(regionObj.motifs[0]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please select a smaller image.');
        return;
      }
      setReferenceImage(file);
      const reader = new FileReader();
      reader.onload = (event) => setReferencePreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setReferenceImage(null);
    setReferencePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      product,
      region,
      motif,
      density,
      symmetry,
      style,
      colors,
      prompt,
      referenceImage,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-heritage-sand rounded-3xl p-6 sm:p-8 shadow-sm space-y-7">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-heritage-sand/80">
        <div>
          <h2 className="text-xl font-serif font-bold text-heritage-deepTeal">
            Pattern Conditioning Parameters
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Configure the latent conditioning vectors for the cGAN generative synthesis
          </p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-heritage-maroon/10 text-heritage-maroon flex items-center justify-center">
          <Sliders className="w-5 h-5" />
        </div>
      </div>

      {/* 1. Textile Product Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          1. Target Textile Product
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TEXTILE_PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              type="button"
              onClick={() => setProduct(prod.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                product === prod.id
                  ? 'border-heritage-deepTeal bg-heritage-deepTeal/5 ring-1 ring-heritage-deepTeal text-heritage-deepTeal font-semibold shadow-2xs'
                  : 'border-heritage-sand bg-heritage-cream/30 hover:bg-heritage-sand/40 text-slate-700'
              }`}
            >
              <div className="text-xs font-serif font-bold">{prod.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{prod.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Textile Region Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            2. Regional Textile Style
          </label>
          <span className="text-[11px] font-mono text-heritage-gold font-semibold">
            {selectedRegionData.style}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TEXTILE_REGIONS.map((reg) => (
            <button
              key={reg.id}
              type="button"
              onClick={() => handleRegionChange(reg.id)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                region === reg.id
                  ? 'border-heritage-maroon bg-heritage-maroon/5 ring-1 ring-heritage-maroon text-heritage-maroon font-semibold shadow-2xs'
                  : 'border-heritage-sand bg-heritage-cream/30 hover:bg-heritage-sand/40 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold">
                <MapPin className="w-3 h-3 text-heritage-gold flex-shrink-0" />
                <span className="truncate">{reg.name}</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{reg.style}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Motif Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          3. Traditional Motif Class
        </label>
        <div className="flex flex-wrap gap-2">
          {/* Show region-specific motifs first, then general */}
          {Array.from(new Set([...selectedRegionData.motifs, ...MOTIF_OPTIONS])).map((mot, mIdx) => (
            <button
              key={mIdx}
              type="button"
              onClick={() => setMotif(mot)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                motif === mot
                  ? 'bg-heritage-deepTeal text-white shadow-xs font-semibold'
                  : 'bg-white border border-heritage-sand text-slate-700 hover:bg-heritage-sand/50'
              }`}
            >
              {mot}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Color Palette Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          4. Colorway & Yarn Palette
        </label>
        
        {/* Region Recommended Palettes */}
        <div className="flex flex-wrap items-center gap-3">
          {selectedRegionData.palettes.map((p, pIdx) => (
            <button
              key={pIdx}
              type="button"
              onClick={() => setColors(p.colors)}
              className="flex items-center gap-2 p-2 bg-heritage-cream/50 border border-heritage-sand rounded-xl hover:border-slate-400 transition-colors"
            >
              <div className="flex items-center gap-1">
                {p.colors.map((c, ci) => (
                  <span
                    key={ci}
                    className="w-4 h-4 rounded-full border border-slate-300"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-700 font-medium">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Active Custom Swatches Preview */}
        <div className="pt-1 flex items-center gap-2">
          <span className="text-[11px] text-slate-500">Active conditioning colors:</span>
          <div className="flex items-center gap-1.5">
            {colors.map((col, idx) => (
              <label key={idx} className="cursor-pointer relative group">
                <input
                  type="color"
                  value={col}
                  onChange={(e) => {
                    const newCols = [...colors];
                    newCols[idx] = e.target.value;
                    setColors(newCols);
                  }}
                  className="sr-only"
                />
                <span
                  className="w-6 h-6 rounded-full border-2 border-white shadow-xs block hover:scale-110 transition-transform"
                  style={{ backgroundColor: col }}
                  title={`Click to edit: ${col}`}
                />
              </label>
            ))}
          </div>
          <span className="text-[10px] text-slate-400 italic">(Click any circle to customize hex)</span>
        </div>
      </div>

      {/* 5. Pattern Density, Symmetry, and Design Style (3-column row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
        
        {/* Density */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            5. Pattern Density
          </label>
          <select
            value={density}
            onChange={(e) => setDensity(e.target.value)}
            className="w-full p-2.5 bg-white border border-heritage-sand rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-heritage-deepTeal"
          >
            {DENSITY_OPTIONS.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
          <p className="text-[10px] text-slate-500">
            {DENSITY_OPTIONS.find((d) => d.id === density)?.desc}
          </p>
        </div>

        {/* Symmetry */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            6. Symmetry Axis
          </label>
          <select
            value={symmetry}
            onChange={(e) => setSymmetry(e.target.value)}
            className="w-full p-2.5 bg-white border border-heritage-sand rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-heritage-deepTeal"
          >
            {SYMMETRY_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <p className="text-[10px] text-slate-500">
            {SYMMETRY_OPTIONS.find((s) => s.id === symmetry)?.desc}
          </p>
        </div>

        {/* Style */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            7. Design Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-2.5 bg-white border border-heritage-sand rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-heritage-deepTeal"
          >
            {DESIGN_STYLES.map((st) => (
              <option key={st.id} value={st.id}>{st.label}</option>
            ))}
          </select>
          <p className="text-[10px] text-slate-500">
            {DESIGN_STYLES.find((st) => st.id === style)?.desc}
          </p>
        </div>

      </div>

      {/* 8. Optional Reference Image Upload */}
      <div className="space-y-2 pt-1">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          8. Optional Reference Swatch / Image
        </label>
        
        {referencePreview ? (
          <div className="relative inline-block border-2 border-heritage-sand rounded-2xl overflow-hidden bg-slate-50 p-2">
            <img 
              src={referencePreview} 
              alt="Reference preview" 
              className="h-28 w-28 object-cover rounded-xl" 
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 p-1 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
              title="Remove reference"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-slate-500 block text-center mt-1 truncate max-w-[110px]">
              {referenceImage?.name}
            </span>
          </div>
        ) : (
          <label className="border-2 border-dashed border-heritage-sand hover:border-heritage-gold rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer bg-heritage-cream/20 hover:bg-heritage-cream/50 transition-colors">
            <Upload className="w-6 h-6 text-slate-400 mb-1" />
            <span className="text-xs font-semibold text-heritage-deepTeal">Click or drag handloom swatch to upload</span>
            <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WEBP up to 5MB (Used for style/palette transfer conditioning)</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="sr-only" 
            />
          </label>
        )}
      </div>

      {/* 9. Optional Text Prompt */}
      <div className="space-y-1.5">
        <label htmlFor="prompt" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          9. Optional Design Concept Prompt
        </label>
        <input
          id="prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Grand wedding saree with heavy gopuram border and auspicious gold peacocks"
          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-heritage-sand bg-white focus:outline-none focus:border-heritage-deepTeal transition-colors"
        />
      </div>

      {/* Generate Action Button */}
      <div className="pt-3">
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 px-6 bg-gradient-to-r from-heritage-maroon via-heritage-deepMaroon to-heritage-maroon hover:from-heritage-deepMaroon hover:to-heritage-maroon text-white font-serif font-bold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:pointer-events-none"
        >
          {isGenerating ? (
            <span className="flex items-center gap-3">
              <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Synthesizing cGAN Latent Patterns...</span>
            </span>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-heritage-gold" />
              <span>Generate Handloom Designs (4 Variations)</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-400 text-center mt-2 font-mono">
          Model Conditioning: {selectedRegionData.name} • {motif} • {density} density • {symmetry} symmetry
        </p>
      </div>

    </form>
  );
}
