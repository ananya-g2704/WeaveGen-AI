import React from 'react';
import { Sparkles, ArrowRight, Compass, Cpu, Layers, Palette } from 'lucide-react';

export default function Hero({ onOpenGenerateModal, onExploreClick }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Decorative Traditional Paisley & Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(#7B1113 1px, transparent 1px), radial-gradient(#0D4D4D 1px, #FDFBF7 1px)`,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px'
      }} />

      {/* Decorative Gold & Teal Blur Orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-heritage-gold/20 via-heritage-teal/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Project Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-heritage-maroon/10 border border-heritage-maroon/20 text-heritage-maroon text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
              <span>B.Tech CSE Major Project • Generative AI for Handlooms</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-heritage-deepTeal leading-[1.15] tracking-tight">
              Weaving Tradition with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-heritage-maroon via-heritage-deepMaroon to-heritage-gold">
                Artificial Intelligence
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed">
              WeaveGen AI revitalizes traditional Indian textile heritage using Conditional Generative Adversarial Networks (cGANs). 
              Empowering master artisans and modern designers to co-create, analyze, and visualize authentic regional handloom motifs with digital precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenGenerateModal}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-heritage-maroon to-heritage-deepMaroon hover:from-heritage-deepMaroon hover:to-heritage-maroon text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-heritage-gold group-hover:rotate-12 transition-transform" />
                <span>Generate Your Design</span>
                <ArrowRight className="w-4 h-4 text-heritage-sand group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-heritage-sand/40 text-heritage-deepTeal font-semibold text-sm rounded-xl border border-heritage-sand hover:border-heritage-gold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-heritage-teal" />
                <span>Explore Traditional Motifs</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-heritage-sand/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <div className="text-2xl font-serif font-bold text-heritage-deepTeal">7+</div>
                <div className="text-xs text-slate-500 font-medium">Textile Regions</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-serif font-bold text-heritage-maroon">cGAN</div>
                <div className="text-xs text-slate-500 font-medium">Deep GenAI Model</div>
              </div>
              <div className="text-left">
                <div className="text-2xl font-serif font-bold text-heritage-gold">100%</div>
                <div className="text-xs text-slate-500 font-medium">Artisan Centric</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Handloom Visual Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Frame */}
            <div className="relative mx-auto max-w-md bg-white border-2 border-heritage-sand rounded-3xl p-4 sm:p-5 shadow-2xl">
              
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between pb-3 border-b border-heritage-sand/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-heritage-deepTeal tracking-wide uppercase">
                    AI Pattern Synthesis Preview
                  </span>
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 bg-heritage-sand/60 text-heritage-deepMaroon rounded-md">
                  Kanchipuram Silk
                </span>
              </div>

              {/* Textile Motif Preview Card */}
              <div className="relative mt-3 rounded-2xl overflow-hidden aspect-square bg-[#3B0709] border border-heritage-gold/30 shadow-inner flex flex-col justify-between p-6 text-heritage-cream group">
                
                {/* Simulated Intricate Woven Handloom SVG Graphic */}
                <div className="absolute inset-0 opacity-80 mix-blend-screen pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer Temple Borders */}
                    <path d="M 20,20 L 380,20 L 380,380 L 20,380 Z" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 3" />
                    <path d="M 35,35 L 365,35 L 365,365 L 35,365 Z" stroke="#D4AF37" strokeWidth="1" />
                    
                    {/* Repeating Diamond Weft Lattice */}
                    <g stroke="#D4AF37" strokeWidth="0.8" opacity="0.6">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <g key={i}>
                          <line x1={50 + i * 40} y1="40" x2={50 + i * 40} y2="360" strokeDasharray="3 3" />
                          <line x1="40" y1={50 + i * 40} x2="360" y2={50 + i * 40} strokeDasharray="3 3" />
                        </g>
                      ))}
                    </g>

                    {/* Central Peacock & Paisley Motif Silhouette */}
                    <g transform="translate(140, 140) scale(1.2)" fill="#D4AF37" opacity="0.9">
                      <path d="M50 10 C30 10 10 30 10 55 C10 80 35 95 55 95 C65 95 80 85 85 70 C90 55 80 35 65 25 C55 17 55 10 50 10 Z" />
                      <circle cx="48" cy="40" r="4" fill="#3B0709" />
                      <path d="M 40 60 Q 55 75 70 60 Q 55 45 40 60" fill="#F3E5AB" />
                    </g>

                    {/* Corner Gopuram Motifs */}
                    <path d="M40 40 L60 40 L50 25 Z" fill="#D4AF37" />
                    <path d="M340 40 L360 40 L350 25 Z" fill="#D4AF37" />
                    <path d="M40 360 L60 360 L50 375 Z" fill="#D4AF37" />
                    <path d="M340 360 L360 360 L350 375 Z" fill="#D4AF37" />
                  </svg>
                </div>

                {/* Card Top Info */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-heritage-gold/30">
                    <p className="text-[10px] text-heritage-sand uppercase tracking-wider font-semibold">Motif Type</p>
                    <p className="text-xs font-serif font-bold text-heritage-gold">Mayil (Peacock) & Gopuram</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-heritage-gold/20 backdrop-blur-md flex items-center justify-center border border-heritage-gold/40 text-heritage-gold">
                    <Cpu className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Bottom Parameters Display */}
                <div className="relative z-10 bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">Warp / Weft Zari</span>
                    <span className="font-mono text-heritage-gold font-semibold">240 Threads/inch</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">Symmetry Mode</span>
                    <span className="font-mono text-heritage-sand">Bilateral Korvai</span>
                  </div>

                  {/* Palette Swatches */}
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Extracted Palette:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#8B0000] border border-white/40" title="Crimson Maroon" />
                      <span className="w-4 h-4 rounded-full bg-[#D4AF37] border border-white/40" title="Zari Gold" />
                      <span className="w-4 h-4 rounded-full bg-[#006400] border border-white/40" title="Temple Green" />
                      <span className="w-4 h-4 rounded-full bg-[#4B0082] border border-white/40" title="Royal Indigo" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Caption Pill */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <Layers className="w-3.5 h-3.5 text-heritage-teal" />
                  Procedural + cGAN Hybrid Synthesis
                </span>
                <span className="text-heritage-maroon font-semibold">Ready to drape</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
