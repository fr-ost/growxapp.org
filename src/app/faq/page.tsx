import { FaqBrowser } from "@/components/faq-browser";
import { CtaBand } from "@/components/home/cta-band";
import { IconArrowRight, IconMail } from "@/components/icons";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/json-ld";
import { LinkButton, buttonClasses } from "@/components/ui/button";
import { Container, PageHero, Section } from "@/components/ui/primitives";
import { TRIAL_DAYS } from "@/config/pricing";
import { site } from "@/config/site";
import { allFaqs, faqGroups } from "@/content/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GrowX FAQ: Pricing, Safety, Auto Follow & Scheduler",
  description: `Answers to every common GrowX question: pricing and crypto payments, the ${TRIAL_DAYS}-day free trial, auto follow safety, scheduler, GrowX AI, analytics and privacy.`,
  path: "/faq",
  keywords: ["GrowX FAQ", "GrowX help", "GrowX pricing questions", "is GrowX safe", "GrowX free trial", "X auto follow FAQ", "Twitter growth tool FAQ"],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]), faqLd(allFaqs)]} />
      <PageHero eyebrow="FAQ" title={<>Frequently asked <span className="text-gradient">questions</span></>}>
        Everything about GrowX in one place: plans and payments, the {TRIAL_DAYS}-day free trial, auto follow and safety, the scheduler, GrowX AI,
        analytics and your data. Search below or jump to a topic.
      </PageHero>
      <Section className="pt-4 sm:pt-6 lg:pt-8">
        <Container>
          <FaqBrowser groups={faqGroups} supportEmail={site.supportEmail} />
          <div className="mt-16 flex flex-col items-start justify-between gap-5 rounded-3xl border border-hairline bg-white p-7 shadow-[var(--shadow-hair)] sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="text-xl font-bold">Still have a question?</h2>
              <p className="mt-1 text-text-2">Ask the developer directly. Include the email on your GrowX account for account and billing questions.</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={`mailto:${site.supportEmail}`} className={buttonClasses("primary")}>
                <IconMail size={18} /> Email support
              </a>
              <LinkButton href="/contact" variant="secondary">
                All support options <IconArrowRight size={16} className="nudge" />
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
