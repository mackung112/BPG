# Spec: Master Hub & Inter-Chapter Navigation Integration (31910-0002 องค์ประกอบศิลป์สำหรับงานกราฟิก)

Status: ready-for-agent

## Problem Statement

The courseware for **31910-0002 องค์ประกอบศิลป์สำหรับงานกราฟิก** (หลักสูตรประกาศนียบัตรวิชาชีพชั้นสูง พุทธศักราช 2567, วิทยาลัยการอาชีพบ้านโป่ง) contains 7 comprehensive standalone interactive HTML lessons (`1_31910_0002.html` through `7_31910_0002.html`). While each lesson features rich instructional explanations, interactive visual simulators (color palette pickers, rule-of-thirds grids, Gestalt grouping testers), interactive quizzes, and discussion boards, the lessons currently suffer from complete navigational isolation:

1. **Dead-End Chapter Terminations**: When a student reaches the end of Chapter 1, there is no button or interactive link to proceed directly to Chapter 2. The page abruptly terminates after the discussion comments section.
2. **Missing Master Curriculum Portal (`index.html`)**: There is no central landing dashboard to present course information, instructor profile (นายธิติวุฒิ จันทร์โสม), 7-unit learning trajectory, learning hours (72 hours total, 4 hours/week), scoring structure (100 total points across units), or overall progress.
3. **Broken Header Brand Destination**: The top header brand logo in all 7 files points to internal anchor `href="#hero-stage"` instead of routing back to the master course portal.
4. **Intra-Chapter Only Sidebar**: The sidebar table of contents in each file only indexes internal sections of that specific chapter; students cannot jump to other chapters without manually editing browser URLs.
5. **No Cross-Chapter Continuity / Progress Memory**: Students cannot see their cumulative learning progress across all 7 units, nor does the system remember which chapter was visited last to allow seamless continuation.

Crucially, **the user has explicitly mandated that zero content may be removed or reduced** ("ห้ามลดเนื้อหาในไฟล์ แค่ปรับในส่วนการเชื่อมกันพอ"). All existing explanations, interactive modules, rubrics, simulators, and styles must be 100% retained, with modifications strictly limited to navigation anchors, inter-chapter docking bars, chapter switchers, and the master portal.

---

## Solution

Build a unified, seamless multi-page educational web system connecting all 7 lessons without touching or degrading the rich instructional content:

1. **Master Curriculum Hub (`index.html`)**:
   - Create a dedicated portal page matching the existing Neo-Vivid Pop design language (Prompt, Sarabun, JetBrains Mono, `#110B1E` ink borders with 5px solid offset drop shadows, vivid accents `#FF006E`, `#8338EC`, `#FFBE0B`, `#00F5D4`).
   - Feature a "เรียนต่อจากครั้งล่าสุด (Resume Learning)" smart CTA button automatically detecting and launching the last viewed or uncompleted chapter via `localStorage`.
   - Visual Course Roadmap displaying all 7 Units with unit titles, competencies, study hours, formative points, and direct entry cards.
   - Cumulative course metrics (7 หน่วยการเรียนรู้, 72 ชั่วโมง, 14+ เครื่องมือจำลองและแบบทดสอบ, 100 คะแนนเต็ม).
   - Quick link to curriculum documentation, syllabus details, and instructor information.

2. **Unified Bottom Inter-Chapter Navigation Dock**:
   - In all 7 files, inject a standardized bottom navigation section directly before `</main>`:
     - **Chapter 1**: "🏠 สารบัญหลักสูตร (Hub)" | "บทถัดไป: บทที่ 2 งานประยุกต์ใช้หลักการและกฎเกณฑ์องค์ประกอบศิลป์ ➡️"
     - **Chapters 2-6**: "⬅️ บทก่อนหน้า: บทที่ $N-1$..." | "🏠 สารบัญหลักสูตร" | "บทถัดไป: บทที่ $N+1$... ➡️"
     - **Chapter 7**: "⬅️ บทก่อนหน้า: บทที่ 6..." | "🏠 สารบัญหลักสูตร" | "🎉 สำเร็จหลักสูตร / ดูผลการเรียนรู้ 🏆"
   - Styled with responsive Neo-Brutalist cards, clear hover elevation, and keyboard/touch accessible buttons ($\ge 48\text{px}$).

3. **Global Header & Sidebar Inter-Chapter Teleportation**:
   - Update header brand link in all 7 files from `href="#hero-stage"` to `href="index.html"`.
   - Add a "เลือกบทเรียน (Chapter Switcher)" button/dropdown in the top navigation header and sidebar that allows instantaneous 1-click navigation to any of the 7 chapters from anywhere in any lesson.
   - In `<aside id="sidebar">`, append a dedicated "📑 โครงสร้างทั้ง 7 หน่วยการเรียนรู้" accordion or quick-links section below the intra-chapter TOC.

