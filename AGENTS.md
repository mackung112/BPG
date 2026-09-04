# 🤖 ศูนย์กลางปฏิบัติการ AI

โปรเจกต์ **"ห้องเรียนครูแม็ค"** — React 19, Tailwind CSS v4, Vite 8

---

## ⚙️ Skills (โหลดอัตโนมัติจาก `.agents/skills/`)

### ⚡ Matt Pocock Skills (บังคับตรวจสอบและเรียกใช้ก่อนเสมอ)
> **กฎเหล็ก**: ทุกการทำงาน ให้พิจารณาและเรียกใช้งานสกิลของ **mattpocock/skills** ก่อนเสมอ หากตรงกับกระบวนการ เช่น วางแผน/ถามความต้องการ (`grill-me`, `grill-with-docs`), ออกแบบระบบ (`codebase-design`, `domain-modeling`), พัฒนา/แก้ไข (`implement`, `diagnosing-bugs`, `tdd`), หรือตรวจโค้ด (`code-review`)

| Skill | คำอธิบาย |
|---|---|
| `grill-me` / `grill-with-docs` | ซักถามรายละเอียดความต้องการเชิงลึกก่อนเริ่มงาน (Grilling session) |
| `diagnosing-bugs` | สืบสวน ค้นหาสาเหตุ และแก้ไขบั๊กอย่างเป็นระบบ |
| `implement` / `implement-spec` | ดำเนินการลงมือเขียนโค้ดตาม Spec หรือแนวทางที่กำหนด |
| `tdd` | พัฒนาโค้ดด้วยแนวคิด Test-Driven Development |
| `code-review` | รีวิวคุณภาพโค้ด ตรวจสอบสถาปัตยกรรมและความปลอดภัย |
| `codebase-design` | วางโครงสร้างสถาปัตยกรรมและออกแบบโมดูล |
| `domain-modeling` | จัดการโมเดลโดเมน ภาษาที่ใช้ร่วมกัน และ ADR |
| `to-spec` / `to-tickets` | แปลงโจทย์เป็น Requirement Specification และ Tickets |
| `triage` | ประเมินและจัดประเภทปัญหา/งานตามสถานะ |
| `wayfinder` | แผนที่นำทางการทำงานและงานย่อยที่เกี่ยวเนื่อง |
| `setup-matt-pocock-skills` | ตั้งค่า Issue tracker, ADR และ Domain docs |

### 🛠️ Local Project Skills
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

1. **ลำดับการใช้สกิล**: ทุกครั้งที่ได้รับโจทย์ **ต้องประเมินและเรียกใช้สกิลจาก `mattpocock/skills` ก่อนเสมอ** (เช่น `grill-me`, `grill-with-docs`, `diagnosing-bugs`, `implement`, `code-review`)
2. **คุณภาพพรีเมียม** — ห้ามออกแบบพื้นฐาน
3. **ห้ามทิ้งงานกลางทาง** — โค้ดต้องรันได้ 100% ห้ามมี placeholder
4. **เขียนทับทันที** — สร้างคอมโพเนนต์ใหม่ 100% เขียนทับไฟล์เดิม
5. **ถามก่อนทำ** — หากไม่ชัดเจน ต้องถามก่อนเขียนโค้ด

---

## 🧭 Agent skills configuration

### Issue tracker
GitHub Issues (`gh` CLI). ดูรายละเอียดที่ `docs/agents/issue-tracker.md`.

### Triage labels
5 canonical triage roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). ดูรายละเอียดที่ `docs/agents/triage-labels.md`.

### Domain docs
Single-context (`CONTEXT.md` และ `docs/adr/`). ดูรายละเอียดที่ `docs/agents/domain.md`.

---

## 🚀 กระบวนการส่งมอบ

- **เริ่มงาน**: ตรวจสอบสกิล Matt Pocock ที่ตรงกับงาน → ถามผู้ใช้หากไม่ชัดเจน → ลงมือทำ
- **จบงาน**: อัปเดต task.md → รัน `npx impeccable detect` → สรุปงาน
- **Git Sync**: `git fetch origin` → `git clean -fd` → `git reset --hard origin/main`
