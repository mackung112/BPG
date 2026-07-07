import React, { useState } from 'react';
import { ClipboardList, BookOpen, Clock, FolderOpen, Heart, Users, Trophy, Sliders, Info, ShieldAlert, Award } from 'lucide-react';

export default function GradingSimulator() {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' or 'standards'

  const [scores, setScores] = useState({
    test1: 10,
    test2: 10,
    midterm: 20,
    attendance: 10,
    homework: 10,
    behavior: 5,
    activity: 5,
    final: 30
  });

  const maxScores = {
    test1: 10,
    test2: 10,
    midterm: 20,
    attendance: 10,
    homework: 10,
    behavior: 5,
    activity: 5,
    final: 30
  };

  const scoreLabels = {
    test1: { label: 'สอบครั้งที่ 1', desc: 'วัดความรู้กลางหน่วยแรก', icon: ClipboardList, color: 'from-violet-500 to-indigo-500' },
    test2: { label: 'สอบครั้งที่ 2', desc: 'วัดความรู้ปลายหน่วยสอง', icon: ClipboardList, color: 'from-indigo-500 to-blue-500' },
    midterm: { label: 'สอบกลางภาค', desc: 'สอบกลางภาคสะสมทฤษฎี', icon: BookOpen, color: 'from-cyan-500 to-teal-500' },
    attendance: { label: 'เวลาเรียน', desc: 'การเข้าเรียนและตรงต่อเวลา', icon: Clock, color: 'from-emerald-500 to-green-500' },
    homework: { label: 'งาน / ใบงาน', desc: 'การส่งแบบฝึกหัดตรงเวลา', icon: FolderOpen, color: 'from-amber-500 to-orange-500' },
    behavior: { label: 'จิตวิสัย', desc: 'ความประพฤติและวินัยในห้อง', icon: Heart, color: 'from-rose-500 to-pink-500' },
    activity: { label: 'กิจกรรมในห้อง', desc: 'การมีส่วนร่วมตอบคำถามและ Lab', icon: Users, color: 'from-fuchsia-500 to-purple-500' },
    final: { label: 'สอบปลายภาค', desc: 'วัดประเมินผลสัมฤทธิ์ปลายภาค', icon: Trophy, color: 'from-amber-500 to-yellow-500' }
  };

  const handleScoreChange = (key, val) => {
    const num = Math.min(maxScores[key], Math.max(0, parseFloat(val) || 0));
    setScores(prev => ({
      ...prev,
      [key]: Math.round(num * 10) / 10 // round to 1 decimal place
    }));
  };

  const totalBetween = scores.test1 + scores.test2 + scores.midterm + scores.attendance + scores.homework + scores.behavior + scores.activity;
  const totalFinal = scores.final;
  const totalScore = totalBetween + totalFinal;

  const getGradeInfo = (score) => {
    if (score >= 80) return { grade: 'A', gpa: '4.0', color: 'text-emerald-400', glow: 'shadow-emerald-500/20', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', description: 'ดีเยี่ยม (Excellent)', note: 'ผลการเรียนอยู่ในระดับดีเยี่ยม ยอดเยี่ยมมากครับ! รักษามาตรฐานกระบวนการศึกษาและ Lab นี้ไว้นะครับ' };
    if (score >= 75) return { grade: 'B+', gpa: '3.5', color: 'text-teal-400', glow: 'shadow-teal-500/20', bg: 'bg-teal-500/10', border: 'border-teal-500/30', description: 'ดีมาก (Very Good)', note: 'ผลการเรียนระดับดีมากครับ! อีกเพียงนิดเดียวก็จะแตะเกรด A แล้ว พยายามทบทวนเพิ่มเติมอีกหน่อยนะครับ' };
    if (score >= 70) return { grade: 'B', gpa: '3.0', color: 'text-blue-400', glow: 'shadow-blue-500/20', bg: 'bg-blue-500/10', border: 'border-blue-500/30', description: 'ดี (Good)', note: 'ทำผลงานได้เยี่ยมครับ! มีความเข้าใจเนื้อหาวิชาการและโครงสร้างจำลองระบบไอทีได้อย่างเหนียวแน่น' };
    if (score >= 65) return { grade: 'C+', gpa: '2.5', color: 'text-indigo-400', glow: 'shadow-indigo-500/20', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', description: 'ค่อนข้างดี (Above Average)', note: 'ค่อนข้างดีทีเดียวครับ หากหมั่นฝึกฝน Simulator และทบทวนโจทย์บ่อยๆ จะสามารถก้าวสู่เกรดที่สูงขึ้นได้อย่างแน่นอน' };
    if (score >= 60) return { grade: 'C', gpa: '2.0', color: 'text-amber-400', glow: 'shadow-amber-500/20', bg: 'bg-amber-500/10', border: 'border-amber-500/30', description: 'ปานกลาง (Average)', note: 'ผ่านเกณฑ์ระดับปานกลางครับ แนะนำให้เข้าทำ Lab ทดลองบ่อยๆ เพื่อเสริมสร้างความจำและความเข้าใจเชิงลึก' };
    if (score >= 55) return { grade: 'D+', gpa: '1.5', color: 'text-orange-400', glow: 'shadow-orange-500/20', bg: 'bg-orange-500/10', border: 'border-orange-500/30', description: 'ผ่านเกณฑ์ขั้นต่ำ (Below Average)', note: 'ผ่านเกณฑ์ขั้นพื้นฐานครับ แนะนำให้พยายามสะสมคะแนนจากแบบฝึกหัดย่อยเพิ่มเติมเพื่อพยุงคะแนนรวมขึ้น' };
    if (score >= 50) return { grade: 'D', gpa: '1.0', color: 'text-rose-400', glow: 'shadow-rose-500/20', bg: 'bg-rose-500/10', border: 'border-rose-500/30', description: 'ผ่านเกณฑ์ขั้นต่ำสุด (Poor)', note: 'ผ่านเกณฑ์ระดับต่ำสุดแบบฉิวเฉียดมาก ต้องเร่งส่งงานสะสมและรักษาเวลาเรียนไม่ให้ขาดเพิ่มโดยเด็ดขาด' };
    return { grade: 'F', gpa: '0.0', color: 'text-red-500 animate-pulse', glow: 'shadow-red-500/30', bg: 'bg-red-500/10', border: 'border-red-500/30', description: 'ไม่ผ่านเกณฑ์ (Fail)', note: 'คะแนนรวมยังไม่ถึงเกณฑ์ประเมิน! โปรดทบทวนความรู้และติดต่อครูแม็คเพื่อรับคำแนะนำหรืองานมอบหมายทดแทนสะสม' };
  };

  const gradeInfo = getGradeInfo(totalScore);

  // SVG parameters
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, totalScore)) / 100) * circumference;

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-inner">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'simulator'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sliders className="w-4 h-4" />
            🎮 จำลองคะแนนสะสมและเกรด
          </button>
          <button
            onClick={() => setActiveTab('standards')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'standards'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Info className="w-4 h-4" />
            📊 สัดส่วนและเกณฑ์มาตรฐาน
          </button>
        </div>
      </div>

      {activeTab === 'simulator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: Sliders Controls (Dark Glassmorphism) */}
          <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between">
            <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest uppercase">
              Score Control Board
            </span>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">บอร์ดปรับแต่งคะแนนจำลอง</h4>
                  <p className="text-slate-400 text-xs mt-0.5">เลื่อนสไลเดอร์หรือแก้ไขกล่องข้อความเพื่อจำลองสัดส่วนคะแนนจริง</p>
                </div>
              </div>

              {/* Sub-Group: 1. คะแนนระหว่างภาค 70 คะแนน */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-sm font-bold text-indigo-400">1. คะแนนระหว่างภาค (สัดส่วน 70 คะแนน)</span>
                  <span className="text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20">
                    ได้สะสม: {totalBetween.toFixed(1)} / 70 คะแนน
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(scoreLabels).slice(0, 7).map(([key, item]) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={key} className="bg-slate-950/40 rounded-xl p-3.5 border border-white/5 space-y-2 hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${item.color} text-white shrink-0`}>
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-sm font-semibold text-slate-200 block truncate">{item.label}</span>
                              <span className="text-[11px] text-slate-500 block truncate leading-tight">{item.desc}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <input
                              type="number"
                              min="0"
                              max={maxScores[key]}
                              step="0.5"
                              value={scores[key]}
                              onChange={(e) => handleScoreChange(key, e.target.value)}
                              className="w-12 h-7 bg-slate-900 border border-white/10 rounded text-center text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                            />
                            <span className="text-[11px] text-slate-500 font-mono">/{maxScores[key]}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max={maxScores[key]}
                            step="0.5"
                            value={scores[key]}
                            onChange={(e) => handleScoreChange(key, e.target.value)}
                            className="flex-1 accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Group: 2. คะแนนปลายภาค 30 คะแนน */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-sm font-bold text-amber-400">2. คะแนนปลายภาค (สัดส่วน 30 คะแนน)</span>
                  <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/20">
                    ได้สะสม: {totalFinal.toFixed(1)} / 30 คะแนน
                  </span>
                </div>

                <div className="bg-slate-950/40 rounded-xl p-4 border border-white/5 space-y-3 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/15">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-200 block">สอบปลายภาค (Final Examination)</span>
                        <span className="text-xs text-slate-500 block leading-tight">วัดผลสัมฤทธิ์รวบรวมทฤษฎีและแนวคิดวิชาการท้ายเทอม</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <input
                        type="number"
                        min="0"
                        max={30}
                        step="0.5"
                        value={scores.final}
                        onChange={(e) => handleScoreChange('final', e.target.value)}
                        className="w-14 h-8 bg-slate-900 border border-white/10 rounded-lg text-center text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                      />
                      <span className="text-xs text-slate-500 font-mono">/30</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max={30}
                      step="0.5"
                      value={scores.final}
                      onChange={(e) => handleScoreChange('final', e.target.value)}
                      className="flex-1 accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
              <span>* คะแนนสามารถใส่ทศนิยมได้สูงสุด 1 ตำแหน่ง</span>
              <button 
                onClick={() => setScores(maxScores)}
                className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer"
              >
                รีเซ็ตคะแนนเต็ม (100)
              </button>
            </div>
          </div>

          {/* Right Panel: Live Grade Board (Dark Oscilloscope Panel) */}
          <div className="lg:col-span-5 bg-slate-950/95 backdrop-blur-xl rounded-3xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between items-stretch overflow-hidden">
            {/* Corner Decorative lights */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-all duration-500 ${gradeInfo.color.includes('emerald') ? 'bg-emerald-500' : gradeInfo.color.includes('teal') ? 'bg-teal-500' : gradeInfo.color.includes('blue') ? 'bg-blue-500' : gradeInfo.color.includes('indigo') ? 'bg-indigo-500' : gradeInfo.color.includes('rose') ? 'bg-rose-500' : gradeInfo.color.includes('red') ? 'bg-red-500' : 'bg-amber-500'}`} />

            <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 tracking-widest uppercase">
              Live Grade Dashboard
            </span>

            <div className="text-center pt-4">
              <h4 className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                สรุปผลการประเมินวิชา
              </h4>
            </div>

            {/* Circular Gauge inside Dashboard */}
            <div className="flex justify-center items-center my-6 relative">
              <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90 filter drop-shadow-[0_0_12px_rgba(79,70,229,0.15)]"
              >
                {/* Track Circle */}
                <circle
                  stroke="rgba(255, 255, 255, 0.03)"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                {/* Progress Circle with dynamic color */}
                <circle
                  stroke={totalScore >= 80 ? '#10b981' : totalScore >= 70 ? '#3b82f6' : totalScore >= 60 ? '#f59e0b' : totalScore >= 50 ? '#f43f5e' : '#ef4444'}
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="transition-all duration-500 ease-out"
                />
              </svg>

              {/* Absolute Center Text inside Circle */}
              <div className="absolute text-center">
                <span className="block text-4xl font-extrabold font-mono text-white tracking-tighter">
                  {totalScore.toFixed(1)}
                </span>
                <span className="block text-[11px] font-bold text-slate-400 tracking-wider">
                  เต็ม 100
                </span>
              </div>
            </div>

            {/* Grade Display Panel */}
            <div className="space-y-4">
              <div className={`p-4 rounded-2xl border text-center transition-all duration-500 ${gradeInfo.bg} ${gradeInfo.border} ${gradeInfo.glow}`}>
                <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">เกรดจำลองสะสม</span>
                <span className={`block text-6xl font-black font-mono tracking-tighter my-2 leading-none ${gradeInfo.color}`}>
                  {gradeInfo.grade}
                </span>
                <div className="flex justify-center gap-3 mt-1.5">
                  <span className="text-xs font-bold text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md font-mono">
                    GPA: {gradeInfo.gpa}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                    {gradeInfo.description}
                  </span>
                </div>
              </div>

              {/* AI Personal Coach Box (Frosted Glass Callout inside panel) */}
              <div className={`bg-white/5 border-l-[3px] rounded-xl p-4 transition-all duration-500 ${
                totalScore >= 80 ? 'border-l-emerald-500' : totalScore >= 70 ? 'border-l-blue-500' : totalScore >= 60 ? 'border-l-amber-500' : 'border-l-rose-500'
              }`}>
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-white/5 text-slate-300 shrink-0 mt-0.5">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block mb-1">คำแนะนำจากครูแม็ค:</span>
                    <p className="text-[13px] text-slate-300 leading-relaxed font-normal">
                      {gradeInfo.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Status indicators */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/5 text-center">
              <div className="p-2 bg-slate-900/40 rounded-xl border border-white/5">
                <span className="block text-[10px] text-slate-500 font-bold tracking-wide uppercase">คะแนนสะสม</span>
                <span className="block text-sm font-bold text-indigo-400 font-mono mt-0.5">{totalBetween.toFixed(1)} / 70</span>
              </div>
              <div className="p-2 bg-slate-900/40 rounded-xl border border-white/5">
                <span className="block text-[10px] text-slate-500 font-bold tracking-wide uppercase">ประเมินผลปลายภาค</span>
                <span className="block text-sm font-bold text-amber-400 font-mono mt-0.5">{totalFinal.toFixed(1)} / 30</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Standard Grading Criteria Grid (Beautiful Glassmorphism Cards) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: 70 คะแนนระหว่างภาค (Glassmorphic) */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 pb-4 border-b border-gray-200/50 mb-6">
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-zinc-900">1. คะแนนสะสมระหว่างภาค</h4>
                  <p className="text-slate-500 text-xs mt-0.5">รวมทั้งหมด 70 คะแนน</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'สอบครั้งที่ 1 (10 คะแนน)', desc: 'การสอบประเมินย่อยเก็บคะแนนบทเรียนช่วงแรก' },
                  { label: 'สอบครั้งที่ 2 (10 คะแนน)', desc: 'การสอบประเมินย่อยเก็บคะแนนบทเรียนช่วงหลัง' },
                  { label: 'สอบกลางภาค (20 คะแนน)', desc: 'การสอบรวมทฤษฎีประยุกต์ครึ่งเทอม' },
                  { label: 'เวลาเรียน (10 คะแนน)', desc: 'การตรงต่อเวลา วินัยและการสแกนพิกัดลงเวลาเรียน' },
                  { label: 'ชิ้นงาน / แบบฝึกหัดสะสม (10 คะแนน)', desc: 'งานมอบหมาย ใบปฏิบัติงานแล็บ (Lab Worksheets)' },
                  { label: 'จิตวิสัย (5 คะแนน)', desc: 'ความพยายาม ความประพฤติ และความเรียบร้อย' },
                  { label: 'กิจกรรมในห้องเรียน (5 คะแนน)', desc: 'การมีส่วนร่วม กิจกรรมเชิงกลุ่มและโต้ตอบ Simulator' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white/40 rounded-xl border border-gray-100 hover:bg-white/70 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-zinc-800 block">{item.label}</span>
                      <span className="text-xs text-slate-500 leading-tight block mt-0.5">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-between items-center bg-indigo-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl border-t border-indigo-100/50">
              <span className="text-xs font-bold text-indigo-700">สัดส่วนรวมระหว่างภาค</span>
              <span className="text-lg font-black text-indigo-600 font-mono">70 คะแนน</span>
            </div>
          </div>

          {/* Card 2: 30 คะแนนปลายภาค (Glassmorphic) */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 pb-4 border-b border-gray-200/50 mb-6">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 shadow-inner">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-zinc-900">2. คะแนนประเมินผลปลายภาค</h4>
                  <p className="text-slate-500 text-xs mt-0.5">รวมทั้งหมด 30 คะแนน</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'สอบวัดผลปลายภาค (30 คะแนน)', desc: 'การสอบประเมินผลสัมฤทธิ์หลักสูตรภาคการศึกษาปลายเทอม ครอบคลุมทั้งแนวคิดวิชาการหลัก การประยุกต์ใช้เชิงฮาร์ดแวร์ เครือข่าย และทักษะตรรกะปฏิบัติการจริงที่สะสมมาทั้งหมด' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/40 rounded-xl border border-gray-100 hover:bg-white/70 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono animate-pulse">
                      ★
                    </div>
                    <div>
                      <span className="text-sm font-bold text-zinc-800 block">{item.label}</span>
                      <span className="text-xs text-slate-500 leading-relaxed block mt-1.5">{item.desc}</span>
                    </div>
                  </div>
                ))}

                {/* Additional Info box */}
                <div className="bg-amber-50/60 backdrop-blur-md border border-amber-200/60 rounded-xl p-4 border-l-[3.5px] border-l-amber-500 leading-relaxed text-xs text-amber-900 font-normal space-y-2 mt-6">
                  <div className="flex gap-2 items-start">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">ระเบียบมาตรฐานการวัดผล:</span>
                      <p className="text-amber-800 leading-relaxed">
                        การสอบปลายภาคจะใช้วิธีวัดประเมินผลระดับชาติ/สาขาวิชาอย่างโปร่งใสตรงตามสมรรถนะ โดยคะแนนจะถูกรวบรวมส่งคณะกรรมการประเมินผล และไม่สามารถแก้ไขได้หลังเสร็จสิ้นการอนุมัติผลรายวิชา
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200/50 flex justify-between items-center bg-amber-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl border-t border-amber-100/50">
              <span className="text-xs font-bold text-amber-700">สัดส่วนรวมปลายภาค</span>
              <span className="text-lg font-black text-amber-600 font-mono">30 คะแนน</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
