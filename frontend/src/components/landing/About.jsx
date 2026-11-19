import React from 'react';
import { Shield, Sparkles, Users, Award, Eye, Database, HeartHandshake } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Shield,
      title: 'Heritage Preservation',
      description: 'Preserves centuries of generational weaving knowledge by digitally cataloging and mathematically analyzing regional Indian motifs before they are lost to time.',
      badge: 'Cultural Archiving',
      color: 'from-heritage-maroon to-heritage-deepMaroon',
    },
    {
      icon: Sparkles,
      title: 'Generative AI Synthesis',
      description: 'Employs Conditional GANs to synthesize novel, high-resolution patterns conditioned on symmetry, yarn colorways, complexity, and regional style constraints.',
      badge: 'Deep Learning',
      color: 'from-heritage-teal to-heritage-deepTeal',
    },
    {
      icon: HeartHandshake,
      title: 'Artisan Co-Creation',
      description: 'Designed as an interactive assistant for weavers and textile houses—not a replacement. Converts conceptual sketches into loom-ready repeat patterns.',
      badge: 'Inclusive Tech',
      color: 'from-amber-700 to-amber-900',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-y border-heritage-sand/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-teal/10 text-heritage-deepTeal text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-heritage-gold" />
            <span>About The Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-deepTeal">
            Preserving Cultural Heritage with Computational Creativity
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans">
            Indian handlooms embody one of humanity's richest living heritage traditions. 
            WeaveGen AI bridges this centuries-old artisan craft with contemporary Generative AI, creating a sustainable bridge between timeless tradition and digital design innovation.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-heritage-cream/60 border border-heritage-sand rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-heritage-lightGold" />
                    </div>
                    <span className="text-[11px] font-semibold text-heritage-deepTeal bg-white px-2.5 py-1 rounded-full border border-heritage-sand">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-heritage-deepTeal mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-heritage-sand/60 flex items-center gap-2 text-xs font-semibold text-heritage-maroon">
                  <span>Explore research methodology</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Heritage Quote Banner */}
        <div className="mt-16 bg-gradient-to-r from-heritage-deepTeal via-heritage-teal to-heritage-deepTeal rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
            <svg className="w-96 h-96 fill-current" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
              <polygon points="50,15 61,38 85,38 66,53 73,77 50,62 27,77 34,53 15,38 39,38" />
            </svg>
          </div>

          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-heritage-gold">
              Core Philosophy
            </span>
            <blockquote className="text-lg sm:text-xl font-serif italic text-heritage-cream leading-relaxed">
              "Every thread in an Indian handloom tells the story of an artisan family, an indigenous motif, and a community's identity. 
              Our AI does not replace the hand that weaves—it inspires the vision behind the loom."
            </blockquote>
            <p className="text-xs text-heritage-sand font-medium">
              — Department of Computer Science & Engineering • Major Project Research Vision
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
