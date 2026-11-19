import React, { useState } from 'react';
import { Eye, Palette, Sparkles, SlidersHorizontal, Layers, Check } from 'lucide-react';

export default function FeaturedDesigns({ onSelectDesign }) {
  const [filterRegion, setFilterRegion] = useState('all');

  const designs = [
    {
      id: 'kanchi-01',
      title: 'Kanchipuram Temple Heritage',
      region: 'Tamil Nadu',
      regionKey: 'kanchipuram',
      weaveType: 'Korvai Silk',
      motif: 'Gopuram & Mayil (Peacock)',
      palette: ['#8B0000', '#D4AF37', '#006400', '#4B0082'],
      density: 'High Density Zari',
      accentColor: '#8B0000',
      description: 'Classic contrast borders with traditional gopuram temple triangles and zari wefts.',
    },
    {
      id: 'pocha-01',
      title: 'Pochampally Diamond Ikat',
      region: 'Telangana',
      regionKey: 'pochampally',
      weaveType: 'Single & Double Ikat',
      motif: 'Chevron & Geometric Diamonds',
      palette: ['#000080', '#D4AF37', '#8B0000', '#FFFFFF'],
      density: 'Medium Density',
      accentColor: '#000080',
      description: 'Resist-dyed geometric patterns with sharp diamond precision and contrasting pallus.',
    },
    {
      id: 'patola-01',
      title: 'Patan Patola Nari Kunj',
      region: 'Gujarat',
      regionKey: 'patola',
      weaveType: 'Double Ikat Silk',
      motif: 'Dancing Figures & Parrots',
      palette: ['#CC0000', '#D4AF37', '#006400', '#000000'],
      density: 'Complex Symmetrical',
      accentColor: '#CC0000',
      description: 'Four-fold symmetrical double ikat with historic figurative and floral borders.',
    },
    {
      id: 'baluchari-01',
      title: 'Baluchari Narrative Silk',
      region: 'West Bengal',
      regionKey: 'baluchari',
      weaveType: 'Jacquard Silk',
      motif: 'Kalka & Narrative Panels',
      palette: ['#800020', '#D4AF37', '#4B0082', '#8B4513'],
      density: 'Intricate Pallu',
      accentColor: '#800020',
      description: 'Elaborate mythological scenes and paisley kalka woven directly into the pallu.',
    },
    {
      id: 'sambal-01',
      title: 'Sambalpuri Shankha Bandha',
      region: 'Odisha',
      regionKey: 'sambalpuri',
      weaveType: 'Tie-Dye Bandha',
      motif: 'Shankha (Conch) & Chakra',
      palette: ['#8B0000', '#000000', '#FFFFFF', '#D4AF37'],
      density: 'Balanced Bandha',
      accentColor: '#8B0000',
      description: 'Auspicious coastal motifs created using traditional Odisha resist-dyeing methods.',
    },
    {
      id: 'mangal-01',
      title: 'Mangalagiri Nizam Border',
      region: 'Andhra Pradesh',
      regionKey: 'mangalagiri',
      weaveType: 'Fine Combed Cotton',
      motif: 'Nizam Border & Zari Stripe',
      palette: ['#006B3A', '#D4AF37', '#FFFFFF', '#8B4513'],
      density: 'Minimal Elegance',
      accentColor: '#006B3A',
      description: 'Crisp solid body in pure combed cotton offset by rich, narrow gold zari borders.',
    },
  ];

  const filteredDesigns = filterRegion === 'all' 
    ? designs 
    : designs.filter(d => d.regionKey === filterRegion);

  return (
    <section id="designs" className="py-20 md:py-28 bg-white border-b border-heritage-sand/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-maroon/10 text-heritage-maroon text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
              <span>Curated Handloom Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-deepTeal">
              Featured Regional Handloom Designs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              Explore authentic textile styles synthesized with WeaveGen AI's pattern conditioning engine. Each design preserves core regional motifs and symmetry rules.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All Regions', key: 'all' },
              { label: 'Kanchipuram', key: 'kanchipuram' },
              { label: 'Pochampally', key: 'pochampally' },
              { label: 'Patola', key: 'patola' },
              { label: 'Baluchari', key: 'baluchari' },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilterRegion(btn.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterRegion === btn.key
                    ? 'bg-heritage-deepTeal text-white shadow-sm'
                    : 'bg-heritage-sand/40 text-slate-600 hover:bg-heritage-sand hover:text-slate-900'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigns.map((design) => (
            <div 
              key={design.id}
              className="bg-heritage-cream/40 border border-heritage-sand rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Pattern Visual Display */}
              <div 
                className="relative h-56 p-6 flex flex-col justify-between overflow-hidden shadow-inner"
                style={{ backgroundColor: design.accentColor }}
              >
                {/* SVG Pattern Simulation Overlay */}
                <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                    <rect width="200" height="200" fill="transparent" />
                    {/* Geometric Grid Lines */}
                    <path d="M0 20 L200 20 M0 60 L200 60 M0 100 L200 100 M0 140 L200 140 M0 180 L200 180" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" />
                    <path d="M20 0 L20 200 M60 0 L60 200 M100 0 L100 200 M140 0 L140 200 M180 0 L180 200" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" />
                    {/* Central Diamond Motif */}
                    <polygon points="100,50 150,100 100,150 50,100" stroke="#F3E5AB" strokeWidth="2" fill="none" />
                    <polygon points="100,70 130,100 100,130 70,100" stroke="#D4AF37" strokeWidth="1" fill="#D4AF37" fillOpacity="0.3" />
                  </svg>
                </div>

                {/* Top Tags */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-heritage-cream font-mono text-[10px] font-semibold border border-white/20">
                    {design.weaveType}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-heritage-gold text-slate-950 text-[10px] font-bold">
                    AI Conditioned
                  </span>
                </div>

                {/* Bottom Visual Info */}
                <div className="relative z-10 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <p className="text-[10px] text-heritage-sand uppercase font-mono tracking-wider font-semibold">Primary Motif</p>
                  <p className="text-xs font-serif font-bold text-heritage-cream truncate">{design.motif}</p>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
                    <span>{design.region}</span>
                    <span className="text-heritage-maroon font-semibold">{design.density}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-heritage-deepTeal group-hover:text-heritage-maroon transition-colors">
                    {design.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {design.description}
                  </p>
                </div>

                {/* Palette Swatches and Actions */}
                <div className="pt-3 border-t border-heritage-sand/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {design.palette.map((color, cIdx) => (
                      <span 
                        key={cIdx} 
                        className="w-4 h-4 rounded-full border border-slate-300 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={`Color: ${color}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectDesign(design)}
                    className="px-3.5 py-1.5 bg-heritage-deepTeal hover:bg-heritage-maroon text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
