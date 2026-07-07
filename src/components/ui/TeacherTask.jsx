import React, { useState } from 'react';
import { Copy, CheckCircle2, BookOpen, Lock, Unlock, KeyRound } from 'lucide-react';

const TeacherTask = ({ title, taskText, pin }) => {
  const [copied, setCopied] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(!pin);
  const [error, setError] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(taskText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (enteredPin === pin) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setEnteredPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 opacity-40"></div>
        <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl h-full flex flex-col items-center shadow-xl text-center transition-all">
          <div className="p-4 bg-rose-100 rounded-full text-rose-600 mb-6 border border-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
            <Lock className="w-8 h-8" />
          </div>
          <p className="text-xs font-bold text-rose-500 mb-2 tracking-widest uppercase">Instructor Task (Locked)</p>
          <h3 className="text-2xl font-bold text-slate-800 mb-8">{title}</h3>
          
          <form onSubmit={handleUnlock} className="flex flex-col items-center w-full max-w-sm">
            <div className="relative w-full mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound className={`w-5 h-5 ${error ? 'text-rose-400' : 'text-slate-400'}`} />
              </div>
              <input 
                type="password" 
                placeholder="กรอกรหัส PIN เพื่อดูโจทย์"
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${error ? 'border-rose-400 bg-rose-50' : 'border-slate-300 bg-white'} focus:outline-none focus:ring-2 ${error ? 'focus:ring-rose-400' : 'focus:ring-purple-400'} transition-all text-center tracking-widest text-lg`}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
              />
            </div>
            {error && <p className="text-rose-500 text-sm mb-4 animate-pulse">รหัส PIN ไม่ถูกต้อง</p>}
            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" /> ปลดล็อก
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 border border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-500 mb-1 tracking-widest uppercase">Instructor Task {pin && '(Unlocked)'}</p>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              copied 
                ? 'bg-blue-100 text-blue-600 border border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
            }`}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'คัดลอกแล้ว' : 'คัดลอกโจทย์'}
          </button>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 whitespace-pre-wrap leading-relaxed font-mono text-sm">
          {taskText}
        </div>
      </div>
    </div>
  );
};

export default TeacherTask;
