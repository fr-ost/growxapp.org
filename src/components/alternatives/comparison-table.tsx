import { RichText } from "@/components/rich-text";
import { CHECK_THEIR_SITE, type ComparisonRow } from "@/content/alternatives";

/**
 * A side-by-side table: the other tool (or doing it by hand) and GrowX. "Check their site" cells are muted, never guessed.
 * By default the table keeps its columns and scrolls sideways on a phone. With `stack`, each row becomes a small card
 * below the md breakpoint (label, then the two answers, each named), so the GrowX column is never off-screen.
 */
export function ComparisonTable({
  name,
  rows,
  caption,
  firstColumn = "Feature",
  stack = false,
}: {
  name: string;
  rows: readonly ComparisonRow[];
  caption: string;
  /** Header of the row-label column. */
  firstColumn?: string;
  /** Stack each row on small screens instead of scrolling sideways. */
  stack?: boolean;
}) {
  const s = (classes: string) => (stack ? classes : "");
  return (
    <div className={`rounded-3xl border border-hairline bg-white shadow-hair ${stack ? "md:overflow-x-auto" : "overflow-x-auto"}`}>
      <table className={`w-full border-separate border-spacing-0 text-left text-sm ${stack ? "max-md:block md:min-w-[40rem]" : "min-w-[40rem]"}`}>
        <caption className="sr-only">{caption}</caption>
        <thead className={s("max-md:sr-only")}>
          <tr className="[&>th]:shadow-[inset_0_-1px_0_var(--hairline-strong)]">
            <th scope="col" className="w-[24%] px-5 py-4 font-bold">
              {firstColumn}
            </th>
            <th scope="col" className="w-[33%] px-5 py-4 font-bold">
              {name}
            </th>
            <th scope="col" className="bg-[linear-gradient(rgb(255_240_241/0.4),rgb(255_240_241/0.4))] px-5 py-4 font-bold text-accent-ink">
              GrowX
            </th>
          </tr>
        </thead>
        <tbody className={s("max-md:block")}>
          {rows.map((r) => (
            <tr
              key={r.label}
              className={`align-top [&>*]:border-t [&>*]:border-hairline first:[&>*]:border-t-0 ${s(
                "max-md:block max-md:border-t max-md:border-hairline max-md:p-5 max-md:first:border-t-0 max-md:[&>*]:border-t-0",
              )}`}
            >
              <th scope="row" className={`px-5 py-4 font-semibold ${s("max-md:block max-md:p-0 max-md:text-base")}`}>
                {r.label}
              </th>
              <td
                className={`px-5 py-4 leading-relaxed ${r.them === CHECK_THEIR_SITE ? "italic text-muted" : "text-text-2"} ${s(
                  "max-md:block max-md:px-0 max-md:pb-0 max-md:pt-2",
                )}`}
              >
                {stack ? <span className="font-semibold not-italic text-text md:hidden">{name}: </span> : null}
                {r.them}
              </td>
              <td className={`bg-accent-soft/40 px-5 py-4 leading-relaxed text-text ${s("max-md:mt-3 max-md:block max-md:rounded-2xl max-md:px-4 max-md:py-3")}`}>
                {stack ? <span className="font-semibold text-accent-ink md:hidden">GrowX: </span> : null}
                <RichText text={r.growx} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
