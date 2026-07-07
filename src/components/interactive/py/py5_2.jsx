import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  RotateCcw, 
  Lock, 
  Unlock,
  Key,
  FolderOpen,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { 
  SimulatorShell, 
  ConsoleScreen, 
  ConceptCard, 
  SectionBlock, 
  AmbientBackdrop 
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

export default function py5_2_TupleAndDictionary() {
  // Simulator states
  const [studentDict, setStudentDict] = useState({
    name: 'Somsak',
    score: 85,
    role: 'Student'
  });
  const [studentTuple] = useState(['Somsak', 85, 'Student']);
  const [logs, setLogs] = useState(['# เริ่มต้นระบบ: \nstudent_dict = {"name": "Somsak", "score": 85, "role": "Student"}\nstudent_tuple = ("Somsak", 85, "Student")']);
  const [activeTab, setActiveTab] = useState('dict'); // 'dict' | 'tuple'
  const [isLoading, setIsLoading] = useState(false);
  const [newKey, setNewKey] = useState('grade');
  const [newValue, setNewValue] = useState('A');
  const [errorFlash, setErrorFlash] = useState(false);

  const triggerRunAnimation = (actionFn, logText) => {
    setIsLoading(true);
    setTimeout(() => {
      actionFn();
      setLogs(prev => [...prev, logText]);
      setIsLoading(false);
    }, 600);
  };

  // Dict operations
  const handleUpdateDict = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    const key = newKey.trim();
    const val = newValue.trim();
    triggerRunAnimation(
      () => setStudentDict(prev => ({ ...prev, [key]: val })),
      `>>> student_dict["${key}"] = "${val}"\n# ผลลัพธ์: อัปเดตคีย์ "${key}" สำเร็จ\nstudent_dict = ${JSON.stringify({ ...studentDict, [key]: val })}`
    );
  };

  const handlePopDict = (key) => {
    if (!(key in studentDict)) {
      setLogs(prev => [...prev, `>>> student_dict.pop("${key}")\n# Error: ไม่พบคีย์ "${key}" ใน Dictionary`]);
      return;
    }
    const updated = { ...studentDict };
    delete updated[key];
    triggerRunAnimation(
      () => setStudentDict(updated),
      `>>> popped_val = student_dict.pop("${key}")\n# ผลลัพธ์: ลบคีย์ "${key}" ออกจาก Dictionary\nstudent_dict = ${JSON.stringify(updated)}`
    );
  };

  const handleGetKeys = () => {
    triggerRunAnimation(
      () => {},
      `>>> student_dict.keys()\n# คืนค่า: dict_keys(${JSON.stringify(Object.keys(studentDict))})`
    );
  };

  const handleGetValues = () => {
    triggerRunAnimation(
      () => {},
      `>>> student_dict.values()\n# คืนค่า: dict_values(${JSON.stringify(Object.values(studentDict))})`
    );
  };

  const handleGetItems = () => {
    const items = Object.entries(studentDict).map(([k, v]) => [k, v]);
    triggerRunAnimation(
      () => {},
      `>>> student_dict.items()\n# คืนค่า: dict_items(${JSON.stringify(items)})`
    );
  };

  // Tuple operations (Triggers Immutability Error)
  const handleTryUpdateTuple = () => {
    setIsLoading(true);
    setErrorFlash(true);
    setTimeout(() => {
      setLogs(prev => [
        ...prev, 
        `>>> student_tuple[1] = 95\n# TypeError: 'tuple' object does not support item assignment\n⚠️ ข้อห้ามสำคัญ: โครงสร้างข้อมูลแบบ Tuple ไม่สามารถแก้ไขค่าหลังจากสร้างเสร็จได้!`
      ]);
      setIsLoading(false);
      setTimeout(() => setErrorFlash(false), 1000);
    }, 600);
  };

  const handleReset = () => {
    setStudentDict({
      name: 'Somsak',
      score: 85,
      role: 'Student'
    });
    setLogs(['# รีเซ็ตระบบ: \nstudent_dict = {"name": "Somsak", "score": 85, "role": "Student"}\nstudent_tuple = ("Somsak", 85, "Student")']);
    setNewKey('grade');
    setNewValue('A');
    setIsLoading(false);
    setErrorFlash(false);
  };

  const teacherTaskContent = `โจทย์ปฏิบัติการ Tuple & Dictionary:
1. ให้นักเรียนสร้างทิวเพิลชื่อ server_config เก็บค่า ("192.168.1.1", 8080)
2. เขียนคอมเมนต์อธิบายผลลัพธ์เมื่อพยายามรันคำสั่ง server_config[1] = 9000
3. ให้นักเรียนสร้างดิกชันนารีชื่อ product เก็บข้อมูลสินค้า {"name": "Notebook", "price": 25000}
4. เพิ่มข้อมูลในดิกชันนารีโดยตั้งคีย์ "stock" ให้มีค่าเท่ากับ 15
5. สั่งลบคีย์ "price" ออกโดยใช้เมธอด pop() และพิมพ์ดิกชันนารีสุดท้ายออกหน้าจอ`;

  return (
    <div className="font-sans text-slate-900 pb-24 relative overflow-hidden">
      <AmbientBackdrop />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section 1: Tuple Theory */}
        <div className="mb-12">
          <SectionBlock 
            title="โครงสร้างข้อมูลแบบ Tuple (ข้อมูลแบบแก้ไขไม่ได้)"
            description="ทิวเพิล (Tuple) คือลำดับของข้อมูลที่เขียนไว้ภายในวงเล็บโค้ง (Parentheses) มีคุณสมบัติเด่นคือเป็น Immutable หรือไม่สามารถอัปเดต เพิ่ม หรือลบข้อมูลสมาชิกหลังจากสร้างเสร็จได้เลย เหมาะสำหรับการจัดเก็บข้อมูลคงที่เพื่อความปลอดภัย"
            accent="violet"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <ConceptCard 
                symbol="( )"
                title="การสร้างทิวเพิล"
                description="สร้างโดยใช้วงเล็บโค้งครอบสมาชิก คั่นด้วยจุลภาค นิยมใช้เก็บข้อมูลที่ต้องจับกลุ่มกัน เช่น พิกัด หรือการตั้งค่าระบบ"
                code='server = ("127.0.0.1", 80)'
                result='Tuple'
                accent="violet"
              />
              <ConceptCard 
                symbol="read-only"
                title="แก้ไขค่าไม่ได้ (Immutable)"
                description="หากพยายามกำหนดค่าใหม่ให้ตัวแปรในทิวเพิล ภาษา Python จะเกิดข้อผิดพลาด TypeError ขึ้นมาแจ้งเตือนทันที"
                code='server[1] = 443'
                result='TypeError'
                resultColor="rose"
                accent="rose"
              />
              <ConceptCard 
                symbol="unpacking"
                title="การกระจายค่าเก็บตัวแปร"
                description="สามารถดึงข้อมูลในทิวเพิลมากระจายลงในตัวแปรย่อยตามตำแหน่งได้เลยในบรรทัดเดียว เรียกว่า Tuple Unpacking"
                code='ip, port = server'
                result='ip="127.0.0.1", port=80'
                accent="indigo"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 2: Dictionary Theory */}
        <div className="mb-12">
          <SectionBlock 
            title="โครงสร้างข้อมูลแบบ Dictionary (ข้อมูลคู่กุญแจและค่า)"
            description="ดิกชันนารี (Dictionary) คือชุดข้อมูลที่จัดเก็บในลักษณะจับคู่ระหว่างคีย์ที่ใช้เป็นกุญแจหลักและข้อมูลที่เป็นค่าจริง (Key-Value Pairs) โดยเขียนในวงเล็บปีกกา (Curly Braces) ช่วยให้ค้นหาข้อมูลได้อย่างรวดเร็วผ่านตัวแปรคีย์ที่กำหนด"
            accent="amber"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <ConceptCard 
                symbol="{K: V}"
                title="การสร้าง Dictionary"
                description="เขียนในรูปคีย์และค่าคั่นด้วยเครื่องหมายโคลอน (:) โดยที่คีย์จะเป็นค่าซ้ำกันในดิกชันนารีเดียวกันไม่ได้"
                code='student = {"name": "Somsak", "score": 85}'
                result='Dictionary'
                accent="amber"
              />
              <ConceptCard 
                symbol='["key"]'
                title="การเข้าถึงข้อมูลตามคีย์"
                description="อ้างอิงและดึงข้อมูลออกมาโดยระบุคีย์นั้นๆ ในวงเล็บเหลี่ยมด้านท้ายชื่อตัวแปรดิกชันนารี"
                code='student["name"]'
                result='"Somsak"'
                accent="sky"
              />
              <ConceptCard 
                symbol='pop(key)'
                title="การลบข้อมูลตามคีย์"
                description="ใช้เมธอด pop(key) เพื่อทำการลบคีย์และค่าออกจากตัวแปรดิกชันนารี พร้อมดึงค่าที่ลบกลับมาใช้งาน"
                code='student.pop("score")'
                result='85 (เหลือ {"name": "Somsak"})'
                accent="rose"
              />
            </div>
          </SectionBlock>
        </div>

        {/* Section 3: Simulator */}
        <div className="mb-12">
          <SimulatorShell 
            title="ห้องปฏิบัติการเปรียบเทียบ Tuple vs Dictionary"
            icon={<FolderOpen className="w-6 h-6" />}
            accentBg="bg-violet-50"
            iconColor="text-violet-600"
          >
            {/* Tab Swapper */}
            <div className="flex gap-2 mb-6 border-b border-slate-200 pb-4">
              <button 
                onClick={() => setActiveTab('dict')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'dict' 
                    ? 'bg-amber-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                จัดการ Dictionary
              </button>
              <button 
                onClick={() => setActiveTab('tuple')}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  activeTab === 'tuple' 
                    ? 'bg-violet-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ทดลอง Tuple (Immutable)
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Controls Column */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                
                {activeTab === 'dict' ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h5 className="font-bold text-slate-800 text-[15px] mb-4 flex items-center gap-2">
                      <Key className="w-4 h-4 text-amber-500" /> คำสั่งจัดการ Dictionary
                    </h5>

                    <div className="flex flex-col gap-4">
                      
                      {/* Key-Value Inputs */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Key (คีย์)</label>
                          <input 
                            type="text"
                            value={newKey}
                            onChange={(e) => setNewKey(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Value (ค่าที่เก็บ)</label>
                          <input 
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      {/* Run Update */}
                      <button 
                        onClick={handleUpdateDict}
                        disabled={isLoading || !newKey.trim() || !newValue.trim()}
                        className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95 shadow-md cursor-pointer"
                      >
                        เพิ่ม/อัปเดตค่า (student_dict[key] = value)
                      </button>

                      {/* Quick Method Buttons */}
                      <div className="border-t border-slate-200 pt-4 grid grid-cols-3 gap-2">
                        <button 
                          onClick={handleGetKeys}
                          disabled={isLoading}
                          className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                        >
                          ดึงคีย์ keys()
                        </button>
                        <button 
                          onClick={handleGetValues}
                          disabled={isLoading}
                          className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                        >
                          ดึงค่า values()
                        </button>
                        <button 
                          onClick={handleGetItems}
                          disabled={isLoading}
                          className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                        >
                          ดึงคู่ items()
                        </button>
                      </div>

                      {/* Reset */}
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
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <h5 className="font-bold text-slate-800 text-[15px] mb-4 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-violet-500" /> ทดสอบความปลอดภัยของ Tuple
                    </h5>
                    
                    <p className="text-slate-600 text-xs leading-relaxed mb-6">
                      ทิวเพิลเป็น Immutable เมื่อเราสร้าง <code>student_tuple = ("Somsak", 85, "Student")</code> ขึ้นมาแล้ว ข้อมูลภายในจะฟิกซ์ทันที ลองคลิกปุ่มด้านล่างเพื่อทดลองแฮกหรือแก้ไขข้อมูลภายใน เพื่อดูการตอบสนองของคอมไพเลอร์ Python
                    </p>

                    <button 
                      onClick={handleTryUpdateTuple}
                      disabled={isLoading}
                      className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 rounded-xl text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" /> ลองสั่งเปลี่ยนค่า student_tuple[1] = 95
                    </button>

                    <div className="border-t border-slate-200 pt-4 text-right">
                      <button 
                        onClick={handleReset}
                        className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1.5 ml-auto cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตหน้าต่างแจ้งเตือน
                      </button>
                    </div>

                  </div>
                )}

                {/* Visual Output Component */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h5 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider">
                    แบบจำลองในหน่วยความจำ (Visual Memory Layout)
                  </h5>

                  {activeTab === 'dict' ? (
                    <div className="flex flex-col gap-3 min-h-[140px] border border-dashed border-slate-300 rounded-xl p-4 bg-white">
                      {Object.keys(studentDict).length === 0 ? (
                        <span className="text-slate-400 italic text-sm m-auto">Dictionary ว่างเปล่า</span>
                      ) : (
                        Object.entries(studentDict).map(([k, v]) => (
                          <div 
                            key={k} 
                            className="flex items-center justify-between bg-amber-50/50 border border-amber-100 rounded-xl px-4 py-3 animate-fade-in"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg">
                                key: "{k}"
                              </span>
                              <span className="text-slate-400 font-mono text-xs">→</span>
                              <span className="font-mono text-xs text-slate-800 font-semibold">
                                value: "{v}"
                              </span>
                            </div>
                            <button 
                              onClick={() => handlePopDict(k)}
                              disabled={isLoading}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                              title={`ลบคีย์ ${k}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className={`flex items-center justify-center gap-3 min-h-[140px] border border-dashed rounded-xl p-4 transition-all duration-300 bg-white ${
                      errorFlash ? 'border-rose-500 bg-rose-50/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'border-slate-300'
                    }`}>
                      {studentTuple.map((item, index) => (
                        <div 
                          key={index}
                          className={`bg-slate-900 border text-white p-4 rounded-xl flex flex-col items-center gap-2 min-w-[100px] transition-all relative ${
                            errorFlash ? 'border-rose-400 animate-shake' : 'border-slate-800'
                          }`}
                        >
                          <Lock className="w-4 h-4 text-violet-400 absolute top-2 right-2 opacity-50" />
                          <span className="font-mono font-bold text-sm mt-2">"{item}"</span>
                          <span className="text-[10px] text-slate-500 font-mono">index {index}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>

              {/* Console Screen Panel */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <ConsoleScreen 
                  label={activeTab === 'dict' ? '# python - dictionary workspace' : '# python - tuple constraints'}
                  accentLabel="active workspace"
                  codeBlock={
                    <div className="font-mono text-sm text-slate-300 leading-relaxed">
                      {activeTab === 'dict' ? (
                        <>
                          <span className="text-emerald-400"># จัดการฐานข้อมูลคู่คีย์และค่า</span><br />
                          student_dict = <span className="text-amber-400">{JSON.stringify(studentDict)}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-emerald-400"># การเก็บตัวแปรแบบ Tuple (คงที่)</span><br />
                          student_tuple = <span className="text-violet-400">("Somsak", 85, "Student")</span>
                        </>
                      )}
                    </div>
                  }
                  isLoading={isLoading}
                  output={logs.join('\n')}
                  multiline={true}
                  placeholder="คลิกทำงานด้านซ้ายเพื่อสืบค้นหรือพยายามแก้ไขข้อมูล"
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
