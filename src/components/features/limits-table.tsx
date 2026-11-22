import type { FeaturePage } from "@/content/feature-types";

/** Free vs Premium for one feature, with the real limits. "-" means not included. */
export function LimitsTable({ name, rows }: { name: string; rows: FeaturePage["limits"] }) {
  const cell = (v: string) =>
    v === "-" ? (
      <>
        <span aria-hidden="true" className="text-muted">
          -
        </span>
        <span className="sr-only">Not included</span>
      </>
    ) : (
      v
    );
  return (
    <div className="overflow-x-auto rounded-3xl border border-hairline bg-white shadow-hair">
      <table className="w-full min-w-[36rem] border-separate border-spacing-0 text-left text-sm">
        <caption className="sr-only">{name}: Free and Premium limits</caption>
        <thead>
          <tr className="[&>th]:shadow-[inset_0_-1px_0_var(--hairline-strong)]">
            <th scope="col" className="w-[34%] px-5 py-4 font-bold">
              {name}
            </th>
            <th scope="col" className="w-[30%] px-5 py-4 font-bold">
              Free
            </th>
            <th scope="col" className="bg-[linear-gradient(rgb(255_240_241/0.4),rgb(255_240_241/0.4))] px-5 py-4 font-bold text-accent-ink">
              Premium
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="align-top [&>*]:border-t [&>*]:border-hairline first:[&>*]:border-t-0">
              <th scope="row" className="px-5 py-3.5 font-semibold">
                {r.label}
              </th>
              <td className="px-5 py-3.5 leading-relaxed text-text-2">{cell(r.free)}</td>
              <td className="bg-accent-soft/40 px-5 py-3.5 leading-relaxed text-text">{cell(r.premium)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
