import React from 'react';
import { Flag, CheckCircle, HelpCircle, X } from 'lucide-react';

export default function QuestionPalette({
  questions = [],
  currentIndex = 0,
  answers = {},
  flagged = {},
  onSelectQuestion,
  isMobileDrawer = false,
  onCloseDrawer
}) {
  const total = questions.length;
  const answeredCount = questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '').length;
  const flaggedCount = questions.filter(q => {
    if (Array.isArray(flagged)) return flagged.includes(q.id);
    return Boolean(flagged[q.id]);
  }).length;
  const remainingCount = Math.max(0, total - answeredCount);

  const isFlagged = (qId) => {
    if (Array.isArray(flagged)) return flagged.includes(qId);
    return Boolean(flagged[qId]);
  };

  const isAnswered = (qId) => {
    return answers[qId] !== undefined && answers[qId] !== null && answers[qId] !== '';
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm ${isMobileDrawer ? 'max-h-[80vh]' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">ผังข้อสอบ (Question Palette)</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">คลิกที่หมายเลขเพื่อไปยังข้อที่ต้องการ</p>
        </div>
        {isMobileDrawer && onCloseDrawer && (
          <button
            onClick={onCloseDrawer}
            className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="ปิดแผงผังข้อสอบ"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress Stats Summary */}
      <div className="grid grid-cols-3 gap-2 py-4 text-center border-b border-zinc-100 dark:border-zinc-800">
        <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-2.5 border border-emerald-100/60 dark:border-emerald-800/40">
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">ตอบแล้ว</div>
          <div className="text-lg font-black text-emerald-700 dark:text-emerald-300">{answeredCount}</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/40 rounded-2xl p-2.5 border border-amber-100/60 dark:border-amber-800/40">
          <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">ปักธง</div>
          <div className="text-lg font-black text-amber-700 dark:text-amber-300">{flaggedCount}</div>
        </div>
        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-2.5 border border-zinc-100 dark:border-zinc-700/50">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">ยังไม่ตอบ</div>
          <div className="text-lg font-black text-zinc-700 dark:text-zinc-300">{remainingCount}</div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="flex-1 overflow-y-auto py-4 pr-1">
        <div className="grid grid-cols-5 gap-2.5">
          {questions.map((q, idx) => {
            const answered = isAnswered(q.id);
            const flaggedItem = isFlagged(q.id);
            const isCurrent = idx === currentIndex;

            let btnStyle = 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700';
            if (answered) {
              btnStyle = 'bg-emerald-500 text-white font-semibold shadow-sm hover:bg-emerald-600';
            }

            return (
              <button
                key={q.id || idx}
                onClick={() => {
                  onSelectQuestion(idx);
                  if (isMobileDrawer && onCloseDrawer) onCloseDrawer();
                }}
                className={`relative h-11 rounded-2xl flex items-center justify-center text-sm transition-all duration-150 cursor-pointer ${btnStyle} ${
                  isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-900 font-bold scale-105 z-10' : ''
                }`}
                aria-label={`ข้อที่ ${idx + 1} ${answered ? '(ตอบแล้ว)' : '(ยังไม่ตอบ)'} ${flaggedItem ? '(ปักธง)' : ''}`}
              >
                <span>{idx + 1}</span>
                {flaggedItem && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-0.5 shadow-xs">
                    <Flag className="w-2.5 h-2.5 fill-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-emerald-500" />
          <span>ตอบแล้ว</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-zinc-200 dark:bg-zinc-700" />
          <span>ยังไม่ตอบ</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-amber-500 flex items-center justify-center text-white">
            <Flag className="w-2 h-2 fill-white" />
          </span>
          <span>ปักธง</span>
        </div>
      </div>
    </div>
  );
}
