# 🤖 ศูนย์กลางปฏิบัติการ AI

ไฟล์นี้คือจุดเริ่มต้นของระบบ AI สำหรับโปรเจกต์ **"ห้องเรียนครูแม็ค"**
ควบคุมพฤติกรรม กระบวนการทำงาน และความประณีตของ AI

---

## 📚 1. แผนผังหน่วยความจำ

| ไฟล์ | หน้าที่ |
|---|---|
| [\Teach\AGENTS.md](\Teach\AGENTS.md) | จุดเริ่มต้น กำหนดบทบาทและพฤติกรรม AI |
| [\Teach\SKILL.md](\Teach\SKILL.md) | กฎเขียนโค้ด React 19, Tailwind v4, สถาปัตยกรรมหลักสูตร |
| [\Teach\DESIGN.md](\Teach\DESIGN.md) | โทเค็นสี ฟอนต์ เลย์เอาต์ คอมโพเนนต์ UI |
| [\Teach\CONTEXT.md](\Teach\CONTEXT.md) | ภาพรวมโปรเจกต์ โครงสร้างไฟล์ สถาปัตยกรรมปัจจุบัน |
| [\Teach\task.md](\Teach\task.md) | รายการงานปัจจุบัน บันทึกส่งมอบ |

เมื่อมีข้อตกลงหรือบทเรียนใหม่ AI **ต้อง**อัปเดตลงในไฟล์ที่เกี่ยวข้องทันที

---

## ⚙️ 2. ชุดทักษะพิเศษ

ชุดทักษะจาก agentskills.io ใน `.gemini/skills/`, `.claude/skills/`, `.agents/skills/`:

* 🛠️ **[impeccable](file:///d:/Teach/.gemini/skills/impeccable)** — สแกนความประณีต UI ด้วย `npx impeccable detect`
* ⚛️ **[vercel-react-best-practices](file:///d:/Teach/.agents/skills/vercel-react-best-practices)** — ควบคุมคุณภาพ React 19
* 🎨 **[tailwind-v4-shadcn](file:///d:/Teach/.agents/skills/tailwind-v4-shadcn)** — ควบคุม Tailwind CSS v4

---

## 🧠 3. กฎพฤติกรรมหลัก

1. **คุณภาพพรีเมียม** — ห้ามออกแบบพื้นฐาน สร้าง Simulator เฉพาะหัวข้อที่มีโจทย์กำหนดไว้
2. **ห้ามทิ้งงานกลางทาง** — โค้ดต้องรันได้ 100% ห้ามมี placeholder หรือเครื่องหมายละไว้
3. **เขียนทับทันที** — สร้างคอมโพเนนต์ใหม่ 100% เขียนทับไฟล์เดิม **ห้ามเปิดอ่านไฟล์โค้ดเก่า**เด็ดขาด
4. **ประสานงานผ่าน Checklist** — จัดการงานผ่าน `\Teach\task.md` เสร็จแล้วลบออกทันที
5. **ถามก่อนทำ** — หากข้อกำหนดไม่ชัดเจน ต้องตั้งคำถามก่อนเขียนโค้ดเสมอ

> กฎเทคนิคเพิ่มเติม → ดู [SKILL.md](\Teach\SKILL.md) | กฎดีไซน์ → ดู [DESIGN.md](\Teach\DESIGN.md)

---

## 🚀 4. กระบวนการส่งมอบ

- **เริ่มงาน**: ถามผู้ใช้หากไม่ชัดเจน → อ่าน SKILL.md + DESIGN.md → ลงมือทำ
- **จบงาน**: อัปเดต task.md → รัน `npx impeccable detect` → สรุปงาน
- **Git Sync**: เมื่อผู้ใช้สั่ง "ดึงข้อมูลล่าสุด" → `git fetch origin` → `git clean -fd` → `git reset --hard origin/main`
