import React, { useState } from 'react';
import { 
  Frown, 
  Smile, 
  HelpCircle, 
  GitCommit, 
  Layers, 
  Target,
  Circle,
  ArrowUpRight,
  ArrowDownRight,
  GitMerge,
  User,
  Link,
  Box,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { SimulatorShell, AmbientBackdrop } from '../shared';

export default function OOAD2_3() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Use Case พื้นฐาน (ยืนยันตัวตน)",
      desc: "เริ่มต้นวาดจากความสามารถหลักที่ระบบทำได้ โดยเขียนชื่อกิจกรรมในวงรี เช่น 'ยืนยันตัวตน'",
      dialog: "🧔 เริ่มต้นด้วยการวาดวงรี Use case แรกสำหรับการระบุตัวตนผู้ใช้",
      highlight: ["usecase1"]
    },
    {
      title: "2. Extend Relationship (ยืนยัน PIN)",
      desc: "วาด Use case เสริม 'ยืนยัน PIN' ที่ใช้ต่อยอดในบางกรณี ลากเส้นประหัวเปิดกำกับด้วย «extend» ชี้เฉียงขึ้นไปที่ Use case พื้นฐาน โดยความสัมพันธ์แบบ Extend นี้จะเกิดหรือไม่เกิดก็ได้ (มีสถานะเป็นทางเลือกเสริม)",
      dialog: "🧔 ลากเส้นประ <<extend>> ชี้ไปยังหัวข้อหลักเพื่อบอกว่าเป็นฟังก์ชันทางเลือกเสริม (เกิดหรือไม่เกิดก็ได้)",
      highlight: ["usecase1", "usecase2", "relationExtend"]
    },
    {
      title: "3. Include Relationship (ตั้งหัวข้อโหวต)",
      desc: "วาด Use case 'ตั้งหัวข้อโหวต' และชี้เส้นประกำกับ «include» ไปยัง 'ยืนยันตัวตน' เพราะความสัมพันธ์แบบ Include จะเกิดขึ้นแน่นอนเสมอ (การตั้งโหวตจำเป็นต้องเรียกใช้งานการยืนยันตัวตนเสมอ)",
      dialog: "🧔 ลากเส้นประ <<include>> ชี้ไปหาส่วนที่จำเป็นต้องเรียกใช้เสมอ (เกิดขึ้นแน่นอน)",
      highlight: ["usecase1", "usecase2", "relationExtend", "usecase3", "relationInclude"]
    },
    {
      title: "4. Generalization (หัวข้อกลุ่มลับ)",
      desc: "วาด Use case 'หัวข้อกลุ่มลับ' ซึ่งมีพฤติกรรมสืบทอดจาก 'ตั้งหัวข้อโหวต' ลากเส้นทึบหัวลูกศรสามเหลี่ยมปิด (Generalization) ชี้ขึ้นไปหาตัวแม่",
      dialog: "🧔 ใช้เส้นทึบหัวสามเหลี่ยมขาวชี้ไปหาตัวแม่เพื่อแสดงการสืบทอดสิทธิ์และฟังก์ชัน",
      highlight: ["usecase1", "usecase2", "relationExtend", "usecase3", "relationInclude", "usecase4", "relationGen"]
    },
    {
      title: "5. Actors (ผู้ใช้ & ตัวจับเวลา)",
      desc: "วาดผู้ใช้และสิ่งที่มีปฏิสัมพันธ์นอกระบบ ในที่นี้คือ 'ผู้ใช้' (รูปคน) และ 'ตัวจับเวลา ปิดโหวตอัตโนมัติ' (วาดเป็นวงรีนอกกรอบระบบด้านขวา) พร้อมเพิ่ม Use case 'ปิดการโหวต' และเส้นประ «include» ชี้ลงมาที่ยืนยันตัวตน",
      dialog: "🧔 วาดรูปคนฝั่งซ้ายเป็น 'ผู้ใช้' และวงรีฝั่งขวาเป็น 'ตัวจับเวลา ปิดโหวตอัตโนมัติ' พร้อมเพิ่ม Use case ปิดการโหวต",
      highlight: ["usecase1", "usecase2", "relationExtend", "usecase3", "relationInclude", "usecase4", "relationGen", "usecase5", "actor1", "actor2", "relationInclude2"]
    },
    {
      title: "6. Association (เส้นสิทธิ์เข้าถึง)",
      desc: "ลากเส้นตรงทึบ (Association) เชื่อมโยงสิทธิ์การทำงานระหว่างผู้ใช้กับ Use cases ทั้งหมดที่เขามีสิทธิ์ทำ และระบบปิดโหวตภายนอกกับฟังก์ชันปิดการโหวต",
      dialog: "🧔 ลากเส้นตรงทึบเชื่อมโยงสิทธิ์ระหว่าง Actor กับฟังก์ชันการทำงานของระบบ",
      highlight: ["usecase1", "usecase2", "relationExtend", "usecase3", "relationInclude", "usecase4", "relationGen", "usecase5", "actor1", "actor2", "relationInclude2", "associations"]
    },
    {
      title: "7. Boundary of system (ขอบเขตระบบ)",
      desc: "วาดกรอบสี่เหลี่ยม 'ระบบโหวต' ล้อมรอบ Use cases ทั้งหมดภายในระบบ เพื่อระบุขอบเขตของระบบงานที่เราพัฒนาและแยกส่วนของ Actor ภายนอก",
      dialog: "🧔 ขั้นสุดท้าย ครอบกรอบขอบเขตของระบบ (System Boundary) ล้อมรอบ Use cases ทั้งหมด เป็นอันเสร็จสิ้น!",
      highlight: ["usecase1", "usecase2", "relationExtend", "usecase3", "relationInclude", "usecase4", "relationGen", "usecase5", "actor1", "actor2", "relationInclude2", "associations", "boundary"]
    }
  ];

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isHighlighted = (id) => {
    return steps[activeStep].highlight.includes(id);
  };

  return (
    <div className="font-sans text-slate-900 pb-24 relative min-h-screen bg-slate-50/50">
      
      {/* Dynamic Spring Pop Animation Styles */}
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-spring-pop {
          animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Layer 1: Ambient Background Glow Layers */}
      <AmbientBackdrop />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-8 sm:pt-12 space-y-10 sm:space-y-12">
        
        {/* =========================================================================
            ปัญหา และ วิธีแก้ปัญหา
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ปัญหา */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                  <Frown className="w-5 h-5 text-rose-600" />
                </div>
                ปัญหา
              </h4>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                เวลาที่เริ่มอธิบายตัวโปรเจคว่ามันทำอะไรได้บ้าง? แต่ละส่วนสัมพันธ์กันยังไง? ใครมีสิทธิ์ทำอะไรแค่ไหน? ให้กับเพื่อนๆในทีมฟัง บ่อยครั้งเราก็จะพบว่าคนในทีมเริ่มหาวนอน ฟังไม่รู้เรื่อง จำต้นชนปลายไม่ถูก หรือเล่าให้ฟังแล้วก็ลืมนั่นเอง แล้วเราจะแก้ปัญหาพวกนี้ได้ยังไงเพื่อไม่ให้คนในทีมลืม หรือเอาไว้อธิบายคนใหม่ที่เข้ามาในทีมเข้าใจเรื่องพวกนี้ได้เร็วๆได้อย่างไร ?
              </p>
            </div>
          </div>

          {/* วิธีแก้ปัญหา */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10">
              <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Smile className="w-5 h-5 text-emerald-600" />
                </div>
                วิธีแก้ปัญหา
              </h4>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                ปัญหามันเกิดขึ้นเพราะคนฟังจินตนาการตามสิ่งที่อธิบายได้ยาก ดังนั้นเราก็จะวาดรูปประกอบการอธิบายแทน เพราะคนเราเห็นภาพแล้วเข้าใจได้ง่ายกว่าเห็นตัวหนังสือ ดังนั้นเราจะใช้แผนภาพที่เรียกว่า <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Use case Diagram</strong> มาช่วยแก้ปัญหาโลกแตกนี้กัน โดยเจ้า use case diagram นั้นจะแปลงเรื่องราวทั้งหมดที่เกิดขึ้นให้กลายเป็นรูปที่เข้าใจง่ายๆนั่นเอง
              </p>
            </div>
          </div>
          
        </div>

        {/* =========================================================================
            Use case Diagram ใช้ยังไง?
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-bl-full z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              Use case Diagram ใช้ยังไง?
            </h4>
            <p className="text-slate-600 text-[16px] leading-relaxed">
              โดยปรกติเวลาที่เราใช้ UML เราจะไม่เขียนโค้ดหรือเขียนเอกสารกัน แต่เราจะวาดรูปเล่นกันต่างหาก โดยในตัวอย่างรอบนี้เราจะใช้ตัวอย่างของ <strong>ระบบโหวต</strong> มาเขียนเป็น diagram แบบ step-by-step ดูละกัน ซึ่งผมจะให้ ดช.แมวน้ำ 🧔 เป็นคนไล่ลำดับการเขียน diagram ให้ดูละกันนะ
            </p>
          </div>
        </div>

        {/* =========================================================================
            ลองเขียน Use case Diagram กัน (TIMELINE LAYOUT)
        ========================================================================= */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <GitCommit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">ลองเขียน Use case Diagram กัน</h3>
              <p className="text-slate-500 text-sm mt-1">
                มาไล่ตามสิ่งที่ ดช.แมวน้ำ จะวาดเพื่ออธิบายระบบโหวตกันทีละขั้นตอน
              </p>
            </div>
          </div>

          <div className="relative border-l-[3px] border-indigo-100 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 py-4">
            
            {/* Step 1: Use case */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">1</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <Circle className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Use case</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ในการเขียน use case diagram นั้นเราจะต้องเริ่มวาดจากของที่ระบบทำได้ก่อน ซึ่งในระบบโหวตนั้น สิ่งแรกที่มันต้องทำได้ก็คือ <strong>ยืนยันตัวตน</strong> นั่นเอง ดังนั้นเราก็จะวาดรูป <strong>วงรี</strong> แล้วเขียนลงไปว่ามันคือการยืนยันตัวตนไปครับ
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LnIPOAqg11YMSBb1Wgf%252Fimage.png%3Fgeneration%3D1583529117258327%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=d1d89de7&sv=2" 
                    alt="Use case" 
                    className="w-full max-w-[140px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Extend */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">2</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Extend (ความสัมพันธ์แบบต่อยอด)</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ในการยืนยันตัวตนนั้นปรกติเราก็ให้ใส่แค่ชื่อผู้ใช้กับรหัสผ่านอย่างเดียวก็พอ แต่ก็มีบางกรณีเราจะต้องให้ทำการยืนยัน PIN ด้วย ซึ่งการยืนยัน PIN นี้เป็นการทำงานเสริมของการยืนยันตัวตนตามแบบเดิม
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LmyVUbNkFPFo-JkVWE-%252Fimage.png%3Fgeneration%3D1583529153197365%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=2c659f0e&sv=2" 
                    alt="Extend" 
                    className="w-full max-w-[200px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
                <div className="w-full bg-amber-50 border-l-[3px] border-amber-400 p-4 rounded-r-xl shadow-sm mt-2">
                  <p className="text-amber-850 text-[14px] leading-relaxed">
                    <strong>Extend</strong> คือการอธิบายว่า ความสามารถนี้ถูกเพิ่มเติมจากความสามารถอะไร ซึ่งหัวลูกศรจะชี้ไปยังความสามารถพื้นฐาน และส่วนหางคือความสามารถที่ต่อยอดขึ้นมา โดยปรกติความสามารถที่ extend ออกมาจะไม่ได้มีประโยชน์อะไรถ้าเอามาทำงานเดี่ยวๆ และความสัมพันธ์นี้จะ<strong>เกิดหรือไม่เกิดก็ได้ (มีสถานะเป็นทางเลือก)</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Include */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">3</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                      <ArrowDownRight className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Include (ความสัมพันธ์แบบพึ่งพา)</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      สิ่งถัดมาที่ระบบโหวตทำได้คือการตั้งหัวข้อในการโหวต ซึ่งคนที่จะตั้งหัวข้อในการโหวตได้จะต้องผ่านการยืนยันตัวตนเสียก่อน
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LtrqP5fas-2tWlinw2r%252Fimage.png%3Fgeneration%3D1583529147494135%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=f496a216&sv=2" 
                    alt="Include" 
                    className="w-full max-w-[200px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
                <div className="w-full bg-teal-50 border-l-[3px] border-teal-400 p-4 rounded-r-xl shadow-sm mt-2">
                  <p className="text-teal-800 text-[14px] leading-relaxed">
                    <strong>Include</strong> คือการบอกว่า ถ้าจะให้ความสามารถนั้นทำงานได้สมบูรณ์จะต้องใช้ความสามารถอื่นด้วย โดยเราจะใช้หัวลูกศรชี้ไปยังความสามารถที่เราต้องการเอาเข้าใช้ เช่น การตั้งโหวตจะต้องใช้การยืนยันตัวตนด้วยถึงจะตั้งโหวตได้ โดยความสัมพันธ์นี้จะ<strong>เกิดขึ้นแน่นอนเสมอ (ต้องเกิดแน่ๆ)</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Generalization */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">4</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-fuchsia-50 text-fuchsia-600">
                      <GitMerge className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Generalization (ความสัมพันธ์แบบสืบทอด)</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ในการตั้งหัวข้อโหวตนั้นจริงๆเราก็มีการตั้งหัวข้อโหวตสำหรับกลุ่มลับ ซึ่งทำงานเหมือนกับการตั้งหัวข้อโหวตธรรมดาเลยเพียงแค่ให้เฉพาะคนที่ถูกเชิญเท่านั้นถึงจะโหวตได้
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LqvuEeBHFGY78RnHPPh%252Fimage.png%3Fgeneration%3D1583529177728188%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=8c9032d2&sv=2" 
                    alt="Generalization" 
                    className="w-full max-w-[200px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
                <div className="w-full bg-fuchsia-50 border-l-[3px] border-fuchsia-400 p-4 rounded-r-xl shadow-sm mt-2">
                  <p className="text-fuchsia-800 text-[14px] leading-relaxed">
                    <strong>Generalization</strong> เป็นการต่อยอดความสามารถเดิมที่มีอยู่ให้ทำเรื่องใหม่ๆเข้าไปได้ ซึ่งจะต่างกับ extend เพราะมันแยกออกมาทำงานด้วยตัวมันเองแล้วเกิดประโยชน์ นั่นคือเราสามารถตั้งกลุ่มที่เป็นส่วนตัวได้นั่นเอง
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5: Actor */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">5</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
                      <User className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Actor (ผู้ใช้งานระบบ)</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      ถัดมาเราก็จะเริ่มวาดของที่จะเข้ามาใช้งานระบบของเราละ ซึ่งเจ้าตัวแรกก็คือ <strong>ผู้ใช้</strong> นั่นเอง
                    </p>
                  </div>
                </div>
                
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-M-VL2nv5GpY4gEJSu08%252Fimage.png%3Fgeneration%3D1583529166356119%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=389f5e05&sv=2" 
                    alt="Actor User" 
                    className="max-w-[100px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>

                <div className="w-full space-y-4 mt-2">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      และนอกจากผู้ใช้เองบางทีระบบก็จะทำการเรียกใช้งานกันเองอีกด้วย เช่น เมื่อถึงเวลาที่กำหนด ระบบก็จะทำการปิดโหวต ซึ่ง <strong>เจ้าตัวปิดโหวตอัตโนมัติ</strong> นี้เราก็ถือว่าเป็น Actor แบบนึงเหมือนกัน วาดๆๆ
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LtpPWOv1NU48CcP7dNf%252Fimage.png%3Fgeneration%3D1583529113268843%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=6a33a553&sv=2" 
                    alt="Actor System" 
                    className="max-w-[180px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
                
                <div className="w-full bg-violet-50 border-l-[3px] border-violet-400 p-4 rounded-r-xl shadow-sm mt-2">
                  <p className="text-violet-800 text-[14px] leading-relaxed">
                    <strong>Actor</strong> คือสิ่งที่จะเข้ามากระทำกับระบบของเรา ซึ่งถ้าเป็นคนเราวาดเป็นรูปคน แต่ถ้าสิ่งที่เข้ามากระทำกับระบบไม่ใช่คนเราก็จะวาดเป็นวงรีเหมือน Use case ปรกติเลย เช่น API ภายนอกเรียกเข้ามา, ระบบตั้งเวลาอัตโนมัติ บลาๆ
                  </p>
                </div>
              </div>
            </div>

            {/* Step 6: Association */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">6</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                      <Link className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Association (ความสัมพันธ์ระหว่าง Actor กับ Use case)</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      คราวนี้เราก็จะลากเส้นเชื่อมโยงเจ้า Actor ต่างๆว่ามันจะมาใช้งานความสามารถอะไรของระบบของเราบ้าง วาดๆๆ (ผมแอบเติม การปิดโหวต ลงไปนะเพราะระบบก็ควรจะต้องทำได้เช่นกัน)
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LtpXRL7RHn3yRkxozot%252Fimage.png%3Fgeneration%3D1583529157113774%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=d4c15132&sv=2" 
                    alt="Association" 
                    className="w-full max-w-[500px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
                <div className="w-full space-y-4 mt-2">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      จากรูปด้านบนเราจะเห็นแล้วว่า ผู้ใช้ สามารถเรียกใช้ของในระบบได้ 4 เรื่อง ส่วนเจ้าระบบจับเวลาจะสามารถสั่งปิดการโหวตได้อย่างเดียวเท่านั้น
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 7: Boundary of system */}
            <div className="relative">
              <div className="absolute -left-[3.1rem] md:-left-[4.1rem] top-8 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm z-10">7</div>
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start gap-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                      <Box className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xl text-slate-800">Boundary of system (ขอบเขตของระบบ)</h5>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🧔</span>
                    <p className="text-slate-600 text-[15px] leading-relaxed pt-1">
                      สุดท้ายเราก็จะทำการคลุมของที่อยู่ในระบบของเราทั้งหมดไว้ภายใน <strong>กรอบสี่เหลี่ยม</strong> เพื่อเป็นการบอกว่าอะไรบ้างในระบบที่เราต้องดูแลนั่นเอง ตามรูปเบย
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <img 
                    src="https://www.saladpuk.com/~gitbook/image?url=https%3A%2F%2F479516123-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-Lm0_idNbY6k1lwp6hm4%252F-M1lfqlFTvI3gmheTI_q%252F-LpD7i08PtSzBTa6UhTX%252Fimage.png%3Fgeneration%3D1583529172215900%26alt%3Dmedia&width=768&dpr=3&quality=100&sign=cba0b372&sv=2" 
                    alt="Boundary of system" 
                    className="w-full max-w-[600px] object-contain drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            UML INTERACTIVE SIMULATOR (CENTERED USE CASE SIMULATOR)
        ========================================================================= */}
        <div className="scroll-mt-12" id="simulator-section">
          <SimulatorShell title="เครื่องมือจำลองการวาด Use Case Diagram (ระบบโหวต)">
            <div className="flex flex-col gap-6">
              
              <div className="text-slate-300 text-sm">
                ทดลองคลิกสเต็ปด้านล่างเพื่อสังเกตลำดับและกระบวนการประกอบร่าง Use Case Diagram ทีละขั้นตอน
              </div>

              {/* 1. Simulator Canvas (CENTERED) */}
              <div className="w-full flex justify-center">
                <div className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden relative shadow-2xl">
                  
                  {/* Grid background effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-25"></div>
                  
                  <div className="relative p-6 z-10 w-full overflow-x-auto">
                    <svg viewBox="0 0 820 520" className="w-full min-w-[760px] h-auto drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
                      
                      {/* Define markers */}
                      <defs>
                        <marker id="arrow-open-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 8 5 L 0 9" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                        </marker>
                        <marker id="arrow-triangle-white" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                          <polygon points="0,1 10,5 0,9" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
                        </marker>
                      </defs>

                      {/* ==========================================
                          SYSTEM BOUNDARY (Step 7)
                          ========================================== */}
                      {isHighlighted("boundary") && (
                        <g className="transition-all duration-500">
                          <rect x="180" y="50" width="265" height="430" rx="10" stroke="#f43f5e" strokeWidth="2.5" fill="none" opacity="0.8" />
                          <text x="312.5" y="75" fill="#f87171" fontSize="14" fontWeight="bold" textAnchor="middle">ระบบโหวต</text>
                        </g>
                      )}

                      {/* ==========================================
                          USE CASES (ELLIPSES)
                          ========================================== */}
                      
                      {/* Use Case 1: ยืนยันตัวตน */}
                      {isHighlighted("usecase1") && (
                        <g className="transition-all duration-500">
                          <ellipse cx="320" cy="220" rx="60" ry="24" stroke="#8b5cf6" strokeWidth="2" fill="#1e293b" />
                          <text x="320" y="224" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">ยืนยันตัวตน</text>
                        </g>
                      )}

                      {/* Use Case 2: ยืนยัน PIN */}
                      {isHighlighted("usecase2") && (
                        <g className="transition-all duration-500">
                          <ellipse cx="560" cy="330" rx="60" ry="24" stroke="#ca8a04" strokeWidth="2" fill="#1e293b" />
                          <text x="560" y="334" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">ยืนยัน PIN</text>
                        </g>
                      )}

                      {/* Use Case 3: ตั้งหัวข้อโหวต */}
                      {isHighlighted("usecase3") && (
                        <g className="transition-all duration-500">
                          <ellipse cx="320" cy="330" rx="60" ry="24" stroke="#c084fc" strokeWidth="2" fill="#1e293b" />
                          <text x="320" y="334" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">ตั้งหัวข้อโหวต</text>
                        </g>
                      )}

                      {/* Use Case 4: หัวข้อกลุ่มลับ */}
                      {isHighlighted("usecase4") && (
                        <g className="transition-all duration-500">
                          <ellipse cx="320" cy="440" rx="65" ry="24" stroke="#ec4899" strokeWidth="2" fill="#1e293b" />
                          <text x="320" y="444" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">หัวข้อกลุ่มลับ</text>
                        </g>
                      )}

                      {/* Use Case 5: ปิดการโหวต */}
                      {isHighlighted("usecase5") && (
                        <g className="transition-all duration-500">
                          <ellipse cx="320" cy="110" rx="60" ry="24" stroke="#3b82f6" strokeWidth="2" fill="#1e293b" />
                          <text x="320" y="114" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">ปิดการโหวต</text>
                        </g>
                      )}

                      {/* ==========================================
                          RELATIONSHIPS (DASHED ARROWS)
                          ========================================== */}
                      
                      {/* Extend (Step 2) */}
                      {isHighlighted("relationExtend") && (
                        <g className="transition-all duration-500">
                          <path d="M 505,310 L 380,240" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow-open-gray)" />
                          <text x="442.5" y="260" fill="#ca8a04" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">«extend»</text>
                        </g>
                      )}

                      {/* Include (Step 3) */}
                      {isHighlighted("relationInclude") && (
                        <g className="transition-all duration-500">
                          <path d="M 320,306 L 320,247" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow-open-gray)" />
                          <text x="305" y="280" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="end">«include»</text>
                        </g>
                      )}

                      {/* Generalization (Step 4) */}
                      {isHighlighted("relationGen") && (
                        <g className="transition-all duration-500">
                          <path d="M 320,416 L 320,357" stroke="#ffffff" strokeWidth="1.5" markerEnd="url(#arrow-triangle-white)" />
                        </g>
                      )}

                      {/* Include 2: from ปิดการโหวต down to ยืนยันตัวตน (Step 5) */}
                      {isHighlighted("relationInclude2") && (
                        <g className="transition-all duration-500">
                          <path d="M 320,134 L 320,193" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow-open-gray)" />
                          <text x="335" y="167" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="start">«include»</text>
                        </g>
                      )}

                      {/* ==========================================
                          ACTORS (STICK FIGURES & ELLIPSES)
                          ========================================== */}
                      
                      {/* Actor 1: ผู้ใช้ */}
                      {isHighlighted("actor1") && (
                        <g className="transition-all duration-500">
                          {/* Stick figure */}
                          <circle cx="50" cy="240" r="10" stroke="#38bdf8" strokeWidth="2.5" fill="#1e293b" />
                          <line x1="50" y1="250" x2="50" y2="280" stroke="#38bdf8" strokeWidth="2.5" />
                          <line x1="30" y1="260" x2="70" y2="260" stroke="#38bdf8" strokeWidth="2.5" />
                          <line x1="50" y1="280" x2="35" y2="305" stroke="#38bdf8" strokeWidth="2.5" />
                          <line x1="50" y1="280" x2="65" y2="305" stroke="#38bdf8" strokeWidth="2.5" />
                          <text x="50" y="325" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">ผู้ใช้</text>
                        </g>
                      )}

                      {/* Actor 2: ตัวจับเวลา ปิดโหวตอัตโนมัติ */}
                      {isHighlighted("actor2") && (
                        <g className="transition-all duration-500">
                          {/* Ellipse actor outside the system */}
                          <ellipse cx="710" cy="110" rx="90" ry="30" stroke="#94a3b8" strokeWidth="2" fill="#1e293b" />
                          <text x="710" y="108" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">ตัวจับเวลา</text>
                          <text x="710" y="124" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">ปิดโหวตอัตโนมัติ</text>
                        </g>
                      )}

                      {/* ==========================================
                          ASSOCIATION LINES (Step 6)
                          ========================================== */}
                      {isHighlighted("associations") && (
                        <g className="transition-all duration-500">
                          {/* User -> ปิดการโหวต */}
                          <line x1="65" y1="230" x2="260" y2="110" stroke="#38bdf8" strokeWidth="1.5" />
                          {/* User -> ยืนยันตัวตน */}
                          <line x1="70" y1="240" x2="260" y2="220" stroke="#38bdf8" strokeWidth="1.5" />
                          {/* User -> ตั้งหัวข้อโหวต */}
                          <line x1="70" y1="260" x2="260" y2="330" stroke="#38bdf8" strokeWidth="1.5" />
                          {/* User -> หัวข้อกลุ่มลับ */}
                          <line x1="65" y1="270" x2="255" y2="440" stroke="#38bdf8" strokeWidth="1.5" />
                          {/* Timer -> ปิดการโหวต */}
                          <line x1="620" y1="110" x2="380" y2="110" stroke="#94a3b8" strokeWidth="1.5" />
                        </g>
                      )}

                    </svg>
                  </div>
                </div>
              </div>

              {/* 2. Step selector pills (BELOW THE SIM CANVAS) */}
              <div className="flex flex-col items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex flex-wrap justify-center gap-2">
                  {steps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`w-9 h-9 rounded-full font-bold text-sm transition-all duration-300 ${
                        activeStep === idx
                          ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)] scale-110'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Back / Next buttons */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={handlePrev}
                    disabled={activeStep === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    ย้อนกลับ
                  </button>
                  
                  <span className="text-slate-400 text-xs font-semibold min-w-[5rem] text-center">
                    ขั้นตอน {activeStep + 1} / {steps.length}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 border border-blue-500 text-white transition-colors hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ถัดไป
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                    title="เริ่มวาดใหม่"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>

              {/* 3. Details description card (DYNAMIC BOUNCE ANIMATION ON CHANGE) */}
              <div 
                key={activeStep} 
                className="bg-slate-900 border-l-[3px] border-blue-500 p-5 rounded-r-2xl shadow-lg relative overflow-hidden animate-spring-pop min-h-[9rem] flex flex-col justify-between"
              >
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-blue-400 text-base flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-900/50 text-[11px] text-blue-300 font-extrabold border border-blue-800">
                        {activeStep + 1}
                      </span>
                      {steps[activeStep].title}
                    </h5>
                  </div>
                  <p className="text-slate-300 text-[14px] leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                </div>
                
                {/* Character dialog at the bottom card */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-blue-300/90 font-medium">
                  <span className="text-base select-none">🧔</span>
                  <p className="italic pt-0.5">{steps[activeStep].dialog}</p>
                </div>
              </div>

            </div>
          </SimulatorShell>
        </div>

        {/* =========================================================================
            Use case Diagram มีแค่นี้เหรอ ?
        ========================================================================= */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-violet-100 text-violet-600">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Use case Diagram มีแค่นี้เหรอ ?</h3>
              <p className="text-slate-500 text-sm mt-1">
                จริงๆมันก็เพียงพอต่อการใช้งาน 80% แล้วล่ะ
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <p className="text-slate-600 text-[15px] leading-relaxed">
              ของที่ยกตัวอย่างให้ดูด้านบนทั้งหมดจริงๆมันก็เพียงพอต่อการใช้งาน 80% แล้วล่ะ ส่วนที่เหลือมันเป็นตัวเสริมให้เราสามารถลงรายละเอียดของแผนภาพได้ชัดขึ้นกว่าเดิมเฉยๆ แต่ดูเหมือนว่าตอนเขียนบทความนี้ผมจะเริ่มไม่ค่อยสบายแล้ว เลยขอเขียนไว้เท่านี้ก่อนละกันนะ 🤒
            </p>
          </div>
        </div>

        {/* =========================================================================
            บทสรุป
        ========================================================================= */}
        <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full z-0 pointer-events-none"></div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              บทสรุป
            </h4>
            <p className="text-slate-600 leading-relaxed text-[16px] mb-6">
              จากตัวอย่างทั้งหมดเราก็น่าจะพอเห็นภาพแล้วว่า <strong>อย่าเสียเวลาเขียนว่าระบบต้องทำอะไรได้บ้างเลย เขียนเป็นแผนภาพแบบนี้เข้าใจได้ง่ายกว่าเยอะเลย</strong> แถมมันแบ่งเป็นสัดเป็นส่วนให้คนทำงานเข้าใจได้ง่ายขึ้นจมเลยว่า อะไรบ้างที่เราต้องเขียน อะไรบ้างที่ไม่เกี่ยวกับระบบ เผลอๆเอาไปสร้างเป็น features แล้ว map เข้าทำงานในแต่ละ iteration ได้เลยนะเนี่ย
            </p>
            
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl mb-6">
              <h5 className="font-bold text-slate-800 mb-2">💡 Tips: Iteration</h5>
              <p className="text-slate-600 text-[14px] leading-relaxed">
                Iteration เป็นวิธีการวางแผนการทำงานเป็นช่วงๆ ซึ่งเมื่อแต่ละช่วงจบลงเราจะมีงานออกมาส่งมอบให้ลูกค้า แล้วเราก็จะวางแผนกันต่อว่าช่วงถัดไปเราจะส่งมอบ features อะไรให้กับลูกค้าบ้าง โดยทั้งหมดนี่เป็นหนึ่งในการทำงานในรูปแบบของ Agile
              </p>
            </div>

            <div className="bg-amber-50 border-l-[3px] border-amber-400 p-5 rounded-xl shadow-sm mb-6">
              <p className="text-amber-800 text-[15px] leading-relaxed font-bold mb-1">คำเตือน ⚠️</p>
              <p className="text-amber-700 text-[14px] leading-relaxed">
                เวลาที่เราเขียน Diagram ต่างๆ ห้ามเอาทุกกระบวนการทำงานมาเขียนยำกันไว้ในภายใน diagram เดียวกัน เพราะไม่อย่างนั้นมันจะกลายเป็นแผนภาพพาทัวร์นรกเลย เพราะเส้นมันจะยุ่งเหยิงไม่รู้จุดเริ่มต้นแต่ละเรื่องคืออะไร
              </p>
            </div>
            
            <p className="text-slate-600 leading-relaxed text-[15px]">
              สิ่งที่ควรทำคือ <strong className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">เขียน 1 กระบวนการทำงานต่อ 1 diagram เท่านั้น</strong> ดังนั้นถ้างานเราใหญ่เราก็จะมีหลาย diagram ก็จริงแต่มันจะช่วยทำให้เรา focus กับแต่ละกระบวนการทำงานได้ชัดเจนขึ้นนั่นเอง
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
