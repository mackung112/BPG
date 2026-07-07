import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  Type, 
  CheckCircle2, 
  XCircle,
  AlertOctagon,
  ShieldAlert,
  SpellCheck,
  Zap,
  Info,
  Award,
  RefreshCw,
  Trophy,
  History
} from 'lucide-react';

// ============================================================================
// 1. Variable Validator (Enhanced Real-time Engine)
// ============================================================================
const VariableValidator = () => {
  const [varName, setVarName] = useState('');
  const [history, setHistory] = useState([]);
  
  // Rules states
  const [hasValidStart, setHasValidStart] = useState(false);
  const [hasValidChars, setHasValidChars] = useState(false);
  const [isNotReserved, setIsNotReserved] = useState(true);
  const [isNotLengthy, setIsNotLengthy] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Reserved words list (Full Python 3)
  const reservedWords = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 
    'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 
    'try', 'while', 'with', 'yield'
  ];

  useEffect(() => {
    if (varName === '') {
      setHasValidStart(false);
      setHasValidChars(false);
      setIsNotReserved(true);
      setIsNotLengthy(true);
      setIsValid(false);
      setShowConfetti(false);
      return;
    }

    // 1. Check start
    const startRegex = /^[a-zA-Z_]/;
    const startValid = startRegex.test(varName);
    setHasValidStart(startValid);

    // 2. Check chars
    const charsRegex = /^[a-zA-Z0-9_]+$/;
    const charsValid = charsRegex.test(varName);
    setHasValidChars(charsValid);

    // 3. Check reserved words
    const reservedValid = !reservedWords.includes(varName);
    setIsNotReserved(reservedValid);

    // 4. Check length (Best practice: not too long, let's say <= 30)
    const lengthValid = varName.length <= 30;
    setIsNotLengthy(lengthValid);

    // Final Validation
    const allValid = startValid && charsValid && reservedValid && lengthValid;
    setIsValid(allValid);
    
    if (allValid && varName.length > 2) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [varName]);

  const saveToHistory = () => {
    if (varName === '') return;
    const newEntry = { name: varName, valid: isValid, time: new Date().toLocaleTimeString() };
    setHistory([newEntry, ...history].slice(0, 5)); // Keep last 5
    setVarName(''); // Reset after save
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveToHistory();
    }
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-bl-full blur-3xl -z-0 transition-transform duration-700 group-hover:scale-125"></div>
      
      <div className="relative z-10 text-center mb-10">
        <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <SpellCheck className="w-8 h-8 text-purple-400" />
          ระบบตรวจสอบชื่อตัวแปร (Variable Validator)
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto leading-loose text-lg">
          พิมพ์ชื่อตัวแปรที่คุณต้องการตั้งลงในกล่องด้านล่าง ระบบจะสแกนและตรวจสอบตามกฎของ Python แบบ Real-time (กด Enter เพื่อบันทึกลงประวัติ)
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input & Checklist Area */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="w-full relative">
            <input 
              type="text" 
              value={varName}
              onChange={(e) => setVarName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ลองพิมพ์ชื่อตัวแปรที่นี่..."
              className={`w-full bg-slate-950 border-2 rounded-2xl px-6 py-6 text-3xl font-mono text-center outline-none transition-all duration-300 ${
                varName === '' ? 'border-slate-700 text-white focus:border-purple-500 shadow-lg' 
                : isValid ? 'border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-emerald-950/20' 
                : 'border-rose-500 text-rose-400 shadow-[0_0_30px_rgba(244,63,114,0.3)] bg-rose-950/20'
              }`}
            />
            {varName !== '' && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isValid && showConfetti && <Sparkles />}
                {isValid ? <CheckCircle2 className="w-10 h-10 text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" /> : <XCircle className="w-10 h-10 text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,114,0.8)]" />}
              </div>
            )}
            
            {varName !== '' && (
              <div className="absolute left-1/2 -bottom-14 -translate-x-1/2 text-sm text-slate-500 bg-slate-800 px-4 py-1.5 rounded-full whitespace-nowrap">
                กด Enter เพื่อบันทึกลงประวัติ
              </div>
            )}
          </div>

          {/* Rules Checklist */}
          <div className="w-full bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4 mt-8 shadow-inner">
            
            {/* Rule 1 */}
            <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${varName === '' ? 'bg-slate-700 text-slate-500' : hasValidStart ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/50'}`}>
                {varName === '' ? '-' : hasValidStart ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div className={`text-base md:text-lg transition-colors ${varName === '' ? 'text-slate-300' : hasValidStart ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}`}>
                ต้องขึ้นต้นด้วย <strong>อักษรภาษาอังกฤษ</strong> หรือ <strong>ขีดล่าง (_)</strong> เท่านั้น
              </div>
            </div>

            {/* Rule 2 */}
            <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${varName === '' ? 'bg-slate-700 text-slate-500' : hasValidChars ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/50'}`}>
                {varName === '' ? '-' : hasValidChars ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div className={`text-base md:text-lg transition-colors ${varName === '' ? 'text-slate-300' : hasValidChars ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}`}>
                ห้ามเว้นวรรค และห้ามใช้สัญลักษณ์พิเศษ (ยกเว้น _)
              </div>
            </div>

            {/* Rule 3 */}
            <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${varName === '' ? 'bg-slate-700 text-slate-500' : isNotReserved ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/50'}`}>
                {varName === '' ? '-' : isNotReserved ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div className={`text-base md:text-lg transition-colors ${varName === '' ? 'text-slate-300' : isNotReserved ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}`}>
                ห้ามตั้งชื่อซ้ำกับ <strong>คำสงวน (Reserved Words)</strong>
              </div>
            </div>

          </div>
        </div>

        {/* History Panel */}
        <div className="lg:col-span-4 bg-slate-950 rounded-2xl border border-slate-700 p-6 flex flex-col h-full shadow-inner relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
            <History className="w-5 h-5 text-slate-400" />
            <h4 className="text-white font-bold text-lg">ประวัติการทดสอบ</h4>
          </div>
          
          <div className="flex-1 flex flex-col gap-3">
            {history.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 space-y-3">
                <Info className="w-10 h-10 opacity-50" />
                <p className="text-sm text-center">ยังไม่มีประวัติ<br/>ลองพิมพ์ชื่อแล้วกด Enter</p>
              </div>
            ) : (
              history.map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl flex items-center justify-between border ${item.valid ? 'bg-emerald-950/30 border-emerald-900/50' : 'bg-rose-950/30 border-rose-900/50'} animate-[slideInRight_0.3s_ease-out]`}>
                  <div className="flex flex-col">
                    <span className={`font-mono font-bold text-lg ${item.valid ? 'text-emerald-400' : 'text-rose-400 truncate max-w-[150px]'}`}>{item.name}</span>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <div>
                    {item.valid ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <XCircle className="w-6 h-6 text-rose-500" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// Mini helper for Sparkles
const Sparkles = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <div 
        key={i} 
        className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 1 + 0.5}s`,
          animationDelay: `${Math.random() * 0.5}s`
        }}
      ></div>
    ))}
  </div>
);


// ============================================================================
// 2. Reserved Words Quiz Game
// ============================================================================
const ReservedWordsQuiz = () => {
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, msg: string }
  
  // The quiz questions
  const quizData = [
    { target: "print", isReserved: false, explanation: "print เป็นเพียงฟังก์ชันมาตรฐาน (Built-in function) ไม่ใช่คำสงวน สามารถถูกเขียนทับได้ (แต่ไม่ควรทำ)" },
    { target: "if", isReserved: true, explanation: "if เป็นคำสงวนที่ใช้สร้างเงื่อนไข ห้ามนำมาตั้งเป็นตัวแปรเด็ดขาด" },
    { target: "True", isReserved: true, explanation: "True เป็นคำสงวนที่แสดงค่าความจริง (ต้องเขียนตัว T ตัวใหญ่เสมอ)" },
    { target: "true", isReserved: false, explanation: "true (ตัว t เล็ก) ไม่ใช่คำสงวนใน Python (Python เป็น Case-sensitive)" },
    { target: "for", isReserved: true, explanation: "for เป็นคำสงวนสำหรับการวนลูป" },
    { target: "Name", isReserved: false, explanation: "Name ไม่ใช่คำสงวน สามารถใช้ตั้งเป็นตัวแปรได้" },
  ];

  const handleAnswer = (userSaidReserved) => {
    if (feedback) return; // Prevent double clicking
    
    const actual = quizData[currentRound].isReserved;
    const isCorrect = userSaidReserved === actual;
    
    if (isCorrect) setScore(score + 1);
    
    setFeedback({
      isCorrect,
      msg: quizData[currentRound].explanation
    });

    setTimeout(() => {
      setFeedback(null);
      if (currentRound + 1 < quizData.length) {
        setCurrentRound(currentRound + 1);
      } else {
        setGameOver(true);
      }
    }, 2500);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentRound(0);
    setGameOver(false);
    setFeedback(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-16">
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-br-full blur-3xl -z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-400" /> Minigame: คำนี้... จองหรือยัง?
        </h4>
        <p className="text-slate-400 mb-8 text-center max-w-xl leading-loose">
          ทดสอบความแม่นยำ! คำที่ปรากฏขึ้นมาคือ <strong>"คำสงวน (Reserved Word)"</strong> ที่ห้ามนำมาตั้งชื่อตัวแปร หรือไม่?
        </p>

        {!gameOver ? (
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-700 rounded-2xl p-8 shadow-inner flex flex-col items-center relative min-h-[300px] justify-center">
            
            {/* Score & Round tracker */}
            <div className="absolute top-6 left-6 text-slate-400 font-bold">
              ข้อ {currentRound + 1} / {quizData.length}
            </div>
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-slate-800 px-4 py-1.5 rounded-full">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold">{score} คะแนน</span>
            </div>

            {/* The Target Word */}
            <div className="mt-8 mb-10 text-center">
              <div className={`text-6xl md:text-7xl font-mono font-extrabold tracking-wider transition-all duration-300 ${feedback ? (feedback.isCorrect ? 'text-emerald-400 scale-110' : 'text-rose-400 scale-90') : 'text-white'}`}>
                {quizData[currentRound].target}
              </div>
            </div>

            {/* Buttons / Feedback */}
            {feedback ? (
              <div className={`w-full p-5 rounded-xl border flex items-start gap-4 animate-[bounceIn_0.5s_ease-out] ${feedback.isCorrect ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/50 border-rose-500/50 text-rose-300'}`}>
                {feedback.isCorrect ? <CheckCircle2 className="w-8 h-8 shrink-0 mt-1 text-emerald-400" /> : <XCircle className="w-8 h-8 shrink-0 mt-1 text-rose-400" />}
                <div>
                  <h5 className="font-bold text-xl mb-1">{feedback.isCorrect ? 'ถูกต้อง!' : 'ผิดครับ!'}</h5>
                  <p className="leading-relaxed opacity-90">{feedback.msg}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-6 w-full justify-center">
                <button 
                  onClick={() => handleAnswer(true)}
                  className="flex-1 max-w-[200px] bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-all hover:-translate-y-1"
                >
                  ใช่ (ห้ามใช้)
                </button>
                <button 
                  onClick={() => handleAnswer(false)}
                  className="flex-1 max-w-[200px] bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-1"
                >
                  ไม่ใช่ (ตั้งได้)
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-2xl p-10 text-center shadow-xl animate-[fadeIn_1s_ease-out]">
            <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
            <h4 className="text-4xl font-bold text-white mb-4">สรุปผลคะแนน</h4>
            <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
              {score} / {quizData.length}
            </div>
            <p className="text-slate-300 text-lg mb-8 leading-loose">
              {score === quizData.length ? 'สุดยอด! คุณแม่นยำเรื่องคำสงวนมาก ไม่มีทางตั้งชื่อพลาดแน่นอน' :
               score >= quizData.length / 2 ? 'ทำได้ดี! แต่ยังมีสับสนอยู่บ้าง จำไว้ว่า IDE จะคอยเปลี่ยนสีช่วยเตือนคุณเสมอ' :
               'ต้องฝึกฝนเพิ่มเติมนะ! ลองทบทวนกฎอีกรอบ แล้วกลับมาเล่นใหม่'}
            </p>
            <button 
              onClick={resetGame}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 mx-auto shadow-lg transition-all hover:-translate-y-1"
            >
              <RefreshCw className="w-5 h-5" /> เล่นใหม่อีกครั้ง
            </button>
          </div>
        )}

      </div>
    </div>
  );
};


// ============================================================================
// 3. Main Page Component
// ============================================================================
const pyUnit3_2_NamingRules = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === '1122') {
      setIsUnlocked(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const teacherTaskContent = `# ให้นักเรียน สร้างตัวแปร ดังต่อไปนี้
#  1. จงประกาศตัวแปรชื่อ student_age เพื่อเก็บอายุของนักเรียนคนหนึ่ง โดยกำหนดให้อายุเริ่มต้นคือ 15 ปี

#  2. จงสร้างตัวแปรสำหรับเก็บชื่อและนามสกุลของอาจารย์ผู้สอน โดยใช้ชื่อตัวแปรว่า teacher_name และกำหนดค่าเริ่มต้นเป็นข้อความ "Somchai Deejaichan"

#  3. ในการคำนวณเกรด ต้องมีการใช้คะแนนเฉลี่ยสะสม (GPA) จงประกาศตัวแปรชื่อ current_gpa และกำหนดค่าเริ่มต้นเป็น 3.75 โดยเลือกประเภทข้อมูลให้เหมาะสม

#  4. จงสร้างตัวแปรประเภทตรรกศาสตร์ (Boolean) ชื่อ is_passed เพื่อเก็บสถานะการผ่านประเมิน โดยกำหนดค่าเริ่มต้นให้เป็น "จริง" (True)

#  5. จงประกาศตัวแปรแบบค่าคงที่ (Constant) เพื่อเก็บค่าของแรงโน้มถ่วงโลก (g) เท่ากับ 9.81 โดยใช้หลักการตั้งชื่อตัวแปรค่าคงที่ตามมาตรฐานของภาษาที่คุณถนัด

#  6. มีตัวแปร wallet_balance = 500 ต่อมาได้รับเงินเพิ่มอีก 150 บาท จงเขียนคำสั่งเพื่อปรับปรุง (Update) ค่าในตัวแปรเดิมให้ถูกต้องโดยใช้ตัวดำเนินการกำหนดค่าแบบย่อ (Assignment Operator)

#  7. จงเขียนโปรแกรมสร้างตัวแปร 2 ตัว ได้แก่ width = 10.5 และ length = 20.0 จากนั้นสร้างตัวแปรตัวที่ 3 ชื่อ rectangle_area เพื่อคำนวณและเก็บผลลัพธ์พื้นที่รูปสี่เหลี่ยม

#  8. กำหนดให้ item_price = 299 และ tax_rate = 0.07 จงสร้างตัวแปรชื่อ total_price เพื่อคำนวณราคาสินค้ารวมภาษีมูลค่าเพิ่ม

#  9. จงสร้างตัวแปรชื่อ counter เริ่มต้นที่ค่า 0 จากนั้นเขียนคำสั่งเพื่อเพิ่มค่า (Increment) ของตัวแปรนี้ขึ้นครั้งละ 1 เป็นจำนวน 3 ครั้งติดต่อกัน

#  10. กำหนดให้ a = 5 และ b = 10 จงเขียนคำสั่งสลับค่าระหว่างตัวแปรสองตัวนี้ เพื่อให้ผลลัพธ์สุดท้าย a มีค่าเป็น 10 และ b มีค่าเป็น 5 (ห้ามกำหนดค่าด้วยตัวเลขตรงๆ)`;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        

        {/* 3.2.1 Rules Details */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 mb-16">
           <h4 className="text-3xl font-bold text-slate-800 mb-10 flex items-center gap-4">
             <div className="bg-amber-100 text-amber-600 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
               <ShieldAlert className="w-7 h-7" />
             </div>
             หลักเกณฑ์และข้อห้ามในการตั้งชื่อ
           </h4>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             
             {/* DOs */}
             <div className="bg-emerald-50/50 rounded-3xl p-8 md:p-10 border-2 border-emerald-100 relative overflow-hidden group hover:border-emerald-300 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <CheckCircle2 className="w-32 h-32 text-emerald-500" />
               </div>
               <h5 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3 relative z-10">
                 <span className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">✓</span>
                 สิ่งที่ทำได้ (DO)
               </h5>
               <ul className="space-y-6 relative z-10">
                 <li className="flex gap-4">
                   <div className="bg-emerald-200 text-emerald-900 rounded-lg px-3 py-1 font-mono text-sm h-8 shrink-0 flex items-center justify-center shadow-sm">a-z, A-Z</div>
                   <p className="text-emerald-900 leading-relaxed text-lg">ใช้ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่หรือพิมพ์เล็ก (แต่หลักสากล PEP 8 แนะนำให้ใช้ <strong className="bg-white px-2 py-0.5 rounded text-emerald-700">พิมพ์เล็กทั้งหมด</strong>)</p>
                 </li>
                 <li className="flex gap-4">
                   <div className="bg-emerald-200 text-emerald-900 rounded-lg px-3 py-1 font-mono text-sm h-8 shrink-0 flex items-center justify-center shadow-sm">0-9</div>
                   <p className="text-emerald-900 leading-relaxed text-lg">ใช้ตัวเลขผสมในชื่อได้ <strong>แต่ห้ามอยู่ตัวแรกสุดเด็ดขาด</strong> (เช่น <code>name1</code> ทำได้ แต่ <code>1name</code> พัง)</p>
                 </li>
                 <li className="flex gap-4">
                   <div className="bg-emerald-200 text-emerald-900 rounded-lg px-3 py-1 font-mono text-sm h-8 shrink-0 flex items-center justify-center shadow-sm">_</div>
                   <p className="text-emerald-900 leading-relaxed text-lg">ใช้เครื่องหมายขีดล่าง (Underscore) เพื่อเชื่อมคำยาวๆ ให้อ่านง่าย เรียกว่าสไตล์ <strong className="italic">Snake Case</strong> เช่น <code>student_name</code></p>
                 </li>
               </ul>
             </div>

             {/* DON'Ts */}
             <div className="bg-rose-50/50 rounded-3xl p-8 md:p-10 border-2 border-rose-100 relative overflow-hidden group hover:border-rose-300 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <XCircle className="w-32 h-32 text-rose-500" />
               </div>
               <h5 className="text-2xl font-bold text-rose-800 mb-6 flex items-center gap-3 relative z-10">
                 <span className="bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">✕</span>
                 สิ่งที่ห้ามทำ (DON'T)
               </h5>
               <ul className="space-y-6 relative z-10">
                 <li className="flex gap-4">
                   <div className="bg-rose-200 text-rose-900 rounded-lg px-3 py-1 font-mono text-sm h-8 shrink-0 flex items-center justify-center shadow-sm line-through decoration-rose-500 decoration-2">1name</div>
                   <p className="text-rose-900 leading-relaxed text-lg"><strong>ห้าม</strong> ขึ้นต้นด้วยตัวเลขเด็ดขาด โปรแกรมจะสับสนว่านี่คือตัวเลขหรือข้อความ</p>
                 </li>
                 <li className="flex gap-4">
                   <div className="bg-rose-200 text-rose-900 rounded-lg px-3 py-1 font-mono text-sm h-8 shrink-0 flex items-center justify-center shadow-sm line-through decoration-rose-500 decoration-2">my name</div>
                   <p className="text-rose-900 leading-relaxed text-lg"><strong>ห้าม</strong> เว้นวรรค (Space) ในชื่อตัวแปร หากต้องการเว้นให้ใช้ <code>_</code> แทน</p>
                 </li>
                 <li className="flex gap-4">
                   <div className="bg-rose-200 text-rose-900 rounded-lg px-3 py-1 font-mono text-sm h-8 shrink-0 flex items-center justify-center shadow-sm line-through decoration-rose-500 decoration-2">@,#,-</div>
                   <p className="text-rose-900 leading-relaxed text-lg"><strong>ห้าม</strong> ใช้เครื่องหมายพิเศษอื่นๆ นอกเหนือจาก <code>_</code> (เช่น <code>-</code> ใช้ไม่ได้เพราะคอมฯ จะมองว่าเป็นเครื่องหมายลบ)</p>
                 </li>
               </ul>
             </div>

           </div>
        </div>

        {/* 3.2.2 Live Simulator */}
        <div className="mb-20">
          <VariableValidator />
        </div>

        {/* 3.2.3 Reserved Words Theory */}
        <div className="mb-12 mt-24">
           <div className="flex items-center gap-4 mb-8 pl-4 border-l-[6px] border-purple-500">
             <h3 className="text-4xl font-bold text-slate-800">
               คำสงวน (Reserved Words)
             </h3>
           </div>
           
           <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row gap-12 items-center">
             <div className="w-full lg:w-1/2">
               <p className="text-slate-600 leading-loose text-xl mb-8">
                 นอกจากกฎด้านบนแล้ว ภาษา Python ยังมี <strong>"คำสงวน"</strong> หรือคำที่ภาษา Python <em>หวงไว้ใช้สำหรับเป็นคำสั่งของระบบเท่านั้น</em> 
                 ดังนั้นเราจึง <strong className="text-rose-500 text-2xl mx-1 underline decoration-rose-300 decoration-4 underline-offset-4">ห้ามนำคำเหล่านี้มาตั้งเป็นชื่อตัวแปร</strong> โดยเด็ดขาด เพราะจะทำให้คอมพิวเตอร์สับสนว่าเราต้องการเก็บข้อมูล หรือกำลังสั่งงานมันอยู่กันแน่
               </p>
               <div className="bg-purple-50 border border-purple-200 p-8 rounded-3xl shadow-sm">
                 <strong className="text-purple-900 text-xl block mb-4 flex items-center gap-3"><AlertOctagon className="w-6 h-6 text-purple-600"/> ข้อสังเกตและตัวช่วย:</strong>
                 <p className="text-purple-800 leading-loose text-lg">
                   โปรแกรมเขียนโค้ด (IDE หรือ Text Editor) ส่วนใหญ่จะใจดี ช่วยทำ <strong>"สีไฮไลต์พิเศษ"</strong> ให้กับคำสงวนเหล่านี้ 
                   เพื่อเตือนเราด้วยสายตาว่า <em>"คำนี้มีเจ้าของแล้ว เปลี่ยนชื่ออื่นเถอะ!"</em>
                 </p>
               </div>
             </div>
             <div className="w-full lg:w-1/2">
               <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800 transform transition-transform hover:scale-[1.02] duration-500">
                  <h4 className="text-slate-400 mb-8 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-slate-700"></span> ตัวอย่างคำสงวนที่เจอบ่อย <span className="w-8 h-px bg-slate-700"></span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-center text-lg">
                    <div className="bg-slate-800/80 hover:bg-purple-500/20 text-purple-400 py-3 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-default">if</div>
                    <div className="bg-slate-800/80 hover:bg-purple-500/20 text-purple-400 py-3 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-default">else</div>
                    <div className="bg-slate-800/80 hover:bg-purple-500/20 text-purple-400 py-3 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-default">for</div>
                    <div className="bg-slate-800/80 hover:bg-purple-500/20 text-purple-400 py-3 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-default">while</div>
                    <div className="bg-slate-800/80 hover:bg-emerald-500/20 text-emerald-400 py-3 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-colors cursor-default font-bold">True</div>
                    <div className="bg-slate-800/80 hover:bg-rose-500/20 text-rose-400 py-3 rounded-xl border border-slate-700 hover:border-rose-500/50 transition-colors cursor-default font-bold">False</div>
                    <div className="bg-slate-800/80 hover:bg-purple-500/20 text-purple-400 py-3 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-default">and</div>
                    <div className="bg-slate-800/80 hover:bg-purple-500/20 text-purple-400 py-3 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-default">or</div>
                    <div className="bg-slate-800/80 hover:bg-purple-500/20 text-purple-400 py-3 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors cursor-default">not</div>
                  </div>
               </div>
             </div>
           </div>
        </div>

        {/* 3.2.4 Minigame Quiz */}
        <ReservedWordsQuiz />

        {/* Teacher Task */}
        {isUnlocked ? (
          <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้ 3.2)" taskText={teacherTaskContent} />
        ) : (
          <div className="relative mt-24 rounded-3xl p-[1px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl h-full flex flex-col items-center justify-center text-center shadow-xl">
              <div className="p-4 bg-purple-100 rounded-2xl text-purple-600 border border-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)] mb-6 animate-pulse">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">เข้าถึงภารกิจสำหรับนักเรียน (Instructor Task)</h3>
              <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
                กิจกรรมปฏิบัติการนี้ถูกจำกัดสิทธิ์เฉพาะในชั้นเรียน กรุณากรอกรหัสผ่าน 4 หลักที่ได้รับจากอาจารย์ผู้สอนเพื่อเข้าสู่แบบฝึกหัด
              </p>
              
              <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center items-center">
                <input 
                  type="password"
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPassError(false);
                  }}
                  placeholder="ป้อนรหัสผ่าน 4 หลัก"
                  className={`h-[42px] w-full sm:w-48 text-center border rounded-xl font-mono text-lg tracking-widest focus:outline-none transition-all ${
                    passError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-3 focus:ring-red-500/12 bg-red-50' 
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/12 bg-white'
                  }`}
                />
                <button
                  type="submit"
                  className="h-[42px] w-full sm:w-auto px-6 bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 rounded-xl font-semibold cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  ถอดรหัสผ่าน
                </button>
              </form>
              
              {passError && (
                <p className="text-red-500 font-bold text-xs mt-3 animate-bounce">
                  ⚠️ รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง
                </p>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default pyUnit3_2_NamingRules;
