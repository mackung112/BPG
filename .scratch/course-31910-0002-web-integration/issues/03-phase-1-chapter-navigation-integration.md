# 03: Phase 1 Chapter Navigation Integration (Units 1 - 3)

**What to build:**
Surgically enhance Chapters 1, 2, and 3 (`1_31910_0002.html`, `2_31910_0002.html`, `3_space_31910_0002.html`) with inter-chapter navigation while strictly preserving 100% of existing instructional content:
1. **Header Destination & Quick Chapter Switcher**:
   - Update header brand link from `href="#hero-stage"` to `href="index.html"`.
   - Add a "เลือกบทเรียน (Chapter Switcher)" button and modal/dropdown in the header allowing immediate jump to any of the 7 chapters.
2. **Sidebar Curriculum Navigation**:
   - Add a dedicated "📑 โครงสร้าง 7 หน่วยการเรียนรู้" inter-chapter links section in `<aside id="sidebar">` below the existing chapter TOC.
3. **Bottom Inter-Chapter Navigation Dock**:
   - Insert standardized Neo-Vivid Pop bottom dock before `</main>`:
     - **Chapter 1**: `[🏠 สารบัญรวมวิชา (Hub)]` | `[บทถัดไป: บทที่ 2 งานประยุกต์ใช้หลักการและกฎเกณฑ์องค์ประกอบศิลป์ ➡️]`
     - **Chapter 2**: `[⬅️ บทก่อนหน้า: บทที่ 1]` | `[🏠 สารบัญรวมวิชา]` | `[บทถัดไป: บทที่ 3 งานออกแบบและจัดพื้นที่ (Space) ➡️]`
     - **Chapter 3**: `[⬅️ บทก่อนหน้า: บทที่ 2]` | `[🏠 สารบัญรวมวิชา]` | `[บทถัดไป: บทที่ 4 งานสร้างจุดสนใจและการเน้นวัตถุ ➡️]`
4. **Learning State Synchronization**:
   - Add lightweight snippet before `</body>` to record current unit as visited in `localStorage.setItem('bpg_course_31910_0002_state', ...)`.
5. **Strict Content Preservation Guarantee**:
   - Ensure all text, interactive simulators, color analyzers, quizzes, rubrics, and comments remain completely intact.

**Target Files:**
- `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก\1_31910_0002.html`
- `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก\2_31910_0002.html`
- `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก\3_space_31910_0002.html`

**Blocked by:** 02 (Master Curriculum Hub Creation)

**Status:** resolved

- [x] Update header brand link and insert Quick Chapter Switcher in Chapters 1, 2, and 3.
- [x] Add 7-unit inter-chapter navigation block in sidebar of Chapters 1, 2, and 3.
- [x] Insert bottom inter-chapter navigation dock before `</main>` in Chapters 1, 2, and 3.
- [x] Add `localStorage` progress tracking script snippet.
- [x] Verify zero content loss and file sizes do not decrease.
