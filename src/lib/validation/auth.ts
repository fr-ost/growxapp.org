import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email("Enter a valid email address.")),
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .max(72, "Use at most 72 characters."),
});

const BASE = "http://growx.invalid";

/**
 * Allow only same-site relative paths as post-login destinations, so `next` can never be an open redirect: no scheme,
 * no `//host`, no backslashes or control characters, and nothing that resolves (after `.`/`..` segments) to another
 * host. Sign-in endpoints (/auth/*) and the API (/api/*) are refused too, so a destination cannot loop back into a
 * sign-in or land on raw JSON. Returns the normalised path (non-ASCII percent-encoded).
 */
export function safeNextPath(next: unknown, fallback = "/dashboard"): string {
  if (typeof next !== "string" || next.length > 2048) return fallback;
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return fallback;
  if (/[\u0000-\u001f\u007f]/.test(next)) return fallback;
  let url: URL;
  try {
    url = new URL(next, BASE);
  } catch {
    return fallback;
  }
  if (url.origin !== BASE) return fallback;
  const path = `${url.pathname}${url.search}${url.hash}`;
  if (path.startsWith("//") || /^\/(?:auth|api)(?:\/|$)/i.test(url.pathname)) return fallback;
  return path;
}
