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

## A4 decisions: keyword cannibalization (27 Nov 2026)

Every page in each cluster was read before deciding. The default decision was applied unless the content clearly served
a different search intent. A merge moved the unique, still-true content into the winner, removed the loser from the
posts data (so it leaves the sitemap, RSS feed, blog index and llms.txt), added a one-hop permanent redirect
(`src/content/redirects.ts`, used by `next.config.ts`) and rewrote every internal link to the winner.

| Cluster | Decision | Why |
|---|---|---|
| A. Circleboom | /blog/circleboom-alternatives, /blog/circleboom-vs-growx and /blog/growx-vs-circleboom-cost merged into the new /alternatives/circleboom (same template as /alternatives/hypefury), listed on /alternatives | Three posts answered one question ("Circleboom alternative / vs GrowX"). The page keeps their sections, table, pick lists and FAQs. The "$20 a month" example and "Is GrowX cheaper? Yes" were dropped: our copy never verified Circleboom's price. |
| B. Hypefury | /blog/hypefury-alternatives merged into /alternatives/hypefury | Same intent. Its unique sections (growth, other alternatives by job, evergreen tips, move steps) moved over. |
| C. Typefully vs Tweet Hunter | Kept; cross-linked with /alternatives/typefully and /alternatives/tweet-hunter (and the two other comparison pages) | A head-to-head between two competitors is a different query from "<tool> alternative". |
| D. Growth pillar | /blog/how-to-grow-on-twitter-x merged into /blog/how-to-get-more-followers-on-twitter. /blog/first-1000-followers-on-x retitled "First 1,000 Followers on Twitter (X): New Account Guide"; /blog/twitter-growth-plan retitled "Twitter Growth Plan: 30 Days on X, Week by Week". Both link to the pillar | The two "how to grow" posts competed for the same head term. The child posts now own narrower intents (a new account's first milestone; a dated 30-day plan). |
| E. Follow limits | /blog/bulk-follow-twitter-safely merged into /blog/mass-follow-twitter-limits, retitled "Twitter (X) Follow Limit Per Day: How Many Is Safe?". /blog/follow-for-follow-twitter kept | Same intent (how many follows a day is safe). Follow for follow is a different question. |
| F. Product docs | /blog/how-growx-auto-follow-works, /blog/twitter-follow-back-score-growx and the scoring part of /blog/growx-features-guide-scoring-filters-cleanup moved into /features/twitter-auto-follow; /blog/ai-tweet-writer-growx-ai into /features/ai-tweet-writer; the rest of the features guide into /features and the feature pages; /blog/growx-potential-best-practices-roadmap into /how-it-works ("Nine habits for growing safely") | Product documentation belongs on the feature pages, which own the commercial keywords. The roadmap's old 2.4.4 tour, its future promises ("What comes next") and an unbacked claim were dropped rather than moved. |
| G. Blog and tool pairs | Kept both, linked both ways: twitter-shadowban and the shadowban checker, twitter-follower-ratio and the ratio calculator, how-to-write-a-twitter-thread and the thread maker, twitter-bio-ideas and the bio generator, tweet-ideas and tweet templates. The bio generator's title no longer says "bio ideas" ("Twitter Bio Generator: Free X Bio Maker") | Tools own "checker / calculator / generator / maker", posts own "what is / ideas / how to". The two missing post-to-tool links were added as one sentence each. |
| H. Unfollow and analytics | Kept /blog/unfollow-non-followers-twitter, /blog/unfollow-inactive-accounts-twitter, /blog/twitter-analytics-guide and /blog/twitter-analytics-tools; each already links to its feature page | The feature pages own the commercial keywords ("twitter unfollow tool", "twitter analytics chrome extension"); the posts answer how-to and tool-choice questions. |

Use-case pages (A6) were checked against the same rule: the new-account page targets growing a new account safely (the
first-1,000 post owns that milestone), and the founders page targets growing on X as a founder or creator (the
build-in-public post owns "build in public").

Outreach templates in `docs/BACKLINKS.md` and `docs/backlinks/` now point at the final URLs, so new backlinks skip the
redirect.
