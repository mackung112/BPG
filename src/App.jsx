import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, CheckCircle, BookOpen, Sparkles, GraduationCap, Code2, Users, Zap, ArrowRight, X, Package, Award, Sliders, Info } from 'lucide-react';
import coursesData from './data';
import LessonViewer from './components/LessonViewer';
import Storybook from './components/Storybook';
import GradingSimulator from './components/GradingSimulator';
import TeacherBio from './components/TeacherBio';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import DashboardLayout from './pages/admin/DashboardLayout';
import StudentManagement from './pages/admin/StudentManagement';
import QuestionBank from './pages/admin/QuestionBank';
import AdminManagement from './pages/admin/AdminManagement';
import ExamControl from './pages/admin/ExamControl';
import ExamResults from './pages/admin/ExamResults';
import ExamLobby from './pages/exam/ExamLobby';
import ExamRoom from './pages/exam/ExamRoom';
import ExamResult from './pages/exam/ExamResult';

function PageLayout({ children, activePage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'หน้าแรก / รายวิชา', path: '/', id: 'home' },
    { name: 'เกณฑ์คะแนน', path: '/grading', id: 'grading' },
    { name: 'ข้อมูลผู้สอน', path: '/instructor', id: 'instructor' }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-800 font-sans relative overflow-x-hidden">
      {/* 1️⃣ Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-indigo-200/25 blur-[130px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-200/20 blur-[130px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute bottom-[10%] left-[-5%] w-[42vw] h-[42vw] rounded-full bg-violet-200/25 blur-[140px] animate-pulse" style={{ animationDelay: '4s', animationDuration: '9s' }} />
        <div className="absolute bottom-[-10%] right-[10%] w-[38vw] h-[38vw] rounded-full bg-rose-200/20 blur-[120px] animate-pulse" style={{ animationDelay: '6s', animationDuration: '8s' }} />
      </div>

      {/* Floating Glassmorphic Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group no-underline relative z-10">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-white group-hover:rotate-6 transition-transform" />
            </div>
            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 tracking-tight">ห้องเรียนครูแม็ค</span>
          </Link>

          {/* Desktop Nav Links (Center) */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-8 text-sm font-semibold pointer-events-auto">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`cursor-pointer transition-all py-2 border-b-2 hover:text-indigo-600 font-bold uppercase tracking-wide no-underline ${
                      isActive
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-zinc-600 hover:border-indigo-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop CTA (Right) */}
          <div className="hidden md:block relative z-10">
            <Link
              to="/login"
              className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-full font-bold text-sm hover:shadow-lg hover:shadow-zinc-500/30 hover:scale-[1.02] active:scale-98 transition-all duration-200 no-underline"
            >
              เข้าสู่ระบบ
            </Link>
          </div>

          {/* Mobile Hamburg Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-650 hover:bg-black/5 rounded-xl transition-colors cursor-pointer relative z-10"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-2xl p-4 space-y-3 shadow-xl">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold transition-colors block no-underline ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-zinc-700 hover:bg-slate-50 hover:text-indigo-500'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full justify-center flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-md no-underline"
              >
                <BookOpen className="w-4 h-4" /> เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Contents */}
      <div className="relative z-10">
        {children}
      </div>

      {/* 4️⃣ Layer 4: Standardized Footer */}
      <footer className="py-12 bg-zinc-950 text-zinc-400 border-t border-zinc-900 relative z-10">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg text-white">ห้องเรียนครูแม็ค</span>
          </div>
          <p className="text-xs md:text-sm text-zinc-500 font-normal">
            แพลตฟอร์มการเรียนรู้เชิงโต้ตอบยุคใหม่ด้านเทคโนโลยี วิทยาการคอมพิวเตอร์ และการเขียนโปรแกรม
          </p>
          <p className="text-xs text-zinc-600 mt-4">
            © 2026 Mack's Classroom. สร้างสรรค์ด้วย ❤️ เพื่อพัฒนาศักยภาพผู้เรียน
          </p>
        </div>
      </footer>
    </div>
  );
}

