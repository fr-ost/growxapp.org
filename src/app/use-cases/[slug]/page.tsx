import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog";
import { formatPostDate } from "@/components/blog/format-date";
import { FeatureLinkCard } from "@/components/features/feature-card";
import { CtaBand } from "@/components/home/cta-band";
import { Faq } from "@/components/home/faq";
import { IconArrowRight, IconChrome } from "@/components/icons";
import { JsonLd, breadcrumbLd, faqLd, webPageLd } from "@/components/json-ld";
import { stagger } from "@/components/motion/stagger";
import { RichText } from "@/components/rich-text";
import { CwsButton } from "@/components/cws-link";
import { TrustStrip } from "@/components/trust-strip";
import { LinkButton } from "@/components/ui/button";
import { IntentLink } from "@/components/ui/intent-link";
import { Container, PageHero, Section, SectionHeading } from "@/components/ui/primitives";
import { toolNav } from "@/config/nav";
import { TRIAL_DAYS } from "@/config/pricing";
import { featurePages } from "@/content/feature-pages";
import { getPost } from "@/content/posts";
import { getUseCase, useCases } from "@/content/use-cases";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const u = getUseCase((await params).slug);
  if (!u) return {};
  return pageMetadata({ title: u.seoTitle, description: u.description, path: `/use-cases/${u.slug}`, keywords: u.keywords, defaultImage: false });
}

/** A use-case page: how one kind of account grows on X with GrowX (content: src/content/use-cases.ts). */
export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const u = getUseCase((await params).slug);
  if (!u) notFound();
  const path = `/use-cases/${u.slug}`;
  const campaign = `use-case-${u.slug}`;
  const features = u.features.map((s) => featurePages.find((f) => f.slug === s)).filter((f): f is NonNullable<typeof f> => !!f);
  const tools = u.tools.map((href) => toolNav.find((t) => t.href === href)).filter((t): t is NonNullable<typeof t> => !!t);
  const posts = u.posts.map((s) => getPost(s)).filter((p): p is NonNullable<typeof p> => !!p);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Use cases", path: "/use-cases" },
            { name: u.nav, path },
          ]),
          webPageLd({ path, name: u.h1, description: u.description, extra: { dateModified: u.dateModified } }),
          faqLd(u.faq),
        ]}
      />
      <PageHero
        eyebrow={u.eyebrow}
        title={u.h1}
        actions={
          <>
            <CwsButton campaign={campaign} content="hero" size="lg">
              <IconChrome size={20} /> Add to Chrome, free
            </CwsButton>
            <LinkButton href="/signup" variant="secondary" size="lg">
              Try Premium free for {TRIAL_DAYS} days
            </LinkButton>
          </>
        }
      >
        <p>
          <RichText text={u.answer} />
        </p>
        <TrustStrip campaign={campaign} className="mt-4" />
        <p className="mt-2 text-sm text-muted">
          Updated <time dateTime={u.dateModified}>{formatPostDate(u.dateModified)}</time>
        </p>
      </PageHero>

      <Section className="pt-4 sm:pt-6">
        <Container className="max-w-3xl space-y-12">
          {u.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
              <h2 id={`${s.id}-h`} className="reveal-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[1.05rem] leading-8 text-text-2 [&_a]:font-semibold [&_a]:text-accent-ink [&_a:hover]:underline">
                {s.paragraphs.map((p) => (
                  <p key={p}>
                    <RichText text={p} />
                  </p>
                ))}
                {s.bullets ? (
                  <ul className="list-disc space-y-2 pl-6 marker:text-accent">
                    {s.bullets.map((b) => (
                      <li key={b}>
                        <RichText text={b} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </Container>
      </Section>

      <Section className="bg-surface-2">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Your plan" title="How to do it with GrowX" />
          <ol className="mt-8 space-y-4">
            {u.workflow.map((w, i) => (
              <li key={w.title} className="reveal flex gap-4 rounded-3xl border border-hairline bg-white p-5 shadow-hair" style={stagger(i)}>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm font-bold text-white">{i + 1}</span>
                <span>
                  <span className="block font-bold">{w.title}</span>
                  <span className="mt-1 block text-text-2 [&_a]:font-semibold [&_a]:text-accent-ink">
                    <RichText text={w.text} />
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Features" title="The GrowX features this uses" center />
          <ul data-spotlight-group="" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <li key={f.slug} className="reveal" style={stagger(i % 3)}>
                <FeatureLinkCard href={`/features/${f.slug}`} icon={f.icon} label={f.nav} blurb={f.blurb} />
              </li>
            ))}
          </ul>
          {tools.length ? (
            <p className="mt-8 text-center text-text-2">
              Free tools that help:{" "}
              {tools.map((t, i) => (
                <span key={t.href}>
                  {i ? ", " : ""}
                  <IntentLink href={t.href} className="font-semibold text-accent-ink underline-offset-4 hover:underline">
                    {t.label}
                  </IntentLink>
                </span>
              ))}
              .
            </p>
          ) : null}
        </Container>
      </Section>

      <Section className="bg-surface-2">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Questions" center />
          <div className="reveal mt-10">
            <Faq items={u.faq} />
          </div>
        </Container>
      </Section>

      {posts.length ? (
        <Section>
          <Container>
            <SectionHeading eyebrow="Guides" title="Read next" center />
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} headingLevel="h3" />
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center">
              <IntentLink href="/use-cases" className="inline-flex items-center gap-1 font-semibold text-accent-ink">
                All use cases <IconArrowRight size={15} className="nudge" />
              </IntentLink>
            </p>
          </Container>
        </Section>
      ) : null}
      <CtaBand campaign={campaign} />
    </>
  );
}
