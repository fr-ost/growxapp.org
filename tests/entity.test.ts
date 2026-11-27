import { describe, expect, it } from "vitest";
import { founderLd, organizationLd, ORG_ID, PERSON_ID, softwareLd, softwareOffers } from "@/components/json-ld";
import { pricingTiers } from "@/config/pricing";
import { site } from "@/config/site";
import { CURRENT_VERSION } from "@/content/releases";
import { CWS_URL } from "@/lib/cws";

describe("one GrowX entity, described the same way everywhere", () => {
  it("has one canonical definition", () => {
    expect(site.definition).toBe(
      "GrowX is a Chrome extension for X (Twitter) that grows your account with safe auto follow, a post scheduler, on-device AI writing and replies, analytics, and an unfollower tracker. It is free to start.",
    );
    expect(organizationLd.description).toBe(site.definition);
    expect(softwareLd.description).toBe(site.definition);
  });

  it("Organization: names, logo, founder and only real profiles in sameAs", () => {
    expect(organizationLd.name).toBe("GrowX");
    expect(organizationLd.alternateName).toEqual(["GrowX App", "growxapp", "GrowX: The Ultimate X (Twitter) Growth Tool"]);
    expect(organizationLd.founder).toEqual({ "@id": PERSON_ID });
    expect(organizationLd.sameAs[0]).toBe(CWS_URL);
    expect(organizationLd.sameAs.every((u) => typeof u === "string" && u.startsWith("https://"))).toBe(true);
    expect(organizationLd.sameAs).not.toContain("");
  });

  it("SoftwareApplication: the store name, category, platform, store URLs, version and offers from /pricing", () => {
    expect(softwareLd.name).toBe("GrowX");
    expect(softwareLd.alternateName).toBe("GrowX: The Ultimate X (Twitter) Growth Tool");
    expect(softwareLd.applicationCategory).toBe("BrowserApplication");
    expect(softwareLd.operatingSystem).toBe("Chrome");
    expect(softwareLd.installUrl).toBe(CWS_URL);
    expect(softwareLd.downloadUrl).toBe(CWS_URL);
    expect(softwareLd.softwareVersion).toBe(CURRENT_VERSION);
    expect(softwareLd.publisher).toEqual({ "@id": ORG_ID });
    expect(softwareLd.author).toEqual({ "@id": PERSON_ID });
    expect(softwareLd.offers).toBe(softwareOffers);
    expect(softwareOffers.map((o) => o.name)).toEqual(pricingTiers.map((t) => t.name));
    expect(softwareLd.featureList.length).toBeGreaterThan(5);
  });

  it("the founder's profiles", () => {
    expect(founderLd.name).toBe("Shahriar Ahmed");
    expect(founderLd.sameAs).toEqual(["https://x.com/0x_nation", "https://bd.linkedin.com/in/shahriar-bmb", "https://www.shahriarahmed.net"]);
  });
});
