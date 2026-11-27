import type { Metadata } from "next";
import { IntentLink } from "@/components/ui/intent-link";
import { notFound } from "next/navigation";
import { PostBody, PostCard, TableOfContents, formatPostDate } from "@/components/blog";
import { PostCover } from "@/components/blog/post-cover";
import { FeatureLinkCard } from "@/components/features/feature-card";
import { CtaBand } from "@/components/home/cta-band";
import { Faq } from "@/components/home/faq";
import { IconArrowRight, IconChrome, IconClock } from "@/components/icons";
import { JsonLd, ORG_ID, WEBSITE_ID, abs, authorLd, breadcrumbLd, faqLd } from "@/components/json-ld";
import { Backdrop } from "@/components/motion/backdrop";
import { BorderBeam } from "@/components/motion/border-beam";
import { stagger } from "@/components/motion/stagger";
import { CwsButton } from "@/components/cws-link";
import { LinkButton } from "@/components/ui/button";
import { Badge, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { getFeaturePage } from "@/content/feature-pages";
import { featuresForPost, toolForPost } from "@/content/post-features";
import { ExtensionCta } from "@/components/blog/extension-cta";
import { getPost, latestFirst, posts } from "@/content/posts";
import { toolNav } from "@/config/nav";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    defaultImage: false,
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  // Related guides: the post's own picks first, then the newest posts in the same category, three in all.
  const related = [...post.related.map((s) => getPost(s)), ...latestFirst().filter((p) => p.category === post.category)]
    .filter((p): p is NonNullable<typeof p> => !!p && p.slug !== post.slug)
    .filter((p, i, all) => all.findIndex((q) => q.slug === p.slug) === i)
    .slice(0, 3);
  const features = featuresForPost(post).map((s) => getFeaturePage(s)).filter((f): f is NonNullable<typeof f> => !!f);
  // The in-article call to action: the post's main feature page, one free tool and the store (after the intro, at the end).
  const mainFeature = features[0]?.slug ?? "twitter-auto-follow";
  const tool = toolForPost(post, features[0]?.tools[0]);
  const campaign = `blog-${post.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${abs(`/blog/${post.slug}`)}#article`,
            url: abs(`/blog/${post.slug}`),
            mainEntityOfPage: abs(`/blog/${post.slug}`),
            isPartOf: { "@id": WEBSITE_ID },
            headline: post.title,
            description: post.description,
            keywords: post.keywords.join(", "),
            image: abs(`/blog/${post.slug}/opengraph-image/card`),
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            inLanguage: "en",
            articleSection: post.category,
            author: authorLd,
            publisher: { "@id": ORG_ID },
          },
          ...(post.faq?.length ? [faqLd(post.faq)] : []),
        ]}
      />
      <article>
        <header className="relative overflow-clip border-b border-hairline">
          <Backdrop variant="page" beams={0} />
          <Container className="relative grid max-w-6xl items-end py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
            <div className="mx-auto w-full max-w-3xl">
              <nav aria-label="Breadcrumb" className="hero-settle mb-6 text-sm text-muted" style={stagger(0)}>
                <ol className="flex flex-wrap items-center gap-2">
                  <li><IntentLink href="/" className="hover:text-accent-ink">Home</IntentLink></li>
                  <li aria-hidden="true">/</li>
                  <li><IntentLink href="/blog" className="hover:text-accent-ink">Blog</IntentLink></li>
                </ol>
              </nav>
              <div className="hero-settle flex flex-wrap items-center gap-3" style={stagger(1)}>
                <Eyebrow>{post.category}</Eyebrow>
                <span className="flex items-center gap-1 text-sm tabular-nums text-muted"><IconClock size={14} /> {post.readMinutes} min read</span>
              </div>
              <h1 className="hero-settle mt-5 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl" style={stagger(2)}>{post.title}</h1>
              <p className="hero-settle mt-5 text-pretty text-lg leading-relaxed text-text-2" style={stagger(3)}>{post.excerpt}</p>
              <p className="hero-settle mt-6 text-sm text-muted" style={stagger(4)}>
                By <IntentLink href="/about" className="font-semibold text-text hover:text-accent-ink">{site.author}</IntentLink> ·{" "}
                <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time> · Updated{" "}
                <time dateTime={post.dateModified}>{formatPostDate(post.dateModified)}</time>
              </p>
            </div>
            <div className="hidden lg:block">
              <PostCover slug={post.slug} title={post.title} category={post.category} className="aspect-square rounded-3xl shadow-float ring-1 ring-hairline" />
            </div>
          </Container>
        </header>

        <Section className="pt-10 sm:pt-14">
          <Container className="grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-12 lg:hidden"><TableOfContents post={post} id="toc-mobile" /></div>
              <PostBody
                post={post}
                afterIntro={<ExtensionCta feature={mainFeature} campaign={campaign} placement="inline-cta" tool={tool} />}
                end={<ExtensionCta feature={mainFeature} campaign={campaign} placement="end-cta" tool={tool} />}
              />
              {post.faq?.length ? (
                <section id="faq" className="mt-14 scroll-mt-28">
                  <h2 className="h-rule text-2xl font-extrabold tracking-tight sm:text-3xl">Frequently asked questions</h2>
                  <div className="mt-6"><Faq items={post.faq} /></div>
                </section>
              ) : null}
              <div className="mt-14 flex flex-wrap gap-2">
                {post.keywords.map((k) => <Badge key={k}>{k}</Badge>)}
              </div>
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                <TableOfContents post={post} id="toc" />
                <div data-spotlight="ink" className="on-ink relative rounded-3xl bg-ink p-5 text-white">
                  <BorderBeam mode="scroll" tone="white" />
                  <p className="font-display text-lg font-extrabold leading-snug">Grow on X with GrowX</p>
                  <p className="mt-2 text-sm text-white/70">Auto follow, scheduler, AI writer and analytics in one free Chrome extension.</p>
                  <div className="mt-4 grid gap-2">
                    <CwsButton campaign={`blog-${post.slug}`} content="inline-cta" size="sm">
                      <IconChrome size={16} /> Add to Chrome
                    </CwsButton>
                    <LinkButton href="/signup" variant="white" size="sm">Start free</LinkButton>
                  </div>
                </div>
                <nav aria-label="Free tools" className="rounded-3xl border border-hairline bg-white p-5 shadow-hair">
                  <p className="text-sm font-bold">Free X tools</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {toolNav.map((t) => (
                      <li key={t.href}>
                        <IntentLink href={t.href} className="link-draw text-text-2 hover:text-accent-ink">{t.label}</IntentLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </Container>
        </Section>
      </article>

      {related.length ? (
        <Section className="bg-surface-2">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="reveal-heading h-rule text-2xl font-extrabold tracking-tight sm:text-3xl">Related guides</h2>
              <IntentLink href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-ink">
                All articles <IconArrowRight size={15} className="nudge" />
              </IntentLink>
            </div>
            <ul data-spotlight-group="" className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <li key={p.slug} className="relative" style={stagger(i % 3)}>
                  <PostCard post={p} headingLevel="h3" />
                </li>
              ))}
            </ul>
            {features.length ? (
              <>
                <h2 className="reveal-heading mt-14 text-xl font-extrabold tracking-tight sm:text-2xl">GrowX features for this</h2>
                <ul data-spotlight-group="" className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {features.map((f, i) => (
                    <li key={f.slug} className="reveal" style={stagger(i % 3)}>
                      <FeatureLinkCard href={`/features/${f.slug}`} icon={f.icon} label={f.nav} blurb={f.blurb} />
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </Container>
        </Section>
      ) : null}
      <CtaBand campaign={`blog-${post.slug}`} />
    </>
  );
}
