/**
 * Old URLs that were merged into another page (keyword cannibalization fixes, 27 Nov 2026). Each one redirects
 * permanently, in one hop, to the page that now holds its content; the old page is gone from the sitemap, the RSS feed,
 * llms.txt and every internal link. Used by next.config.ts (redirects), scripts/check-redirects.ts and tests.
 *
 * Rules: a `to` is never itself a `from` (no chains), and every `to` is a live page in the sitemap.
 */
export interface MergedUrl {
  from: string;
  to: string;
  /** Why it was merged (also in SEO_CHANGES.md). */
  why: string;
}

export const MERGED_URLS: readonly MergedUrl[] = [
  { from: "/blog/circleboom-alternatives", to: "/alternatives/circleboom", why: "Three Circleboom posts competed for one intent; now one comparison page." },
  { from: "/blog/circleboom-vs-growx", to: "/alternatives/circleboom", why: "Three Circleboom posts competed for one intent; now one comparison page." },
  { from: "/blog/growx-vs-circleboom-cost", to: "/alternatives/circleboom", why: "Three Circleboom posts competed for one intent; now one comparison page." },
  { from: "/blog/hypefury-alternatives", to: "/alternatives/hypefury", why: "Same intent as the Hypefury comparison page." },
  { from: "/blog/how-to-grow-on-twitter-x", to: "/blog/how-to-get-more-followers-on-twitter", why: "Same intent as the growth pillar post." },
  { from: "/blog/bulk-follow-twitter-safely", to: "/blog/mass-follow-twitter-limits", why: "Same intent: the Twitter (X) follow limit per day." },
  { from: "/blog/how-growx-auto-follow-works", to: "/features/twitter-auto-follow", why: "Product documentation; the feature page owns the topic." },
  { from: "/blog/twitter-follow-back-score-growx", to: "/features/twitter-auto-follow", why: "Product documentation; the feature page owns the topic." },
  { from: "/blog/ai-tweet-writer-growx-ai", to: "/features/ai-tweet-writer", why: "Product documentation; the feature page owns the topic." },
  { from: "/blog/growx-features-guide-scoring-filters-cleanup", to: "/features", why: "A features guide; its details moved to the feature pages." },
  { from: "/blog/growx-potential-best-practices-roadmap", to: "/how-it-works", why: "Best practices moved to How it works; roadmap promises were dropped." },
];

/** Old blog slugs that no longer exist (for link checks). */
export const MERGED_POST_SLUGS = MERGED_URLS.filter((r) => r.from.startsWith("/blog/")).map((r) => r.from.slice("/blog/".length));
