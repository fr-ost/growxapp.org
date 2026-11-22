import { TRIAL_DAYS, getTier } from "@/config/pricing";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

const [monthly, yearly, lifetime] = [getTier("PRO_MONTHLY"), getTier("PRO_YEARLY"), getTier("PRO_LIFETIME")];

export const alt = `GrowX pricing: free forever, Premium from ${monthly.priceLabel}, ${TRIAL_DAYS}-day free trial`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Pricing",
    title: `Free forever. Premium from ${monthly.priceLabel}.`,
    subtitle: `30 days ${monthly.priceLabel} · 365 days ${yearly.priceLabel} · Lifetime ${lifetime.priceLabel}${lifetime.earlyBird ? ` (${lifetime.earlyBird.priceLabel} for the first ${lifetime.earlyBird.limit})` : ""}`,
    chips: [`${TRIAL_DAYS}-day free trial`, "No credit card", "No auto-renew", "Paid in crypto"],
  });
}
