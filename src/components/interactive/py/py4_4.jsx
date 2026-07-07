import TeacherTask from '../../ui/TeacherTask';
import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Copy, 
  CheckCircle2, 
  BookOpen, 
  RefreshCw,
  Plus,
  Minus,
  X,
  Divide,
  Gamepad2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';



const AssignmentSimulator = () => {
  const [score, setScore] = useState(10);
  const [history, setHistory] = useState([
    { action: 'เริ่มต้นเกม', code: 'score = 10', prev: null, next: 10 }
  ]);
  const [animateId, setAnimateId] = useState(0);

  const handleAction = (op, val, label) => {
    const prevScore = score;
    let nextScore = score;
    let codeStr = '';

    if (op === '+=') { nextScore += val; codeStr = `score += ${val}`; }
    if (op === '-=') { nextScore -= val; codeStr = `score -= ${val}`; }
    if (op === '*=') { nextScore *= val; codeStr = `score *= ${val}`; }
    if (op === '//=') { nextScore = Math.floor(nextScore / val); codeStr = `score //= ${val}`; }

    setScore(nextScore);
    setAnimateId(prev => prev + 1);
    
    setHistory(prev => [
      { action: label, code: codeStr, prev: prevScore, next: nextScore },
      ...prev
    ].slice(0, 5)); // Keep only last 5 logs
  };

  const resetSimulator = () => {
    setScore(10);
    setAnimateId(prev => prev + 1);
    setHistory([{ action: 'เริ่มต้นเกมใหม่', code: 'score = 10', prev: null, next: 10 }]);
  };

  return (
    <div className="my-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-60"></div>
      
      <div className="p-8 md:p-12 relative z-10">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-3">
            <Gamepad2 className="w-6 h-6 text-amber-500" />
            ระบบเก็บคะแนน (Score Tracker)
          </h3>
          <p className="text-slate-500 mt-2">ทดลองกดปุ่มเหตุการณ์ต่างๆ เพื่อดูว่าตัวแปร <code className="bg-slate-100 text-amber-600 px-1 rounded font-mono">score</code> ถูกอัปเดตค่าอย่างไร</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div key={animateId} className="relative w-48 h-48 bg-white rounded-[2rem] border-4 border-slate-100 shadow-xl flex flex-col items-center justify-center animate-bounce-short">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-amber-400/20 blur-xl -z-10"></div>
              
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">score</span>
              <span className="text-6xl font-black text-slate-800 font-mono tracking-tighter">{score}</span>
            </div>

            <button 
              onClick={resetSimulator}
              className="mt-8 flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 transition-colors bg-slate-100 px-4 py-2 rounded-full font-bold"
            >
              <RefreshCw className="w-4 h-4" /> เริ่มใหม่ (Reset)
            </button>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-3 flex flex-col gap-3 justify-center">
            <button 
              onClick={() => handleAction('+=', 5, 'เก็บเหรียญทอง')}
              className="group relative flex items-center justify-between p-4 bg-white border-2 border-emerald-100 hover:border-emerald-400 rounded-2xl shadow-sm transition-all hover:shadow-md"
            >
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-500" /> เก็บเหรียญ
              </span>
              <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">+= 5</span>
            </button>

            <button 
              onClick={() => handleAction('-=', 3, 'โดนศัตรูโจมตี')}
              className="group relative flex items-center justify-between p-4 bg-white border-2 border-rose-100 hover:border-rose-400 rounded-2xl shadow-sm transition-all hover:shadow-md"
            >
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <Minus className="w-4 h-4 text-rose-500" /> โดนโจมตี
              </span>
              <span className="font-mono text-rose-600 font-bold bg-rose-50 px-2 py-1 rounded">-= 3</span>
            </button>

            <button 
              onClick={() => handleAction('*=', 2, 'เก็บไอเทมคูณสอง')}
              className="group relative flex items-center justify-between p-4 bg-white border-2 border-amber-100 hover:border-amber-400 rounded-2xl shadow-sm transition-all hover:shadow-md"
            >
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <X className="w-4 h-4 text-amber-500" /> โบนัส x2
              </span>
              <span className="font-mono text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">*= 2</span>
            </button>

            <button 
              onClick={() => handleAction('//=', 2, 'ตกหลุมพราง')}
              className="group relative flex items-center justify-between p-4 bg-white border-2 border-purple-100 hover:border-purple-400 rounded-2xl shadow-sm transition-all hover:shadow-md"
            >
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <Divide className="w-4 h-4 text-purple-500" /> คะแนนหายครึ่ง
              </span>
              <span className="font-mono text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded">//= 2</span>
            </button>
          </div>

          {/* History Log */}
          <div className="lg:col-span-4 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-inner flex flex-col">
            <h4 className="text-slate-400 text-xs font-mono mb-4 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Terminal Log</span>
              <span>Python 3.10</span>
            </h4>
            <div className="flex-grow flex flex-col gap-3 font-mono text-sm overflow-y-auto pr-2">
              {history.map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl border ${idx === 0 ? 'bg-amber-900/30 border-amber-500/50' : 'bg-slate-800/50 border-transparent opacity-60'}`}>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400 text-xs"># {item.action}</span>
                    {item.prev !== null && (
                      <span className="text-slate-500 text-xs">{item.prev} → <span className="text-white">{item.next}</span></span>
                    )}
                  </div>
                  <div className="text-emerald-400 font-bold">
                    {item.code}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Required style for the short bounce animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        .animate-bounce-short {
          animation: bounce-short 0.3s ease-in-out;
        }
      `}} />
    </div>
  );
};

