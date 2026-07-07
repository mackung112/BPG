const uiuxCourse = {
    id: "31901-2001",
    title: "การออกแบบส่วนติดต่อผู้ใช้ขั้นสูง",
    description: "ศึกษาและปฏิบัติเกี่ยวกับทฤษฎีและมโนทัศน์ขั้นสูงในงานออกแบบส่วนติดต่อประสาน (UI) และการออกแบบประสบการณ์ผู้ใช้ (UX) แนวโน้มและนวัตกรรมการออกแบบส่วนติดต่อผู้ใช้ Dark Mode, Glassmorphism การประยุกต์ใช้เครื่องมือออกแบบมาตรฐานสากล Figma การวิจัยตลาดและสกัด Persona, User Journey, Information Architecture และ User Flow จิตวิทยาการรับรู้ภาพ Gestalt Principles กฎ Hick's และ Fitts's Law การควบคุม Heuristic การจัดทำ Design System แอนิเมชันตอบสนอง Smart Animate การพัฒนาแบบร่างความละเอียดต่ำและสูง การทดสอบ Usability Testing และการส่งมอบงานการออกแบบDev Mode",
    icon: "🎨",
    chapters: [
        {
            id: 1,
            title: "Unit 1: พื้นฐานและมโนทัศน์ UX/UI",
            lessons: [
                { id: "1.1", title: "1.1 นิยามและความแตกต่างของ UX และ UI", mainTitle: "นิยามและความแตกต่างของ UX และ UI", subTitle: "(Introduction to UX/UI)", description: "คำจำกัดความของ User Experience และ User Interface การสกัดส่วนแตกต่างและจุดประสานในการพัฒนาเทคโนโลยี", content: "[uiux1_1]" },
                { id: "1.2", title: "1.2 โครงสร้างหน้าตาแอปพลิเคชันและหน้าเว็บเบื้องต้น", mainTitle: "ส่วนประกอบอินเตอร์เฟสพื้นฐาน", subTitle: "(Basic UI & App Structure)", description: "การแยกแยะและทำความเข้าใจส่วนประกอบหลักบนอินเตอร์เฟส เช่น Header, Body, Navigation และ CTA Buttons จากแอปพลิเคชันในชีวิตประจำวัน", content: "[uiux1_2]" },
                { id: "1.3", title: "1.3 การใช้งาน google Stitch ร่วมกับ design.md", mainTitle: "การใช้งาน google Stitch ร่วมกับ design.md", subTitle: "(Using Google Stitch with design.md)", description: "แนะนำเครื่องมือ google Stitch และกระบวนการทำงานร่วมกับเอกสารออกแบบ และการนำเข้าและประยุกต์ใช้ดีไซน์ซิสเต็มผ่าน google Stitch ตามข้อกำหนดใน design.md", content: "[uiux1_3]" },
                { id: "1.4", title: "1.4 ทฤษฎีการออกแบบ UX/UI (Interactive Hub)", mainTitle: "ทฤษฎีการออกแบบ UX/UI", subTitle: "(UX/UI Theory Interactive Hub)", description: "เรียนรู้ทฤษฎีการออกแบบผ่านการลงมือทำจริง", content: "[uiux1_4]" }
            ]
        },
        {
            id: 2,
            title: "Unit 2: แนวโน้มการออกแบบและนวัตกรรม UI",
            lessons: [
                { id: "2.1", title: "2.1 เทรนด์การออกแบบสมัยใหม่ (Modern Design Trends)", mainTitle: "เทรนด์ความงามและการสลักแสง UI", subTitle: "(Modern UI Trends & Dark Mode)", description: "การจัดหน้าจอ Dark Mode เทคนิคเรืองแสงกระจกฝ้า Glassmorphism/Neumorphism และบทบาทของ Microinteractions", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "2.2", title: "2.2 การออกแบบที่ครอบคลุมและรองรับอนาคต", mainTitle: "การออกแบบบนพื้นฐานสากลเข้าถึงง่าย", subTitle: "(Mobile-First & Inclusive Design)", description: "ระเบียบการยึดถือ Mobile-First Design และการออกแบบเพื่อมนุษย์ทั้งมวล (Inclusive Design & Web Accessibility)", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 3,
            title: "Unit 3: ทักษะเครื่องมือ Figma สำหรับดีไซเนอร์",
            lessons: [
                { id: "3.1", title: "3.1 การจัดการสภาพแวดล้อมการทำงาน", mainTitle: "การจัดการ Workspace Figma", subTitle: "(Figma Environment & Workspace)", description: "การควบคุมพื้นที่ระบบ Page, Frame, Layer และเครื่องมือวาดรูปทรงเรขาคณิตขั้นสูง", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "3.2", title: "3.2 การสร้างและจัดการส่วนประกอบ (Assets)", mainTitle: "การจัดการ assets และคอมโพเนนต์", subTitle: "(Figma Components & Libraries)", description: "ขั้นตอนสร้าง Main Component, Instance, การจัดการ Variants ตั้งสถานะปุ่ม และการสร้าง Shared Libraries", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 4,
            title: "Unit 4: กระบวนการวิจัยและทำความเข้าใจผู้ใช้",
            lessons: [
                { id: "4.1", title: "4.1 เทคนิค User Research", mainTitle: "เทคนิคระเบียบวิธีวิจัยผู้ใช้", subTitle: "(User Research Techniques)", description: "ขั้นตอนการวางกำหนดและทำ User Interview สัมภาษณ์ การสร้างแผนแบบสอบถาม และสังเกตการณ์พฤติกรรม", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "4.2", title: "4.2 การสร้างตัวแทนและแผนที่ประสบการณ์", mainTitle: "แผนผัง Persona และเส้นทางผู้ใช้", subTitle: "(Customer Persona & User Journey Map)", description: "การสกัดข้อมูลวิจัยสร้าง Customer Persona และการจัดทำ User Journey Mapping เพื่อระบุ Pain/Gain Points", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 5,
            title: "Unit 5: กระบวนการคิดเชิงออกแบบ (Design Thinking)",
            lessons: [
                { id: "5.1", title: "5.1 การกำหนดโจทย์ปัญหา (Define)", mainTitle: "การนิยามระบุโจทย์ปัญหา", subTitle: "(Defining Problem Statements)", description: "การสกัดสังเคราะห์หา User Insights การเขียนบทนิยามปัญหาสากล POV และประโยค How Might We", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "5.2", title: "5.2 การระดมสมองและต้นแบบเบื้องต้น (Ideate)", mainTitle: "การระดมสมองกระตุ้นคิดและสเก็ตช์ด่วน", subTitle: "(Ideation Tools & Crazy 8s)", description: "การประยุกต์กิจกรรม Crazy 8s บนกระดาน Figma/FigJam และการประกอบต้นแบบ Low-Fi Paper Prototyping", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 6,
            title: "Unit 6: จิตวิทยาการออกแบบและ Visual Hierarchy",
            lessons: [
                { id: "6.1", title: "6.1 กฎการรับรู้ (Gestalt Principles)", mainTitle: "จิตวิทยาการรับกลุ่มกฎ Gestalt", subTitle: "(Gestalt Principles in UI)", description: "การปรับสายตารวมกลุ่ม Proximity, Similarity, Continuity และสร้างลำดับความเด่น Visual Hierarchy", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "6.2", title: "6.2 จิตวิทยาด้านการคิดและความรู้สึก", mainTitle: "กฎจิตวิทยาการใช้งาน Hick & Fitts", subTitle: "(Cognitive Psychology: Hick's & Fitts's Law)", description: "ความสำคัญของ Hick's Law และ Fitts's Law ต่อสถาปัตยกรรม ปุ่มกด และอิทธิพลทางสี Emotional Design", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 7,
            title: "Unit 7: สถาปัตยกรรมข้อมูลและการไหลของผู้ใช้",
            lessons: [
                { id: "7.1", title: "7.1 การออกแบบโครงสร้างเนื้อหา (Information Architecture)", mainTitle: "สถาปัตยกรรมจัดเก็บข้อมูลเนื้อหา", subTitle: "(Information Architecture & Sitemap)", description: "การจัดผังโครงร่าง Sitemap ระบบ Navigation และการสอบทานจัดกลุ่มโครงสร้างด้วย Card Sorting", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "7.2", title: "7.2 การออกแบบเส้นทางใช้งาน (User Flow)", mainTitle: "การลากผังเส้นทางการใช้งาน User Flow", subTitle: "(User Flow Diagraming)", description: "การเขียนไดอะแกรมลำดับการทำงาน ตรวจสอบความถูกต้องราบรื่น และจำกัดการเข้าทางอับตันระบบ", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 8,
            title: "Unit 8: การตอบโจทย์ Usability และ Design System",
            lessons: [
                { id: "8.1", title: "8.1 กฎการใช้งานได้ง่าย (Usability Heuristics)", mainTitle: "การวิเคราะห์สิบด่าน Usability Heuristics", subTitle: "(Nielsen's 10 Heuristics Evaluation)", description: "การวินิจฉัยและเช็คสุขภาพหน้าจอการใช้งานของแอปด้วยระเบียบประเมินผล Nielsen's 10 Heuristics", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "8.2", title: "8.2 การสร้างระบบการออกแบบ (Design System)", mainTitle: "การจัดสเกลสุนทรียภาพสีตัวอักษร", subTitle: "(Design Systems: Typography & Grids)", description: "การตั้งค่า Typography Scale และ Color System ใน Figma การคุมสัดส่วนด้วย Grid และ Auto Layout", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 9,
            title: "Unit 9: การออกแบบการปฏิสัมพันธ์ (Interaction Design)",
            lessons: [
                { id: "9.1", title: "9.1 หลักการปฏิสัมพันธ์และแอนิเมชัน", mainTitle: "การสื่อสารสองทางแอนิเมชันและเอฟเฟกต์", subTitle: "(Interactions & Smart Animate)", description: "การระบุ Trigger และการมอบผลป้อนกลับ Feedback การตั้งทรานซิชันนุ่มนวลผ่าน Smart Animate", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "9.2", title: "9.2 การออกแบบท่าทางการสั่งงาน (Gesture Design)", mainTitle: "การออกแบบการตอบสนองเชิงฟิสิกส์บนมือถือ", subTitle: "(Mobile Gestures Design)", description: "การจำลองท่าทางการตอบสนองลาก Tap, Swipe, Pinch, และกดแช่ Long Press ใน Mobile UI", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 10,
            title: "Unit 10: การออกแบบ Wireframe และ Mockup",
            lessons: [
                { id: "10.1", title: "10.1 จากโครงร่างสู่ความสมจริง", mainTitle: "การปั้นแบบร่างความละเอียดต่ำสู่ผลลัพธ์พิกเซลเป๊ะ", subTitle: "(Wireframes to Pixel-Perfect Mockups)", description: "ขั้นตอนการสเก็ตช์ Low-Fi Wireframe เพื่อลองตรรกะ สู่การขยายรายละเอียด Mockup ความหนาแน่นความงามสูง", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 11,
            title: "Unit 11: การทดสอบผู้ใช้และแผนภาพความต้องการ",
            lessons: [
                { id: "11.1", title: "11.1 การเตรียมและวิเคราะห์ความต้องการ", mainTitle: "การออกแบบ Use Case และระบุ User Story", subTitle: "(Requirements Engineering & UML Use Cases)", description: "การเชื่อมโมเดลวิศวกรรมความต้องการ เขียน User Story และระบุ Use Case วิชาระบบงานเชิงลึก", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "11.2", title: "11.2 การทดสอบ Usability Testing", mainTitle: "ปฏิบัติการทดสอบระบบและวัดผลสะท้อน", subTitle: "(Usability Testing & SUS Evaluation)", description: "ระเบียบการทดสอบ Think Aloud บันทึกข้อคอมเม้นต์ และการคำนวณวัดผลลัพธ์ดัชนีคะแนนความพึงพอใจ SUS", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 12,
            title: "Unit 12: การปรับปรุงวนซ้ำและการส่งต่องาน",
            lessons: [
                { id: "12.1", title: "12.1 กระบวนการ Iteration", mainTitle: "การวิเคราะห์แก้ไขวนซ้ำ A/B Testing", subTitle: "(A/B Testing & Iteration Loops)", description: "การจัดการทำและวิเคราะห์ A/B Testing คัดกรองตัวเลือกที่ดีกว่าสู่การอัปเกรดผลงานการออกแบบ", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "12.2", title: "12.2 การส่งต่องานการออกแบบ (Design Handoff)", mainTitle: "การส่งมอบทรัพย์สินสู่ช่างโค้ด", subTitle: "(Figma Dev Mode & Design Handoff)", description: "การใช้งาน Figma Dev Mode ค้นหาพิกัด CSS และสกัดรูปภาพรูปแบบ SVG/PNG ให้โปรแกรมเมอร์นำไปเขียน", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        },
        {
            id: 13,
            title: "Unit 13: โครงงานและการนำเสนอขั้นสูง",
            lessons: [
                { id: "13.1", title: "13.1 การจัดเตรียมผลงาน (Portfolio)", mainTitle: "การรวบรวมแฟ้มผลงาน UX Case Study", subTitle: "(UX Case Studies & Portfolios)", description: "การสร้างและเขียนเนื้อหากระบวนการวิจัยออกแบบ (UX Case Study) และเตรียมพร้อม Pitch Deck", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" },
                { id: "13.2", title: "13.2 การนำเสนอและสาธิต (Presentation)", mainTitle: "การอธิบายตรรกะ Rationale และ LIVE Demo", subTitle: "(Advanced Presentations & Live Demos)", description: "การพูดชี้แจงความคุ้มค่าการออกแบบ Design Rationale และ LIVE Demo แอปพลิเคชันกดตอบสนองแบบเสมือนจริง", content: "<h3>อยู่ระหว่างการจัดเตรียมเนื้อหา</h3><p>เนื้อหาระบบจำลองการเรียนรู้ของหัวข้อนี้อยู่ระหว่างการเตรียมความพร้อมของแผนกออกแบบ</p>" }
            ]
        }
    ]
};

export default uiuxCourse;
