import Image from "next/image";
import { CtaBand } from "@/components/home/cta-band";
import { IconDownload, IconMail } from "@/components/icons";
import { JsonLd, breadcrumbLd, webPageLd } from "@/components/json-ld";
import { stagger } from "@/components/motion/stagger";
import { CopyButton } from "@/components/tools/ui";
import { Container, PageHero, Section, SectionHeading } from "@/components/ui/primitives";
import { PLAN_SUMMARY, pricingTiers, TRIAL_DAYS } from "@/config/pricing";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LANGUAGES, releases } from "@/content/releases";
import { lastModifiedFor } from "@/app/sitemap";
import { formatPostDate } from "@/components/blog/format-date";
import { CwsLink } from "@/components/cws-link";
import { CWS_ID } from "@/lib/cws";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = pageMetadata({
  title: "GrowX at a Glance: Fact Sheet and Press Kit",
  description: "GrowX at a glance: what the Chrome extension for X (Twitter) does, who makes it, the version, plans and prices, how its AI works, privacy, safety and press assets.",
  path: "/press",
  defaultImage: false,
  keywords: ["GrowX press kit", "GrowX logo", "GrowX screenshots", "about GrowX", "X growth tool press"],
});

/** The one-line description is the canonical definition (src/config/site.ts), said the same way everywhere. */
const oneLine = site.definition;
const short = `GrowX is the all-in-one X (Twitter) growth tool for Chrome. It follows people likely to follow you back at a safe, human pace, schedules posts and threads for your best times, writes with an AI that runs on your own computer, and shows which posts bring followers and who unfollowed you. Free plan forever, with a ${TRIAL_DAYS}-day Premium trial and no credit card.`;
const long = `GrowX is an independent Chrome extension, built by ${site.author}, that brings the daily work of growing an X (Twitter) account into one dashboard. Its smart auto follow reads the newest followers of accounts in your niche, scores every candidate for follow-back likelihood and follows one account at a time with random delays, breaks, rolling caps and an automatic slow-down after any warning from X. A post and thread scheduler with queue slots and a best-time heat map keeps you posting consistently; the GrowX AI writer suggests ideas, hooks and threads using the AI model built into Chrome, so drafts never leave your computer. Analytics shows who followed you back after GrowX followed them, a Growth Score from your own numbers, every post's numbers, the topics and formats that work, and who followed or unfollowed you, while the AI Reply Assistant surfaces fresh posts in your niche to reply to early and, with Premium, drafts replies you approve, also through tone buttons beside X's own reply box. GrowX works inside your own signed-in x.com session and never asks for your X password. The free plan stays free; Premium starts at $1.99 for 30 days, with a ${TRIAL_DAYS}-day free trial.`;

const shots = [
  { src: "/screens/overview-251.webp", name: "Dashboard and popup" },
  { src: "/screens/grow-251.webp", name: "Grow: sources and pace" },
  { src: "/screens/studio-251.webp", name: "AI Creator Studio: composer and GrowX AI" },
  { src: "/screens/analytics-251.webp", name: "Analytics: posts and best time" },
  { src: "/screens/followers-251.webp", name: "Analytics: new followers and unfollowers" },
  { src: "/screens/marquee.webp", name: "Promo banner (1400 x 560)" },
];

/** Used only if the page has no date in src/content/page-dates.json yet. */
const FALLBACK_UPDATED = "2026-11-27";

const badge = `<a href="${site.url}/" title="GrowX: The Ultimate X (Twitter) Growth Tool"><img src="${site.url}/badges/growx-badge.svg" alt="Grow on X with GrowX" width="220" height="56"></a>`;
const textLink = `<a href="${site.url}/">GrowX, the X (Twitter) growth tool</a>`;

