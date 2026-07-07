import React from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  ConceptCard,
  SectionBlock,
  AmbientBackdrop,
  SQL1_BLOBS
} from '../shared';
import {
  Database,
  Layers,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Table,
  Workflow,
  Coins,
  ShieldCheck,
  Users,
  MessageSquare,
  BookmarkCheck,
  Monitor,
  Code
} from 'lucide-react';

export default function SQL1_3() {
  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={SQL1_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* Intro Section */}
        <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
          การเลือกใช้ระบบจัดการฐานข้อมูล (Database Management System หรือ DBMS) ที่เหมาะสมถือเป็นทางแยกและจุดตัดสินใจที่สำคัญอย่างยิ่ง
          เนื่องจากการบริหารจัดการข้อมูลของแต่ละระบบมีความต้องการที่แตกต่างกันออกไป ซอฟต์แวร์ DBMS แต่ละตัวได้รับการวิศวกรรมขึ้นมาเพื่อรับใช้จุดเด่น
          และยอมแลกกับข้อจำกัดที่ต่างกัน ดังนั้น การพิจารณาเลือก DBMS จึงต้องประเมินผ่านปัจจัยเชิงลึกทั้ง 7 มิติต่อไปนี้
        </p>

        {/* ─── Section 1: DBMS Selection Factors ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              มิติการวิเคราะห์ / ปัจจัยเลือกซอฟต์แวร์จัดการ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ปัจจัยสำคัญ 7 ประการในการวิเคราะห์เลือกใช้ DBMS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Factor 1 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Table className="w-5 h-5" />
                </div>
                <h4 className="text-[15px] font-bold text-slate-800">ลักษณะและโครงสร้างของข้อมูล</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                วิเคราะห์โครงสร้างข้อมูลปลายทาง หากข้อมูลมีความสัมพันธ์เป็นตารางชัดเจนและมีกฎระเบียบตายตัว ควรใช้กลุ่ม Relational (เช่น MySQL, SQL Server) 
                แต่หากไร้โครงสร้างและต้องการขยายฟิลด์ด่วน ควรหันหา NoSQL
              </p>
            </div>

            {/* Factor 2 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Workflow className="w-5 h-5" />
                </div>
                <h4 className="text-[15px] font-bold text-slate-800">ปริมาณข้อมูลและการขยายตัว</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ประเมินความเร็วในการคิวรีและขนาดทราฟฟิกธุรกรรม (Transactions) ที่จะขยายตัวขึ้นในอนาคต 
                ว่ารองรับการอัปเกรดความแรงในเครื่องเดิม (Vertical) หรือกระจายเชื่อมต่อโหนดใหม่ (Horizontal Scaling) ได้ดีเพียงใด
              </p>
            </div>

            {/* Factor 3 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="text-[15px] font-bold text-slate-800">งบประมาณและต้นทุนรวม (TCO)</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                คำนวณต้นทุนสะสมทั้งหมดซึ่งไม่ได้มีเพียงค่าลิขสิทธิ์ซอฟต์แวร์เท่านั้น แต่รวมถึงค่าพื้นที่เซิร์ฟเวอร์คลาวด์ ค่าฮาร์ดแวร์จัดเก็บ 
                และค่าแรงผู้ดูแลระบบ โดยซอฟต์แวร์ Open-source จะช่วยขจัดค่าไลเซนส์เชิงพาณิชย์ลงได้
              </p>
            </div>

            {/* Factor 4 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-[15px] font-bold text-slate-800">มาตรฐานความปลอดภัยของข้อมูล</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ตรวจสอบระบบความปลอดภัยว่ามีเครื่องมือเข้ารหัสลับข้อมูล (Encryption) การกำหนดสิทธิ์ผู้ใช้งานแยกตามความรับผิดชอบ (RBAC/IAM) 
                รวมถึงความสามารถในการสำรองข้อมูลและการกู้คืนหลังเกิดเหตุภัยพิบัติ
              </p>
            </div>

            {/* Factor 5 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-[15px] font-bold text-slate-800">ทักษะและความเชี่ยวชาญของทีมงาน</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                วิเคราะห์ขีดความรู้ของทีมโปรแกรมเมอร์และวิศวกรระบบ (DBA) หากทีมงานมีประสบการณ์กับภาษานั้นอยู่เดิม 
                การบำรุงรักษาและการออกแบบสคริปต์จะเกิดขึ้นได้รวดเร็วและป้องกันข้อผิดพลาดได้ดีขึ้น
              </p>
            </div>

            {/* Factor 6 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="text-[15px] font-bold text-slate-800">การสนับสนุนและชุมชนผู้ใช้งาน</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ประเมินขนาดและบทความช่วยเหลือบนสังคมคอมมูนิตี้อินเทอร์เน็ต เพื่อให้ทีมวิศวกรสามารถสืบค้น ค้นหาปัญหา 
                และค้นหาไลบรารีโค้ดตัวช่วยแก้ปัญหาเมื่อระบบเกิดข้อผิดพลาดในการรันไทม์ได้สะดวกรวดเร็ว
              </p>
            </div>
          </div>

          {/* Factor 7 - Centered Full Width Below */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-0.5 hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group max-w-3xl mx-auto border-l-[3.5px] border-l-blue-500/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <h4 className="text-[16px] font-bold text-slate-800">ความเข้ากันได้กับระบบโครงสร้างเดิม</h4>
            </div>
            <p className="text-[14.5px] text-slate-500 leading-relaxed">
              ซอฟต์แวร์ DBMS ที่จะนำเข้ามาต้องสามารถเชื่อมประสานและทำงานควบคู่กับระบบปฏิบัติการ (OS) 
              และเฟรมเวิร์กภาษาในการเขียนแอปพลิเคชันที่มีอยู่เดิมภายในบริษัทได้อย่างไม่มีจุดสะดุดขัดแย้งเชิงระบบ
            </p>
          </div>
        </section>

        {/* ─── Section 2: Why MySQL & MySQL Workbench ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">
              การเรียนการสอน / เหตุผลการเลือกใช้เครื่องมือ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทำไมรายวิชานี้จึงเลือกใช้ MySQL และ MySQL Workbench
            </h3>
          </div>

          <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
            เพื่อสร้างความรู้ความสามารถในการจัดการฐานข้อมูลเชิงสัมพันธ์ที่เป็นไปตามมาตรฐานสากลและสามารถนำไปประยุกต์ใช้ในการประกอบวิชาชีพได้จริง 
            รายวิชานี้จึงตัดสินใจเลือกใช้ซอฟต์แวร์ MySQL ควบคู่กับ MySQL Workbench ด้วยเหตุผลสำคัญ 4 ประการ:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Reason 1 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-blue-500/85 space-y-3">
              <h4 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ซอฟต์แวร์ Open-source ที่เปิดให้ใช้งานฟรี
              </h4>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                MySQL เป็นโปรเจกต์โอเพนซอร์สที่อนุญาตให้นักพัฒนาใช้งานได้โดยไม่มีการคิดค่าใช้จ่ายลิขสิทธิ์ระบบ 
                ทำให้อำนวยประโยชน์แก่สถานศึกษาและนักเรียนทุกคนในการฝึกฝนปฏิบัติการอย่างเท่าเทียม
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-blue-500/85 space-y-3">
              <h4 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ความนิยมระดับสากลและความน่าเชื่อถือสูง
              </h4>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ได้รับการยอมรับและถูกประยุกต์ใช้งานจริงในแอปพลิเคชันและธุรกิจระดับโลก เช่น Facebook, YouTube, Airbnb 
                ผู้เรียนจึงมั่นใจได้ว่าทักษะ SQL ที่ฝึกฝนจากคลาสนี้สามารถนำไปสมัครงานและใช้งานในสายงานเทคโนโลยีได้จริง
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-blue-500/85 space-y-3">
              <h4 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ชุมชนผู้พัฒนาขนาดมหึมาทั่วโลก
              </h4>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                ด้วยความนิยมยาวนานทำให้มีฐานข้อมูลผู้เรียนและวิศวกรที่ตั้งกระทู้และตอบคำถามแก้ปัญหาเชิงลึกบนอินเทอร์เน็ตจำนวนมหาศาล 
                ง่ายแก่ผู้เรียนทุกคนในการเรียนรู้ด้วยตนเองและค้นหาแนวทางผ่านฟอรัมออนไลน์
              </p>
            </div>

            {/* Reason 4 */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-blue-500/85 space-y-3">
              <h4 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ความพร้อมด้านโปรแกรมบริหารแบบกราฟิก (GUI)
              </h4>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                การมีซอฟต์แวร์ MySQL Workbench ช่วยให้นักเรียนสามารถออกแบบโมเดลฐานข้อมูลเชิงกายภาพ (EER Diagram) 
                เขียนคำสั่งแก้ไบคัดกรองข้อมูล และบริหารจัดการฐานข้อมูลได้สะดวกรวดเร็วผ่านหน้าต่างเมนูกราฟิก แทนการคีย์รันผ่านคอนโซลดำเพียงอย่างเดียว
              </p>
            </div>
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask
          title="การวิเคราะห์เปรียบเทียบปัจจัยเชิงสถาปัตยกรรมข้อมูลเพื่อการจัดตั้งระบบ DBMS"
          taskText={`คำชี้แจง: ให้นักเรียนทบทวนปัจจัยในการเลือก DBMS และตอบคำถามประเมินความรู้ข้อต่อไปนี้เพื่อเก็บคะแนนในระบบฐานข้อมูลวิชาการ:

1. สมมติว่าทีมงานของคุณได้รับโจทย์ออกแบบแอปพลิเคชันระบบกระดานข่าวสั้น (Microblogging) ที่คาดว่าจะมีโพสต์ข้อความดิบขนาดเล็ก 50-200 อักขระ หลั่งไหลเข้ามาพร้อมกันนาฬิกาละ 50,000 โพสต์ในอนาคต จงวิเคราะห์เปรียบเทียบปัจจัย "ลักษณะข้อมูล" และ "การขยายตัว" ว่าระบบนี้ควรเลือกใช้ DBMS ประเภท Relational หรือ NoSQL พร้อมอธิบายเหตุผลประกอบเชิงลึก
2. อธิบายความสัมพันธ์ของปัจจัย "ทักษะและความเชี่ยวชาญของทีมงาน" (Team Expertise) และ "งบประมาณและต้นทุนรวม" (Total Cost of Ownership - TCO) ว่าสามารถส่งผลกระทบต่อความล้มเหลวหรือสำเร็จในการพัฒนาซอฟต์แวร์องค์กรอย่างไร
3. เพราะเหตุใดวิชาเรียนนี้จึงเลือกนำเสนอ MySQL ร่วมกับ MySQL Workbench แทนที่จะให้ใช้งานเฉพาะตัวเครื่องบริการ MySQL Server คอนโซลเปล่าเพียงอย่างเดียว อธิบายประโยชน์ในเชิงสุขภาวะการเรียนรู้ด้านการจัดการข้อมูล`}
        />
      </main>
    </div>
  );
}
