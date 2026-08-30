import { CheckSquare, Plus, FileSpreadsheet, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorksheetsView() {
  const sampleWorksheets = [
    { title: 'ใบงานที่ 1: การเขียนผังงานและอัลกอริทึมพื้นฐาน', subject: 'วิทยาการคำนวณ', totalPoints: 10, submissions: 38 },
    { title: 'ใบงานที่ 2: การพัฒนาโปรแกรมแบบโครงสร้างและการสร้างเงื่อนไข', subject: 'การเขียนโปรแกรมคอมพิวเตอร์', totalPoints: 15, submissions: 42 },
    { title: 'ใบงานที่ 3: การประยุกต์ใช้งานลูปและการคำนวณข้อมูล', subject: 'การเขียนโปรแกรมคอมพิวเตอร์', totalPoints: 20, submissions: 29 }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-emerald-200 border border-white/10">
            <CheckSquare className="w-3.5 h-3.5 text-emerald-300" />
            <span>Assignments & Worksheets Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">ใบงานและภารกิจการสอน</h1>
          <p className="text-emerald-200 text-sm md:text-base max-w-2xl">
            จัดการใบงาน แบบฝึกหัดปฏิบัติ และภารกิจการเรียนรู้ประจำรายวิชา พร้อมระบบตรวจและบันทึกคะแนน
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500">ใบงานทั้งหมด</p>
            <p className="text-2xl font-bold text-zinc-900">18 ชุด</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500">รอตรวจให้คะแนน</p>
            <p className="text-2xl font-bold text-amber-600">14 งาน</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500">ตรวจแล้วทั้งหมด</p>
            <p className="text-2xl font-bold text-zinc-900">128 รายการ</p>
          </div>
        </div>
      </div>

      {/* Worksheets List & Action */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">รายการใบงานและภารกิจการสอน</h2>
            <p className="text-xs md:text-sm text-zinc-500">สร้างและแจกจ่ายใบงานให้นักเรียนในระบบ</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/grading"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors no-underline"
            >
              <span>ดูเกณฑ์คะแนนรวม</span>
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>สร้างใบงานใหม่</span>
            </button>
          </div>
        </div>

        <div className="divide-y divide-zinc-100">
          {sampleWorksheets.map((ws, idx) => (
            <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/80 px-3 rounded-xl transition-colors">
              <div className="space-y-1">
                <h3 className="font-bold text-zinc-900 text-sm">{ws.title}</h3>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="px-2 py-0.5 bg-zinc-100 rounded-md font-medium text-zinc-700">{ws.subject}</span>
                  <span>•</span>
                  <span>คะแนนเต็ม {ws.totalPoints} คะแนน</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  ส่งแล้ว {ws.submissions} คน
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
