import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { testimonials } from "@/data/testimonials";

/** Real testimonials from src/data/testimonials.ts, each linked to where it was posted. Renders nothing while empty. */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="What users say" title="In their own words." center>
          Posted publicly by GrowX users. Each one links to where it was written.
        </SectionHeading>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.url} className="flex h-full flex-col rounded-3xl border border-hairline bg-white p-6 shadow-[var(--shadow-hair)]">
              <blockquote className="flex-1 text-pretty leading-relaxed text-text-2">&ldquo;{t.text}&rdquo;</blockquote>
              <p className="mt-5 text-sm font-semibold text-text">
                {t.name}
                {t.handle ? <span className="font-normal text-muted"> {t.handle}</span> : null}
              </p>
              <p className="mt-1 text-xs text-muted">
                <a href={t.url} target="_blank" rel="noopener noreferrer nofollow" className="underline-offset-4 hover:underline">
                  {t.source}, <time dateTime={t.date}>{t.date}</time>
                </a>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
