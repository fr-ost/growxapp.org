"use client";

import Link from "next/link";
import { useId, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { IconAlert, IconArrowRight, IconCheck, IconInfo, IconSearch, IconX } from "@/components/icons";
import { CopyButton, inputClass } from "@/components/tools/ui";
import { site } from "@/config/site";
import {
  CHECK_IDS,
  ISSUE_INFO,
  parseUsername,
  shadowbanVerdict,
  testLinks,
  verdictSummary,
  type Answer,
  type Answers,
  type CheckId,
  type VerdictLevel,
} from "@/lib/shadowban";

const PATH = "/tools/twitter-shadowban-checker";
const STORE = "gx_shadowban_test";

type Links = ReturnType<typeof testLinks>;

/** The five checks. `how` explains what to look at; options are [normal, problem] labels. */
const CHECKS: Record<CheckId, { title: string; how: (u: string) => ReactNode; link?: (l: Links) => { href: string; label: string }; options: [string, string] }> = {
  status: {
    title: "Account status",
    how: (u) => (
      <>
        Open <b>{u}</b> from your second account (or a private window). Does the profile load normally, without a message that it is suspended,
        doesn&apos;t exist or is temporarily restricted?
      </>
    ),
    link: (l) => ({ href: l.profile, label: "Open the profile" }),
    options: ["Loads normally", "Warning or error"],
  },
  suggest: {
    title: "Search suggestions",
    how: (u) => (
      <>
        On the second account, click X&apos;s search box and type <b>{u}</b> without pressing Enter. Does the account appear in the suggestions
        under the box?
      </>
    ),
    link: () => ({ href: "https://x.com/explore", label: "Open X search" }),
    options: ["It appears", "It doesn't appear"],
  },
  search: {
    title: "Search results",
    how: (u) => (
      <>
        On the second account, open a Latest search for posts from <b>{u}</b>. Do recent posts show up? Brand-new posts can take a few minutes, and
        protected accounts never appear for people who don&apos;t follow them.
      </>
    ),
    link: (l) => ({ href: l.search, label: "Search on X" }),
    options: ["Recent posts appear", "Nothing or only old posts"],
  },
  replies: {
    title: "Reply visibility",
    how: () => (
      <>
        Pick a recent reply on a post with only a few replies, then open that post on the second account. Is the reply listed with the others, not
        hidden behind &ldquo;Show more replies&rdquo; or &ldquo;Show probable spam&rdquo;?
      </>
    ),
    link: (l) => ({ href: l.replies, label: "Open the replies" }),
    options: ["Reply is visible", "Reply is hidden"],
  },
  notices: {
    title: "Notices from X",
    how: () => (
      <>
        On your own account, check your X notifications and the email address on the account. Is there any message from X about limits on the
        account or on a post?
      </>
    ),
    link: () => ({ href: "https://x.com/notifications", label: "Open notifications" }),
    options: ["No notices", "There is a notice"],
  },
};

const LEVEL_STYLE: Record<VerdictLevel, { box: string; icon: ReactNode; chip: string }> = {
  none: { box: "bg-surface-2 ring-hairline", icon: <IconSearch size={22} />, chip: "bg-white text-text-2" },
  incomplete: { box: "bg-tint ring-accent/15", icon: <IconInfo size={22} />, chip: "bg-white text-accent-ink" },
  clear: { box: "bg-ok-soft ring-ok/20", icon: <IconCheck size={22} />, chip: "bg-white text-ok" },
  warning: { box: "bg-warn-soft ring-warn/25", icon: <IconAlert size={22} />, chip: "bg-white text-warn" },
  restricted: { box: "bg-danger-soft ring-danger/25", icon: <IconX size={22} />, chip: "bg-white text-danger" },
};

/* The test lives in a tiny external store: the saved test (sessionStorage, with an in-memory fallback when storage
   is blocked) plus the ?u= in the URL. It survives switching to X and back, and a shared ?u= link starts a test. */
type Saved = { u: string; answers: Answers };
const listeners = new Set<() => void>();
let memory: string | null = null;

function readStorage(): string {
  try {
    return sessionStorage.getItem(STORE) ?? "";
  } catch {
    return "";
  }
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
const getSnapshot = () => `${memory ?? readStorage()}\n${window.location.search}`;
const getServerSnapshot = () => "";
function save(state: Saved | null) {
  memory = state ? JSON.stringify(state) : "";
  try {
    if (state) sessionStorage.setItem(STORE, memory);
    else sessionStorage.removeItem(STORE);
  } catch {
    /* storage blocked: the in-memory copy keeps the test working for this visit */
  }
  listeners.forEach((l) => l());
}
function derive(snap: string): { user: string | null; answers: Answers } {
  const cut = snap.lastIndexOf("\n");
  const stored = cut < 0 ? "" : snap.slice(0, cut);
  const urlUser = cut < 0 ? null : parseUsername(new URLSearchParams(snap.slice(cut + 1)).get("u") ?? "");
  let saved: Saved | null = null;
  try {
    saved = stored ? (JSON.parse(stored) as Saved) : null;
  } catch {
    saved = null;
  }
  if (saved?.u && (!urlUser || saved.u === urlUser)) return { user: saved.u, answers: saved.answers ?? {} };
  return { user: urlUser, answers: {} };
}
function setUrl(u: string | null) {
  try {
    window.history.replaceState(null, "", u ? `?u=${encodeURIComponent(u)}` : window.location.pathname);
  } catch {
    /* ignore */
  }
}

/**
 * Free guided shadowban test. Builds the checks for a username; the visitor looks at X from another account and
 * answers. Nothing is sent anywhere; answers stay in this tab (sessionStorage) so switching to X and back keeps them.
 */
export function ShadowbanChecker() {
  const inputId = useId();
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { user, answers } = useMemo(() => derive(snap), [snap]);
  const [draft, setDraft] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const input = draft ?? user ?? "";

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    const u = parseUsername(input);
    setError(!u);
    if (!u) return;
    setDraft(null);
    setUrl(u);
    save({ u, answers: u === user ? answers : {} });
  };

  const answer = (id: CheckId, v: Answer) => {
    if (user) save({ u: user, answers: { ...answers, [id]: v } });
  };

  const reset = () => {
    setDraft(null);
    setError(false);
    setUrl(null);
    save(null);
  };

  const links = user ? testLinks(user) : null;
  const handle = user ? `@${user}` : "your @username";
  const verdict = shadowbanVerdict(answers);
  const style = LEVEL_STYLE[verdict.level];
  const answered = CHECK_IDS.filter((id) => answers[id]).length;

  return (
    <div className="text-left">
      <form onSubmit={start} noValidate className="mx-auto max-w-2xl rounded-3xl border border-hairline bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <label htmlFor={inputId} className="text-sm font-bold">
          Your X (Twitter) username
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-muted">
              @
            </span>
            <input
              id={inputId}
              data-testid="sb-user"
              value={input}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="username or profile link"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-invalid={error || undefined}
              aria-describedby={error ? `${inputId}-err` : `${inputId}-hint`}
              className={`${inputClass} pl-9 font-medium`}
            />
          </div>
          <button
            type="submit"
            className="btn-shine inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-contrast shadow-[var(--shadow-red)] hover:bg-accent-hover active:scale-[.98]"
          >
            {user ? "Update" : "Start the test"} <IconArrowRight size={17} className="nudge" />
          </button>
        </div>
        {error ? (
          <p id={`${inputId}-err`} className="mt-2 text-sm font-semibold text-danger" data-testid="sb-error">
            Enter a valid X username: 1 to 15 letters, numbers or underscores.
          </p>
        ) : (
          <p id={`${inputId}-hint`} className="mt-2 text-xs text-muted">
            No login, no sign-up and free. We never ask for your password or to connect your account.
          </p>
        )}
      </form>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <div className="flex items-start gap-3 rounded-2xl border border-accent/20 bg-tint px-4 py-3 text-sm text-text-2">
            <IconInfo size={18} className="mt-0.5 shrink-0 text-accent-ink" />
            <p>
              <b className="text-text">Check from a second X account</b>, or ask a friend who doesn&apos;t follow you. X only shows search to signed-in
              people, and your own account always sees your own posts.
            </p>
          </div>
          <ol className="mt-4 space-y-4" data-testid="sb-checks">
            {CHECK_IDS.map((id, i) => {
              const c = CHECKS[id];
              const link = links && c.link ? c.link(links) : null;
              const a = answers[id];
              return (
                <li key={id} className="rounded-3xl border border-hairline bg-white p-5 shadow-[var(--shadow-hair)] sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="flex items-center gap-3 text-lg font-bold">
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-extrabold ${
                          a === "ok" ? "bg-ok-soft text-ok" : a === "issue" ? "bg-danger-soft text-danger" : "bg-accent-soft text-accent-ink"
                        }`}
                      >
                        {a === "ok" ? <IconCheck size={16} /> : a === "issue" ? <IconX size={16} /> : i + 1}
                      </span>
                      {c.title}
                    </h3>
                    {link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border-strong bg-white px-3.5 py-1.5 text-sm font-semibold hover:border-accent hover:text-accent-ink"
                      >
                        {link.label} <IconArrowRight size={14} className="-rotate-45" />
                        <span className="sr-only">(opens X in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-text-2">{c.how(handle)}</p>
                  <fieldset disabled={!user} className="mt-4 disabled:opacity-60">
                    <legend className="sr-only">{c.title}: what do you see?</legend>
                    <div className="flex flex-wrap gap-2">
                      {(["ok", "issue", "unsure"] as Answer[]).map((v) => {
                        const label = v === "ok" ? c.options[0] : v === "issue" ? c.options[1] : "Not sure";
                        const on = a === v;
                        const tone =
                          v === "ok"
                            ? "peer-checked:border-ok peer-checked:bg-ok-soft peer-checked:text-ok"
                            : v === "issue"
                              ? "peer-checked:border-danger peer-checked:bg-danger-soft peer-checked:text-danger"
                              : "peer-checked:border-text-2 peer-checked:bg-surface-2 peer-checked:text-text";
                        return (
                          <label key={v} className="relative">
                            <input
                              type="radio"
                              name={`sb-${id}`}
                              value={v}
                              checked={on}
                              onChange={() => answer(id, v)}
                              className="peer sr-only"
                            />
                            <span
                              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-strong bg-white px-3.5 py-1.5 text-sm font-semibold text-text-2 hover:border-accent/40 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-disabled:cursor-not-allowed ${tone}`}
                            >
                              {label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div aria-live="polite" data-testid="sb-result" data-level={verdict.level} className={`rounded-3xl p-6 ring-1 ${style.box}`}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-text-2">{user ? `Result for @${user}` : "Your result"}</p>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums ${style.chip}`}>
                {answered} / {CHECK_IDS.length} checked
              </span>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${style.chip} shadow-[var(--shadow-hair)]`}>{style.icon}</span>
              <div>
                <p className="font-display text-xl font-extrabold leading-snug tracking-tight text-text">{verdict.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-2">{verdict.summary}</p>
              </div>
            </div>
            {verdict.issues.length ? (
              <ul className="mt-5 space-y-3">
                {verdict.issues.map((id) => (
                  <li key={id} className="rounded-2xl bg-white p-4 text-sm shadow-[var(--shadow-hair)]">
                    <p className="font-bold text-text">{ISSUE_INFO[id].label}</p>
                    <p className="mt-1 leading-relaxed text-text-2">{ISSUE_INFO[id].fix}</p>
                  </li>
                ))}
              </ul>
            ) : null}
            {user && answered ? (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <CopyButton value={verdictSummary(user, answers, verdict, `${site.url}${PATH}`)} label="Copy result" />
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold text-text-2 hover:bg-white hover:text-text"
                >
                  Start over
                </button>
              </div>
            ) : null}
          </div>
          <p className="mt-4 px-1 text-sm text-text-2">
            Full guide:{" "}
            <Link href="/blog/twitter-shadowban" className="font-semibold text-accent-ink hover:underline">
              why shadowbans happen and how to fix them
            </Link>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
