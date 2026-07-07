import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  Cpu,
  Code,
  Database,
  Brain,
  Layers,
  ArrowRight,
  Activity,
  Server,
  Network,
  Sparkles,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Laptop,
  Check,
  HelpCircle,
  Sliders,
  Globe,
  FileCode,
  Compass,
  ChevronRight
} from 'lucide-react';

export default function py1_2() {
  // ==========================================
  // 1. ภาษาระดับต่ำ (Low-level - CPU Register Neon Board)
  // ==========================================
  const [c1Registers, setC1Registers] = useState({ AX: 0, BX: 0, CX: 0, DX: 0 });
  const [c1ActiveLine, setC1ActiveLine] = useState(-1);
  const [c1TerminalLogs, setC1TerminalLogs] = useState([]);
  const [c1State, setC1State] = useState('idle'); // idle, running
  const [c1PulseReg, setC1PulseReg] = useState(null);

  const c1AssemblyCode = [
    { inst: 'MOV AX, 15', desc: 'ย้ายค่าตัวเลข 15 เข้าสู่รีจิสเตอร์ AX', op: 'mov', target: 'AX', val: 15 },
    { inst: 'MOV BX, 30', desc: 'ย้ายค่าตัวเลข 30 เข้าสู่รีจิสเตอร์ BX', op: 'mov', target: 'BX', val: 30 },
    { inst: 'ADD AX, BX', desc: 'นำค่าใน BX บวกเข้ากับค่าใน AX (15 + 30)', op: 'add', target: 'AX', source: 'BX' },
    { inst: 'MOV CX, AX', desc: 'สำเนาผลลัพธ์จาก AX ไปเก็บไว้ที่ CX', op: 'mov', target: 'CX', source: 'AX' },
    { inst: 'SUB CX, 10', desc: 'หักลบค่าใน CX ออก 10 หน่วย (45 - 10)', op: 'sub', target: 'CX', val: 10 }
  ];

  const handleC1Step = () => {
    if (c1State === 'running') return;
    setC1State('running');

    const nextLine = c1ActiveLine + 1;
    if (nextLine >= c1AssemblyCode.length) {
      setC1ActiveLine(-1);
      setC1Registers({ AX: 0, BX: 0, CX: 0, DX: 0 });
      setC1TerminalLogs(['🔄 รีเซ็ตตรรกะสถานะหน่วยความจำรีจิสเตอร์ทั้งหมดเรียบร้อยแล้ว']);
      setC1PulseReg(null);
      setC1State('idle');
      return;
    }

    const cmd = c1AssemblyCode[nextLine];
    setC1ActiveLine(nextLine);
    setC1PulseReg(cmd.target);

    setTimeout(() => {
      setC1Registers(prev => {
        const nextRegs = { ...prev };
        if (cmd.op === 'mov') {
          nextRegs[cmd.target] = cmd.source ? prev[cmd.source] : cmd.val;
        } else if (cmd.op === 'add') {
          nextRegs[cmd.target] = prev[cmd.target] + (cmd.source ? prev[cmd.source] : cmd.val);
        } else if (cmd.op === 'sub') {
          nextRegs[cmd.target] = prev[cmd.target] - (cmd.source ? prev[cmd.source] : cmd.val);
        }

        const hexAddr = `0x00A${nextLine * 4}`;
        const logText = `➔ [${hexAddr}] ${cmd.inst} | ผลลัพธ์: ${cmd.target} = ${nextRegs[cmd.target]}`;
        setC1TerminalLogs(old => [...old, logText]);
        return nextRegs;
      });
      setC1State('idle');
    }, 450);
  };

  const getC1Binary = (idx) => {
    switch (idx) {
      case 0: return '10110000 00001111';
      case 1: return '10110011 00011110';
      case 2: return '00000011 11000011';
      case 3: return '10001001 11000001';
      case 4: return '10000011 11101001 00001010';
      default: return '00000000 00000000';
    }
  };

  // ==========================================
  // 2. ภาษาระดับสูง (High-level - Syntax Translation)
  // ==========================================
  const [c2SelectedText, setC2SelectedText] = useState('loop');

  const c2Translations = {
    loop: {
      high: 'for i in range(5):\n    print(i)',
      assembly: 'MOV CX, 5\nSTART_LOOP:\n  PUSH CX\n  ; print logic here\n  POP CX\n  LOOP START_LOOP',
      machine: '10111001 00000101\n01010001\n10001001\n01011001\n11100010 11111010'
    },
    condition: {
      high: 'if score >= 50:\n    result = "Pass"',
      assembly: 'CMP score, 50\nJL LABEL_ELSE\nMOV result, 1\nJMP LABEL_END\nLABEL_ELSE:\nMOV result, 0\nLABEL_END:',
      machine: '00111000 00110010\n01111100 00000100\n11000110 00000001\n11101001 00000010'
    }
  };

  // ==========================================
  // 3. ภาษารุ่นที่ 4 (4GL - Interactive SQL Builder)
  // ==========================================
  const [sqlSelect, setSqlSelect] = useState('name');
  const [sqlWhere, setSqlWhere] = useState('score > 80');
  const [sqlResult, setSqlResult] = useState([]);
  const [sqlRunPulse, setSqlRunPulse] = useState(false);

  const runSqlQuery = () => {
    setSqlRunPulse(true);
    setTimeout(() => setSqlRunPulse(false), 500);

    const rawData = [
      { name: 'สมชาย', score: 85, grade: 'A', major: 'ไอที' },
      { name: 'วิภา', score: 92, grade: 'A', major: 'ไอที' },
      { name: 'เดชา', score: 55, grade: 'C', major: 'อิเล็กทรอนิกส์' },
      { name: 'อุมา', score: 74, grade: 'B', major: 'ไฟฟ้า' }
    ];

    const filtered = rawData.filter(row => {
      if (sqlWhere === 'score > 80') return row.score > 80;
      if (sqlWhere === "major = 'ไอที'") return row.major === 'ไอที';
      return true;
    });

    const projection = filtered.map(row => {
      if (sqlSelect === 'name, score') return { name: row.name, score: row.score };
      if (sqlSelect === 'name, grade') return { name: row.name, grade: row.grade };
      return { name: row[sqlSelect] };
    });

    setSqlResult(projection);
  };

  // ==========================================
  // 4. ภาษารุ่นที่ 5 (5GL / AI Neural Nodes)
  // ==========================================
  const [c4ActiveNode, setC4ActiveNode] = useState(null);
  const [c4PulseNodes, setC4PulseNodes] = useState(false);

  const triggerC4Analysis = (nodeId) => {
    setC4ActiveNode(nodeId);
    setC4PulseNodes(true);
    setTimeout(() => setC4PulseNodes(false), 800);
  };

  // ==========================================
  // 5. ความสัมพันธ์และเปรียบเทียบ (Performance Radar)
  // ==========================================
  const [c5Metric, setC5Metric] = useState('speed');

  const c5MetricsData = {
    speed: {
      low: 'สูงมาก (ประมวลผลทันทีในระดับฮาร์ดแวร์และไม่มีความซับซ้อนของคำสั่งส่วนกลาง)',
      high: 'ปานกลาง (ต้องแปลโค้ดผ่านตัวแปรภาษาทำให้สูญเสียเวลาระหว่างกระบวนการแปลง)',
      explain: 'ตรรกะระดับต่ำส่งสัญญาณไฟฟ้าควบคุม CPU โดยตรงทำให้ความเร็วประมวลผลฉับพลันมากที่สุด'
    },
    human: {
      low: 'ยากสุดขีด (ต้องจดจำรหัสสัญลักษณ์เชิงกลไฟฟ้า และมีความกังวลในการจองหน่วยความจำ)',
      high: 'ง่ายและเร็ว (ไวยากรณ์โครงสร้างถ้อยคำเข้าใจง่าย คล้ายภาษาอังกฤษในการเขียนโปรแกรม)',
      explain: 'ภาษาระดับสูงออกแบบมาเพื่อให้สมองมนุษย์เรียนรู้ตรรกะโปรแกรมได้อย่างรวดเร็วและเป็นระบบ'
    }
  };

  // ==========================================
  // 6. แนวโน้มภาษาในอนาคต (AI CoPilot Chat)
  // ==========================================
  const [c6ChatInput, setC6ChatInput] = useState('');
  const [c6ChatLogs, setC6ChatLogs] = useState([
    { role: 'assistant', text: 'สวัสดีครับนักเรียน! ผมคือ AI CoPilot ยุค 5GL ต้องการให้ผมช่วยเขียนรหัสควบคุมแบบใดพิมพ์สั่งได้เลยครับ' }
  ]);
  const [c6Writing, setC6Writing] = useState(false);

  const sendC6Command = () => {
    if (!c6ChatInput.trim() || c6Writing) return;
    
    const userMsg = c6ChatInput;
    setC6ChatLogs(old => [...old, { role: 'user', text: userMsg }]);
    setC6ChatInput('');
    setC6Writing(true);

    setTimeout(() => {
      let reply = 'ผมเข้าใจความต้องการครับ นี่คือรหัส Python ที่เหมาะสมสำหรับภารกิจนี้:';
      if (userMsg.includes('ลูป') || userMsg.includes('ทำซ้ำ')) {
        reply += '\n\n```python\n# ลูปทำงานซ้ำ 5 รอบ\nfor count in range(1, 6):\n    print(f"รอบที่ {count}")\n```';
      } else if (userMsg.includes('เงื่อนไข') || userMsg.includes('ตรวจ')) {
        reply += '\n\n```python\n# โครงสร้างตรวจสอบคะแนน\nscore = 75\nif score >= 50:\n    print("คุณสอบผ่านเกณฑ์")\nelse:\n    print("ไม่ผ่านเกณฑ์")\n```';
      } else {
        reply += '\n\n```python\n# คำสั่งแสดงข้อความเบื้องต้น\nprint("ระบบสั่งงานสำเร็จเรียบร้อยแล้ว")\n```';
      }
      setC6ChatLogs(old => [...old, { role: 'assistant', text: reply }]);
      setC6Writing(false);
    }, 1000);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-blue-200 selection:text-blue-900 relative">

      {/* 1️⃣ Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-10%] w-[650px] h-[650px] rounded-full bg-blue-200/40 blur-[160px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[550px] h-[550px] rounded-full bg-cyan-200/35 blur-[160px]"></div>
      </div>

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-6 md:space-y-8 relative z-10">

        {/* ----------------- Subtopic 1 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-50/80 text-blue-600 border border-blue-100 shadow-inner group cursor-pointer">
              <Cpu className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ภาษาระดับต่ำ (Low-level Language)</h2>
              <p className="text-[15px] text-slate-500">การสื่อสารที่ตรงกับสถาปัตยกรรมทางกายภาพและการไหลเวียนของสัญญาณไฟฟ้าใน CPU</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 font-sans">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                เป็นรหัสคำสั่งสั่งงานที่คอมพิวเตอร์เข้าถึงข้อมูลได้เร็วที่สุด 
                เพราะมีความใกล้เคียงกับ **โครงสร้างฮาร์ดแวร์และวงจรภายใน CPU** โดยตรง 
                แบ่งเป็น **ภาษาเครื่อง (Machine Language)** และ **ภาษาแอสเซมบลี (Assembly Language)**
              </p>
              
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500 animate-pulse" />
                  คุณลักษณะเด่น
                </h4>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1.5 leading-relaxed">
                  <li>**ภาษาเครื่อง**: มีลักษณะเป็นกลุ่มเลขฐานสอง (0 และ 1) มีความเร็วสูงสุดในการประมวลผล</li>
                  <li>**ภาษาแอสเซมบลี**: ใช้คำสัญลักษณ์ภาษาอังกฤษช่วยจำ (Mnemonic) เช่น ADD, SUB เพื่อสั่ง CPU</li>
                </ul>
              </div>
            </div>

            {/* CPU Register board UI */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono text-sm text-blue-400 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" /> CPU REGISTER INTERRUPT
                </h3>
                <span className="text-[11px] font-mono text-zinc-500">8086 Architecture</span>
              </div>

              {/* Memory Register Grid */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {Object.entries(c1Registers).map(([reg, val]) => (
                  <div
                    key={reg}
                    className={`p-3 rounded-xl border text-center font-mono transition-all duration-300
                      ${c1PulseReg === reg
                        ? 'bg-blue-600/30 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-[1.05]'
                        : 'bg-slate-800/80 border-slate-700/80 text-blue-300'
                      }`}
                  >
                    <div className="text-[10px] text-zinc-500 font-bold mb-1">{reg} Register</div>
                    <div className="text-xl font-bold font-mono">{val}</div>
                  </div>
                ))}
              </div>

              {/* Assembly code box */}
              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 font-mono text-[13px] mb-4 space-y-2">
                <div className="text-zinc-500 mb-2 flex justify-between items-center">
                  <span>Assembly Code Source:</span>
                  <span className="text-xs text-indigo-400 font-bold">16-bit register</span>
                </div>
                {c1AssemblyCode.map((cmd, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors
                      ${c1ActiveLine === idx 
                        ? 'bg-blue-950/50 border border-blue-500/20 text-white' 
                        : 'text-slate-400 opacity-60'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight className={`w-3.5 h-3.5 text-blue-500 ${c1ActiveLine === idx ? 'opacity-100' : 'opacity-0'}`} />
                      <span className="font-bold">{cmd.inst}</span>
                    </div>
                    <div className="text-[10.5px] text-zinc-500">{cmd.desc}</div>
                  </div>
                ))}
              </div>

              {/* Play controls */}
              <div className="flex gap-3 justify-between items-center">
                <button
                  onClick={handleC1Step}
                  disabled={c1State === 'running'}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-[13px] cursor-pointer flex items-center gap-2 hover:shadow-lg hover:shadow-blue-600/20 transition-all active:scale-95 disabled:bg-zinc-600"
                >
                  <Play className="w-4 h-4" />
                  {c1ActiveLine === -1 ? 'เริ่มประมวลผลโค้ด' : 'ประมวลผลทีละขั้นตอน'}
                </button>

                <div className="font-mono text-zinc-500 text-[11px]">
                  {c1ActiveLine !== -1 ? `Binary: ${getC1Binary(c1ActiveLine)}` : 'Binary: Ready'}
                </div>
              </div>

              {/* Simulated Logs Terminal */}
              <div className="mt-4 p-3 bg-slate-950 border border-slate-800 rounded-lg min-h-[80px] font-mono text-[12px] text-slate-400">
                <div className="text-zinc-600 mb-1">// System Logs</div>
                {c1TerminalLogs.length === 0 && <p className="text-zinc-600 italic">บอร์ดยังไม่เริ่มรัน...</p>}
                {c1TerminalLogs.slice(-2).map((log, i) => (
                  <div key={i} className="text-emerald-400 leading-relaxed">{log}</div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 2 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-50/80 text-blue-600 border border-blue-100 shadow-inner group cursor-pointer">
              <Code className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ภาษาระดับสูง (High-level Language)</h2>
              <p className="text-[15px] text-slate-500">ชุดคำสั่งที่เขียนง่าย สื่อความหมายใกล้เคียงภาษาธรรมชาติของมนุษย์</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                เป็นภาษารุ่นที่ 3 (3GL) ขึ้นไป ที่พัฒนาขึ้นมาเพื่อ **ขจัดความซับซ้อนของภาษาระดับต่ำ** 
                มีโครงสร้างประโยคและหลักไวยากรณ์คล้ายคำสั่งภาษาอังกฤษ (เช่น `if`, `while`, `print`) 
                ทำให้เขียนและแก้ไขข้อผิดพลาดได้ง่าย
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ตัวอย่างภาษาในกลุ่มนี้ เช่น Python, C++, Java และ Pascal 
                ซึ่งเมื่อเขียนโค้ดเสร็จแล้ว จะต้องส่งผ่านคอมไพเลอร์หรืออินเตอร์พรีเตอร์เพื่อแปลงให้เป็นภาษาเครื่องฐานสอง
              </p>
            </div>

            {/* Translation block visualization */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner flex flex-col justify-between">
              <h3 className="font-semibold text-slate-900 mb-2 text-center text-sm">เครื่องเปรียบเทียบการแปลภาษาระดับสูง</h3>
              
              <div className="flex gap-2 justify-center mb-4">
                {['loop', 'condition'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setC2SelectedText(t)}
                    className={`px-4 py-2 border font-semibold text-xs rounded-xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all
                      ${c2SelectedText === t 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-500'
                      }`}
                  >
                    {t === 'loop' ? 'โครงสร้างวนซ้ำ (Loop)' : 'โครงสร้างเงื่อนไข (If)'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[12.5px] items-stretch">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-indigo-400 mb-1 font-bold">1. High-Level Python</div>
                    <pre className="text-white leading-relaxed">{c2Translations[c2SelectedText].high}</pre>
                  </div>
                  <span className="text-[9px] text-zinc-600 mt-4">[ เข้าใจง่ายสุด ]</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-blue-400 mb-1 font-bold">2. Assembly Code</div>
                    <pre className="text-blue-300 leading-relaxed">{c2Translations[c2SelectedText].assembly}</pre>
                  </div>
                  <span className="text-[9px] text-zinc-600 mt-4">[ ระดับคำย่อเชิงกล ]</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-emerald-400 mb-1 font-bold">3. Machine binary</div>
                    <pre className="text-emerald-300 leading-relaxed font-mono select-all break-all">{c2Translations[c2SelectedText].machine}</pre>
                  </div>
                  <span className="text-[9px] text-zinc-600 mt-4">[ สัญญาณไฟฟ้าจริง ]</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 3 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-50/80 text-blue-600 border border-blue-100 shadow-inner group cursor-pointer">
              <Database className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ภาษาคอมพิวเตอร์รุ่นที่ 4 (Fourth-Generation Language)</h2>
              <p className="text-[15px] text-slate-500">ภาษาระดับโปรแกรมมิ่งแบบระบุจุดประสงค์ (Non-Procedural) ที่เน้นไปที่ข้อมูล</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ภาษารุ่นที่ 4 (4GL) ถูกออกแบบมาเพื่อ **ลดปริมาณบรรทัดในการเขียนโค้ดลงอย่างรวดเร็ว** 
                โดยมุ่งสั่งเครื่องคอมพิวเตอร์ว่า **"ต้องการข้อมูลอะไร (What to do)"** แทนการไล่อธิบายว่า **"ต้องสั่งทำด้วยขั้นตอนอย่างไร (How to do)"**
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ตัวอย่างที่เป็นรูปธรรมที่สุดคือภาษาสำหรับค้นหาและจัดการฐานข้อมูลจำพวก **SQL (Structured Query Language)** 
                รวมถึงระบบสร้างรายงานอัตโนมัติต่างๆ
              </p>
            </div>

            {/* SQL query builder interactive */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
              <h3 className="font-semibold text-slate-900 mb-2 text-center text-sm">เครื่องจำลองตรรกะ SQL Builder (4GL)</h3>
              
              <div className="space-y-4 font-sans text-[13px] mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">1. SELECT (เลือกแสดงผลฟิลด์ข้อมูล):</label>
                  <div className="flex gap-2">
                    {['name', 'name, score', 'name, grade'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setSqlSelect(v)}
                        className={`px-3 py-1 rounded-lg border text-xs cursor-pointer hover:border-blue-400 active:scale-95 transition-all
                          ${sqlSelect === v ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold' : 'bg-white border-slate-200 text-slate-600'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">2. WHERE (กำหนดตัวคัดกรองข้อมูล):</label>
                  <div className="flex gap-2">
                    {['score > 80', "major = 'ไอที'", 'All Data'].map((v) => (
                      <button
                        key={v}
                        onClick={() => setSqlWhere(v)}
                        className={`px-3 py-1 rounded-lg border text-xs cursor-pointer hover:border-blue-400 active:scale-95 transition-all
                          ${sqlWhere === v ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold' : 'bg-white border-slate-200 text-slate-600'}`}
                      >
                        {v === 'All Data' ? 'แสดงทั้งหมด' : v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SQL Syntax & Run Button */}
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 font-mono text-[13.5px] mb-4 relative">
                {sqlRunPulse && <div className="absolute inset-0 bg-blue-500/10 pointer-events-none rounded-xl"></div>}
                <div className="text-zinc-500 text-[10px] mb-2">// SQL Query statement:</div>
                <div className="text-white font-bold leading-relaxed">
                  <span className="text-indigo-400">SELECT</span> <span className="text-amber-400">{sqlSelect}</span><br />
                  <span className="text-indigo-400">FROM</span> <span className="text-emerald-400">students</span><br />
                  {sqlWhere !== 'All Data' && (
                    <>
                      <span className="text-indigo-400">WHERE</span> <span className="text-cyan-400">{sqlWhere}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-center mb-4">
                <button
                  onClick={runSqlQuery}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md hover:shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                >
                  ค้นหาข้อมูลฐานข้อมูล
                </button>
              </div>

              {/* Table output result */}
              <div className="bg-white rounded-xl border border-slate-200 p-3 min-h-[100px] overflow-x-auto shadow-inner">
                {sqlResult.length === 0 ? (
                  <p className="text-center text-slate-500 italic py-6 text-xs">
                    [ ยังไม่มีข้อมูลการค้นหา กรุณากดปุ่มค้นหาข้อมูลด้านบน ]
                  </p>
                ) : (
                  <table className="w-full text-xs font-mono text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400">
                        {Object.keys(sqlResult[0]).map(key => (
                          <th key={key} className="pb-1 capitalize">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {sqlResult.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          {Object.values(row).map((val, idx) => (
                            <td key={idx} className="py-2">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 4 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-50/80 text-blue-600 border border-blue-100 shadow-inner group cursor-pointer">
              <Brain className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ภาษาคอมพิวเตอร์รุ่นที่ 5 (Fifth-Generation Language)</h2>
              <p className="text-[15px] text-slate-500">ภาษายุกปัญญาประดิษฐ์และโครงข่ายเครือข่ายจำลองการแก้โจทย์อย่างชาญฉลาด</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ภาษารุ่นที่ 5 (5GL) หรือที่มักขนานนามว่า **ภาษาธรรมชาติยุคปัญญาประดิษฐ์** 
                เป็นเครื่องมือที่ใช้สำหรับสร้างโมเดลความรู้ การแก้เงื่อนไขอุปสรรค และการเรียนรู้ด้วยสมองจำลอง (Neural Networks)
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ลักษณะที่โดดเด่นคือโค้ดไม่ได้ทำตามคำสั่งแบบลำดับขั้นตอนตรงๆ 
                แต่โปรแกรมจะให้เราป้อนสัจพจน์ กฎเกณฑ์ความสัมพันธ์ แล้วปล่อยให้คอมพิวเตอร์วิเคราะห์หาคำตอบด้วยกลไกการสืบค้น (Inference Engine) 
                ตัวอย่างเช่นภาษา Prolog และ LISP
              </p>
            </div>

            {/* Neural Node Simulator SVG */}
            <div className="p-6 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center">
              <h3 className="font-semibold text-indigo-300 mb-1 text-xs font-mono text-center">AI NEURAL PATTERN CHECKER</h3>
              <p className="text-[10px] text-zinc-500 mb-6 text-center font-mono">Click a logical input node to fire network pulse</p>
              
              <div className="relative w-72 h-44 flex justify-between items-center mb-4">
                {/* Node Line Connections via SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" fill="none">
                  {/* Line Input 1 to Mid 1 */}
                  <path d="M 28,32 L 144,48" stroke={c4ActiveNode === 'n1' ? '#22d3ee' : '#334155'} strokeWidth={c4ActiveNode === 'n1' ? '3' : '1.5'} className={c4PulseNodes && c4ActiveNode === 'n1' ? 'animate-pulse' : ''} />
                  {/* Line Input 1 to Mid 2 */}
                  <path d="M 28,32 L 144,120" stroke={c4ActiveNode === 'n1' ? '#22d3ee' : '#334155'} strokeWidth={c4ActiveNode === 'n1' ? '2' : '1.5'} />
                  {/* Line Input 2 to Mid 1 */}
                  <path d="M 28,128 L 144,48" stroke={c4ActiveNode === 'n2' ? '#a78bfa' : '#334155'} strokeWidth={c4ActiveNode === 'n2' ? '2' : '1.5'} />
                  {/* Line Input 2 to Mid 2 */}
                  <path d="M 28,128 L 144,120" stroke={c4ActiveNode === 'n2' ? '#a78bfa' : '#334155'} strokeWidth={c4ActiveNode === 'n2' ? '3' : '1.5'} className={c4PulseNodes && c4ActiveNode === 'n2' ? 'animate-pulse' : ''} />
                  {/* Mid 1 to Output */}
                  <path d="M 144,48 L 260,84" stroke={c4ActiveNode ? '#38bdf8' : '#334155'} strokeWidth={c4ActiveNode ? '3' : '1.5'} />
                  {/* Mid 2 to Output */}
                  <path d="M 144,120 L 260,84" stroke={c4ActiveNode ? '#38bdf8' : '#334155'} strokeWidth={c4ActiveNode ? '3' : '1.5'} />
                </svg>

                {/* Nodes UI overlay */}
                <div className="flex flex-col gap-12 z-10">
                  <button
                    onClick={() => triggerC4Analysis('n1')}
                    className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-300 font-mono text-[10px] font-bold text-white flex items-center justify-center
                      ${c4ActiveNode === 'n1' 
                        ? 'bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/40 scale-110' 
                        : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
                  >
                    Face
                  </button>
                  <button
                    onClick={() => triggerC4Analysis('n2')}
                    className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-300 font-mono text-[10px] font-bold text-white flex items-center justify-center
                      ${c4ActiveNode === 'n2' 
                        ? 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/40 scale-110' 
                        : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
                  >
                    Voice
                  </button>
                </div>

                <div className="flex flex-col gap-12 z-10">
                  <div className={`w-10 h-10 rounded-full border-2 font-mono text-[10px] text-white flex items-center justify-center transition-all duration-300
                    ${c4ActiveNode 
                      ? 'bg-indigo-600 border-indigo-400 shadow-md animate-pulse' 
                      : 'bg-slate-800 border-slate-700'}`}>
                    Node A
                  </div>
                  <div className={`w-10 h-10 rounded-full border-2 font-mono text-[10px] text-white flex items-center justify-center transition-all duration-300
                    ${c4ActiveNode 
                      ? 'bg-indigo-600 border-indigo-400 shadow-md animate-pulse' 
                      : 'bg-slate-800 border-slate-700'}`}>
                    Node B
                  </div>
                </div>

                <div className="z-10">
                  <div className={`w-12 h-12 rounded-full border-2 font-mono text-[11px] text-white flex items-center justify-center transition-all duration-500
                    ${c4ActiveNode 
                      ? 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/30 scale-110 font-bold' 
                      : 'bg-slate-800 border-slate-700'}`}>
                    AI Out
                  </div>
                </div>
              </div>

              <div className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl min-h-[60px] font-mono text-[12px] text-slate-400 text-center flex items-center justify-center">
                {c4ActiveNode === 'n1' && 'ตรรกะใบหน้าผ่าน: Inference Engine ตรวจสอบความถูกต้องภาพถ่ายสำเร็จ'}
                {c4ActiveNode === 'n2' && 'ตรรกะเสียงผ่าน: ระบบแปลคลื่นความถี่คล้ายความหมายของมนุษย์สำเร็จ'}
                {!c4ActiveNode && '[ คลิกเลือก Input Node ด้านซ้ายเพื่อวิเคราะห์การไหล ]'}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 5 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-50/80 text-blue-600 border border-blue-100 shadow-inner group cursor-pointer">
              <Sliders className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ความสัมพันธ์ระหว่างภาษารุ่นต่างๆ และวิวัฒนาการ</h2>
              <p className="text-[15px] text-slate-500">กฎความผกผันระหว่างความเร็วเชิงกลฮาร์ดแวร์และความคล่องตัวในจิตใจมนุษย์</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                การปฏิวัติภาษาคอมพิวเตอร์จากรหัสสัญญาณไฟฟ้า (1GL) มาจนถึงภาษาปัญญาประดิษฐ์ (5GL) 
                มีกฎความผกผันที่น่าสนใจอยู่เสมอ นั่นคือ:
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2 leading-relaxed">
                <li>**ความเร็ว (Speed)**: ยิ่งภาษารุ่นเก่า (ระดับต่ำ) ประสิทธิภาพและความเร็วจะสูงกว่า เนื่องจากแปลคำสั่งน้อยกว่า</li>
                <li>**ความสบายตา (Readability)**: ยิ่งภาษารุ่นใหม่ (ระดับสูง) มนุษย์จะเขียนง่าย และออกแบบระบบได้รวดเร็วกว่า</li>
              </ul>
            </div>

            {/* Performance comparison visual slider toggle */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
              <h3 className="font-semibold text-slate-900 mb-3 text-center text-sm">เครื่องเปรียบเทียบมิติตัวชี้วัด (Metrics Comparison)</h3>
              
              <div className="flex gap-2 justify-center mb-6">
                {['speed', 'human'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setC5Metric(m)}
                    className={`px-4 py-2 border font-semibold text-xs rounded-xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all
                      ${c5Metric === m 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-500'
                      }`}
                  >
                    {m === 'speed' ? 'ความเร็วประมวลผล CPU' : 'ความรวดเร็วในการเรียนรู้เขียนโค้ด'}
                  </button>
                ))}
              </div>

              <div className="space-y-4 font-sans text-xs">
                {/* Metric A bar */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>ภาษาระดับต่ำ (Low-Level Language - 1GL/2GL)</span>
                    <span className="text-blue-600">{c5Metric === 'speed' ? '100% Extreme Speed' : '20% Difficult'}</span>
                  </div>
                  <div className="h-3.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-[1000ms]"
                      style={{ width: c5Metric === 'speed' ? '100%' : '20%' }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed italic">{c5MetricsData[c5Metric].low}</p>
                </div>

                {/* Metric B bar */}
                <div className="space-y-1 pt-3 border-t border-slate-200">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>ภาษาระดับสูง (High-Level Language - 3GL ขึ้นไป)</span>
                    <span className="text-cyan-600">{c5Metric === 'speed' ? '65% Standard' : '95% Easy & Quick'}</span>
                  </div>
                  <div className="h-3.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all duration-[1000ms]"
                      style={{ width: c5Metric === 'speed' ? '65%' : '95%' }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed italic">{c5MetricsData[c5Metric].high}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 6 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-blue-50/80 text-blue-600 border border-blue-100 shadow-inner group cursor-pointer">
              <Globe className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">แนวโน้มภาษาโปรแกรมคอมพิวเตอร์ในอนาคต</h2>
              <p className="text-[15px] text-slate-500">ทิศทางวิวัฒนาการสู่การลดการเขียนโค้ดและผนวกตัวระบบ AI CoPilot อย่างก้าวล้ำ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                ในอนาคตอันใกล้ ภาษาคอมพิวเตอร์จะขยายตัวข้ามขีดจำกัดเดิมของการเขียนอักขระทีละบรรทัด 
                ไปสู่การเขียนโปรแกรมแบบ **Low-Code/No-Code (ใช้ UI ลากวาง)** หรือการสื่อสารด้วย **Natural Language (ภาษาธรรมชาติพูดคุยสั่งการ)**
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-sans">
                นักพัฒนาโปรแกรมจะทำหน้าที่สั่งการตรรกะความต้องการระดับกว้าง แล้วให้ปัญญาประดิษฐ์ช่วยวิเคราะห์และเรียบเรียงไวยากรณ์ Python/C++ 
                ได้อย่างสมบูรณ์แบบ
              </p>
            </div>

            {/* AI Copilot chat simulator */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <h3 className="font-mono text-xs text-indigo-400 mb-4 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" /> FUTURE AI COPILOT CHAT
              </h3>

              {/* Chat log window */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 min-h-[140px] font-sans text-xs space-y-3 max-h-[220px] overflow-y-auto mb-4">
                {c6ChatLogs.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg leading-relaxed max-w-[85%]
                      ${chat.role === 'user' 
                        ? 'bg-blue-600 text-white ml-auto' 
                        : 'bg-slate-800 text-zinc-300 mr-auto'
                      }`}
                  >
                    <div className="font-mono text-[9px] text-zinc-500 mb-0.5 capitalize">{chat.role}</div>
                    <pre className="font-sans whitespace-pre-wrap leading-relaxed">{chat.text}</pre>
                  </div>
                ))}
                {c6Writing && (
                  <div className="bg-slate-800 text-zinc-400 mr-auto p-2.5 rounded-lg italic animate-pulse">
                    AI CoPilot กำลังเขียนโครงสร้างตรรกะรหัส...
                  </div>
                )}
              </div>

              {/* Input block */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={c6ChatInput}
                  onChange={(e) => setC6ChatInput(e.target.value)}
                  placeholder="พิมพ์สั่งบอท เช่น: 'เขียนลูปทำซ้ำ' หรือ 'ตรวจสอบเงื่อนไข'"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                  onKeyDown={(e) => { if (e.key === 'Enter') sendC6Command(); }}
                />
                <button
                  onClick={sendC6Command}
                  disabled={c6Writing}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer active:scale-95 transition-all disabled:bg-zinc-600"
                >
                  ส่งคำสั่ง
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ใบงานปฏิบัติ: วินิจฉัยระดับของภาษาคอมพิวเตอร์"
          taskText={`โจทย์ปฏิบัติการเปรียบเทียบระดับของภาษา (หน่วยที่ 1.2):
ให้นักเรียนวิเคราะห์ความแตกต่างของระดับภาษาและบันทึกสรุปผลด้วยตนเอง

ข้อที่ 1: การแกะรอยการทำงานระดับฮาร์ดแวร์
จากจำลองแผงควบคุม CPU Register บล็อกคำสั่งภาษาแอสเซมบลี:
MOV AX, 15
MOV BX, 30
ADD AX, BX
- จงเขียนอธิบายค่าของรีจิสเตอร์ AX และ BX ในแต่ละบรรทัดเมื่อโปรแกรมเริ่มรันและคอมพิวเตอร์ทำคำสั่งทีละขั้นตอนจนจบ
- และวิเคราะห์ว่าภาษานี้อยู่ในระดับต่ำหรือระดับสูงด้วยเหตุผลใด

ข้อที่ 2: การประเมินแนวโน้มในอนาคต
- ให้นักเรียนระบุตัวอย่างภาษาคอมพิวเตอร์รุ่นที่ 4 (4GL) ที่ใช้ในการดึงข้อมูล และเขียนประโยคคำสั่ง SQL เบื้องต้นเพื่อดึงชื่อจากตาราง "students" ที่ได้คะแนนมากกว่า 80 คะแนน
- อธิบายข้อแตกต่างของภาษารุ่นที่ 4 (4GL) กับระดับภาษารุ่นที่ 5 (5GL / AI) ในเชิงจุดประสงค์การนำไปใช้`}
        />

      </main>
    </div>
  );
}
