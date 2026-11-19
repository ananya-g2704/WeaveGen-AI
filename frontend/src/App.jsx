import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import DashboardPage from './pages/DashboardPage';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('landing');
  const [dashboardInitialTab, setDashboardInitialTab] = useState('dashboard');

  // If user is logged in and visits login/signup, redirect to dashboard
  useEffect(() => {
    if (!loading && user && (currentView === 'login' || currentView === 'signup')) {
      setCurrentView('dashboard');
    }
  }, [user, loading, currentView]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-heritage-maroon/20 border-t-heritage-maroon rounded-full animate-spin" />
          <span className="text-xs font-serif font-semibold text-heritage-deepTeal tracking-wide">
            Loading WeaveGen AI...
          </span>
        </div>
      </div>
    );
  }

  const navigateTo = (view, tab = 'dashboard') => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setDashboardInitialTab(tab);
    setCurrentView(view);
  };

  switch (currentView) {
    case 'login':
      return <LoginPage onNavigate={navigateTo} />;
    case 'signup':
      return <SignupPage onNavigate={navigateTo} />;
    case 'role-selection':
      return <RoleSelectionPage onNavigate={navigateTo} />;
    case 'dashboard':
      return <DashboardPage onNavigate={navigateTo} initialTab={dashboardInitialTab} />;
    case 'landing':
    default:
      return <LandingPage onNavigate={navigateTo} />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
