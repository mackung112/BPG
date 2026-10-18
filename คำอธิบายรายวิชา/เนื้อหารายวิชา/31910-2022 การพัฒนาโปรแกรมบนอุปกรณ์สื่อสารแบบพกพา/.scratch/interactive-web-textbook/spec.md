# Spec: Red Broadcast Interactive Web Textbook Suite (Chapters 01 - 15)

Status: resolved
Triage: ready-for-agent

## Problem Statement

Vocational High-Certificate (ปวส. 1) students in Digital Business studying mobile application development (Course 31910-2022, 4 hours/week, 60 hours total) face significant cognitive overload and learning friction when using static PDF or Markdown textbooks. Specifically:

1. **Passive Learning Friction**: Static text cannot visually demonstrate dynamic user interface flows, AppSheet expression behaviors, multi-table relation traversal, or hardware trigger states (camera scanning, GPS tracking, background automation).
2. **Context Switching across Business Domains**: In project-based learning, student teams work on fundamentally distinct business models (retail ordering, service appointments, asset tracking). When textbooks present only a single business example, students struggle to translate concepts into their specific domains.
3. **Lack of Instant Feedback & Practice Verification**: Students lack self-assessment feedback loops during independent 4-hour lab sessions. They cannot easily verify whether their weekly deliverables meet technical criteria or calculate their prospective evaluation rubric scores before submission.
4. **Environment Setup Hurdles**: Non-computer-science vocational students frequently struggle with local development tooling (Node.js, npm, bundlers, local web servers, CORS limitations), preventing frictionless access to educational web materials.

The instructor and students need an exhaustive, rich, interactive web textbook experience matching the gold standard established in Chapter 01 (YouTube Red Broadcast aesthetic), enhanced with interactive learning widgets (phone simulator, multi-archetype switcher, dynamic rubric calculator, interactive checklist, one-click formula copier, reading progress bar, and seamless cross-chapter navigation), operable completely offline with zero installation.

## Solution

A complete suite of 15 standalone interactive web textbook chapters plus a centralized Curriculum Hub (`index.html`), adopting the Red Broadcast design aesthetic and equipped with an interactive digital learning suite:

1. **Red Broadcast Aesthetic & Layout Architecture**:
   - Top Navigation Bar (56px) featuring the Red Play badge, verified instructor credentials ("ครูแม็ค วท.บ. วิทยาการคอมพิวเตอร์"), responsive search, notification indicator, and persistent chapter traversal.
   - Collapsible 240px Left Sidebar providing immediate access to the chapter syllabus, section anchors, course metadata, and lesson progression.
   - Sticky Horizontal Pill Chip Filter Bar enabling one-tap jumping to theory, step-by-step workshops, diagrams, case studies, and rubrics.
   - Broadcast Lecture Theater Stage / Hero section with interactive lecture status, view count, clickable Like counter, Share drawer, and simulated student Q&A discussion feed.

2. **Expanded Interactive Widget Learning Suite ("ลูกเล่นที่มากขึ้น")**:
   - **Interactive Mobile Viewport Simulator**: A realistic smartphone viewport rendered on the lecture stage allowing students to click through step-by-step interface progressions (e.g. Grayscale wireframe to Hi-Fi UI, form data entry, hardware camera scan overlay, interactive Google Map pin drop).
   - **Tri-Archetype Interactive Switcher**: Tabbed controls allowing students to toggle between *Retail & Food Ordering* (Fresh Brew), *Service & Booking* (Happy Paws), and *Asset & Operations* (Smart Borrow) to view tailored database schemas, AppSheet formulas, and UI screenshots without scrolling fatigue.
   - **Interactive Step-by-Step Workshop Stepper**: Clickable multi-stage workflow tabs that dynamically update instructional guidance and mobile simulator states.
   - **Interactive Self-Checklist**: Checkboxes with real-time percentage progress bar and browser local storage persistence so students can track lab completion across sessions.
   - **Interactive 10-Point Scoring Rubric Calculator**: Clickable assessment criteria matrix (Good: 2 pts, Pass: 1 pt, Needs Improvement: 0 pts across 5 criteria) that dynamically computes the student's total score (0-10) with visual grade tier badge and feedback notes.
   - **One-Click Formula & Expression Copier**: Instant clipboard copy buttons for complex AppSheet expressions and column formulas with animated confirmation badges.
   - **Reading Scroll Progress Bar**: A sleek top-mounted accent progress bar providing continuous feedback on chapter reading progression.
   - **Cross-Chapter Navigation Hub**: Persistent Previous Chapter / Curriculum Hub / Next Chapter navigation flows across all 15 weeks.

