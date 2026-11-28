# SEO and GEO overhaul (branch `seo-geo-overhaul`)

Status: **done** (27 to 28 Nov 2026), not merged. The work is on the `seo-geo-overhaul` branch; nothing went to `main`.

Goal: rank on Google and Bing for the searches that lead to Chrome Web Store installs (SEO), and be the source AI answer
engines quote and link when people ask about growing on X (GEO). The store name "GrowX: The Ultimate X (Twitter) Growth
Tool" and the extension ID `ofiancichfcakbdgekhcahflpoglfgbh` are unchanged everywhere.

Ground rules kept throughout: no indexed URL breaks (11 merged URLs redirect in one permanent hop), the visual design,
components and brand voice are unchanged, no invented testimonials, reviews, ratings, user counts, statistics, press,
awards or profiles (real data lives in typed files with TODO values, and its UI hides while empty), no em or en dashes in
new copy, one commit per task.

## Before and after

Measured on 27 and 28 Nov 2026 on two local production builds with the same settings: `main` at 6f0a93a (before)
and this branch (after).

**Content and structure**

| Measure | Before | After |
|---|---|---|
| Blog posts | 54 | 43 (11 URLs merged, each redirected) |
| URLs in the sitemap | 89 | 83 |
| Comparison pages (/alternatives) | 3 | 4 (Circleboom added) |
| Use-case pages | 0 | 3, plus the /use-cases hub |
| Blog posts opening with a 40 to 70 word answer | 37 of 54 | 43 of 43 |
| Blog posts with at least one question heading | 18 of 54 | 42 of 43 |
| Feature pages with a 40 to 70 word opening | 7 of 8 | 8 of 8 |
| Feature pages with 4 to 6 FAQs | 7 of 8 | 8 of 8 |
| Feature pages with a "by hand" table, a safety section, use-case links and an Updated date | 0 of 8 | 8 of 8 |
| Comparison pages with a 40 to 70 word opening | 1 of 3 | 4 of 4 |
| Tool pages with a 40 to 70 word opening | 0 of 8 | 8 of 8 |
| Store links with UTM tags and a click event | none | all, through one helper |
| Pages with a directory badge strip | every page (footer) | /featured only |
| robots.txt groups for AI crawlers | 0 (only `*`) | 16 |
| SEO audit errors (`scripts/seo-check.mjs`, current rules) | 3 on 89 pages (descriptions under 140 characters) | 0 on 83 pages |
| Internal links: broken, pointing at a redirect, orphan pages | not measured (new script) | 0, 0, 0 on 83 pages |
| Merged URLs answering one permanent hop to a live page | n/a | 11 of 11, from both hosts |
| AI crawlers getting the real HTML (4 pages each) | not measured (new script) | 16 of 16 |

**HTML size** (raw bytes, then gzip -9)

| Page | Before | After | Why it moved |
|---|---|---|---|
| / | 435,206 / 56,296 | 429,375 / 54,645 | Footer badge strip removed; trust strip added |
| /pricing | 302,404 / 31,510 | 306,530 / 31,418 | The plans table added |
| /features/twitter-auto-follow | 215,314 / 34,653 | 258,772 / 42,099 | Three merged posts' content, the "by hand" table and the safety section |
| /blog | 261,743 / 33,347 | 207,740 / 27,769 | 11 fewer post cards |
| /blog/twitter-algorithm-explained | 187,372 / 31,306 | 187,151 / 30,727 | In-article calls to action added; badge strip removed |

**Lighthouse, mobile** (Lighthouse 13.6, default mobile preset with simulated throttling, median of 3 runs, local build)

