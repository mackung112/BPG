import { Wand2, Sparkles, Cpu, Layers, PlayCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIContentCreatorView() {
  const capabilities = [
    {
      title: 'Interactive Simulator Studio',
      desc: 'สร้างสื่อจำลองแบบโต้ตอบ (Interactive Simulator) ด้วย React Component และ Tailwind CSS',
      icon: Cpu,
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      title: 'SVG Flowchart & Diagram Generator',
      desc: 'สร้างผังงานและแผนภาพกระบวนการเชิงวิศวกรรมด้วย SVG มาตรฐาน คมชัดทุกขนาดหน้าจอ',
      icon: Layers,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: 'Interactive Quiz & Concept Cards',
      desc: 'สร้างการ์ดคำถาม แบบทดสอบย่อย และแบบทดสอบวัดความเข้าใจแบบเรียลไทม์',
      icon: Sparkles,
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-purple-200 border border-white/10">
            <Wand2 className="w-3.5 h-3.5 text-purple-300" />
            <span>AI Content Studio & Laboratory</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">AI Content Creator (สตูดิโอสร้างสื่อการสอน)</h1>
          <p className="text-purple-200 text-sm md:text-base max-w-2xl">
            เครื่องมือสร้างสรรค์เนื้อหาบทเรียน สื่อจำลองอินเทอร์แอคทีฟ และชุดคำถามด้วยขุมพลังปัญญาประดิษฐ์
          </p>
        </div>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {capabilities.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center text-white shadow-md`}>
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-zinc-900">{cap.title}</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">{cap.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Studio Workspace Preview */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">สตูดิโอสร้างเนื้อหา</h2>
            <p className="text-xs md:text-sm text-zinc-500">เลือกโหมดการสร้างสื่อการสอนเพื่อเริ่มออกแบบ</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/library"
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded-xl hover:bg-indigo-100 transition-colors no-underline"
            >
              <PlayCircle className="w-4 h-4" />
              <span>ดูคลัง Storybook UI</span>
            </Link>
          </div>
        </div>

        <div className="p-8 text-center bg-purple-50/50 rounded-2xl border border-purple-100 space-y-4">
          <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-bold text-purple-950 text-lg">AI Content Generation Pipeline</h3>
            <p className="text-xs md:text-sm text-purple-900/70 leading-relaxed">
              รองรับการแปลงหัวข้อบทเรียนเป็นคอมโพเนนต์การเรียนรู้แบบโต้ตอบ สอดคล้องกับมาตรฐาน Design System ของระบบ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
