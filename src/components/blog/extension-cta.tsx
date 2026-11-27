import { IconArrowRight, IconChrome } from "@/components/icons";
import { CwsButton } from "@/components/cws-link";
import { IntentLink } from "@/components/ui/intent-link";
import { toolNav } from "@/config/nav";
import { getFeaturePage } from "@/content/feature-pages";
import type { FeatureSlug } from "@/content/feature-slugs";

/**
 * The in-article call to action: the GrowX feature that fits the post, the Chrome Web Store button (tagged with the
 * post's campaign and this placement) and one free tool. Placed after a post's intro and again at its end, so every
 * post links to a feature page, a free tool and the store.
 */
export function ExtensionCta({ feature, campaign, placement, tool }: { feature: FeatureSlug; campaign: string; placement: "inline-cta" | "end-cta"; tool?: string }) {
  const f = getFeaturePage(feature);
  if (!f) return null;
  const t = tool ? toolNav.find((x) => x.href === tool) : undefined;
  return (
    <aside aria-label={`GrowX ${f.nav}`} className="rounded-3xl border border-hairline bg-tint p-6 shadow-hair">
      <p className="text-xs font-bold uppercase tracking-wider text-accent-ink">{placement === "end-cta" ? "Put it into practice" : "Do this with GrowX"}</p>
      <p className="mt-2 font-display text-lg font-extrabold leading-snug text-text">
        {f.nav}: <span className="font-semibold text-text-2">{f.blurb}</span>
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <CwsButton campaign={campaign} content={placement} size="sm">
          <IconChrome size={16} /> Add to Chrome, free
        </CwsButton>
        <IntentLink href={`/features/${f.slug}`} className="inline-flex items-center gap-1 font-semibold text-accent-ink">
          How {f.nav.toLowerCase()} works <IconArrowRight size={15} className="nudge" />
        </IntentLink>
        {t ? (
          <IntentLink href={t.href} className="font-semibold text-text-2 underline-offset-4 hover:text-accent-ink hover:underline">
            Free tool: {t.label}
          </IntentLink>
        ) : null}
      </div>
    </aside>
  );
}
