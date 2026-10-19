# 01: Master Hub (index.html) Redesign & Reusable Micro-Interaction Utilities

**What to build:**
Upgrade `index.html` to serve as an interactive, polished command center for the entire 15-week curriculum. Establish the reusable client-side micro-interaction engine that subsequent chapters will incorporate:
1. **Visual Polish & Hero Upgrade**:
   - Modern subtle backdrop blur, ambient red-broadcast lighting mesh, and refined card elevations.
   - Animated count-up metrics for the 4 core course stats (15 Chapters, 60 Lab Hours, 3 Archetypes, 100% Production Ready).
2. **Smart "Resume Learning" (เรียนต่อจากครั้งล่าสุด) CTA**:
   - Reads `localStorage` for `curriculum_chXX_checklist` to find the earliest unfinished chapter (or highest visited).
   - Renders a prominent quick-launch hero card allowing students to jump straight back into their current chapter with one click.
3. **Enhanced Chapter Cards**:
   - Add mini progress bars showing exact task completion (`3/5 หัวข้อ (60%)`) on each chapter card.
   - Hover lift (`hover:-translate-y-1 hover:shadow-xl hover:border-red-500/50 transition-all duration-300`).
   - Tags indicating toolsets (Figma, Sheets, AppSheet, GPS, Bots).
4. **Reusable Standalone Micro-Interactions Engine**:
   - Embed lightweight pure JS confetti particle generator (`fireConfetti()`).
   - Embed pure Web Audio API synthesizer for sound cues (`playChime()`, `playFanfare()`, `playClick()`) with top-bar sound toggle (`🔊 เสียงเอฟเฟกต์` / `🔇 ปิดเสียง`) synced with `localStorage`.

**Target File:**
- `d:\BPG\คำอธิบายรายวิชา\เนื้อหารายวิชา\31910-2022 การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา\interactive_web\index.html`

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Add hero ambient lighting, animated count-up numbers, and glassmorphic top header.
- [x] Implement smart "Resume Learning" banner reading `localStorage`.
- [x] Enhance chapter cards with progress bars, tag badges, and smooth hover elevation.
- [x] Implement embedded zero-dependency Confetti engine and Web Audio SFX synth with Mute/Unmute toggle.
- [x] Verify keyboard search shortcut (`/`) and smooth filter animations.
