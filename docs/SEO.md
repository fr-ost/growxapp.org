# SEO guide

What is implemented in code, the keyword strategy, and the steps only the site owner can do (search-console setup, listing alignment, link building). Nothing here guarantees a ranking: rankings depend on competition, content quality, backlinks and time.

## Target keywords (by page)
Positioning since extension v2.4.4: **GrowX: The Ultimate X (Twitter) Growth Tool** (not only auto follow). Product facts for all copy: `docs/PRODUCT_FACTS.md`.

| Page | Primary | Secondary |
|---|---|---|
| `/` | X (Twitter) growth tool | how to grow on Twitter, Twitter auto follow, Twitter scheduler, AI tweet writer, Twitter analytics |
| `/features` | GrowX features | X growth tool features, Free vs Premium |
| `/features/twitter-auto-follow` | Twitter auto follow | X auto follow tool, auto follow Chrome extension, follow-back score |
| `/features/twitter-post-scheduler` | Twitter scheduler | schedule tweets, schedule posts on X free, thread scheduler |
| `/features/ai-tweet-writer` | AI tweet writer | AI tweet generator, AI for Twitter posts |
| `/features/twitter-analytics` | Twitter analytics | X analytics tool, best time to post on Twitter |
| `/features/twitter-unfollower-tracker` | Twitter unfollower tracker | who unfollowed me on Twitter, see who unfollowed you on X |
| `/features/twitter-unfollow-tool` | Twitter unfollow tool | mass unfollow Twitter, unfollow non-followers, unfollow inactive accounts |
| `/features/twitter-reply-targets` | Twitter engagement tool | reply to big accounts early, reply guy tool |
| `/tools/tweet-character-counter` | tweet character counter | Twitter character counter, X character count, 280 characters |
| `/tools/twitter-thread-maker` | Twitter thread maker | thread maker, split text into tweets |
| `/tools/twitter-engagement-rate-calculator` | Twitter engagement rate calculator | X engagement rate, tweet engagement rate |
| `/tools/twitter-follower-ratio-calculator` | Twitter follower ratio calculator | following to followers ratio, Twitter follow limit 5000 |
| `/tools/twitter-bold-text-generator` | Twitter bold text generator | bold text for Twitter, italic text Twitter, Twitter font generator |
| `/tools/tweet-templates` | tweet templates | Twitter templates, thread templates, tweet hooks |
| `/tools/twitter-bio-generator` | Twitter bio generator | X bio generator, Twitter bio ideas |
| `/features/twitter-list-follow` | follow a list of Twitter accounts | bulk follow Twitter list, follow accounts from CSV, import usernames to follow |
| `/whats-new` | GrowX update / changelog | GrowX release notes, GrowX 2.4.7, GrowX languages (21 native language names, `lang` tagged; SoftwareApplication `inLanguage`) |
| `/tools/twitter-shadowban-checker` | Twitter shadowban checker | shadowban test, X shadowban checker, free shadowban checker, Twitter search ban test, ghost ban (WebApplication + HowTo + FAQPage) |
| `/press` | GrowX press kit | GrowX logo, GrowX screenshots |
| `/how-it-works` | how to grow on Twitter with GrowX | Twitter growth routine, X follow limits per day |
| `/pricing` | GrowX pricing | free Twitter growth tool, free Twitter scheduler |
| `/blog` | Twitter growth blog | X growth guides, Twitter tips |
| FAQ (/faq) | GrowX FAQ, GrowX help, is GrowX safe, GrowX free trial, GrowX pricing questions | 40 questions in 8 topics with FAQPage data |
| Blog posts (54) | see each post's `keywords` in `src/content/posts*.ts` | how to schedule tweets, best time to post on Twitter, who unfollowed me on Twitter, Twitter analytics guide, Twitter reply strategy, how to increase Twitter engagement, how to write a Twitter thread, AI tweet generator, Twitter algorithm, how to go viral on Twitter, how often to post on Twitter, tweet ideas, Twitter hashtags, Twitter bio ideas, Twitter shadowban, follow for follow, Twitter follower ratio, Twitter Lists, Twitter marketing strategy, more likes, views and reposts, X Communities, content calendar, repurposing content, pinned tweet ideas, personal branding, build in public, Circleboom alternatives, GrowX vs Circleboom cost, Circleboom vs GrowX, Hypefury alternatives, Typefully vs Tweet Hunter, how to get verified, engagement groups, find your niche, follow lists, grow in your language, more followers, tweet hooks, unfollow inactive accounts, Chrome extensions for X, 30-day growth plan, analytics tools, plus the growth guides |

Both "X" and "Twitter" are used on purpose: many users still search "Twitter". Keywords are used naturally in titles, H1/H2s, first paragraphs and internal link text; no keyword stuffing, no hidden text.

