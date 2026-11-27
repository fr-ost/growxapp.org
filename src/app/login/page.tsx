import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { ClearStaleSession } from "@/components/clear-stale-session";
import { AuthShell } from "@/components/auth-ui";
import { GoogleButton } from "@/components/google-button";
import { Notice } from "@/components/ui/primitives";
import { loginNotice } from "@/lib/auth/messages";
import { isSupabaseConfigured } from "@/lib/env";
import { pageMetadata } from "@/lib/seo";
import { getCurrentUser } from "@/lib/supabase/user";
import { safeNextPath } from "@/lib/validation/auth";
import { loginAction } from "./actions";

export const metadata = pageMetadata({ title: "Log in", description: "Log in to your GrowX account.", path: "/login", noindex: true });

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const sp = await searchParams;
  const next = safeNextPath(sp.next);
  if (await getCurrentUser()) redirect(next);
  const err = loginNotice(sp.error);
  return (
    <AuthShell title="Welcome back" subtitle="Log in to your GrowX account.">
      {sp.error === "session_replaced" ? <ClearStaleSession /> : null}
      {err ? (
        <Notice tone={err.tone}>
          {err.text}
        </Notice>
      ) : null}
      <GoogleButton next={next} />
      <AuthForm mode="login" action={loginAction} next={next} disabled={!isSupabaseConfigured()} />
    </AuthShell>
  );
}