| Page | Performance | Accessibility | SEO | Best practices | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| / | 99 to 99 | 96 to 100 | 100 to 100 | 100 to 100 | 1.4 s to 1.4 s | 85 to 84 ms | 0 to 0 |
| /features/twitter-auto-follow | 100 to 100 | 96 to 100 | 100 to 100 | 100 to 100 | 1.2 s to 1.4 s | 89 to 58 ms | 0 to 0 |
| /blog/twitter-algorithm-explained | 100 to 100 | 96 to 100 | 100 to 100 | 100 to 100 | 1.2 s to 1.2 s | 91 to 45 ms | 0 to 0 |
| /pricing | 100 to 99 | 96 to 100 | 100 to 100 | 100 to 100 | 1.2 s to 1.2 s | 51 to 119 ms | 0 to 0 |

Accessibility rose from 96 to 100 on every page because the footer badge strip is gone: one directory's badge snippet
had 10px text with too little contrast. Performance was already high and stays within one point; TBT moves by tens of
milliseconds between runs in a shared container, so read those as unchanged. Real-user numbers will show in Search
Console's Core Web Vitals report after deploy.

## What changed, per task

### A1. Store link helper, UTM tags and the install click event
- `src/lib/cws.ts` is the only file with the store URL and extension ID. `cwsUrl({ campaign, content })` adds
  `utm_source=growxapp.org`, `utm_medium=website`, `utm_campaign=<page>` and `utm_content=<placement>`; `campaignFor(path)`
  names the page (home, pricing, feature-<slug>, blog-<slug>, tool-<slug>, alt-<slug>, use-case-<slug>).
- `CwsButton` and `CwsLink` replace every store link (heroes, in-post calls to action, dashboard, about, featured, what's
  new, footer). One delegated listener (`src/components/site-analytics.tsx`) sends `add_to_chrome_click` { campaign,
  content, path } to Vercel Web Analytics, the Google tag and Tag Manager.
- JSON-LD (`sameAs`, `installUrl`, `downloadUrl`) and llms.txt keep the clean listing URL: they identify the entity.
- `tests/cws.test.ts` fails if a store URL or the ID is written anywhere in `src/` outside the helper.

### A2. Directory badges only on /featured, nofollow
- The badge strip left the footer (every page). The footer keeps a text link "Featured on" to /featured.
- On /featured every directory link is `rel="nofollow noopener"`, every badge image is lazy and sized. Three
  directories publish only a height, so their width is a TODO in `src/data/badges.ts` rather than a guess.

### A3. Social proof from real store numbers
- `src/config/social-proof.ts`: 5.0 from 12 ratings, 242 users, copied by hand from the store listing on 27 Nov 2026.
- `TrustStrip` ("Rated 5.0 on the Chrome Web Store · 242 users", linking to the reviews tab) sits under the hero call to
  action on the home page and every feature page, and in the /pricing hero. It hides when there are no ratings.
- `src/data/testimonials.ts` is an empty typed list; the home page section renders only with real entries.
- `aggregateRating` is built from the same config but **off** (`socialProof.markUpRating: false`): see Decisions.

### A4. Keyword cannibalization merges
- Eleven URLs merged into the page that owns their intent, each with a one-hop permanent redirect. The decision and the
  reason for every cluster (A to H) are in the A4 table below; the full redirect map follows it.
- `scripts/check-redirects.ts` checks every merged URL on a running build (one 301 or 308, straight to the final URL,
  which answers 200; the same on the bare domain; none left in the sitemap). `tests/redirects.test.ts` checks the map
  (no chains, old URLs gone, every target in the sitemap); `tests/seo.test.ts` fails on any link to a removed post.

### A5. Feature landing pages
- Titles follow "<primary keyword>: <benefit> | GrowX" in 60 characters or fewer (table in Decisions). The auto follow
  title already ranks and stays; List follow uses a truthful variant (see Decisions).
