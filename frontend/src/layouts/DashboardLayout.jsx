import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';

export default function DashboardLayout({ activeTab, onSelectTab, onNavigate, children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onNavigate={onNavigate}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen min-w-0">
        <DashboardHeader
          activeTab={activeTab}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          onSelectTab={onSelectTab}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
