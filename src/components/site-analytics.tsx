"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";
import { isCwsUrl } from "@/lib/cws";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type Props = Record<string, string>;

/** Referrer hosts of AI answer engines, and the name each visit is reported under. */
const AI_REFERRERS: [RegExp, string][] = [
  [/(^|\.)chatgpt\.com$/, "chatgpt"],
  [/^chat\.openai\.com$/, "chatgpt"],
  [/(^|\.)perplexity\.ai$/, "perplexity"],
  [/^gemini\.google\.com$/, "gemini"],
  [/^copilot\.microsoft\.com$/, "copilot"],
  [/(^|\.)claude\.ai$/, "claude"],
];

/** The AI engine a visit came from (its referrer, or utm_source=chatgpt.com, which ChatGPT adds to links), or null. */
export function aiSource(referrer: string, search: string): string | null {
  if (new URLSearchParams(search).get("utm_source") === "chatgpt.com") return "chatgpt";
  let host = "";
  try {
    host = referrer ? new URL(referrer).hostname : "";
  } catch {
    return null;
  }
  return AI_REFERRERS.find(([re]) => re.test(host))?.[1] ?? null;
}

/** One event to every analytics tool on the site: Vercel Web Analytics, the Google tag and Google Tag Manager. */
function send(name: string, props: Props) {
  try {
    track(name, props);
  } catch {
    // analytics must never break a click
  }
  window.gtag?.("event", name, props);
  (window.dataLayer ??= []).push({ event: name, ...props });
}

/**
 * Site-wide analytics hooks, mounted once in the root layout. No per-link JavaScript: one delegated listener sees every
 * click (and middle click) on a Chrome Web Store link and reports add_to_chrome_click with the link's own UTM tags
 * (src/lib/cws.ts), so the page and the placement come from the link itself. It also reports visits that arrive from
 * an AI answer engine (ai_search_visit, below).
 */
export function SiteAnalytics() {
  // A visit from an AI answer engine (ChatGPT, Perplexity, Gemini, Copilot, Claude) is reported once, on the page it
  // lands on, as ai_search_visit with channel "AI search": the "AI search" channel in Vercel Analytics and Tag Manager.
  useEffect(() => {
    const source = aiSource(document.referrer, location.search);
    if (source) send("ai_search_visit", { channel: "AI search", ai_source: source, path: location.pathname });
  }, []);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!a || !isCwsUrl(a.href)) return;
      const url = new URL(a.href);
      send("add_to_chrome_click", {
        campaign: url.searchParams.get("utm_campaign") ?? "untagged",
        content: url.searchParams.get("utm_content") ?? "untagged",
        path: location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("auxclick", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("auxclick", onClick, { capture: true });
    };
  }, []);
  return null;
}
