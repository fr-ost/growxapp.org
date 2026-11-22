"use client";

import Link from "next/link";
import { formatPostDate } from "@/components/blog/format-date";
import { PostCover } from "@/components/blog/post-cover";
import { IconArrowRight, IconClock } from "@/components/icons";
import { Badge } from "@/components/ui/primitives";
import type { Post } from "@/content/posts";

/** The fields a teaser shows. Pages pass only these, so a long list of cards stays small in the page payload. */
export type PostSummary = Pick<Post, "slug" | "title" | "excerpt" | "category" | "readMinutes" | "datePublished">;

/**
 * Post teaser used on home, feature pages and the blog. Scroll reveal + 2px hover lift,
 * a cursor spotlight (fine pointers) and a seeded category cover whose two layers part on hover.
 * The whole card is clickable through the title's stretched link.
 * A client component with plain-data props: its markup is server-rendered once, and the page's hydration data
 * carries only the summary instead of a second copy of the markup.
 */
export function PostCardView({ post, headingLevel = "h2" }: { post: PostSummary; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article
      data-spotlight=""
      className="reveal lift group relative flex h-full flex-col overflow-clip rounded-3xl border border-hairline bg-white p-6 shadow-hair"
    >
      <PostCover slug={post.slug} category={post.category} className="-mx-6 -mt-6 mb-5 aspect-[16/7] border-b border-hairline" />
      <div className="flex items-center gap-3">
        <Badge tone="accent">{post.category}</Badge>
        <span className="flex items-center gap-1 text-xs tabular-nums text-muted">
          <IconClock size={13} /> {post.readMinutes} min read
        </span>
      </div>
      <H className="mt-4 text-balance text-xl font-bold leading-snug tracking-tight">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-accent-ink">
          {post.title}
        </Link>
      </H>
      <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-text-2">{post.excerpt}</p>
      <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4 text-sm">
        <time dateTime={post.datePublished} className="tabular-nums text-muted">{formatPostDate(post.datePublished)}</time>
        <span className="inline-flex items-center gap-1 font-semibold text-accent-ink">
          Read <IconArrowRight size={15} className="nudge" />
        </span>
      </div>
    </article>
  );
}
