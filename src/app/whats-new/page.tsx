import { CtaBand } from "@/components/home/cta-band";
import { IconArrowRight, IconChrome } from "@/components/icons";
import { JsonLd, breadcrumbLd, webPageLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { CwsButton } from "@/components/cws-link";
import { LinkButton } from "@/components/ui/button";
import { Container, PageHero, Section } from "@/components/ui/primitives";
import { CURRENT_VERSION, LANGUAGES, releases } from "@/content/releases";
import { pageMetadata } from "@/lib/seo";
import { formatPostDate } from "@/components/blog/format-date";

/** Title, description and H1 come from the latest release entry, so they follow every release by themselves. */
const latestRelease = releases[0];
const fullTitle = `What's New in GrowX ${latestRelease.version}: ${latestRelease.title}`;
export const whatsNewTitle = fullTitle.length <= 60 ? fullTitle : `What's New in GrowX ${latestRelease.version}`;
export const whatsNewDescription = `GrowX ${latestRelease.version} release notes: ${latestRelease.title}. Every version of the Chrome extension, newest first, with its date and a short summary.`;

export const metadata = pageMetadata({
  title: whatsNewTitle,
  description: whatsNewDescription,
  path: "/whats-new",
  defaultImage: false,
  keywords: ["GrowX update", "GrowX changelog", "GrowX release notes", `GrowX ${CURRENT_VERSION}`, "GrowX AI Creator Studio", "GrowX Growth Score", "who followed back on X", "GrowX AI Reply Assistant", "what's new in GrowX"],
});

export default function WhatsNewPage() {
  const [latest, ...older] = releases;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Home", path: "/" }, { name: "What's new", path: "/whats-new" }]),
          webPageLd({ path: "/whats-new", name: `What's new in GrowX ${CURRENT_VERSION}`, description: "Release notes for the GrowX Chrome extension, newest first." }),
        ]}
      />
      <PageHero
        eyebrow={`Version ${latest.version} · ${formatPostDate(latest.date)}`}
        title={
          <>
            What&apos;s new in GrowX {latest.version}: <span className="text-gradient">{latest.title}</span>
          </>
        }
        actions={
          <>
            <CwsButton campaign="whats-new" content="hero" size="lg">
              <IconChrome size={20} /> Get the update
            </CwsButton>
            <LinkButton href="/features/twitter-analytics" variant="secondary" size="lg">
              See the new analytics <IconArrowRight size={17} className="nudge" />
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
          <nav aria-labelledby="versions-h" className="rounded-3xl border border-hairline bg-white p-6 shadow-[var(--shadow-hair)] sm:p-8">
            <h2 id="versions-h" className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Every version, newest first
            </h2>
            <ol className="mt-4 divide-y divide-hairline" data-testid="version-list">
              {releases.map((r) => (
                <li key={r.version} className="py-3 text-[0.95rem] leading-relaxed text-text-2">
                  <a href={`#${anchor(r.version)}`} className="font-semibold text-text hover:text-accent-ink">
                    GrowX {r.version}: {r.title}
                  </a>{" "}
                  <time dateTime={r.date} className="whitespace-nowrap text-sm tabular-nums text-muted">
                    ({formatPostDate(r.date)})
                  </time>
                  <span className="mt-0.5 block">{r.intro}</span>
                </li>
              ))}
            </ol>
          </nav>
          <ReleaseCard release={latest} latest />
          <section id="languages" aria-labelledby="languages-h" className="scroll-mt-24 rounded-3xl border border-hairline bg-surface-2 p-6 sm:p-8">
            <h2 id="languages-h" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              GrowX in {LANGUAGES.length} languages
            </h2>
            <p className="mt-2 text-text-2">
              GrowX picks your browser&apos;s language by itself. To choose another, open Settings, Appearance in the GrowX dashboard.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" data-testid="language-list">
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <span
                    lang={l.code}
                    dir={l.code === "ar" ? "rtl" : undefined}
                    title={l.english}
                    className="inline-flex items-center rounded-full border border-hairline-strong bg-white px-3.5 py-1.5 text-sm font-semibold text-text"
                  >
                    {l.native}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          {older.map((r) => (
            <ReleaseCard key={r.version} release={r} />
          ))}
        </Container>
      </Section>
      <CtaBand campaign="whats-new" />
    </>
  );
}

const anchor = (version: string) => `v${version.replace(/\./g, "-")}`;

function ReleaseCard({ release, latest = false }: { release: (typeof releases)[number]; latest?: boolean }) {
  return (
    <article
      id={anchor(release.version)}
      aria-labelledby={`${anchor(release.version)}-h`}
      className={`scroll-mt-24 rounded-3xl border bg-white p-6 shadow-[var(--shadow-hair)] sm:p-8 ${latest ? "border-accent/30 shadow-[var(--shadow-soft)]" : "border-hairline"}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs font-bold text-white">v{release.version}</span>
        {latest ? <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-ink">Latest</span> : null}
        <time dateTime={release.date} className="text-sm tabular-nums text-muted">
          {formatPostDate(release.date)}
        </time>
      </div>
      <h2 id={`${anchor(release.version)}-h`} className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
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
