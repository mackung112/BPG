import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Bell, 
  ArrowRight, 
  RotateCcw, 
  Play, 
  Code, 
  Sparkles, 
  Sliders, 
  Cpu, 
  Layers,
  Shield,
  HelpCircle
} from 'lucide-react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  SimulatorShell, 
  ConceptCard, 
  AmbientBackdrop,
  ConsoleScreen,
  QuizEngine
} from '../shared';

// Custom CSS animation keyframes
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float-subtle {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
      100% { transform: translateY(0px); }
    }
    @keyframes flow-line {
      to {
        stroke-dashoffset: -40;
      }
    }
    @keyframes pulse-orange-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.7)); }
    }
    @keyframes pulse-red-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.8)); }
    }
    .animate-float-subtle { animation: float-subtle 4s ease-in-out infinite; }
    .animate-flow-line { animation: flow-line 1.2s linear infinite; }
    .animate-pulse-orange-glow { animation: pulse-orange-glow 1.5s ease-in-out infinite; }
    .animate-pulse-red-glow { animation: pulse-red-glow 1.2s ease-in-out infinite; }
    .glass-card-ooad {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.45);
    }
  `}} />
);

export default function OOAD1_4() {
  // ─── Layer 1: Ambient Background Blobs (Orange/Indigo/Teal Theme) ───
  const blobs = [
    { color: 'bg-orange-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-30' },
    { color: 'bg-amber-100',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-25' },
    { color: 'bg-teal-200',   size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-25' },
    { color: 'bg-indigo-150', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-20' }
  ];

  // ─── State for Inventory Simulator ───
  const [products, setProducts] = useState([
    { sku: 'SKU-9812', name: 'SSD NVMe 1TB', stock: 15, safetyStock: 10 },
    { sku: 'SKU-3452', name: 'DDR5 RAM 16GB', stock: 8, safetyStock: 12 },
    { sku: 'SKU-7612', name: 'Nvidia RTX 4080', stock: 25, safetyStock: 15 }
  ]);

  const [selectedSku, setSelectedSku] = useState('SKU-3452');
  const [transactionType, setTransactionType] = useState('Stock_Out');
  const [quantity, setQuantity] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1); // -1: idle, 0: Input, 1: Validate, 2: ACID Write, 3: Reorder Evaluate, 4: Complete
  const [terminalLogs, setTerminalLogs] = useState(['[SYSTEM READY] ระบบตรวจสอบข้อกำหนด SRS สินค้าคงคลังเริ่มต้นทำงานแล้ว']);

  const currentProduct = products.find(p => p.sku === selectedSku);
  const willBeBelowSafety = transactionType === 'Stock_Out' 
    ? (currentProduct.stock - quantity) < currentProduct.safetyStock
    : currentProduct.stock < currentProduct.safetyStock; // if stocking in, check if it's currently below safety

  const handleExecuteTransaction = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setActiveStep(0);
    
    const qty = parseInt(quantity);
    
    // Step-by-step pipeline execution
    setTerminalLogs([
      `[STEP 1 - INPUT CLIENT] ตรวจพบข้อมูลบาร์โค้ด SKU: ${selectedSku}`,
      `[STEP 1 - INPUT CLIENT] พนักงานทำรายการ: ${transactionType === 'Stock_In' ? 'รับเข้าคลัง (+)' : 'เบิกจ่ายออก (-)'} จำนวน: ${qty} ชิ้น`
    ]);

    // Step 1: Validation
    setTimeout(() => {
      setActiveStep(1);
      setTerminalLogs(prev => [
        ...prev,
        `[STEP 2 - VALIDATION] ดำเนินการตรวจสอบข้อมูลผู้ใช้งานและสิทธิ์การบันทึกคลังสินค้า`,
        `[STEP 2 - VALIDATION] ตรวจสอบเงื่อนไขข้อกำหนด: จำนวนนำเข้า/เบิกต้องมากกว่า 0`,
        transactionType === 'Stock_Out' && currentProduct.stock < qty
          ? `[STEP 2 - ERROR] การตรวจสอบข้อกำหนดฟังก์ชันล้มเหลว: ยอดสต็อกคงเหลือ (${currentProduct.stock}) น้อยกว่าจำนวนที่ขอเบิก (${qty})`
          : `[STEP 2 - VALIDATION] ผ่านเกณฑ์ข้อกำหนดเชิงฟังก์ชัน: ยอดสต็อกเพียงพอสำหรับการทำงาน`
      ]);

      if (transactionType === 'Stock_Out' && currentProduct.stock < qty) {
        setIsProcessing(false);
        setActiveStep(1);
        return; // Halt on error
      }
    }, 1200);

    // Step 2: ACID DB Lock & Write
    setTimeout(() => {
      if (transactionType === 'Stock_Out' && currentProduct.stock < qty) return;
      setActiveStep(2);
      setTerminalLogs(prev => [
        ...prev,
        `[STEP 3 - DB TRANSACTION] เริ่มต้น ACID Transaction บล็อกพื้นที่หน่วยความจำ SQL`,
        `[STEP 3 - DB TRANSACTION] ล็อกแถวข้อมูล: "SELECT * FROM products WHERE sku = '${selectedSku}' FOR UPDATE"`,
        `[STEP 3 - DB TRANSACTION] ประมวลผลคำสั่ง: "UPDATE products SET stock = stock ${transactionType === 'Stock_In' ? '+' : '-'} ${qty} WHERE sku = '${selectedSku}'"`,
        `[STEP 3 - DB TRANSACTION] ตรวจสอบความถูกต้องและบันทึกข้อมูลสำเร็จ (Transaction Committed)`
      ]);

      // Update local state database
      setProducts(prev => prev.map(p => {
        if (p.sku === selectedSku) {
          const newStock = transactionType === 'Stock_In' ? p.stock + qty : p.stock - qty;
          return { ...p, stock: newStock };
        }
        return p;
      }));
    }, 2400);

    // Step 3: Reorder alert evaluation
    setTimeout(() => {
      if (transactionType === 'Stock_Out' && currentProduct.stock < qty) return;
      setActiveStep(3);
      
      // Calculate updated stock value for display in log
      const postStock = transactionType === 'Stock_In' 
        ? currentProduct.stock + qty 
        : currentProduct.stock - qty;
      
      const isBelow = postStock < currentProduct.safetyStock;

      setTerminalLogs(prev => [
        ...prev,
        `[STEP 4 - REORDER CHECK] คำนวณความเสี่ยงความต่อเนื่องธุรกิจ (Business Continuity Check)`,
        `[STEP 4 - REORDER CHECK] สต็อกใหม่หลังทำรายการ: ${postStock} ชิ้น | ขีดจำกัดขั้นปลอดภัย (Safety Stock): ${currentProduct.safetyStock} ชิ้น`,
        isBelow 
          ? `[🚨 ALERT] ตรวจพบระดับวิกฤต! สินค้าต่ำกว่าเกณฑ์ปลอดภัย ส่งอีเมลและสัญญาณแจ้งเตือนจัดซื้ออัตโนมัติ`
          : `[STEP 4 - REORDER CHECK] สินค้าอยู่ในระดับปลอดภัยปกติ ไม่ต้องการสั่งซื้อเพิ่ม`
      ]);
    }, 3800);

    // Step 4: Finished
    setTimeout(() => {
      if (transactionType === 'Stock_Out' && currentProduct.stock < qty) return;
      setActiveStep(4);
      setTerminalLogs(prev => [
        ...prev,
        `[COMPLETE] การทำงานผ่านไปได้ด้วยดี ปลดล็อก DB Row-Lock และพร้อมทำรายการใหม่`
      ]);
      setIsProcessing(false);
    }, 4800);
  };

  const handleResetInventory = () => {
    setProducts([
      { sku: 'SKU-9812', name: 'SSD NVMe 1TB', stock: 15, safetyStock: 10 },
      { sku: 'SKU-3452', name: 'DDR5 RAM 16GB', stock: 8, safetyStock: 12 },
      { sku: 'SKU-7612', name: 'Nvidia RTX 4080', stock: 25, safetyStock: 15 }
    ]);
    setActiveStep(-1);
    setTerminalLogs(['[SYSTEM RESET] รีเซ็ตสต็อกข้อมูลคลังสินค้าดั้งเดิมสำเร็จ พร้อมทำรายการใหม่']);
    setIsProcessing(false);
  };

  // ─── Quiz Engine Configurations (SRS Specifications) ───
  const quizLevels = [
    {
      title: "การระบุประเภทของข้อกำหนด (Requirement Classification)",
      desc: "ข้อกำหนดระบุว่า: 'ระบบจัดส่งสินค้าต้องสามารถบันทึกและสแกนพัสดุรับเข้าคลังผ่านหัวอ่านบาร์โค้ดไร้สายได้'",
      options: [
        { key: "A", text: "Functional Requirement (สิ่งที่ระบบต้องปฏิบัติได้)", isCorrect: true },
        { key: "B", text: "Non-Functional Requirement (ข้อกำหนดด้านประสิทธิภาพ)", isCorrect: false },
        { key: "C", text: "System Constraint (ข้อจำกัดระบบและกรอบเทคโนโลยี)", isCorrect: false },
        { key: "D", text: "Assumption (สมมติฐานหลักโครงการ)", isCorrect: false }
      ],
      tip: "ประโยคนี้ระบุถึง 'ความสามารถหลักในการทำงาน' หรือฟังก์ชันโดยตรงที่ระบบต้องอำนวยความสะดวกให้พนักงาน"
    },
    {
      title: "การวิเคราะห์หาข้อกำหนดที่ไม่ใช่เชิงฟังก์ชัน (Non-Functional Requirement)",
      desc: "ข้อกำหนดระบุว่า: 'ข้อมูลมูลค่าคลังสินค้าต้องอัปเดตแบบ Real-time และรองรับ ACID Transaction เพื่อป้องกันข้อมูลสูญหาย'",
      options: [
        { key: "A", text: "Functional Requirement", isCorrect: false },
        { key: "B", text: "Non-Functional Requirement (ข้อกำหนดเชิงคุณภาพของข้อมูล)", isCorrect: true },
        { key: "C", text: "System Constraint", isCorrect: false },
        { key: "D", text: "Acceptance Criteria (เกณฑ์ยอมรับผลงาน)", isCorrect: false }
      ],
      tip: "ACID Transaction และ Real-time update ปริมาณเงินไม่ใช่ตัวฟังก์ชันเมนู แต่คือความมั่นคงและคุณภาพการประมวลผลข้อมูล (Data Integrity)"
    },
    {
      title: "การวิเคราะห์กรอบการออกแบบและเทคโนโลยี (System Constraint)",
      desc: "ข้อกำหนดระบุว่า: 'แอปพลิเคชันคลังสินค้าต้องถูกปรับแต่งให้เปิดใช้งานได้อย่างเสถียรผ่าน Web Browser Safari บน iPadOS 16 ขึ้นไป'",
      options: [
        { key: "A", text: "Functional Requirement", isCorrect: false },
        { key: "B", text: "Non-Functional Requirement", isCorrect: false },
        { key: "C", text: "System Constraint (การตีกรอบสภาพแวดล้อมทางเทคโนโลยี)", isCorrect: true },
        { key: "D", text: "Assumption", isCorrect: false }
      ],
      tip: "ข้อกำหนดที่ตีกรอบการตัดสินใจของนักพัฒนาซอฟต์แวร์ เช่น ระบบปฏิบัติการ แฟลตฟอร์ม หรือเบราว์เซอร์เป้าหมาย"
    },
    {
      title: "เกณฑ์การตรวจวัดที่เป็นวิทยาศาสตร์ (IEEE 830 Standard)",
      desc: "ประโยคข้อกำหนดใดต่อไปนี้ถูกต้องตามเกณฑ์ไม่กำกวมและตรวจสอบได้ (Verifiable) ของมาตรฐาน IEEE 830",
      options: [
        { key: "A", text: "หน้าคลังสินค้าต้องดาวน์โหลดข้อมูลอย่างรวดเร็วมากและใช้งานได้อย่างลื่นไหลไม่มีกระตุก", isCorrect: false },
        { key: "B", text: "ระบบต้องประมวลผลการคำนวณและตอบกลับข้อมูลสินค้าคงคลังภายในเวลาไม่เกิน 1.2 วินาที เมื่อมีผู้ใช้พร้อมกัน 50 คน", isCorrect: true },
        { key: "C", text: "ส่วนต่อประสานผู้ใช้ต้องมีความทันสมัยและใช้โทนสีที่พนักงานคลังสินค้าทุกคนชื่นชอบ", isCorrect: false },
        { key: "D", text: "โปรแกรมเมอร์ต้องพัฒนาให้ดีที่สุดเพื่อให้แอปพลิเคชันไม่มีวันพังในระหว่างชั่วโมงทำงาน", isCorrect: false }
      ],
      tip: "ข้อกำหนดที่ดีต้องไม่ใช้ประโยคความคิดเห็นเชิงอัตวิสัย (สวยงาม, รวดเร็วมาก, ดีที่สุด) แต่ต้องมีค่าสถิติวัดผลได้เป็นรูปธรรมชัดเจน"
    }
  ];

  // Code block text for python simulation visualizer
  const pythonCode = `def process_stock_transaction(sku: str, qty: int, tx_type: str):
    # 1. เชื่อมต่อฐานข้อมูลและเริ่มต้น ACID Transaction
    with database.transaction() as tx:
        # 2. ป้องกัน Concurrency Race Conditions ด้วย Row-Level Locking
        product = tx.execute(
            "SELECT sku, stock, safety_stock FROM products WHERE sku = %s FOR UPDATE",
            (sku,)
        ).fetchone()
        
        if not product:
            raise ValueError(f"ไม่พบสินค้า SKU: {sku}")
            
        # 3. ตรวจสอบเงื่อนไขข้อกำหนดเชิงฟังก์ชัน (Functional Requirement)
        if tx_type == "Stock_In":
            new_stock = product['stock'] + qty
        elif tx_type == "Stock_Out":
            if product['stock'] < qty:
                raise ValueError("ยอดสินค้าคงคลังไม่เพียงพอ")
            new_stock = product['stock'] - qty
            
        # 4. อัปเดตปริมาณสินค้าลงสู่ระดับทางกายภาพของฐานข้อมูล
        tx.execute(
            "UPDATE products SET stock = %s WHERE sku = %s",
            (new_stock, sku)
        )
        
        # 5. ตรวจสอบเกณฑ์แจ้งเตือนสต็อกวิกฤต (Safety Stock Alert)
        if new_stock < product['safety_stock']:
            trigger_reorder_alert(sku, new_stock, product['safety_stock'])
            
    return new_stock`;

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      <CustomStyles />

      {/* Layer 1: Ambient Background Blobs */}
      <AmbientBackdrop blobs={blobs} />

      {/* Layer 3: Main Page Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* Section 1: Intro & SRS Core Concept */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวอย่างโครงงานซอฟต์แวร์จริง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงร่างความต้องการระบบจัดการคลังสินค้า (Inventory Management SRS)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            การวิเคราะห์และจัดทำเอกสารความต้องการระบบจัดการคลังสินค้าและสินค้าคงคลัง (Inventory Management System) 
            ต้องการความละเอียดสูงเนื่องจากเกี่ยวข้องโดยตรงกับความถูกต้องแม่นยำของข้อมูลทางการเงินและมูลค่าของสต็อกสินค้าจริง 
            โดยการจัดกลุ่มสเปกในเอกสาร SRS ตามมาตรฐานสากล <span className="mx-1 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200/50 text-teal-700 font-mono text-[14px]">IEEE 830</span> แบ่งออกเป็นหัวข้อหลักดังนี้:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ConceptCard
              symbol="FR"
              title="ข้อกำหนดเชิงฟังก์ชัน (Functional)"
              description="ระบุพฤติกรรมหลัก เช่น บันทึกสินค้าเข้า/ออก สแกนบาร์โค้ด และสั่งซื้อใหม่เมื่อต่ำกว่าจุดเตือนภัย"
              accent="teal"
            />
            <ConceptCard
              symbol="NFR"
              title="ประสิทธิภาพและความมั่นคง (Non-Functional)"
              description="เวลาตอบสนองระบบต้องน้อยกว่า 1.5 วินาที ข้อมูลไม่สูญหาย และรองรับผู้ใช้งานพร้อมกัน 100 คน"
              accent="indigo"
            />
            <ConceptCard
              symbol="CON"
              title="ข้อจำกัดระบบ (System Constraint)"
              description="ระบบต้องเข้าใช้งานผ่าน Web Browser ยึด ACID database และใช้งานร่วมกับเครื่องสแกนตามมาตรฐาน EAN-13"
              accent="amber"
            />
            <ConceptCard
              symbol="AC"
              title="เกณฑ์การยอมรับ (Acceptance Criteria)"
              description="พนักงานสแกนบาร์โค้ดแล้วสต็อกอัปเดตทันทีภายใน 2 วินาที และระบบส่งคำเตือนเมื่อสินค้าขาด"
              accent="rose"
            />
          </div>
        </section>

        {/* Section 2: Deep Dive SRS Document Schema */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              โครงร่างเอกสารทางวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              องค์ประกอบ SRS มาตรฐานสำหรับระบบจัดการสินค้าคงคลัง
            </h3>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-8 space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
              เพื่อให้เห็นภาพโครงร่างเอกสาร SRS จริง ตารางต่อไปนี้แสดงเนื้อหาและลักษณะการเขียนสเปกข้อกำหนดทางวิชาการตามมาตรฐานสากล:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/50">
                    <th className="py-4 px-6 font-bold text-slate-800 tracking-wide w-[25%]">หมวดหมู่ข้อกำหนด</th>
                    <th className="py-4 px-6 font-bold text-slate-800 tracking-wide w-[30%]">ข้อความร่างสเปกจริง (ภาษาไทย)</th>
                    <th className="py-4 px-6 font-bold text-slate-800 tracking-wide w-[45%]">เหตุผลและเกณฑ์ควบคุมคุณภาพ (IEEE 830)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-teal-50 border border-teal-200/60 text-teal-700 font-mono text-[12px] uppercase">FR-01: Stock Ledger</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      ระบบต้องคำนวณและตัดยอดสต็อกคงคลังใหม่แบบอัตโนมัติทันทีที่การสแกนบาร์โค้ดเบิกสินค้าเสร็จสิ้นลง
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      กำหนดขอบเขตพฤติกรรม (Functional Behavior) ที่ตอบสนองทันทีหลังกระทำเสร็จสิ้น ป้องกันกระบวนการตกหล่น
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-mono text-[12px] uppercase">NFR-02: Performance</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-medium">
                      การค้นหารายการ SKU สินค้าต้องแสดงผลลัพธ์ภายใน 1.0 วินาที เมื่อทดสอบในเครือข่ายความกว้างสัญญาณ 100 Mbps
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      หลีกเลี่ยงคำว่า "โหลดเร็ว" ที่กำกวม โดยเปลี่ยนเป็นกำหนดหน่วยวัดความเร็วที่เป็นวินาทีชัดเจน ตรวจวัดเป็นตัวเลขได้
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200/60 text-amber-700 font-mono text-[12px] uppercase">CON-03: Architecture</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      โครงสร้างจัดเก็บข้อมูลหลักต้องใช้ PostgreSQL 16 ที่รองรับคุณสมบัติ ACID เพื่อความทนทานต่อข้อมูลสูญหาย
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      ตีกรอบเครื่องมือและมาตรฐานสถาปัตยกรรม (Architecture Constraint) บังคับโปรแกรมเมอร์ให้เลือกฐานข้อมูลเชิงสัมพันธ์
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 rounded bg-rose-50 border border-rose-200/60 text-rose-700 font-mono text-[12px] uppercase">AC-04: Notification</span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      เมื่อเกิดปัญหาสินค้าเหลือต่ำกว่าระดับปลอดภัย ระบบต้องส่งข้อความแจ้งเตือนทางอีเมลอัตโนมัติภายใน 5 วินาที
                    </td>
                    <td className="py-4 px-6 text-slate-500 leading-relaxed">
                      กำหนดเงื่อนไขการส่งต่อผลลัพธ์การทำงาน (Acceptance Criteria) และช่วงเวลารับประกันทางกฎหมายในการตรวจสอบ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Simulator */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              การทำงานจริงของระบบ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ตัวจำลองทรานแซกชันคลังสินค้าและสายพานข้อมูล (Inventory Transaction Pipeline)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองจำลองการรับสินค้าเข้าหรือเบิกออกระบบคงคลัง เพื่อดูว่าสเปกข้อกำหนดใน SRS เช่น 
            การประมวลผล Concurrency, ยอดคงคลังปลอดภัย (Safety Stock) และระบบแจ้งเตือนฉุกเฉิน ทำงานประสานกันอย่างไรในสถาปัตยกรรมซอฟต์แวร์จริง:
          </p>

          <SimulatorShell
            dark
            title="Smart Warehouse Transaction Simulator"
            icon={<Sliders className="w-8 h-8 text-orange-400" />}
            glowColors="from-orange-950/20 to-indigo-950/15"
            iconColor="text-orange-400"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
              
              {/* Left Panel - Control Station */}
              <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                  CONTROL STATION
                </div>

                <div className="space-y-5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">1. เลือกข้อมูลสินค้าในสต็อก:</span>
                  
                  {/* Select product item */}
                  <div className="grid grid-cols-1 gap-2">
                    {products.map(p => {
                      const isLow = p.stock < p.safetyStock;
                      const isChosen = p.sku === selectedSku;
                      return (
                        <button
                          key={p.sku}
                          onClick={() => {
                            if (!isProcessing) setSelectedSku(p.sku);
                          }}
                          disabled={isProcessing}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex justify-between items-center
                            ${isChosen 
                              ? 'border-orange-500 bg-orange-950/40 text-orange-200' 
                              : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                            }`}
                        >
                          <div>
                            <span className="text-[10px] font-mono text-slate-500 block">{p.sku}</span>
                            <span className="text-[13px] font-bold block">{p.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] block">คงคลัง: <strong className={isLow ? 'text-rose-400' : 'text-emerald-400'}>{p.stock}</strong> ชิ้น</span>
                            <span className="text-[9px] text-slate-500 block">ปลอดภัยขั้นต่ำ: {p.safetyStock}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Transaction Mode */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">2. เลือกประเภทรายการ:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { if(!isProcessing) setTransactionType('Stock_In'); }}
                        disabled={isProcessing}
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all
                          ${transactionType === 'Stock_In'
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        รับเข้าคลัง (Stock In)
                      </button>
                      <button
                        onClick={() => { if(!isProcessing) setTransactionType('Stock_Out'); }}
                        disabled={isProcessing}
                        className={`py-2 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all
                          ${transactionType === 'Stock_Out'
                            ? 'border-rose-500 bg-rose-950/40 text-rose-300'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-slate-700'
                          }`}
                      >
                        เบิกจ่ายสินค้า (Stock Out)
                      </button>
                    </div>
                  </div>

                  {/* Quantity Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>3. จำนวนของทรานแซกชัน:</span>
                      <span className="text-orange-400 font-mono">{quantity} ชิ้น</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={quantity}
                      disabled={isProcessing}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>
                </div>

                {/* Operations & Terminal Logs */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="flex gap-2">
                    <button
                      onClick={handleExecuteTransaction}
                      disabled={isProcessing}
                      className="w-8/12 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg disabled:opacity-40 transition-all duration-200"
                    >
                      <Play className="w-4 h-4" /> ดำเนินการ (Execute)
                    </button>
                    <button
                      onClick={handleResetInventory}
                      disabled={isProcessing}
                      className="w-4/12 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตสต็อก
                    </button>
                  </div>

                  {/* Tiny Output Shell */}
                  <div className="bg-black/80 p-3 rounded-xl border border-slate-950 font-mono text-[11px] leading-relaxed text-orange-400 overflow-y-auto max-h-[110px] min-h-[90px]">
                    <div className="text-slate-500 border-b border-slate-900 pb-1 mb-1.5 uppercase tracking-wide text-[8.5px] font-bold">Transaction Trace Logs:</div>
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="animate-fadeIn">
                        <span className="text-slate-650">&gt; </span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Visual Pipeline Diagram */}
              <div className="lg:col-span-7 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl relative flex flex-col justify-between min-h-[480px]">
                <div className="text-[9px] font-mono text-slate-500 absolute top-3 left-3 font-bold tracking-widest">
                  SRS COMPLIANCE DATA PIPELINE
                </div>

                <div className="space-y-6 mt-6 flex-1 flex flex-col justify-between">
                  {/* SVG Pipeline Diagram */}
                  <div className="relative bg-slate-900/40 rounded-xl border border-slate-900/60 p-4 grow flex items-center justify-center min-h-[220px]">
                    <svg viewBox="0 0 560 220" className="w-full h-full" id="warehouse-pipeline-svg">
                      <defs>
                        <marker id="arrow-gray-ooad" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                        </marker>
                        <marker id="arrow-orange-ooad" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#f97316" />
                        </marker>
                        <marker id="arrow-green-ooad" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                        </marker>
                        <marker id="arrow-red-ooad" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                        </marker>
                      </defs>

                      {/* Connection paths between centers: (70,90) -> (190,90) -> (310,90) -> (430,90) */}
                      {/* Line 1 */}
                      <path 
                        d="M 70,90 L 190,90" 
                        fill="none" 
                        stroke={activeStep >= 0 ? "#f97316" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 0 ? "6,4" : "none"}
                        className={activeStep === 0 ? "animate-flow-line" : ""}
                        markerEnd={activeStep >= 0 ? "url(#arrow-orange-ooad)" : "url(#arrow-gray-ooad)"}
                      />

                      {/* Line 2 */}
                      <path 
                        d="M 190,90 L 310,90" 
                        fill="none" 
                        stroke={activeStep >= 1 ? "#f97316" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 1 ? "6,4" : "none"}
                        className={activeStep === 1 ? "animate-flow-line" : ""}
                        markerEnd={activeStep >= 1 ? "url(#arrow-orange-ooad)" : "url(#arrow-gray-ooad)"}
                      />

                      {/* Line 3 */}
                      <path 
                        d="M 310,90 L 430,90" 
                        fill="none" 
                        stroke={activeStep >= 2 ? "#10b981" : "#334155"} 
                        strokeWidth="3"
                        strokeDasharray={activeStep === 2 ? "6,4" : "none"}
                        className={activeStep === 2 ? "animate-flow-line" : ""}
                        markerEnd={activeStep >= 2 ? "url(#arrow-green-ooad)" : "url(#arrow-gray-ooad)"}
                      />

                      {/* Line 4 (Downward to Alert Center) */}
                      <path 
                        d="M 430,90 L 430,170" 
                        fill="none" 
                        stroke={activeStep >= 3 && willBeBelowSafety ? "#ef4444" : "#334155"} 
                        strokeWidth="2.5"
                        strokeDasharray={activeStep === 3 && willBeBelowSafety ? "6,4" : "none"}
                        className={activeStep === 3 && willBeBelowSafety ? "animate-flow-line" : ""}
                        markerEnd={activeStep >= 3 && willBeBelowSafety ? "url(#arrow-red-ooad)" : "url(#arrow-gray-ooad)"}
                      />

                      {/* Node 1: Scanner Input */}
                      <g transform="translate(70, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 0 ? "#f97316" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <FileText className={`w-5 h-5 ${activeStep === 0 ? 'text-orange-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">Barcode Scanner</text>
                      </g>

                      {/* Node 2: Schema Validation */}
                      <g transform="translate(190, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 1 ? "#f97316" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <Cpu className={`w-5 h-5 ${activeStep === 1 ? 'text-orange-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">Validation Lock</text>
                      </g>

                      {/* Node 3: SQL Database */}
                      <g transform="translate(310, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 2 ? "#10b981" : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <Database className={`w-5 h-5 ${activeStep === 2 ? 'text-emerald-400' : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">ACID PostgreSQL</text>
                      </g>

                      {/* Node 4: Reorder Check */}
                      <g transform="translate(430, 90)">
                        <circle r="26" fill="#1e293b" stroke={activeStep === 3 ? (willBeBelowSafety ? "#ef4444" : "#10b981") : "#475569"} strokeWidth="2.5" />
                        <g transform="translate(-10, -10)">
                          <Layers className={`w-5 h-5 ${activeStep === 3 ? (willBeBelowSafety ? 'text-rose-400' : 'text-emerald-400') : 'text-slate-400'}`} />
                        </g>
                        <text x="0" y="42" textAnchor="middle" className="fill-slate-400 font-sans text-[9px] font-bold uppercase">Safety Stock Check</text>
                      </g>

                      {/* Node 5: Alert Trigger */}
                      <g transform="translate(430, 170)">
                        <circle r="20" fill={willBeBelowSafety && activeStep >= 3 ? "#7f1d1d" : "#111827"} stroke={willBeBelowSafety && activeStep >= 3 ? "#ef4444" : "#374151"} strokeWidth="2" className={willBeBelowSafety && activeStep >= 3 ? "animate-pulse-red-glow" : ""} />
                        <g transform="translate(-8, -8)">
                          <Bell className={`w-4 h-4 ${willBeBelowSafety && activeStep >= 3 ? "text-rose-400" : "text-slate-600"}`} />
                        </g>
                        <text x="28" y="4" textAnchor="start" className="fill-slate-500 font-sans text-[8.5px] font-bold uppercase">แจ้งเตือนภัยจัดซื้อ (Reorder Alert)</text>
                      </g>
                    </svg>
                  </div>

                  {/* Dynamic Database Table & Visuals */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">ผลการตรวจสอบระดับความปลอดภัยสต็อก (Real-time Audit):</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                        ${willBeBelowSafety 
                          ? 'bg-rose-950/80 text-rose-400 border-rose-900' 
                          : 'bg-emerald-950/80 text-emerald-400 border-emerald-900'
                        }`}
                      >
                        {willBeBelowSafety ? '🔴 CRITICAL STOCK WARNING' : '🟢 STOCK SECURE'}
                      </span>
                    </div>

                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-900 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">รายการ: <strong className="text-slate-200">{currentProduct.name}</strong></span>
                        <span className="text-slate-400">บาร์โค้ดสต็อก: <strong className="text-slate-200 font-mono">{selectedSku}</strong></span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900 text-[12px] font-mono text-center">
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-500 block text-[9.5px]">ยอดคงเหลือจริง</span>
                          <span className={`text-base font-bold ${currentProduct.stock < currentProduct.safetyStock ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {currentProduct.stock} ชิ้น
                          </span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-500 block text-[9.5px]">Safety Stock</span>
                          <span className="text-base text-slate-300 font-bold">{currentProduct.safetyStock} ชิ้น</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded">
                          <span className="text-slate-500 block text-[9.5px]">สถานะแจ้งเตือน</span>
                          <span className={`text-[11px] font-bold block mt-1 ${currentProduct.stock < currentProduct.safetyStock ? 'text-rose-400' : 'text-slate-500'}`}>
                            {currentProduct.stock < currentProduct.safetyStock ? '🔔 TRIGGERED' : '💤 NORMAL'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </section>

        {/* Section 4: Python Code Visualizer showing backend design rules */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ตัวอย่างโค้ดโปรแกรมเบื้องหลัง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างตรรกะในระบบหลังบ้าน (Python Transaction Logic)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            สเปกข้อกำหนดในเอกสาร SRS (เช่น การล็อก Concurrency และคำนวณยอดสต็อก) ต้องถูกแปลงเป็นตรรกะโปรแกรมที่รัดกุม 
            ตัวอย่างด้านล่างแสดงโค้ดภาษา <span className="mx-1 px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200/50 text-teal-700 font-mono text-[14px]">Python</span> ที่ทำงานร่วมกับฐานข้อมูลเชิงสัมพันธ์เพื่อให้เป็นไปตามข้อกำหนดความทนทานของข้อมูล (ACID):
          </p>

          <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            <ConsoleScreen
              label="# python/warehouse_api.py"
              accentLabel="srs backend rules"
              accentColor="text-teal-400"
              codeBlock={
                <pre className="text-[13.5px] font-mono text-zinc-300 leading-relaxed overflow-x-auto">
                  {pythonCode}
                </pre>
              }
              output="โค้ดนี้จำลองระบบล็อก Row (FOR UPDATE) เพื่อรองรับทรานแซกชันคู่ขนานตามเกณฑ์ NFR-02 และตัดยอดในตัวแปรแบบเรียลไทม์"
              outputColor="text-teal-400"
              multiline={true}
            />
          </div>
        </section>

        {/* Section 5: SRS Extraction and Classification Game */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-orange-600 tracking-wider uppercase">
              ประเมินความเข้าใจวิชาการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบจำลองการวินิจฉัยและจำแนกประเภทความต้องการ (SRS Classifier Arena)
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
            ทดลองจำแนกสเปกเงื่อนไขต่าง ๆ ในระบบงานสินค้าคงคลังให้ตรงประเภท และวิเคราะห์คุณภาพของความต้องการให้ถูกต้องตามเกณฑ์สากล:
          </p>

          <div className="max-w-4xl mx-auto">
            <QuizEngine
              title="มินิเกม: วิเคราะห์สเปกความต้องการระบบคลังสินค้า"
              description="จำแนกและวินิจฉัยข้อความความต้องการตามเกณฑ์มาตรฐานวิศวกรรมความต้องการซอฟต์แวร์"
              levels={quizLevels}
              accentColor="from-orange-600/20 to-amber-500/10"
              icon={<Shield className="w-6 h-6 text-orange-400" />}
            />
          </div>
        </section>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <TeacherTask
          title="ภารกิจวิเคราะห์ความต้องการระบบคลังสินค้าสะสม"
          taskText={`[โจทย์วิเคราะห์ความต้องการ: ระบบจัดการข้อมูลสินค้าคงคลัง (Project 2)]

ให้นักศึกษาสวมบทบาทเป็นนักวิเคราะห์ระบบ (System Analyst) ดำเนินการวิเคราะห์และเขียนข้อกำหนดความต้องการซอฟต์แวร์ (SRS) ในหมวดหมู่ต่าง ๆ ของระบบจัดการสินค้าคงคลังตามคำอธิบายดังต่อไปนี้:

1. เขียน Functional Requirement (FR) จำนวน 1 ข้อ สำหรับฟังก์ชัน "การแจ้งเตือนจุดสั่งซื้อใหม่ (Reorder Point)"
2. เขียน Non-Functional Requirement (NFR) จำนวน 1 ข้อ ด้าน "ความปลอดภัยและการปกป้องข้อมูล (Data Security)"
3. เขียน System Constraint (CON) จำนวน 1 ข้อ ด้าน "เทคโนโลยีฐานข้อมูลที่ต้องใช้งาน"

*กฎเหล็ก:* 
- ห้ามใช้คำกว้าง ๆ ที่กำกวมไม่สามารถตรวจวัดผลได้ เช่น "โหลดเร็ว", "ปลอดภัยสูง", "ใช้ได้ตลอดเวลา"
- ข้อกำหนดต้องสอดคล้องกับมาตรฐานสเปก IEEE 830 และสามารถสร้างแผนทดสอบ (Test Cases) เพื่อตรวจวัดได้ชัดเจน
- ให้ระบุพารามิเตอร์หรือตัวเลขชี้วัดที่เป็นรูปธรรม (เช่น ภายในกี่วินาที, ระบบปฏิบัติการเวอร์ชันใด, หรือมาตรฐานความปลอดภัยรหัสใด)`}
        />

      </main>
    </div>
  );
}
