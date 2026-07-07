import TeacherTask from '../../ui/TeacherTask';
import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  GitMerge,
  AlignLeft,
  Bug,
  ListOrdered,
  ArrowDownUp,
  ShieldAlert,
  TerminalSquare,
  BookOpen,
  Info,
  MoveDown
} from 'lucide-react';

/* ─────────────────────────────────────────────────
   SVG-based Flowchart — pixel-perfect center alignment
   ───────────────────────────────────────────────── */
const FlowchartSVG = ({ score, condition, hasPlayed }) => {
  /* ── layout constants ── */
  const W = 420;
  const H = 480;
  const cx = W / 2;            // center x = 210

  /* vertical positions */
  const startY  = 30;          // start pill center
  const diamondY = 140;        // diamond center
  const dR = 50;               // diamond half-diagonal

  const trueBoxCx  = 70;      // true-branch box center X
  const trueBoxCy  = 280;     // true-branch box center Y
  const trueBoxW   = 120;
  const trueBoxH   = 44;

  const joinY      = 360;     // join point Y
  const endY       = 430;     // end pill center

  /* ── colours ── */
  const trueColor  = hasPlayed && condition  ? '#10b981' : '#cbd5e1';
  const falseColor = hasPlayed && !condition ? '#f43f5e' : '#cbd5e1';
  const joinColor  = hasPlayed ? (condition ? '#10b981' : '#f43f5e') : '#cbd5e1';
  const trueGlow   = hasPlayed && condition  ? 'drop-shadow(0 0 6px rgba(16,185,129,0.7))' : 'none';
  const falseGlow  = hasPlayed && !condition ? 'drop-shadow(0 0 6px rgba(244,63,94,0.7))'  : 'none';

  const diamondFill   = hasPlayed ? (condition ? '#d1fae5' : '#ffe4e6') : '#ffffff';
  const diamondStroke = hasPlayed ? (condition ? '#34d399' : '#fb7185') : '#94a3b8';

  const trueBoxBorder = hasPlayed && condition ? '#10b981' : '#94a3b8';
  const trueBoxFill   = hasPlayed && condition ? '#ecfdf5' : '#ffffff';
  const trueBoxText   = hasPlayed && condition ? '#047857' : '#94a3b8';
  const trueBoxScale  = hasPlayed && condition ? 'scale(1.06)' : 'scale(1)';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[420px] mx-auto" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>

      {/* ── Start pill ── */}
      <rect x={cx - 90} y={startY - 16} width={180} height={32} rx={16}
            fill="#cbd5e1" />
      <text x={cx} y={startY + 1} textAnchor="middle" dominantBaseline="central"
            fill="#334155" fontSize={12} fontWeight={700}>
        รับค่า score = {score}
      </text>

      {/* ── Line: start → diamond ── */}
      <line x1={cx} y1={startY + 16} x2={cx} y2={diamondY - dR}
            stroke="#cbd5e1" strokeWidth={2} />

      {/* ── Diamond ── */}
      <polygon
        points={`${cx},${diamondY - dR} ${cx + dR},${diamondY} ${cx},${diamondY + dR} ${cx - dR},${diamondY}`}
        fill={diamondFill} stroke={diamondStroke} strokeWidth={3}
        style={{ transition: 'all 0.5s', filter: hasPlayed ? (condition ? trueGlow : falseGlow) : 'none' }}
      />
      <text x={cx} y={diamondY + 1} textAnchor="middle" dominantBaseline="central"
            fill="#334155" fontSize={13} fontWeight={700} fontFamily="ui-monospace, monospace">
        score &gt;= 50
      </text>

      {/* ── True branch: diamond-left → down → box ── */}
      {/* Horizontal: diamond left tip → trueBoxCx */}
      <line x1={cx - dR} y1={diamondY} x2={trueBoxCx} y2={diamondY}
            stroke={trueColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: trueGlow }} />
      {/* Label "True" */}
      <text x={(cx - dR + trueBoxCx) / 2} y={diamondY - 8} textAnchor="middle"
            fill={hasPlayed && condition ? '#059669' : '#64748b'}
            fontSize={11} fontWeight={700}
            style={{ transition: 'fill 0.5s' }}>
        True
      </text>
      {/* Vertical: down to box top */}
      <line x1={trueBoxCx} y1={diamondY} x2={trueBoxCx} y2={trueBoxCy - trueBoxH / 2}
            stroke={trueColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: trueGlow }} />

      {/* ── True action box ── */}
      <g style={{ transition: 'transform 0.5s', transform: trueBoxScale, transformOrigin: `${trueBoxCx}px ${trueBoxCy}px` }}>
        <rect x={trueBoxCx - trueBoxW / 2} y={trueBoxCy - trueBoxH / 2}
              width={trueBoxW} height={trueBoxH} rx={10}
              fill={trueBoxFill} stroke={trueBoxBorder} strokeWidth={2}
              style={{ transition: 'all 0.5s' }} />
        <text x={trueBoxCx} y={trueBoxCy + 1} textAnchor="middle" dominantBaseline="central"
              fill={trueBoxText} fontSize={11} fontWeight={700}
              style={{ transition: 'fill 0.5s' }}>
          พิมพ์ "สอบผ่าน!"
        </text>
      </g>

      {/* ── True branch: box → down → right to join ── */}
      {/* Vertical: box bottom → joinY */}
      <line x1={trueBoxCx} y1={trueBoxCy + trueBoxH / 2} x2={trueBoxCx} y2={joinY}
            stroke={trueColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: trueGlow }} />
      {/* Horizontal: trueBoxCx → cx (join) */}
      <line x1={trueBoxCx} y1={joinY} x2={cx} y2={joinY}
            stroke={trueColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: trueGlow }} />

      {/* ── False branch: diamond bottom → straight down to join ── */}
      <line x1={cx} y1={diamondY + dR} x2={cx} y2={joinY}
            stroke={falseColor} strokeWidth={2}
            style={{ transition: 'all 0.5s', filter: falseGlow }} />
      {/* Label "False" */}
      <text x={cx + 12} y={diamondY + dR + 18} textAnchor="start"
            fill={hasPlayed && !condition ? '#e11d48' : '#64748b'}
            fontSize={11} fontWeight={700}
            style={{ transition: 'fill 0.5s' }}>
        False
      </text>

      {/* ── Join dot ── */}
      <circle cx={cx} cy={joinY} r={4} fill={joinColor}
              style={{ transition: 'fill 0.5s' }} />

      {/* ── Line: join → end ── */}
      <line x1={cx} y1={joinY} x2={cx} y2={endY - 16}
            stroke={joinColor} strokeWidth={2}
            style={{ transition: 'all 0.5s' }} />

      {/* ── End pill ── */}
      <rect x={cx - 90} y={endY - 16} width={180} height={32} rx={16}
            fill="#cbd5e1" />
      <text x={cx} y={endY + 1} textAnchor="middle" dominantBaseline="central"
            fill="#334155" fontSize={12} fontWeight={700}>
        พิมพ์ "จบโปรแกรม"
      </text>
    </svg>
  );
};