export default function pyUnit4_5_AssignmentOps() {
  const teacherTaskContent = `โจทย์ปฏิบัติการเขียนโปรแกรม: "ระบบร้านค้าของเกม RPG"
ให้นักเรียนสร้างโปรแกรมร้านค้า โดยกำหนดค่าเริ่มต้นดังนี้
money = 1000

จากนั้นให้จำลองการซื้อขาย โดยใช้เครื่องหมาย Assignment Operators (+=, -=) 
1. ผู้เล่นซื้อ "ดาบเหล็ก" ราคา 350 บาท (ให้หักเงินผู้เล่น)
2. ผู้เล่นขาย "หนังสไลม์" ได้เงิน 120 บาท (ให้เพิ่มเงินผู้เล่น)
3. ให้ print() แสดงจำนวนเงินคงเหลือของผู้เล่นในแต่ละขั้นตอนออกมา

# ตัวอย่างผลรัน
เงินเริ่มต้น: 1000 บาท
ซื้อดาบเหล็ก 350 บาท...
เหลือเงิน: 650 บาท
ขายหนังสไลม์ได้ 120 บาท...
ยอดเงินปัจจุบัน: 770 บาท`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-amber-200 selection:text-amber-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] rounded-full bg-amber-100/60 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-50/70 blur-[100px]"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Core Concept: Equal vs Math */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-xl mb-12 flex flex-col md:flex-row gap-10 items-center overflow-hidden relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-100 rounded-full blur-2xl z-0"></div>
          
          <div className="md:w-1/2 relative z-10">
            <div className="inline-flex items-center gap-2 text-rose-500 font-bold mb-4 bg-rose-50 px-3 py-1.5 rounded-full text-sm">
              <AlertCircle className="w-4 h-4" /> จุดที่มักสับสนในตอนเริ่มต้น
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-4 font-mono tracking-tight">x = x + 5</h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              ในวิชาคณิตศาสตร์ สมการนี้เป็นไปไม่ได้ (เพราะ x ไม่มีทางเท่ากับ x+5) <br/>
              แต่ใน <strong>วิชาคอมพิวเตอร์</strong> มันหมายถึง: <br/><br/>
              <span className="font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded border border-amber-100">
                "เอาค่าเดิมของ x ไปบวก 5 แล้วนำกลับไปเก็บไว้ใน x ที่เดิม"
              </span>
            </p>
          </div>

          <div className="md:w-1/2 w-full relative z-10">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg text-slate-300 font-mono text-sm leading-loose">
              <span className="text-slate-500"># 1. สร้างตัวแปรเริ่มต้น</span><br/>
              <span className="text-blue-400">score</span> = <span className="text-amber-400">10</span><br/><br/>
              
              <span className="text-slate-500"># 2. เพิ่มค่า (เอา 10 มาบวก 5)</span><br/>
              <span className="text-blue-400">score</span> = <span className="text-blue-400">score</span> + <span className="text-amber-400">5</span><br/><br/>

              <span className="text-slate-500"># 3. ผลลัพธ์ที่ได้</span><br/>
              <span className="text-yellow-200">print</span>(<span className="text-blue-400">score</span>) <span className="text-slate-500"># Output: 15</span>
            </div>
          </div>
        </div>

        {/* Shorthand Operators Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            เครื่องหมายแบบย่อ (Shorthand)
          </h2>
          <p className="text-slate-600 mb-6">
            เพื่อความรวดเร็วในการเขียนโปรแกรม Python (และภาษาอื่นๆ) ได้ออกแบบเครื่องหมายแบบย่อ สำหรับอัปเดตค่าตัวแปรตัวเอง
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* += */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold font-mono text-emerald-500 bg-emerald-50 px-3 py-1 rounded-xl">+=</span>
                <span className="text-sm font-bold text-slate-400">เพิ่มค่า</span>
              </div>
              <code className="block w-full bg-slate-50 p-2 text-center rounded text-sm text-slate-600 mb-2 border border-slate-100">x += 5</code>
              <div className="text-xs text-slate-500 text-center">มีความหมายเหมือนกับ <br/><strong className="text-emerald-600 font-mono">x = x + 5</strong></div>
            </div>

            {/* -= */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold font-mono text-rose-500 bg-rose-50 px-3 py-1 rounded-xl">-=</span>
                <span className="text-sm font-bold text-slate-400">ลดค่า</span>
              </div>
              <code className="block w-full bg-slate-50 p-2 text-center rounded text-sm text-slate-600 mb-2 border border-slate-100">x -= 2</code>
              <div className="text-xs text-slate-500 text-center">มีความหมายเหมือนกับ <br/><strong className="text-rose-600 font-mono">x = x - 2</strong></div>
            </div>

            {/* *= */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold font-mono text-amber-500 bg-amber-50 px-3 py-1 rounded-xl">*=</span>
                <span className="text-sm font-bold text-slate-400">คูณเพิ่ม</span>
              </div>
              <code className="block w-full bg-slate-50 p-2 text-center rounded text-sm text-slate-600 mb-2 border border-slate-100">x *= 3</code>
              <div className="text-xs text-slate-500 text-center">มีความหมายเหมือนกับ <br/><strong className="text-amber-600 font-mono">x = x * 3</strong></div>
            </div>

            {/* /= */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-transform group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold font-mono text-purple-500 bg-purple-50 px-3 py-1 rounded-xl">/=</span>
                <span className="text-sm font-bold text-slate-400">หารออก</span>
              </div>
              <code className="block w-full bg-slate-50 p-2 text-center rounded text-sm text-slate-600 mb-2 border border-slate-100">x /= 2</code>
              <div className="text-xs text-slate-500 text-center">มีความหมายเหมือนกับ <br/><strong className="text-purple-600 font-mono">x = x / 2</strong></div>
            </div>
          </div>
        </div>

        {/* Interactive Simulator */}
        <AssignmentSimulator />

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />
        
      </main>
    </div>
  );
}