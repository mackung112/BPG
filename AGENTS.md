# 🤖 ศูนย์กลางปฏิบัติการ AI

โปรเจกต์ **"ห้องเรียนครูแม็ค"** — React 19, Tailwind CSS v4, Vite 8

---

## ⚙️ Skills (โหลดอัตโนมัติจาก `.agents/skills/`)

| Skill | หน้าที่ |
|---|---|
| `concise-response` | กฎตอบกระชับ ทำแค่ที่สั่ง |
| `react-tailwind-coding` | กฎเหล็กเขียนโค้ด + มาตรฐานคอมโพเนนต์ |
| `design-system` | โทเค็นสี ฟอนต์ เลย์เอาต์ คอมโพเนนต์ UI |
| `lesson-architecture` | สถาปัตยกรรมหลักสูตร + บริบทโปรเจกต์ |
| `curriculum-standard` | มาตรฐานโครงสร้างไฟล์หลักสูตรใน docs/curriculum |
| `svg-flowchart` | มาตรฐาน SVG และผังงาน |
| `quality-check` | ตรวจสอบคุณภาพก่อนจบงาน |
| `create-skills` | วิธีสร้าง skill ใหม่ |
| `ai-syllabus-agent` | AI ร่างหลักสูตรและสร้างเนื้อหา (CourseMaterials Workspace) |
| `import-external-content` | นำเข้าไฟล์ React/HTML จากภายนอก |
| `supabase` | จัดการระบบ Supabase (DB, Auth, Storage, Functions) |
| `supabase-postgres-best-practices` | มาตรฐานและแนวทางปฏิบัติที่ดีที่สุดสำหรับ Postgres/Supabase |
| `supabase-auth-admin` | การตั้งค่า Auth และสิทธิ์ Super Admin |
| `exam-system` | บริบทและกฎการแก้ไขระบบสอบ (ต้องอ่าน Context ก่อนแก้โค้ดทุกครั้ง) |
| `clean-architecture-react` | สถาปัตยกรรมโค้ดที่ถูกต้อง — บังคับแยก Services/Hooks/Components ห้าม Supabase ใน UI |
| `auto-subagent-delegation` | วิเคราะห์และแตกงานย่อยให้ Subagents ทำงานขนานกันอัตโนมัติ โดยไม่ต้องถาม |

---

## 🧠 กฎพฤติกรรมหลัก

1. **คุณภาพพรีเมียม** — ห้ามออกแบบพื้นฐาน
2. **ห้ามทิ้งงานกลางทาง** — โค้ดต้องรันได้ 100% ห้ามมี placeholder
3. **เขียนทับทันที** — สร้างคอมโพเนนต์ใหม่ 100% เขียนทับไฟล์เดิม
4. **ถามก่อนทำ** — หากไม่ชัดเจน ต้องถามก่อนเขียนโค้ด

---

## 🚀 กระบวนการส่งมอบ

- **เริ่มงาน**: ถามผู้ใช้หากไม่ชัดเจน → ลงมือทำ
- **จบงาน**: อัปเดต task.md → รัน `npx impeccable detect` → สรุปงาน
- **Git Sync**: `git fetch origin` → `git clean -fd` → `git reset --hard origin/main`
