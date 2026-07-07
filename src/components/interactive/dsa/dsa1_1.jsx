import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  ConceptCard,
  AmbientBackdrop
} from '../shared';
import {
  Database,
  ArrowRight,
  Play,
  RotateCcw,
  Cpu,
  Layers,
  Network,
  List,
  GitBranch,
  CheckCircle2,
  HelpCircle,
  Activity,
  Info,
  BookOpen,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

export default function DSA1_1() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA1_1_BLOBS = [
    { color: 'bg-indigo-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-blue-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-violet-200', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── 2. Data Structure Selection Lab State & Data ────────────────────────
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // scenarioId -> optionId
  const [showFeedback, setShowFeedback] = useState(false);

  const SCENARIOS = [
    {
      id: 0,
      title: "ระบบบันทึกประวัติการย้อนกลับ (Undo History)",
      desc: "ระบบต้องการบันทึกประวัติขั้นตอนการทำงานล่าสุดของโปรแกรมแต่งรูปภาพ เพื่อให้ผู้ใช้สามารถกดเลิกทำ (Undo) และดึงสถานะการทำงานล่าสุดกลับคืนมาแก้ไขต่อได้ตามลำดับย้อนหลัง",
      options: [
        { id: "array", label: "Array / List", desc: "การจองหน่วยความจำแบบต่อเนื่องเพื่อบันทึกข้อมูลเรียงต่อกัน" },
        { id: "stack", label: "Stack (สแตก)", desc: "โครงสร้างข้อมูลที่ดึงและลบข้อมูลแบบเข้าหลังออกก่อน (LIFO)" },
        { id: "queue", label: "Queue (คิว)", desc: "โครงสร้างข้อมูลที่ทำงานเรียงตามลำดับแบบเข้าก่อนออกก่อน (FIFO)" }
      ],
      correct: "stack",
      reason: "การทำระบบย้อนกลับต้องการความสามารถในการเข้าถึงขั้นตอนล่าสุดที่ผู้ใช้เพิ่งทำไปก่อนหน้า (เข้าหลังสุด) เพื่อนำมาถอนการทำงานเป็นตัวแรกสุด ซึ่งตรงตามคุณสมบัติการเข้าหลังออกก่อน (Last-In, First-Out หรือ LIFO) ของโครงสร้างข้อมูลแบบ Stack",
      bigOEasy: "O(1) - การใส่ข้อมูลล่าสุด (Push) หรือนำข้อมูลล่าสุดออก (Pop) ใช้เวลาคงที่ทันทีเสมือนการหยิบหนังสือเล่มบนสุดจากตั้งหนังสือ ไม่จำเป็นต้องค้นหาข้อมูลในตำแหน่งอื่นให้เกิด Overhead"
    },
    {
      id: 1,
      title: "ระบบคิวพิมพ์งานกลาง (Print Spooler)",
      desc: "เครื่องพิมพ์ส่วนกลางของแผนกได้รับการร้องขอพิมพ์งานจากพนักงาน 10 คนพร้อมกันจากหลายเครื่องคอมพิวเตอร์ ระบบจำเป็นต้องคัดเลือกว่าเอกสารของคนใดจะได้รับการพิมพ์ก่อนหลังตามหลักความยุติธรรม",
      options: [
        { id: "stack", label: "Stack (สแตก)", desc: "ระบบหยิบงานพิมพ์ชิ้นล่าสุดที่พนักงานเพิ่งส่งมาทำก่อน" },
        { id: "queue", label: "Queue (คิว)", desc: "ระบบเรียงแถวงานและพิมพ์งานตามลำดับการรับคำสั่งงานแรกสุดก่อน" },
        { id: "graph", label: "Graph (กราฟ)", desc: "การจองประวัติเชื่อมโยงงานในลักษณะโครงสร้างเส้นใยเครือข่าย" }
      ],
      correct: "queue",
      reason: "ลำดับการทำงานที่ยึดหลักความยุติธรรมตามเวลาการเข้ามาคือ 'ใครส่งงานเข้ามาก่อน จะต้องได้รับสิทธิ์พิมพ์ก่อน' (First-In, First-Out หรือ FIFO) ซึ่งเป็นพฤติกรรมพื้นฐานของโครงสร้างคิว (Queue)",
      bigOEasy: "O(1) - การนำงานใหม่เข้าท้ายคิว (Enqueue) และหยิบงานหน้าคิวออกไปพิมพ์ (Dequeue) ทำงานด้วยความเร็วคงที่ทันที เหมือนลูกค้าคนแรกสุดเดินเข้าหาช่องรับบริการ"
    },
    {
      id: 2,
      title: "ระบบค้นหาสมาชิกด่วนเพื่อระบุตัวตน (Contact Lookup)",
      desc: "ต้องการจองรายชื่อสมาชิกร้านค้าจำนวน 100,000 คน เมื่อสมาชิกแจ้งรหัสประจำตัวพนักงาน ระบบต้องสามารถสืบค้น ค้นหาชื่อและคะแนนสะสมออกมาได้ทันทีภายในเสี้ยววินาที",
      options: [
        { id: "array", label: "Array / List", desc: "บันทึกข้อมูลแบบเรียงแถวลำดับแล้วไล่สืบค้นทีละแถว" },
        { id: "stack", label: "Stack (สแตก)", desc: "สืบค้นได้ผ่านโหนดส่วนหัวสุดของหน่วยความจำ" },
        { id: "dict", label: "Dictionary / Hash Map", desc: "การจับคู่กุญแจสำหรับใช้เข้าถึงค่าโดยตรง (Key-Value Pair)" }
      ],
      correct: "dict",
      reason: "Dictionary หรือ Hash Map สามารถแปลงรหัสประจำตัว (Key) ไปเป็นพิกัดหน่วยความจำที่เก็บชื่อสมาชิก (Value) ได้ทันทีผ่านสมการคำนวณ Hashing ทำให้ระบบไม่ต้องเสียเวลาวนลูปค้นหาข้อมูลตัวอื่นเลย",
      bigOEasy: "O(1) - รวดเร็วคงที่ระดับเสี้ยววินาที! เสมือนการใช้เบอร์ห้องพักระบุตัวตนแขกที่เข้าพักในโรงแรมได้ทันที โดยไม่ต้องเคาะประตูเรียกถามทีละห้องตั้งแต่ชั้นแรก"
    },
    {
      id: 3,
      title: "ระบบคำนวณและแนะนำเส้นทางเดินรถ (Route Planning)",
      desc: "แอพพลิเคชันนำทางต้องการวิเคราะห์หาทางเดินรถที่สั้นที่สุดเพื่อหลีกเลี่ยงรถติด โดยมีข้อมูลถนนเชื่อมต่อ ทางแยก ทางเบี่ยง และพิกัดเมืองจำนวนมากเชื่อมโยงกัน",
      options: [
        { id: "stack", label: "Stack (สแตก)", desc: "วิเคราะห์พิกัดแผนที่แบบเข้าหลังออกก่อนตามแนวดิ่ง" },
        { id: "queue", label: "Queue (คิว)", desc: "วิเคราะห์พิกัดความต่างด้วยการสืบค้นแนวราบ" },
        { id: "graph", label: "Graph (กราฟ)", desc: "โครงสร้างแทนความสัมพันธ์ของจุดปมและเส้นเชื่อมที่เชื่อมโยงกัน" }
      ],
      correct: "graph",
      reason: "โครงสร้างข้อมูลแบบ Graph ประกอบด้วยจุดเชื่อมต่อหรือเมือง (Vertices/Nodes) และถนนหรือความสัมพันธ์ (Edges) ซึ่งเหมาะสำหรับการจำลองระบบเครือข่ายแผนที่ที่ไม่จำกัดลำดับเชิงเส้นตรง",
      bigOEasy: "O(V log V + E) - ความเร็วเชิงเวลาแปรผันตามจำนวนทางแยก (V) และถนนเชื่อม (E) ทำให้ระบบวิเคราะห์และกรองเฉพาะเส้นทางที่สั้นที่สุดได้อย่างชาญฉลาด"
    }
  ];

  const handleSelectOption = (optionId) => {
    setUserAnswers(prev => ({ ...prev, [selectedScenario]: optionId }));
    setShowFeedback(true);
  };

  // ─── 3. Visual Memory & Structure SVG Visualizer State ──────────────────
  const [activeCategory, setActiveCategory] = useState('primitive');
  const [selectedPrimitive, setSelectedPrimitive] = useState('int');
  const [linearStep, setLinearStep] = useState(-1);
  const [isLinearLooping, setIsLinearLooping] = useState(false);

  // Auto-play for Linear traversal simulation
  useEffect(() => {
    let interval;
    if (isLinearLooping) {
      interval = setInterval(() => {
        setLinearStep(prev => {
          if (prev >= 4) {
            setIsLinearLooping(false);
            return -1;
          }
          return prev + 1;
        });
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isLinearLooping]);

  const handleStartLinearTraversal = () => {
    setLinearStep(0);
    setIsLinearLooping(true);
  };

  // Non-linear interaction state
  const [selectedTreeNode, setSelectedTreeNode] = useState('root');

  const treeNodeDetails = {
    root: { name: "โหนดราก (Root Node)", desc: "โหนดจุดเริ่มต้นของโครงสร้างต้นไม้ อยู่บนสุดและไม่มีโหนดพ่อแม่" },
    left_child: { name: "โหนดลูกซ้าย (Left Child)", desc: "โหนดที่แตกกิ่งสาขาฝั่งซ้ายจากโหนดราก มีค่าคีย์ที่น้อยกว่าราก (ใน Search Tree)" },
    right_child: { name: "โหนดลูกขวา (Right Child)", desc: "โหนดที่แตกกิ่งสาขาฝั่งขวาจากโหนดราก มีค่าคีย์ที่มากกว่าราก" },
    leaf_1: { name: "โหนดใบฝั่งซ้าย (Leaf Node)", desc: "โหนดปลายสุดของกิ่งซ้ายที่ไม่มีกิ่งสาขาแยกตัวออกไปอีกแล้ว" },
    leaf_2: { name: "โหนดใบฝั่งขวา (Leaf Node)", desc: "โหนดปลายสุดของกิ่งขวา เป็นจุดสิ้นสุดของสายลำดับขั้นการสืบค้น" }
  };

  // ─── 4. Algorithm Step-by-Step Tracer State ─────────────────────────────
  const [searchTarget, setSearchTarget] = useState(23);
  const [tracerStep, setTracerStep] = useState(0);
  const [tracerState, setTracerState] = useState('idle'); // idle | running | found | not_found
  const [tracerLogs, setTracerLogs] = useState(["ระบบสแตนด์บาย รอกดปุ่มเริ่มทำงาน"]);

  const arrayData = [12, 45, 8, 23, 56, 19];

  // Logic Trace simulation steps
  const traceExecution = () => {
    if (tracerState === 'running') return;
    setTracerState('running');
    setTracerStep(0);
    setTracerLogs([`[เริ่มต้นอัลกอริทึม] ค้นหาเป้าหมาย target = ${searchTarget} ในรายการ array size = 6`]);
  };

  const handleNextTracerStep = () => {
    setTracerStep(prev => {
      const next = prev + 1;
      updateTracerLogForStep(next);
      return next;
    });
  };

  const updateTracerLogForStep = (step) => {
    const list = arrayData;
    const target = searchTarget;

    let logs = [...tracerLogs];
    
    if (target === 23) {
      switch (step) {
        case 1:
          logs.push(`บรรทัดที่ 1: วนลูปเริ่มตรวจดัชนี i = 0 (ค่าข้อมูลคือ ${list[0]})`);
          break;
        case 2:
          logs.push(`บรรทัดที่ 3: ตรวจสอบความถูกต้อง ${list[0]} == ${target} -> ผลลัพธ์: เท็จ (False)`);
          break;
        case 3:
          logs.push(`บรรทัดที่ 1: ขยับดัชนีไปที่ i = 1 (ค่าข้อมูลคือ ${list[1]})`);
          break;
        case 4:
          logs.push(`บรรทัดที่ 3: ตรวจสอบความถูกต้อง ${list[1]} == ${target} -> ผลลัพธ์: เท็จ (False)`);
          break;
        case 5:
          logs.push(`บรรทัดที่ 1: ขยับดัชนีไปที่ i = 2 (ค่าข้อมูลคือ ${list[2]})`);
          break;
        case 6:
          logs.push(`บรรทัดที่ 3: ตรวจสอบความถูกต้อง ${list[2]} == ${target} -> ผลลัพธ์: เท็จ (False)`);
          break;
        case 7:
          logs.push(`บรรทัดที่ 1: ขยับดัชนีไปที่ i = 3 (ค่าข้อมูลคือ ${list[3]})`);
          break;
        case 8:
          logs.push(`บรรทัดที่ 3: ตรวจสอบความถูกต้อง ${list[3]} == ${target} -> ผลลัพธ์: จริง (True!)`);
          break;
        case 9:
          logs.push(`บรรทัดที่ 4: คืนค่าตำแหน่งดัชนี return 3 (พบข้อมูลสำเร็จ)`);
          setTracerState('found');
          break;
        default:
          break;
      }
    } else if (target === 9) {
      switch (step) {
        case 1: logs.push(`บรรทัดที่ 1: ตรวจดัชนี i = 0 (ค่าคือ ${list[0]})`); break;
        case 2: logs.push(`บรรทัดที่ 3: ตรวจสอบ ${list[0]} == ${target} -> เท็จ`); break;
        case 3: logs.push(`บรรทัดที่ 1: ตรวจดัชนี i = 1 (ค่าคือ ${list[1]})`); break;
        case 4: logs.push(`บรรทัดที่ 3: ตรวจสอบ ${list[1]} == ${target} -> เท็จ`); break;
        case 5: logs.push(`บรรทัดที่ 1: ตรวจดัชนี i = 2 (ค่าคือ ${list[2]})`); break;
        case 6: logs.push(`บรรทัดที่ 3: ตรวจสอบ ${list[2]} == ${target} -> เท็จ`); break;
        case 7: logs.push(`บรรทัดที่ 1: ตรวจดัชนี i = 3 (ค่าคือ ${list[3]})`); break;
        case 8: logs.push(`บรรทัดที่ 3: ตรวจสอบ ${list[3]} == ${target} -> เท็จ`); break;
        case 9: logs.push(`บรรทัดที่ 1: ตรวจดัชนี i = 4 (ค่าคือ ${list[4]})`); break;
        case 10: logs.push(`บรรทัดที่ 3: ตรวจสอบ ${list[4]} == ${target} -> เท็จ`); break;
        case 11: logs.push(`บรรทัดที่ 1: ตรวจดัชนี i = 5 (ค่าคือ ${list[5]})`); break;
        case 12: logs.push(`บรรทัดที่ 3: ตรวจสอบ ${list[5]} == ${target} -> เท็จ`); break;
        case 13:
          logs.push(`บรรทัดที่ 5: วนลูปจนจบรายการแล้วไม่พบข้อมูล ส่งค่าคืน return -1`);
          setTracerState('not_found');
          break;
        default:
          break;
      }
    }
    setTracerLogs(logs);
  };

  const resetTracer = () => {
    setTracerStep(0);
    setTracerState('idle');
    setTracerLogs(["ระบบสแตนด์บาย รอกดปุ่มเริ่มทำงาน"]);
  };

  const getHighlightedLine = () => {
    if (tracerState === 'idle') return -1;
    
    if (searchTarget === 23) {
      if (tracerStep === 0) return 0;
      if ([1, 3, 5, 7].includes(tracerStep)) return 1;
      if ([2, 4, 6, 8].includes(tracerStep)) return 2;
      if (tracerStep === 9) return 3;
    } else {
      if (tracerStep === 0) return 0;
      if ([1, 3, 5, 7, 9, 11].includes(tracerStep)) return 1;
      if ([2, 4, 6, 8, 10, 12].includes(tracerStep)) return 2;
      if (tracerStep === 13) return 4;
    }
    return -1;
  };

  const getLinearTracerActiveIndex = () => {
    if (tracerState === 'idle') return -1;
    if (searchTarget === 23) {
      if (tracerStep === 1 || tracerStep === 2) return 0;
      if (tracerStep === 3 || tracerStep === 4) return 1;
      if (tracerStep === 5 || tracerStep === 6) return 2;
      if (tracerStep === 7 || tracerStep === 8 || tracerStep === 9) return 3;
    } else {
      if (tracerStep === 1 || tracerStep === 2) return 0;
      if (tracerStep === 3 || tracerStep === 4) return 1;
      if (tracerStep === 5 || tracerStep === 6) return 2;
      if (tracerStep === 7 || tracerStep === 8) return 3;
      if (tracerStep === 9 || tracerStep === 10) return 4;
      if (tracerStep === 11 || tracerStep === 12 || tracerStep === 13) return 5;
    }
    return -1;
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_1_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Introduction to Data Structures ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ความหมายและความสำคัญ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทำความเข้าใจว่าโครงสร้างข้อมูลคืออะไร
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ในโลกของการเขียนโปรแกรม คอมพิวเตอร์ไม่ได้ทำงานเพียงแค่บวกหรือลบตัวเลขเท่านั้น แต่ต้องเก็บและจัดการข้อมูลจำนวนมหาศาลอย่างมีประสิทธิภาพ 
              <strong className="mx-1 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[14px]">โครงสร้างข้อมูล (Data Structure)</strong> 
              คือ รูปแบบการจัดระเบียบ การจัดเก็บ และการเข้าถึงข้อมูลในหน่วยความจำของคอมพิวเตอร์ เพื่อให้เราสามารถประมวลผลข้อมูลเหล่านั้นได้อย่างรวดเร็วและใช้ทรัพยากรระบบน้อยที่สุด
            </p>

            {/* Easy Big O Explanation Callout */}
            <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-5 border-l-[3.5px] border-l-indigo-500 leading-relaxed">
              <h4 className="font-bold text-indigo-900 text-[16px] mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-600" />
                เคล็ดลับความรู้: การวัดความเร็วทางคอมพิวเตอร์ด้วย Big O
              </h4>
              <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
                ในการเลือกโครงสร้างข้อมูล เรามักจะวัดความเหมาะสมและความรวดเร็วในการประมวลผลด้วยสัญกรณ์ <strong className="text-indigo-700 font-mono">Big O Notation</strong> ซึ่งเปรียบเปรยให้เข้าใจง่ายๆ ได้ดังนี้:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/80 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
                  <span className="font-mono text-sm font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded">O(1)</span>
                  <div>
                    <h5 className="text-[13.5px] font-bold text-slate-800">เร็วคงที่ทันที (Constant Time)</h5>
                    <p className="text-[13px] text-slate-500">เปรียบเหมือนการหยิบสมาร์ทโฟนขึ้นมาจากกระเป๋ากางเกงของคุณเอง หยิบได้ทันทีไม่ว่าจะผ่านไปกี่ปีหรือมีคนในโลกนี้กี่ล้านคน</p>
                  </div>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
                  <span className="font-mono text-sm font-bold text-sky-600 px-2 py-0.5 bg-sky-50 rounded">O(log n)</span>
                  <div>
                    <h5 className="text-[13.5px] font-bold text-slate-800">แบ่งครึ่งค้นหาอย่างรวดเร็ว (Logarithmic Time)</h5>
                    <p className="text-[13px] text-slate-500">เปรียบเหมือนการเปิดหาคำศัพท์ในพจนานุกรมเล่มหนาด้วยการเปิดหน้ากึ่งกลางแล้วแบ่งครึ่งซ้ายขวาไปเรื่อยๆ ค้นหาสำเร็จอย่างรวดเร็ว</p>
                  </div>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
                  <span className="font-mono text-sm font-bold text-amber-600 px-2 py-0.5 bg-amber-50 rounded font-bold">O(n)</span>
                  <div>
                    <h5 className="text-[13.5px] font-bold text-slate-800">ไล่หาตามจำนวนข้อมูล (Linear Time)</h5>
                    <p className="text-[13px] text-slate-500">เปรียบเหมือนการเดินค้นหาตำแหน่งห้องว่างในหอพักทีละห้องตั้งแต่ประตูแรกสุดจนถึงประตูสุดท้าย เสียเวลาเพิ่มตามจำนวนห้อง</p>
                  </div>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-slate-100 flex items-start gap-3">
                  <span className="font-mono text-sm font-bold text-rose-500 px-2 py-0.5 bg-rose-50 rounded font-bold">O(n²)</span>
                  <div>
                    <h5 className="text-[13.5px] font-bold text-slate-800">เทียบทีละคู่ซ้ำๆ (Quadratic Time)</h5>
                    <p className="text-[13px] text-slate-500">เปรียบเหมือนการพาทุกคนในปาร์ตี้เดินแนะนำตัวแบบจับคู่เช็คชื่อกันเองแบบจับคู่ทีละสองคนจนครบทุกคน ใช้เวลานานมากหากมีคนเยอะ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Lab: Data Structure Selection */}
          <div className="pt-4">
            <h4 className="text-[18px] font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              ห้องทดลองวิเคราะห์: เลือกเครื่องมือเก็บข้อมูลให้เหมาะกับงาน
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Scenarios tab selection */}
              <div className="lg:col-span-4 flex flex-col gap-2.5">
                {SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenario(sc.id);
                      setShowFeedback(false);
                    }}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex items-start gap-3.5 group
                      ${selectedScenario === sc.id
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/15'
                        : 'bg-white/60 backdrop-blur-xl border-white/40 shadow-sm text-slate-600 hover:bg-white hover:border-indigo-300'
                      }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105
                      ${selectedScenario === sc.id ? 'bg-indigo-700 text-white' : ''}
                      ${selectedScenario !== sc.id ? 'bg-slate-100 text-slate-605' : ''}`}>
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className={`font-bold text-[14px] leading-snug mb-0.5 ${selectedScenario === sc.id ? 'text-white' : 'text-slate-800'}`}>
                        {sc.title}
                      </h5>
                      <span className={`text-[12px] ${selectedScenario === sc.id ? 'text-indigo-200' : 'text-slate-450'}`}>
                        ความซับซ้อนเชิงโจทย์แบบที่ {sc.id + 1}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Scenario details & choices */}
              <div className="lg:col-span-8 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-indigo-600 font-bold tracking-wider mb-3">
                    <span>CASE ANALYSIS</span>
                    <span>SCENARIO STUDY</span>
                  </div>

                  <h4 className="text-[20px] font-bold text-slate-800 mb-2">
                    {SCENARIOS[selectedScenario].title}
                  </h4>
                  <p className="text-[14.5px] text-slate-600 leading-relaxed mb-6">
                    {SCENARIOS[selectedScenario].desc}
                  </p>

                  {/* Options Selector Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {SCENARIOS[selectedScenario].options.map((opt) => {
                      const isSelected = userAnswers[selectedScenario] === opt.id;
                      const isCorrect = opt.id === SCENARIOS[selectedScenario].correct;
                      
                      let btnBorder = 'border-slate-200 hover:border-indigo-300';
                      let btnBg = 'bg-white';
                      let btnTextColor = 'text-slate-700';
                      
                      if (showFeedback && isSelected) {
                        if (isCorrect) {
                          btnBorder = 'border-emerald-500 ring-2 ring-emerald-500/20';
                          btnBg = 'bg-emerald-50/50';
                          btnTextColor = 'text-emerald-950';
                        } else {
                          btnBorder = 'border-rose-500 ring-2 ring-rose-500/20';
                          btnBg = 'bg-rose-50/50';
                          btnTextColor = 'text-rose-950';
                        }
                      } else if (isSelected) {
                        btnBorder = 'border-indigo-500';
                        btnBg = 'bg-indigo-50/30';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(opt.id)}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[110px]
                            ${btnBg} ${btnBorder} ${btnTextColor}`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <span className="font-bold text-[14px] leading-tight">{opt.label}</span>
                            {showFeedback && isSelected && (
                              isCorrect ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-rose-500" />
                            )}
                          </div>
                          <p className="text-[11.5px] text-slate-400 leading-snug mt-2">{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback area */}
                {showFeedback && (
                  <div className={`p-4 rounded-2xl border transition-all duration-300 animate-fadeIn
                    ${userAnswers[selectedScenario] === SCENARIOS[selectedScenario].correct
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/60 border-rose-200 text-rose-950'
                    }`}>
                    <div className="flex items-start gap-3">
                      {userAnswers[selectedScenario] === SCENARIOS[selectedScenario].correct ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h5 className="font-bold text-[14px] leading-tight mb-1 text-slate-800">
                          {userAnswers[selectedScenario] === SCENARIOS[selectedScenario].correct ? 'คำตอบถูกต้อง!' : 'ยังไม่ถูกต้อง ลองพิจารณาหลักการดูอีกครั้ง'}
                        </h5>
                        <p className="text-[13px] leading-relaxed mb-2 opacity-90">
                          {SCENARIOS[selectedScenario].reason}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/80 border border-slate-100 font-mono text-[12px] font-bold text-indigo-700">
                          <span>ความเร็วประมวลผลจริง:</span>
                          <span>{SCENARIOS[selectedScenario].bigOEasy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* ─── Section 2: Types of Data Structures ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ประเภทของโครงสร้างข้อมูล
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การแบ่งประเภทและลักษณะโครงสร้าง
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visualizer Selector and explanation (Left) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
                  ในการทำงานจริง เราจะจัดแบ่งโครงสร้างข้อมูลออกเป็น 3 ระดับประเภทหลักๆ เพื่อการแบ่งหมวดหน่วยความจำและการเขียนโค้ดสืบค้นที่ชัดเจน:
                </p>

                <div className="flex flex-col gap-2.5">
                  {[
                    { id: 'primitive', label: 'ข้อมูลแบบพื้นฐาน (Primitive)', desc: 'ชนิดข้อมูลเดี่ยวๆ ที่ระบบคอมพิวเตอร์สนับสนุนในระดับฮาร์ดแวร์เก็บค่าตรงๆ' },
                    { id: 'linear', label: 'โครงสร้างแบบเชิงเส้น (Linear)', desc: 'จัดเก็บเรียงเป็นสายเส้นตรง เข้าถึงตัวถัดไปในลักษณะลำดับต่อเนื่องกัน' },
                    { id: 'nonlinear', label: 'โครงสร้างแบบไม่เชิงเส้น (Non-Linear)', desc: 'เก็บความสัมพันธ์แบบโครงข่ายเชื่อมโยง แตกแขนงลำดับขั้นหรือจุดเชื่อมอิสระ' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setLinearStep(-1);
                        setIsLinearLooping(false);
                      }}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200
                        ${activeCategory === cat.id
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-900 ring-2 ring-indigo-300/10'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      <h5 className="font-bold text-[14px] mb-0.5">{cat.label}</h5>
                      <p className="text-[12px] text-slate-400 leading-snug">{cat.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic details for the selected category */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                {activeCategory === 'primitive' && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Primitive Data Types Selection:</span>
                    <div className="flex gap-2">
                      {[
                        { id: 'int', label: 'Integer (เลขจำนวนเต็ม)', spec: 'จองเนื้อที่ 4 Bytes (32 bits)' },
                        { id: 'float', label: 'Float (เลขทศนิยม)', spec: 'จองเนื้อที่ 4 Bytes สำหรับจัดเก็บทศนิยม' },
                        { id: 'bool', label: 'Boolean (ค่าตรรกะ)', spec: 'จองเนื้อที่ 1 Byte สำหรับเก็บค่า True หรือ False' }
                      ].map((pOpt) => (
                        <button
                          key={pOpt.id}
                          onClick={() => setSelectedPrimitive(pOpt.id)}
                          className={`px-3 py-1.5 rounded-lg text-[12px] font-bold cursor-pointer transition-all duration-200
                            ${selectedPrimitive === pOpt.id
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-800'
                            }`}
                        >
                          {pOpt.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      {selectedPrimitive === 'int' && 'เลขจำนวนเต็ม (Integer) เช่น 25 จะถูกแปลงและเก็บบนสแต็คหน่วยความจำในรูปแบบเลขฐานสองขนาด 32 บิตโดยตรง'}
                      {selectedPrimitive === 'float' && 'ทศนิยม (Float) เช่น 3.85 จะจัดเก็บโดยมีโครงสร้างแบ่งเป็น Sign Bit, Exponent และ Fraction ตามมาตรฐาน IEEE 754'}
                      {selectedPrimitive === 'bool' && 'บูลีน (Boolean) เช่น True จะจองหน่วยความจำขนาดเล็กที่สุด (1 Byte) โดยมีบิตค่า 1 หมายถึงจริง และ 0 หมายถึงเท็จ'}
                    </p>
                  </div>
                )}

                {activeCategory === 'linear' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Linear Traversal Control:</span>
                      <button
                        onClick={handleStartLinearTraversal}
                        disabled={isLinearLooping}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                      >
                        <Play className="w-3.5 h-3.5" /> จำลองการท่องผ่าน
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      การสืบค้นข้อมูลเชิงเส้น (Linear Array) จำเป็นต้องไล่พิกัดอ่านค่าเรียงตามลำดับดัชนี (Sequential) 0 → 1 → 2 → 3 
                      โดยดัชนีปัจจุบันที่กำลังอ่านคือ: <span className="font-mono font-bold text-indigo-600">{linearStep !== -1 ? `ดัชนีที่ ${linearStep}` : 'ยังไม่เริ่ม'}</span>
                    </p>
                  </div>
                )}

                {activeCategory === 'nonlinear' && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">รายละเอียดโหนดที่เลือก (Click Node in SVG):</span>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200/50">
                      <h6 className="font-bold text-[13px] text-slate-800">{treeNodeDetails[selectedTreeNode].name}</h6>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{treeNodeDetails[selectedTreeNode].desc}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Screen: SVG Visualizer Panel */}
            <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl border border-white/5 shadow-2xl rounded-3xl p-6 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-b border-slate-800 pb-2 mb-4">
                  <span># PHYSICAL MEMORY & STRUCTURE PREVIEW</span>
                  <span className="text-indigo-400 font-bold uppercase">{activeCategory} mode active</span>
                </div>

                <div className="relative w-full h-[280px] flex items-center justify-center bg-black/40 border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
                  
                  {/* Category 1: Primitive Memory Cells */}
                  {activeCategory === 'primitive' && (
                    <div className="grid grid-cols-4 gap-3 p-4 w-full max-w-[360px]">
                      {[
                        { addr: '0x1000', label: 'Byte 0', val: selectedPrimitive === 'int' ? '00000000' : selectedPrimitive === 'bool' ? '00000001' : '01000000' },
                        { addr: '0x1001', label: 'Byte 1', val: selectedPrimitive === 'int' ? '00000000' : selectedPrimitive === 'bool' ? '--------' : '01110110' },
                        { addr: '0x1002', label: 'Byte 2', val: selectedPrimitive === 'int' ? '00000000' : selectedPrimitive === 'bool' ? '--------' : '01100110' },
                        { addr: '0x1003', label: 'Byte 3', val: selectedPrimitive === 'int' ? '00011001' : selectedPrimitive === 'bool' ? '--------' : '01100110' }
                      ].map((cell, idx) => {
                        const isHighlighted = selectedPrimitive === 'int' || (selectedPrimitive === 'bool' && idx === 0) || selectedPrimitive === 'float';
                        
                        let colorClass = 'border-slate-800 text-slate-500 bg-slate-900/40';
                        if (isHighlighted) {
                          if (selectedPrimitive === 'int') colorClass = 'border-cyan-500 text-cyan-300 bg-cyan-950/40';
                          if (selectedPrimitive === 'float') colorClass = 'border-emerald-500 text-emerald-300 bg-emerald-950/40';
                          if (selectedPrimitive === 'bool') colorClass = 'border-amber-500 text-amber-300 bg-amber-950/40';
                        }

                        return (
                          <div
                            key={idx}
                            className={`border rounded-xl p-2.5 flex flex-col justify-between items-center transition-all duration-300 min-h-[90px]
                              ${colorClass}`}
                          >
                            <span className="text-[10px] font-mono opacity-60">{cell.addr}</span>
                            <span className="font-mono font-bold text-xs mt-1.5">{cell.val}</span>
                            <span className="text-[9px] mt-1 tracking-wider uppercase opacity-50">{cell.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Category 2: Linear Sequential Traversal (Array) */}
                  {activeCategory === 'linear' && (
                    <div className="flex flex-col items-center gap-6 w-full px-8">
                      {/* Array Container */}
                      <div className="flex gap-2.5 w-full justify-center">
                        {[15, 32, 8, 97, 44].map((val, idx) => {
                          const isActive = idx === linearStep;
                          const isVisited = idx < linearStep;
                          
                          let cellClass = 'border-slate-800 text-slate-500 bg-slate-900/30';
                          if (isActive) {
                            cellClass = 'border-indigo-500 text-white bg-indigo-950/80 scale-105 shadow-[0_0_15px_rgba(79,70,229,0.4)]';
                          } else if (isVisited) {
                            cellClass = 'border-indigo-800/60 text-indigo-400 bg-indigo-950/20';
                          }

                          return (
                            <div
                              key={idx}
                              className={`border rounded-xl p-3 flex flex-col items-center justify-between min-w-[55px] min-h-[75px] transition-all duration-300
                                ${cellClass}`}
                            >
                              <span className="text-[9px] font-mono text-zinc-500">[{idx}]</span>
                              <span className="font-mono font-bold text-sm">{val}</span>
                              <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isActive ? 'bg-indigo-400 animate-pulse' : 'bg-transparent'}`} />
                            </div>
                          );
                        })}
                      </div>

                      {/* Connector Line using SVG */}
                      <svg className="w-full h-16 pointer-events-none">
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#4F46E5" />
                          </marker>
                        </defs>
                        <g fill="none" strokeWidth="2.5">
                          <path d="M 90 20 H 330" stroke="#1e293b" />
                          {linearStep > 0 && (
                            <path
                              d={`M 90 20 H ${90 + linearStep * 60}`}
                              stroke="#4F46E5"
                              strokeDasharray="4 3"
                              className="animate-dashFlow"
                              markerEnd="url(#arrow)"
                            />
                          )}
                        </g>
                        <text x="50%" y="48" fill="#475569" textAnchor="middle" className="text-[11px] font-semibold tracking-wider font-mono">
                          SEQUENTIAL MEMORY POINTER
                        </text>
                      </svg>
                    </div>
                  )}

                  {/* Category 3: Non-Linear Hierarchical Relationships (Tree) */}
                  {activeCategory === 'nonlinear' && (
                    <svg className="absolute inset-0 w-full h-full p-4 select-none">
                      <defs>
                        <marker id="tree-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
                        </marker>
                      </defs>

                      {/* Connections starting exactly at geometric center coords */}
                      <g stroke="#334155" strokeWidth="2.5" fill="none">
                        {/* Root to Left Child */}
                        <line x1="200" y1="40" x2="110" y2="120" stroke={selectedTreeNode === 'left_child' || selectedTreeNode === 'leaf_1' || selectedTreeNode === 'leaf_2' ? '#4f46ee' : '#334155'} />
                        {/* Root to Right Child */}
                        <line x1="200" y1="40" x2="290" y2="120" stroke={selectedTreeNode === 'right_child' ? '#4f46ee' : '#334155'} />
                        
                        {/* Left Child to Leaf 1 */}
                        <line x1="110" y1="120" x2="65" y2="200" stroke={selectedTreeNode === 'leaf_1' ? '#4f46ee' : '#334155'} />
                        {/* Left Child to Leaf 2 */}
                        <line x1="110" y1="120" x2="155" y2="200" stroke={selectedTreeNode === 'leaf_2' ? '#4f46ee' : '#334155'} />
                      </g>

                      {/* Nodes */}
                      {/* Root Node */}
                      <g className="cursor-pointer" onClick={() => setSelectedTreeNode('root')}>
                        <circle cx="200" cy="40" r="20" fill={selectedTreeNode === 'root' ? '#1e1b4b' : '#0f172a'} stroke={selectedTreeNode === 'root' ? '#4f46e5' : '#475569'} strokeWidth="2.5" />
                        <text x="200" y="44" fill={selectedTreeNode === 'root' ? '#818cf8' : '#94a3b8'} textAnchor="middle" className="font-bold text-xs font-mono">ราก</text>
                      </g>

                      {/* Left Child */}
                      <g className="cursor-pointer" onClick={() => setSelectedTreeNode('left_child')}>
                        <circle cx="110" cy="120" r="20" fill={selectedTreeNode === 'left_child' ? '#1e1b4b' : '#0f172a'} stroke={selectedTreeNode === 'left_child' ? '#4f46e5' : '#475569'} strokeWidth="2.5" />
                        <text x="110" y="124" fill={selectedTreeNode === 'left_child' ? '#818cf8' : '#94a3b8'} textAnchor="middle" className="font-bold text-xs font-mono">กิ่งซ้าย</text>
                      </g>

                      {/* Right Child */}
                      <g className="cursor-pointer" onClick={() => setSelectedTreeNode('right_child')}>
                        <circle cx="290" cy="120" r="20" fill={selectedTreeNode === 'right_child' ? '#1e1b4b' : '#0f172a'} stroke={selectedTreeNode === 'right_child' ? '#4f46e5' : '#475569'} strokeWidth="2.5" />
                        <text x="290" y="124" fill={selectedTreeNode === 'right_child' ? '#818cf8' : '#94a3b8'} textAnchor="middle" className="font-bold text-xs font-mono">กิ่งขวา</text>
                      </g>

                      {/* Leaf 1 */}
                      <g className="cursor-pointer" onClick={() => setSelectedTreeNode('leaf_1')}>
                        <circle cx="65" cy="200" r="18" fill={selectedTreeNode === 'leaf_1' ? '#1e1b4b' : '#0f172a'} stroke={selectedTreeNode === 'leaf_1' ? '#4f46e5' : '#475569'} strokeWidth="2" />
                        <text x="65" y="204" fill={selectedTreeNode === 'leaf_1' ? '#818cf8' : '#94a3b8'} textAnchor="middle" className="font-bold text-[10px] font-mono">ใบ 1</text>
                      </g>

                      {/* Leaf 2 */}
                      <g className="cursor-pointer" onClick={() => setSelectedTreeNode('leaf_2')}>
                        <circle cx="155" cy="200" r="18" fill={selectedTreeNode === 'leaf_2' ? '#1e1b4b' : '#0f172a'} stroke={selectedTreeNode === 'leaf_2' ? '#4f46e5' : '#475569'} strokeWidth="2" />
                        <text x="155" y="204" fill={selectedTreeNode === 'leaf_2' ? '#818cf8' : '#94a3b8'} textAnchor="middle" className="font-bold text-[10px] font-mono">ใบ 2</text>
                      </g>

                      <text x="200" y="260" fill="#475569" textAnchor="middle" className="text-[11px] font-bold font-mono tracking-wider">
                        NON-LINEAR HIERARCHICAL BRANCHING (TREE)
                      </text>
                    </svg>
                  )}

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Section 3: Definition and Properties of Algorithms ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              นิยามและคุณสมบัติของอัลกอริทึม
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ขั้นตอนวิธีและคุณสมบัติทางวิชาการ
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            การเลือกโครงสร้างข้อมูลต้องทำควบคู่กับ **"อัลกอริทึม (Algorithm)"** หรือขั้นตอนการทำงานที่เป็นระบบชัดเจนเพื่อประมวลผลข้อมูลเหล่านั้น 
            อัลกอริทึมที่ดีจะต้องได้รับการรับรองมาตรฐานการทำงานผ่านคุณสมบัติบังคับทางวิศวกรรมคอมพิวเตอร์สากล 5 ประการดังนี้:
          </p>

          {/* Grid properties */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { title: "มีจุดสิ้นสุด (Finiteness)", desc: "อัลกอริทึมต้องมีการทำงานที่มีจำนวนขั้นตอนจำกัดและหยุดรันได้ในเวลาที่เหมาะสม ไม่วนรอบลูปไม่รู้จบ" },
              { title: "ความชัดเจน (Definiteness)", desc: "ทุกขั้นตอนและทุกรหัสชุดคำสั่งต้องมีความชัดเจนตรงไปตรงมา ไม่มีความคลุมเครือให้แปรผลลัพธ์เป็นอื่นได้" },
              { title: "มีข้อมูลเข้า (Input)", desc: "ต้องรองรับการป้อนข้อมูลเข้ามาประมวลผลตั้งแต่ศูนย์ตัวหรือมากกว่า เพื่อนำไปผ่านขั้นตอนสืบค้นวิเคราะห์ต่อไป" },
              { title: "มีผลลัพธ์ (Output)", desc: "ต้องส่งผลลัพธ์การประมวลผลกลับออกมาอย่างน้อย 1 ผลลัพธ์ เพื่อยืนยันว่าการแก้ไขปัญหานั้นได้ผลสัมฤทธิ์จริง" },
              { title: "มีประสิทธิผล (Effectiveness)", desc: "ขั้นตอนการทำงานมีความเป็นไปได้จริง ทุกคำสั่งพื้นฐานเพียงพอที่จะเขียนทำงานได้ด้วยมือหรือคอมพิวเตอร์" }
            ].map((prop, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-xs font-bold text-indigo-500 font-mono tracking-wider block mb-1">PROPERTIES {idx + 1}</span>
                <h4 className="font-bold text-slate-800 text-[14.5px] leading-tight mb-2">{prop.title}</h4>
                <p className="text-[12.5px] text-slate-500 leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>

          {/* Tracer Simulator */}
          <div className="pt-4">
            <h4 className="text-[18px] font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600 animate-pulse" />
              ห้องทดลองวิเคราะห์: อัลกอริทึมจำลองการทำงานของ Linear Search
            </h4>
            <p className="text-[14.5px] text-slate-600 leading-relaxed mb-4">
              ทดลองสืบค้นข้อมูลเชิงเส้นโดยการสุ่มตั้งเป้าหมายแล้วสั่งรันเครื่องจำลองเพื่อสังเกตพฤติกรรมความชัดเจนและจุดสิ้นสุดของอัลกอริทึมทีละขั้นตอน:
            </p>

            <SimulatorShell
              dark
              title="Algorithm Trace Simulator (Linear Search)"
              icon={<Cpu className="w-7 h-7 text-indigo-400" />}
              glowColors="from-zinc-900/30 to-zinc-950/10"
              iconColor="text-indigo-400"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mt-3 select-none">
                
                {/* Control Panel (Left) */}
                <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[390px]">
                  <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                    TRACER CONTROLS
                  </div>

                  <div className="space-y-5">
                    {/* Select Search Target */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">1. เลือกเป้าหมายค้นหา (Target):</span>
                      <div className="flex gap-2">
                        {[23, 9].map((val) => (
                          <button
                            key={val}
                            onClick={() => {
                              setSearchTarget(val);
                              resetTracer();
                            }}
                            disabled={tracerState === 'running'}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all disabled:opacity-40
                              ${searchTarget === val
                                ? 'bg-indigo-600 text-white shadow shadow-indigo-600/20'
                                : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white'
                              }`}
                          >
                            {val} {val === 23 ? '(พบแน่ในดัชนี 3)' : '(ไม่พบในดัชนี)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pseudocode Screen */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">2. รหัสเทียม (Pseudocode Tracer):</span>
                      <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl font-mono text-[12.5px] leading-relaxed text-slate-300">
                        {[
                          "def linear_search(numbers, target):",
                          "    for index in range(len(numbers)):",
                          "        current = numbers[index]",
                          "        if current == target:",
                          "            return index",
                          "    return -1"
                        ].map((line, idx) => {
                          const isActive = idx === getHighlightedLine();
                          return (
                            <div
                              key={idx}
                              className={`px-2 py-0.5 rounded transition-colors duration-200
                                ${isActive ? 'bg-indigo-900 text-white font-bold border-l-2 border-indigo-400' : 'opacity-70'}`}
                            >
                              <span className="text-slate-600 text-[10px] inline-block w-4 mr-2 text-right">{idx + 1}</span>
                              <code>{line}</code>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Tracer state buttons */}
                  <div className="mt-6 pt-3 border-t border-slate-800/80 space-y-3">
                    <div className="flex gap-3">
                      {tracerState === 'idle' ? (
                        <button
                          onClick={traceExecution}
                          className="grow bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-all active:scale-[0.98]"
                        >
                          <Play className="w-4 h-4" /> เริ่มรันบอร์ดจำลอง
                        </button>
                      ) : (
                        <button
                          onClick={handleNextTracerStep}
                          disabled={tracerState === 'found' || tracerState === 'not_found'}
                          className="grow bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-4 h-4" /> ขั้นตอนถัดไป
                        </button>
                      )}

                      <button
                        onClick={resetTracer}
                        className="px-3.5 py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                      >
                        <RotateCcw className="w-4 h-4" /> รีเซ็ต
                      </button>
                    </div>

                    {/* Simple status badge */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 bg-black/30 p-1.5 rounded-lg border border-slate-900">
                      <span>STATUS: <strong className={`font-bold ${tracerState === 'found' ? 'text-emerald-400' : tracerState === 'not_found' ? 'text-rose-400' : 'text-cyan-400'}`}>{tracerState.toUpperCase()}</strong></span>
                      <span>STEP: {tracerStep}</span>
                    </div>
                  </div>
                </div>

                {/* Visual Data Monitor & Output Logs (Right) */}
                <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[390px]">
                  <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                    ALGORITHM MEMORY MONITOR
                  </div>

                  <div className="space-y-6 mt-4 grow flex flex-col justify-between">
                    
                    {/* Visual Array Grid */}
                    <div className="space-y-2.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">โครงสร้าง Array บนหน่วยความจำ:</span>
                      
                      <div className="flex gap-2 justify-center py-4 bg-slate-900/40 border border-slate-900/60 rounded-xl">
                        {arrayData.map((val, idx) => {
                          const isCurrent = idx === getLinearTracerActiveIndex();
                          const isMatch = isCurrent && val === searchTarget;
                          const isChecked = idx < getLinearTracerActiveIndex();
                          
                          let cellClass = 'border-slate-800 text-slate-500 bg-slate-950/30';
                          if (isMatch) {
                            cellClass = 'border-emerald-500 text-white bg-emerald-950/90 scale-105 shadow-[0_0_15px_rgba(34,197,94,0.4)]';
                          } else if (isCurrent) {
                            cellClass = 'border-amber-500 text-white bg-amber-950/80 scale-105 shadow-[0_0_12px_rgba(245,158,11,0.4)]';
                          } else if (isChecked) {
                            cellClass = 'border-rose-950/60 text-rose-500/80 bg-rose-950/10 opacity-60';
                          }

                          return (
                            <div
                              key={idx}
                              className={`border rounded-xl p-3 flex flex-col items-center justify-between min-w-[50px] min-h-[70px] transition-all duration-300
                                ${cellClass}`}
                            >
                              <span className="text-[9px] font-mono text-zinc-600">[{idx}]</span>
                              <span className="font-mono font-bold text-sm">{val}</span>
                              <div className={`w-1.5 h-1.5 rounded-full mt-1 
                                ${isMatch ? 'bg-emerald-400' : isCurrent ? 'bg-amber-400 animate-ping' : 'bg-transparent'}`} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Output logs */}
                    <div className="bg-black/60 p-3.5 rounded-xl border border-slate-950 min-h-[120px] font-mono text-[12px] leading-relaxed text-emerald-400 overflow-y-auto max-h-[160px]">
                      <div className="text-zinc-500 border-b border-slate-900 pb-1 mb-2 uppercase tracking-wide text-[9.5px] font-bold">Trace Console Output:</div>
                      {tracerLogs.map((log, idx) => (
                        <div key={idx} className="animate-fadeIn">
                          <span className="text-zinc-600">&gt; </span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            </SimulatorShell>
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: สร้างสคริปต์แก้ปัญหาวัดความยุติธรรมอัลกอริทึม"
          taskText={`[โจทย์ปฏิบัติประจำวิชาโครงสร้างข้อมูลและอัลกอริทึม]

ให้นักเรียนสร้างไฟล์สคริปต์ภาษา Python เพื่อวิเคราะห์ตรวจสอบการทำงานของคุณสมบัติอัลกอริทึมที่ดี โดยแก้โจทย์ภารกิจดังนี้:

1. เขียนฟังก์ชัน search_even_numbers(numbers) เพื่อวนลูปค้นหาเลขคู่ตัวแรกสุดในรายการข้อมูล (Array / List)
2. หากค้นพบ ให้ฟังก์ชันส่งกลับคืนดัชนี (Index) ของตัวเลขคู่นั้นทันที (Return index)
3. หากค้นหาข้อมูลในรายการจนจบการทำงานแล้วไม่พบ ให้ส่งค่ากลับเป็น -1 (Return -1)
4. ร่วมกับการเขียนคอมเมนต์วิเคราะห์โครงสร้างข้อมูลประเภทที่นักเรียนเลือกใช้งาน และอธิบายวิเคราะห์ความซับซ้อนเชิงเวลา (Time Complexity / Big O) ของอัลกอริทึมนี้ในกรณีแย่ที่สุด (Worst Case) ในรูปแบบคำอธิบายที่เข้าใจง่ายที่สุด

ส่งงานโดยนำชุดโค้ดของคุณครูไปตรวจสอบและวิเคราะห์การทำงานร่วมกันในชั้นเรียน`}
        />

      </main>

    </div>
  );
}
