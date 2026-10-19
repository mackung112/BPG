# Spec: Interactive Web Courseware UI/UX Upgrade (31910-2022)

Status: ready-for-agent

## Problem Statement
The 16 standalone interactive web textbook files (`index.html` and `ch01` through `ch15`) for course **31910-2022 การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา** contain extensive, rich instructional content, 3 business archetypes, and functional simulators. However, their visual interface and interactive engagement ("ลูกเล่น") can be significantly elevated:
1. **Flat Visual Hierarchy**: Many cards and simulator frames use basic borders (`border-[#E5E5E5]`) without optical depth, ambient lighting, or modern glassmorphism tokens.
2. **Lack of Instant Gamification / Reward Feedback**: Completing 5-point self-evaluation checklists or earning 10/10 on the rubric calculator provides plain text status without visual celebration or celebratory animations.
3. **Static Simulators**: Mobile phone simulators lack dynamic realism (static clock, static icons, lacking haptic/screen transition animations).
4. **Absence of Micro-Audio Feedback**: Actions such as archetype switching, checklist toggling, and copying formulas produce no audio confirmation (a lightweight zero-dependency Web Audio synthesizer can provide pleasant optional audio cues).
5. **Master Hub Lacks Live Continuity**: `index.html` displays static metrics and does not offer a one-click "Resume Learning" button pointing students directly to their last in-progress chapter.

## Objectives & Boundary Principles
- **Content Integrity (100% Preserved)**: Retain every line of instructional text, curriculum explanation, archetype scenario, rubric criteria, and question bank. No instructional material will be trimmed or omitted.
- **Pure Client-Side / Standalone (Zero External Assets)**: All new UI features, animations, sound effects, and celebration effects must operate completely offline without external audio files or heavy npm dependencies.
- **Red Broadcast Design System Alignment**: Maintain the project's signature Red Broadcast aesthetic (`#FF0000`, `#0F0F0F`, `#2BA640`, `#065FD4`, Roboto, Sarabun, Roboto Mono) while upgrading optical hierarchy according to `make-interfaces-feel-better` and `design-system`.
- **Accessibility & Tactile Ergonomics**: Mobile touch targets $\ge 48\text{px}$, WCAG AA contrast ratio ($\ge 4.5:1$), concentric border radii, and keyboard navigation shortcuts (`/` for search, `Esc` to close).

## Key Interactive Features & Polish ("ลูกเล่นใหม่")
1. **Confetti Particle Celebration**: Pure lightweight JavaScript confetti bursts upon achieving 10/10 on the Rubric Calculator or checking all items in the self-evaluation checklist.
2. **Zero-Dependency Web Audio Synth**:
   - Soft click tone on tab/archetype switches.
   - Upbeat chord chime on checklist tick.
   - Victory fanfare on full checklist/rubric completion.
   - Persistent Top Bar Mute/Sound toggle (`🔊 Sound FX`) saved in `localStorage`.
3. **Realistic Mobile Simulator 2.0**:
   - Dynamic top status bar with live digital clock, battery status, and WiFi icons.
   - Smooth animated screen transitions (slide/fade) between archetype screens.
   - Interactive zoom/fit controls and tactile tap visual ripple.
4. **Active ScrollSpy & Floating Mini-HUD**:
   - Left sidebar TOC dynamically highlights the active section in view.
   - Floating "Back to Top" button with animated circular reading progress ring.
5. **One-Click Formula & Prompt Copy**:
   - Tactile copy buttons for all code/formula blocks with checkmark state transition and toast alert.
6. **Master Hub (index.html) Upgrades**:
   - Dynamic count-up animated metrics (15 Chapters, 60 Hours, 3 Archetypes, 100% No-Code).
   - "เรียนต่อจากครั้งล่าสุด (Resume Learning)" smart CTA detecting unfinished progress.
   - Visual chapter progress meters with glowing completion badges.

## Implementation Architecture & Tickets Decomposition
Following `paperclip-converting-plans-to-tasks`, the work is partitioned into 6 clearly bounded tasks:
- `01-master-hub-index-and-design-tokens.md`: Master Hub (`index.html`) redesign, animated counters, resume learning CTA, and reusable standalone micro-interaction utilities (Confetti, Web Audio Synth, Sound Toggle).
- `02-phase-1-figma-uiux-chapters.md`: Upgrading Phase 1 UI/UX chapters (`ch01` to `ch04`) with Simulator 2.0, gamified rewards, and ScrollSpy.
- `03-phase-2-database-core-chapters.md`: Upgrading Phase 2 Database & Core chapters (`ch05` to `ch08`) with interactive schema cards, formula test widgets, and phone simulator states.
- `04-phase-3-hardware-bots-chapters.md`: Upgrading Phase 3 Hardware & Automation chapters (`ch09` to `ch12`) with laser barcode scanner animation, GPS radar visualizer, and webhook pipeline cards.
- `05-phase-4-capstone-launch-chapters.md`: Upgrading Phase 4 Capstone chapters (`ch13` to `ch15`) with interactive sprint boards, UAT bug-logger simulator, and Demo Day presentation timer.
- `06-cross-browser-qa-and-accessibility-review.md`: Complete QA review verifying responsiveness, contrast, keyboard shortcuts, and offline capability across all 16 files.
