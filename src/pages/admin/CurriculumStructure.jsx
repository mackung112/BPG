import { Layers, BookOpen, CheckCircle2, FileCode2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CurriculumStructure() {
  const structureStandards = [
    {
      title: 'โครงสร้างไฟล์มาตรฐาน (docs/curriculum)',
      desc: 'จัดเก็บไฟล์หลักสูตรในรูปแบบ YAML Frontmatter และ Markdown ที่เป็นระเบียบ',
      status: 'Active'
    },
    {
      title: 'การจัดหมวดหมู่หน่วยการเรียนรู้ (Units & Chapters)',
      desc: 'กำหนดลำดับหัวข้อ เวลาเรียน และน้ำหนักคะแนนรายหน่วยอย่างเป็นระบบ',
      status: 'Standard'
    },
    {
      title: 'แผนการประเมินและเกณฑ์คะแนน (Evaluation Matrix)',
      desc: 'เชื่อมโยงผลการเรียนรู้กับระบบสอบ คลังข้อสอบ และใบงานวัดผล',
      status: 'Ready'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-cyan-200 border border-white/10">
            <Layers className="w-3.5 h-3.5 text-cyan-300" />
            <span>Curriculum Architecture & Taxonomy</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">โครงสร้างเนื้อหาและมาตรฐานหลักสูตร</h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl">
            ศูนย์รวมข้อกำหนดและมาตรฐานผังหลักสูตร จัดระเบียบเนื้อหาการเรียนรู้ บทเรียน และแผนภาพลำดับการสอน
          </p>
        </div>
      </div>

      {/* Structure Standards List */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">มาตรฐานหลักสูตรที่รองรับ</h2>
            <p className="text-xs md:text-sm text-zinc-500">รูปแบบการจัดเก็บและโครงสร้างข้อมูลสำหรับการประมวลผลอัตโนมัติ</p>
          </div>
          <Link
            to="/admin/teacher-subjects"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-xl transition-colors no-underline cursor-pointer"
          >
            <span>ไปยังการจัดการวิชา</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {structureStandards.map((item, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-3 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {item.status}
                </span>
              </div>
              <h3 className="font-bold text-zinc-900 text-base">{item.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-xl bg-indigo-50/60 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-600 text-white shrink-0">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-indigo-950 text-sm">ข้อกำหนดหลักสูตร (Curriculum Standard Spec)</h4>
              <p className="text-xs text-indigo-800/80 mt-0.5">
                ติดตามแนวปฏิบัติการสร้างหลักสูตรและผังการสอนได้ที่หมวดหมู่เอกสารคู่มือ
              </p>
            </div>
          </div>
          <Link
            to="/admin/docs"
            className="shrink-0 px-4 py-2 min-h-[40px] text-xs font-bold text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors no-underline flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ดูคู่มือมาตรฐาน</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
