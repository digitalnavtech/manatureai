# ManatureAI Project Memory

Last updated: 2026-10-08

## Project identity

- Brand: ManatureAI
- Production URL: https://manatureai.com
- Focus: birds, backyard wildlife, smart bird feeders, bird cameras, and nature technology
- Stack: Next.js 16.3.5 App Router, React 19, TypeScript, Tailwind CSS 4
- Visual direction: premium editorial nature publication; forest green, warm paper, moss, and amber accents

## Important source locations

- Product source copy: `product/Product_content.md`
- Product FAQ source: `product/Ask.md`
- Product data and the only stored Amazon URL: `data/products.ts`
- Site identity/navigation: `lib/site.ts`
- Shared metadata helper: `lib/metadata.ts`
- Uploaded product images: `public/ai_mages/` (keep this exact existing spelling)
- Global responsive design system: `app/globals.css`
- Main review: `app/reviews/[slug]/page.tsx`

## Editorial and compliance rules

- Do not claim hands-on testing unless evidence is added.
- Attribute unverified capabilities to the manufacturer or product listing.
- Do not publish hard-coded prices, discounts, availability, review counts, or star ratings.
- Affiliate links must use `rel="sponsored nofollow noopener noreferrer"`.
- Keep the disclosure visible near recommendations and in the site footer.
- Site-wide disclosure text: ““As an Amazon Associate I earn from qualifying purchases.””
- Current affiliate URL: `https://link.amazon/B016RelPr`; update it only in `data/products.ts`.
- AI identification is described as having a one-month trial with possible paid monthly/yearly service afterward.

## Implemented architecture

- Routes: `/`, `/reviews`, `/reviews/[slug]`, `/birds`, `/birds/[slug]`, `/guides`, `/guides/[slug]`, `/best`, `/best/[slug]`, `/about`, `/contact`, `/affiliate-disclosure`, `/privacy-policy`, and `/terms`.
- The first statically generated article is `/reviews/smart-bird-feeder-with-camera`.
- Bird/guide/best dynamic route files are prepared; unknown slugs intentionally return the shared 404 until data is added.
- Shared components cover navigation, footer, containers, breadcrumbs, disclosures, affiliate buttons, feature grids, pros/cons, specifications, gallery, FAQs, table of contents, related content, author details, and newsletter CTA.
- JSON-LD includes Organization and WebSite globally plus Article, BreadcrumbList, and FAQPage on the review.
- Product schema is intentionally omitted because current price and availability data are not available.
- Analytics loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` exists.
- Search Console verification uses `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

## Image mapping

- Hero: `Smart Bird Feeder in a Sunny Garden.png`
- 2K video: `2K HD Bird Feeder Camera Ad.png`
- Solar: `Powered by the Sun Bird Feeder.png`
- AI and alerts: `Instant Bird Alerts AI Identification..png`
- Weather: `All-Weather Bird Feeder Camera.png`
- Construction: `All-Weather Tough Bird Feeder.png`
- Assembly: `Easy Bird Feeder Assembly Guide.png`
- Squirrel deterrence: `Tap to Scare Squirrels Away.png`
- Family/gift context: `a-brighter-backyard-together.png`

## Verification baseline

- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed
- Production build generated 17 pages/routes, including robots.txt and sitemap.xml.
- Turbopack root is pinned in `next.config.ts` to prevent an unrelated parent lockfile warning.
- The generated standalone server returned HTTP 200 in a local smoke test.
- `docker compose --env-file .env.example config`: passed.
- Docker CLI 29.8.0 and Compose 5.5.1 were available, but the Docker Desktop engine was not running, so the Docker image build was not run.

## Production deployment configuration

- Target VPS: Hostinger KVM 2 at `72.62.116.152`, running Ubuntu and an existing Traefik instance.
- `next.config.ts` uses `output: "standalone"`.
- `Dockerfile` is a multi-stage Node.js 24 Alpine build using `npm ci` and a non-root `nextjs` user.
- `docker-compose.yml` defines only the `manatureai` service and does not publish port 3000 on the host.
- Traefik router name: `manatureai-websecure`.
- Traefik service name: `manatureai-app`.
- The existing Traefik Docker network and certificate resolver must be discovered on the VPS and set as `TRAEFIK_NETWORK` and `TRAEFIK_CERT_RESOLVER` in the deployment `.env` file.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_GA_MEASUREMENT_ID` are optional image build-time values; changing them requires rebuilding the image.
- There are currently no server-only application runtime variables or secrets.
- Deployment, verification, logging, update, and rollback commands are documented in `DEPLOYMENT.md`.
- Do not create another Traefik container, expose host port 3000, run `docker system prune`, alter other VPS projects, deploy without reviewing the existing Traefik configuration, or push to GitHub without permission.

## Manual production actions

1. Confirm the DNS `A` record for `manatureai.com` points to `72.62.116.152`.
2. Inspect the VPS to identify the exact existing Traefik network and ACME certificate resolver.
3. Create the deployment `.env` from `.env.example` and replace the Traefik placeholders; never commit the resulting `.env`.
4. Run the Docker image build and Compose deployment on the VPS only after the Traefik values are confirmed.
5. Verify HTTPS, certificate validity, application logs, and Traefik logs using `DEPLOYMENT.md`.
6. Confirm `hello@manatureai.com` is a working mailbox or change it in `lib/site.ts`.
7. Review the privacy policy after enabling any analytics/consent tooling.
8. Reconfirm Amazon product specifications and AI subscription terms before launch and periodically afterward.
9. Submit `https://manatureai.com/sitemap.xml` and verify Search Console.