- Every feature page now has: hero with the store button, trust strip, a screenshot (TODO for three, see manual tasks),
  "How it works" in three steps, **"<Feature> or doing it by hand?"** (a small HTML table, rows stack on phones), **"Is
  <feature> safe to use?"** (pace, caps and limits, each line a fact from that page), the free vs Premium limits, 4 to 6
  FAQs, related features, free tools and guides, **use-case links**, a visible **Updated** date (also `dateModified`),
  and the final call to action. Data: `src/content/feature-extras.ts`. Test: `tests/feature-pages.test.ts`.

### A6. Use-case pages
- `/use-cases` and three pages: crypto-twitter, new-x-account, creators-and-founders (1,150 to 1,250 words of body text
  each, answer-first opening, question headings, a 3 to 5 step plan, FAQs with FAQPage data, Updated date).
- In the sitemap with real dates, linked from the footer, from every feature page they rely on, and from the blog
  posts they cite. Each owns its own intent (see the A4 note).

### A7. In-article calls to action and internal links
- `ExtensionCta` after each post's intro and at its end: the post's main feature, the store button (campaign
  blog-<slug>), the feature page and one free tool. Every post therefore links to at least one feature and one tool.
- Related guides: the post's own picks, then the newest posts in the same category, three in all.
- `scripts/check-internal-links.ts` crawls every sitemap page of a running build and reports broken internal links,
  links that point at a redirect, and orphan pages. Result in Before and after.

### A8. Images and page weight
- Every `<img>` has an alt attribute (`scripts/seo-check.mjs` fails otherwise); decorative ones use `alt=""` on purpose.
- Screenshots use `next/image` with sizes; only hero screenshots are preloaded. The header logo no longer is (it was
  preloaded on every page and competed with the hero image).
