import { BookMarked, Code, FileText, CheckCircle2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SystemDocsView() {
  const docSections = [
    {
      title: 'Design System & Component Tokens',
      desc: 'แนวทางการออกแบบ UI 4 เลเยอร์ การใช้ Tailwind CSS v4 โทเค็นสี และมาตรฐานความปลอดภัยทางสายตา',
      tag: 'UI/UX'
    },
    {
      title: 'Curriculum & Syllabus Standard',
      desc: 'โครงสร้างไฟล์แผนการสอน การจัดระเบียบสารบัญ Anchor Links และการจัดการวิชา',
      tag: 'Architecture'
    },
    {
      title: 'Exam System Context & Anti-Cheat Rules',
      desc: 'ระบบคลังข้อสอบ การสุ่มชุดคำถาม แผงควบคุม Realtime Supabase และกฎการสอบออนไลน์',
      tag: 'Security'
    },
    {
      title: 'React 19 + Clean Architecture Patterns',
      desc: 'การแยก Service, Hook, Component ห้ามเรียก Supabase โดยตรงใน UI Presentation',
      tag: 'Coding Rule'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-indigo-200 border border-white/10">
            <BookMarked className="w-3.5 h-3.5 text-indigo-300" />
            <span>Developer Guidelines & System Standards</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">คู่มือการใช้งานและมาตรฐานระบบ</h1>
          <p className="text-zinc-300 text-sm md:text-base max-w-2xl">
            เอกสารอ้างอิงทางเทคนิค มาตรฐานการเขียนโค้ด โทเค็นการออกแบบ และระเบียบปฏิบัติสำหรับการพัฒนา LMS ห้องเรียนครูแม็ค
          </p>
        </div>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {docSections.map((doc, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm space-y-3 hover:border-indigo-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {doc.tag}
              </span>
            </div>
            <h2 className="text-base font-bold text-zinc-900">{doc.title}</h2>
            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">{doc.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick Link to Storybook */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-zinc-900 text-base">Storybook Component Library</h3>
          <p className="text-xs md:text-sm text-zinc-500">ทดสอบและตรวจสอบคอมโพเนนต์ UI ทั้งหมดในสภาพแวดล้อมจำลอง</p>
        </div>
        <Link
          to="/library"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors no-underline cursor-pointer"
        >
          <span>เปิด Storybook UI</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
