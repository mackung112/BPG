import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Play, 
  RotateCcw, 
  ArrowRight, 
  FileCode, 
  FolderPlus,
  HelpCircle,
  Hash
} from 'lucide-react';
import { 
  SimulatorShell, 
  ConsoleScreen, 
  ConceptCard, 
  SectionBlock, 
  AmbientBackdrop 
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function py5_1_Lists() {
  const [fruits, setFruits] = useState(['Apple', 'Banana', 'Orange']);
  const [logs, setLogs] = useState(['# เริ่มต้นระบบ: fruits = ["Apple", "Banana", "Orange"]']);
  const [lastAction, setLastAction] = useState('initial');
  const [inputValue, setInputValue] = useState('Mango');
  const [insertIndex, setInsertIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const triggerRunAnimation = (actionFn, actionName, codeText) => {
    setIsLoading(true);
    setLastAction(actionName);
    setTimeout(() => {
      actionFn();
      setLogs(prev => [...prev, codeText]);
      setIsLoading(false);
    }, 600);
  };

  const handleAppend = () => {
    if (!inputValue.trim()) return;
    const val = inputValue.trim();
    triggerRunAnimation(
      () => setFruits(prev => [...prev, val]),
      'append',
      `>>> fruits.append("${val}")\n# ผลลัพธ์: เพิ่ม "${val}" ต่อท้ายลิสต์สำเร็จ`
    );
  };

  const handleRemove = (item) => {
    if (!fruits.includes(item)) {
      setLogs(prev => [...prev, `>>> fruits.remove("${item}")\n# Error: ไม่พบข้อมูล "${item}" ในลิสต์`]);
      return;
    }
    triggerRunAnimation(
      () => setFruits(prev => prev.filter((_, i) => i !== prev.indexOf(item))),
      'remove',
      `>>> fruits.remove("${item}")\n# ผลลัพธ์: ลบ "${item}" ออกจากลิสต์แล้ว`
    );
  };

  const handlePop = () => {
    if (fruits.length === 0) {
      setLogs(prev => [...prev, `>>> fruits.pop()\n# Error: ไม่สามารถ pop() จากลิสต์ที่ว่างเปล่าได้`]);
      return;
    }
    const poppedItem = fruits[fruits.length - 1];
    triggerRunAnimation(
      () => setFruits(prev => prev.slice(0, -1)),
      'pop',
      `>>> popped_val = fruits.pop()\n# ผลลัพธ์: ดึงค่าสุดท้าย "${poppedItem}" ออกจากลิสต์`
    );
  };

  const handleInsert = () => {
    if (!inputValue.trim()) return;
    const val = inputValue.trim();
    const idx = Math.max(0, Math.min(fruits.length, insertIndex));
    triggerRunAnimation(
      () => setFruits(prev => {
        const next = [...prev];
        next.splice(idx, 0, val);
        return next;
      }),
      'insert',
      `>>> fruits.insert(${idx}, "${val}")\n# ผลลัพธ์: แทรก "${val}" ที่ดัชนี ${idx} สำเร็จ`
    );
  };

  const handleSort = () => {
    if (fruits.length <= 1) return;
    triggerRunAnimation(
      () => setFruits(prev => [...prev].sort()),
      'sort',
      `>>> fruits.sort()\n# ผลลัพธ์: เรียงลำดับข้อมูลในลิสต์แบบเรียงตามตัวอักษรสำเร็จ`
    );
  };

  const handleReverse = () => {
    if (fruits.length <= 1) return;
    triggerRunAnimation(
      () => setFruits(prev => [...prev].reverse()),
      'reverse',
      `>>> fruits.reverse()\n# ผลลัพธ์: กลับด้านตำแหน่งข้อมูลในลิสต์ทั้งหมดสำเร็จ`
    );
  };

  const handleReset = () => {
    setFruits(['Apple', 'Banana', 'Orange']);
    setLogs(['# รีเซ็ตระบบ: fruits = ["Apple", "Banana", "Orange"]']);
    setLastAction('initial');
    setInputValue('Mango');
    setInsertIndex(1);
    setIsLoading(false);
  };

  const teacherTaskContent = `โจทย์ปฏิบัติการจัดการลิสต์ (List Operations):
1. ให้นักเรียนสร้างลิสต์ชื่อ scores เก็บตัวเลข [85, 90, 78]
2. ทดลองสั่งเพิ่มคะแนน 95 เข้าไปต่อท้ายลิสต์โดยใช้เมธอด append()
3. สั่งแทรกคะแนน 88 ไว้ในดัชนีที่ 1 (ตำแหน่งที่สอง) โดยใช้เมธอด insert()
4. สั่งลบคะแนน 78 ออกจากลิสต์โดยใช้เมธอด remove()
5. ตรวจสอบและพิมพ์ค่าความยาวของลิสต์สุดท้ายโดยใช้ฟังก์ชัน len(scores)`;

  const liveCodeDisplay = () => {
    if (lastAction === 'append') {
      return (
        <div className="font-mono text-sm text-slate-300 leading-relaxed">
          <span className="text-emerald-400"># เพิ่มข้อมูลต่อท้าย (Append)</span><br />
          fruits = <span className="text-amber-400">{JSON.stringify(fruits.filter((_, i) => i < fruits.length - 1))}</span><br />
          fruits.<span className="text-sky-400">append</span>(<span className="text-pink-400">"{inputValue}"</span>)<br />
          <span className="text-slate-500"># ลิสต์ปัจจุบันกลายเป็น: {JSON.stringify(fruits)}</span>
        </div>
      );
    }
    if (lastAction === 'insert') {
      return (
        <div className="font-mono text-sm text-slate-300 leading-relaxed">
          <span className="text-emerald-400"># แทรกข้อมูล ณ ตำแหน่งที่กำหนด (Insert)</span><br />
          fruits = <span className="text-amber-400">[]</span> <span className="text-slate-500"># ก่อนการทำงาน</span><br />
          fruits.<span className="text-sky-400">insert</span>({insertIndex}, <span className="text-pink-400">"{inputValue}"</span>)<br />
          <span className="text-slate-500"># ลิสต์ปัจจุบันกลายเป็น: {JSON.stringify(fruits)}</span>
        </div>
      );
    }
    if (lastAction === 'pop') {
      return (
        <div className="font-mono text-sm text-slate-300 leading-relaxed">
          <span className="text-emerald-400"># ดึงข้อมูลตัวสุดท้ายออก (Pop)</span><br />
          popped_val = fruits.<span className="text-sky-400">pop</span>()<br />
          <span className="text-slate-500"># ลิสต์ปัจจุบันกลายเป็น: {JSON.stringify(fruits)}</span>
        </div>
      );
    }
    return (
      <div className="font-mono text-sm text-slate-300 leading-relaxed">
        <span className="text-emerald-400"># ลิสต์ผลไม้เริ่มต้น</span><br />
        fruits = <span className="text-amber-400">{JSON.stringify(fruits)}</span><br />
        <span className="text-slate-500"># พร้อมสำหรับการควบคุมแล้ว ลองคลิกเมธอดควบคุมด้านซ้าย</span>
      </div>
    );
  };

  return (
    <div className="font-sans text-slate-900 pb-24 relative overflow-hidden">
      <AmbientBackdrop />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section 1: Intro to List */}
        <div className="mb-12">
          <SectionBlock 
            title="ความเข้าใจและการสร้างโครงสร้างข้อมูลแบบ List"
            description="ลิสต์ (List) คือโครงสร้างข้อมูลที่ใช้จัดเก็บชุดของข้อมูลเรียงต่อกันเป็นลำดับ สามารถระบุค่าซ้ำกันได้ และสามารถทำการแก้ไข เปลี่ยนแปลง เพิ่ม หรือลดจำนวนสมาชิกภายในลิสต์ได้ตลอดเวลา"
            accent="teal"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <ConceptCard 
                symbol="[ ]"
                title="การประกาศและสร้างลิสต์"
                description="สร้างขึ้นได้ง่ายๆ โดยการใช้วงเล็บสี่เหลี่ยม (Square Brackets) ครอบข้อมูลแต่ละตัวที่คั่นด้วยเครื่องหมายจุลภาค"
                code='scores = [85, 90, 78]'
                result='List of Integers'
                accent="teal"
              />
              <ConceptCard 
                symbol="index"
                title="การอ้างอิงผ่านดัชนีบวก"
                description="การเข้าถึงข้อมูลจากด้านซ้ายสุด เริ่มต้นนับตำแหน่งแรกสุดด้วยเลขศูนย์ (0) เสมอ และเพิ่มทีละ 1 ในตำแหน่งถัดไป"
                code='scores[0]'
                result='85'
                accent="indigo"
              />
              <ConceptCard 
                symbol="negative index"
                title="การอ้างอิงผ่านดัชนีลบ"
                description="การเข้าถึงข้อมูลย้อนกลับจากด้านขวาสุด โดยตำแหน่งท้ายสุดจะเริ่มต้นอ้างอิงด้วยเลขติดลบหนึ่ง (-1) เสมอ"
                code='scores[-1]'
                result='78'
                accent="violet"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 2: List Methods */}
        <div className="mb-12">
          <SectionBlock 
            title="ฟังก์ชันและเมธอดพื้นฐานสำหรับการจัดการข้อมูลลิสต์"
            description="ในภาษา Python มีเมธอดสร้างขึ้นมาโดยเฉพาะเพื่ออำนวยความสะดวกในการจัดสรร เพิ่ม ลบ หรือจัดเรียงข้อมูลในลิสต์แบบเบ็ดเสร็จ"
            accent="emerald"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <ConceptCard 
                symbol=".append(x)"
                title="การเพิ่มข้อมูลต่อท้าย"
                description="นำค่า x ไปเพิ่มต่อเข้าท้ายสุดของลิสต์ ส่งผลให้จำนวนสมาชิกเพิ่มขึ้น 1 ตัว"
                code='scores.append(95)'
                result='[85, 90, 78, 95]'
                accent="emerald"
              />
              <ConceptCard 
                symbol=".insert(i, x)"
                title="การแทรกข้อมูล ณ ดัชนี"
                description="แทรกค่า x เข้าไป ณ ดัชนี i สมาชิกเดิมจากดัชนีนั้นจะโดนเลื่อนขยับไปทางขวา"
                code='scores.insert(1, 88)'
                result='[85, 88, 90, 78]'
                accent="sky"
              />
              <ConceptCard 
                symbol=".remove(x)"
                title="การลบตามค่าข้อมูล"
                description="สืบค้นและลบข้อมูลที่มีค่าเท่ากับ x ตัวแรกสุดที่ตรวจพบออกจากลิสต์"
                code='scores.remove(90)'
                result='[85, 78]'
                accent="rose"
              />
              <ConceptCard 
                symbol="len(list)"
                title="การนับจำนวนสมาชิก"
                description="ฟังก์ชันส่วนกลางสำหรับนับและคืนจำนวนสมาชิกทั้งหมดที่อยู่ภายในลิสต์ขณะนั้น"
                code='len(scores)'
                result='3'
                accent="amber"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 3: Simulator */}
        <div className="mb-12">
          <SimulatorShell 
            title="ห้องปฏิบัติการทดลองจัดการลิสต์ (Interactive List Simulator)"
            icon={<FolderPlus className="w-6 h-6" />}
            accentBg="bg-teal-50"
            iconColor="text-teal-600"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Simulator Controller */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h5 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                    <Hash className="w-5 h-5 text-teal-600" /> ควบคุมและสั่งงานลิสต์
                  </h5>

                  <div className="flex flex-col gap-4">
                    
                    {/* Element Input Section */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">ข้อมูลที่จะใช้ในการทดสอบ (String)</label>
                      <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="กรอกข้อความ เช่น Mango, Grapes..."
                      />
                    </div>

                    {/* Action Grids */}
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button 
                        onClick={handleAppend}
                        disabled={isLoading || !inputValue.trim()}
                        className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all active:scale-95 shadow-md cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> append() ต่อท้าย
                      </button>

                      <button 
                        onClick={handlePop}
                        disabled={isLoading || fruits.length === 0}
                        className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all active:scale-95 shadow-md cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" /> pop() ค่าท้ายออก
                      </button>
                    </div>

                    {/* Insert Row */}
                    <div className="border-t border-slate-200 pt-4 flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">แทรก ณ ตำแหน่งดัชนี (Insert Index)</label>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          min={0}
                          max={fruits.length}
                          value={insertIndex}
                          onChange={(e) => setInsertIndex(parseInt(e.target.value) || 0)}
                          className="w-20 bg-white border border-slate-200 rounded-xl px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                        <button 
                          onClick={handleInsert}
                          disabled={isLoading || !inputValue.trim()}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all active:scale-95 shadow-md cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> แทรกที่ดัชนี insert()
                        </button>
                      </div>
                    </div>

                    {/* Helpers */}
                    <div className="border-t border-slate-200 pt-4 flex gap-2">
                      <button 
                        onClick={handleSort}
                        disabled={isLoading || fruits.length <= 1}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
                      >
                        เรียงลำดับ sort()
                      </button>
                      <button 
                        onClick={handleReverse}
                        disabled={isLoading || fruits.length <= 1}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
                      >
                        กลับด้าน reverse()
                      </button>
                      <button 
                        onClick={handleReset}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Visual Representation of Array */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h5 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider">
                    โครงสร้างหน่วยความจำจำลอง (Visualized Memory Array)
                  </h5>

                  <div className="flex flex-wrap items-center gap-3 min-h-[100px] border border-dashed border-slate-300 rounded-xl p-4 bg-white">
                    {fruits.length === 0 ? (
                      <span className="text-slate-400 italic text-sm m-auto">ลิสต์ว่างเปล่า (Empty List)</span>
                    ) : (
                      fruits.map((item, index) => (
                        <div 
                          key={`${item}-${index}`}
                          className={`flex flex-col items-center animate-fade-in`}
                        >
                          {/* Value Box */}
                          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-mono font-bold px-4 py-3 rounded-xl shadow-md border border-teal-400 flex items-center gap-2 relative group-hover:scale-105 transition-all">
                            <span>"{item}"</span>
                            <button 
                              onClick={() => handleRemove(item)}
                              disabled={isLoading}
                              className="text-teal-200 hover:text-rose-300 transition-colors ml-1 cursor-pointer"
                              title={`ลบ ${item}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {/* Index Indicator */}
                          <span className="text-[10px] text-slate-400 font-mono mt-1.5 font-bold">
                            index {index} ({-fruits.length + index})
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Console Screen Panel */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <ConsoleScreen 
                  label="# python - list operations"
                  accentLabel="active workspace"
                  codeBlock={liveCodeDisplay()}
                  isLoading={isLoading}
                  output={logs.join('\n')}
                  multiline={true}
                  placeholder="คลิกคำสั่งเมธอดเพื่อสั่งงานลิสต์"
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
