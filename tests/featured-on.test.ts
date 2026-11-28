import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { badgeHtml, DIRECTORY_REL, OfficialBadge } from "@/components/featured-on";
import { SiteFooter } from "@/components/site-footer";
import { badges, liveBadges } from "@/data/badges";
import sitemap from "@/app/sitemap";
import { site } from "@/config/site";

/** Badges whose image width is not published by the directory (to be measured and filled in by hand). */
const UNKNOWN_WIDTH = ["Days Launch", "Direct2App", "Submit My SaaS"];

describe("Directory badges", () => {
  it("only verified badges with a real slug and official HTML are live", () => {
    expect(liveBadges.length).toBeGreaterThan(0);
    for (const b of liveBadges) expect(b.verified && !b.needsSlug && !!b.html).toBe(true);
    for (const b of liveBadges) expect(b.html).not.toMatch(/your-extension|your-slug/);
  });

  it("are not in the footer, which keeps one text link to /featured", () => {
    const footer = renderToStaticMarkup(createElement(SiteFooter));
    for (const b of badges) {
      if (b.img) expect(footer, b.name).not.toContain(b.img);
      if (b.href) expect(footer, b.name).not.toContain(b.href);
    }
    expect(footer).not.toContain("featured-badge");
    expect(footer).toMatch(/<a[^>]*href="\/featured"[^>]*>Featured on<\/a>/);
  });

  it("on /featured, every directory link is nofollow noopener and every image is lazy with width and height", () => {
    for (const b of liveBadges) {
      const html = renderToStaticMarkup(createElement(OfficialBadge, { badge: b }));
      const links = html.match(/<a\b[^>]*>/g) ?? [];
      expect(links.length, b.name).toBeGreaterThan(0);
      for (const a of links) {
        expect(a, b.name).toContain(`rel="${DIRECTORY_REL}"`);
        expect(a.match(/\srel=/g), b.name).toHaveLength(1);
      }
      for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
        expect(img, b.name).toMatch(/\sloading="lazy"/);
        expect(img, b.name).toMatch(/\sheight="\d+"/);
        // width is written whenever it is known; a few directories publish only a height (TODO in src/data/badges.ts)
        if (b.width || /\swidth=/.test(b.html ?? "")) expect(img, b.name).toMatch(/\swidth="\d+"/);
        else expect(UNKNOWN_WIDTH, b.name).toContain(b.name);
      }
      // the directory's own link and image are kept, and images are never proxied
      expect(html, b.name).toContain(`href="${b.href}"`);
      expect(html).not.toContain("/_next/image");
    }
  });

  it("badgeHtml replaces any rel and the alt text, and keeps the rest of the markup", () => {
    const b = { ...liveBadges[0], html: '<a href="https://example.com/x" target="_blank" rel="noopener sponsored"><img src="https://example.com/b.svg" alt="Featured on Example"></a>', width: 120, height: 40 };
    expect(badgeHtml(b)).toBe(
      `<a href="https://example.com/x" target="_blank" rel="nofollow noopener"><img src="https://example.com/b.svg" alt="GrowX featured on ${b.name}" loading="lazy" width="120" height="40"></a>`,
    );
  });

  it("lists /featured in the sitemap", () => {
    expect(sitemap().map((s) => s.url)).toContain(`${site.url}/featured`);
  });
});
