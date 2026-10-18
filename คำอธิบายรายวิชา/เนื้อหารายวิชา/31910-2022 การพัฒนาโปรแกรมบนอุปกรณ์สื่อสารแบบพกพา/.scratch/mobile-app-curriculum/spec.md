# Spec: 31910-2022 Mobile Application Development Course Curriculum & Design System

Status: ready-for-agent
Triage: ready-for-agent

## Problem Statement

Vocational High-Certificate (ปวส. 1) students in Digital Business need to learn end-to-end mobile application development for business (Course 31910-2022, 4 hours/week over 15 weeks). However, existing academic textbooks either focus purely on theoretical concepts without practical business deliverables, or require complex native code toolchains (Swift/Kotlin/Java) that overwhelm non-computer-science vocational students within a 4-hour weekly timeframe. 

Furthermore, students working in teams of 3 select wildly diverse project ideas (food delivery, salon booking, equipment loaning, etc.), making a single-example textbook insufficient. Students need a comprehensive, zero-knowledge, step-by-step textbook curriculum accompanied by a production-ready Design System and Tokens where they can follow along 100% independently regardless of their chosen business domain.

## Solution

A complete, 15-chapter modular curriculum saved as individual markdown textbooks, paired with an integrated Design Tokens architecture and Reusable Component library:
1. **Design System & Tokens Foundation**: An ironclad UI foundation (`tokens.css`, `tailwind.config.js`, `theme.ts`, `agents.md`) enforcing zero-hardcoding and accessibility.
2. **15-Week Curriculum Mapped 1:1 to Actionable Deliverables**:
   - **Phase 1: UI/UX Design with Figma (Weeks 1-4)**: Problem framing with App Concept Canvas, Grayscale Wireframing, Hi-Fi UI Design with Design Systems, and Interactive Mobile Prototyping tested on real smartphones. *(Completed: Chapters 1 to 4)*.
   - **Phase 2: Database & Core AppSheet Logic (Weeks 5-8)**: Google Sheets relational database modeling, AppSheet view creation, CRUD forms, and multi-table relations (`Ref`) with calculation formulas.
   - **Phase 3: Hardware Integration & Automation Bots (Weeks 9-12)**: Contextual Action Buttons, Barcode/QR scanning, Digital Signatures, GPS/Google Maps, and automated email/PDF receipt bots.
   - **Phase 4: Capstone Development & Production Launch (Weeks 13-15)**: Agile sprint execution in teams of 3, user testing, bug fixes, and live demo presentation day.
3. **Tri-Archetype Reference Architecture**: Every chapter provides parallel implementations across 3 distinct business models:
   - *Archetype 1: Retail & Food Ordering* (Fresh Brew & Bakery)
   - *Archetype 2: Service & Booking Appointments* (Happy Paws Care)
   - *Archetype 3: Asset Tracking & Borrow-Return Operations* (Smart Equipment Borrow)

## User Stories

### Part 1: Design Tokens & UI Architecture
1. As a frontend developer, I want a unified `tokens.css` file with CSS custom properties, so that I can style web and mobile UI without hardcoding colors or spacing.
2. As a frontend developer, I want a `tailwind.config.js` file mapping to the established tokens, so that I can use standard utility classes (`bg-primary`, `text-text-primary`, `rounded-lg`).
3. As a React/TypeScript developer, I want a strongly typed `theme.ts` file, so that I have auto-completion and compile-time type safety for all tokens.
4. As an AI agent or developer, I want an `agents.md` rulebook, so that no hardcoded hex strings or arbitrary spacings ever enter the codebase.
5. As an educator, I want a zero-dependency `components.html` showcase, so that students can visually inspect all buttons, cards, and input variants in a browser without running Node.js.
6. As a student, I want accessible UI components (`Button`, `VideoCard`, `InputField`), so that my apps adhere to WCAG 2.1 accessibility and screen-reader guidelines.

### Part 2: Curriculum Structure & Instructional Chapters
7. As a student with zero coding knowledge, I want clear, click-by-click instructions in Chapter 1, so that I can frame a real-world business problem into an App Concept Canvas.
8. As a student, I want Chapter 2 to teach grayscale wireframing in Figma, so that my team can agree on layout and visual hierarchy without fighting over colors.
9. As a student, I want Chapter 3 to provide exact 60-30-10 color rules and Google Fonts pairings, so that our mockups look like commercial-grade apps.
10. As a student, I want Chapter 4 to teach mobile prototyping with Figma Mobile App, so that I can touch and test clickable interactions directly on my personal smartphone.
11. As a student, I want Chapter 5 to teach relational database design on Google Sheets, so that I can structure products, orders, and customer tables without SQL.
12. As a student, I want Chapter 6 to guide connecting Google Sheets to AppSheet, so that my business data displays on an actual mobile device within 4 hours.
13. As a student, I want Chapter 7 to explain AppSheet column types and data validation, so that users cannot enter negative prices or invalid inputs.
14. As a student, I want Chapter 8 to teach multi-table reference (`Ref`) and formula expressions, so that order items calculate subtotals and grand totals automatically.
15. As a student, I want Chapter 9 to show how to build Action Buttons, so that my app can trigger one-click phone calls and status transitions.
16. As a student, I want Chapter 10 to teach barcode/QR scanning and digital signatures, so that my app can scan physical items and capture customer sign-offs.
17. As a student, I want Chapter 11 to teach GPS location and Google Maps integration, so that delivery drivers and customers can navigate directly to destinations.
18. As a student, I want Chapter 12 to configure serverless automation bots, so that new orders automatically generate PDF receipts and send confirmation emails.
19. As a student team, I want Chapters 13 and 14 to provide sprint guidance and testing matrices, so that our team of 3 can polish our capstone application smoothly.
20. As a student team, I want Chapter 15 to provide demo day presentation criteria, so that we can deliver an engaging live demonstration to evaluators.

