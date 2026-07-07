import React, { useState, useRef } from 'react';
import { 
  Layout, MousePointer2, ShieldCheck, CheckCircle2, 
  Settings, BarChart3, Users, DollarSign, Activity, Zap, Info, Eye
} from 'lucide-react';

export default function UXTheoryHub() {
  const [activeTheory, setActiveTheory] = useState('gestalt');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              UX/UI Theory Interactive Hub
            </h1>
            <p className="text-sm font-medium text-slate-500">เรียนรู้ทฤษฎีการออกแบบผ่านการลงมือทำจริง</p>
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-xl">
            <TabButton 
              active={activeTheory === 'gestalt'} 
              onClick={() => setActiveTheory('gestalt')}
              icon={<Layout size={16} />}
              color="text-indigo-600"
              bgActive="bg-white"
            >
              Composition
            </TabButton>
            <TabButton 
              active={activeTheory === 'fitts'} 
              onClick={() => setActiveTheory('fitts')}
              icon={<MousePointer2 size={16} />}
              color="text-cyan-600"
              bgActive="bg-white"
            >
              Interaction
            </TabButton>
            <TabButton 
              active={activeTheory === 'wcag'} 
              onClick={() => setActiveTheory('wcag')}
              icon={<ShieldCheck size={16} />}
              color="text-emerald-600"
              bgActive="bg-white"
            >
              Accessibility
            </TabButton>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {activeTheory === 'gestalt' && <TheoryComposition />}
          {activeTheory === 'fitts' && <TheoryInteraction />}
          {activeTheory === 'wcag' && <TheoryAccessibility />}
        </div>
      </main>
    </div>
  );
}

function TabButton({ children, active, onClick, icon, color, bgActive }) {
  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300";
  const activeClasses = bgActive + " " + color + " shadow-sm border border-slate-200/60";
  const inactiveClasses = "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 border border-transparent";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      {icon}
      {children}
    </button>
  );
}

