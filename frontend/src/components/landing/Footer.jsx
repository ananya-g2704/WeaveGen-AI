import React from 'react';
import { Mail, MapPin, Github, ExternalLink, Heart } from 'lucide-react';

export default function Footer({ onOpenAuthModal, onOpenContactModal }) {
  return (
    <footer id="contact" className="bg-heritage-deepTeal text-heritage-cream border-t border-heritage-gold/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-heritage-maroon to-heritage-deepMaroon flex items-center justify-center text-heritage-gold shadow-md">
                <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16M8 3v18M16 3v18" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                WeaveGen <span className="text-heritage-gold">AI</span>
              </span>
            </div>
            
            <p className="text-xs text-heritage-sand/80 leading-relaxed max-w-sm">
              Generative Intelligence for Handloom Design Innovation. 
              Bridging India’s traditional weaving heritage with Conditional GANs, automated color extraction, and production-ready loom tools.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p className="font-medium text-heritage-gold">B.Tech Computer Science & Engineering</p>
              <p className="text-[11px] text-slate-400">Final Year Major Project • Academic Capstone 2026</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-heritage-gold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-heritage-sand/80">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Project</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#designs" className="hover:text-white transition-colors">Explore Designs</a></li>
              <li><a href="#heritage" className="hover:text-white transition-colors">Textile Heritage</a></li>
            </ul>
          </div>

          {/* Planned Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-heritage-gold">
              Core Modules
            </h4>
            <ul className="space-y-2 text-xs text-heritage-sand/80">
              <li><button onClick={() => onOpenAuthModal('Login')} className="hover:text-white text-left transition-colors">Artisan & Designer Portal</button></li>
              <li><a href="#designs" className="hover:text-white transition-colors">Design Generation Studio</a></li>
              <li><a href="#designs" className="hover:text-white transition-colors">Product Visualization</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Weave Specifications</a></li>
              <li><button onClick={onOpenContactModal} className="hover:text-white text-left transition-colors">AI Design Assistant</button></li>
            </ul>
          </div>

          {/* Contact & Viva Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-heritage-gold">
              Research & Contact
            </h4>
            <div className="space-y-2 text-xs text-heritage-sand/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-heritage-gold flex-shrink-0 mt-0.5" />
                <span>Department of CSE, Engineering Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-heritage-gold flex-shrink-0" />
                <button onClick={onOpenContactModal} className="hover:text-white underline">
                  contact@weavegen-ai.ac.in
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenContactModal}
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/20"
              >
                Inquire for Collaboration
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 WeaveGen AI. All rights reserved. Handcrafted with traditional reverence.</p>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-heritage-maroon fill-current" />
            <span>for Indian Handloom Artisans & Weavers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
