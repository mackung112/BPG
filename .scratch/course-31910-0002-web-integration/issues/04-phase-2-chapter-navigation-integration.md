# 04: Phase 2 Chapter Navigation Integration (Units 4 - 7)

**What to build:**
Surgically enhance Chapters 4, 5, 6, and 7 (`4_focal_point_emphasis_31910_0002.html`, `5_placement_grouping_31910_0002.html`, `6_31910_0002.html`, `7_31910_0002.html`) with inter-chapter navigation while strictly preserving 100% of existing instructional content:
1. **Header Destination & Quick Chapter Switcher**:
   - Update header brand link from `href="#hero-stage"` to `href="index.html"`.
   - Add the identical "เลือกบทเรียน (Chapter Switcher)" button/modal in the header.
2. **Sidebar Curriculum Navigation**:
   - Add the "📑 โครงสร้าง 7 หน่วยการเรียนรู้" inter-chapter links section in `<aside id="sidebar">` below the existing chapter TOC.
3. **Bottom Inter-Chapter Navigation Dock**:
   - Insert standardized Neo-Vivid Pop bottom dock before `</main>`:
     - **Chapter 4**: `[⬅️ บทก่อนหน้า: บทที่ 3]` | `[🏠 สารบัญรวมวิชา]` | `[บทถัดไป: บทที่ 5 งานจัดวางตำแหน่งและจัดกลุ่มวัตถุ ➡️]`
     - **Chapter 5**: `[⬅️ บทก่อนหน้า: บทที่ 4]` | `[🏠 สารบัญรวมวิชา]` | `[บทถัดไป: บทที่ 6 งานสร้างชิ้นงานด้วยโปรแกรมสำเร็จรูป ➡️]`
     - **Chapter 6**: `[⬅️ บทก่อนหน้า: บทที่ 5]` | `[🏠 สารบัญรวมวิชา]` | `[บทถัดไป: บทที่ 7 งานออกแบบ แก้ไข และตกแต่งชิ้นงานกราฟิก ➡️]`
     - **Chapter 7**: `[⬅️ บทก่อนหน้า: บทที่ 6]` | `[🏠 สารบัญรวมวิชา]` | `[🎉 สำเร็จหลักสูตร / กลับหน้าหลัก 🏆]`
4. **Learning State Synchronization**:
   - Add lightweight snippet before `</body>` to record visited status and mark course completion on Chapter 7 in `localStorage`.
5. **Strict Content Preservation Guarantee**:
   - Ensure all text, interactive simulators, vector canvas tools, quizzes, rubrics, and comments remain completely intact.

**Target Files:**
- `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก\4_focal_point_emphasis_31910_0002.html`
- `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก\5_placement_grouping_31910_0002.html`
- `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก\6_31910_0002.html`
- `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก\7_31910_0002.html`

**Blocked by:** 03 (Phase 1 Chapter Navigation Integration)

**Status:** resolved

- [x] Update header brand link and insert Quick Chapter Switcher in Chapters 4, 5, 6, and 7.
- [x] Add 7-unit inter-chapter navigation block in sidebar of Chapters 4, 5, 6, and 7.
- [x] Insert bottom inter-chapter navigation dock before `</main>` in Chapters 4, 5, 6, and 7.
- [x] Add `localStorage` progress tracking script snippet.
- [x] Verify zero content loss and file sizes do not decrease.
