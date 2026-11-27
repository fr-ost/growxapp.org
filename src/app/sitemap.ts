import type { MetadataRoute } from "next";
import { alternativePages } from "@/content/alternatives";
import { useCases } from "@/content/use-cases";
import { FEATURE_SLUGS } from "@/content/feature-slugs";
import { posts } from "@/content/posts";
import { site } from "@/config/site";
import pageDates from "@/content/page-dates.json";

/**
 * <lastmod> is the date a page's own content last changed (src/content/page-dates.json, written by
 * scripts/page-dates.mjs from git history), never the build time. Posts use their dateModified; the blog index uses
 * its newest post.
 */
const DATES: Record<string, string> = pageDates;
const newestPost = posts.map((p) => p.dateModified).sort().at(-1)!;
const newestUseCase = useCases.map((u) => u.dateModified).sort().at(-1);
export const lastModifiedFor = (path: string): string | undefined =>
  path === "/blog" ? newestPost : path === "/use-cases" ? (newestUseCase ?? DATES[path]) : DATES[path];

const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/features", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  ...FEATURE_SLUGS.map((s) => ({ path: `/features/${s}`, priority: 0.9, changeFrequency: "monthly" as const })),
  { path: "/tools", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tools/twitter-shadowban-checker", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/tweet-character-counter", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/twitter-thread-maker", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/twitter-engagement-rate-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/twitter-follower-ratio-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/twitter-bold-text-generator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/tweet-templates", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tools/twitter-bio-generator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/alternatives", priority: 0.7, changeFrequency: "monthly" },
  ...alternativePages.map((a) => ({ path: `/alternatives/${a.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
  { path: "/use-cases", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/whats-new", priority: 0.6, changeFrequency: "weekly" },
  { path: "/press", priority: 0.4, changeFrequency: "yearly" },
  { path: "/featured", priority: 0.3, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.path === "/" ? "" : p.path}`,
      lastModified: lastModifiedFor(p.path),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...useCases.map((u) => ({
      url: `${site.url}/use-cases/${u.slug}`,
      lastModified: u.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
