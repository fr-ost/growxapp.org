import { describe, expect, it } from "vitest";
import { GET } from "@/app/llms.txt/route";
import { pricingTiers } from "@/config/pricing";
import { site } from "@/config/site";
import { CWS_URL } from "@/lib/cws";

describe("/llms.txt", () => {
  it("is a short markdown summary that is never indexed", async () => {
    const res = GET();
    expect(res.headers.get("x-robots-tag")).toBe("noindex");
    const text = await res.text();
    expect(text.startsWith(`# ${site.name}\n\n> ${site.definition}`)).toBe(true);
    for (const h of ["## Features", "## Free vs Premium", "## Safety and privacy", "## Key pages", "## Top guides"]) expect(text).toContain(h);
    for (const p of ["/features", "/pricing", "/how-it-works", "/press", "/faq"]) expect(text).toContain(`(${site.url}${p})`);
    expect(text).toContain(`(${CWS_URL})`);
    for (const t of pricingTiers.filter((x) => x.priceCents)) expect(text).toContain(t.priceLabel);
    const guides = text.split("## Top guides")[1].trim().split("\n").filter((l) => l.startsWith("- ["));
    expect(guides.length).toBeGreaterThan(5);
    expect(guides.length).toBeLessThanOrEqual(10);
    expect(text).not.toMatch(/[–—]/);
  });
});
