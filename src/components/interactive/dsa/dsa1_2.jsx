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
  CheckCircle2,
  Info,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Plus,
  Trash2,
  Sliders,
  HelpCircle,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

export default function DSA1_2() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA1_2_BLOBS = [
    { color: 'bg-indigo-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-blue-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-violet-200', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── 2. Initial List Simulator States ──────────────────────────────────────
  const INITIAL_LIST = ['Apple', 'Banana', 'Cherry', 'Dates'];
  const [list, setList] = useState(INITIAL_LIST);
  const [simLogs, setSimLogs] = useState(['ระบบเตรียมพร้อม: โหลดรายการเริ่มต้น [Apple, Banana, Cherry, Dates]']);
  const [lastComplexity, setLastComplexity] = useState('N/A - รอการสั่งงาน');
  const [lastFormula, setLastFormula] = useState('เลือกคำสั่งเพื่อวิเคราะห์ประสิทธิภาพ');
  
  // Animation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [animationStep, setAnimationStep] = useState('idle'); // idle | scanning | shifting | updated | error
  const [animatingIndices, setAnimatingIndices] = useState([]);
  const [scanningIdx, setScanningIdx] = useState(-1);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [shiftingDirection, setShiftingDirection] = useState('none'); // none | right | left

  // Inputs
  const [appendInput, setAppendInput] = useState('');
  const [insertVal, setInsertVal] = useState('');
  const [insertIdx, setInsertIdx] = useState('');
  const [popIdx, setPopIdx] = useState('');
  const [removeVal, setRemoveVal] = useState('');

  // ─── 3. Simulator Log helper ──────────────────────────────────────────────
  const addLog = (msg) => {
    setSimLogs(prev => [...prev, msg]);
  };

  const resetSimulator = () => {
    if (isSimulating) return;
    setList(INITIAL_LIST);
    setSimLogs(['ระบบรีเซ็ตกลับสู่สถานะเริ่มต้น']);
    setLastComplexity('N/A - รอการสั่งงาน');
    setLastFormula('เลือกคำสั่งเพื่อวิเคราะห์ประสิทธิภาพ');
    setAnimationStep('idle');
    setAnimatingIndices([]);
    setScanningIdx(-1);
    setHighlightedIndex(-1);
    setShiftingDirection('none');
    setAppendInput('');
    setInsertVal('');
    setInsertIdx('');
    setPopIdx('');
    setRemoveVal('');
  };

  // ─── 4. List Operations Simulations ───────────────────────────────────────

  // A. APPEND
  const handleAppend = () => {
    if (isSimulating) return;
    const value = appendInput.trim();
    if (!value) {
      alert('กรุณากรอกข้อมูลที่ต้องการเพิ่ม');
      return;
    }

    setIsSimulating(true);
    setAnimationStep('shifting');
    setLastComplexity('O(1) - Amortized Constant Time');
    setLastFormula('ปกติใช้ O(1) เนื่องจากเป็นการบันทึกต่อท้ายตำแหน่งหน่วยความจำที่สำรองไว้');

    addLog(`>>> list.append("${value}")`);

    // Worst case dynamic array doubling logic info
    if (list.length >= 8) {
      addLog(`[การขยายหน่วยความจำ] ข้อมูลเกินขนาดปกติ! ระบบทำการคัดลอกลิสต์เดิมไปยังพื้นที่ขนาดใหญ่ขึ้น O(n)`);
    }

    // Highlighting end position
    const newIdx = list.length;
    setAnimatingIndices([newIdx]);

    setTimeout(() => {
      setList(prev => [...prev, value]);
      setAnimationStep('updated');
      setAnimatingIndices([]);
      addLog(`➔ ผลลัพธ์สำเร็จ: เพิ่ม "${value}" ที่ดัชนี ${newIdx}`);
      setAppendInput('');
      
      setTimeout(() => {
        setIsSimulating(false);
        setAnimationStep('idle');
      }, 800);
    }, 1000);
  };

  // B. INSERT
  const handleInsert = () => {
    if (isSimulating) return;
    const value = insertVal.trim();
    const idxStr = insertIdx.trim();

    if (!value || idxStr === '') {
      alert('กรุณากรอกข้อมูลและดัชนีที่ต้องการแทรก');
      return;
    }

    const idx = parseInt(idxStr, 10);
    if (isNaN(idx) || idx < 0 || idx > list.length) {
      setIsSimulating(true);
      setAnimationStep('error');
      setLastComplexity('O(1)');
      setLastFormula('เกิดข้อผิดพลาดในการตรวจสอบดัชนี');
      addLog(`>>> list.insert(${idxStr}, "${value}")`);
      addLog(`IndexError: list insert index out of range (ดัชนีต้องอยู่ในช่วง 0 ถึง ${list.length})`);
      setTimeout(() => {
        setIsSimulating(false);
        setAnimationStep('idle');
      }, 1500);
      return;
    }

    setIsSimulating(true);
    setAnimationStep('shifting');
    setShiftingDirection('right');
    setLastComplexity('O(n) - Linear Time');
    setLastFormula('เนื่องจากต้องเลื่อนขยับข้อมูลตั้งแต่ดัชนี i ไปทางขวาเพื่อเปิดพื้นที่ว่าง');
    
    addLog(`>>> list.insert(${idx}, "${value}")`);
    
    // Highlight elements from idx to list.length - 1 that need to be shifted
    const shiftIndices = [];
    for (let i = idx; i < list.length; i++) {
      shiftIndices.push(i);
    }
    setAnimatingIndices(shiftIndices);
    
    addLog(`➔ เลื่อนข้อมูลตัวเดิมตั้งแต่ดัชนี ${idx} ไปทางขวา (+1 Address)`);

    setTimeout(() => {
      setList(prev => {
        const next = [...prev];
        next.splice(idx, 0, value);
        return next;
      });
      setAnimationStep('updated');
      setShiftingDirection('none');
      setAnimatingIndices([]);
      setHighlightedIndex(idx);
      addLog(`➔ แทรก "${value}" ลงในตำแหน่งดัชนี ${idx} เรียบร้อยแล้ว`);
      setInsertVal('');
      setInsertIdx('');

      setTimeout(() => {
        setIsSimulating(false);
        setAnimationStep('idle');
        setHighlightedIndex(-1);
      }, 1000);
    }, 1500);
  };

  // C. POP
  const handlePop = () => {
    if (isSimulating) return;
    if (list.length === 0) {
      setIsSimulating(true);
      setAnimationStep('error');
      setLastComplexity('O(1)');
      setLastFormula('ข้อผิดพลาด: ดึงข้อมูลจากลิสต์เปล่า');
      addLog(`>>> list.pop()`);
      addLog(`IndexError: pop from empty list`);
      setTimeout(() => {
        setIsSimulating(false);
        setAnimationStep('idle');
      }, 1500);
      return;
    }

    const idxStr = popIdx.trim();
    
    // If no index is specified, pop the last element
    if (idxStr === '') {
      setIsSimulating(true);
      setAnimationStep('shifting');
      const targetIdx = list.length - 1;
      const poppedVal = list[targetIdx];
      
      setLastComplexity('O(1) - Constant Time');
      setLastFormula('เป็น O(1) เนื่องจากดึงตัวสุดท้ายออก ไม่ต้องขยับตำแหน่งหน่วยความจำตัวอื่นๆ');
      addLog(`>>> list.pop()`);
      setAnimatingIndices([targetIdx]);

      setTimeout(() => {
        setList(prev => prev.slice(0, -1));
        setAnimationStep('updated');
        setAnimatingIndices([]);
        addLog(`➔ ผลลัพธ์สำเร็จ: ดึงและลบตัวท้ายสุดคือ "${poppedVal}"`);
        
        setTimeout(() => {
          setIsSimulating(false);
          setAnimationStep('idle');
        }, 800);
      }, 1000);
      return;
    }

    const idx = parseInt(idxStr, 10);
    if (isNaN(idx) || idx < 0 || idx >= list.length) {
      setIsSimulating(true);
      setAnimationStep('error');
      setLastComplexity('O(1)');
      setLastFormula('เกิดข้อผิดพลาดในการตรวจสอบดัชนี');
      addLog(`>>> list.pop(${idxStr})`);
      addLog(`IndexError: pop index out of range (ดัชนีต้องอยู่ในช่วง 0 ถึง ${list.length - 1})`);
      setTimeout(() => {
        setIsSimulating(false);
        setAnimationStep('idle');
      }, 1500);
      return;
    }

    // Pop specific index
    setIsSimulating(true);
    setAnimationStep('shifting');
    setShiftingDirection('left');
    setLastComplexity('O(n) - Linear Time');
    setLastFormula('เนื่องจากหลังลบตำแหน่ง i แล้ว ต้องขยับข้อมูลที่อยู่ถัดไปทั้งหมดไปทางซ้าย');
    
    const poppedVal = list[idx];
    addLog(`>>> popped_value = list.pop(${idx})`);
    addLog(`➔ ดึงตัวแปรที่ต้องการนำออก: "${poppedVal}"`);

    // Highlighting popped index
    setHighlightedIndex(idx);

    setTimeout(() => {
      // Elements that need to be shifted left
      const shiftIndices = [];
      for (let i = idx + 1; i < list.length; i++) {
        shiftIndices.push(i);
      }
      setAnimatingIndices(shiftIndices);
      setHighlightedIndex(-1);
      addLog(`➔ ลบเสร็จสิ้น! ขยับข้อมูลตัวที่เหลือจากขวามาซ้ายเพื่อปิดช่องว่าง`);

      setTimeout(() => {
        setList(prev => {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        });
        setAnimationStep('updated');
        setShiftingDirection('none');
        setAnimatingIndices([]);
        addLog(`➔ คืนค่าข้อมูลที่ถูกเอาออก: "${poppedVal}"`);
        setPopIdx('');

        setTimeout(() => {
          setIsSimulating(false);
          setAnimationStep('idle');
        }, 800);
      }, 1200);

    }, 800);
  };

  // D. REMOVE
  const handleRemove = () => {
    if (isSimulating) return;
    const value = removeVal.trim();
    if (!value) {
      alert('กรุณากรอกข้อมูลที่ต้องการค้นหาเพื่อลบ');
      return;
    }

    setIsSimulating(true);
    setAnimationStep('scanning');
    setLastComplexity('O(n) - Linear Time');
    setLastFormula('เป็น O(n) เพราะต้องวนลูปสืบค้นหาข้อมูลใน Worst Case พร้อมทั้งขยับย้ายหน่วยความจำหลังลบ');
    addLog(`>>> list.remove("${value}")`);

    // Search scanning simulator loop
    let currentScan = 0;
    addLog(`➔ กำลังเริ่มสแกนข้อมูลแบบเชิงเส้น (Linear Search) ค้นหา "${value}"...`);

    const scanInterval = setInterval(() => {
      if (currentScan < list.length) {
        setScanningIdx(currentScan);
        addLog(`  - ตรวจสอบดัชนี [${currentScan}]: "${list[currentScan]}" ${list[currentScan] === value ? '== เข้าคู่กัน! (พบ)' : '!= ไม่ตรงกัน'}`);
        
        if (list[currentScan] === value) {
          clearInterval(scanInterval);
          setScanningIdx(-1);
          performRemoveAt(currentScan, value);
        } else {
          currentScan++;
        }
      } else {
        clearInterval(scanInterval);
        setScanningIdx(-1);
        setAnimationStep('error');
        addLog(`ValueError: list.remove(x): x not in list (ไม่พบ "${value}" อยู่ในรายการ)`);
        
        setTimeout(() => {
          setIsSimulating(false);
          setAnimationStep('idle');
        }, 1500);
      }
    }, 800);
  };

  const performRemoveAt = (idx, value) => {
    setAnimationStep('shifting');
    setShiftingDirection('left');
    setHighlightedIndex(idx);

    setTimeout(() => {
      const shiftIndices = [];
      for (let i = idx + 1; i < list.length; i++) {
        shiftIndices.push(i);
      }
      setAnimatingIndices(shiftIndices);
      setHighlightedIndex(-1);
      addLog(`➔ ตรวจพบข้อมูลที่ดัชนี [${idx}] ลบข้อมูลแล้วสไลด์ลิสต์ด้านหลังมาซ้าย`);

      setTimeout(() => {
        setList(prev => {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        });
        setAnimationStep('updated');
        setShiftingDirection('none');
        setAnimatingIndices([]);
        addLog(`➔ สำเร็จ! นำ "${value}" ตัวแรกที่ค้นพบออกจากลิสต์`);
        setRemoveVal('');

        setTimeout(() => {
          setIsSimulating(false);
          setAnimationStep('idle');
        }, 800);
      }, 1200);

    }, 800);
  };

  // E. LEN
  const handleLen = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setAnimationStep('updated');
    setLastComplexity('O(1) - Constant Time');
    setLastFormula('เป็น O(1) เนื่องจากระบบ Python บันทึกความยาวเก็บไว้เป็น Metadata ของออบเจกต์');

    addLog(`>>> len(list)`);
    // Light up all slots
    const allIndices = list.map((_, i) => i);
    setAnimatingIndices(allIndices);

    setTimeout(() => {
      addLog(`➔ คืนค่าความยาวรายการ: ${list.length} รายการ`);
      setAnimatingIndices([]);
      
      setTimeout(() => {
        setIsSimulating(false);
        setAnimationStep('idle');
      }, 800);
    }, 1000);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={DSA1_2_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Introduction to List ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ความหมายและคุณสมบัติ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              List (รายการ)
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ในทางวิทยาการคอมพิวเตอร์ <strong className="mx-1 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[14px]">List (รายการ)</strong> 
              คือ โครงสร้างข้อมูลเชิงเส้น (Linear Data Structure) ที่ใช้ในการจัดเก็บข้อมูลชุดแบบเรียงต่อกันเป็นลำดับในหน่วยความจำ โดยเน้นเรื่องความยืดหยุ่นในการประกาศสร้าง และการระบุพิกัดข้อมูลผ่านค่าดัชนีทั้งทางบวกและทางลบ
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    การประกาศและสร้างลิสต์ (List Declaration)
                  </h4>
                  <p className="text-[15px] text-zinc-600 leading-relaxed">
                    เราสามารถสร้าง List ในภาษา Python ได้ง่ายๆ โดยใช้เครื่องหมายวงเล็บเหลี่ยม <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-sm text-indigo-600 font-semibold">[ ]</code> (Square brackets) ในการสร้างสมาชิก และคั่นแต่ละตัวด้วยเครื่องหมายจุลภาค (Comma)
                  </p>
                  <div className="bg-slate-900 text-slate-100 rounded-xl p-3.5 font-mono text-[13px] border border-white/10 shadow-inner">
                    <span className="text-zinc-500 font-bold block mb-1">PYTHON CODE:</span>
                    <span className="text-emerald-400"># สร้างลิสต์ว่าง</span><br />
                    cargo = []<br />
                    <span className="text-emerald-400"># สร้างลิสต์ที่มีข้อมูลเริ่มต้น</span><br />
                    scores = [<span className="text-amber-300">85</span>, <span className="text-amber-300">90</span>, <span className="text-amber-300">78</span>]
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    การระบุตำแหน่งด้วยดัชนี (Indexing)
                  </h4>
                  <p className="text-[15px] text-zinc-600 leading-relaxed">
                    คือกลไกการกำหนดเลขพิกัดของแต่ละช่องข้อมูลเพื่อเข้าถึงหรือแก้ไขสมาชิกเฉพาะตัวในลิสต์ได้ทันที โดยในภาษา Python จะแบ่งการดึงตำแหน่งออกเป็น 2 รูปแบบอย่างสะดวก:
                  </p>
                  <ul className="space-y-2 text-[14.5px] text-zinc-600 pl-1">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold font-mono">1.</span>
                      <span><strong>ดัชนีปกติ (Positive Index):</strong> เริ่มตั้งแต่ <code className="px-1 py-0.2 bg-emerald-50 text-emerald-700 font-mono font-bold rounded">0</code> สำหรับตัวหน้าสุด ไล่ไปจนถึง <code className="px-1 py-0.2 bg-emerald-50 text-emerald-700 font-mono font-bold rounded">n - 1</code> ทางด้านขวา</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold font-mono">2.</span>
                      <span><strong>ดัชนีติดลบ (Negative Index):</strong> เริ่มตั้งแต่ <code className="px-1 py-0.2 bg-rose-50 text-rose-700 font-mono font-bold rounded">-1</code> สำหรับตัวท้ายสุด ไล่ย้อนกลับมาทางซ้ายจนถึง <code className="px-1 py-0.2 bg-rose-50 text-rose-700 font-mono font-bold rounded">-n</code></span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Visual Indexing Map */}
              <div className="border-t border-zinc-200/80 pt-5 space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  แผนผังการเข้าถึงข้อมูลผ่านดัชนี (Positive & Negative Index Map)
                </span>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 overflow-x-auto">
                  <div className="min-w-[480px] flex flex-col gap-2">
                    {/* Positive index row */}
                    <div className="flex gap-4">
                      <div className="w-32 shrink-0 flex items-center justify-end pr-3">
                        <span className="text-xs font-bold text-emerald-600 font-mono">Positive Index</span>
                      </div>
                      <div className="grow grid grid-cols-4 gap-3">
                        {['0', '1', '2', '3'].map((idx, i) => (
                          <div key={i} className="text-center font-mono text-xs font-bold text-emerald-600 py-1 bg-emerald-50 rounded-lg border border-emerald-100/50">
                            {idx}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Elements row */}
                    <div className="flex gap-4">
                      <div className="w-32 shrink-0 flex items-center justify-end pr-3">
                        <span className="text-xs font-bold text-slate-800">Element (ข้อมูล)</span>
                      </div>
                      <div className="grow grid grid-cols-4 gap-3">
                        {['"Apple"', '"Banana"', '"Cherry"', '"Dates"'].map((val, i) => (
                          <div key={i} className="text-center font-mono text-sm font-bold text-slate-800 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Negative index row */}
                    <div className="flex gap-4">
                      <div className="w-32 shrink-0 flex items-center justify-end pr-3">
                        <span className="text-xs font-bold text-rose-500 font-mono">Negative Index</span>
                      </div>
                      <div className="grow grid grid-cols-4 gap-3">
                        {['-4', '-3', '-2', '-1'].map((idx, i) => (
                          <div key={i} className="text-center font-mono text-xs font-bold text-rose-500 py-1 bg-rose-50 rounded-lg border border-rose-100/50">
                            {idx}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-500 leading-relaxed font-sans">
                  <div className="flex items-start gap-2 bg-emerald-50/50 border border-emerald-100/50 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p><strong>Positive Indexing:</strong> เริ่มจากดัชนี 0 ด้านหน้าสุด ไปทางขวาทีละ +1 เหมาะสำหรับใช้งานในกรณีทั่วไป</p>
                  </div>
                  <div className="flex items-start gap-2 bg-rose-50/50 border border-rose-100/50 p-2.5 rounded-xl">
                    <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <p><strong>Negative Indexing:</strong> เริ่มจากดัชนี -1 ด้านหลังสุด ย้อนมาซ้ายทีละ -1 เหมาะสำหรับเรียกใช้สมาชิกตัวท้ายๆ ของลิสต์</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Pros & Cons ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              การวิเคราะห์ประสิทธิภาพเชิงลึก
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ข้อดีและข้อเสียในการใช้โครงสร้างข้อมูลแบบ List
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Pros card */}
            <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-emerald-950 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ข้อดีเด่นของ List
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>เข้าถึงข้อมูลฉับไวทันที $O(1)$ ผ่านดัชนี (Direct Access):</strong> หากรู้ตำแหน่งดัชนีที่แน่นอน ระบบคอมพิวเตอร์สามารถดึงข้อมูลในหน่วยความจำออกมาได้รวดเร็วคงที่ระดับเสี้ยววินาที
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-1" />
                    <p>
                      <strong>เหมาะกับงานดึงข้อมูลและต่อท้าย:</strong> จัดเก็บบันทึกข้อมูลประวัติ เหตุการณ์ หรือข้อมูลที่มีทิศทางการต่อขยายที่ตำแหน่งปลายสุด (Append)
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-100 text-xs font-semibold text-emerald-800 font-mono">
                SUITABLE FOR: RANDOM INDEX LOOKUPS & APPEND OPERATIONS
              </div>
            </div>

            {/* Cons card */}
            <div className="bg-rose-50/60 backdrop-blur-md border border-rose-200/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-[20px] font-bold text-rose-950 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-rose-500" />
                  ข้อจำกัดและข้อเสียของ List
                </h4>
                <div className="space-y-4 text-[14.5px] text-slate-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>ความซับซ้อนในการลบหรือแทรกข้อมูล $O(n)$:</strong> หากกระทำการลบหรือแทรกในตำแหน่งกึ่งกลาง ลิสต์จำเป็นต้องสั่งให้คอมพิวเตอร์เลื่อนขยับสไลด์ย้ายที่อยู่ข้อมูลตัวหลังทั้งหมด
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ArrowRight className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-1" />
                    <p>
                      <strong>เสียเวลาในการสืบค้น $O(n)$:</strong> เมื่อไม่ดึงผ่านดัชนีแต่ค้นหาด้วยชื่อข้อมูล ระบบจำต้องลูปเช็คทีละโหนดตั้งแต่ตัวแรกจนถึงตัวสุดท้าย ทำให้เสียเวลานานขึ้นตามปริมาณข้อมูล
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100 text-xs font-semibold text-rose-800 font-mono">
                LIMITATION: MEMORY POSITION SHIFTING ON INSERT/DELETE
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Summary of Basic List Methods ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              คู่มือวิทยาการคำนวณ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สรุปคำสั่งพื้นฐานในการจัดการลิสต์ (List Methods Summary)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            การทำงานกับตัวแปรประเภทลิสต์ในภาษา Python มีเมธอดและฟังก์ชันการจัดการมาตรฐานหลักในการควบคุมและตรวจสอบสมาชิกดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: '.append(x)',
                subtitle: 'การเพิ่มข้อมูลต่อท้าย',
                description: 'นำค่า x ไปเพิ่มต่อเข้าท้ายสุดของลิสต์ ส่งผลให้จำนวนสมาชิกเพิ่มขึ้น 1 ตัว',
                code: 'scores.append(95)',
                result: '[85, 90, 78, 95]',
                titleClass: 'text-emerald-600',
                bgGradient: 'from-emerald-50/50 via-transparent to-transparent',
              },
              {
                title: '.insert(i, x)',
                subtitle: 'การแทรกข้อมูล ณ ดัชนี',
                description: 'แทรกค่า x เข้าไป ณ ดัชนี i สมาชิกเดิมจากดัชนีนั้นจะโดนเลื่อนขยับไปทางขวา',
                code: 'scores.insert(1, 88)',
                result: '[85, 88, 90, 78]',
                titleClass: 'text-sky-500',
                bgGradient: 'from-sky-50/50 via-transparent to-transparent',
              },
              {
                title: '.remove(x)',
                subtitle: 'การลบตามค่าข้อมูล',
                description: 'สืบค้นและลบข้อมูลที่มีค่าเท่ากับ x ตัวแรกสุดที่ตรวจพบบอกจากลิสต์',
                code: 'scores.remove(90)',
                result: '[85, 78]',
                titleClass: 'text-rose-500',
                bgGradient: 'from-rose-50/50 via-transparent to-transparent',
              },
              {
                title: 'len(list)',
                subtitle: 'การนับจำนวนสมาชิก',
                description: 'ฟังก์ชันส่วนกลางสำหรับนับและคืนจำนวนสมาชิกทั้งหมดที่อยู่ภายในลิสต์ขณะนั้น',
                code: 'len(scores)',
                result: '3',
                titleClass: 'text-amber-500',
                bgGradient: 'from-amber-50/50 via-transparent to-transparent',
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top soft ambient light glow */}
                <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${card.bgGradient} opacity-60 pointer-events-none`} />

                <div className="space-y-4 relative z-10">
                  <span className={`block font-mono text-[22px] font-bold tracking-tight ${card.titleClass}`}>
                    {card.title}
                  </span>
                  <div className="space-y-2">
                    <h4 className="text-[17px] font-bold text-slate-800 leading-tight">
                      {card.subtitle}
                    </h4>
                    <p className="text-[14px] text-slate-500 leading-relaxed min-h-[64px]">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Code Snippet Box */}
                <div className="bg-slate-50 border border-slate-100/60 rounded-xl p-3 flex justify-between items-center font-mono text-[12px] md:text-[13px] mt-6 relative z-10">
                  <span className="text-slate-700">{card.code}</span>
                  <span className="text-indigo-600 font-bold">{card.result}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Section 4: Interactive List Simulator ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              ห้องปฏิบัติการจำลอง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวจำลองตรรกะลิสต์และการขยับขยายหน่วยความจำ (List Operations Simulator)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองกรอกข้อมูลเพื่อกระทำคำสั่งต่าง ๆ ของ List สังเกตการเปลี่ยนแปลงลำดับดัชนี 
            รวมถึง **ขั้นตอนการเคลื่อนย้ายและขยับตำแหน่งหน่วยความจำ (Memory Shifting)** แบบทีละขั้น:
          </p>

          <SimulatorShell
            dark
            title="Interactive Python List Operations & Shifting Tracer"
            icon={<Cpu className="w-8 h-8 text-indigo-400" />}
            glowColors="from-zinc-900/30 to-zinc-950/10"
            iconColor="text-indigo-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Controller Panel (Left) */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  CONTROLLER
                </div>

                <div className="space-y-4 pt-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                    ปฏิบัติการที่ต้องการทดสอบ:
                  </span>

                  {/* Append Control */}
                  <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-0.5 grow">
                      <span className="text-[11px] font-mono text-indigo-300 font-bold">.append(x)</span>
                      <input
                        type="text"
                        placeholder="ข้อมูล เช่น Mango"
                        value={appendInput}
                        onChange={(e) => setAppendInput(e.target.value)}
                        disabled={isSimulating}
                        className="bg-slate-950 border border-slate-700/60 rounded px-2.5 py-1 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500 w-full"
                      />
                    </div>
                    <button
                      onClick={handleAppend}
                      disabled={isSimulating}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center gap-1 cursor-pointer shrink-0 transition-colors disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" /> Append
                    </button>
                  </div>

                  {/* Insert Control */}
                  <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="grid grid-cols-2 gap-2 grow">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-mono text-cyan-300 font-bold">.insert(i, x) - ดัชนี i</span>
                        <input
                          type="number"
                          placeholder="ดัชนี (เช่น 1)"
                          value={insertIdx}
                          onChange={(e) => setInsertIdx(e.target.value)}
                          disabled={isSimulating}
                          className="bg-slate-950 border border-slate-700/60 rounded px-2.5 py-1 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-mono text-cyan-300 font-bold">ข้อมูล x</span>
                        <input
                          type="text"
                          placeholder="ข้อมูล เช่น Pear"
                          value={insertVal}
                          onChange={(e) => setInsertVal(e.target.value)}
                          disabled={isSimulating}
                          className="bg-slate-950 border border-slate-700/60 rounded px-2.5 py-1 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 w-full"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleInsert}
                      disabled={isSimulating}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-3 px-3 rounded-lg flex items-center gap-1 cursor-pointer shrink-0 transition-colors mt-4 disabled:opacity-40"
                    >
                      <Sliders className="w-3.5 h-3.5" /> Insert
                    </button>
                  </div>

                  {/* Pop Control */}
                  <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-0.5 grow">
                      <span className="text-[11px] font-mono text-violet-300 font-bold">.pop(i) - (เว้นว่าง = ตัวท้าย)</span>
                      <input
                        type="number"
                        placeholder="ดัชนีที่จะนำออก (เช่น 0)"
                        value={popIdx}
                        onChange={(e) => setPopIdx(e.target.value)}
                        disabled={isSimulating}
                        className="bg-slate-950 border border-slate-700/60 rounded px-2.5 py-1 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-violet-500 w-full"
                      />
                    </div>
                    <button
                      onClick={handlePop}
                      disabled={isSimulating}
                      className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center gap-1 cursor-pointer shrink-0 transition-colors disabled:opacity-40"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Pop
                    </button>
                  </div>

                  {/* Remove Control */}
                  <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-0.5 grow">
                      <span className="text-[11px] font-mono text-rose-300 font-bold">.remove(x)</span>
                      <input
                        type="text"
                        placeholder="ค้นหาเพื่อลบ เช่น Banana"
                        value={removeVal}
                        onChange={(e) => setRemoveVal(e.target.value)}
                        disabled={isSimulating}
                        className="bg-slate-950 border border-slate-700/60 rounded px-2.5 py-1 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-rose-500 w-full"
                      />
                    </div>
                    <button
                      onClick={handleRemove}
                      disabled={isSimulating}
                      className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center gap-1 cursor-pointer shrink-0 transition-colors disabled:opacity-40"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  {/* Helper Operations */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleLen}
                      disabled={isSimulating}
                      className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors disabled:opacity-40"
                    >
                      <Info className="w-3.5 h-3.5" /> Check len()
                    </button>
                    <button
                      onClick={resetSimulator}
                      disabled={isSimulating}
                      className="py-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors disabled:opacity-40"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset List
                    </button>
                  </div>

                </div>

                {/* Console Logger Panel */}
                <div className="mt-6 pt-3 border-t border-slate-800">
                  <div className="bg-black/60 p-3.5 rounded-xl border border-slate-950 min-h-[110px] font-mono text-[11.5px] leading-relaxed text-teal-400 select-all overflow-y-auto max-h-[150px]">
                    <div className="text-zinc-500 border-b border-slate-900 pb-1 mb-2 uppercase tracking-wide text-[9px] font-bold">
                      Python Console Log Trace:
                    </div>
                    {simLogs.map((log, index) => {
                      const isError = log.includes('Error');
                      const isCommand = log.startsWith('>>>');
                      return (
                        <div key={index} className="animate-fadeIn">
                          {!isCommand && <span className="text-zinc-500">&gt;&gt; </span>}
                          <span className={isError ? 'text-rose-400 font-semibold' : isCommand ? 'text-indigo-300 font-bold' : 'text-teal-400'}>
                            {log}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Memory Display Panel (Right) */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[500px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  CONTIGUOUS MEMORY VISUALIZER
                </div>

                <div className="grow flex flex-col justify-between mt-6">
                  
                  {/* Slots visual layout */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                      ผังหน่วยความจำเรียงลำดับดัชนี (List indices [0-7]):
                    </span>

                    <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl">
                      {/* Grid representation */}
                      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                        {Array(8).fill(null).map((_, i) => {
                          const hasVal = i < list.length;
                          const val = list[i];
                          const isAnimating = animatingIndices.includes(i);
                          const isScanning = scanningIdx === i;
                          const isHighlighted = highlightedIndex === i;

                          let slotClass = 'border-slate-800 text-slate-650 bg-slate-950/20 border-dashed';
                          let animText = '';

                          if (hasVal) {
                            slotClass = 'border-slate-700 bg-slate-900/60 text-slate-100';
                          }

                          // Action highlights
                          if (isAnimating) {
                            if (animationStep === 'shifting') {
                              if (shiftingDirection === 'right') {
                                slotClass = 'border-cyan-500 bg-cyan-950/40 text-cyan-300 scale-[1.03] shadow-[0_0_10px_rgba(6,182,212,0.2)]';
                                animText = 'Shift ➔';
                              } else if (shiftingDirection === 'left') {
                                slotClass = 'border-violet-500 bg-violet-950/40 text-violet-300 scale-[1.03] shadow-[0_0_10px_rgba(139,92,246,0.2)]';
                                animText = '⬅ Shift';
                              } else {
                                // Default append
                                slotClass = 'border-indigo-500 bg-indigo-950/40 text-indigo-300 scale-[1.03]';
                              }
                            } else if (animationStep === 'updated') {
                              slotClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-300';
                            }
                          }

                          if (isScanning) {
                            slotClass = 'border-yellow-500 bg-yellow-950/40 text-yellow-300 ring-2 ring-yellow-500/20 scale-[1.05]';
                            animText = 'Scan ?';
                          }

                          if (isHighlighted) {
                            slotClass = 'border-rose-500 bg-rose-950/50 text-rose-300 scale-[1.05] ring-2 ring-rose-500/30';
                            animText = 'Remove';
                          }

                          return (
                            <div key={i} className="flex flex-col items-center gap-1.5">
                              {/* Element container */}
                              <div className={`w-full h-16 border rounded-xl flex flex-col justify-center items-center text-xs font-mono relative transition-all duration-300 ${slotClass}`}>
                                <span className="absolute top-1 text-[8.5px] text-slate-500 font-bold">[{i}]</span>
                                {hasVal ? (
                                  <span className="font-bold text-[13px] tracking-wide mt-2">{val}</span>
                                ) : (
                                  <span className="italic text-[10px] text-slate-700 mt-2">None</span>
                                )}
                                {animText && (
                                  <span className="absolute bottom-1 text-[8px] font-bold px-1 py-0.2 rounded bg-black/60 text-slate-300 scale-90">
                                    {animText}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-slate-500">
                                {hasVal ? `addr+${i}` : '-'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Transition arrow visualization for shifting */}
                  {animationStep === 'shifting' && shiftingDirection !== 'none' && (
                    <div className="animate-pulse bg-slate-900/60 p-2.5 border border-slate-800 rounded-xl flex items-center justify-center gap-2 text-[11px] font-mono text-cyan-400">
                      <ArrowRight className={`w-4 h-4 ${shiftingDirection === 'left' ? 'rotate-180 text-violet-400' : ''}`} />
                      <span>
                        {shiftingDirection === 'right' 
                          ? 'กำลังขยับเลื่อนสไลด์ข้อมูลขวาทีละ 1 สล็อตเพื่อแทรกข้อมูลใหม่'
                          : 'กำลังจัดเลื่อนสไลด์ดึงข้อมูลฝั่งขวามาแทนที่ดัชนีที่ว่างเปล่า'
                        }
                      </span>
                    </div>
                  )}

                  {/* Complexity and metadata bar */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mt-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">Big O Notation:</span>
                        <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {lastComplexity}
                        </span>
                      </div>
                      <div className="text-xs leading-relaxed text-slate-400 font-mono">
                        <span className="text-slate-500 font-bold block mb-0.5">รายละเอียดกระบวนการ (Process detail):</span>
                        {lastFormula}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="ภารกิจท้ายบทเรียน: ปฏิบัติการจัดการ List ใน Python"
          pin="1122"
          taskText={`[โจทย์ปฏิบัติการหลักสูตรรายวิชาโครงสร้างข้อมูล 21900-1002]
โจทย์ปฏิบัติการจัดการ List ใน Python ให้นักเรียนเขียนคำสั่งต่อไปนี้:

1. สร้างลิสต์ว่างชื่อ my_list และใช้คำสั่งเพิ่มค่า 10 เข้าไปต่อท้ายลิสต์
2. กำหนดให้ fruits = ["apple", "banana"] จงเขียนคำสั่งเพื่อเพิ่ม "orange" เข้าไปต่อท้าย
3. กำหนดให้ numbers = [1, 2, 3] จงเขียนคำสั่งเพื่อแทรกเลข 5 ไว้ที่ตำแหน่งดัชนีที่ 1
4. กำหนดให้ colors = ["red", "blue", "green"] จงเขียนคำสั่งเพื่อลบ "blue" ออกจากลิสต์
5. กำหนดให้ names = ["John", "Mary", "Bob"] จงเขียนคำสั่งเพื่อหาจำนวนสมาชิกทั้งหมดในลิสต์นี้
6. กำหนดให้ scores = [80, 90] จงเขียนคำสั่งเพิ่มคะแนน 85 และ 95 เข้าไปต่อท้ายตามลำดับ
7. กำหนดให้ letters = ["a", "c", "d"] จงเขียนคำสั่งเพื่อแทรก "b" ไว้ที่ตำแหน่งดัชนีที่ 1
8. กำหนดให้ data = [10, 20, 30, 20, 40] จงเขียนคำสั่งเพื่อลบค่า 20 (ตัวแรกสุด) ออกจากลิสต์
9. สร้างลิสต์ว่างชื่อ items ทำการเพิ่ม "pen" ลงไปต่อท้าย แล้วเขียนคำสั่งนับจำนวนสมาชิกในลิสต์ปัจจุบัน
10. กำหนดให้ animals = ["cat", "dog", "bird"] จงเขียนคำสั่งแทรก "fish" ไว้ที่ตำแหน่งแรกสุดของลิสต์ (ดัชนี 0)
11. กำหนดให้ cars = ["Toyota", "Honda", "Mazda"] จงเขียนคำสั่งเพิ่ม "Nissan" ต่อท้าย จากนั้นลบ "Honda" ออก
12. กำหนดให้ queue = ["Alice", "Bob"] จงเขียนคำสั่งเมื่อมีคนชื่อ "Charlie" มาแทรกคิวที่ตำแหน่งดัชนี 1
13. กำหนดให้ grades = ["A", "B", "C", "F", "D"] จงเขียนคำสั่งเพื่อลบ "F" ออก และแสดงผลจำนวนสมาชิกที่เหลือ
14. สร้างลิสต์ days = ["Mon", "Tue", "Wed"] แล้วใช้ฟังก์ชันตรวจสอบว่าลิสต์นี้มีความยาวเท่าใด
15. กำหนดให้ tasks = ["reading", "coding"] จงแทรก "eating" ไว้ที่ตำแหน่งดัชนี 1 และเพิ่ม "sleeping" ไว้ท้ายสุด
16. กำหนดให้ prices = [100, 200, 300] จงลบค่า 100 ออก แล้วหาจำนวนสมาชิกที่เหลือในลิสต์
17. กำหนดให้ words = ["Hello"] จงเขียนคำสั่งเพื่อเพิ่มคำว่า "World" ไปต่อท้ายลิสต์
18. กำหนดให้ temps = [32.5, 33.0, 34.5] จงแทรกค่า 32.8 ไว้ที่ตำแหน่งดัชนี 1
19. กำหนดให้ vowels = ["a", "e", "i", "o", "x", "u"] จงลบข้อมูล "x" ออกจากลิสต์
20. สร้างลิสต์ว่าง ทำการใช้คำสั่งเพิ่มตัวเลข 1, 2 และ 3 เข้าไปต่อท้ายตามลำดับ จากนั้นเขียนคำสั่งเพื่อแสดงจำนวนสมาชิกทั้งหมดที่อยู่ในลิสต์`}
        />

      </main>

    </div>
  );
}