4. **Progress Continuity Engine (Zero External Dependencies)**:
   - Lightweight, robust client-side `localStorage` state management tracking visited chapters, reading completion, and quiz scores.
   - Synchronizes seamlessly between the master `index.html` dashboard and all individual lesson files.

5. **100% Content Integrity Enforcement**:
   - Strict rule: All text, interactive widgets, HTML structure, scripts, styles, and data within chapters 1-7 remain completely intact. Changes are surgical insertions for navigation docks and header/sidebar navigation bridges only.

---

## User Stories

1. As a vocational student, I want a central course homepage (`index.html`) so that I can see the complete overview of Course 31910-0002, all 7 units, and the overall curriculum roadmap.
2. As a student, I want a "Resume Learning" button on the course hub so that I can immediately continue studying where I left off without searching for my previous chapter.
3. As a student finishing Chapter 1, I want a clear "Next Chapter" button at the bottom of the page so that I can proceed directly to Chapter 2 without having to return to the root folder or edit the URL.
4. As a student studying Chapter 2, I want a "Previous Chapter" button at the bottom of the page so that I can quickly review Chapter 1 concepts if needed.
5. As a student on any chapter page, I want clicking the brand logo or "Home" icon in the top header to return me safely to the course hub (`index.html`).
6. As a student on any chapter page, I want a "Chapter Switcher" menu in the header so that I can jump directly to any of the 7 chapters without returning to the home page first.
7. As a student reading via the desktop sidebar, I want a list of all 7 chapters in the sidebar so that I have continuous awareness of where the current chapter fits in the whole course.
8. As a student completing Chapter 7, I want the bottom navigation to indicate course completion and provide a link back to the hub with congratulations and summary metrics.
9. As a student on mobile devices, I want all navigation buttons and chapter switcher menus to have touch targets of at least 48px and responsive wrapping so that I can navigate smoothly on my smartphone.
10. As a student, I want my chapter visit history and quiz scores stored locally in my browser so that the hub accurately reflects my learning progress percentage.
11. As an instructor (ครูแม็ค), I want all original instructional explanations, diagrams, color rules, and interactive simulators preserved 100% so that teaching materials and student activities remain comprehensive and uncorrupted.
12. As an instructor, I want the web files to operate completely offline or when opened directly via `file://` or local static server without broken relative paths or missing assets.
13. As an instructor, I want the visual style of the new hub and navigation elements to match the exact Neo-Vivid Pop branding (`pop-card`, `#110B1E` stroke, vivid color palette, Prompt font) so that the course feels unified and professional.
14. As an automated test runner, I want all internal and inter-chapter relative links to be valid and verified so that no student ever encounters a 404 page.

---

## Implementation Decisions

### Architectural Structure
- The project remains a pure static HTML/CSS/JS multi-page application hosted under `คำอธิบายรายวิชา/เนื้อหารายวิชา/31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก/`.
- No external runtime servers or framework builds are required for these standalone interactive course files; all assets use identical CDN references already present in the chapters (Tailwind CSS CDN, Google Fonts: Prompt, Sarabun, JetBrains Mono).
- All inter-page hyperlinks use clean, standardized relative paths:
  - Hub: `index.html`
  - Chapter 1: `1_31910_0002.html`
  - Chapter 2: `2_31910_0002.html`
  - Chapter 3: `3_space_31910_0002.html`
  - Chapter 4: `4_focal_point_emphasis_31910_0002.html`
  - Chapter 5: `5_placement_grouping_31910_0002.html`
  - Chapter 6: `6_31910_0002.html`
  - Chapter 7: `7_31910_0002.html`

### UI/UX & Design Tokens Alignment
- Follows the exact Neo-Vivid Pop design language already present in Chapter 1:
  - Borders: `2px solid #110B1E`
  - Shadows: `box-shadow: 4px 4px 0px #110B1E;` with hover translation `translate(-2px, -2px)` and shadow expansion `6px 6px 0px #FF006E` or `#8338EC`.
  - Palette: Vivid Pink (`#FF006E`), Purple (`#8338EC`), Yellow (`#FFBE0B`), Cyan (`#00F5D4`), Ink Dark (`#110B1E`), Background (`#FFFDF7`).
  - Typography: `Prompt` for headings/buttons, `Sarabun` for body text, `JetBrains Mono` for metadata chips.

