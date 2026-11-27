import type { AuthErrorCode } from "@/lib/auth/flow";

export type NoticeTone = "error" | "success" | "info";
export type LoginNoticeCode = AuthErrorCode | "session_replaced";

/** Every ?error= code the sign-in flows send to /login, in plain words. */
export const LOGIN_ERRORS: Record<LoginNoticeCode, { text: string; tone: NoticeTone }> = {
  auth_callback: { text: "That sign-in link is invalid. Please log in or request a new link.", tone: "error" },
  session_replaced: {
    text: "You were signed out because your GrowX account was signed in on another device. Please sign in again to continue.",
    tone: "error",
  },
  link_expired: { text: "That link has expired or was already used. Please log in, or request a new link.", tone: "error" },
  link_other_browser: { text: "Your email is confirmed. Please log in to continue.", tone: "success" },
  reset_other_browser: {
    text: "That password reset link was opened in a different browser. Request a new link and open it in the browser you use for GrowX.",
    tone: "error",
  },
  session_failed: { text: "We could not finish signing you in. Please try again.", tone: "error" },
  account_unavailable: { text: "This account can't sign in right now. Please contact support.", tone: "error" },
  google_unavailable: {
    text: "Google sign-in is not available right now. Please log in with your email and password.",
    tone: "error",
  },
  google_failed: {
    text: "Google sign-in didn't work. Please try again, or log in with your email and password.",
    tone: "error",
  },
  google_cancelled: {
    text: "Google sign-in was cancelled. Choose a Google account to continue, or log in with your email.",
    tone: "info",
  },
  google_expired: { text: "That Google sign-in took too long or was already used. Please try again.", tone: "error" },
  google_other_browser: {
    text: "Google sign-in has to start and finish in the same browser. Please press Continue with Google again here.",
    tone: "error",
  },
};

/** The notice for a ?error= value, or undefined for anything unknown (never echoes the raw value). */
export function loginNotice(code: unknown): { text: string; tone: NoticeTone } | undefined {
  return typeof code === "string" && Object.hasOwn(LOGIN_ERRORS, code) ? LOGIN_ERRORS[code as LoginNoticeCode] : undefined;
}
