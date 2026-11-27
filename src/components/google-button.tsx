import { googleAction } from "@/app/login/actions";
import { GoogleSignInForm } from "@/components/auth/google-sign-in";
import { googleSignInAvailable } from "@/lib/auth/google";

/**
 * "Continue with Google" with an "or" divider above the email form. Shown when the Google provider is enabled in the
 * Supabase project (the same rule as the extension); hidden otherwise, so nobody lands on a provider error. `next` is
 * where the person goes after signing in.
 */
export async function GoogleButton({ next }: { next?: string }) {
  if (!(await googleSignInAvailable())) return null;
  return (
    <div className="space-y-5" data-testid="google-sign-in-block">
      <GoogleSignInForm action={googleAction} next={next} />
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted" aria-hidden="true">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
