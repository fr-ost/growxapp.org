import { describe, expect, it } from "vitest";
import { aiSource } from "@/components/site-analytics";

describe("AI search channel", () => {
  it("recognises visits from AI answer engines", () => {
    expect(aiSource("https://chatgpt.com/", "")).toBe("chatgpt");
    expect(aiSource("https://chat.openai.com/c/123", "")).toBe("chatgpt");
    expect(aiSource("", "?utm_source=chatgpt.com")).toBe("chatgpt");
    expect(aiSource("https://www.perplexity.ai/search?q=x", "")).toBe("perplexity");
    expect(aiSource("https://gemini.google.com/app", "")).toBe("gemini");
    expect(aiSource("https://copilot.microsoft.com/", "")).toBe("copilot");
    expect(aiSource("https://claude.ai/chat/abc", "")).toBe("claude");
  });

  it("ignores everything else", () => {
    expect(aiSource("https://www.google.com/", "")).toBeNull();
    expect(aiSource("https://notchatgpt.com.evil.example/", "")).toBeNull();
    expect(aiSource("", "?utm_source=newsletter")).toBeNull();
    expect(aiSource("not a url", "")).toBeNull();
    expect(aiSource("", "")).toBeNull();
  });
});
