import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AdminNav, fmtDate, fmtMoney } from "@/components/admin/admin-nav";
import { GiftList, type GiftView } from "@/components/admin/gifts-admin";
import { GrantGiftTo, UserActions } from "@/components/admin/user-controls";
import { XAccountsAdmin } from "@/components/admin/x-accounts-admin";
import { AppShell, Panel } from "@/components/app-shell";
import { IconAt, IconGift, IconLock, IconMail, IconShield, IconUser } from "@/components/icons";
import { Badge, Notice } from "@/components/ui/primitives";
import { isAdmin } from "@/lib/admin/auth";
import { isSuspended, loadUserDetail } from "@/lib/admin/console";
import { pageMetadata } from "@/lib/seo";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/require-user";

export const metadata = pageMetadata({ title: "Admin: user", description: "GrowX administration.", path: "/admin/users", noindex: true });
export const dynamic = "force-dynamic";

const PLAN_NAMES: Record<string, string> = { FREE: "Free", TRIAL: "Trial", PRO_MONTHLY: "Premium (30 days)", PRO_YEARLY: "Premium (365 days)", PRO_LIFETIME: "Premium Lifetime" };

function Facts({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
          <dd className="mt-0.5 break-words text-sm font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const Empty = ({ children }: { children: ReactNode }) => <p className="text-sm text-muted">{children}</p>;

/** Everything about one account, with the admin controls. Admins only (404 otherwise); every action is re-checked on the server. */
export default async function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const viewer = await requireUser("/admin/users");
  if (!(await isAdmin(viewer.id))) notFound();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const u = await loadUserDetail(createAdminClient(), id).catch(() => null);
  if (!u) notFound();

  const suspended = isSuspended(u.bannedUntil);
  const ent = u.entitlement;
  const gifts: GiftView[] = u.gifts.map((g) => ({
    id: g.id,
    recipient: u.email,
    duration: g.duration,
    status: g.status,
    startsAt: g.startsAt,
    expiresAt: g.expiresAt,
    reason: g.reason,
    grantedBy: g.grantedBy,
    revokedAt: g.revokedAt,
    revokedBy: null,
    revokeReason: null,
  }));

  return (
    <AppShell email={viewer.email} admin active="/admin">
      <div className="animate-fade-up space-y-4">
        <p className="text-sm"><Link href="/admin/users" className="font-semibold text-accent-ink hover:underline">← All users</Link></p>
        <h1 className="break-all text-3xl font-extrabold tracking-tight" data-testid="admin-user-email">{u.email ?? u.id}</h1>
        <div className="flex flex-wrap gap-2">
          {u.isAdmin ? <Badge tone="solid">Admin</Badge> : null}
          {suspended ? <Badge tone="warn">Suspended</Badge> : null}
          <Badge tone={ent?.isPremium ? "ok" : "neutral"}>{ent ? PLAN_NAMES[ent.plan] ?? ent.plan : "Plan unavailable"}</Badge>
          {ent?.gift?.effective ? <Badge tone="accent">Gift</Badge> : null}
          {u.emailConfirmedAt ? null : <Badge tone="neutral">Email not confirmed</Badge>}
        </div>
        <AdminNav current="/admin/users" />
      </div>

      <Panel title="Account" icon={<IconUser size={17} />}>
        <Facts
          rows={[
            ["User id", <span key="id" className="font-mono text-xs">{u.id}</span>],
            ["Email", u.email ?? "-"],
            ["Signed up", fmtDate(u.createdAt)],
            ["Last sign-in", fmtDate(u.lastSignInAt)],
            ["Email confirmed", u.emailConfirmedAt ? fmtDate(u.emailConfirmedAt) : "No"],
            ["Sign-in methods", u.providers.length ? u.providers.join(", ") : "-"],
            ["Suspended", suspended ? `Yes (until ${fmtDate(u.bannedUntil)})` : "No"],
            ["Active sessions", u.sessions.length ? u.sessions.map((s) => `${s.slot} since ${fmtDate(s.activatedAt)}`).join("; ") : "None"],
          ]}
        />
      </Panel>

      <Panel title="Controls" icon={<IconShield size={17} />}>
        <UserActions userId={u.id} email={u.email} suspended={suspended} emailConfirmed={!!u.emailConfirmedAt} isSelf={u.id === viewer.id} isAdmin={u.isAdmin} />
      </Panel>

      <Panel title="Plan and access" icon={<IconLock size={17} />}>
        {ent ? (
          <Facts
            rows={[
              ["Effective plan", PLAN_NAMES[ent.plan] ?? ent.plan],
              ["Premium until", ent.isPremium ? (ent.expiresAt ? fmtDate(ent.expiresAt) : "Never (lifetime)") : "-"],
              ["Source", ent.gift?.effective ? "Gift" : ent.source === "trial" ? "Trial" : ent.source === "subscription" ? "Payment" : "None"],
              ["Payment warning", ent.paymentWarning ? `Past due, grace ends ${fmtDate(ent.paymentWarning.graceEndsAt)}` : "None"],
              ["Trial", ent.trial.used ? `${ent.trial.active ? "Active" : "Used"} (${fmtDate(ent.trial.startedAt)} → ${fmtDate(ent.trial.expiresAt)})` : "Not used"],
              ["Trial X account", u.trials[0]?.xUsername ? `@${u.trials[0].xUsername}` : "-"],
            ]}
          />
        ) : (
          <Notice tone="error">The entitlement could not be loaded.</Notice>
        )}
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Subscriptions</h3>
          {u.subscriptions.length ? (
            <ul className="divide-y divide-border text-sm" aria-label="Subscriptions">
              {u.subscriptions.map((s, i) => (
                <li key={i} className="flex flex-wrap justify-between gap-2 py-2">
                  <span><strong>{PLAN_NAMES[s.plan] ?? s.plan}</strong> · {s.status} · {s.provider}</span>
                  <span className="text-text-2">{s.currentPeriodEnd ? `ends ${fmtDate(s.currentPeriodEnd)}` : "no end date"}{s.accessRevokedAt ? ` · access revoked ${fmtDate(s.accessRevokedAt)}` : ""}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No subscriptions.</Empty>
          )}
        </div>
        <p className="mt-4 text-xs text-muted">Payments, subscriptions and trials are not edited here. To give Premium, grant a gift below; it never changes paid access.</p>
      </Panel>

      <Panel title="Premium gifts" icon={<IconGift size={17} />}>
        <div className="space-y-6">
          {u.id !== viewer.id ? <GrantGiftTo userId={u.id} email={u.email} /> : null}
          {gifts.length ? <GiftList gifts={gifts} /> : <Empty>No gifts.</Empty>}
        </div>
      </Panel>

      <Panel title="Payments and orders" icon={<IconMail size={17} />}>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Payments</h3>
        {u.payments.length ? (
          <ul className="divide-y divide-border text-sm" aria-label="User payments">
            {u.payments.map((p) => (
              <li key={p.id} className="flex flex-wrap justify-between gap-2 py-2">
                <span>
                  {p.status === "succeeded" || p.status === "refunded" ? (
                    <a href={`/invoices/${p.id}`} className="font-semibold text-accent-ink hover:underline">{p.product}</a>
                  ) : (
                    <strong>{p.product}</strong>
                  )}{" "}
                  · {p.status}
                </span>
                <span className="text-text-2">{fmtMoney(p.amountMinor, p.currency)}{p.refundedMinor ? ` (refunded ${fmtMoney(p.refundedMinor, p.currency)})` : ""} · {fmtDate(p.createdAt)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No payments.</Empty>
        )}
        <h3 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wider text-muted">Checkout orders</h3>
        {u.orders.length ? (
          <ul className="divide-y divide-border text-sm" aria-label="User orders">
            {u.orders.map((o) => (
              <li key={o.id} className="flex flex-wrap justify-between gap-2 py-2">
                <span><strong>{o.product}</strong> · {o.status === "refund_required" ? <Badge tone="warn">Refund required</Badge> : o.status}</span>
                <span className="text-text-2">{fmtMoney(o.amountMinor, o.currency)} · {fmtDate(o.createdAt)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No orders.</Empty>
        )}
        {u.slotGrants.length ? (
          <p className="mt-4 text-sm text-text-2">Extra X account slots: {u.slotGrants.filter((s) => s.status === "active").reduce((n, s) => n + s.slots, 0)} active.</p>
        ) : null}
      </Panel>

      <Panel title="X accounts" icon={<IconAt size={17} />}>
        <XAccountsAdmin initial={{ userId: u.id, email: u.email ?? "", bindings: u.x.bindings, events: u.x.events }} />
      </Panel>

      <Panel title="Admin history for this user" icon={<IconShield size={17} />}>
        {u.actions.length ? (
          <ul className="space-y-1 text-xs text-text-2" aria-label="User admin history">
            {u.actions.map((a) => (
              <li key={a.id}>{fmtDate(a.createdAt)} · <strong>{a.label}</strong> by {a.admin}{a.reason ? ` · "${a.reason}"` : ""}</li>
            ))}
          </ul>
        ) : (
          <Empty>No admin actions yet. Gift and X-account changes have their own history above.</Empty>
        )}
      </Panel>
    </AppShell>
  );
}
