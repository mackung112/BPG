import React, { useState, useEffect } from 'react';
import TeacherTask from '../../ui/TeacherTask';
import {
  SimulatorShell,
  ConceptCard,
  AmbientBackdrop,
  QuizEngine,
  SectionBlock,
  ConsoleScreen
} from '../shared';
import {
  Sparkles,
  Layers,
  Heart,
  Smile,
  Monitor,
  Smartphone,
  Search,
  Users,
  CheckCircle2,
  ArrowRight,
  Eye,
  BookOpen,
  MousePointerClick,
  Sliders,
  Activity,
  Info,
  X,
  Check,
  Zap,
  Layout,
  Type,
  Palette,
  RotateCcw,
  ZapOff,
  ShoppingBag
} from 'lucide-react';

// Custom CSS animations for smooth transitions, flow lines, and gear rotations
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float-gentle {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-6px) rotate(1deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    @keyframes pulse-glow {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(99, 102, 241, 0.4)); opacity: 0.8; }
      50% { filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.9)); opacity: 1; }
    }
    @keyframes draw-dash {
      to {
        stroke-dashoffset: -32;
      }
    }
    .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 2s infinite; }
    .animate-draw-dash { animation: draw-dash 1.2s linear infinite; }
    
    .glass-panel {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
  `}} />
);

export default function UIUX1_1() {
  // ─── 1. Blobs for Layer 1 Background ──────────────────────────────────────
  const UIUX_BLOBS = [
    { color: 'bg-violet-200', size: 'w-[450px] h-[450px]', position: '-top-32 -left-32', opacity: 'opacity-40' },
    { color: 'bg-indigo-200', size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-32', opacity: 'opacity-35' },
    { color: 'bg-fuchsia-200', size: 'w-[380px] h-[380px]', position: '-bottom-32 left-1/4', opacity: 'opacity-30' },
    { color: 'bg-pink-100', size: 'w-[300px] h-[300px]', position: 'top-1/2 left-2/3', opacity: 'opacity-25' }
  ];

  // ─── 2. UX Flowchart Simulator State & Data ────────────────────────────────
  const [uxPath, setUxPath] = useState('optimized'); // 'optimized' | 'friction'
  const [activeUxNode, setActiveUxNode] = useState('none');

  const uxNodesData = {
    start: { title: "เริ่มค้นหาสินค้า", desc: "ผู้ใช้งานมีความต้องการอยากสั่งซื้อเสื้อยืดในแอป E-Commerce" },
    opt_middle: { title: "ระบบกรองอัจฉริยะ (UX-Centered)", desc: "แสดงช่องค้นหาเด่นชัด พร้อมระบบแนะนำคำอัตโนมัติ (Autocomplete) ทำให้เจอสินค้าใน 1 วินาที" },
    fric_middle: { title: "หน้าเมนูซับซ้อน (Friction Path)", desc: "ไม่มีระบบค้นหาด่วน ต้องกดหาผ่านหมวดหมู่ย่อย 4 ชั้น และระบบคัดกรองโหลดช้า 5 วินาที" },
    success: { title: "ชำระเงินเสร็จสิ้น", desc: "การจ่ายเงินรวดเร็วแบบ 1-Click Checkout หรือระบบกรอกข้อมูลที่สั้นและกระชับ" }
  };

  // ─── 3. UI Mockup Editor State ─────────────────────────────────────────────
  const [uiColor, setUiColor] = useState('indigo'); // 'indigo' | 'emerald' | 'rose'
  const [uiRadius, setUiRadius] = useState('rounded-xl'); // 'rounded-none' | 'rounded-xl' | 'rounded-full'
  const [uiFontSize, setUiFontSize] = useState('text-base'); // 'text-sm' | 'text-base' | 'text-lg'

  // ─── 4. Interactive Venn Diagram State & Data ──────────────────────────────
  const [activeZone, setActiveZone] = useState('overlap'); // 'ux', 'ui', 'overlap'
  const [consoleLog, setConsoleLog] = useState('');
  const [isConsoleLoading, setIsConsoleLoading] = useState(false);

  const zones = {
    ux: {
      id: 'ux',
      title: 'ประสบการณ์ผู้ใช้งาน (User Experience - UX)',
      englishTitle: 'User Experience Rationale',
      accentColor: 'text-fuchsia-600',
      description: 'เน้นความรู้สึก อารมณ์ และความง่ายในการใช้งานที่เกิดขึ้นภายในจิตใจของผู้ใช้ในขณะและหลังการใช้งานระบบดิจิทัล เป็นเรื่องของตรรกะ กระบวนการคิด และพฤติกรรมมนุษย์',
      keyMetrics: [
        'User Research & Interviews (การวิจัยทำความเข้าใจผู้ใช้)',
        'User Journey Mapping (แผนภาพเส้นทางการใช้งาน)',
        'Information Architecture (สถาปัตยกรรมข้อมูลโครงสร้างแอป)',
        'Interaction Flows & Wireframes (การวางโครงร่างและผังไหล)',
        'Usability Testing (การทดสอบความง่ายในการใช้งาน)'
      ],
      eventSim: {
        event: "ux_flow_routing",
        action: "checkout_funnel_navigation",
        interaction_type: "cognitive_evaluation",
        metrics: {
          friction_index: "low",
          user_retention_probability: "94.5%",
          cognitive_load_level: "minimal"
        }
      }
    },
    ui: {
      id: 'ui',
      title: 'ส่วนติดต่อประสานกับผู้ใช้ (User Interface - UI)',
      englishTitle: 'User Interface Attributes',
      accentColor: 'text-indigo-600',
      description: 'เน้นองค์ประกอบทางกายภาพและทัศนศิลป์ที่ปรากฏบนหน้าจอระบบดิจิทัล ซึ่งเป็นส่วนที่ผู้ใช้มองเห็นและสัมผัสได้โดยตรง รวมถึงความสม่ำเสมอของความงามและความคล่องตัวเชิงเทคนิค',
      keyMetrics: [
        'Visual Design & Branding (การออกแบบธีมและเอกลักษณ์สี)',
        'Typography Scale (การคัดเลือกลำดับขนาดตัวอักษร)',
        'Layouts & Grids (การคุมสัดส่วนโครงร่าง Auto Layout)',
        'Interactive Buttons & States (รูปทรงและสถานะปุ่มกด)',
        'Micro-animations & Transitions (ทรานซิชันตอบสนองเสมือนจริง)'
      ],
      eventSim: {
        event: "ui_theme_render",
        action: "apply_design_tokens",
        interaction_type: "visual_presentation",
        metrics: {
          primary_color: "#4F46E5",
          font_family: "Outfit, Inter",
          border_radius: "12px",
          render_speed_ms: 45
        }
      }
    },
    overlap: {
      id: 'overlap',
      title: 'จุดประสานการออกแบบประสบการณ์และส่วนติดต่อ (UX/UI Intersection)',
      englishTitle: 'Integrated Product Success',
      accentColor: 'text-indigo-600',
      description: 'จุดตัดเชื่อมโยงที่เปลี่ยนงานวิจัย (UX) ให้กลายเป็นภาพหน้าจอที่มีชีวิตและใช้งานได้จริง (UI) ก่อให้เกิดผลิตภัณฑ์ดิจิทัลที่ทำงานได้สมบูรณ์แบบ ตอบสนองเป้าหมายทั้งผู้ใช้และธุรกิจ',
      keyMetrics: [
        'Interaction Design (การออกแบบความสัมพันธ์ระหว่างผู้ใช้และปุ่ม)',
        'Usability & Heuristics (ความสะดวกถูกต้องและตอบรับรวดเร็ว)',
        'Inclusive Design & Accessibility (ความทั่วถึงในการรองรับผู้ใช้งาน)',
        'Design System Implementation (การสร้างระบบสไตล์ชี้วัดใช้งานร่วมกัน)',
        'Brand Loyalty & Conversion Rate (การกระตุ้นยอดขายและความภักดีต่อแบรนด์)'
      ],
      eventSim: {
        event: "interaction_completed",
        action: "successful_purchase_trigger",
        interaction_type: "integrated_ux_ui_success",
        metrics: {
          conversion_achieved: true,
          satisfaction_score: "4.9/5.0",
          interactive_efficiency_rate: "98.7%"
        }
      }
    }
  };

  useEffect(() => {
    setIsConsoleLoading(true);
    const timer = setTimeout(() => {
      setConsoleLog(JSON.stringify(zones[activeZone].eventSim, null, 2));
      setIsConsoleLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeZone]);

  // ─── 5. Quiz Levels Data ──────────────────────────────────────────────────
  const quizLevels = [
    {
      title: "ความหมายของ User Experience (UX)",
      desc: "การระบุขอบเขตและหน้าที่หลักของ UX ที่มุ่งเน้นการวิจัยและจิตวิทยาผู้ใช้งาน",
      code: `class UserExperience:
    def __init__(self, user_needs):
        self.research = user_needs
        self.satisfaction = None
        
    def evaluate_product(self, flow_efficiency):
        # UX มุ่งเน้นการจัดโครงสร้างด้านใดเป็นสำคัญ?
        self.satisfaction = float(flow_efficiency) >= [ ? ]
        return self.satisfaction`,
      target: "True (เมื่อระบบใช้งานง่ายและตรงความต้องการ)",
      options: [
        { key: "A", text: "การจัดจานสีให้ตรงตาม CI ของแบรนด์สากล", isCorrect: false },
        { key: "B", text: "โครงสร้างการไหล (User Flow) และความสะดวกสบายไร้แรงต้าน", isCorrect: true },
        { key: "C", text: "การทำแอนิเมชันตอนเปลี่ยนหน้าจอให้ลื่นและหมุนแบบสามมิติ", isCorrect: false },
        { key: "D", text: "การระบุขนาดฟอนต์หัวข้อหลักให้ใหญ่เด่นชัดสะกดสายตา", isCorrect: false }
      ],
      tip: "UX เปรียบเหมือนโครงสร้างสมอง ลำดับขั้นตอน และตรรกะความรู้สึกในการแก้ปัญหา ไม่ใช่สิ่งที่ดวงตามองเห็นเป็นสีสัน"
    },
    {
      title: "ขอบข่ายของ User Interface (UI)",
      desc: "การทำความเข้าใจเกี่ยวกับ Visual Elements หรือองค์ประกอบบนหน้าจอที่ตาเห็น",
      code: `const uiElement = {
  type: "Button",
  properties: {
    label: "ยืนยันการชำระเงิน",
    // องค์ประกอบใดจัดอยู่ในงานออกแบบ UI หลัก?
    styling: [ ? ]
  }
};`,
      target: 'styling: { color: "indigo", font: "Outfit", radius: "8px" }',
      options: [
        { key: "A", text: "การวางแผนขั้นตอนการชำระเงินไม่ให้เกิดการกรอกข้อมูลซ้ำ", isCorrect: false },
        { key: "B", text: "การสัมภาษณ์ความรู้สึกผู้ใช้หลังทำธุรกรรมเสร็จสิ้น", isCorrect: false },
        { key: "C", text: "การระบุสี ขนาดตัวอักษร และโครงสร้างเลย์เอาต์หน้าจอ", isCorrect: true },
        { key: "D", text: "การจัดการฐานข้อมูลเพื่อรักษาความรวดเร็วในการประมวลผล", isCorrect: false }
      ],
      tip: "UI มุ่งเน้นไปที่ทัศนศิลป์ สุนทรียภาพ โครงร่าง Grid สี ขนาดตัวอักษร และการจัดองค์ประกอบภาพบนหน้าจอ"
    },
    {
      title: "จุดประสงค์ของส่วนเหลื่อมประสาน (Overlap UX/UI)",
      desc: "ค้นหาแนวคิดการทำงานร่วมกันระหว่างแผนงานโครงร่างวิจัยและงานความงามทางหน้าจอ",
      code: `def design_handoff(ux_wireframe, ui_design_tokens):
    # ผลลัพธ์จากการประสานงานร่วมกันที่มีประสิทธิภาพ
    interaction_experience = merge(ux_wireframe, ui_design_tokens)
    return interaction_experience.has_attribute([ ? ])`,
      target: "True (ต้องส่งเสริมทั้งความงามและใช้งานสะดวกง่ายดาย)",
      options: [
        { key: "A", text: "Usability Heuristics & Interaction Design (ความสะดวกและใช้งานง่ายได้จริง)", isCorrect: true },
        { key: "B", text: "Database Lock & Server Speed (การล็อคข้อมูลและความเร็วเซิร์ฟเวอร์)", isCorrect: false },
        { key: "C", text: "Python OOP Inheritance (การสืบทอดคุณสมบัติระดับคลาสโปรแกรม)", isCorrect: false },
        { key: "D", text: "Marketing Promotion & Campaign (การจัดทำโปรโมชันและการส่งเสริมการขาย)", isCorrect: false }
      ],
      tip: "ส่วนตัดกันของ UX และ UI คือจุดที่การวิจัยเชิงลึก ผสมผสานกับการจัดเรียงหน้าจอ ทำให้เกิดความลื่นไหลในระบบโต้ตอบ"
    },
    {
      title: "การแก้ไขปัญหาในระบบจริง (Design Diagnostics)",
      desc: "วิเคราะห์กรณีศึกษา: 'ผู้ใช้เลิกใช้งานแอปซื้อสินค้ากลางคันเนื่องจากหาปุ่มยืนยันไม่พบและขั้นตอนการชำระเงินซับซ้อนเกินไป'",
      code: `# บันทึกการวิเคราะห์ปัญหาของระบบ (Incident Report)
def diagnose_issue(dropoff_rate):
    if dropoff_rate > 0.40:
        # จะต้องเริ่มแก้ไขระบบจากจุดใดเป็นลำดับแรกอย่างเป็นระบบ?
        return [ ? ]`,
      target: '"แก้ไขเส้นทางการใช้งาน (UX Flow) ร่วมกับปรับความเด่นชัดของปุ่ม (UI Visual)"',
      options: [
        { key: "A", text: "เปลี่ยนสีปุ่มทั้งหมดให้เป็นสีแดงสดเพื่อให้ผู้ใช้มองเห็นได้ชัดขึ้นเพียงอย่างเดียว", isCorrect: false },
        { key: "B", text: "ปรับเพิ่มปริมาณแรมเซิร์ฟเวอร์ให้สูงขึ้นเพื่อรองรับทราฟฟิกข้อมูลหนาแน่น", isCorrect: false },
        { key: "C", text: "ปรับรื้อการจัดเก็บฐานข้อมูลนักเรียนใหม่ทั้งหมดและเขียน Python สั่งรันวนซ้ำ", isCorrect: false },
        { key: "D", text: "วิเคราะห์และจัดระเบียบโครงสร้างปุ่มใหม่ (UI) ควบคู่กับการลดขั้นตอนซับซ้อนลง (UX)", isCorrect: true }
      ],
      tip: "ปัญหาการยกเลิกกลางคันมักเกิดจากขั้นตอนที่มากเกินความจำเป็น (UX Flow) ผสมกับองค์ประกอบชี้นำบนหน้าจอไม่ชัดเจน (UI Elements)"
    }
  ];

  // ─── 6. TeacherTask Content ───────────────────────────────────────────────
  const teacherTaskContent = `ใบงานกิจกรรมปฏิบัติการ หน่วยที่ 1.1: การวิเคราะห์และเปรียบเทียบ UX/UI ในผลิตภัณฑ์ดิจิทัล
--------------------------------------------------------------------------------------
[คำชี้แจง] ให้นักศึกษาเลือกแอปพลิเคชันหรือแพลตฟอร์มดิจิทัลที่ใช้งานในชีวิตประจำวัน 1 ระบบ (เช่น Spotify, Netflix, Grab หรือ 7-Eleven App) แล้วทำการวิเคราะห์จำแนกรายละเอียดและจัดทำรายงานเปรียบเทียบตามโครงสร้างวิชาการดังต่อไปนี้:

1. ข้อมูลทั่วไปของผลิตภัณฑ์ (Product Overview)
   - ระบุชื่อแอปพลิเคชันและกลุ่มผู้ใช้งานเป้าหมายหลัก (Target User Persona)

2. การจำแนกองค์ประกอบส่วนติดต่อประสาน (UI Visual Elements Evaluation)
   - ระบุจานสีหลัก (Primary & Secondary Colors) และจิตวิทยาของสีที่แอปเลือกใช้
   - อธิบายลำดับขั้นตัวอักษร (Typography Hierarchy) และ Layout Grid ที่สังเกตเห็นบนหน้าจอหลัก
   - บันทึกสถานะการตอบสนองของปุ่ม (Button Interactive States) เช่น Hover, Active

3. การวิเคราะห์เส้นทางและประสบการณ์ผู้ใช้ (UX Architecture & Flows)
   - ร่างขั้นตอนการทำกิจกรรมสำคัญ 1 อย่างในแอป (เช่น การเพิ่มสินค้าลงตะกร้าจนถึงชำระเงิน) เพื่อแสดงลำดับขั้นการไหลของข้อมูล (User Flow)
   - ระบุจุดพึงพอใจสูง (Gain Points) และจุดติดขัดที่เป็นอุปสรรค (Pain Points)

4. สรุปผลการประเมินและการปรับปรุง (Usability Rationale & Recommendations)
   - สรุปความเชื่อมโยงว่าการออกแบบหน้าจอ (UI) ส่งผลต่ออารมณ์และการใช้งานจริง (UX) อย่างไร
   - เสนอแนวทางการปรับปรุงระบบ 2 ข้อ โดยอ้างอิงตามหลัก Usability Heuristics

[รูปแบบการนำส่ง] จัดทำรายงานในรูปแบบตารางเปรียบเทียบและสรุปความยาวไม่ต่ำกว่า 1 หน้ากระดาษ A4 หรือบันทึกเป็นไฟล์ PDF`;

  return (
    <div className="font-sans text-slate-800 pb-24 relative">
      <CustomStyles />
      
      {/* ─── Layer 1: Ambient Backdrop ─── */}
      <AmbientBackdrop blobs={UIUX_BLOBS} />

      {/* ─── Layer 3: Main Page Content ─── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── Section 1: Definition of UX (User Experience) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              มโนทัศน์วิชาการออกแบบ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              นิยามของประสบการณ์ผู้ใช้งานในระบบดิจิทัล
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Theory Column */}
            <div className="lg:col-span-5 space-y-5">
              <p className="text-[16px] md:text-[17px] text-zinc-600 leading-relaxed font-normal">
                ในทางวิศวกรรมการออกแบบผลิตภัณฑ์ดิจิทัล 
                <span className="mx-1 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-[14px]">ประสบการณ์ผู้ใช้งาน (User Experience)</span> 
                หรือ <strong className="text-indigo-600 font-bold">UX</strong> หมายถึง ปฏิกิริยาทางจิตวิทยา อารมณ์ ความพึงพอใจ และความสะดวกสบายที่บุคคลได้รับระหว่างการปฏิสัมพันธ์กับระบบดิจิทัล 
                การจัดโครงสร้าง UX ไม่ใช่เรื่องของความสวยงามภายนอก แต่เป็นเรื่องของการวางแผนตรรกะข้อมูลเพื่อขจัดอุปสรรคในการใช้งาน (Friction) และลดภาระทางสมอง (Cognitive Load) ของผู้ใช้
              </p>

              {/* Frosted Glass Callout for ISO Definition */}
              <div className="bg-indigo-50/60 backdrop-blur-md border border-indigo-200/60 rounded-2xl p-4 border-l-[3px] border-l-indigo-500 leading-relaxed">
                <h4 className="font-bold text-indigo-900 text-[15px] mb-1.5 flex items-center gap-1.5">
                  <Info className="w-5 h-5 text-indigo-600" />
                  คำนิยามตามมาตรฐานสากล (ISO 9241-210)
                </h4>
                <p className="text-[13.5px] text-slate-600 leading-relaxed">
                  UX คือ "การรับรู้และการตอบสนองของบุคคลอันเกิดจากการใช้งาน และ/หรือ ความคาดหวังในการใช้งานผลิตภัณฑ์ บริการ หรือระบบ" ซึ่งครอบคลุมความสะดวกและสอดคล้องทางตรรกะ
                </p>
              </div>

              {/* Bulleted list styled with ArrowRight icon */}
              <div className="space-y-3">
                <h5 className="font-bold text-slate-800 text-[14px] uppercase tracking-wider">ขอบข่ายกระบวนการคิดและงานวิเคราะห์ UX:</h5>
                <ul className="space-y-2.5">
                  {[
                    { text: "กระบวนการสัมภาษณ์วิจัยความพึงพอใจเป้าหมาย (User Research)" },
                    { text: "การจัดแบ่งและสร้างสถาปัตยกรรมสารสนเทศ (Information Architecture)" },
                    { text: "การจำลองขั้นตอนแผนภาพเส้นทางการใช้งาน (User Journey Maps)" },
                    { text: "การประเมินหาดัชนีประสิทธิภาพระบบงาน (Usability Testing)" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[14.5px] text-slate-600 leading-relaxed">
                      <ArrowRight className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Column: UX Flowchart Simulator */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl relative overflow-hidden group">
              <div className="absolute top-3 right-4 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                UX User Flow Simulator
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                ห้องทดลองจำลอง: วิเคราะห์และเปรียบเทียบความเสียดทานในเส้นทางของผู้ใช้ (User Journey Friction)
              </h4>
              <p className="text-sm text-slate-500 mb-6">
                ทดลองสลับเส้นทางผู้ใช้ด้านล่างเพื่อเปรียบเทียบความเสียดทาน (Friction) และอัตราการสั่งซื้อสำเร็จ (Conversion Rate)
              </p>

              {/* Flow Selector */}
              <div className="flex gap-2.5 mb-6">
                {[
                  { id: 'optimized', label: '1. เส้นทางกระชับ (UX-Centered)', desc: 'ลดขั้นตอนกรอกข้อมูล', activeColor: 'bg-indigo-600 border-indigo-500' },
                  { id: 'friction', label: '2. เส้นทางซับซ้อน (Friction Path)', desc: 'มีป๊อปอัปและบังคับลงทะเบียน', activeColor: 'bg-rose-600 border-rose-500' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setUxPath(opt.id);
                      setActiveUxNode('none');
                    }}
                    className={`flex-1 p-3 rounded-2xl border text-left cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-98
                      ${uxPath === opt.id
                        ? `${opt.activeColor} text-white shadow-lg`
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-350'
                      }`}
                  >
                    <div className="font-bold text-[14px]">{opt.label}</div>
                    <div className={`text-[11px] ${uxPath === opt.id ? 'text-white/80' : 'text-slate-400'}`}>{opt.desc}</div>
                  </button>
                ))}
              </div>

              {/* SVG Flowchart Diagram (Absolute Center Connection) */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 relative overflow-hidden mb-6">
                <svg className="w-full h-[180px] pointer-events-auto" viewBox="0 0 600 180">
                  {/* Connection lines from absolute centers */}
                  {/* Node coordinates: Start (100,90), Center-Opt (300,45), Center-Fric (300,135), Success (500,90) */}
                  <g stroke="#334155" strokeWidth="4" fill="none">
                    {/* Background inactive paths */}
                    <path d="M 100 90 C 200 90, 200 45, 300 45" />
                    <path d="M 300 45 C 400 45, 400 90, 500 90" />
                    <path d="M 100 90 C 200 90, 200 135, 300 135" />
                    <path d="M 300 135 C 400 135, 400 90, 500 90" />
                  </g>

                  {/* Highlighted active paths with flowing dots */}
                  {uxPath === 'optimized' ? (
                    <g stroke="#6366f1" strokeWidth="4.5" fill="none">
                      <path d="M 100 90 C 200 90, 200 45, 300 45" strokeDasharray="8 8" className="animate-draw-dash" />
                      <path d="M 300 45 C 400 45, 400 90, 500 90" strokeDasharray="8 8" className="animate-draw-dash" />
                    </g>
                  ) : (
                    <g stroke="#f43f5e" strokeWidth="4.5" fill="none">
                      <path d="M 100 90 C 200 90, 200 135, 300 135" strokeDasharray="8 8" className="animate-draw-dash" />
                      <path d="M 300 135 C 400 135, 400 90, 500 90" strokeDasharray="8 8" className="animate-draw-dash" />
                    </g>
                  )}

                  {/* Node Stations */}
                  {/* Start Node */}
                  <g className="cursor-pointer" onClick={() => setActiveUxNode('start')}>
                    <circle cx="100" cy="90" r="24" fill="#1e293b" stroke={activeUxNode === 'start' ? '#6366f1' : '#475569'} strokeWidth="3" />
                    <text x="100" y="94" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" className="select-none pointer-events-none">เริ่ม</text>
                  </g>

                  {/* Middle Node - Optimized */}
                  <g className={`cursor-pointer ${uxPath === 'optimized' ? 'opacity-100' : 'opacity-30'}`} onClick={() => uxPath === 'optimized' && setActiveUxNode('opt_middle')}>
                    <circle cx="300" cy="45" r="28" fill="#1e293b" stroke={activeUxNode === 'opt_middle' ? '#6366f1' : '#475569'} strokeWidth="3" />
                    <text x="300" y="49" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle" className="select-none pointer-events-none">กรองค้นหา</text>
                  </g>

                  {/* Middle Node - Friction */}
                  <g className={`cursor-pointer ${uxPath === 'friction' ? 'opacity-100' : 'opacity-30'}`} onClick={() => uxPath === 'friction' && setActiveUxNode('fric_middle')}>
                    <circle cx="300" cy="135" r="28" fill="#1e293b" stroke={activeUxNode === 'fric_middle' ? '#f43f5e' : '#475569'} strokeWidth="3" />
                    <text x="300" y="139" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle" className="select-none pointer-events-none">หมวดซับซ้อน</text>
                  </g>

                  {/* Success Node */}
                  <g className="cursor-pointer" onClick={() => setActiveUxNode('success')}>
                    <circle cx="500" cy="90" r="24" fill="#1e293b" stroke={activeUxNode === 'success' ? '#10b981' : '#475569'} strokeWidth="3" />
                    <text x="500" y="94" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" className="select-none pointer-events-none">ชำระเงิน</text>
                  </g>

                  {/* Connection Point indicators (Absolute Center Connection) */}
                  <circle cx="100" cy="90" r="4" fill="#38bdf8" />
                  <circle cx="300" cy="45" r="4" fill="#38bdf8" />
                  <circle cx="300" cy="135" r="4" fill="#f43f5e" />
                  <circle cx="500" cy="90" r="4" fill="#34d399" />
                </svg>

                <div className="absolute bottom-2 left-3 text-[9px] font-mono text-slate-500">
                  *คลิกสถานีทรงกลม (Nodes) เพื่อแสดงคำอธิบายรายละเอียด
                </div>
              </div>

              {/* Flow Info Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {/* Node details */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col justify-center min-h-[90px]">
                  {activeUxNode !== 'none' ? (
                    <div className="animate-fade-in">
                      <h5 className="font-bold text-slate-900 text-[14px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                        {uxNodesData[activeUxNode].title}
                      </h5>
                      <p className="text-slate-500 text-[12px] leading-relaxed mt-1">
                        {uxNodesData[activeUxNode].desc}
                      </p>
                    </div>
                  ) : (
                    <div className="text-slate-400 italic text-[13px] text-center">
                      [คลิกโหนดบนไดอะแกรมด้านบนเพื่อวิเคราะห์รายละเอียด]
                    </div>
                  )}
                </div>

                {/* Flow Metrics Card */}
                <div className={`rounded-2xl p-4 border flex flex-col justify-between min-h-[90px] transition-colors duration-300
                  ${uxPath === 'optimized' 
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' 
                    : 'bg-rose-50/60 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Telemetry Performance:</span>
                    <span className={`w-2 h-2 rounded-full ${uxPath === 'optimized' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <span className="text-[10px] block opacity-75">Friction (ความเสียดทาน):</span>
                      <span className="text-lg font-bold font-mono">{uxPath === 'optimized' ? '12%' : '84%'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] block opacity-75">Conversion (สำเร็จ):</span>
                      <span className="text-lg font-bold font-mono">{uxPath === 'optimized' ? '96.2%' : '28.5%'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Definition of UI (User Interface) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              สุนทรียภาพระบบหน้าจอ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              นิยามของส่วนติดต่อประสานและองค์ประกอบภาพบนหน้าจอ
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Column: UI Mockup Editor */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl relative overflow-hidden group">
              <div className="absolute top-3 right-4 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                Interactive UI Mockup Sandbox
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                ห้องทดลองจำลอง: การตั้งค่า Design Tokens บนหน้าจอจำลอง (Live UI Mockup)
              </h4>
              <p className="text-sm text-slate-500 mb-6">
                ทดลองปรับจานสี รัศมีความโค้ง และขนาดตัวอักษรขององค์ประกอบเพื่อดูความเปลี่ยนแปรทางทัศนศิลป์ในทันที
              </p>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Editor Controls */}
                <div className="md:col-span-5 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col justify-between gap-4">
                  {/* Color tokens */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2">1. Accent Color (สีธีมหลัก):</label>
                    <div className="flex gap-2">
                      {[
                        { id: 'indigo', colorClass: 'bg-indigo-600', activeBorder: 'ring-2 ring-indigo-500' },
                        { id: 'emerald', colorClass: 'bg-emerald-600', activeBorder: 'ring-2 ring-emerald-500' },
                        { id: 'rose', colorClass: 'bg-rose-600', activeBorder: 'ring-2 ring-rose-500' }
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setUiColor(c.id)}
                          className={`w-8 h-8 rounded-full ${c.colorClass} cursor-pointer transition-all ${uiColor === c.id ? c.activeBorder : 'border border-slate-300'}`}
                          title={`สี ${c.id}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Corner Radius */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2">2. Corner Radius (รัศมีความโค้ง):</label>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { id: 'rounded-none', label: 'เหลี่ยมแหลม (Sharp)' },
                        { id: 'rounded-xl', label: 'ขอบมนหนา (Rounded)' },
                        { id: 'rounded-full', label: 'ขอบมนกลม (Pill)' }
                      ].map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setUiRadius(r.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-left border cursor-pointer transition-all
                            ${uiRadius === r.id 
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2">3. Body Font Size (ขนาดสเกลตัวอักษร):</label>
                    <div className="flex gap-1.5">
                      {[
                        { id: 'text-sm', label: 'เล็ก (14px)' },
                        { id: 'text-base', label: 'มาตรฐาน (16px)' },
                        { id: 'text-lg', label: 'ใหญ่ (18px)' }
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setUiFontSize(f.id)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-all
                            ${uiFontSize === f.id 
                              ? 'bg-indigo-600 text-white border-indigo-600' 
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Preview Display Mobile Device Mockup */}
                <div className="md:col-span-7 bg-slate-900 rounded-3xl p-4 border border-slate-800 flex flex-col justify-between min-h-[300px] shadow-inner relative">
                  <div className="absolute top-2 left-4 text-[9px] font-mono text-slate-500">
                    DEVICE DISPLAY SIMULATOR
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-4 flex-1 flex flex-col justify-between mt-4 overflow-hidden border border-slate-800">
                    {/* Mockup Header */}
                    <div className="flex justify-between items-center border-b border-slate-850 pb-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <ShoppingBag className="w-4 h-4 text-slate-400" />
                        <span className="text-[11px] font-bold text-white font-mono">CRU MAC STORE</span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono">15:58</span>
                    </div>

                    {/* Mockup Product Card */}
                    <div className={`bg-slate-900 border border-slate-800 p-3 flex flex-col justify-between gap-3 ${uiRadius}`}>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">NEW ITEM</span>
                          <h5 className="text-white text-xs font-bold mt-1">เสื้อยืดเนื้อผ้ายืดเกรดสากล</h5>
                        </div>
                        <span className="text-indigo-400 font-bold text-xs font-mono">฿390.00</span>
                      </div>

                      <p className={`text-slate-400 ${uiFontSize} leading-normal`}>
                        การออกแบบจัดระเบียบองค์ประกอบภาพที่ดีช่วยเพิ่มระดับความดึงดูดใจในการช็อปปิ้ง
                      </p>

                      {/* Mockup Purchase Button */}
                      <button
                        className={`w-full py-2 font-bold text-xs text-white transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5
                          ${uiColor === 'indigo' ? 'bg-[#4F46E5] hover:bg-[#4338CA]' : ''}
                          ${uiColor === 'emerald' ? 'bg-[#10b981] hover:bg-[#059669]' : ''}
                          ${uiColor === 'rose' ? 'bg-[#f43f5e] hover:bg-[#e11d48]' : ''}
                          ${uiRadius}`}
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>ชำระเงินด่วน (1-Click)</span>
                      </button>
                    </div>

                    {/* Mockup Status bar */}
                    <div className="mt-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>Token color: {uiColor === 'indigo' ? '#4F46E5' : uiColor === 'emerald' ? '#10b981' : '#f43f5e'}</span>
                      <span>Font scale: {uiFontSize === 'text-sm' ? '14px' : uiFontSize === 'text-base' ? '16px' : '18px'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Theory Column */}
            <div className="lg:col-span-5 space-y-5">
              <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
                ในฝั่งตรงข้าม 
                <span className="mx-1 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-750 font-mono text-[14px]">ส่วนติดต่อประสานกับผู้ใช้งาน (User Interface)</span> 
                หรือ <strong className="text-indigo-600 font-bold">UI</strong> คือ องค์ประกอบทัศนศิลป์ที่ปรากฏขึ้นบนผืนผิวหน้าจอ เพื่อคอยเชื่อมต่อและเอื้อให้ผู้ใช้ทำปฏิสัมพันธ์ทางกายภาพได้จริง 
                โดยรวบรวมเอาการเลือกใช้สี, ขนาดการกำหนดตัวอักษร (Typography Hierarchy), ไอคอนปุ่มกดต่างๆ และทรานซิชันเคลื่อนไหว เพื่อความงามและความเสถียร
              </p>

              {/* Visual Elements Detail Cards */}
              <div className="space-y-3 pt-2">
                {[
                  { title: "จานสีระบบ (Color System)", desc: "การเลือกสีคู่สีหลัก-รองเพื่อชี้นำการควบคุมสถานะปุ่ม (Hover, Active)" },
                  { title: "การจัดเลย์เอาต์ (Auto Layout & Grid)", desc: "ระยะห่างขอบและสัดส่วนที่ลื่นไหลสอดรับกับหน้าจอคอมพิวเตอร์และมือถือ" },
                  { title: "ไมโครแอนิเมชัน (Micro-interactions)", desc: "การกะพริบแสงเรืองและเอฟเฟกต์ตอบรับแบบเรียลไทม์เพื่อชี้นำการคลิก" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-indigo-50/20 p-3 rounded-2xl border border-indigo-100/30">
                    <div className="p-2 rounded-xl bg-indigo-100/60 text-indigo-600 shadow-inner mt-0.5">
                      <Layout className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[14.5px] font-bold text-slate-800 leading-snug">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Connection & Overlap (Venn Diagram Simulator) ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-fuchsia-600 tracking-wider uppercase">
              ความร่วมมือเชิงโครงสร้าง
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ความเชื่อมโยงและจุดประสานระหว่างกระบวนการวิจัยและส่วนติดต่อผู้ใช้
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-[16px] md:text-[17px] text-zinc-650 leading-relaxed font-normal">
              แม้ว่า UX และ UI จะมุ่งเน้นแก้โจทย์คนละฝั่ง แต่ในความเป็นจริงทั้งสองกระบวนการไม่สามารถแยกออกจากกันได้เลย 
              การสร้างหน้าจอแอปพลิเคชันที่สวยงาม (UI) โดยไม่มีงานวิจัยโครงสร้างรองรับ (UX) จะทำให้ระบบใช้งานยากและถูกเลิกใช้งานอย่างรวดเร็ว 
              ในทางกลับกัน ระบบที่ผ่านการวิจัยขั้นตอนมาอย่างดีเยี่ยม (UX) แต่ขาดแผงควบคุมหน้าจอที่ดึงดูดสายตาและชี้แนะชัดเจน (UI) ก็จะไม่ได้รับการยอมรับจากตลาดดิจิทัล
            </p>

            {/* Venn Diagram & Console Simulator Shell */}
            <div className="pt-4">
              <h4 className="text-[18px] font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-fuchsia-600" />
                เครื่องมือทดลองจำลอง: วิเคราะห์พื้นที่จุดเชื่อมต่อของวงกลมการออกแบบ (Venn Diagram Interaction)
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Panel: SVG Venn Diagram */}
                <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col justify-between relative min-h-[420px]">
                  <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">
                    VIRTUAL VENN SYSTEM
                  </span>

                  <div className="my-auto flex flex-col items-center justify-center">
                    <svg className="w-full max-w-[420px] h-[260px] pointer-events-auto" viewBox="0 0 600 380">
                      <defs>
                        {/* Gradients for circles */}
                        <linearGradient id="ux-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#d946ef" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="ui-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.05" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="overlap-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#d946ef" stopOpacity="0.4" />
                        </linearGradient>
                        
                        {/* Glow filters */}
                        <filter id="glow-neon" x="-10%" y="-10%" width="120%" height="120%">
                          <feGaussianBlur stdDeviation="8" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* Connection trace path from active region centers (Absolute Center Connection Standard) */}
                      {activeZone === 'ux' && (
                        <path 
                          d="M 230,190 L 230,320 L 300,320 L 300,345" 
                          fill="none" 
                          stroke="#d946ef" 
                          strokeWidth="3.5" 
                          strokeDasharray="8 8" 
                          className="animate-draw-dash" 
                        />
                      )}
                      {activeZone === 'ui' && (
                        <path 
                          d="M 370,190 L 370,320 L 300,320 L 300,345" 
                          fill="none" 
                          stroke="#6366f1" 
                          strokeWidth="3.5" 
                          strokeDasharray="8 8" 
                          className="animate-draw-dash" 
                        />
                      )}
                      {activeZone === 'overlap' && (
                        <path 
                          d="M 300,190 L 300,345" 
                          fill="none" 
                          stroke="#818cf8" 
                          strokeWidth="3.5" 
                          strokeDasharray="8 8" 
                          className="animate-draw-dash" 
                        />
                      )}

                      {/* Geometric Center junction circles */}
                      {activeZone === 'ux' && <circle cx="230" cy="190" r="6" fill="#d946ef" filter="url(#glow-neon)" />}
                      {activeZone === 'ui' && <circle cx="370" cy="190" r="6" fill="#6366f1" filter="url(#glow-neon)" />}
                      {activeZone === 'overlap' && <circle cx="300" cy="190" r="6" fill="#818cf8" filter="url(#glow-neon)" />}

                      {/* Junction station on bottom output */}
                      <circle cx="300" cy="345" r="7" fill="#f43f5e" />

                      {/* Circle 1: UX */}
                      <circle 
                        cx="230" 
                        cy="190" 
                        r="115" 
                        fill="url(#ux-gradient)" 
                        stroke={activeZone === 'ux' ? '#d946ef' : '#475569'} 
                        strokeWidth={activeZone === 'ux' ? '4' : '1.5'} 
                        className="transition-all duration-300 cursor-pointer" 
                        onClick={() => setActiveZone('ux')}
                      />
                      
                      {/* Circle 2: UI */}
                      <circle 
                        cx="370" 
                        cy="190" 
                        r="115" 
                        fill="url(#ui-gradient)" 
                        stroke={activeZone === 'ui' ? '#818cf8' : '#475569'} 
                        strokeWidth={activeZone === 'ui' ? '4' : '1.5'} 
                        className="transition-all duration-300 cursor-pointer" 
                        onClick={() => setActiveZone('ui')}
                      />

                      {/* Overlap area detection overlay (clickable path in the intersection) */}
                      <path 
                        d="M 300,94 A 115,115 0 0,1 370,190 A 115,115 0 0,1 300,286 A 115,115 0 0,1 230,190 A 115,115 0 0,1 300,94 Z" 
                        fill={activeZone === 'overlap' ? 'url(#overlap-gradient)' : 'rgba(99, 102, 241, 0.08)'} 
                        stroke={activeZone === 'overlap' ? '#818cf8' : 'transparent'} 
                        strokeWidth="3.5" 
                        className="transition-all duration-300 cursor-pointer hover:fill-indigo-500/25" 
                        onClick={() => setActiveZone('overlap')}
                      />

                      {/* Labels on SVG */}
                      <text x="170" y="195" fill={activeZone === 'ux' ? '#f472b6' : '#94a3b8'} className="text-base font-bold select-none pointer-events-none" textAnchor="middle">UX Research</text>
                      <text x="430" y="195" fill={activeZone === 'ui' ? '#818cf8' : '#94a3b8'} className="text-base font-bold select-none pointer-events-none" textAnchor="middle">UI Design</text>
                      <text x="300" y="195" fill={activeZone === 'overlap' ? '#818cf8' : '#cbd5e1'} className="text-xs font-extrabold select-none pointer-events-none" textAnchor="middle">INTERACTION</text>
                    </svg>
                  </div>

                  {/* Manual controls buttons to trigger zone changes */}
                  <div className="flex gap-2 w-full mt-4">
                    {[
                      { id: 'ux', label: 'UX Focus', border: 'border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-950/20', activeBg: 'bg-fuchsia-600 text-white border-fuchsia-500' },
                      { id: 'overlap', label: 'Overlap (Core)', border: 'border-indigo-500/30 text-indigo-400 hover:bg-indigo-950/20', activeBg: 'bg-indigo-600 text-white border-indigo-500' },
                      { id: 'ui', label: 'UI Visuals', border: 'border-indigo-500/30 text-indigo-400 hover:bg-indigo-950/20', activeBg: 'bg-indigo-600 text-white border-indigo-500' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setActiveZone(btn.id)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 border cursor-pointer
                          ${activeZone === btn.id ? btn.activeBg : `bg-slate-900/60 ${btn.border}`}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Panel: Detailed Data Panel */}
                <div className="lg:col-span-6 bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl flex flex-col justify-between min-h-[420px] relative">
                  <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">
                    # ANNOTATION LOGS & PARSED TOKENS
                  </span>

                  <div className="mt-4 flex-1 flex flex-col justify-between gap-6">
                    <div>
                      {/* Heading of active zone */}
                      <div className="flex items-center gap-3.5 mb-4 border-b border-white/10 pb-3">
                        <span className={`w-3.5 h-3.5 rounded-full bg-current ${zones[activeZone].accentColor} animate-pulse-neon`} />
                        <h4 className="text-white text-lg font-bold">
                          {zones[activeZone].title}
                        </h4>
                      </div>

                      {/* Body details */}
                      <p className="text-slate-300 text-[14px] leading-relaxed mb-6 font-medium">
                        {zones[activeZone].description}
                      </p>

                      {/* Requirements bullets */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
                          องค์ประกอบและขอบข่ายการทำงาน:
                        </span>
                        {zones[activeZone].keyMetrics.map((metric, i) => (
                          <div key={i} className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span className="text-slate-350 text-[13px] font-mono font-medium">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Virtual Output Console containing JSON representation of UI/UX events */}
                    <div className="mt-4">
                      <ConsoleScreen 
                        label="# design_tokens_system_output"
                        accentLabel={zones[activeZone].englishTitle}
                        accentColor={zones[activeZone].accentColor}
                        isLoading={isConsoleLoading}
                        output={consoleLog}
                        multiline={true}
                        outputColor="text-indigo-400"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 4: Gamification QuizEngine ─── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              สนามประเมินทักษะ
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบประเมินและทบทวนความรู้ความเข้าใจบทเรียน
            </h3>
          </div>

          <div className="pt-2">
            <QuizEngine 
              title="มินิเกมถอดรหัส: UX vs UI เจ้าแห่งสัญลักษณ์"
              description="ฝึกฝนและแยกแยะขอบข่ายระหว่างกระบวนการศึกษาพฤติกรรมผู้ใช้และทัศนศิลป์ความสวยงามบนหน้าจอผ่านด่านวิชาการ 4 ระดับ"
              levels={quizLevels}
              accentColor="from-fuchsia-500/20 to-rose-500/10"
              icon={<Sparkles className="w-6 h-6 text-fuchsia-400" />}
            />
          </div>
        </section>

        {/* ─── Layer 4: Standardized TeacherTask Footer ─── */}
        <TeacherTask 
          title="ใบงานกิจกรรมปฏิบัติการ หน่วยที่ 1.1: การวิเคราะห์และเปรียบเทียบ UX/UI ในผลิตภัณฑ์ดิจิทัล"
          taskText={teacherTaskContent}
        />

      </main>
    </div>
  );
}
