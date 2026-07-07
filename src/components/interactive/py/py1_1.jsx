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
  Clock,
  Globe,
  Sliders,
  FileCode,
  Smartphone,
  Info
} from 'lucide-react';

export default function py1_1() {
  // ==========================================
  // 1. ภาษาคอมพิวเตอร์ คืออะไร (Interactive Translation)
  // ==========================================
  const [c1Option, setC1Option] = useState('greet');
  const [c1Pulse, setC1Pulse] = useState(false);

  const handleC1OptionChange = (opt) => {
    setC1Option(opt);
    setC1Pulse(true);
    setTimeout(() => setC1Pulse(false), 600);
  };

  const getC1Translations = () => {
    switch (c1Option) {
      case 'greet':
        return {
          human: 'สั่งหุ่นยนต์ว่า "สวัสดีชาวโลก"',
          python: 'print("สวัสดีชาวโลก")',
          binary: '01110000 01110010 01101001 01101110 01110100 00101000 00100010 01110011 01100001 01110111 01100001 01110011 01100100 01100101 01100101 00100010 00101001'
        };
      case 'calc':
        return {
          human: 'ให้เอาผลรวม 15 บวก 30 เก็บในตัวแปร',
          python: 'result = 15 + 30',
          binary: '01110010 01100101 01110011 01110101 01101100 01110100 00100000 00111101 00100000 00110001 00110101 00100000 00101011 00100000 00110011 00110000'
        };
      case 'decide':
        return {
          human: 'ถ้ามีคะแนน 50 คะแนนขึ้นไป ให้ถือว่าผ่าน',
          python: 'if score >= 50:\n    print("ผ่าน")',
          binary: '01101001 01100110 00100000 01110011 01100011 01101111 01110010 01100101 00100000 00111101 00111110 00100000 00110101 00110000 00111010 00001010 00100000'
        };
      default:
        return {};
    }
  };

  const c1Data = getC1Translations();

  // ==========================================
  // 2. บิดาแห่งภาษาโปรแกรม (Ada Lovelace SVG Engine)
  // ==========================================
  const [gearRotation, setGearRotation] = useState(0);
  const [analyticalOutput, setAnalyticalOutput] = useState([]);
  const [gearRunning, setGearRunning] = useState(false);

  const runAnalyticalEngine = () => {
    if (gearRunning) return;
    setGearRunning(true);
    setGearRotation(prev => prev + 360);

    const bernoulliSeq = ['1', '-1/2', '1/6', '0', '-1/30', '0', '1/42'];
    let index = 0;
    setAnalyticalOutput([]);

    const interval = setInterval(() => {
      if (index < bernoulliSeq.length) {
        setAnalyticalOutput(prev => [...prev, `B[${index * 2}] = ${bernoulliSeq[index]}`]);
        index++;
      } else {
        clearInterval(interval);
        setGearRunning(false);
      }
    }, 450);
  };

  const resetAnalyticalEngine = () => {
    setGearRotation(0);
    setAnalyticalOutput([]);
    setGearRunning(false);
  };

  // ==========================================
  // 3. องค์ประกอบของภาษา (Syntax, Semantics, Pragmatics Morph Board)
  // ==========================================
  const [c3ActiveTab, setC3ActiveTab] = useState(1);
  const [c3Repaired, setC3Repaired] = useState({ 1: false, 2: false, 3: false });
  const [c3Flash, setC3Flash] = useState(false);

  const handleC3Repair = (id) => {
    setC3Flash(true);
    setTimeout(() => setC3Flash(false), 500);
    setC3Repaired(prev => ({ ...prev, [id]: true }));
  };

  const handleC3Reset = (id) => {
    setC3Repaired(prev => ({ ...prev, [id]: false }));
  };

  const c3DataMap = {
    1: {
      title: 'ไวยากรณ์ (Syntax) - โครงสร้างและอักขระควบคุม',
      desc: 'ความถูกต้องในการสะกดคำ สัญลักษณ์ และรูปแบบการประกาศคำสั่ง โค้ดคอมพิวเตอร์จำเป็นต้องมี Syntax ที่ถูกต้อง 100% มิฉะนั้นตัวแปลภาษาจะไม่สามารถทำงานได้และจะแสดงข้อผิดพลาดทันที',
      bugDesc: 'ลืมปิดเครื่องหมายวงเล็บปิดและเครื่องหมายคำพูด (Quote) โค้ดคอมไพล์ไม่ผ่านเกิด SyntaxError',
      wrongCode: 'print("ยินดีต้อนรับสู่ห้องเรียนครูแม็ค',
      rightCode: 'print("ยินดีต้อนรับสู่ห้องเรียนครูแม็ค")',
      solution: 'ปิดเครื่องหมายคำพูดและวงเล็บท้ายคำสั่งเพื่อให้ถูกต้องตามไวยากรณ์ภาษา Python'
    },
    2: {
      title: 'ความหมาย (Semantics) - ความถูกต้องของตรรกะการประมวลผล',
      desc: 'แม้จะเขียนโค้ดถูกต้องตามหลักไวยากรณ์และรันได้ปกติ แต่หากตรรกะเบื้องหลังผิดพลาด เช่น การใช้เครื่องหมายผิดประเภท ผลลัพธ์ที่ได้จะเพี้ยนจากความจริง ซึ่งถือเป็นข้อผิดพลาดเชิงความหมาย',
      bugDesc: 'สูตรคำนวณพื้นที่สี่เหลี่ยมผืนผ้าผิดตรรกะ โดยไปนำความกว้างมา "บวก" ความสูง แทนที่จะนำมา "คูณ"',
      wrongCode: 'width = 10\nheight = 5\narea = width + height  # ผลลัพธ์จะได้ 15 ซึ่งไม่ถูกต้อง',
      rightCode: 'width = 10\nheight = 5\narea = width * height  # คำนวณแบบคูณ ได้ผลลัพธ์เป็น 50',
      solution: 'เปลี่ยนเครื่องหมายบวก (+) เป็นเครื่องหมายคูณ (*) เพื่อให้ได้ผลตรรกะทางคณิตศาสตร์ที่แท้จริง'
    },
    3: {
      title: 'การประยุกต์ใช้งาน (Pragmatics) - ความเรียบง่ายและประสิทธิภาพ',
      desc: 'การออกแบบโปรแกรมที่ดีไม่ใช่แค่ทำงานสำเร็จตามโจทย์ แต่ต้องเขียนให้อ่านง่าย มีประสิทธิภาพสูง มีความกระชับ และไม่สิ้นเปลืองหน่วยประมวลผล CPU โดยไม่จำเป็น',
      bugDesc: 'เขียนโครงสร้างวนซ้ำ (Loop) ทำงานเพียงรอบเดียวเพื่อพิมพ์ข้อความ ซึ่งเป็นดีไซน์ที่ซับซ้อนเกินความจำเป็น',
      wrongCode: 'for i in range(1):\n    print("สวัสดีครูแม็ค")  # สิ้นเปลืองการจองหน่วยความจำลูป',
      rightCode: 'print("สวัสดีครูแม็ค")  # สั่งพิมพ์ตรงๆ ในบรรทัดเดียว รวดเร็วและคลีนกว่า',
      solution: 'ตัดโครงสร้างลูปที่ไม่จำเป็นออก เขียนคำสั่งตรงไปตรงมาเพื่อเพิ่มประสิทธิภาพการประมวลผล'
    }
  };

  const selectedC3 = c3DataMap[c3ActiveTab];

  // ==========================================
  // 4. ประวัติและวิวัฒนาการ (Horizontal Time Slider)
  // ==========================================
  const [activeEra, setActiveEra] = useState(0);

  const eras = [
    {
      eraName: 'ยุคกลไกกระดาษการ์ด (Mechanical)',
      period: 'ปี ค.ศ. 1843',
      title: 'จุดเริ่มต้นแห่งตรรกะอัลกอริทึมชิ้นแรกของโลก',
      desc: 'เอดา เลิฟเลซ เขียนขั้นตอนประมวลผลในกระดาษคำนวณเพื่อควบคุมเครื่องจักร Analytical Engine ของ Charles Babbage เปรียบเสมือนรหัสสั่งงานเชิงกลยุคบุกเบิก',
      badge: 'Ada mechanical Code',
      code: 'Operation Card 1: Multiply (v1 × v2)\nOperation Card 2: Subtract (v3 - v4)\nOperation Card 3: Store result in v5'
    },
    {
      eraName: 'ยุคภาษาเครื่อง (Machine Language)',
      period: 'ปี ค.ศ. 1940s',
      title: 'สัญญาณไฟฟ้าฐานสอง 0 และ 1',
      desc: 'การสื่อสารโดยตรงกับฮาร์ดแวร์และทรานซิสเตอร์ด้วยแรงดันไฟฟ้ารหัสเลขฐานสอง มนุษย์เข้าใจยากอย่างยิ่ง ต้องมีความแม่นยำสูงและมีความเสี่ยงผิดพลาดมากที่สุด',
      badge: '1GL Binary Code',
      code: '10110000 00001111\n00000100 00011110\n10001000 11000000'
    },
    {
      eraName: 'ยุคภาษาแอสเซมบลี (Assembly)',
      period: 'ปี ค.ศ. 1950s',
      title: 'อักษรย่อช่วยจำแทนรหัสเลขฐานสอง',
      desc: 'เริ่มใช้ตัวย่อสัญลักษณ์ภาษาอังกฤษแทนเลขฐานสอง เช่น ใช้ ADD แทนการบวก ใช้ MOV แทนการย้ายข้อมูล เพิ่มประสิทธิภาพการเขียนโค้ดได้รวดเร็วและเป็นระบบขึ้น',
      badge: '2GL Assembly Code',
      code: 'MOV AX, 15\nADD AX, 30\nMOV total, AX\nHLT'
    },
    {
      eraName: 'ยุคภาษาระดับสูงเชิงโครงสร้าง (High-Level)',
      period: 'ปี ค.ศ. 1960s - 1980s',
      title: 'ไวยากรณ์อิงภาษาอังกฤษของมนุษย์',
      desc: 'วิวัฒนาการรหัสคำสั่งเข้าใกล้ภาษาพูดของมนุษย์ มีการใช้หลักโครงสร้างเชิงคณิตศาสตร์และชุดคำสั่งในการควบคุม เช่น ภาษา Fortran, C, C++ และ Pascal',
      badge: '3GL C Structural Code',
      code: '#include <stdio.h>\nint main() {\n    int num1 = 15, num2 = 30;\n    int total = num1 + num2;\n    printf("Total: %d\\n", total);\n    return 0;\n}'
    },
    {
      eraName: 'ยุคภาษาสมัยใหม่ (Modern Languages)',
      period: 'ปี ค.ศ. 1990s - ปัจจุบัน',
      title: 'เน้นความรวดเร็ว เรียนรู้ง่าย และหลากหลาย',
      desc: 'ภาษาที่ออกแบบให้ไวยากรณ์คลีน เป็นระเบียบ ไม่ซับซ้อน เช่น Python, JavaScript, Java และ Kotlin ซึ่งสามารถพัฒนาโปรแกรมข้ามแพลตฟอร์มได้อย่างไร้รอยต่อ',
      badge: '3GL-4GL Python Code',
      code: 'num1, num2 = 15, 30\ntotal = num1 + num2\nprint(f"ผลรวมสำเร็จคือ: {total}")'
    }
  ];

  const currentEraData = eras[activeEra];

  // ==========================================
  // 5. ความสัมพันธ์ระหว่างภาษากับโปรแกรม (Visual Assembly Board)
  // ==========================================
  const [c5Blocks, setC5Blocks] = useState([]);
  const c5AvailableWords = ['input("รับค่า")', 'total = num1 + num2', 'print("คำตอบคือ")', 'while count < 5:', 'score = 80'];

  const addC5Block = (word) => {
    if (c5Blocks.includes(word)) return;
    setC5Blocks([...c5Blocks, word]);
  };

  const removeC5Block = (word) => {
    setC5Blocks(c5Blocks.filter(b => b !== word));
  };

  const clearC5Board = () => {
    setC5Blocks([]);
  };

  // ==========================================
  // 6. ความสำคัญของภาษาคอมพิวเตอร์ (Interactive Pillars)
  // ==========================================
  const [c6ActivePillar, setC6ActivePillar] = useState(null);

  const pillars = [
    {
      title: 'การสร้างตรรกะระบบคิด',
      detail: 'การเขียนโค้ดช่วยฝึกฝนให้นักเรียนคิดแก้ปัญหาแบบมีขั้นตอน ลำดับความสัมพันธ์อย่างมีเหตุผล (Computational Thinking)',
      gradient: 'from-pink-500/10 to-indigo-500/10 hover:border-pink-500/40 text-pink-700'
    },
    {
      title: 'การเชื่อมต่อสั่งงานคอมพิวเตอร์',
      detail: 'ภาษาคอมพิวเตอร์เป็นตัวกลางเดียวที่เชื่อมโยงความต้องการของมนุษย์เข้าสู่การประมวลผลของหน่วยประมวลผลไฟฟ้าที่รวดเร็ว',
      gradient: 'from-blue-500/10 to-cyan-500/10 hover:border-blue-500/40 text-blue-700'
    },
    {
      title: 'การแก้ไขวิกฤตความปลอดภัย',
      detail: 'ชุดคำสั่งที่ดีช่วยกำหนดขอบเขตสิทธิ์ ปิดช่องโหว่ความเสี่ยงการรั่วไหลของฐานข้อมูลและคัดกรองภัยคุกคามในเครือข่าย',
      gradient: 'from-amber-500/10 to-rose-500/10 hover:border-amber-500/40 text-amber-700'
    },
    {
      title: 'การพัฒนานวัตกรรมแห่งอนาคต',
      detail: 'ภาษาคอมพิวเตอร์คือกุญแจในการพัฒนาจักรกลปัญญาประดิษฐ์ (AI), ระบบคลาวด์ขนาดมหึมา, และแอปพลิเคชันที่อำนวยความสะดวกในชีวิตประจำวัน',
      gradient: 'from-purple-500/10 to-emerald-500/10 hover:border-purple-500/40 text-purple-700'
    }
  ];

  // ==========================================
  // 7. การเลือกใช้ภาษาคอมพิวเตอร์ (Matchmaking Simulator)
  // ==========================================
  const [c7Match, setC7Match] = useState({ task: null, lang: null });
  const [c7Status, setC7Status] = useState('idle'); // idle, correct, incorrect

  const c7Tasks = [
    { id: 't1', title: 'พัฒนาหุ่นยนต์ปัญญาประดิษฐ์และประมวลผลวิเคราะห์ข้อมูล (AI & Data)', match: 'Python' },
    { id: 't2', title: 'เขียนแอนิเมชันบนเว็บเบราว์เซอร์ให้ตอบสนองลื่นไหล (Frontend Web)', match: 'JavaScript' },
    { id: 't3', title: 'สร้างเกมนักรบกราฟิก 3D ขนาดใหญ่ที่ต้องการความรวดเร็วระดับวินาที (3D Game)', match: 'C++' },
    { id: 't4', title: 'พัฒนาโมบายแอปพลิเคชันระบบ iOS และหน้าจอ UI ของ Apple (iOS App)', match: 'Swift' }
  ];

  const c7Langs = ['Python', 'JavaScript', 'C++', 'Swift'];

  const checkC7Match = (task, lang) => {
    const updated = { ...c7Match };
    if (task) updated.task = task;
    if (lang) updated.lang = lang;
    
    setC7Match(updated);

    if (updated.task && updated.lang) {
      const isCorrect = updated.task.match === updated.lang;
      if (isCorrect) {
        setC7Status('correct');
      } else {
        setC7Status('incorrect');
        setTimeout(() => {
          setC7Match({ task: null, lang: null });
          setC7Status('idle');
        }, 1200);
      }
    }
  };

  const resetC7Match = () => {
    setC7Match({ task: null, lang: null });
    setC7Status('idle');
  };


  return (
    <div className="font-sans text-slate-800 pb-24 selection:bg-indigo-200 selection:text-indigo-900 relative">
      
      {/* 1️⃣ Layer 1: Ambient Backdrop & Dynamic Theme Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full bg-indigo-200/40 blur-[160px]"></div>
        <div className="absolute bottom-[15%] right-[-5%] w-[550px] h-[550px] rounded-full bg-violet-200/35 blur-[160px]"></div>
      </div>

      {/* 3️⃣ Layer 3: Flexible Subtopics & Interactives */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-6 md:space-y-8 relative z-10">

        {/* ----------------- Subtopic 1 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 shadow-inner group cursor-pointer">
              <Cpu className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ภาษาคอมพิวเตอร์ คืออะไร</h2>
              <p className="text-[15px] text-slate-500">สื่อกลางแห่งตรรกะที่คอยควบคุมระบบไฟฟ้าในเครื่องจักรให้ทำงานตามจุดประสงค์</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                มนุษย์ต้องการสั่งการให้เครื่องคอมพิวเตอร์ช่วยคิดวิเคราะห์ แก้ไขโจทย์ปัญหา หรือแสดงผลข้อมูล 
                แต่เครื่องประมวลผลอิเล็กทรอนิกส์ไม่เข้าใจคำพูดภาษาพูดตามธรรมชาติของเรา 
                เราจึงต้องส่งผ่านคำสั่งผ่าน **ภาษาคอมพิวเตอร์** ซึ่งเปรียบเสมือนตัวแปลรหัสสั่งงาน
              </p>
              
              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                  หลักการพื้นฐาน
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  รหัสคำสั่งระดับสูงที่เข้าใจง่ายจะถูกตรวจสอบไวยากรณ์ แปลงความหมาย และประมวลผลท้ายที่สุดให้ออกมาเป็นเลขฐานสอง (0 และ 1) ซึ่งแทนระดับแรงดันไฟฟ้าในบอร์ดฮาร์ดแวร์เพื่อขับเคลื่อนโปรแกรม
                </p>
              </div>
            </div>

            {/* Translation Terminal Block */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-2 right-4 text-[11px] font-mono text-zinc-500">Virtual Translation Engine</div>
              <h3 className="font-mono text-sm text-indigo-400 mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> INTERACTIVE TRANSLATOR
              </h3>
              
              <div className="flex gap-2 mb-6">
                {['greet', 'calc', 'decide'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleC1OptionChange(opt)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[13px] border cursor-pointer hover:scale-[1.02] active:scale-98 transition-all duration-200
                      ${c1Option === opt 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                  >
                    {opt === 'greet' && 'ทักทาย'}
                    {opt === 'calc' && 'คำนวณบวก'}
                    {opt === 'decide' && 'วิเคราะห์ผล'}
                  </button>
                ))}
              </div>

              <div className="space-y-4 font-mono text-[13.5px]">
                <div className={`p-3 rounded-lg bg-slate-800/50 border border-slate-700 transition-all duration-500 ${c1Pulse ? 'opacity-40 translate-x-1' : ''}`}>
                  <div className="text-zinc-500 text-[11px] mb-1">Human Intent (ภาษาพูดมนุษย์):</div>
                  <div className="text-white font-medium">{c1Data.human}</div>
                </div>

                <div className={`p-3 rounded-lg bg-slate-800/80 border border-indigo-900/30 transition-all duration-500 ${c1Pulse ? 'scale-[0.98]' : ''}`}>
                  <div className="text-indigo-400 text-[11px] mb-1">Python Syntax (ภาษาระดับสูง):</div>
                  <pre className="text-indigo-300 font-semibold leading-relaxed whitespace-pre-wrap">{c1Data.python}</pre>
                </div>

                <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20">
                  <div className="text-emerald-400 text-[11px] mb-1">Binary Code (ภาษาเครื่องในหน่วยความจำ):</div>
                  <p className="text-emerald-300 leading-relaxed select-all break-all">{c1Data.binary}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 2 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 shadow-inner group cursor-pointer">
              <Brain className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">บิดาแห่งภาษาโปรแกรมคอมพิวเตอร์</h2>
              <p className="text-[15px] text-slate-500">รำลึกผู้ริเริ่มการวางรากฐานตรรกะการประมวลผลชิ้นแรกในประวัติศาสตร์</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                แม้เครื่องจักรกลประมวลผลคำนวณชิ้นแรก (Analytical Engine) จะถูกออกแบบโดย **Charles Babbage** 
                แต่บุคคลที่ได้รับการยกย่องว่าเป็น **"โปรแกรมเมอร์คนแรกของโลก"** คือ **Ada Lovelace (เลดี้ เอดา เลิฟเลซ)**
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                เธอได้เล็งเห็นถึงความสามารถอันน่าอัศจรรย์ของเครื่องจักรนี้ว่ามันไม่เพียงแต่งานบวกเลข แต่ยังสามารถประมวลผลสัญลักษณ์ต่างๆ 
                เธอได้สร้างตรรกะขั้นตอนคำนวณกลุ่มตัวเลข **Bernoulli Numbers** บนกระดาษคำนวณ ซึ่งนับเป็นชุดโปรแกรมแรกสุดของมนุษยชาติ
              </p>
            </div>

            {/* Ada Engine Simulator (SVG gears and visual code logs) */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner flex flex-col items-center">
              <h3 className="font-semibold text-indigo-950 mb-4 text-center">จำลองการทำงานเครื่องจักร Ada Lovelace Engine</h3>
              
              <div className="relative w-64 h-32 flex justify-center items-center mb-6">
                {/* SVG Gear Left */}
                <svg
                  style={{ transform: `rotate(${gearRotation}deg)` }}
                  className="w-16 h-16 text-indigo-600 transition-transform duration-[1200ms] ease-out absolute left-8"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 10" />
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                  <path d="M 50 10 L 50 25 M 50 75 L 50 90 M 10 50 L 25 50 M 75 50 L 90 50" stroke="currentColor" strokeWidth="8" />
                </svg>

                {/* SVG Gear Middle Big */}
                <svg
                  style={{ transform: `rotate(${-gearRotation * 0.8}deg)` }}
                  className="w-24 h-24 text-zinc-400 transition-transform duration-[1200ms] ease-out absolute z-10"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="14 10" />
                  <circle cx="50" cy="50" r="15" fill="currentColor" />
                  <path d="M 50 5 L 50 20 M 50 80 L 50 95 M 5 50 L 20 50 M 80 50 L 95 50" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                </svg>

                {/* SVG Gear Right */}
                <svg
                  style={{ transform: `rotate(${gearRotation}deg)` }}
                  className="w-16 h-16 text-violet-500 transition-transform duration-[1200ms] ease-out absolute right-8"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 10" />
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                  <path d="M 50 10 L 50 25 M 50 75 L 50 90 M 10 50 L 25 50 M 75 50 L 90 50" stroke="currentColor" strokeWidth="8" />
                </svg>
              </div>

              <div className="flex gap-3 mb-4 w-full justify-center">
                <button
                  onClick={runAnalyticalEngine}
                  disabled={gearRunning}
                  className={`px-4 py-2 rounded-xl text-white font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95
                    ${gearRunning 
                      ? 'bg-zinc-400 cursor-not-allowed shadow-none' 
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg shadow-indigo-600/20'
                    }`}
                >
                  <Play className="w-4 h-4" /> ประมวลผลตรรกะ
                </button>
                <button
                  onClick={resetAnalyticalEngine}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl font-semibold flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" /> รีเซ็ต
                </button>
              </div>

              <div className="w-full bg-slate-900 rounded-xl p-4 font-mono text-[13px] border border-slate-800 min-h-[140px]">
                <div className="text-zinc-500 mb-2">// Ada Analytical Engine Output Logs</div>
                {analyticalOutput.length === 0 && (
                  <p className="text-slate-500 animate-pulse">กดปุ่ม "ประมวลผลตรรกะ" เพื่อหมุนฟันเฟืองกระดาษคำนวณ...</p>
                )}
                {analyticalOutput.map((log, i) => (
                  <div key={i} className="text-emerald-400 flex items-center gap-2 animate-fadeIn">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 3 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 shadow-inner group cursor-pointer">
              <Layers className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">องค์ประกอบของภาษาคอมพิวเตอร์</h2>
              <p className="text-[15px] text-slate-500">เสาหลักความสมบูรณ์แบบในการควบคุมการประมวลผลของโค้ดโปรแกรม</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setC3ActiveTab(num)}
                className={`p-5 rounded-2xl text-left border cursor-pointer hover:scale-[1.02] transition-all duration-300
                  ${c3ActiveTab === num 
                    ? 'bg-white border-indigo-500 shadow-lg ring-1 ring-indigo-500/20' 
                    : 'bg-white/40 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-indigo-600 font-mono">0{num}</span>
                  {c3Repaired[num] ? (
                    <span className="text-[11px] bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> ซ่อมแซมแล้ว
                    </span>
                  ) : (
                    <span className="text-[11px] bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 animate-pulse" /> มีข้อบกพร่อง
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">
                  {num === 1 && 'ไวยากรณ์ (Syntax)'}
                  {num === 2 && 'ความหมาย (Semantics)'}
                  {num === 3 && 'การประยุกต์ใช้ (Pragmatics)'}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {num === 1 && c3DataMap[1].desc}
                  {num === 2 && c3DataMap[2].desc}
                  {num === 3 && c3DataMap[3].desc}
                </p>
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            {c3Flash && <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none z-10 transition-opacity animate-pulse"></div>}
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="font-mono text-sm text-indigo-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  {selectedC3.title}
                </h3>
                <p className="text-[13px] text-zinc-400 mt-1 max-w-2xl">{selectedC3.desc}</p>
              </div>

              <div className="flex gap-2">
                {!c3Repaired[c3ActiveTab] ? (
                  <button
                    onClick={() => handleC3Repair(c3ActiveTab)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-[13px] cursor-pointer flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-600/20 transition-all active:scale-95"
                  >
                    <Zap className="w-4 h-4" /> ซ่อมแซมโค้ด
                  </button>
                ) : (
                  <button
                    onClick={() => handleC3Reset(c3ActiveTab)}
                    className="px-4 py-2 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl text-[13px] cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" /> คืนค่าเดิม
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-[13.5px]">
              <div className="space-y-2">
                <div className="text-zinc-500 text-[11px] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-pulse"></span>
                  <span>โค้ดที่มีข้อผิดพลาด (Logic/Syntax Bug):</span>
                </div>
                <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl text-rose-300 select-all min-h-[100px] leading-relaxed">
                  <pre className="whitespace-pre-wrap">{selectedC3.wrongCode}</pre>
                </div>
                <div className="text-[13px] text-rose-400/90 leading-relaxed font-sans mt-2 flex items-start gap-2">
                  <span className="font-bold">อาการ:</span>
                  <span>{selectedC3.bugDesc}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-zinc-500 text-[11px] flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span>โค้ดที่ได้รับการแก้ไขถูกต้อง (Repaired Code):</span>
                </div>
                <div className={`p-4 rounded-xl min-h-[100px] leading-relaxed transition-all duration-500
                  ${c3Repaired[c3ActiveTab] 
                    ? 'bg-emerald-950/30 border border-emerald-500/40 text-emerald-300' 
                    : 'bg-slate-800/40 border border-slate-700/60 text-slate-500/80 select-none'
                  }`}
                >
                  {c3Repaired[c3ActiveTab] ? (
                    <pre className="whitespace-pre-wrap animate-fadeIn">{selectedC3.rightCode}</pre>
                  ) : (
                    <div className="h-full flex items-center justify-center font-sans text-sm italic">
                      [ รอกดปุ่ม "ซ่อมแซมโค้ด" เพื่อแก้ไข ]
                    </div>
                  )}
                </div>
                <div className="text-[13px] text-emerald-400/90 leading-relaxed font-sans mt-2 flex items-start gap-2">
                  <span className="font-bold">แนวทาง:</span>
                  <span>{c3Repaired[c3ActiveTab] ? selectedC3.solution : 'กดซ่อมโค้ดด้านบนเพื่อศึกษาความสมเหตุสมผล...'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 4 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 shadow-inner group cursor-pointer">
              <Clock className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ประวัติและวิวัฒนาการของภาษาคอมพิวเตอร์</h2>
              <p className="text-[15px] text-slate-500">แกะรอยประวัติศาตร์การกลั่นกรองภาษาจากรหัสฐานสิบสู่ภาษาแบบวัตถุสมัยใหม่</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Custom Era Horizontal Slider */}
            <div className="flex overflow-x-auto gap-3 pb-3 pt-2 scrollbar-thin">
              {eras.map((e, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveEra(idx)}
                  className={`px-5 py-3 rounded-xl border font-semibold text-[13px] whitespace-nowrap cursor-pointer hover:scale-[1.02] transition-all duration-200
                    ${activeEra === idx 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/25' 
                      : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
                    }`}
                >
                  <div className="text-[11px] opacity-70 mb-0.5">{e.period}</div>
                  <div>{e.eraName}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-full font-bold text-xs">
                    {currentEraData.period}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">{currentEraData.title}</h3>
                  <p className="text-[16px] text-slate-600 leading-relaxed font-sans">{currentEraData.desc}</p>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-indigo-900 text-sm mb-1 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-indigo-500" />
                    ข้อสังเกตประจำยุค
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    การเปลี่ยนผ่านในแต่ละรุ่น (Generation) ส่งผลให้โค้ดโปรแกรมมีขนาดเล็กลง เข้าใจง่ายขึ้น และทำงานได้อย่างเสถียร
                  </p>
                </div>
              </div>

              {/* Code Visual display */}
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-mono text-zinc-500">{currentEraData.badge}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  </div>
                  <pre className="font-mono text-[13px] text-indigo-300 overflow-x-auto p-4 bg-slate-950/60 border border-indigo-950 rounded-xl leading-relaxed">
                    {currentEraData.code}
                  </pre>
                </div>
                <div className="text-[11px] text-zinc-500 font-mono mt-4 text-right">
                  System: Output simulated correctly.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 5 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 shadow-inner group cursor-pointer">
              <Globe className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ความสัมพันธ์ระหว่างภาษาคอมพิวเตอร์กับโปรแกรม</h2>
              <p className="text-[15px] text-slate-500">ความร่วมมือระหว่างกฎการสื่อสารและโครงสร้างจนได้ออกมาเป็นไฟล์โปรเจกต์งานสำเร็จรูป</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                เปรียบเสมือน **"ภาษาเขียน"** ที่มีอักขระ ไวยากรณ์ และพจนานุกรมคอยกำหนดขอบเขตให้เราสื่อสาร 
                ส่วน **"โปรแกรม"** คือหนังสือนวนิยายเล่มสวยงามที่เป็นผลสัมฤทธิ์สำเร็จรูปของการปะติดปะต่อกลุ่มคำเหล่านั้นเข้าด้วยกัน
              </p>
              
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                <h4 className="font-semibold text-indigo-900 text-sm mb-1.5">กระบวนการวิเคราะห์</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  ผู้เขียนโปรแกรมใช้กฎเกณฑ์ของ **ภาษาคอมพิวเตอร์** ออกแบบรหัสขึ้นมา จากนั้นนำส่งไปผ่านตัวคอมไพเลอร์เพื่อบีบอัดสร้างออกมาเป็น **ไฟล์ซอฟต์แวร์โปรแกรม (Executable file)** ที่ส่งถึงมือผู้ใช้งานทั่วไปเพื่อนำไปเปิดใช้งานได้จริง
                </p>
              </div>
            </div>

            {/* Simulated Block drag/click build program */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
              <h3 className="font-semibold text-slate-900 mb-2 text-center text-sm">แผงทดลองประกอบชุดคำสั่งเข้าสู่โปรแกรม</h3>
              <p className="text-xs text-slate-500 text-center mb-4">คลิกเลือกคำสั่งด้านล่างเพื่อนำมาต่อโครงสร้างของซอฟต์แวร์จำลอง</p>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {c5AvailableWords.map((word) => {
                  const active = c5Blocks.includes(word);
                  return (
                    <button
                      key={word}
                      disabled={active}
                      onClick={() => addC5Block(word)}
                      className={`px-3 py-1.5 rounded-lg border font-mono text-[12px] cursor-pointer transition-all active:scale-95
                        ${active 
                          ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed' 
                          : 'bg-white border-indigo-200 hover:border-indigo-500 hover:text-indigo-600 shadow-sm'
                        }`}
                    >
                      + {word}
                    </button>
                  );
                })}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 min-h-[120px] shadow-2xl relative font-mono text-[13.5px]">
                <div className="absolute top-2 right-4 text-[10px] text-indigo-400/60">Executable Code</div>
                
                {c5Blocks.length === 0 && (
                  <p className="text-zinc-500 text-center py-8 italic font-sans text-xs">
                    [ บอร์ดคำสั่งยังว่างเปล่า เลือกชุดคำสั่งด้านบน... ]
                  </p>
                )}
                
                <div className="space-y-1.5 text-indigo-300">
                  {c5Blocks.map((block) => (
                    <div 
                      key={block} 
                      onClick={() => removeC5Block(block)}
                      className="flex justify-between items-center bg-slate-800/80 border border-slate-700/50 px-3 py-1 rounded-lg cursor-pointer hover:border-rose-500 hover:text-rose-400 group transition-all"
                    >
                      <span>{block}</span>
                      <span className="text-[9px] text-zinc-500 group-hover:text-rose-500 transition-colors">คลิกเพื่อเอาออก ✕</span>
                    </div>
                  ))}
                </div>
              </div>

              {c5Blocks.length > 0 && (
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-[11px] text-slate-500 font-sans">
                    จำนวนชุดคำสั่ง: **{c5Blocks.length} บรรทัด**
                  </span>
                  <button 
                    onClick={clearC5Board}
                    className="text-xs text-rose-600 hover:underline cursor-pointer font-semibold"
                  >
                    ล้างกระดานคำสั่งทั้งหมด
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ----------------- Subtopic 6 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 shadow-inner group cursor-pointer">
              <Sliders className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">ความสำคัญของภาษาคอมพิวเตอร์ในการเขียนโปรแกรม</h2>
              <p className="text-[15px] text-slate-500">ทำความเข้าใจประโยชน์และบทบาทสำคัญสูงสุดที่ช่วยให้นวัตกรรมขับเคลื่อนได้อย่างไม่มีสะดุด</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setC6ActivePillar(idx)}
                onMouseLeave={() => setC6ActivePillar(null)}
                className={`p-6 border-2 border-dashed border-slate-200/80 rounded-2xl bg-white/40 shadow-sm cursor-pointer transition-all duration-300 flex flex-col justify-between
                  ${c6ActivePillar === idx 
                    ? 'border-indigo-500/40 bg-indigo-50/10 shadow-lg scale-[1.02]' 
                    : ''
                  }`}
              >
                <div>
                  <h3 className="font-bold text-slate-800 mb-3 text-[16px]">{p.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-sans">
                    {p.detail}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-600 font-mono">0{idx + 1} PILLAR</span>
                  <Sparkles className={`w-3.5 h-3.5 text-indigo-500 transition-all ${c6ActivePillar === idx ? 'animate-spin scale-125' : 'opacity-30'}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------- Subtopic 7 ----------------- */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 shadow-inner group cursor-pointer">
              <FileCode className="w-8 h-8 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <h2 className="text-[26px] font-semibold text-zinc-900 leading-normal">การเลือกใช้ภาษาคอมพิวเตอร์ที่เหมาะสมกับงาน</h2>
              <p className="text-[15px] text-slate-500">กฎความเหมาะสมในการใช้เครื่องมือให้ตรงประเภทเพื่อเพิ่มความเร็ว ความมั่นคง และประสิทธิภาพ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                ไม่มีภาษาคอมพิวเตอร์ใดที่ดีที่สุดในทุกมิติงาน 
                ความแตกต่างของโครงสร้างและตัวแปลภาษาของแต่ละเครื่องมือถูกออกแบบมาเพื่อความเร็วและความมั่นคงในสถานการณ์เฉพาะ
              </p>
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
                การเลือกภาษาผิดประเภท เช่น นำภาษา Swift ไปประมวลผล Big Data ขนาดใหญ่ หรือการนำ C++ ไปทำ Frontend เว็บบนเบราว์เซอร์ 
                จะทำให้เกิดความยุ่งยากสูงและโปรแกรมไร้ประสิทธิภาพสูงสุด
              </p>
            </div>

            {/* Matchmaking Simulator interface */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
              <h3 className="font-semibold text-slate-900 mb-1 text-center text-sm">เครื่องจำลองการเลือกคู่ภาษาให้เหมาะสมกับโจทย์งาน</h3>
              <p className="text-xs text-slate-500 text-center mb-6">กรุณาเลือกโจทย์งานและภาษาคอมพิวเตอร์ให้จับคู่กันอย่างถูกต้อง</p>

              <div className="space-y-4">
                {/* Task selection grid */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-indigo-900 font-sans">1. เลือกโจทย์ประเภทของงานหลัก:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {c7Tasks.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => checkC7Match(t, null)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/20 active:scale-95 transition-all
                          ${c7Match.task?.id === t.id 
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600'
                          }`}
                      >
                        {t.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language selection grid */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-indigo-900 font-sans">2. เลือกภาษาที่ต้องการนำไปประมวลผล:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {c7Langs.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => checkC7Match(null, lang)}
                        className={`p-2 rounded-xl border text-center text-xs font-bold cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/20 active:scale-95 transition-all
                          ${c7Match.lang === lang 
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600'
                          }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Match Result Display */}
                <div className="pt-4 border-t border-slate-200">
                  {c7Status === 'idle' && (
                    <div className="p-3 bg-zinc-100 border border-zinc-200 text-zinc-600 text-center rounded-xl text-xs font-sans">
                      [ กรุณากดเลือก โจทย์งาน และ ภาษาคอมพิวเตอร์ อย่างละ 1 ตัวเลือก ]
                    </div>
                  )}
                  {c7Status === 'correct' && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-700 text-center rounded-xl text-xs font-sans font-semibold flex items-center justify-center gap-2 animate-bounce">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>ถูกต้องสุดยอด! {c7Match.task?.match} มีคุณสมบัติเหมาะสมกับ {c7Match.task?.title}</span>
                    </div>
                  )}
                  {c7Status === 'incorrect' && (
                    <div className="p-3 bg-rose-50 border border-rose-300 text-rose-700 text-center rounded-xl text-xs font-sans font-semibold flex items-center justify-center gap-2 animate-shake">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>จับคู่ผิดพลาด! ตรรกะของ {c7Match.lang} ไม่เหมาะสมกับงานนี้ ลองวิเคราะห์ใหม่อีกครั้ง</span>
                    </div>
                  )}
                </div>

                {c7Status === 'correct' && (
                  <div className="text-center mt-2">
                    <button 
                      onClick={resetC7Match}
                      className="text-xs text-indigo-600 hover:underline cursor-pointer font-bold"
                    >
                      เล่นใหม่อีกรอบ
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 4️⃣ Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ใบงานปฏิบัติ: แผนตรรกะและองค์ประกอบภาษา"
          taskText={`โจทย์ปฏิบัติงานวิเคราะห์ (หน่วยที่ 1.1):
ให้นักเรียนบันทึกสรุปผลลัพธ์คำตอบทางโปรแกรมคอมพิวเตอร์ด้วยตนเอง

ข้อที่ 1: การวิเคราะห์แปลรหัสสั่งงาน
หากนักเรียนต้องการประกาศคำสั่งให้นักเรียนคำนวณ "age = 20 - 2" 
- จงเขียนแสดงคำสั่ง Python 
- และอธิบายว่าคอมพิวเตอร์จะเปลี่ยนคำสั่งนี้เป็นสัญญาณชนิดใดเพื่อให้ CPU ทำงานได้จริง

ข้อที่ 2: วินิจฉัยความผิดพลาดขององค์ประกอบภาษา
วิเคราะห์โค้ดคอมพิวเตอร์ต่อไปนี้:
x = 5
y = 0
total = x / y
- โค้ดนี้มีความสมบูรณ์ตามหลักไวยากรณ์ (Syntax) หรือไม่?
- หากสั่งประมวลผลแล้วรันจะทำให้เกิดข้อผิดพลาดใดในสามองค์ประกอบ (Syntax, Semantics, Pragmatics) พร้อมให้คำอธิบายโดยละเอียด`}
        />

      </main>
    </div>
  );
}
