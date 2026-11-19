import React, { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturedDesigns from '../components/landing/FeaturedDesigns';
import HeritageSection from '../components/landing/HeritageSection';
import Footer from '../components/landing/Footer';
import ActionModal from '../components/landing/ActionModal';

export default function LandingPage({ onNavigate }) {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
    actionType: 'generate',
  });

  const handleOpenAuth = (type) => {
    if (type === 'Login') {
      onNavigate('login');
    } else {
      onNavigate('signup');
    }
  };

  const handleOpenGenerate = () => {
    setModalConfig({
      isOpen: true,
      title: 'AI Design Generation Studio',
      subtitle: 'Condition your handloom pattern by motif, region, symmetry, and color palette.',
      actionType: 'generate',
    });
  };

  const handleOpenContact = () => {
    setModalConfig({
      isOpen: true,
      title: 'Contact Research Team',
      subtitle: 'Academic inquiries, handloom dataset contributions, and project demonstrations.',
      actionType: 'contact',
    });
  };

  const handleSelectDesign = (design) => {
    setModalConfig({
      isOpen: true,
      title: `${design.title} — Analysis & 2D Draping`,
      subtitle: `${design.region} • ${design.weaveType} • ${design.motif}`,
      actionType: 'generate',
    });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('heritage');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-heritage-cream text-slate-900 flex flex-col font-sans selection:bg-heritage-gold/30 selection:text-heritage-deepMaroon">
      {/* Top Sticky Navigation */}
      <Navbar onOpenAuthModal={handleOpenAuth} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero 
          onOpenGenerateModal={handleOpenGenerate}
          onExploreClick={handleExploreClick}
        />

        {/* 2. About WeaveGen AI */}
        <About />

        {/* 3. How It Works Pipeline */}
        <HowItWorks onOpenGenerateModal={handleOpenGenerate} />

        {/* 4. Featured Regional Handloom Designs */}
        <FeaturedDesigns onSelectDesign={handleSelectDesign} />

        {/* 5. Indian Textile Heritage Section */}
        <HeritageSection onOpenGenerateModal={handleOpenGenerate} />
      </main>

      {/* Footer */}
      <Footer 
        onOpenAuthModal={handleOpenAuth} 
        onOpenContactModal={handleOpenContact}
      />

      {/* Upcoming Module Guidance Modal */}
      <ActionModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        subtitle={modalConfig.subtitle}
        actionType={modalConfig.actionType}
      />
    </div>
  );
}
