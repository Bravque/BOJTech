# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Corporate marketing website for **BOJ Technologies Limited** (a Kenyan ICT company). Next.js 14 App Router + TypeScript + Tailwind CSS + lucide-react. Content is stored in a **MySQL database** (via Prisma) and managed through a login-protected **admin dashboard** at `/admin`. There is no automated test suite. Runs as a Node.js server (deploys to Hostinger Business — see `DEPLOYMENT.md`).

## Commands

```bash
npm run dev            # dev server, http://localhost:3000
npm run build          # runs prisma generate + next build (type-check + lint; primary gate)
npm run start          # serve the production build (PORT=3100 npm run start to change port)
npm run lint           # next lint only
npx prisma migrate deploy   # apply DB schema (prisma/migrations)
npm run db:seed        # load current content into the DB (idempotent; from data/*.ts)
npm run create-admin -- "Name" email pass ADMIN   # create/reset a login
```

There are no tests. `npm run build` is the primary correctness gate — it type-checks all routes and fails on TS or lint errors. It does **not** need a database (content pages are dynamic and only query MySQL at request time). See `DEPLOYMENT.md` for full setup.

## Architecture

**Content lives in MySQL; the app reads it through `lib/content.ts`.** The read layer exposes async getters (`getServices`, `getService(slug)`, `getSolutions`, `getProjects`, `getIndustries`, `getCoreValues`, `getWhyChoose`, `getStats`, `getSiteSettings`) that return objects shaped exactly like the old `data/*.ts` types — with the stored icon **name string** resolved back to a `LucideIcon` component via `lib/icons.ts`. So server components/cards render unchanged; they just `await` a getter instead of importing an array. `lib/db.ts` is the Prisma client singleton. `data/*.ts` is retained as: (a) the **seed source** (`prisma/seed.ts`), (b) shared **type** definitions imported by components, and (c) the static route-bound `mainNav`/`footerNav` used by `Navbar`/`Footer`.

**Icons are stored as registry name strings.** `lib/icons.ts` maps names → `LucideIcon` components (`iconRegistry`, `resolveIcon`, `isIconName`, `iconNames`). The DB stores the name; the read layer resolves it; the admin **icon picker** offers these choices. Add a new icon there to make it available. `socials` still use string keys mapped to icons inside `Footer.tsx` / `ContactInfo.tsx`.

**All content routes are dynamic (`export const dynamic = "force-dynamic"`)**, set once in the root `app/layout.tsx` and cascading to every route, so DB edits appear instantly. `app/services/[slug]` and `app/portfolio/[slug]` use async `generateMetadata()` and read the DB per request (no `generateStaticParams`). Server actions call `revalidatePath()` on save as belt-and-suspenders.

**Route groups.** `app/(site)/` holds the public marketing pages and its `layout.tsx` renders the public chrome (Navbar/Footer/StructuredData). `app/admin/` is the dashboard: `app/admin/login` (public login), `app/admin/(dashboard)/` (guarded by `middleware.ts` + a session recheck in its layout, with the sidebar chrome). The root `app/layout.tsx` is a bare html/body shell + global metadata.

**Admin dashboard (`app/admin`).** Auth is NextAuth v4 Credentials + JWT (`lib/auth.ts`, `middleware.ts` protects `/admin/*`, users in the `User` table with bcrypt hashes). CRUD for every content type lives under `app/admin/(dashboard)/<type>/` (list + `new` + `[id]` edit). Mutations are **server actions** in `app/admin/_actions/*` (zod-validated, `revalidatePath`). Reusable form primitives (TextInput, TextArea, SelectInput, ListEditor, IconPicker, ImageField, SubmitButton) are in `app/admin/_components/fields.tsx`; per-entity forms in `app/admin/_components/forms/`. Image uploads POST to `app/api/admin/upload/route.ts` (writes to `public/uploads`). Fixed taxonomies live in `types/content.ts`.

**Image strategy — `components/ui/ImagePlaceholder.tsx`.** Every visual on the site goes through this one component. When its `src` prop is undefined it renders a styled, labelled placeholder (gradient + grid pattern + icon + category chip); when `src` is set it renders an optimized `next/image` with the identical layout. Data objects carry `image` / `imageAlt` / `imagePlaceholder` / `imageCategory` fields precisely so real assets can be dropped in later by setting `image` — no layout changes. Remote image hosts must be added to `images.remotePatterns` in `next.config.mjs`.

**Design system is centralized in `tailwind.config.ts` + `app/globals.css`.** Colors are sampled from the real logo: `brand` (electric blue `#0060fc`), `ink` (deep navy `#001848`, used for dark sections and heading text), `accent` (complementary cyan). Fonts: `Sora` (`font-display`, headings) and `Inter` (`font-sans`, body) loaded via `next/font` in `app/layout.tsx` and exposed as CSS variables. `globals.css` defines reusable classes: `.text-gradient` / `.text-gradient-light`, `.glass`, `.reveal` (+ `.is-visible`), and grid-pattern backgrounds. Prefer these tokens/utilities over ad-hoc hex values.

