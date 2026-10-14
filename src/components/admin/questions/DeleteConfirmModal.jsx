import React from 'react';
import { Trash2, X, AlertTriangle, Loader2 } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'ยืนยันการลบ',
  description = 'การกระทำนี้ไม่สามารถย้อนกลับได้ คุณต้องการดำเนินการต่อหรือไม่?',
  itemName = '',
  loading = false,
  dangerLevel = 'high' // 'high' | 'medium'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4 animate-scale-up">
        <div className="flex items-center justify-between">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl w-fit">
            <Trash2 className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-xl hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-base font-bold text-zinc-900">{title}</h3>
          {itemName && (
            <div className="mt-2 p-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs font-semibold text-zinc-800 truncate">
              "{itemName}"
            </div>
          )}
          <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex gap-2.5 pt-2 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-rose-500/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>กำลังลบ...</span>
              </>
            ) : (
              <span>ยืนยันการลบ</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
