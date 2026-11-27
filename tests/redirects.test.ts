import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { site } from "@/config/site";
import { posts } from "@/content/posts";
import { MERGED_POST_SLUGS, MERGED_URLS } from "@/content/redirects";
import nextConfig from "../next.config";

describe("merged URLs", () => {
  it("never chain: no target is itself a merged URL, and no URL is listed twice", () => {
    const froms = new Set(MERGED_URLS.map((r) => r.from));
    expect(froms.size).toBe(MERGED_URLS.length);
    for (const r of MERGED_URLS) expect(froms.has(r.to), `${r.from} -> ${r.to}`).toBe(false);
  });

  it("are gone from the posts, and every target is a page in the sitemap", () => {
    const slugs = new Set(posts.map((p) => p.slug));
    for (const s of MERGED_POST_SLUGS) expect(slugs.has(s), s).toBe(false);
    const urls = new Set(sitemap().map((e) => e.url.replace(site.url, "") || "/"));
    for (const r of MERGED_URLS) {
      expect(urls.has(r.from), `${r.from} still in the sitemap`).toBe(false);
      expect(urls.has(r.to), `${r.to} missing from the sitemap`).toBe(true);
    }
  });

  it("next.config.ts redirects each one permanently to the absolute canonical URL", async () => {
    const rules = await nextConfig.redirects!();
    for (const r of MERGED_URLS) {
      const rule = rules.find((x) => x.source === r.from);
      expect(rule, r.from).toBeDefined();
      expect(rule!.permanent).toBe(true);
      expect(rule!.destination).toBe(`https://www.growxapp.org${r.to}`);
    }
    // the merged-URL rules come before the bare-domain rule, so the bare domain reaches the final page in one hop
    const hostRule = rules.findIndex((x) => "has" in x && x.has?.some((h) => h.type === "host"));
    expect(Math.max(...MERGED_URLS.map((r) => rules.findIndex((x) => x.source === r.from)))).toBeLessThan(hostRule);
  });
});
