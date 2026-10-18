# 🏛️ Skill Vault (คลังสำรองสกิลและเครื่องมือ)

โฟลเดอร์ `_vault` นี้ทำหน้าที่เป็น **"โกดังเก็บเครื่องมือสำรอง"** เพื่อป้องกันปัญหา **Token Overhead เกินงบ (Budget Exceeded)** ใน Antigravity และ Claude Code

---

## 📊 สถานะการจัดเก็บ

- **Skills ในคลังสำรอง:** 336 สกิล (ภาษาเฉพาะทาง เช่น C++, C#, Java, Swift, Rust, Perl, Ruby, PHP ฯลฯ)
- **Subagents ในคลังสำรอง:** 71 ตัว
- **Workflows ในคลังสำรอง:** 97 ตัว
- **Core Skills ที่เปิดใช้งานในโปรเจกต์ (`.agents/skills/`):** 53 สกิลสำคัญ

---

## 🛠️ วิธีดึงเครื่องมือจาก Vault ออกมาใช้งาน

คุณสามารถสั่งให้ AI ดึงออกมาให้ หรือใช้สคริปต์ใน PowerShell ได้ตามสะดวก:

### 1. สั่งผ่าน AI ในแชท:
> *"ช่วยดึงสกิล rust-patterns ออกมาจาก Vault ให้หน่อย"*  
> *"อยากได้ subagent ชื่อ cpp-reviewer ดึงออกมาให้ที"*

### 2. รันสคริปต์ใน PowerShell:
```powershell
# ดึงสกิลมาใช้งาน
.\pull-skill.ps1 rust-patterns

# ดึงบอท (Subagent) มาใช้งาน
.\pull-skill.ps1 cpp-reviewer -Type agent

# ดึงเวิร์กโฟลว์มาใช้งาน
.\pull-skill.ps1 fastapi-review -Type workflow
```

---

## 📦 วิธีย้ายเครื่องมือกลับเข้า Vault (เมื่อใช้งานเสร็จเพื่อประหยัด Token)

```powershell
# ย้ายสกิลกลับเข้า Vault
.\stash-skill.ps1 rust-patterns
```

---

## 📑 รายชื่อ Core Skills 53 ตัวที่เปิดใช้งานตลอดเวลา:
1. `karpathy-guidelines` (กฎเหล็ก 4 ข้อคุมสติ AI)
2. **Matt Pocock Edition:** `ask-matt`, `to-spec`, `to-tickets`, `implement`, `tdd`, `code-review`, `diagnosing-bugs`, `retro`, `handoff`, `grill-with-docs`, `grill-me`, `grilling`, `domain-modeling`, `codebase-onboarding`, `codebase-design`, `make-plan`, `do`, `build`, `prototype`, `pr`, `writing-for-agents`, `what-the`, `wowerpoint`, `council`, `search-first`, `taste`
3. **Claude-Mem:** `mem-search`, `mem-handoff`, `how-it-works`, `knowledge-agent`, `smart-explore`, `learn-codebase`
4. **Paperclip:** `paperclip`, `paperclip-board`, `paperclip-converting-plans-to-tasks`, `paperclip-create-agent`, `para-memory-files`, `slack`
5. **Design & Presentation:** `ppt-master`, `diagram-design`, `make-interfaces-feel-better`
6. **ECC Architecture & Universal Best Practices:** `security-review`, `backend-patterns`, `frontend-patterns`, `api-design`, `docker-patterns`, `postgres-patterns`, `git-workflow`, `conventional-commit-review`, `error-handling`, `strategic-compact`
7. **Router:** `skill-priority`
