# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Corporate marketing website for **BOJ Technologies Limited** (a Kenyan ICT company). Next.js 14 App Router + TypeScript + Tailwind CSS + lucide-react. There is no backend, database, or test suite — it is a statically-generated content site.

## Commands

```bash
npm run dev      # dev server, http://localhost:3000
npm run build    # production build (also runs type-check + lint; use this to verify changes)
npm run start    # serve the production build (PORT=3100 npm run start to change port)
npm run lint     # next lint only
```

There are no tests. `npm run build` is the primary correctness gate — it type-checks all routes and fails on TS or lint errors.

## Architecture

**Content lives in `data/`, not in components.** This is the most important pattern. `data/site.ts` (company info, nav, socials, core values, why-choose, stats), `data/services.ts`, `data/solutions.ts`, `data/portfolio.ts`, and `data/industries.ts` are plain typed arrays that drive the entire site. Adding a service, solution, or project = adding one object to the relevant array; pages, grids, the footer, and `app/sitemap.ts` all read from these arrays and update automatically. Each data file exports a `getX(slug)` helper used by dynamic routes. Icons are stored **as `LucideIcon` component references** directly in the data objects (imported from `lucide-react`), not as strings — except `data/site.ts` `socials`, which uses string keys mapped to icons inside `Footer.tsx` / `ContactInfo.tsx`.

**Dynamic routes are generated from data.** `app/services/[slug]/page.tsx` and `app/portfolio/[slug]/page.tsx` use `generateStaticParams()` + `generateMetadata()` sourced from the data arrays. All routes are static/SSG.

**Image strategy — `components/ui/ImagePlaceholder.tsx`.** Every visual on the site goes through this one component. When its `src` prop is undefined it renders a styled, labelled placeholder (gradient + grid pattern + icon + category chip); when `src` is set it renders an optimized `next/image` with the identical layout. Data objects carry `image` / `imageAlt` / `imagePlaceholder` / `imageCategory` fields precisely so real assets can be dropped in later by setting `image` — no layout changes. Remote image hosts must be added to `images.remotePatterns` in `next.config.mjs`.

**Design system is centralized in `tailwind.config.ts` + `app/globals.css`.** Colors are sampled from the real logo: `brand` (electric blue `#0060fc`), `ink` (deep navy `#001848`, used for dark sections and heading text), `accent` (complementary cyan). Fonts: `Sora` (`font-display`, headings) and `Inter` (`font-sans`, body) loaded via `next/font` in `app/layout.tsx` and exposed as CSS variables. `globals.css` defines reusable classes: `.text-gradient` / `.text-gradient-light`, `.glass`, `.reveal` (+ `.is-visible`), and grid-pattern backgrounds. Prefer these tokens/utilities over ad-hoc hex values.

**Animation is CSS + IntersectionObserver, not a library.** `components/ui/Reveal.tsx` is the only animation primitive: a `"use client"` wrapper that adds `.is-visible` when scrolled into view. Wrap content in `<Reveal delay={n}>` for scroll-in effects; the hero uses `animate-fade-up` keyframes (defined in the Tailwind config) for above-the-fold load animation instead. All motion respects `prefers-reduced-motion` (handled in `globals.css`). Do not add framer-motion or similar.

**Component layers.** `components/ui/` = primitives (Button, Container, Logo, Eyebrow, SectionHeader, Reveal, ImagePlaceholder). `components/cards/` = data-bound cards (ServiceCard, SolutionCard, PortfolioCard, IndustryCard, FeatureCard). `components/sections/` = page sections, several reusable across pages (`PageHero`, `CTASection`, `WhyChooseSection`, `IndustriesSection`, `ContactInfo`, `LegalLayout`); home-only sections live in `components/sections/home/`. Most components are server components; only `Navbar`, `Reveal`, `ContactForm`, and `PortfolioGrid` are `"use client"`. `Navbar` and `Footer` are mounted once in `app/layout.tsx`.

**Button polymorphism.** `components/ui/Button.tsx` renders `next/link` for internal `href` (starting with `/`), a plain `<a>` for external, or `<button>` when no `href`. Use its `variant`/`size` props rather than restyling.

## Logo & brand assets

Logo assets in `public/` (`logo-full.png`, `logo-mark.png`, `logo-mark-white.png`) and favicons (`app/icon.png`, `app/apple-icon.png`) were extracted from a raster source with Pillow (trimmed, background made transparent). `components/ui/Logo.tsx` uses the color mark on light backgrounds and the white mark when `tone="light"` (dark backgrounds). If an original vector logo becomes available, prefer swapping to SVG.

## Known integration points (currently stubbed)

- `components/sections/ContactForm.tsx` simulates submission client-side (fake delay + success state). Wire `handleSubmit` to an `app/api/contact/route.ts` handler, email service, or CRM to go live.
- `data/site.ts` contains placeholder phone numbers, emails, and social URLs — update with real values.
