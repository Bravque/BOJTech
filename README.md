# BOJ Technologies Limited — Corporate Website

A modern, premium, fully responsive corporate website for **BOJ Technologies Limited**, an ICT company delivering software, digital, hardware, networking and connectivity solutions.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and **lucide-react** icons.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # run the production build
```

## Design system

- **Colors** — `brand` (blue), `accent` (teal), `ink` (deep navy) scales defined in `tailwind.config.ts`.
- **Type** — `Sora` for display/headings, `Inter` for body (via `next/font`).
- **Motion** — subtle scroll reveals (`components/ui/Reveal.tsx`) + tasteful CSS keyframes. Respects `prefers-reduced-motion`.
- **Global styles & utilities** — `app/globals.css` (`.text-gradient`, `.reveal`, `.glass`, grid backgrounds, etc.).

## Project structure

```
app/                     # Routes (App Router)
  page.tsx               # Home
  about/ services/ solutions/ industries/ portfolio/ contact/
  services/[slug]/       # Dynamic service detail pages
  portfolio/[slug]/      # Dynamic project detail pages
  privacy-policy/ terms/ # Legal pages
  sitemap.ts robots.ts not-found.tsx layout.tsx globals.css
components/
  layout/                # Navbar, Footer
  ui/                    # Button, Container, Logo, Eyebrow, SectionHeader,
                         # Reveal, ImagePlaceholder
  cards/                 # ServiceCard, SolutionCard, PortfolioCard,
                         # IndustryCard, FeatureCard
  sections/              # PageHero, CTASection, ContactForm, ContactInfo,
                         # WhyChooseSection, IndustriesSection, LegalLayout,
                         # PortfolioGrid, home/*
data/                    # Central content — edit here to change site content
  site.ts services.ts solutions.ts portfolio.ts industries.ts
lib/utils.ts
```

## Editing content

All copy and structured content lives in `data/`. Add a service, solution or
project by adding an object to the relevant array — pages, grids, the sitemap and
the footer update automatically.

## Replacing image placeholders with real images

Every visual uses the reusable `ImagePlaceholder` component
(`components/ui/ImagePlaceholder.tsx`). Placeholders show a labelled, styled area
until a real image is provided.

Each item in `data/services.ts`, `data/solutions.ts`, `data/portfolio.ts` and
`data/industries.ts` already has these fields:

```ts
image?: string        // real image URL/path (leave undefined to show placeholder)
imageAlt: string      // accessibility alt text
imagePlaceholder: string  // label describing the intended image
imageCategory: string     // chip label / category
```

To use a real image:

1. Put the file in `public/images/…` (or use a remote URL — add its host to
   `images.remotePatterns` in `next.config.mjs`).
2. Set the `image` field, e.g. `image: "/images/software-dev.jpg"`.

The layout stays identical — the placeholder is simply replaced by an optimized
`next/image`.

## Wiring up the contact form

`components/sections/ContactForm.tsx` currently simulates submission. Point the
`handleSubmit` function at a Next.js Route Handler (`app/api/contact/route.ts`),
an email service, or a CRM to go live.

## Future-ready

The architecture is set up to grow into a CMS, blog, customer/client portal, POS
platform, delivery platform and online payments without a redesign — the design
system, reusable components and central data layer are the foundation.
