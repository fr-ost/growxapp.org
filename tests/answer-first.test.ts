import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { posts } from "@/content/posts";
import { alternativePages } from "@/content/alternatives";
import { useCases } from "@/content/use-cases";

/** B4: every page opens with a direct answer of 40 to 70 words. Feature pages are covered in feature-pages.test.ts. */
const words = (s: string) => s.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;
const inRange = (n: number) => n >= 40 && n <= 70;

describe("answer-first openings (40 to 70 words)", () => {
  it.each(posts.map((p) => [p.slug, p] as const))("blog post %s", (_s, p) => {
    const first = p.sections[0].blocks[0];
    expect(first.type, "the post opens with a paragraph").toBe("p");
    if (first.type === "p") expect(words(first.text)).toSatisfy(inRange);
  });

  it.each(alternativePages.map((a) => [a.slug, a] as const))("comparison page %s", (_s, a) => {
    expect(words(a.lead)).toSatisfy(inRange);
  });

  it.each(useCases.map((u) => [u.slug, u] as const))("use case %s", (_s, u) => {
    expect(words(u.answer)).toSatisfy(inRange);
  });

  const toolsDir = path.join(process.cwd(), "src/app/tools");
  const tools = readdirSync(toolsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  it.each(tools)("tool page %s", (tool) => {
    const src = readFileSync(path.join(toolsDir, tool, "page.tsx"), "utf8");
    const lead = src.match(/lead="([^"]+)"/)?.[1] ?? "";
    expect(words(lead)).toSatisfy(inRange);
  });

  it("most posts have at least one question heading", () => {
    const withQuestion = posts.filter((p) => p.sections.some((s) => s.heading.trim().endsWith("?")));
    expect(withQuestion.length / posts.length).toBeGreaterThanOrEqual(0.9);
  });
});
