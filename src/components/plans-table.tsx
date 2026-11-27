import { PLAN_LENGTH, PLAN_SUMMARY, TRIAL_DAYS, getTier, pricingTiers } from "@/config/pricing";

/**
 * Every plan and price as plain HTML (the same tiers and text as the JSON-LD offers: src/config/pricing.ts), so people
 * and machines read the same facts: price, length, renewal, what you get, the trial and how payment works.
 */
export function PlansTable() {
  const lifetime = getTier("PRO_LIFETIME");
  return (
    <section aria-labelledby="plans-table-h" className="reveal mx-auto max-w-5xl pt-14">
      <h2 id="plans-table-h" className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
        Every plan at a glance
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-text-2">
        Premium plans are prepaid in crypto and never renew by themselves. The {TRIAL_DAYS}-day Premium trial is free, with no credit card.
      </p>
      <div className="mt-8 overflow-x-auto rounded-3xl border border-hairline bg-white shadow-hair">
        <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left text-sm">
          <caption className="sr-only">GrowX plans, prices, length, renewal and what each includes</caption>
          <thead>
            <tr className="[&>th]:border-b [&>th]:border-hairline-strong [&>th]:px-5 [&>th]:py-4 [&>th]:font-bold">
              <th scope="col">Plan</th>
              <th scope="col">Price (USD)</th>
              <th scope="col">Length</th>
              <th scope="col">Renews by itself?</th>
              <th scope="col">What you get</th>
            </tr>
          </thead>
          <tbody className="[&_td]:px-5 [&_td]:py-4 [&_th]:px-5 [&_th]:py-4 [&_tr+tr>*]:border-t [&_tr+tr>*]:border-hairline [&_td]:align-top [&_th]:align-top">
            <tr>
              <th scope="row" className="font-semibold">{getTier("FREE").name}</th>
              <td className="tabular-nums">{getTier("FREE").priceLabel}</td>
              <td>{PLAN_LENGTH.FREE}</td>
              <td>No payment</td>
              <td className="text-text-2">{PLAN_SUMMARY.FREE}</td>
            </tr>
            <tr>
              <th scope="row" className="font-semibold">Premium trial</th>
              <td className="tabular-nums">$0</td>
              <td>{TRIAL_DAYS} days</td>
              <td>No, and no credit card</td>
              <td className="text-text-2">Every Premium feature for {TRIAL_DAYS} days, once per account and once per X account.</td>
            </tr>
            {pricingTiers
              .filter((t) => t.priceCents)
              .map((t) => (
                <tr key={t.id}>
                  <th scope="row" className="font-semibold">{t.name}</th>
                  <td className="tabular-nums">
                    {t.priceLabel} <span className="text-muted">{t.cadence}</span>
                  </td>
                  <td>{PLAN_LENGTH[t.id]}</td>
                  <td>{t.interval === "once" ? "No, one payment" : "No, prepaid"}</td>
                  <td className="text-text-2">{PLAN_SUMMARY[t.id]}</td>
                </tr>
              ))}
            {lifetime.earlyBird ? (
              <tr>
                <th scope="row" className="font-semibold">Lifetime, early-bird price</th>
                <td className="tabular-nums">
                  {lifetime.earlyBird.priceLabel} <span className="text-muted">{lifetime.cadence}</span>
                </td>
                <td>{PLAN_LENGTH.PRO_LIFETIME}</td>
                <td>No, one payment</td>
                <td className="text-text-2">
                  The first {lifetime.earlyBird.limit} lifetime buyers pay {lifetime.earlyBird.priceLabel} instead of {lifetime.priceLabel}, while spots remain.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-sm text-text-2">
        Payment: crypto (ETH or BNB Smart Chain, BEP20) through NOWPayments. Premium starts once the payment is confirmed.
      </p>
    </section>
  );
}