3. **Zero-Setup Standalone Delivery**:
   - Fully client-side zero-server architecture runnable directly from local filesystem (`file:///`) in any modern browser without Node.js, Python, or web server dependencies.
   - Strictly digital-native experience (excluding paper print styles to optimize interactive screen components).

## User Stories

### Part 1: Navigation, Shell, and Broadcast Atmosphere
1. As a student, I want a sticky top navigation bar with clear course branding and search, so that I can quickly navigate content and search for technical terms.
2. As a student, I want a collapsible 240px sidebar with the full chapter table of contents, so that I can see the structure of the lesson and jump to any section.
3. As a mobile or tablet user, I want the sidebar to collapse smoothly into a drawer, so that the screen real estate is maximized for learning content.
4. As a student, I want a horizontal pill-shaped chip filter bar, so that I can quickly jump between sections (Introduction, Theory, Workshop, Archetypes, FAQ, Rubrics) with one tap.
5. As a student, I want a reading scroll progress bar at the very top of the window, so that I can visually track how much of the chapter I have completed.
6. As a student, I want persistent Previous and Next chapter buttons at the bottom and top of the page, so that I can progress sequentially through the 15-week curriculum.
7. As a student, I want a direct link back to the Curriculum Hub (`index.html`), so that I can view the overall 15-week learning roadmap at any time.
8. As a student, I want a broadcast hero stage with lecture badges, teacher info, and course metadata, so that the lesson feels engaging, professional, and structured like a modern video lecture.
9. As a student, I want an interactive Like button with an animated counter, so that I can express engagement with the lesson material.
10. As a student, I want a Share button that copies the lesson URL to my clipboard or opens the native share drawer, so that I can easily bookmark or share the link with teammates.
11. As a student, I want a simulated Q&A comment feed with a working input box and ME avatar, so that I can post study notes or practice questions during the lesson.

### Part 2: Tri-Archetype Exploration & Domain Tailoring
12. As a student building a food ordering or retail app, I want an archetype tab to select "Fresh Brew & Bakery", so that all schema tables, formulas, and screens immediately show retail examples.
13. As a student building an appointment or clinic booking app, I want an archetype tab to select "Happy Paws Care", so that I can see service queue models, booking forms, and pet care workflows.
14. As a student building an internal asset or borrowing app, I want an archetype tab to select "Smart Equipment Borrow", so that I can see check-in/out tracking, barcode workflows, and due-date logic.
15. As a student switching between archetypes, I want the active tab selection to remember my choice or transition smoothly, so that I do not lose my place in the chapter.
16. As an instructor, I want all 3 archetypes to feature identical pedagogical rigor and depth, so that student groups working on different topics receive equal instructional quality.

### Part 3: Interactive Mobile Viewport Simulator
17. As a student, I want an interactive smartphone frame simulator inside the lesson, so that I can experience realistic mobile application UI flows without needing my physical phone unlocked.
18. As a student, I want click-to-advance step buttons on the mobile simulator, so that I can see how user actions transition from list view, to detail view, to form submission, and confirmation.
19. As a student, I want interactive buttons inside the simulator (e.g. "Add to Cart", "Book Slot", "Scan QR", "Sign Here"), so that I can test the user experience interactively.
20. As a student, I want the simulator to reflect the chosen business archetype, so that the visual UI matches the domain I selected in the archetype switcher.