### Navigation Dock Component Specification
- Positioned inside `<main>` as the final section before `</main>`, after the discussion/comment section in each of the 7 files.
- Structured as a high-visibility container with:
  - Breadcrumb chip showing current unit position (e.g. "หน่วยที่ 1 จาก 7 หน่วยการเรียนรู้").
  - Two primary directional action cards (Previous / Next) with clear chapter number, chapter title, and arrow icon.
  - Quick action to open Chapter Switcher modal or return to Course Hub.
  - Progress indicator bar reflecting student's journey through the 7-week curriculum.

### LocalStorage Schema
- Key: `bpg_course_31910_0002_state`
- Schema structure:
```json
{
  "lastChapter": "1_31910_0002.html",
  "visitedChapters": ["1_31910_0002.html", "2_31910_0002.html"],
  "quizScores": {
    "ch1": { "score": 5, "total": 5, "completedAt": 1729340000000 }
  },
  "overallProgress": 28
}
```

### Content Preservation Enforcement
- In each chapter file:
  - DO NOT modify or reformat existing sections (`#hero-stage`, `#intro`, `#task-*`, `#quiz`, `#assignment`, `#comments`).
  - DO NOT remove any script or simulator logic.
  - ONLY edit:
    1. `<header>` brand link (`href="#hero-stage"` -> `href="index.html"`).
    2. Add chapter quick selector in `<header>` and inter-chapter link block in `<aside id="sidebar">`.
    3. Insert the bottom Inter-Chapter Navigation Dock immediately before `</main>`.
    4. Insert a lightweight progress tracker script before `</body>` that marks the current chapter visited.

---

## Testing Decisions

### Seam Architecture (The Highest Seam)
We test external user behavior at the highest possible architectural seam: **Static Link & DOM Navigation Integration Test Suite** executed via Node.js native test runner (`node --test tests/course-31910-0002-navigation.test.mjs`).

This single comprehensive seam tests:
1. **Master Hub Completeness Seam**:
   - Verifies `index.html` exists and parses valid HTML.
   - Verifies `index.html` contains working relative links to all 7 chapter files with matching titles.
   - Verifies `index.html` contains the required metadata (Course code: 31910-0002, 7 chapters, progress element).
2. **Sequential Progression Chain Seam**:
   - For Chapter 1: Verifies "Next" link routes to `2_31910_0002.html`, "Hub" link routes to `index.html`.
   - For Chapter 2: Verifies "Prev" routes to `1_31910_0002.html`, "Next" routes to `3_space_31910_0002.html`.
   - For Chapter 3: Verifies "Prev" routes to `2_31910_0002.html`, "Next" routes to `4_focal_point_emphasis_31910_0002.html`.
   - For Chapter 4: Verifies "Prev" routes to `3_space_31910_0002.html`, "Next" routes to `5_placement_grouping_31910_0002.html`.
   - For Chapter 5: Verifies "Prev" routes to `4_focal_point_emphasis_31910_0002.html`, "Next" routes to `6_31910_0002.html`.
   - For Chapter 6: Verifies "Prev" routes to `5_placement_grouping_31910_0002.html`, "Next" routes to `7_31910_0002.html`.
   - For Chapter 7: Verifies "Prev" routes to `6_31910_0002.html`, "Next/Hub" routes to `index.html`.
3. **Content Non-Regression Seam**:
   - Compares key anchor IDs (`#intro`, `#quiz`, `#assignment`) and total character length of chapters 1-7 before and after the modification. Asserts zero loss of existing text, ensuring file sizes do not decrease.
4. **Header & Quick Switcher Integrity Seam**:
   - Verifies that every chapter header links back to `index.html`.
   - Verifies that all 7 chapters contain the quick chapter switcher component.

---

## Out of Scope

- Converting the HTML files into React components or JSX (explicitly forbidden by user and `import-external-content` rules: "ห้ามลดเนื้อหาในไฟล์", "ห้ามแปลง HTML เป็น React").
- Modifying the curriculum content, quiz questions, or text explanations inside any of the chapters.
- Requiring a Node.js backend server or Supabase authentication to view lessons (must work as standalone static files).
- Redesigning the visual themes or color schemes of the existing 7 chapters.

---

## Further Notes

- Target folder: `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-0002_องค์ประกอบศิลป์สำหรับงานกราฟิก/`
- Course name: 31910-0002 องค์ประกอบศิลป์สำหรับงานกราฟิก (3 หน่วยกิต 4 ชั่วโมง/สัปดาห์)
- Instructor: นายธิติวุฒิ จันทร์โสม, แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล วิทยาลัยการอาชีพบ้านโป่ง
- Once this spec is approved by the user, implementation can proceed immediately via `/to-tickets` and `/implement` (or `do`).
