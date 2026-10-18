# 3. Interactive Web Curriculum Architecture for Mobile App Development

## Context
The 15-week curriculum `31910-2022 การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา` has complete markdown textbook files (Chapters 01 to 15). To maximize student engagement, active learning, and classroom practicality, students and instructors require interactive web pages for each chapter that can be opened instantly without setting up Node.js or running local web servers.

## Decision
We build an interactive web textbook suite in `interactive_web/` with the following architectural specifications:

1. **Zero-Dependency Standalone Files**:
   - Each chapter is delivered as an individual `.html` file matching the markdown chapter names 1:1.
   - Strictly references `tokens.css` for visual consistency (Broadcasting Red palette, 8px spacing, typography).
   - Powered by Vanilla JavaScript with no npm, Vite, or backend server requirements, runnable completely offline.

2. **Core Interactive Learning Suite**:
   - **Archetype Tab Switcher**: Clickable tabs to toggle between the 3 business archetypes (Fresh Brew, Happy Paws, Smart Borrow) without vertical clutter.
   - **Interactive Self-Checklist**: Checkboxes with dynamic progress bar (`%`) and `localStorage` persistence.
   - **One-Click Snippet Copying**: Instant clipboard copy buttons for AppSheet formulas (`=HERE()`, `=UNIQUEID()`, Dereferences).
   - **Interactive Rubric Calculator**: Clickable scoring matrix dynamically calculating total assessment points (0-10).
   - **Live Mermaid Rendering**: Process flowcharts and state diagrams rendered as sharp SVGs via Mermaid.js CDN with graceful offline fallback.
   - **Interactive Phone Viewport Widget**: A smartphone frame preview displaying step-by-step visual UI progression.
   - **Course Navigation Flow**: Persistent Top & Bottom Navigation (`[← Prev]`, `[🏠 Hub]`, `[Next →]`) plus reading scroll progress bar.
   - **Pure Digital Focus**: Excluded physical print styles to maximize digital app-like interactivity.

3. **Master Dashboard (`index.html`)**:
   - Serves as the central Curriculum Hub linking to all 15 chapters, displaying weekly goals, duration, and completion tracking.

4. **Direct Full Course Rollout**:
   - All 15 chapters and index hub produced systematically in `interactive_web/`.

## Consequences
- Students can double-click any HTML file to study, copy formulas, and verify checklist items directly in their default browser.
- Instructors can grade students using the interactive rubric calculator directly on-screen.
- The separation into `interactive_web/` preserves existing `.md` source files while establishing a modern e-learning delivery channel.