### Part 4: Technical Workshop & Code Snippets
21. As a student copying AppSheet formulas (e.g. `=UNIQUEID()`, `=SUM(Related OrderDetails[Subtotal])`, `SELECT()`), I want a one-click copy button, so that I can paste error-free formulas into AppSheet.
22. As a student, I want a visual "Copied!" notification when copying formulas or table structures, so that I am confident the text is in my clipboard.
23. As a student, I want step-by-step interactive tabs for complex multi-step workshops, so that I can focus on one step at a time without feeling overwhelmed by long walls of instructions.
24. As a student, I want clear syntax highlighting and monospace formatting for database column definitions and AppSheet expressions, so that data types and formula arguments are instantly recognizable.
25. As a student, I want interactive before/after visual cards for common pitfalls and validation mistakes, so that I understand why certain formula configurations fail.

### Part 5: Self-Assessment, Rubrics, and Progress Tracking
26. As a student completing lab exercises, I want an interactive Self-Checklist with clickable checkboxes, so that I can verify that my work satisfies all weekly deliverables.
27. As a student checking items off my checklist, I want a dynamic progress bar that calculates the percentage of completed tasks in real time, so that I know how close I am to finishing.
28. As a student returning to the textbook the next day, I want my checklist state to be saved in browser local storage, so that I do not lose my tracked progress.
29. As a student or instructor, I want an interactive 10-Point Scoring Rubric matrix where each criterion row has clickable rating cells (Good: 2 pts, Pass: 1 pt, Needs Improvement: 0 pts), so that I can calculate the expected grade dynamically.
30. As an instructor evaluating student projects, I want the rubric calculator to automatically sum the total score out of 10 and display an achievement badge (e.g. "ระดับดีเยี่ยม", "ระดับดี", "ระดับผ่านเกณฑ์"), so that grading is objective and immediate.
31. As a student reviewing exam concepts, I want an interactive FAQ / Review Question accordion where answers expand and collapse with `+` / `−` toggles, so that I can test my knowledge before revealing answers.

### Part 6: Standalone Delivery & Performance
32. As a student with unstable internet or working in an offline computer lab, I want each chapter to load completely from local files without requiring an active internet connection (except optional Google Fonts/CDN cache), so that I can study anywhere.
33. As a student studying on a laptop screen, I want clean responsive typography and smooth scrolling behavior, so that the reading experience is comfortable for extended 4-hour sessions.
34. As a curriculum maintainer, I want zero dependency on build pipelines or node packages, so that HTML chapters can be edited and previewed directly in any text editor and browser.

## Implementation Decisions

### Architectural Framework & Styling Decisions
- **Styling Engine**: Tailwind CSS via CDN paired with native CSS Custom Properties (`tokens.css`) to guarantee strict adherence to Red Broadcast tokens:
  - Primary Brand Red: `#FF0000` / Hover: `#CC0000`
  - Secondary Action Blue: `#065FD4`
  - Dark Neutral: `#0F0F0F` (primary text and lecture theater stage)
  - Surface Neutral: `#FFFFFF` (content canvas) / `#F2F2F2` (controls, chips, card backgrounds) / `#E5E5E5` (borders)
  - Semantic Green: `#2BA640` / Warning Amber: `#FB8C00`
  - Typography: Google Fonts 'Roboto', 'Sarabun' for Thai display, and 'Roboto Mono' for formulas and table schemas.