**Animation is CSS + IntersectionObserver, not a library.** `components/ui/Reveal.tsx` is the only animation primitive: a `"use client"` wrapper that adds `.is-visible` when scrolled into view. Wrap content in `<Reveal delay={n}>` for scroll-in effects; the hero uses `animate-fade-up` keyframes (defined in the Tailwind config) for above-the-fold load animation instead. All motion respects `prefers-reduced-motion` (handled in `globals.css`). Do not add framer-motion or similar.

**Component layers.** `components/ui/` = primitives (Button, Container, Logo, Eyebrow, SectionHeader, Reveal, ImagePlaceholder). `components/cards/` = data-bound cards (ServiceCard, SolutionCard, PortfolioCard, IndustryCard, FeatureCard). `components/sections/` = page sections, several reusable across pages (`PageHero`, `CTASection`, `WhyChooseSection`, `IndustriesSection`, `ContactInfo`, `LegalLayout`); home-only sections live in `components/sections/home/`. Most are server components; several sections that read content (`Footer`, `CTASection`, `ContactInfo`, `WhyChooseSection`, `IndustriesSection`, `StructuredData`, and the home sections) are now **async** and `await` `lib/content.ts`. Client components are `Navbar`, `Reveal`, `ContactForm`, `PortfolioGrid` — client components cannot call the (async, server-only) read layer, so they receive data as **props** from a server parent (`ContactForm` gets a `services` list, `PortfolioGrid` gets `projects`); `Navbar` uses the static `mainNav` from `data/site.ts`. `Navbar`/`Footer`/`StructuredData` are mounted in `app/(site)/layout.tsx`.

**Button polymorphism.** `components/ui/Button.tsx` renders `next/link` for internal `href` (starting with `/`), a plain `<a>` for external, or `<button>` when no `href`. Use its `variant`/`size` props rather than restyling.

## Logo & brand assets

Logo assets in `public/` (`logo-full.png`, `logo-mark.png`, `logo-mark-white.png`) and favicons (`app/icon.png`, `app/apple-icon.png`) were extracted from a raster source with Pillow (trimmed, background made transparent). `components/ui/Logo.tsx` uses the color mark on light backgrounds and the white mark when `tone="light"` (dark backgrounds). If an original vector logo becomes available, prefer swapping to SVG.

## Known integration points

- **Contact form is wired.** `components/sections/ContactForm.tsx` POSTs to `app/api/contact/route.ts`, which validates input, blocks spam via a honeypot field, and delivers email through Resend's REST API. Delivery is gated on env vars (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, optional `CONTACT_TO_EMAIL` — see `.env.example`); when unset, submissions are validated and logged server-side (never silently lost) but no email is sent. To use a different provider (SMTP/CRM), replace the `deliver()` function in the route — the request/response contract is unchanged.
- **Company/contact details live in the DB** (`SiteSetting`, one row) and are edited at **/admin/settings** — they feed the footer, contact page, `tel:`/`mailto:` links, JSON-LD (`components/StructuredData.tsx`) and sitemap. The initial values are seeded from `data/site.ts`; `getSiteSettings()` falls back to `data/site.ts` if the row is missing so the site never crashes pre-seed.
- SEO: a site-wide Open Graph/Twitter image is generated at `app/opengraph-image.tsx`; Organization/LocalBusiness JSON-LD lives in `components/StructuredData.tsx` (mounted in `app/(site)/layout.tsx`); every page sets `alternates.canonical`.
- **Deployment**: see `DEPLOYMENT.md` (Hostinger Business Node.js app + MySQL; env vars `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`). The DB (`u735599564_bojtechnologies`) + user (`u735599564_bojtech`) already exist in hPanel; on the server the DB host is `localhost:3306`.
- **Deployment migration in progress (static → Node.js app).** The live `bojtechnologies.com` is currently served as **static files in Hostinger `public_html`**. Because the site is now dynamic (DB-backed, `/admin`, API routes, auth) it can **no longer be statically exported** — it must run as a Hostinger **Node.js App** (hPanel → Websites → Add Website → Deploy Web App → GitHub integration on `main`), which takes over serving the domain from `public_html`. The auto build (`npm install` + `npm run build`) needs no database; only the one-time `prisma migrate deploy` + `npm run db:seed` + `npm run create-admin` need DB access (via SSH/terminal, or Remote MySQL from a local checkout). Start command: `npm run start` (binds Hostinger's `PORT`). If the managed Node process won't stay up, fall back to a Hostinger VPS.