- Fonts were already `next/font` (Inter and Plus Jakarta Sans, latin subset, `display: swap`), so nothing changed there.
- The 435 KB homepage: 237 KB is the inline React Server Components payload (the page's own copy and component tree),
  28.6 KB is 111 inline SVG icons, 62 KB is class names. It is 57 KB gzipped. An SVG sprite would save about 20 KB raw
  (about 3 KB gzipped); not worth the risk to the design in this change. Numbers in Before and after.

### A9. Metadata, verification, IndexNow, What's new
- Home title "GrowX: Auto Follow & Growth Chrome Extension for X (Twitter)". Every title is 60 characters or fewer,
  every description 140 to 160 (`scripts/seo-check.mjs` and `tests/seo.test.ts` enforce both), one H1 per page.
- Every indexable page has its own Open Graph image. `twitter:creator` is @0x_nation; `twitter:site` appears only once
  GrowX's own handle is filled in.
- Sitemap `lastmod` is each page's real content date (`src/content/page-dates.json` from git, posts' `dateModified`).
- Search Console and Bing verification read `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
- IndexNow: `/<key>.txt` is served from `INDEXNOW_KEY`; `scripts/indexnow.ts` submits changed sitemap URLs.
- /whats-new takes its title, H1 and description from the latest changelog entry (2.5.1), with a dated list of versions.

### B1. robots.txt and AI crawlers
- One group per AI crawler (OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot,
  Perplexity-User, Google-Extended, Applebot, Applebot-Extended, Bingbot, DuckAssistBot, Amazonbot, meta-externalagent,
  MistralAI-User) with `Allow: /` and the same private disallows. The retired anthropic-ai and Claude-Web are not listed.
- No bot protection or user-agent blocking exists in the code; Vercel's firewall is a manual check.
- `scripts/check-ai-bots.ts` fetches four pages as each crawler and checks status 200, the H1 and main content in raw
  HTML, no challenge, and its robots group.

### B2. One entity
- `site.definition`: "GrowX is a Chrome extension for X (Twitter) that grows your account with safe auto follow, a post
  scheduler, on-device AI writing and replies, analytics, and an unfollower tracker. It is free to start." Used on the
  home page, footer, /about, /press, llms.txt and the Organization, WebSite and SoftwareApplication descriptions.
- Organization `alternateName` and `sameAs` (store listing plus only filled profiles); SoftwareApplication name "GrowX"
  with the store name as `alternateName`; Person sameAs for Shahriar Ahmed.
- The disambiguation line is on /about, /press and llms.txt.

### B3. Fact sheet
- /press is "GrowX at a glance": one HTML table of facts from the site's config and copy, a visible "Last updated" that
  is also the page's `dateModified`. A launch date row stays hidden until `site.launchDate` is filled.

### B4. Answer-first openings, question headings, tables
- Every feature, tool, comparison, use-case and blog page opens with a 40 to 70 word direct answer
  (`tests/answer-first.test.ts`, `tests/feature-pages.test.ts`). Blog posts were not rewritten: eight had sentences
  moved or split, two got one opening sentence from facts already in the post.
- 42 of 43 posts have at least one question heading (24 headings converted, ids unchanged).
- Tables are real HTML: feature "by hand" tables, comparison tables, the pricing table, the fact sheet, and a new post
  table block (used for the follow-limit post's pace presets).

### B5. Comparison pages
- Every /alternatives page has the same eight-row table (free plan, starting price, platform, auto follow, scheduler,
  AI writing, analytics, unfollower tracking). A detail our copy never confirmed reads "Check" with a TODO naming the
  page to verify it on. Each links the competitor's pricing page (nofollow) and has "When to choose <tool> instead".
- GrowX prices come from `src/config/pricing.ts`. The page says when GrowX's prices were checked; "Prices checked on
  <date>" for the competitor appears only once someone fills `theirPricesChecked` after reading their pricing page.
- Both best-of posts open with "We make GrowX. This list includes it, and we explain the trade-offs."

### B6. Pricing table and offers
- /pricing "Every plan at a glance" is one HTML table, and the JSON-LD `offers` and llms.txt read the same config
  (`PLAN_SUMMARY`, `planSummary`, `PLAN_LENGTH`), so they cannot drift (`tests/pricing-table.test.ts`).

### B7. Freshness
- A visible "Updated <date>" that matches `dateModified` on every post, feature page, use-case page and the fact sheet
  ("Last updated"). /whats-new lists every version with its date. Dates moved only where content materially changed.

### B8. llms.txt
- A short markdown summary (definition, disambiguation, features, Free vs Premium, safety, key pages, top 10 guides),
  sent with `X-Robots-Tag: noindex`.

### B9. AI visibility
- Visits referred by ChatGPT, Perplexity, Gemini, Copilot or Claude (or `utm_source=chatgpt.com`) send
  `ai_search_visit` { channel: "AI search", ai_source, path }. AI crawler visits are logged as `{ event: "ai_crawler" }`.
- `docs/ai-visibility-prompts.md`: 20 prompts to run monthly, with a results table.

### B10. Spam guard and content plan
- `docs/content-plan.md`: rules (one intent per page, facts only, no bulk near-duplicate pages), 25 long-tail topics,
  intents already owned, and thin or overlapping posts with a recommendation each. Nothing applied.

## Decisions where the brief meets an existing rule or a policy

- **aggregateRating (A3).** Google's review snippet guidelines say not to mark up ratings collected on other websites.
  The 5.0 rating is collected on the Chrome Web Store, so the markup ships switched off (`socialProof.markUpRating`).
- **Badges (A2).** `src/data/badges.ts` notes that some directories ask for a dofollow badge, ideally in the footer.
  The brief removes and nofollows them; done as asked, with the risk in the manual tasks.
- **Current version.** The brief says 2.5.0; the changelog's latest is 2.5.1, so titles say 2.5.1 and follow releases.
- **Feature titles (A5).** Rendered titles, all 60 characters or fewer:

  | Page | Title |
  |---|---|
  | twitter-auto-follow | Twitter Auto Follow Tool: Smart X Auto Follow Extension (kept: it already ranks, and the pattern would drop "tool" and "X auto follow"; not clearly better) |
  | twitter-unfollower-tracker | Who Unfollowed Me on Twitter (X): Free Daily Tracker \| GrowX |
  | twitter-unfollow-tool | Twitter Unfollow Tool: Unfollow Non-Followers Safely \| GrowX (already matched) |
  | twitter-post-scheduler | Free Tweet Scheduler Extension: Posts & Threads on X \| GrowX |
  | twitter-analytics | Twitter Analytics Chrome Extension: Free Post Stats \| GrowX |
  | ai-tweet-writer | AI Tweet Writer, On-Device: Private, No API Key \| GrowX |
  | twitter-reply-targets | AI Reply Assistant for X: Reply Early, Approve All \| GrowX |
  | twitter-list-follow | Follow a List of Twitter Accounts: Paste or Upload \| GrowX |

- **List follow keyword.** The brief's keyword is "Follow Twitter List Members". List follow cannot read X Lists: the
  extension's `shared/lists.js` skips List links, and an X List's members can only be added as an auto follow source
  (Premium). A title promising it would describe a feature the page does not have, so the title says what List follow
  does, and a new FAQ ("Can I follow all members of an X (Twitter) List?") explains the auto follow route.
- **Unfollower tracker vs the blog post.** The brief gives the tracker "Who Unfollowed Me on Twitter (X)", which
  /blog/who-unfollowed-me-on-twitter also targets. Done as asked; watch both in Search Console (manual tasks).
- **Analytics FAQs.** It had 7 (the brief asks for 4 to 6); two about data access and storage became one, no answer
  text dropped.
- **Competitor prices (B5).** Nobody has checked competitor pricing pages yet (they were not reachable from the build
  machine), so no competitor price is shown and the page never says their prices were checked.
- **Clean store URL in structured data.** Every clickable store link has UTM tags; JSON-LD and llms.txt keep the clean
  listing URL.

## A4 decisions: keyword cannibalization

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

## Full redirect map

All rules live in `next.config.ts` `redirects()`, `permanent: true` (HTTP 308). Merged URLs go to the absolute canonical
URL, so a request on either host reaches the final page in one hop. No target redirects again.

| From | To | Why |
|---|---|---|
| /blog/circleboom-alternatives | https://www.growxapp.org/alternatives/circleboom | A4 cluster A |
| /blog/circleboom-vs-growx | https://www.growxapp.org/alternatives/circleboom | A4 cluster A |
| /blog/growx-vs-circleboom-cost | https://www.growxapp.org/alternatives/circleboom | A4 cluster A |
| /blog/hypefury-alternatives | https://www.growxapp.org/alternatives/hypefury | A4 cluster B |
| /blog/how-to-grow-on-twitter-x | https://www.growxapp.org/blog/how-to-get-more-followers-on-twitter | A4 cluster D |
| /blog/bulk-follow-twitter-safely | https://www.growxapp.org/blog/mass-follow-twitter-limits | A4 cluster E |
| /blog/how-growx-auto-follow-works | https://www.growxapp.org/features/twitter-auto-follow | A4 cluster F |
| /blog/twitter-follow-back-score-growx | https://www.growxapp.org/features/twitter-auto-follow | A4 cluster F |
| /blog/ai-tweet-writer-growx-ai | https://www.growxapp.org/features/ai-tweet-writer | A4 cluster F |
| /blog/growx-features-guide-scoring-filters-cleanup | https://www.growxapp.org/features | A4 cluster F |
| /blog/growx-potential-best-practices-roadmap | https://www.growxapp.org/how-it-works | A4 cluster F |
| /blog/:slug/opengraph-image | /blog/:slug/opengraph-image/card | Existing: old social card URLs |
| any path on growxapp.org | https://www.growxapp.org/:path* | Existing: bare domain to the canonical host |

Rewrite (not a redirect): `/<key>.txt` (8 to 128 letters, digits or dashes) serves the IndexNow key from `INDEXNOW_KEY`.

## Checks and how to run them

| Check | Command | Result on the final build |
|---|---|---|
| Lint | `npm run lint` | Pass, no problems |
| Typecheck | `npm run typecheck` | Pass |
| Unit tests | `npm test` | 753 passed in 50 files |
| Production build | `npm run build` | Pass (also green in GitHub CI on the pushed branch) |
| Browser flows | `npm run test:e2e` | 1652 passed, 0 failed (desktop and phone crawl of 48 public pages, SEO audit of rendered HTML, merged URL redirects, sign-in, billing and dashboard flows against a mock backend) |
| SEO audit of built HTML | `node scripts/seo-check.mjs` | 83 indexable pages, 0 errors, 0 warnings |
| Redirects | `node scripts/check-redirects.ts` (with `npm run start`) | 11 of 11: one 308 to a live page, from www and the bare domain |
| AI crawlers | `node scripts/check-ai-bots.ts` | 16 crawlers by 4 pages: 200, H1 and content in raw HTML, own robots group |
| Internal links | `node scripts/check-internal-links.ts` | 83 pages: 0 broken, 0 to a redirect, 0 orphans |

## Files touched

124 files: 47 added, 76 changed, 1 deleted (`git diff --stat 6f0a93a..seo-geo-overhaul`). Unmarked files were changed.

**Config and routing** (6): `next.config.ts`, `src/config/pricing.ts`, `src/config/site.ts`, `src/config/social-proof.ts` (added), `src/proxy.ts`, `tsconfig.json`.

**Content data** (22): `src/content/alternatives.ts`, `src/content/faq.ts`, `src/content/feature-extras.ts` (added), `src/content/feature-pages.ts`, `src/content/page-dates.json`, `src/content/post-features.ts`, `src/content/posts-brand.ts`, `src/content/posts-compare.ts`, `src/content/posts-create.ts`, `src/content/posts-growth.ts`, `src/content/posts-insights.ts`, `src/content/posts-marketing.ts`, `src/content/posts-profile.ts`, `src/content/posts-round4.ts`, `src/content/posts-round5.ts`, `src/content/posts-strategy.ts`, `src/content/posts.ts`, `src/content/redirects.ts` (added), `src/content/releases.ts`, `src/content/use-cases.ts` (added), `src/data/badges.ts`, `src/data/testimonials.ts` (added).

**Pages and routes** (48): `src/app/about/opengraph-image.tsx` (added), `src/app/about/page.tsx`, `src/app/alternatives/[slug]/page.tsx`, `src/app/alternatives/opengraph-image.tsx`, `src/app/alternatives/page.tsx`, `src/app/api/indexnow-key/[key]/route.ts` (added), `src/app/blog/[slug]/page.tsx`, `src/app/blog/page.tsx`, `src/app/contact/opengraph-image.tsx` (added), `src/app/contact/page.tsx`, `src/app/dashboard/page.tsx`, `src/app/faq/opengraph-image.tsx` (added), `src/app/faq/page.tsx`, `src/app/featured/opengraph-image.tsx` (added), `src/app/featured/page.tsx`, `src/app/features/[slug]/page.tsx`, `src/app/features/page.tsx`, `src/app/how-it-works/opengraph-image.tsx` (added), `src/app/how-it-works/page.tsx`, `src/app/layout.tsx`, `src/app/llms.txt/route.ts`, `src/app/page.tsx`, `src/app/press/opengraph-image.tsx` (added), `src/app/press/page.tsx`, `src/app/pricing/page.tsx`, `src/app/privacy/opengraph-image.tsx` (added), `src/app/privacy/page.tsx`, `src/app/refund-policy/opengraph-image.tsx` (added), `src/app/refund-policy/page.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/terms/opengraph-image.tsx` (added), `src/app/terms/page.tsx`, `src/app/tools/page.tsx`, `src/app/tools/tweet-character-counter/page.tsx`, `src/app/tools/tweet-templates/page.tsx`, `src/app/tools/twitter-bio-generator/page.tsx`, `src/app/tools/twitter-bold-text-generator/page.tsx`, `src/app/tools/twitter-engagement-rate-calculator/page.tsx`, `src/app/tools/twitter-follower-ratio-calculator/page.tsx`, `src/app/tools/twitter-shadowban-checker/page.tsx`, `src/app/tools/twitter-thread-maker/page.tsx`, `src/app/use-cases/[slug]/opengraph-image.tsx` (added), `src/app/use-cases/[slug]/page.tsx` (added), `src/app/use-cases/opengraph-image.tsx` (added), `src/app/use-cases/page.tsx` (added), `src/app/whats-new/opengraph-image.tsx` (added), `src/app/whats-new/page.tsx`.

**Components and libraries** (20): `src/components/alternatives/comparison-table.tsx`, `src/components/blog.tsx`, `src/components/blog/extension-cta.tsx` (added), `src/components/blog/post-cover.tsx`, `src/components/cws-link.tsx` (added), `src/components/featured-on.tsx`, `src/components/footer-store-link.tsx` (added), `src/components/home/cta-band.tsx`, `src/components/json-ld.tsx`, `src/components/logo.tsx`, `src/components/plans-table.tsx` (added), `src/components/site-analytics.tsx` (added), `src/components/site-footer.tsx`, `src/components/testimonials.tsx` (added), `src/components/tools/tool-page.tsx`, `src/components/trust-strip.tsx` (added), `src/components/use-case-links.tsx` (added), `src/lib/ai-crawlers.ts` (added), `src/lib/cws.ts` (added), `src/lib/seo.ts`.

**Scripts** (6): `scripts/check-ai-bots.ts` (added), `scripts/check-internal-links.ts` (added), `scripts/check-redirects.ts` (added), `scripts/indexnow.mjs` (deleted), `scripts/indexnow.ts` (added), `scripts/seo-check.mjs`.

**Tests** (13): `tests/ai-crawlers.test.ts` (added), `tests/answer-first.test.ts` (added), `tests/cws.test.ts` (added), `tests/e2e/flows.mjs`, `tests/entity.test.ts` (added), `tests/feature-pages.test.ts` (added), `tests/featured-on.test.ts`, `tests/llms.test.ts` (added), `tests/pricing-table.test.ts` (added), `tests/redirects.test.ts` (added), `tests/seo.test.ts`, `tests/site-analytics.test.ts` (added), `tests/social-proof.test.ts` (added).

**Docs** (9): `SEO_CHANGES.md` (added), `docs/BACKLINKS.md`, `docs/SEO.md`, `docs/ai-visibility-prompts.md` (added), `docs/backlinks/answer-bank.md`, `docs/backlinks/guest-posts.md`, `docs/backlinks/round-4.md`, `docs/backlinks/round-5.md`, `docs/content-plan.md` (added).

## Manual tasks for Shahriar

Do these after the branch is merged and deployed. Each one needs your accounts or your judgment, so none was done here.

1. **Google Search Console.** Add the `www.growxapp.org` property (put the token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   in Vercel, Production, then redeploy, or verify by DNS). Submit `https://www.growxapp.org/sitemap.xml`. Use URL
   Inspection on two merged URLs (for example /blog/circleboom-vs-growx) to see the 308 to the new page, and request
   indexing for /use-cases, /alternatives/circleboom and the eight feature pages.
