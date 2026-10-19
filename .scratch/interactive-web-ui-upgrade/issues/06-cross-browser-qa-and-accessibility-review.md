# 06: Cross-Device QA, Accessibility & Standalone Validation Review

**What to build:**
Perform thorough quality assurance and validation across all 16 upgraded HTML files:
1. **Target Files:**
   - All 16 files: `index.html` and `ch01` through `ch15`.
2. **Review & Verification Criteria:**
   - **Zero Console Errors**: Ensure no JavaScript syntax errors, missing element references, or uncaught exceptions across all files.
   - **Zero External Network Dependencies**: Confirm all confetti, audio synthesis, simulators, and styles work 100% offline without requiring internet access (aside from standard CDN links that have local graceful fallbacks).
   - **Mobile Touch Ergonomics & Responsiveness**: Verify touch targets meet $\ge 48\text{px}$ on mobile screens (360px width to 1920px+ desktop).
   - **Accessibility & Contrast**: Verify WCAG AA contrast compliance ($\ge 4.5:1$ for body text, $\ge 3:1$ for large headings).
   - **Sound & Gamification Sanity**: Ensure mute toggle reliably silences all audio across all tabs and persists in `localStorage`.
   - **Curriculum Completeness**: Verify that 100% of original curriculum text, rubrics, archetypes, and questions are preserved with zero omissions.

**Blocked by:** 02, 03, 04, 05

**Status:** ready-for-agent

- [ ] Automated and manual smoke test on all 16 HTML files.
- [ ] Verify localStorage persistence of checklist states, course completion %, and audio preferences.
- [ ] Check keyboard shortcuts (`/` search focus, `Esc` dismiss).
- [ ] Confirm clean print styles (`@media print`) for offline study sheets.
- [ ] Review report documented with before/after comparison table.
