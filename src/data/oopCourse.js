const oopCourse = {
    id: "21910-1013",
    title: "การเขียนโปรแกรมเชิงวัตถุ",
    description: "ศึกษาและปฏิบัติเกี่ยวกับแนวคิดการเขียนโปรแกรมเชิงวัตถุ (Object-Oriented Programming) การสร้างคลาส อ็อบเจกต์ การสืบทอดคุณสมบัติ พหุสัณฐาน การออกแบบอินเตอร์เฟสผู้ใช้งาน (GUI) และการพัฒนาโปรแกรมประยุกต์ธุรกิจด้วยภาษา Python",
    icon: "📦",
    chapters: [
        {
            id: 1,
            title: "หน่วยที่ 1 การเตรียมเครื่องมือ",
            lessons: [
                { id: "1.1", title: "1.1 ติดตั้ง Python", mainTitle: "การติดตั้ง Python", subTitle: "(Python Installation)", description: "ขั้นตอนการดาวน์โหลดและติดตั้งตัวแปลภาษา Python ลงบนระบบปฏิบัติการคอมพิวเตอร์", content: "[oop1_1]" },
                { id: "1.2", title: "1.2 ติดตั้ง VS Code", mainTitle: "การติดตั้ง VS Code", subTitle: "(VS Code Setup)", description: "การเตรียมสภาพแวดล้อมโปรแกรมเขียนโค้ด Visual Studio Code", content: "[oop1_2]" },
                { id: "1.3", title: "1.3 ติดตั้ง Extension Python", mainTitle: "การติดตั้ง Python Extension", subTitle: "(Python Extension for VS Code)", description: "การเพิ่มความสามารถของ VS Code ให้รองรับไวยากรณ์ภาษา Python", content: "[oop1_3]" },
                { id: "1.4", title: "1.4 ตั้งค่า Python Interpreter", mainTitle: "การเลือก Python Interpreter", subTitle: "(Python Interpreter Configuration)", description: "การตั้งค่าให้โปรแกรมเขียนโค้ดเรียกใช้ตัวแปลภาษา Python ได้ถูกต้อง", content: "[oop1_4]" },
                { id: "1.5", title: "1.5 ใช้งาน Terminal ใน VS Code", mainTitle: "การใช้งาน Terminal", subTitle: "(VS Code Terminal Usage)", description: "การสั่งงานรันโปรแกรมและตรวจสอบผลลัพธ์ผ่านบรรทัดคำสั่ง (CLI)", content: "[oop1_5]" },
                { id: "1.6", title: "1.6 ติดตั้งไลบรารีด้วย pip", mainTitle: "การจัดการแพ็กเกจด้วย pip", subTitle: "(Python Package Manager)", description: "การดาวน์โหลดและติดตั้งไลบรารีเสริมภายนอกผ่านระบบ pip", content: "[oop1_6]" },
                { id: "1.7", title: "1.7 จัดการโฟลเดอร์โปรเจกต์", mainTitle: "การจัดโครงสร้างโฟลเดอร์", subTitle: "(Project Folder Structure)", description: "การเตรียมและบริหารระบบไฟล์โครงการให้เป็นหมวดหมู่เป็นระเบียบ", content: "[oop1_7]" }
            ]
        },
        {
            id: 2,
            title: "หน่วยที่ 2 คลาสและวัตถุ (Classes & Objects)",
            lessons: [
                { id: "2.1", title: "2.1 การเขียนคลาส (class)", mainTitle: "การเขียนคลาสใน Python", subTitle: "(Class Declaration)", description: "การสร้างโครงสร้างแบบพิมพ์เขียวสำหรับควบคุมอ็อบเจกต์ด้วยคำสั่ง class", content: "[oop2_1]", hideHeader: true }
            ]
        },
        {
            id: 3,
            title: "หน่วยที่ 3 การออกแบบ GUI",
            lessons: [
                { id: "3.1", title: "3.1 พื้นฐานไลบรารี Tkinter", mainTitle: "แนะนำไลบรารี Tkinter", subTitle: "(Introduction to Tkinter)", description: "ความเข้าใจเกี่ยวกับเครื่องมือออกแบบส่วนติดต่อผู้ใช้งานแบบกราฟิกเบื้องต้น", content: "[oop3_1]", hideHeader: true }
            ]
        }
    ]
};

export default oopCourse;
