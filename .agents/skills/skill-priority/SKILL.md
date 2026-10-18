---
name: skill-priority
description: >-
  Provides recommendation order on which skill to choose based on the user's specific scenario or task.
  Use when deciding which skill to run first, second, and third, or resolving which tool fits the situation best.
---

# Skill Priority & Selection Hierarchy

คำแนะนำในการเลือกใช้สกิลเมื่อมีสกิลที่ทับซ้อนหรือทำหน้าที่คล้ายกันหลายตัว:

---

## 🔍 ตารางเปรียบเทียบสกิลที่ทับซ้อนกัน และลำดับคำแนะนำในการเลือกใช้

### 1. หมวดวางแผนและแตกงาน (Planning & Task Breakdown)
- 🥇 **อันดับ 1:** [`/to-spec`](file:///d:/ศึกษา%20skill/.agents/skills/to-spec/SKILL.md) + [`/to-tickets`](file:///d:/ศึกษา%20skill/.agents/skills/to-tickets/SKILL.md) (Matt Pocock) — สำหรับงานฟีเจอร์ทั่วไป แตกงานเป็นตั๋ว `.scratch/`
- 🥈 **อันดับ 2:** [`/plan-orchestrate`](file:///d:/ศึกษา%20skill/.agents/skills/plan-orchestrate/SKILL.md) / [`/orch-build-mvp`](file:///d:/ศึกษา%20skill/.agents/skills/orch-build-mvp/SKILL.md) (ECC) — เมื่องานใหญ่ระดับวางสถาปัตยกรรมทั้งระบบ
- 🥉 **อันดับ 3:** [`/make-plan`](file:///d:/ศึกษา%20skill/.agents/skills/make-plan/SKILL.md) + [`/do`](file:///d:/ศึกษา%20skill/.agents/skills/do/SKILL.md) (Claude-Mem) — เมื่อต้องการส่งงานให้ Subagents ขนานกัน
- 🏅 **อันดับ 4:** [`/paperclip-converting-plans-to-tasks`](file:///d:/ศึกษา%20skill/.agents/skills/paperclip-converting-plans-to-tasks/SKILL.md) (Paperclip) — เมื่อบริหารทีมที่มีหลาย Role และคุม Budget

---

### 2. หมวด TDD และการทดสอบ (Testing & TDD)
- 🥇 **อันดับ 1 (ใช้คู่กัน):** ใช้หลัก Seam ของ [`/tdd`](file:///d:/ศึกษา%20skill/.agents/skills/tdd/SKILL.md) (Matt Pocock) + ไวยากรณ์เฉพาะภาษาจาก `[ภาษา]-testing` ของ ECC (เช่น [`/react-testing`](file:///d:/ศึกษา%20skill/.agents/skills/react-testing/SKILL.md), [`/python-testing`](file:///d:/ศึกษา%20skill/.agents/skills/python-testing/SKILL.md))
- 🥈 **อันดับ 2:** [`/tdd-workflow`](file:///d:/ศึกษา%20skill/.agents/skills/tdd-workflow/SKILL.md) (ECC)

---

### 3. หมวดการแก้บั๊ก (Bug Fixing & Diagnosis)
- 🥇 **อันดับ 1:** [`/diagnosing-bugs`](file:///d:/ศึกษา%20skill/.agents/skills/diagnosing-bugs/SKILL.md) (Matt Pocock) — บังคับสร้างเทสต์ให้แดงก่อนแก้เสมอ ป้องกันการเดา
- 🥈 **อันดับ 2:** [`/orch-fix-defect`](file:///d:/ศึกษา%20skill/.agents/skills/orch-fix-defect/SKILL.md) (ECC) — ลูปแก้บั๊กแบบ Orchestration

---

### 4. หมวดการส่งต่องานข้ามเซสชัน (Handoff)
- 🥇 **อันดับ 1:** [`/mem-handoff`](file:///d:/ศึกษา%20skill/.agents/skills/mem-handoff/SKILL.md) (Claude-Mem) — แนะนำเมื่อปิดวันหรือ Context บวม เพราะบันทึก *"Failed Attempts (สิ่งที่ลองแล้วพัง)"*
- 🥈 **อันดับ 2:** [`/handoff`](file:///d:/ศึกษา%20skill/.agents/skills/handoff/SKILL.md) (Matt Pocock) — สำหรับส่งต่องานย่อยระหว่างเฟสภายในวัน

---

### 5. หมวดทำสไลด์และพรีเซนเทชัน (Presentation & Slides)
- 🥇 **อันดับ 1:** [`/ppt-master`](file:///d:/ศึกษา%20skill/.agents/skills/ppt-master/SKILL.md) — สำหรับสร้างไฟล์ `.pptx` จริง (16:9) แก้ไขต่อได้
- 🥈 **อันดับ 2:** [`/wowerpoint`](file:///d:/ศึกษา%20skill/.agents/skills/wowerpoint/SKILL.md) — สรุปเนื้อหาเป็นสไลด์ NotebookLM แบบกระชับ
- 🥉 **อันดับ 3:** [`/frontend-slides`](file:///d:/ศึกษา%20skill/.agents/skills/frontend-slides/SKILL.md) — สไลด์หน้าเว็บ HTML

---

### 6. หมวดความจำและการจัดการเอกสาร (Memory & Knowledge)
- 🥇 **อันดับ 1:** [`/mem-search`](file:///d:/ศึกษา%20skill/.agents/skills/mem-search/SKILL.md) (Claude-Mem) — ค้นหาประวัติและข้อตกลงในอดีตแบบประหยัดโทเคน
- 🥈 **อันดับ 2:** [`/para-memory-files`](file:///d:/ศึกษา%20skill/.agents/skills/para-memory-files/SKILL.md) (Paperclip) — จัดระเบียบไฟล์ความรู้แบบ PARA
- 🥉 **อันดับ 3:** [`/unified-memory`](file:///d:/ศึกษา%20skill/.agents/skills/unified-memory/SKILL.md) (ECC)

---

### 7. หมวดกฎควบคุมสติและการเขียนโค้ด (Coding Guardrails)
- 🥇 **อันดับ 1 (กฎเหล็กประจำใจ):** [`/karpathy-guidelines`](file:///d:/ศึกษา%20skill/.agents/skills/karpathy-guidelines/SKILL.md) — ห้ามเขียนโค้ดเผื่อ, Surgical changes เท่านั้น
- 🥈 **อันดับ 2 (การออกแบบ Interface):** [`/codebase-design`](file:///d:/ศึกษา%20skill/.agents/skills/codebase-design/SKILL.md) — ออกแบบ Deep Modules