2. **Bing Webmaster Tools.** Import the site from Search Console (or set `NEXT_PUBLIC_BING_SITE_VERIFICATION`), then
   submit the same sitemap. Copilot answers draw on Bing's index.
3. **IndexNow.** Make a key of 8 to 128 letters, digits or dashes, set `INDEXNOW_KEY` in Vercel (Production) and
   redeploy. Check that `https://www.growxapp.org/<key>.txt` shows the key. Then run `node scripts/indexnow.ts --all`
   once, and `node scripts/indexnow.ts` after later deploys (it sends pages changed in the last 3 days).
4. **Vercel Firewall and bot protection.** In the Vercel dashboard (Firewall), make sure no rule, "Bot Protection" or
   "AI bots" managed ruleset blocks the crawlers listed in robots.txt (OAI-SearchBot, ChatGPT-User, GPTBot,
   Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Perplexity-User, Applebot, Bingbot and the rest). The code
   blocks none of them. In Vercel's logs, search for `"event":"ai_crawler"` to see them arrive.
5. **Analytics.** `add_to_chrome_click` and `ai_search_visit` go to Vercel Web Analytics as custom events (these need a
   Vercel plan with custom events) and to GA4 through the Google tag. In GA4, add a custom channel group "AI search"
   (Admin, Data display, Channel groups) for sources matching chatgpt.com, chat.openai.com, perplexity.ai,
   gemini.google.com, copilot.microsoft.com and claude.ai, and mark `add_to_chrome_click` as a key event.
