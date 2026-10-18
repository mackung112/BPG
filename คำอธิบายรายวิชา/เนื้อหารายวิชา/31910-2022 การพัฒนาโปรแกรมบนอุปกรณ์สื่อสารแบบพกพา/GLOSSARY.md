# Mobile Application Development Course (31910-2022)

Domain glossary for the course "Development of Mobile Application" (การพัฒนาโปรแกรมบนอุปกรณ์สื่อสารแบบพกพา), Vocational Education Commission (สอศ.), Vocational High-Certificate (ปวส. 1 Digital Business).

## Language

### Core Methodology & Pedagogy

**App Concept Canvas**:
A 1-page strategic template for framing mobile app problem statements, target personas, core value propositions, and MVP feature scopes before design or development.
_Avoid_: Business Model Canvas, Project Charter

**SDLC (Software Development Life Cycle)**:
A 6-phase engineering framework (Planning, Design, Development, Testing, Deployment, Maintenance) tailored for low-code and mobile business projects.
_Avoid_: Waterfall, Agile Sprint (as a synonym for the overarching cycle)

**MVP (Minimum Viable Product)**:
The smallest functional version of an app that solves the primary business pain point and collects real user feedback.
_Avoid_: Prototype, Beta version

### Design Phase (Figma)

**Wireframe**:
A low-fidelity, monochromatic architectural layout defining page structure, UI element placement, and user flow without final colors or assets.
_Avoid_: Mockup, Sketch, Final UI

**Hi-Fi UI (High-Fidelity User Interface)**:
The complete visual interface design containing branded color palettes, typography hierarchy, imagery, icons, and precise spacing tokens.
_Avoid_: Wireframe, Graphic design

**Frame**:
A container canvas in Figma configured to specific device screen viewport dimensions (e.g., iPhone 14/15, Android Large) acting as the boundary for an application screen.
_Avoid_: Artboard, Group, Box

**Auto Layout**:
A dynamic layout property in Figma that automatically adjusts padding, margins, and directional stacking between UI elements when content changes.
_Avoid_: Flexbox (in Figma design context), Manual alignment

**Component (Figma)**:
A reusable design element that can be duplicated across screens while maintaining synchronized properties linked to a single master definition.
_Avoid_: Symbol, Template, Group

**Color Style**:
A saved global color definition in Figma ensuring consistent color usage across frames and design tokens.
_Avoid_: Palette preset, Swatch

**Visual Contrast**:
The measurable difference in luminance between foreground text/elements and background surfaces, adhering to WCAG readability standards.
_Avoid_: Color brightness, Vibrancy

**Interactive Prototype**:
A clickable simulation in Figma linking interactive frames to mimic native smartphone screen transitions and gestures.
_Avoid_: Working app, Code demo

**Trigger**:
The specific user input gesture (e.g., On tap, On drag, While hovering) that activates a prototype transition or animation.
_Avoid_: Event listener, Click event

**Transition**:
The visual animation mechanism (e.g., Smart Animate, Instant, Dissolve, Slide in) controlling how screens move during navigation.
_Avoid_: Page transition, Routing

**Overlay (Figma)**:
A secondary floating frame displayed above the current screen without full page replacement, used for modal dialogs and bottom sheets.
_Avoid_: Popup window, Dialog box

### Business Archetypes (Curriculum References)

**Retail & Ordering Archetype**:
A business model focused on physical/digital product catalogs, carts, dynamic order pricing, and payment verification.
_Avoid_: E-commerce store (too broad)

**Service & Booking Archetype**:
A business model centered on service items, resource/staff availability, calendar time-slot booking, and queue status workflows.
_Avoid_: Appointment manager

**Asset & Operations Archetype**:
An internal operations model tracking item locations, barcode check-in/out, borrow-return lifecycles, and maintenance statuses.
_Avoid_: Warehouse inventory (too narrow)

### Development Phase (Google Sheets & AppSheet)

**Data Source (Google Sheets)**:
A cloud relational tabular database where worksheets represent relational database tables and columns define data attributes.
_Avoid_: Excel file, Spreadsheet report

**Primary Key (Key Column)**:
A column whose values uniquely identify every individual row in a table (e.g., `Product_ID`, `Order_ID`), required by AppSheet to track records without collisions.
_Avoid_: Row number, Index, ID number

**Data Normalization**:
The practice of structuring data across separate related tables (e.g., Orders and Order_Details) to eliminate duplication and data corruption.
_Avoid_: Merging sheets, VLOOKUP linking

**Ref (Reference Column)**:
An AppSheet column type establishing foreign key relationships connecting secondary records (e.g., Order Items) to primary entities (e.g., Products, Customers).
_Avoid_: Lookup, VLOOKUP, Foreign Key

**Label Column**:
The primary human-readable column (e.g., `Product_Name`, `Service_Name`) designated by AppSheet to represent a row in summary views and relation dropdowns.
_Avoid_: Display name, Title field

**Card View (AppSheet)**:
A rich mobile presentation view type designed for e-commerce and catalogs, emphasizing featured imagery, header titles, price subtitles, and action triggers.
_Avoid_: Grid list, Tile layout

**Action Button**:
A context-aware interactive trigger in AppSheet initiating pre-configured business workflows (e.g., dial phone, navigate GPS, update record status).
_Avoid_: Macro, Script, UI Button

**Valid_If**:
An AppSheet validation expression pattern that enforces input integrity constraints (e.g., `[_THIS] > 0`) before a form submission is accepted.
_Avoid_: Form validation, Constraint check

**Initial Value**:
A default value expression automatically populated into a form input when creating a new record (e.g., `TODAY()`, `UNIQUEID()`).
_Avoid_: Default value, Placeholder

**UNIQUEID()**:
An AppSheet built-in function that generates a cryptographically unique 8-character alphanumeric string used as a collision-free Primary Key.
_Avoid_: Auto increment, UUID generator

**Automation Bot**:
An event-driven serverless workflow in AppSheet triggered by data changes or schedules to execute background tasks like email notifications or PDF generation.
_Avoid_: Webhook, Cloud Function, Zapier

### Interactive Web Delivery

**Standalone Interactive Textbook**:
A self-contained HTML page representing a single course chapter, referencing design tokens and vanilla JavaScript to provide interactive pedagogical features without build dependencies.
_Avoid_: Static webpage, Web app

**Archetype Tab Switcher**:
An interactive navigation tab control allowing readers to seamlessly toggle between the 3 concrete business models without vertical page clutter.
_Avoid_: View mode toggle, Filter bar

**Interactive Rubric Calculator**:
A client-side interactive scoring matrix that calculates and updates total assignment points dynamically upon selecting grade tiers.
_Avoid_: Score form, Grading sheet

**Mobile Viewport Simulator**:
An embedded mockup widget emulating native smartphone viewport progression across step-by-step technical workshops.
_Avoid_: Screenshot carousel, Phone frame
