import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { NAVIGATION_CATEGORIES } from './sidebarNavigation';
import { useTeacherSubjects } from '../../contexts/TeacherSubjectsContext';
import { FileText } from 'lucide-react';
import { LogOut, GraduationCap, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isSuperAdmin, logoutAdmin } = useAuth();
  const { subjects, loading } = useTeacherSubjects();

  // Auto-lock body scroll on mobile drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation: Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname === path || (path !== '/' && path !== '/admin' && location.pathname.startsWith(path));
  };

  const handleLogout = async () => {
    onClose?.();
    await logoutAdmin();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50
          w-[280px] md:w-[72px] lg:w-64
          bg-indigo-950 text-indigo-100 flex flex-col
          transition-transform duration-300 ease-in-out border-r border-indigo-900/40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
        aria-label="เมนูหลักการจัดการ"
      >
        {/* Sidebar Brand Header */}
        <div className="p-4 lg:px-5 lg:py-4 border-b border-indigo-900/60 flex items-center justify-between shrink-0 bg-indigo-950/90 backdrop-blur-md">
          <Link
            to="/admin"
            onClick={onClose}
            className="flex items-center gap-3 group no-underline text-white min-w-0"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-900/40 shrink-0 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 md:hidden lg:block">
              <h2 className="text-base font-extrabold tracking-tight text-white truncate">ห้องเรียนครูแม็ค</h2>
              <p className="text-[11px] text-indigo-300 font-medium truncate">LMS Management Portal</p>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-2 min-h-[48px] min-w-[48px] flex items-center justify-center text-indigo-300 hover:text-white hover:bg-indigo-900/60 rounded-xl transition-colors cursor-pointer"
            aria-label="ปิดเมนู"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Categories */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
                    {NAVIGATION_CATEGORIES.map((category) => {
            let categoryItems = [...category.items];
            
            // Dynamically inject subjects into Course Materials
            if (category.id === 'course_materials') {
              if (loading) {
                 categoryItems = [{ to: '#', label: '���ѧ��Ŵ...', icon: FileText }];
              } else if (subjects.length > 0) {
                 categoryItems = subjects.map(s => ({
                    to: "/admin/course-materials/" + s.id,
                    icon: FileText,
                    label: s.subject_code,
                    title: s.subject_name
                 }));
              } else {
                 categoryItems = [{ to: '/admin/teacher-subjects', label: '�����Ԫҷ����', icon: BookOpen }];
              }
            }

            const visibleItems = categoryItems.filter(
              (item) => !item.requireSuperAdmin || isSuperAdmin
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={category.id} className="space-y-1">
                {/* Category Header Label */}
                <div className="px-3 pb-1 md:hidden lg:block">
                  <span className="text-[11px] font-bold text-indigo-400/80 uppercase tracking-wider">
                    {category.label}
                  </span>
                </div>
                {/* Tablet Separator */}
                <div className="hidden md:block lg:hidden h-px bg-indigo-900/60 my-2 mx-1" />

                {/* Items */}
                <div className="space-y-1">
                  {visibleItems.map((item) => {
                    const active = isActive(item.to, item.exact);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={onClose}
                        title={item.label}
                        className={`
                          flex items-center gap-3 px-3.5 py-2.5 min-h-[48px] md:min-h-[44px] lg:min-h-[40px] rounded-xl text-sm font-semibold transition-all duration-200 group no-underline relative cursor-pointer
                          ${
                            active
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                              : 'text-indigo-200/90 hover:bg-indigo-900/60 hover:text-white'
                          }
                        `}
                      >
                        <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${active ? 'scale-105' : 'group-hover:scale-110'}`} />
                        <span className="md:hidden lg:block truncate flex-1">{item.label}</span>

                        {/* Badges */}
                        {item.badge && (
                          <span className="md:hidden lg:inline-flex px-2 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {item.requireSuperAdmin && (
                          <span className="md:hidden lg:inline-flex px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-md">
                            Super
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer: User Profile & Logout */}
        <div className="p-3 border-t border-indigo-900/60 space-y-1 bg-indigo-950/80 shrink-0">
          <div className="px-3 py-2 md:hidden lg:flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-indigo-800 border border-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase">
              {user?.email?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{user?.email}</p>
              <p className="text-[10px] text-indigo-400 capitalize truncate">{isSuperAdmin ? 'Super Admin' : 'Instructor'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 min-h-[48px] md:min-h-[44px] lg:min-h-[40px] rounded-xl text-sm font-semibold text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 transition-colors cursor-pointer"
            title="ออกจากระบบ"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="md:hidden lg:block truncate">ออกจากระบบ</span>
          </button>
        </div>
      </aside>
    </>
  );
}


