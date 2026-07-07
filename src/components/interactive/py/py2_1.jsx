import React, { useState } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import { 
  BrainCircuit, 
  ListChecks, 
  Lightbulb, 
  ArrowRight,
  Target,
  CheckCircle2,
  ChefHat,
  Timer,
  UtensilsCrossed,
  BookOpen,
  Map,
  Compass
} from 'lucide-react';

const AlgorithmSimulator = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: "วิเคราะห์ปัญหา", desc: "ปัญหา: หิวข้าวตอนดึก \nข้อมูลที่มี: ไข่ไก่ 2 ฟอง, น้ำมัน, กระทะ, เตาแก๊ส \nเป้าหมาย: ได้ไข่ดาวที่สุกพอดีสำหรับรับประทาน", icon: <BrainCircuit className="w-6 h-6" /> },
    { title: "ออกแบบอัลกอริทึม", desc: "1. ตั้งกระทะบนเตา\n2. เปิดไฟระดับปานกลาง\n3. เทน้ำมันลงไปเล็กน้อย\n4. รอจนน้ำมันร้อน\n5. ตอกไข่ใส่กระทะ\n6. รอ 2 นาที\n7. ตักไข่ดาวขึ้นใส่จาน", icon: <ListChecks className="w-6 h-6" /> },
    { title: "ลงมือทำตามขั้นตอน", desc: "เริ่มดำเนินการทำตามแผนที่เขียนไว้ทีละข้ออย่างเคร่งครัด โดยไม่ข้ามขั้นตอน หรือสลับลำดับการทำงาน (เช่น ไม่ตอกไข่ก่อนตั้งกระทะ)", icon: <ChefHat className="w-6 h-6" /> },
    { title: "ตรวจสอบผลลัพธ์", desc: "ประเมินผล: ไข่ดาวสุกตามที่ต้องการหรือไม่? ถ้าไหม้ แปลว่าในอัลกอริทึมขั้นตอนที่ 6 (รอ 2 นาที) อาจจะนานเกินไป ต้องกลับไปปรับปรุงแก้ไขอัลกอริทึมใหม่", icon: <CheckCircle2 className="w-6 h-6" /> }
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl mt-12 mb-12 border border-slate-800">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <UtensilsCrossed className="w-6 h-6 text-indigo-400" />
          Algorithm Visualizer: อัลกอริทึมการทอดไข่ดาว
        </h3>
        <p className="text-slate-400">อัลกอริทึมที่ดีต้องสามารถนำไปปฏิบัติตามได้จริงและได้ผลลัพธ์ที่ถูกต้องเสมอ</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        {steps.map((s, idx) => (
          <React.Fragment key={idx}>
            <div 
              className={`flex flex-col items-center justify-center w-36 h-36 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                idx === step 
                  ? 'bg-indigo-600 border-indigo-400 scale-110 shadow-[0_0_20px_rgba(79,70,229,0.5)]' 
                  : idx < step 
                    ? 'bg-slate-800 border-indigo-500 text-indigo-300' 
                    : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              onClick={() => setStep(idx)}
            >
              <div className="mb-3">{s.icon}</div>
              <div className="text-sm font-bold text-center px-2">{s.title}</div>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden md:block">
                <ArrowRight className={`w-6 h-6 ${idx < step ? 'text-indigo-500' : 'text-slate-700'}`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 min-h-[160px] flex items-center justify-center">
        <div className="text-left w-full max-w-2xl">
          <div className="text-indigo-400 font-bold mb-3 text-xl border-b border-slate-700 pb-2">คำอธิบายขั้นตอน: {steps[step].title}</div>
          <div className="text-white text-lg leading-loose whitespace-pre-line">{steps[step].desc}</div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button 
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-6 py-2 rounded-lg bg-slate-700 text-white font-semibold disabled:opacity-50 hover:bg-slate-600 transition-colors"
        >
          ย้อนกลับ
        </button>
        <button 
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:opacity-50 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/30"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

const pyUnit2_1_AlgorithmConcept = () => {
  const teacherTaskContent = `
    ให้นักเรียนทำกิจกรรม "Robot Guide":
    1. จับคู่กัน โดยให้คนหนึ่งหลับตา (เป็นหุ่นยนต์) และอีกคนเป็นโปรแกรมเมอร์ (ผู้สั่งการ)
    2. โปรแกรมเมอร์ต้องเขียน "อัลกอริทึม" เป็นคำสั่งทีละบรรทัด (เช่น เดินหน้า 2 ก้าว, หันขวา, หยิบดินสอ)
    3. ให้หุ่นยนต์ทำตามคำสั่งอย่างเคร่งครัด (ห้ามคิดเอง) เพื่อเดินไปหยิบของที่กำหนด
    4. เมื่อจบกิจกรรม ให้อภิปรายว่าพบปัญหาใดบ้าง? คำสั่งคลุมเครือเกินไปหรือไม่?
  `;

  return (
    <div className="text-zinc-900 pb-20">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        
        {/* Section 2.1.1: Meaning of Algorithm */}
        <div className="mb-16">
          <div className="bg-white rounded-[2rem] p-10 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-bl-full -z-0"></div>
             <div className="relative z-10">
               <h3 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                 <BrainCircuit className="w-8 h-8 text-indigo-500" />
                 ความหมายของอัลกอริทึม (Algorithm)
               </h3>
               
               <p className="text-slate-600 text-lg leading-loose mb-6">
                 คำว่า <strong>"อัลกอริทึม" (Algorithm)</strong> มีรากศัพท์มาจากชื่อของนักคณิตศาสตร์ชาวเปอร์เซียชื่อ อัล-คอวาริซมี (Al-Khwarizmi) ในทางวิทยาการคอมพิวเตอร์ อัลกอริทึมหมายถึง <strong>"กระบวนการหรือลำดับขั้นตอนการแก้ปัญหาที่ชัดเจน มีจุดเริ่มต้นและจุดสิ้นสุด สามารถปฏิบัติตามเพื่อนำไปสู่ผลลัพธ์ที่ต้องการได้"</strong>
               </p>
               
               <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-8">
                 <h4 className="text-xl font-bold text-indigo-800 mb-3 flex items-center gap-2">
                   <Lightbulb className="w-6 h-6 text-indigo-600" />
                   ทำไมคอมพิวเตอร์ต้องพึ่งพาอัลกอริทึม?
                 </h4>
                 <p className="text-indigo-900 leading-loose">
                   คอมพิวเตอร์เป็นเพียงเครื่องจักรที่ทำงานได้รวดเร็วมาก แต่ <strong>"คิดเองไม่ได้"</strong> มันไม่เข้าใจคำสั่งที่คลุมเครือ เช่น "ทำไข่ดาวให้หน่อย" คอมพิวเตอร์ต้องการคำสั่งที่ละเอียดถี่ถ้วน เป็นขั้นเป็นตอน (Step-by-step) ดังนั้น โปรแกรมเมอร์จึงมีหน้าที่คิดค้นอัลกอริทึม และแปลอัลกอริทึมนั้นเป็นภาษาคอมพิวเตอร์ (โค้ด) เพื่อสั่งให้คอมพิวเตอร์ทำงาน
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors">
                   <div className="flex items-center gap-3 mb-3">
                     <Map className="w-6 h-6 text-blue-500" />
                     <div className="font-bold text-slate-800 text-lg">เปรียบเทียบกับ GPS Navigation</div>
                   </div>
                   <p className="text-slate-600 leading-loose">
                     เวลาเราใช้ Google Maps ระบบจะคำนวณอัลกอริทึมเพื่อหาเส้นทางที่สั้นที่สุด หรือเลี่ยงรถติดที่สุด ก่อนจะแสดงขั้นตอนการเดินทางให้เราขับตาม
                   </p>
                 </div>
                 <div className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-colors">
                   <div className="flex items-center gap-3 mb-3">
                     <BookOpen className="w-6 h-6 text-fuchsia-500" />
                     <div className="font-bold text-slate-800 text-lg">เปรียบเทียบกับคู่มือการประกอบตู้</div>
                   </div>
                   <p className="text-slate-600 leading-loose">
                     สมุดคู่มือจาก IKEA คืออัลกอริทึมที่บอกเราว่าต้องใช้น็อตตัวไหน ประกอบแผ่นไม้ชิ้นใดก่อนหลัง เพื่อให้ได้ตู้ที่สมบูรณ์และแข็งแรง
                   </p>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Section 2.1.2: Problem Solving Steps */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-blue-500">
            ขั้นตอนและกระบวนการแก้ปัญหา
          </h3>
          <p className="text-slate-600 text-lg leading-loose mb-8">
            ในการเขียนโปรแกรม เราไม่ควรเริ่มต้นจากการพิมพ์โค้ดทันที แต่ควรทำตามกระบวนการแก้ปัญหา 4 ขั้นตอน (อ้างอิงแนวคิดของโพลยา - Polya's Problem Solving Process) เพื่อลดข้อผิดพลาด
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border-t-4 border-red-400 shadow-lg hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 bg-red-100 text-red-600 font-bold text-xl rounded-full flex items-center justify-center mb-4">1</div>
              <h4 className="font-bold text-xl text-slate-800 mb-3">วิเคราะห์ปัญหา<br/>(Analyze)</h4>
              <p className="text-slate-600 leading-loose text-sm">
                ต้องทำความเข้าใจว่า "โจทย์ต้องการอะไร" (Output) ข้อมูลที่มีอยู่คืออะไร (Input) และมีเงื่อนไขหรือข้อจำกัดอะไรบ้าง
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border-t-4 border-amber-400 shadow-lg hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 font-bold text-xl rounded-full flex items-center justify-center mb-4">2</div>
              <h4 className="font-bold text-xl text-slate-800 mb-3">วางแผนแก้ปัญหา<br/>(Plan/Design)</h4>
              <p className="text-slate-600 leading-loose text-sm">
                คิดหาวิธีการแก้ปัญหา โดยเขียนออกมาเป็นลำดับขั้นตอน (Algorithm) สามารถใช้รูปแบบ รหัสเทียม (Pseudocode) หรือ ผังงาน (Flowchart)
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border-t-4 border-emerald-400 shadow-lg hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 font-bold text-xl rounded-full flex items-center justify-center mb-4">3</div>
              <h4 className="font-bold text-xl text-slate-800 mb-3">ดำเนินการแก้ปัญหา<br/>(Implement)</h4>
              <p className="text-slate-600 leading-loose text-sm">
                นำแผนที่วางไว้มาลงมือปฏิบัติจริง ในทางคอมพิวเตอร์คือการแปลงอัลกอริทึมให้เป็น "ซอร์สโค้ด" (Source Code) ด้วยภาษาโปรแกรม
              </p>
            </div>
            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border-t-4 border-blue-400 shadow-lg hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 font-bold text-xl rounded-full flex items-center justify-center mb-4">4</div>
              <h4 className="font-bold text-xl text-slate-800 mb-3">ตรวจสอบและปรับปรุง<br/>(Evaluate)</h4>
              <p className="text-slate-600 leading-loose text-sm">
                ทดสอบการทำงานของโปรแกรมว่าผลลัพธ์ตรงตามความต้องการหรือไม่ หากพบข้อบกพร่อง (Bug) ต้องกลับไปแก้ไขให้ถูกต้อง
              </p>
            </div>
          </div>
        </div>

        {/* Simulator */}
        <AlgorithmSimulator />

        {/* Section 2.1.3: Design Principles */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 border border-slate-800 shadow-xl relative overflow-hidden mb-16 text-white">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-indigo-400">
              <Compass className="w-8 h-8" />
              หลักการออกแบบอัลกอริทึมที่ดี (Characteristics of a Good Algorithm)
            </h3>
            
            <p className="text-slate-300 text-lg leading-loose mb-10">
              ไม่ใช่ทุกการอธิบายขั้นตอนจะถือว่าเป็นอัลกอริทึมที่ดี อัลกอริทึมที่มีประสิทธิภาพและสามารถนำไปเขียนโปรแกรมได้จริง จะต้องมีคุณสมบัติที่สำคัญ 5 ประการ ดังนี้:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-emerald-400 mb-2">1. ความชัดเจน (Definiteness)</h4>
                <p className="text-slate-300 leading-loose">
                  แต่ละคำสั่งในขั้นตอนต้องระบุชัดเจน ไม่คลุมเครือ ไม่ตีความได้หลายแบบ คอมพิวเตอร์ต้องรู้แน่ชัดว่าต้องทำสิ่งใด
                </p>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-rose-400 mb-2">2. มีจุดสิ้นสุด (Finiteness)</h4>
                <p className="text-slate-300 leading-loose">
                  อัลกอริทึมต้องมีการสิ้นสุดการทำงานเสมอ ภายในระยะเวลาและขั้นตอนที่จำกัด หากโปรแกรมทำงานวนซ้ำไม่รู้จบ (Infinity Loop) จะถือว่าเป็นอัลกอริทึมที่ผิดพลาด
                </p>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-sky-400 mb-2">3. มีประสิทธิผล (Effectiveness)</h4>
                <p className="text-slate-300 leading-loose">
                  เมื่อทำตามลำดับขั้นตอนจนจบ จะต้องสามารถแก้ไขปัญหาหรือให้ผลลัพธ์ที่ถูกต้องตรงตามจุดประสงค์ที่ตั้งไว้ตั้งแต่แรก
                </p>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-amber-400 mb-2">4. รับข้อมูลเข้าและออก (Input/Output)</h4>
                <p className="text-slate-300 leading-loose">
                  อัลกอริทึมอาจมีข้อมูลนำเข้า (Input) เพื่อใช้ประมวลผลหรือไม่ก็ได้ แต่ที่สำคัญที่สุดคือ <strong>ต้องมีผลลัพธ์ส่งออก (Output) เสมออย่างน้อย 1 อย่าง</strong> เพื่อให้ทราบผลของการทำงาน
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Task */}
        <TeacherTask title="ใบงานกิจกรรม (ทบทวนความรู้)" taskText={teacherTaskContent} />

      </main>
    </div>
  );
};

export default pyUnit2_1_AlgorithmConcept;
