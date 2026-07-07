import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Layers, 
  Globe, 
  Home, 
  HelpCircle,
  CornerDownLeft,
  ArrowRight
} from 'lucide-react';
import { 
  SimulatorShell, 
  ConsoleScreen, 
  ConceptCard, 
  SectionBlock, 
  AmbientBackdrop 
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function py6_3_ReturnAndScope() {
  const [globalVal, setGlobalVal] = useState(10);
  const [inputVal, setInputVal] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [simStep, setSimStep] = useState(0); // 0: idle, 1: global init, 2: call & local init, 3: return calculation, 4: return flying, 5: val saved, 6: local destroyed
  const [localVars, setLocalVars] = useState(null); // { n: 0, y: 0, result: 0 }
  const [globalVars, setGlobalVars] = useState({ x: 10 });
  const [logs, setLogs] = useState(['# เริ่มต้นระบบ: ประกาศตัวแปร global x = 10']);
  
  const timerRef = useRef(null);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setSimStep(1);
    setLocalVars(null);
    setGlobalVars({ x: globalVal });
    setLogs([`>>> x = ${globalVal}  # ประกาศตัวแปร Global`]);
  };

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setTimeout(() => {
      if (simStep === 1) {
        // Step 2: Jumps into function. Local variables are initialized
        setSimStep(2);
        setLocalVars({ n: inputVal, y: 5 });
        setLogs(prev => [
          ...prev, 
          `>>> val = add_number(${inputVal})  # เรียกฟังก์ชัน\n# LOCAL: สร้างตัวแปร local n = ${inputVal} และ y = 5 ในหน่วยความจำฟังก์ชัน`
        ]);
      } 
      else if (simStep === 2) {
        // Step 3: Calculation of result
        setSimStep(3);
        const res = inputVal + 5;
        setLocalVars(prev => ({ ...prev, result: res }));
        setLogs(prev => [
          ...prev, 
          `# LOCAL: ทำการคำนวณ result = n + y\n# result = ${inputVal} + 5 = ${res}`
        ]);
      }
      else if (simStep === 3) {
        // Step 4: Return value animation start
        setSimStep(4);
        const res = inputVal + 5;
        setLogs(prev => [
          ...prev, 
          `>>> return result  # ส่งค่า ${res} กลับออกไปนอกฟังก์ชัน`
        ]);
      }
      else if (simStep === 4) {
        // Step 5: Global variable val is saved
        setSimStep(5);
        const res = inputVal + 5;
        setGlobalVars(prev => ({ ...prev, val: res }));
        setLogs(prev => [
          ...prev, 
          `# GLOBAL: ได้รับค่ากลับมาและเก็บลงในตัวแปร global_val\nglobal_val = ${res}`
        ]);
      }
      else if (simStep === 5) {
        // Step 6: Local Memory sandbox is destroyed
        setSimStep(6);
        setLocalVars(null);
        setLogs(prev => [
          ...prev, 
          `# DESTROY: จบการทำงานฟังก์ชัน ตัวแปร Local (n, y, result) ทั้งหมดในแซนด์บ็อกซ์จะถูกลบทำลายทิ้งทันที!`
        ]);
      }
      else if (simStep === 6) {
        // Done
        setSimStep(0);
        setIsRunning(false);
      }
    }, 1500);

    return () => clearTimeout(timerRef.current);
  }, [isRunning, simStep, globalVal, inputVal]);

  const handleTryAccessLocal = () => {
    setLogs(prev => [
      ...prev, 
      `>>> print(y)\n# NameError: name 'y' is not defined\n⚠️ Error: ไม่สามารถเข้าถึงตัวแปร y ได้เพราะมันเป็น Local Variable ที่ถูกลบไปแล้วหลังออกจากฟังก์ชัน!`
    ]);
  };

  const handleReset = () => {
    setGlobalVal(10);
    setInputVal(20);
    setIsRunning(false);
    setSimStep(0);
    setLocalVars(null);
    setGlobalVars({ x: 10 });
    setLogs(['# เริ่มต้นระบบ: ประกาศตัวแปร global x = 10']);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const teacherTaskContent = `โจทย์ปฏิบัติการคำสั่ง return และขอบเขตตัวแปร:
1. ให้นักเรียนสร้างตัวแปร Global ชื่อ discount_rate = 0.1 (สัญลักษณ์ลดราคา 10%)
2. สร้างฟังก์ชัน apply_discount(price) ที่มีพารามิเตอร์รับราคาสินค้ามาคำนวณราคาส่วนลด
3. ให้ฟังก์ชันทำการส่งผลลัพธ์ราคาสุทธิที่หักส่วนลดแล้วกลับออกไปด้วยคำสั่ง return
4. ประกาศตัวแปร Global ชื่อ final_price มารับผลลัพธ์จากการเรียกฟังก์ชัน apply_discount(1200) และสั่งพิมพ์ผลลัพธ์ออกมาแสดงทางจอภาพ`;

  return (
    <div className="font-sans text-slate-900 pb-24 relative overflow-hidden">
      <AmbientBackdrop />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section 1: Theory Return */}
        <div className="mb-12">
          <SectionBlock 
            title="คำสั่ง return (การคืนผลลัพธ์จากฟังก์ชัน)"
            description="คำสั่ง return คือคำสั่งที่ใช้ในการส่งข้อมูลผลลัพธ์กลับออกไปนอกฟังก์ชันเพื่อเก็บลงในตัวแปรภายนอกหรือนำไปคำนวณต่อ มีความแตกต่างจากการใช้ print() ที่เพียงแสดงผลอักษรออกหน้าจอแต่ไม่ส่งค่ากลับ"
            accent="teal"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <ConceptCard 
                symbol="return x"
                title="การส่งคืนค่าจากฟังก์ชัน"
                description="เมื่อฟังก์ชันรันมาเจอคำสั่ง return ฟังก์ชันจะหยุดทำงานลงทันที และจะส่งข้อมูล x กลับไปยังจุดที่เรียกใช้นั้น"
                code='def add(a, b): return a + b'
                result='Calculates and Returns'
                accent="teal"
              />
              <ConceptCard 
                symbol="return vs print"
                title="ความต่างของผลลัพธ์และการโชว์"
                description="print() แสดงข้อความออกจอภาพแต่นำค่าไปเก็บหรือใช้ต่อไม่ได้ / return คืนค่ากลับไปเก็บในตัวแปรเพื่อนำไปคิดต่อทางตรรกะได้"
                code='res = add(5, 5)'
                result='res = 10 (สามารถใช้งานต่อได้)'
                accent="indigo"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 2: Theory Scope */}
        <div className="mb-12">
          <SectionBlock 
            title="ขอบเขตตัวแปร (Variable Scope - Local vs Global)"
            description="ขอบเขตของตัวแปร (Scope) คือขอบเขตอาณาบริเวณพื้นที่ที่ตัวแปรนั้นๆ มีตัวตนและสามารถเข้าถึงมาเรียกใช้งานได้ แบ่งออกเป็น 2 ประเภทหลัก"
            accent="violet"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <ConceptCard 
                symbol="Global"
                title="ตัวแปรสากล (Global Variable)"
                description="ตัวแปรที่ประกาศไว้นอกฟังก์ชัน (ด้านนอกสุดของหน้าจอโค้ด) ทุกฟังก์ชันในโปรแกรมสามารถเปิดอ่านค่าได้ตลอดเวลา"
                code='x = 10 # Global'
                result='Visible everywhere'
                accent="violet"
              />
              <ConceptCard 
                symbol="Local"
                title="ตัวแปรเฉพาะถิ่น (Local Variable)"
                description="ตัวแปรที่ประกาศไว้ภายในฟังก์ชัน จะมีตัวตนอยู่เฉพาะในขอบเขตการทำงานของฟังก์ชันนั้น และจะถูกลบทำลายทันทีที่ออกจากฟังก์ชัน"
                code='def fn(): y = 5 # Local'
                result='Error if read outside'
                accent="rose"
                resultColor="rose"
              />
              <ConceptCard 
                symbol="global keyword"
                title="ขอสิทธิ์แก้ไขค่า Global"
                description="เมื่อต้องการแก้ไขค่าตัวแปร Global จากภายในฟังก์ชัน ต้องระบุคีย์เวิร์ด global นำหน้าชื่อตัวแปรนั้นก่อนแก้ไขค่า"
                code='global x; x = 20'
                result='Modifies original x'
                accent="sky"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 3: Simulator */}
        <div className="mb-12">
          <SimulatorShell 
            title="เครื่องจำลองขอบเขตหน่วยความจำและขอบเขตตัวแปร (Variable Scope Visualizer)"
            icon={<Layers className="w-6 h-6" />}
            accentBg="bg-teal-50"
            iconColor="text-teal-600"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Inputs and Code View */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h5 className="font-bold text-slate-800 text-[15px] mb-4">
                    กำหนดตัวแปรทดสอบการคำนวณ
                  </h5>

                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Global Variable x</label>
                        <input 
                          type="number"
                          value={globalVal}
                          onChange={(e) => setGlobalVal(parseInt(e.target.value) || 0)}
                          disabled={isRunning}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Input Argument (n)</label>
                        <input 
                          type="number"
                          value={inputVal}
                          onChange={(e) => setInputVal(parseInt(e.target.value) || 0)}
                          disabled={isRunning}
                          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex-1 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Play className="w-4 h-4" /> เริ่มรันโค้ดจำลอง
                      </button>
                      <button 
                        onClick={handleTryAccessLocal}
                        disabled={isRunning}
                        className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95 shadow-md cursor-pointer"
                      >
                        ลองพิมพ์ตัวแปร local y นอกฟังก์ชัน
                      </button>
                      <button 
                        onClick={handleReset}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 rounded-xl text-sm transition-all active:scale-95 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SOT Code Panel */}
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 text-slate-300 font-mono text-xs leading-relaxed relative">
                  <div className="absolute top-2 right-2 text-[9px] text-slate-600 uppercase">Variable Code</div>
                  
                  <div className="flex flex-col gap-1">
                    <div>x = <span className="text-amber-400">{globalVal}</span> <span className="text-slate-500"># Global Variable</span></div>
                    <div className="p-1"></div>
                    <div><span className="text-pink-500">def</span> <span className="text-sky-400">add_number</span>(n):</div>
                    <div className="ml-6">y = <span className="text-amber-400">5</span> <span className="text-slate-500"># Local Variable (เฉพาะในฟังก์ชัน)</span></div>
                    <div className="ml-6">result = n + y</div>
                    <div className="ml-6"><span className="text-pink-500">return</span> result <span className="text-slate-500"># คืนผลลัพธ์ออกไป</span></div>
                    <div className="p-1"></div>
                    <div>global_val = add_number(<span className="text-amber-400">{inputVal}</span>)</div>
                  </div>
                </div>

              </div>

              {/* Memory Sandbox Visualization Column */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                
                {/* Visual Boxes showing Global and Local Memories */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-6">
                  <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                    โครงสร้างหน่วยความจำจำลอง (Memory Space Visualizer)
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Global Scope Memory Box */}
                    <div className="bg-white border-2 border-indigo-100 rounded-2xl p-4 min-h-[180px] flex flex-col relative shadow-sm">
                      <div className="flex items-center gap-1 text-xs font-bold text-indigo-700 uppercase mb-3">
                        <Globe className="w-3.5 h-3.5" /> Global Memory Space
                      </div>
                      
                      <div className="flex flex-col gap-2 font-mono text-xs">
                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-2 flex justify-between">
                          <span className="text-indigo-800 font-bold">x</span>
                          <span className="text-slate-600">{globalVars.x}</span>
                        </div>
                        {globalVars.val !== undefined && (
                          <div className={`border rounded-lg p-2 flex justify-between animate-fade-in ${
                            simStep === 5 ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold' : 'border-slate-100 text-emerald-950'
                          }`}>
                            <span>global_val</span>
                            <span>{globalVars.val}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Local Scope Memory Box */}
                    <div className={`rounded-2xl p-4 min-h-[180px] flex flex-col relative shadow-sm border-2 transition-all duration-500 ${
                      localVars 
                        ? 'bg-amber-50/20 border-amber-200' 
                        : 'bg-slate-100/50 border-slate-200 border-dashed opacity-50'
                    }`}>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-700 uppercase mb-3">
                        <Home className="w-3.5 h-3.5" /> Local Memory Sandbox
                      </div>

                      {localVars ? (
                        <div className="flex flex-col gap-2 font-mono text-xs animate-fade-in">
                          <div className="bg-white border border-amber-100 rounded-lg p-1.5 flex justify-between">
                            <span className="text-amber-800 font-bold">n (argument)</span>
                            <span>{localVars.n}</span>
                          </div>
                          <div className="bg-white border border-amber-100 rounded-lg p-1.5 flex justify-between">
                            <span className="text-amber-800 font-bold">y</span>
                            <span>{localVars.y}</span>
                          </div>
                          {localVars.result !== undefined && (
                            <div className={`border rounded-lg p-1.5 flex justify-between relative ${
                              simStep === 4 ? 'bg-emerald-600 border-emerald-700 text-white font-bold scale-105 shadow-md animate-pulse' : 'bg-white border-amber-100'
                            }`}>
                              <span className="font-bold flex items-center gap-1">
                                {simStep === 4 && <CornerDownLeft className="w-3.5 h-3.5" />} result
                              </span>
                              <span>{localVars.result}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="m-auto text-slate-400 text-xs italic text-center leading-relaxed">
                          {simStep === 6 ? (
                            <span className="text-rose-500 font-bold">Local Sandbox ถูกลบทำลายหมดเกลี้ยง!</span>
                          ) : (
                            'จะถูกสร้างขึ้นเมื่อกระโดดเข้าทำงานในฟังก์ชันเท่านั้น'
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Console Log Panel */}
                <ConsoleScreen 
                  label="# python - variables logs"
                  accentLabel="log console"
                  isLoading={isRunning && simStep === 0}
                  output={logs.join('\n')}
                  multiline={true}
                  placeholder="กดปุ่มเพื่อเริ่มจำลองการไหลเวียนหน่วยความจำ"
                />

              </div>

            </div>
          </SimulatorShell>
        </div>

        {/* Section 4: Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
