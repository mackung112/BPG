# 🌍 บริบทโปรเจกต์และสถาปัตยกรรม

หน่วยความจำระยะยาว — ภาพรวม โครงสร้างไฟล์ และสถาปัตยกรรมที่ใช้อยู่ปัจจุบัน

---

## 🎯 1. ภาพรวม

- **ชื่อ**: ห้องเรียนครูแม็ค (LMS Platform)
- **เป้าหมาย**: แพลตฟอร์ม E-Learning แบบมีส่วนร่วมสูง
- **เทคโนโลยี**: React 19, Vite 8, Tailwind CSS 4, React Router 7, Lucide React
- **รายวิชา**:
  1. 🐍 การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น (21910-1003) — 8 หน่วย, Python
  2. 🧩 การเขียนโปรแกรมเชิงวัตถุ — 7 หน่วย, Python OOP
  3. 🗄️ ภาษาสอบถามข้อมูลเชิงโครงสร้าง (21901-2001) — 6 หน่วย, SQL/MySQL

---

## 📂 2. โครงสร้างไฟล์

```text
\Teach\
├── LMS-React\
│   ├── vite.config.js                    # ตั้งค่า Vite + Tailwind v4
│   ├── src\
│   │   ├── App.jsx                       # Routing หลัก
│   │   ├── index.css                     # Global CSS
│   │   ├── data.js                       # ฐานข้อมูลวิชา Python
│   │   ├── data\                         # ฐานข้อมูลวิชา OOP และ SQL
│   │   └── components\
│   │       ├── interactive\              # ⭐ สื่อ Simulator ทั้งหมด
│   │       └── LessonViewer.jsx          # ⭐ Engine เรนเดอร์เนื้อหา (ห้ามแก้)
│   └── docs\curriculum\                  # เอกสารหลักสูตรรายวิชา
├── AGENTS.md                             # ศูนย์กลาง AI
├── SKILL.md                              # กฎเขียนโค้ด
├── DESIGN.md                             # ระบบออกแบบ
├── CONTEXT.md                            # ไฟล์นี้
└── task.md                               # แผนงานปัจจุบัน
```

---

## 🏗️ 3. สถาปัตยกรรมปัจจุบัน

- **Auto-Registry**: `import.meta.glob` ใน `LessonViewer.jsx` ดึง Component จาก `interactive/` แมปกับ `[MARKER]` ใน data อัตโนมัติ
- **เลย์เอาต์**: Immersive Full-Page 4 เลเยอร์ (ไม่ใช่ Explorer Pattern เดิม)
- **ไม่มี Auto-scroll** — หน้า UI นิ่งเสถียร
- **ไม่มีเสียง** — ถอดถอนทั้งหมดเพื่อเสถียรภาพออฟไลน์
- **ข้อมูลบทเรียน**: Props แยก `mainTitle`, `subTitle`, `description`
- **เนื้อหา**: บล็อกอิสระเรียงแนวดิ่ง (Fluid Open-Air) ห้ามใช้แท็บ
- **ขนาดตัวอักษร**: เนื้อหาหลัก 16-17px, คำอธิบายย่อย 13-14px, โค้ด 13.5px
- **AI Skills**: ติดตั้ง `impeccable`, `vercel-react-best-practices`, `tailwind-v4-shadcn`
- **การ์ด**: Glassmorphism (bg-white/60 backdrop-blur-xl) แทนการ์ดทึบ
- **เส้นเชื่อม SVG**: เข้า-ออกจากจุดกึ่งกลางโมดูล 100% เป็นเส้นฉาก 90°

---

## 🧠 4. การบันทึกความเปลี่ยนแปลง

- เมื่อทำโครงสร้างใหญ่เสร็จ ต้องสรุปไว้ในหมวด 3 เพื่อให้ AI รุ่นต่อไปรับรู้
- หากโครงสร้างใดถูกโละแล้ว (เช่น Auto-scroll, เสียง) ห้ามนำกลับมาใช้
