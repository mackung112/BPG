/**
 * LogicGateSimulator.jsx — Visual Logic Gate / Flow Simulator (Reusable)
 * =======================================================================
 * จำลองการทำงานของ boolean operators แบบ visual flow ตาม DESIGN.md §5.3
 * input A → [operator] → output — ดูง่าย เข้าใจง่าย สมจริง
 *
 * โหมด:
 *   mode="binary"  — 2 inputs + operator (เช่น and, or, ==, !=)
 *   mode="unary"   — 1 input + operator (เช่น not, abs)
 *
 * Props (Binary):
 *   operator  — string: "and" | "or" | "==" | "!=" | ">" | "<" | ">=" | "<="
 *   inputA    — boolean หรือ any value ของ input ซ้าย
 *   inputB    — boolean หรือ any value ของ input ขวา
 *   onChangeA — callback(value) เมื่อ toggle input A
 *   onChangeB — callback(value) เมื่อ toggle input B
 *
 * Props (Unary):
 *   mode      — "unary"
 *   operator  — string: "not"
 *   inputA    — boolean
 *   onChangeA — callback(value)
 *
 * Props (shared):
 *   operatorColor — Tailwind bg class สำหรับกล่อง operator: "bg-violet-600" (default)
 *   showFormula   — boolean: แสดง formula bar ด้านล่าง (default: true)
 *   title         — ชื่อ simulator (optional)
 */
import React from 'react';

// ── Compute result ────────────────────────────────────────────────────────────
function computeResult(op, a, b) {
  switch (op) {
    case 'and':  return Boolean(a) && Boolean(b);
    case 'or':   return Boolean(a) || Boolean(b);
    case 'not':  return !Boolean(a);
    case '==':   return a === b;
    case '!=':   return a !== b;
    case '>':    return a > b;
    case '<':    return a < b;
    case '>=':   return a >= b;
    case '<=':   return a <= b;
    default:     return null;
  }
}

// ── Value display ──────────────────────────────────────────────────────────────
function ValuePill({ value, onClick }) {
  const isTrue = value === true;
  const isFalse = value === false;
  const label = typeof value === 'boolean' ? (value ? 'True' : 'False') : String(value);
  const pillClass = isTrue
    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
    : isFalse
      ? 'bg-rose-50 border-rose-300 text-rose-600'
      : 'bg-slate-50 border-slate-300 text-slate-700';

  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-xl px-5 py-2 font-mono font-bold text-sm transition-all active:scale-95 hover:shadow-sm cursor-pointer ${pillClass}`}
    >
      {label}
    </button>
  );
}

// ── Output Circle ──────────────────────────────────────────────────────────────
function OutputCircle({ value }) {
  const isTrue = value === true;
  const circleClass = isTrue
    ? 'border-emerald-400 bg-emerald-50 text-emerald-600'
    : 'border-slate-300 bg-slate-50 text-slate-400';
  const label = typeof value === 'boolean' ? (value ? 'True' : 'False') : String(value);

  return (
    <div className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-300 ${circleClass}`}>
      {/* bulb icon */}
      <svg viewBox="0 0 24 24" className="w-6 h-6 mb-0.5" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7zm0 2a5 5 0 0 1 5 5c0 1.87-.99 3.53-2.5 4.45V16h-5v-2.55A5.008 5.008 0 0 1 7 9a5 5 0 0 1 5-5zm-1 16h2v1h-2v-1z"/>
      </svg>
      <span className="text-[10px] font-bold leading-none">{label}</span>
    </div>
  );
}

// ── Arrow ──────────────────────────────────────────────────────────────────────
const Arrow = () => (
  <span className="text-slate-400 text-lg font-bold select-none mx-1">→</span>
);

