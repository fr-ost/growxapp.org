import Link from "next/link";
import { OfficialBadge } from "@/components/featured-on";
import { IconArrowRight, IconChrome } from "@/components/icons";
import { JsonLd, breadcrumbLd, webPageLd } from "@/components/json-ld";
import { stagger } from "@/components/motion/stagger";
import { ExternalButton, LinkButton } from "@/components/ui/button";
import { Container, PageHero, Section } from "@/components/ui/primitives";
import { site } from "@/config/site";
import { liveBadges } from "@/data/badges";
import { pageMetadata } from "@/lib/seo";

const description =
  "Launch sites and directories that list GrowX, the X (Twitter) growth extension for Chrome, with their official badges. Find GrowX there or add it free.";

export const metadata = pageMetadata({
  title: "GrowX Featured On: Directories and Launch Sites",
  description,
  path: "/featured",
  keywords: ["GrowX featured on", "GrowX directory listing", "GrowX launch", "X growth tool directory"],
});

/** Every live directory badge (verified, real slug, official HTML), each with a link to the listing or the directory. */
export default function FeaturedPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Featured on", path: "/featured" },
          ]),
          webPageLd({ path: "/featured", name: "GrowX featured on", description }),
        ]}
      />
      <PageHero
        eyebrow="Featured on"
        title={
          <>
            Where you can find <span className="text-gradient">GrowX.</span>
          </>
        }
        actions={
          <>
            {site.chromeStoreUrl ? (
              <ExternalButton href={site.chromeStoreUrl} size="lg">
                <IconChrome size={20} /> Add to Chrome, free
              </ExternalButton>
            ) : null}
            <LinkButton href="/" variant="secondary" size="lg">
              Back to home
            </LinkButton>
          </>
        }
      >
        <p>
          Product directories and launch sites that list GrowX. These are listings, not reviews or endorsements. Each badge links to the directory, as the
          directory asks.
        </p>
      </PageHero>

      <Section className="pt-10 sm:pt-14">
        <Container className="max-w-5xl">
          <ul data-spotlight-group="" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveBadges.map((b, i) => {
              const link = b.listingUrl ?? b.href;
              return (
                <li key={b.name} className="reveal" style={stagger(i % 3)}>
                  <div className="flex h-full flex-col gap-4 rounded-3xl border border-hairline bg-white p-6 shadow-[var(--shadow-hair)]">
                    <h2 className="text-lg font-bold">{b.name}</h2>
                    <OfficialBadge badge={b} className="min-h-14 items-center [&_img]:max-w-full" />
                    {link ? (
                      <a href={link} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent-ink underline-offset-4 hover:underline">
                        {b.listingUrl ? `GrowX on ${b.name}` : `Visit ${b.name}`} <IconArrowRight size={15} className="nudge" />
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 text-center text-sm text-text-2">
            Want to know what GrowX does first? See{" "}
            <Link href="/features" className="font-semibold text-accent-ink underline-offset-4 hover:underline">
              all features
            </Link>
            ,{" "}
            <Link href="/pricing" className="font-semibold text-accent-ink underline-offset-4 hover:underline">
              pricing
            </Link>{" "}
            or the{" "}
            <Link href="/" className="font-semibold text-accent-ink underline-offset-4 hover:underline">
              home page
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
