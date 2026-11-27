import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ratingLd, softwareLd } from "@/components/json-ld";
import { Testimonials } from "@/components/testimonials";
import { TRUST_TEXT, TrustStrip } from "@/components/trust-strip";
import { socialProof } from "@/config/social-proof";
import { testimonials } from "@/data/testimonials";
import { cwsReviewsUrl } from "@/lib/cws";

describe("social proof (real numbers only)", () => {
  it("the trust strip shows the configured store numbers and links to the reviews tab", () => {
    expect(TRUST_TEXT).toBe(`Rated ${socialProof.cwsRating.toFixed(1)} on the Chrome Web Store · ${socialProof.cwsUsers} users`);
    const html = renderToStaticMarkup(createElement(TrustStrip, { campaign: "pricing" }));
    expect(html).toContain(TRUST_TEXT);
    expect(html).toContain(`href="${cwsReviewsUrl({ campaign: "pricing", content: "trust-strip" }).replace(/&/g, "&amp;")}"`);
    expect(html).toContain('target="_blank"');
    expect(html).toMatch(/rel="noopener[^"]*"/);
  });

  it("aggregateRating stays out of the structured data while markUpRating is off", () => {
    expect(socialProof.markUpRating).toBe(false);
    expect(ratingLd).toBeNull();
    expect(softwareLd).not.toHaveProperty("aggregateRating");
  });

  it("the Testimonials section renders nothing while the list is empty", () => {
    expect(testimonials).toEqual([]);
    expect(renderToStaticMarkup(createElement(Testimonials))).toBe("");
  });
});