// ── Binary Simulator ──────────────────────────────────────────────────────────
function BinarySimulator({ operator, inputA, inputB, onChangeA, onChangeB, operatorColor }) {
  const result = computeResult(operator, inputA, inputB);
  const aLabel = typeof inputA === 'boolean' ? (inputA ? 'True' : 'False') : String(inputA);
  const bLabel = typeof inputB === 'boolean' ? (inputB ? 'True' : 'False') : String(inputB);
  const rLabel = typeof result === 'boolean' ? (result ? 'True' : 'False') : String(result);
  const rColor = result === true ? 'text-emerald-500' : 'text-rose-500';

  return (
    <div className="flex flex-col gap-4">
      {/* Flow diagram */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex flex-col gap-2">
          <ValuePill value={inputA} onClick={() => onChangeA && onChangeA(!inputA)} />
          <span className={`${operatorColor || 'bg-violet-600'} text-white font-bold rounded-xl px-3 py-1 text-xs text-center`}>
            {operator}
          </span>
          <ValuePill value={inputB} onClick={() => onChangeB && onChangeB(!inputB)} />
        </div>
        <Arrow />
        <OutputCircle value={result} />
      </div>

      {/* Formula bar */}
      <div className="bg-slate-900 rounded-xl px-5 py-3 font-mono text-sm">
        <span className={typeof inputA === 'boolean' ? (inputA ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-300'}>
          {aLabel}
        </span>
        {' '}
        <span className="text-violet-400 font-bold">{operator}</span>
        {' '}
        <span className={typeof inputB === 'boolean' ? (inputB ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-300'}>
          {bLabel}
        </span>
        {' → '}
        <span className={rColor + ' font-bold'}>{rLabel}</span>
      </div>
    </div>
  );
}

// ── Unary Simulator ────────────────────────────────────────────────────────────
function UnarySimulator({ operator, inputA, onChangeA, operatorColor }) {
  const result = computeResult(operator, inputA);
  const aLabel = typeof inputA === 'boolean' ? (inputA ? 'True' : 'False') : String(inputA);
  const rLabel = typeof result === 'boolean' ? (result ? 'True' : 'False') : String(result);
  const aColor = inputA === true ? 'bg-rose-50 border-rose-300 text-rose-600' : 'bg-emerald-50 border-emerald-300 text-emerald-700';
  const rColor = result === true ? 'border-emerald-400 bg-emerald-50 text-emerald-600' : 'border-rose-300 bg-rose-50 text-rose-600';

  return (
    <div className="flex flex-col gap-4">
      {/* Flow diagram */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => onChangeA && onChangeA(!inputA)}
          className={`border-2 rounded-xl px-5 py-2 font-mono font-bold text-sm cursor-pointer active:scale-95 transition-all ${aColor}`}
        >
          {aLabel}
        </button>
        <Arrow />
        <div className={`${operatorColor || 'bg-violet-600'} text-white font-bold rounded-xl px-4 py-1.5 text-sm`}>
          {operator}
        </div>
        <Arrow />
        <div className={`border-2 rounded-xl px-5 py-2 font-mono font-bold text-sm ${rColor}`}>
          {rLabel}
        </div>
      </div>

      {/* Formula bar */}
      <div className="bg-slate-900 rounded-xl px-5 py-3 font-mono text-sm">
        <span className="text-violet-400 font-bold">{operator}</span>
        {' '}
        <span className={inputA === true ? 'text-rose-400' : 'text-emerald-400'}>{aLabel}</span>
        {' → '}
        <span className={result === true ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{rLabel}</span>
      </div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function LogicGateSimulator({
  mode = 'binary',
  operator = 'and',
  inputA = false,
  inputB = false,
  onChangeA,
  onChangeB,
  operatorColor = 'bg-violet-600',
  title,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {title && (
        <p className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-4">
          {title}
        </p>
      )}
      {mode === 'binary' ? (
        <BinarySimulator
          operator={operator}
          inputA={inputA}
          inputB={inputB}
          onChangeA={onChangeA}
          onChangeB={onChangeB}
          operatorColor={operatorColor}
        />
      ) : (
        <UnarySimulator
          operator={operator}
          inputA={inputA}
          onChangeA={onChangeA}
          operatorColor={operatorColor}
        />
      )}
    </div>
  );
}

// Re-export computeResult ให้ parent component ใช้ได้
export { computeResult };
