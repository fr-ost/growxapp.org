import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { CWS_ID, CWS_URL, campaignFor, cwsReviewsUrl, cwsUrl, isCwsUrl } from "@/lib/cws";

describe("Chrome Web Store links (src/lib/cws.ts)", () => {
  it("builds the listing URL with UTM tags in a fixed order", () => {
    expect(cwsUrl({ campaign: "home", content: "hero" })).toBe(
      `https://chromewebstore.google.com/detail/${CWS_ID}?utm_source=growxapp.org&utm_medium=website&utm_campaign=home&utm_content=hero`,
    );
    expect(cwsReviewsUrl({ campaign: "pricing", content: "trust-strip" })).toBe(
      `https://chromewebstore.google.com/detail/${CWS_ID}/reviews?utm_source=growxapp.org&utm_medium=website&utm_campaign=pricing&utm_content=trust-strip`,
    );
    expect(CWS_URL).toBe(`https://chromewebstore.google.com/detail/${CWS_ID}`);
  });

  it("names the campaign after the page", () => {
    expect(campaignFor("/")).toBe("home");
    expect(campaignFor("/pricing")).toBe("pricing");
    expect(campaignFor("/how-it-works")).toBe("how-it-works");
    expect(campaignFor("/features")).toBe("features");
    expect(campaignFor("/features/twitter-auto-follow")).toBe("feature-twitter-auto-follow");
    expect(campaignFor("/blog/tweet-ideas")).toBe("blog-tweet-ideas");
    expect(campaignFor("/tools/twitter-thread-maker")).toBe("tool-twitter-thread-maker");
    expect(campaignFor("/alternatives/hypefury")).toBe("alt-hypefury");
    expect(campaignFor("/use-cases/crypto-twitter")).toBe("use-case-crypto-twitter");
    expect(campaignFor("/pricing?x=1#plans")).toBe("pricing");
  });

  it("recognises store links with or without tags", () => {
    expect(isCwsUrl(CWS_URL)).toBe(true);
    expect(isCwsUrl(cwsUrl({ campaign: "home", content: "footer" }))).toBe(true);
    expect(isCwsUrl("https://www.growxapp.org/pricing")).toBe(false);
  });

  it("no store URL or extension ID is written anywhere in src/ except src/lib/cws.ts", () => {
    let out = "";
    try {
      // --untracked: new files count too; exit status 1 just means "no match"
      out = execFileSync("git", ["grep", "--untracked", "-l", "-E", `chromewebstore|${CWS_ID}`, "--", "src"], { encoding: "utf8" });
    } catch (e) {
      if ((e as { status?: number }).status !== 1) throw e;
    }
    const hits = out.split("\n").filter(Boolean);
    expect(hits).toEqual(["src/lib/cws.ts"]);
  });
});
