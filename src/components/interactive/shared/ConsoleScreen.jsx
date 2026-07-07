/**
 * ConsoleScreen.jsx — Virtual Terminal Display (Reusable)
 * ========================================================
 * กล่องจำลองหน้าจอ Python Shell / Console Output
 * ใช้ได้กับทุกบทเรียนที่ต้องการแสดงผลลัพธ์โค้ด
 *
 * Props:
 *   label       — ป้าย subtitle มุมซ้ายบน เช่น "# python shell view"
 *   accentLabel — ป้าย subtitle มุมขวาบน เช่น "live script" พร้อมสี (string)
 *   accentColor — Tailwind class สีป้ายขวา (เช่น "text-emerald-400")
 *   codeBlock   — React element ส่วนแสดง syntax-highlighted code
 *   isLoading   — boolean: แสดง spinner กำลังประมวลผล
 *   output      — string: ผลลัพธ์ output ใน console ด้านล่าง
 *   outputColor — Tailwind class สีข้อความ output (default: text-emerald-400)
 *   placeholder — string: ข้อความ placeholder เมื่อยังไม่มี output
 *   multiline   — boolean: ใช้ <pre> แทน <div> เพื่อรักษา whitespace
 */
import React from 'react';
import { Terminal, RefreshCw } from 'lucide-react';

export default function ConsoleScreen({
  label = '# python shell view',
  accentLabel = 'live script',
  accentColor = 'text-emerald-500',
  codeBlock,
  isLoading = false,
  output = '',
  outputColor = 'text-emerald-400',
  placeholder = 'คลิกปุ่ม RUN เพื่อสั่งประมวลผลโค้ด',
  multiline = false,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner flex flex-col justify-between">
      {/* Code area */}
      <div>
        <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono border-b border-slate-800 pb-2 mb-4">
          <span>{label}</span>
          <span className={accentColor}>{accentLabel}</span>
        </div>
        {codeBlock}
      </div>

      {/* Output area */}
      <div className="mt-6 pt-4 border-t border-slate-800">
        <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex items-center gap-1.5">
          <Terminal className="w-4 h-4 text-slate-500" /> Virtual Output Console
        </div>
        {multiline ? (
          <pre className={`bg-black/60 p-4 rounded-xl border border-slate-950 font-mono text-[14px] ${outputColor} min-h-[70px] whitespace-pre-wrap leading-relaxed shadow-inner`}>
            {isLoading ? (
              <span className="flex items-center gap-2 text-slate-400">
                <RefreshCw className="w-4 h-4 animate-spin text-sky-400 inline" /> กำลังประมวลผล...
              </span>
            ) : output || <span className="text-slate-600 italic">{placeholder}</span>}
          </pre>
        ) : (
          <div className={`bg-black/60 p-4 rounded-xl border border-slate-950 font-mono text-[14px] ${outputColor} min-h-[70px] flex items-center shadow-inner relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
            {isLoading ? (
              <span className="flex items-center gap-2 text-slate-400">
                <RefreshCw className="w-4 h-4 animate-spin text-sky-400" /> กำลังประมวลผล...
              </span>
            ) : output ? (
              <span className="animate-fade-in">&gt; {output}</span>
            ) : (
              <span className="text-slate-600 italic select-none">{placeholder}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
