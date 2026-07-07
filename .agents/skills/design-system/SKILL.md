---
name: design-system
description: ระบบออกแบบ UI/UX โทเค็นสี ฟอนต์ คอมโพเนนต์ เลย์เอาต์ 4 เลเยอร์ เรียกใช้เมื่อออกแบบหน้าตา UI สร้างการ์ด หรือจัดเลย์เอาต์
---

# ระบบออกแบบ UI/UX

แหล่งอ้างอิงเดียวของระบบดีไซน์ ห้ามใช้สี เลย์เอาต์ หรือคอมโพเนนต์นอกเหนือจากที่กำหนด

---

## 🎨 โทเค็นสี

| ชื่อ | ค่า | ใช้สำหรับ |
|---|---|---|
| Primary | `#4F46E5` (indigo-600) | ปุ่มหลัก, Active, CTA |
| Secondary | `#06B6D4` (cyan-500) | ลิงก์, จุดเน้น |
| Tertiary | `#F97316` (orange-500) | แจ้งเตือนเร่งด่วน |
| Background | `#FAFAFA` | พื้นหลังคงที่ทุกหน้า |
| Surface | `#FFFFFF` | การ์ด, Modals |
| Success | `#22C55E` (green-500) | ถูกต้อง, สำเร็จ |
| Warning | `#F59E0B` (amber-500) | เตือน |
| Error | `#EF4444` (red-500) | ผิดพลาด |

> AI ต้องเปลี่ยนสี Primary/Secondary อัตโนมัติให้เข้ากับรายวิชา

---

## ✍️ ตัวอักษร

**ฟอนต์**: Outfit (หัวเรื่อง), Inter (เนื้อหา/UI), Source Code Pro (โค้ด), Noto Sans Thai
**ภาษาไทย**: บังคับ `leading-relaxed` (1.625) หรือ `leading-loose`

| ระดับ | ขนาด | สไตล์ |
|---|---|---|
| หัวเรื่องใหญ่ | `text-[38px]` | `font-bold text-zinc-900` |
| หัวข้อย่อย | `text-[26px]` | `font-semibold text-zinc-900` |
| เนื้อหาหลัก | `text-[16px] md:text-[17px]` | `font-normal text-zinc-600` (ห้าม 15px) |
| คำอธิบาย/ป้าย/ปุ่ม | `text-sm` หรือ `text-[13px]` | ห้าม `text-xs`/`text-[11px]` ในทฤษฎี |
| โค้ด/เทอร์มินัล | `text-[13.5px]` หรือ `text-sm` | `font-mono text-zinc-800` |

---

## 🧱 คอมโพเนนต์

### ปุ่ม
- Primary: `bg-[#4F46E5] text-white hover:bg-[#4338CA] hover:scale-[1.02] hover:shadow-md active:scale-98 rounded-[8px] font-semibold cursor-pointer transition-all duration-200`
- Secondary: `border border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF] hover:scale-[1.02] active:scale-98 rounded-[8px] font-semibold cursor-pointer transition-all duration-200`
- ขนาด: h-8 (เล็ก), h-[38px] (กลาง), h-[46px] (ใหญ่)

### ช่องกรอกข้อมูล
`h-[38px] border-[#E4E4E7] rounded-[8px] focus:border-[#4F46E5] focus:ring-3 focus:ring-[#4F46E5]/12`

### ขอบมนและเงา
- ขอบมน: 4px (เล็ก), 8px (กลาง), 12px (ใหญ่), 20px (XL), 9999px (กลม)
- เงา: `shadow-sm`, `shadow-md`, `shadow-xl` หรือ `shadow-[0_12px_24px_-4px_rgba(79,70,229,0.15)]`

### เอฟเฟกต์โฮเวอร์ (บังคับทุกองค์ประกอบที่กดได้)
- บังคับ `cursor-pointer` ทุกปุ่ม/การ์ดกดได้
- การ์ดกดได้: `hover:-translate-y-1 hover:shadow-lg hover:border-indigo-500/30 transition-all duration-200`
- ปุ่ม/ตัวเลือกย่อย: `hover:scale-[1.02] hover:shadow-sm transition-all duration-200`
- ตอบสนองไม่เกิน 200ms

