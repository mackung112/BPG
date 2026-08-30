import { Sparkles, Bot, FileText, ArrowRight, Wand2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CurriculumDraft() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-indigo-200 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>AI Syllabus Drafting Agent</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">ร่างหลักสูตรและแผนการสอน (AI Syllabus)</h1>
          <p className="text-indigo-200 text-sm md:text-base max-w-2xl">
            ออกแบบและวิเคราะห์โครงสร้างแผนการสอนรายวิชาด้วย AI อัจฉริยะ สร้างตารางสอน จุดประสงค์การเรียนรู้ และแนวทางวัดผลอัตโนมัติ
          </p>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
            <Bot className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900">ร่างโครงสร้างวิชาอัตโนมัติ</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            ป้อนชื่อวิชาและหัวข้อที่ต้องการสอน เพื่อให้ AI ช่วยแตกเป็นหน่วยการเรียนรู้ บทเรียนย่อย และแบบฝึกหัด
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
            <Wand2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900">เชื่อมโยงมาตรฐานหลักสูตร</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            จัดหมวดหมู่และตรวจสอบให้สอดคล้องกับมาตรฐานการเรียนรู้ ตัวชี้วัด และสมรรถนะสำคัญ
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 border border-cyan-100">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900">ส่งออกเป็น Markdown / PDF</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            บันทึกเป็นไฟล์หลักสูตรใน docs/curriculum หรือส่งออกเอกสารแผนการสอนได้ทันที
          </p>
        </div>
      </div>

      {/* Action Prompt Box */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">สร้างโครงร่างแผนการสอนใหม่</h2>
            <p className="text-xs md:text-sm text-zinc-500">เลือกรายวิชาหรือกรอกข้อมูลเบื้องต้นเพื่อเริ่มต้นการร่าง</p>
          </div>
          <Link
            to="/admin/teacher-subjects"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors no-underline cursor-pointer"
          >
            <span>ดูรายวิชาทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-8 text-center bg-zinc-50 rounded-xl border border-dashed border-zinc-300 space-y-3">
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <RefreshCw className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-zinc-800 text-base">ระบบ AI Syllabus Drafting พร้อมเชื่อมต่อ</h3>
          <p className="text-zinc-500 text-xs md:text-sm max-w-md mx-auto">
            กำลังพัฒนาส่วนต่อประสานสำหรับ AI Agent เพื่อทำงานร่วมกับระบบจัดการวิชาอย่างเต็มรูปแบบ
          </p>
        </div>
      </div>
    </div>
  );
}