function HomeView() {
  const navigate = useNavigate();

  const categories = [
    { key: '2', label: 'ปวช.', fullLabel: 'ประกาศนียบัตรวิชาชีพ', accent: 'indigo', gradient: 'from-indigo-600 to-purple-600' },
    { key: '3', label: 'ปวส.', fullLabel: 'ประกาศนียบัตรวิชาชีพชั้นสูง', accent: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
  ];

  const scrollToCourses = () => {
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const courseThemes = [
    { gradient: 'from-violet-600 via-indigo-600 to-blue-500', badge: 'bg-violet-50 text-violet-700 border-violet-100', accent: 'text-violet-600', glow: 'shadow-violet-200/30' },
    { gradient: 'from-emerald-500 via-teal-500 to-cyan-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100', accent: 'text-emerald-600', glow: 'shadow-emerald-200/30' },
    { gradient: 'from-rose-500 via-pink-500 to-fuchsia-500', badge: 'bg-rose-50 text-rose-700 border-rose-100', accent: 'text-rose-600', glow: 'shadow-rose-200/30' },
    { gradient: 'from-amber-500 via-orange-500 to-red-500', badge: 'bg-amber-50 text-amber-700 border-amber-100', accent: 'text-amber-600', glow: 'shadow-amber-200/30' },
    { gradient: 'from-cyan-500 via-blue-500 to-indigo-500', badge: 'bg-cyan-50 text-cyan-700 border-cyan-100', accent: 'text-cyan-600', glow: 'shadow-cyan-200/30' },
    { gradient: 'from-lime-500 via-green-500 to-emerald-500', badge: 'bg-lime-50 text-lime-700 border-lime-100', accent: 'text-lime-600', glow: 'shadow-lime-200/30' },
  ];

  return (
    <PageLayout activePage="home">
      {/* 2️⃣ Layer 2: Hero Section (Redesigned) */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8 pb-16">
        <div className="relative w-full rounded-[30px] sm:rounded-[40px] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center p-8 sm:p-12 md:p-16 lg:p-20 min-h-[400px] md:min-h-[500px]">
          {/* Background Image & Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop")' }}
          />
          {/* Beautiful Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-purple-900/80 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-80" />
          
          {/* Content Area (Left-aligned) */}
          <div className="relative z-10 w-full lg:w-[65%] xl:w-[70%] text-left space-y-5 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15]">
              <span className="text-white drop-shadow-md">ยกระดับทักษะเทคโนโลยีกับ </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 drop-shadow-lg">
                ห้องเรียนครูแม็ค
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-zinc-200 max-w-lg leading-relaxed drop-shadow-md font-medium">
              เรียนรู้สนุกกับสื่อ Interactive Lab สังเกตผลลัพธ์แบบเรียลไทม์ เข้าใจง่ายและนำไปใช้ได้จริง
            </p>

            <div className="pt-2 sm:pt-4 flex items-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="cursor-pointer flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-full font-bold text-[15px] sm:text-[16px] shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-98 transition-all duration-300"
              >
                เข้าสู่ระบบ / เริ่มเรียน
              </button>
            </div>
          </div>

          {/* Right Floating Element (Like the image) */}
          <div className="hidden md:flex relative z-10 w-1/2 justify-end">
            <div className="bg-white/80 backdrop-blur-md border border-white rounded-3xl p-5 shadow-xl flex items-center gap-4 translate-y-12 translate-x-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900">เรียนรู้ได้ทุกที่</p>
                <p className="text-xs text-zinc-500">บทเรียนกว่า 100+ บท</p>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-400 ml-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Layer 3: Courses by Category */}
      <main id="courses" className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24 relative z-10 scroll-mt-20 space-y-16">
        {categories.map(cat => {
          const catCourses = coursesData.filter(c => c.id.charAt(0) === cat.key);
          if (catCourses.length === 0) return null;

          return (
            <section key={cat.key} className="space-y-6">
              {/* Category Header (Redesigned like 'Popular Destination') */}
              <div className="flex items-end justify-between pb-2">
                <div>
                  <h2 className="text-[28px] font-extrabold text-zinc-900 leading-tight">
                    หมวดวิชา{cat.fullLabel}
                  </h2>
                  <p className="text-zinc-500 text-sm mt-1">
                    รายวิชาเรียนในระดับ{cat.fullLabel}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 transition-colors cursor-pointer">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-md cursor-pointer">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Course Cards Grid (Redesigned to Image-Top, Text-Bottom layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {catCourses.map((course, idx) => {
                  const lessonCount = course.chapters.reduce((s, ch) => s + ch.lessons.length, 0);
                  const theme = courseThemes[idx % courseThemes.length];

                  return (
                    <div
                      key={course.id}
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="bg-white rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 overflow-hidden cursor-pointer group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col"
                    >
                      {/* Gradient Header */}
                      <div className={`relative h-[170px] bg-gradient-to-br ${theme.gradient} p-5 flex flex-col justify-end overflow-hidden`}>
                        {/* Decorative Circles */}
                        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10" />
                        <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/10" />
                        
                        {/* Course ID Badge */}
                        <div className="absolute top-5 left-5 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wider">
                          {course.id}
                        </div>

                        {/* Emoji icon */}
                        <div className="text-[64px] drop-shadow-xl translate-y-3 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                          {course.icon}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 pt-7 space-y-4 flex-1 flex flex-col">
                        <div>
                          <h3 className="text-[19px] font-extrabold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
                            {course.title}
                          </h3>
                          <p className="text-slate-500 text-[13.5px] leading-relaxed mt-2.5 line-clamp-2">
                            {course.description}
                          </p>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11.5px] font-bold ${theme.badge}`}>
                            <BookOpen className="w-3.5 h-3.5" />
                            {course.chapters.length} หน่วยเรียน
                          </span>
                          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11.5px] font-bold ${theme.badge}`}>
                            <Code2 className="w-3.5 h-3.5" />
                            {lessonCount} บทเรียนหลัก
                          </span>
                          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11.5px] font-bold ${theme.badge}`}>
                            <Zap className="w-3.5 h-3.5" />
                            Interactive Lab
                          </span>
                        </div>
                      </div>

                      {/* Bottom Footer Area */}
                      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
                        {/* Overlapping Avatars/Dots */}
                        <div className="flex -space-x-2">
                          {course.chapters.slice(0, 4).map((_, i) => (
                            <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.gradient} opacity-${90 - i * 10} border-2 border-white shadow-sm`} />
                          ))}
                          {course.chapters.length > 4 && (
                            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">
                              +{course.chapters.length - 4}
                            </div>
                          )}
                        </div>
                        
                        {/* Call to action */}
                        <div className={`flex items-center gap-1.5 text-[14px] font-bold ${theme.accent} group-hover:gap-2.5 transition-all duration-300`}>
                          เข้าเรียนเนื้อหา
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </PageLayout>
  );
}



function GradingView() {
  return (
    <PageLayout activePage="grading">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24 relative z-10">
        <section className="space-y-8">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-cyan-600 tracking-wider uppercase">
              Grading & Evaluation
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เกณฑ์การวัดและประเมินผลรายวิชา
            </h3>
          </div>
          <GradingSimulator />
        </section>
      </main>
    </PageLayout>
  );
}

function InstructorView() {
  return (
    <PageLayout activePage="instructor">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24 relative z-10">
        <section className="space-y-8">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              Course Instructor
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ข้อมูลอาจารย์ผู้สอน
            </h3>
          </div>
          <TeacherBio />
        </section>
      </main>
    </PageLayout>
  );
}

function CourseView() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find(c => c.id === courseId);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState({});
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lessonId]);

  if (!course) return <div className="p-8 text-center text-2xl font-bold">ไม่พบวิชาเรียนนี้</div>;

  const firstLessonId = course.chapters[0]?.lessons[0]?.id;
  const currentLessonId = lessonId || firstLessonId;

  let currentLesson = null;
  let currentChapter = null;
  course.chapters.forEach(ch => {
    const lesson = ch.lessons?.find(l => l?.id === currentLessonId);
    if (lesson) {
      currentLesson = lesson;
      currentChapter = ch;
    }
  });

  const allLessons = course.chapters.flatMap(ch => ch.lessons);
  const currentIndex = allLessons.findIndex(l => l?.id === currentLessonId);

  const markCompleted = () => {
    setCompletedLessons(prev => ({ ...prev, [currentLessonId]: true }));
  };

  const handlePrevLesson = () => {
    const prevLesson = allLessons[currentIndex - 1];
    if (prevLesson) {
      navigate(`/course/${course.id}/lesson/${prevLesson.id}`);
    }
  };

  const handleNextLesson = () => {
    const nextLesson = allLessons[currentIndex + 1];
    if (nextLesson) {
      navigate(`/course/${course.id}/lesson/${nextLesson.id}`);
    } else {
      navigate('/');
    }
  };

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Top Navbar - Full Width */}
      <nav className="h-14 bg-white border-b border-gray-200/80 flex items-center justify-between px-4 md:px-6 shrink-0 z-40 relative shadow-sm">
        <div className="flex items-center gap-2 md:gap-3">
          <button className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMobileSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <button className="hidden md:block p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}>
            <Menu className="w-5 h-5" />
          </button>
          
          <button onClick={() => navigate('/')} className="font-bold text-lg flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 hidden sm:block">
              ห้องเรียนครูแม็ค
            </span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors border border-gray-200 hover:border-gray-300">
            <ChevronLeft className="w-4 h-4" /> กลับหน้ารวมวิชา
          </button>
          <div className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-full">
            บทที่ {currentIndex + 1} จาก {allLessons.length}
          </div>
        </div>
      </nav>

      {/* Main Container below Navbar */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`absolute md:relative inset-y-0 left-0 z-50 w-80 shrink-0 bg-indigo-950 text-indigo-100 transition-all duration-300 ease-in-out flex flex-col ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${isDesktopSidebarOpen ? 'md:ml-0' : 'md:-ml-80'}`}>
          <div className="p-5 border-b border-indigo-900/50 flex items-center justify-between shrink-0 bg-indigo-950">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-white tracking-tight truncate">{course.title}</h2>
              <p className="text-indigo-400 text-xs mt-1">เนื้อหาบทเรียน</p>
            </div>
            <button className="md:hidden p-1.5 hover:bg-indigo-800 rounded-lg transition-colors" onClick={() => setIsMobileSidebarOpen(false)}>
              <X className="w-5 h-5 text-indigo-300" />
            </button>
          </div>

          {/* Sidebar scrollable content */}
          <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
            {course.chapters.map(chapter => (
              <div key={chapter.id} className="mb-4">
                <div className="px-5 py-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  {chapter.title}
                </div>
                <ul className="space-y-0.5">
                  {chapter.lessons.map(lesson => {
                    const isActive = lesson.id === currentLessonId;
                    const isCompleted = completedLessons[lesson.id];

                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => {
                            navigate(`/course/${course.id}/lesson/${lesson.id}`);
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full text-left px-5 py-2.5 transition-all flex items-center gap-3 text-sm ${
                            isActive
                              ? 'bg-indigo-600 text-white font-semibold border-r-4 border-white shadow-lg shadow-indigo-800/30'
                              : 'hover:bg-indigo-900/50 text-indigo-200'
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> : <div className={`w-4 h-4 rounded-full border shrink-0 ${isActive ? 'border-white bg-white/20' : 'border-indigo-500'}`} />}
                          <span className="truncate">{lesson.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-indigo-900/50 shrink-0">
            <div className="text-xs text-center text-indigo-400/50">
              © ห้องเรียนครูแม็ค
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto relative z-0">
          <div className="w-full">
            {currentLesson ? (
              <LessonViewer
                lesson={currentLesson}
                chapter={currentChapter}
                onComplete={markCompleted}
                onNext={handleNextLesson}
                onPrev={handlePrevLesson}
                hasPrev={hasPrev}
                hasNext={hasNext}
              />
            ) : (
              <div className="text-center py-20 text-gray-600 text-xl">โปรดเลือกบทเรียนจากเมนูด้านซ้าย</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/grading" element={<GradingView />} />
          <Route path="/instructor" element={<InstructorView />} />
          <Route path="/library" element={<Storybook />} />
          
          {/* Exam Routes (Protected implicitly inside components via useAuth) */}
          <Route path="/exam-lobby/:sessionId" element={<ExamLobby />} />
          <Route path="/exam-room/:sessionId" element={<ExamRoom />} />
          <Route path="/exam-result/:sessionId" element={<ExamResult />} />

          <Route path="/course/:courseId" element={<CourseView />} />
          <Route path="/course/:courseId/lesson/:lessonId" element={<CourseView />} />
          
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold mb-4">ยินดีต้อนรับสู่ระบบจัดการ (Admin)</h1>
                <p className="text-gray-500">เลือกเมนูด้านซ้ายเพื่อเริ่มต้นใช้งานระบบจัดการ LMS</p>
              </div>
            } />
            <Route path="students" element={<StudentManagement />} />
            <Route path="questions" element={<QuestionBank />} />
            <Route path="exam-control" element={<ExamControl />} />
            <Route path="exam-results" element={<ExamResults />} />
            <Route path="users" element={
              <ProtectedRoute requireSuperAdmin={true}>
                <AdminManagement />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
