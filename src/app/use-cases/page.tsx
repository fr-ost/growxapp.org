import { CtaBand } from "@/components/home/cta-band";
import { IconArrowRight, IconChrome } from "@/components/icons";
import { JsonLd, breadcrumbLd, webPageLd } from "@/components/json-ld";
import { stagger } from "@/components/motion/stagger";
import { CwsButton } from "@/components/cws-link";
import { LinkButton } from "@/components/ui/button";
import { IntentLink } from "@/components/ui/intent-link";
import { Container, PageHero, Section } from "@/components/ui/primitives";
import { useCases } from "@/content/use-cases";
import { pageMetadata } from "@/lib/seo";

const description =
  "How different X (Twitter) accounts grow with GrowX: crypto and Web3 accounts, brand new accounts and creators or founders who build in public. Free to start.";

export const metadata = pageMetadata({
  title: "GrowX Use Cases: Who It Helps Grow on X",
  description,
  path: "/use-cases",
  defaultImage: false,
  keywords: ["GrowX use cases", "grow crypto Twitter", "grow a new X account", "build in public on X", "X growth for founders"],
});

export default function UseCasesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Use cases", path: "/use-cases" },
          ]),
          webPageLd({ path: "/use-cases", name: "GrowX use cases", description }),
        ]}
      />
      <PageHero
        eyebrow="Use cases"
        title={
          <>
            Who GrowX <span className="text-gradient">helps grow on X</span>
          </>
        }
        actions={
          <>
            <CwsButton campaign="use-cases" content="hero" size="lg">
              <IconChrome size={20} /> Add to Chrome, free
            </CwsButton>
            <LinkButton href="/features" variant="secondary" size="lg">
              See all features
            </LinkButton>
          </>
        }
      >
        <p>
          GrowX is a Chrome extension that grows an X (Twitter) account with safe auto follow, scheduling, on-device AI writing and replies,
          analytics and an unfollower tracker. The same tools fit different accounts in different ways. Pick the case closest to yours for a
          concrete plan.
        </p>
      </PageHero>
      <Section className="pt-6 sm:pt-8">
        <Container>
          <ul data-spotlight-group="" className="grid gap-5 md:grid-cols-3">
            {useCases.map((u, i) => (
              <li key={u.slug} className="reveal" style={stagger(i)}>
                <IntentLink
                  href={`/use-cases/${u.slug}`}
                  data-spotlight=""
                  className="group lift flex h-full flex-col rounded-3xl border border-hairline bg-white p-6 shadow-[var(--shadow-hair)]"
                >
                  <h2 className="text-xl font-bold group-hover:text-accent-ink">{u.nav}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-2">{u.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-ink">
                    Read the plan <IconArrowRight size={15} className="nudge" />
                  </span>
                </IntentLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaBand campaign="use-cases" />
    </>
  );
}
