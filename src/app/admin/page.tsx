import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminNav, fmtDate as fmtAdminDate, fmtMoney } from "@/components/admin/admin-nav";
import { AllocationIncrease, EarlyBirdEditor } from "@/components/admin/early-bird-admin";
import { GiftAudit, GiftList, GrantGift } from "@/components/admin/gifts-admin";
import { XAccountsAdmin } from "@/components/admin/x-accounts-admin";
import { AppShell, Panel } from "@/components/app-shell";
import { IconAt, IconChart, IconGift, IconMail, IconStar, IconUsers } from "@/components/icons";
import { Notice } from "@/components/ui/primitives";
import { getTier } from "@/config/pricing";
import { isAdmin } from "@/lib/admin/auth";
import { listUsers, loadAdminActions, loadStats, planLabel, type AdminStats } from "@/lib/admin/console";
import { loadEarlyBirdAdmin, loadGifts, loadInvoices } from "@/lib/admin/data";
import { pageMetadata } from "@/lib/seo";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/require-user";

export const metadata = pageMetadata({ title: "Admin", description: "GrowX administration.", path: "/admin", noindex: true });
export const dynamic = "force-dynamic";

const fmt = (iso: string) => new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(new Date(iso)) + " UTC";
const money = (minor: number | null) => (minor === null ? "-" : `$${(minor / 100).toFixed(2)}`);

