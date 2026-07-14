---
name: react-tailwind-coding
description: กฎเหล็กเขียนโค้ด React 19 + Tailwind CSS v4 และมาตรฐานคอมโพเนนต์สำหรับโปรเจกต์ LMS เรียกใช้เมื่อสร้างหรือแก้ไขคอมโพเนนต์
---

# กฎเหล็กและมาตรฐานคอมโพเนนต์

เทคโนโลยี: React 19, Vite 8, Tailwind CSS v4, React Router 7, Lucide React, Framer Motion

---

## 🚨 กฎเหล็ก (ห้ามฝ่าฝืน)

- ห้ามใช้ Vanilla JS — ใช้ React State/Ref/Hooks เท่านั้น (เว้นแต่ Plugin รันโค้ด)
- ห้ามใช้เสียงทุกชนิด — ไม่มี `playSound`, Web Audio API, ปุ่มเสียง
- ห้ามใช้ Tailwind แบบ Dynamic — Hardcode เต็ม เช่น `text-indigo-600` ห้ามใช้ `` `${color}-600` ``
- ห้ามแก้ Core — `App.jsx`, `LessonViewer.jsx`, `vite.config.js` ห้ามแตะ เว้นแต่ระบุชัดเจน
- ห้ามทำ Card-in-Card — ทุกหน้าเป็นแบบไร้ขอบตาม Immersive Standard
- ห้ามใช้ Global State — ใช้ `useState`/`useEffect` เท่านั้นสำหรับ Simulator

---

## 💻 มาตรฐานคอมโพเนนต์

### รูปแบบและการตั้งชื่อ
- โครงสร้าง: `export default function ComponentName() { ... }`
- ตั้งชื่อไฟล์: `<prefix><X>_<Y>.jsx` (เช่น `py1_1.jsx`, `sql4_8.jsx`)
- คำอธิบายทฤษฎี: ภาษาไทย | โค้ดตัวอย่าง: Python หรือ MySQL
- JSX: หากมี `>>>` ต้องห่อด้วย `{">>>"}`

### Base Components (นำเข้าจาก `shared/`)
- `SimulatorShell` — การ์ดจำลองหลัก (Glassmorphism + Hover)
- `ConsoleScreen` — Terminal แสดงเอาต์พุต
- `OptionSelector` — ปุ่มตัวเลือก (pill/card)
- `QuizEngine` — ระบบ Multiple Choice
- `AmbientBackdrop` — พื้นหลังเรืองแสง (Layer 1)
- `ConceptCard` — การ์ดแนวคิดพร้อม accent และ code strip
- `SectionBlock` — กรอบกลุ่ม concept cards
- `LogicGateSimulator` — จำลองตรรกะ boolean

### ลดความซ้ำซ้อน
- แปลงกลุ่มการ์ดคล้ายกันเป็น Array of Objects + `.map()` ลดโค้ดมากกว่า 50%
- SVG Flow: ใช้ `stroke-dasharray` + CSS variable `--flow-speed` เชื่อมกับ State

### สร้างหน้าใหม่
1. สร้างไฟล์ที่ `src/components/interactive/<วิชา>/<prefix><X>_<Y>.jsx`
2. ห้ามใส่ Header — ระบบ `StandardHeader` จัดการให้อยู่แล้ว
3. ใส่ `[Marker]` ในฟิลด์ `content` ของ Database (เช่น `[py1_1]`)

### สร้างวิชาใหม่
1. สร้างไฟล์ `src/data/<prefix>Course.js`
2. เพิ่ม import ใน `src/data.js`
3. ระบุ `level` ตามรหัสวิชา: ขึ้นต้น `2` → `"ปวช."`, ขึ้นต้น `3` → `"ปวส."`

### มาตรฐานระบบนำเข้าข้อมูลแบบกลุ่ม (Bulk Import)
เมื่อพัฒนาหน้านำเข้าข้อมูล (เช่น นักเรียน, ข้อสอบ) ต้องมีคุณสมบัติเหล่านี้เสมอ:
1. **มีปุ่มดาวน์โหลดตัวอย่าง (Export Template):** สร้างฟังก์ชัน `handleDownloadTemplate` ที่ดาวน์โหลดไฟล์ CSV หรือ TXT ตัวอย่าง (ใช้ `\uFEFF` เพื่อรองรับภาษาไทยใน CSV)
2. **รองรับการลากไฟล์วาง (Drag & Drop):** ช่องข้อความ (Textarea) ต้องมี event `onDragOver`, `onDragLeave`, และ `onDrop` พร้อมเปลี่ยนสีขอบ (`border-indigo-500`) เพื่อโต้ตอบกับผู้ใช้
3. **รองรับข้อมูลจาก Excel:** หากเป็น CSV ให้แยกข้อมูลด้วย `split(/[,\t]/)` เสมอ เพื่อรองรับการคัดลอก/วางจากตาราง Excel



### Simulator
- **ไม่บังคับทุกบท** — มีได้จะดี AI ประเมินเองว่าหัวข้อไหนเหมาะ
- บทที่เหมาะ: แสดง flow การทำงาน, เปรียบเทียบ, ทดสอบตรรกะ
