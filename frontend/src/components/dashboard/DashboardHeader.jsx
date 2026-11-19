import React from 'react';
import { Menu, Sparkles, Search, Bell, ShieldCheck, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SIDEBAR_NAV_ITEMS } from './navigationConfig';

export default function DashboardHeader({ activeTab, onOpenMobileMenu, onSelectTab }) {
  const { user, isDevMode } = useAuth();
  const currentNav = SIDEBAR_NAV_ITEMS.find((n) => n.id === activeTab) || SIDEBAR_NAV_ITEMS[0];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-heritage-sand/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      
      {/* Left: Hamburger & Current View Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-heritage-maroon hover:bg-heritage-sand/40"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-serif font-bold text-heritage-deepTeal">
              {currentNav.label}
            </h1>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-heritage-cream text-heritage-maroon border border-heritage-sand font-semibold">
              Module {currentNav.moduleNum}
            </span>
          </div>
          <p className="hidden md:block text-xs text-slate-500 font-sans">
            {currentNav.description}
          </p>
        </div>
      </div>

      {/* Right: Quick Search, Status Badge, and Primary CTA */}
      <div className="flex items-center gap-3">
        
        {/* Environment Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border bg-heritage-cream/60 border-heritage-sand text-slate-600">
          {isDevMode ? (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Dev Auth Mode</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Supabase Connected</span>
            </>
          )}
        </div>

        {/* Quick Generate Shortcut */}
        {activeTab !== 'generate' && (
          <button
            onClick={() => onSelectTab('generate')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-heritage-maroon to-heritage-deepMaroon hover:from-heritage-deepMaroon hover:to-heritage-maroon text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
            <span>Generate Design</span>
          </button>
        )}

        {/* User Avatar Circle */}
        <div className="w-9 h-9 rounded-full bg-heritage-deepTeal text-heritage-cream flex items-center justify-center font-serif text-xs font-bold shadow-xs border border-heritage-sand">
          {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
        </div>

      </div>
    </header>
  );
}
