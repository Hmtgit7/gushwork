# Mangalam HDPE — Product Landing Page

A pixel-perfect, production-ready product landing page built from a Figma design as part of the **Gushwork Frontend Assignment**. The page showcases premium HDPE Pipes & Coils with rich interactive UI components — all in vanilla HTML, CSS, and JavaScript with zero frameworks or build tools.

---

## Live Preview

> Open `index.html` directly in a browser — no server required.

---

## Project Structure

```
gushwork/
├── index.html              # Single-page HTML (semantic HTML5)
├── CSS/
│   └── style.css           # All styles — pure CSS, BEM methodology
├── JS/
│   └── script.js           # All interactivity — vanilla JS, no dependencies
└── Assets/
    ├── logo-header.svg
    ├── logo-footer.svg
    ├── product-view-01.png  # Hero carousel images
    ├── product-view-02.jpg
    ├── product-view-03.jpg
    ├── product-view-04.jpg
    ├── product-view-05.jpg
    ├── badge-bis-certified.svg
    ├── badge-iso-certified.svg
    ├── badge-ce-certified.svg
    ├── texture-noise-bg.svg
    ├── icon-*.svg           # All UI icons
    └── brand-partner-logo.svg
```

---

## Features & Sections

| Section | Description |
|---|---|
| **Sticky Header** | Slides in from top after scrolling 25% of viewport height |
| **Mobile Menu** | Full-screen slide-in drawer with backdrop overlay |
| **Hero Section** | Image carousel with zoom-on-hover, thumbnails, cert badges, price box, CTAs |
| **Technical Specs** | Dark-themed table with download trigger |
| **Features Grid** | 6-card grid with icons — product benefits |
| **FAQ Accordion** | Expand/collapse with custom SVG toggle icons |
| **Versatile Applications** | Horizontally scrollable card carousel with nav buttons |
| **HDPE Manufacturing Stepper** | Step chips (desktop) / prev-next (mobile) with animated content swap |
| **Testimonials** | Horizontally scrolling performance cards |
| **Solutions Portfolio** | 3-column card grid with expert CTA box |
| **Resources & Downloads** | Downloadable PDFs list — triggers Brochure modal |
| **Contact Form** | Validated form with success state |
| **Footer** | 4-column links grid with social icons |
| **Sticky Price Bar** | Slides up from bottom when "Versatile Applications" section is in view; hides at footer |
| **Brochure Modal** | Email capture with success animation — triggered by all download buttons |
| **Quote Modal** | Callback request form — triggered by all CTA quote buttons |

---

## Interactive Behaviours

### Sticky Header
Appears when `scrollY > window.innerHeight / 4`, hidden on scroll back to top.

### Hero Carousel
- 5 product images with prev/next arrow navigation
- Thumbnail click to jump to any image
- Keyboard `←` / `→` arrow key support
- Image counter overlay
- **Zoom on hover** — cursor-tracking magnifier panel (desktop only)

### FAQ Accordion
Single-open accordion. Toggles between `faq-icon-collapsed.svg` and `faq-icon-expanded.svg`.

### HDPE Stepper
- Desktop: clickable step chips with connecting lines
- Mobile: prev / next navigation buttons

### Sticky Price Bar
Uses `IntersectionObserver` to:
- **Show** when `.versatile-section` enters the viewport (at least 5% visible)
- **Hide** when the `.footer` enters the viewport, or on scroll back above the trigger section

### Modals
Two modals with shared open/close logic:
- **Brochure modal** — triggered by download buttons and "Request Catalogue"
- **Quote modal** — triggered by "Get Custom Quote", "Request a Quote", "Talk to an Expert"
- Both support: backdrop click to close, `Escape` key to close, focus trap on first input, success state with auto-dismiss

---

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Pure CSS — BEM naming, CSS custom properties |
| Scripting | Vanilla JavaScript (ES2020) — no jQuery, no frameworks |
| Fonts | Google Fonts — Inter + Urbanist |
| Icons | Inline SVG / SVG asset files |
| Build | None — open `index.html` directly |

---

## CSS Architecture

All design tokens are defined as CSS custom properties in `:root`:

```css
--blue: #2b3990;
--blue-dark: #1f2a6b;
--font-inter: "Inter", sans-serif;
--font-urban: "Urbanist", sans-serif;
--shadow-hero: 0px 20px 40px -8px rgba(88, 92, 95, 0.2);
/* ...and more */
```

Class naming follows **BEM** — e.g. `price-sticky-bar__price-value`, `hero-info__top`, `perf-card`.

---

## Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `< 768px` | Single-column layout; hero gallery full-width; price bar stacked CTAs |
| `768px – 1023px` | Two-column hero grid; simplified price bar |
| `≥ 1024px` | Full desktop layout; zoom panel visible; desktop step chips |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Hmtgit7/gushwork.git

# Open in browser
cd gushwork
open index.html   # macOS
start index.html  # Windows
```

No `npm install`, no build step — it just works.

---

## Design Reference

Figma: [Gushwork Assignment](https://www.figma.com/design/DOv07H7C2tA5UrVLhmfwfW/Gushwork-Assignment?node-id=490-8785)

---

## License

This project was created as a frontend assignment for Gushwork.
