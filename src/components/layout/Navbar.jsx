import { Menu, GraduationCap, ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onToggleMobileMenu }) {
  const location = useLocation();

  // Friendly title mapping
  const getPageTitle = (pathname) => {
    if (pathname === '/admin') return 'แดชบอร์ดภาพรวม';
    if (pathname.startsWith('/admin/teacher-subjects')) return 'รายวิชาและตารางสอน';
    if (pathname.startsWith('/admin/students')) return 'จัดการข้อมูลนักเรียน';
    if (pathname.startsWith('/admin/curriculum-draft')) return 'ร่างหลักสูตร (AI Syllabus)';
    if (pathname.startsWith('/admin/curriculum-structure')) return 'โครงสร้างเนื้อหาหลักสูตร';
    if (pathname.startsWith('/admin/ai-creator')) return 'AI Content Creator';
    if (pathname.startsWith('/admin/documents')) return 'ไฟล์เอกสารและคลังสื่อ';
    if (pathname.startsWith('/admin/worksheets')) return 'ใบงานและภารกิจการสอน';
    if (pathname.startsWith('/admin/questions')) return 'คลังข้อสอบ';
    if (pathname.startsWith('/admin/exam-control')) return 'ระบบสอบ (ควบคุม)';
    if (pathname.startsWith('/admin/exam-results')) return 'ผลคะแนนและการประเมิน';
    if (pathname.startsWith('/admin/users')) return 'จัดการผู้ใช้และแอดมิน';
    if (pathname.startsWith('/admin/docs')) return 'คู่มือและมาตรฐานระบบ';
    return 'แผงควบคุมระบบ';
  };

  const title = getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-30 h-14 lg:h-16 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 flex items-center justify-between px-4 md:px-6 shadow-sm transition-all duration-200 shrink-0">
      {/* Left: Hamburger & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="md:hidden p-2.5 -ml-1.5 min-h-[48px] min-w-[48px] flex items-center justify-center text-zinc-700 hover:text-indigo-600 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer shrink-0"
          aria-label="เปิดเมนูนำทาง"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-zinc-500 min-w-0">
          <Link to="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1 no-underline text-zinc-500 shrink-0">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">หน้าแรก</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="font-bold text-zinc-900 truncate">{title}</span>
        </nav>
      </div>

      {/* Right: Quick actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[40px] text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl transition-all no-underline"
        >
          <GraduationCap className="w-4 h-4" />
          <span className="hidden sm:inline">ดูหน้านักเรียน</span>
          <span className="sm:hidden">หน้านักเรียน</span>
        </Link>
      </div>
    </header>
  );
}
