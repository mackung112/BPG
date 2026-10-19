# 01: Automated E2E Navigation Test Suite & Shared Navigation Contract

**What to build:**
Create an automated test suite (`tests/course-31910-0002-navigation.test.mjs`) using Node's native test runner (`node --test`) to establish the testing seam before code modifications begin:
1. **Link Integrity & File Existence**:
   - Asserts existence of `index.html` and all 7 chapter files (`1_31910_0002.html` to `7_31910_0002.html`).
   - Verifies all inter-page relative links point to existing files (no 404s).
2. **Bidirectional Chaining Verification**:
   - Verifies Chapter 1 links forward to Chapter 2, and back to `index.html`.
   - Verifies Chapters 2 through 6 link backward to $N-1$ and forward to $N+1$.
   - Verifies Chapter 7 links backward to Chapter 6 and forward to course completion / `index.html`.
3. **100% Content Preservation Baseline**:
   - Records baseline character count and key element IDs (`#intro`, `#quiz`, `#assignment`, `#comments`) for all 7 chapters to ensure zero reduction of content during updates.
4. **Header Navigation & Brand Destination**:
   - Verifies every chapter's top brand header links to `index.html`.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Create `tests/course-31910-0002-navigation.test.mjs` using Node.js built-in test runner.
- [x] Define expected navigation graph and chapter titles mapping.
- [x] Implement baseline character count and key ID presence checks for all 7 chapters.
- [x] Implement bidirectional link assertion functions.
