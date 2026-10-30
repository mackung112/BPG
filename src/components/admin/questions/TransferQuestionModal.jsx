import React, { useState, useEffect } from 'react';
import QuestionRenderer from '../../exam/QuestionRenderer.jsx';
import { ArrowRightLeft, Copy, MoveRight, X, Check, Loader2, AlertCircle, Plus } from 'lucide-react';

export default function TransferQuestionModal({
  isOpen,
  onClose,
  question,
  targetSubject,
  targetBank, // ถ้าลากมาปล่อยที่ bank โดยตรง
  availableBanks = [], // banks ทั้งหมดใน targetSubject
  onConfirmTransfer, // (action: 'move' | 'copy', targetBankId, newExamTitle)
}) {
  const [selectedBankId, setSelectedBankId] = useState('');
  const [transferMode, setTransferMode] = useState('move'); // 'move' | 'copy'
  const [createNewBank, setCreateNewBank] = useState(false);
  const [newBankTitle, setNewBankTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (targetBank) {
        setSelectedBankId(targetBank.id);
        setCreateNewBank(false);
      } else if (availableBanks.length > 0) {
        setSelectedBankId(availableBanks[0].id);
        setCreateNewBank(false);
      } else {
        setSelectedBankId('');
        setCreateNewBank(true);
      }
      setTransferMode('move');
      setNewBankTitle('');
      setError('');
    }
  }, [isOpen, targetBank, availableBanks]);

  if (!isOpen || !question) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (createNewBank && !newBankTitle.trim()) {
      setError('กรุณากรอกชื่อชุดข้อสอบใหม่');
      return;
    }
    if (!createNewBank && !selectedBankId) {
      setError('กรุณาเลือกชุดข้อสอบปลายทาง');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      await onConfirmTransfer({
        mode: transferMode,
        targetBankId: createNewBank ? null : selectedBankId,
        newBankTitle: createNewBank ? newBankTitle.trim() : null,
        targetSubjectCode: targetSubject?.subject_code || ''
      });
      onClose();
    } catch (err) {
      setError(err.message || 'ดำเนินการไม่สำเร็จ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-zinc-100 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                ย้ายหรือคัดลอกข้อสอบ
              </h3>
              <p className="text-xs text-zinc-500">
                ไปยังรายวิชา {targetSubject?.subject_code ? `${targetSubject.subject_code} ` : ''}{targetSubject?.subject_name}
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

        {/* Question Preview */}
        <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200/80 text-xs">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
            ข้อสอบที่เลือก:
          </span>
          <div className="font-medium text-zinc-800 line-clamp-2">
            <QuestionRenderer content={question.question_text} compact />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Action Choice: Move vs Copy */}
          <div>
            <label className="block font-semibold text-zinc-700 mb-1.5">
              เลือกรูปแบบการกระทำ *
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setTransferMode('move')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                  transferMode === 'move'
                    ? 'bg-indigo-50/80 border-indigo-300 text-indigo-900 ring-2 ring-indigo-500/20'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <MoveRight className={`w-4 h-4 shrink-0 mt-0.5 ${transferMode === 'move' ? 'text-indigo-600' : 'text-zinc-400'}`} />
                <div>
                  <div className="font-bold text-xs">ย้ายข้อสอบ (Move)</div>
                  <div className="text-[10.5px] text-zinc-500 mt-0.5">ลบออกจากชุดเดิมแล้วย้ายมาไว้ที่ชุดนี้</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTransferMode('copy')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                  transferMode === 'copy'
                    ? 'bg-purple-50/80 border-purple-300 text-purple-900 ring-2 ring-purple-500/20'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <Copy className={`w-4 h-4 shrink-0 mt-0.5 ${transferMode === 'copy' ? 'text-purple-600' : 'text-zinc-400'}`} />
                <div>
                  <div className="font-bold text-xs">คัดลอก (Copy)</div>
                  <div className="text-[10.5px] text-zinc-500 mt-0.5">สร้างสำเนาข้อสอบเพิ่ม โดยคงชุดเดิมไว้</div>
                </div>
              </button>
            </div>
          </div>

          {/* Target Exam Set Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-zinc-700">
                ชุดข้อสอบปลายทางในรายวิชานี้ *
              </label>
              {availableBanks.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCreateNewBank(!createNewBank)}
                  className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  {createNewBank ? 'เลือกจากชุดที่มีอยู่' : 'สร้างชุดข้อสอบใหม่'}
                </button>
              )}
            </div>

            {createNewBank || availableBanks.length === 0 ? (
              <div>
                <input
                  type="text"
                  required
                  placeholder="พิมพ์ชื่อชุดข้อสอบใหม่ เช่น กลางภาค, บทที่ 1..."
                  value={newBankTitle}
                  onChange={e => setNewBankTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl focus:border-indigo-500 text-xs"
                />
                <p className="text-[10.5px] text-zinc-400 mt-1">
                  จะสร้างชุดข้อสอบใหม่นี้ในวิชา {targetSubject?.subject_code || ''} โดยอัตโนมัติ
                </p>
              </div>
            ) : (
              <select
                value={selectedBankId}
                onChange={e => setSelectedBankId(e.target.value)}
                className="w-full px-3 py-2.5 border border-zinc-200 rounded-xl focus:border-indigo-500 text-xs bg-white font-medium text-zinc-800"
              >
                {availableBanks.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.parsedExamTitle || b.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex gap-2.5 pt-3 border-t border-zinc-100">
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
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-500/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังดำเนินการ...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>ยืนยันการ{transferMode === 'move' ? 'ย้าย' : 'คัดลอก'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
