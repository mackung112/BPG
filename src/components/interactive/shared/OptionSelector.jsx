/**
 * OptionSelector.jsx — Reusable Button Grid Selector (OO-style)
 * ==============================================================
 * ปุ่มตัวเลือกแบบ Grid ที่ใช้ซ้ำได้ทุกบทเรียน
 * รองรับ 2 โหมด: "pill" (กลม) และ "card" (มีรายละเอียด)
 *
 * Props:
 *   options      — Array of { value, label, sublabel? } objects
 *   value        — ค่าปัจจุบันที่ถูกเลือก
 *   onChange     — callback(value) เมื่อเลือกตัวเลือก
 *   activeColor  — Tailwind bg + border + text active class (เป็น string เดียว)
 *                  เช่น "bg-sky-600 border-sky-600 text-white"
 *   cols         — จำนวนคอลัมน์ grid: 2 | 3 | 4 (default: 2)
 *   mode         — "pill" | "card" (default: "pill")
 */
import React from 'react';

const ACTIVE_DEFAULT = 'bg-indigo-600 border-indigo-600 text-white shadow-md';
const IDLE = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

export default function OptionSelector({
  options = [],
  value,
  onChange,
  activeColor = ACTIVE_DEFAULT,
  cols = 2,
  mode = 'pill',
}) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[cols] || 'grid-cols-2';

  return (
    <div className={`grid ${gridClass} gap-3`}>
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`p-3 rounded-xl border text-left transition-all active:scale-95 cursor-pointer ${
              isActive ? activeColor : IDLE
            } ${mode === 'card' ? 'flex flex-col gap-1' : ''}`}
          >
            {mode === 'card' && opt.sublabel && (
              <span className="text-[10px] opacity-75 leading-tight">{opt.sublabel}</span>
            )}
            <span className={`font-medium text-[13px] ${mode === 'card' ? 'font-mono font-bold' : ''}`}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
