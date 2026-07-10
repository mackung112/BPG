import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Home, Play, Trophy } from 'lucide-react';

export default function DashboardLayout() {
  const { user, isSuperAdmin, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-950 text-white flex flex-col">
        <div className="p-6 border-b border-indigo-900/50">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-indigo-400 mt-1">{user?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-900 transition-colors">
            <LayoutDashboard className="w-5 h-5" /> ภาพรวม
          </Link>
          <Link to="/admin/students" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-900 transition-colors">
            <Users className="w-5 h-5" /> จัดการนักเรียน
          </Link>
          <Link to="/admin/questions" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-900 transition-colors">
            <FileText className="w-5 h-5" /> คลังข้อสอบ
          </Link>
          <Link to="/admin/exam-control" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-900 transition-colors">
            <Play className="w-5 h-5" /> แผงควบคุมสอบ
          </Link>
          <Link to="/admin/exam-results" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-900 transition-colors">
            <Trophy className="w-5 h-5" /> ผลคะแนนสอบ
          </Link>
          {isSuperAdmin && (
            <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-900 transition-colors">
              <Settings className="w-5 h-5" /> จัดการแอดมิน
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-indigo-900/50 space-y-2">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-indigo-900/50 transition-colors">
            <Home className="w-5 h-5" /> กลับหน้าแอปหลัก
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" /> ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
