import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  AmbientBackdrop
} from '../shared';
import {
  ArrowRight,
  LogOut,
  Play,
  Printer,
  FileText,
  Map,
  MapPin,
  ListOrdered,
  Plus,
  ChevronRight
} from 'lucide-react';

export default function DSA2_2() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const DSA2_2_BLOBS = [
    { color: 'bg-emerald-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-teal-200', size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-cyan-200',    size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-sky-200', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── 2. Simulator Mode Selection ──────────────────────────────────────────
  const [simMode, setSimMode] = useState('fifo');

  // ==========================================================================
  // SIMULATOR 1: FIFO Queue Visualizer States
  // ==========================================================================
  const [fifoQueue, setFifoQueue] = useState(['ลูกค้า A', 'ลูกค้า B', 'ลูกค้า C']);
  const [fifoInput, setFifoInput] = useState('');
  const [fifoLogs, setFifoLogs] = useState(['ระบบเตรียมพร้อม: โหลดคิวเริ่มต้น [A, B, C]']);
  const [isFifoAnimating, setIsFifoAnimating] = useState(false);
  const [fifoActionType, setFifoActionType] = useState('idle'); 
  const [animatingItem, setAnimatingItem] = useState(null);

  const addFifoLog = (msg) => {
    setFifoLogs(prev => [...prev, msg]);
  };

  const handleFifoEnqueue = () => {
    if (isFifoAnimating) return;
    const val = fifoInput.trim();
    if (!val) {
      alert('กรุณากรอกชื่อข้อมูลที่ต้องการต่อคิว (Enqueue)');
      return;
    }
    if (fifoQueue.length >= 5) {
      alert('คิวเต็มแล้ว! (จำลองความจุสูงสุดไว้ที่ 5 โหนด)');
      return;
    }

    setIsFifoAnimating(true);
    setFifoActionType('enqueue');
    setAnimatingItem(val);
    addFifoLog(`>>> queue.append("${val}")  # ทำการ Enqueue ต่อท้ายคิว`);

    setTimeout(() => {
      setFifoQueue(prev => [...prev, val]);
      setIsFifoAnimating(false);
      setFifoActionType('idle');
      setAnimatingItem(null);
      setFifoInput('');
      addFifoLog(`➔ ดำเนินการสำเร็จ: เพิ่ม "${val}" ไปยังท้ายคิว (Rear)`);
    }, 800);
  };

  const handleFifoDequeue = () => {
    if (isFifoAnimating) return;
    if (fifoQueue.length === 0) {
      addFifoLog('>>> queue.popleft()');
      addFifoLog('IndexError: pop from empty deque (คิวว่างเปล่า ไม่สามารถนำข้อมูลออกได้)');
      alert('คิวว่างเปล่า (Underflow) ไม่สามารถนำข้อมูลออกได้!');
      return;
    }

    setIsFifoAnimating(true);
    setFifoActionType('dequeue');
    const dequeuedValue = fifoQueue[0];
    addFifoLog(`>>> queue.popleft()  # ทำการ Dequeue ข้อมูลออกจากหน้าคิว`);

    setTimeout(() => {
      setFifoQueue(prev => prev.slice(1));
      setIsFifoAnimating(false);
      setFifoActionType('idle');
      addFifoLog(`➔ ดำเนินการสำเร็จ: นำ "${dequeuedValue}" ออกจากหน้าคิว (Front)`);
    }, 800);
  };

  const resetFifo = () => {
    setFifoQueue(['ลูกค้า A', 'ลูกค้า B', 'ลูกค้า C']);
    setFifoLogs(['ระบบรีเซ็ตกลับสู่สถานะคิวเริ่มต้น [A, B, C]']);
    setFifoInput('');
    setFifoActionType('idle');
    setIsFifoAnimating(false);
  };

  // ==========================================================================
  // SIMULATOR 2: Print Spooler Simulator States
  // ==========================================================================
  const [printQueue, setPrintQueue] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printLogs, setPrintLogs] = useState(['เครื่องพิมพ์พร้อมทำงาน (Idle)']);
  const [currentPrintJob, setCurrentPrintJob] = useState(null);
  
  const addPrintLog = (msg) => {
    setPrintLogs(prev => [...prev, msg]);
  };

  const handleAddPrintJob = (docType) => {
    const jobNames = {
      pdf: 'เอกสารรายงาน.pdf',
      word: 'จดหมายเชิญ.docx',
      image: 'รูปภาพงานแต่ง.jpg'
    };
    
    const newJob = {
      id: Date.now(),
      name: jobNames[docType],
      type: docType,
      pages: Math.floor(Math.random() * 5) + 1
    };

    setPrintQueue(prev => [...prev, newJob]);
    addPrintLog(`📥 สั่งพิมพ์: ${newJob.name} (${newJob.pages} หน้า) -> เข้าสู่ Spooler Queue`);
  };

  useEffect(() => {
    if (printQueue.length > 0 && !isPrinting) {
      setIsPrinting(true);
      const jobToPrint = printQueue[0];
      setCurrentPrintJob(jobToPrint);
      addPrintLog(`🖨️ กำลังพิมพ์: ${jobToPrint.name} ...`);

      const printTimeMs = jobToPrint.pages * 400; 

      const timer = setTimeout(() => {
        setPrintQueue(prev => prev.slice(1));
        setCurrentPrintJob(null);
        setIsPrinting(false);
        addPrintLog(`✅ พิมพ์เสร็จสิ้น: ${jobToPrint.name}`);
      }, printTimeMs);

      return () => clearTimeout(timer);
    }
  }, [printQueue, isPrinting]);

  const resetPrintSpooler = () => {
    setPrintQueue([]);
    setIsPrinting(false);
    setCurrentPrintJob(null);
    setPrintLogs(['ระบบรีเซ็ต เครื่องพิมพ์พร้อมทำงาน (Idle)']);
  };

  // ==========================================================================
  // SIMULATOR 3: BFS (Breadth-First Search) Queue Visualization
  // ==========================================================================
  const [bfsQueue, setBfsQueue] = useState([]);
  const [bfsVisited, setBfsVisited] = useState([]);
  const [bfsCurrentNode, setBfsCurrentNode] = useState(null);
  const [bfsLogs, setBfsLogs] = useState(['ระบบค้นหาพร้อมจำลอง BFS']);
  const [bfsState, setBfsState] = useState('idle'); // idle, running, finished

  const graphData = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': [],
    'F': []
  };

  const addBfsLog = (msg) => {
    setBfsLogs(prev => [...prev, msg]);
  };

  const startBfs = () => {
    if (bfsState === 'running') return;
    setBfsQueue(['A']);
    setBfsVisited(['A']);
    setBfsCurrentNode(null);
    setBfsState('running');
    setBfsLogs(['▶️ เริ่มต้น BFS จากจุดศูนย์กลางโหนด A', '➔ นำ A เข้าสู่คิว (Enqueue) และทำเครื่องหมายว่าเยี่ยมชมแล้ว']);
  };

  const stepBfs = () => {
    if (bfsQueue.length === 0) {
      setBfsState('finished');
      addBfsLog('🏁 คิวว่างเปล่า สิ้นสุดการค้นหา BFS');
      return;
    }

    const current = bfsQueue[0];
    const newQueue = bfsQueue.slice(1);
    setBfsCurrentNode(current);
    addBfsLog(`\n🔎 ดึง ${current} ออกจากคิว (Dequeue) เพื่อสำรวจเพื่อนบ้าน`);

    const neighbors = graphData[current] || [];
    const newVisited = [...bfsVisited];
    
    neighbors.forEach(neighbor => {
      if (!newVisited.includes(neighbor)) {
        newVisited.push(neighbor);
        newQueue.push(neighbor);
        addBfsLog(`   ➔ พบเพื่อนบ้าน ${neighbor}: นำเข้าคิว (Enqueue)`);
      }
    });

    setBfsQueue(newQueue);
    setBfsVisited(newVisited);
  };

  const resetBfs = () => {
    setBfsQueue([]);
    setBfsVisited([]);
    setBfsCurrentNode(null);
    setBfsState('idle');
    setBfsLogs(['ระบบค้นหาพร้อมจำลอง BFS']);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      <AmbientBackdrop blobs={DSA2_2_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Definition & FIFO ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ความหมายและหลักการทำงาน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างข้อมูลคิว (Queue) และหลักการ FIFO
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
                  <strong className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[14px]">Queue (คิว)</strong> 
                  คือ โครงสร้างข้อมูลเชิงเส้นที่อนุญาตให้เข้าถึงข้อมูลจากสองฝั่ง โดยเพิ่มข้อมูลเข้าที่ด้านท้าย <strong className="text-emerald-600 font-mono text-[14px] mx-1">Rear/Back</strong> และนำข้อมูลออกที่ด้านหน้า <strong className="text-emerald-600 font-mono text-[14px] mx-1">Front</strong>
                </p>
                <div className="bg-emerald-50/40 border-l-[3.5px] border-emerald-500 rounded-r-xl p-4 text-[14.5px] text-emerald-950/90 leading-relaxed">
                  <strong>กฎเหล็ก FIFO (First-In, First-Out):</strong> ข้อมูลที่เข้ามาก่อน จะได้รับการนำออกไปใช้งานเป็นอันดับแรกเสมอ (เข้าก่อน ออกก่อน) เปรียบเหมือนการต่อคิวซื้อตั๋วหนัง
                </div>
                <ul className="space-y-2 text-[14.5px] text-zinc-600 pl-1 pt-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span><strong>Enqueue:</strong> การเพิ่มข้อมูลใหม่เข้าไปต่อท้ายคิว (Rear)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span><strong>Dequeue:</strong> การถอนข้อมูลตัวหน้าสุดออกจากระบบ (Front)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span><strong>Peek/Front:</strong> การแอบดูข้อมูลตัวหน้าสุดโดยไม่นำออก</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 flex flex-col justify-center items-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block text-center mb-4">ผังแสดงสถาปัตยกรรม FIFO</span>
              
              <div className="w-full flex items-center justify-between py-2 px-1">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    OUT
                  </div>
                  <span className="text-[11px] text-zinc-500 font-bold">ออกก่อน</span>
                </div>

                <div className="text-zinc-300">
                  <ChevronRight className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="flex-1 flex gap-1 border-y-2 border-dashed border-emerald-300 py-2 px-1 bg-emerald-50/20 shadow-inner overflow-hidden justify-end">
                  <div className="bg-sky-500/80 border border-sky-400 py-1.5 px-2 rounded text-center text-[10.5px] text-white font-bold truncate">Front (หน้าสุด)</div>
                  <div className="bg-zinc-200 border border-zinc-300 py-1.5 px-2 rounded text-center text-[10.5px] text-zinc-500 font-semibold truncate">กลาง</div>
                  <div className="bg-zinc-200 border border-zinc-300 py-1.5 px-2 rounded text-center text-[10.5px] text-zinc-500 font-semibold truncate">Rear (ท้ายสุด)</div>
                </div>

                <div className="text-zinc-300">
                  <ChevronRight className="w-5 h-5 text-indigo-500" />
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    IN
                  </div>
                  <span className="text-[11px] text-zinc-500 font-bold">เข้าทีหลัง</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Queue in Python ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">
              ตัวอย่างไวยากรณ์ภาษา
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การสร้าง Queue อย่างมีประสิทธิภาพใน Python
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
              <div>
                <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed mb-4">
                  แม้เราจะใช้ <strong>List</strong> ในการทำ Queue ได้ (โดยใช้ <code className="text-rose-500">list.pop(0)</code>) แต่จะทำให้เกิดปัญหาประสิทธิภาพ O(n) เพราะระบบต้องขยับสมาชิกทุกตัวไปข้างหน้า 1 ตำแหน่ง ดังนั้นใน Python เราจึงใช้ <strong>collections.deque</strong> (Double-Ended Queue) ซึ่งให้ประสิทธิภาพการเข้าออก O(1)
                </p>
                
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 bg-white/50 border border-zinc-200/60 p-2.5 rounded-xl">
                    <span className="px-2 py-0.5 font-mono text-xs font-bold bg-indigo-50 text-indigo-600 rounded w-20 text-center">Enqueue</span>
                    <span className="text-[13.5px] text-zinc-600 font-mono">queue.append(item)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/50 border border-zinc-200/60 p-2.5 rounded-xl">
                    <span className="px-2 py-0.5 font-mono text-xs font-bold bg-sky-50 text-sky-600 rounded w-20 text-center">Dequeue</span>
                    <span className="text-[13.5px] text-zinc-600 font-mono">queue.popleft()</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/50 border border-zinc-200/60 p-2.5 rounded-xl">
                    <span className="px-2 py-0.5 font-mono text-xs font-bold bg-emerald-50 text-emerald-600 rounded w-20 text-center">Peek</span>
                    <span className="text-[13.5px] text-zinc-600 font-mono">queue[0]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col">
              <div className="bg-slate-950 px-4 py-2 flex justify-between items-center border-b border-white/5">
                <span className="text-[11px] font-bold text-teal-400 font-mono">queue_operations.py</span>
                <span className="text-[9px] font-mono text-zinc-500">Python 3</span>
              </div>
              <div className="p-4 font-mono text-[12.5px] md:text-[13px] text-zinc-200 leading-relaxed overflow-x-auto flex-1">
                <div><span className="text-violet-400">from</span> <span className="text-zinc-300">collections</span> <span className="text-violet-400">import</span> <span className="text-zinc-300">deque</span></div>
                <br />
                <div className="text-zinc-500"># สร้างคิวเปล่า</div>
                <div><span className="text-teal-400">queue</span> = deque()</div>
                <br />
                <div className="text-zinc-500"># Enqueue: สมาชิกต่อท้ายคิว</div>
                <div><span className="text-teal-400">queue</span>.<span className="text-emerald-400">append</span>(<span className="text-amber-300">"Alice"</span>)</div>
                <div><span className="text-teal-400">queue</span>.<span className="text-emerald-400">append</span>(<span className="text-amber-300">"Bob"</span>)</div>
                <br />
                <div className="text-zinc-500"># Dequeue: นำสมาชิกหน้าสุดออกไปใช้งาน (O(1) Time)</div>
                <div><span className="text-teal-400">served</span> = <span className="text-teal-400">queue</span>.<span className="text-sky-400">popleft</span>() <span className="text-zinc-500"># คืนค่า "Alice"</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Applications ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-sky-600 tracking-wider uppercase">
              การประยุกต์ใช้งาน
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวอย่างการประยุกต์ใช้งานเชิงปฏิบัติ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-teal-500/80 space-y-2.5">
              <h4 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <span className="p-1 rounded bg-teal-50 text-teal-600"><Printer className="w-4 h-4" /></span>
                ระบบจัดการคิวงาน (Task Scheduling / Print Spooling)
              </h4>
              <p className="text-[13.5px] md:text-[14px] text-zinc-500 leading-relaxed">
                การส่งงานพิมพ์เอกสารหลายไฟล์พร้อมกัน ระบบจำนำไฟล์เก็บเข้าสู่คิว (Spooler Queue) และทยอยพิมพ์ตามลำดับคนที่สั่งก่อน เพื่อป้องกันไม่ให้ข้อมูลพิมพ์ปะปนกัน
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3px] border-l-sky-500/80 space-y-2.5">
              <h4 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <span className="p-1 rounded bg-sky-50 text-sky-600"><MapPin className="w-4 h-4" /></span>
                อัลกอริทึมการค้นหาเส้นทางแบบกว้าง (Breadth-First Search)
              </h4>
              <p className="text-[13.5px] md:text-[14px] text-zinc-500 leading-relaxed">
                ในการวิเคราะห์ข้อมูลกราฟ เช่น แผนที่หรือโซเชียลมีเดีย Queue ถูกใช้เพื่อจัดลำดับการสำรวจเพื่อนบ้านในรัศมีใกล้เคียงที่สุดออกไปเรื่อยๆ ตามลำดับแบบ FIFO
              </p>
            </div>
          </div>
        </section>

        {/* ─── Section 4: Simulators ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">
              ห้องปฏิบัติการทดลองจำลอง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เครื่องจำลองโครงสร้างคิวเสมือนจริง (Interactive Queue Simulators)
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2.5 p-1 bg-zinc-100 rounded-xl max-w-2xl">
              <button
                onClick={() => setSimMode('fifo')}
                className={`flex-1 min-w-[150px] cursor-pointer flex items-center justify-center gap-2 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all ${
                  simMode === 'fifo'
                    ? 'bg-white text-emerald-600 shadow-md scale-[1.01]'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <ListOrdered className="w-4 h-4" />
                1. โครงสร้างคิว FIFO
              </button>
              <button
                onClick={() => setSimMode('spooler')}
                className={`flex-1 min-w-[150px] cursor-pointer flex items-center justify-center gap-2 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all ${
                  simMode === 'spooler'
                    ? 'bg-white text-emerald-600 shadow-md scale-[1.01]'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Printer className="w-4 h-4" />
                2. ระบบคิวเครื่องพิมพ์
              </button>
              <button
                onClick={() => setSimMode('bfs')}
                className={`flex-1 min-w-[150px] cursor-pointer flex items-center justify-center gap-2 py-2 px-3 text-xs md:text-sm font-bold rounded-lg transition-all ${
                  simMode === 'bfs'
                    ? 'bg-white text-emerald-600 shadow-md scale-[1.01]'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Map className="w-4 h-4" />
                3. การประยุกต์ใช้ใน BFS
              </button>
            </div>

            {/* Sim 1: FIFO */}
            {simMode === 'fifo' && (
              <SimulatorShell
                title="โหมดจำลอง 1: ลำดับขั้นตอนคิวหลัก FIFO"
                subtitle="ศึกษาการแทรกข้อมูลท้ายคิวและแกะออกที่หน้าคิวตามกลไก First-In, First-Out (FIFO)"
                onReset={resetFifo}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column - Controls */}
                  <div className="lg:col-span-5 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                    <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CONTROL PANEL</span>
                    
                    <div className="space-y-5">
                      <div className="space-y-2.5 pt-3">
                        <label className="text-xs font-bold text-slate-300 block">ป้อนข้อมูลที่ต้องการต่อท้ายคิว (Enqueue)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={fifoInput}
                            onChange={(e) => setFifoInput(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') handleFifoEnqueue(); }}
                            placeholder="เช่น ลูกค้า D"
                            disabled={isFifoAnimating}
                            className="flex-1 h-[38px] px-3.5 bg-slate-950 border border-slate-700/60 rounded-[8px] text-white focus:outline-none focus:border-emerald-500 font-sans text-sm"
                          />
                          <button
                            onClick={handleFifoEnqueue}
                            disabled={isFifoAnimating}
                            className="h-[38px] px-4 cursor-pointer bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:scale-100 rounded-[8px] font-semibold flex items-center gap-1.5 transition-all text-xs"
                          >
                            <Plus className="w-4 h-4" />
                            Enqueue
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300 block">เรียกคิวถัดไป (Dequeue)</label>
                        <button
                          onClick={handleFifoDequeue}
                          disabled={isFifoAnimating}
                          className="w-full h-[40px] cursor-pointer bg-sky-600 text-white hover:bg-sky-500 hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:scale-100 rounded-[8px] font-semibold flex items-center justify-center gap-1.5 transition-all text-xs"
                        >
                          <LogOut className="w-4 h-4" />
                          Dequeue (ดึงค่าหน้าสุดออก)
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 mt-6 pt-4 space-y-2.5">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 block">COMPLEXITY ANALYSIS</span>
                      <div className="bg-slate-950/80 rounded-xl p-3 border border-white/5 space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-400">Time Complexity (collections.deque):</span>
                          <span className="text-emerald-400 font-mono font-bold">O(1)</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                          หากใช้ List ทั่วไป การ Pop ที่ index 0 จะเป็น O(n) เพราะระบบต้องเลื่อนข้อมูลตัวที่เหลือทั้งหมด
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Visual Screen */}
                  <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[350px]">
                    <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">VISUALIZER SCREEN</span>
                    
                    <div className="flex-1 flex flex-col justify-center items-center py-6">
                      <div className="relative w-full max-w-md border-y-[2px] border-dashed border-slate-700/80 bg-slate-900/40 p-4 min-h-[140px] flex gap-3 shadow-inner overflow-x-auto items-center">
                        
                        {fifoQueue.map((item, idx) => {
                          const isFront = idx === 0;
                          const isRear = idx === fifoQueue.length - 1;
                          return (
                            <div
                              key={idx}
                              className={`shrink-0 w-28 py-3 px-2 rounded-xl text-center font-bold text-xs md:text-sm shadow-md transition-all duration-300 relative flex flex-col items-center gap-2 ${
                                isFront 
                                  ? 'bg-sky-600/90 text-white border border-sky-400/50' 
                                  : 'bg-slate-800 text-slate-300 border border-slate-700'
                              }`}
                            >
                              <span className="text-[10px] text-slate-400/80 font-mono">[{idx}]</span>
                              <span className="truncate w-full">{item}</span>
                              <div className="h-4 flex items-center justify-center w-full">
                                {isFront && (
                                  <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 font-mono text-[9px] font-extrabold animate-pulse">
                                    FRONT
                                  </span>
                                )}
                                {!isFront && isRear && (
                                  <span className="px-1.5 py-0.5 rounded bg-slate-950 text-emerald-400 font-mono text-[9px] font-extrabold">
                                    REAR
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {isFifoAnimating && fifoActionType === 'enqueue' && animatingItem && (
                          <div className="shrink-0 w-28 py-3 px-2 rounded-xl text-center font-bold text-xs bg-emerald-500/50 text-emerald-100 border border-emerald-500/30 animate-pulse flex flex-col items-center gap-2">
                            <span className="text-[10px] text-emerald-400/80 font-mono">...</span>
                            <span className="truncate w-full">{animatingItem}</span>
                            <div className="h-4 flex items-center justify-center w-full">
                              <span className="text-[9px] font-mono text-emerald-300 font-extrabold animate-pulse">ENQUEUING</span>
                            </div>
                          </div>
                        )}

                        {fifoQueue.length === 0 && !isFifoAnimating && (
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-slate-500 gap-1.5">
                            <ListOrdered className="w-8 h-8 opacity-25" />
                            <span className="text-xs font-semibold tracking-wide">คิวว่างเปล่า (Empty Queue)</span>
                          </div>
                        )}
                      </div>
                      <div className="w-full max-w-md flex justify-between mt-2 px-2">
                        <span className="text-[10px] text-sky-500/70 font-bold tracking-widest">&larr; DEQUEUE ฝั่งนี้</span>
                        <span className="text-[10px] text-emerald-500/70 font-bold tracking-widest">ENQUEUE ฝั่งนี้ &rarr;</span>
                      </div>
                    </div>

                    <div className="w-full shrink-0">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1.5">OPERATION LOGS:</span>
                      <div className="bg-slate-900 rounded-xl p-3 h-24 overflow-y-auto font-mono text-[11px] md:text-xs text-zinc-300 border border-white/5 space-y-1">
                        {fifoLogs.map((log, i) => (
                          <div key={i} className={log.startsWith('➔') ? 'text-emerald-400 font-bold' : log.includes('Error') ? 'text-rose-405' : 'text-slate-400'}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </SimulatorShell>
            )}

            {/* Sim 2: Print Spooler */}
            {simMode === 'spooler' && (
              <SimulatorShell
                title="โหมดจำลอง 2: ระบบจัดการคิวเครื่องพิมพ์ (Print Spooler)"
                subtitle="สังเกตการณ์นำ Queue ไปใช้พักงานเพื่อรอให้ฮาร์ดแวร์ทำงานเสร็จทีละรายการแบบ FIFO"
                onReset={resetPrintSpooler}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Controls */}
                  <div className="lg:col-span-5 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl space-y-6 flex flex-col">
                    <div>
                      <span className="text-[11px] font-bold text-teal-400 block mb-3">1. คอมพิวเตอร์สั่งพิมพ์งาน</span>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleAddPrintJob('pdf')}
                          className="w-full text-left px-4 py-2.5 rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-between transition-all"
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <FileText className="w-4 h-4 text-rose-400" /> เอกสารรายงาน.pdf
                          </div>
                          <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400">Enqueue</span>
                        </button>
                        <button
                          onClick={() => handleAddPrintJob('word')}
                          className="w-full text-left px-4 py-2.5 rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-between transition-all"
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <FileText className="w-4 h-4 text-sky-400" /> จดหมายเชิญ.docx
                          </div>
                          <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400">Enqueue</span>
                        </button>
                        <button
                          onClick={() => handleAddPrintJob('image')}
                          className="w-full text-left px-4 py-2.5 rounded-lg cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-between transition-all"
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <FileText className="w-4 h-4 text-amber-400" /> รูปภาพงานแต่ง.jpg
                          </div>
                          <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400">Enqueue</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-950/95 border border-white/5 rounded-2xl p-4 shadow-xl mt-auto">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">SYSTEM LOGS:</span>
                      <div className="h-24 overflow-y-auto font-sans text-xs text-zinc-300 space-y-1">
                        {printLogs.map((log, i) => (
                          <div key={i} className={log.startsWith('✅') ? 'text-emerald-400 font-medium' : log.startsWith('🖨️') ? 'text-teal-400 font-medium' : log.startsWith('📥') ? 'text-indigo-300' : 'text-slate-400'}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Printer & Queue */}
                  <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl p-5 flex flex-col justify-between min-h-[380px]">
                    <span className="text-[9px] font-mono text-slate-500 block mb-4 uppercase">Print Spooler Architecture</span>
                    
                    <div className="flex-1 flex flex-col gap-6 items-center">
                      
                      {/* Printer Hardware Status */}
                      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col items-center shadow-lg relative overflow-hidden">
                        {isPrinting && <div className="absolute inset-0 bg-teal-500/10 animate-pulse pointer-events-none"></div>}
                        <Printer className={`w-10 h-10 mb-2 ${isPrinting ? 'text-teal-400 animate-pulse scale-110 transition-transform' : 'text-slate-500'}`} />
                        <h4 className="text-sm font-bold text-white mb-1">ฮาร์ดแวร์เครื่องพิมพ์</h4>
                        {currentPrintJob ? (
                          <div className="bg-slate-950 text-teal-300 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border border-teal-500/30 w-full text-center truncate relative z-10">
                            กำลังพิมพ์: {currentPrintJob.name} ({currentPrintJob.pages} หน้า)
                          </div>
                        ) : (
                          <div className="bg-slate-950 text-slate-400 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border border-slate-800 w-full text-center relative z-10">
                            รอรับงาน (Idle)
                          </div>
                        )}
                      </div>

                      <div className="w-px h-8 border-l-2 border-dashed border-slate-700"></div>

                      {/* Spooler Queue */}
                      <div className="w-full max-w-md bg-slate-900/50 border-2 border-dashed border-slate-700/80 rounded-xl p-3 min-h-[140px] flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Spooler Queue (RAM)</span>
                        {printQueue.length === 0 ? (
                          <div className="flex-1 flex items-center justify-center text-xs text-slate-600 font-semibold">
                            ไม่มีงานค้างในคิว
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 overflow-y-auto max-h-[140px] pr-1">
                            {printQueue.map((job, idx) => (
                              <div key={job.id} className="bg-slate-800 border border-slate-700 p-2.5 rounded-lg flex justify-between items-center shadow-sm">
                                <div className="flex items-center gap-2">
                                  <span className="bg-slate-950 text-slate-400 font-mono text-[9px] px-1.5 py-0.5 rounded">#{idx+1}</span>
                                  <span className="text-xs font-semibold text-slate-200 truncate max-w-[150px]">{job.name}</span>
                                </div>
                                <span className="text-[10px] text-slate-500">{job.pages} หน้า</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>
              </SimulatorShell>
            )}

            {/* Sim 3: BFS */}
            {simMode === 'bfs' && (
              <SimulatorShell
                title="โหมดจำลอง 3: การค้นหาแบบกว้าง (BFS)"
                subtitle="ดูกลไกการนำ Queue มาใช้งานเพื่อสำรวจเพื่อนบ้านทีละระดับชั้นในกราฟ"
                onReset={resetBfs}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  <div className="lg:col-span-5 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col justify-between">
                    <span className="text-[9px] font-mono text-slate-500 block mb-4">BFS CONTROL PANEL</span>
                    
                    <div className="space-y-4">
                      {bfsState === 'idle' ? (
                        <button
                          onClick={startBfs}
                          className="w-full h-[42px] cursor-pointer bg-sky-600 text-white hover:bg-sky-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm"
                        >
                          <Play className="w-4 h-4" /> เริ่มกระบวนการ BFS (ค้นหาจาก A)
                        </button>
                      ) : (
                        <button
                          onClick={stepBfs}
                          disabled={bfsState === 'finished'}
                          className="w-full h-[42px] cursor-pointer bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm"
                        >
                          <ArrowRight className="w-4 h-4" /> ดำเนินการ 1 ขั้น (Step)
                        </button>
                      )}
                      
                      <div className="bg-slate-950/80 rounded-xl p-4 border border-white/5 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-slate-400">สถานะคิว (BFS Queue):</span>
                          <span className="text-sky-400 font-mono font-bold text-sm">[{bfsQueue.join(', ')}]</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-xs font-bold text-slate-400">ลำดับการค้นพบ:</span>
                          <span className="text-emerald-400 font-mono font-bold text-[11px] max-w-[150px] truncate text-right">
                            {bfsVisited.join(' → ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">BFS ALGORITHM LOGS:</span>
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-32 overflow-y-auto font-mono text-[10px] md:text-[11px] text-zinc-300 space-y-1.5">
                        {bfsLogs.map((log, i) => (
                          <div key={i} className={log.includes('🏁') ? 'text-amber-400 font-bold' : log.includes('Dequeue') ? 'text-rose-400' : log.includes('Enqueue') ? 'text-emerald-400' : 'text-slate-400 whitespace-pre-wrap'}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl p-5 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden">
                    <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 uppercase">Graph Representation</span>
                    
                    <div className="relative w-full max-w-sm aspect-[4/3] flex items-center justify-center mt-4">
                      
                      {/* Edges */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                        <g stroke="#334155" strokeWidth="2.5" fill="none">
                          <path d="M 200 45 L 120 150" />  {/* A to B */}
                          <path d="M 200 45 L 280 150" />  {/* A to C */}
                          <path d="M 120 150 L 60 255" />  {/* B to D */}
                          <path d="M 120 150 L 180 255" /> {/* B to E */}
                          <path d="M 280 150 L 340 255" /> {/* C to F */}
                        </g>
                      </svg>

                      {/* Nodes */}
                      {[
                        { id: 'A', x: '50%', y: '15%' },
                        { id: 'B', x: '30%', y: '50%' },
                        { id: 'C', x: '70%', y: '50%' },
                        { id: 'D', x: '15%', y: '85%' },
                        { id: 'E', x: '45%', y: '85%' },
                        { id: 'F', x: '85%', y: '85%' },
                      ].map(node => {
                        const isVisited = bfsVisited.includes(node.id);
                        const isCurrent = bfsCurrentNode === node.id;
                        const inQueue = bfsQueue.includes(node.id);

                        return (
                          <div
                            key={node.id}
                            style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                            className={`absolute w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all duration-500 border-2 ${
                              isCurrent ? 'bg-amber-500 border-amber-300 text-white scale-125 z-20' :
                              inQueue ? 'bg-sky-500 border-sky-300 text-white z-10' :
                              isVisited ? 'bg-emerald-600 border-emerald-400 text-white opacity-80' :
                              'bg-slate-800 border-slate-600 text-slate-400'
                            }`}
                          >
                            {node.id}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </SimulatorShell>
            )}

          </div>
        </section>

        {/* ─── Section 5: Teacher Task ─── */}
        <section className="pt-8">
          <TeacherTask 
            title="กิจกรรมปฏิบัติงาน (Queue)" 
            taskText="ให้นักเรียนจำลองการเขียนโค้ดระบบต่อคิวธนาคารง่ายๆ ด้วย collections.deque โดยมีเมนู: 1.รับบัตรคิว 2.เรียกคิวถัดไป 3.แอบดูว่าใครคิวถัดไป และทดสอบรันผลลัพธ์ผ่าน Terminal" 
          />
        </section>

      </main>
    </div>
  );
}
