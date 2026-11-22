import { describe, expect, it } from "vitest";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { coverLayers, coverSvg } from "@/components/blog/cover-art";
import { coverUrl } from "@/components/blog/post-cover";
import { posts } from "@/content/posts";
import { GET } from "@/app/blog/cover/[file]/route";

/** React writes empty elements as <x></x>; the file serializer writes <x/>. */
const normal = (s: string) => s.replace(/<(\w+)([^<>]*)><\/\1>/g, "<$1$2/>");

describe("post cover files", () => {
  it.each(posts.map((p) => [p.slug, p] as const))("%s: the SVG file draws exactly what React would", (_s, p) => {
    for (const layer of ["back", "front"] as const) {
      const react = normal(renderToStaticMarkup(createElement(Fragment, null, coverLayers(p.slug, p.category)[layer])));
      const file = coverSvg(p.slug, p.category, layer);
      expect(file).toBe(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 140" preserveAspectRatio="xMidYMid meet">${react}</svg>`);
      expect(file, "no camelCase attributes besides viewBox/preserveAspectRatio").not.toMatch(/\s(?!viewBox|preserveAspectRatio)[a-z]+[A-Z]\w*=/);
    }
  });

  it("serves each layer as a cached SVG and 404s unknown files", async () => {
    const p = posts[0];
    const call = (file: string) => GET(new Request(`https://www.growxapp.org/blog/cover/${file}`), { params: Promise.resolve({ file }) });
    const res = await call(coverUrl(p.slug, "front").split("/").pop()!);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("image/svg+xml");
    expect(await res.text()).toBe(coverSvg(p.slug, p.category, "front"));
    expect((await call("no-such-post-front.svg")).status).toBe(404);
    expect((await call(`${p.slug}-side.svg`)).status).toBe(404);
  });
});
