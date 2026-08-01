# SYSTEM MASTER PROMPT: LoopLearn Website

## PROMPT INSTRUCTION FOR AI STUDIO / APP GENERATOR:

You are tasked with generating a production-ready, fully responsive, and complete web application for **LoopLearn**—a premium study platform for textile engineering students. You must build the complete application with all functional logic, state management, interactive UI, and dynamic CMS capabilities without truncating code, skipping features, or placing incomplete placeholders.

---

## 1. DESIGN SYSTEM & UI/UX PHILOSOPHY (KANO.ME INSPIRED)

### Visual Aesthetic & Style Guidelines
**Design Inspiration:** Modeled deeply after the clean, vibrant, high-contrast, tactile, and modern visual language of Kano.me. The design must be crisp, approachable, and playful while maintaining academic utility.

### Color Palette:
- **Primary Brand Accent:** Kano Signature Orange (#FF4F00) / Vibrant Warm Red.
- **Secondary Accent:** Electric Yellow (#FFCC00) & Deep Cobalt Blue (#1040E0) for active highlights.
- **Background Neutral:** Soft Tactile Cream/Off-White (#F7F7F2) for light theme; Deep Matte Charcoal (#121212) for dark theme.
- **Surfaces & Cards:** Crisp Pure White (#FFFFFF) in light mode; Slate Dark (#1E1E1E) in dark mode.
- **Borders & Outlines:** Crisp, tactile 2px solid black (#111111) outlines on interactive cards, buttons, and input fields to replicate Kano's physical design feel.

### Typography & Buttons:
- Bold, friendly sans-serif headings paired with highly legible body typography.
- Tactile pill-shaped and rounded rectangular buttons with playful hover elevation effects (`transform: translate(-3px, -3px)` with a solid drop-shadow).

### Theme System:
- Integrated Light & Dark Theme Toggle.
- Auto-detects device system preferences and allows manual one-click toggling to prevent eye strain during late-night study sessions.

---

## 2. HOMEPAGE ARCHITECTURE & HEADER COMPONENTS

### Header & Top Navigation
**Scrolling Notice Marquee:** Positioned at the very top, above the main header. Displays running announcements scrolling smoothly from right to left.

**Main Clean Navigation Bar:**
- **Brand Logo & Title:** Clean branding with "LoopLearn" as the global site name (customizable via CMS).
- **Vertical Drawer Menu Button:** Toggles a vertical navigation drawer.
- **Quick Search Bar:** Always-accessible search input filtering notes/labs by course code (e.g., TX-101), subject name, or custom tags.
- **Theme Switcher & Get Started Button:** Triggers the Gmail authentication workflow.

**Lower Header Area — "Download App" Callout:**
- Positioned strictly at the lower section of the header.
- Displays an eye-catching, animated "Download App" button.
- **Constraint:** Strictly do NOT use the word "PWA" or display any detailed description text about the app.

### Floating Engagement Elements
**Dynamic Floating Anchor Point:** Positioned on the screen as a floating action button.
- Displays a Downward Arrow when near the top of the page.
- Automatically transitions into an Upward Arrow as the user scrolls toward the footer to allow instant return to top.

**3D Messaging Hub:** A floating 3D message icon that expands upon interaction to reveal individual 3D quick-contact icons for:
- 3D Messenger Logo
- 3D WhatsApp Logo
- 3D Gmail Logo

### Homepage Interactive Sections
**Fixed Video Slot:** A clean, dedicated video player area. Supports video playability and uploading/management via the CMS. No text descriptions are displayed alongside the video.

**4 Interactive Showcase Cards:** Animated feature cards scrolling right-to-left that pause on hover.

**FAQ Section:** Dynamic collapsible accordion answering common student questions.

**Stunning Footer:**
- Includes platform rules, academic guidelines, and platform links.
- Discrete Admin Login Link: A subtle entry point for CMS authentication.

---

## 3. AUTHENTICATION & SECURITY (STRICT GMAIL ALIAS BLOCKING)

### Authentication Flow
Triggered when clicking "Get Started" or attempting to access restricted actions (such as downloading notes or submitting content).

### Strict Gmail Enforcement & Alias Prevention:
- Authentication requires a valid Gmail account.
- **Anti-Alias Validation Logic:** The authentication engine strips all dots (.) from the username portion and ignores any extension added with a + symbol (e.g., `bily1+123@gmail.com` or `b.i.ly1@gmail.com` are normalized to `bily1@gmail.com`).
- If a normalized account is already registered, alias creation attempts are rejected.

### Profile Setup & Username Generation
Upon first sign-in, users complete a profile setup form requiring strictly lowercase inputs:
- **NickName** (strictly 1 single word)
- **Batch No** (numeric format)
- **Department**
- **Institution Name**
- **Institution NickName**

**System-Generated Username:** Formatted automatically as:
- Example: `hani` + `16` + `ptec` → `hani16ptec`

**Current Semester Setting:** Users set their active semester in their profile (stored in LocalStorage). The platform automatically filters and recommends relevant course content based on this preference.

---

## 4. DEDICATED WEBPAGES & ACADEMIC MODULES

When users select main categories from the vertical menu, they are redirected to dedicated standalone web pages:

### A. Dedicated Notes Webpage (`/notes`)
**Navigation Flow:** Clicking "Notes" redirects the user directly to the dedicated Notes portal page.

**Selection & Filter Panel:** At the top of the page, users select:
- Department Name (4 Departments)
- Semester Name (Semesters 1 to 8)
- Course Name / Course Code (e.g., TX-101)

**Grid Display:** Loads filtered notes in a 3x3 grid layout (9 flashcards per page).

### B. Dedicated Labs Webpage (`/labs`)
**Navigation Flow:** Clicking "Lab" redirects the user directly to the dedicated Lab Reports portal page.

**Selection & Filter Panel:** Top filter control allowing selection of Department, Semester (1 to 8), and Course Name/Code.

**Grid Display:** Displays lab reports inside a 3x3 flashcard grid.

### C. Viva & Quiz Flashcards (`/viva`)
**Pathway:** Viva → 4 Departments → Semesters 1 to 8.

**Interactive Flip-Card UI:** Displays interactive flashcards (e.g., Question: "What is Yarn Count?"). Clicking/tapping triggers a smooth 3D flip animation to reveal the answer. Swiping or clicking navigation controls moves to the next card.

### D. Phonebook Directory (`/phonebook`)
Dedicated contact directory sorted by department.

Displays faculty, section officers, hall provosts, and administration details (Name, Title, Official Phone, Official Email).

### E. Syllabus Checklist (`/syllabus`)
**Pathway:** Syllabus → 4 Departments → Semesters 1 to 8.

Includes download options for full or split syllabi.

**Topic Checklist Feature:** Syllabus topics are presented as interactive checklists. Checked items persist locally in LocalStorage without requiring database writes.

---

## 5. RESOURCE FLASHCARDS & IN-APP PDF VIEWER

### Resource Card Schema (3x3 Grid Items)
Each note or lab item card displays:
- **Note Name:** Bold, clean title.
- **User Name:** Username of the contributor.
- **Download Action Button:** Dynamic primary button.
- **Shrunk Description Box:** Collapsible summary box.
- **Like Button:** Toggle counter.
- **Bookmark Button:** Syncs item links directly to connected Google Tasks favorites.
- **Star Rating System:** Interactive 1-to-5 star rating interface displaying average community feedback.

### In-App Offline PDF Viewer
Authenticated users who download notes can view them directly inside the web app's built-in PDF viewer.

**Technical Features:**
- Operates locally using device RAM and Google Drive API integration.
- Text copying capabilities.
- Multi-color and multi-size annotation pens.
- Built-in eraser tool.

### Community Note Submission
**"Submit Notes" Feature:** Opens an integrated Google Form workflow capturing Note Name, Subject, Semester, and optional description.

**Restricted users** (banned by CMS) will have the "Submit Notes" button disabled.

---

## 6. FULL-FEATURED BACKEND CMS & ADMIN CONTROL PANEL

### Security & Multi-Factor Access Gate
**Entry Point:** Footer "Admin Login" link.

**Multi-Factor Password Gate:** Requires three sequential, case-sensitive passwords:
- Password 1: `MangoMaster@908!3#p$`
- Password 2: `SuPersh0P@vbd#7&M!`
- Password 3: `Hello@Minhaz`

### Administrative Dashboard Modules

**Vertical Accordion Page Manager:**
- View all main pages and nested subcategories.
- Ability to Add, Edit, Duplicate, or Remove pages and nested items.
- Trash Can & Soft-Delete System: Removing a page prompts an "Are you sure?" dialog. Soft-deleted pages move to a Trash Menu and can be fully restored.

**User Control Hub ("All User Details"):**
- Displays all registered users with their Usernames and linked Gmail addresses.
- Admin controls to Remove or Restrict/Ban accounts. Banning a user disables their "Submit Notes" functionality automatically.

**In-Place Content & Text Editor:** Direct text editing and hyperlink assignment for dynamic elements across the entire platform.

**Fixed Video Slot Manager:** Upload, save permanently, or delete the homepage video.

**Note Approval & Moderation Queue:**
- Review user-submitted notes from Google Forms.
- Edit metadata before publishing, assign hidden search tags/keywords, and convert submissions into resource flashcards.

**Google Forms Manager:** Create, update, launch, or swap note submission forms.

**Global White-Labeling:** Update the global platform name (LoopLearn) instantly across all headers and titles.

---

## 7. DEFERRED IMPLEMENTATIONS ("LATER OPTIONS")

The following modules must be structurally defined in state/code architecture but kept hidden from the active user interface until enabled via CMS:

- **AI Assistant Bot:** Embedded academic support chatbot.
- **Push Notifications & Live Notice Board:** FCM-powered notifications for exam updates and newly uploaded notes.
- **Daily Class Routine & Reminders:** Department/batch-specific text class routines with automated daily alerts.
- **Advanced Google Tasks Synchronization:** Deep study-plan calendar synchronization.

---

## 8. AI STUDIO GENERATION & SELF-HEALING DIRECTIVES

### STRICT EXECUTION RULES FOR AI CODE GENERATOR:

**Complete Implementation:** Generate a fully functional web application containing complete frontend state management (using React/Vue/Vanilla JS state patterns or LocalStorage mocking for backend models).

**No Truncation or Placeholders:** Build out all interactive models, including the 3-tier admin login gate, full CMS functionality, dedicated notes/labs filter pages, PDF viewer interface components, and custom Kano-inspired styling.

**Self-Healing Fallback Logic:** Include robust error boundary handlers and state validation logic. If any component or state fails to load, the app must gracefully fall back to default mock data structures to ensure uninterrupted rendering and zero breaking errors.

---

## END OF SYSTEM MASTER PROMPT FOR LOOPLEARN