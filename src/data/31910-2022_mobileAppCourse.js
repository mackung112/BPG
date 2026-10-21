const mobileAppCourse = {
    id: "31910-2022",
    level: "ปวส.",
    title: "การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา",
    description: "ศึกษาและปฏิบัติเกี่ยวกับหลักการออกแบบ และพัฒนาโปรแกรม การออกแบบส่วนติดต่อการใช้งานกับผู้ใช้ (User Interface) ติดตั้งและใช้งานโปรแกรม การเชื่อมต่อโปรแกรมประยุกต์อื่น ๆ (API) แจ้งเตือนผู้ใช้งานในรูปแบบต่าง ๆ จัดการแฟ้มข้อมูล การติดต่อฐานข้อมูล การประยุกต์ใช้โปรแกรมบนอุปกรณ์เคลื่อนที่แบบพกพาสำหรับงานธุรกิจ",
    icon: "📱",
    chapters: [
        {
            id: 1,
            title: "หน่วยที่ 1 วงจรการพัฒนาซอฟต์แวร์และการออกแบบแนวคิดแอปพลิเคชัน",
            lessons: [
                {
                    id: "1.1",
                    title: "1.1 วงจรการพัฒนาซอฟต์แวร์และ App Concept Canvas",
                    mainTitle: "วงจรการพัฒนาซอฟต์แวร์และการออกแบบแนวคิดแอปพลิเคชัน",
                    subTitle: "(SDLC & App Concept Canvas)",
                    description: "ทำความเข้าใจ Mobile SDLC, การวิเคราะห์ปัญหาผู้ใช้, และการร่างเค้าโครงไอเดียด้วย App Concept Canvas",
                    content: "[html:/courses/31910-2022/ch01-sdlc-app-concept-canvas.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 2,
            title: "หน่วยที่ 2 การออกแบบโครงสร้างหน้าจอ Wireframe ด้วย Figma",
            lessons: [
                {
                    id: "2.1",
                    title: "2.1 การออกแบบโครงสร้างหน้าจอ Wireframe ด้วย Figma",
                    mainTitle: "การออกแบบโครงสร้างหน้าจอ Wireframe ด้วย Figma",
                    subTitle: "(Figma Low-Fi Wireframing)",
                    description: "การจัด Layout Grid บนมือถือ, การวางตำแหน่ง UI Elements, และการร่างโครงสร้างหน้าจอขาวดำ",
                    content: "[html:/courses/31910-2022/ch02-figma-wireframing.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 3,
            title: "หน่วยที่ 3 การลงสีและออกแบบ UI ฉบับสมบูรณ์ ด้วย Figma",
            lessons: [
                {
                    id: "3.1",
                    title: "3.1 การลงสีและออกแบบ UI ฉบับสมบูรณ์ ด้วย Figma",
                    mainTitle: "การลงสีและออกแบบ UI ฉบับสมบูรณ์ ด้วย Figma",
                    subTitle: "(Hi-Fi UI Design & Design System)",
                    description: "การกำหนด Color Palette, Typography, ไอคอน และ Component Variants สำหรับแอปพลิเคชันธุรกิจ",
                    content: "[html:/courses/31910-2022/ch03-figma-hifi-ui.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 4,
            title: "หน่วยที่ 4 การสร้างต้นแบบเชิงโต้ตอบและการทดสอบบนสมาร์ตโฟนจริง",
            lessons: [
                {
                    id: "4.1",
                    title: "4.1 Interactive Prototype และการทดสอบบนสมาร์ตโฟนจริง",
                    mainTitle: "การสร้างต้นแบบเชิงโต้ตอบและการทดสอบบนสมาร์ตโฟนจริง",
                    subTitle: "(Interactive Prototype & Figma Mirror)",
                    description: "การเชื่อมโยง Flows, Transitions, Smart Animate และการ Mirror ทดสอบประสบการณ์จริงบนมือถือ",
                    content: "[html:/courses/31910-2022/ch04-figma-prototype.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 5,
            title: "หน่วยที่ 5 การวางโครงสร้างฐานข้อมูลร้านค้าด้วย Google Sheets",
            lessons: [
                {
                    id: "5.1",
                    title: "5.1 การวางโครงสร้างฐานข้อมูลร้านค้าด้วย Google Sheets",
                    mainTitle: "การวางโครงสร้างฐานข้อมูลร้านค้าด้วย Google Sheets",
                    subTitle: "(Relational Database Design with Google Sheets)",
                    description: "การออกแบบตารางสินค้า หมวดหมู่ คำสั่งซื้อ Primary Key / Foreign Key เพื่อเชื่อมต่อ AppSheet",
                    content: "[html:/courses/31910-2022/ch05-google-sheets-database.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 6,
            title: "หน่วยที่ 6 การสร้างแอปแรกและดึงข้อมูลขึ้นหน้าจอมือถือด้วย AppSheet",
            lessons: [
                {
                    id: "6.1",
                    title: "6.1 การสร้างแอปแรกและดึงข้อมูลด้วย AppSheet",
                    mainTitle: "การสร้างแอปแรกและดึงข้อมูลขึ้นหน้าจอมือถือด้วย AppSheet",
                    subTitle: "(First AppSheet Deployment & UX Views)",
                    description: "การสร้างโปรเจกต์ AppSheet, การเชื่อมต่อ Google Sheets, และการปรับแต่ง Card/Deck/Table Views",
                    content: "[html:/courses/31910-2022/ch06-appsheet-first-app.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 7,
            title: "หน่วยที่ 7 การสร้างฟอร์มเพิ่ม/ลบ/แก้ไขข้อมูล และการตรวจสอบความถูกต้อง",
            lessons: [
                {
                    id: "7.1",
                    title: "7.1 แบบฟอร์ม CRUD และ Data Validation",
                    mainTitle: "การสร้างฟอร์มเพิ่ม/ลบ/แก้ไขข้อมูล และการตรวจสอบความถูกต้องด้วย AppSheet",
                    subTitle: "(CRUD Forms & Data Validation Rules)",
                    description: "การตั้งค่า Form UX, กำหนด Required, Valid_If, Editable_If และการแจ้งเตือนความผิดพลาด",
                    content: "[html:/courses/31910-2022/ch07-appsheet-forms-validation.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 8,
            title: "หน่วยที่ 8 การสร้างระบบสั่งซื้อและคำนวณเงินด้วยความสัมพันธ์และสูตร",
            lessons: [
                {
                    id: "8.1",
                    title: "8.1 ระบบสั่งซื้อและการคำนวณด้วย Ref & Formulas",
                    mainTitle: "การสร้างระบบสั่งซื้อและคำนวณเงินด้วยความสัมพันธ์และสูตร",
                    subTitle: "(Table References & AppSheet Expressions)",
                    description: "การสร้าง Order & Order Details ด้วยความสัมพันธ์ Ref, สูตรคำนวณผลรวม Sum, และ Virtual Columns",
                    content: "[html:/courses/31910-2022/ch08-relations-formulas.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 9,
            title: "หน่วยที่ 9 การปรับแต่งธีมแบรนด์และสร้างปุ่มดำเนินการอัจฉริยะ",
            lessons: [
                {
                    id: "9.1",
                    title: "9.1 Brand UX Theming & Smart Actions",
                    mainTitle: "การปรับแต่งธีมแบรนด์และสร้างปุ่มดำเนินการอัจฉริยะ (Brand UX & Actions)",
                    subTitle: "(Brand UX Theming & Custom Actions)",
                    description: "การปรับแต่ง Brand Colors, Logo, Header/Footer, และการสร้างปุ่ม Quick Actions โทรด่วน หรือเปิดลิงก์",
                    content: "[html:/courses/31910-2022/ch09-brand-actions.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 10,
            title: "หน่วยที่ 10 การเชื่อมต่อฮาร์ดแวร์สแกน Barcode/QR Code และระบบลายเซ็น",
            lessons: [
                {
                    id: "10.1",
                    title: "10.1 ฮาร์ดแวร์สแกน Barcode/QR Code และลายเซ็นดิจิทัล",
                    mainTitle: "การเชื่อมต่อฮาร์ดแวร์สแกน Barcode/QR Code และระบบลายเซ็นดิจิทัล",
                    subTitle: "(Barcode/QR Scanner & Digital Signature)",
                    description: "การเปิดใช้งานกล้องสมาร์ตโฟนสแกนบาร์โค้ด คิวอาร์โค้ด และฟิลด์วาดลายเซ็นยืนยันรับสินค้า",
                    content: "[html:/courses/31910-2022/ch10-barcode-qr-signature.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 11,
            title: "หน่วยที่ 11 การระบุพิกัดดาวเทียม GPS และแผนที่นำทางด้วย Google Maps",
            lessons: [
                {
                    id: "11.1",
                    title: "11.1 พิกัด GPS และระบบแผนที่นำทาง",
                    mainTitle: "การระบุพิกัดดาวเทียม GPS และแผนที่นำทางด้วย Google Maps",
                    subTitle: "(GPS Geolocation & Google Maps Integration)",
                    description: "การดึงตำแหน่งพิกัด Lat/Long, การปักหมุดจุดส่งของ และการเปิดแอป Google Maps นำทางอัตโนมัติ",
                    content: "[html:/courses/31910-2022/ch11-gps-maps.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 12,
            title: "หน่วยที่ 12 การสร้างระบบอัตโนมัติและออกใบเสร็จ PDF",
            lessons: [
                {
                    id: "12.1",
                    title: "12.1 Automation Bots และการออกเอกสาร PDF อัตโนมัติ",
                    mainTitle: "การสร้างระบบอัตโนมัติด้วย Automation Bots และการออกใบเสร็จ PDF",
                    subTitle: "(AppSheet Automation Bots & PDF Generation)",
                    description: "การตั้งค่า Trigger ส่งอีเมลแจ้งเตือนลูกค้า และการสร้างเทมเพลตใบเสร็จ / ใบสั่งซื้ออัตโนมัติ",
                    content: "[html:/courses/31910-2022/ch12-automation-bots-pdf.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 13,
            title: "หน่วยที่ 13 โครงงานแอปพลิเคชันธุรกิจจริง (Sprint 1: Beta Release)",
            lessons: [
                {
                    id: "13.1",
                    title: "13.1 Capstone Project Sprint 1 (Beta Release)",
                    mainTitle: "การพัฒนาโครงงานแอปพลิเคชันธุรกิจจริง (Sprint 1: Beta Release)",
                    subTitle: "(Capstone Project Sprint 1: Real-World Business App)",
                    description: "การบูรณาการองค์ความรู้สร้างแอปธุรกิจฉบับสมบูรณ์ พร้อมทดสอบการทำงานระดับ Beta",
                    content: "[html:/courses/31910-2022/ch13-capstone-sprint-1.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 14,
            title: "หน่วยที่ 14 การทดสอบโดยผู้ใช้จริง การแก้บั๊ก และการขัดเกลาแอป",
            lessons: [
                {
                    id: "14.1",
                    title: "14.1 การทดสอบ UAT และการขัดเกลา (Sprint 2)",
                    mainTitle: "การทดสอบระบบโดยผู้ใช้จริง การแก้บั๊ก และการขัดเกลาแอปพลิเคชัน (Sprint 2)",
                    subTitle: "(User Acceptance Testing & Performance Polish)",
                    description: "การทำ UAT (User Acceptance Testing) การเก็บ Feedback จากผู้ใช้งาน และการแก้ปัญหาประสิทธิภาพ",
                    content: "[html:/courses/31910-2022/ch14-uat-polish.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 15,
            title: "หน่วยที่ 15 Demo Day การเผยแพร่แอป และการจัดแสดงผลงาน",
            lessons: [
                {
                    id: "15.1",
                    title: "15.1 Demo Day การเผยแพร่แอป และ Showcase",
                    mainTitle: "การนำเสนอผลงานในวัน Demo Day การเผยแพร่แอป และการจัดแสดงผลงาน",
                    subTitle: "(Demo Day Presentation & App Deployment)",
                    description: "การตั้งค่า Share App สำหรับผู้ใช้ภายนอก, การเตรียม Pitching และการจัดแสดงผลงานนวัตกรรมแอปพลิเคชัน",
                    content: "[html:/courses/31910-2022/ch15-demo-day.html]",
                    hideHeader: true
                }
            ]
        },
        {
            id: 16,
            title: "ภาพรวมรายวิชาและแผนการจัดการเรียนรู้",
            lessons: [
                {
                    id: "16.1",
                    title: "16.1 ภาพรวมหลักสูตรและศูนย์รวมรายวิชา (Master Hub)",
                    mainTitle: "ภาพรวมหลักสูตรและศูนย์รวมรายวิชา 31910-2022",
                    subTitle: "(Curriculum Master Hub)",
                    description: "ศูนย์รวมแผนการจัดการเรียนรู้ 15 สัปดาห์ การเก็บคะแนน 100% ปฏิบัติ และสื่อการสอนทั้งหมด",
                    content: "[html:/courses/31910-2022/index.html]",
                    hideHeader: true
                }
            ]
        }
    ]
};

export default mobileAppCourse;
