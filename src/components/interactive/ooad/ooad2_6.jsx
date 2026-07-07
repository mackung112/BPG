import React from 'react';
import { 
  SimulatorShell, 
  ContentCard, 
  SectionBlock, 
  AmbientBackdrop,
  QuizEngine
} from '../shared';
import { 
  ThumbsUp, 
  ThumbsDown,
  Target,
  ListOrdered,
  Lightbulb,
  CheckCircle2,
  XCircle,
  GraduationCap
} from 'lucide-react';

const SUMMARY_BLOBS = [
  { color: 'bg-amber-500', size: 'w-72 h-72', top: '-10%', left: '-10%', delay: '0s' },
  { color: 'bg-orange-500', size: 'w-80 h-80', bottom: '-20%', right: '-10%', delay: '2s' },
];

export default function OOAD2_6() {
  const quizData = [
    {
      id: 1,
      question: 'หากต้องการอธิบายให้ลูกค้าเข้าใจว่า "ในระบบนี้ ใครสามารถทำอะไรได้บ้าง" ควรใช้แผนภาพใดเหมาะสมที่สุด?',
      options: [
        { id: 'a', text: 'Activity Diagram' },
        { id: 'b', text: 'Sequence Diagram' },
        { id: 'c', text: 'Use Case Diagram' },
        { id: 'd', text: 'Class Diagram' }
      ],
      correctAnswerId: 'c',
      explanation: 'Use Case Diagram ถูกออกแบบมาเพื่อแสดงให้เห็นว่ามี Actor ใดบ้างในระบบ และแต่ละ Actor สามารถใช้งาน Use Case ใดได้บ้าง เหมาะมากสำหรับการคุยภาพรวมกับผู้ที่ไม่ใช่โปรแกรมเมอร์'
    },
    {
      id: 2,
      question: 'Developer ต้องการดูโครงสร้างตรรกะว่าการประมวลผลระบบลงทะเบียนมีเงื่อนไข (If-Else) และทำงานคู่ขนาน (Fork) อย่างไร ควรดูจากที่ไหน?',
      options: [
        { id: 'a', text: 'Activity Diagram' },
        { id: 'b', text: 'Sequence Diagram' },
        { id: 'c', text: 'Use Case Diagram' },
        { id: 'd', text: 'Class Diagram' }
      ],
      correctAnswerId: 'a',
      explanation: 'Activity Diagram เป็นแผนภาพที่ใช้อธิบาย Workflow หรือขั้นตอนการทำงานที่มีเงื่อนไขการตัดสินใจ (Decision) และการทำหลายอย่างพร้อมกัน (Fork/Join) คล้ายกับ Flowchart ขั้นสูง'
    },
    {
      id: 3,
      question: 'คุณกำลังจะเริ่มลงมือเขียนโค้ดภาษา Java แผนภาพใดที่จะบอกคุณได้ชัดเจนที่สุดว่าต้องสร้างคลาสชื่ออะไร และมีเมธอด (Method) อะไรบ้าง?',
      options: [
        { id: 'a', text: 'Activity Diagram' },
        { id: 'b', text: 'Sequence Diagram' },
        { id: 'c', text: 'Use Case Diagram' },
        { id: 'd', text: 'Class Diagram' }
      ],
      correctAnswerId: 'd',
      explanation: 'Class Diagram เป็น Structural Diagram ที่แสดงโครงสร้างคงที่ของระบบ ประกอบด้วย ชื่อคลาส, แอตทริบิวต์, เมธอด, และความสัมพันธ์ระหว่างคลาส สามารถนำไปแปลงเป็นโค้ดได้ตรงที่สุด'
    },
    {
      id: 4,
      question: 'เพื่อหลีกเลี่ยงปัญหาการทำงานที่สูญเปล่า ขั้นตอนใดมีความสำคัญเป็นอันดับแรกสุดในการสร้างซอฟต์แวร์?',
      options: [
        { id: 'a', text: 'Design (ออกแบบ Class/Database)' },
        { id: 'b', text: 'Requirement (ทำความเข้าใจความต้องการลูกค้า)' },
        { id: 'c', text: 'Strategy (วางกลยุทธ์การทำงาน)' },
        { id: 'd', text: 'Implementation (ลงมือเขียนโค้ด)' }
      ],
      correctAnswerId: 'b',
      explanation: 'การทำความเข้าใจ Requirement สำคัญที่สุด เพราะต่อให้วาง Strategy ดี หรือ Design และ Code ออกมาสมบูรณ์แบบแค่ไหน ถ้าระบบไม่ได้แก้ปัญหาให้ลูกค้าได้ตรงจุด (ทำผิดจากที่ลูกค้าอยากได้) ก็ถือว่างานนั้นไร้ความหมาย'
    },
    {
      id: 5,
      question: 'หากคุณต้องการอธิบายว่า หน้าเว็บ UI จะส่ง API ไปเรียก Server แล้ว Server ส่งต่อให้ Database จากนั้นส่งข้อมูลกลับมาอย่างไร ควรใช้แผนภาพใด?',
      options: [
        { id: 'a', text: 'Activity Diagram' },
        { id: 'b', text: 'Sequence Diagram' },
        { id: 'c', text: 'Use Case Diagram' },
        { id: 'd', text: 'Class Diagram' }
      ],
      correctAnswerId: 'b',
      explanation: 'Sequence Diagram ใช้อธิบายการสื่อสารและส่งข้อความ (Message) หากันระหว่าง Object หรือ Component ตามลำดับเวลา (Lifeline) ตั้งแต่ต้นจนจบ'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 w-full">
      <SimulatorShell title="2.6 สรุปการเลือกใช้ UML Diagram">
      <AmbientBackdrop blobs={SUMMARY_BLOBS} />
      
      <div className="space-y-8 relative z-10">
        <SectionBlock title="บทสรุปการใช้ UML">
          
          <ContentCard 
            title="ทำไมเราถึงต้องเสียเวลาวาด Diagram?"
            icon={<Lightbulb className="w-5 h-5 text-amber-400" />}
            color="amber"
          >
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              ในระบบที่ซับซ้อน แต่ละคน (ลูกค้า, โปรแกรมเมอร์, ฝ่ายการตลาด) จะมองระบบเดียวกันด้วยมุมมองที่แตกต่างกัน <strong>UML คือเครื่องมือปรับจูนคลื่นความถี่</strong> ให้ทุกคนมองเห็นภาพตรงกัน ป้องกันการสร้างระบบออกมาผิดจากที่ตกลงกันไว้
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pros */}
              <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl">
                <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5" /> ข้อดีของ UML
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>ทุกคนเข้าใจกันได้เร็วขึ้น เห็นเป็นภาพเดียวกัน</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>ป้องกันข้อผิดพลาดเชิงโครงสร้างก่อนเริ่มเขียนโค้ดจริง</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>เพิ่มประสิทธิภาพการออกแบบ มองเห็นช่องโหว่ล่วงหน้า</span>
                  </li>
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-rose-900/20 border border-rose-500/30 p-4 rounded-xl">
                <h4 className="text-rose-400 font-bold mb-3 flex items-center gap-2">
                  <ThumbsDown className="w-5 h-5" /> ข้อควรระวัง
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>แผนภาพเป็นแค่แนวทาง ไม่ได้รับประกันว่าโค้ดจริงจะเป็นแบบนั้น 100% (ถ้านักพัฒนาไม่ทำตาม)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>ถ้าออกแบบโดยไม่คิดถึง Scenarios จริง จะได้โครงสร้างที่ซับซ้อนเกินจำเป็น</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>เสียเวลาในการจัดแต่งแผนภาพให้สวยงาม (ควรเน้นสื่อสารให้เข้าใจก็พอ)</span>
                  </li>
                </ul>
              </div>
            </div>
          </ContentCard>

          <ContentCard 
            title="ลำดับความสำคัญในการพัฒนาซอฟต์แวร์"
            icon={<ListOrdered className="w-5 h-5 text-orange-400" />}
            color="orange"
          >
            <p className="text-slate-300 mb-6 text-sm leading-relaxed">
              แม้ว่าเราจะออกแบบ (Design) ได้ดีแค่ไหน แต่ถ้าเราเข้าใจความต้องการ (Requirement) ผิดพลาด ทุกอย่างที่ทำมาก็ไร้ความหมาย ลำดับหัวใจสำคัญในการสร้างซอฟต์แวร์มีดังนี้:
            </p>

            <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/80 border border-slate-700 p-6 rounded-xl overflow-x-auto relative">
              {/* Background connecting line */}
              <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-slate-700 -translate-y-1/2 hidden md:block z-0"></div>
              
              {[
                { step: 1, name: 'Requirement', desc: 'เข้าใจปัญหาที่แท้จริง', color: 'bg-rose-500' },
                { step: 2, name: 'Strategy', desc: 'วางแผนกลยุทธ์', color: 'bg-orange-500' },
                { step: 3, name: 'Analysis', desc: 'วิเคราะห์ระบบ', color: 'bg-amber-500' },
                { step: 4, name: 'Design', desc: 'ออกแบบด้วย UML', color: 'bg-blue-500' },
                { step: 5, name: 'Implementation', desc: 'ลงมือเขียนโค้ด', color: 'bg-emerald-500' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center z-10 w-full md:w-auto my-4 md:my-0">
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-lg mb-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] border-2 border-slate-900`}>
                    {item.step}
                  </div>
                  <div className="text-slate-200 font-bold mb-1 text-center bg-slate-900 px-2 rounded">{item.name}</div>
                  <div className="text-xs text-slate-400 text-center bg-slate-900 px-1 rounded">{item.desc}</div>
                </div>
              ))}
            </div>
          </ContentCard>

        </SectionBlock>

        <SectionBlock title="ทดสอบความเข้าใจ (Quiz)">
          <ContentCard 
            title="แบบทดสอบ: การเลือกใช้ UML Diagram" 
            icon={<Target className="w-5 h-5 text-rose-400" />}
            color="rose"
          >
            <p className="text-sm text-slate-300 mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-rose-400" />
              ทดสอบความแม่นยำในการเลือกใช้แผนภาพ UML ให้เหมาะสมกับสถานการณ์
            </p>

            <QuizEngine questions={quizData} />
            
          </ContentCard>
        </SectionBlock>
      </div>
    </SimulatorShell>
    </div>
  );
}
