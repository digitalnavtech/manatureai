# Manature AI — manatureai.com

A production Next.js travel site for **Manature AI**, a Finland travel guide focused on Helsinki,
Finnish nature, hidden gems, day trips, itineraries, Lapland, saunas, islands and forests.

## Stack

- **Next.js 16.2.10** (App Router, Turbopack, React 19.2)
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-based theme in `app/globals.css`)
- **GSAP + `@gsap/react`** for light, accessible entrance/scroll animations
- **MDX content** via `gray-matter` + `next-mdx-remote/rsc` (server-rendered, zero client JS for content)
- Deployable on any Node.js host, including **Hostinger**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start the production server (run `build` first) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run placeholders` | Regenerate the local SVG placeholder images in `public/images/` |

Before shipping, all three of these should pass cleanly:

```bash
npm run typecheck
npm run lint
npm run build
```

## Project structure

```
app/                       Routes (App Router)
  destinations/[slug]/     Destination guide pages
  blog/[slug]/             Travel guide / article pages
  itineraries/[slug]/      Itinerary pages
  about/ contact/ privacy/ affiliate-disclosure/
  api/newsletter/ api/contact/   Form submission endpoints
  api/og/                  Dynamic Open Graph image generator
  sitemap.ts robots.ts manifest.ts rss.xml/
  icon.tsx apple-icon.tsx  Generated favicons
components/
  ui/                      Design-system primitives (Button, Badge, Container, ...)
  layout/                  Header, Footer, Hero, MobileMenu
  content/                 Article/destination layout, cards, TOC, FAQ, KeyFacts, JsonLd, ...
  animation/               GSAP client components (HeroReveal, ScrollReveal, CardsReveal, ParallaxImage)
  forms/                   NewsletterForm, ContactForm
  monetization/            AffiliateButton, BookingLinks, AdSlot, SponsoredLabel, GuidePromo
  analytics/                Analytics.tsx (GA4 / Clarity / Meta Pixel, env-gated)
content/
  destinations/*.mdx       6 destination guides
  articles/*.mdx           8 travel guide articles
  itineraries/*.mdx        3 itineraries
lib/
  content/mdx.ts           MDX loading, sorting, filtering, related-content utilities
  seo/                     Metadata builder + JSON-LD schema builders
  gsap/                    GSAP plugin registration + reduced-motion helpers
scripts/generate-placeholders.mjs   Generates local SVG placeholder photography
```

## Content system

Every destination, article and itinerary is an `.mdx` file with YAML frontmatter under `content/`.
To add a new one, copy an existing file in the relevant folder and update the frontmatter — no code
changes are needed. Required frontmatter fields are documented by the TypeScript types in
`types/content.ts` (`ArticleFrontmatter`, `DestinationFrontmatter`, `ItineraryFrontmatter`).

Pages are statically generated at build time via `generateStaticParams`, so **new content requires a
rebuild** to appear (`npm run build`).

Images referenced in frontmatter (`featuredImage`) should live under `public/images/...`. The site
currently ships with generated placeholder SVGs — see [Remaining placeholders](#remaining-placeholders-to-replace) below.

## Environment variables

Copy `.env.example` to `.env.local` for development, and configure the same variables in your host's
environment settings for production.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical base URL used for metadata, sitemap, RSS and OG images |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID — GA4 only loads if this is set |
| `NEXT_PUBLIC_CLARITY_ID` | No | Microsoft Clarity project ID — only loads if set |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | Meta Pixel ID — only loads if set |
| `NEXT_PUBLIC_GSC_VERIFICATION` | No | Google Search Console HTML-tag verification value |
| `NEWSLETTER_API_KEY` | No | Server-only key for your email provider (Brevo/Mailchimp/ConvertKit) — see `app/api/newsletter/route.ts` |
| `CONTACT_EMAIL` | Recommended | Destination address for the contact form (`app/api/contact/route.ts`) |

No secret keys are hardcoded anywhere in the codebase.

## SEO & structured data

- Unique title, meta description, canonical URL and Open Graph image on every page (OG images are
  generated dynamically at `/api/og`, so no manual image asset is needed per page).
- JSON-LD: Organization and WebSite on every page; Article/BlogPosting, BreadcrumbList,
  TouristDestination and FAQPage where applicable (`lib/seo/schema.ts`, `components/content/JsonLd.tsx`).
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/rss.xml` are all generated from the same
  content source as the pages, so they stay in sync automatically.

## Accessibility & performance notes

- Skip-to-content link, visible focus rings, semantic landmarks, accessible forms with inline errors.
- All animations respect `prefers-reduced-motion` and never hide content before JavaScript loads —
  content is fully server-rendered and visible; GSAP only adds a short entrance transition on top.
- Server Components by default; the only client components are the small interactive pieces
  (mobile menu, forms, GSAP wrappers).

## Remaining placeholders to replace

- **Images** — `public/images/**/*.svg` are procedurally generated placeholders (see
  `scripts/generate-placeholders.mjs`). Replace with real photography, keeping the same file paths (or
  update the `featuredImage` frontmatter field to match new filenames).
- **Affiliate links** — `components/monetization/BookingLinks.tsx` uses `#affiliate-placeholder-*`
  hrefs. Swap in real Booking.com / GetYourGuide / SafetyWing (or similar) affiliate links once those
  accounts exist.
- **`CONTACT_EMAIL`** and **`NEWSLETTER_API_KEY`** — set real values in production.
- **Analytics IDs** — `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
  `NEXT_PUBLIC_GSC_VERIFICATION`.
- **Instagram** — confirm `@manatureai` / `https://www.instagram.com/manatureai/` in
  `lib/seo/config.ts` is the correct live account.

## Deploying to Hostinger (Node.js hosting)

1. **Node.js version** — use **Node 20.9+ LTS** (Next.js 16 requires it). In Hostinger's hPanel, under
   your Node.js application settings, select Node 20 (or newer) from the version dropdown.
2. **Upload the project** — push this repository to Git and connect it in hPanel, or upload the files
   directly (excluding `node_modules` and `.next`, which are generated on the server).
3. **Install dependencies** on the server:
   ```bash
   npm install
   ```
4. **Set environment variables** in hPanel's "Environment variables" section for the app (or via a
   `.env.production` file if your plan doesn't expose a UI for it) — at minimum `NEXT_PUBLIC_SITE_URL`
   and `CONTACT_EMAIL`, plus any analytics IDs you're using.
5. **Build command**:
   ```bash
   npm run build
   ```
6. **Start command** — point Hostinger's Node.js app "Startup file" / start command at:
   ```bash
   npm run start
   ```
   Next.js will listen on the `PORT` environment variable Hostinger provides automatically; no code
   changes are needed for this.
7. **Connect your domain** — in hPanel, point `manatureai.com` (and `www`) at the Node.js application,
   either directly or via Hostinger's reverse proxy for Node apps.
8. **SSL** — enable Hostinger's free SSL (Let's Encrypt) for the domain once DNS has propagated, then
   confirm `https://manatureai.com` loads without certificate warnings.
9. **Verify the production build**, once live:
   - `https://manatureai.com/` loads and looks correct
   - `https://manatureai.com/sitemap.xml` returns valid XML listing all pages
   - `https://manatureai.com/robots.txt` references the correct sitemap URL and allows crawling
   - `https://manatureai.com/rss.xml` returns a valid RSS feed
   - Submit the sitemap URL in Google Search Console and verify ownership using
     `NEXT_PUBLIC_GSC_VERIFICATION`

Next.js does not use any Vercel-only APIs and does not require the Edge runtime, so it runs as a
standard Node.js server process on Hostinger without modification.
