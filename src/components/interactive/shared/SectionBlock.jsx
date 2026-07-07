/**
 * SectionBlock.jsx — Section Grouping Wrapper (OO-style)
 * =======================================================
 * ตีกรอบส่วนเนื้อหาเป็นกลุ่มตาม DESIGN.md §5.5 Section Grouping Standard
 * ใช้เมื่อมีหัวข้อย่อยหลายประเภทในบทเรียนเดียว เพื่อให้ดูสมดุลและมีระเบียบ
 *
 * Props:
 *   title       — ชื่อส่วน (string)
 *   icon        — React element ไอคอน Lucide (optional)
 *   description — คำอธิบายส่วน (string, optional)
 *   children    — เนื้อหาภายใน (concept cards, grid, ฯลฯ)
 *   variant     — "default" | "dark" | "tinted"
 *   accent      — Tailwind color name สำหรับ icon: "indigo"|"violet"|"teal"|"amber" ฯลฯ
 */
import React from 'react';

const ICON_COLOR = {
  indigo:  'text-indigo-500',
  violet:  'text-violet-500',
  teal:    'text-teal-500',
  amber:   'text-amber-500',
  rose:    'text-rose-500',
  emerald: 'text-emerald-500',
  sky:     'text-sky-500',
  purple:  'text-purple-500',
  pink:    'text-pink-500',
  orange:  'text-orange-500',
  cyan:    'text-cyan-500',
};

export default function SectionBlock({
  title,
  icon,
  description,
  children,
  variant = 'default',
  accent = 'indigo',
}) {
  const iconColor = ICON_COLOR[accent] || 'text-indigo-500';

  const containerClass = {
    default: 'bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 p-8',
    dark:    'bg-slate-900 rounded-3xl border border-slate-800 p-8',
    tinted:  `bg-${accent}-50/40 rounded-3xl border border-${accent}-100 p-8`,
  }[variant] || 'bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 p-8';

  const titleClass = variant === 'dark' ? 'text-white' : 'text-slate-800';
  const descClass  = variant === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <section className={containerClass}>
      {/* Section header */}
      {(title || icon) && (
        <div className="mb-6">
          <h3 className={`text-xl font-bold ${titleClass} flex items-center gap-2.5 mb-1`}>
            {icon && (
              <span className={`${iconColor} transition-transform duration-300`}>
                {icon}
              </span>
            )}
            {title}
          </h3>
          {description && (
            <p className={`text-[14px] ${descClass} leading-relaxed pl-8`}>{description}</p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}