- **Elevation System**: Elevation Level 0 (flat), Elevation Level 1 (`0 1px 2px rgba(0,0,0,0.1)`), Elevation Level 2 (`0 4px 32px rgba(0,0,0,0.1)`), Elevation Level 3 (`0 8px 40px rgba(0,0,0,0.2)`).
- **Layout Shell**:
  - Sticky Top Bar: Exactly 56px height, Elevation Level 1.
  - Collapsible Sidebar: Exactly 240px width, toggleable via hamburger button, persistent section links.
  - Chip Filter Bar: Sticky top-14, pill-shaped overflow-x scroll with no-scrollbar styling.
  - Broadcast Lecture Hero: Video stage ratio with flush black border, red broadcast badge, verified instructor bio, and social actions.
- **Exclusion of Print Button**: Physical printing styles (`window.print()` and print buttons) are intentionally omitted to focus 100% on the interactive digital screen experience, in accordance with explicit curriculum decisions.

### Interactive Components Architecture
- **State Management & Persistence**:
  - Pure Vanilla JavaScript DOM manipulation with isolated namespace or modular functions per chapter.
  - `localStorage` keying scheme: `curriculum_ch{NN}_checklist` and `curriculum_ch{NN}_rubric` ensuring independent persistence across chapters.
- **Interactive Mobile Viewport Simulator Specification**:
  - Frame container: 320px x 640px viewport with rounded smartphone bezel (`rounded-[36px]`), speaker notch, and home bar.
  - Multi-screen state switcher: Allows clicking Next/Previous or step tabs to switch the rendered phone screen view.
  - Realistic interactive UI elements: Rendered with Tailwind CSS imitating Figma designs and AppSheet views.
- **Tri-Archetype Switcher Specification**:
  - Top tab container with 3 segmented pills: `☕ Fresh Brew (ค้าปลีก)`, `🐾 Happy Paws (บริการ)`, `📦 Smart Borrow (พัสดุ)`.
  - Switching tabs toggles visibility of `.archetype-content-1`, `.archetype-content-2`, `.archetype-content-3` with smooth fade transitions.
- **Dynamic Rubric Calculator Specification**:
  - 5 Standard Criteria rows: (1) Technical Correctness, (2) Database/UI Design, (3) Functionality/Formulas, (4) Documentation/Canvas, (5) Quality & Testing.
  - 3 Grade Columns: Good (2 pts), Pass (1 pt), Needs Improvement (0 pts).
  - Clicking a rating cell activates it (red border/highlight), updates criterion subscore, recalculates sum total (0-10 pts), and updates grade status tier.
- **One-Click Snippet Copier Specification**:
  - Copy buttons positioned at the top-right of every formula or code block.
  - Uses `navigator.clipboard.writeText()` with fallback to textarea selection, followed by a 2-second animated checkmark and "คัดลอกแล้ว!" badge.

### Chapter Content Mapping (Chapters 01 to 15)
- Every single chapter HTML file is generated to the complete depth (~50-100 KB) matching the markdown textbook sources and Chapter 01 HTML gold standard:
  - **Chapter 01**: SDLC & App Concept Canvas (Updated with phone simulator & rubric calculator).
  - **Chapter 02**: Figma Grayscale Wireframing & Layout Structure.
  - **Chapter 03**: Figma Color Theory (60-30-10), Google Fonts & Hi-Fi UI Design System.
  - **Chapter 04**: Figma Interactive Mobile Prototyping on Physical Smartphones.
  - **Chapter 05**: Relational Database Design on Google Sheets (Data Modeling & Foreign Keys).
  - **Chapter 06**: First AppSheet Connection, View Configurations & UX Presentation.
  - **Chapter 07**: AppSheet Form Views, Column Types & Input Validation Expressions.
  - **Chapter 08**: Multi-table References (`Ref`), Related Records & Automated Formula Calculations.
  - **Chapter 09**: App Branding Customization & Smart Action Buttons.
  - **Chapter 10**: Hardware Integration: Barcode/QR Scanning & Digital Signatures.
  - **Chapter 11**: GPS Geolocation, Latitude/Longitude & Google Maps Integration.
  - **Chapter 12**: Serverless Automation Bots, Automated PDF Invoicing & Email Triggers.
  - **Chapter 13**: Real-world Capstone Project Development & Agile Sprint 1.
  - **Chapter 14**: User Acceptance Testing (UAT), Bug Fixing & Performance Polish.
  - **Chapter 15**: Demo Day Final Pitch, App Distribution & Public Portfolio Exhibition.
  - **Curriculum Hub (`index.html`)**: Interactive dashboard connecting all 15 chapters with progress tracking.

