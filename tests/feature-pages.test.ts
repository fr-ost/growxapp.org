import { describe, expect, it } from "vitest";
import { featurePages } from "@/content/feature-pages";
import { MANUAL_COMPARISONS, SAFETY } from "@/content/feature-extras";
import { useCases } from "@/content/use-cases";
import { lastModifiedFor } from "@/app/sitemap";
import { fullTitle } from "@/lib/seo";

const words = (s: string) => s.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;

/** A5 primary keywords: the title starts with them. twitter-auto-follow keeps its ranking title on purpose (SEO_CHANGES.md). */
const PRIMARY: Record<string, string> = {
  "twitter-unfollower-tracker": "Who Unfollowed Me on Twitter (X)",
  "twitter-unfollow-tool": "Twitter Unfollow Tool: Unfollow Non-Followers",
  "twitter-post-scheduler": "Free Tweet Scheduler Extension",
  "twitter-analytics": "Twitter Analytics Chrome Extension",
  "ai-tweet-writer": "AI Tweet Writer, On-Device",
  "twitter-reply-targets": "AI Reply Assistant for X",
  // List follow cannot read X Lists, so the title uses the truthful "a list of Twitter accounts" (SEO_CHANGES.md).
  "twitter-list-follow": "Follow a List of Twitter Accounts",
};

describe("feature landing pages (A5)", () => {
  it.each(featurePages.map((f) => [f.slug, f] as const))("%s has every required block", (slug, f) => {
    const title = fullTitle(f.seoTitle);
    expect(title.length).toBeLessThanOrEqual(60);
    if (PRIMARY[slug]) {
      expect(f.seoTitle.startsWith(PRIMARY[slug]), f.seoTitle).toBe(true);
      expect(title.endsWith(" | GrowX"), title).toBe(true);
    }
    // answer-first opening (B4)
    expect(words(f.lead)).toBeGreaterThanOrEqual(40);
    expect(words(f.lead)).toBeLessThanOrEqual(70);
    expect(f.steps).toHaveLength(3);
    expect(f.faq.length).toBeGreaterThanOrEqual(4);
    expect(f.faq.length).toBeLessThanOrEqual(6);
    expect(f.image.src).toMatch(/^\/screens\//);
    expect(MANUAL_COMPARISONS[f.slug].length).toBeGreaterThanOrEqual(3);
    expect(SAFETY[f.slug].points.length).toBeGreaterThanOrEqual(3);
    expect(SAFETY[f.slug].question).toMatch(/^Is .+ safe to use\?$/);
    expect(useCases.some((u) => u.features.includes(f.slug)), "linked from at least one use case").toBe(true);
    expect(lastModifiedFor(`/features/${f.slug}`), "a real Updated date").toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("safety and comparison copy has no dashes and no promises of zero risk", () => {
    const text = JSON.stringify([MANUAL_COMPARISONS, SAFETY]);
    expect(text).not.toMatch(/[\u2013\u2014]/);
    expect(text).not.toMatch(/\b(guarantee|100% safe|risk-free|undetectable)\b/i);
  });
});
