import React, { useState } from 'react';
import { 
  Frown, 
  Smile, 
  Info,
  Lightbulb,
  AlertTriangle,
  Compass,
  Code,
  Eye,
  Workflow,
  Share2,
  Bookmark
} from 'lucide-react';
import { SimulatorShell, ConceptCard, AmbientBackdrop, QuizEngine, SectionBlock } from '../shared';

// ── Accent Theme Colors ──────────────────────────────────────────────────────
const EXPLORER_BLOBS = [
  { color: 'bg-indigo-500', size: 'w-80 h-80', top: '-10%', left: '-15%', delay: '0s' },
  { color: 'bg-cyan-500', size: 'w-72 h-72', bottom: '-20%', right: '-10%', delay: '3s' },
];

export default function OOAD2_5() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // all, classes, relationships, visibility

  // ── Database elements info for explorer ──────────────────────────────────
  const elementsInfo = {
    // Classes
    class_request: {
      id: 'class_request',
      type: 'class',
      title: 'คลาส: LoginRequest',
      en: 'Data Transfer Object Class',
      desc: 'คลาสปกติทำหน้าที่เป็น Data Transfer Object (DTO) เพื่อห่อหุ้มและส่งข้อมูลการเข้าสู่ระบบที่ผู้ใช้ป้อนเข้ามา (Username และ Password) ไปประมวลผลต่อ',
      context: 'เก็บข้อมูลฟิลด์ Username และ Password เป็นแบบ public เพื่อให้ผู้ประมวลผลเข้าถึงข้อมูลได้ง่าย',
      code: `public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}`,
      rule: 'คลาสประเภทข้อมูล (DTO) มักมีเฉพาะ Fields/Properties และไม่มีพฤติกรรม (Methods) ซับซ้อน',
      accent: 'indigo'
    },
    class_handler: {
      id: 'class_handler',
      type: 'class',
      title: 'คลาส: LoginHandler',
      en: 'Process Handler Class',
      desc: 'คลาสหลักที่ทำหน้าที่ควบคุมตรรกะการตรวจสอบสิทธิ์การเข้าสู่ระบบ (CheckLogin) และนับจำนวนครั้งที่ล็อกอินล้มเหลว',
      context: 'เรียกใช้ LoginLogger เพื่อบันทึกประวัติ และมีฟิลด์เก็บสถิติล็อกอินล้มเหลวเป็นแบบ private',
      code: `public class LoginHandler
{
    protected LoginLogger log;
    private int loggedInFailureCount;

    public virtual bool CheckLogin(LoginRequest req)
    {
        // ตรรกะตรวจสอบข้อมูลเข้าสู่ระบบ
    }

    public int LoggedInFailureCount()
    {
        return loggedInFailureCount;
    }
}`,
      rule: 'ชื่อเมธอดควรขึ้นต้นด้วยคำกริยา และหากต้องการให้คลาสลูกเขียนทับตรรกะได้ใน C# ควรประกาศเป็น virtual',
      accent: 'indigo'
    },
    class_advanced_handler: {
      id: 'class_advanced_handler',
      type: 'class',
      title: 'คลาสจำลองแบบแอบสแตรกต์: AdvancedLoginHandler',
      en: 'Abstract Class',
      desc: 'คลาสที่เป็นโครงร่างแม่แบบ (Abstract Class) ไม่สามารถนำไปสร้างอ็อบเจกต์ได้โดยตรง ออกแบบมาเพื่อให้คลาสลูกสืบทอดและนำไปเติมเต็มการทำงานขั้นสูงเอง',
      context: 'สืบทอดตรรกะหลักจาก LoginHandler และเพิ่มเมธอดแอบสแตรกต์ ValidateSpecification สำหรับคลาสลูกแยกไปเขียนตรรกะตรวจสอบความปลอดภัยเพิ่มเติม',
      code: `public abstract class AdvancedLoginHandler : LoginHandler
{
    public override bool CheckLogin(LoginRequest req)
    {
        return base.CheckLogin(req) && ValidateSpecification(req.Username);
    }

    public abstract bool ValidateSpecification(string username);
}`,
      rule: 'ในแผนภาพ UML ชื่อคลาสแอบสแตรกต์และเมธอดแอบสแตรกต์จะถูกเขียนด้วย ตัวอักษรเอียง เสมอ หรือใส่คำกำกับ <<abstract>> ไว้',
      accent: 'indigo'
    },
    class_logger: {
      id: 'class_logger',
      type: 'class',
      title: 'คลาส: LoginLogger',
      en: 'Utility Logger Class',
      desc: 'คลาสทำหน้าที่บันทึกประวัติการเข้าใช้งานระบบลงในฐานข้อมูลเมื่อเข้าสู่ระบบสำเร็จ',
      context: 'ทำหน้าที่เก็บและส่งอ็อบเจกต์ฐานข้อมูลไปเรียกคำสั่งบันทึกประวัติการเข้าสู่ระบบ',
      code: `public class LoginLogger
{
    private SqlDatabase sqlDb;

    public void LoginSuccess(string username, DateTime timeStamp)
    {
        sqlDb.InsertLoginLog(username, timeStamp);
      // หรือเรียกใช้งานผ่าน Interface: db.InsertLoginLog(...)
    }
}`,
      rule: 'การแยกคลาส Logger ออกจากคลาสตรวจสอบสิทธิ์หลัก ช่วยทำตามหลัก Single Responsibility Principle (SRP)',
      accent: 'indigo'
    },
    interface_database: {
      id: 'interface_database',
      type: 'class',
      title: 'อินเตอร์เฟส: IDatabase',
      en: 'Interface Class',
      desc: 'คลาสอินเตอร์เฟส (Interface) ที่กำหนดข้อตกลง (Contract) หรือลายเซ็นของเมธอดไว้เท่านั้น โดยไม่มีการลงมือเขียนโค้ดตรรกะการทำงานจริงภายใน',
      context: 'กำหนดว่าฐานข้อมูลใดๆ ที่จะนำมาเชื่อมต่อบันทึกประวัติระบบ จะต้องมีเมธอด InsertLoginLog เสมอ',
      code: `public interface IDatabase
{
    void InsertLoginLog(string username, DateTime timeStamp);
}`,
      rule: 'ในแผนภาพ UML จะใช้สัญลักษณ์คำกำกับ <<interface>> ไว้เหนือชื่ออินเตอร์เฟส และเมธอดทั้งหมดจะเป็นแบบสาธารณะ (public) เสมอ',
      accent: 'indigo'
    },
    class_sqldatabase: {
      id: 'class_sqldatabase',
      type: 'class',
      title: 'คลาส: SqlDatabase',
      en: 'Concrete Class (Implementer)',
      desc: 'คลาสใช้งานจริง (Concrete Class) ที่นำเอาอินเตอร์เฟส IDatabase มาพัฒนาตรรกะการทำงานบันทึกข้อมูลเข้าสู่ฐานข้อมูล SQL Server จริง',
      context: 'ลงมือประมวลผลจัดเก็บข้อมูล SQL และสืบทอดข้อตกลงจาก IDatabase',
      code: `public class SqlDatabase : IDatabase
{
    public void InsertLoginLog(string username, DateTime timeStamp)
    {
        // ตรรกะเขียนคำสั่ง INSERT ข้อมูลลงฐานข้อมูล SQL จริง
    }
}`,
      rule: 'คลาสที่ตกลงว่าจะใช้ Interface จะต้องเขียนเมธอดตามข้อตกลงนั้นให้ครบทุกตัว ห้ามละเว้นเด็ดขาด',
      accent: 'indigo'
    },

    // Relationships
    rel_composition: {
      id: 'rel_composition',
      type: 'relationship',
      title: 'ความสัมพันธ์: Composition (การประกอบรวมเด็ดขาด)',
      en: 'Composition Relationship',
      desc: 'ความสัมพันธ์ที่คลาสหนึ่งเป็นส่วนประกอบสำคัญที่เป็นความตายร่วมกันของอีกคลาสหนึ่ง (ตายยกรัง) เมื่อวัตถุหลัก (Container) ถูกทำลาย วัตถุย่อยที่เป็นส่วนประกอบก็จะถูกทำลายตามไปด้วยทันที',
      context: 'LoginHandler ประกอบด้วย LoginLogger (หัวลูกศรเป็นรูปสี่เหลี่ยมข้าวหลามตัดทึบสีดำ ชี้หา LoginHandler)',
      code: `// LoginLogger จะถูกสร้างและผูกตายไปพร้อมกับ LoginHandler เสมอ
public class LoginHandler {
    protected LoginLogger log = new LoginLogger();
}`,
      rule: 'Composition คือการผูกติดอายุขัยอ็อบเจกต์ร่วมกัน (หัว Diamond ทึบชี้หาผู้เป็นเจ้าของ)',
      accent: 'violet'
    },
    rel_aggregation: {
      id: 'rel_aggregation',
      type: 'relationship',
      title: 'ความสัมพันธ์: Aggregation (การรวมกลุ่มชั่วคราว)',
      en: 'Aggregation Relationship',
      desc: 'ความสัมพันธ์แบบส่วนหนึ่งและส่วนประกอบที่อ็อบเจกต์ลูกสามารถแยกใช้ต่างหากได้อย่างอิสระ (ตายเดี่ยว) เมื่อวัตถุหลักที่เป็นเจ้าของถูกทำลาย อ็อบเจกต์ประกอบยังคงสามารถมีชีวิตอยู่ต่อไปได้',
      context: 'LoginLogger อ้างอิง SqlDatabase (หัวลูกศรเป็นรูปสี่เหลี่ยมข้าวหลามตัดโปร่งสีขาว ชี้หา LoginLogger)',
      code: `// SqlDatabase สามารถถูกส่งเข้ามาจากภายนอกได้ และยังคงอยู่แม้ Logger จะถูกทำลาย
public class LoginLogger {
    private SqlDatabase sqlDb;
    public LoginLogger(SqlDatabase db) {
        this.sqlDb = db;
    }
}`,
      rule: 'Aggregation บ่งบอกว่าวัตถุลูกสามารถไปแชร์ใช้งานกับวัตถุอื่นๆ ในระบบได้ (หัว Diamond โปร่งชี้หาผู้เป็นเจ้าของ)',
      accent: 'violet'
    },
    rel_generalization: {
      id: 'rel_generalization',
      type: 'relationship',
      title: 'ความสัมพันธ์: Generalization (การสืบทอดคลาส)',
      en: 'Generalization / Inheritance',
      desc: 'ความสัมพันธ์บอกว่าคลาสลูก (Sub class) สืบทอดโครงสร้าง แอตทริบิวต์ และเมธอดทั้งหมดไปใช้งานจากคลาสแม่ (Base class) เพื่อต่อยอดการทำงาน',
      context: 'AdvancedLoginHandler สืบทอดมาจาก LoginHandler (แสดงด้วยเส้นทึบหัวลูกศรสามเหลี่ยมปิดโปร่ง ชี้หาคลาสแม่)',
      code: `// ใช้เครื่องหมายสัญลักษณ์โคลอน (:) ใน C# หรือ extends ใน Java
public abstract class AdvancedLoginHandler : LoginHandler
{
    // สืบทอดฟิลด์ log, loggedInFailureCount และเมธอดทั้งหมดมาทันที
}`,
      rule: 'หลีกเลี่ยงการสืบทอดซ้อนกันหลายๆ ชั้นจนเกิดความยุ่งเหยิง (Deep Inheritance Trees)',
      accent: 'violet'
    },
    rel_realization: {
      id: 'rel_realization',
      type: 'relationship',
      title: 'ความสัมพันธ์: Realization (การนำข้อตกลงไปใช้)',
      en: 'Realization / Implements',
      desc: 'ความสัมพันธ์ที่ระบุว่าคลาสธรรมดาเป็นผู้นำข้อตกลงของคลาสอินเตอร์เฟส (Interface) ไปลงมือพัฒนาตรรกะด้านในให้ใช้งานได้จริง',
      context: 'SqlDatabase ทำการพัฒนาเมธอดตามที่กำหนดไว้ในอินเตอร์เฟส IDatabase (แสดงด้วยเส้นประหัวลูกศรสามเหลี่ยมปิดโปร่ง ชี้หาอินเตอร์เฟส)',
      code: `// คลาสใช้งานจริงระบุการสืบทอด Interface ใน C#
public class SqlDatabase : IDatabase
{
    // ต้องพัฒนาเมธอดตามโครงสร้าง IDatabase ทุกตัว
}`,
      rule: 'Realization ช่วยสร้างสถาปัตยกรรมระบบที่ยืดหยุ่น หลวม (Loose Coupling) ถอดเปลี่ยนฐานข้อมูลได้ง่าย',
      accent: 'violet'
    },
    rel_dependency: {
      id: 'rel_dependency',
      type: 'relationship',
      title: 'ความสัมพันธ์: Dependency (การพึ่งพาชั่วคราว)',
      en: 'Dependency Relationship',
      desc: 'ความสัมพันธ์แบบชั่วคราวระบุว่าคลาสหลักจำเป็นต้องเรียกใช้ ใช้เป็นพารามิเตอร์ หรือใช้เป็นตัวแปรท้องถิ่นชั่วคราวของอีกคลาสหนึ่ง แล้วก็แยกจากกันไปโดยไม่ได้จัดเก็บในตัวแปรฟิลด์หลักอย่างถาวร',
      context: 'LoginHandler พึ่งพาการรับส่งข้อมูลของ LoginRequest ในเมธอด CheckLogin (แสดงด้วยเส้นประหัวลูกศรเปิดปกติ ชี้หาตัวที่ถูกเรียกใช้)',
      code: `public class LoginHandler {
    public bool CheckLogin(LoginRequest req) // เข้ามาทำงานแล้วจบลงไป
    {
        return req.Username == "admin";
    }
}`,
      rule: 'แสดงความเป็นอิสระระหว่างคลาสสูงที่สุดในกลุ่มความสัมพันธ์ (ชี้หาตัวแปร Parameter เสมอ)',
      accent: 'violet'
    },

    // Visibilities
    vis_public: {
      id: 'vis_public',
      type: 'visibility',
      title: 'เครื่องหมายเข้าถึง: + (Public)',
      en: 'Public Modifier',
      desc: 'สัญกรณ์เครื่องหมายบวก (+) บ่งบอกว่าสมาชิกตัวแปรหรือเมธอดนั้นเป็นแบบสาธารณะ สามารถเข้าใช้งานหรืออ่านข้อมูลได้จากภายนอกคลาสได้อย่างอิสระเสรี',
      context: 'Properties ใน LoginRequest เช่น + Username: string และ + Password: string',
      rule: 'ควรตั้งค่าตัวแปรข้อมูลฟิลด์ให้เป็น private แล้วเปิดช่องทางเข้าถึงแบบ public ผ่าน Getter/Setter หรือ Properties เพื่อควบคุมความปลอดภัยข้อมูล',
      accent: 'cyan'
    },
    vis_private: {
      id: 'vis_private',
      type: 'visibility',
      title: 'เครื่องหมายเข้าถึง: - (Private)',
      en: 'Private Modifier',
      desc: 'สัญกรณ์เครื่องหมายลบ (-) บ่งบอกว่าสมาชิกนั้นเป็นส่วนตัวอย่างสูงสุด สามารถใช้งานและอ่านค่าได้เฉพาะอ็อบเจกต์ภายในคลาสเดียวกันเท่านั้น ภายนอกรวมถึงคลาสลูกไม่สามารถมองเห็นหรือแก้ไขได้',
      context: 'ตัวแปรฟิลด์ - loggedInFailureCount: int ใน LoginHandler และ - sqlDb: SqlDatabase ใน LoginLogger',
      rule: 'กฎเหล็กของ Encapsulation: ข้อมูลสมาชิกส่วนใหญ่ในคลาสควรถูกตั้งค่าความปลอดภัยเป็น Private เสมอ',
      accent: 'cyan'
    },
    vis_protected: {
      id: 'vis_protected',
      type: 'visibility',
      title: 'เครื่องหมายเข้าถึง: # (Protected)',
      en: 'Protected Modifier',
      desc: 'สัญกรณ์เครื่องหมายสี่เหลี่ยม (#) บ่งบอกว่าสมาชิกนั้นสามารถเข้าถึงและใช้งานได้เฉพาะในคลาสตัวเอง และคลาสลูก (Sub classes) ที่ทำการสืบทอดออกไปเท่านั้น',
      context: 'ตัวแปรอ้างอิง # log: LoginLogger ในคลาสหลัก LoginHandler (เพื่อให้อำนาจ AdvancedLoginHandler ที่เป็นคลาสลูกนำไปสั่งประมวลผล Logger ได้)',
      rule: 'มีประโยชน์อย่างมากในระบบการสืบทอดเชิงวัตถุ แต่โปรดใช้ระวังเพราะจะทำให้การเปลี่ยนแปลงคลาสแม่ส่งผลกระทบต่อคลาสลูกได้ง่าย',
      accent: 'cyan'
    }
  };

  const getElementDetails = () => {
    const activeId = selectedElement || hoveredElement;
    return activeId ? elementsInfo[activeId] : null;
  };

  const isFiltered = (elementId) => {
    if (activeFilter === 'all') return true;
    const info = elementsInfo[elementId];
    if (!info) return false;

    if (activeFilter === 'classes') return info.type === 'class';
    if (activeFilter === 'relationships') return info.type === 'relationship';
    if (activeFilter === 'visibility') return info.type === 'visibility';
    return true;
  };

  const isSelectedOrHovered = (id) => {
    return selectedElement === id || hoveredElement === id;
  };

  const details = getElementDetails();

  // ── Quiz Configuration ─────────────────────────────────────────────────────
  const quizQuestions = [
    {
      id: 1,
      question: 'หากคลาส Car มีความสัมพันธ์กับ Engine แบบที่ "ถ้าทุบรถคันนี้ทิ้ง เครื่องยนต์จะโดนทำลายไปด้วยกันทันที (ตายยกรัง)" ความสัมพันธ์นี้เป็นแบบใดและใช้สัญลักษณ์อะไร?',
      options: [
        { id: 'a', text: 'Aggregation — หัว Diamond ทึบสีดำ' },
        { id: 'b', text: '(Recommended) Composition — หัว Diamond ทึบสีดำชี้หาคลาส Car' },
        { id: 'c', text: 'Composition — หัว Diamond โปร่งสีขาวชี้หาคลาส Engine' },
        { id: 'd', text: 'Generalization — หัวสามเหลี่ยมทึบสีดำ' }
      ],
      correctAnswerId: 'b',
      explanation: 'ความสัมพันธ์แบบผูกติดช่วงอายุร่วมกันคือ Composition (เกิดดับพร้อมกัน) ใช้สัญลักษณ์หัว Diamond ทึบสีดำ ชี้หาคลาสผู้เป็นเจ้าของ (Car)'
    },
    {
      id: 2,
      question: 'ในแผนภาพ Class Diagram ตัวแปรหรือคุณสมบัติที่นำหน้าด้วยเครื่องหมายลบ (-) เช่น "- age: int" หมายความว่าอย่างไร?',
      options: [
        { id: 'a', text: 'ตัวแปรแบบสาธารณะ (public) สามารถเข้าถึงจากที่ใดก็ได้' },
        { id: 'b', text: 'ตัวแปรห้ามใช้งานเด็ดขาดในระบบโปรแกรม' },
        { id: 'c', text: 'ตัวแปรแบบ protected สามารถมองเห็นได้เฉพาะคลาสลูก' },
        { id: 'd', text: '(Recommended) ตัวแปรแบบส่วนตัว (private) สามารถอ่านและแก้ไขได้เฉพาะอ็อบเจกต์ภายในคลาสเดียวกันเท่านั้น' }
      ],
      correctAnswerId: 'd',
      explanation: 'เครื่องหมายลบ (-) ในสัญกรณ์ UML Visibility หมายถึงระดับความปลอดภัยเป็น Private (ส่วนตัวเข้าถึงได้แค่ในคลาสเดียวกัน)'
    },
    {
      id: 3,
      question: 'หากมีเมธอด "public void Process(User u)" ที่ต้องการดึงข้อมูลมาใช้งานชั่วคราวแล้วส่งผลลัพธ์ผ่านไป โดยไม่ได้เก็บตัวแปรอ็อบเจกต์ u ไว้ในคลาสอย่างถาวร ความสัมพันธ์ของคลาสนี้กับ User คือแบบใด?',
      options: [
        { id: 'a', text: 'Composition' },
        { id: 'b', text: 'Aggregation' },
        { id: 'c', text: '(Recommended) Dependency (เส้นประหัวลูกศรเปิด)' },
        { id: 'd', text: 'Realization (เส้นประหัวสามเหลี่ยมโปร่ง)' }
      ],
      correctAnswerId: 'c',
      explanation: 'การพึ่งพาตัวแปรชั่วคราวผ่านพารามิเตอร์ของเมธอด จัดเป็นความสัมพันธ์แบบ Dependency (พึ่งพาชั่วคราว) โดยเขียนเส้นประหัวลูกศรชี้ไปยังคลาสที่พึ่งพา'
    }
  ];

  return (
    <div className="font-sans text-slate-900 pb-20 relative min-h-screen bg-slate-50/50">
      
      {/* ── Layer 1: Ambient Backdrop blobs ── */}
      <AmbientBackdrop blobs={EXPLORER_BLOBS} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 pt-6 space-y-12 md:space-y-16">
        
        {/* =========================================================================
            ปัญหา และ วิธีแก้ปัญหา
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ปัญหา */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-rose-50/80 text-rose-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                <Frown className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-zinc-900 leading-snug">ปัญหาของการหลงทางโครงสร้างคลาส</h4>
                <p className="text-[15px] text-slate-500 leading-relaxed">
                  เวลาทำงานโปรเจกต์ขนาดใหญ่ที่มีตรรกะเชิงวัตถุซับซ้อน บ่อยครั้งที่โปรแกรมเมอร์ในทีมจะตกลงตรรกะการเชื่อมโยงคลาสไว้อย่างหนึ่ง แต่ลงมือเขียนออกมาได้คลาสที่มีระดับการทำงานผูกมัดหรือเรียกใช้งานขัดแย้งกับข้อกำหนด
                </p>
                <div className="mt-3 bg-rose-50/50 border border-rose-100 rounded-xl p-3 text-[13px] text-rose-800 leading-relaxed">
                  <strong>เช่น:</strong> การผูกมัดคลาสจนแก้ไขโค้ดได้ยาก หรือตั้งสิทธิ์ Visibility ผิดจนข้อมูลรั่วไหลและแก้ไขโครงสร้างไม่ได้
                </div>
              </div>
            </div>
          </div>

          {/* วิธีแก้ปัญหา */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-teal-50/80 text-teal-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0">
                <Smile className="w-6 h-6 transition-transform group-hover:rotate-12 duration-300" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-zinc-900 leading-snug">แก้ไขด้วย Class Diagram</h4>
                <p className="text-[15px] text-slate-500 leading-relaxed">
                  ใช้แผนผังแบบสัญกรณ์มาตรฐานสากล **Class Diagram** เพื่อจำลองโครงสร้างคงที่ของคลาส ข้อมูลสมาชิก และตรรกะการเรียกใช้งานร่วมกัน เพื่อให้ทุกคนในทีมและผู้ออกแบบเห็นสถาปัตยกรรมทางกายภาพตรงกัน
                </p>
                <div className="mt-3 bg-teal-50/50 border border-teal-100 rounded-xl p-3 text-[13px] text-teal-800 leading-relaxed">
                  <strong>ประโยชน์:</strong> ช่วยวางตรรกะและวิเคราะห์คู่สีความสำคัญระดับ Visibility ได้ล่วงหน้าก่อนการเสียแรงเขียนโค้ดจริง
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            UML INTERACTIVE EXPLORER (DIAGRAM + SIDE DETAIL PANEL)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              UML Interactive Explorer
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              เครื่องมือวิเคราะห์แผนภาพคลาส (Login Flow Class Diagram)
            </h3>
          </div>

          {/* Categories Filters Toolbar */}
          <div className="flex flex-wrap gap-2 items-center bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50 max-w-fit shadow-sm relative z-20">
            {[
              { id: 'all', label: 'ทั้งหมด' },
              { id: 'classes', label: 'คลาสและอินเตอร์เฟส (Class/Interface)' },
              { id: 'relationships', label: 'ความสัมพันธ์ (Relationship)' },
              { id: 'visibility', label: 'การเข้าถึง (Visibility)' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setActiveFilter(btn.id);
                  setSelectedElement(null); 
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeFilter === btn.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Main Explorer Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SVG Canvas Component (cols-8) */}
            <div className="lg:col-span-8 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-3 right-4 font-mono text-[9px] text-slate-500 font-bold tracking-widest pointer-events-none">
                CLASS DIAGRAM CANVAS
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:25px_25px] opacity-15 pointer-events-none"></div>
              
              <div className="relative z-10 w-full overflow-x-auto">
                <svg viewBox="0 0 820 540" className="w-full min-w-[760px] h-auto drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  
                  {/* Defs for arrowheads and markers */}
                  <defs>
                    {/* Generalization arrowhead (Hollow triangle solid line) */}
                    <marker id="triangle-hollow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 Z" fill="#0f172a" stroke="#a78bfa" strokeWidth="1.5" />
                    </marker>
                    {/* Dependency arrowhead (Open arrow, dashed line) */}
                    <marker id="arrow-open" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                    </marker>
                    {/* Solid diamond for Composition */}
                    <marker id="diamond-solid" viewBox="0 0 12 12" refX="0" refY="6" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M 0 6 L 6 11 L 12 6 L 6 1 Z" fill="#a78bfa" stroke="#a78bfa" strokeWidth="1" />
                    </marker>
                    {/* Hollow diamond for Aggregation */}
                    <marker id="diamond-hollow" viewBox="0 0 12 12" refX="0" refY="6" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                      <path d="M 0 6 L 6 11 L 12 6 L 6 1 Z" fill="#0f172a" stroke="#a78bfa" strokeWidth="1.5" />
                    </marker>
                  </defs>

                  {/* ──────────────────────────────────────────────────────────
                      CLASSES (กล่องคลาสข้อมูล)
                      ────────────────────────────────────────────────────────── */}

                  {/* Class 1: LoginRequest (Row 1 Left) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'class_request' ? null : 'class_request')}
                    onMouseEnter={() => setHoveredElement('class_request')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('class_request') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    <rect x="30" y="40" width="160" height="110" rx="8" fill="#1e293b" stroke={isSelectedOrHovered('class_request') ? '#6366f1' : '#475569'} strokeWidth={isSelectedOrHovered('class_request') ? '2.5' : '1.5'} />
                    {/* Title */}
                    <text x="110" y="62" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">LoginRequest</text>
                    <line x1="30" y1="72" x2="190" y2="72" stroke="#475569" strokeWidth="1.5" />
                    {/* Fields */}
                    <text x="38" y="90" fill="#22d3ee" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-cyan-400 font-extrabold shadow-sm' : ''}`}>+</text>
                    <text x="50" y="90" fill="#cbd5e1" fontSize="10.5">Username: string</text>
                    <text x="38" y="108" fill="#22d3ee" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-cyan-400 font-extrabold shadow-sm' : ''}`}>+</text>
                    <text x="50" y="108" fill="#cbd5e1" fontSize="10.5">Password: string</text>
                    <line x1="30" y1="116" x2="190" y2="116" stroke="#475569" strokeWidth="1.5" />
                    {/* Methods (none) */}
                    <text x="110" y="134" fill="#64748b" fontSize="10" fontStyle="italic" textAnchor="middle">no methods</text>
                  </g>

                  {/* Class 2: LoginHandler (Row 1 Center) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'class_handler' ? null : 'class_handler')}
                    onMouseEnter={() => setHoveredElement('class_handler')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('class_handler') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    <rect x="290" y="40" width="220" height="135" rx="8" fill="#1e293b" stroke={isSelectedOrHovered('class_handler') ? '#6366f1' : '#475569'} strokeWidth={isSelectedOrHovered('class_handler') ? '2.5' : '1.5'} />
                    {/* Title */}
                    <text x="400" y="62" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">LoginHandler</text>
                    <line x1="290" y1="72" x2="510" y2="72" stroke="#475569" strokeWidth="1.5" />
                    {/* Fields */}
                    <text x="298" y="90" fill="#fb7185" fontSize="11.5" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-rose-400 font-extrabold shadow-sm' : ''}`}>#</text>
                    <text x="310" y="90" fill="#cbd5e1" fontSize="10.5">log: LoginLogger</text>
                    <text x="298" y="108" fill="#f43f5e" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-red-400 font-extrabold shadow-sm' : ''}`}>-</text>
                    <text x="310" y="108" fill="#cbd5e1" fontSize="10.5">loggedInFailureCount: int</text>
                    <line x1="290" y1="116" x2="510" y2="116" stroke="#475569" strokeWidth="1.5" />
                    {/* Methods */}
                    <text x="298" y="132" fill="#22d3ee" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-cyan-400 font-extrabold shadow-sm' : ''}`}>+</text>
                    <text x="310" y="132" fill="#93c5fd" fontSize="10.5" fontWeight="semibold">CheckLogin(req): bool</text>
                    <text x="298" y="150" fill="#22d3ee" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-cyan-400 font-extrabold shadow-sm' : ''}`}>+</text>
                    <text x="310" y="150" fill="#cbd5e1" fontSize="10.5">LoggedInFailureCount(): int</text>
                  </g>

                  {/* Class 3: AdvancedLoginHandler (Row 2 Center - Abstract) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'class_advanced_handler' ? null : 'class_advanced_handler')}
                    onMouseEnter={() => setHoveredElement('class_advanced_handler')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('class_advanced_handler') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    <rect x="290" y="270" width="220" height="110" rx="8" fill="#1e293b" stroke={isSelectedOrHovered('class_advanced_handler') ? '#6366f1' : '#475569'} strokeWidth={isSelectedOrHovered('class_advanced_handler') ? '2.5' : '1.5'} />
                    {/* Title */}
                    <text x="400" y="286" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">&lt;&lt;abstract&gt;&gt;</text>
                    <text x="400" y="300" fill="#f8fafc" fontSize="12" fontWeight="bold" fontStyle="italic" textAnchor="middle">AdvancedLoginHandler</text>
                    <line x1="290" y1="308" x2="510" y2="308" stroke="#475569" strokeWidth="1.5" />
                    {/* Fields (none) */}
                    <line x1="290" y1="322" x2="510" y2="322" stroke="#475569" strokeWidth="1.5" />
                    {/* Methods */}
                    <text x="298" y="340" fill="#22d3ee" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-cyan-400 font-extrabold shadow-sm' : ''}`}>+</text>
                    <text x="310" y="340" fill="#cbd5e1" fontSize="10.5">CheckLogin(req): bool</text>
                    <text x="298" y="358" fill="#22d3ee" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-cyan-400 font-extrabold shadow-sm' : ''}`}>+</text>
                    <text x="310" y="358" fill="#93c5fd" fontSize="10.5" fontStyle="italic">ValidateSpec(user): bool</text>
                  </g>

                  {/* Class 4: LoginLogger (Row 1 Right) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'class_logger' ? null : 'class_logger')}
                    onMouseEnter={() => setHoveredElement('class_logger')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('class_logger') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    <rect x="580" y="40" width="200" height="110" rx="8" fill="#1e293b" stroke={isSelectedOrHovered('class_logger') ? '#6366f1' : '#475569'} strokeWidth={isSelectedOrHovered('class_logger') ? '2.5' : '1.5'} />
                    {/* Title */}
                    <text x="680" y="62" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">LoginLogger</text>
                    <line x1="580" y1="72" x2="780" y2="72" stroke="#475569" strokeWidth="1.5" />
                    {/* Fields */}
                    <text x="588" y="90" fill="#f43f5e" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-red-400 font-extrabold shadow-sm' : ''}`}>-</text>
                    <text x="600" y="90" fill="#cbd5e1" fontSize="10.5">sqlDb: SqlDatabase</text>
                    <line x1="580" y1="100" x2="780" y2="100" stroke="#475569" strokeWidth="1.5" />
                    {/* Methods */}
                    <text x="588" y="120" fill="#22d3ee" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-cyan-400 font-extrabold shadow-sm' : ''}`}>+</text>
                    <text x="600" y="120" fill="#cbd5e1" fontSize="10.5">LoginSuccess(user, time)</text>
                  </g>

                  {/* Class 5: IDatabase (Row 2 Right - Interface) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'interface_database' ? null : 'interface_database')}
                    onMouseEnter={() => setHoveredElement('interface_database')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('interface_database') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    <rect x="580" y="210" width="200" height="90" rx="8" fill="#1e293b" stroke={isSelectedOrHovered('interface_database') ? '#6366f1' : '#475569'} strokeWidth={isSelectedOrHovered('interface_database') ? '2.5' : '1.5'} />
                    {/* Title */}
                    <text x="680" y="226" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">&lt;&lt;interface&gt;&gt;</text>
                    <text x="680" y="240" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">IDatabase</text>
                    <line x1="580" y1="248" x2="780" y2="248" stroke="#475569" strokeWidth="1.5" />
                    {/* Fields (none) */}
                    {/* Methods */}
                    <text x="588" y="268" fill="#22d3ee" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-cyan-400 font-extrabold shadow-sm' : ''}`}>+</text>
                    <text x="600" y="268" fill="#cbd5e1" fontSize="10.5">InsertLoginLog(user, time)</text>
                  </g>

                  {/* Class 6: SqlDatabase (Row 3 Right) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'class_sqldatabase' ? null : 'class_sqldatabase')}
                    onMouseEnter={() => setHoveredElement('class_sqldatabase')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('class_sqldatabase') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    <rect x="580" y="370" width="200" height="110" rx="8" fill="#1e293b" stroke={isSelectedOrHovered('class_sqldatabase') ? '#6366f1' : '#475569'} strokeWidth={isSelectedOrHovered('class_sqldatabase') ? '2.5' : '1.5'} />
                    {/* Title */}
                    <text x="680" y="392" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">SqlDatabase</text>
                    <line x1="580" y1="402" x2="780" y2="402" stroke="#475569" strokeWidth="1.5" />
                    {/* Fields (none) */}
                    <line x1="580" y1="416" x2="780" y2="416" stroke="#475569" strokeWidth="1.5" />
                    {/* Methods */}
                    <text x="588" y="438" fill="#22d3ee" fontSize="11" fontWeight="bold" className={`transition-all duration-300 ${activeFilter === 'visibility' ? 'fill-cyan-400 font-extrabold shadow-sm' : ''}`}>+</text>
                    <text x="600" y="438" fill="#cbd5e1" fontSize="10.5">InsertLoginLog(user, time)</text>
                  </g>

                  {/* ──────────────────────────────────────────────────────────
                      RELATIONSHIPS (เส้นความสัมพันธ์)
                      ────────────────────────────────────────────────────────── */}

                  {/* Rel 1: Dependency (LoginHandler -> LoginRequest) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'rel_dependency' ? null : 'rel_dependency')}
                    onMouseEnter={() => setHoveredElement('rel_dependency')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('rel_dependency') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    <path 
                      d="M 290,105 L 202,105" 
                      stroke={isSelectedOrHovered('rel_dependency') ? '#22d3ee' : '#475569'} 
                      strokeWidth={isSelectedOrHovered('rel_dependency') ? '3.5' : '1.5'} 
                      strokeDasharray="4,4" 
                      markerEnd="url(#arrow-open)"
                      fill="none"
                      className="transition-all duration-300"
                    />
                    <text x="245" y="96" fill={isSelectedOrHovered('rel_dependency') ? '#22d3ee' : '#64748b'} fontSize="9.5" fontWeight="bold" textAnchor="middle">uses</text>
                  </g>

                  {/* Rel 2: Composition (LoginHandler has LoginLogger) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'rel_composition' ? null : 'rel_composition')}
                    onMouseEnter={() => setHoveredElement('rel_composition')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('rel_composition') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    {/* Solid line, Diamond on LoginHandler side */}
                    <path 
                      d="M 580,95 L 522,95" 
                      stroke={isSelectedOrHovered('rel_composition') ? '#a78bfa' : '#475569'} 
                      strokeWidth={isSelectedOrHovered('rel_composition') ? '3.5' : '1.5'} 
                      markerStart="url(#diamond-solid)"
                      fill="none"
                      className="transition-all duration-300"
                    />
                  </g>

                  {/* Rel 3: Aggregation (LoginLogger has SqlDatabase) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'rel_aggregation' ? null : 'rel_aggregation')}
                    onMouseEnter={() => setHoveredElement('rel_aggregation')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('rel_aggregation') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    {/* Aggregation curve to pass IDatabase. Let's draw it from LoginLogger's right side, down and in to SqlDatabase */}
                    <path 
                      d="M 780,95 H 800 V 425 H 780" 
                      stroke={isSelectedOrHovered('rel_aggregation') ? '#a78bfa' : '#475569'} 
                      strokeWidth={isSelectedOrHovered('rel_aggregation') ? '3.5' : '1.5'} 
                      markerStart="url(#diamond-hollow)"
                      fill="none"
                      className="transition-all duration-300"
                    />
                  </g>

                  {/* Rel 4: Generalization (AdvancedLoginHandler -> LoginHandler) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'rel_generalization' ? null : 'rel_generalization')}
                    onMouseEnter={() => setHoveredElement('rel_generalization')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('rel_generalization') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    <path 
                      d="M 400,270 L 400,185" 
                      stroke={isSelectedOrHovered('rel_generalization') ? '#a78bfa' : '#cbd5e1'} 
                      strokeWidth={isSelectedOrHovered('rel_generalization') ? '3.5' : '1.5'} 
                      markerEnd="url(#triangle-hollow)"
                      fill="none"
                      className="transition-all duration-300"
                    />
                  </g>

                  {/* Rel 5: Realization (SqlDatabase implements IDatabase) */}
                  <g 
                    onClick={() => setSelectedElement(selectedElement === 'rel_realization' ? null : 'rel_realization')}
                    onMouseEnter={() => setHoveredElement('rel_realization')}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`cursor-pointer transition-all duration-300 ${isFiltered('rel_realization') ? 'opacity-100' : 'opacity-25'}`}
                  >
                    <path 
                      d="M 680,370 L 680,310" 
                      stroke={isSelectedOrHovered('rel_realization') ? '#a78bfa' : '#cbd5e1'} 
                      strokeWidth={isSelectedOrHovered('rel_realization') ? '3.5' : '1.5'} 
                      strokeDasharray="4,4"
                      markerEnd="url(#triangle-hollow)"
                      fill="none"
                      className="transition-all duration-300"
                    />
                  </g>

                </svg>
              </div>

              {/* Instructions and status */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
                  คลิกที่วัตถุคลาสหรือเส้นความสัมพันธ์บนแคนวาสเพื่ออ่านสเปคและตัวอย่างโค้ด C#
                </span>
                {activeFilter !== 'all' && (
                  <span>
                    กำลังกรอง: <strong className="text-indigo-400">{activeFilter === 'classes' ? 'Class' : activeFilter === 'relationships' ? 'ความสัมพันธ์' : 'Visibility'}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Elements Details Info Panel (cols-4) */}
            <div className="lg:col-span-4 h-full">
              {details ? (
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-indigo-500/80 space-y-5 animate-[popIn_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                  
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-indigo-50/70 border border-indigo-200/50 rounded-full text-[11px] font-bold text-indigo-700 uppercase tracking-wide">
                      {details.type === 'class' ? 'Class/Interface' : details.type === 'relationship' ? 'Relationship' : 'Visibility Modifier'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">ID: {details.id}</span>
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-slate-900 leading-tight">
                      {details.title}
                    </h4>
                    <p className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">{details.en}</p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h5 className="text-[13px] font-bold text-slate-700 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-slate-500" /> คำอธิบายแนวคิด
                    </h5>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {details.desc}
                    </p>
                  </div>

                  {/* Context in Project */}
                  <div className="bg-slate-100/70 rounded-xl p-3.5 border border-slate-200/50 space-y-1">
                    <span className="text-[11px] font-bold text-indigo-700 block uppercase tracking-wide">การประยุกต์ใช้งานในระบบ</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {details.context}
                    </p>
                  </div>

                  {/* Code snippet if exists */}
                  {details.code && (
                    <div className="space-y-2">
                      <h5 className="text-[13px] font-bold text-slate-700 flex items-center gap-1.5">
                        <Code className="w-4 h-4 text-slate-500" /> ตัวอย่างโค้ดจริง (C#)
                      </h5>
                      <div className="bg-slate-950/90 rounded-xl p-3 border border-white/10 shadow-inner overflow-x-auto">
                        <pre className="text-[11.5px] font-mono text-slate-200 leading-normal">
                          <code>{details.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Rule / Warning */}
                  <div className="bg-amber-50/60 border border-amber-200/50 rounded-xl p-3.5 space-y-1 border-l-[3px] border-l-amber-500">
                    <span className="text-[11px] font-bold text-amber-800 block uppercase tracking-wide flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> คำแนะนำ
                    </span>
                    <p className="text-xs text-amber-900/90 leading-relaxed">
                      {details.rule}
                    </p>
                  </div>

                  {/* Reset Button */}
                  <button 
                    onClick={() => setSelectedElement(null)}
                    className="w-full h-8 text-[12px] border border-slate-300 text-slate-500 hover:bg-slate-50 rounded-lg font-semibold transition-all duration-200 cursor-pointer text-center"
                  >
                    ล้างการเลือก
                  </button>

                </div>
              ) : (
                <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-8 border-l-[3.5px] border-l-slate-300 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-800 text-[16px]">ยังไม่ได้คลิกเลือกองค์ประกอบ</h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto">
                      กรุณาคลิกเลือกคลาส หรือสัญลักษณ์ความสัมพันธ์บน Canvas แผนภาพเพื่อวิเคราะห์พฤติกรรมโค้ด
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Quick-access Concept cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            {[
              { id: 'class_request', sym: '📦', name: 'LoginRequest', accent: 'indigo' },
              { id: 'class_handler', sym: '⚙️', name: 'LoginHandler', accent: 'indigo' },
              { id: 'class_advanced_handler', sym: '🌀', name: 'AdvancedLoginHandler', accent: 'indigo' },
              { id: 'rel_composition', sym: '♦️', name: 'Composition (ผูกตาย)', accent: 'violet' },
              { id: 'rel_aggregation', sym: '♢', name: 'Aggregation (อิสระ)', accent: 'violet' },
              { id: 'rel_realization', sym: '┄▷', name: 'Realization (Interface)', accent: 'violet' },
            ].map((card) => (
              <div 
                key={card.id}
                onClick={() => {
                  setSelectedElement(card.id);
                  setActiveFilter('all');
                }}
                className={`bg-white/60 backdrop-blur-md border rounded-xl p-3.5 flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.03] hover:shadow-md ${
                  selectedElement === card.id ? 'border-indigo-500 ring-2 ring-indigo-300/50 bg-indigo-50/20' : 'border-slate-200/60'
                }`}
              >
                <span className="text-xl">{card.sym}</span>
                <span className="text-[12px] font-bold text-slate-800 leading-snug">{card.name}</span>
              </div>
            ))}
          </div>

        </section>

        {/* =========================================================================
            ทฤษฎีความสัมพันธ์คลาส
        ========================================================================= */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">
              Class Relationships Comparison
            </span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ทำความเข้าใจความต่างของ Composition vs Aggregation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Composition Card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3.5px] border-l-teal-500/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-teal-50 border border-teal-200 text-[11px] font-bold text-teal-700 rounded-full">
                  ตายยกรัง
                </span>
                <h4 className="text-base font-bold text-slate-800">Composition (การประกอบกันเด็ดขาด)</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                อ็อบเจกต์ลูกถูกผูกตายไว้กับอ็อบเจกต์เจ้าของ ไม่สามารถแยกตัวไปอยู่กับคนอื่นได้ และต้องจบชีวิตลงพร้อมผู้เป็นเจ้าของเสมอ
              </p>
              <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-3 text-[12px] text-teal-800">
                <strong>สัญลักษณ์:</strong> สี่เหลี่ยมข้าวหลามตัดทึบสีดำ ชี้หาผู้เป็นเจ้าของ<br />
                <strong>ตัวอย่าง:</strong> คลาส `LoginHandler` สร้างและครอบคลุมอ็อบเจกต์ `LoginLogger` ไว้ภายในตัวเองอย่างถาวร
              </div>
            </div>

            {/* Aggregation Card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3.5px] border-l-amber-500/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-700 rounded-full">
                  ตายเดี่ยว
                </span>
                <h4 className="text-base font-bold text-slate-800">Aggregation (การรวมกลุ่มหลวมๆ)</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                อ็อบเจกต์ลูกนำมารวมกลุ่มเพื่อใช้งานเฉยๆ แต่สามารถย้ายไปอยู่กับคนอื่นได้ และมีชีวิตอยู่ต่อไปได้แม้ผู้เป็นเจ้าของจะโดนทำลายลง
              </p>
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-[12px] text-amber-800">
                <strong>สัญลักษณ์:</strong> สี่เหลี่ยมข้าวหลามตัดโปร่งสีขาว ชี้หาผู้เป็นเจ้าของ<br />
                <strong>ตัวอย่าง:</strong> คลาส `LoginLogger` รับอ็อบเจกต์ `SqlDatabase` เข้ามาบันทึกงานโดยฐานข้อมูลจะยังคงอยู่แม้ Logger จะทำงานเสร็จไปแล้ว
              </div>
            </div>

            {/* Visibility Modifiers Card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 border-l-[3.5px] border-l-violet-500/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-violet-50 border border-violet-200 text-[11px] font-bold text-violet-700 rounded-full">
                  Visibility
                </span>
                <h4 className="text-base font-bold text-slate-800">ระดับสิทธิ์การเข้าถึง (Visibility)</h4>
              </div>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                การจำกัดขอบเขตการเรียกใช้งานโค้ดภายในคลาส เพื่อทำตามหลัก Encapsulation ป้องกันคลาสนอกทำลายโครงสร้างข้อมูลสมาชิก
              </p>
              <div className="bg-slate-100/80 rounded-xl p-3.5 text-xs text-slate-700 space-y-1">
                <div>`+` (Public): เข้าถึงได้หมด</div>
                <div>`-` (Private): เข้าถึงได้เฉพาะคลาสตัวเอง</div>
                <div>`#` (Protected): เข้าถึงได้ในคลาสตัวเองและคลาสลูกที่สืบทอด</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            คำแนะนำจากคุณครู & ข้อพึงระวัง
        ========================================================================= */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-teal-500">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-teal-600" /> คำแนะนำและข้อสังเกตจากคุณครู
            </h4>
            <div className="space-y-3 text-[15px] text-slate-600 leading-relaxed">
              <p>
                ในการออกแบบระบบด้วย **Class Diagram** ไม่จำเป็นต้องระบุความสัมพันธ์ย่อยทุกลูกศรอย่างยิบย่อยจนลายตา ควรร่างขึ้นมาเพียงให้เข้าใจแนวคิดและตรรกะในทีมตรงกันก็พอ จากนั้นจึงรีบแยกย้ายไปแปลงเป็นโค้ดจริง
              </p>
              <p className="bg-teal-50/30 border border-teal-100 p-3.5 rounded-xl text-sm font-medium text-teal-800">
                ⚠️ <strong>ข้อควรระวัง:</strong> ห้ามเริ่มออกแบบซอฟต์แวร์จาก Class Diagram ก่อน เพราะจะทำให้โปรแกรมเมอร์คิดโมเดลที่ซับซ้อนเกินจำเป็น ควรใช้แนวทางสถาปัตยกรรมเช่น Test-First Design หรือ TDD เพื่อเขียนเทสไดรฟ์โครงสร้างโค้ดตามความต้องการของลูกค้าจริงก่อน
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CHECKPOINT QUIZ SECTION
        ========================================================================= */}
        <div className="scroll-mt-12" id="quiz-section">
          <SectionBlock title="ตรวจสอบความเข้าใจ (Quiz Checkpoint)">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative">
              <div className="absolute top-3 right-4 font-mono text-[9px] text-slate-500 font-bold tracking-widest pointer-events-none">
                QUIZ STATE CONTROLLER
              </div>
              <div className="space-y-6">
                <div className="text-slate-300 text-sm">
                  ทดสอบทฤษฎี Class Diagram, ความสัมพันธ์คลาส และสิทธิ์การเข้าถึง เพื่อรับสิทธิ์ประเมินผลการเรียนรู้รายวิชา
                </div>
                <QuizEngine 
                  questions={quizQuestions} 
                  onComplete={(score, total) => {
                    console.log(`Quiz completed: ${score}/${total}`);
                  }}
                />
              </div>
            </div>
          </SectionBlock>
        </div>

      </main>
      
      {/* Pop animation keyframes inline styles */}
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

    </div>
  );
}
