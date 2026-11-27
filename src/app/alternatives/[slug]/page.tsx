import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonTable } from "@/components/alternatives/comparison-table";
import { PostCard, formatPostDate } from "@/components/blog";
import { FeatureLinkCard } from "@/components/features/feature-card";
import { CtaBand } from "@/components/home/cta-band";
import { Faq } from "@/components/home/faq";
import { IconArrowRight, IconCheck, IconChrome } from "@/components/icons";
import { JsonLd, breadcrumbLd, faqLd, webPageLd } from "@/components/json-ld";
import { stagger } from "@/components/motion/stagger";
import { RichText } from "@/components/rich-text";
import { CwsButton } from "@/components/cws-link";
import { LinkButton } from "@/components/ui/button";
import { Container, PageHero, Section, SectionHeading } from "@/components/ui/primitives";
import { TRIAL_DAYS } from "@/config/pricing";
import { CHECKED, CHECK_THEIR_SITE, GROWX_PRICES_CHECKED, alternativePages, getAlternative } from "@/content/alternatives";
import { getFeaturePage } from "@/content/feature-pages";
import { getPost } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return alternativePages.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getAlternative((await params).slug);
  if (!page) return {};
  return pageMetadata({ title: page.seoTitle, description: page.description, path: `/alternatives/${page.slug}`, defaultImage: false, keywords: page.keywords });
}

function Prose({ text }: { text: string }) {
  return (
    <p>
      <RichText text={text} />
    </p>
  );
}

