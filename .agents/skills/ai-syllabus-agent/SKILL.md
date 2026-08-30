---
name: ai-syllabus-agent
description: เอกสารคู่มือสำหรับระบบ AI Agent ร่างหลักสูตร (Syllabus Markdown) เรียกใช้เมื่อต้องซ่อมแซมหรือพัฒนาความสามารถของ AI ในระบบจัดการวิชาของครู
---

# ระบบ AI Syllabus Agent

ระบบนี้คือ AI Assistant ที่ฝังอยู่ในหน้า `TeacherSubjects.jsx` ซึ่งช่วยครูจัดทำโครงสร้างเนื้อหาหลักสูตร (Syllabus) แบบ Markdown

## โครงสร้างและส่วนประกอบสำคัญ

1. **`src/services/aiService.js`** 
   - จัดการเชื่อมต่อกับ Google Gemini API
   - `buildSystemInstruction(subjectData, currentMarkdown)`: ทำหน้าที่อัดฉีด Context ทั้งข้อมูลรายวิชาและ **เนื้อหา Markdown ปัจจุบัน** ให้ AI รับรู้
   - **Fallback Mechanism**: ดักจับ Error 503 (High Demand) และสลับใช้โมเดลสำรอง (เช่น `gemini-3.7-flash` -> `gemini-3.5-flash`) อัตโนมัติ

2. **`src/components/admin/SubjectAIAssistant.jsx`**
   - ส่วน UI หน้าต่างแชตที่อยู่ด้านขวาของกล่องข้อความ Markdown
   - **Parser System**: ดักจับคำสั่ง `<UPDATE_SYLLABUS>...</UPDATE_SYLLABUS>` จากคำตอบของ AI
   - เมื่อเจอแท็กนี้ จะดึงข้อความข้างในไปสั่ง **Replace** กล่อง Markdown อัตโนมัติ (ผ่าน `onApplyMarkdown(text, true)`)

3. **`src/pages/admin/TeacherSubjects.jsx`**
   - หน้า UI หลักสำหรับตารางสอนครู
   - มี **โหมดดูตัวอย่าง (Preview Mode)** ที่สลับดูระหว่าง Raw Markdown และ HTML Render (`react-markdown`)
   - ระบบ Auto-switch: เมื่อ AI Agent สั่งอัปเดตข้อความ ระบบจะสลับไปหน้า Preview อัตโนมัติเพื่อแสดงผลลัพธ์ที่สวยงามให้ครูเห็น

## กฎการแก้ไขระบบ AI Agent

1. **ห้ามลบแท็ก `<UPDATE_SYLLABUS>`**: แท็กนี้จำเป็นมากสำหรับการสั่งงาน Auto-apply 
2. **ห้ามเปลี่ยนแปลงรูปแบบประวัติแชต (History)**: Google Gemini บังคับให้ประวัติแชตต้องสลับกันระหว่าง `user` และ `model` หากเกิด Error ห้ามปล่อยให้ `user` ค้างอยู่ใน Array เด็ดขาด (ต้อง Revert history ทิ้ง)
3. **การส่ง Context**: `chatWithSyllabusAI` ต้องส่ง `currentMarkdown` เข้าไปทุกครั้ง เพื่อให้ AI มองเห็นเนื้อหาปัจจุบันเสมอ
