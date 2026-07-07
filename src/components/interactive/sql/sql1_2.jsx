import React, { useState, useEffect, useRef } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  ConceptCard,
  SectionBlock,
  AmbientBackdrop,
  SQL1_BLOBS
} from '../shared';
import {
  Database,
  Cpu,
  Layers,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Table,
  Merge,
  Link,
  Info,
  BookOpen,
  Terminal,
  User,
  Workflow,
  FileText,
  Check,
  Code,
  ShieldCheck,
  Globe,
  Cloud,
  TrendingUp,
  Server,
  Zap,
  CheckCircle
} from 'lucide-react';

export default function SQL1_2() {
  // ─── States for Simulator 1: Relational ──────────────────────────────────
  const [relQueryRun, setRelQueryRun] = useState(false);
  const [relCoords, setRelCoords] = useState({});
  const relContainerRef = useRef(null);
  const relCellRefs = useRef({});

  // ─── States for Simulator 2: NoSQL ───────────────────────────────────────
  const [nosqlTab, setNosqlTab] = useState('doc'); // 'doc' | 'kv' | 'graph'
  // NoSQL KV states
  const [kvStore, setKvStore] = useState({ 'session:user_1': 'อนันต์', 'session:user_2': 'บุษบา' });
  const [kvKey, setKvKey] = useState('');
  const [kvVal, setKvVal] = useState('');
  const [kvSearchKey, setKvSearchKey] = useState('');
  const [kvSearchResult, setKvSearchResult] = useState(null);
  const [kvLogs, setKvLogs] = useState(['ระบบ Key-Value Cache พร้อมทำงาน']);
  // NoSQL Doc states
  const [docAge, setDocAge] = useState(21);
  const [docHobbies, setDocHobbies] = useState(['เขียนโปรแกรม', 'เล่นบอร์ดเกม']);
  const [hobbyInput, setHobbyInput] = useState('');
  // NoSQL Graph coords
  const [graphCoords, setGraphCoords] = useState({});
  const graphContainerRef = useRef(null);
  const graphNodeRefs = useRef({});

  // ─── States for Simulator 3: Object-Oriented ──────────────────────────────
  const [ooScore, setOoScore] = useState(82);
  const [ooMethodActive, setOoMethodActive] = useState(false);
  const [ooResultText, setOoResultText] = useState('เมธอดคำนวณเกรดยังไม่ถูกเรียก');

  // ─── States for Simulator 4: Distributed ──────────────────────────────────
  const [distReplicating, setDistReplicating] = useState(false);
  const [nodeBOffline, setNodeBOffline] = useState(false);
  const [distLogs, setDistLogs] = useState(['ระบบคลัสเตอร์ distributed พร้อมทำงาน']);
  const [distCoords, setDistCoords] = useState({});
  const distContainerRef = useRef(null);
  const distNodeRefs = useRef({});

  // ─── States for Simulator 5: Cloud Database ───────────────────────────────
  const [cloudTraffic, setCloudTraffic] = useState(30); // 30% to 100%
  const [cloudInstances, setCloudInstances] = useState(1);
  const [cloudScaling, setCloudScaling] = useState(false);

  // ─── States for Simulator 6: Data Warehouse (ETL & OLAP) ──────────────────
  const [etlStep, setEtlStep] = useState(0); // 0: idle, 1: extracting, 2: transforming, 3: loading, 4: complete
  const [etlLogs, setEtlLogs] = useState(['พร้อมสำหรับกระบวนการ ETL...']);
  const [etlCoords, setEtlCoords] = useState({});
  const etlContainerRef = useRef(null);
  const etlRefs = useRef({});

  // ─── Coordinate Handlers ──────────────────────────────────────────────────
  const updateAllCoords = () => {
    // 1. Relational
    if (relContainerRef.current) {
      const containerRect = relContainerRef.current.getBoundingClientRect();
      const newCoords = {};
      Object.keys(relCellRefs.current).forEach(key => {
        const el = relCellRefs.current[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          newCoords[key] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
          };
        }
      });
      setRelCoords(newCoords);
    }

    // 2. NoSQL Graph
    if (graphContainerRef.current && nosqlTab === 'graph') {
      const containerRect = graphContainerRef.current.getBoundingClientRect();
      const newCoords = {};
      Object.keys(graphNodeRefs.current).forEach(key => {
        const el = graphNodeRefs.current[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          newCoords[key] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
          };
        }
      });
      setGraphCoords(newCoords);
    }

    // 4. Distributed
    if (distContainerRef.current) {
      const containerRect = distContainerRef.current.getBoundingClientRect();
      const newCoords = {};
      Object.keys(distNodeRefs.current).forEach(key => {
        const el = distNodeRefs.current[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          newCoords[key] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
          };
        }
      });
      setDistCoords(newCoords);
    }

    // 6. ETL Pipeline
    if (etlContainerRef.current) {
      const containerRect = etlContainerRef.current.getBoundingClientRect();
      const newCoords = {};
      Object.keys(etlRefs.current).forEach(key => {
        const el = etlRefs.current[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          newCoords[key] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2
          };
        }
      });
      setEtlCoords(newCoords);
    }
  };

  useEffect(() => {
    updateAllCoords();
    window.addEventListener('resize', updateAllCoords);
    const timer = setTimeout(updateAllCoords, 300);
    return () => {
      window.removeEventListener('resize', updateAllCoords);
      clearTimeout(timer);
    };
  }, [nosqlTab, relQueryRun, ooScore, nodeBOffline, cloudTraffic, etlStep]);

  // ─── Key-Value Actions ────────────────────────────────────────────────────
  const handleKvSet = () => {
    if (!kvKey.trim() || !kvVal.trim()) return;
    setKvStore(prev => ({ ...prev, [kvKey.trim()]: kvVal.trim() }));
    setKvLogs(prev => [`[SET] บันทึกคู่ key: "${kvKey}" และ value: "${kvVal}" สำเร็จ`, ...prev]);
    setKvKey('');
    setKvVal('');
  };

  const handleKvGet = () => {
    if (!kvSearchKey.trim()) return;
    const value = kvStore[kvSearchKey.trim()];
    if (value !== undefined) {
      setKvSearchResult(`พบข้อมูล: ${value}`);
      setKvLogs(prev => [`[GET] ค้นหา key: "${kvSearchKey}" -> ผลลัพธ์: "${value}" (เวลาค้นหา O(1))`, ...prev]);
    } else {
      setKvSearchResult('ไม่พบข้อมูล (Key Not Found)');
      setKvLogs(prev => [`[GET] ค้นหา key: "${kvSearchKey}" -> ไม่พบสมาชิกในแคช`, ...prev]);
    }
  };

  // ─── Object-Oriented Methods Simulation ──────────────────────────────────
  const calculateGradeMethod = () => {
    setOoMethodActive(true);
    setOoResultText('กำลังเรียกคำสั่ง StudentObject.getGrade()...');
    setTimeout(() => {
      let grade = 'F';
      if (ooScore >= 80) grade = 'A';
      else if (ooScore >= 70) grade = 'B';
      else if (ooScore >= 60) grade = 'C';
      else if (ooScore >= 50) grade = 'D';
      setOoResultText(`[getGrade Result] ผลลัพธ์จากการคำนวณแอตทริบิวต์ score (${ooScore}): ได้เกรด "${grade}"`);
      setOoMethodActive(false);
    }, 1000);
  };

  // ─── Distributed Replication Simulation ───────────────────────────────────
  const runReplication = () => {
    if (distReplicating) return;
    setDistReplicating(true);
    setDistLogs(prev => ['[CLIENT] เริ่มยิงส่งเขียนข้อมูลลูกค้าใหม่ลงโหนด A (Master)...', ...prev]);

    setTimeout(() => {
      setDistLogs(prev => ['[NODE A (Bangkok)] บันทึกข้อมูลสำเร็จ! เริ่มทำกระบวนการ Replication ไปโหนดปลายทาง...', ...prev]);
      
      setTimeout(() => {
        if (nodeBOffline) {
          setDistLogs(prev => [
            '[NODE B (Tokyo)] ❌ ล้มเหลว! โหนดหยุดทำงาน (Offline) ไม่สามารถอัปเดตได้',
            `[NODE C (Singapore)] ✅ อัปเดตข้อมูลสำเร็จ!`,
            '[CLIENT] ⚠️ ระบบทำงานต่อได้สำเร็จตามกลไก High Availability (Fault Tolerance)',
            ...prev
          ]);
        } else {
          setDistLogs(prev => [
            `[NODE B (Tokyo)] ✅ อัปเดตข้อมูลสำเร็จ!`,
            `[NODE C (Singapore)] ✅ อัปเดตข้อมูลสำเร็จ!`,
            '[CLIENT] 🎉 การจำลองข้อมูลเขียนกระจายตัวเสร็จสิ้นสมบูรณ์แบบ (Data Replicated)',
            ...prev
          ]);
        }
        setDistReplicating(false);
      }, 1500);

    }, 1200);
  };

  // ─── Cloud Database Auto-scaling simulation ──────────────────────────────
  useEffect(() => {
    if (cloudTraffic > 70 && cloudInstances === 1 && !cloudScaling) {
      setCloudScaling(true);
      setTimeout(() => {
        setCloudInstances(2);
        setCloudScaling(false);
      }, 1500);
    } else if (cloudTraffic <= 70 && cloudInstances === 2 && !cloudScaling) {
      setCloudScaling(true);
      setTimeout(() => {
        setCloudInstances(1);
        setCloudScaling(false);
      }, 1500);
    }
  }, [cloudTraffic, cloudInstances]);

  // ─── Data Warehouse ETL simulation ───────────────────────────────────────
  const runEtlPipeline = () => {
    if (etlStep > 0 && etlStep < 4) return;
    setEtlStep(1);
    setEtlLogs(['[ETL] ขั้นตอนที่ 1: ทำการดึงข้อมูลดิบ (Extracting) จากตาราง Sales และ Log Files...']);

    setTimeout(() => {
      setEtlStep(2);
      setEtlLogs(prev => [
        '[ETL] ขั้นตอนที่ 2: ทำการปรับแต่งแปลงโครงสร้าง (Transforming)',
        '- ล้างเรคคอร์ดที่มีค่าผิดปกติออก',
        '- เปลี่ยนแปลงรูปแบบฟอร์แมตวันที่เป็นมาตรฐานสากล ISO',
        '- คำนวณเพิ่มยอดรวมสุทธิ',
        ...prev
      ]);

      setTimeout(() => {
        setEtlStep(3);
        setEtlLogs(prev => [
          '[ETL] ขั้นตอนที่ 3: ทำการโหลดข้อมูลสะสม (Loading) ลง Data Warehouse OLAP Cube...',
          ...prev
        ]);

        setTimeout(() => {
          setEtlStep(4);
          setEtlLogs(prev => [
            '🎉 [ETL เสร็จสิ้น] โหลดข้อมูลลง Data Warehouse เรียบร้อย!',
            '-> รายงาน Business Intelligence (BI) แสดงการประเมินยอดขายเชิงลึกพร้อมพล็อตสถิติสดสำเร็จ',
            ...prev
          ]);
        }, 1500);

      }, 1500);

    }, 1500);
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Intro Section ─── */}
        <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
          การจัดแบ่งประเภทของฐานข้อมูลตามโครงสร้างและรูปแบบการจัดเก็บข้อมูลในปัจจุบันได้รับการพัฒนาให้มีความหลากหลาย 
          เพื่อตอบสนองต่อลักษณะความซับซ้อนและขนาดข้อมูล (Scale) ที่เปลี่ยนไปอย่างรวดเร็ว 
          เราสามารถแบ่งประเภทฐานข้อมูลตามมาตรฐานสากลเชิงวิศวกรรมคอมพิวเตอร์ออกเป็น 6 หมวดหมู่หลักดังต่อไปนี้:
        </p>

        {/* ─── Section 1: Relational Database ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              1. ฐานข้อมูลเชิงสัมพันธ์ / Relational Database
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างแบบตารางคีย์สัมพันธ์ตามมาตรฐาน ACID
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              เป็นรูปแบบการจัดเก็บข้อมูลที่ได้รับความนิยมสูงสุดและมีความน่าเชื่อถือสูงมาก จัดเก็บข้อมูลในลักษณะตาราง (Table) 
              ที่ประกอบด้วยแถว (Records) และคอลัมน์ (Fields) มีความสัมพันธ์เชื่อมโยงถึงกันผ่านคีย์หลัก (Primary Key) 
              และคีย์นอก (Foreign Key) ระบบนี้รับประกันความปลอดภัยภายใต้ข้อกำหนด <span className="bg-blue-100/50 border border-blue-200/50 text-blue-700 font-mono text-[13px] px-1.5 py-0.5 rounded font-semibold">ACID Properties</span> 
              เพื่อให้ระบบไม่ได้รับผลกระทบเมื่อเกิดไฟฟ้าดับหรือระบบล่มกะทันหัน เหมาะสมกับระบบธุรกรรมการเงินและ ERP ระบบจัดการคลังที่ใหญ่ที่สุด ได้แก่ MySQL, PostgreSQL และ SQL Server
            </p>

            <SimulatorShell
              dark
              title="Relational Schema & Primary Key mapping"
              icon={<Table className="w-8 h-8 text-blue-400" />}
              glowColors="from-blue-600/20 to-cyan-500/10"
              iconColor="text-blue-400"
            >
              <div ref={relContainerRef} className="space-y-8 mt-4 relative">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Table Students */}
                  <div className="lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-4 border border-white/5 shadow-2xl relative">
                    <span className="text-[9px] font-mono text-slate-500 block mb-3">TABLE: Students (ตารางนักเรียน)</span>
                    <table className="w-full text-xs font-sans text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 text-left">
                          <th>student_id (PK)</th>
                          <th>name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-900">
                          <td ref={el => relCellRefs.current['std-1'] = el} className="py-2.5 font-mono text-blue-400 font-bold">STD01</td>
                          <td className="py-2.5 text-white">แอน</td>
                        </tr>
                        <tr>
                          <td ref={el => relCellRefs.current['std-2'] = el} className="py-2.5 font-mono text-blue-400 font-bold">STD02</td>
                          <td className="py-2.5 text-white">บ็อบ</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Table Grades */}
                  <div className="lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-4 border border-white/5 shadow-2xl relative">
                    <span className="text-[9px] font-mono text-slate-500 block mb-3">TABLE: Grades (ตารางผลการเรียน)</span>
                    <table className="w-full text-xs font-sans text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 text-left">
                          <th>record_id</th>
                          <th>student_id (FK)</th>
                          <th>gpa</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-900">
                          <td className="py-2.5 font-mono text-slate-500">REC101</td>
                          <td ref={el => relCellRefs.current['grade-fk1'] = el} className="py-2.5 font-mono text-cyan-400 font-bold">STD01</td>
                          <td className="py-2.5 text-emerald-400 font-bold">3.85</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-mono text-slate-500">REC102</td>
                          <td ref={el => relCellRefs.current['grade-fk2'] = el} className="py-2.5 font-mono text-cyan-400 font-bold">STD02</td>
                          <td className="py-2.5 text-emerald-400 font-bold">3.20</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SVG connection lines for Relational Keys */}
                {relCoords['std-1'] && relCoords['grade-fk1'] && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <defs>
                      <marker id="rel-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#06B6D4" />
                      </marker>
                    </defs>
                    <path
                      d={`M ${relCoords['std-1'].x} ${relCoords['std-1'].y} L ${relCoords['grade-fk1'].x} ${relCoords['grade-fk1'].y}`}
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="2"
                      className="opacity-75 animate-pulse"
                      markerEnd="url(#rel-arrow)"
                    />
                    {relCoords['std-2'] && relCoords['grade-fk2'] && (
                      <path
                        d={`M ${relCoords['std-2'].x} ${relCoords['std-2'].y} L ${relCoords['grade-fk2'].x} ${relCoords['grade-fk2'].y}`}
                        fill="none"
                        stroke="#06B6D4"
                        strokeWidth="2"
                        className="opacity-75 animate-pulse"
                        markerEnd="url(#rel-arrow)"
                      />
                    )}
                  </svg>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-800">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">SQL query execution</span>
                    <pre className="font-mono text-xs text-blue-400 bg-black/40 p-2.5 rounded-lg">
                      SELECT Students.name, Grades.gpa FROM Students INNER JOIN Grades ON Students.student_id = Grades.student_id;
                    </pre>
                  </div>
                  <button
                    onClick={() => setRelQueryRun(!relQueryRun)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95 shrink-0"
                  >
                    <Play className="w-4 h-4" /> {relQueryRun ? 'รีเซ็ตผลลัพธ์' : 'คิวรี JOIN ข้อมูล'}
                  </button>
                </div>

                {relQueryRun && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-blue-900/30 text-white space-y-2.5 animate-fadeIn">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block">OUTPUT RESULT TABLE (ผลลัพธ์คำสั่ง)</span>
                    <table className="w-full text-xs text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500 text-left font-mono">
                          <th className="pb-1.5">name</th>
                          <th className="pb-1.5">gpa</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-900">
                          <td className="py-2 text-white font-semibold">แอน</td>
                          <td className="py-2 text-emerald-400 font-mono">3.85</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-white font-semibold">บ็อบ</td>
                          <td className="py-2 text-emerald-400 font-mono">3.20</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </SimulatorShell>
          </div>
        </section>

        {/* ─── Section 2: NoSQL Database ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              2. ฐานข้อมูลแบบไม่เชิงสัมพันธ์ / NoSQL Database
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ความยืดหยุ่นในข้อมูลขนาดใหญ่ที่ไร้โครงสร้างและสเกลระนาบ
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ถูกสร้างมาเพื่อทลายข้อจำกัดของโครงสร้างตารางสัมพันธ์แบบดั้งเดิม เหมาะสำหรับการจัดการข้อมูลขนาดใหญ่ (Big Data) 
              ที่มีโครงสร้างไม่คงที่หรือต้องการปรับตัวแปรอัปเกรดฟิลด์ด่วน โดดเด่นด้านความสามารถในการขยายระบบในแนวระนาบ (Horizontal Scaling) 
              แบ่งย่อยเป็น 3 รูปแบบยอดนิยมคือ Document Store (จัดเก็บเป็นเอกสาร JSON เช่น MongoDB), Key-Value Store (จัดเก็บคู่รหัส เช่น Redis) 
              และ Graph Database (จัดเก็บเครือข่ายความจริงของ Node และเส้นเชื่อมต่อสัมพันธ์ เช่น Neo4j)
            </p>

            <SimulatorShell
              dark
              title="NoSQL Multi-model Playground"
              icon={<Layers className="w-8 h-8 text-cyan-400" />}
              glowColors="from-cyan-600/20 to-teal-500/10"
              iconColor="text-cyan-400"
            >
              <div className="space-y-6 mt-4">
                {/* NoSQL Tab selectors */}
                <div className="flex border-b border-slate-800 pb-2 gap-2">
                  {[
                    { id: 'doc', label: 'Document Store (MongoDB JSON)' },
                    { id: 'kv', label: 'Key-Value Cache (Redis Memory)' },
                    { id: 'graph', label: 'Graph Database (Neo4j Connections)' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setNosqlTab(tab.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all
                        ${nosqlTab === tab.id
                          ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/60 shadow-inner'
                          : 'text-slate-500 hover:text-slate-300'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Sub Tab: Document Store */}
                {nosqlTab === 'doc' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch animate-fadeIn">
                    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        ปรับเปลี่ยนแอตทริบิวต์เอกสารสด
                      </h5>
                      <p className="text-xs text-slate-400">
                        คุณสามารถเพิ่มคุณสมบัติหรือปรับเปลี่ยนแอตทริบิวต์ได้ทันทีโดยไม่ต้องกำหนดโครงสร้างล่วงหน้า (Schema-less)
                      </p>
                      
                      <div className="space-y-3">
                        <label className="text-[13px] text-slate-300 block">อายุผู้เรียน (age):</label>
                        <input
                          type="number"
                          value={docAge}
                          onChange={e => setDocAge(Number(e.target.value))}
                          className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white w-full focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[13px] text-slate-300 block">งานอดิเรก (hobbies):</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={hobbyInput}
                            onChange={e => setHobbyInput(e.target.value)}
                            placeholder="พิมพ์งานอดิเรกใหม่..."
                            className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white grow focus:border-cyan-500"
                          />
                          <button
                            onClick={() => {
                              if (!hobbyInput.trim()) return;
                              setDocHobbies([...docHobbies, hobbyInput.trim()]);
                              setHobbyInput('');
                            }}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-3 py-2 rounded-xl cursor-pointer"
                          >
                            เพิ่ม
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {docHobbies.map((h, i) => (
                            <span key={i} className="text-[10px] bg-slate-800 text-cyan-400 px-2 py-0.5 rounded-lg flex items-center gap-1">
                              {h}
                              <button
                                onClick={() => setDocHobbies(docHobbies.filter((_, idx) => idx !== i))}
                                className="text-slate-500 hover:text-red-400 font-bold cursor-pointer"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                      <span className="text-[10px] font-mono text-slate-500 block">MONGO DOCUMENT BSON / JSON DISPLAY</span>
                      <pre className="font-mono text-[13.5px] text-cyan-400 bg-black/40 p-4 rounded-xl shadow-inner grow mt-3 overflow-y-auto">
{`{
  "_id": "647b1f3e2ba0b0",
  "name": "แอน",
  "age": ${docAge},
  "enrolled": true,
  "hobbies": [
${docHobbies.map(h => `    "${h}"`).join(',\n')}
  ]
}`}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Sub Tab: Key-Value */}
                {nosqlTab === 'kv' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch animate-fadeIn">
                    <div className="md:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        Redis cache console
                      </h5>

                      <div className="space-y-3">
                        <span className="text-[11px] font-mono text-slate-400 block uppercase font-bold">1. บันทึกคำสั่ง SET</span>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Key (เช่น token)"
                            value={kvKey}
                            onChange={e => setKvKey(e.target.value)}
                            className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white"
                          />
                          <input
                            type="text"
                            placeholder="Value (เช่น A99)"
                            value={kvVal}
                            onChange={e => setKvVal(e.target.value)}
                            className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                        <button
                          onClick={handleKvSet}
                          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-2 rounded-xl cursor-pointer"
                        >
                          สั่งรัน SET KEY VALUE
                        </button>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-slate-800">
                        <span className="text-[11px] font-mono text-slate-400 block uppercase font-bold">2. ค้นคืนคำสั่ง GET</span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="พิมพ์ชื่อ Key ค้นหา..."
                            value={kvSearchKey}
                            onChange={e => setKvSearchKey(e.target.value)}
                            className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white grow"
                          />
                          <button
                            onClick={handleKvGet}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-3 rounded-xl border border-slate-700 cursor-pointer"
                          >
                            GET
                          </button>
                        </div>
                        {kvSearchResult && (
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-cyan-900/30 text-xs text-cyan-400 font-mono">
                            {kvSearchResult}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-7 bg-slate-950 p-5 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[300px]">
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 block mb-3">REDIS LOG STREAM & RAM DATA BUCKET</span>
                        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 max-h-[140px] overflow-y-auto space-y-1 font-mono text-[12px] text-slate-400">
                          {kvLogs.map((log, idx) => (
                            <div key={idx}>
                              <span className="text-slate-600">&gt;</span> {log}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800">
                        <span className="text-[10px] text-slate-500 block mb-2 font-mono">BUCKET MEMORY STATE</span>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.keys(kvStore).map(key => (
                            <div key={key} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono">
                              <span className="text-yellow-400">{key}</span>
                              <span className="text-cyan-400 font-bold">{kvStore[key]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub Tab: Graph */}
                {nosqlTab === 'graph' && (
                  <div ref={graphContainerRef} className="bg-slate-950 rounded-2xl border border-white/5 p-5 relative min-h-[300px] flex flex-col justify-between animate-fadeIn">
                    <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 uppercase">Neo4j Graph Graph Database</span>
                    
                    <div className="w-full h-[220px] relative flex items-center justify-between px-10">
                      
                      {/* Node 1: User */}
                      <div 
                        ref={el => graphNodeRefs.current['n-user'] = el}
                        className="w-24 h-24 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-400 flex flex-col items-center justify-center text-center p-2 relative z-10 hover:scale-105 transition-transform"
                      >
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">:User</span>
                        <span className="text-xs font-bold text-white mt-1">แอน (Anna)</span>
                      </div>

                      {/* Node 2: Product */}
                      <div 
                        ref={el => graphNodeRefs.current['n-prod'] = el}
                        className="w-24 h-24 rounded-full bg-blue-950 border border-blue-500 text-blue-400 flex flex-col items-center justify-center text-center p-2 relative z-10 hover:scale-105 transition-transform"
                      >
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">:Product</span>
                        <span className="text-xs font-bold text-white mt-1">MacBook Pro</span>
                      </div>

                      {/* Node 3: Brand */}
                      <div 
                        ref={el => graphNodeRefs.current['n-brand'] = el}
                        className="w-24 h-24 rounded-full bg-amber-950 border border-amber-500 text-amber-400 flex flex-col items-center justify-center text-center p-2 relative z-10 hover:scale-105 transition-transform"
                      >
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">:Brand</span>
                        <span className="text-xs font-bold text-white mt-1">Apple Inc.</span>
                      </div>

                      {/* Graph relationship paths */}
                      {graphCoords['n-user'] && graphCoords['n-prod'] && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                          <defs>
                            <marker id="g-arrow-cyan" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#06B6D4" />
                            </marker>
                            <marker id="g-arrow-amber" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F59E0B" />
                            </marker>
                          </defs>

                          {/* Line User -> Product */}
                          <path
                            d={`M ${graphCoords['n-user'].x} ${graphCoords['n-user'].y} L ${graphCoords['n-prod'].x} ${graphCoords['n-prod'].y}`}
                            fill="none"
                            stroke="#06B6D4"
                            strokeWidth="2.5"
                            markerEnd="url(#g-arrow-cyan)"
                          />
                          <text 
                            x={(graphCoords['n-user'].x + graphCoords['n-prod'].x) / 2} 
                            y={(graphCoords['n-user'].y + graphCoords['n-prod'].y) / 2 - 10}
                            fill="#06B6D4"
                            textAnchor="middle"
                            className="text-[9px] font-mono font-bold bg-slate-950"
                          >
                            BOUGHT (ซื้อ)
                          </text>

                          {/* Line Product -> Brand */}
                          {graphCoords['n-brand'] && (
                            <>
                              <path
                                d={`M ${graphCoords['n-prod'].x} ${graphCoords['n-prod'].y} L ${graphCoords['n-brand'].x} ${graphCoords['n-brand'].y}`}
                                fill="none"
                                stroke="#F59E0B"
                                strokeWidth="2.5"
                                markerEnd="url(#g-arrow-amber)"
                              />
                              <text 
                                x={(graphCoords['n-prod'].x + graphCoords['n-brand'].x) / 2} 
                                y={(graphCoords['n-prod'].y + graphCoords['n-brand'].y) / 2 - 10}
                                fill="#F59E0B"
                                textAnchor="middle"
                                className="text-[9px] font-mono font-bold"
                              >
                                MADE_BY (ผลิตโดย)
                              </text>
                            </>
                          )}
                        </svg>
                      )}
                    </div>

                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 mt-4">
                      <span className="text-[10px] font-mono text-cyan-400 block font-semibold mb-1">Cypher Query (ภาษาคิวรีของกราฟ):</span>
                      <code className="font-mono text-xs text-slate-300">
                        MATCH (u:User {`{name: 'แอน'}`})-[r:BOUGHT]-&gt;(p:Product) RETURN p.name;
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </SimulatorShell>
          </div>
        </section>

        {/* ─── Section 3: Object-Oriented Database ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              3. ฐานข้อมูลเชิงวัตถุ / Object-Oriented Database
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การผสานรวมคุณสมบัติและพฤติกรรมในหน่วยเก็บออบเจกต์
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ทำงานภายใต้แนวคิดเดียวกับการเขียนโปรแกรมเชิงวัตถุ (OOP) ข้อมูลจะไม่ถูกแบ่งซอยออกเป็นตารางหลายตารางแล้วคอยนำมารวมใหม่ 
              แต่จะถูกจัดเก็บเป็น <span className="bg-blue-100/50 border border-blue-200/50 text-blue-700 font-mono text-[13px] px-1.5 py-0.5 rounded font-semibold">ออบเจกต์ (Object)</span> เดียวที่มีทั้งคุณสมบัติ (Attributes) 
              และเมธอดการคำนวณ (Methods/Behaviors) กอดคออยู่ร่วมกัน เหมาะอย่างยิ่งกับงานข้อมูลโครงสร้างเชิงวิศวกรรมสลับซับซ้อน เช่น CAD/CAM 3 มิติ, 
              ภูมิสารสนเทศ (GIS), หรือวัตถุมัลติมีเดียความละเอียดสูง
            </p>

            <SimulatorShell
              dark
              title="Object Storage Cell & Method Executions"
              icon={<Cpu className="w-8 h-8 text-amber-400" />}
              glowColors="from-amber-600/20 to-orange-500/10"
              iconColor="text-amber-400"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mt-4">
                {/* Object Attributes Controller */}
                <div className="md:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h5 className="text-sm font-bold text-white flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-amber-400" />
                    อัปเดตแอตทริบิวต์ในออบเจกต์
                  </h5>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>คะแนนสอบ (score):</span>
                      <span className="font-mono text-amber-400 font-bold">{ooScore} คะแนน</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={ooScore}
                      onChange={e => {
                        setOoScore(Number(e.target.value));
                        setOoResultText('แอตทริบิวต์ score ถูกอัปเดต - เมธอดคำนวณเกรดยังไม่ถูกเรียก');
                      }}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={calculateGradeMethod}
                    disabled={ooMethodActive}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer disabled:opacity-40 transition-all"
                  >
                    {ooMethodActive ? 'กำลังทำงาน...' : 'สั่งรันเมธอด getGrade()'}
                  </button>
                </div>

                {/* Object representation */}
                <div className="md:col-span-7 bg-slate-950 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Object Cell: Student (instance of student class)</span>
                  
                  <div className="my-4 p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="text-amber-400 font-semibold">// Attributes (ข้อมูลคุณสมบัติ)</div>
                    <div className="pl-4 text-slate-300">
                      student_id: <span className="text-white">"STD001"</span>,<br />
                      name: <span className="text-white">"แอน"</span>,<br />
                      score: <span className="text-amber-500 font-bold">{ooScore}</span>
                    </div>

                    <div className="text-cyan-400 font-semibold pt-2">// Methods (พฤติกรรมโปรแกรม)</div>
                    <div className="pl-4 text-slate-400">
                      def getGrade(self):<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;if self.score &gt;= 80: return "A"<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;else: return "Pass"
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-400">
                    <span className="text-slate-500">&gt; </span> {ooResultText}
                  </div>
                </div>
              </div>
            </SimulatorShell>
          </div>
        </section>

        {/* ─── Section 4: Distributed Database ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              4. ฐานข้อมูลแบบกระจาย / Distributed Database
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การกระจายโหนดข้อมูลข้ามภูมิภาคเพื่อความปลอดภัยระบบล่ม
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              เป็นโครงสร้างที่ข้อมูลไม่ได้กองอยู่รวมกันที่โฮสต์เซิร์ฟเวอร์เดียว แต่จะทำการกระจายหรือจำลองสำเนาข้อมูลข้าม 
              (Replication) ไปจัดเก็บบนเครื่องเซิร์ฟเวอร์ที่อยู่ห่างไกลกันคนละภูมิภาคผ่านระบบเครือข่ายคอมพิวเตอร์ 
              ช่วยยกระดับความทนทานต่อความล้มเหลว (Fault Tolerance) หากโหนดใดโหนดหนึ่งพังพินาศ ดับวูบไป 
              ระบบโดยรวมจะยังคงเปิดรับและทำงานต่อไปได้โดยไม่มีข้อผิดพลาดเดดล็อก
            </p>

            <SimulatorShell
              dark
              title="Distributed Replication & Fault Tolerance Visualizer"
              icon={<Globe className="w-8 h-8 text-emerald-400" />}
              glowColors="from-emerald-600/20 to-teal-500/10"
              iconColor="text-emerald-400"
            >
              <div ref={distContainerRef} className="space-y-6 mt-4 relative">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Controller */}
                  <div className="lg:col-span-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">โต้ตอบคลัสเตอร์</h5>
                      <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-300">จำลองโหนด B ออฟไลน์</span>
                        <input
                          type="checkbox"
                          checked={nodeBOffline}
                          onChange={e => setNodeBOffline(e.target.checked)}
                          className="w-4 h-4 accent-red-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <button
                      onClick={runReplication}
                      disabled={distReplicating}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl cursor-pointer mt-6 transition-all"
                    >
                      {distReplicating ? 'กำลังจำลองข้อมูล...' : 'ส่งเขียนคำสั่ง WRITE'}
                    </button>
                  </div>

                  {/* Nodes diagram */}
                  <div className="lg:col-span-8 bg-slate-950 p-6 rounded-2xl border border-white/5 relative min-h-[220px] flex items-center justify-around">
                    {/* Client */}
                    <div 
                      ref={el => distNodeRefs.current['client'] = el}
                      className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-600 flex flex-col items-center justify-center text-white font-bold text-xs relative z-10"
                    >
                      Client
                    </div>

                    {/* Master Node A */}
                    <div 
                      ref={el => distNodeRefs.current['node-a'] = el}
                      className="w-20 h-20 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex flex-col items-center justify-center text-center p-2 relative z-10 shadow-lg"
                    >
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Node A</span>
                      <span className="text-[10px] text-white font-semibold mt-1">Bangkok</span>
                      <span className="text-[9px] text-emerald-500 font-bold font-mono">Master</span>
                    </div>

                    {/* Replica Node B */}
                    <div 
                      ref={el => distNodeRefs.current['node-b'] = el}
                      className={`w-20 h-20 rounded-full text-center p-2 relative z-10 transition-all duration-300 flex flex-col items-center justify-center shadow-lg
                        ${nodeBOffline 
                          ? 'bg-red-950/40 border border-red-500/40 text-red-500 opacity-60' 
                          : 'bg-teal-950 border border-teal-500 text-teal-400'
                        }`}
                    >
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Node B</span>
                      <span className="text-[10px] text-white font-semibold mt-1">Tokyo</span>
                      <span className="text-[9px] font-bold font-mono">{nodeBOffline ? 'Offline' : 'Replica'}</span>
                    </div>

                    {/* Replica Node C */}
                    <div 
                      ref={el => distNodeRefs.current['node-c'] = el}
                      className="w-20 h-20 rounded-full bg-teal-950 border border-teal-500 text-teal-400 flex flex-col items-center justify-center text-center p-2 relative z-10 shadow-lg"
                    >
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Node C</span>
                      <span className="text-[10px] text-white font-semibold mt-1">Singapore</span>
                      <span className="text-[9px] text-teal-500 font-bold font-mono">Replica</span>
                    </div>

                    {/* Paths SVG */}
                    {Object.keys(distCoords).length > 0 && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <defs>
                          <marker id="d-arrow-green" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10B981" />
                          </marker>
                          <marker id="d-arrow-red" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#EF4444" />
                          </marker>
                        </defs>

                        {/* Client -> Master Node A */}
                        {distCoords['client'] && distCoords['node-a'] && (
                          <path
                            d={`M ${distCoords['client'].x} ${distCoords['client'].y} L ${distCoords['node-a'].x} ${distCoords['node-a'].y}`}
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="2"
                            className={distReplicating ? "animate-pulse" : ""}
                          />
                        )}

                        {/* Master A -> Replica B */}
                        {distCoords['node-a'] && distCoords['node-b'] && (
                          <path
                            d={`M ${distCoords['node-a'].x} ${distCoords['node-a'].y} L ${distCoords['node-b'].x} ${distCoords['node-b'].y}`}
                            fill="none"
                            stroke={nodeBOffline ? "#EF4444" : "#14B8A6"}
                            strokeWidth="2.5"
                            strokeDasharray={nodeBOffline ? "4 4" : "none"}
                            markerEnd={nodeBOffline ? "url(#d-arrow-red)" : "url(#d-arrow-green)"}
                            className={distReplicating ? "animate-pulse" : ""}
                          />
                        )}

                        {/* Master A -> Replica C */}
                        {distCoords['node-a'] && distCoords['node-c'] && (
                          <path
                            d={`M ${distCoords['node-a'].x} ${distCoords['node-a'].y} L ${distCoords['node-c'].x} ${distCoords['node-c'].y}`}
                            fill="none"
                            stroke="#14B8A6"
                            strokeWidth="2.5"
                            markerEnd="url(#d-arrow-green)"
                            className={distReplicating ? "animate-pulse" : ""}
                          />
                        )}
                      </svg>
                    )}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
                  <div className="text-[10px] text-slate-500 uppercase block mb-1">Log console monitor</div>
                  <div className="space-y-1 max-h-[80px] overflow-y-auto">
                    {distLogs.map((log, idx) => (
                      <div key={idx}>
                        <span className="text-slate-600">&gt; </span> {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SimulatorShell>
          </div>
        </section>

        {/* ─── Section 5: Cloud Database ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              5. ฐานข้อมูลบนระบบคลาวด์ / Cloud Database
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การจัดทรัพยากรยืดหยุ่นในโมเดลคิดเงินตามการใช้งานจริง
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              เป็นการจัดเก็บฐานข้อมูลบนระบบผู้ให้บริการคลาวด์ชั้นนำ (เช่น AWS RDS หรือ Google Cloud SQL) 
              ซึ่งมอบความสะดวกสบายในการขจัดภาระบำรุงฮาร์ดแวร์จริง จุดเด่นสูงสุดคือระบบปรับขนาดอัตโนมัติ 
              <span className="bg-blue-100/50 border border-blue-200/50 text-blue-700 font-mono text-[13px] px-1.5 py-0.5 rounded font-semibold">Auto-Scaling</span> 
              ที่จะสั่งจ่ายไฟเร่งประสิทธิภาพประมวลผลเซิร์ฟเวอร์ขึ้นทันทีที่มีปริมาณคิวรีผู้เรียน/ผู้ใช้งานถล่มทับระบบ และลดสเปกเพื่อประหยัดเงินในโมเดล Pay-as-you-go
            </p>

            <SimulatorShell
              dark
              title="Cloud Database Auto-scaling Cluster Simulator"
              icon={<Cloud className="w-8 h-8 text-sky-400" />}
              glowColors="from-sky-600/20 to-indigo-500/10"
              iconColor="text-sky-400"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mt-4">
                
                {/* Controller Panel */}
                <div className="md:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. ปรับระดับปริมาณการเข้าชม (Traffic Load)</span>
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-slate-400">คิวรีต่อวินาที:</span>
                      <span className={`${cloudTraffic > 70 ? 'text-red-400 font-bold' : 'text-sky-400'} font-bold`}>
                        {cloudTraffic * 12} req/sec ({cloudTraffic}%)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={cloudTraffic}
                      onChange={e => setCloudTraffic(Number(e.target.value))}
                      className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 mt-4">
                    <div className="flex justify-between mb-1">
                      <span>จำนวนอินสแตนซ์คลาวด์:</span>
                      <span className="text-white font-bold">{cloudInstances} VM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ค่าบริการประมาณการ/ชม.:</span>
                      <span className="text-yellow-400 font-bold">${cloudInstances * 0.45} USD</span>
                    </div>
                  </div>
                </div>

                {/* Cloud visualization display */}
                <div className="md:col-span-7 bg-slate-950 p-5 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[220px]">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">AWS / Google Cloud DB Instance Cluster</span>
                  
                  <div className="my-6 flex flex-wrap justify-center gap-6">
                    {/* Primary database instance */}
                    <div className="p-4 bg-slate-900 border border-sky-500/80 rounded-xl flex items-center gap-3 shadow-lg shadow-sky-950/40 relative">
                      <Server className="w-6 h-6 text-sky-400" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 font-bold">INSTANCE_01 (Primary)</div>
                        <div className="text-xs text-white font-semibold">db.m6g.large</div>
                        <div className="text-[9px] font-mono text-emerald-400 mt-0.5">CPU Load: {Math.round(cloudTraffic / cloudInstances)}%</div>
                      </div>
                      {cloudTraffic / cloudInstances > 70 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded-full animate-pulse">
                          LOAD HIGH
                        </span>
                      )}
                    </div>

                    {/* Scale out dynamic instance */}
                    {cloudInstances > 1 && (
                      <div className="p-4 bg-slate-900 border border-teal-500/80 rounded-xl flex items-center gap-3 shadow-lg shadow-teal-950/40 relative animate-fadeIn">
                        <Server className="w-6 h-6 text-teal-400" />
                        <div>
                          <div className="text-[10px] font-mono text-slate-500 font-bold">INSTANCE_02 (Scale-out)</div>
                          <div className="text-xs text-white font-semibold">db.m6g.large</div>
                          <div className="text-[9px] font-mono text-emerald-400 mt-0.5">CPU Load: {Math.round(cloudTraffic / cloudInstances)}%</div>
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded-full">
                          ACTIVE
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-400 flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${cloudTraffic > 70 ? 'text-red-400 animate-pulse' : 'text-sky-400'}`} />
                    <span>
                      {cloudScaling 
                        ? '🔄 กำลังทำกระบวนการ Scale-Out ปรับเปลี่ยนจำนวนอินสแตนซ์...' 
                        : cloudTraffic > 70 
                          ? '⚠️ โหลดสูงกว่า 70% ระบบสั่ง Auto-Scale เพิ่มเครื่องอัตโนมัติสำเร็จ!' 
                          : 'สถานะคลัสเตอร์อยู่ในเกณฑ์ที่ปลอดภัย'
                      }
                    </span>
                  </div>
                </div>

              </div>
            </SimulatorShell>
          </div>
        </section>

        {/* ─── Section 6: Data Warehouse ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              6. คลังข้อมูลและระบบวิเคราะห์ / Data Warehouse
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างประวัติสะสม OLAP เพื่อการวิเคราะห์ภาพธุรกิจเชิงลึก
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ถูกวิศวกรรมขึ้นมาเพื่อการวิเคราะห์ทางธุรกิจ (OLAP) ไม่ใช่เพื่อการเขียนบันทึกธุรกรรมปกติประจำวัน (OLTP) 
              คลังข้อมูลจะทำการกวาดต้อนรวมข้อมูลจากแอปพลิเคชันหรือสาขาต่างๆ ขององค์กรมาผ่านท่อประมวลผล 
              <span className="bg-blue-100/50 border border-blue-200/50 text-blue-700 font-mono text-[13px] px-1.5 py-0.5 rounded font-semibold">ETL Pipeline (Extract, Transform, Load)</span> 
              ล้างความซ้ำซ้อนและแปลงหมวดหมู่ข้อมูลให้อยู่ในรูปแบบเดียวกัน ก่อนจะโหลดเข้ากักเก็บเป็นข้อมูลประวัติศาสตร์ระยะยาว 
              เพื่อให้นักวิทยาศาสตร์ข้อมูลคิวรีรายงานวิเคราะห์เทรนด์ได้อย่างสะดวกรวดเร็ว ระบบที่เป็นที่นิยม เช่น Google BigQuery และ Amazon Redshift
            </p>

            <SimulatorShell
              dark
              title="ETL Pipeline & OLAP Report Visualizer"
              icon={<TrendingUp className="w-8 h-8 text-sky-400" />}
              glowColors="from-sky-600/20 to-teal-500/10"
              iconColor="text-sky-400"
            >
              <div ref={etlContainerRef} className="space-y-6 mt-4 relative">
                
                {/* Sources -> ETL Pipeline -> Warehouse Flow */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 relative min-h-[160px] flex items-center justify-between">
                  {/* Sources node */}
                  <div 
                    ref={el => etlRefs.current['etl-source'] = el}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 relative z-10"
                  >
                    <Database className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-[9px] font-mono text-slate-500">DATA SOURCES</div>
                      <div className="text-xs text-white font-bold">ตาราง OLTP ดิบ</div>
                    </div>
                  </div>

                  {/* ETL Pipeline stage */}
                  <div 
                    ref={el => etlRefs.current['etl-pipeline'] = el}
                    className={`p-3 border rounded-xl flex items-center gap-2 relative z-10 transition-all duration-300
                      ${etlStep === 1 || etlStep === 2
                        ? 'bg-blue-950/40 border-blue-500 text-blue-400 scale-105'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                  >
                    <Workflow className="w-5 h-5" />
                    <div>
                      <div className="text-[9px] font-mono text-slate-500">ETL ENGINE</div>
                      <div className="text-xs text-white font-bold">Transform (กรองฟอร์แมต)</div>
                    </div>
                  </div>

                  {/* OLAP Cube/Warehouse */}
                  <div 
                    ref={el => etlRefs.current['etl-dest'] = el}
                    className={`p-3 border rounded-xl flex items-center gap-2 relative z-10 transition-all duration-300
                      ${etlStep === 3 || etlStep === 4
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400 scale-105'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                  >
                    <Layers className="w-5 h-5" />
                    <div>
                      <div className="text-[9px] font-mono text-slate-500">DATA WAREHOUSE</div>
                      <div className="text-xs text-white font-bold">OLAP Cube</div>
                    </div>
                  </div>

                  {/* Flow paths */}
                  {etlCoords['etl-source'] && etlCoords['etl-pipeline'] && etlCoords['etl-dest'] && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <defs>
                        <marker id="etl-arrow-blue" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3B82F6" />
                        </marker>
                        <marker id="etl-arrow-green" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10B981" />
                        </marker>
                      </defs>

                      <path
                        d={`M ${etlCoords['etl-source'].x} ${etlCoords['etl-source'].y} L ${etlCoords['etl-pipeline'].x} ${etlCoords['etl-pipeline'].y}`}
                        fill="none"
                        stroke={etlStep >= 1 ? "#3B82F6" : "#475569"}
                        strokeWidth="2"
                        className={etlStep === 1 ? "animate-pulse" : ""}
                        markerEnd="url(#etl-arrow-blue)"
                      />

                      <path
                        d={`M ${etlCoords['etl-pipeline'].x} ${etlCoords['etl-pipeline'].y} L ${etlCoords['etl-dest'].x} ${etlCoords['etl-dest'].y}`}
                        fill="none"
                        stroke={etlStep >= 3 ? "#10B981" : "#475569"}
                        strokeWidth="2"
                        className={etlStep === 3 ? "animate-pulse" : ""}
                        markerEnd="url(#etl-arrow-green)"
                      />
                    </svg>
                  )}
                </div>

                {/* Logs console */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">ETL LOG STREAM MONITOR</span>
                    <button
                      onClick={runEtlPipeline}
                      className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3 h-3 ${etlStep > 0 && etlStep < 4 ? 'animate-spin' : ''}`} />
                      รัน ETL PIPELINE
                    </button>
                  </div>
                  <div className="space-y-1 max-h-[100px] overflow-y-auto">
                    {etlLogs.map((log, idx) => (
                      <div key={idx}>
                        <span className="text-slate-600">&gt; </span> {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* OLAP Report simulation */}
                {etlStep === 4 && (
                  <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-900/30 text-white animate-fadeIn space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                      <TrendingUp className="w-4 h-4" />
                      <span>ผลลัพธ์คิวรี OLAP Analytical Report (ยอดขายสะสมรายปีแยกตามประเภทลูกค้า)</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">2024 total sales</span>
                        <span className="text-base font-bold text-white mt-1 block">12,450,000 ฿</span>
                        <span className="text-[9px] text-emerald-400 font-bold font-mono">+12.4% YoY</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">2025 total sales</span>
                        <span className="text-base font-bold text-white mt-1 block">15,620,000 ฿</span>
                        <span className="text-[9px] text-emerald-400 font-bold font-mono">+25.4% YoY</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">avg order size</span>
                        <span className="text-base font-bold text-white mt-1 block">4,250 ฿</span>
                        <span className="text-[9px] text-emerald-400 font-bold font-mono">+4.1% YoY</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SimulatorShell>
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="การจำแนกประเภทและวิเคราะห์คุณลักษณะของระบบฐานข้อมูล"
          taskText={`คำชี้แจง: ให้นักเรียนสืบค้นและทดลองใช้งานระบบจำลองประเภทฐานข้อมูลทั้ง 6 ชนิดด้านบน จากนั้นตอบคำถามทางวิชาการข้อต่อไปนี้ลงในระบบส่งการบ้าน:

1. เปรียบเทียบความแตกต่างหลัก 3 ประการระหว่าง "ฐานข้อมูลเชิงสัมพันธ์ (Relational Database)" และ "ฐานข้อมูลแบบไม่เชิงสัมพันธ์ (NoSQL Database)" ในแง่ของโครงสร้างข้อมูล (Data Structure), การขยายตัวทางระบบ (Scaling) และความเร็วในการตอบสนอง
2. อธิบายคุณลักษณะเด่นของ "ฐานข้อมูลแบบกระจาย (Distributed Database)" ในประเด็นของความทนทานต่อความล้มเหลว (Fault Tolerance) และจำลองกลไกหากระบบเกิดโหนดเสียหายโหนดหนึ่ง (Node Failure) จากความรู้ในตัวจำลอง
3. เพราะเหตุใด "ฐานข้อมูลคลังข้อมูล (Data Warehouse)" จึงไม่เหมาะสมที่จะนำมาใช้จัดเก็บข้อมูลรายการซื้อขายประจำวันแบบ OLTP ของระบบหน้าร้านสะดวกซื้อโดยตรง อธิบายเชิงเหตุผลตามหลักการจัดทำคลังข้อมูล`}
        />
      </main>
    </div>
  );
}