/** A fair "[tool] alternative" page: what the other tool does well, where GrowX differs, a table and who should pick which. No review markup. */
export default async function AlternativePage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getAlternative((await params).slug);
  if (!page) notFound();
  const path = `/alternatives/${page.slug}`;
  const posts = page.relatedPosts.map((s) => getPost(s)).filter((p): p is NonNullable<typeof p> => !!p);
  const features = page.relatedFeatures.map((s) => getFeaturePage(s)).filter((f): f is NonNullable<typeof f> => !!f);
  const others = alternativePages.filter((a) => a.slug !== page.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/alternatives" },
            { name: `${page.name} alternative`, path },
          ]),
          webPageLd({ path, name: page.h1, description: page.description, extra: { mentions: { "@type": "Thing", name: page.name } } }),
          faqLd(page.faq),
        ]}
      />

      <PageHero
        eyebrow={`${page.name} alternative`}
        title={page.h1}
        actions={
          <>
            <CwsButton campaign={`alt-${page.slug}`} content="hero" size="lg">
              <IconChrome size={20} /> Add to Chrome, free
            </CwsButton>
            <LinkButton href="/signup" variant="secondary" size="lg">
              Try Premium free for {TRIAL_DAYS} days
            </LinkButton>
          </>
        }
      >
        <p>{page.lead}</p>
        <p className="mt-4 text-sm text-muted">
          <Link href="/alternatives" className="font-semibold text-accent-ink underline-offset-4 hover:underline">
            All comparisons
          </Link>{" "}
          · Details about {page.name} last checked {formatPostDate(CHECKED)}. Products change, so check {page.site} too.
        </p>
      </PageHero>

      {/* SHORT ANSWER + STRENGTHS (long-form copy: static) */}
      <Section className="pt-12 sm:pt-16">
        <Container className="max-w-[68ch]">
          <h2 className="h-rule text-2xl font-extrabold tracking-tight sm:text-3xl">The short answer</h2>
          <div className="mt-4 space-y-4 text-[1.05rem] leading-8 text-text-2 [text-wrap:pretty]">
            {page.summary.map((t) => (
              <Prose key={t} text={t} />
            ))}
          </div>

          <h2 className="h-rule mt-14 text-2xl font-extrabold tracking-tight sm:text-3xl">What {page.name} does well</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[1.05rem] leading-8 text-text-2 marker:text-accent">
            {page.theyDoWell.map((t) => (
              <li key={t}>
                <RichText text={t} />
              </li>
            ))}
          </ul>

          <h2 className="h-rule mt-14 text-2xl font-extrabold tracking-tight sm:text-3xl">Where GrowX is different</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[1.05rem] leading-8 text-text-2 marker:text-accent">
            {page.growxDiffers.map((t) => (
              <li key={t}>
                <RichText text={t} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* TABLE */}
      <Section className="border-y border-hairline bg-surface-2">
        <Container className="max-w-5xl">
          <SectionHeading eyebrow="Side by side" title={`${page.name} vs GrowX`} center>
            Where our guides could not confirm a detail, the table says &ldquo;{CHECK_THEIR_SITE}&rdquo; rather than guess. Their own site has
            the current answer.
          </SectionHeading>
          <div className="reveal mt-10">
            <ComparisonTable name={page.name} rows={page.table} caption={`${page.name} and GrowX compared`} />
          </div>
          <p className="mt-4 text-center text-sm text-muted">
            {page.theirPricesChecked ? (
              <>
                Prices checked on <time dateTime={page.theirPricesChecked}>{formatPostDate(page.theirPricesChecked)}</time> ·{" "}
              </>
            ) : (
              <>
                GrowX prices checked on <time dateTime={GROWX_PRICES_CHECKED}>{formatPostDate(GROWX_PRICES_CHECKED)}</time>. For{" "}
                {page.name}&apos;s current prices, see{" "}
              </>
            )}
            <a
              href={page.pricingUrl}
              target="_blank"
              rel="nofollow noopener"
              className="font-semibold text-accent-ink underline-offset-4 hover:underline"
            >
              {page.name} pricing<span className="sr-only"> (opens in a new tab)</span>
            </a>
            {page.theirPricesChecked ? " · " : ". "}
            GrowX details from our{" "}
            <Link href="/whats-new" className="underline-offset-2 hover:underline">
              release notes
            </Link>{" "}
            and{" "}
            <Link href="/pricing" className="underline-offset-2 hover:underline">
              pricing
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* WHO SHOULD PICK WHICH */}
      <Section>
        <Container className="max-w-5xl">
          <SectionHeading eyebrow="Choose" title="Who should pick which" center />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="h-full rounded-3xl border border-hairline bg-white p-7 shadow-[var(--shadow-hair)]">
              <h3 className="text-lg font-bold">When to choose {page.name} instead</h3>
              <ul className="reveal mt-5 space-y-3 text-sm text-text-2" style={stagger(0)}>
                {page.pickThem.map((t) => (
                  <li key={t} className="flex gap-2">
                    <IconCheck size={18} className="shrink-0 text-muted" /> <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-full rounded-3xl border border-accent/25 bg-white p-7 shadow-[var(--shadow-float)]">
              <h3 className="text-lg font-bold">When to choose GrowX</h3>
              <ul className="reveal mt-5 space-y-3 text-sm text-text-2" style={stagger(1)}>
                {page.pickGrowx.map((t) => (
                  <li key={t} className="flex gap-2">
                    <IconCheck size={18} className="shrink-0 text-accent" /> <span>{t}</span>
                  </li>
                ))}
              </ul>
              <LinkButton href="/pricing" variant="secondary" className="mt-7 w-full">
                See GrowX plans <IconArrowRight size={16} className="nudge" />
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* DEEP DIVE (long-form copy: static) */}
      <Section className="border-t border-hairline">
        <Container className="max-w-[68ch]">
          <div className="space-y-14">
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="h-rule text-2xl font-extrabold tracking-tight [text-wrap:balance] sm:text-3xl">{s.heading}</h2>
                <div className="mt-4 space-y-4 text-[1.05rem] leading-8 text-text-2 [text-wrap:pretty]">
                  {s.paragraphs.map((t) => (
                    <Prose key={t} text={t} />
                  ))}
                  {s.bullets?.length ? (
                    <ul className="list-disc space-y-2 pl-6 marker:text-accent">
                      {s.bullets.map((b) => (
                        <li key={b}>
                          <RichText text={b} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {s.steps?.length ? (
                    <ol className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-accent">
                      {s.steps.map((b) => (
                        <li key={b}>
                          <RichText text={b} />
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-hairline bg-surface-2">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="FAQ" title={`${page.name} alternative: questions`} />
          </div>
          <div className="reveal">
            <Faq items={page.faq} />
          </div>
        </Container>
      </Section>

      {/* MORE */}
      <Section>
        <Container>
          <h2 className="reveal-heading text-2xl font-extrabold tracking-tight">GrowX features in this comparison</h2>
          <ul data-spotlight-group="" className="mt-6 grid gap-4 md:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.slug} className="reveal" style={stagger(i % 3)}>
                <FeatureLinkCard href={`/features/${f.slug}`} icon={f.icon} label={f.nav} blurb={f.blurb} />
              </li>
            ))}
          </ul>
          <h2 className="reveal-heading mt-14 text-2xl font-extrabold tracking-tight">Related guides</h2>
          <ul data-spotlight-group="" className="mt-6 grid gap-6 md:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.slug} className="relative" style={stagger(i % 3)}>
                <PostCard post={p} headingLevel="h3" />
              </li>
            ))}
          </ul>
          <h2 className="reveal-heading mt-14 text-2xl font-extrabold tracking-tight">More comparisons</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <LinkButton href={`/alternatives/${o.slug}`} variant="secondary">
                  {o.name} alternative <IconArrowRight size={16} className="nudge" />
                </LinkButton>
              </li>
            ))}
            <li>
              <LinkButton href="/alternatives" variant="ghost">
                All comparisons
              </LinkButton>
            </li>
          </ul>
        </Container>
      </Section>

      <CtaBand campaign={`alt-${page.slug}`} />
    </>
  );
}
