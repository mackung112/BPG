# 02: Master Curriculum Hub (index.html) Creation

**What to build:**
Create the master course portal `index.html` inside `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก\index.html`:
1. **Neo-Vivid Pop Design System Alignment**:
   - Distinctive Vivid Pop visual language (Prompt, Sarabun, JetBrains Mono, `#110B1E` 2px borders, 5px solid offset pop shadows, vivid palette `#FF006E`, `#8338EC`, `#FFBE0B`, `#00F5D4`).
   - Sticky top glassmorphic header with course code, name, and institution branding (วิทยาลัยการอาชีพบ้านโป่ง).
2. **Hero Section & Curriculum Overview**:
   - Course overview: 31910-0002 องค์ประกอบศิลป์สำหรับงานกราฟิก, 3 หน่วยกิต, 4 ชั่วโมง/สัปดาห์ (ท2/ป2 รวม 72 ชม.).
   - Instructor profile: นายธิติวุฒิ จันทร์โสม.
   - Core statistics counter: 7 หน่วยการเรียนรู้, 72 ชั่วโมง, 14 เครื่องมือจำลองและแบบทดสอบ, 100 คะแนนเต็ม.
3. **Smart "Resume Learning" (เรียนต่อจากครั้งล่าสุด) CTA**:
   - Reads `localStorage` for `bpg_course_31910_0002_state` to find the furthest uncompleted or last visited chapter.
   - Provides a prominent 1-click CTA button pointing directly to that chapter.
4. **7 Unit Roadmap Grid Cards**:
   - 7 interactive cards for Units 1 to 7 with unit badge, duration, formative points, competency description, and direct link.
   - Dynamic progress indicators (Not Started / In Progress / Completed) synced with `localStorage`.
5. **Standalone Offline Compatibility**:
   - Fully functional offline or via `file://` protocol with zero external server dependencies.

**Target File:**
- `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก\index.html`

**Blocked by:** 01 (E2E Navigation Test Suite)

**Status:** resolved

- [x] Create `index.html` with Neo-Vivid Pop layout and responsive Tailwind CSS configuration.
- [x] Implement course metadata header, hero stage, and summary stat cards.
- [x] Render all 7 unit roadmap cards with correct relative links to existing chapter files.
- [x] Implement client-side `localStorage` reader for Smart Resume Learning button and chapter progress indicators.
- [x] Verify keyboard navigation and responsive mobile ergonomics.
