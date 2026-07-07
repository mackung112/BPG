import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, CheckCircle, BookOpen, Sparkles, GraduationCap, Code2, Users, Zap, ArrowRight, X, Package, Award, Sliders, Info } from 'lucide-react';
import coursesData from './data';
import LessonViewer from './components/LessonViewer';
import Storybook from './components/Storybook';
import GradingSimulator from './components/GradingSimulator';
import TeacherBio from './components/TeacherBio';


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
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group no-underline">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-white group-hover:rotate-6 transition-transform" />
            </div>
            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 tracking-tight">ห้องเรียนครูแม็ค</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`cursor-pointer transition-all py-2 border-b-2 hover:text-indigo-600 font-bold no-underline ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-zinc-500 hover:border-indigo-300'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/"
              className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-indigo-200/50 hover:scale-[1.02] active:scale-98 transition-all duration-200 no-underline animate-pulse"
            >
              <BookOpen className="w-4 h-4" /> เริ่มเรียน
            </Link>
          </div>

          {/* Mobile Hamburg Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-650 hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
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
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full justify-center flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-md no-underline"
              >
                <BookOpen className="w-4 h-4" /> เริ่มเรียนรู้
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
      {/* 2️⃣ Layer 2: Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 rounded-full text-sm font-bold mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
            <Sparkles className="w-4 h-4 text-indigo-500" />
            แพลตฟอร์มการเรียนรู้ยุคใหม่แบบ Interactive Lab
          </div>

          <h1 className="text-[38px] md:text-[62px] font-extrabold mb-6 tracking-tight text-zinc-900 leading-tight">
            ยกระดับทักษะเทคโนโลยีกับ
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 pb-2 leading-normal">
              ห้องเรียนครูแม็ค
            </span>
          </h1>

          <p className="text-[17px] md:text-xl text-zinc-650 max-w-3xl mx-auto mb-4 leading-relaxed font-normal">
            เรียนรู้และสนุกสนานไปกับสื่อการเรียนการสอนเทคโนโลยีสารสนเทศและการเขียนโปรแกรม
          </p>
          <p className="text-sm md:text-[16px] text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            ทุกหน่วยเรียนอัดแน่นด้วยแบบจำลองเสมือนจริง (Simulators) ที่กดโต้ตอบได้ สังเกตผลลัพธ์การทำงานแบบเรียลไทม์ เข้าใจเนื้อหาวิชาการได้อย่างรวดเร็วและถูกต้อง
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToCourses}
              className="cursor-pointer group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-[16px] shadow-xl shadow-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-98 transition-all duration-200"
            >
              เริ่มเรียนรู้รายวิชา
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate('/grading')}
              className="cursor-pointer group flex items-center gap-2 px-8 py-3.5 bg-white text-zinc-750 border border-zinc-200 rounded-2xl font-bold text-[16px] hover:bg-zinc-50 hover:border-indigo-300 hover:text-indigo-600 hover:scale-[1.02] active:scale-98 transition-all duration-200"
            >
              <Sliders className="w-5 h-5 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
              เกณฑ์การประเมินผล
            </button>

            <button 
              onClick={() => navigate('/instructor')}
              className="cursor-pointer group flex items-center gap-2 px-8 py-3.5 bg-white/60 backdrop-blur-md text-slate-650 border border-slate-200/80 rounded-2xl font-bold text-[16px] hover:bg-slate-100/80 hover:border-purple-300 hover:text-purple-600 hover:scale-[1.02] active:scale-98 transition-all duration-200"
            >
              <GraduationCap className="w-5 h-5 text-zinc-400 group-hover:text-purple-500 transition-colors" />
              ข้อมูลผู้สอน
            </button>
          </div>
        </div>
      </section>

      {/* 3️⃣ Layer 3: Courses by Category */}
      <main id="courses" className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24 relative z-10 scroll-mt-20 space-y-16">
        {categories.map(cat => {
          const catCourses = coursesData.filter(c => c.id.charAt(0) === cat.key);
          if (catCourses.length === 0) return null;

          return (
            <section key={cat.key} className="space-y-8">
              {/* Category Header */}
              <div className="border-b border-zinc-200/80 pb-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-gradient-to-r ${cat.gradient} text-white shadow-sm`}>
                    {cat.label}
                  </span>
                </div>
                <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-2">
                  หมวดวิชา{cat.fullLabel}
                </h3>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full">
                {catCourses.map((course, idx) => {
                  const lessonCount = course.chapters.reduce((s, ch) => s + ch.lessons.length, 0);
                  const theme = courseThemes[idx % courseThemes.length];

                  return (
                    <div
                      key={course.id}
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2.5 hover:shadow-2xl hover:border-indigo-500/30 cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        {/* Gradient Header */}
                        <div className={`relative h-44 bg-gradient-to-br ${theme.gradient} p-6 flex flex-col justify-end overflow-hidden`}>
                          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-700" />
                          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10" />
                          
                          {/* Course ID Badge */}
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-bold tracking-wider uppercase">
                            {course.id}
                          </div>

                          {/* Emoji icon */}
                          <div className="text-5xl mb-2 drop-shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                            {course.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 pt-5 space-y-3">
                          <h3 className="text-xl font-bold text-zinc-900 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
                            {course.title}
                          </h3>
                          {/* Course ID inline */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
                              {course.id}
                            </span>
                          </div>
                          <p className="text-zinc-500 text-sm leading-relaxed font-normal line-clamp-2">
                            {course.description}
                          </p>

                          {/* Stats row */}
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}>
                              <BookOpen className="w-3.5 h-3.5" />
                              {course.chapters.length} หน่วยเรียน
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}>
                              <Code2 className="w-3.5 h-3.5" />
                              {lessonCount} บทเรียน
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Row */}
                      <div className="px-6 pb-6 pt-4 border-t border-zinc-100/80 flex items-center justify-between">
                        <div className="flex -space-x-1.5">
                          {course.chapters.slice(0, 4).map((_, i) => (
                            <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.gradient} opacity-${80 - i * 15} border-2 border-white`} />
                          ))}
                          {course.chapters.length > 4 && (
                            <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-gray-500">
                              +{course.chapters.length - 4}
                            </div>
                          )}
                        </div>
                        <div className={`flex items-center gap-1 ${theme.accent} font-bold text-sm group-hover:gap-2 transition-all duration-300`}>
                          เข้าเรียนเนื้อหา
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/grading" element={<GradingView />} />
        <Route path="/instructor" element={<InstructorView />} />
        <Route path="/library" element={<Storybook />} />
        <Route path="/course/:courseId" element={<CourseView />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<CourseView />} />
      </Routes>
    </BrowserRouter>
  );
}
