import React from 'react';
import { 
  Sparkles, 
  FolderHeart, 
  Layers, 
  Heart, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Sliders, 
  Eye, 
  Compass, 
  CheckCircle2, 
  Download, 
  Palette 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { USER_ROLES } from '../../components/auth/roleConfig';

export default function DashboardOverviewPage({ onSelectTab, onNavigate }) {
  const { user } = useAuth();
  const currentRole = USER_ROLES.find((r) => r.id === (user?.role || 'designer')) || USER_ROLES[1];
  const RoleIcon = currentRole.icon;

  // Curated demo metrics
  const stats = [
    {
      title: 'Total Designs Synthesized',
      value: '24',
      change: '+6 this week',
      isPositive: true,
      icon: Sparkles,
      color: 'from-heritage-maroon to-heritage-deepMaroon',
    },
    {
      title: 'Saved in Design Library',
      value: '18',
      change: 'Organized in 3 collections',
      isPositive: true,
      icon: FolderHeart,
      color: 'from-heritage-teal to-heritage-deepTeal',
    },
    {
      title: 'Community Appreciation',
      value: '142',
      change: '+28 likes received',
      isPositive: true,
      icon: Heart,
      color: 'from-amber-600 to-amber-800',
    },
    {
      title: 'cGAN Latency (Avg)',
      value: '1.2s',
      change: 'GPU / Tensor inference',
      isPositive: true,
      icon: Layers,
      color: 'from-slate-700 to-slate-900',
    },
  ];

  // Recent generated patterns gallery
  const recentGallery = [
    {
      id: 'des-01',
      title: 'Kanchipuram Gopuram Silk',
      region: 'Kanchipuram, Tamil Nadu',
      motif: 'Temple Border & Peacock',
      created: '2 hours ago',
      palette: ['#8B0000', '#D4AF37', '#006400'],
      weave: 'Korvai Silk',
      bgColor: '#7B1113',
    },
    {
      id: 'des-02',
      title: 'Pochampally Chevron Ikat',
      region: 'Pochampally, Telangana',
      motif: 'Diamond Lattice',
      created: 'Yesterday',
      palette: ['#000080', '#D4AF37', '#CC0000'],
      weave: 'Double Ikat',
      bgColor: '#002B49',
    },
    {
      id: 'des-03',
      title: 'Patan Patola Floral Vohra',
      region: 'Patan, Gujarat',
      motif: 'Paan Leaf & Parrots',
      created: '3 days ago',
      palette: ['#990000', '#D4AF37', '#004D20'],
      weave: 'Double Ikat Silk',
      bgColor: '#520B10',
    },
  ];

  // Recent Activity Feed
  const activities = [
    {
      id: 'act-1',
      title: 'AI Pattern Synthesis Completed',
      detail: 'Generated 4 variations of Kanchipuram Temple Silk with bilateral symmetry.',
      time: '2 hours ago',
      icon: Sparkles,
      color: 'text-heritage-maroon bg-heritage-maroon/10',
    },
    {
      id: 'act-2',
      title: 'Product Drape Previewed',
      detail: 'Composited Pochampally Chevron pattern onto a traditional 6-yard saree drape.',
      time: '5 hours ago',
      icon: Eye,
      color: 'text-heritage-teal bg-heritage-teal/10',
    },
    {
      id: 'act-3',
      title: 'Color Palette Extracted',
      detail: 'K-Means analysis identified 5 dominant natural dye tones from uploaded swatch.',
      time: 'Yesterday',
      icon: Palette,
      color: 'text-amber-700 bg-amber-50',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. Personalized Welcome Banner */}
      <div className="bg-gradient-to-r from-heritage-deepTeal via-heritage-teal to-heritage-deepTeal rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle Decorative Traditional Lattice Background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
            <path d="M0 20 L200 20 M0 60 L200 60 M0 100 L200 100 M0 140 L200 140 M0 180 L200 180" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M20 0 L20 200 M60 0 L60 200 M100 0 L100 200 M140 0 L140 200 M180 0 L180 200" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 4" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-gold/20 text-heritage-cream text-xs font-semibold uppercase tracking-wider border border-heritage-gold/30">
              <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
              <span>WeaveGen Studio Active</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">
              Namaste, {user?.fullName || 'Weaver'}!
            </h2>
            
            <p className="text-xs sm:text-sm text-heritage-sand leading-relaxed">
              You are working in your <strong>{currentRole.name}</strong> workspace. 
              Ready to generate new handloom variations, analyze warp-weft symmetry, or visualize loom repeats?
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('generate')}
                className="px-5 py-2.5 bg-gradient-to-r from-heritage-maroon to-heritage-deepMaroon hover:from-heritage-deepMaroon hover:to-heritage-maroon text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-heritage-gold group-hover:rotate-12 transition-transform" />
                <span>Launch Design Studio</span>
                <ArrowRight className="w-3.5 h-3.5 text-heritage-sand group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onSelectTab('visualization')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-heritage-gold" />
                <span>Drape Visualizer</span>
              </button>
            </div>
          </div>

          {/* User Profile Mini-Badge */}
          <div className="bg-black/25 backdrop-blur-md p-5 rounded-2xl border border-white/15 min-w-[220px] self-start md:self-auto">
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                style={{ backgroundColor: currentRole.accentColor }}
              >
                <RoleIcon className="w-5 h-5 text-heritage-lightGold" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-heritage-sand uppercase tracking-wider block">Persona</span>
                <span className="text-base font-serif font-bold text-heritage-gold">{currentRole.name}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 font-sans line-clamp-2">
              {currentRole.tagline}
            </p>
            <button
              onClick={() => onNavigate('role-selection')}
              className="mt-3 text-[11px] text-heritage-sand hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Change Persona</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className="bg-white border border-heritage-sand rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 font-sans">
                  {stat.title}
                </span>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-xs`}>
                  <Icon className="w-4 h-4 text-heritage-lightGold" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-serif font-bold text-heritage-deepTeal">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Dashboard Body: Design Gallery Preview & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Design Gallery Preview */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-heritage-deepTeal">
                Recent Handloom Syntheses
              </h3>
              <p className="text-xs text-slate-500">
                AI designs generated using your regional motif conditioners
              </p>
            </div>

            <button
              onClick={() => onSelectTab('my-designs')}
              className="text-xs font-semibold text-heritage-maroon hover:underline flex items-center gap-1"
            >
              <span>View All Designs</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {recentGallery.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-heritage-sand rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                {/* Simulated Pattern Preview Box */}
                <div 
                  className="h-44 relative p-4 flex flex-col justify-between text-white overflow-hidden shadow-inner"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {/* SVG Woven Overlay */}
                  <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                      <polygon points="50,15 85,50 50,85 15,50" stroke="#D4AF37" strokeWidth="1.5" />
                      <circle cx="50" cy="50" r="15" stroke="#F3E5AB" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-heritage-cream border border-white/20">
                      {item.weave}
                    </span>
                    <span className="text-[10px] text-white/80 font-mono">
                      {item.created}
                    </span>
                  </div>

                  <div className="relative z-10 bg-black/60 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                    <p className="text-[9px] uppercase font-mono tracking-wider text-heritage-sand">Primary Motif</p>
                    <p className="text-xs font-serif font-bold text-heritage-cream truncate">{item.motif}</p>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-serif font-bold text-heritage-deepTeal truncate group-hover:text-heritage-maroon transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.region}
                    </p>
                  </div>

                  {/* Palette Swatches & Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {item.palette.map((c, ci) => (
                        <span 
                          key={ci}
                          className="w-3.5 h-3.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onSelectTab('visualization')}
                        className="p-1.5 text-slate-500 hover:text-heritage-deepTeal hover:bg-heritage-sand/40 rounded-lg transition-colors"
                        title="Drape on Saree"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onSelectTab('editor')}
                        className="p-1.5 text-slate-500 hover:text-heritage-maroon hover:bg-heritage-sand/40 rounded-lg transition-colors"
                        title="Edit in Design Studio"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Create CTA Bar */}
          <div className="p-5 bg-heritage-cream/60 border border-heritage-sand rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-heritage-maroon/10 text-heritage-maroon flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-serif font-bold text-heritage-deepTeal">
                  Want to synthesize a new regional variation?
                </h4>
                <p className="text-xs text-slate-600">
                  Select Pochampally, Kanchipuram, Patola, or Baluchari with custom yarn colors.
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('generate')}
              className="px-4 py-2 bg-heritage-deepTeal hover:bg-heritage-teal text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex-shrink-0"
            >
              Start Generating
            </button>
          </div>
        </div>

        {/* Right Column: Recent Activity Feed & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Shortcuts */}
          <div className="bg-white border border-heritage-sand rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-serif font-bold text-heritage-deepTeal uppercase tracking-wider">
              Quick Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectTab('generate')}
                className="p-3 bg-heritage-cream/50 hover:bg-heritage-sand/60 border border-heritage-sand rounded-xl text-left transition-colors group"
              >
                <Sparkles className="w-4 h-4 text-heritage-maroon mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-slate-800 block">AI Studio</span>
                <span className="text-[10px] text-slate-500">cGAN Synthesis</span>
              </button>

              <button
                onClick={() => onSelectTab('analysis')}
                className="p-3 bg-heritage-cream/50 hover:bg-heritage-sand/60 border border-heritage-sand rounded-xl text-left transition-colors group"
              >
                <Palette className="w-4 h-4 text-heritage-teal mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-slate-800 block">Color Analysis</span>
                <span className="text-[10px] text-slate-500">K-Means Palette</span>
              </button>

              <button
                onClick={() => onSelectTab('visualization')}
                className="p-3 bg-heritage-cream/50 hover:bg-heritage-sand/60 border border-heritage-sand rounded-xl text-left transition-colors group"
              >
                <Eye className="w-4 h-4 text-amber-700 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-slate-800 block">2D Drape</span>
                <span className="text-[10px] text-slate-500">Saree Compositing</span>
              </button>

              <button
                onClick={() => onSelectTab('assistant')}
                className="p-3 bg-heritage-cream/50 hover:bg-heritage-sand/60 border border-heritage-sand rounded-xl text-left transition-colors group"
              >
                <Compass className="w-4 h-4 text-indigo-700 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-slate-800 block">AI Assistant</span>
                <span className="text-[10px] text-slate-500">Textile Guidance</span>
              </button>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white border border-heritage-sand rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-heritage-deepTeal uppercase tracking-wider">
                Recent Activity
              </h3>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-4">
              {activities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex items-start gap-3 text-left">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${act.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {act.detail}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                        {act.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
