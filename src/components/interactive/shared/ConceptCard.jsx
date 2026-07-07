/**
 * ConceptCard.jsx — Semantic Concept Card (OO-style Reusable)
 * ============================================================
 * การ์ดแนวคิดพรีเมียมตาม Concept Card Visual System (DESIGN.md §5)
 * ใช้สำหรับ: Operators, Keywords, Data Types, สูตร Python ฯลฯ
 *
 * Props:
 *   symbol      — สัญลักษณ์หลัก เช่น "==", "and", "True", "def" (string)
 *   title       — ชื่อแนวคิดภาษาไทย เช่น "เท่ากับ (Equal)" (string)
 *   description — คำอธิบายย่อ (string)
 *   code        — ตัวอย่างโค้ด เช่น "10 == 10" (string) — optional
 *   result      — ผลลัพธ์ เช่น "True", "False", หรือ string อื่น — optional
 *   accent      — ชุดสีตาม Semantic Palette ดังนี้:
 *                 "amber" | "rose" | "orange" | "teal" | "violet" | "cyan"
 *                 | "purple" | "pink" | "indigo" | "emerald" | "sky" | "lime"
 *   symbolFont  — "mono" (default) | "sans"
 *   active      — boolean: แสดง border กรอบสีตาม accent (active state)
 *   onClick     — callback เมื่อคลิกการ์ด (optional)
 *   resultColor — override สีผลลัพธ์: "indigo"|"emerald"|"rose"|"amber" (default: "indigo")
 */
import React from 'react';

// ── Accent Palette Map ────────────────────────────────────────────────────────
const ACCENT = {
  amber:   { symbol: 'text-amber-500',   blob: 'bg-amber-400',   border: 'border-amber-300',   ring: 'ring-amber-300'   },
  rose:    { symbol: 'text-rose-500',    blob: 'bg-rose-400',    border: 'border-rose-300',    ring: 'ring-rose-300'    },
  orange:  { symbol: 'text-orange-500',  blob: 'bg-orange-400',  border: 'border-orange-300',  ring: 'ring-orange-300'  },
  teal:    { symbol: 'text-teal-500',    blob: 'bg-teal-400',    border: 'border-teal-300',    ring: 'ring-teal-300'    },
  violet:  { symbol: 'text-violet-500',  blob: 'bg-violet-400',  border: 'border-violet-300',  ring: 'ring-violet-300'  },
  cyan:    { symbol: 'text-cyan-500',    blob: 'bg-cyan-400',    border: 'border-cyan-300',    ring: 'ring-cyan-300'    },
  purple:  { symbol: 'text-purple-600',  blob: 'bg-purple-400',  border: 'border-purple-300',  ring: 'ring-purple-300'  },
  pink:    { symbol: 'text-pink-500',    blob: 'bg-pink-400',    border: 'border-pink-300',    ring: 'ring-pink-300'    },
  indigo:  { symbol: 'text-indigo-500',  blob: 'bg-indigo-400',  border: 'border-indigo-300',  ring: 'ring-indigo-300'  },
  emerald: { symbol: 'text-emerald-600', blob: 'bg-emerald-400', border: 'border-emerald-300', ring: 'ring-emerald-300' },
  sky:     { symbol: 'text-sky-500',     blob: 'bg-sky-400',     border: 'border-sky-300',     ring: 'ring-sky-300'     },
  lime:    { symbol: 'text-lime-600',    blob: 'bg-lime-400',    border: 'border-lime-300',    ring: 'ring-lime-300'    },
};

const RESULT_COLOR = {
  indigo:  'text-indigo-600',
  emerald: 'text-emerald-600',
  rose:    'text-rose-500',
  amber:   'text-amber-600',
};

// ── ConceptCard ───────────────────────────────────────────────────────────────
export default function ConceptCard({
  symbol,
  title,
  description,
  code,
  result,
  accent = 'indigo',
  symbolFont = 'mono',
  active = false,
  onClick,
  resultColor = 'indigo',
}) {
  const a = ACCENT[accent] || ACCENT.indigo;
  const rc = RESULT_COLOR[resultColor] || RESULT_COLOR.indigo;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border shadow-sm p-6 relative overflow-hidden transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${active ? `${a.border} ring-2 ${a.ring} ring-offset-1` : 'border-slate-200'}
      `}
    >
      {/* Corner accent blob */}
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${a.blob} blur-2xl opacity-25 pointer-events-none`} />

      {/* Symbol */}
      {symbol && (
        <div className={`${symbolFont === 'mono' ? 'font-mono' : 'font-sans'} text-2xl font-bold ${a.symbol} mb-2 leading-tight`}>
          {symbol}
        </div>
      )}

      {/* Title */}
      {title && (
        <h4 className="text-[15px] font-bold text-slate-800 mb-1 leading-snug">{title}</h4>
      )}

      {/* Description */}
      {description && (
        <p className="text-[14px] text-slate-500 leading-relaxed mb-4">{description}</p>
      )}

      {/* Code + Result strip */}
      {(code || result) && (
        <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-center justify-between gap-2 border border-slate-100">
          {code && (
            <code className="font-mono text-[13px] text-slate-700">{code}</code>
          )}
          {result && (
            <span className={`font-semibold text-sm shrink-0 ${rc}`}>{result}</span>
          )}
        </div>
      )}
    </div>
  );
}
