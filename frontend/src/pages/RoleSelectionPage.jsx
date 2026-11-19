import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, UserCheck, Shield, Palette, Feather } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../components/auth/roleConfig';

export default function RoleSelectionPage({ onNavigate }) {
  const { user, selectRole } = useAuth();
  const [activeRole, setActiveRole] = useState(user?.role || 'designer');
  const [isSaving, setIsSaving] = useState(false);

  const handleRoleSelect = async (roleId) => {
    setActiveRole(roleId);
    setIsSaving(true);
    try {
      await selectRole(roleId);
    } catch (err) {
      console.error('Failed to update role:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = () => {
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(#7B1113 1px, transparent 1px), radial-gradient(#0D4D4D 1px, #FDFBF7 1px)`,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px'
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-heritage-gold/20 text-heritage-deepMaroon text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
            <span>Module 3 • Multi-User Persona Selection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-deepTeal">
            Choose Your Workspace Persona
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-sans">
            Welcome, <strong>{user?.fullName || 'Weaver'}</strong>! Select how you intend to use WeaveGen AI today. You can freely switch personas anytime from your account settings.
          </p>
        </div>

        {/* 3 Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {USER_ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = activeRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`relative bg-white rounded-3xl p-7 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-heritage-deepTeal shadow-2xl scale-[1.02] ring-2 ring-heritage-deepTeal/20'
                    : 'border-heritage-sand hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Selection Indicator Pill */}
                {isSelected && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-heritage-deepTeal text-white text-[11px] font-semibold py-1 px-3.5 rounded-full shadow-md flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-heritage-gold" />
                    <span>Active Persona</span>
                  </div>
                )}

                <div>
                  {/* Role Icon & Tagline */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: role.accentColor }}
                    >
                      <Icon className="w-6 h-6 text-heritage-lightGold" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${role.badgeBg}`}>
                      {role.name}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-heritage-deepTeal">
                    {role.name}
                  </h3>
                  <p className="text-xs font-serif italic text-heritage-maroon mt-0.5 mb-3">
                    {role.tagline}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {role.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Role Capabilities:
                    </span>
                    {role.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Radio Action */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {isSelected ? 'Selected' : 'Click to select'}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-heritage-deepTeal bg-heritage-deepTeal' : 'border-slate-300'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Continue to Dashboard Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleContinue}
            disabled={isSaving}
            className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-heritage-deepTeal to-heritage-teal hover:from-heritage-teal hover:to-heritage-deepTeal text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
          >
            <span>Enter Dashboard as {USER_ROLES.find(r => r.id === activeRole)?.name}</span>
            <ArrowRight className="w-4 h-4 text-heritage-gold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