### Part 3: Project-Based Learning & Multi-Archetype Support
21. As a student team building a retail/ordering project, I want the Fresh Brew & Bakery example in every chapter, so that I can see the exact catalog, cart, and payment flow.
22. As a student team building an appointment/booking project, I want the Happy Paws Care example in every chapter, so that I can see time-slot scheduling and queue ticketing.
23. As a student team building an internal asset/borrowing project, I want the Smart Equipment Borrow example in every chapter, so that I can see barcode check-in/out and due date tracking.
24. As an instructor, I want each chapter to include a 10-point scoring rubric, so that grading weekly deliverables is objective, fast, and transparent.
25. As an instructor, I want each chapter to include a self-checklist, so that students can verify their own deliverables before submitting.

## Implementation Decisions

### Curriculum Delivery Decisions
- **1:1 Weekly Markdown Mapping**: 15 standalone `.md` files corresponding strictly to the 15-week syllabus in `31910-2022_การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา.md`.
- **4-Hour Pedagogical Balance**: Each chapter contains approximately 1 hour of business/conceptual foundation, 1 hour of technical architecture, 1.5 hours of click-by-click workshop, and 0.5 hours of assessment/rubric review.
- **Tri-Archetype Standard**: Every technical skill demonstrated must provide concrete implementation data for all 3 archetypes (Retail, Service, Operations).
- **Sequential Batching**: Chapters are drafted, verified, and delivered one file at a time to maintain depth (50-70 KB per chapter) without truncation.

### Design Tokens & Component Decisions
- **Base Unit**: Strictly 8px (`--space-1`), with scale factors 0.5 (4px), 1 (8px), 1.5 (12px), 2 (16px), 3 (24px), 4 (32px), 6 (48px), 8 (64px).
- **Color Palette**: Primary Broadcast Red (`#FF0000`), Dark Text (`#0F0F0F`), Surface Gray (`#F2F2F2`), Secondary Blue (`#065FD4`), Neutral Gray (`#606060`).
- **Typography Scale**: Display & Body on 'Roboto', Headings on weights 500/700, Body on 400, strict 2-line title clamping with ellipsis.
- **Zero-Hardcoding Enforcement**: Recorded as an ironclad law in `agents.md` with an active AI Pre-flight checklist.

## Testing Decisions

### Pedagogical Testing & Quality Seams
- **The Chapter Contract Seam (Primary External Behavior)**:
  - Every chapter is tested against the "Zero-Knowledge Replicability" criteria: A reader following only the text in the chapter must be able to produce the exact weekly deliverable without external assistance.
  - Every chapter must contain an explicit Self-Checklist (5-6 items) and a 10-point Scoring Rubric with 3 distinct achievement tiers (Good/Pass/Needs Improvement).
- **Design Token & Code Seam**:
  - `tokens.css` verified via direct rendering in `components.html`.
  - Component accessibility verified via semantic markup, keyboard focus `:focus-visible`, and ARIA labels on all icon-only buttons.
- **Domain Modeling Seam**:
  - Vocabulary consistency verified against `GLOSSARY.md` (e.g., using `Ref` instead of `VLOOKUP`, using `Frame` instead of `Artboard`).
  - Decisions tracked in `docs/adr/`.

## Out of Scope

1. **Native Native SDK Compilation**: No raw Swift, Objective-C, Kotlin, or Java development; this course is tailored for Digital Business students using Figma and Google AppSheet.
2. **Paid Cloud Infrastructure**: No paid cloud hosting, paid Firebase plans, or paid SaaS tools; all tooling must be 100% free for educational use (Google Sheets, Figma Free for Education, AppSheet Free Tier).
3. **Payment Gateway Merchant Accounts**: Direct live credit card processing integrations (e.g., Stripe/Omise live API keys requiring business registration); payments are modeled through QR Code / PromptPay receipt uploads and status verification.

## Further Notes

- Current Progress:
  - Design Tokens & Components: Complete (`tokens.css`, `tailwind.config.js`, `theme.ts`, `agents.md`, `components/`, `components.html`).
  - Chapters 01 to 04 (Phase 1: Design Foundation with Figma): Complete.
  - Chapters 05 to 08 (Phase 2: Database & Core App Development with Google Sheets & AppSheet): Complete.
  - Chapters 09 to 12 (Phase 3: Hardware, Actions, Maps & Automation Bots): Complete.
  - Chapters 13 to 15 (Phase 4: Capstone Sprints 1-2, UAT & Demo Day Showcase): Complete.
  - Status: 100% Complete across all 15 Chapters and all 11 Issue Tickets resolved.
