import { coverSvg } from "@/components/blog/cover-art";
import type { CoverLayer } from "@/components/blog/post-cover";
import { getPost, posts } from "@/content/posts";

/** Post cover layers as static SVG files: /blog/cover/<slug>-back.svg and /blog/cover/<slug>-front.svg. */
export const dynamic = "force-static";
export const dynamicParams = false;

const LAYERS: CoverLayer[] = ["back", "front"];

export function generateStaticParams() {
  return posts.flatMap((p) => LAYERS.map((layer) => ({ file: `${p.slug}-${layer}.svg` })));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const match = (await params).file.match(/^(.+)-(back|front)\.svg$/);
  const post = match ? getPost(match[1]) : undefined;
  if (!match || !post) return new Response("Not found", { status: 404 });
  return new Response(coverSvg(post.slug, post.category, match[2] as CoverLayer), {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "public, max-age=604800, stale-while-revalidate=2592000" },
  });
}
