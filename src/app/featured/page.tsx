import Link from "next/link";
import { DIRECTORY_REL, OfficialBadge } from "@/components/featured-on";
import { IconArrowRight, IconChrome } from "@/components/icons";
import { JsonLd, breadcrumbLd, webPageLd } from "@/components/json-ld";
import { stagger } from "@/components/motion/stagger";
import { CwsButton } from "@/components/cws-link";
import { LinkButton } from "@/components/ui/button";
import { Container, PageHero, Section } from "@/components/ui/primitives";
import { TRIAL_DAYS } from "@/config/pricing";
import { liveBadges } from "@/data/badges";
import { pageMetadata } from "@/lib/seo";
import { CwsLink } from "@/components/cws-link";

const description =
  "Launch sites and directories that list GrowX, the X (Twitter) growth extension for Chrome, with their official badges. Find GrowX there or add it free.";

export const metadata = pageMetadata({
  title: "GrowX Featured On: Directories and Launch Sites",
  description,
  path: "/featured",
  defaultImage: false,
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
          webPageLd({ path: "/featured", name: "GrowX Featured On: Directories, Launch Platforms & Reviews", description }),
        ]}
      />
      <PageHero
        eyebrow="Featured on"
        title={
          <>
            GrowX Featured On: <span className="text-gradient">Directories, Launch Platforms &amp; Reviews</span>
          </>
        }
        actions={
          <>
            <CwsButton campaign="featured" content="hero" size="lg">
              <IconChrome size={20} /> Add to Chrome, free
            </CwsButton>
            <LinkButton href="/" variant="secondary" size="lg">
              Back to home
            </LinkButton>
          </>
        }
      >
        <p>Product directories, launch platforms and review sites that list GrowX, each with its official badge.</p>
      </PageHero>

      <Section className="pb-0 pt-10 sm:pt-12">
        <Container className="max-w-[68ch] space-y-4 text-[1.05rem] leading-8 text-text-2 [text-wrap:pretty]">
          <p>
            GrowX is a Chrome extension for growing on X (Twitter). Besides its page on the{" "}
            <CwsLink campaign="featured" content="inline-cta" className="font-semibold text-accent-ink underline-offset-4 hover:underline">
              Chrome Web Store
            </CwsLink>
            , it is listed on the {liveBadges.length} product directories and launch platforms below. Each entry shows the site&apos;s own badge, with a link to the
            listing or to the site itself.
          </p>
          <p>
            Some are directories of software and browser extensions, such as ExtensionFinder, ToolDirs and Direct2App, where you can find GrowX by
            category. Others are launch platforms that present new products, such as LaunchBuck, Nick Launches, Launchit, LaunchBoosts, LaunchKiwi and
            Next Big Product. launched.tools marks its listing of GrowX as reviewed. A listing is not an endorsement or a rating, and none of these sites
            is connected to X Corp.
          </p>
          <p>
            Wherever you found GrowX, the facts are the same: it works inside the x.com tab you are already signed in to in desktop Chrome, never asks
            for your X password, has a free plan forever and a {TRIAL_DAYS}-day Premium trial with no credit card. See every{" "}
            <Link href="/features" className="font-semibold text-accent-ink underline-offset-4 hover:underline">
              feature
            </Link>{" "}
            or compare the{" "}
            <Link href="/pricing" className="font-semibold text-accent-ink underline-offset-4 hover:underline">
              plans
            </Link>
            .
          </p>
        </Container>
      </Section>

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
                      <a href={link} rel={DIRECTORY_REL} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent-ink underline-offset-4 hover:underline">
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
