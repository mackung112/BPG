---
name: lesson-architecture
description: สถาปัตยกรรมหลักสูตร เลย์เอาต์บทเรียน และบริบทโปรเจกต์ LMS เรียกใช้เมื่อสร้างบทเรียนใหม่ จัดโครงสร้างหลักสูตร หรือต้องการเข้าใจภาพรวมโปรเจกต์
---

# สถาปัตยกรรมหลักสูตรและบริบทโปรเจกต์

---

## 🎯 ภาพรวมโปรเจกต์

- **ชื่อ**: ห้องเรียนครูแม็ค (LMS Platform)
- **เป้าหมาย**: แพลตฟอร์ม E-Learning แบบมีส่วนร่วมสูง
- **เทคโนโลยี**: React 19, Vite 8, Tailwind CSS 4, React Router 7, Lucide React, Framer Motion

---

## 📂 โครงสร้างไฟล์

```text
src/
├── App.jsx                       # Routing หลัก (ห้ามแก้)
├── index.css                     # Global CSS
├── data.js                       # รวม import วิชาทั้งหมด
├── data/                         # ไฟล์ข้อมูลแต่ละวิชา
│   └── <prefix>Course.js
└── components/
    ├── interactive/              # ⭐ สื่อ Simulator + HTML ทั้งหมด
    │   ├── <วิชา>/              # แยกโฟลเดอร์ตามวิชา
    │   │   ├── *.jsx            # React components
    │   │   └── *.html           # HTML ฝังตรง
    │   ├── shared/              # Base components ใช้ร่วม
    │   └── utils/               # Utilities
    ├── ui/                       # คอมโพเนนต์ UI ทั่วไป
    └── LessonViewer.jsx          # ⭐ Engine เรนเดอร์เนื้อหา (ห้ามแก้)
```

---

## 🏗️ สถาปัตยกรรมปัจจุบัน

- **Auto-Registry**: `import.meta.glob` ใน `LessonViewer.jsx` ดึง Component จาก `interactive/` แมปกับ Marker อัตโนมัติ
- **Marker 2 แบบ**:
  - `[component_name]` → React component (`.jsx`)
  - `[html:filename]` → HTML ฝังตรงผ่าน iframe (`.html`)
- **เลย์เอาต์**: Immersive Full-Page 4 เลเยอร์
- **ไม่มี Auto-scroll** / **ไม่มีเสียง**
- **การ์ด**: Glassmorphism (bg-white/60 backdrop-blur-xl)
- **หมวดวิชา**: แบ่งตามรหัสวิชา (2x = ปวช., 3x = ปวส.)

---

## 📚 เลย์เอาต์บทเรียน

- **เรียงซ้อนแนวดิ่ง** — ทุกหัวข้อย่อย + Simulator เรียงในไฟล์เดียว ห้ามแยกแท็บ
- **เปิดโปร่งไร้กรอบ** — ห้ามหุ้มด้วยการ์ดทึบซ้อน
- **ภาษาตำราเรียน** — ใช้ชื่อหัวข้อตามหลักวิชาการ
- **ห้ามแสดงตัวเลขย่อย** — แสดงแค่ชื่อ
- **เนื้อหาลึกซึ้ง** — ครบทุกหัวข้อย่อย ห้ามละเว้น

## นำเข้าเนื้อหา 2 วิธี

1. **AI สร้างเนื้อหา** → ดู skill `ai-content-creator`
2. **ครูแม็คนำเข้าเอง** (`.jsx` หรือ `.html`) → ดู skill `import-external-content`

## ข้อมูลระบบ

- ทุกบทเรียนต้องมีครบ: `id`, `title`, `mainTitle`, `subTitle`, `description`, `content`
- ทุกวิชาต้องมี: `id`, `level`, `title`, `description`, `icon`, `chapters`
- `<TeacherTask />` ต้องส่ง `title` + `taskText` เสมอ

## การบันทึกความเปลี่ยนแปลง

- เมื่อทำโครงสร้างใหญ่เสร็จ ต้องสรุปไว้ในไฟล์นี้
- หากโครงสร้างใดถูกโละแล้ว ห้ามนำกลับมาใช้
