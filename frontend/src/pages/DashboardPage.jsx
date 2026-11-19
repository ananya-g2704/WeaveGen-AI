import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardOverviewPage from './dashboard/DashboardOverviewPage';
import GenerateDesignStudioPage from './dashboard/GenerateDesignStudioPage';
import ProductVisualizationPage from './dashboard/ProductVisualizationPage';
import DesignAnalysisPage from './dashboard/DesignAnalysisPage';
import PlaceholderModulePage from './dashboard/PlaceholderModulePage';

export default function DashboardPage({ onNavigate, initialTab = 'dashboard' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activePattern, setActivePattern] = useState(null);

  const handleSelectTabWithPattern = (tab, pattern = null) => {
    if (pattern) {
      setActivePattern(pattern);
    }
    setActiveTab(tab);
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onNavigate={onNavigate}
    >
      {activeTab === 'dashboard' ? (
        <DashboardOverviewPage 
          onSelectTab={setActiveTab} 
          onNavigate={onNavigate} 
        />
      ) : activeTab === 'generate' ? (
        <GenerateDesignStudioPage
          onSelectTab={(tab, pattern) => handleSelectTabWithPattern(tab, pattern)}
          onNavigate={onNavigate}
        />
      ) : activeTab === 'visualization' ? (
        <ProductVisualizationPage
          onSelectTab={setActiveTab}
          initialPattern={activePattern}
        />
      ) : activeTab === 'analysis' ? (
        <DesignAnalysisPage
          onSelectTab={setActiveTab}
        />
      ) : (
        <PlaceholderModulePage 
          moduleId={activeTab} 
          onSelectTab={setActiveTab} 
        />
      )}
    </DashboardLayout>
  );
}
