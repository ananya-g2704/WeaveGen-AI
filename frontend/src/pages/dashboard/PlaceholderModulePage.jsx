import React from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, Cpu, Code2 } from 'lucide-react';
import { SIDEBAR_NAV_ITEMS } from '../../components/dashboard/navigationConfig';

export default function PlaceholderModulePage({ moduleId, onSelectTab }) {
  const moduleInfo = SIDEBAR_NAV_ITEMS.find((m) => m.id === moduleId) || {
    id: moduleId,
    label: 'Module in Progress',
    moduleNum: '00',
    description: 'Upcoming B.Tech Project Module',
  };

  const moduleRoadmapDetails = {
    generate: {
      tag: 'Conditional Generative Adversarial Network (cGAN)',
      tech: 'TensorFlow • Keras • Python cGAN Generator',
      features: [
        'Motif conditioning: Paisley, Peacock, Lotus, Temple Gopuram, Ikat Chevrons',
        'Region conditioning: Pochampally, Kanchipuram, Patola, Baluchari, Sambalpuri',
        'Palette conditioning: Custom hex colors & natural dye swatches',
        'Symmetry selection: Bilateral, Rotational, Radial, Asymmetric',
        'Batch inference: Synthesizes 4 distinct high-resolution variations in parallel',
      ],
    },
    'my-designs': {
      tag: 'Design Library & Asset Storage',
      tech: 'Supabase PostgreSQL • Supabase Storage • JSONB Metadata',
      features: [
        'View all saved handloom designs with full conditioning metadata',
        'Custom collections: Bridal Silk, Festive Ikat, Daily Cotton',
        'Search & filter by motif class, regional origin, or color hex',
        'Export formats: PNG pattern repeats, SVG vector motifs, and ZIP packages',
      ],
    },
    analysis: {
      tag: 'Computer Vision & Design Intelligence',
      tech: 'OpenCV • Pillow (PIL) • Scikit-learn K-Means',
      features: [
        'K-Means clustering: Dominant color palette & dye distribution percentages',
        'Pixel-wise symmetry scoring: Horizontal, vertical, and rotational symmetry %',
        'Pattern edge density analysis using gradient magnitude and local variance',
        'Structural similarity (SSIM) & Cosine similarity comparison',
      ],
    },
    editor: {
      tag: 'Interactive Handloom Pattern Studio',
      tech: 'HTML5 Canvas • SVG Filters • Real-Time CSS Grid Transformation',
      features: [
        'Live repeat grid dimension adjusting (half-drop, brick repeat)',
        'Interactive yarn recoloring with natural dye colorway swatches',
        'Mirror axes toggle with horizontal & vertical flip lines',
        'Motif scaling, rotation, and pattern density sliders',
      ],
    },
    visualization: {
      tag: '2D & 3D Textile Product Draping',
      tech: 'HTML5 Canvas Compositing • Mesh Texture Mapping',
      features: [
        'Drape onto 6-yard Saree with dedicated Body, Pallu, and Border positioning',
        'Dupatta preview with contrasting four-side border framing',
        'Unstitched Fabric yardage meter repeat view',
        'Stole & Lehenga traditional garment previews',
      ],
    },
    production: {
      tag: 'Loom-Ready Production Tools',
      tech: 'ReportLab PDF Generator • Warp-Weft Calculation Engine',
      features: [
        'Repeat dimension measurement (inches, centimeters, and reed counts)',
        'Color code breakdown (Pantone / Hex / RGB) for master dyers',
        'Indicative production cost estimation based on complexity and fabric tier',
        'Downloadable official production specification PDF sheet',
      ],
    },
    assistant: {
      tag: 'AI Textile Knowledge Assistant',
      tech: 'Rule-based Expert System • Handloom Domain Knowledge Base',
      features: [
        'Traditional motif symbolism and auspicious cultural context',
        'Regional textile styling guidance and color pairing recommendations',
        'Weaving technique explanations (Korvai, Ikat, Tope Teni, Jacquard)',
        'Prompt-to-condition recommendations for the generative studio',
      ],
    },
    community: {
      tag: 'Artisan & Designer Gallery',
      tech: 'Supabase PostgreSQL • RLS Social Feed',
      features: [
        'Explore community-shared handloom patterns across India',
        'Like, favorite, and bookmark inspiring artisan designs',
        'Filter by regional tags: #kanchipuram, #pochampally, #patola',
        'Creator profiles showcasing master weavers and student innovators',
      ],
    },
    settings: {
      tag: 'User Profile & Preferences',
      tech: 'Supabase Auth • User Roles Table',
      features: [
        'Manage full name, artisan bio, avatar, and email settings',
        'Default preferred regional textile style & favorite colorways',
        'Active persona switcher (Artisan, Designer, Admin)',
        'Security, password reset, and session management',
      ],
    },
  };

  const details = moduleRoadmapDetails[moduleId] || {
    tag: 'Next Phase Development',
    tech: 'React • FastAPI • Supabase',
    features: ['Structured modular implementation in upcoming step.'],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Back button */}
      <button
        onClick={() => onSelectTab('dashboard')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-heritage-maroon transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        <span>Return to Dashboard Overview</span>
      </button>

      {/* Main Roadmap Card */}
      <div className="bg-white border-2 border-heritage-sand rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        
        {/* Top Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-heritage-sand/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-heritage-deepTeal text-heritage-gold flex items-center justify-center shadow-md">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-heritage-cream text-heritage-maroon border border-heritage-sand">
                  Module {moduleInfo.moduleNum}
                </span>
                <span className="text-xs font-mono text-heritage-deepTeal font-semibold">
                  {details.tag}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-heritage-deepTeal mt-1">
                {moduleInfo.label}
              </h2>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Project Roadmap</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Ready for Next Stage
            </span>
          </div>
        </div>

        {/* Tech Stack Banner */}
        <div className="mt-6 p-4 bg-heritage-cream/60 border border-heritage-sand rounded-2xl flex items-center gap-3">
          <Code2 className="w-5 h-5 text-heritage-maroon flex-shrink-0" />
          <div className="text-xs text-slate-700">
            <span className="font-semibold text-heritage-deepTeal">Underlying Technologies: </span>
            <span className="font-mono text-slate-600">{details.tech}</span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-serif font-bold text-heritage-deepTeal uppercase tracking-wider">
            Planned Capabilities for this Module:
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {details.features.map((feat, idx) => (
              <div 
                key={idx}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-sans leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-10 pt-6 border-t border-heritage-sand/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Building modules incrementally according to B.Tech project specifications.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="w-full sm:w-auto px-5 py-2.5 bg-heritage-deepTeal hover:bg-heritage-teal text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              Back to Overview
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
