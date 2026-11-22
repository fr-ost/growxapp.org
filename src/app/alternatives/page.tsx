import Link from "next/link";
import { PostCard, formatPostDate } from "@/components/blog";
import { CtaBand } from "@/components/home/cta-band";
import { Faq } from "@/components/home/faq";
import { IconArrowRight, IconChrome } from "@/components/icons";
import { JsonLd, abs, breadcrumbLd, faqLd, webPageLd } from "@/components/json-ld";
import { stagger } from "@/components/motion/stagger";
import { RichText } from "@/components/rich-text";
import { ExternalButton, LinkButton } from "@/components/ui/button";
import { Container, PageHero, Section, SectionHeading } from "@/components/ui/primitives";
import { TRIAL_DAYS, getTier } from "@/config/pricing";
import { site } from "@/config/site";
import { CHECKED, alternativePages } from "@/content/alternatives";
import { getPost } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";

const description =
  "Compare GrowX with Tweet Hunter, Hypefury and Typefully: what each does well, where GrowX differs and who should pick which. Free to start, no password.";

export const metadata = pageMetadata({
  title: "X (Twitter) Tool Alternatives: GrowX Compared",
  description,
  path: "/alternatives",
  defaultImage: false,
  keywords: ["Tweet Hunter alternative", "Hypefury alternative", "Typefully alternative", "Twitter tool alternatives", "X growth tool comparison", "GrowX"],
});

const differences: { title: string; text: string }[] = [
  {
    title: "No X password, no X OAuth",
    text: "GrowX works inside the x.com tab you are already signed in to. It never asks for your X password, and your queue, history and analytics stay in Chrome's storage on your computer.",
  },
  {
    title: "AI that runs on your computer",
    text: "GrowX AI (Premium) uses the AI model built into Chrome. Your drafts are not sent to GrowX, there is no API key and no per-use fee. When the model isn't available, the buttons fall back to templates.",
  },
  {
    title: "Smart auto follow",
    text: "GrowX follows the newest followers of accounts in your niche, ranks everyone else by a follow-back score from 1 to 99 and works at a human pace with random delays, breaks and hourly and daily caps.",
  },
  {
    title: "Prepaid, no subscription",
    text: "A free plan forever, then Premium for 30 days, 365 days or lifetime, prepaid in crypto. Nothing renews by itself, and every Premium feature can be tried free for 30 days first.",
  },
];

const faqs = [
  {
    q: "Which X tools does GrowX replace?",
    a: "GrowX covers scheduling posts and threads, AI writing, post analytics, an unfollower tracker, reply targets, cleanup and smart auto follow in one Chrome extension. Many people still keep a separate writing app and use GrowX for growth.",
  },
  {
    q: "What does GrowX not do that web apps do?",
    a: "GrowX posts through your signed-in x.com tab, so Chrome must be running at the scheduled time. Web apps that post from their own servers can post while your computer is off. GrowX is also built only for X and runs in desktop Chrome 116 or newer.",
  },
  {
    q: "Are these comparisons fair?",
    a: "We say what each tool does well and only state facts our guides have checked. Where we are not sure, the table says Check their site. Products change, so confirm details on each tool's own website.",
  },
];

