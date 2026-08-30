import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';

export default function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-800 flex overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar onToggleMobileMenu={() => setIsMobileOpen(true)} />

        {/* Page View Outlet */}
        <main className="flex-1 p-3.5 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
