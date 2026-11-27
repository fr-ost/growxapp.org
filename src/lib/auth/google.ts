import "server-only";
import { getSupabasePublicConfig } from "@/lib/env";

/**
 * Whether the Supabase project has the Google provider enabled: GET /auth/v1/settings reports external.google: true.
 * The GrowX extension shows its Google button by the same rule, so one switch (Supabase → Authentication → Providers
 * → Google) turns Google sign-in on or off for both. Cached for 5 minutes; a slow or failed check never blocks a page
 * for long and hides the button (fails closed).
 */
export async function googleSignInAvailable(): Promise<boolean> {
  const cfg = getSupabasePublicConfig();
  if (!cfg) return false;
  try {
    const res = await fetch(`${cfg.url}/auth/v1/settings`, {
      headers: { apikey: cfg.key },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(2500),
    } as RequestInit & { next?: { revalidate: number } });
    if (!res.ok) return false;
    const settings = (await res.json()) as { external?: Record<string, unknown> } | null;
    return settings?.external?.google === true;
  } catch {
    return false;
  }
}