## Implemented
- **Metadata** (`src/lib/seo.ts`): unique titles of at most 60 characters, primary keyword first; " | GrowX" is added only when the title doesn't already name GrowX and still fits (`fullTitle`). Descriptions 120-155 characters with a benefit and a call to action. Absolute `www` canonicals without a trailing slash, the RSS feed as an alternate link on every page, Open Graph and `summary_large_image` cards. Private pages (`/login`, `/signup`, `/forgot-password`, `/reset-password`, `/dashboard`, `/account`) are `noindex`; the 404 page is "Page not found | GrowX", `noindex`, with links to Home, Features, Pricing, Free tools and Blog.
- **Structured data** (`src/components/json-ld.tsx`): one `@graph` per page with `Organization` (logo 512 px, `sameAs` Chrome Web Store and founder site, support `contactPoint`), the founder `Person` and `WebSite`, then the page's nodes. The `SoftwareApplication` (`/#software`) is defined once, on `/`, with the real plans as `offers` (from `src/config/pricing.ts`) and `softwareVersion` from `CURRENT_VERSION` in `src/content/releases.ts`; every other page refers to it with a `WebPage` that is `about` it. `BreadcrumbList` on every inner page, `FAQPage` only where the same Q&A is visible, `BlogPosting` on posts, `WebApplication` on tools, `AboutPage` on /about. Never `aggregateRating` or `review`.
- **Social images**: one card style (`src/lib/og.tsx`) for the home page, /features and each feature page, /tools and each tool, /pricing, /blog and each post, /alternatives and each comparison, each with its own alt text.
- **Pages**: `/features` plus 8 feature pages (X-keyword heading, Free vs Premium limits table, steps, FAQ, related tools, 3+ guides, /pricing), 8 free tools, `/alternatives` with Tweet Hunter, Hypefury and Typefully comparisons (`src/content/alternatives.ts`), the blog (54 posts, each ending with "Related guides" and 1-2 feature pages), press kit, how it works, about, FAQ, contact and `/llms.txt`.
- **Technical**: `sitemap.xml` with each page's real last-changed date (`src/content/page-dates.json`, posts use `dateModified`), `robots.txt` (private areas blocked, Sitemap line), RSS, web manifest, `favicon.ico`, apple-touch and 192/512/maskable icons (`scripts/make-icons.mjs`), one theme colour (`site.themeColor`), AVIF/WebP images with a one-year cache, immutable caching for `/screens` and `/badges`, gtag.js loaded when idle, an IndexNow key file in `public/`.
- **Checks**: `node scripts/seo-check.mjs` after `npm run build` fails on a missing, duplicate or over-length title or description, not exactly one H1, a skipped heading level, a wrong canonical, invalid JSON-LD (including FAQ text that isn't on the page), missing social tags or RSS link, and build-time sitemap dates. `tests/seo.test.ts` covers metadata rules, sitemap, robots, feed, offers, internal links and the comparison pages; `npm run test:e2e` audits every public page in a browser.

## Keep these up to date
- After changing a page's content: `node scripts/page-dates.mjs`, then commit `src/content/page-dates.json` (`--check` tells you if it is stale). It needs the full git history (`git fetch --unshallow` in a shallow clone).
- After a new extension version: update `docs/PRODUCT_FACTS.md`, then `CURRENT_VERSION` and the notes in `src/content/releases.ts`.
- After replacing a screenshot or badge: give it a new file name (they are cached as immutable for a year).
- After changing the logo: `node scripts/make-icons.mjs`.

## Do this yourself (cannot be done from code)
1. **Google Search Console**: add `https://www.growxapp.org` (URL-prefix, or a Domain property via DNS). For the HTML-tag method set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel, redeploy, then Verify. Submit `https://www.growxapp.org/sitemap.xml`.
2. **Bing Webmaster Tools**: import from Search Console, or set `NEXT_PUBLIC_BING_SITE_VERIFICATION` (the `msvalidate.01` value) and submit the sitemap.
3. **IndexNow** (Bing, Yandex and others; Bing feeds ChatGPT search): set `INDEXNOW_KEY` in Vercel (Production) so `https://www.growxapp.org/<key>.txt` serves it, then after each deploy run `INDEXNOW_KEY=<key> node scripts/indexnow.ts` (sitemap URLs changed in the last 3 days), `--since YYYY-MM-DD`, `--all`, or a list of paths. `--dry-run` prints the URLs only.
4. **Request indexing** for new pages in Search Console's URL Inspection.
5. **One canonical host**: in Vercel > Domains keep `www.growxapp.org` primary and redirect `growxapp.org` to it.
6. **Republished posts** (Medium, Dev.to): set Dev.to's `canonical_url` and Medium's canonical link to the growxapp.org post URL.
7. **Check the live result** after deploy: Rich Results Test on `/`, a feature page, a post and a comparison page; PageSpeed Insights; `curl -I https://www.growxapp.org/sitemap.xml`.
8. **Link building / distribution** (the biggest ranking lever, outside the codebase): see `docs/BACKLINKS.md`.

## Content roadmap (suggested, not yet written)
Ideas that match real search intent and the product's actual capabilities: "X follow limits explained (per hour / per day)", "How to clean up your X following list safely", "Choosing source profiles that follow back", "X (Twitter) warm-up schedule for new accounts", "Free vs Premium: what you get". To add a post, append an entry to `src/content/posts.ts`; it appears in the blog, sitemap, RSS feed and gets its own social image automatically.

## Guardrails (keep these)
- No fake reviews, ratings, user counts, testimonials or "guaranteed results" in text or structured data (tests enforce the structured-data part).
- Label planned features as planned; keep claims consistent with the extension's actual behaviour.
- `offers` must always match `src/config/pricing.ts` (they are built from it); the early-bird price stays in the Lifetime offer's description, never as a separate price.
