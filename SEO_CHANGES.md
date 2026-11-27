# SEO and GEO overhaul (branch `seo-geo-overhaul`)

Status: **plan** (this section is written before any edit; the per-task log follows as tasks land).

## What is already in place (do not break)

- Next.js 16 App Router, static marketing pages, `src/lib/seo.ts` `pageMetadata()` for titles, descriptions, canonicals,
  OG and Twitter cards; `scripts/seo-check.mjs` audits the built HTML (titles, descriptions, one H1, canonicals, JSON-LD).
- One JSON-LD `@graph` per page (`src/components/json-ld.tsx`): Organization, founder (Person), WebSite, WebPage,
  BreadcrumbList, FAQPage, BlogPosting; SoftwareApplication with `offers` built from `src/config/pricing.ts`.
- `src/app/sitemap.ts` with real content dates (`src/content/page-dates.json` from git, posts use `dateModified`),
  `src/app/robots.ts`, `src/app/llms.txt/route.ts`, per-route OG images (`src/lib/og.tsx`), IndexNow key file in `public/`.
- Content is TypeScript data, not MDX: posts in `src/content/posts*.ts` (54), feature pages in
  `src/content/feature-pages.ts`, comparisons in `src/content/alternatives.ts`, releases in `src/content/releases.ts`.
- `src/proxy.ts` (Next 16 middleware) runs only on private pages; public pages stay static.
- Analytics: `@vercel/analytics` in the root layout, Google tag and Tag Manager (`src/components/google-tag.tsx`).

Baseline (production build, 27 Nov 2026): homepage HTML 435,206 bytes (57,327 gzipped), of which 237,060 bytes are the
inline React Server Components payload and 28,610 bytes inline SVG (111 icons); /pricing 302 KB, a feature page 215 KB,
/blog 262 KB, a post 187 KB. All 39 homepage images have an `alt` attribute; the audit's "9 without alt" are the
decorative ones with `alt=""` (checked in A8).

## Decisions where the brief meets an existing rule or a policy

- **aggregateRating (A3).** Google's review snippet guidelines say ratings must come from your own users and that sites
  should not mark up reviews or ratings collected on other websites; Google has also said republished third-party reviews
  are not eligible. The 5.0 rating is collected on the Chrome Web Store, so marking it up on growxapp.org risks a
  structured-data manual action. The visible trust strip ships as asked. The `aggregateRating` code ships behind
  `socialProof.markUpRating`, **off by default**, so Shahriar can decide after reading the guideline.
- **Badges (A2).** `src/data/badges.ts` records that several directories require a dofollow badge in the server HTML,
  "ideally the footer", and recheck it. The brief removes them from the footer and nofollows them. This is done as asked;
  the risk (some directories may drop the listing) is in the manual task list.
- **Current version.** The brief says 2.5.0; the latest changelog entry is 2.5.1 (released 27 Nov 2026). Titles read the
  latest entry, so they say 2.5.1 now and follow future releases.
- **Clean store URL in structured data.** Every clickable store link gets UTM parameters through the helper. JSON-LD
  (`sameAs`, `installUrl`, `downloadUrl`) and llms.txt keep the clean listing URL: they identify the entity, and AI
  answers that copy a link would otherwise report as "website" traffic.

## Order of work (one commit per task)

1. A1 store link helper and click event; A2 badges only on /featured.
2. A3 social proof and testimonials; A9 metadata, verification, IndexNow, /whats-new from the changelog; B1 robots.txt
   AI crawler groups, `scripts/check-ai-bots.ts`, AI crawler log line in the proxy; B2 one entity definition.
3. A4 cannibalization merges with one-hop permanent redirects (`next.config.ts`), `scripts/check-redirects.ts`;
   B5 comparison tables and "When to choose X instead".
4. A5 feature pages, A6 use-case pages, A7 `ExtensionCta`, related links and `scripts/check-internal-links.ts`,
   B4 answer-first openings and question headings.
5. B3 fact sheet on /press, B6 pricing table from the one pricing config, B7 visible "Updated" dates, B8 llms.txt,
   B9 AI referrer channel and prompts doc, B10 content plan, A8 images and HTML size.
6. Lint, typecheck, unit tests, production build, E2E, every check script; finish this file.

## Redirect rules

- `next.config.ts` `redirects()`, `permanent: true` (HTTP 308), destination is the absolute canonical URL so a request on
  either host reaches the final page in one hop. No rule points at a URL that redirects again.
- Merged posts leave `src/content/posts*.ts`, so the sitemap, RSS feed, llms.txt and blog index drop them automatically.
  Every internal link to them is rewritten to the winner.