## Testing Decisions

### Quality Seams & Verification Criteria
The testing strategy focuses on external behavioral seams rather than internal implementation details:

1. **The Standalone Browser Execution Seam (Primary External Seam)**:
   - Every `.html` file must execute without fatal errors when loaded directly from the local file system (`file:///`) in Google Chrome, Microsoft Edge, and Safari.
   - Console logs must show zero unhandled exceptions on initial render and during user interaction.

2. **The Zero-Hardcoding & Design System Seam**:
   - Visual inspection confirms exact Red Broadcast styling: `#FF0000` accents, `#0F0F0F` dark surfaces, `#F2F2F2` neutral controls, Sarabun/Roboto typography, and consistent 8px spatial grid.

3. **The Interactive Learning Widget Functional Seams**:
   - *Archetype Switcher*: Clicking between the 3 archetypes immediately swaps all 3 data schemas and simulator displays without reloading the page.
   - *Mobile Simulator*: Clicking step controls transitions the phone mockup screen state correctly.
   - *Checklist Persistence*: Toggling checkboxes updates the percentage progress meter dynamically and persists upon browser refresh via `localStorage`.
   - *Rubric Calculator*: Selecting any combination of points (0, 1, 2 across 5 rows) computes the arithmetic sum accurately between 0 and 10 and updates the achievement badge.
   - *Copy Button*: Clicking copies the exact formula string to the clipboard and provides visual feedback.
   - *Reading Scroll Bar*: Scrolling down updates the width of the top progress line from 0% to 100%.
   - *Course Navigation*: The Previous, Next, and Hub links correctly target their adjacent chapter files.

4. **Curriculum Depth & Completeness Seam**:
   - Each HTML chapter must contain 100% of the educational content from its corresponding Markdown textbook, including full theoretical definitions, step-by-step instructions, table schemas, validation formulas, review questions, checklists, and scoring rubrics. No placeholder text or abbreviated summaries are permitted.

### Prior Art
- Existing reference implementation: Chapter 01 HTML (`บทที่_01_วงจรการพัฒนาซอฟต์แวร์และการออกแบบแนวคิดแอปพลิเคชัน.html`, 96.5 KB), which successfully proved the Red Broadcast layout, collapsible sidebar, horizontal chip filters, and lecture hero stage.
- Existing component library (`components.html` and `tokens.css`) demonstrating accessible button variants, cards, and input fields.

## Out of Scope

1. **Physical Print/PDF Generation**: Print buttons and print stylesheets are explicitly removed to optimize purely for interactive web delivery.
2. **Backend Authentication & Server Database**: No server-side user accounts, PHP/Node.js backend servers, or SQL database connections; all persistence relies on browser `localStorage` and client-side execution.
3. **Live External API Webhooks**: Live production payment gateway merchant accounts or external paid SMS APIs; workflows are simulated within AppSheet and client-side widgets.
4. **Third-party Heavy Frameworks**: No React, Vue, Angular, or bundler build steps; strictly Vanilla JS and Tailwind CDN to guarantee instant, zero-setup usability for vocational students.

## Further Notes

- **File Placement Strategy**: Chapter HTML files will be located alongside their markdown counterparts in the course root directory and linked through the interactive hub `interactive_web/index.html` to provide maximum accessibility for both local folder browsing and organized web viewing.
- **Implementation Rollout**: In accordance with user direction (*"ทำจบ 15 บทเลย ไม่ชอบอะไรเดี๋ยวสั่งแก้เอง"*), all 15 chapters will be crafted systematically with full depth and interactive widgets.
