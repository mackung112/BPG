import React, { useState, useEffect } from 'react';
import { Layers, X, Check, Loader2, AlertCircle } from 'lucide-react';

export default function ExamSetModal({ isOpen, onClose, onSave, subject, editingExamSet }) {
  const [examTitle, setExamTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingExamSet) {
      setExamTitle(editingExamSet.parsedExamTitle || editingExamSet.title || '');
    } else {
      setExamTitle('');
    }
    setError('');
  }, [editingExamSet, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!examTitle.trim()) {
      setError('กรุณาระบุชื่อชุดข้อสอบ');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      await onSave({
        subjectCode: subject?.subject_code || '',
        examTitle: examTitle.trim()
      });
      onClose();
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                {editingExamSet ? 'แก้ไขชื่อชุดข้อสอบ' : 'สร้างชุดข้อสอบใหม่'}
              </h3>
              <p className="text-xs text-zinc-500">
                {subject ? `${subject.subject_code ? subject.subject_code + ' - ' : ''}${subject.subject_name}` : 'คลังทั่วไป'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-xl hover:bg-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-700 mb-1">
              ชื่อชุดข้อสอบ *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="เช่น ปลายภาค, กลางภาค, แบบทดสอบบทที่ 1, Canva Quiz"
              value={examTitle}
              onChange={e => setExamTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-xs"
            />
            <p className="text-[11px] text-zinc-400 mt-1.5">
              ระบบจะเชื่อมโยงชุดข้อสอบนี้เข้ากับรายวิชา{' '}
              <strong className="text-zinc-700">{subject?.subject_code || 'ทั่วไป'}</strong> โดยอัตโนมัติ
            </p>
          </div>

          <div className="flex gap-2.5 pt-2 border-t border-zinc-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-zinc-200 rounded-xl font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-purple-500/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{editingExamSet ? 'บันทึกการแก้ไข' : 'สร้างชุดข้อสอบ'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
