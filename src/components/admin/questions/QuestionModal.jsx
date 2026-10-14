import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Trash2, X, Check, Loader2, AlertCircle } from 'lucide-react';

export default function QuestionModal({ isOpen, onClose, onSave, editingQuestion }) {
  const [questionText, setQuestionText] = useState('');
  const [choices, setChoices] = useState([
    { text: '', is_correct: true },
    { text: '', is_correct: false },
    { text: '', is_correct: false },
    { text: '', is_correct: false },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingQuestion) {
      setQuestionText(editingQuestion.question_text || '');
      const rawChoices = editingQuestion.choices || [];
      const mapped = rawChoices.map((c, i) => ({
        text: c.text || '',
        is_correct: i === editingQuestion.correct_answer_index || Boolean(c.is_correct)
      }));
      setChoices(mapped.length >= 2 ? mapped : [
        { text: '', is_correct: true },
        { text: '', is_correct: false },
      ]);
    } else {
      setQuestionText('');
      setChoices([
        { text: '', is_correct: true },
        { text: '', is_correct: false },
        { text: '', is_correct: false },
        { text: '', is_correct: false },
      ]);
    }
    setError('');
  }, [editingQuestion, isOpen]);

  if (!isOpen) return null;

  const handleChoiceTextChange = (index, text) => {
    setChoices(choices.map((c, i) => i === index ? { ...c, text } : c));
  };

  const handleSetCorrect = (index) => {
    setChoices(choices.map((c, i) => ({
      ...c,
      is_correct: i === index
    })));
  };

  const handleAddChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, { text: '', is_correct: false }]);
    }
  };

  const handleRemoveChoice = (index) => {
    if (choices.length <= 2) return;
    const removedWasCorrect = choices[index].is_correct;
    const updated = choices.filter((_, i) => i !== index);
    if (removedWasCorrect && updated.length > 0) {
      updated[0].is_correct = true;
    }
    setChoices(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setError('กรุณาระบุโจทย์คำถาม');
      return;
    }

    const filledChoices = choices.filter(c => c.text.trim() !== '');
    if (filledChoices.length < 2) {
      setError('กรุณากรอกตัวเลือกอย่างน้อย 2 ตัวเลือก');
      return;
    }

    const correctIdx = filledChoices.findIndex(c => c.is_correct);
    if (correctIdx === -1) {
      setError('กรุณาเลือกตัวเลือกที่ถูกต้อง 1 ข้อ');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      await onSave({
        question_text: questionText.trim(),
        choices: filledChoices,
        correct_answer_index: correctIdx
      });
      onClose();
    } catch (err) {
      setError(err.message || 'บันทึกไม่สำเร็จ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-zinc-100 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                {editingQuestion ? 'แก้ไขข้อสอบ' : 'เพิ่มข้อสอบใหม่'}
              </h3>
              <p className="text-xs text-zinc-500">
                กำหนดคำถาม ตัวเลือก และเลือกเฉลยที่ถูกต้อง
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
              โจทย์คำถาม *
            </label>
            <textarea
              required
              rows={3}
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              placeholder="ระบุข้อความคำถาม..."
              className="w-full p-3 border border-zinc-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-zinc-700">
                ตัวเลือกคำตอบ (เลือกปุ่มวงกลมหน้ารายการที่ถูกต้อง) *
              </label>
              {choices.length < 6 && (
                <button
                  type="button"
                  onClick={handleAddChoice}
                  className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> เพิ่มตัวเลือก
                </button>
              )}
            </div>

            <div className="space-y-2">
              {choices.map((choice, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctChoice"
                    checked={choice.is_correct}
                    onChange={() => handleSetCorrect(i)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
                    title="ตั้งเป็นตัวเลือกที่ถูกต้อง"
                  />
                  <input
                    type="text"
                    required
                    value={choice.text}
                    onChange={e => handleChoiceTextChange(i, e.target.value)}
                    placeholder={`ตัวเลือกข้อที่ ${i + 1}`}
                    className={`flex-1 px-3 py-2 border rounded-xl text-xs transition-colors ${
                      choice.is_correct 
                        ? 'border-emerald-300 bg-emerald-50/40 text-emerald-950 font-medium' 
                        : 'border-zinc-200 bg-white'
                    }`}
                  />
                  {choices.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChoice(i)}
                      className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-zinc-100 rounded-lg cursor-pointer"
                      title="ลบตัวเลือกนี้"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
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
                  <span>กำลังบันทึก...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{editingQuestion ? 'บันทึกการแก้ไข' : 'เพิ่มข้อสอบ'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
