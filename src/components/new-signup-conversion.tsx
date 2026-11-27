"use client";

import { useEffect } from "react";
import { NEW_SIGNUP_COOKIE } from "@/lib/auth/flow";
import { trackConversion } from "@/lib/google-conversions";

/** True when the short-lived marker cookie set by /auth/callback for a brand-new Google account is present. */
export function hasNewSignupMarker(cookie: string): boolean {
  return cookie.split(/;\s*/).some((c) => c.startsWith(`${NEW_SIGNUP_COOKIE}=`));
}

/**
 * A first Google sign-in creates the account on the server, so the page it lands on reports the same Google Ads
 * "signup" conversion an email sign-up reports (only where that conversion is configured and the Google tag runs,
 * i.e. production). The marker cookie is cleared either way, so it is reported at most once.
 */
export function NewSignupConversion() {
  useEffect(() => {
    if (!hasNewSignupMarker(document.cookie)) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      // gtag() is defined by the Google tag's inline snippet just after hydration: wait for it (up to ~5 s).
      if (typeof window.gtag !== "function" && ++tries < 20) return;
      window.clearInterval(timer);
      document.cookie = `${NEW_SIGNUP_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
      trackConversion("signup");
    }, 250);
    return () => window.clearInterval(timer);
  }, []);
  return null;
}
