import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminNav, fmtDate } from "@/components/admin/admin-nav";
import { AppShell, Panel } from "@/components/app-shell";
import { IconShield } from "@/components/icons";
import { Notice } from "@/components/ui/primitives";
import { isAdmin } from "@/lib/admin/auth";
import { loadAdminActions, loadSupportXEvents } from "@/lib/admin/console";
import { loadEarlyBirdAdmin, loadGifts } from "@/lib/admin/data";
import { durationLabel } from "@/lib/admin/durations";
import { pageMetadata } from "@/lib/seo";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/require-user";

export const metadata = pageMetadata({ title: "Admin: audit log", description: "GrowX administration.", path: "/admin/audit", noindex: true });
export const dynamic = "force-dynamic";

interface Entry {
  key: string;
  at: string;
  kind: "Account" | "Gift" | "X account" | "Early bird";
  admin: string;
  what: string;
  userId: string | null;
  user: string | null;
  reason: string | null;
}

/** One timeline of every administrator change: account controls, gifts, X-account corrections and early-bird edits. */
export default async function AdminAuditPage() {
  const user = await requireUser("/admin/audit");
  if (!(await isAdmin(user.id))) notFound();
  const admin = createAdminClient();
  const [actions, gifts, xev, eb] = await Promise.all([
    loadAdminActions(admin, { limit: 200 }).catch(() => null),
    loadGifts(admin).catch(() => null),
    loadSupportXEvents(admin).catch(() => null),
    loadEarlyBirdAdmin(admin).catch(() => null),
  ]);
  const failed = [actions, gifts, xev, eb].some((x) => x === null);

  const entries: Entry[] = [
    ...(actions ?? []).map<Entry>((a) => ({ key: `a${a.id}`, at: a.createdAt, kind: "Account", admin: a.admin, what: a.label + (a.action === "change_email" && a.details.to ? ` to ${String(a.details.to)}` : ""), userId: a.targetUserId, user: a.target, reason: a.reason })),
    ...(gifts?.audit ?? []).map<Entry>((g) => ({ key: `g${g.id}`, at: g.createdAt, kind: "Gift", admin: g.admin ?? "?", what: `${g.action} ${g.duration ? durationLabel(g.duration) : ""}`.trim(), userId: null, user: g.recipient, reason: g.reason })),
    ...(xev ?? []).map<Entry>((x) => ({ key: `x${x.id}`, at: x.createdAt, kind: "X account", admin: x.admin, what: `${x.action} @${x.username}`, userId: x.userId, user: x.user, reason: x.reason })),
    ...(eb?.events ?? []).map<Entry>((e) => ({
      key: `e${e.id}`,
      at: e.createdAt,
      kind: "Early bird",
      admin: e.admin ?? "?",
      what: e.action === "increase_allocation" ? `allocation ${e.prevAllocation} → ${e.newAllocation}` : `remaining ${e.prevRemaining} → ${e.newRemaining}, ${e.newEnabled ? "enabled" : "disabled"}`,
      userId: null,
      user: null,
      reason: e.reason,
    })),
  ].sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0));

  return (
    <AppShell email={user.email} admin active="/admin">
      <div className="animate-fade-up space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Audit log</h1>
        <p className="text-text-2">Every change an administrator made, newest first. These records cannot be edited or deleted.</p>
        <AdminNav current="/admin/audit" />
      </div>
      <Panel title="All admin changes" icon={<IconShield size={17} />}>
        {failed ? <div className="mb-4"><Notice tone="warn">Part of the log could not be loaded, so some entries may be missing.</Notice></div> : null}
        {entries.length ? (
          <ul className="divide-y divide-border text-sm" aria-label="Audit log">
            {entries.map((e) => (
              <li key={e.key} className="py-2.5">
                <p>
                  <span className="mr-2 rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-text-2">{e.kind}</span>
                  <strong>{e.what}</strong>
                  {e.user ? <> · {e.userId ? <Link href={`/admin/users/${e.userId}`} className="text-accent-ink hover:underline">{e.user}</Link> : e.user}</> : null}
                </p>
                <p className="mt-0.5 text-xs text-text-2">{fmtDate(e.at)} · by {e.admin}{e.reason ? ` · "${e.reason}"` : ""}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">No admin changes yet.</p>
        )}
      </Panel>
    </AppShell>
  );
}
