import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Wrench,
  Bug
} from 'lucide-react';
import { 
  SimulatorShell, 
  ConsoleScreen, 
  ConceptCard, 
  SectionBlock, 
  AmbientBackdrop 
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function py6_4_FunctionTestingAndDebugging() {
  const [isRepaired, setIsRepaired] = useState(false);
  const [testMode, setTestMode] = useState('none'); // 'none' | 'normal' | 'empty'
  const [logs, setLogs] = useState(['# เริ่มต้นระบบ: โหลดระบบทดสอบโค้ดฟังก์ชัน calculate_average']);
  const [isLoading, setIsLoading] = useState(false);
  const [flashSuccess, setFlashSuccess] = useState(false);

  const handleTest = (mode) => {
    setIsLoading(true);
    setTestMode(mode);

    setTimeout(() => {
      let resultLogs = [];
      if (mode === 'normal') {
        const scores = [80, 90, 100];
        resultLogs = [
          `>>> scores = [80, 90, 100]`,
          `>>> calculate_average(scores)`,
          `# JUMP: เข้าสู่ฟังก์ชันประมวลผล`,
          `# total = 270, count = 3`,
          `# ผลลัพธ์ที่ได้: 90.0`
        ];
      } else if (mode === 'empty') {
        const scores = [];
        if (isRepaired) {
          resultLogs = [
            `>>> scores = []`,
            `>>> calculate_average(scores)`,
            `# JUMP: เข้าสู่ฟังก์ชันประมวลผล`,
            `# CHECK: ตรวจพบ len(scores) == 0 -> เข้าเงื่อนไขความปลอดภัย`,
            `# ผลลัพธ์ที่ได้: 0`
          ];
        } else {
          resultLogs = [
            `>>> scores = []`,
            `>>> calculate_average(scores)`,
            `# JUMP: เข้าสู่ฟังก์ชันประมวลผล`,
            `# total = 0, count = 0`,
            `# average = 0 / 0`,
            `⚠️ Traceback (most recent call last):`,
            `  File "main.py", line 4, in calculate_average`,
            `    average = total / count`,
            `❌ ZeroDivisionError: division by zero`
          ];
        }
      }
      
      setLogs(prev => [...prev, ...resultLogs]);
      setIsLoading(false);
    }, 600);
  };

  const handleRepair = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsRepaired(true);
      setFlashSuccess(true);
      setLogs(prev => [
        ...prev, 
        `# REPAIR: ซ่อมแซมตัวอย่างโค้ดโปรแกรมสำเร็จ โดยเพิ่มการตรวจสอบเงื่อนไขความปลอดภัยด้วยคำสั่ง if`
      ]);
      setIsLoading(false);
      setTimeout(() => setFlashSuccess(false), 1200);
    }, 600);
  };

  const handleReset = () => {
    setIsRepaired(false);
    setTestMode('none');
    setLogs(['# เริ่มต้นระบบ: โหลดระบบทดสอบโค้ดฟังก์ชัน calculate_average']);
    setIsLoading(false);
    setFlashSuccess(false);
  };

  const teacherTaskContent = `โจทย์ปฏิบัติการทดสอบและแก้ไขจุดบกพร่อง (Debugging):
1. ให้นักเรียนสร้างฟังก์ชันชื่อ divide_numbers(a, b) เพื่อทำหน้าที่หารตัวเลข
2. ทดลองสั่งหารด้วยเลขศูนย์ เช่น divide_numbers(10, 0) สังเกตและบันทึกประเภทข้อผิดพลาด (Exception Name) ที่เกิดขึ้น
3. ทำการปรับปรุงฟังก์ชันโดยเพิ่มเงื่อนไข if ตรวจสอบว่าถ้าตัวหาร b เท่ากับ 0 ให้แสดงคำเตือน "ตัวหารห้ามเป็น 0" และใช้คำสั่ง return None
4. ทดสอบเรียกใช้งานฟังก์ชันอีกครั้งด้วยอินพุตเดิมเพื่อยืนยันว่าโปรแกรมไม่เกิดการแครชเสียหาย`;

  return (
    <div className="font-sans text-slate-900 pb-24 relative overflow-hidden">
      <AmbientBackdrop />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section 1: Theory Testing */}
        <div className="mb-12">
          <SectionBlock 
            title="ระเบียบวิธีและขั้นตอนการทดสอบฟังก์ชัน (Function Testing)"
            description="การทดสอบฟังก์ชัน คือกระบวนการป้อนข้อมูลทดสอบ (Test Cases) เข้าไปประมวลผลในฟังก์ชันเพื่อตรวจสอบความถูกต้องของเอาต์พุตที่ได้ โดยครอบคลุมทั้งกรณีปกติ และกรณีขอบเขตวิกฤต (Edge Cases) เพื่อยืนยันว่าระบบทำงานได้อย่างถูกต้องไร้ข้อผิดพลาด"
            accent="teal"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <ConceptCard 
                symbol="test case"
                title="กรณีทดสอบทั่วไป (Normal Cases)"
                description="การป้อนชุดข้อมูลปกติที่ตรงกับความต้องการหลักของฟังก์ชันเพื่อดูว่าคืนค่าถูกต้องหรือไม่ เช่น การส่งตัวเลขบวกเข้าฟังก์ชันบวกเลข"
                code='assert calculate_average([10, 20, 30]) == 20'
                result='Test Passed'
                accent="teal"
              />
              <ConceptCard 
                symbol="edge case"
                title="กรณีขอบเขตวิกฤต (Edge Cases)"
                description="การทดสอบด้วยข้อมูลกรณีที่อาจก่อให้เกิดปัญหา เช่น การส่งค่าว่าง ลิสต์เปล่า หรือตัวเลขติดลบ เพื่อทดสอบความคงทนของระบบ"
                code='calculate_average([])'
                result='Potential Crash Point'
                accent="rose"
                resultColor="rose"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 2: Theory Debugging */}
        <div className="mb-12">
          <SectionBlock 
            title="หลักการแก้ไขข้อผิดพลาดในฟังก์ชัน (Function Debugging)"
            description="เมื่อโปรแกรมประมวลผลคลาดเคลื่อนหรือเกิดแครช (Crash) ภาษา Python จะทำการรายงานโครงสร้างประวัติข้อขัดข้อง (Traceback) เพื่อให้ผู้พัฒนาดำเนินการแก้ไขข้อผิดพลาดโดยด่วน"
            accent="violet"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <ConceptCard 
                symbol="Traceback"
                title="การอ่านจุดแครชของโปรแกรม"
                description="ข้อความแจ้งเตือนสีแดงในเทอร์มินัล ระบุไฟล์ บรรทัด และประเภทความขัดข้องที่ทำให้ระบบล้มเหลว"
                code='ZeroDivisionError: division by zero'
                result='Locate Bug Line'
                accent="rose"
                resultColor="rose"
              />
              <ConceptCard 
                symbol="Print Debug"
                title="การตรวจสอบระหว่างทาง"
                description="การใส่คำสั่ง print() ไว้ตามจุดต่าง ๆ ภายในฟังก์ชันเพื่อตรวจสอบความถูกต้องของค่าตัวแปรย่อยขณะระบบทำงาน"
                code='print("Temp total:", total)'
                result='Inspect State'
                accent="indigo"
              />
              <ConceptCard 
                symbol="Validation"
                title="การป้องกันข้อมูลเข้า (Validation)"
                description="เขียนเงื่อนไขควบคุมที่หัวฟังก์ชันเพื่อคัดกรองข้อมูลเข้าที่ไม่ถูกต้อง ช่วยป้องกันไม่ให้โปรแกรมหลักเกิดการแครชล้มเหลว"
                code='if len(scores) == 0: return 0'
                result='Safe Return'
                accent="emerald"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 3: Simulator (Interactive Repair & Morph Standard) */}
        <div className="mb-12">
          <SimulatorShell 
            title="ห้องปฏิบัติการวินิจฉัยและซ่อมแซมโค้ด (Interactive Code Debugger & Repair Lab)"
            icon={<Bug className="w-6 h-6" />}
            accentBg="bg-teal-50"
            iconColor="text-teal-600"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Code Panel & Controller */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                
                {/* Controller Panel */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h5 className="font-bold text-slate-800 text-[15px] mb-4">
                    ชุดทดสอบจำลอง (Execute Tester)
                  </h5>

                  <div className="flex flex-col gap-4">
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleTest('normal')}
                        disabled={isLoading}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        ทดสอบลิสต์ปกติ [80, 90, 100]
                      </button>
                      <button 
                        onClick={() => handleTest('empty')}
                        disabled={isLoading}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        ทดสอบลิสต์ว่างเปล่า [ ]
                      </button>
                    </div>

                    {!isRepaired ? (
                      <button 
                        onClick={handleRepair}
                        disabled={isLoading}
                        className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Wrench className="w-4 h-4 animate-pulse" /> ซ่อมแซมโค้ด (Apply Safety Check)
                      </button>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-2 text-emerald-800 text-xs font-bold animate-fade-in">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> โค้ดได้รับการซ่อมแซมและปลอดภัยแล้ว!
                      </div>
                    )}

                    <div className="border-t border-slate-200 pt-3 text-right">
                      <button 
                        onClick={handleReset}
                        className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตแบบจำลอง
                      </button>
                    </div>

                  </div>
                </div>

                {/* Bug Code Display (Morphing code representation) */}
                <div className={`bg-slate-950 rounded-2xl p-6 border text-slate-300 font-mono text-xs leading-relaxed relative overflow-hidden transition-all duration-500 ${
                  flashSuccess 
                    ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-[1.01]' 
                    : isRepaired 
                      ? 'border-emerald-800' 
                      : 'border-rose-900/60 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                }`}>
                  <div className="absolute top-2 right-2 text-[9px] text-slate-600 uppercase">
                    {isRepaired ? 'Repaired Code' : 'Buggy Code'}
                  </div>

                  {!isRepaired ? (
                    <div className="flex flex-col gap-1">
                      <div className="text-slate-500"># โค้ดเสี่ยงอันตราย (ขาดการตรวจสอบข้อมูลว่างเปล่า)</div>
                      <div><span className="text-pink-500">def</span> <span className="text-sky-400">calculate_average</span>(scores):</div>
                      <div className="ml-6">total = <span className="text-sky-400">sum</span>(scores)</div>
                      <div className="ml-6">count = <span className="text-sky-400">len</span>(scores)</div>
                      <div className="ml-6 bg-rose-950/50 border-l-[3px] border-rose-500 pl-2 text-rose-300">
                        average = total / count <span className="text-rose-400 font-bold"># BUG: แครชเมื่อ count = 0</span>
                      </div>
                      <div className="ml-6"><span className="text-pink-500">return</span> average</div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 animate-fade-in">
                      <div className="text-emerald-500"># โค้ดที่ได้รับการแก้ไขอย่างปลอดภัย (ผ่านเกณฑ์ประเมิน)</div>
                      <div><span className="text-pink-500">def</span> <span className="text-sky-400">calculate_average</span>(scores):</div>
                      
                      {/* Safety Check Insertion (Morph visual highlighting) */}
                      <div className="ml-6 bg-emerald-950/50 border-l-[3px] border-emerald-500 pl-2 text-emerald-300 animate-[flash-green_1.2s_ease-out]">
                        <span className="text-pink-500">if</span> <span className="text-sky-400">len</span>(scores) == <span className="text-amber-400">0</span>:<br />
                        <span className="text-pink-500 pl-4">return</span> <span className="text-amber-400">0</span>  <span className="text-emerald-400"># จัดการกรณีลิสต์ว่างเปล่า</span>
                      </div>

                      <div className="ml-6">total = <span className="text-sky-400">sum</span>(scores)</div>
                      <div className="ml-6">count = <span className="text-sky-400">len</span>(scores)</div>
                      <div className="ml-6">average = total / count</div>
                      <div className="ml-6"><span className="text-pink-500">return</span> average</div>
                    </div>
                  )}
                </div>

              </div>

              {/* Console Output Screen Panel */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <ConsoleScreen 
                  label="# python - interactive testing environment"
                  accentLabel={isRepaired ? 'safe status' : 'warning status'}
                  accentColor={isRepaired ? 'text-emerald-400' : 'text-rose-400'}
                  isLoading={isLoading}
                  output={logs.join('\n')}
                  multiline={true}
                  placeholder="คลิกเริ่มทดสอบโค้ดฟังก์ชันเพื่อทดสอบความเสี่ยง"
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
