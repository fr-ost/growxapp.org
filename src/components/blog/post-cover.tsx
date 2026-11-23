import type { CSSProperties } from "react";
import { hash, rand } from "@/components/motion/demos/seed";
import type { Post } from "@/content/posts";

export type CoverLayer = "back" | "front";

/** A cover layer file, drawn by src/components/blog/cover-art.tsx and served by src/app/blog/cover/[file]/route.ts. */
export const coverUrl = (slug: string, layer: CoverLayer) => `/blog/cover/${slug}-${layer}.svg`;

const LAYER =
  "absolute inset-0 size-full fx:transition-[translate] fx:duration-[var(--dur-3)] fx:ease-glide";

/**
 * Decorative, text-free cover for a post: one motif per category over a warm mesh of two
 * radial gradients (brand reds over ink), varied deterministically by the slug. With a fine
 * pointer, hovering the parent `.group` shifts the two layers 6px in opposite directions.
 * The layers are small cached SVG files loaded lazily, so a page listing many posts stays light. Each <img> fills the
 * frame (object-fit: fill) so the file's own preserveAspectRatio centres the art and, like inline SVG, still draws the
 * parts that reach past the 320x140 viewBox on taller frames.
 */
export function PostCover({ slug, title, className = "aspect-[16/7]" }: { slug: string; title: string; category: Post["category"]; className?: string }) {
  const seed = hash(slug);
  const r = rand(seed);
  const [x1, y1, x2, y2] = [Math.round(6 + r() * 34), Math.round(r() * 40), Math.round(60 + r() * 34), Math.round(60 + r() * 40)];
  // The mesh itself is .post-cover-bg in globals.css; only the two gradient centres vary per post.
  const centres = { "--c1": `${x1}% ${y1}%`, "--c2": `${x2}% ${y2}%` } as CSSProperties;
  return (
    <div data-decor="" className={`post-cover-bg relative overflow-clip ${className}`} style={centres}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static decorative SVG; next/image adds nothing here */}
      <img src={coverUrl(slug, "back")} alt="" aria-hidden="true" width={320} height={140} loading="lazy" decoding="async" className={`${LAYER} fx:group-hover:-translate-x-1.5`} />
      {/* eslint-disable-next-line @next/next/no-img-element -- static decorative SVG; next/image adds nothing here */}
      <img src={coverUrl(slug, "front")} alt={`${title} – GrowX blog cover`} width={320} height={140} loading="lazy" decoding="async" className={`${LAYER} fx:group-hover:translate-x-1.5`} />
    </div>
  );
}
