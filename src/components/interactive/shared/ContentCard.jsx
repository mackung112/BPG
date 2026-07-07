import React from 'react';

export default function ContentCard({ title, icon, color, children }) {
  const colorMap = {
    amber: 'text-amber-400',
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    teal: 'text-teal-400',
    fuchsia: 'text-fuchsia-400',
    pink: 'text-pink-400',
    indigo: 'text-indigo-400',
    violet: 'text-violet-400',
    green: 'text-green-400',
    orange: 'text-orange-400',
    rose: 'text-rose-400',
  };

  const textColor = colorMap[color] || 'text-white';

  return (
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden mb-8 shadow-xl">
      <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700/50 flex items-center gap-3">
        {icon}
        <h4 className={`text-lg font-bold ${textColor}`}>{title}</h4>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
