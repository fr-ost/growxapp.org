import { IntentLink } from "@/components/ui/intent-link";
import { IconArrowRight } from "@/components/icons";
import { stagger } from "@/components/motion/stagger";
import type { UseCase } from "@/content/use-cases";

/** Cards that link to use-case pages (/use-cases/<slug>). Used on feature pages and on the blog posts a use case cites. */
export function UseCaseLinks({ cases }: { cases: readonly UseCase[] }) {
  return (
    <ul className="mt-6 grid gap-4 md:grid-cols-3">
      {cases.map((u, i) => (
        <li key={u.slug} className="reveal" style={stagger(i % 3)}>
          <IntentLink
            href={`/use-cases/${u.slug}`}
            className="group lift flex h-full flex-col rounded-3xl border border-hairline bg-white p-5 shadow-[var(--shadow-hair)]"
          >
            <span className="font-bold group-hover:text-accent-ink">{u.nav}</span>
            <span className="mt-1 flex-1 text-sm text-text-2">{u.blurb}</span>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-ink">
              Read the plan <IconArrowRight size={15} className="nudge" />
            </span>
          </IntentLink>
        </li>
      ))}
    </ul>
  );
}
