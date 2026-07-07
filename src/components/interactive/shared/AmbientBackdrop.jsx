/**
 * AmbientBackdrop.jsx — Layer 1: Immersive Background (Reusable)
 * ==============================================================
 * วงกลมเรืองแสงฟุ้ง Layer 1 ตามมาตรฐาน Immersive Full-Page Standard
 * ใช้ซ้ำได้ทุกบทเรียนโดยเปลี่ยน blobs array เพื่อปรับโทนสีตามวิชา/บท
 *
 * Props:
 *   blobs — Array of { color, size, position } เช่น:
 *     [
 *       { color: 'bg-indigo-200', size: 'w-96 h-96', position: 'top-0 left-0', opacity: 'opacity-40' },
 *       { color: 'bg-cyan-200',   size: 'w-80 h-80', position: 'bottom-0 right-0', opacity: 'opacity-30' },
 *     ]
 *   blur — Tailwind blur class (default: 'blur-[120px]')
 *
 * ตัวอย่างการใช้งาน (Python Unit 1 — Blue/Indigo theme):
 *   <AmbientBackdrop blobs={PY1_BLOBS} />
 *
 * ตัวอย่างการใช้งาน (Python Unit 4 — Amber/Orange theme):
 *   <AmbientBackdrop blobs={PY4_BLOBS} />
 */
import React from 'react';

// ─── Theme Presets (เพิ่มได้ตามรายวิชา/หน่วย) ──────────────────────────────
export const PY1_BLOBS = [
  { color: 'bg-indigo-200', size: 'w-96 h-96', position: '-top-20 -left-20', opacity: 'opacity-40' },
  { color: 'bg-cyan-200',   size: 'w-80 h-80', position: 'top-1/3 -right-20', opacity: 'opacity-30' },
  { color: 'bg-violet-200', size: 'w-72 h-72', position: '-bottom-20 left-1/4', opacity: 'opacity-25' },
];

export const PY2_BLOBS = [
  { color: 'bg-emerald-200', size: 'w-96 h-96', position: '-top-20 -left-20', opacity: 'opacity-40' },
  { color: 'bg-teal-200',    size: 'w-80 h-80', position: 'top-1/3 -right-20', opacity: 'opacity-30' },
  { color: 'bg-lime-200',    size: 'w-72 h-72', position: '-bottom-20 left-1/4', opacity: 'opacity-25' },
];

export const PY3_BLOBS = [
  { color: 'bg-orange-200', size: 'w-96 h-96', position: '-top-20 -left-20', opacity: 'opacity-35' },
  { color: 'bg-amber-200',  size: 'w-80 h-80', position: 'top-1/3 -right-20', opacity: 'opacity-30' },
  { color: 'bg-yellow-200', size: 'w-72 h-72', position: '-bottom-20 left-1/4', opacity: 'opacity-25' },
];

export const PY4_BLOBS = [
  { color: 'bg-sky-200',     size: 'w-96 h-96', position: '-top-20 -left-20', opacity: 'opacity-40' },
  { color: 'bg-indigo-200',  size: 'w-80 h-80', position: 'top-1/3 -right-20', opacity: 'opacity-30' },
  { color: 'bg-purple-200',  size: 'w-72 h-72', position: '-bottom-20 left-1/4', opacity: 'opacity-25' },
];

export const SQL1_BLOBS = [
  { color: 'bg-blue-200',   size: 'w-96 h-96', position: '-top-20 -left-20', opacity: 'opacity-35' },
  { color: 'bg-cyan-200',   size: 'w-80 h-80', position: 'top-1/3 -right-20', opacity: 'opacity-30' },
  { color: 'bg-sky-200',    size: 'w-64 h-64', position: '-bottom-16 left-1/3', opacity: 'opacity-25' },
];

// ─── Main Component ─────────────────────────────────────────────────────────
export default function AmbientBackdrop({ blobs = PY1_BLOBS, blur = 'blur-[120px]' }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${blob.color} ${blob.size} ${blob.position} ${blur} ${blob.opacity}`}
        />
      ))}
    </div>
  );
}
