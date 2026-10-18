# Agent Guidelines & Skills Configuration

## Agent skills

### Issue tracker

Local markdown issue tracking under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical roles mapped 1:1 (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo (`GLOSSARY.md` and `docs/adr/`). See `docs/agents/domain.md`.

### Automatic Skill Vault Discovery & Just-In-Time Activation

The project maintains an offloaded skill vault in `_vault/` (indexed in `_vault/CATALOG.md`) containing 336 specialized skills, 71 subagents, and 97 workflows to minimize persistent token overhead.
When the user asks to work with a specific technology, language, framework, or task that is not present in `.agents/skills/` (for example: Rust, Go, Python/Django, SpringBoot, Kubernetes, Flutter, Remotion, Manim, etc.):
1. **Zero-effort for user**: The user does NOT need to remember skill names or explicitly ask to pull tools.
2. **Autonomous Look-up**: The agent MUST check `_vault/CATALOG.md` or search `_vault/skills/` for relevant skills.
3. **Just-In-Time Reading or Activation**:
   - For quick answers or isolated tasks: Read the skill's `SKILL.md` directly from `_vault/skills/<skill-name>/SKILL.md` to apply its best practices without polluting persistent tokens.
   - For sustained feature implementation: Run `.\pull-skill.ps1 <skill-name>` to activate it into `.agents/skills/` for the duration of the feature work.
   - Inform the user briefly that the skill was automatically retrieved from the vault to assist them.

---

# 🤖 ศูนย์กลางปฏิบัติการ AI (ห้องเรียนครูแม็ค)

โปรเจกต์ **"ห้องเรียนครูแม็ค"** — React 19, Tailwind CSS v4, Vite 8

## ⚙️ Core Skills ที่เปิดใช้งานประจำการ (`.agents/skills/`)

### 1. หมวดความสามารถสากลและระบบวิศวกรรม (Global & Engineering Suites)
- **Andrej Karpathy Guidelines:** `karpathy-guidelines` (กฎเหล็ก 4 ข้อคุมสติ AI, ห้ามเดาใจ, Surgical Changes)
- **Matt Pocock Edition:** `ask-matt`, `to-spec`, `to-tickets`, `implement`, `tdd`, `code-review`, `diagnosing-bugs`, `retro`, `handoff`, `grill-with-docs`, `grill-me`, `grilling`, `domain-modeling`, `codebase-onboarding`, `codebase-design`, `make-plan`, `do`, `build`, `prototype`, `pr`, `writing-for-agents`, `what-the`, `wowerpoint`, `council`, `search-first`, `taste`
- **Claude-Mem:** `mem-search`, `mem-handoff`, `how-it-works`, `knowledge-agent`, `smart-explore`, `learn-codebase`
- **Paperclip:** `paperclip`, `paperclip-board`, `paperclip-converting-plans-to-tasks`, `paperclip-create-agent`, `para-memory-files`, `slack`
- **Design & Presentation:** `ppt-master`, `diagram-design`, `make-interfaces-feel-better`
- **ECC Architecture & Universal Best Practices:** `security-review`, `backend-patterns`, `frontend-patterns`, `api-design`, `docker-patterns`, `postgres-patterns`, `git-workflow`, `conventional-commit-review`, `error-handling`, `strategic-compact`
- **Router:** `skill-priority`

### 2. หมวดเฉพาะทางของโปรเจกต์ (Local Project Skills)
| Skill | หน้าที่ |
|---|---|
| `clean-architecture-react` | สถาปัตยกรรมโค้ดที่ถูกต้อง — บังคับแยก Services/Hooks/Components ห้าม Supabase ใน UI |
| `react-tailwind-coding` | กฎเหล็กเขียนโค้ด React 19 + Tailwind CSS v4 + มาตรฐานคอมโพเนนต์ |
| `design-system` | โทเค็นสี ฟอนต์ เลย์เอาต์ คอมโพเนนต์ UI ประจำโปรเจกต์ |
| `lesson-architecture` | สถาปัตยกรรมหลักสูตร + บริบทโปรเจกต์ LMS |
| `svg-flowchart` | มาตรฐาน SVG และผังงาน |
| `ai-syllabus-agent` | AI ร่างหลักสูตรและสร้างเนื้อหา (CourseMaterials Workspace) |
| `import-external-content` | นำเข้าไฟล์ React/HTML จากภายนอก |
| `supabase` | จัดการระบบ Supabase (DB, Auth, Storage, Functions) |
| `supabase-postgres-best-practices` | มาตรฐานและแนวทางปฏิบัติที่ดีที่สุดสำหรับ Postgres/Supabase |
| `supabase-auth-admin` | การตั้งค่า Auth และสิทธิ์ Super Admin |

---

## 🧠 กฎพฤติกรรมหลัก

1. **ใช้การตั้งค่าใหม่เป็นหลัก** — ปฏิบัติตามแนวทางของระบบ Skill Vault, Triage labels, Issue tracker และ Domain docs อย่างเคร่งครัด
2. **คุณภาพพรีเมียม** — ห้ามออกแบบพื้นฐาน
3. **ห้ามทิ้งงานกลางทาง** — โค้ดต้องรันได้ 100% ห้ามมี placeholder
4. **เขียนทับทันที** — สร้างคอมโพเนนต์ใหม่ 100% เขียนทับไฟล์เดิม
5. **ถามก่อนทำ** — หากไม่ชัดเจน ต้องถามก่อนเขียนโค้ด

---

## 🚀 กระบวนการส่งมอบ

- **เริ่มงาน**: ตรวจสอบสกิลที่ตรงกับงาน (รวมถึงการค้นหาใน `_vault/CATALOG.md` อัตโนมัติหากไม่มีในระบบ) → ถามผู้ใช้หากไม่ชัดเจน → ลงมือทำ
- **จบงาน**: สรุปงานกระชับ ชัดเจน
- **Git Sync**: `git fetch origin` → `git clean -fd` → `git reset --hard origin/main`

---

## 📚 ไฟล์คู่มือการใช้งานที่พร้อมศึกษา (Master Guides)
- [คู่มือการใช้งานรวม (Master Guide)](docs/manuals/คู่มือการใช้งาน.md)
- [คู่มือ ลำดับคำแนะนำการเลือกใช้สกิล](docs/manuals/คู่มือ%20ลำดับคำแนะนำการเลือกใช้สกิล.md)
- [คู่มือ สกิล Andrej Karpathy](docs/manuals/คู่มือ%20สกิล%20Andrej%20Karpathy.md)
- [คู่มือ สกิล Matt Pocock Edition](docs/manuals/คู่มือ%20สกิล%20Matt%20Pocock%20Edition.md)
- [คู่มือ สกิล ECC](docs/manuals/คู่มือ%20สกิล%20ECC.md)
- [คู่มือ สกิล Claude-Mem](docs/manuals/คู่มือ%20สกิล%20Claude-Mem.md)
- [คู่มือ สกิล Paperclip](docs/manuals/คู่มือ%20สกิล%20Paperclip.md)
- [คู่มือ สกิล PPT Master](docs/manuals/คู่มือ%20สกิล%20PPT%20Master.md)
- [คู่มือ สกิล Diagram Design](docs/manuals/คู่มือ%20สกิล%20Diagram%20Design.md)
- [คู่มือ การสร้าง UI UX Design System](docs/manuals/คู่มือ%20การสร้าง%20UI%20UX%20Design%20System.md)