/* ─────────────────────────────────────────────────
   4.10.1 — Simple If Simulator
   ───────────────────────────────────────────────── */
const SimpleIfSim = () => {
  const [score, setScore] = useState(75);
  const [hasPlayed, setHasPlayed] = useState(false);

  const condition = score >= 50;

  const runCode = () => setHasPlayed(true);
  const resetCode = () => setHasPlayed(false);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-bl-full blur-3xl z-0 pointer-events-none opacity-50" />

      {/* ── Code Editor Panel ── */}
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-emerald-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <GitMerge className="w-5 h-5" /> 4.10.1 โครงสร้างคำสั่ง if เชิงเดี่ยว
        </h4>

        <div className="bg-black/30 p-4 rounded-xl border border-slate-800/50 mb-4">
          <span className="text-blue-400">score</span> ={' '}
          <input
            type="number"
            value={score}
            onChange={(e) => { setScore(Number(e.target.value)); resetCode(); }}
            className="bg-slate-800 text-amber-400 w-20 px-2 py-1 rounded outline-none border border-slate-700 focus:border-emerald-500 transition-colors inline-block"
          />
        </div>

        <div className="mt-2 flex flex-col gap-1">
          <div className="text-pink-500">if <span className="text-blue-400">score</span> &gt;= <span className="text-amber-400">50</span>:</div>
          <div className={`ml-8 transition-all duration-300 ${hasPlayed ? (condition ? 'bg-emerald-900/40 outline outline-1 outline-emerald-500/50 rounded p-1' : 'opacity-30') : ''}`}>
            <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"สอบผ่าน!"</span>)
          </div>
          <div className="text-yellow-200 mt-2">print(<span className="text-emerald-400">"จบโปรแกรม"</span>)</div>
        </div>

        <div className="mt-8">
          <button
            onClick={runCode}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            <Play className="w-5 h-5" /> ทดสอบรันโค้ด
          </button>
        </div>
      </div>

      {/* ── Flowchart Panel (SVG) ── */}
      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
          Flowchart (ผังงานจำลอง)
        </h4>

        <div className="flex-1 flex items-center justify-center">
          <FlowchartSVG score={score} condition={condition} hasPlayed={hasPlayed} />
        </div>

        {/* Terminal Output */}
        {hasPlayed && (
          <div className="mt-8 bg-black rounded-xl p-4 font-mono text-emerald-400 shadow-inner text-sm animate-[fade-in_0.3s_ease-out]">
            <div className="text-slate-500 mb-2">$ python main.py</div>
            {condition && <div>สอบผ่าน!</div>}
            <div>จบโปรแกรม</div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   4.10.2 — Indentation Simulator
   ───────────────────────────────────────────────── */
const IndentationSim = () => {
  const [indent, setIndent] = useState(0);

  const getStatus = () => {
    if (indent === 0) return { error: true, msg: 'IndentationError: expected an indented block', type: 'error' };
    if (indent === 1) return { error: false, msg: 'โค้ดทำงานได้ แต่ผิดมาตรฐาน PEP8 (ควรใช้ 4 เคาะ)', type: 'warning' };
    return { error: false, msg: 'โค้ดสมบูรณ์ ทำงานได้ถูกต้องตามมาตรฐาน', type: 'success' };
  };

  const status = getStatus();

  return (
    <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl p-8 mb-16 relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative z-10">
        <h4 className="text-xl font-bold text-sky-400 mb-2 flex items-center gap-2"><AlignLeft className="w-5 h-5" /> 4.10.2 การเขียนบล็อกคำสั่ง (Indentation)</h4>
        <p className="text-slate-400 mb-8 text-sm">ในภาษา Python <strong>ห้ามใช้ปีกกา {'{}'}</strong> แต่จะใช้ <strong>การย่อหน้า (Indent)</strong> เพื่อบอกว่าคำสั่งไหนอยู่ในบล็อกของ if ลองปรับการย่อหน้าด้านล่างดู</p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 font-mono text-lg shadow-inner">
              <div className="text-pink-500">if <span className="text-blue-400">True</span>:</div>
              <div className="flex items-center mt-2">
                {indent === 1 && <div className="w-4 h-6 border-l border-b border-slate-600 border-dashed mr-1" />}
                {indent === 2 && <div className="w-8 h-6 border-l border-b border-slate-600 border-dashed mr-1" />}
                <div className={`transition-all duration-300 ${indent === 0 ? 'bg-rose-500/15 ring-1 ring-rose-500/40 pl-2 rounded' : ''}`}>
                  <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"ฉันอยู่ในบล็อก IF"</span>)
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setIndent(0)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${indent !== 0 ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-rose-500 text-white border-rose-500'}`}>0 เคาะ (ไม่ย่อหน้า)</button>
              <button onClick={() => setIndent(1)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${indent !== 1 ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-amber-500 text-white border-amber-500'}`}>2 เคาะ</button>
              <button onClick={() => setIndent(2)} className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${indent !== 2 ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-emerald-500 text-white border-emerald-500'}`}>4 เคาะ (มาตรฐาน)</button>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className={`h-full p-6 rounded-2xl border-2 flex flex-col justify-center items-center text-center transition-all duration-500 ${status.type === 'error' ? 'bg-rose-950/50 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : status.type === 'warning' ? 'bg-amber-950/50 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-emerald-950/50 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}>
              {status.type === 'error' && <Bug className="w-12 h-12 text-rose-500 mb-4 animate-pulse" />}
              {status.type === 'warning' && <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />}
              {status.type === 'success' && <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />}

              <h5 className={`font-bold font-mono text-lg mb-2 ${status.type === 'error' ? 'text-rose-400' : status.type === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                {status.error ? 'รันโค้ดพัง! (Syntax Error)' : 'รันโค้ดผ่าน!'}
              </h5>
              <p className="text-slate-300 text-sm leading-relaxed font-mono bg-black/40 px-4 py-2 rounded-lg">
                {status.msg}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   4.10.3 — Elif Simulator
   ───────────────────────────────────────────────── */
const ElifSimulator = () => {
  const [score, setScore] = useState(75);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState('');

  const runCode = () => {
    setHasPlayed(false);
    setActiveStep(0);
    setResult('');
    
    setTimeout(() => setActiveStep(1), 500); 
    
    setTimeout(() => {
      if (score >= 80) {
        setResult('ได้เกรด A');
        setHasPlayed(true);
      } else {
        setActiveStep(2); 
        setTimeout(() => {
          if (score >= 70) {
            setResult('ได้เกรด B');
            setHasPlayed(true);
          } else {
            setActiveStep(3); 
            setTimeout(() => {
              if (score >= 60) {
                setResult('ได้เกรด C');
                setHasPlayed(true);
              } else {
                setActiveStep(4); 
                setHasPlayed(true);
              }
            }, 1000);
          }
        }, 1000);
      }
    }, 1000);
  };

  const resetCode = () => {
    setHasPlayed(false);
    setActiveStep(0);
    setResult('');
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-sky-100/50 rounded-br-full blur-3xl z-0 pointer-events-none opacity-50"></div>
      
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-sky-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <ListOrdered className="w-5 h-5" /> 4.10.3 โครงสร้างคำสั่ง elif 
        </h4>
        
        <div>
          <span className="text-blue-400">score</span> = <input 
            type="number" 
            value={score}
            onChange={(e) => {setScore(Number(e.target.value)); resetCode();}}
            className="bg-slate-800 text-amber-400 w-20 px-2 py-1 rounded outline-none border border-slate-700 focus:border-sky-500 transition-colors inline-block"
          />
        </div>
        
        <div className="mt-4 flex flex-col gap-1 relative">
          
          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 1 ? 'bg-slate-700 outline outline-1 outline-slate-500' : ''}`}>
             <span className="text-pink-500">if</span> <span className="text-blue-400">score</span> &gt;= <span className="text-amber-400">80</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 1 || (hasPlayed && score >= 80)) && score >= 80 ? 'bg-emerald-900/40 outline outline-1 outline-emerald-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"เกรด A"</span>)
             </div>
          </div>
          
          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 2 ? 'bg-slate-700 outline outline-1 outline-slate-500' : (activeStep > 2 || (hasPlayed && score >= 70 && score < 80)) ? '' : 'opacity-50'}`}>
             <span className="text-pink-500">elif</span> <span className="text-blue-400">score</span> &gt;= <span className="text-amber-400">70</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 2 || (hasPlayed && score >= 70 && score < 80)) && score >= 70 && score < 80 ? 'bg-emerald-900/40 outline outline-1 outline-emerald-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"เกรด B"</span>)
             </div>
          </div>

          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 3 ? 'bg-slate-700 outline outline-1 outline-slate-500' : (activeStep > 3 || (hasPlayed && score >= 60 && score < 70)) ? '' : 'opacity-50'}`}>
             <span className="text-pink-500">elif</span> <span className="text-blue-400">score</span> &gt;= <span className="text-amber-400">60</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 3 || (hasPlayed && score >= 60 && score < 70)) && score >= 60 && score < 70 ? 'bg-emerald-900/40 outline outline-1 outline-emerald-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-emerald-400">"เกรด C"</span>)
             </div>
          </div>

        </div>

        <div className="mt-8 pt-4 flex gap-4">
           <button 
             onClick={runCode}
             disabled={activeStep > 0 && !hasPlayed}
             className="flex-1 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-sky-500/20"
           >
             <Play className="w-5 h-5" /> รันโค้ดแบบทีละขั้น
           </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
           ลำดับการตรวจสอบ
        </h4>

        <div className="flex-1 flex flex-col gap-4">
          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 1 ? 'border-sky-400 shadow-md ring-2 ring-sky-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg">Check 1</div>
             <div className="flex-1 font-mono font-bold">{score} &gt;= 80</div>
             {activeStep > 1 || (hasPlayed && score >= 80) ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${score >= 80 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                 {score >= 80 ? 'True' : 'False'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 2 ? 'border-sky-400 shadow-md ring-2 ring-sky-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg">Check 2</div>
             <div className="flex-1 font-mono font-bold">{score} &gt;= 70</div>
             {activeStep > 2 || (hasPlayed && score >= 70 && score < 80) ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${score >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                 {score >= 70 ? 'True' : 'False'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 3 ? 'border-sky-400 shadow-md ring-2 ring-sky-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg">Check 3</div>
             <div className="flex-1 font-mono font-bold">{score} &gt;= 60</div>
             {activeStep > 3 || (hasPlayed && score >= 60 && score < 70) ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${score >= 60 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                 {score >= 60 ? 'True' : 'False'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className="mt-auto bg-black rounded-xl p-6 min-h-[120px] font-mono text-emerald-400 shadow-inner flex flex-col justify-end">
             <div className="text-slate-500 text-sm mb-2 mt-auto">$ python grader.py</div>
             <div>{result}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   4.10.4 — Priority / Short-circuit Simulator
   ───────────────────────────────────────────────── */
const PrioritySim = () => {
  const [isWrongOrder, setIsWrongOrder] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [result, setResult] = useState('');
  
  const score = 85;

  const runCode = () => {
    if (isWrongOrder) {
      if (score >= 50) setResult('เกรด D (ซึ่งผิด!)');
      else if (score >= 80) setResult('เกรด A');
    } else {
      if (score >= 80) setResult('เกรด A');
      else if (score >= 50) setResult('เกรด D');
    }
    setHasPlayed(true);
  };

  return (
    <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl p-8 mb-16 relative overflow-hidden text-white flex flex-col lg:flex-row gap-8">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col">
        <h4 className="text-xl font-bold text-rose-400 mb-2 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> 4.10.4 การจัดลำดับความสำคัญ (Priority Order)</h4>
        <p className="text-slate-400 mb-6 text-sm">การทำงานของ if-elif จะหยุดทันทีที่เจอเงื่อนไขที่เป็น <strong>True อันแรก (Short-circuit)</strong> ดังนั้น <strong>ต้องเอาเงื่อนไขที่แคบกว่า/ยากกว่า ขึ้นก่อนเสมอ</strong></p>
        
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col gap-3 relative">
           
           <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-700">
             <span className="text-blue-400 font-mono">score</span>
             <span className="text-amber-400 font-mono font-bold bg-black px-4 py-1 rounded">85</span>
           </div>

           <div className="relative mt-2">
             <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-slate-600 border-l border-dashed z-0"></div>
             
             {isWrongOrder ? (
               // WRONG ORDER
               <div className="flex flex-col gap-2 relative z-10 font-mono bg-rose-950/30 p-2 rounded-xl border border-rose-900/50">
                 <div className="bg-slate-900 p-3 rounded-lg border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                   <span className="text-pink-500">if</span> score &gt;= <span className="text-amber-400">50</span>: <span className="text-slate-500 text-xs ml-2"># เงื่อนไขกว้างเกินไป</span>
                   <div className="text-yellow-200 mt-1 ml-4">print(<span className="text-emerald-400">"เกรด D"</span>)</div>
                 </div>
                 <div className="flex justify-center text-rose-500"><MoveDown className="w-4 h-4" /></div>
                 <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 opacity-50">
                   <span className="text-pink-500">elif</span> score &gt;= <span className="text-amber-400">80</span>: <span className="text-slate-500 text-xs ml-2"># ไม่มีวันมาถึง!</span>
                   <div className="text-yellow-200 mt-1 ml-4">print(<span className="text-emerald-400">"เกรด A"</span>)</div>
                 </div>
               </div>
             ) : (
               // CORRECT ORDER
               <div className="flex flex-col gap-2 relative z-10 font-mono bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/50">
                 <div className="bg-slate-900 p-3 rounded-lg border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                   <span className="text-pink-500">if</span> score &gt;= <span className="text-amber-400">80</span>: <span className="text-slate-500 text-xs ml-2"># เงื่อนไขแคบสุดขึ้นก่อน</span>
                   <div className="text-yellow-200 mt-1 ml-4">print(<span className="text-emerald-400">"เกรด A"</span>)</div>
                 </div>
                 <div className="flex justify-center text-emerald-500"><MoveDown className="w-4 h-4" /></div>
                 <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                   <span className="text-pink-500">elif</span> score &gt;= <span className="text-amber-400">50</span>:
                   <div className="text-yellow-200 mt-1 ml-4">print(<span className="text-emerald-400">"เกรด D"</span>)</div>
                 </div>
               </div>
             )}
           </div>

           <button 
             onClick={() => { setIsWrongOrder(!isWrongOrder); setHasPlayed(false); setResult(''); }}
             className="mt-2 bg-slate-700 hover:bg-slate-600 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
           >
             <ArrowDownUp className="w-4 h-4" /> สลับลำดับบล็อกโค้ด
           </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center items-center">
         <button 
           onClick={runCode}
           className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-6 transition-all active:scale-95 shadow-lg ${isWrongOrder ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'}`}
         >
           <Play className="w-5 h-5" /> รันโค้ดด้วยคะแนน 85
         </button>
         
         <div className="w-full bg-black rounded-xl p-6 font-mono border-t-4 border-slate-700 min-h-[140px] flex flex-col">
            <span className="text-slate-500 text-sm mb-2">Output:</span>
            {hasPlayed && (
              <div className={`text-2xl font-bold animate-[fade-in_0.3s_ease-out] ${isWrongOrder ? 'text-rose-400' : 'text-emerald-400'}`}>
                {result}
              </div>
            )}
            {hasPlayed && isWrongOrder && (
              <div className="mt-4 text-sm text-rose-300/80 leading-snug">
                🚨 ผิดพลาด! แม้ว่า 85 จะมากกว่า 50 แต่โปรแกรมทำงานบรรทัด `score &gt;= 50` ก่อน ซึ่งเป็น True เลยออกจากการเช็คไปเลย!
              </div>
            )}
            {hasPlayed && !isWrongOrder && (
              <div className="mt-4 text-sm text-emerald-300/80 leading-snug">
                ✅ ถูกต้อง! โปรแกรมเช็ค `score &gt;= 80` เป็น True จึงได้เกรด A และไม่ไปเช็คบรรทัดอื่นต่อ
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   4.10.6 — Else Simulator
   ───────────────────────────────────────────────── */
const ElseSimulator = () => {
  const [role, setRole] = useState('guest');
  const [hasPlayed, setHasPlayed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState('');

  const runCode = () => {
    setHasPlayed(false);
    setActiveStep(0);
    setResult('');
    
    setTimeout(() => setActiveStep(1), 500); 
    
    setTimeout(() => {
      if (role === 'admin') {
        setResult('ยินดีต้อนรับ ผู้ดูแลระบบ (Full Access)');
        setHasPlayed(true);
      } else {
        setActiveStep(2); 
        setTimeout(() => {
          if (role === 'editor') {
            setResult('ยินดีต้อนรับ ผู้แก้ไข (Edit Access)');
            setHasPlayed(true);
          } else {
            setActiveStep(3); 
            setTimeout(() => {
              setResult('เข้าสู่ระบบในฐานะ บุคคลทั่วไป (Read Only)');
              setHasPlayed(true);
            }, 1000);
          }
        }, 1000);
      }
    }, 1000);
  };

  const resetCode = () => {
    setHasPlayed(false);
    setActiveStep(0);
    setResult('');
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row mb-16 relative">
      <div className="bg-slate-900 w-full lg:w-1/2 p-8 flex flex-col relative z-10 text-slate-300 font-mono text-lg leading-relaxed border-r border-slate-800">
        <h4 className="font-sans font-bold text-rose-400 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
          <TerminalSquare className="w-5 h-5" /> 4.10.6 จำลองระบบรักษาความปลอดภัย (Else-fallback)
        </h4>
        
        <p className="font-sans text-slate-400 text-sm mb-6">
          ทดลองเลือกบทบาท (Role) ที่แปลกประหลาด เช่น hacker แล้วดูว่า else จะดักจับการบุกรุกนี้ได้อย่างไร
        </p>
        
        <div className="bg-slate-800 p-4 rounded-xl mb-4">
          <span className="text-blue-400">role</span> = <select 
            value={role}
            onChange={(e) => {setRole(e.target.value); resetCode();}}
            className="bg-slate-900 text-emerald-400 px-2 py-1 rounded outline-none border border-slate-700 focus:border-rose-500 transition-colors inline-block"
          >
             <option value="admin">"admin"</option>
             <option value="editor">"editor"</option>
             <option value="guest">"guest"</option>
             <option value="hacker">"hacker"</option>
             <option value="user123">"user123"</option>
          </select>
        </div>
        
        <div className="mt-2 flex flex-col gap-1 relative">
          
          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 1 ? 'bg-slate-700 outline outline-1 outline-slate-500' : ''}`}>
             <span className="text-pink-500">if</span> <span className="text-blue-400">role</span> == <span className="text-emerald-400">"admin"</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 1 || (hasPlayed && role === 'admin')) && role === 'admin' ? 'bg-rose-900/40 outline outline-1 outline-rose-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-amber-300">"ยินดีต้อนรับ Admin"</span>)
             </div>
          </div>
          
          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 2 ? 'bg-slate-700 outline outline-1 outline-slate-500' : (activeStep > 2 || (hasPlayed && role === 'editor')) ? '' : 'opacity-50'}`}>
             <span className="text-pink-500">elif</span> <span className="text-blue-400">role</span> == <span className="text-emerald-400">"editor"</span>:
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 2 || (hasPlayed && role === 'editor')) && role === 'editor' ? 'bg-rose-900/40 outline outline-1 outline-rose-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-amber-300">"ยินดีต้อนรับ Editor"</span>)
             </div>
          </div>

          <div className={`transition-all duration-300 rounded p-1 ${activeStep === 3 ? 'bg-rose-950/60 outline outline-1 outline-rose-500' : (activeStep > 3 || (hasPlayed && role !== 'admin' && role !== 'editor')) ? '' : 'opacity-50'}`}>
             <span className="text-pink-500">else</span>: <span className="text-slate-500 text-sm ml-2"># ทุกเคสที่เหลือ จะตกมาที่นี่หมด!</span>
             <div className={`ml-8 transition-all duration-300 ${(activeStep > 3 || (hasPlayed && role !== 'admin' && role !== 'editor')) && role !== 'admin' && role !== 'editor' ? 'bg-rose-900/40 outline outline-1 outline-rose-500/50 rounded p-1 inline-block mt-1' : 'opacity-30'}`}>
               <span className="text-yellow-200">print</span>(<span className="text-amber-300">"เข้าสู่ระบบในฐานะ ผู้เยี่ยมชม"</span>)
             </div>
          </div>

        </div>

        <div className="mt-8 pt-4 flex gap-4">
           <button 
             onClick={runCode}
             disabled={activeStep > 0 && !hasPlayed}
             className="flex-1 bg-rose-500 hover:bg-rose-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-rose-500/20"
           >
             <Play className="w-5 h-5" /> ตรวจสอบสิทธิ์ Access
           </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-slate-50 p-8 flex flex-col relative z-10">
        <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
           การตัดสินใจของระบบ (Decision Log)
        </h4>

        <div className="flex-1 flex flex-col gap-4">
          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 1 ? 'border-rose-400 shadow-md ring-2 ring-rose-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg w-16 text-center">if</div>
             <div className="flex-1 font-mono font-bold text-sm">role == "admin"</div>
             {activeStep > 1 || (hasPlayed && role === 'admin') ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${role === 'admin' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                 {role === 'admin' ? 'Match' : 'No'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className={`flex items-center gap-4 bg-white p-4 rounded-2xl border ${activeStep === 2 ? 'border-rose-400 shadow-md ring-2 ring-rose-100' : 'border-slate-200 opacity-80'} transition-all`}>
             <div className="bg-slate-100 p-2 text-xs font-bold text-slate-500 rounded-lg w-16 text-center">elif</div>
             <div className="flex-1 font-mono font-bold text-sm">role == "editor"</div>
             {activeStep > 2 || (hasPlayed && role === 'editor' && role !== 'admin') ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${role === 'editor' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                 {role === 'editor' ? 'Match' : 'No'}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className={`flex items-center gap-4 bg-rose-50 p-4 rounded-2xl border ${activeStep === 3 ? 'border-rose-400 shadow-md ring-2 ring-rose-100' : 'border-rose-200 opacity-90'} transition-all`}>
             <div className="bg-rose-200 p-2 text-xs font-bold text-rose-700 rounded-lg w-16 text-center">else</div>
             <div className="flex-1 font-bold text-sm text-rose-700">(ไม่มีเงื่อนไข ทำงานเมื่อข้อบนเป็นเท็จทั้งหมด)</div>
             {activeStep > 3 || (hasPlayed && role !== 'admin' && role !== 'editor') ? (
               <div className={`px-3 py-1 text-sm rounded-lg font-bold ${role !== 'admin' && role !== 'editor' ? 'bg-rose-500 text-white shadow-lg' : 'bg-transparent text-transparent'}`}>
                 {role !== 'admin' && role !== 'editor' ? 'Triggered!' : ''}
               </div>
             ) : (
               <div className="w-12 text-center text-slate-300">-</div>
             )}
          </div>

          <div className="mt-auto bg-slate-800 rounded-xl p-6 min-h-[120px] font-mono text-white shadow-inner flex flex-col justify-end border-t-4 border-rose-500">
             <div className="text-slate-400 text-sm mb-2 mt-auto">&gt; Server Response:</div>
             <div className={role === 'hacker' ? 'text-rose-400 font-bold' : 'text-emerald-400'}>{result}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────
   Main Export
   ───────────────────────────────────────────────── */
export default function pyUnit4_10_IfCondition() {
  const combinedTeacherTask = `โจทย์ปฏิบัติการเขียนโปรแกรมควบคุมทิศทางและโครงสร้างทางเลือก (if-elif-else / loop / function):

1. ระบบคำนวณ BMI: รับค่าน้ำหนัก (กก.) และส่วนสูง (ซม.) มาคำนวณหาค่าดัชนีมวลกาย (BMI) โดยแสดงผลลัพธ์เป็นทศนิยม 2 ตำแหน่ง พร้อมระบุเกณฑ์สุขภาพตามมาตรฐานสากล

2. คำนวณดอกเบี้ยทบต้น: รับยอดเงินต้น อัตราดอกเบี้ยต่อปี และจำนวนปี จากนั้นใช้ลูปคำนวณและแสดงตารางสรุปยอดเงินสะสมในบัญชีเมื่อสิ้นสุดของแต่ละปีจนครบกำหนด

3. คิดเงินค่าน้ำมันพร้อมส่วนลด: จำลองระบบปั๊มน้ำมันให้เลือกประเภท (95, 91, ดีเซล) และระบุจำนวนลิตร หากยอดรวมเกิน 1,500 บาท ลด 5% เกิน 2,500 บาท ลด 8% พร้อมแสดงยอดสุทธิ

4. แปลง พ.ศ. และหาปีอธิกสุรทิน: รับปี พ.ศ. แล้วแปลงเป็น ค.ศ. จากนั้นนำปี ค.ศ. ไปคำนวณตรวจสอบว่าเป็นปีอธิกสุรทิน (ปีที่เดือนกุมภาพันธ์มี 29 วัน) หรือไม่

5. ตรวจพาลินโดรมและนับสระ: รับข้อความภาษาอังกฤษ 1 ประโยค ตรวจสอบว่าเป็นคำพาลินโดรมหรือไม่ (อ่านย้อนกลับแล้วได้คำเดิม โดยไม่สนเว้นวรรคและตัวพิมพ์) พร้อมนับจำนวนสระทั้งหมด

6. เข้ารหัสอักษร Caesar Cipher: โปรแกรมรับข้อความภาษาอังกฤษและตัวเลข "ค่าขยับตำแหน่ง" โดยมีเมนูให้ผู้ใช้เลือกว่าจะทำการเข้ารหัส หรือถอดรหัสข้อความตามค่าที่กำหนด

7. เช็คความปลอดภัยรหัสผ่าน: ตรวจสอบรหัสผ่านใหม่ของผู้ใช้ว่าผ่านเกณฑ์ 5 ข้อหรือไม่: ยาวเกิน 8 ตัว, มีพิมพ์ใหญ่, มีพิมพ์เล็ก, มีตัวเลข, มีอักขระพิเศษ หากไม่ผ่านให้แจ้งเตือนข้อที่ผิด

8. จัดการคะแนนและตัดเกรด: รับชื่อและคะแนนนักเรียนไปเรื่อยๆ จนกว่าจะพิมพ์ "exit" จากนั้นให้คำนวณหาคะแนนสูงสุด ต่ำสุด ค่าเฉลี่ย และพิมพ์รายชื่อทุกคนพร้อมเกรด (A, B, C, D, F)

9. วิเคราะห์ความถี่คำศัพท์: รับบทความภาษาอังกฤษแบบย่อหน้ายาว นำมาตัดเครื่องหมายวรรคตอนและช่องว่าง แล้วนับจำนวนคำซ้ำ พร้อมแสดงผลลัพธ์เรียงจากคำที่ปรากฏบ่อยที่สุดลงมา

10. ตู้กดน้ำและคำนวณเงินทอน: จำลองตู้กดน้ำมี 4 เมนู รับเงินจากผู้ใช้ หากเงินพอให้คำนวณเงินทอน โดยจ่ายออกเป็นเหรียญ 10, 5, 2, 1 บาท โดยใช้จำนวนเหรียญรวมกันน้อยที่สุด

11. เครื่องคิดเลขเมทริกซ์: รับค่าตัวเลขเพื่อสร้างเมทริกซ์ขนาด 3x3 จำนวน 2 ชุด จากนั้นแสดงผลลัพธ์ที่ได้จากการนำเมทริกซ์ทั้งสองมาบวกกัน และผลลัพธ์จากการคูณกันตามหลักคณิตศาสตร์

12. ระบบจองที่นั่งโรงหนัง: จำลองผังที่นั่งขนาด 5x5 (แถว A-E, เบอร์ 1-5) มีเมนูแสดงผังที่นั่งว่าง/เต็ม รับคำสั่งจองที่นั่งจากผู้ใช้ หากที่นั่งว่างให้เปลี่ยนสถานะ หากเต็มให้แจ้งเตือน

13. โปรแกรม To-Do List: ระบบบันทึกงานประจำวัน มีเมนูหลัก 4 คำสั่ง ได้แก่ เพิ่มรายการงานใหม่, แสดงงานทั้งหมดพร้อมสถานะ, เปลี่ยนสถานะงานเป็นเสร็จสิ้น และลบรายการงาน

14. เกมทายคำศัพท์ภาษาอังกฤษ: กำหนดคำศัพท์และความหมายไว้ 10 คำ สุ่มความหมายขึ้นมาให้ผู้ใช้พิมพ์ทายคำศัพท์ภาษาอังกฤษ เล่นทั้งหมด 5 รอบแล้วรวมคะแนนสรุปตอนท้ายเกม

15. คำนวณค่าจอดรถอัจฉริยะ: รับเวลาเข้า-ออกหน่วยชั่วโมงและนาที เงื่อนไข: ชม.แรกฟรี, ชม.ที่ 2-3 คิดชม.ละ 20 บาท, ชม.ที่ 4 ขึ้นไปคิดชม.ละ 40 บาท (เศษนาทีตั้งแต่ 15 นาทีปัดเป็น 1 ชม.)

16. ค้นหาและแทนที่คำในไฟล์: เปิดอ่านข้อความจากไฟล์ .txt จริง รับคำค้นหาและคำที่ต้องการแทนที่จากผู้ใช้ บันทึกผลลัพธ์เป็นไฟล์ใหม่ พร้อมแจ้งจำนวนจุดที่มีการแก้ไขทั้งหมด

17. ตรวจเลขบัตรประชาชน: รับรหัสตัวเลข 13 หลัก นำ 12 หลักแรกมาคำนวณด้วยสูตรคูณน้ำหนักตำแหน่งเพื่อหาเลข Check Digit แล้วตรวจสอบว่าตรงกับหลักที่ 13 ที่กรอกมาหรือไม่

18. จำลองตู้ ATM: ตั้งยอดเงินเริ่มต้น 50,000 บาท มีเมนูให้เลือก ดูยอดเงิน, ฝากเงิน, ถอนเงิน (ถอนห้ามเกินยอดที่มีและห้ามเกิน 20,000 บาทต่อครั้ง) ทำงานวนลูปจนกว่าจะสั่งออกจากระบบ

19. สุ่มเลขและตรวจลอตเตอรี่: โปรแกรมสุ่มเลข 6 หลักเป็นรางวัลที่ 1 แล้วรับเลขจากผู้ใช้เพื่อตรวจสอบว่า ถูกรางวัลที่ 1, รางวัลข้างเคียง หรือรางวัลเลขท้าย 2 ตัว หรือไม่

20. แปลงหน่วยอุณหภูมิ: รับค่าอุณหภูมิและให้เลือกหน่วยต้นทางกับปลายทาง (Celsius, Fahrenheit, Kelvin) จากนั้นคำนวณแปลงค่าตามสูตรวิทยาศาสตร์แล้วแสดงผลลัพธ์`;

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-emerald-600 selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-100/60 blur-[120px]" />
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sky-100/60 blur-[120px]" />
        <div className="absolute top-[70%] left-[10%] w-[500px] h-[500px] rounded-full bg-rose-100/60 blur-[120px]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-4xl font-black mb-4 tracking-tight pb-2 leading-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-sky-600 to-rose-600">
            โครงสร้างควบคุมแบบมีเงื่อนไข (if, elif, else)
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            การเขียนโปรแกรมควบคุมทิศทางให้คอมพิวเตอร์เลือกตัดสินใจทำงานตามเงื่อนไขที่กำหนด 
            โดยใช้คำสั่ง <strong>if</strong> (ทางเลือกหลัก), <strong>elif</strong> (ทางเลือกเพิ่มเติม), และ <strong>else</strong> (ทางออกสุดท้าย)
          </p>
        </div>

        {/* Section 1: if Condition */}
        <div className="mb-12 border-b border-slate-200 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
              <GitMerge className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-800">4.10.1 โครงสร้างคำสั่ง if เชิงเดี่ยว</h4>
              <p className="text-slate-500 text-sm">ตรวจสอบเงื่อนไขหลัก ถ้าเป็นจริงจะทำงานในบล็อก</p>
            </div>
          </div>
          <SimpleIfSim />
          <IndentationSim />
        </div>

        {/* Section 2: elif Condition */}
        <div className="mb-12 border-b border-slate-200 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-sky-100 p-2 rounded-xl text-sky-600">
              <ListOrdered className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-800">4.10.3 โครงสร้างคำสั่ง elif สำหรับหลายเงื่อนไข</h4>
              <p className="text-slate-500 text-sm">เพิ่มเงื่อนไขทางเลือกเมื่อเงื่อนไขแรกเป็นเท็จ โดยโปรแกรมจะเช็คตามลำดับและหยุดที่เงื่อนไขจริงแรก</p>
            </div>
          </div>
          <ElifSimulator />
          <PrioritySim />
        </div>

        {/* Section 3: else Condition */}
        <div className="mb-12 border-b border-slate-200 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-rose-100 p-2 rounded-xl text-rose-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-black text-slate-800">4.10.5 โครงสร้างคำสั่ง else ทางออกสุดท้าย</h4>
              <p className="text-slate-500 text-sm">การดักจับกรณีที่เหลือทั้งหมดเมื่อเงื่อนไขก่อนหน้าเป็นเท็จทั้งหมด</p>
            </div>
          </div>

          {/* Theory Card for Else */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl mb-12">
            <h4 className="text-2xl font-black text-rose-600 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-rose-500" />
              ทางออกสุดท้ายด้วย else
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-6">
                <div>
                  <h5 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <BookOpen className="text-rose-500 w-5 h-5" /> 4.10.5.1 ความหมายและกฎของ else
                  </h5>
                  <p className="text-slate-600 leading-relaxed text-base">
                    <code className="bg-rose-50 text-rose-700 px-2 py-1 rounded font-bold">else</code> เปรียบเสมือนตะกร้าใบใหญ่ที่รองรับ <strong>"ทุกสิ่งทุกอย่างที่เหลือ"</strong> หากเงื่อนไขใน <code className="bg-slate-100 px-1 rounded">if</code> หรือ <code className="bg-slate-100 px-1 rounded">elif</code> ด้านบนไม่เป็นความจริงเลย โปรแกรมจะตกลงมาทำงานที่บล็อกของ <code className="bg-slate-100 px-1 rounded">else</code> อัตโนมัติ
                  </p>
                  <div className="mt-4 bg-rose-50 p-4 rounded-xl text-rose-800 text-sm flex items-start gap-3 border border-rose-100">
                    <Info className="w-5 h-5 text-rose-600 shrink-0" />
                    <div>
                      <strong className="block mb-1 font-bold">กฎเหล็กของ else:</strong>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>ห้ามใส่เงื่อนไขต่อท้าย else (เขียนแค่ <code>else:</code> เท่านั้น)</li>
                        <li>ต้องวางไว้ล่างสุดของโครงสร้าง if-elif-else เสมอ</li>
                        <li>มีได้แค่ 1 ตัวต่อ 1 โครงสร้าง</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <h5 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <ShieldAlert className="text-rose-500 w-5 h-5" /> 4.10.5.2 การจัดการเมื่อไม่ตรงเงื่อนไข (Error Handling & Fallback)
                  </h5>
                  <p className="text-slate-600 leading-relaxed text-base mb-4">
                    ประโยชน์หลักของ <code className="bg-slate-100 px-1 rounded">else</code> คือการดักจับข้อผิดพลาด (Fallback) เช่น เมื่อผู้ใช้กรอกข้อมูลที่โปรแกรมไม่รู้จัก หรือป้องกันการบุกรุกโดยไม่ได้รับอนุญาต
                  </p>
                  <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-slate-300 shadow-inner">
                    <span className="text-pink-500">if</span> <span className="text-blue-400">username</span> == <span className="text-emerald-400">"admin"</span>:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-emerald-400">"Login Success"</span>)<br/>
                    <span className="text-pink-500">else</span>:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500"># ดักจับคนที่ไม่ได้ชื่อ admin ทุกคน!</span><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">print</span>(<span className="text-rose-400">"Access Denied!"</span>)<br/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ElseSimulator />
        </div>

        {/* Section 4: Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (หน่วยที่ 4.10)" taskText={combinedTeacherTask} />
      </main>
    </div>
  );
}
