import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { AI_CRAWLERS, AI_CRAWLER_UA, PRIVATE_PATHS } from "@/lib/ai-crawlers";
import { config } from "@/proxy";

type Rule = { userAgent: string | string[]; allow?: string | string[]; disallow?: string | string[] };

describe("robots.txt welcomes AI search crawlers on purpose", () => {
  const rules = robots().rules as Rule[];

  it("keeps the * group and its private paths", () => {
    expect(rules[0]).toEqual({ userAgent: "*", allow: "/", disallow: PRIVATE_PATHS });
    for (const p of ["/api/", "/account", "/dashboard", "/admin", "/invoices", "/checkout", "/login", "/signup", "/forgot-password", "/reset-password"]) {
      expect(PRIVATE_PATHS).toContain(p);
    }
  });

  it("gives every AI crawler its own group: Allow / plus the same private Disallow lines", () => {
    const named = rules.slice(1);
    const expected = ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "Claude-SearchBot", "Claude-User", "ClaudeBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "Bingbot", "DuckAssistBot", "Amazonbot", "meta-externalagent", "MistralAI-User"];
    expect(named.map((r) => r.userAgent)).toEqual(expected);
    for (const r of named) expect(r).toEqual({ userAgent: r.userAgent, allow: "/", disallow: PRIVATE_PATHS });
    expect(named.map((r) => String(r.userAgent).toLowerCase())).not.toContain("anthropic-ai");
    expect(named.map((r) => String(r.userAgent).toLowerCase())).not.toContain("claude-web");
  });
});

describe("the proxy logs AI crawler visits", () => {
  it("its matcher names the same crawlers as AI_CRAWLER_UA", () => {
    const entry = config.matcher.find((m) => typeof m === "object") as { has: { value: string }[] };
    const literal = entry.has[0].value.match(/\(([^)]+)\)/)![1].split("|").sort();
    expect(literal).toEqual(AI_CRAWLER_UA.source.split("|").sort());
  });

  it("recognises each crawler's user agent (Google-Extended travels as Googlebot, which is not an AI crawler)", () => {
    for (const c of AI_CRAWLERS) {
      if (c.token === "Google-Extended") expect(c.userAgent).not.toMatch(AI_CRAWLER_UA);
      else expect(c.userAgent, c.token).toMatch(AI_CRAWLER_UA);
    }
    expect("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0 Safari/537.36").not.toMatch(AI_CRAWLER_UA);
  });
});
