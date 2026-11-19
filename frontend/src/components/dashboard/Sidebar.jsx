import React from 'react';
import { LogOut, RefreshCw, Sparkles, ChevronRight, X, ExternalLink } from 'lucide-react';
import { SIDEBAR_NAV_ITEMS } from './navigationConfig';
import { USER_ROLES } from '../auth/roleConfig';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ activeTab, onSelectTab, onNavigate, isMobileOpen, setIsMobileOpen }) {
  const { user, logout, isDevMode } = useAuth();

  const currentRole = USER_ROLES.find((r) => r.id === (user?.role || 'designer')) || USER_ROLES[1];
  const RoleIcon = currentRole.icon;

  const handleLogout = async () => {
    await logout();
    onNavigate('landing');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Aside Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-gradient-to-b from-[#062C2C] via-[#093838] to-[#041D1D] text-heritage-cream border-r border-heritage-gold/20 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onSelectTab('dashboard');
                setIsMobileOpen(false);
              }}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-heritage-maroon to-heritage-deepMaroon flex items-center justify-center text-heritage-gold shadow-md border border-heritage-gold/30 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16M8 3v18M16 3v18" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight text-white block">
                  WeaveGen <span className="text-heritage-gold">AI</span>
                </span>
                <span className="text-[10px] tracking-widest text-heritage-sand/70 font-mono uppercase block">
                  Handloom Intelligence
                </span>
              </div>
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Persona Pill */}
          <div className="px-4 py-3 border-b border-white/5 bg-black/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs shadow-xs"
                  style={{ backgroundColor: currentRole.accentColor }}
                >
                  <RoleIcon className="w-3.5 h-3.5 text-heritage-lightGold" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-heritage-sand/70 block">
                    Active Persona
                  </span>
                  <span className="text-xs font-serif font-bold text-heritage-gold">
                    {currentRole.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onNavigate('role-selection');
                  setIsMobileOpen(false);
                }}
                className="text-[11px] font-medium text-heritage-sand hover:text-white flex items-center gap-1 hover:underline"
                title="Switch role"
              >
                <RefreshCw className="w-3 h-3 text-heritage-gold" />
                <span>Switch</span>
              </button>
            </div>
          </div>

          {/* Navigation Items List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)] custom-scrollbar">
            {SIDEBAR_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-heritage-gold/25 via-heritage-gold/15 to-transparent text-white border-l-3 border-heritage-gold shadow-xs font-semibold'
                      : 'text-heritage-sand/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-heritage-gold' : 'text-heritage-sand/60 group-hover:text-heritage-gold'
                    }`} />
                    <span className="tracking-wide">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-heritage-maroon text-heritage-cream font-bold">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-white/30 group-hover:text-white/60">
                      {item.moduleNum}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Card & Sign Out */}
        <div className="p-4 border-t border-white/10 bg-black/25">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-heritage-maroon to-heritage-gold flex items-center justify-center text-xs font-serif font-bold text-white shadow-xs flex-shrink-0">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="truncate">
                <p className="text-xs font-medium text-white truncate">
                  {user?.fullName || 'Weaver User'}
                </p>
                <p className="text-[10px] text-heritage-sand/60 truncate font-mono">
                  {user?.email || 'user@weavegen.ai'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-heritage-sand/60">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Public Landing Page</span>
            </button>
            <span className="font-mono text-heritage-gold/80">v1.0 CSE</span>
          </div>
        </div>
      </aside>
    </>
  );
}
