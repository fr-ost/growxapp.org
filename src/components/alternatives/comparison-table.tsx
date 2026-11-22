import { RichText } from "@/components/rich-text";
import { CHECK_THEIR_SITE, type ComparisonRow } from "@/content/alternatives";

/** A side-by-side table: the other tool and GrowX. "Check their site" cells are muted, never guessed. */
export function ComparisonTable({ name, rows, caption }: { name: string; rows: readonly ComparisonRow[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-hairline bg-white shadow-hair">
      <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="[&>th]:shadow-[inset_0_-1px_0_var(--hairline-strong)]">
            <th scope="col" className="w-[24%] px-5 py-4 font-bold">
              Feature
            </th>
            <th scope="col" className="w-[33%] px-5 py-4 font-bold">
              {name}
            </th>
            <th scope="col" className="bg-[linear-gradient(rgb(255_240_241/0.4),rgb(255_240_241/0.4))] px-5 py-4 font-bold text-accent-ink">
              GrowX
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="align-top [&>*]:border-t [&>*]:border-hairline first:[&>*]:border-t-0">
              <th scope="row" className="px-5 py-4 font-semibold">
                {r.label}
              </th>
              <td className={`px-5 py-4 leading-relaxed ${r.them === CHECK_THEIR_SITE ? "italic text-muted" : "text-text-2"}`}>{r.them}</td>
              <td className="bg-accent-soft/40 px-5 py-4 leading-relaxed text-text">
                <RichText text={r.growx} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
