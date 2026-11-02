import { CtaBand } from "@/components/home/cta-band";
import { IconArrowRight, IconChrome } from "@/components/icons";
import { JsonLd, abs, breadcrumbLd, softwareLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { ExternalButton, LinkButton } from "@/components/ui/button";
import { Container, PageHero, Section } from "@/components/ui/primitives";
import { site } from "@/config/site";
import { CURRENT_VERSION, releases } from "@/content/releases";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `What's New in GrowX ${CURRENT_VERSION}: List Follow & More`,
  description: `What's new in GrowX ${CURRENT_VERSION}: List follow from a CSV, TXT or pasted names, calmer handling of X's daily follow limit, plus the full release notes.`,
  path: "/whats-new",
  keywords: ["GrowX update", "GrowX changelog", "GrowX release notes", "GrowX 2.4.6", "GrowX List follow", "what's new in GrowX"],
});

export default function WhatsNewPage() {
  const [latest, ...older] = releases;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Home", path: "/" }, { name: "What's new", path: "/whats-new" }]),
          { ...softwareLd, "@id": `${abs("/whats-new")}#software` },
        ]}
      />
      <PageHero
        eyebrow={`Version ${CURRENT_VERSION}`}
        title={<>What&apos;s new in <span className="text-gradient">GrowX</span></>}
        actions={
          <>
            {site.chromeStoreUrl ? (
              <ExternalButton href={site.chromeStoreUrl} size="lg">
                <IconChrome size={20} /> Get the update
              </ExternalButton>
            ) : null}
            <LinkButton href="/features/twitter-list-follow" variant="secondary" size="lg">
              See List follow <IconArrowRight size={17} className="nudge" />
            </LinkButton>
          </>
        }
      >
        <p>
          The latest improvements to the GrowX Chrome extension. Chrome updates extensions by itself; GrowX shows a What&apos;s new window once after
          each update.
        </p>
      </PageHero>

      <Section className="pt-4 sm:pt-6 lg:pt-8">
        <Container className="max-w-4xl space-y-8">
          <ReleaseCard release={latest} latest />
          {older.map((r) => (
            <ReleaseCard key={r.version} release={r} />
          ))}
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}

function ReleaseCard({ release, latest = false }: { release: (typeof releases)[number]; latest?: boolean }) {
  return (
    <article
      id={`v${release.version.replace(/\./g, "-")}`}
      aria-labelledby={`v${release.version.replace(/\./g, "-")}-h`}
      className={`scroll-mt-24 rounded-3xl border bg-white p-6 shadow-[var(--shadow-hair)] sm:p-8 ${latest ? "border-accent/30 shadow-[var(--shadow-soft)]" : "border-hairline"}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs font-bold text-white">v{release.version}</span>
        {latest ? <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-ink">Latest</span> : null}
      </div>
      <h2 id={`v${release.version.replace(/\./g, "-")}-h`} className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
        {release.title}
      </h2>
      <p className="mt-2 text-lg text-text-2">{release.intro}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {release.groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-ink">{g.title}</h3>
            <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-text-2">
              {g.items.map((it) => (
                <li key={it} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="[&_a]:font-semibold [&_a]:text-accent-ink [&_a:hover]:underline">
                    <RichText text={it} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
