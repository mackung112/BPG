import { FileCode, FolderOpen, UploadCloud, FileText, Download, Search } from 'lucide-react';

export default function CourseDocumentsView() {
  const documentCategories = [
    { name: 'แผนการสอนและโครงการสอน (Syllabus Docs)', count: 4, size: '2.4 MB' },
    { name: 'เอกสารประกอบการสอนและสไลด์ (Lecture Slides)', count: 12, size: '48.1 MB' },
    { name: 'ใบความรู้และสื่อเสริม (Study Notes)', count: 8, size: '15.6 MB' },
    { name: 'ไฟล์แล็บและโค้ดตัวอย่าง (Code Samples & Assets)', count: 24, size: '8.3 MB' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-200 border border-white/10">
            <FileCode className="w-3.5 h-3.5 text-blue-300" />
            <span>Document & Media Repository</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">ไฟล์เอกสารและคลังสื่อการสอน</h1>
          <p className="text-blue-200 text-sm md:text-base max-w-2xl">
            ศูนย์กลางจัดเก็บและจัดการไฟล์เอกสารรายวิชา เอกสารประกอบการสอน ใบความรู้ และโค้ดตัวอย่างสำหรับผู้เรียน
          </p>
        </div>
      </div>

      {/* Document Storage Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {documentCategories.map((cat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm space-y-3 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-sm leading-snug">{cat.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{cat.count} รายการ • {cat.size}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Document Table & Actions */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาเอกสารหรือไฟล์..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>อัปโหลดเอกสารใหม่</span>
          </button>
        </div>

        <div className="p-8 text-center bg-zinc-50 rounded-xl border border-dashed border-zinc-300 space-y-3">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-zinc-800 text-base">ระบบคลังเอกสารรายวิชา</h3>
          <p className="text-zinc-500 text-xs md:text-sm max-w-md mx-auto">
            รองรับการจัดเก็บไฟล์ PDF, DOCX, Markdown และไฟล์บีบอัด เพื่อแจกจ่ายให้นักเรียนในแต่ละบทเรียน
          </p>
        </div>
      </div>
    </div>
  );
}