### การ์ดกระจกใส (Glassmorphism)
- เนื้อหา: `bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl hover:border-{accent}/40 transition-all duration-300 cursor-pointer group`
- กล่องเน้น: `bg-{accent}-50/60 backdrop-blur-md border border-{accent}-200/60 rounded-2xl p-4 border-l-[3px] border-l-{accent}-500 leading-relaxed`
- แผงข้อมูลขอบซ้าย: `bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-{accent}-500/80`

### แผง Simulator มืด (2 ระดับ)
- ฝั่งควบคุม: `bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl`
- ฝั่งแสดงผล: `bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl`
- ห้ามใช้ `bg-slate-950` เดี่ยวๆ — ต้องมี `backdrop-blur` เสมอ

### ไอคอนโต้ตอบ
- จานรอง: `p-3 rounded-2xl bg-{accent}-50/80 text-{accent}-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner`
- Lucide: `transition-transform group-hover:rotate-12 duration-300`

---

## 🌌 เลย์เอาต์ 4 เลเยอร์

### เลเยอร์ 1: พื้นหลังเรืองแสง
- สีพื้นหลัง `#FAFAFA` ทุกบทเรียน
- วงกลมเรืองแสง `blur-[120px]`/`blur-[160px]` สุ่มสีตามธีม 4 มุม
- `<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">...</div>`

### เลเยอร์ 2: ส่วนหัว
- รหัสหัวข้อสีเด่น + ชื่อบทไทยตัวหนา + ชื่ออังกฤษ Gradient
- ระยะห่าง: Immersive → `pt-8 pb-4 md:pt-10 md:pb-5`
- ชื่ออังกฤษ: `text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r` + `mb-3 pb-2 leading-normal`
- ⚠️ **บัก `bg-clip-text`**: ห้ามใช้ `!p-0` ต้องใส่ `pb-2 leading-normal`

### เลเยอร์ 3: เนื้อหาและ Simulator
- ห่อด้วย `<main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16">`
- หัวบล็อกหัวข้อย่อย (บังคับทุกหัวข้อ):
  ```jsx
  <section className="space-y-6">
    <div className="border-b border-zinc-200/80 pb-4">
      <span className="text-sm font-bold text-{accent}-600 tracking-wider uppercase">
        {หมวดวิชาการ}
      </span>
      <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
        {ชื่อหัวข้อวิชาการ}
      </h3>
    </div>
  </section>
  ```

### เลเยอร์ 4: TeacherTask Footer
- กล่องโจทย์ท้ายบทเรียน — ห้ามแก้โค้ดเดิม

---

## 🃏 หลักการออกแบบการ์ดและ Simulator

> หลักการนี้เป็นแนวคิด AI ประยุกต์ใช้ตามบริบทได้

### สีต้องสื่อความหมาย
- บวก/ถูก → เขียว | ลบ/ผิด → แดง | เชื่อม → ม่วง | แยก → ส้ม
- กลุ่มเดียวกันใช้สีเดียวกัน | ในบทเดียวกันห้ามซ้ำสี

### พื้นหลังการ์ดต้องมีชีวิต
- ห้ามสีขาว 100% — ใช้ Corner Blob, Gradient อ่อน, ขอบบาง, pattern SVG

### ลำดับสายตาในการ์ด
1. สัญลักษณ์/หัวข้อหลัก — ใหญ่สุด มีสี accent
2. ชื่อ/คำอธิบายสั้น — กลาง `text-slate-800`
3. รายละเอียดยาว — เล็กลง `text-slate-500`
4. แถบโต้ตอบ — พื้นหลังต่าง เช่น `bg-slate-50`

### Grid สมดุล
- 2–4 หัวข้อ: 2–3 คอลัมน์ | 5–6: 3 คอลัมน์ | 7+: แบ่ง Section
- Gap: อย่างน้อย `gap-4` | ระหว่าง Section: `space-y-10` ขึ้นไป

---

## 🧠 รสนิยมผู้ใช้

- ไฮไลท์คำศัพท์เทคนิคด้วย Mini Badge โปร่งแสง (เช่น `bg-teal-50/50 border border-teal-200/50 text-teal-700`)
- ใช้ Frosted Glass Callout ล้อมทฤษฎีสำคัญ + ขอบนีออน 3px ด้านซ้าย
- เปลี่ยนจุดกลมสีดำ (bullet) เป็นไอคอนลูกศรหรือติ๊กเขียว
- หลักรวม: สวย สมดุล มีเหตุผล — ทุกอย่างสื่อความหมายและอ่านง่าย
