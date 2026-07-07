import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Layers, 
  Scissors, 
  HelpCircle,
  Activity,
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

export default function py5_3_SetsAndSlicing() {
  const [activeTab, setActiveTab] = useState('set'); // 'set' | 'slicing'
  const [isLoading, setIsLoading] = useState(false);

  // Set states
  const [setA] = useState([1, 2, 3, 4]);
  const [setB] = useState([3, 4, 5, 6]);
  const [setActiveOp, setSetActiveOp] = useState('none'); // 'none' | 'union' | 'intersect' | 'diff' | 'symdiff'
  const [setLogs, setSetLogs] = useState(['# เริ่มต้นระบบ:\nA = {1, 2, 3, 4}\nB = {3, 4, 5, 6}']);

  // Slicing states
  const [sliceText] = useState('PYTHON');
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceStop, setSliceStop] = useState(4);
  const [sliceStep, setSliceStep] = useState(1);
  const [slicingLogs, setSlicingLogs] = useState(['# เริ่มต้นระบบ Slicing:\ntext = "PYTHON"']);

  const triggerRunAnimation = (actionFn, logText) => {
    setIsLoading(true);
    setTimeout(() => {
      actionFn();
      setIsLoading(false);
    }, 500);
  };

  // Set Operations
  const handleSetOp = (op) => {
    setSetActiveOp(op);
    let result = '';
    let cmd = '';
    if (op === 'union') {
      cmd = 'A.union(B)';
      result = '{1, 2, 3, 4, 5, 6}';
    } else if (op === 'intersect') {
      cmd = 'A.intersection(B)';
      result = '{3, 4}';
    } else if (op === 'diff') {
      cmd = 'A.difference(B)';
      result = '{1, 2}';
    } else if (op === 'symdiff') {
      cmd = 'A.symmetric_difference(B)';
      result = '{1, 2, 5, 6}';
    }

    triggerRunAnimation(
      () => {},
      `>>> A = {1, 2, 3, 4}\n>>> B = {3, 4, 5, 6}\n>>> result = ${cmd}\n# ผลลัพธ์: ${result}`
    );
    setSetLogs(prev => [
      ...prev,
      `>>> result = ${cmd}\n# ผลลัพธ์: ${result}`
    ]);
  };

  // Slicing Calculation
  const getSlicedResult = () => {
    try {
      const step = sliceStep === 0 ? 1 : sliceStep;
      // Simple Javascript Slicing equivalent for demonstration
      let chars = sliceText.split('');
      
      // Handle Python negative index
      const resolveIdx = (idx, len) => {
        if (idx < 0) return Math.max(0, len + idx);
        return Math.min(len, idx);
      };

      const start = resolveIdx(sliceStart, chars.length);
      const stop = resolveIdx(sliceStop, chars.length);

      let result = [];
      if (step > 0) {
        for (let i = start; i < stop; i += step) {
          result.push({ char: chars[i], index: i });
        }
      } else {
        for (let i = start; i > stop; i += step) {
          result.push({ char: chars[i], index: i });
        }
      }
      return result;
    } catch (err) {
      return [];
    }
  };

  const slicedData = getSlicedResult();
  const slicedString = slicedData.map(d => d.char).join('');
  const activeIndices = slicedData.map(d => d.index);

  const handleRunSlicing = () => {
    const startStr = sliceStart === 0 ? '' : sliceStart;
    const stopStr = sliceStop === sliceText.length ? '' : sliceStop;
    const stepStr = sliceStep === 1 ? '' : `:${sliceStep}`;
    const cmd = `text[${startStr}:${stopStr}${stepStr}]`;

    triggerRunAnimation(
      () => {},
      `>>> text = "PYTHON"\n>>> sliced = ${cmd}\n# ผลลัพธ์ที่ได้: "${slicedString}"`
    );
    setSlicingLogs(prev => [
      ...prev,
      `>>> sliced = ${cmd}\n# ผลลัพธ์ที่ได้: "${slicedString}"`
    ]);
  };

  const handleReset = () => {
    setSetActiveOp('none');
    setSetLogs(['# เริ่มต้นระบบ:\nA = {1, 2, 3, 4}\nB = {3, 4, 5, 6}']);
    setSliceStart(0);
    setSliceStop(4);
    setSliceStep(1);
    setSlicingLogs(['# เริ่มต้นระบบ Slicing:\ntext = "PYTHON"']);
    setIsLoading(false);
  };

  const teacherTaskContent = `โจทย์ปฏิบัติการ Set & String Slicing:
1. ให้นักเรียนสร้างเซต A เก็บวิชา {"Math", "Sci", "Eng"} และเซต B เก็บวิชา {"Sci", "Art", "PE"}
2. เขียนคำสั่งหาผลรวมของวิชาทั้งหมดโดยไม่ซ้ำกัน (Union) และพิมพ์ผลลัพธ์
3. เขียนคำสั่งหาวิชาที่ทับซ้อนหรือเรียนเหมือนกันของทั้งสองเซต (Intersection) และพิมพ์ผลลัพธ์
4. ให้นักเรียนสร้างตัวแปรข้อความ fullname = "สมศักดิ์ รักเรียน"
5. ใช้หลักการ Slicing ตัดข้อความเฉพาะนามสกุล "รักเรียน" ออกมาเก็บไว้ในตัวแปรย่อย และพิมพ์ออกทางหน้าจอ`;

  return (
    <div className="font-sans text-slate-900 pb-24 relative overflow-hidden">
      <AmbientBackdrop />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section 1: Set Theory */}
        <div className="mb-12">
          <SectionBlock 
            title="โครงสร้างข้อมูลแบบ Set (เซตข้อมูลไม่ซ้ำ)"
            description="เซต (Set) คือชุดข้อมูลที่สมาชิกภายในต้องไม่ซ้ำกันเลย และไม่มีการเรียงลำดับดัชนี (Unordered) เขียนไว้ในวงเล็บปีกกา นิยมใช้ในการล้างข้อมูลที่ซ้ำซ้อน และใช้ดำเนินการเปรียบเทียบทางคณิตศาสตร์ เช่น การรวมเซต การหาจุดร่วม หรือหาข้อแตกต่าง"
            accent="teal"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <ConceptCard 
                symbol="{ }"
                title="คุณสมบัติล้างข้อมูลซ้ำ"
                description="เมื่อสร้างเซตที่มีข้อมูลตัวเดิมซ้ำกันหลายครั้ง ระบบจะประมวลผลและบีบอัดให้เหลือเพียงตัวเดียวโดยอัตโนมัติ"
                code='numbers = {1, 2, 2, 3, 3, 3}'
                result='{1, 2, 3}'
                accent="teal"
              />
              <ConceptCard 
                symbol="A.union(B)"
                title="การยูเนียน (Union)"
                description="การรวมสมาชิกจากทั้ง Set A และ Set B เข้าด้วยกันทั้งหมดแบบไม่ซ้ำกัน เขียนย่อได้ด้วยเครื่องหมาย pipe (|)"
                code='{1, 2} | {2, 3}'
                result='{1, 2, 3}'
                accent="indigo"
              />
              <ConceptCard 
                symbol="A.intersection(B)"
                title="การอินเตอร์เซกชัน"
                description="ดึงเฉพาะสมาชิกที่อยู่ในทั้ง Set A และ Set B ร่วมกันเท่านั้น เขียนย่อด้วยเครื่องหมาย ampersand (&)"
                code='{1, 2} & {2, 3}'
                result='{2}'
                accent="violet"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 2: Slicing Theory */}
        <div className="mb-12">
          <SectionBlock 
            title="การตัดดึงช่วงข้อมูล (String & List Slicing)"
            description="สไลซิง (Slicing) คือเทคนิคการตัดแบ่งและสกัดข้อมูลบางส่วนออกมาจากลิสต์หรือข้อความ โดยอ้างอิงตำแหน่งด้วยดัชนีในรูปแบบ [start:stop:step] ซึ่งตำแหน่งตัวอักษรแรกจะเริ่มต้นด้วย index 0 เสมอ"
            accent="sky"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <ConceptCard 
                symbol="[start:stop]"
                title="การตัดช่วงเริ่มต้น-สิ้นสุด"
                description="ระบุจุดเริ่มและจุดจบโดยค่า stop จะถูกตัดออกก่อนถึงตำแหน่งดัชนีนั้น 1 ตัวอักษร"
                code='"Python"[0:2]'
                result='"Py"'
                accent="sky"
              />
              <ConceptCard 
                symbol="[:stop]"
                title="การตัดตั้งแต่ตัวแรกสุด"
                description="การละเว้นตัวเลขหน้าโคลอน หมายถึงต้องการตัดข้อมูลทั้งหมดเริ่มตั้งแต่ตำแหน่งแรกดัชนี 0"
                code='"Python"[:4]'
                result='"Pyth"'
                accent="indigo"
              />
              <ConceptCard 
                symbol="[start:]"
                title="การตัดไปจนถึงตัวท้ายสุด"
                description="การละเว้นตัวเลขหลังโคลอน หมายถึงต้องการดึงข้อมูลไปจนสุดปลายแถวตัวสุดท้ายของข้อความ"
                code='"Python"[2:]'
                result='"thon"'
                accent="violet"
              />
              <ConceptCard 
                symbol="[::step]"
                title="การกำหนดระยะก้าวเดิน"
                description="ระบุตัวที่สามเพื่อกระโดดข้ามทีละขั้น เช่น step 2 จะดึงข้ามทีละหนึ่งตัวอักษร"
                code='"Python"[::2]'
                result='"Pto"'
                accent="teal"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 3: Simulator */}
        <div className="mb-12">
          <SimulatorShell 
            title="ห้องปฏิบัติการทดลองวิเคราะห์ Set และ Slicing"
            icon={<Scissors className="w-6 h-6" />}
            accentBg="bg-teal-50"
            iconColor="text-teal-600"
          >
            {/* Tab Swapper */}
            <div className="flex gap-2 mb-6 border-b border-slate-200 pb-4">
              <button 
                onClick={() => setActiveTab('set')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'set' 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Venn Diagram (เซตเชิงภาพ)
              </button>
              <button 
                onClick={() => setActiveTab('slicing')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'slicing' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Slicing Visualizer (ตัดสตริง)
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Controls Column */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                
                {activeTab === 'set' ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h5 className="font-bold text-slate-800 text-[15px] mb-4">
                      เลือกการดำเนินงานทางเซต (Set Operation)
                    </h5>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <button 
                        onClick={() => handleSetOp('union')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer border ${
                          setActiveOp === 'union' 
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Union (A | B)
                      </button>
                      <button 
                        onClick={() => handleSetOp('intersect')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer border ${
                          setActiveOp === 'intersect' 
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Intersection (A & B)
                      </button>
                      <button 
                        onClick={() => handleSetOp('diff')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer border ${
                          setActiveOp === 'diff' 
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Difference (A - B)
                      </button>
                      <button 
                        onClick={() => handleSetOp('symdiff')}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer border ${
                          setActiveOp === 'symdiff' 
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Symm. Difference (A ^ B)
                      </button>
                    </div>

                    <div className="text-right">
                      <button 
                        onClick={handleReset}
                        className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ต
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h5 className="font-bold text-slate-800 text-[15px] mb-4">
                      ตั้งค่าพารามิเตอร์การ Slicing
                    </h5>

                    <div className="flex flex-col gap-4">
                      
                      {/* Slicing Controls */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Start (เริ่มต้น)</label>
                          <input 
                            type="number"
                            min={-sliceText.length}
                            max={sliceText.length}
                            value={sliceStart}
                            onChange={(e) => setSliceStart(parseInt(e.target.value) || 0)}
                            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Stop (จุดสิ้นสุด)</label>
                          <input 
                            type="number"
                            min={-sliceText.length}
                            max={sliceText.length}
                            value={sliceStop}
                            onChange={(e) => setSliceStop(parseInt(e.target.value) || 0)}
                            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Step (ระยะก้าว)</label>
                          <input 
                            type="number"
                            min={-5}
                            max={5}
                            value={sliceStep}
                            onChange={(e) => setSliceStep(parseInt(e.target.value) || 1)}
                            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={handleRunSlicing}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95 shadow-md cursor-pointer"
                      >
                        ดึงข้อมูลตัดสตริง (Run Slicing)
                      </button>

                      <div className="border-t border-slate-200 pt-3 text-right">
                        <button 
                          onClick={handleReset}
                          className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1.5 ml-auto cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ต
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* Visual Memory Layout */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h5 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider">
                    แบบจำลองเชิงทัศน์ (Visual Output)
                  </h5>

                  {activeTab === 'set' ? (
                    <div className="flex items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl relative">
                      {/* Pure SVG Venn Diagram */}
                      <svg width="280" height="180" className="mx-auto" id="venn-diagram-svg">
                        <defs>
                          <mask id="overlap">
                            <rect width="280" height="180" fill="white" />
                            <circle cx="100" cy="90" r="65" fill="black" />
                          </mask>
                        </defs>

                        {/* Set A Circle */}
                        <circle 
                          cx="100" 
                          cy="90" 
                          r="65" 
                          className={`transition-colors duration-300 stroke-2 ${
                            ['union', 'diff', 'symdiff'].includes(setActiveOp)
                              ? 'fill-teal-500/40 stroke-teal-500' 
                              : setActiveOp === 'intersect' 
                                ? 'fill-slate-100/30 stroke-slate-300' 
                                : 'fill-slate-50/50 stroke-slate-200'
                          }`}
                        />

                        {/* Set B Circle */}
                        <circle 
                          cx="180" 
                          cy="90" 
                          r="65" 
                          className={`transition-colors duration-300 stroke-2 ${
                            ['union', 'symdiff'].includes(setActiveOp)
                              ? 'fill-teal-500/40 stroke-teal-500' 
                              : setActiveOp === 'intersect' 
                                ? 'fill-slate-100/30 stroke-slate-300' 
                                : 'fill-slate-50/50 stroke-slate-200'
                          }`}
                        />

                        {/* Intersect Overlap Fill */}
                        {['union', 'intersect', 'symdiff'].includes(setActiveOp) && (
                          <circle 
                            cx="180" 
                            cy="90" 
                            r="65" 
                            className={`transition-all duration-300 ${
                              ['union', 'intersect'].includes(setActiveOp) 
                                ? 'fill-teal-500/60' 
                                : 'fill-white' /* symmetric diff is empty in middle */
                            }`}
                            mask="url(#overlap)"
                          />
                        )}

                        {/* Venn Text Indicators */}
                        {/* Left Set A unique values */}
                        <text x="65" y="95" className="fill-slate-700 font-mono font-bold text-sm">1, 2</text>
                        {/* Middle Intersection values */}
                        <text x="133" y="95" className="fill-slate-700 font-mono font-bold text-sm">3, 4</text>
                        {/* Right Set B unique values */}
                        <text x="200" y="95" className="fill-slate-700 font-mono font-bold text-sm">5, 6</text>

                        {/* Circle Label Tags */}
                        <text x="50" y="40" className="fill-slate-400 font-mono text-xs font-bold">Set A</text>
                        <text x="210" y="40" className="fill-slate-400 font-mono text-xs font-bold">Set B</text>
                      </svg>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 p-4 bg-white border border-slate-200 rounded-2xl">
                      <div className="flex justify-center gap-2">
                        {sliceText.split('').map((char, index) => {
                          const isActive = activeIndices.includes(index);
                          return (
                            <div 
                              key={index}
                              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                                isActive 
                                  ? 'bg-indigo-600 text-white scale-105 shadow-md' 
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <span className="font-mono font-bold text-xl">{char}</span>
                              <span className="text-[10px] font-mono mt-1 opacity-70">
                                {index}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="flex justify-center items-center gap-3 border-t border-slate-100 pt-3">
                        <span className="text-slate-400 text-xs font-mono">ผลลัพธ์การตัดคำ:</span>
                        <ArrowRight className="w-4 h-4 text-indigo-500" />
                        <span className="font-mono font-bold text-lg text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
                          {slicedString ? `"${slicedString}"` : '"" (ไม่มีข้อมูล)'}
                        </span>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Console Screen Panel */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <ConsoleScreen 
                  label={activeTab === 'set' ? '# python - set operations' : '# python - string slicing'}
                  accentLabel="active workspace"
                  codeBlock={
                    <div className="font-mono text-sm text-slate-300 leading-relaxed">
                      {activeTab === 'set' ? (
                        <>
                          <span className="text-emerald-400"># เซตข้อมูลนำเข้า</span><br />
                          A = <span className="text-amber-400">{`{1, 2, 3, 4}`}</span><br />
                          B = <span className="text-amber-400">{`{3, 4, 5, 6}`}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-emerald-400"># การสไลซ์ตัวแปรสตริง</span><br />
                          text = <span className="text-amber-400">"PYTHON"</span>
                        </>
                      )}
                    </div>
                  }
                  isLoading={isLoading}
                  output={activeTab === 'set' ? setLogs.join('\n') : slicingLogs.join('\n')}
                  multiline={true}
                  placeholder="กดเลือกการประมวลผลด้านซ้ายเพื่อทดลอง"
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
