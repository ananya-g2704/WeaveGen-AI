import React from 'react';
import { LogOut, RefreshCw, Sparkles, Feather, Palette, ShieldCheck, ArrowRight, LayoutDashboard, Compass, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../components/auth/roleConfig';

export default function DashboardPreviewPage({ onNavigate }) {
  const { user, logout, isDevMode } = useAuth();

  const currentRole = USER_ROLES.find((r) => r.id === (user?.role || 'designer')) || USER_ROLES[1];
  const RoleIcon = currentRole.icon;

  const handleLogout = async () => {
    await logout();
    onNavigate('landing');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-white border-b border-heritage-sand py-4 px-6 sm:px-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-heritage-maroon to-heritage-deepMaroon flex items-center justify-center text-heritage-gold shadow-md">
            <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16M8 3v18M16 3v18" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-heritage-deepTeal">
              WeaveGen <span className="text-heritage-gold">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
              Authentication & Role Verified
            </p>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('role-selection')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-heritage-sand bg-heritage-cream/60 hover:bg-heritage-sand text-xs font-semibold text-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-heritage-maroon" />
            <span>Switch Persona</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-10 space-y-8">
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-heritage-deepTeal via-heritage-teal to-heritage-deepTeal rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-gold/20 text-heritage-cream text-xs font-semibold uppercase tracking-wider border border-heritage-gold/30">
                <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
                <span>Session Active • {isDevMode ? 'Dev Mode Auth' : 'Supabase Auth'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-cream">
                Welcome, {user?.fullName || 'Weaver'}!
              </h2>
              <p className="text-sm text-heritage-sand max-w-xl font-sans leading-relaxed">
                You are currently signed in as an authenticated <strong>{currentRole.name}</strong> ({user?.email}). 
                Your role determines which specialized design and production tools are unlocked in the platform.
              </p>
            </div>

            {/* Active Persona Pill Card */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 min-w-[240px]">
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow"
                  style={{ backgroundColor: currentRole.accentColor }}
                >
                  <RoleIcon className="w-5 h-5 text-heritage-lightGold" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-heritage-sand uppercase tracking-wider block">Current Role</span>
                  <span className="text-lg font-serif font-bold text-white">{currentRole.name}</span>
                </div>
              </div>
              <p className="text-xs text-heritage-sand/80 mt-1">
                {currentRole.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Available Modules for Active Role */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-heritage-deepTeal">
                Capabilities Unlocked for {currentRole.name}
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Next modules scheduled in your B.Tech project implementation roadmap
              </p>
            </div>

            <button
              onClick={() => onNavigate('role-selection')}
              className="text-xs font-semibold text-heritage-maroon hover:underline"
            >
              Change Persona →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-heritage-sand rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-heritage-maroon/10 text-heritage-maroon flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-heritage-gold">
                Module 5
              </span>
              <h4 className="text-lg font-serif font-bold text-heritage-deepTeal mt-1 mb-2">
                Generate Design Studio
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Condition cGAN by regional style, traditional motif, yarn colors, symmetry, and density.
              </p>
            </div>

            <div className="bg-white border border-heritage-sand rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-heritage-teal/10 text-heritage-deepTeal flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-heritage-gold">
                Module 8 & 9
              </span>
              <h4 className="text-lg font-serif font-bold text-heritage-deepTeal mt-1 mb-2">
                Region & Drape Visualizer
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Composite designs onto 2D sarees, dupattas, stoles, and unstitched fabric yardage.
              </p>
            </div>

            <div className="bg-white border border-heritage-sand rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-heritage-gold">
                Module 10 & 13
              </span>
              <h4 className="text-lg font-serif font-bold text-heritage-deepTeal mt-1 mb-2">
                Analysis & Production Tools
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extract K-Means color palettes, evaluate symmetry percentages, and export loom-ready PDF specs.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Landing Page shortcut */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => onNavigate('landing')}
            className="text-xs font-semibold text-slate-500 hover:text-heritage-maroon transition-colors"
          >
            ← View Public Landing Page
          </button>
        </div>

      </main>
    </div>
  );
}
