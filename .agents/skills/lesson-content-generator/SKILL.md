---
name: lesson-content-generator
description: ช่วยสร้างไฟล์เนื้อหาบทเรียน (HTML/CSS/JS) ที่ครอบคลุมทุกหัวข้อย่อย และมี Interactive สูง ด้วยดีไซน์พรีเมียม (Dark/Light Panels, Outline Cards) โดยใช้ Subagents แบ่งงาน
---

# ตัวสร้างเนื้อหาบทเรียน (Lesson Content Generator)

ใช้สกิลนี้เมื่อผู้ใช้สั่งให้ "สร้างเนื้อหา" สำหรับหัวข้อใดหัวข้อหนึ่ง (เช่น 1.1) ในรายวิชา เพื่อนำไปแสดงในหน้าเว็บไซต์ Learning Portal

## 📋 ขั้นตอนการทำงาน (Workflow)

1. **ตรวจสอบขอบเขตเนื้อหา:** 
   - เปิดอ่านไฟล์แผนการสอน `.md` ในโฟลเดอร์ `lesson-plans/` 
   - ดึงหัวข้อย่อยทั้งหมดของหัวข้อที่สั่ง (เช่น 1.1.1 ถึง 1.1.7)

2. **แบ่งงานด้วย Subagents (Delegation):**
   - ใช้เครื่องมือ `invoke_subagent` สร้าง Subagents แบ่งงานกันทำ (เช่น ตัวละ 1-2 หัวข้อย่อย)
   - มอบหมายให้ Subagents สร้าง HTML Snippet ตาม **Design System** ด้านล่าง
   - เมื่อ Subagents ทำงานเสร็จ ให้รวบรวมประกอบเป็นไฟล์ `index.html` ไฟล์เดียวอย่างสมบูรณ์แบบ

3. **การบันทึกไฟล์:**
   - บันทึกไปที่: `public/simulators/<รหัสวิชา>/<รหัสหัวข้อ>/index.html` 

## 🎨 Design System & CSS Structure (สำคัญมาก)

เนื้อหาบทเรียนต้องใช้ **Design System ระดับพรีเมียม** ต่อไปนี้เป็นโครงสร้างหลัก:

### 1. โครงสร้างหลัก (Global Layout)
- **Variables:** ต้องมีตัวแปรสีใน `:root`:
  `--bg-main: #f1f5f9; --card-bg: #ffffff; --dark-bg: #0f172a; --dark-panel: #1e293b; --text-dark: #1e293b; --text-gray: #64748b; --primary: #a855f7; --success: #10b981; --danger: #f43f5e; --warning: #f59e0b; --info: #3b82f6;`
- **Body & Wrapper:** 
  `body { background: var(--bg-main); padding: 1rem; margin: 0; }` (สำคัญ: Padding แค่ 1rem เพื่อให้กว้างเต็มพื้นที่)
  `.lesson-wrapper { width: 100%; display: flex; flex-direction: column; gap: 2.5rem; }`
- **White Block:**
  กล่องหลักพื้นหลังขาว `.white-block { background: var(--card-bg); border-radius: 24px; padding: 3rem; }`

### 2. คอมโพเนนต์ที่บังคับใช้ตามความเหมาะสม

**A. การ์ดความหมาย (Glowing Blob Cards)**
- เหมาะสำหรับหัวข้อย่อยที่เป็นคำนิยาม หรือ 3 องค์ประกอบหลัก
- โครงสร้าง: Grid ของการ์ดขาว ที่มีเอฟเฟกต์วงกลมสีฟุ้งๆ (Radial Gradient) อยู่มุมขวาบน (`.purple-blob`, `.pink-blob`)
- มี Mini-code block ด้านในเพื่อแสดงตัวอย่างง่ายๆ `A ➔ B`

**B. Split Layout (Dark/Light Panels) - ไฮไลต์สำคัญ**
- เหมาะสำหรับเปรียบเทียบ 2 สิ่ง (เช่น Compiler vs Interpreter) หรือแสดง Code ควบคู่กับ Interactive Flowchart
- โครงสร้าง: `.split-layout { display: grid; grid-template-columns: 1fr 1fr; border-radius: 24px; overflow: hidden; }`
- **ฝั่งซ้าย (Dark Panel):** พื้นหลัง `#0f172a` ตัวหนังสือขาว มักใช้แสดงโค้ด (`.code-editor`) และปุ่มรันโค้ด
- **ฝั่งขวา (Light Panel):** พื้นหลัง `#f8fafc` ใช้แสดงผังงาน (Flowchart) หรือแผงควบคุม UI ให้ผู้ใช้กด

**C. การ์ดเส้นขอบ (Outline Cards)**
- เหมาะสำหรับรายการประเภทต่างๆ (เช่น ชนิดตัวแปร, ภาษาโปรแกรม, เครื่องหมายเปรียบเทียบ)
- โครงสร้าง: การ์ดขอบสีเทา เมื่อ Hover เส้นขอบจะเปลี่ยนเป็นสีตามไอคอน (เหลือง แดง เขียว ม่วง) และมี Drop shadow แบบสีๆ (`box-shadow: 0 8px 25px rgba(..., 0.1)`)
- ด้านในมี `.outline-example` เป็นกล่องสีเทาอ่อนแสดงโค้ดสั้นๆ

**D. Timeline (Pill Tabs)**
- เหมาะสำหรับประวัติศาสตร์ หรือขั้นตอนต่างๆ
- โครงสร้าง: กลุ่มปุ่มกดทรงแคปซูล (`.pill-tabs`) เมื่อกดแล้วจะสลับเนื้อหากล่องด้านล่าง (Interactive ด้วย JS)

**E. Interactive Quiz / Checker**
- ท้ายบทต้องมี Quiz จำลอง
- ใช้ Split Layout: ฝั่งซ้ายเป็นโค้ดตรรกะตรวจคำตอบ, ฝั่งขวาเป็นปุ่มตัวเลือก และมี **วงกลมแสดงผลลัพธ์ (True/False)** ที่เปลี่ยนสีเขียว/แดง เมื่อตอบคำถาม

## ✍️ ข้อกำหนดด้านเนื้อหา (Content Rules)
- ไม่เขียนเป็นเรียงความยาวๆ ให้ใช้ Bullet points, ตัวหนา, และ Emojis
- เนื้อหาต้อง Interactive สูง ไม่มีการเลื่อนอ่านเนื้อหาเฉยๆ ต้องมีการกด (Click), เอาเมาส์ชี้ (Hover), หรือทดลองรันโค้ดจำลองเสมอ
