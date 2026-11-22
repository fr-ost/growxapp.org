import { getPost, posts } from "@/content/posts";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return [{ id: "card", alt: post ? `${post.title} (GrowX blog)` : "GrowX blog post", size: OG_SIZE, contentType: OG_TYPE }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return ogImage({ kicker: `GrowX · ${post?.category ?? "Blog"}`, title: post?.title ?? "GrowX Blog" });
}
