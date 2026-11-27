import type { Post } from "./posts";

/**
 * Comparison guides. The three Circleboom posts (circleboom-alternatives, circleboom-vs-growx and
 * growx-vs-circleboom-cost) were merged into /alternatives/circleboom (src/content/alternatives.ts) on 27 Nov 2026, and
 * their old URLs redirect there (src/content/redirects.ts). The list stays, empty, so the import in posts.ts keeps working.
 * New comparison guides follow the rules in posts.ts and alternatives.ts: GrowX claims match docs/PRODUCT_FACTS.md, and
 * other products are described only by what our checked copy says, with no invented prices, limits or ratings.
 */
export const comparePosts: Post[] = [];
