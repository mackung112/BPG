# 04: Focused Exam Room UX & Responsive Question Palette

**What to build:** 
A calm, focused single-question exam interface for students with a responsive Question Palette. The interface renders one question at a time with clean typography, previous/next navigation buttons, and a flag-for-review toggle. The Question Palette displays all question numbers in a grid with visual indicators: answered (green), unanswered (neutral), and flagged (orange flag). On desktop, the palette is pinned as a sidebar; on mobile/tablets, it tucks into a collapsible bottom drawer.

**Blocked by:** 02: Hybrid Draft Auto-Sync & Session Resume

**Status:** resolved

- [x] Create `QuestionPalette.jsx` component supporting answered, unanswered, flagged, and current question states.
- [x] Refactor `ExamRoom.jsx` to render single-question view with seamless keyboard/click navigation.
- [x] Implement Question Drawer modal / sheet for mobile viewports.
- [x] Flagged questions persist in the hybrid draft state and are visually distinct in the palette.
- [x] Acceptance test verifies palette navigation, flag toggling, and mobile responsive layout.
