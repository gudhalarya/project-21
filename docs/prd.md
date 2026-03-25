# Requirements Document

## 1. Application Overview

- **Application Name:** Apex Coaching Institute
- **Description:** A premium monochrome coaching institute website featuring scroll-based storytelling, fluid animations, stacked section transitions (each new section slides over the previous), a clean black-on-white typographic aesthetic using the Sora font, a custom white dot cursor that adapts per section, and a fully animated hamburger navigation overlay.

---

## 2. Users and Use Cases

### Target Users
- Prospective students seeking coaching programs
- Parents evaluating coaching institutes
- Returning students looking for course or contact information

### Core Use Cases
- Discover the institute's offerings through an immersive scroll-driven narrative
- Browse available programs and courses
- Learn about the institute's philosophy and faculty
- Get in touch or inquire about enrollment

---

## 3. Page Structure and Core Features

### 3.1 Page Overview

```
Single-Page Website
├── Hero Section
├── About Section
├── Programs / Courses Section
├── Why Choose Us Section
├── Faculty Section
├── Testimonials Section
└── Contact Section
```

### 3.2 Global Design System

- **Color Palette:** Strictly monochrome — white background (#FFFFFF), black text and elements (#000000), mid-grey accents (#888888) for subtle dividers and secondary text
- **Typography:** Sora font applied globally across all headings, body text, labels, and UI elements
- **Border Radius:** All cards, buttons, form inputs, and UI containers use a consistent soft rounded corner radius (e.g., 16px–24px); no sharp rectangular edges anywhere on the site
- **Scroll Behavior:** Scroll-triggered animations power all section entrances and transitions; no auto-play or time-based triggers except the testimonials carousel
- **Animation Style:** Premium, smooth animations — including fade-ins, staggered text reveals, horizontal slides, parallax depth effects, and pinned scroll sequences
- **Stacked Section Scroll Effect:** Each section is positioned so that as the user scrolls down, the incoming section slides upward and visually overlaps and covers the previous section, creating a layered card-stacking effect. The outgoing section scales down slightly or recedes into the background as the new section rises over it. This applies to all section transitions throughout the page.
- **Navigation:** Fixed top navigation bar with the institute name/logo on the left and anchor links on the right; collapses into an animated full-screen overlay menu on mobile and tablet via a hamburger icon

### 3.3 Custom Cursor

- The default cursor is replaced with a small white filled circle (dot), approximately 10–14px in diameter, with a subtle border or drop shadow to remain visible on white backgrounds
- The cursor dot smoothly follows the pointer with a slight lag/lerp effect for a premium feel
- **Section-based color adaptation:** As the cursor moves into sections with a dark or black background, the dot inverts to white; on light/white background sections, the dot displays in black or dark grey — ensuring the cursor is always visible regardless of section background
- **Interactive element states:** When the cursor hovers over clickable elements (buttons, nav links, cards, form inputs), it transforms to display a contextual label or icon:
  - On primary CTA buttons and navigation links: cursor expands and displays the word 「View」 or a directional arrow (→) inside or beside the dot
  - On faculty or program cards: cursor expands with a subtle scale-up animation
  - On the contact form submit button: cursor displays a send or arrow icon
- All cursor transitions are smooth and animated (scale, opacity, label fade-in)
- Cursor custom styling is disabled on touch/mobile devices where no pointer is present

### 3.4 Hamburger Navigation (Animated Overlay)

- On desktop, the top navigation bar displays anchor links inline on the right side
- On mobile and tablet, the inline links are hidden and replaced with an animated hamburger icon on the right side of the nav bar
- **Hamburger icon animation:**
  - Default state: three horizontal lines (standard hamburger)
  - On click/tap to open: the three lines animate — the top and bottom lines rotate to form an X, and the middle line fades out; the transition is smooth and springy
  - On click/tap to close: the X reverses back to three lines with the same animation
- **Overlay menu open animation:**
  - The full-screen overlay slides in from the top, or expands outward from the hamburger icon position using a clip-path or scale reveal
  - The overlay background is solid black (#000000)
  - Navigation links appear in large white Sora typography, staggered one by one with a fade-and-slide-up entrance after the overlay finishes opening
- **Overlay menu close animation:**
  - Links fade out first, then the overlay collapses/slides back out in reverse
- **Link interaction in overlay:**
  - Each nav link has a hover state with a subtle underline draw or character spacing expansion
  - Tapping a link closes the overlay with its closing animation before smooth-scrolling to the target section
- The overlay menu respects reduced-motion preferences and degrades to an instant show/hide

### 3.5 Hero Section

- Full-viewport height opening section
- **Enhanced animation sequence on page load:**
  - The background geometric line art or texture fades and draws in first
  - The main headline enters with a staggered character-by-character or word-by-word reveal, each character animating in with a slight vertical offset and opacity transition
  - The subheadline fades and slides up after the headline completes
  - The CTA button scales up from zero or fades in last, with a subtle bounce or spring easing
  - A thin animated horizontal rule or decorative line draws across the section after all text is visible
- Large typographic headline with staggered reveal animation
- Subheadline with a short institute tagline
- A single primary CTA button (e.g., 「Explore Programs」) with rounded corners and a smooth hover animation (border fill, background inversion, or scale)
- Subtle background texture or geometric line art in monochrome
- Scroll-down indicator with an animated pulsing arrow or line at the bottom of the section
- This section acts as the base layer; the About Section slides over it on scroll

### 3.6 About Section

- Slides over the Hero Section as the user scrolls down (stacked section effect)
- Pinned scroll sequence: as the user scrolls within this section, key statements about the institute's mission and philosophy appear one by one in large, bold typography
- A brief paragraph describing the institute's founding story and core values
- A horizontal rule or animated divider separating this section from the next
- Rounded container or card wrapping the pinned content block

### 3.7 Programs / Courses Section

- Slides over the About Section as the user scrolls down
- Grid or staggered card layout listing available programs (placeholder content: Competitive Exam Prep, Academic Tutoring, Skill Development — to be replaced with actual data)
- Each card includes: Program Name, Short Description, Duration/Level indicator
- All cards have rounded corners consistent with the global design system
- Hover state on each card: subtle border reveal or background inversion (black background, white text)
- Scroll-triggered staggered entrance for each card

### 3.8 Why Choose Us Section

- Slides over the Programs Section as the user scrolls down
- Horizontal scroll or vertical stacked layout presenting 4–6 key differentiators (e.g., Expert Faculty, Proven Results, Personalized Attention, Structured Curriculum)
- Each item uses a large numeral or icon in outline style, a bold label, and a short supporting sentence
- Animated counter or number reveal on scroll entry

### 3.9 Faculty Section

- Slides over the Why Choose Us Section as the user scrolls down
- Row or grid of faculty cards, each containing: Name, Subject/Specialization, and a short bio
- Placeholder monochrome portrait images (to be replaced with actual photos)
- All faculty cards have rounded corners
- Scroll-triggered fade and slide-up entrance per card

### 3.10 Testimonials Section

- Slides over the Faculty Section as the user scrolls down
- Horizontally scrollable or auto-cycling carousel of student testimonials
- Each testimonial includes: Quote text, Student Name, Program Enrolled
- Minimal card design with a thin border and rounded corners; active card slightly enlarged or highlighted via contrast shift
- Smooth transition animation between testimonials

### 3.11 Contact Section

- Slides over the Testimonials Section as the user scrolls down
- Full-width section with a bold heading (e.g., 「Get in Touch」)
- Contact form with fields: Full Name, Email Address, Phone Number (optional), Program of Interest (dropdown), Message
- All form inputs and the submit button have rounded corners consistent with the global design system
- Submit button with hover animation
- Below the form: Address, Phone Number, and Email displayed as plain text
- Placeholder contact details (to be replaced with actual information)

### 3.12 Footer

- Institute name and a one-line description
- Navigation links mirroring the top nav
- Copyright notice
- Social media icon links (monochrome, outline style) — placeholder links

---

## 4. Business Rules and Logic

- **Stacked scroll transitions** are implemented using sticky positioning and z-index layering: each section is stacked above the previous one in z-order, and as the user scrolls, the new section rises over the outgoing section. The outgoing section may subtly scale down (e.g., to 0.95) or darken slightly as it is covered, reinforcing the depth effect.
- All other section transitions are exclusively scroll-triggered; no timed or auto-advancing animations except the testimonials carousel
- Navigation anchor links scroll smoothly to the corresponding section
- The contact form performs client-side validation: Name and Email are required; Email must be a valid format; form submission displays an inline success or error message
- All animations must respect the user's system-level reduced-motion preference (prefers-reduced-motion: reduce) — animations degrade to instant transitions; the stacked section effect degrades to a standard scroll without scale or overlay animation
- The site must be fully responsive across desktop, tablet, and mobile breakpoints
- On mobile and tablet, the horizontal navigation collapses into the animated full-screen overlay menu triggered by the hamburger icon
- The custom cursor is active only on pointer devices (desktop); it is not applied on touch-only devices

---

## 5. Edge Cases and Boundary Conditions

| Scenario | Expected Behavior |
|---|---|
| User submits contact form with empty required fields | Inline validation error messages appear beneath the relevant fields; form is not submitted |
| User submits contact form with invalid email format | Inline error shown beneath the email field |
| User has reduced-motion enabled in OS settings | All scroll animations and stacked section transitions are replaced with instant opacity transitions; hamburger overlay appears instantly |
| Page loaded on a slow connection | Text content and layout render first; animation scripts load progressively without blocking content |
| Navigation link clicked while already on the target section | No visible change; no error |
| Testimonials carousel reaches the last item | Loops back to the first testimonial seamlessly |
| Custom cursor enters a section where its default color matches the background | Cursor automatically inverts color to maintain visibility |
| Hamburger menu is open and user taps a nav link | Overlay closes with its exit animation before the page scrolls to the target section |
| Touch device detected | Custom cursor logic is disabled entirely; default system cursor or no cursor is used |

---

## 6. Acceptance Criteria

- The website renders correctly and is fully functional on Chrome, Safari, Firefox, and Edge (latest versions)
- All sections are reachable via navigation anchor links with smooth scroll behavior
- Scroll-triggered animations and stacked section transitions fire correctly on both desktop and mobile without layout shifts
- Each section visually slides over and covers the previous section on scroll, with the outgoing section receding into the background
- The contact form validates required fields and displays appropriate feedback on submission
- The Sora font is applied consistently across all text elements site-wide
- The color palette is strictly monochrome with no color values outside of black, white, and grey
- The site is fully responsive and usable on screen widths from 375px (mobile) to 1920px (desktop)
- Reduced-motion preference is respected and all animations degrade gracefully
- The hamburger icon animates correctly between its default and X states; the overlay opens and closes with its defined animations
- The custom cursor dot is visible at all times across all sections and correctly inverts or adapts its color based on the section background
- Cursor hover states display the correct contextual label or arrow on interactive elements
- All cards, buttons, inputs, and UI containers display consistently rounded corners with no sharp rectangular edges
- The hero section displays its full multi-step animation sequence correctly on page load
- All placeholder content (institute name, course details, faculty bios, contact info, images) is clearly marked for replacement

---

## 7. Out of Scope for This Version

- Student login portal or dashboard
- Online enrollment or payment processing
- Blog or news section
- Live chat or chatbot integration
- Multi-language support
- Backend CMS for content management
- Video backgrounds or embedded media players
- Push notifications or email marketing integration