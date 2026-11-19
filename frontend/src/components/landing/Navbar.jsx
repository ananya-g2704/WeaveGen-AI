import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, LogIn, UserPlus } from 'lucide-react';

export default function Navbar({ onOpenAuthModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Explore Designs', href: '#designs' },
    { name: 'Textile Heritage', href: '#heritage' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-heritage-cream/95 backdrop-blur-md shadow-sm border-b border-heritage-sand py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-heritage-maroon to-heritage-deepMaroon flex items-center justify-center text-heritage-gold shadow-md group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16M8 3v18M16 3v18" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-heritage-deepTeal">
                WeaveGen <span className="text-heritage-gold">AI</span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest text-slate-500 font-sans uppercase">
                Handloom Innovation
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-heritage-maroon rounded-lg hover:bg-heritage-sand/40 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenAuthModal('Login')}
              className="px-4 py-2 text-xs font-semibold text-heritage-deepTeal hover:text-heritage-maroon border border-heritage-deepTeal/20 hover:border-heritage-maroon rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => onOpenAuthModal('Sign Up')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-heritage-deepTeal to-heritage-teal hover:from-heritage-teal hover:to-heritage-deepTeal rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-heritage-maroon focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-heritage-cream border-b border-heritage-sand px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 text-base font-medium text-slate-800 hover:text-heritage-maroon hover:bg-heritage-sand/50 rounded-lg"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-heritage-sand/60 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal('Login');
              }}
              className="w-full py-2.5 text-sm font-semibold text-heritage-deepTeal border border-heritage-deepTeal/30 rounded-lg text-center flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal('Sign Up');
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-heritage-deepTeal rounded-lg shadow text-center flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
