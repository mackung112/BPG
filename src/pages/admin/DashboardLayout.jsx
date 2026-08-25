import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Home, Play, Trophy, Menu, X } from 'lucide-react';

export default function DashboardLayout() {
  const { user, isSuperAdmin, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'ภาพรวม', exact: true },
    { to: '/admin/students', icon: Users, label: 'จัดการนักเรียน' },
    { to: '/admin/questions', icon: FileText, label: 'คลังข้อสอบ' },
    { to: '/admin/exam-control', icon: Play, label: 'แผงควบคุมสอบ' },
    { to: '/admin/exam-results', icon: Trophy, label: 'ผลคะแนนสอบ' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const NavLink = ({ to, icon: Icon, label, exact = false }) => {
    const active = isActive(to, exact);
    return (
      <Link
        to={to}
        onClick={() => setIsMobileOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 min-h-[48px] md:min-h-[44px] lg:min-h-[40px] rounded-xl transition-all duration-200 cursor-pointer group no-underline ${
          active
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-800/30 font-semibold'
            : 'text-indigo-200 hover:bg-indigo-900 hover:text-white'
        }`}
        title={label}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {/* Label: hidden on tablet (md:), visible on desktop (lg:) and mobile drawer */}
        <span className="lg:block md:hidden block truncate text-sm font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar — 3 responsive levels */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-50
        w-[280px] md:w-[72px] lg:w-64
        bg-indigo-950 text-white flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        {/* Sidebar Header */}
        <div className="p-4 lg:p-6 border-b border-indigo-900/50 flex items-center justify-between shrink-0">
          <div className="min-w-0 md:hidden lg:block">
            <h2 className="text-xl font-bold truncate">Admin Panel</h2>
            <p className="text-sm text-indigo-400 mt-1 truncate">{user?.email}</p>
          </div>
          {/* Tablet: show icon only */}
          <div className="hidden md:flex lg:hidden items-center justify-center w-full">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
          </div>
          {/* Mobile close button */}
          <button
            className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-indigo-800 rounded-lg transition-colors cursor-pointer"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="w-5 h-5 text-indigo-300" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <NavLink key={item.to} {...item} />
          ))}
          {isSuperAdmin && (
            <NavLink to="/admin/users" icon={Settings} label="จัดการแอดมิน" />
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 lg:p-4 border-t border-indigo-900/50 space-y-1 lg:space-y-2 shrink-0">
          <Link
            to="/"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 min-h-[48px] md:min-h-[44px] lg:min-h-[40px] rounded-xl text-gray-300 hover:text-white hover:bg-indigo-900/50 transition-colors cursor-pointer no-underline"
            title="กลับหน้าแอปหลัก"
          >
            <Home className="w-5 h-5 shrink-0" />
            <span className="lg:block md:hidden block text-sm font-medium truncate">กลับหน้าแอปหลัก</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 min-h-[48px] md:min-h-[44px] lg:min-h-[40px] rounded-xl text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            title="ออกจากระบบ"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="lg:block md:hidden block text-sm font-medium truncate">ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar with mobile hamburger */}
        <header className="h-14 lg:h-16 bg-white border-b border-gray-200/80 flex items-center px-4 md:px-6 shrink-0 shadow-sm md:hidden">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-3 -ml-2 min-h-[48px] min-w-[48px] flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="ml-2 font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600">
            Admin Panel
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