6. **Social profiles.** Fill GrowX's own profiles in `src/config/site.ts` (`profiles`: X, Product Hunt, YouTube,
   Crunchbase, F6S) and `launchDate`, only with real values. They feed the Organization `sameAs`, `twitter:site` and the
   fact sheet. Empty values stay out of the page.
7. **Testimonials.** `src/data/testimonials.ts` is empty, so the section is hidden. Add only real quotes you have
   permission to use (name, handle, text, source, link, date).
8. **Fact sheet.** Check every row on /press. The launch date row appears once `site.launchDate` is filled.
9. **Social proof numbers.** Update `src/config/social-proof.ts` (rating, rating count, users, `updatedAt`) from the
   Chrome Web Store listing once a month. They show in the trust strip on the home page, /pricing and feature pages.
10. **Rating markup.** Read Google's review snippet guidelines, then decide on `socialProof.markUpRating`. It is off
    because the ratings are collected on the Chrome Web Store, not on growxapp.org.
11. **Directory badges.** Badges are now only on /featured, with nofollow. Some directories ask for a dofollow badge in
    the footer; check that each listing is still live over the next weeks. Fill the missing badge widths for Days
    Launch, Direct2App and Submit My SaaS in `src/data/badges.ts`.
12. **Competitor prices.** On each /alternatives page, open the competitor's pricing page, fill the Free plan and
    Starting price cells marked "Check" (and any other "Check" you can confirm) in `src/content/alternatives.ts`, then
    set `theirPricesChecked` to that day. Confirm Circleboom's pricing page path (now its homepage).
13. **Screenshots.** Capture the Cleanup, AI Reply Assistant and List follow pages with demo data and use them on those
    three feature pages (TODO comments in `src/content/feature-pages.ts`). The store images are dark marketing
    composites with their own headlines, so they do not fit the site's screenshot style as they are.
14. **List follow keyword.** If you want the List follow page to target "follow Twitter List members", List follow
    first needs to accept X List links (a product change in the extension). The page explains the auto follow route
    for now.
15. **Search Console watch list.** After four to six weeks, check for two pages ranking for the same queries:
    /features/twitter-unfollower-tracker and /blog/who-unfollowed-me-on-twitter; /blog/first-1000-followers-on-x and
    /blog/twitter-growth-plan. Merge with a redirect if they compete. `docs/content-plan.md` lists more candidates.
16. **AI visibility, monthly.** Run the 20 prompts in `docs/ai-visibility-prompts.md` in ChatGPT, Perplexity, Gemini,
    Claude, Copilot and Google AI Mode, and log whether GrowX is mentioned and cited.
17. **Backlinks already placed.** Links to the eleven old URLs still work through the redirects. Where you can edit a
    placed link, point it at the new URL (the redirect map above).
