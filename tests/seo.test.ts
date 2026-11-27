import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { posts, getPost } from "@/content/posts";
import { serializeJsonLd, faqLd, breadcrumbLd, softwareLd, SOFTWARE_ID } from "@/components/json-ld";
import { pricingTiers } from "@/config/pricing";
import { fullTitle, pageMetadata } from "@/lib/seo";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { GET as feed } from "@/app/blog/feed.xml/route";
import { site } from "@/config/site";
import { FEATURE_SLUGS } from "@/content/feature-slugs";
import { allFaqs, faqGroups } from "@/content/faq";
import { alternativePages, getAlternative } from "@/content/alternatives";
import { featurePages } from "@/content/feature-pages";
import { featuresForPost } from "@/content/post-features";
import { toolNav } from "@/config/nav";
import { fullTitle as titleOf } from "@/lib/seo";

const appDir = path.resolve(import.meta.dirname, "../src/app");
const routeExists = (p: string) => {
  const clean = p.split("#")[0].replace(/\/$/, "") || "/";
  if (clean === "/") return true;
  const blog = clean.match(/^\/blog\/([^/]+)$/);
  if (blog) return !!getPost(blog[1]);
  const feature = clean.match(/^\/features\/([^/]+)$/);
  if (feature) return (FEATURE_SLUGS as readonly string[]).includes(feature[1]);
  const alternative = clean.match(/^\/alternatives\/([^/]+)$/);
  if (alternative) return !!getAlternative(alternative[1]);
  return existsSync(path.join(appDir, clean, "page.tsx")) || existsSync(path.join(appDir, clean, "route.ts"));
};

const linksIn = (text: string) => [...text.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]);

describe("blog content", () => {
  it("has 2-3+ posts with unique slugs", () => {
    expect(posts.length).toBeGreaterThanOrEqual(3);
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
  });

  it.each(posts.map((p) => [p.slug, p] as const))("%s has SEO-sized metadata and valid structure", (_s, p) => {
    expect(fullTitle(p.seoTitle).length).toBeLessThanOrEqual(60);
    expect(p.description.length).toBeGreaterThanOrEqual(140);
    expect(p.description.length).toBeLessThanOrEqual(160);
    expect(p.title.length).toBeGreaterThan(30);
    expect(p.keywords.length).toBeGreaterThanOrEqual(4);
    expect(p.sections.length).toBeGreaterThanOrEqual(5);
    expect(new Set(p.sections.map((s) => s.id)).size).toBe(p.sections.length);
    const words = JSON.stringify(p.sections).split(/\s+/).length;
    expect(words).toBeGreaterThan(700);
    expect(p.related.every((r) => !!getPost(r) && r !== p.slug)).toBe(true);
  });

  it("every internal link in posts points to an existing route", () => {
    const bad: string[] = [];
    for (const p of posts) for (const l of linksIn(JSON.stringify(p.sections))) if (!routeExists(l)) bad.push(`${p.slug} -> ${l}`);
    expect(bad).toEqual([]);
  });

  it("makes no fabricated claims (ratings, user counts, guarantees)", () => {
    const text = JSON.stringify(posts).toLowerCase();
    for (const bad of ["guaranteed followers", "10,000 users", "5-star", "rated 4", "trusted by", "join thousands", "mahfuz", "allum"]) expect(text).not.toContain(bad);
  });
});

