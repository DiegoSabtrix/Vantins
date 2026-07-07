# QuickBooks Homepage — React Recreation

A from-scratch, production-ready recreation of the **QuickBooks** marketing
homepage, built to study and reproduce its layout, spacing, typography
hierarchy, motion, responsiveness, and overall UX.

> **Disclaimer:** This is an independent UI/UX study for educational purposes.
> It is **not affiliated with, endorsed by, or connected to Intuit Inc.** No
> copyrighted assets are used — the logo, icons, and product imagery are all
> original placeholders generated from code.

## Tech stack

- **React 18** + **TypeScript** (strict)
- **Vite** for dev/build tooling
- **Tailwind CSS** with a custom design-token theme
- **Framer Motion** for scroll reveals, staggered entrances, and micro-interactions

## Getting started

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run lint      # lint the project
```

## Project structure

```
src/
├─ assets/           Static assets + notes (no copyrighted media)
├─ components/
│  ├─ icons/         Original SVG line icons
│  ├─ ui/            Reusable primitives (Button, Container, Badge, …)
│  ├─ layout/        Navbar, MobileMenu, Footer
│  └─ visuals/       Placeholder product mockups (dashboard, invoice, …)
├─ hooks/            useScrolled, useMediaQuery, useLockBodyScroll
├─ sections/         Page sections composed on the homepage
├─ types/            Shared TypeScript types
├─ utils/            cn(), motion presets, and site content/constants
├─ App.tsx           Page composition
└─ main.tsx          Entry point
```

## Homepage sections (top → bottom)

1. **Navbar** — sticky, elevates on scroll, mega-menu dropdowns, mobile drawer
2. **Hero** — headline, CTAs, trust points, animated dashboard mock
3. **Trust bar** — infinite customer-logo marquee
4. **Features** — six-card capability grid
5. **Product showcase** — alternating copy/visual rows with animated mocks
6. **Stats** — dark metrics band
7. **Testimonials** — three quote cards with star ratings
8. **Pricing** — three tiers with an animated promo/standard toggle
9. **FAQ** — accessible accordion
10. **CTA banner** — closing conversion block
11. **Footer** — link columns, socials, legal row

## Design & quality notes

- **Design tokens** (`tailwind.config.ts`) centralize the brand palette,
  fluid type scale (`clamp()`), shadows, and easing.
- **Accessibility**: skip link, semantic landmarks, `aria-expanded`/`aria-controls`
  on interactive disclosures, visible focus rings, `prefers-reduced-motion`
  support, and `role="tablist"` on the pricing toggle.
- **Responsiveness**: mobile-first layouts, fluid typography, and a dedicated
  mobile navigation drawer with body-scroll locking.
- **Performance**: no image payloads (all visuals are CSS/SVG), tree-shakeable
  modules, and animations that respect reduced-motion preferences.
