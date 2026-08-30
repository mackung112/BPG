/**
 * QuizEngine.jsx — Reusable Mini-Game Quiz Component (OO-style Base)
 * ===================================================================
 * เกมตอบคำถามแบบ Multiple Choice ที่ใช้ซ้ำได้ทุกบทเรียน
 * ควบคุม state การเล่น / ชนะ / แพ้ / ด่านถัดไป ภายในตัวเอง
 *
 * Props:
 *   title        — ชื่อ Game Zone (เช่น "มินิเกม: ถอดรหัส PRINT!")
 *   description  — คำอธิบายเกม
 *   levels       — Array of level objects: {
 *                    title, desc, code (string), target (string),
 *                    options: [{ key, text, isCorrect }], tip
 *                  }
 *   accentColor  — Tailwind gradient class สำหรับ ambient glow
 *                  เช่น "from-teal-600/20 to-emerald-500/10"
 *   icon         — React element ไอคอน header
 */
import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Info, RotateCcw, ChevronRight } from 'lucide-react';

export default function QuizEngine({
  title = 'มินิเกมทดสอบความรู้',
  description = 'เลือกคำตอบที่ถูกต้องเพื่อผ่านแต่ละด่าน',
  levels = [],
  accentColor = 'from-emerald-600/20 to-teal-500/10',
  icon,
}) {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('playing'); // playing | success | fail

  const currentLevel = levels[level];
  const totalLevels = levels.length;

  const handleSelect = (option) => {
    if (status !== 'playing') return;
    setSelected(option);
    setStatus(option.isCorrect ? 'success' : 'fail');
  };

  const handleNext = () => {
    setLevel((l) => l + 1);
    setSelected(null);
    setStatus('playing');
  };

  const handleReset = () => {
    setLevel(0);
    setSelected(null);
    setStatus('playing');
  };

  if (!currentLevel) {
    // All levels completed
    return (
      <div className="bg-slate-900 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden text-center">
        <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} blur-3xl opacity-30 pointer-events-none`} />
        <div className="relative z-10">
          <CheckCircle2 className="w-14 sm:w-16 h-14 sm:h-16 text-emerald-400 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">🎉 ยอดเยี่ยมมาก!</h3>
          <p className="text-slate-300 text-sm sm:text-[16px] mb-8">คุณผ่านทุกด่านแล้ว แสดงว่าเข้าใจบทเรียนนี้เป็นอย่างดี</p>
          <button
            onClick={handleReset}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 sm:px-8 py-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer text-sm sm:text-base min-h-[48px]"
          >
            <RotateCcw className="w-4 h-4" /> เล่นใหม่อีกรอบ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl sm:rounded-[2.5rem] p-3.5 sm:p-6 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden group">
      {/* Ambient glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${accentColor} rounded-bl-full blur-3xl -z-0 transition-all duration-700 group-hover:scale-125 pointer-events-none`} />

      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-10">
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Gamification Zone
        </span>
        <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {icon && <span className="animate-pulse">{icon}</span>}
          <span className="min-w-0 break-words">{title}</span>
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-xs sm:text-[15px]">{description}</p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* Left: Level info */}
        <div className="bg-slate-800/80 backdrop-blur rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 border border-slate-700 flex flex-col justify-between">
          <div>
            {/* Level indicator */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                ด่านที่ {level + 1} / {totalLevels}
              </span>
              <div className="flex flex-wrap gap-1">
                {levels.map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 sm:w-8 h-1.5 sm:h-2 rounded-full transition-all ${
                      i === level ? 'bg-emerald-400' : i < level ? 'bg-emerald-600' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h4 className="text-base sm:text-xl font-bold text-white mb-2">{currentLevel.title}</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{currentLevel.desc}</p>

            {/* Code block */}
            {currentLevel.code && (
              <div className="mb-4 sm:mb-6 bg-slate-900 rounded-xl p-3 sm:p-4 border border-slate-950 font-mono text-xs sm:text-[13.5px] overflow-x-auto">
                <div className="text-[10px] text-teal-400 uppercase mb-2 font-bold tracking-wider">// โค้ดขาดส่วนพารามิเตอร์</div>
                <pre className="text-slate-300 whitespace-pre">{currentLevel.code}</pre>
              </div>
            )}

            {/* Target output */}
            {currentLevel.target && (
              <div className="mb-4">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">เป้าหมายผลลัพธ์:</span>
                <div className="bg-slate-950 border border-teal-500/20 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl font-mono text-emerald-400 text-xs sm:text-base shadow-inner inline-block min-w-0 sm:min-w-[200px] w-full sm:w-auto break-all sm:break-normal">
                  {currentLevel.target}
                </div>
              </div>
            )}
          </div>

          {/* Status banners */}
          {status === 'playing' && currentLevel.tip && (
            <div className="mt-4 bg-slate-950/50 border border-slate-800 p-3 sm:p-3.5 rounded-xl text-slate-300 text-[11px] sm:text-[12px] leading-relaxed flex gap-2">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><strong>คำใบ้:</strong> {currentLevel.tip}</span>
            </div>
          )}
          {status === 'success' && (
            <div className="mt-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-3.5 sm:p-4 rounded-xl flex items-center gap-3 animate-pulse">
              <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 shrink-0" />
              <p className="text-xs sm:text-sm font-bold">ยอดเยี่ยม! ตอบถูกต้องสมบูรณ์แบบ</p>
            </div>
          )}
          {status === 'fail' && (
            <div className="mt-4 bg-rose-500/10 border border-rose-500/40 text-rose-400 p-3.5 sm:p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 sm:w-6 h-5 sm:h-6 shrink-0" />
              <p className="text-xs sm:text-sm font-bold">ยังไม่ถูก! ลองอ่านคำใบ้แล้วเลือกใหม่</p>
            </div>
          )}
        </div>

        {/* Right: Answers */}
        <div className="flex flex-col justify-between gap-4 sm:gap-6">
          <div className="bg-slate-800/40 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-700/80 flex-1 flex flex-col justify-center">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
              เลือกคำตอบที่ถูกต้อง
            </span>
            <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
              {currentLevel.options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleSelect(option)}
                  disabled={status !== 'playing'}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all flex items-center gap-3 sm:gap-4 active:scale-98 cursor-pointer min-h-[48px] ${
                    selected?.key === option.key
                      ? option.isCorrect
                        ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                        : 'bg-rose-500/20 border-rose-500 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-600 disabled:opacity-50'
                  }`}
                >
                  <span className={`w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${
                    selected?.key === option.key
                      ? option.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {option.key}
                  </span>
                  <span className="font-mono text-xs sm:text-[14.5px] min-w-0 break-words flex-1 leading-snug">{option.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            {status === 'success' && level < totalLevels - 1 && (
              <button
                onClick={handleNext}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 sm:py-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] text-sm sm:text-base"
              >
                ด่านถัดไป <ChevronRight className="w-5 h-5" />
              </button>
            )}
            {status === 'success' && level === totalLevels - 1 && (
              <button
                onClick={handleNext}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 sm:py-3.5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] text-sm sm:text-base"
              >
                <Sparkles className="w-5 h-5" /> จบเกม!
              </button>
            )}
            <button
              onClick={handleReset}
              aria-label="รีเซ็ตเกม"
              className="px-4 sm:px-5 py-3 rounded-2xl border border-slate-700 text-slate-400 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] min-w-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
