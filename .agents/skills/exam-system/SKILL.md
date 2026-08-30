---
name: exam-system
description: บริบทและกฎการแก้ไขระบบสอบออนไลน์ (Exam System) เรียกใช้เมื่อแก้ไข สร้าง หรือ Refactor โค้ดที่เกี่ยวข้องกับระบบสอบ ห้องสอบ คะแนนสอบ สอบซ่อม Anti-Cheat หรือ Realtime ของระบบสอบ
---

# 🎓 Exam System Skill

ใช้สกิลนี้เมื่อได้รับคำสั่งที่เกี่ยวข้องกับ:
- หน้า ExamControl, ExamResults, ExamLobby, ExamRoom, ExamResult
- ตาราง exam_sessions, exam_participants, exam_results, exam_session_questions
- ระบบ Anti-Cheat, Timer, สอบซ่อม (Retake), Realtime
- QuestionPicker หรือระบบเลือกชุดข้อสอบ

---

## 📖 ขั้นตอนบังคับก่อนเขียนโค้ด

**ก่อนแก้ไขโค้ดใดๆ ในระบบสอบ ต้องอ่านไฟล์ต่อไปนี้ก่อนเสมอ:**

1. **อ่าน Context:** `docs/features/exam-system-context.md`
   - เข้าใจ DB Schema ทุกตาราง
   - เข้าใจ State Machine (Session Status + Participant Status)
   - เข้าใจ Interaction Flow (ครูกดอะไร → นักเรียนเกิดอะไร)
   - เข้าใจ Realtime Channels ทั้ง 6 ช่อง
   - เข้าใจ Anti-Cheat 8 กลไก

2. **อ่าน Active Task:** `docs/ACTIVE_TASK.md`
   - ตรวจสอบว่าตอนนี้กำลังทำงานอะไรอยู่
   - ตรวจสอบว่ามีแผน Refactor ค้างอยู่หรือไม่

3. **จากนั้นค่อยอ่านโค้ดไฟล์ที่เกี่ยวข้อง**

---

## ⚠️ กฎเหล็กเมื่อแก้ไขระบบสอบ

### ห้ามทำ (Breaking Changes)
- ❌ ห้ามเปลี่ยนชื่อ Realtime Channel — จะทำให้ฝั่งนักเรียนกับฝั่งครูไม่ sync กัน
- ❌ ห้ามเปลี่ยน Status Flow (waiting → active → completed) — จะทำให้ Lobby ไม่เด้งเข้า ExamRoom
- ❌ ห้ามลบ `saved_exam_state` logic — จะทำให้ระบบ "แก้ข้อสอบเดิม (Continue)" พัง
- ❌ ห้ามเปลี่ยน `is_suspended` logic ใน exam_results — จะทำให้คะแนนสอบซ่อมคำนวณผิด
- ❌ ห้ามแก้ Anti-Cheat โดยไม่ทดสอบทั้ง Onsite และ Online mode

### ต้องทำเสมอ
- ✅ ทุกครั้งที่แก้ฝั่งครู (ExamControl) ต้องตรวจสอบว่าผลกระทบต่อฝั่งนักเรียน (ExamLobby/ExamRoom) ยังถูกต้อง
- ✅ ทุกครั้งที่แก้ Timer ต้องทดสอบกับ Sleep Detection (> 30 วินาที) ด้วย
- ✅ ทุกครั้งที่แก้ Retake Flow ต้องตรวจสอบทั้ง 3 เส้นทาง: (1) ครูอนุมัติจาก ExamControl (2) ครูอนุมัติจาก ExamResults (3) นักเรียนกดเริ่มเองใน Online Mode

---

## 🗂️ File Map

| ไฟล์ | หน้าที่ | ขนาด |
|---|---|---|
| `src/pages/admin/ExamControl.jsx` | แผงควบคุมสอบ (สร้างห้อง/เริ่ม/จบ/จัดการผู้สอบ) | ~1,441 บรรทัด |
| `src/pages/admin/ExamResults.jsx` | สรุปคะแนน + ระบบสอบซ่อม + Export CSV | ~1,191 บรรทัด |
| `src/pages/admin/QuestionPicker.jsx` | Modal เลือกข้อสอบ | - |
| `src/pages/exam/ExamLobby.jsx` | ห้องรอสอบ (นักเรียน) | ~315 บรรทัด |
| `src/pages/exam/ExamRoom.jsx` | ห้องสอบ + Anti-Cheat + Timer (นักเรียน) | ~1,202 บรรทัด |
| `src/pages/exam/ExamResult.jsx` | ผลสอบรายคน + ขอสอบซ่อม (นักเรียน) | ~361 บรรทัด |

---

## 📝 อัปเดต Context หลังแก้โค้ด

เมื่อแก้ไขโค้ดระบบสอบเสร็จแล้ว ต้อง:
1. อัปเดต `docs/features/exam-system-context.md` ให้ตรงกับโค้ดใหม่
2. อัปเดต `docs/ACTIVE_TASK.md` ให้สะท้อนสถานะงานล่าสุด
