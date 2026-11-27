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
 * (src/lib/cws.ts), so the page and the placement come from the link itself.
 */
export function SiteAnalytics() {
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