describe("pageMetadata", () => {
  it("builds title, canonical, OG, Twitter large card and merges keywords", () => {
    const m = pageMetadata({ title: "Test", description: "d", path: "/x", keywords: ["custom"] });
    expect(m.title).toEqual({ absolute: "Test | GrowX" });
    expect(m.alternates?.types).toMatchObject({ "application/rss+xml": [{ url: "/blog/feed.xml" }] });
    expect(m.alternates?.canonical).toBe("/x");
    expect(m.twitter).toMatchObject({ card: "summary_large_image" });
    expect(m.keywords).toContain("custom");
    expect(m.keywords).toContain("X auto follow");
  });
  it("noindex pages are excluded; articles carry dates and author", () => {
    expect(pageMetadata({ title: "t", description: "d", path: "/p", noindex: true }).robots).toEqual({ index: false, follow: false });
    const a = pageMetadata({ title: "t", description: "d", path: "/p", type: "article", publishedTime: "2026-10-09" });
    expect(a.openGraph).toMatchObject({ type: "article", publishedTime: "2026-10-09", authors: [site.author] });
  });
  it("repeats the default social image on every normal page (page openGraph replaces the root one)", () => {
    const m = pageMetadata({ title: "t", description: "d", path: "/p" });
    expect(JSON.stringify(m.openGraph)).toContain("/opengraph-image");
    expect(JSON.stringify(m.twitter)).toContain("/opengraph-image");
    expect(JSON.stringify(pageMetadata({ title: "t", description: "d", path: "/b", defaultImage: false }).openGraph)).not.toContain("images");
  });
  it("absolute title skips the template", () => {
    expect(pageMetadata({ title: "Home", absoluteTitle: true, description: "d", path: "/" }).title).toEqual({ absolute: "Home" });
  });
  it("adds the brand suffix only when it is not redundant and the title stays within 60 characters", () => {
    expect(fullTitle("Pricing")).toBe("Pricing | GrowX");
    expect(fullTitle("GrowX Features: Auto Follow, Scheduler, AI & Analytics")).toBe("GrowX Features: Auto Follow, Scheduler, AI & Analytics");
    const long = "How to Schedule Tweets on X (Twitter): A Practical Guide";
    expect(fullTitle(long)).toBe(long);
    expect(fullTitle("x".repeat(52))).toHaveLength(60);
  });
});

