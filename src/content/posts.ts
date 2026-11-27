/**
 * Blog content. Facts come from docs/PRODUCT_FACTS.md (GrowX extension v2.4.4:
 * Grow, Create, GrowX AI, Engage, Insights, Cleanup, plans). Nothing unreleased
 * is described as live. No statistics, testimonials or result promises are invented.
 *
 * Inline syntax in text: [label](/path) internal/external link, **bold**.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string };

export interface PostSection {
  id: string;
  heading: string;
  blocks: Block[];
}

export interface Post {
  slug: string;
  /** <title> text (without the " | GrowX" suffix). */
  seoTitle: string;
  /** On-page H1. */
  title: string;
  /** Meta description, 120-160 chars. */
  description: string;
  excerpt: string;
  category: "How it works" | "Features" | "Roadmap" | "Guides" | "Create" | "Insights" | "Engage";
  keywords: string[];
  datePublished: string;
  dateModified: string;
  readMinutes: number;
  sections: PostSection[];
  /** Slugs of related posts. */
  related: string[];
  /** Optional questions and answers, rendered after the sections and as FAQPage structured data. */
  faq?: { q: string; a: string }[];
}

import { brandPosts } from "./posts-brand";
import { comparePosts } from "./posts-compare";
import { round4Posts } from "./posts-round4";
import { round5Posts } from "./posts-round5";
import { createPosts } from "./posts-create";
import { growthPosts } from "./posts-growth";
import { insightPosts } from "./posts-insights";
import { marketingPosts } from "./posts-marketing";
import { profilePosts } from "./posts-profile";
import { strategyPosts } from "./posts-strategy";

/** Product documentation posts moved to the feature pages and /how-it-works (see src/content/redirects.ts). */
const corePosts: Post[] = [];

export const posts: Post[] = [...corePosts, ...growthPosts, ...createPosts, ...insightPosts, ...strategyPosts, ...profilePosts, ...marketingPosts, ...brandPosts, ...comparePosts, ...round4Posts, ...round5Posts];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const latestFirst = () => [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
