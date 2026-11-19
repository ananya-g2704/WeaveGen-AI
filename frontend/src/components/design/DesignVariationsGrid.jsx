import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Download, 
  Heart, 
  Eye, 
  Sliders, 
  RotateCw, 
  ArrowRight, 
  Info, 
  Layers, 
  CheckCircle2, 
  Bookmark,
  Share2
} from 'lucide-react';

export default function DesignVariationsGrid({ 
  generationResult, 
  onRegenerate, 
  onNavigateToVisualization, 
  onNavigateToEditor 
}) {
  const variations = generationResult?.variations || [];
  const [selectedVariationId, setSelectedVariationId] = useState(variations[0]?.id);
  const [savedStatus, setSavedStatus] = useState({});

  const activeVariation = variations.find((v) => v.id === selectedVariationId) || variations[0];

  const handleToggleSave = (vId) => {
    setSavedStatus((prev) => ({
      ...prev,
      [vId]: !prev[vId],
    }));
  };

  const handleDownload = (variation) => {
    const link = document.createElement('a');
    link.href = variation.imagePreview;
    link.download = `weavegen_${variation.region}_var${variation.variationNumber}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Generation Status & Honest Demo Mode Notice */}
      <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 shadow-2xs">
        <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold flex items-center gap-2">
            <span>Generation Source: {generationResult?.source === 'fastapi_cgan' ? 'FastAPI Backend Engine' : 'Client Procedural Generator'}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-bold">DEMO MODE</span>
          </div>
          <p className="text-amber-800/90 leading-relaxed">
            {generationResult?.disclaimer || 'Procedural Demo Pattern (Demo Mode — Not produced by a trained AI model. Architecture ready for trained cGAN weights).'}
          </p>
        </div>
      </div>

      {/* 2. Top Header Bar with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-heritage-sand">
        <div>
          <h3 className="text-xl font-serif font-bold text-heritage-deepTeal">
            Generated Design Variations ({variations.length})
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Select a preferred design variation to save, drape, or customize
          </p>
        </div>

        <button
          onClick={onRegenerate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-heritage-sand/40 border border-heritage-sand rounded-xl text-xs font-semibold text-slate-700 hover:text-heritage-maroon transition-colors shadow-2xs self-start sm:self-auto"
        >
          <RotateCw className="w-3.5 h-3.5 text-heritage-gold" />
          <span>Regenerate Variations</span>
        </button>
      </div>

      {/* 3. Four Variations Grid (Module 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {variations.map((v) => {
          const isSelected = selectedVariationId === v.id;
          const isSaved = savedStatus[v.id];

          return (
            <div
              key={v.id}
              onClick={() => setSelectedVariationId(v.id)}
              className={`group bg-white rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'border-heritage-deepTeal shadow-xl scale-[1.02] ring-2 ring-heritage-deepTeal/20'
                  : 'border-heritage-sand hover:border-slate-300 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Pattern Visual Container */}
              <div className="relative aspect-square overflow-hidden bg-slate-900">
                <img
                  src={v.imagePreview}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badge: Variation Index */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-mono text-white font-bold border border-white/20">
                    Var #{v.variationNumber}
                  </span>
                  {isSelected && (
                    <span className="px-2 py-0.5 bg-heritage-gold text-slate-950 rounded-md text-[10px] font-bold shadow-xs flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Preferred</span>
                    </span>
                  )}
                </div>

                {/* Bookmark / Save Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSave(v.id);
                  }}
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                    isSaved
                      ? 'bg-heritage-maroon text-white'
                      : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
                  }`}
                  title={isSaved ? 'Saved to library' : 'Save design'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Card Meta */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-maroon font-semibold">
                    {v.region}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Seed: {v.parameters?.seed}
                  </span>
                </div>

                <h4 className="text-xs font-serif font-bold text-heritage-deepTeal truncate">
                  {v.title}
                </h4>

                {/* Palette Swatches */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    {v.colors?.map((col, cIdx) => (
                      <span
                        key={cIdx}
                        className="w-3 h-3 rounded-full border border-slate-300"
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-slate-400 font-sans capitalize">
                    {v.density} Density
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 4. Active Selected Variation Control Bar */}
      {activeVariation && (
        <div className="bg-gradient-to-r from-heritage-deepTeal via-[#093838] to-heritage-deepTeal rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-heritage-gold">
                Active Selection • Variation #{activeVariation.variationNumber}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-heritage-sand">
                {activeVariation.product?.toUpperCase()}
              </span>
            </div>

            <h4 className="text-2xl font-serif font-bold text-heritage-cream">
              {activeVariation.title}
            </h4>

            <p className="text-xs text-heritage-sand/90 font-sans leading-relaxed">
              Synthesized with <strong>{activeVariation.symmetry}</strong> symmetry, 
              conditioned on authentic <strong>{activeVariation.region}</strong> motif grammar.
            </p>
          </div>

          {/* Action Buttons for Selected Design */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleDownload(activeVariation)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-2 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Pattern</span>
            </button>

            <button
              onClick={() => onNavigateToEditor(activeVariation)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-2 shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5 text-heritage-gold" />
              <span>Customize in Editor</span>
            </button>

            <button
              onClick={() => onNavigateToVisualization(activeVariation)}
              className="px-5 py-2.5 bg-gradient-to-r from-heritage-maroon to-heritage-deepMaroon hover:from-heritage-deepMaroon hover:to-heritage-maroon text-white font-serif font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 group"
            >
              <Eye className="w-4 h-4 text-heritage-gold" />
              <span>Drape on Saree / Product</span>
              <ArrowRight className="w-3.5 h-3.5 text-heritage-sand group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