/** Hub for the "[tool] alternative" pages. */
export default function AlternativesPage() {
  const yearly = getTier("PRO_YEARLY");
  const guides = ["circleboom-alternatives", "hypefury-alternatives", "typefully-vs-tweet-hunter", "best-twitter-growth-tools"]
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/alternatives" },
          ]),
          webPageLd({
            path: "/alternatives",
            type: "CollectionPage",
            name: "GrowX compared with other X (Twitter) tools",
            description,
            extra: {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: alternativePages.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/alternatives/${a.slug}`), name: `${a.name} alternative` })),
              },
            },
          }),
          faqLd(faqs),
        ]}
      />

      <PageHero
        eyebrow="Alternatives"
        title={
          <>
            Looking for an alternative? <span className="text-gradient">Compare GrowX.</span>
          </>
        }
        actions={
          <>
            {site.chromeStoreUrl ? (
              <ExternalButton href={site.chromeStoreUrl} size="lg">
                <IconChrome size={20} /> Add to Chrome, free
              </ExternalButton>
            ) : null}
            <LinkButton href="/pricing" variant="secondary" size="lg">
              See pricing
            </LinkButton>
          </>
        }
      >
        <p>
          Fair, side-by-side comparisons of GrowX with popular X (Twitter) tools: what each one does well, where GrowX is different and who should pick
          which.
        </p>
      </PageHero>

      <Section className="pt-12 sm:pt-16">
        <Container>
          <SectionHeading eyebrow="Comparisons" title="Pick the tool you are comparing" center>
            Details about other tools last checked {formatPostDate(CHECKED)}. Products change, so confirm on their own sites.
          </SectionHeading>
          <ul data-spotlight-group="" className="mt-12 grid gap-5 md:grid-cols-3">
            {alternativePages.map((a, i) => (
              <li key={a.slug} className="reveal" style={stagger(i)}>
                <Link
                  href={`/alternatives/${a.slug}`}
                  data-spotlight=""
                  className="group lift flex h-full flex-col rounded-3xl border border-hairline bg-white p-6 shadow-[var(--shadow-hair)]"
                >
                  <h3 className="text-xl font-bold group-hover:text-accent-ink">{a.name} alternative</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-2">{a.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-ink">
                    {a.name} vs GrowX <IconArrowRight size={15} className="nudge" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* long-form copy: static */}
      <Section className="border-y border-hairline bg-surface-2">
        <Container className="max-w-[68ch]">
          <h2 className="h-rule text-2xl font-extrabold tracking-tight sm:text-3xl">What makes GrowX different</h2>
          <p className="mt-4 text-[1.05rem] leading-8 text-text-2">
            Most X tools are web apps for writing and scheduling. GrowX is a Chrome extension that does the daily work of growing an account, with a
            scheduler and an AI writer built in. Four differences come up in every comparison:
          </p>
          <div className="mt-8 space-y-8">
            {differences.map((d) => (
              <section key={d.title}>
                <h3 className="text-lg font-bold">{d.title}</h3>
                <p className="mt-2 text-[1.05rem] leading-8 text-text-2">{d.text}</p>
              </section>
            ))}
          </div>

          <h2 className="h-rule mt-14 text-2xl font-extrabold tracking-tight sm:text-3xl">How to choose an X tool</h2>
          <div className="mt-4 space-y-4 text-[1.05rem] leading-8 text-text-2 [text-wrap:pretty]">
            <p>Four honest questions usually settle it:</p>
            <ol className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-accent">
              <li>
                <RichText text="**Is your problem writing or reach?** If drafting is hard, a writing-first app helps. If you write fine but few people see it, you need growth: following the right people, replying early and posting at your best times." />
              </li>
              <li>
                <RichText text="**Do you post to several networks?** GrowX is built only for X. Tools that cover several networks fit people who publish the same ideas everywhere." />
              </li>
              <li>
                <RichText text="**Must posts go out while your computer is off?** Web apps that post from their servers can. GrowX posts from your own Chrome, so Chrome must be running at the time." />
              </li>
              <li>
                <RichText
                  text={`**What does a year cost?** Compare a full year, not one month. GrowX has a free plan forever and yearly Premium is ${yearly.priceLabel}, prepaid with no automatic renewal. For other tools, check their current pricing pages.`}
                />
              </li>
            </ol>
            <p>
              No tool can promise zero risk on X. GrowX slows down by itself after any warning from X and stops completely if your account needs attention.
              Start with the Safe or Balanced pace.
            </p>
          </div>

          <h2 className="h-rule mt-14 text-2xl font-extrabold tracking-tight sm:text-3xl">Try GrowX next to what you use now</h2>
          <div className="mt-4 space-y-4 text-[1.05rem] leading-8 text-text-2 [text-wrap:pretty]">
            <p>
              You don&apos;t have to switch everything at once. Install the free extension, keep your current tool for drafting, and add a few source
              accounts in your niche on the Safe or Balanced pace. Let only one tool post any given post, so nothing goes out twice.
            </p>
            <p>
              After two weeks, open Insights: which topics and formats worked, your best time to post, and who followed or unfollowed you. Every Premium
              feature can be tried free for {TRIAL_DAYS} days, no credit card. See{" "}
              <Link href="/features" className="font-semibold text-accent-ink underline-offset-4 hover:underline">
                all features
              </Link>{" "}
              and{" "}
              <Link href="/pricing" className="font-semibold text-accent-ink underline-offset-4 hover:underline">
                pricing
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="reveal-heading text-2xl font-extrabold tracking-tight">Comparison guides</h2>
          <ul data-spotlight-group="" className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {guides.map((p, i) => (
              <li key={p.slug} className="relative" style={stagger(i % 4)}>
                <PostCard post={p} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-hairline bg-surface-2">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="FAQ" title="Comparison questions" />
          </div>
          <div className="reveal">
            <Faq items={faqs} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
