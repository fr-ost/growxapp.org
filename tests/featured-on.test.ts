import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FeaturedOn } from "@/components/featured-on";
import { badges, liveBadges } from "@/data/badges";
import sitemap from "@/app/sitemap";
import { site } from "@/config/site";

describe("Featured on badges", () => {
  const html = renderToStaticMarkup(createElement(FeaturedOn));

  it("shows only verified badges with a real slug and official HTML", () => {
    expect(liveBadges.length).toBeGreaterThan(0);
    for (const b of liveBadges) expect(b.verified && !b.needsSlug && !!b.html).toBe(true);
    for (const b of badges.filter((x) => !liveBadges.includes(x))) {
      if (b.html) expect(html, b.name).not.toContain(b.html);
      if (b.img) expect(html, b.name).not.toContain(b.img);
    }
    expect(html).not.toContain("your-extension");
    expect(html).not.toContain("your-slug");
  });

  it("renders each badge's official HTML byte for byte, server-side", () => {
    for (const b of liveBadges) expect(html, b.name).toContain(b.html!);
  });

  it("never adds nofollow, sponsored or ugc, and never proxies images", () => {
    expect(html).not.toMatch(/nofollow|sponsored|\bugc\b/);
    expect(html).not.toContain("/_next/image");
  });

  it("lists /featured in the sitemap", () => {
    expect(sitemap().map((s) => s.url)).toContain(`${site.url}/featured`);
  });
});
