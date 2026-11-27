import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { softwareOffers } from "@/components/json-ld";
import { PlansTable } from "@/components/plans-table";
import { planSummary, pricingTiers, TRIAL_DAYS } from "@/config/pricing";

describe("/pricing plans table and JSON-LD offers come from one config", () => {
  const html = renderToStaticMarkup(createElement(PlansTable)).replace(/<!-- -->/g, "");

  it("shows every plan with its price, length and renewal as HTML text in a real table", () => {
    expect(html).toContain("<table");
    for (const t of pricingTiers) {
      expect(html, t.name).toContain(`>${t.name}</th>`);
      expect(html, t.name).toContain(t.priceLabel);
    }
    expect(html).toContain(`${TRIAL_DAYS} days`);
    expect(html).toContain("never renew by themselves");
    expect(html).toMatch(/crypto/i);
    const lifetime = pricingTiers.find((t) => t.id === "PRO_LIFETIME")!;
    if (lifetime.earlyBird) expect(html).toContain(lifetime.earlyBird.priceLabel);
  });

  it("the JSON-LD offers match the table: same names, prices and plan text", () => {
    expect(softwareOffers.map((o) => o.name)).toEqual(pricingTiers.map((t) => t.name));
    softwareOffers.forEach((o, i) => {
      const t = pricingTiers[i];
      expect(o.price).toBe(t.priceCents ? (t.priceCents / 100).toFixed(2) : "0");
      expect(o.description).toBe(planSummary(t));
      expect(html).toContain(t.priceLabel);
    });
  });
});
