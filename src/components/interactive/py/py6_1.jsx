import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Cpu, 
  HelpCircle,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';
import { 
  SimulatorShell, 
  ConsoleScreen, 
  ConceptCard, 
  SectionBlock, 
  AmbientBackdrop 
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function py6_1_BuiltInFunctions() {
  const [dataInput, setDataInput] = useState('12, 45, 8, 27, 33');
  const [activeFunc, setActiveFunc] = useState('none'); // 'none' | 'len' | 'type' | 'max' | 'min' | 'sum' | 'sorted'
  const [logs, setLogs] = useState(['# เริ่มต้นระบบ: \ndata_list = [12, 45, 8, 27, 33]']);
  const [isLoading, setIsLoading] = useState(false);
  const [scanIndex, setScanIndex] = useState(-1);

  // Parse input to array safely
  const getParsedArray = () => {
    return dataInput
      .split(',')
      .map(item => parseInt(item.trim()))
      .filter(num => !isNaN(num));
  };

  const currentArray = getParsedArray();

  const runBuiltIn = (func) => {
    if (currentArray.length === 0) {
      setLogs(prev => [...prev, '>>> Error: ข้อมูลในลิสต์ว่างเปล่าหรือไม่ถูกต้อง']);
      return;
    }
    
    setIsLoading(true);
    setActiveFunc(func);
    setScanIndex(-1);

    // Scanner animation for max/min/sum
    if (['max', 'min', 'sum'].includes(func)) {
      let currentIdx = 0;
      const interval = setInterval(() => {
        setScanIndex(currentIdx);
        currentIdx++;
        if (currentIdx >= currentArray.length) {
          clearInterval(interval);
          finalizeOp(func);
        }
      }, 200);
    } else {
      setTimeout(() => {
        finalizeOp(func);
      }, 600);
    }
  };

  const finalizeOp = (func) => {
    let result = '';
    let cmd = '';

    switch (func) {
      case 'len':
        cmd = `len(data_list)`;
        result = currentArray.length;
        break;
      case 'type':
        cmd = `type(data_list)`;
        result = `<class 'list'>`;
        break;
      case 'max':
        cmd = `max(data_list)`;
        result = Math.max(...currentArray);
        break;
      case 'min':
        cmd = `min(data_list)`;
        result = Math.min(...currentArray);
        break;
      case 'sum':
        cmd = `sum(data_list)`;
        result = currentArray.reduce((a, b) => a + b, 0);
        break;
      case 'sorted':
        cmd = `sorted(data_list)`;
        result = JSON.stringify([...currentArray].sort((a, b) => a - b));
        break;
      default:
        break;
    }

    setLogs(prev => [
      ...prev,
      `>>> ${cmd}\n# ผลลัพธ์ที่ได้: ${result}`
    ]);
    setIsLoading(false);
  };

  const handleReset = () => {
    setDataInput('12, 45, 8, 27, 33');
    setActiveFunc('none');
    setLogs(['# เริ่มต้นระบบ: \ndata_list = [12, 45, 8, 27, 33]']);
    setScanIndex(-1);
    setIsLoading(false);
  };

  const teacherTaskContent = `โจทย์ปฏิบัติการฟังก์ชันสำเร็จรูป (Built-in Functions):
1. ให้นักเรียนสร้างลิสต์ชื่อ student_scores = [78, 92, 85, 64, 90, 88]
2. ใช้ฟังก์ชัน len() เพื่อหาจำนวนนักเรียนทั้งหมดที่เข้าสอบ และพิมพ์ผลลัพธ์
3. ใช้ฟังก์ชัน max() และ min() เพื่อดึงคะแนนที่สูงที่สุดและคะแนนที่ต่ำที่สุดในห้องออกมาแสดงผล
4. ใช้ฟังก์ชัน sum() ร่วมกับ len() เพื่อคำนวณหาค่าคะแนนเฉลี่ยของห้องเรียน (Average Score)`;

  return (
    <div className="font-sans text-slate-900 pb-24 relative overflow-hidden">
      <AmbientBackdrop />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section 1: Theory */}
        <div className="mb-12">
          <SectionBlock 
            title="ฟังก์ชันสำเร็จรูป (Built-in Functions) ในภาษา Python"
            description="ฟังก์ชันสำเร็จรูป คือฟังก์ชันที่ทางผู้พัฒนาภาษา Python ได้ทำการเขียนและติดตั้งระบบมาให้เราพร้อมเรียกใช้งานได้ทันทีโดยไม่ต้องผ่านกระบวนการนำเข้าโมดูลหรือประกาศนิยามตัวแปรฟังก์ชันใหม่ ช่วยอำนวยความสะดวกในการจัดสรร ประมวลผลข้อมูลขั้นพื้นฐานได้อย่างรวดเร็ว"
            accent="teal"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <ConceptCard 
                symbol="len(x)"
                title="หาจำนวนสมาชิก"
                description="คืนค่าจำนวนสมาชิกทั้งหมดที่อยู่ภายในวัตถุ เช่น จำนวนตัวอักษรของสตริง หรือจำนวนสมาชิกในลิสต์"
                code='len("Python")'
                result='6'
                accent="teal"
              />
              <ConceptCard 
                symbol="type(x)"
                title="ตรวจสอบชนิดข้อมูล"
                description="คืนค่าประเภทชนิดข้อมูลของตัวแปร x ทำให้เราสามารถสืบทราบโครงสร้างเพื่อความปลอดภัยในการคำนวณ"
                code='type(3.14)'
                result="<class 'float'>"
                accent="indigo"
              />
              <ConceptCard 
                symbol="max(x)"
                title="หาค่ามากที่สุด"
                description="ทำการเปรียบเทียบสมาชิกทั้งหมดภายในชุดข้อมูล และคืนค่าที่มีน้ำหนักหรือปริมาณมากที่สุดออกมา"
                code='max([15, 33, 8])'
                result='33'
                accent="emerald"
              />
              <ConceptCard 
                symbol="min(x)"
                title="หาค่าน้อยที่สุด"
                description="ทำการเปรียบเทียบสมาชิกทั้งหมดภายในชุดข้อมูล และคืนค่าที่มีน้ำหนักหรือปริมาณน้อยที่สุดออกมา"
                code='min([15, 33, 8])'
                result='8'
                accent="rose"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 2: Simulator */}
        <div className="mb-12">
          <SimulatorShell 
            title="ห้องทดลองฟังก์ชันสำเร็จรูป (Built-in Function Playground)"
            icon={<Cpu className="w-6 h-6" />}
            accentBg="bg-teal-50"
            iconColor="text-teal-600"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Controls Column */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h5 className="font-bold text-slate-800 text-[15px] mb-4">
                    กำหนดข้อมูลที่จะทดสอบ (คั่นแต่ละตัวด้วยจุลภาค)
                  </h5>

                  <div className="flex flex-col gap-4">
                    <input 
                      type="text"
                      value={dataInput}
                      onChange={(e) => setDataInput(e.target.value)}
                      placeholder="เช่น 12, 45, 8, 27, 33"
                      className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />

                    {/* Functions selection grid */}
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <button 
                        onClick={() => runBuiltIn('len')}
                        disabled={isLoading}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        len()
                      </button>
                      <button 
                        onClick={() => runBuiltIn('type')}
                        disabled={isLoading}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        type()
                      </button>
                      <button 
                        onClick={() => runBuiltIn('max')}
                        disabled={isLoading}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        max()
                      </button>
                      <button 
                        onClick={() => runBuiltIn('min')}
                        disabled={isLoading}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        min()
                      </button>
                      <button 
                        onClick={() => runBuiltIn('sum')}
                        disabled={isLoading}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        sum()
                      </button>
                      <button 
                        onClick={() => runBuiltIn('sorted')}
                        disabled={isLoading}
                        className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        sorted()
                      </button>
                    </div>

                    <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono">
                        * ปรับเปลี่ยนข้อมูลในช่องด้านบนแล้วคลิกปุ่มเพื่อประมวลผล
                      </span>
                      <button 
                        onClick={handleReset}
                        className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ต
                      </button>
                    </div>

                  </div>
                </div>

                {/* Array Memory Visualizer */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h5 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider">
                    ดัชนีและการเก็บข้อมูลในแถวลิสต์ (Memory Scanning)
                  </h5>

                  <div className="flex flex-wrap items-center gap-3 min-h-[90px] border border-dashed border-slate-300 rounded-xl p-4 bg-white">
                    {currentArray.length === 0 ? (
                      <span className="text-slate-400 italic text-sm m-auto">ลิสต์ว่างเปล่า (ข้อมูลไม่ถูกต้อง)</span>
                    ) : (
                      currentArray.map((num, idx) => {
                        const isScanning = scanIndex === idx;
                        const isMaxVal = activeFunc === 'max' && num === Math.max(...currentArray) && !isLoading;
                        const isMinVal = activeFunc === 'min' && num === Math.min(...currentArray) && !isLoading;

                        return (
                          <div key={idx} className="flex flex-col items-center">
                            <div 
                              className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shadow-sm transition-all duration-200 ${
                                isScanning 
                                  ? 'bg-amber-500 border-amber-600 text-white scale-110 shadow-lg' 
                                  : isMaxVal 
                                    ? 'bg-emerald-500 border-emerald-600 text-white scale-115 shadow-lg animate-pulse' 
                                    : isMinVal 
                                      ? 'bg-rose-500 border-rose-600 text-white scale-115 shadow-lg animate-pulse' 
                                      : 'bg-slate-100 border-slate-200 text-slate-700'
                              }`}
                            >
                              {num}
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono mt-1">
                              [{idx}]
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>

              {/* Console Screen Panel */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <ConsoleScreen 
                  label="# python - built-in function runner"
                  accentLabel="active workspace"
                  codeBlock={
                    <div className="font-mono text-sm text-slate-300 leading-relaxed">
                      <span className="text-emerald-400"># ประกาศลิสต์ตัวแปรต้นทาง</span><br />
                      data_list = <span className="text-amber-400">[{dataInput}]</span>
                    </div>
                  }
                  isLoading={isLoading}
                  output={logs.join('\n')}
                  multiline={true}
                  placeholder="คลิกคำสั่งฟังก์ชันด้านซ้ายเพื่อสแกนและประมวลผลข้อมูล"
                />
              </div>

            </div>
          </SimulatorShell>
        </div>

        {/* Section 3: Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม" taskText={teacherTaskContent} />

      </main>
    </div>
  );
}
