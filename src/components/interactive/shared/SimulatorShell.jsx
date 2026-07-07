/**
 * SimulatorShell.jsx — Base Card Wrapper (OO-style "Base Class")
 * ================================================================
 * แม่พิมพ์การ์ดหลักสำหรับ Simulator และ Interactive Block ทุกชนิด
 * ใช้หลักการ Composition: ส่ง children เข้าเติมเนื้อหาเฉพาะบทเรียน
 *
 * Props:
 *   icon      — React element ของ Lucide icon
 *   title     — ชื่อหัวข้อย่อย (string)
 *   accent    — สีธีม Tailwind เป็น hex หรือชื่อสี (ใช้ใน corner glow)
 *   accentBg  — Tailwind class สีพื้น corner (เช่น "bg-sky-50")
 *   iconColor — Tailwind class สีไอคอน (เช่น "text-sky-500")
 *   children  — เนื้อหา Simulator ที่ต้องการแสดง
 *   dark      — boolean: ใช้ dark theme card (bg-slate-900)
 */
import React from 'react';

export default function SimulatorShell({
  icon,
  title,
  accentBg = 'bg-teal-50',
  iconColor = 'text-teal-600',
  children,
  dark = false,
  glowColors = 'from-teal-500/10 to-emerald-500/5',
}) {
  if (dark) {
    return (
      <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-2xl relative overflow-hidden transition-all hover:shadow-slate-900/60 hover:-translate-y-0.5 group">
        {/* Ambient corner glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${glowColors} rounded-bl-full blur-3xl -z-0 transition-all duration-700 group-hover:scale-125 pointer-events-none`} />

        <div className="relative z-10">
          {/* Title row */}
          {(icon || title) && (
            <div className="flex items-center gap-3 mb-6">
              {icon && (
                <div className={`p-2.5 rounded-xl bg-white/10 ${iconColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  {icon}
                </div>
              )}
              {title && (
                <h4 className="text-2xl font-bold text-white">{title}</h4>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-lg relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5 group">
      {/* Ambient corner decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${accentBg} rounded-bl-full z-0 pointer-events-none transition-all duration-500 group-hover:w-40 group-hover:h-40`} />

      <div className="relative z-10">
        {/* Title row */}
        {(icon || title) && (
          <div className="flex items-center gap-3 mb-6">
            {icon && (
              <div className={`p-2.5 rounded-xl ${accentBg} ${iconColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                {icon}
              </div>
            )}
            {title && (
              <h4 className="text-2xl font-bold text-slate-800">{title}</h4>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
