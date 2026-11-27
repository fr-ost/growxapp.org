import type { Metadata } from "next";
import { site } from "@/config/site";

/** Sitewide keyword set; pages add their own on top. */
export const baseKeywords = [
  "GrowX",
  "X growth tool",
  "Twitter growth tool",
  "grow on Twitter",
  "grow X followers",
  "X auto follow",
  "Twitter scheduler",
  "Twitter analytics",
  "Chrome extension for Twitter",
];

export const DEFAULT_OG_IMAGE = "/opengraph-image";
export const DEFAULT_OG_ALT = "GrowX: the Chrome extension for X (Twitter) growth";

export interface PageSeo {
  /**
   * <title>, primary keyword first. " | GrowX" is appended only when the title does not already name GrowX and the
   * result stays within 60 characters (see fullTitle). scripts/seo-check.mjs enforces the 60-character limit.
   */
  title: string;
  /** Meta description, 140-160 chars, with a benefit and a call to action (scripts/seo-check.mjs enforces it). */
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
  /** "article" adds published/modified times and the author. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Never add the " | GrowX" suffix (home page). */
  absoluteTitle?: boolean;
  /** Pages with their own opengraph-image route set false; everything else gets the default card. */
  defaultImage?: boolean;
}

export const TITLE_MAX = 60;

/** The <title> as rendered: the brand suffix only where it is not redundant and still fits. */
export function fullTitle(title: string, absolute = false): string {
  const suffixed = `${title} | ${site.name}`;
  if (absolute || title.includes(site.name) || suffixed.length > TITLE_MAX) return title;
  return suffixed;
}

/** The blog feed, linked from every page (a page-level `alternates` replaces the layout's, so it is repeated here). */
export const RSS_ALTERNATE = { "application/rss+xml": [{ url: "/blog/feed.xml", title: "GrowX Blog" }] };

/** twitter:creator is the founder; twitter:site only once GrowX's own X handle is filled in (src/config/site.ts). */
export const TWITTER_HANDLES = { creator: site.creatorHandle, ...(site.profiles.x ? { site: site.profiles.x } : {}) };

export function pageMetadata(opts: PageSeo): Metadata {
  const title = fullTitle(opts.title, opts.absoluteTitle);
  // A page-level openGraph replaces the root one, so the default image must be repeated here.
  const images = opts.defaultImage === false ? undefined : [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: DEFAULT_OG_ALT }];
  return {
    title: { absolute: title },
    description: opts.description,
    keywords: [...new Set([...(opts.keywords ?? []), ...baseKeywords])],
    alternates: { canonical: opts.path, types: RSS_ALTERNATE },
    authors: [{ name: site.author, url: site.authorUrl }],
    openGraph: {
      title,
      description: opts.description,
      url: opts.path,
      siteName: site.name,
      locale: "en_US",
      type: opts.type ?? "website",
      ...(images ? { images } : {}),
      ...(opts.type === "article"
        ? { publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime ?? opts.publishedTime, authors: [site.author] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      ...TWITTER_HANDLES,
      title,
      description: opts.description,
      ...(images ? { images: [{ url: DEFAULT_OG_IMAGE, alt: DEFAULT_OG_ALT }] } : {}),
    },
    robots: opts.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}
