/** URL slugs of the feature landing pages (/features/<slug>). Content lives in feature-pages.ts. */
export const FEATURE_SLUGS = [
  "twitter-auto-follow",
  "twitter-post-scheduler",
  "ai-tweet-writer",
  "twitter-analytics",
  "twitter-unfollower-tracker",
  "twitter-unfollow-tool",
  "twitter-reply-targets",
  "twitter-list-follow",
] as const;
export type FeatureSlug = (typeof FEATURE_SLUGS)[number];
/** The seven main pillars (menus, footer, home bento). Other landing pages, such as List follow, are linked where they fit. */
export type PillarSlug = Exclude<FeatureSlug, "twitter-list-follow">;
