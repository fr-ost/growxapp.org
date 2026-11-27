import { Fragment, type ReactNode } from "react";
import { PostCardView } from "@/components/blog/post-card";
import { IconInfo } from "@/components/icons";
import { ScrollSpy } from "@/components/motion/scroll-spy";
import { RichText } from "@/components/rich-text";
import type { Block, Post } from "@/content/posts";

export { formatPostDate } from "@/components/blog/format-date";

/** A post teaser card (see PostCardView). Pass a full Post; only the summary fields reach the browser. */
export function PostCard({ post, headingLevel = "h2", reveal = true }: { post: Post; headingLevel?: "h2" | "h3"; reveal?: boolean }) {
  const { slug, title, excerpt, category, readMinutes, datePublished } = post;
  return <PostCardView post={{ slug, title, excerpt, category, readMinutes, datePublished }} headingLevel={headingLevel} reveal={reveal} />;
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p><RichText text={block.text} /></p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 marker:text-accent">
          {block.items.map((t) => <li key={t}><RichText text={t} /></li>)}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-accent">
          {block.items.map((t) => <li key={t}><RichText text={t} /></li>)}
        </ol>
      );
    case "note":
      return (
        <aside className="flex gap-3 rounded-r-xl border-l-[3px] border-warn/50 bg-warn-soft px-4 py-3 text-sm text-warn">
          <IconInfo size={18} className="mt-0.5 shrink-0" />
          <p><RichText text={block.text} /></p>
        </aside>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-hairline bg-white shadow-hair">
          <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-left text-sm leading-relaxed">
            <caption className="sr-only">{block.caption}</caption>
            <thead>
              <tr className="[&>th]:shadow-[inset_0_-1px_0_var(--hairline-strong)]">
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-bold text-text">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="align-top [&>*]:border-t [&>*]:border-hairline first:[&>*]:border-t-0">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 font-semibold text-text"><RichText text={cell} /></th>
                    ) : (
                      <td key={i} className="px-4 py-3 text-text-2"><RichText text={cell} /></td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/**
 * The article body. Static by design: long-form copy never animates. The wrapper opts the
 * header progress bar into reading progress; only the h2 accent bar draws with scroll.
 */
/** The post's sections. `afterIntro` is placed right after the first section (the intro), `end` after the last one. */
export function PostBody({ post, afterIntro, end }: { post: Post; afterIntro?: ReactNode; end?: ReactNode }) {
  return (
    <div data-progress-article="" className="space-y-12">
      {post.sections.map((s, i) => (
        <Fragment key={s.id}>
          <section id={s.id} className="scroll-mt-28">
            <h2 className="h-rule text-balance text-2xl font-extrabold tracking-tight sm:text-3xl">{s.heading}</h2>
            <div className="mt-4 space-y-4 text-pretty text-[1.05rem] leading-8 text-text-2">
              {s.blocks.map((b, j) => <BlockView key={j} block={b} />)}
            </div>
          </section>
          {i === 0 ? afterIntro : null}
        </Fragment>
      ))}
      {end}
    </div>
  );
}

/**
 * In-article navigation. ScrollSpy marks the section being read with aria-current="location":
 * the link turns accent-ink and semibold, and a 2px indicator scales in on the rail.
 */
export function TableOfContents({ post, id }: { post: Post; id: string }) {
  return (
    <>
      <nav id={id} aria-label="Table of contents" className="rounded-3xl border border-hairline bg-white p-5 shadow-hair">
        <p className="text-sm font-bold">In this article</p>
        <ol className="mt-3 space-y-0.5 border-l border-hairline text-sm">
          {post.sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="relative -ml-px flex gap-2.5 rounded-r-lg py-1.5 pl-4 pr-1 text-text-2 before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:rounded-full before:bg-accent hover:text-text aria-[current=location]:font-semibold aria-[current=location]:text-accent-ink aria-[current=location]:before:scale-y-100 motion-ok:before:transition-[scale] motion-ok:before:duration-[var(--dur-2)] motion-ok:before:ease-glide"
              >
                <span aria-hidden="true" className="mt-px shrink-0 font-mono text-[11px] tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{s.heading}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <ScrollSpy navId={id} current="location" />
    </>
  );
}