/** Admin dashboard. Only users listed in public.admins can see it (others get a 404); every action is re-checked on the server. */
export default async function AdminPage() {
  const user = await requireUser("/admin");
  if (!(await isAdmin(user.id))) notFound();

  const admin = createAdminClient();
  const [gifts, eb, invoices, stats, recent, actions] = await Promise.all([
    loadGifts(admin).catch(() => null),
    loadEarlyBirdAdmin(admin).catch(() => null),
    loadInvoices(admin).catch(() => null),
    loadStats(admin, user.id).catch(() => null),
    listUsers(admin, user.id, { q: "", filter: "all", page: 1 }).catch(() => null),
    loadAdminActions(admin, { limit: 8 }).catch(() => null),
  ]);
  const lifetime = getTier("PRO_LIFETIME");

  return (
    <AppShell email={user.email} admin active="/admin">
      <div className="animate-fade-up">
        <h1 className="text-3xl font-extrabold tracking-tight">Admin</h1>
        <p className="mt-1 text-text-2">Users, payments, Premium gifts, X accounts and the Lifetime early-bird offer. Every change is recorded with your account and the time.</p>
        <div className="mt-4"><AdminNav current="/admin" /></div>
      </div>

      <Panel title="Overview" icon={<IconChart size={17} />}>
        {stats ? <Overview stats={stats} /> : <Notice tone="error">Statistics could not be loaded. Check that the admin console migration is applied.</Notice>}
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Newest users" icon={<IconUsers size={17} />} action={<Link href="/admin/users" className="text-sm font-semibold text-accent-ink hover:underline">All users →</Link>}>
          {recent?.rows.length ? (
            <ul className="divide-y divide-border text-sm" aria-label="Newest users">
              {recent.rows.slice(0, 8).map((r) => (
                <li key={r.id} className="flex flex-wrap justify-between gap-2 py-2">
                  <Link href={`/admin/users/${r.id}`} className="font-semibold text-accent-ink hover:underline">{r.email ?? r.id}</Link>
                  <span className="text-text-2">{planLabel(r)} · {fmtAdminDate(r.createdAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">{recent ? "No users yet." : "Users could not be loaded."}</p>
          )}
        </Panel>
        <Panel title="Recent admin actions" icon={<IconUsers size={17} />} action={<Link href="/admin/audit" className="text-sm font-semibold text-accent-ink hover:underline">Audit log →</Link>}>
          {actions?.length ? (
            <ul className="space-y-1.5 text-sm" aria-label="Recent admin actions">
              {actions.map((a) => (
                <li key={a.id}>
                  <strong>{a.label}</strong>{a.target ? <> · {a.targetUserId ? <Link href={`/admin/users/${a.targetUserId}`} className="text-accent-ink hover:underline">{a.target}</Link> : a.target}</> : null}
                  <span className="block text-xs text-text-2">{fmtAdminDate(a.createdAt)} · by {a.admin}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">{actions ? "No account actions yet." : "The admin log could not be loaded."}</p>
          )}
        </Panel>
      </div>

      <Panel title="Premium Gifts" icon={<IconGift size={17} />}>
        {gifts ? (
          <div className="space-y-6">
            <GrantGift />
            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Gifts</h3>
              <GiftList gifts={gifts.gifts} />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Audit log</h3>
              <GiftAudit rows={gifts.audit} />
            </div>
          </div>
        ) : (
          <Notice tone="error">Gifts could not be loaded. Check that the admin migration is applied (/api/health).</Notice>
        )}
      </Panel>

      <Panel title="Invoices" icon={<IconMail size={17} />}>
        {invoices ? (
          invoices.length ? (
            <ul className="divide-y divide-border text-sm" aria-label="Invoices">
              {invoices.map((i) => (
                <li key={i.paymentId} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                  <span>
                    <a href={`/invoices/${i.paymentId}`} className="font-mono font-semibold text-accent hover:underline">{i.number}</a>{" "}
                    <span className="text-text-2">· {i.customer ?? "?"} · {i.product}</span>
                  </span>
                  <span className="text-text-2">
                    {money(i.amountMinor)} {i.currency}{i.refundedMinor > 0 ? ` (refunded ${money(i.refundedMinor)})` : ""} · {i.status === "succeeded" ? "Paid" : i.status} · {fmt(i.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">No invoices yet.</p>
          )
        ) : (
          <Notice tone="error">Invoices could not be loaded.</Notice>
        )}
      </Panel>

      <Panel title="X Accounts" icon={<IconAt size={17} />}>
        <p className="mb-4 text-sm text-text-2">Change or unlink any user&apos;s linked X username. A new name must not be linked to another account; every change is recorded with your account and the reason.</p>
        <XAccountsAdmin />
      </Panel>

      <Panel title="Lifetime Early Bird" icon={<IconStar size={17} />}>
        {eb ? (
          <div className="space-y-6">
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4" data-testid="early-bird-stats">
              {[
                ["Regular Lifetime", lifetime.priceLabel],
                ["Early Bird price", lifetime.earlyBird?.priceLabel ?? "-"],
                ["Campaign allocation", String(eb.status.campaign_allocation)],
                ["Successful purchases", String(eb.status.sold)],
                ["Spots remaining", String(eb.status.remaining)],
                ["Pending reservations", String(eb.status.open_reservations)],
                ["Offer status", eb.status.enabled ? "Enabled" : "Disabled"],
                ["Customers see", eb.status.state === "available" ? lifetime.earlyBird?.priceLabel ?? "-" : eb.status.state === "unavailable" ? `${lifetime.priceLabel} (all spots reserved)` : lifetime.priceLabel],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border px-4 py-3">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="mt-1 text-lg font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            {process.env.EARLY_ADOPTER_ENABLED === "false" ? (
              <Notice tone="warn">EARLY_ADOPTER_ENABLED=false is set in this deployment: everyone pays {lifetime.priceLabel} regardless of the settings below.</Notice>
            ) : null}
            <EarlyBirdEditor remaining={eb.status.remaining} enabled={eb.status.enabled} sold={eb.status.sold} allocation={eb.status.campaign_allocation} updatedAt={eb.status.updated_at} />
            <AllocationIncrease allocation={eb.status.campaign_allocation} />
            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Inventory history</h3>
              {eb.events.length ? (
                <ul className="space-y-1 text-xs text-text-2" aria-label="Inventory history">
                  {eb.events.map((e) => (
                    <li key={e.id}>
                      {fmt(e.createdAt)} · {e.admin} ·{" "}
                      {e.action === "increase_allocation"
                        ? `allocation ${e.prevAllocation} → ${e.newAllocation}`
                        : `remaining ${e.prevRemaining} → ${e.newRemaining}, ${e.prevEnabled ? "enabled" : "disabled"} → ${e.newEnabled ? "enabled" : "disabled"}`}{" "}
                      (sold at the time: {e.soldAtChange}){e.reason ? ` · "${e.reason}"` : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">No changes yet.</p>
              )}
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Recent early-bird purchases</h3>
              {eb.sales.length ? (
                <ul className="space-y-1 text-xs text-text-2" aria-label="Early-bird purchases">
                  {eb.sales.map((s) => (
                    <li key={s.slot}>#{s.slot} · {fmt(s.claimedAt)} · {s.buyer ?? "?"} · {money(s.amountMinor)} · payment {s.paymentStatus ?? "?"}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">No early-bird purchases yet.</p>
              )}
            </div>
          </div>
        ) : (
          <Notice tone="error">The early-bird settings could not be loaded. Check that the admin migration is applied (/api/health).</Notice>
        )}
      </Panel>
    </AppShell>
  );
}

function Overview({ stats }: { stats: AdminStats }) {
  const usd = stats.revenue.USD ?? { gross: 0, refunded: 0, net: 0 };
  const other = Object.keys(stats.revenue).filter((c) => c !== "USD");
  const cards: [string, string, string?][] = [
    ["Users", String(stats.users_total), `+${stats.users_7d} this week · +${stats.users_30d} in 30 days`],
    ["Premium (paid)", String(stats.paid_active), `${stats.lifetime} lifetime`],
    ["Gifts running", String(stats.gifts_active)],
    ["Trials running", String(stats.trials_active), `${stats.trials_total} started in total`],
    ["Revenue (net)", fmtMoney(usd.net), `gross ${fmtMoney(usd.gross)} · refunded ${fmtMoney(usd.refunded)}`],
    ["Last 30 days", fmtMoney(stats.revenue_30d.USD ?? 0), `${stats.payments_30d} payment${stats.payments_30d === 1 ? "" : "s"}`],
    ["Linked X accounts", String(stats.x_accounts_active), `${stats.sessions_active} active sessions`],
    ["Needs attention", String(stats.orders_refund_required + stats.unconfirmed), `${stats.orders_refund_required} refunds to make · ${stats.unconfirmed} unconfirmed emails · ${stats.suspended} suspended`],
  ];
  const max = Math.max(1, ...stats.signups_14d.map((d) => d.count));
  return (
    <div className="space-y-6">
      {stats.orders_refund_required > 0 ? (
        <Notice tone="warn">
          {stats.orders_refund_required} paid {stats.orders_refund_required === 1 ? "order needs" : "orders need"} a manual refund. <Link href="/admin/payments" className="font-semibold underline">See payments</Link>.
        </Notice>
      ) : null}
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4" data-testid="admin-stats">
        {cards.map(([k, v, sub]) => (
          <div key={k} className="rounded-xl border border-border px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
            <dd className="mt-1 text-xl font-bold tabular-nums">{v}</dd>
            {sub ? <dd className="mt-0.5 text-xs text-text-2">{sub}</dd> : null}
          </div>
        ))}
      </dl>
      {other.length ? <p className="text-xs text-muted">Also received in: {other.map((c) => `${fmtMoney(stats.revenue[c].net, c)} net`).join(", ")}.</p> : null}
      <div>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted">Sign-ups, last 14 days</h3>
        <div className="flex h-28 items-end gap-1.5" role="img" aria-label={`Sign-ups per day: ${stats.signups_14d.map((d) => d.count).join(", ")}`}>
          {stats.signups_14d.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] tabular-nums text-text-2">{d.count || ""}</span>
              <span className="w-full rounded-t bg-accent/80" style={{ height: `${Math.max(2, (d.count / max) * 80)}px` }} title={`${d.day}: ${d.count}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