export default function PressPage() {
  const updated = lastModifiedFor("/press") ?? FALLBACK_UPDATED;
  const latest = releases[0];
  const premium = pricingTiers
    .filter((t) => t.priceCents)
    .map((t) => `${t.name}: ${t.priceLabel} ${t.cadence}${t.earlyBird ? ` (${t.earlyBird.priceLabel} for the first ${t.earlyBird.limit} lifetime buyers)` : ""}`);
  const linkCls = "font-semibold text-accent-ink underline-offset-4 hover:underline";
  /** The fact sheet. Every value comes from the site's own config and copy; an unknown value (TODO) hides its row. */
  const facts: { label: string; value: ReactNode; show?: boolean }[] = [
    { label: "What it is", value: site.definition },
    { label: "Who makes it", value: <>{site.author}, an independent developer. <Link href="/about" className={linkCls}>About GrowX</Link></> },
    { label: "Not to be confused with", value: site.disambiguation },
    { label: "Website", value: <a href={site.url} className={linkCls}>{site.url.replace("https://", "")}</a> },
    {
      label: "Chrome Web Store",
      value: (
        <>
          <CwsLink campaign="press" content="inline-cta" className={linkCls}>
            {site.name}: {site.tagline}
          </CwsLink>{" "}
          (extension ID <code className="font-mono text-xs">{CWS_ID}</code>)
        </>
      ),
    },
    { label: "Current version", value: <>{latest.version}, {formatPostDate(latest.date)}. <Link href="/whats-new" className={linkCls}>Release notes</Link></> },
    { label: "Launched", value: site.launchDate ? formatPostDate(site.launchDate) : "", show: !!site.launchDate },
    { label: "Platforms", value: "Desktop Chrome 116 or newer, on Windows, macOS, Linux and ChromeOS. Chrome must be running for scheduled posts and the autopilot." },
    { label: "Languages", value: `${LANGUAGES.length} languages in the extension: ${LANGUAGES.map((l) => l.english).join(", ")}. It picks the browser's language.` },
    { label: "Main features", value: "Smart auto follow, List follow, a post and thread scheduler, the GrowX AI writer, the AI Reply Assistant, analytics with a Growth Score, an unfollower tracker and cleanup." },
    { label: "Free plan", value: PLAN_SUMMARY.FREE },
    {
      label: "Premium",
      value: (
        <>
          {premium.join("; ")}. Prepaid in crypto, never renews by itself. A {TRIAL_DAYS}-day Premium trial, no credit card. <Link href="/pricing" className={linkCls}>Pricing</Link>
        </>
      ),
    },
    { label: "How the AI works", value: "GrowX AI (Premium) runs on your computer with the AI model built into Chrome. There is no API key, and drafts are not sent to GrowX." },
    { label: "Privacy", value: <>GrowX works inside the x.com tab you are already signed in to and never asks for your X password. Your queue, history and analytics stay in your browser. <Link href="/privacy" className={linkCls}>Privacy policy</Link></> },
    { label: "Safety", value: "A human pace: random delays, breaks, hourly and daily caps, a slow-down after any warning from X and an emergency stop. Safety is never paywalled. No tool can promise zero risk." },
    { label: "Support", value: <a href={`mailto:${site.supportEmail}`} className={linkCls}>{site.supportEmail}</a> },
    { label: "Logo and screenshots", value: <a href="#brand-assets" className={linkCls}>Download them below</a> },
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Home", path: "/" }, { name: "Press kit", path: "/press" }]),
          webPageLd({
            path: "/press",
            name: "GrowX at a glance: fact sheet and press kit",
            description: "Facts about GrowX, the Chrome extension for X (Twitter), with logos, screenshots and descriptions.",
            extra: { dateModified: updated },
          }),
        ]}
      />
      <PageHero eyebrow="Fact sheet and press kit" title={<>GrowX <span className="text-gradient">at a glance</span></>}>
        <p>{site.definition}</p>
        <p className="mt-3 text-base">{site.disambiguation}</p>
        <p className="mt-3">
          Logos, screenshots, descriptions and facts, ready to use. Questions or interview requests:{" "}
          <a className="link-draw font-semibold text-accent-ink" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-muted">
          Last updated <time dateTime={updated}>{formatPostDate(updated)}</time>
        </p>
      </PageHero>

      <Section className="pt-10 sm:pt-12">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Fact sheet" title="Facts about GrowX" />
          <div className="reveal mt-8 overflow-x-auto rounded-3xl border border-hairline bg-white shadow-hair">
            <table className="w-full border-separate border-spacing-0 text-left text-sm">
              <caption className="sr-only">GrowX fact sheet</caption>
              <tbody className="[&_tr+tr>*]:border-t [&_tr+tr>*]:border-hairline">
                {facts
                  .filter((f) => f.show !== false)
                  .map((f) => (
                    <tr key={f.label} className="align-top">
                      <th scope="row" className="w-44 px-5 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                        {f.label}
                      </th>
                      <td className="px-5 py-3.5 leading-relaxed text-text">{f.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Descriptions" title="Copy and paste" />
          <div className="mt-8 space-y-4">
            {[
              ["One line", oneLine],
              ["Short (about 60 words)", short],
              ["Long (about 170 words)", long],
            ].map(([k, v]) => (
              <div key={k} className="reveal rounded-3xl border border-border bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-bold">{k}</h3>
                  <CopyButton value={v} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-2">{v}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface-2" id="brand-assets">
        <Container>
          <SectionHeading eyebrow="Brand assets" title="Logo, badge and screenshots" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/logo.svg", name: "Logo (SVG)", w: 72, h: 72 },
              { src: "/icon.png", name: "Icon (PNG, 128 x 128)", w: 72, h: 72 },
              { src: "/badges/growx-badge.svg", name: "Badge (SVG)", w: 140, h: 36 },
            ].map((a, i) => (
              <li key={a.src} className="reveal lift flex items-center gap-5 rounded-3xl border border-hairline bg-white p-5 shadow-hair" style={stagger(i % 3)}>
                <div
                  data-tilt="3"
                  className="grid h-24 w-40 shrink-0 place-items-center rounded-2xl ring-1 ring-hairline-strong [background:repeating-conic-gradient(#f1ecee_0_25%,#fff_0_50%)_0_0/16px_16px]"
                >
                  <Image src={a.src} alt={`GrowX ${a.name}`} width={a.w} height={a.h} className="rounded-2xl" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold">{a.name}</p>
                  <a href={a.src} download className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink">
                    <IconDownload size={15} /> <span className="link-draw">Download</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shots.map((s, i) => (
              <li key={s.src} className="reveal lift group overflow-clip rounded-3xl border border-hairline bg-white shadow-hair" style={stagger(i % 3)}>
                <div className="relative overflow-clip border-b border-hairline bg-surface-2">
                  <Image
                    src={s.src}
                    alt={`GrowX screenshot: ${s.name} (demo data)`}
                    width={640}
                    height={280}
                    className="h-auto w-full fx:transition-[scale] fx:duration-500 fx:ease-glide fx:group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 360px, 100vw"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-0.5 font-mono text-[11px] font-semibold text-text-2 shadow-hair ring-1 ring-hairline-strong"
                  >
                    demo data
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <p className="text-sm font-bold">{s.name}</p>
                  <a href={s.src} download className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink">
                    <IconDownload size={15} /> <span className="link-draw">WebP</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">Screenshots show demo data. Please do not present their numbers as real results.</p>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Linking to GrowX" title="Link or add the badge" center>
            Please link to the home page or the most relevant feature page. Thank you for mentioning GrowX.
          </SectionHeading>
          <div className="mt-10 space-y-4">
            {[
              ["Text link (HTML)", textLink],
              ["Badge (HTML)", badge],
            ].map(([k, v]) => (
              <div key={k} className="reveal rounded-3xl border border-hairline bg-white p-5 shadow-hair">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-bold">{k}</h3>
                  <CopyButton value={v} label="Copy code" />
                </div>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all rounded-2xl bg-surface-2 p-4 font-mono text-xs leading-relaxed text-text-2 ring-1 ring-hairline">{v}</pre>
              </div>
            ))}
          </div>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-text-2">
            <IconMail size={16} className="text-accent-ink" /> Press and partnerships:{" "}
            <a className="link-draw font-semibold text-accent-ink" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
          </p>
        </Container>
      </Section>
      <CtaBand campaign="press" />
    </>
  );
}
