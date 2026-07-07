import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  ConceptCard,
  AmbientBackdrop
} from '../shared';
import {
  Layers,
  ArrowRight,
  RotateCcw,
  Play,
  CheckCircle2,
  Cpu,
  Info,
  Undo,
  Redo,
  RefreshCw,
  FileCode,
  Trash2,
  Plus,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function DSA2_1() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA2_1_BLOBS = [
    { color: 'bg-indigo-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-violet-200', size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-blue-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-purple-200', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── 2. Simulator Mode Selection ──────────────────────────────────────────
  // Modes: 'lifo' | 'undo_redo' | 'call_stack'
  const [simMode, setSimMode] = useState('lifo');

  // ==========================================================================
  // SIMULATOR 1: LIFO Stack Visualizer States
  // ==========================================================================
  const [lifoStack, setLifoStack] = useState(['แผ่นข้อมูล A', 'แผ่นข้อมูล B', 'แผ่นข้อมูล C']);
  const [lifoInput, setLifoInput] = useState('');
  const [lifoLogs, setLifoLogs] = useState(['ระบบเตรียมพร้อม: โหลดสแตกเริ่มต้น [A, B, C]']);
  const [isLifoAnimating, setIsLifoAnimating] = useState(false);
  const [lifoActionType, setLifoActionType] = useState('idle'); // 'push' | 'pop' | 'idle'
  const [animatingItem, setAnimatingItem] = useState(null);

  const addLifoLog = (msg) => {
    setLifoLogs(prev => [...prev, msg]);
  };

  const handleLifoPush = () => {
    if (isLifoAnimating) return;
    const val = lifoInput.trim();
    if (!val) {
      alert('กรุณากรอกชื่อข้อมูลที่ต้องการ Push');
      return;
    }
    if (lifoStack.length >= 6) {
      alert('สแตกเต็มแล้ว! (จำลองความจุสูงสุดไว้ที่ 6 โหนดเพื่อความสวยงามทางทัศนศิลป์)');
      return;
    }

    setIsLifoAnimating(true);
    setLifoActionType('push');
    setAnimatingItem(val);
    addLifoLog(`>>> stack.append("${val}")  # ทำการ Push ข้อมูลเข้าสู่สแตก`);

    setTimeout(() => {
      setLifoStack(prev => [...prev, val]);
      setIsLifoAnimating(false);
      setLifoActionType('idle');
      setAnimatingItem(null);
      setLifoInput('');
      addLifoLog(`➔ ดำเนินการสำเร็จ: Push "${val}" ไปยังยอดสแตก (Top)`);
    }, 800);
  };

  const handleLifoPop = () => {
    if (isLifoAnimating) return;
    if (lifoStack.length === 0) {
      addLifoLog('>>> stack.pop()');
      addLifoLog('IndexError: pop from empty list (ไม่สามารถ Pop ได้เนื่องจากสแตกว่างเปล่า)');
      alert('สแตกว่างเปล่า (Underflow) ไม่สามารถนำข้อมูลออกได้!');
      return;
    }

    setIsLifoAnimating(true);
    setLifoActionType('pop');
    const poppedValue = lifoStack[lifoStack.length - 1];
    addLifoLog(`>>> stack.pop()  # ทำการ Pop ข้อมูลออกจากยอดสแตก`);

    setTimeout(() => {
      setLifoStack(prev => prev.slice(0, -1));
      setIsLifoAnimating(false);
      setLifoActionType('idle');
      addLifoLog(`➔ ดำเนินการสำเร็จ: นำ "${poppedValue}" ออกจากยอดสแตก`);
    }, 800);
  };

  const resetLifo = () => {
    setLifoStack(['แผ่นข้อมูล A', 'แผ่นข้อมูล B', 'แผ่นข้อมูล C']);
    setLifoLogs(['สแปกรีเซ็ตกลับสู่สถานะเริ่มต้น [A, B, C]']);
    setLifoInput('');
    setLifoActionType('idle');
    setIsLifoAnimating(false);
  };

  // ==========================================================================
  // SIMULATOR 2: Undo / Redo History States
  // ==========================================================================
  const [canvasElements, setCanvasElements] = useState([]); // Array of shapes inside canvas
  const [undoStack, setUndoStack] = useState([]); // Stack of actions to undo
  const [redoStack, setRedoStack] = useState([]); // Stack of actions to redo
  const [canvasBg, setCanvasBg] = useState('bg-slate-100');
  const [undoLogs, setUndoLogs] = useState(['เริ่มต้นผืนผ้าใบว่างเปล่า (Canvas)']);

  const addUndoLog = (msg) => {
    setUndoLogs(prev => [...prev, msg]);
  };

  const handleAddShape = (shapeType) => {
    const newShape = {
      id: Date.now(),
      type: shapeType,
      color: shapeType === 'circle' ? 'bg-indigo-500' : 'bg-emerald-500',
      x: Math.floor(Math.random() * 60) + 20,
      y: Math.floor(Math.random() * 50) + 20,
    };

    // Push new action to Undo Stack
    const action = { type: 'add_shape', payload: newShape };
    setUndoStack(prev => [...prev, action]);
    setRedoStack([]); // Clear Redo Stack on new action

    setCanvasElements(prev => [...prev, newShape]);
    addUndoLog(`➔ เพิ่มรูปทรง [${shapeType.toUpperCase()}] | บันทึกประวัติเข้า Undo Stack`);
  };

  const handleChangeBg = () => {
    const colors = ['bg-indigo-50/50', 'bg-emerald-50/50', 'bg-purple-50/50', 'bg-amber-50/50', 'bg-rose-50/50'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const oldBg = canvasBg;

    const action = { type: 'change_bg', payload: { old: oldBg, new: randomColor } };
    setUndoStack(prev => [...prev, action]);
    setRedoStack([]);

    setCanvasBg(randomColor);
    addUndoLog(`➔ เปลี่ยนสีพื้นหลัง Canvas | บันทึกประวัติเข้า Undo Stack`);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) {
      addUndoLog(`⚠️ ไม่มีคำสั่งที่สามารถกู้คืนได้ (Undo Stack ว่างเปล่า)`);
      return;
    }

    const actionToUndo = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));

    // Push to Redo Stack
    setRedoStack(prev => [...prev, actionToUndo]);

    if (actionToUndo.type === 'add_shape') {
      const targetShape = actionToUndo.payload;
      setCanvasElements(prev => prev.filter(item => item.id !== targetShape.id));
      addUndoLog(`↩️ เลิกทำ (Undo): ลบรูปทรง [${targetShape.type.toUpperCase()}] ล่าสุดออก | ย้ายข้อมูลไป Redo Stack`);
    } else if (actionToUndo.type === 'change_bg') {
      setCanvasBg(actionToUndo.payload.old);
      addUndoLog(`↩️ เลิกทำ (Undo): คืนค่าสีพื้นหลังเก่า | ย้ายข้อมูลไป Redo Stack`);
    }
  };

  const handleRedo = () => {
    if (redoStack.length === 0) {
      addUndoLog(`⚠️ ไม่มีประวัติการถอนคำสั่งที่สามารถทำซ้ำได้ (Redo Stack ว่างเปล่า)`);
      return;
    }

    const actionToRedo = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));

    // Push back to Undo Stack
    setUndoStack(prev => [...prev, actionToRedo]);

    if (actionToRedo.type === 'add_shape') {
      const targetShape = actionToRedo.payload;
      setCanvasElements(prev => [...prev, targetShape]);
      addUndoLog(`🔁 ทำซ้ำ (Redo): แทรกรูปทรง [${targetShape.type.toUpperCase()}] กลับคืนมา | ย้ายข้อมูลไป Undo Stack`);
    } else if (actionToRedo.type === 'change_bg') {
      setCanvasBg(actionToRedo.payload.new);
      addUndoLog(`🔁 ทำซ้ำ (Redo): ใช้สีพื้นหลังใหม่กลับคืนมา | ย้ายข้อมูลไป Undo Stack`);
    }
  };

  const resetUndoRedo = () => {
    setCanvasElements([]);
    setUndoStack([]);
    setRedoStack([]);
    setCanvasBg('bg-slate-100');
    setUndoLogs(['รีเซ็ตผืนผ้าใบและล้างประวัติจำลองเรียบร้อย']);
  };


  // ==========================================================================
  // SIMULATOR 3: Compiler Function Call Stack Stepper States
  // ==========================================================================
  const [callStack, setCallStack] = useState([]); // Stack of functions
  const [stepIndex, setStepIndex] = useState(0);
  const [callLogs, setCallLogs] = useState(['พร้อมทดสอบการจำลอง Compiler Call Stack']);
  
  const CODE_STEPS = [
    { line: 11, code: 'main()', desc: '1. โปรแกรมหลักเรียกใช้ฟังก์ชัน main()', action: 'push', frame: 'main()', output: null },
    { line: 9, code: 'total = calc_total(100)', desc: '2. ฟังก์ชัน main() เรียกใช้ฟังก์ชัน calc_total(100)', action: 'push', frame: 'calc_total(100)', output: null },
    { line: 5, code: 'tax = get_tax(price)', desc: '3. ฟังก์ชัน calc_total() เรียกใช้ฟังก์ชัน get_tax(100)', action: 'push', frame: 'get_tax(100)', output: null },
    { line: 2, code: 'return price * 0.07', desc: '4. ฟังก์ชัน get_tax() คำนวณภาษีและรีเทิร์นค่ากลับไป', action: 'pop', frame: 'get_tax(100)', output: 'get_tax() -> คืนค่า 7.0' },
    { line: 6, code: 'return price + tax', desc: '5. ฟังก์ชัน calc_total() ได้รับค่าภาษี 7.0 แล้วบวกราคาสุทธิพร้อมส่งค่าคืน', action: 'pop', frame: 'calc_total(100)', output: 'calc_total() -> คืนค่า 107.0' },
    { line: 10, code: 'print(total)', desc: '6. ฟังก์ชัน main() พิมพ์ผลลัพธ์ออกจอภาพคอนโซล', action: 'none', frame: null, output: '107.0' },
    { line: 11, code: 'main()', desc: '7. ฟังก์ชัน main() ทำงานเสร็จสมบูรณ์ คืนสภาพหน่วยความจำ', action: 'pop', frame: 'main()', output: 'โปรแกรมทำงานสิ้นสุด' }
  ];

  const handleStepNext = () => {
    if (stepIndex >= CODE_STEPS.length) {
      alert('สิ้นสุดการทำงานของสคริปต์โค้ดแล้ว! กรุณากดปุ่มรีเซ็ตเพื่อเริ่มจำลองใหม่');
      return;
    }

    const currentStep = CODE_STEPS[stepIndex];
    addCallLog(`📍 แถวที่ ${currentStep.line}: ${currentStep.desc}`);

    if (currentStep.action === 'push') {
      setCallStack(prev => [...prev, currentStep.frame]);
    } else if (currentStep.action === 'pop') {
      setCallStack(prev => prev.slice(0, -1));
    }

    if (currentStep.output) {
      addCallLog(`💻 [CONSOLE] ${currentStep.output}`);
    }

    setStepIndex(prev => prev + 1);
  };

  const handleStepReset = () => {
    setCallStack([]);
    setStepIndex(0);
    setCallLogs(['รีเซ็ตตัวแปลภาษา เริ่มจำลองการประมวลผลโค้ดบรรทัดแรก']);
  };

  const addCallLog = (msg) => {
    setCallLogs(prev => [...prev, msg]);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA2_1_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Definition & LIFO (Side-by-Side Redesign) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ความหมายและหลักการทำงาน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างข้อมูลสแตก และหลักการ LIFO
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Concise Definition Points (Left) */}
            <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
                  <strong className="px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[14px]">Stack (สแตก)</strong> 
                  คือ โครงสร้างข้อมูลเชิงเส้นที่อนุญาตให้จัดการข้อมูลได้ผ่านจุดเข้าออกทางเดียวที่ยอดสแตก เรียกว่า 
                  <strong className="text-indigo-600 font-mono text-[14px] mx-1">Top</strong>
                </p>
                <div className="bg-indigo-50/40 border-l-[3.5px] border-indigo-500 rounded-r-xl p-4 text-[14.5px] text-indigo-950/90 leading-relaxed">
                  <strong>กฎเหล็ก LIFO (Last-In, First-Out):</strong> ข้อมูลที่เข้ามาทีหลังสุด จะได้รับการนำออกไปใช้งานเป็นอันดับแรกสุดเสมอ (เข้าหลังสุด ออกก่อนสุด)
                </div>
                <ul className="space-y-2 text-[14.5px] text-zinc-600 pl-1 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span><strong>Push:</strong> เพิ่มข้อมูลใหม่เข้าไปทับยอดสแตก</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span><strong>Pop:</strong> ถอนข้อมูลชิ้นบนสุดออกจากระบบ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                    <span><strong>Peek/Top:</strong> แอบส่องข้อมูลยอดสุดโดยไม่นำออก</span>
                  </li>
                </ul>
              </div>

              {/* Spacing alignment */}
              <div className="text-[13.5px] text-zinc-500 leading-normal pt-2">
                * เปรียบเทียบเสมือน: ตั้งจานกระดาษ, ตั้งหนังสือ หรือกล่องเก็บของแนวลึก
              </div>
            </div>

            {/* Column 2: Visual LIFO Flowchart (Right) */}
            <div className="lg:col-span-5 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 flex flex-col justify-center items-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block text-center mb-4">ผังแสดงสถาปัตยกรรม LIFO</span>
              
              <div className="w-full flex items-center justify-between py-2 px-1">
                {/* Input block */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    IN
                  </div>
                  <span className="text-[11px] text-zinc-500 font-bold">เข้าทีหลัง</span>
                </div>

                <div className="text-zinc-300">
                  <ChevronRight className="w-5 h-5 text-indigo-500" />
                </div>

                {/* Stack pocket */}
                <div className="w-28 border-2 border-dashed border-indigo-300 rounded-xl p-1.5 bg-indigo-50/20 flex flex-col-reverse gap-1 shadow-inner">
                  <div className="bg-zinc-200 border border-zinc-300 py-1.5 px-2 rounded text-center text-[10.5px] text-zinc-500 font-semibold truncate">ล่างสุด</div>
                  <div className="bg-zinc-200 border border-zinc-300 py-1.5 px-2 rounded text-center text-[10.5px] text-zinc-500 font-semibold truncate">กลาง</div>
                  <div className="bg-emerald-500/80 border border-emerald-400 py-1.5 px-2 rounded text-center text-[10.5px] text-white font-bold truncate">Top (บนสุด)</div>
                </div>

                <div className="text-zinc-300">
                  <ChevronRight className="w-5 h-5 text-rose-500" />
                </div>

                {/* Output block */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    OUT
                  </div>
                  <span className="text-[11px] text-zinc-500 font-bold">ออกก่อน</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Section 2: Stack in Python (Side-by-Side Redesign) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              ตัวอย่างไวยากรณ์ภาษา
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การสั่งงานสแตกในภาษา Python
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Syntax Highlights (Left) */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
              <div>
                <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed mb-4">
                  ภาษา Python ประยุกต์ใช้วัตถุประเภท **List** ในการสั่งจำลองพฤติกรรมของ Stack โดยมีไวยากรณ์หลัก 3 ประการดังนี้:
                </p>
                
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 bg-white/50 border border-zinc-200/60 p-2.5 rounded-xl">
                    <span className="px-2 py-0.5 font-mono text-xs font-bold bg-indigo-50 text-indigo-600 rounded">Push</span>
                    <span className="text-[13.5px] text-zinc-600 font-mono">stack.append(item)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/50 border border-zinc-200/60 p-2.5 rounded-xl">
                    <span className="px-2 py-0.5 font-mono text-xs font-bold bg-rose-50 text-rose-600 rounded">Pop</span>
                    <span className="text-[13.5px] text-zinc-600 font-mono">stack.pop()</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/50 border border-zinc-200/60 p-2.5 rounded-xl">
                    <span className="px-2 py-0.5 font-mono text-xs font-bold bg-amber-50 text-amber-600 rounded">Peek</span>
                    <span className="text-[13.5px] text-zinc-600 font-mono">stack[-1]</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-250/60 rounded-xl p-3 border-l-[3px] border-l-amber-500 text-xs text-amber-900 leading-relaxed">
                ⚠️ <strong>ข้อควรระวัง:</strong> การสั่ง `.pop()` จากสแตกว่างเปล่า (Underflow) จะทำให้โปรแกรมหยุดทำงานและเกิด <strong>IndexError</strong> ทันที
              </div>
            </div>

            {/* Column 2: Code block (Right) */}
            <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col">
              <div className="bg-slate-950 px-4 py-2 flex justify-between items-center border-b border-white/5">
                <span className="text-[11px] font-bold text-indigo-400 font-mono">stack_operations.py</span>
                <span className="text-[9px] font-mono text-zinc-500">Python 3</span>
              </div>
              <div className="p-4 font-mono text-[12.5px] md:text-[13px] text-zinc-200 leading-relaxed overflow-x-auto flex-1">
                <div><span className="text-indigo-400">stack</span> = []</div>
                <div className="text-zinc-500"># Push สมาชิกเข้าไปซ้อนยอดสแตก</div>
                <div><span className="text-indigo-400">stack</span>.<span className="text-emerald-400">append</span>(<span className="text-amber-300">"A"</span>)</div>
                <div><span className="text-indigo-400">stack</span>.<span className="text-emerald-400">append</span>(<span className="text-amber-300">"B"</span>)</div>
                <br />
                <div className="text-zinc-500"># Pop สมาชิกชิ้นบนสุด (Top) ออกไปใช้งาน</div>
                <div><span className="text-indigo-400">removed</span> = <span className="text-indigo-400">stack</span>.<span className="text-rose-450">pop</span>() <span className="text-zinc-500"># คืนค่า "B"</span></div>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Section 3: Concise Real-World Applications ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-violet-600 tracking-wider uppercase">
              การประยุกต์ใช้งาน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวอย่างการประยุกต์ใช้งานเชิงปฏิบัติ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-indigo-500/80 space-y-2.5">
              <h4 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <span className="p-1 rounded bg-indigo-50 text-indigo-600"><Undo className="w-4 h-4" /></span>
                ระบบย้อนคำสั่งแต่งรูปภาพ (Undo / Redo)
              </h4>
              <p className="text-[13.5px] md:text-[14px] text-zinc-500 leading-relaxed">
                ทุกขั้นตอนการแต่งรูปจะถูก Push เข้ารักษาสถานะไว้ใน **Undo Stack** เมื่อกดปุ่มยกเลิก (Undo) ระบบจะถอดถอน (Pop) สถานะล่าสุดออกแล้วสับเปลี่ยนไปบันทึกเก็บไว้ที่ **Redo Stack** คู่ขนาน
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-violet-500/80 space-y-2.5">
              <h4 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <span className="p-1 rounded bg-violet-50 text-violet-600"><Cpu className="w-4 h-4" /></span>
                สแตกหน่วยความจำของโปรแกรม (Call Stack)
              </h4>
              <p className="text-[13.5px] md:text-[14px] text-zinc-500 leading-relaxed">
                ยามรันฟังก์ชันซ้อนกันในเครื่องคอมพิวเตอร์ ระบบปฏิบัติการจะจองแรมในรูปเฟรมเรียกใช้งาน (Stack Frame) เข้ากองซ้อนไว้ และจะปอกสลัด Pop ออกคืนพื้นที่ทันทีเมื่อฟังก์ชันนั้นๆ ส่งค่าคืนผลลัพธ์
              </p>
            </div>
          </div>
        </section>

        {/* ─── Section 4: The Simulators ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ห้องปฏิบัติการทดลองจำลอง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เครื่องจำลองโครงสร้างสแตกเสมือนจริง (Interactive Stack Simulators)
            </h3>
          </div>

          <div className="space-y-6">
            {/* Mode selection buttons */}
            <div className="flex flex-wrap gap-2.5 p-1 bg-zinc-100 rounded-xl max-w-2xl">
              <button
                onClick={() => setSimMode('lifo')}
                className={`flex-1 min-w-[150px] cursor-pointer flex items-center justify-center gap-2 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all ${
                  simMode === 'lifo'
                    ? 'bg-white text-indigo-600 shadow-md scale-[1.01]'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                1. สแตกและหลัก LIFO
              </button>
              <button
                onClick={() => setSimMode('undo_redo')}
                className={`flex-1 min-w-[150px] cursor-pointer flex items-center justify-center gap-2 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all ${
                  simMode === 'undo_redo'
                    ? 'bg-white text-indigo-600 shadow-md scale-[1.01]'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Undo className="w-4 h-4" />
                2. ประวัติ Undo / Redo
              </button>
              <button
                onClick={() => setSimMode('call_stack')}
                className={`flex-1 min-w-[150px] cursor-pointer flex items-center justify-center gap-2 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all ${
                  simMode === 'call_stack'
                    ? 'bg-white text-indigo-600 shadow-md scale-[1.01]'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Cpu className="w-4 h-4" />
                3. สแตกเรียกฟังก์ชัน (Call Stack)
              </button>
            </div>

            {/* Render selected simulator mode */}
            {simMode === 'lifo' && (
              <SimulatorShell
                title="โหมดจำลอง 1: ลำดับขั้นตอนสแตกหลัก LIFO"
                subtitle="ศึกษาการแทรกข้อมูลและแกะออกตามกลไกลำดับ Last-In, First-Out (LIFO)"
                onReset={resetLifo}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="sim-lifo-wrapper">
                  
                  {/* Left Column - Controls (Dark Mode Compliant) */}
                  <div className="lg:col-span-5 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between" id="sim-lifo-control">
                    <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                    
                    <div className="space-y-5">
                      <div className="space-y-2.5 pt-3">
                        <label className="text-xs font-bold text-slate-300 block">ป้อนข้อมูลข้อความที่ต้องการใส่สแตก (Push)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={lifoInput}
                            onChange={(e) => setLifoInput(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') handleLifoPush(); }}
                            placeholder="เช่น แผ่นข้อมูล D"
                            disabled={isLifoAnimating}
                            className="flex-1 h-[38px] px-3.5 bg-slate-950 border border-slate-700/60 rounded-[8px] text-white focus:outline-none focus:border-indigo-500 font-sans text-sm"
                            id="lifo-input-field"
                          />
                          <button
                            onClick={handleLifoPush}
                            disabled={isLifoAnimating}
                            className="h-[38px] px-4 cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:scale-100 rounded-[8px] font-semibold flex items-center gap-1.5 transition-all text-xs"
                            id="btn-lifo-push"
                          >
                            <Plus className="w-4 h-4" />
                            Push
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 block">คำสั่งนำออกจากยอดสแตก (Pop)</label>
                        <button
                          onClick={handleLifoPop}
                          disabled={isLifoAnimating}
                          className="w-full h-[40px] cursor-pointer bg-rose-600 text-white hover:bg-rose-500 hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:scale-100 rounded-[8px] font-semibold flex items-center justify-center gap-1.5 transition-all text-xs"
                          id="btn-lifo-pop"
                        >
                          <Trash2 className="w-4 h-4" />
                          Pop (ดึงค่าบนสุดออก)
                        </button>
                      </div>
                    </div>

                    {/* Operational Complexity strip */}
                    <div className="border-t border-slate-800 mt-6 pt-4 space-y-2.5">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 block">COMPLEXITY ANALYSIS</span>
                      <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-400">Time Complexity (Push/Pop):</span>
                          <span className="text-emerald-400 font-mono font-bold">O(1) - Constant Time</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                          ไม่มีการสไลด์ค่าจัดระเบียบข้อมูลใหม่ ดำเนินการที่ตำแหน่ง Top ทันที
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Visual Screen Container */}
                  <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[350px]" id="sim-lifo-visual">
                    <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                    
                    {/* Stack graphics container */}
                    <div className="flex-1 flex flex-col justify-end items-center py-6">
                      <div className="relative w-64 border-x-[2px] border-b-[2px] border-slate-700/80 rounded-b-2xl bg-slate-900/40 p-3 min-h-[220px] flex flex-col-reverse gap-2 shadow-inner">
                        
                        {/* Render elements of stack */}
                        {lifoStack.map((item, idx) => {
                          const isTop = idx === lifoStack.length - 1;
                          return (
                            <div
                              key={idx}
                              className={`w-full py-2.5 px-4 rounded-xl text-center font-bold text-xs md:text-sm shadow-md transition-all duration-300 relative flex justify-between items-center ${
                                isTop 
                                  ? 'bg-indigo-650 text-white border border-indigo-50' 
                                  : 'bg-slate-800 text-slate-300 border border-slate-700'
                              }`}
                            >
                              <span className="text-[10px] text-slate-400/80 font-mono">[{idx}]</span>
                              <span className="truncate max-w-[120px]">{item}</span>
                              <div className="flex items-center gap-1">
                                {isTop && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-500 text-amber-950 font-mono text-[9px] font-extrabold animate-pulse">
                                    TOP
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {/* Push animation target */}
                        {isLifoAnimating && lifoActionType === 'push' && animatingItem && (
                          <div className="w-full py-2.5 px-4 rounded-xl text-center font-bold text-xs bg-indigo-500/50 text-indigo-200 border border-indigo-500/30 animate-pulse flex justify-between items-center">
                            <span className="text-[10px] text-indigo-400/80 font-mono">...</span>
                            <span className="truncate">{animatingItem}</span>
                            <span className="text-[9px] font-mono text-indigo-400 font-extrabold animate-pulse">PUSHING</span>
                          </div>
                        )}

                        {/* If stack empty */}
                        {lifoStack.length === 0 && !isLifoAnimating && (
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-slate-500 gap-1.5">
                            <Layers className="w-8 h-8 opacity-25" />
                            <span className="text-xs font-semibold tracking-wide">สแตกว่างเปล่า (Empty Stack)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Operational Log Terminal */}
                    <div className="w-full shrink-0">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1.5">OPERATION LOGS:</span>
                      <div className="bg-slate-900 rounded-xl p-3 h-24 overflow-y-auto font-mono text-[11px] md:text-xs text-zinc-300 border border-white/5 space-y-1">
                        {lifoLogs.map((log, i) => (
                          <div key={i} className={log.startsWith('➔') ? 'text-indigo-400 font-bold' : log.includes('Error') ? 'text-rose-405' : 'text-slate-400'}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </SimulatorShell>
            )}

            {simMode === 'undo_redo' && (
              <SimulatorShell
                title="โหมดจำลอง 2: ระบบยกเลิก (Undo) และ ทำซ้ำ (Redo)"
                subtitle="ทำความเข้าใจหลักการใช้ Stack สองตัว (Undo Stack / Redo Stack) ในการเก็บรักษาภาพประวัติสถานะ"
                onReset={resetUndoRedo}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="sim-undo-wrapper">
                  
                  {/* Left Controls & Canvas Sandbox */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Sandbox Controls */}
                    <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl flex flex-wrap gap-2 items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddShape('circle')}
                          className="cursor-pointer h-[36px] px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          วาดวงกล
                        </button>
                        <button
                          onClick={() => handleAddShape('square')}
                          className="cursor-pointer h-[36px] px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          วาดสี่เหลี่ยม
                        </button>
                        <button
                          onClick={handleChangeBg}
                          className="cursor-pointer h-[36px] px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          เปลี่ยนพื้นหลัง
                        </button>
                      </div>

                      {/* Undo / Redo controls */}
                      <div className="flex gap-2 border-l border-slate-800 pl-4">
                        <button
                          onClick={handleUndo}
                          disabled={undoStack.length === 0}
                          className="cursor-pointer h-[36px] px-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800 font-bold transition-all flex items-center gap-1"
                        >
                          <Undo className="w-4 h-4" />
                          Undo
                        </button>
                        <button
                          onClick={handleRedo}
                          disabled={redoStack.length === 0}
                          className="cursor-pointer h-[36px] px-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800 font-bold transition-all flex items-center gap-1"
                        >
                          <Redo className="w-4 h-4" />
                          Redo
                        </button>
                      </div>
                    </div>

                    {/* Visual Sandbox Canvas */}
                    <div className={`w-full h-[220px] rounded-2xl ${canvasBg} border-2 border-slate-200 shadow-inner relative overflow-hidden transition-all duration-300`}>
                      <span className="text-[10px] text-zinc-400 font-mono font-bold absolute top-2 left-2 uppercase">Canvas Sandbox Screen</span>
                      
                      {canvasElements.map((shape) => (
                        <div
                          key={shape.id}
                          style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
                          className={`absolute w-12 h-12 ${shape.color} opacity-80 border-2 border-white shadow-lg flex items-center justify-center transition-all ${
                            shape.type === 'circle' ? 'rounded-full' : 'rounded-xl'
                          }`}
                        >
                          <span className="text-[9px] text-white font-bold">{shape.type === 'circle' ? 'CIR' : 'SQU'}</span>
                        </div>
                      ))}

                      {canvasElements.length === 0 && (
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-slate-400 gap-1.5 pointer-events-none">
                          <span className="text-xs font-semibold">ผืนผ้าใบว่างเปล่า กดเพิ่มรูปทรงเพื่อเริ่มต้น</span>
                        </div>
                      )}
                    </div>

                    {/* Operational logs */}
                    <div className="bg-slate-950/95 border border-white/5 rounded-2xl p-4 shadow-xl">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">LOG HISTORY:</span>
                      <div className="h-20 overflow-y-auto font-mono text-xs text-zinc-300 space-y-1">
                        {undoLogs.map((log, i) => (
                          <div key={i} className={log.startsWith('↩️') ? 'text-amber-400 font-medium' : log.startsWith('🔁') ? 'text-indigo-400 font-medium' : 'text-slate-400'}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Twin Stack Visualizer (LIFO Stack representations side-by-side) */}
                  <div className="lg:col-span-5 bg-slate-950/95 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl p-5 flex flex-col justify-between min-h-[380px]">
                    <span className="text-[9px] font-mono text-slate-500 block mb-4 uppercase">Twin Stack Architecture</span>
                    
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      
                      {/* Undo Stack column */}
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-indigo-400 mb-2">1. UNDO STACK</span>
                        <div className="flex-1 w-full border-2 border-dashed border-indigo-500/20 bg-indigo-500/5 rounded-xl p-2 flex flex-col-reverse gap-1.5 min-h-[220px]">
                          {undoStack.map((act, i) => (
                            <div key={i} className="bg-indigo-600/90 text-white font-mono text-[9.5px] p-1.5 rounded-lg text-center border border-indigo-400/30 truncate">
                              {act.type === 'add_shape' ? `add_${act.payload.type}` : 'change_bg'}
                            </div>
                          ))}
                          {undoStack.length === 0 && (
                            <div className="flex-1 flex items-center justify-center text-[10px] text-slate-600 font-mono text-center">Empty</div>
                          )}
                        </div>
                      </div>

                      {/* Redo Stack column */}
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-bold text-violet-400 mb-2">2. REDO STACK</span>
                        <div className="flex-1 w-full border-2 border-dashed border-violet-500/20 bg-violet-500/5 rounded-xl p-2 flex flex-col-reverse gap-1.5 min-h-[220px]">
                          {redoStack.map((act, i) => (
                            <div key={i} className="bg-violet-600/95 text-white font-mono text-[9.5px] p-1.5 rounded-lg text-center border border-violet-400/30 truncate">
                              {act.type === 'add_shape' ? `add_${act.payload.type}` : 'change_bg'}
                            </div>
                          ))}
                          {redoStack.length === 0 && (
                            <div className="flex-1 flex items-center justify-center text-[10px] text-slate-600 font-mono text-center">Empty</div>
                          )}
                        </div>
                      </div>

                    </div>

                    <div className="border-t border-slate-800 pt-3 mt-4 text-[10.5px] text-slate-500 leading-relaxed font-sans">
                      * เมื่อกดสั่งทำใหม่ (New Action) ประวัติใน Redo Stack จะถูกลบออกทั้งหมดโดยอัตโนมัติ ตามหลักระบบ Undo/Redo สากล
                    </div>
                  </div>

                </div>
              </SimulatorShell>
            )}

            {simMode === 'call_stack' && (
              <SimulatorShell
                title="โหมดจำลอง 3: โครงสร้างหน่วยความจำ Call Stack ในคอมไพเลอร์"
                subtitle="สังเกตการจองพื้นที่และกู้คืนแรมของระบบคอมพิวเตอร์เมื่อมีการเรียกใช้ฟังก์ชันย่อยซ้อนกัน"
                onReset={handleStepReset}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="sim-callstack-wrapper">
                  
                  {/* Left Column - Python Code Viewer */}
                  <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="bg-slate-950 px-4 py-3 border-b border-white/5 flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-400 font-mono">execution_flow.py</span>
                        <span className="text-[9px] font-mono text-zinc-500 font-extrabold uppercase">compiler frame</span>
                      </div>
                      <div className="p-4 font-mono text-[13px] text-zinc-300 space-y-1">
                        <div className={CODE_STEPS[stepIndex]?.line === 1 ? 'bg-amber-500/25 text-white font-bold' : ''}>1: <span className="text-indigo-400">def</span> <span className="text-blue-400">get_tax</span>(price):</div>
                        <div className={CODE_STEPS[stepIndex]?.line === 2 ? 'bg-amber-500/25 text-white font-bold' : ''}>2:     <span className="text-indigo-400">return</span> price * <span className="text-amber-300">0.07</span></div>
                        <div>3: </div>
                        <div className={CODE_STEPS[stepIndex]?.line === 4 ? 'bg-amber-500/25 text-white font-bold' : ''}>4: <span className="text-indigo-400">def</span> <span className="text-blue-400">calc_total</span>(price):</div>
                        <div className={CODE_STEPS[stepIndex]?.line === 5 ? 'bg-amber-500/25 text-white font-bold' : ''}>5:     tax = get_tax(price)</div>
                        <div className={CODE_STEPS[stepIndex]?.line === 6 ? 'bg-amber-500/25 text-white font-bold' : ''}>6:     <span className="text-indigo-400">return</span> price + tax</div>
                        <div>7: </div>
                        <div className={CODE_STEPS[stepIndex]?.line === 8 ? 'bg-amber-500/25 text-white font-bold' : ''}>8: <span className="text-indigo-400">def</span> <span className="text-blue-400">main</span>():</div>
                        <div className={CODE_STEPS[stepIndex]?.line === 9 ? 'bg-amber-500/25 text-white font-bold' : ''}>9:     total = calc_total(<span className="text-amber-300">100</span>)</div>
                        <div className={CODE_STEPS[stepIndex]?.line === 10 ? 'bg-amber-500/25 text-white font-bold' : ''}>10:    <span className="text-indigo-400 font-bold">print</span>(total)</div>
                        <div>11: </div>
                        <div className={CODE_STEPS[stepIndex]?.line === 11 ? 'bg-amber-500/25 text-white font-bold' : ''}>11: main()</div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-800 bg-slate-950 flex gap-2">
                      <button
                        onClick={handleStepNext}
                        className="cursor-pointer flex-1 h-[38px] rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        Execute Next Step
                      </button>
                      <button
                        onClick={handleStepReset}
                        className="cursor-pointer h-[38px] px-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column - Visual Call Stack Box */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    
                    {/* Call Stack Visual Card */}
                    <div className="bg-slate-950/95 backdrop-blur-xl border border-white/5 rounded-2xl p-5 flex-1 flex flex-col justify-between min-h-[260px] relative">
                      <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">MEMORY CALL STACK</span>
                      
                      {/* Stack structure */}
                      <div className="flex-1 flex flex-col justify-end items-center pt-8 pb-4">
                        <div className="relative w-72 border-2 border-dashed border-slate-700/60 rounded-xl bg-slate-900/20 p-2 min-h-[160px] flex flex-col-reverse gap-1.5 shadow-inner">
                          {callStack.map((frame, idx) => (
                            <div
                              key={idx}
                              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-mono text-[11px] font-bold p-2.5 rounded-lg border border-emerald-500/35 shadow-md flex justify-between items-center"
                            >
                              <span>[{idx}] Frame: {frame}</span>
                              <span className="text-[8.5px] uppercase font-bold tracking-widest text-emerald-300 bg-emerald-950/65 px-1.5 py-0.5 rounded">ACTIVE</span>
                            </div>
                          ))}
                          
                          {callStack.length === 0 && (
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-slate-500 gap-1 font-mono text-xs">
                              <Cpu className="w-7 h-7 opacity-20" />
                              <span>Stack Empty (แรมว่างเปล่า)</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-3 text-[10.5px] text-slate-500 font-sans leading-relaxed">
                        เมื่อ Compiler พบการเรียกฟังก์ชัน จะจองเฟรมหน่วยความจำใหม่ (Push Frame) และจะปลดออกคืนแรมทันทีเมื่อรีเทิร์น (Pop Frame)
                      </div>
                    </div>

                    {/* Operational console log */}
                    <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 shadow-xl">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">COMPILER CONSOLE:</span>
                      <div className="h-20 overflow-y-auto font-mono text-xs text-zinc-300 space-y-1">
                        {callLogs.map((log, i) => (
                          <div key={i} className={log.includes('[CONSOLE]') ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </SimulatorShell>
            )}
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: สังเกตพฤติกรรม LIFO และวิเคราะห์ Stack ของคอมพิวเตอร์"
          taskText={`[โจทย์ปฏิบัติการหลักสูตรรายวิชาโครงสร้างข้อมูล 21900-1002]

ให้นักเรียนสร้างระบบจำลองสแตกจำลองการเก็บข้อมูลการลงทะเบียนวิชาเรียนในสถาบันการศึกษาดังนี้:

1. ประกาศตัวแปรเก็บโครงสร้างสแตกหลักสูตรชื่อ courses = []
2. ทำการเพิ่มรายวิชาเข้าไปในสแตกโดยใช้คำสั่ง .append() ในภาษา Python จำนวน 3 วิชา ได้แก่ "Math", "Science", "History" ตามลำดับ
3. เขียนโปรแกรมเรียกดูวิชาที่อยู่บนยอดสุด (Top) โดยใช้ระบบดัชนี courses[-1]
4. สั่งถอนรายวิชาที่อยู่บนยอดสุดออกจำนวน 1 วิชาด้วยคำสั่ง .pop() เพื่อยกเลิกรายวิชาล่าสุด
5. ให้นักเรียนเขียนโปรแกรมตรวจสอบว่ามีวิชาใดหลงเหลืออยู่ในสแตกบ้าง พร้อมแจกแจงลำดับของอาร์เรย์ที่เหลือ
6. เขียนอธิบายหลักการทำงาน 'เข้าหลังออกก่อน (LIFO)' พร้อมยกตัวอย่างระบบที่นำ Stack ไปใช้มาอย่างน้อย 2 ระบบในสคริปต์คอมเม้นต์

ให้นักเรียนรันวิเคราะห์ผลลัพธ์และเซฟภาพบอร์ดสแตกแสดงผลการสั่งงานและผังหน่วยความจำจำลองส่งกลับครูผู้สอนผ่านช่องทางปฏิบัติการ`}
        />

      </main>

    </div>
  );
}