// ==========================================
// 1. Composition Theory (Gestalt & Gutenberg)
// ==========================================
function TheoryComposition() {
  const [useGrid, setUseGrid] = useState(false);
  const [useProximity, setUseProximity] = useState(false);
  const [useFPattern, setUseFPattern] = useState(false);

  const isSuccess = useGrid && useProximity && useFPattern;

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Theory Section */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="p-6 sm:p-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Layout size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Visual Composition</h2>
          </div>
          
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            การจัดวางองค์ประกอบบนหน้าจอเพื่อควบคุม **"ทิศทางสายตา"** และลด **"ภาระสมอง"** ของผู้ใช้งาน อิงจากหลักจิตวิทยาการรับรู้ทางสายตา (Visual Perception)
          </p>

          <div className="space-y-10">
            
            {/* Theory 1: Gestalt */}
            <div className="space-y-4">
              <h3 className="font-bold text-indigo-700 flex items-center gap-2 border-b border-indigo-100 pb-2">
                 1. Gestalt (Law of Proximity)
              </h3>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-outside ml-4">
                <li>สมองมนุษย์จะจัดกลุ่มสิ่งที่ **อยู่ใกล้กัน** ว่ามีความสัมพันธ์กันโดยอัตโนมัติ</li>
                <li>การเว้นช่องไฟ (Whitespace) ที่ดี จะช่วยแบ่งหมวดหมู่ข้อมูลได้ชัดเจนกว่าการตีเส้นกรอบ</li>
                <li>ระยะห่างระหว่างกลุ่ม (Outer Margin) ต้องมากกว่าระยะห่างในกลุ่ม (Inner Padding) เสมอ</li>
              </ul>
              
              {/* Mini Example: Proximity */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 mt-2">
                <div className="flex-1 text-center">
                  <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase">❌ จัดกลุ่มผิดพลาด</div>
                  <div className="flex flex-col gap-3 items-center">
                    <div className="w-8 h-8 bg-slate-300 rounded"></div>
                    <div className="w-16 h-2 bg-slate-300 rounded-full"></div>
                  </div>
                </div>
                <div className="w-px h-16 bg-slate-100"></div>
                <div className="flex-1 text-center">
                   <div className="text-[10px] font-bold text-indigo-500 mb-2 uppercase">✅ จัดกลุ่มถูกต้อง</div>
                   <div className="flex flex-col gap-1 items-center bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                    <div className="w-8 h-8 bg-indigo-500 rounded"></div>
                    <div className="w-16 h-2 bg-indigo-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Theory 2: F-Pattern */}
            <div className="space-y-4">
              <h3 className="font-bold text-indigo-700 flex items-center gap-2 border-b border-indigo-100 pb-2">
                 2. Gutenberg Diagram (F-Pattern)
              </h3>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-outside ml-4">
                <li>สายตาผู้ใช้งานในวัฒนธรรมที่อ่านจากซ้ายไปขวา มักเริ่มกวาดสายตาจาก **มุมซ้ายบน** เสมอ</li>
                <li>ตำแหน่ง **มุมซ้ายบน (Primary Optical Area)** ควรวางโลโก้ หรือข้อมูลสรุปที่สำคัญที่สุด</li>
                <li>ตำแหน่ง **มุมขวาล่าง (Terminal Area)** คือจุดสิ้นสุดการกวาดสายตา เหมาะสำหรับวางปุ่ม ยืนยัน/ชำระเงิน (CTA)</li>
              </ul>
              
              {/* Mini Example: F-Pattern */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative h-32 overflow-hidden mt-2">
                 <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwTTAgMjBoNDBNMCAzMGg0MCIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"></div>
                 <div className="relative z-10 w-full h-full">
                   <div className="absolute top-2 left-2 w-20 h-4 bg-indigo-500 rounded shadow-sm"></div>
                   <div className="absolute top-2 left-28 w-12 h-4 bg-slate-300 rounded"></div>
                   <div className="absolute top-10 left-2 w-16 h-3 bg-slate-300 rounded"></div>
                   <div className="absolute bottom-2 right-2 w-16 h-6 bg-emerald-500 rounded flex items-center justify-center text-[8px] text-white font-bold shadow-sm">CTA Button</div>
                   
                   <svg className="absolute inset-0 w-full h-full pointer-events-none text-rose-400 opacity-60" viewBox="0 0 200 100">
                      <path d="M 20 15 L 150 15" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" markerEnd="url(#arrowhead)" />
                      <path d="M 20 15 L 20 40 L 100 40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" markerEnd="url(#arrowhead)" />
                      <path d="M 20 40 L 20 85 L 180 85" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" markerEnd="url(#arrowhead)" />
                      <defs>
                        <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                          <polygon points="0 0, 5 2.5, 0 5" fill="currentColor" />
                        </marker>
                      </defs>
                   </svg>
                 </div>
              </div>
            </div>
            
            {/* Theory 3: Grid System */}
             <div className="space-y-4 pb-8">
              <h3 className="font-bold text-indigo-700 flex items-center gap-2 border-b border-indigo-100 pb-2">
                 3. The Grid System (12-Column)
              </h3>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-outside ml-4">
                <li>ช่วยสร้างความมีระเบียบ (Alignment) ลดความสะเปะสะปะในการวางชิ้นส่วน UI</li>
                <li>ระบบ 12 คอลัมน์ เป็นที่นิยมมากที่สุดเพราะสามารถหารแบ่งได้ลงตัวหลายรูปแบบ (เช่น หาร 2, 3, 4, 6)</li>
                <li>ทำให้หน้าจอมีความยืดหยุ่น (Responsive) เมื่อต้องย่อขยายขนาดในอุปกรณ์ที่ต่างกัน</li>
              </ul>
              
              {/* Mini Example: Grid */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-1 h-20 relative mt-2">
                 <div className="absolute inset-0 flex justify-between px-4 py-2 pointer-events-none">
                   {[...Array(12)].map((_, i) => (
                     <div key={i} className="w-[6%] bg-indigo-50 h-full border-x border-indigo-100"></div>
                   ))}
                 </div>
                 <div className="w-full flex gap-2 h-full z-10 px-4 py-2">
                    <div className="flex-1 bg-slate-800/90 rounded border border-slate-700 flex items-center justify-center text-[10px] text-white/70 font-medium shadow-sm">4 col</div>
                    <div className="flex-1 bg-slate-800/90 rounded border border-slate-700 flex items-center justify-center text-[10px] text-white/70 font-medium shadow-sm">4 col</div>
                    <div className="flex-1 bg-slate-800/90 rounded border border-slate-700 flex items-center justify-center text-[10px] text-white/70 font-medium shadow-sm">4 col</div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive Simulation Panel */}
      <div className="w-full p-6 sm:p-8 bg-white flex flex-col">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800">Combined Simulation: Dashboard Organizer</h3>
            {isSuccess && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm animate-in zoom-in">
                <CheckCircle2 size={16} /> โครงสร้างสมบูรณ์แบบ
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
            <Toggle label="เปิดเส้น Grid System" checked={useGrid} onChange={setUseGrid} color="indigo" />
            <Toggle label="ใช้ Law of Proximity" checked={useProximity} onChange={setUseProximity} color="indigo" />
            <Toggle label="จัดลำดับ F-Pattern" checked={useFPattern} onChange={setUseFPattern} color="indigo" />
          </div>

          <div className={`relative w-full h-[500px] bg-slate-100 rounded-2xl overflow-hidden transition-colors duration-700 border border-slate-200 shadow-inner
            ${useGrid ? 'bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px)] bg-[size:8.33%_100%]' : ''}`}
          >
            {/* Main Important Metric */}
            <div className="absolute transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col justify-center h-24 bg-indigo-600 rounded-xl p-4 shadow-lg z-10"
                 style={{
                   width: (useFPattern && useProximity) || useProximity ? '180px' : '200px',
                   top: useFPattern ? '24px' : '350px',
                   left: useFPattern ? '24px' : '200px',
                 }}
            >
              <div className="flex items-center gap-2 text-indigo-200 mb-1">
                <DollarSign size={16} /> <span className="text-xs font-medium">ยอดขายรวม</span>
              </div>
              <div className="text-2xl font-bold text-white">฿1.2M</div>
            </div>

            {/* Minor Metric 1 */}
            <div className="absolute transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col justify-center h-24 bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                 style={{
                   width: '180px',
                   top: (useFPattern && useProximity) ? '24px' : useProximity ? '350px' : '150px',
                   left: (useFPattern && useProximity) ? '220px' : useProximity ? '220px' : '40px'
                 }}
            >
               <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Users size={16} className="text-blue-500" /> <span className="text-xs font-medium">ผู้ใช้ใหม่</span>
              </div>
              <div className="text-xl font-bold text-slate-800">842</div>
            </div>

            {/* Minor Metric 2 */}
            <div className="absolute transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col justify-center h-24 bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                 style={{
                   width: '180px',
                   top: (useFPattern && useProximity) ? '24px' : useProximity ? '350px' : '100px',
                   left: (useFPattern && useProximity) ? '416px' : useProximity ? '416px' : '280px'
                 }}
            >
               <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Activity size={16} className="text-emerald-500" /> <span className="text-xs font-medium">อัตราคลิก</span>
              </div>
              <div className="text-xl font-bold text-slate-800">4.2%</div>
            </div>

            {/* Chart Area */}
            <div className="absolute transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center bg-white border border-slate-200 border-dashed rounded-xl"
                 style={{
                   width: useProximity ? '572px' : '256px',
                   height: useProximity ? '280px' : '128px',
                   top: useProximity ? '136px' : '200px',
                   left: useProximity ? '24px' : '100px'
                 }}
            >
               <div className="text-slate-400 flex flex-col items-center gap-2">
                 <BarChart3 size={32} className="opacity-50" />
                 <span className="text-xs font-medium">พื้นที่กราฟ (Chart Content)</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Interaction Theory (Fitts's & Hick's Law)
// ==========================================
function TheoryInteraction() {
  const [fittsMode, setFittsMode] = useState('bad');
  const [clickTime, setClickTime] = useState(null);
  const startTime = useRef(null);

  const [hicksMode, setHicksMode] = useState('long');

  const startFittsTest = (mode) => {
    setFittsMode(mode);
    setClickTime(null);
    startTime.current = Date.now();
  };

  const recordClick = () => {
    if (startTime.current) {
      setClickTime(((Date.now() - startTime.current) / 1000).toFixed(2));
      startTime.current = null;
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Theory Section */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="p-6 sm:p-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
              <MousePointer2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Interaction Laws</h2>
          </div>
          
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            จิตวิทยาการโต้ตอบ อธิบายขีดจำกัดทางร่างกายและสมองของมนุษย์ เพื่อใช้กำหนด **ขนาดของปุ่ม** และ **ปริมาณข้อมูล** ที่เหมาะสม
          </p>

          <div className="space-y-10">
            
            {/* Theory 1: Fitts's Law */}
            <div className="space-y-4">
              <h3 className="font-bold text-cyan-700 flex items-center gap-2 border-b border-cyan-100 pb-2">
                 1. Fitts's Law (กฎระยะทางและขนาด)
              </h3>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-outside ml-4">
                <li>เวลาที่ใช้ในการเลื่อนเมาส์ (หรือนิ้ว) ไปกดปุ่ม ขึ้นอยู่กับ **ระยะทาง** และ **ขนาด** ของเป้าหมาย</li>
                <li>ปุ่มที่สำคัญมาก (เช่น ปุ่มยืนยันชำระเงิน) ต้องมีขนาดใหญ่เห็นชัด และอยู่ในระยะที่เอื้อมถึงง่าย</li>
                <li>ปุ่มที่ไม่ต้องการให้กดผิด (เช่น ปุ่มลบข้อมูล) ควรทำให้มีขนาดเล็ก หรือวางให้ห่างจากจุดโฟกัสหลัก</li>
              </ul>
              
              {/* Mini Example: Fitts's Law */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 mt-2 h-28 relative overflow-hidden">
                <div className="absolute top-2 left-2 text-[10px] text-slate-400 font-medium">จุดเริ่มเมาส์</div>
                <div className="w-4 h-4 bg-slate-200 rounded-full absolute top-6 left-6 animate-pulse"></div>
                
                <div className="absolute top-4 right-4 flex flex-col items-end">
                  <div className="text-[10px] font-bold text-rose-400 mb-1">❌ เล็ก & ไกล (กดใช้เวลานาน)</div>
                  <div className="w-8 h-8 bg-rose-100 border border-rose-300 rounded flex items-center justify-center text-[8px] text-rose-500">CTA</div>
                </div>
                
                <div className="absolute bottom-4 left-24 flex flex-col items-center">
                  <div className="text-[10px] font-bold text-cyan-600 mb-1">✅ ใหญ่ & ใกล้ (กดได้ทันที)</div>
                  <div className="w-32 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm">ปุ่มยืนยันหลัก</div>
                </div>
              </div>
            </div>

            {/* Theory 2: Hick's Law */}
            <div className="space-y-4 pb-8">
              <h3 className="font-bold text-cyan-700 flex items-center gap-2 border-b border-cyan-100 pb-2">
                 2. Hick's Law (การลดภาระการตัดสินใจ)
              </h3>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-outside ml-4">
                <li>ยิ่งผู้ใช้มี **ตัวเลือกมาก** พวกเขายิ่งใช้เวลา **ตัดสินใจนานขึ้น** และมีโอกาสล้มเลิกกลางคัน (Drop-off)</li>
                <li>ฟอร์มกรอกข้อมูลที่ยาวมากๆ ควรนำมาแบ่งเป็นขั้นตอนสั้นๆ (Step-by-step Form หรือ Wizard)</li>
                <li>เมนูที่มีตัวเลือกมากเกินไป ควรจัดหมวดหมู่ย่อย (Categorization) เพื่อลดจำนวนรายการที่ตาเห็นในครั้งแรก</li>
              </ul>
              
              {/* Mini Example: Hick's Law */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 h-36 mt-2">
                 <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col">
                   <div className="text-[10px] font-bold text-rose-400 text-center mb-1">❌ ยาวเป็นพรืด</div>
                   <div className="flex-1 flex flex-col gap-1.5 opacity-60 mt-1">
                     <div className="h-3 w-full bg-slate-200 rounded-sm"></div>
                     <div className="h-3 w-full bg-slate-200 rounded-sm"></div>
                     <div className="h-3 w-full bg-slate-200 rounded-sm"></div>
                     <div className="h-3 w-full bg-slate-200 rounded-sm"></div>
                     <div className="h-3 w-full bg-slate-200 rounded-sm"></div>
                     <div className="h-4 w-full bg-slate-300 rounded-sm mt-auto"></div>
                   </div>
                 </div>
                 
                 <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col">
                   <div className="text-[10px] font-bold text-cyan-600 text-center mb-1">✅ แบ่งสเต็ป</div>
                   <div className="flex gap-1 mb-2 mt-1">
                     <div className="h-1 flex-1 bg-cyan-500 rounded-full"></div>
                     <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                     <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
                   </div>
                   <div className="flex-1 flex flex-col gap-2">
                     <div className="h-4 w-full bg-slate-200 rounded-sm"></div>
                     <div className="h-4 w-full bg-slate-200 rounded-sm"></div>
                     <div className="h-5 w-full bg-cyan-500 rounded-sm mt-auto shadow-sm"></div>
                   </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive Simulation Panel */}
      <div className="w-full p-6 sm:p-8 bg-white flex flex-col">
        <div className="max-w-4xl mx-auto w-full space-y-8">
        
          {/* Fitts's Law Simulation */}
          <div className="border border-slate-200 rounded-3xl p-6 shadow-sm bg-slate-50/50">
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Simulation: Fitts's Target Practice</h4>
              <p className="text-sm text-slate-500 mt-1">ทดสอบความเร็วในการลากเมาส์ไปคลิกเป้าหมาย</p>
            </div>
            <div className="flex gap-2 bg-slate-200/50 p-1 rounded-xl mt-4">
              <button onClick={() => startFittsTest('bad')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${fittsMode === 'bad' ? 'bg-white text-rose-500 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                โหมดปุ่มเล็ก (ผิดหลัก)
              </button>
              <button onClick={() => startFittsTest('good')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${fittsMode === 'good' ? 'bg-white text-cyan-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                โหมดปุ่มใหญ่ (ถูกหลัก)
              </button>
            </div>

            <div className="relative h-56 bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-crosshair group shadow-inner mt-4">
              <div className="absolute bottom-6 left-6 text-sm font-bold text-slate-400 animate-pulse pointer-events-none flex items-center gap-2">
                <Zap size={16} /> นำเมาส์ไปไว้ที่นี่เพื่อเริ่ม
              </div>

              {fittsMode === 'bad' ? (
                <button onMouseDown={recordClick} className="absolute top-4 right-4 w-10 h-10 bg-rose-500 hover:bg-rose-600 text-xs font-medium rounded-lg flex items-center justify-center text-white transition-colors shadow-sm focus:outline-none">
                  Save
                </button>
              ) : (
                <button onMouseDown={recordClick} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-12 py-4 bg-cyan-600 hover:bg-cyan-700 text-xl font-bold rounded-xl flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 focus:outline-none">
                  บันทึกข้อมูลหลัก
                </button>
              )}

              {clickTime && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-10 animate-in fade-in zoom-in-95">
                  <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-xl">
                    <div className="text-4xl font-black text-slate-800 mb-2">{clickTime} วินาที</div>
                    <div className="text-sm font-medium text-slate-500 mb-4">คือระยะเวลาที่สมองใช้กะระยะและคลิกเป้าหมาย</div>
                    <button onClick={() => setClickTime(null)} className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-cyan-600 hover:bg-slate-100 transition-colors">ลองทดสอบอีกครั้ง</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hick's Law Simulation */}
          <div className="border border-slate-200 rounded-3xl p-6 shadow-sm bg-slate-50/50">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <div>
                <h4 className="font-bold text-slate-800 text-lg">Simulation: Hick's Cognitive Load</h4>
                <p className="text-sm text-slate-500 mt-1">เปรียบเทียบภาระสมองเมื่อเจอหน้าฟอร์มที่ต่างกัน</p>
              </div>
              <div className="flex gap-2 bg-slate-200/50 p-1 rounded-xl">
                <button onClick={() => setHicksMode('long')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${hicksMode === 'long' ? 'bg-white text-rose-500 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                  โหมดฟอร์มยาว
                </button>
                <button onClick={() => setHicksMode('step')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${hicksMode === 'step' ? 'bg-white text-cyan-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                  โหมดแบ่งขั้นตอน
                </button>
              </div>
            </div>

            <div className="flex gap-6 h-64">
              {/* Stress Meter */}
              <div className="w-10 flex flex-col justify-end bg-white rounded-full overflow-hidden border border-slate-200 shadow-inner relative">
                <div className={`w-full transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${hicksMode === 'long' ? 'h-[90%] bg-gradient-to-t from-orange-400 to-rose-500' : 'h-[25%] bg-gradient-to-t from-emerald-300 to-emerald-500'}`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="-rotate-90 text-[10px] font-black text-slate-700 tracking-widest opacity-70">STRESS</span>
                </div>
              </div>

              {/* Form Area */}
              <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6 overflow-hidden relative shadow-sm">
                {hicksMode === 'long' ? (
                  <div className="absolute inset-0 p-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="text-base font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">ลงทะเบียนข้อมูลผู้ใช้งานใหม่ (กรอกให้ครบทุกช่อง)</div>
                    <div className="grid grid-cols-2 gap-3 opacity-50">
                      <FakeInput /> <FakeInput /> <FakeInput /> <FakeInput />
                      <FakeInput /> <FakeInput /> <FakeInput /> <FakeInput />
                      <FakeInput /> <FakeInput />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 p-6 animate-in fade-in slide-in-from-left-8 duration-500 bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-base font-bold text-slate-800">ข้อมูลเบื้องต้น</span>
                      <span className="text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md text-xs font-bold">ขั้นตอนที่ 1 จาก 3</span>
                    </div>
                    <div className="flex gap-2 mb-6">
                      <div className="h-1.5 bg-cyan-500 rounded-full flex-1"></div>
                      <div className="h-1.5 bg-slate-100 rounded-full flex-1"></div>
                      <div className="h-1.5 bg-slate-100 rounded-full flex-1"></div>
                    </div>
                    <div className="space-y-4 mb-6">
                      <FakeInput label="ชื่อ-นามสกุล" /> 
                      <FakeInput label="อีเมลสำหรับติดต่อ" />
                    </div>
                    <div className="flex justify-end mt-8">
                      <button className="px-6 py-2 bg-slate-800 hover:bg-slate-900 rounded-xl text-sm font-bold text-white shadow-md transition-transform active:scale-95">ดำเนินการถัดไป</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Accessibility Theory (WCAG)
// ==========================================
const COLORS = [
  { name: 'White Background', hex: '#ffffff', type: 'bg' },
  { name: 'Light Slate Background', hex: '#f8fafc', type: 'bg' },
  { name: 'Dark Slate Background', hex: '#1e293b', type: 'bg' },
  { name: 'Dark Slate Text', hex: '#1e293b', type: 'text' },
  { name: 'Medium Slate Text (Low Contrast)', hex: '#94a3b8', type: 'text' },
  { name: 'Indigo Brand Text', hex: '#4f46e5', type: 'text' },
  { name: 'Emerald Success Text', hex: '#059669', type: 'text' }
];

function getLuminance(hex) {
  let cleanHex = hex.replace('#', '');
  let r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  let g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  let b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  let a = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1, hex2) {
  let l1 = getLuminance(hex1);
  let l2 = getLuminance(hex2);
  let lightest = Math.max(l1, l2);
  let darkest = Math.min(l1, l2);
  let ratio = (lightest + 0.05) / (darkest + 0.05);
  return ratio.toFixed(2);
}

function TheoryAccessibility() {
  const [bgHex, setBgHex] = useState('#ffffff');
  const [textHex, setTextHex] = useState('#94a3b8'); // Fails on white by default

  const ratio = getContrastRatio(bgHex, textHex);
  const isPass = parseFloat(ratio) >= 4.5;

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Theory Section */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="p-6 sm:p-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Accessibility (a11y)</h2>
          </div>
          
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            การออกแบบที่ดีต้องครอบคลุม (Inclusive) ให้ทุกคนสามารถเข้าถึงเนื้อหาได้ โดยเฉพาะผู้ที่มีความบกพร่องทางสายตา หรือผู้ที่อยู่ในสภาพแวดล้อมที่แสงจ้า
          </p>

          <div className="space-y-10">
            
            {/* Theory: WCAG */}
            <div className="space-y-4">
              <h3 className="font-bold text-emerald-700 flex items-center gap-2 border-b border-emerald-100 pb-2">
                 Web Content Accessibility Guidelines (WCAG)
              </h3>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-outside ml-4">
                <li>WCAG คือเกณฑ์มาตรฐานสากลที่กำหนดว่าคอนเทนต์บนเว็บไซต์ควรออกแบบอย่างไรให้ทุกคนอ่านง่าย</li>
                <li>เรื่องที่ผิดพลาดบ่อยที่สุดคือ **ความชัดเจนของสี (Contrast Ratio)** ระหว่างสีตัวอักษรกับสีพื้นหลัง</li>
                <li>ตามเกณฑ์ระดับ **AA** อัตราส่วนความสว่างสำหรับตัวอักษรขนาดปกติ (ราว 16px) **ต้องไม่ต่ำกว่า 4.5 : 1**</li>
                <li>สำหรับตัวอักษรขนาดใหญ่ (ระดับ Headline) อนุโลมให้อัตราส่วนอยู่ที่ **3.0 : 1** ได้</li>
              </ul>
              
              {/* Mini Example: WCAG */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 mt-2">
                <div className="flex-1 p-4 rounded-lg bg-white border border-slate-100 text-center shadow-sm">
                   <div className="text-[10px] font-bold text-rose-400 mb-2 uppercase">❌ Contrast ต่ำเกินไป</div>
                   <div className="text-slate-300 font-bold text-xl">Lorem Ipsum</div>
                   <div className="text-[10px] text-slate-400 mt-1">Ratio &lt; 4.5:1 (อ่านยาก)</div>
                </div>
                
                <div className="flex-1 p-4 rounded-lg bg-slate-900 border border-slate-800 text-center shadow-md">
                   <div className="text-[10px] font-bold text-emerald-400 mb-2 uppercase">✅ Contrast ผ่านเกณฑ์</div>
                   <div className="text-white font-bold text-xl">Lorem Ipsum</div>
                   <div className="text-[10px] text-slate-400 mt-1">Ratio &gt; 4.5:1 (คมชัด)</div>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm">
              <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-3">
                <Info size={16} className="text-emerald-600" /> คำแนะนำสำหรับนักออกแบบหน้าใหม่
              </h4>
              <p className="text-sm text-emerald-700 leading-relaxed">
                การเลือกใช้สีเทาอ่อนบนพื้นสีขาว อาจทำให้งานออกแบบดู "สวยงามแบบมินิมอล" ในจอคอมพิวเตอร์ของคุณ แต่ในการใช้งานจริงผ่านหน้าจอมือถือที่มีแสงสะท้อน ผู้ใช้งานจะหงุดหงิดที่ต้องเพ่งสายตา 
                **จงให้ความสำคัญกับการใช้งาน (Usability) มากกว่าความสวยงามส่วนตัวเสมอ**
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive Simulation Panel */}
      <div className="w-full p-6 sm:p-8 flex flex-col justify-center bg-white">
        <div className="border border-slate-200 rounded-3xl p-8 shadow-sm bg-slate-50/50 max-w-4xl mx-auto w-full">
          <h4 className="font-bold text-slate-800 text-lg mb-8 flex items-center gap-2">
            Simulation: Contrast Inspector <Eye size={20} className="text-slate-400" />
          </h4>
          
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-3 block">1. เลือกสีพื้นหลัง (Background)</label>
                <div className="flex gap-3 flex-wrap">
                  {COLORS.filter(c => c.type === 'bg').map(c => (
                    <button key={'bg'+c.hex} onClick={() => setBgHex(c.hex)} 
                      className={`w-10 h-10 rounded-full border border-slate-300 shadow-sm transition-all ${bgHex === c.hex ? 'ring-2 ring-emerald-500 ring-offset-2 scale-110' : 'hover:scale-105'}`}
                      style={{backgroundColor: c.hex}} title={c.name}
                    />
                  ))}
                </div>
              </div>
              
              <div className="h-px bg-slate-200 w-full"></div>
              
              <div>
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-3 block">2. เลือกสีข้อความ (Text)</label>
                <div className="flex gap-3 flex-wrap">
                  {COLORS.filter(c => c.type === 'text').map(c => (
                    <button key={'text'+c.hex} onClick={() => setTextHex(c.hex)} 
                      className={`w-10 h-10 rounded-full border border-slate-300 shadow-sm transition-all ${textHex === c.hex ? 'ring-2 ring-emerald-500 ring-offset-2 scale-110' : 'hover:scale-105'}`}
                      style={{backgroundColor: c.hex}} title={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-300 relative overflow-hidden transition-colors duration-300 shadow-md h-64" style={{backgroundColor: bgHex}}>
              <div className="z-10 text-center">
                <h4 style={{color: textHex}} className="text-3xl font-black mb-3 transition-colors duration-300">Test Readability</h4>
                <p style={{color: textHex}} className="text-sm font-medium opacity-90 transition-colors duration-300 max-w-[180px] mx-auto leading-relaxed">
                  ข้อความนี้อ่านง่ายพอสำหรับทุกคนในสภาพแสงจ้าหรือไม่?
                </p>
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {isPass ? (
                  <span className="bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-md shadow-sm animate-in zoom-in">PASS (AA)</span>
                ) : (
                  <span className="bg-rose-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-md shadow-sm animate-in zoom-in">FAIL</span>
                )}
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                  <span className="bg-white/95 text-slate-800 text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm shadow-md border border-slate-200">
                    Contrast Ratio = {ratio} : 1
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared Component
function Toggle({ label, checked, onChange, color }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group select-none bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
      <input 
        type="checkbox" 
        className="hidden" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      <div className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${checked ? 'bg-indigo-500' : 'bg-slate-200'}`}>
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
      <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
  );
}

function FakeInput({ label }) {
  return (
    <div className="space-y-1 w-full">
      {label && <div className="h-3 w-20 bg-slate-200 rounded text-[10px] text-slate-600 font-bold pl-1 leading-3 uppercase tracking-wider">{label}</div>}
      <div className="h-10 bg-slate-100 rounded-lg border border-slate-200 w-full"></div>
    </div>
  );
}
