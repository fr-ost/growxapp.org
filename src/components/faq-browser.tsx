"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Faq } from "@/components/home/faq";
import { IconSearch, IconX } from "@/components/icons";
import type { FaqGroup } from "@/content/faq";

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

/**
 * The /faq question list with an instant search and a topic index. The server renders every group (empty query),
 * so all questions and answers are in the HTML without JS; the search only filters on the client.
 */
export function FaqBrowser({ groups, supportEmail }: { groups: FaqGroup[]; supportEmail: string }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const searching = query.trim().length > 0;
  const shown = useMemo(() => {
    const words = norm(query).split(/\s+/).filter(Boolean);
    return groups
      .map((g) => ({ ...g, items: words.length ? g.items.filter((f) => words.every((w) => norm(`${f.q} ${f.a}`).includes(w))) : g.items }))
      .filter((g) => g.items.length);
  }, [groups, query]);
  const count = shown.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <label htmlFor={inputId} className="sr-only">
          Search questions
        </label>
        <div className="relative">
          <IconSearch size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id={inputId}
            data-testid="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions"
            autoComplete="off"
            className="h-12 w-full rounded-full border border-hairline-strong bg-white pl-11 pr-10 text-[0.95rem] shadow-[var(--shadow-hair)] outline-none placeholder:text-muted focus:border-accent/50 focus:ring-4 focus:ring-accent/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-tint hover:text-text"
            >
              <IconX size={16} />
            </button>
          ) : null}
        </div>
        <p className="mt-3 px-1 text-sm text-text-2" aria-live="polite" data-testid="faq-count">
          {searching ? `${count} matching question${count === 1 ? "" : "s"}` : `${count} questions`}
        </p>
        <nav aria-label="FAQ topics" className="mt-5">
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0">
            {groups.map((g) => {
              const n = shown.find((s) => s.id === g.id)?.items.length ?? 0;
              return (
                <li key={g.id} className="shrink-0">
                  <a
                    href={`#${g.id}`}
                    aria-disabled={n === 0 || undefined}
                    className={`flex items-center justify-between gap-3 rounded-full border border-hairline bg-white px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors hover:border-accent/30 hover:text-accent-ink lg:rounded-xl lg:border-transparent lg:bg-transparent lg:px-3 lg:py-2 lg:hover:bg-tint ${n === 0 ? "pointer-events-none opacity-40" : "text-text-2"}`}
                  >
                    {g.title}
                    <span className="rounded-full bg-surface-2 px-2 py-px text-xs tabular-nums text-muted">{n}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0 space-y-14">
        {shown.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="scroll-mt-24">
            <h2 id={`${g.id}-h`} className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {g.title}
            </h2>
            <div className="mt-6">
              <Faq items={g.items} />
            </div>
          </section>
        ))}
        {count === 0 ? (
          <div className="rounded-3xl border border-hairline bg-white p-8 text-center shadow-[var(--shadow-hair)]" data-testid="faq-empty">
            <p className="text-lg font-bold">No question matches &ldquo;{query}&rdquo;.</p>
            <p className="mt-2 text-text-2">
              Try a shorter word, or ask us directly at{" "}
              <a className="font-semibold text-accent-ink hover:underline" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>{" "}
              or on the{" "}
              <Link className="font-semibold text-accent-ink hover:underline" href="/contact">
                support page
              </Link>
              .
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
