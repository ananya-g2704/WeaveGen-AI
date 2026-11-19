import React from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

export default function ActionModal({ isOpen, onClose, title, subtitle, actionType }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white border border-heritage-sand rounded-2xl shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Decorative Header */}
        <div className="bg-gradient-to-r from-heritage-deepTeal to-heritage-teal p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-heritage-gold/20 flex items-center justify-center text-heritage-gold mb-3 border border-heritage-gold/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-heritage-cream">{title}</h3>
          <p className="text-xs text-heritage-sand/90 mt-1">{subtitle}</p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-semibold block mb-0.5">Upcoming Module Notice:</span>
              This feature connects to <strong>{title}</strong> (Module {actionType === 'auth' ? '2: Login & Authentication' : actionType === 'generate' ? '5: Design Generation Studio' : '14: AI Assistant & Community'}). We are building each module step-by-step according to our project roadmap.
            </div>
          </div>

          {actionType === 'auth' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center justify-between">
                <span>Supported Roles:</span>
                <span className="font-semibold text-heritage-deepTeal">Artisan • Designer • Admin</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center justify-between">
                <span>Authentication Provider:</span>
                <span className="font-semibold text-heritage-maroon">Supabase Auth (PostgreSQL)</span>
              </div>
            </div>
          )}

          {actionType === 'generate' && (
            <div className="space-y-2 text-xs text-slate-600">
              <p className="font-medium text-slate-800">You will be able to configure:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
                <li>Traditional Motifs (Paisley, Peacock, Lotus, Temple)</li>
                <li>Regional styles (Kanchipuram, Pochampally, Patola, etc.)</li>
                <li>Custom yarn colorways & symmetry options</li>
                <li>cGAN conditioning parameters</li>
              </ul>
            </div>
          )}

          {actionType === 'contact' && (
            <div className="text-xs text-slate-600 space-y-2">
              <p>For research queries, textile dataset collaborations, or B.Tech viva demonstrations, reach out to:</p>
              <div className="p-3 bg-heritage-sand/30 rounded-lg font-mono text-heritage-deepTeal font-medium">
                contact@weavegen-ai.ac.in
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-heritage-deepTeal hover:bg-heritage-teal text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Understood</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
