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
  ShieldCheck
} from 'lucide-react';

export default function SQL1_1() {
  const [joinType, setJoinType] = useState('inner'); // 'inner' | 'left' | 'right'
  const [coords, setCoords] = useState({});
  const [highlightedRow, setHighlightedRow] = useState(null); // 'cust-X' or 'order-Y'
  const [showExplanation, setShowExplanation] = useState(true);
  
  const containerRef = useRef(null);
  const cellRefs = useRef({});

  // ข้อมูลจำลองตารางลูกค้า (Customers)
  const customers = [
    { id: 1, name: 'อนันต์', email: 'anan@mail.com' },
    { id: 2, name: 'บุษบา', email: 'busaba@mail.com' },
    { id: 3, name: 'ชลทิตย์', email: 'chontit@mail.com' },
    { id: 4, name: 'ดนัย', email: 'danai@mail.com' }
  ];

  // ข้อมูลจำลองตารางสั่งซื้อ (Orders)
  const orders = [
    { order_id: 101, customer_id: 1, product: 'Keyboard', price: 1500 },
    { order_id: 102, customer_id: 2, product: 'Mouse', price: 600 },
    { order_id: 103, customer_id: 1, product: 'Monitor', price: 5500 },
    { order_id: 104, customer_id: 9, product: 'Headphones', price: 1200 } // id 9 ไม่มีในตาราง Customers
  ];

  // คำนวณผลลัพธ์การ Join ข้อมูล
  const getMergedResults = () => {
    if (joinType === 'inner') {
      return [
        { id: 1, name: 'อนันต์', order_id: 101, product: 'Keyboard', price: 1500, match: true },
        { id: 1, name: 'อนันต์', order_id: 103, product: 'Monitor', price: 5500, match: true },
        { id: 2, name: 'บุษบา', order_id: 102, product: 'Mouse', price: 600, match: true }
      ];
    } else if (joinType === 'left') {
      return [
        { id: 1, name: 'อนันต์', order_id: 101, product: 'Keyboard', price: 1500, match: true },
        { id: 1, name: 'อนันต์', order_id: 103, product: 'Monitor', price: 5500, match: true },
        { id: 2, name: 'บุษบา', order_id: 102, product: 'Mouse', price: 600, match: true },
        { id: 3, name: 'ชลทิตย์', order_id: null, product: null, price: null, match: false },
        { id: 4, name: 'ดนัย', order_id: null, product: null, price: null, match: false }
      ];
    } else {
      // right join
      return [
        { id: 1, name: 'อนันต์', order_id: 101, product: 'Keyboard', price: 1500, match: true },
        { id: 2, name: 'บุษบา', order_id: 102, product: 'Mouse', price: 600, match: true },
        { id: 1, name: 'อนันต์', order_id: 103, product: 'Monitor', price: 5500, match: true },
        { id: null, name: null, order_id: 104, product: 'Headphones', price: 1200, match: false }
      ];
    }
  };

  const results = getMergedResults();

  // อัปเดตพิกัด geometric center ของช่องที่มี refs สำหรับลากเส้นเชื่อมโยง
  const updateCoords = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCoords = {};

    Object.keys(cellRefs.current).forEach(key => {
      const el = cellRefs.current[key];
      if (el) {
        const rect = el.getBoundingClientRect();
        newCoords[key] = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        };
      }
    });

    setCoords(newCoords);
  };

  // ตรวจจับการเปลี่ยนแปลงของ joinType หรือการขยายหน้าจอเพื่ออัปเดตเส้นเชื่อมโยง
  useEffect(() => {
    updateCoords();
    window.addEventListener('resize', updateCoords);
    const timer = setTimeout(updateCoords, 150);
    return () => {
      window.removeEventListener('resize', updateCoords);
      clearTimeout(timer);
    };
  }, [joinType, showExplanation]);

  // คิวรี SQL คำสั่งจำลอง
  const getSQLQuery = () => {
    const columns = `Customers.customer_id, Customers.name, Orders.order_id, Orders.product, Orders.price`;
    if (joinType === 'inner') {
      return `SELECT ${columns}\nFROM Customers\nINNER JOIN Orders ON Customers.customer_id = Orders.customer_id;`;
    } else if (joinType === 'left') {
      return `SELECT ${columns}\nFROM Customers\nLEFT JOIN Orders ON Customers.customer_id = Orders.customer_id;`;
    } else {
      return `SELECT ${columns}\nFROM Customers\nRIGHT JOIN Orders ON Customers.customer_id = Orders.customer_id;`;
    }
  };

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── Section 1: Definition and Axioms ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              ความรู้พื้นฐาน / นิยามระบบข้อมูล
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              นิยามของข้อมูล สารสนเทศ และฐานข้อมูล
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              ในทางวิศวกรรมคอมพิวเตอร์และระบบสารสนเทศ การแยกแยะและทำความเข้าใจเกี่ยวกับระดับชั้นของข้อมูลคือพื้นฐานสำคัญ 
              ข้อมูลดิบที่ไร้โครงสร้างจะไม่มีคุณค่าใดๆ จนกว่าจะถูกนำมาประมวลผลให้กลายเป็นสารสนเทศที่เป็นประโยชน์ 
              และระบบฐานข้อมูลคือสิ่งแวดล้อมที่คอยโอบอุ้มและจัดเก็บสิ่งเหล่านี้อย่างมีตรรกะและมีประสิทธิภาพ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Concept 1: ข้อมูล */}
              <ConceptCard 
                symbol="Data"
                title="ข้อมูล"
                description="ข้อเท็จจริงหรือตัวเลขดิบที่เก็บรวบรวมจากสิ่งต่างๆ เช่น คน สัตว์ สิ่งของ หรือเหตุการณ์ที่เกิดขึ้น โดยที่ยังไม่ผ่านกระบวนการคัดกรองหรือประมวลผลใดๆ เพื่อการตัดสินใจ"
                code="SELECT 25, 'Bangkok'"
                result="Raw Facts"
                accent="cyan"
                resultColor="indigo"
              />

              {/* Concept 2: สารสนเทศ */}
              <ConceptCard 
                symbol="Information"
                title="สารสนเทศ"
                description="ข้อมูลดิบที่ผ่านกระบวนการประมวลผล คัดเลือก จัดหมวดหมู่ คำนวณหาค่า หรือวิเคราะห์เปรียบเทียบเรียบร้อยแล้ว เพื่อใช้ประโยชน์ในการวางแผนและการนำไปตัดสินใจทันที"
                code="ยอดขายเฉลี่ย = 25,000"
                result="Processed Value"
                accent="sky"
                resultColor="emerald"
              />

              {/* Concept 3: ฐานข้อมูล */}
              <ConceptCard 
                symbol="Database"
                title="ฐานข้อมูล"
                description="แหล่งสะสมข้อมูลที่มีความสัมพันธ์เกี่ยวโยงถึงกันอย่างมีระบบ โดยได้รับการจัดวางรูปแบบโครงสร้างชัดเจนเพื่อให้ระบบซอฟต์แวร์สามารถสืบค้น ปรับปรุง และลบข้อมูลได้รวดเร็ว"
                code="MySQL DBMS Schema"
                result="Structured Storage"
                accent="blue"
                resultColor="amber"
              />
            </div>

            <div className="bg-blue-50/60 backdrop-blur-md border border-blue-200/60 rounded-2xl p-5 border-l-[3px] border-l-blue-500 leading-relaxed">
              <h4 className="font-semibold text-blue-900 text-[15px] mb-1.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                จุดสังเกตสำคัญ
              </h4>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                การทำงานกับภาษา <span className="bg-blue-100/50 border border-blue-200/50 text-blue-700 font-mono text-[13px] px-1.5 py-0.5 rounded">SQL</span> จะมุ่งเน้นไปที่การจัดการระบบ <strong>ฐานข้อมูลเชิงสัมพันธ์ (Relational Database)</strong> 
                ซึ่งใช้โครงสร้างแบบตารางที่มีแถวและคอลัมน์ในการจัดเก็บวัตถุข้อมูลเพื่อจำลองความเป็นจริง
              </p>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Database System Components ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              องค์ประกอบระบบ / สถาปัตยกรรมสารสนเทศ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              องค์ประกอบทั้ง 5 ของระบบฐานข้อมูล
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              เพื่อให้ระบบฐานข้อมูลสามารถขับเคลื่อนการทำงานขนาดใหญ่ขององค์กรได้อย่างมีเสถียรภาพและปลอดภัย 
              ระบบจำเป็นต้องมีองค์ประกอบพื้นฐาน 5 ประการ ทำงานผสานรวมกันอย่างสอดคล้องดังนี้:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Component 1: Hardware */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">ฮาร์ดแวร์</h4>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  อุปกรณ์คอมพิวเตอร์ เซิร์ฟเวอร์ และหน่วยบันทึกข้อมูลถาวร เช่น ฮาร์ดดิสก์ หรือ SSD ที่ใช้ในการประมวลผล
                </p>
              </div>

              {/* Component 2: Software */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">ซอฟต์แวร์</h4>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  ระบบจัดการฐานข้อมูล (DBMS) เช่น MySQL หรือ PostgreSQL ที่คอยรับชุดคำสั่ง SQL ไปสั่งจัดแจงข้อมูลดิบ
                </p>
              </div>

              {/* Component 3: Data */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Table className="w-5 h-5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">ข้อมูล</h4>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  ตัวเนื้อข้อมูลจริงที่บรรจุลงตาราง ซึ่งต้องมีความถูกต้อง แม่นยำ ปราศจากความขัดแย้ง และเชื่อถือได้สูง
                </p>
              </div>

              {/* Component 4: Peopleware */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">บุคลากร</h4>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  ผู้ใช้งานทั่วไป นักพัฒนาระบบ และผู้ดูแลระบบฐานข้อมูล (DBA) ที่ดูแลรักษาโครงสร้างและความปลอดภัย
                </p>
              </div>

              {/* Component 5: Procedures */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800">ขั้นตอนการปฏิบัติ</h4>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  กฎระเบียบ ข้อกำหนด คู่มือ และมาตรการกู้ภัยข้อมูลฉุกเฉินเพื่อให้ผู้ใช้งานระบบเข้าถึงข้อมูลได้อย่างถูกต้องปลอดภัย
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Benefits of Database System ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              ประโยชน์ของระบบ / การคุ้มครองประสิทธิภาพ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คุณค่าที่ได้รับจากการบริหารฐานข้อมูลอย่างเป็นระบบ
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              การเก็บข้อมูลในระบบฐานข้อมูลเชิงสัมพันธ์ผ่านระบบจัดการ (DBMS) ช่วยแก้ปัญหาของระบบเก็บแฟ้มเอกสารแบบเก่า (Flat Files) 
              และส่งมอบข้อดีที่สำคัญต่อวิศวกรรมสถาปัตยกรรมซอฟต์แวร์ดังนี้:
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-blue-500/80 space-y-4">
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-[15px] md:text-base text-slate-600">
                    <strong className="text-slate-800 font-bold">ลดความซ้ำซ้อนของการจัดเก็บข้อมูล (Data Redundancy):</strong> ข้อมูลจะถูกเก็บรวบรวมไว้ที่ส่วนกลางเพียงจุดเดียว ทำให้ประหยัดเนื้อที่ในแรมและฮาร์ดดิสก์ ไม่ต้องบันทึกซ้ำซ้อนหลายชุด
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-[15px] md:text-base text-slate-600">
                    <strong className="text-slate-800 font-bold">รักษาความถูกต้องตรงกันของข้อมูล (Data Integrity):</strong> ระบบมีกลไกตรวจสอบเงื่อนไขความถูกต้อง (Constraints) ของฟิลด์ต่างๆ ทำให้มั่นใจได้ว่าข้อมูลจะไม่บิดเบี้ยวหรือขัดแย้งกันเอง
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-[15px] md:text-base text-slate-600">
                    <strong className="text-slate-800 font-bold">สนับสนุนการใช้ข้อมูลร่วมกัน (Data Sharing):</strong> รองรับการเข้าถึงข้อมูลพร้อมกันของผู้ใช้งานหลายแผนกหรือ API ภายนอก โดยระบบจะมีการจัดการคิวเพื่อไม่ให้เกิดสภาวะล้อกล็อกเดดล็อก
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-[15px] md:text-base text-slate-600">
                    <strong className="text-slate-800 font-bold">ยกระดับมาตรฐานความปลอดภัย (Data Security):</strong> การควบคุมผ่าน DBMS ช่วยให้ผู้ดูแลกำหนดสิทธิ์ในการเข้าถึง อ่าน เขียน หรืออัปเดตข้อมูลแยกตามโปรไฟล์บทบาทหน้าที่ของบุคคล (IAM) ได้อย่างละเอียด
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-[15px] md:text-base text-slate-600">
                    <strong className="text-slate-800 font-bold">เพิ่มความรวดเร็วในการสืบค้นและจัดทำรายงาน:</strong> ระบบใช้ระบบจัดทำดัชนี (Database Indexes) ทำให้คอมพิวเตอร์ค้นหาข้อมูลที่ค้นหาเจอในความเร็วหลักมิลลิวินาที แม้จะมีข้อมูลนับล้านแถวก็ตาม
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Section 4: Interactive Database Joins Simulator ─── */}
        <section className="space-y-6" id="joins-simulator-section">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              ตัวจำลองเชิงสัมพันธ์ / SQL Joins Visualizer
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การเชื่อมโยงความสัมพันธ์ของข้อมูลแบบ Real-time
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            ทดลองศึกษาตรรกะความสัมพันธ์ของข้อมูลแบบเชิงสัมพันธ์ (Relational Joins) 
            โดยการสลับคำสั่งเพื่อดูความต่างของการเชื่อมโยงระหว่างตารางลูกค้า <span className="bg-blue-100/50 border border-blue-200/50 text-blue-700 font-mono text-[13px] px-1.5 py-0.5 rounded">Customers</span> 
            และตารางรายการคำสั่งซื้อ <span className="bg-blue-100/50 border border-blue-200/50 text-blue-700 font-mono text-[13px] px-1.5 py-0.5 rounded">Orders</span> สังเกตการแสดงข้อมูลและความหมายของคำว่า <span className="bg-rose-50 border border-rose-200 text-rose-700 font-mono text-[13px] px-1.5 py-0.5 rounded">NULL</span> ที่เกิดขึ้น
          </p>

          <SimulatorShell
            dark
            title="SQL Relational Join Engine Emulator"
            icon={<Database className="w-8 h-8 text-blue-400" />}
            glowColors="from-blue-600/20 to-cyan-500/10"
            iconColor="text-blue-400"
            accentBg="bg-blue-950/40"
          >
            <div ref={containerRef} className="space-y-8 mt-4 relative">
              
              {/* Control Bar */}
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  COMMAND CONTROL
                </div>

                <div className="space-y-2 grow">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">เลือกประเภทของการ JOIN ข้อมูล:</span>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { type: 'inner', label: 'INNER JOIN (ดึงเฉพาะที่ตรงกัน)', desc: 'แสดงเฉพาะแถวที่มีค่าคีย์เชื่อมโยงตรงกันในทั้งสองตาราง' },
                      { type: 'left', label: 'LEFT JOIN (เน้นตารางลูกค้าหลัก)', desc: 'แสดงตารางฝั่งซ้ายทั้งหมด แม้ฝั่งขวาจะไม่มีข้อมูลตรงกัน (แสดงค่าว่าง NULL)' },
                      { type: 'right', label: 'RIGHT JOIN (เน้นตารางสั่งซื้อหลัก)', desc: 'แสดงตารางฝั่งขวาทั้งหมด แม้ฝั่งซ้ายจะไม่มีลูกค้าคนนั้น (แสดงค่าว่าง NULL)' }
                    ].map(item => (
                      <button
                        key={item.type}
                        onClick={() => setJoinType(item.type)}
                        className={`px-4 py-2.5 rounded-xl border text-[13px] font-semibold text-center cursor-pointer transition-all duration-200
                          ${joinType === item.type
                            ? 'border-blue-500 text-blue-400 bg-blue-950/40 shadow-inner'
                            : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shrink-0 self-end md:self-auto"
                >
                  <Info className="w-4 h-4 text-blue-400" />
                  {showExplanation ? 'ซ่อนคำอธิบายเชิงลึก' : 'แสดงคำอธิบายเชิงลึก'}
                </button>
              </div>

              {/* Dynamic explanation panel */}
              {showExplanation && (
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-slate-300 text-[14px] leading-relaxed transition-all animate-fadeIn">
                  <div className="flex items-center gap-2.5 mb-2 text-blue-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>หลักการทำงานของคิวรีนี้</span>
                  </div>
                  {joinType === 'inner' && (
                    <p>
                      คำสั่ง <strong className="text-white">INNER JOIN</strong> จะทำการสแกนตารางฝั่งซ้าย (Customers) และตารางฝั่งขวา (Orders) 
                      และกรองผลลัพธ์มาแสดงเฉพาะเมื่อค่าในคอลัมน์ <code className="bg-slate-950 text-emerald-400 px-1 py-0.5 rounded font-mono text-[13px]">customer_id</code> ตรงกันเท่านั้น 
                      ลูกค้าหมายเลข 3 (ชลทิตย์) และ 4 (ดนัย) ที่ไม่เคยสั่งของ และใบสั่งซื้อที่ 104 ที่อ้างอิงรหัส ID 9 ซึ่งไม่มีในระบบจะไม่ถูกดึงมารวมในตารางเอาต์พุต
                    </p>
                  )}
                  {joinType === 'left' && (
                    <p>
                      คำสั่ง <strong className="text-white">LEFT JOIN</strong> จะยืนพื้นข้อมูลของตารางฝั่งซ้าย (Customers) เป็นหลัก 
                      ตารางจะแสดงรายชื่อลูกค้าทั้ง 4 คนครบถ้วน และดึงใบสั่งซื้อที่ตรงกันมาประกบ 
                      ส่วนลูกค้าคนใดที่ยังไม่มียอดสั่งซื้อ (เช่น ชลทิตย์ และ ดนัย) คอลัมน์ที่ดึงมาจากฝั่งขวาจะแสดงค่าเป็น <span className="bg-rose-950/80 text-rose-400 px-1 py-0.5 rounded font-mono text-[13px] border border-rose-800/30">NULL</span> (ค่าว่างเปล่า) 
                      ส่วนใบสั่งซื้อที่ 104 ที่ไม่มีลูกค้าตรงกันจะถูกละเว้นไป
                    </p>
                  )}
                  {joinType === 'right' && (
                    <p>
                      คำสั่ง <strong className="text-white">RIGHT JOIN</strong> จะตั้งหลักเอาตารางฝั่งขวา (Orders) เป็นที่ตั้งสูงสุด 
                      ใบสั่งซื้อทั้ง 4 ใบจะถูกดึงมาแสดงครบถ้วน และทำการค้นหารายชื่อลูกค้าฝั่งซ้ายมาจับคู่ประกบ 
                      สำหรับรายการสั่งซื้อที่ 104 ที่บันทึก customer_id เป็น 9 (ซึ่งไม่มีในตารางลูกค้า) 
                      ฟิลด์ข้อมูลฝั่งซ้าย (เช่น customer_id, name) จะแสดงผลลัพธ์เป็นค่า <span className="bg-rose-950/80 text-rose-400 px-1 py-0.5 rounded font-mono text-[13px] border border-rose-800/30">NULL</span>
                    </p>
                  )}
                </div>
              )}

              {/* Source Tables Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Table: Customers */}
                <div className="lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl relative flex flex-col justify-between">
                  <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest uppercase">
                    Left Table: Customers (ตารางลูกค้า)
                  </div>
                  
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-[13px] font-sans text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-500 text-left">
                          <th className="pb-2">customer_id (PK)</th>
                          <th className="pb-2">name</th>
                          <th className="pb-2">email</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        {customers.map(c => {
                          const isHighlighted = highlightedRow === `cust-${c.id}`;
                          const hasMatch = c.id === 1 || c.id === 2;
                          let statusClass = 'border-slate-800';
                          
                          if (isHighlighted) {
                            statusClass = 'bg-blue-950/30 border-blue-500 border-l-2 pl-1';
                          } else if (joinType === 'left' && !hasMatch) {
                            statusClass = 'bg-rose-950/10 border-rose-900/30 opacity-80';
                          }

                          return (
                            <tr 
                              key={c.id} 
                              className={`transition-all duration-200 hover:bg-slate-900/60 ${statusClass}`}
                              onMouseEnter={() => setHighlightedRow(`cust-${c.id}`)}
                              onMouseLeave={() => setHighlightedRow(null)}
                            >
                              <td 
                                ref={el => cellRefs.current[`cust-${c.id}`] = el}
                                className="py-3 font-mono font-bold text-center text-blue-400 bg-slate-900/30 rounded-lg w-1/3"
                              >
                                {c.id}
                              </td>
                              <td className="py-3 pl-4 font-semibold text-white">{c.name}</td>
                              <td className="py-3 font-mono text-slate-400">{c.email}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Table: Orders */}
                <div className="lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl relative flex flex-col justify-between">
                  <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest uppercase">
                    Right Table: Orders (ตารางสั่งซื้อ)
                  </div>

                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-[13px] font-sans text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-500 text-left">
                          <th className="pb-2">order_id (PK)</th>
                          <th className="pb-2">customer_id (FK)</th>
                          <th className="pb-2">product</th>
                          <th className="pb-2">price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        {orders.map(o => {
                          const isHighlighted = highlightedRow === `order-${o.order_id}`;
                          const hasMatch = o.customer_id === 1 || o.customer_id === 2;
                          let statusClass = 'border-slate-800';

                          if (isHighlighted) {
                            statusClass = 'bg-blue-950/30 border-blue-500 border-r-2 pr-1';
                          } else if (joinType === 'right' && !hasMatch) {
                            statusClass = 'bg-rose-950/10 border-rose-900/30 opacity-80';
                          }

                          return (
                            <tr 
                              key={o.order_id} 
                              className={`transition-all duration-200 hover:bg-slate-900/60 ${statusClass}`}
                              onMouseEnter={() => setHighlightedRow(`order-${o.order_id}`)}
                              onMouseLeave={() => setHighlightedRow(null)}
                            >
                              <td className="py-3 font-mono font-semibold text-slate-400">{o.order_id}</td>
                              <td 
                                ref={el => cellRefs.current[`order-${o.order_id}`] = el}
                                className="py-3 font-mono font-bold text-center text-cyan-400 bg-slate-900/30 rounded-lg"
                              >
                                {o.customer_id}
                              </td>
                              <td className="py-3 pl-3 text-white font-medium">{o.product}</td>
                              <td className="py-3 font-mono text-emerald-400 text-right">{o.price.toLocaleString()} ฿</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Absolute Overlay SVG for rendering connection lines */}
              {Object.keys(coords).length > 0 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <defs>
                    <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3B82F6" />
                    </marker>
                    <marker id="arrow-rose" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F43F5E" />
                    </marker>
                  </defs>

                  {/* Draw connection lines dynamically */}
                  <g className="transition-opacity duration-300">
                    
                    {/* ลูกค้า id: 1 -> สั่งซื้อ id 1 (คีย์บอร์ด + จอ) */}
                    {coords['cust-1'] && coords['order-101'] && (
                      <path
                        d={`M ${coords['cust-1'].x} ${coords['cust-1'].y} L ${coords['order-101'].x} ${coords['order-101'].y}`}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth={highlightedRow === 'cust-1' || highlightedRow === 'order-101' ? '3' : '2'}
                        className="opacity-70 transition-all duration-200"
                        markerEnd="url(#arrow-blue)"
                      />
                    )}
                    {coords['cust-1'] && coords['order-103'] && (
                      <path
                        d={`M ${coords['cust-1'].x} ${coords['cust-1'].y} L ${coords['order-103'].x} ${coords['order-103'].y}`}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth={highlightedRow === 'cust-1' || highlightedRow === 'order-103' ? '3' : '2'}
                        className="opacity-70 transition-all duration-200"
                        markerEnd="url(#arrow-blue)"
                      />
                    )}

                    {/* ลูกค้า id: 2 -> สั่งซื้อ id 2 (เมาส์) */}
                    {coords['cust-2'] && coords['order-102'] && (
                      <path
                        d={`M ${coords['cust-2'].x} ${coords['cust-2'].y} L ${coords['order-102'].x} ${coords['order-102'].y}`}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth={highlightedRow === 'cust-2' || highlightedRow === 'order-102' ? '3' : '2'}
                        className="opacity-70 transition-all duration-200"
                        markerEnd="url(#arrow-blue)"
                      />
                    )}

                    {/* Left Join NULL pointers */}
                    {joinType === 'left' && (
                      <>
                        {coords['cust-3'] && coords['res-left-3'] && (
                          <path
                            d={`M ${coords['cust-3'].x} ${coords['cust-3'].y} C ${coords['cust-3'].x - 100} ${coords['cust-3'].y + 100}, ${coords['res-left-3'].x - 100} ${coords['res-left-3'].y - 100}, ${coords['res-left-3'].x} ${coords['res-left-3'].y}`}
                            fill="none"
                            stroke="#F43F5E"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            className="opacity-60 transition-all duration-200"
                            markerEnd="url(#arrow-rose)"
                          />
                        )}
                        {coords['cust-4'] && coords['res-left-4'] && (
                          <path
                            d={`M ${coords['cust-4'].x} ${coords['cust-4'].y} C ${coords['cust-4'].x - 100} ${coords['cust-4'].y + 100}, ${coords['res-left-4'].x - 100} ${coords['res-left-4'].y - 100}, ${coords['res-left-4'].x} ${coords['res-left-4'].y}`}
                            fill="none"
                            stroke="#F43F5E"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            className="opacity-60 transition-all duration-200"
                            markerEnd="url(#arrow-rose)"
                          />
                        )}
                      </>
                    )}

                    {/* Right Join NULL pointers */}
                    {joinType === 'right' && coords['order-104'] && coords['res-right-3'] && (
                      <path
                        d={`M ${coords['order-104'].x} ${coords['order-104'].y} C ${coords['order-104'].x + 100} ${coords['order-104'].y + 100}, ${coords['res-right-3'].x + 100} ${coords['res-right-3'].y - 100}, ${coords['res-right-3'].x} ${coords['res-right-3'].y}`}
                        fill="none"
                        stroke="#F43F5E"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="opacity-60 transition-all duration-200"
                        markerEnd="url(#arrow-rose)"
                      />
                    )}
                  </g>
                </svg>
              )}

              {/* SQL Query Box */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">SQL Query ที่ระบบทำงาน:</span>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner flex items-start gap-3">
                  <Terminal className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <pre className="font-mono text-[13.5px] text-slate-300 whitespace-pre overflow-x-auto leading-relaxed select-all">
                    {getSQLQuery()}
                  </pre>
                </div>
              </div>

              {/* Result Table: Merged Output */}
              <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest uppercase">
                  SQL Query Result Output (ผลลัพธ์ข้อมูลระบบ)
                </div>

                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-[13px] font-sans text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-500 text-left">
                        <th className="pb-2">customer_id</th>
                        <th className="pb-2">name</th>
                        <th className="pb-2">order_id</th>
                        <th className="pb-2">product</th>
                        <th className="pb-2 text-right">price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {results.map((row, idx) => {
                        const isRowHighlighted = 
                          (row.id && highlightedRow === `cust-${row.id}`) ||
                          (row.order_id && highlightedRow === `order-${row.order_id}`);

                        return (
                          <tr
                            key={idx}
                            ref={el => cellRefs.current[`res-${joinType}-${idx}`] = el}
                            className={`transition-all duration-250 ${
                              isRowHighlighted ? 'bg-blue-950/30 text-white font-medium' : 'hover:bg-slate-900/40'
                            }`}
                          >
                            {/* customer_id */}
                            <td className="py-3 font-mono text-blue-400 font-bold">
                              {row.id !== null ? row.id : (
                                <span className="bg-rose-950/40 text-rose-400 border border-rose-800/40 font-mono py-0.5 px-2 rounded-md text-[11.5px] font-bold">
                                  NULL
                                </span>
                              )}
                            </td>

                            {/* name */}
                            <td className="py-3 font-semibold">
                              {row.name !== null ? row.name : (
                                <span className="bg-rose-950/40 text-rose-400 border border-rose-800/40 font-mono py-0.5 px-2 rounded-md text-[11.5px] font-bold">
                                  NULL
                                </span>
                              )}
                            </td>

                            {/* order_id */}
                            <td className="py-3 font-mono">
                              {row.order_id !== null ? row.order_id : (
                                <span className="bg-rose-950/40 text-rose-400 border border-rose-800/40 font-mono py-0.5 px-2 rounded-md text-[11.5px] font-bold">
                                  NULL
                                </span>
                              )}
                            </td>

                            {/* product */}
                            <td className="py-3 font-medium">
                              {row.product !== null ? row.product : (
                                <span className="bg-rose-950/40 text-rose-400 border border-rose-800/40 font-mono py-0.5 px-2 rounded-md text-[11.5px] font-bold">
                                  NULL
                                </span>
                              )}
                            </td>

                            {/* price */}
                            <td className="py-3 font-mono text-emerald-400 text-right">
                              {row.price !== null ? `${row.price.toLocaleString()} ฿` : (
                                <span className="bg-rose-950/40 text-rose-400 border border-rose-800/40 font-mono py-0.5 px-2 rounded-md text-[11.5px] font-bold">
                                  NULL
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="การวิเคราะห์เปรียบเทียบตรรกะความสัมพันธ์ระบบฐานข้อมูลเชิงสัมพันธ์"
          taskText={`คำชี้แจง: ให้นักเรียนเปรียบเทียบกลไกการทำ SQL Joins จากการทดลองสลับแผงควบคุมระบบจำลอง SQL Relational Join Engine Emulator ด้านบน และตอบคำถามประเมินการปฏิบัติงานดังต่อไปนี้ลงในสมุดบันทึก:

1. วิเคราะห์และอธิบายสถานการณ์ที่ควรเลือกใช้ LEFT JOIN แทนการใช้ INNER JOIN ในระบบฐานข้อมูลของธุรกิจจริง โดยยกตัวอย่างจากระบบลูกค้าและการทำธุรกรรม
2. ความหมายของค่า NULL ในตารางผลลัพธ์การคิวรีข้อมูล (Query Result Output) บ่งบอกถึงข้อเท็จจริงประการใดในเชิงความสัมพันธ์เชิงโครงสร้างข้อมูลเชิงกายภาพ
3. จงเขียนคำสั่ง SQL Query ในการรวมตาราง Customers และ Orders เพื่อเรียกดูข้อมูลสินค้า (product) และราคาสินค้า (price) ของลูกค้าที่ชื่อ "บุษบา" เท่านั้น โดยนำเสนอประโยคเงื่อนไขที่ถูกต้องตามหลักวิศวกรรมข้อมูล`}
        />
      </main>
    </div>
  );
}
