import React from 'react';
import { Sliders, Cpu, Edit3, Eye, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenGenerateModal }) {
  const steps = [
    {
      step: '01',
      title: 'Select Preferences',
      description: 'Choose from 7+ regional styles, traditional motifs (paisley, temple, peacock), custom color palettes, and symmetry types.',
      icon: Sliders,
      tag: 'Conditioning Input',
    },
    {
      step: '02',
      title: 'cGAN AI Generation',
      description: 'The generative neural network processes latent vectors with regional conditions to synthesize 4 unique design variations in parallel.',
      icon: Cpu,
      tag: 'Neural Synthesis',
    },
    {
      step: '03',
      title: 'Customize Patterns',
      description: 'Fine-tune repeat grids, mirror axes, yarn colors, and pattern density in the browser design editor with real-time feedback.',
      icon: Edit3,
      tag: 'Design Studio',
    },
    {
      step: '04',
      title: 'Visualize & Export',
      description: 'Composite patterns onto 2D product drapes (Saree, Dupatta, Stole, Fabric) and generate downloadable production-support PDFs.',
      icon: Eye,
      tag: 'Loom-Ready Output',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-heritage-cream/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-heritage-gold/20 text-heritage-deepMaroon text-xs font-semibold uppercase tracking-wider">
            <span>Workflow & Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-deepTeal">
            From Traditional Motif to Production Loom
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-sans">
            How WeaveGen AI simplifies the traditional design workflow from weeks of manual charting to an intuitive 4-step generative process.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-heritage-sand rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Background Step Number Watermark */}
                <span className="absolute -top-3 -right-2 font-serif text-6xl font-extrabold text-heritage-sand/40 select-none group-hover:text-heritage-gold/20 transition-colors pointer-events-none">
                  {item.step}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-heritage-cream border border-heritage-sand/80 text-heritage-deepTeal flex items-center justify-center mb-5 group-hover:bg-heritage-maroon group-hover:text-heritage-cream transition-colors shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-heritage-maroon">
                    {item.tag}
                  </span>

                  <h3 className="text-lg font-serif font-bold text-heritage-deepTeal mt-1 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Step {item.step}</span>
                  <span className="text-heritage-gold font-bold">✓ Automated</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenGenerateModal}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-heritage-deepTeal hover:bg-heritage-teal text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <span>Try the Design Generation Studio</span>
            <ArrowRight className="w-4 h-4 text-heritage-gold" />
          </button>
        </div>

      </div>
    </section>
  );
}
