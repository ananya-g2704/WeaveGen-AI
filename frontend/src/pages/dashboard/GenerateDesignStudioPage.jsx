import React, { useState, useEffect } from 'react';
import DesignForm from '../../components/design/DesignForm';
import DesignVariationsGrid from '../../components/design/DesignVariationsGrid';
import { generateTextileDesign } from '../../services/designGenerationService';
import { Sparkles, ArrowLeft, RefreshCw } from 'lucide-react';

export default function GenerateDesignStudioPage({ onSelectTab, onNavigate }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState(null);

  // Initialize with initial default variations on first render so the user sees results immediately
  useEffect(() => {
    const initDemo = async () => {
      setIsGenerating(true);
      try {
        const initialRes = await generateTextileDesign({
          product: 'saree',
          region: 'tamil_nadu',
          motif: 'Peacock (Mayil)',
          density: 'medium',
          symmetry: 'bilateral',
          style: 'traditional',
          colors: ['#7B1113', '#D4AF37', '#0D4D4D', '#FDFBF7'],
        });
        setGenerationResult(initialRes);
      } catch (err) {
        console.error('Failed to load initial patterns:', err);
      } finally {
        setIsGenerating(false);
      }
    };

    initDemo();
  }, []);

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    try {
      const result = await generateTextileDesign(formData);
      setGenerationResult(result);
      
      // Smoothly scroll down to results
      const resultsEl = document.getElementById('generation-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Generation error:', err);
      alert('Generation encountered an issue. Reverting to procedural demo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (generationResult?.variations?.[0]?.parameters) {
      handleGenerate(generationResult.variations[0].parameters);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-heritage-sand">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-heritage-cream text-heritage-maroon border border-heritage-sand font-semibold">
              Module 05 & 06
            </span>
            <span className="text-xs font-mono text-heritage-deepTeal font-semibold">
              cGAN Studio & Variations
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-heritage-deepTeal mt-1">
            AI Handloom Design Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans">
            Specify regional textile style, traditional motifs, density, and yarn palettes to synthesize novel handloom patterns.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('dashboard')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-heritage-sand/40 border border-heritage-sand rounded-xl text-xs font-semibold text-slate-600 hover:text-heritage-maroon transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard Overview</span>
        </button>
      </div>

      {/* Main Studio Grid: Form (Top/Left) + Results (Bottom/Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Conditioning Input Form */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <DesignForm 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating} 
          />
        </div>

        {/* Right Column: Generated Design Variations */}
        <div id="generation-results" className="lg:col-span-7 space-y-6">
          {isGenerating ? (
            <div className="bg-white border border-heritage-sand rounded-3xl p-12 text-center shadow-xs flex flex-col items-center justify-center min-h-[420px] space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-heritage-maroon/10 text-heritage-maroon flex items-center justify-center relative">
                <Sparkles className="w-7 h-7 animate-pulse text-heritage-gold" />
                <div className="absolute inset-0 border-2 border-heritage-maroon/20 border-t-heritage-maroon rounded-2xl animate-spin" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-heritage-deepTeal">
                  Synthesizing Handloom Pattern Variations...
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans leading-relaxed">
                  Sampling latent vectors conditioned on symmetry axes, yarn warp-weft density, and regional motif grammar.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-sand/40 text-[11px] font-mono text-slate-600">
                <span>Connecting to: cGAN Inference Service</span>
              </div>
            </div>
          ) : generationResult ? (
            <DesignVariationsGrid
              generationResult={generationResult}
              onRegenerate={handleRegenerate}
              onNavigateToVisualization={(v) => onSelectTab('visualization')}
              onNavigateToEditor={(v) => onSelectTab('editor')}
            />
          ) : null}
        </div>

      </div>

    </div>
  );
}