describe("sitemap, robots and feed", () => {
  const urls = sitemap().map((s) => s.url);
  it("lists public pages and every post, but no private or noindex pages", () => {
    for (const p of ["", "/features", "/how-it-works", "/pricing", "/blog", "/about", "/contact"]) expect(urls).toContain(`${site.url}${p}`);
    for (const p of posts) expect(urls).toContain(`${site.url}/blog/${p.slug}`);
    for (const bad of ["/dashboard", "/account", "/login", "/signup", "/reset-password", "/api"]) expect(urls.some((u) => u.includes(bad))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });
  it("every page has a real content date, not the build time", () => {
    const entries = sitemap();
    for (const e of entries) expect(e.lastModified, e.url).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(new Set(entries.map((e) => String(e.lastModified))).size).toBeGreaterThan(5);
  });
  it("every sitemap URL maps to a real route", () => {
    for (const u of urls) expect(routeExists(new URL(u).pathname)).toBe(true);
  });
  it("robots allows crawling, blocks private areas and points at the sitemap", () => {
    const r = robots();
    expect(JSON.stringify(r.rules)).toContain("/dashboard");
    expect(r.sitemap).toBe(`${site.url}/sitemap.xml`);
    expect(r).not.toHaveProperty("host");
  });
  it("RSS feed is valid-looking XML with all posts", async () => {
    const xml = await feed().text();
    expect(xml.startsWith("<?xml")).toBe(true);
    for (const p of posts) expect(xml).toContain(`${site.url}/blog/${p.slug}`);
  });
});

describe("structured data", () => {
  it("escapes < so content cannot break out of the script tag", () => {
    const s = serializeJsonLd({ a: "</script><script>alert(1)</script>" });
    expect(s).not.toContain("</script>");
    expect(JSON.parse(s).a).toContain("</script>");
  });
  it("software markup has the real plans as offers and no ratings or review counts", () => {
    const text = JSON.stringify(softwareLd);
    expect(text).not.toMatch(/aggregateRating|ratingValue|reviewCount|review"/);
    expect(softwareLd["@id"]).toBe(SOFTWARE_ID);
    expect(softwareLd.offers.map((o) => [o.name, o.price, o.priceCurrency])).toEqual([
      ["Free", "0", "USD"],
      ["Premium Monthly", "1.99", "USD"],
      ["Premium Yearly", "14.99", "USD"],
      ["Premium Lifetime", "59.99", "USD"],
    ]);
    expect(softwareLd.offers.map((o) => o.price)).toEqual(pricingTiers.map((t) => (t.priceCents ? (t.priceCents / 100).toFixed(2) : "0")));
    expect(softwareLd.offers[3].description).toContain("$29.99 for the first 100");
    for (const o of softwareLd.offers) expect(o.url).toBe(`${site.url}/pricing`);
  });
  it("faq and breadcrumb builders produce schema.org shapes", () => {
    expect(faqLd([{ q: "Q", a: "A" }]).mainEntity[0]).toMatchObject({ "@type": "Question", name: "Q" });
    expect(breadcrumbLd([{ name: "Home", path: "/" }, { name: "B", path: "/b" }]).itemListElement[1].position).toBe(2);
  });
});

describe("no leftovers", () => {
  it("source contains no references to removed people", () => {
    const hits: string[] = [];
    const walk = (dir: string) => {
      for (const f of readdirSync(dir)) {
        const full = path.join(dir, f);
        if (statSync(full).isDirectory()) walk(full);
        else if (/\.(tsx?|md)$/.test(f) && /mahfuz|allum/i.test(require_text(full))) hits.push(full);
      }
    };
    walk(path.resolve(import.meta.dirname, "../src"));
    expect(hits).toEqual([]);
  });
});

import { readFileSync } from "node:fs";
function require_text(f: string) {
  return readFileSync(f, "utf8");
}

describe("faq page content", () => {
  it("has unique questions and topics, each with answers", () => {
    expect(allFaqs.length).toBeGreaterThanOrEqual(40);
    expect(new Set(allFaqs.map((f) => f.q)).size).toBe(allFaqs.length);
    expect(new Set(faqGroups.map((g) => g.id)).size).toBe(faqGroups.length);
    for (const f of allFaqs) expect(f.a.length).toBeGreaterThan(40);
  });
  it("links only to pages that exist and is in the sitemap", () => {
    for (const f of allFaqs) if (f.more) expect(routeExists(f.more.href), f.more.href).toBe(true);
    expect(sitemap().some((e) => e.url === `${site.url}/faq`)).toBe(true);
    expect(faqLd(allFaqs).mainEntity).toHaveLength(allFaqs.length);
  });
});

describe("alternatives pages", () => {
  const words = (v: unknown) => JSON.stringify(v).replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).length;
  it.each(alternativePages.map((a) => [a.slug, a] as const))("%s: SEO-sized, real content, fair and honest", (_s, a) => {
    expect(titleOf(a.seoTitle).length).toBeLessThanOrEqual(60);
    expect(a.description.length).toBeGreaterThanOrEqual(120);
    expect(a.description.length).toBeLessThanOrEqual(155);
    const body = { ...a, keywords: [], relatedPosts: [], relatedFeatures: [] };
    expect(words(body)).toBeGreaterThan(800);
    expect(a.theyDoWell.length).toBeGreaterThanOrEqual(2);
    expect(a.pickThem.length).toBeGreaterThanOrEqual(2);
    expect(a.table.length).toBeGreaterThanOrEqual(8);
    // no competitor prices, ratings or review language
    const them = JSON.stringify([a.summary, a.theyDoWell, a.table.map((r) => r.them), a.pickThem]);
    expect(them).not.toMatch(/\$\d|per month|\/mo\b|rating|stars?\b|reviews?\b/i);
    for (const p of a.relatedPosts) expect(getPost(p), p).toBeTruthy();
    for (const l of linksIn(JSON.stringify(a))) expect(routeExists(l), l).toBe(true);
  });
  it("the guides they build on link back to them", () => {
    const text = JSON.stringify([getPost("hypefury-alternatives"), getPost("typefully-vs-tweet-hunter")]);
    for (const a of alternativePages) expect(text).toContain(`/alternatives/${a.slug}`);
  });
});

describe("internal linking", () => {
  it.each(featurePages.map((f) => [f.slug, f] as const))("feature %s links tools, 3+ guides and pricing, with an X heading and real limits", (_s, f) => {
    expect(f.tools.length).toBeGreaterThanOrEqual(1);
    for (const t of f.tools) expect(toolNav.some((n) => n.href === t), t).toBe(true);
    expect(f.relatedPosts.filter((p) => getPost(p)).length).toBeGreaterThanOrEqual(3);
    expect(f.xHeading).toMatch(/\bX\b/);
    expect(f.limits.length).toBeGreaterThanOrEqual(4);
    for (const r of f.limits) expect(r.free && r.premium && r.label).toBeTruthy();
  });
  it("every post links to 2-3+ related posts and 1-2 feature pages", () => {
    for (const p of posts) {
      expect(p.related.filter((r) => getPost(r)).length, p.slug).toBeGreaterThanOrEqual(2);
      const f = featuresForPost(p);
      expect(f.length, p.slug).toBeGreaterThanOrEqual(1);
      expect(f.length, p.slug).toBeLessThanOrEqual(2);
      for (const s of f) expect((FEATURE_SLUGS as readonly string[]).includes(s), s).toBe(true);
    }
  });
});
