# 🛠️ กฎและมาตรฐานทางเทคนิค

กฎเหล็กการเขียนโค้ดสำหรับโปรเจกต์ **"ห้องเรียนครูแม็ค"** — React 19, Tailwind CSS v4

---

## 🚨 1. กฎเหล็ก (ห้ามฝ่าฝืน)

* ห้ามใช้ Vanilla JS — ใช้ React State/Ref/Hooks เท่านั้น (เว้นแต่ Plugin รันโค้ด)
* ห้ามใช้เสียงทุกชนิด — ไม่มี `playSound`, Web Audio API, ปุ่มเสียง
* ห้ามใช้ Tailwind แบบ Dynamic — ใช้ Hardcode เต็ม เช่น `text-indigo-600` ห้ามใช้ `` `${color}-600` ``
* ห้ามแก้ Core — `App.jsx`, `LessonViewer.jsx`, `vite.config.js` ห้ามแตะ เว้นแต่ระบุชัดเจน
* ห้ามทำ Card-in-Card — ทุกหน้าเป็นแบบไร้ขอบตาม Immersive Standard
* ห้ามใช้ Global State — ใช้ `useState`/`useEffect` เท่านั้นสำหรับ Simulator

---

## 💻 2. มาตรฐานคอมโพเนนต์

### รูปแบบและการตั้งชื่อ
* โครงสร้าง: `export default function ComponentName() { ... }`
* ตั้งชื่อไฟล์: `<prefix><X>_<Y>.jsx` (เช่น `py1_1.jsx`, `sql4_8.jsx`, `ooad1_3.jsx`)
* คำอธิบายทฤษฎี: ภาษาไทย | โค้ดตัวอย่าง: Python หรือ MySQL
* JSX: หากมี `>>>` ต้องห่อด้วย `{">>>"}`

### สถาปัตยกรรมและ Base Components
* บันทึกไฟล์ที่ `\Teach\LMS-React\src\components\interactive\<วิชา>\`
* ต้องนำเข้า Base Components จาก `shared/`:
  - `SimulatorShell` — การ์ดจำลองหลัก (Glassmorphism + Hover)
  - `ConsoleScreen` — Terminal แสดงเอาต์พุต
  - `OptionSelector` — ปุ่มตัวเลือก (pill/card)
  - `QuizEngine` — ระบบ Multiple Choice
  - `AmbientBackdrop` — พื้นหลังเรืองแสง (Layer 1)
  - `ConceptCard` — การ์ดแนวคิดพร้อม accent และ code strip
  - `SectionBlock` — กรอบกลุ่ม concept cards
  - `LogicGateSimulator` — จำลองตรรกะ boolean

### ลดความซ้ำซ้อน
* แปลงกลุ่มการ์ดคล้ายกันเป็น Array of Objects + `.map()` ลดโค้ดมากกว่า 50%
* SVG Flow: ใช้ `stroke-dasharray` + CSS variable `--flow-speed` เชื่อมกับ State

---

## 🎮 3. มาตรฐาน SVG และผังงาน

* เส้นเชื่อมทุกเส้น (`<path>`) ต้องใส่ `fill="none"` — ป้องกัน Black-Filled Bug
* จุดบรรจบใช้ `<circle>` — น้ำเงินสำหรับสายหลัก, เทาสำหรับสายย่อย
* ลูกศรกำหนดใน `<defs>` เรียกผ่าน `markerEnd` — สีตามสาย (น้ำเงิน=หลัก, เขียว=จริง, แดง=เท็จ, เทา=ปิด)
* สัญลักษณ์ Display: ด้านขวาแหลม ด้านซ้ายโค้งเว้า — `path d="M 25,5 Q 10,25 25,45 L 75,45 L 95,25 L 75,5 Z"`
* ปุ่มซ่อมแซม: สลับ SVG + โค้ดคู่ขนานไปสู่รูปแบบถูกต้อง พร้อมแอนิเมชันเรืองแสง

---

## 📚 4. สถาปัตยกรรมหลักสูตร

### เลย์เอาต์บทเรียน
* **เรียงซ้อนแนวดิ่ง** — ทุกหัวข้อย่อย (เช่น 1.1.1–1.1.7) + Simulator เรียงต่อกันในไฟล์เดียว ห้ามแยกหน้า/แท็บ
* **เปิดโปร่งไร้กรอบ** — ปล่อยพาดหัวและเนื้อหาลงบนพื้นหลังตรง ห้ามหุ้มด้วยการ์ดทึบซ้อนกล่อง ให้ดูคล้ายนิตยสารเทคโนโลยีหรือหนังสือเรียนดิจิทัล
* **ภาษาตำราเรียน** — ใช้ชื่อหัวข้อตามหลักวิชาการตรงตัว ห้ามใช้ภาษาโฆษณาคลุมเครือ
* **ห้ามแสดงตัวเลขย่อย** — ห้ามพิมพ์เลขลำดับ (เช่น 4.3.1) นำหน้าหัวข้อ แสดงแค่ชื่อ
* **เนื้อหาลึกซึ้ง** — อธิบายทฤษฎีครบทุกหัวข้อย่อย ห้ามละเว้นหรือยุบรวม

### ข้อมูลระบบ
* ทุกบทเรียนต้องมีครบ 6 คีย์: `id`, `title`, `mainTitle`, `subTitle`, `description`, `content`
* `<TeacherTask />` ต้องส่ง `title` + `taskText` เสมอ ห้ามเรียกเปล่า

### สร้างหน้าใหม่
1. สร้างไฟล์ที่ `interactive/<วิชา>/<prefix><X>_<Y>.jsx`
2. ห้ามใส่ Header — ระบบ `StandardHeader` จัดการให้อยู่แล้ว
3. ใส่ `[Marker]` ในฟิลด์ `content` ของ Database (เช่น `[py1_1]`)

> นโยบายเขียนทับ → ดูกฎข้อ 3 ใน [AGENTS.md](\Teach\AGENTS.md)

---

## ⚙️ 5. การตรวจสอบคุณภาพ

### ทักษะพิเศษ
* **React 19**: เรียกใช้ `vercel-react-best-practices` ควบคุม JSX/State/Hooks
* **Tailwind v4**: เรียกใช้ `tailwind-v4-shadcn` ควบคุมคลาสสไตล์

### Impeccable (บังคับทุกครั้งก่อนจบงาน)
* รัน `npx impeccable detect --gemini <path>` ก่อนจบงานทุกครั้ง
* หลีกเลี่ยงคู่สี AI เช่น ม่วง/น้ำเงิน Gradient สลับเรืองแสง
* ใช้ Glassmorphism + ขอบบาง `border-l-[3px]` แทนขอบทึบ `border-l-4`
* ห้ามตัวอักษรสีเทาบนพื้นสีอิ่ม (เช่น `text-slate-500` บน `bg-emerald-50`)
* ห้ามแอนิเมชันเด้ง `animate-bounce` — ใช้ `ease-out` ที่นุ่มนวลแทน

---

## ☁️ 6. Git Sync

* Repository: `https://github.com/mackung112/Teach.git`
* คำสั่ง "ดึงข้อมูลล่าสุด":
  ```bash
  git fetch origin
  git clean -fd
  git reset --hard origin/main
  ```
