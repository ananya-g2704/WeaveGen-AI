import React, { useState } from 'react';
import { MapPin, Sparkles, BookOpen, Layers, CheckCircle } from 'lucide-react';

export default function HeritageSection({ onOpenGenerateModal }) {
  const regions = [
    {
      id: 'kanchipuram',
      name: 'Kanchipuram',
      state: 'Tamil Nadu',
      tagline: 'The Queen of Silk Sarees',
      technique: 'Korvai Interlocking Weft & Heavy Pure Zari',
      motifs: ['Mayil (Peacock)', 'Rudraksham', 'Gopuram (Temple)', 'Manga (Mango/Paisley)'],
      colors: ['Deep Crimson', 'Temple Gold', 'Emerald Green', 'Royal Indigo'],
      colorHexes: ['#8B0000', '#D4AF37', '#006400', '#4B0082'],
      history: 'Dating back to the Chola dynasty over 400 years ago, Kanchipuram sarees are crafted with pure mulberry silk and interlocked borders known as Korvai, ensuring the body and border are woven as two distinct warp components joined seamlessly.',
    },
    {
      id: 'pochampally',
      name: 'Pochampally',
      state: 'Telangana',
      tagline: 'Bhoodan Geometric Tie-and-Dye',
      technique: 'Single and Double Ikat Resist Dyeing (Chitki)',
      motifs: ['Ikat Diamond', 'Arrowhead', 'Square Chevrons', 'Bird Figures'],
      colors: ['Midnight Navy', 'Golden Yellow', 'Vermilion Red', 'Chalk White'],
      colorHexes: ['#000080', '#FFD700', '#CC0000', '#FFFFFF'],
      history: 'Pochampally Ikat is renowned worldwide for its mathematical precision. Bundles of warp and weft yarns are meticulously tied and resist-dyed before weaving, creating characteristic softened geometric diamond contours on the loom.',
    },
    {
      id: 'patola',
      name: 'Patan Patola',
      state: 'Gujarat',
      tagline: 'The Royal Double Ikat Heritage',
      technique: 'True Double Ikat Silk (Warp and Weft resist-dyed)',
      motifs: ['Nari Kunj (Dancers)', 'Popat Kunj (Parrots)', 'Paan (Betel Leaf)', 'Chhabdi (Baskets)'],
      colors: ['Ruby Red', 'Zari Gold', 'Forest Green', 'Soot Black'],
      colorHexes: ['#CC0000', '#D4AF37', '#006400', '#000000'],
      history: 'Woven by the Salvi weavers of Patan for royal patronage, a genuine Patola saree takes 4 to 6 months to hand-weave. The pattern is completely identical on both sides due to exact alignment of pre-dyed warp and weft threads.',
    },
    {
      id: 'baluchari',
      name: 'Baluchari',
      state: 'West Bengal',
      tagline: 'Epics & Mythology Woven in Silk',
      technique: 'Jacquard Loom Multi-Color Resham Brocade',
      motifs: ['Ramayana & Mahabharata Scenes', 'Royal Chariots', 'Kalka (Paisley)', 'Dancing Courtiers'],
      colors: ['Burgundy', 'Antique Brass Gold', 'Deep Purple', 'Walnut Brown'],
      colorHexes: ['#800020', '#D4AF37', '#4B0082', '#8B4513'],
      history: 'Originating on the banks of the Bhagirathi river in Murshidabad, Baluchari textiles are celebrated as living storybooks, with elaborate figurative narrative panels woven across the pallu depicting Indian epics and historical court scenes.',
    },
    {
      id: 'sambalpuri',
      name: 'Sambalpuri',
      state: 'Odisha',
      tagline: 'Sacred Coastal Bandha Traditions',
      technique: 'Bandhakala (Hand-tied Ikat with Weft Bandha)',
      motifs: ['Shankha (Conch)', 'Chakra (Wheel)', 'Padma (Lotus)', 'Matsya (Fish)'],
      colors: ['Madder Red', 'Pure White', 'Charcoal Black', 'Mustard Yellow'],
      colorHexes: ['#8B0000', '#FFFFFF', '#000000', '#DAA520'],
      history: 'Rooted in the devotional Jagannatha culture of Odisha, Sambalpuri Bandha uses intricate tie-dye techniques representing the four sacred symbols. The weavers reflect their deep spiritual bond with coastal and forest ecosystems in each motif.',
    },
    {
      id: 'ilkal',
      name: 'Ilkal',
      state: 'Karnataka',
      tagline: 'The Distinctive Tope Teni Weave',
      technique: 'Tope Teni Interlocking Join (Warp Body & Red Pallu)',
      motifs: ['Tope Teni Join', 'Gopura (Temple Tower)', 'Kasuti Cross-stitch Motifs'],
      colors: ['Crimson Red', 'Cream White', 'Zari Gold', 'Deep Plum'],
      colorHexes: ['#CC0000', '#FFFFFF', '#D4AF37', '#4B0082'],
      history: 'Originating in Bagalkot district of Karnataka around the 8th century, Ilkal sarees are famous for joining a cotton body with a deep red silk pallu using the ancient "tope teni" series of loops, creating a structural join found nowhere else.',
    },
  ];

  const [activeRegion, setActiveRegion] = useState(regions[0]);

  return (
    <section id="heritage" className="py-20 md:py-28 bg-[#FBF9F5] border-b border-heritage-sand/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-teal/10 text-heritage-deepTeal text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-heritage-gold" />
            <span>Regional Mapping & Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-deepTeal">
            Living Handloom Traditions Across India
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans">
            Every regional weaving cluster carries a distinct mathematical logic in warp and weft. WeaveGen AI encodes these heritage rules into its generative models.
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setActiveRegion(reg)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeRegion.id === reg.id
                  ? 'bg-heritage-maroon text-white shadow-md scale-105'
                  : 'bg-white border border-heritage-sand text-slate-700 hover:bg-heritage-sand/50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{reg.name} ({reg.state})</span>
            </button>
          ))}
        </div>

        {/* Active Region Interactive Display Card */}
        <div className="bg-white border-2 border-heritage-sand rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-heritage-gold mb-1">
                <span>{activeRegion.state} Tradition</span>
                <span>•</span>
                <span>GI Tagged Craft</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-deepTeal">
                {activeRegion.name}
              </h3>
              <p className="text-sm font-serif italic text-heritage-maroon mt-1">
                {activeRegion.tagline}
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              {activeRegion.history}
            </p>

            {/* Technical Characteristics */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-heritage-cream/60 border border-heritage-sand rounded-xl">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                  Weaving Technique
                </span>
                <span className="text-xs sm:text-sm font-semibold text-heritage-deepTeal">
                  {activeRegion.technique}
                </span>
              </div>

              {/* Signature Motifs Badges */}
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Signature Motifs
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRegion.motifs.map((motif, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-white border border-heritage-sand text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1 shadow-2xs"
                    >
                      <CheckCircle className="w-3 h-3 text-heritage-gold" />
                      <span>{motif}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Traditional Palette Story */}
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Signature Color Story
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {activeRegion.colorHexes.map((hex, hIdx) => (
                      <span 
                        key={hIdx} 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-sans">
                    {activeRegion.colors.join(' • ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenGenerateModal}
                className="px-6 py-3 bg-heritage-deepTeal hover:bg-heritage-maroon text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-heritage-gold" />
                <span>Generate {activeRegion.name} Style Design</span>
              </button>
            </div>
          </div>

          {/* Right Visual Badge Frame */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#1E0507] to-[#3B0709] rounded-2xl p-8 text-white relative overflow-hidden border border-heritage-gold/30 shadow-2xl flex flex-col justify-between aspect-square">
            
            {/* Traditional Geometric Loom Lattice Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="#D4AF37" strokeWidth="1" strokeDasharray="5 5" />
                <circle cx="100" cy="100" r="50" stroke="#D4AF37" strokeWidth="1" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#D4AF37" strokeWidth="1" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#D4AF37" strokeWidth="1" />
              </svg>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-heritage-gold">
                Region Model
              </span>
              <span className="w-3 h-3 rounded-full bg-heritage-gold animate-ping" />
            </div>

            <div className="relative z-10 my-auto text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-heritage-gold/20 border border-heritage-gold/40 text-heritage-gold flex items-center justify-center mx-auto shadow-inner">
                <Layers className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-heritage-cream">
                {activeRegion.name}
              </h4>
              <p className="text-xs text-heritage-sand max-w-xs mx-auto">
                Condition vector encoded with verified {activeRegion.weaveType} structural parameters.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
              <span>Authenticity Status:</span>
              <span className="text-emerald-400 font-semibold font-mono">Curated Dataset ✓</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
