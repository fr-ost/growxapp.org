import type { FeatureSlug } from "./feature-slugs";
import type { Post } from "./posts";

/** Words that tie a post to a feature page, checked against the post's title and keywords. */
const SIGNALS: [FeatureSlug, RegExp][] = [
  ["twitter-post-scheduler", /schedul|queue|best time|how often|evergreen|hypefury|typefully/i],
  ["twitter-analytics", /analytic|engagement rate|impression|views|algorithm|metric|hashtag/i],
  ["twitter-unfollower-tracker", /who unfollowed|unfollower|follower ratio|lost followers/i],
  ["twitter-unfollow-tool", /unfollow (non|inactive|tool)|inactive accounts|mass unfollow|non-followers|cleanup|circleboom/i],
  ["ai-tweet-writer", /\bai\b|hook|tweet ideas|write|thread|bio|copy/i],
  ["twitter-reply-targets", /repl(y|ies)|engagement group|lists guide|twitter lists/i],
  ["twitter-list-follow", /follow list|bulk follow|mass follow/i],
  ["twitter-auto-follow", /auto follow|follow back|follow-back|followers|grow|niche|f4f|follow for follow/i],
];

/**
 * One or two feature pages a post should link to: those its own text already links to first, then the best keyword
 * matches on its title and keywords, falling back to smart auto follow (the core of GrowX).
 */
export function featuresForPost(post: Post, max = 2): FeatureSlug[] {
  const out: FeatureSlug[] = [];
  const add = (s: FeatureSlug) => {
    if (!out.includes(s) && out.length < max) out.push(s);
  };
  for (const m of JSON.stringify(post.sections).matchAll(/\]\(\/features\/([a-z-]+)\)/g)) add(m[1] as FeatureSlug);
  const text = `${post.title} ${post.keywords.join(" ")}`;
  for (const [slug, re] of SIGNALS) if (re.test(text)) add(slug);
  add("twitter-auto-follow");
  return out;
}

/** Words that tie a post to one of the free tools (checked against its title and keywords). */
const TOOL_SIGNALS: [string, RegExp][] = [
  ["/tools/twitter-shadowban-checker", /shadowban/i],
  ["/tools/twitter-follower-ratio-calculator", /follower ratio|follow ratio|following ratio/i],
  ["/tools/twitter-thread-maker", /thread/i],
  ["/tools/twitter-bio-generator", /\bbio\b|profile/i],
  ["/tools/tweet-templates", /tweet ideas|template|hook|pinned/i],
  ["/tools/twitter-engagement-rate-calculator", /engagement|analytic|likes|views|reposts|retweet/i],
  ["/tools/twitter-bold-text-generator", /bold|font|format/i],
  ["/tools/tweet-character-counter", /character|length|schedul|post|tweet/i],
];

/**
 * The free tool a post should point to: one its own text already links to, else the best keyword match on its title
 * and keywords, else the first tool of its main feature page (`fallback`), else the character counter.
 */
export function toolForPost(post: Post, fallback?: string): string {
  const linked = JSON.stringify(post.sections).match(/\]\((\/tools\/[a-z-]+)\)/);
  if (linked) return linked[1];
  const text = `${post.title} ${post.keywords.join(" ")}`;
  return TOOL_SIGNALS.find(([, re]) => re.test(text))?.[0] ?? fallback ?? "/tools/tweet-character-counter";
}
