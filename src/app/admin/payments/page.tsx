import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminNav, fmtDate, fmtMoney } from "@/components/admin/admin-nav";
import { AppShell, Panel } from "@/components/app-shell";
import { IconAlert, IconMail } from "@/components/icons";
import { Badge, Notice } from "@/components/ui/primitives";
import { isAdmin } from "@/lib/admin/auth";
import { PAYMENT_STATUSES, loadPaymentsAdmin, type PaymentStatusFilter } from "@/lib/admin/console";
import { pageMetadata } from "@/lib/seo";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/require-user";

export const metadata = pageMetadata({ title: "Admin: payments", description: "GrowX administration.", path: "/admin/payments", noindex: true });
export const dynamic = "force-dynamic";

const isStatus = (v: unknown): v is PaymentStatusFilter => typeof v === "string" && (PAYMENT_STATUSES as readonly string[]).includes(v);

/** Payments (read-only), orders that need a manual refund, and open checkouts. Nothing here marks anything as paid. */
export default async function AdminPaymentsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const user = await requireUser("/admin/payments");
  if (!(await isAdmin(user.id))) notFound();
  const sp = await searchParams;
  const status = isStatus(sp.status) ? sp.status : "all";
  const data = await loadPaymentsAdmin(createAdminClient(), status).catch(() => null);

  return (
    <AppShell email={user.email} admin active="/admin">
      <div className="animate-fade-up space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Payments</h1>
        <AdminNav current="/admin/payments" />
      </div>

      {!data ? (
        <Notice tone="error">Payments could not be loaded.</Notice>
      ) : (
        <>
          <Panel title="Refunds to make" icon={<IconAlert size={17} />}>
            <p className="mb-3 text-sm text-text-2">
              Orders paid after the price or spot was no longer available. Refund them manually in NOWPayments (see the refund policy), then reply to the buyer.
            </p>
            {data.refundRequired.length ? (
              <ul className="divide-y divide-border text-sm" aria-label="Refunds to make">
                {data.refundRequired.map((o) => (
                  <li key={o.id} className="flex flex-wrap justify-between gap-2 py-2">
                    <span><Link href={`/admin/users/${o.userId}`} className="font-semibold text-accent-ink hover:underline">{o.buyer}</Link> · {o.product} <Badge tone="warn">Refund required</Badge></span>
                    <span className="text-text-2">{fmtMoney(o.amountMinor, o.currency)} · {fmtDate(o.createdAt)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">Nothing to refund.</p>
            )}
          </Panel>

          <Panel title="Payments" icon={<IconMail size={17} />}>
            <div className="mb-4 flex flex-wrap gap-2" aria-label="Payment status">
              {PAYMENT_STATUSES.map((s) => (
                <Link
                  key={s}
                  href={s === "all" ? "/admin/payments" : `/admin/payments?status=${s}`}
                  aria-current={s === status ? "true" : undefined}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${s === status ? "border-accent bg-accent text-white" : "border-border-strong bg-white text-text-2 hover:border-accent/40"}`}
                >
                  {s === "all" ? "All" : s.replace("_", " ")}
                </Link>
              ))}
            </div>
            {data.payments.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm" data-testid="payments-table">
                  <thead className="text-xs uppercase tracking-wider text-muted">
                    <tr className="border-b border-border">
                      <th className="py-2 pr-3 font-semibold">Buyer</th>
                      <th className="py-2 pr-3 font-semibold">Product</th>
                      <th className="py-2 pr-3 font-semibold">Amount</th>
                      <th className="py-2 pr-3 font-semibold">Status</th>
                      <th className="py-2 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {data.payments.map((p) => (
                      <tr key={p.id}>
                        <td className="py-2.5 pr-3"><Link href={`/admin/users/${p.userId}`} className="font-semibold text-accent-ink hover:underline">{p.buyer}</Link></td>
                        <td className="py-2.5 pr-3">
                          {p.status === "succeeded" || p.status === "refunded" ? <a href={`/invoices/${p.id}`} className="hover:underline">{p.product}</a> : p.product}
                        </td>
                        <td className="py-2.5 pr-3">{fmtMoney(p.amountMinor, p.currency)}{p.refundedMinor ? <span className="text-text-2"> (refunded {fmtMoney(p.refundedMinor, p.currency)})</span> : null}</td>
                        <td className="py-2.5 pr-3"><Badge tone={p.status === "succeeded" ? "ok" : p.status === "refunded" || p.status === "disputed" ? "warn" : "neutral"}>{p.status.replace("_", " ")}</Badge></td>
                        <td className="py-2.5 text-text-2">{fmtDate(p.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted">No payments{status !== "all" ? ` with status "${status}"` : ""}.</p>
            )}
            <p className="mt-4 text-xs text-muted">Payments come only from verified NOWPayments callbacks. They cannot be created or marked as paid here; use a gift to give Premium manually.</p>
          </Panel>

          <Panel title="Open checkouts" icon={<IconMail size={17} />}>
            {data.openOrders.length ? (
              <ul className="divide-y divide-border text-sm" aria-label="Open checkouts">
                {data.openOrders.map((o) => (
                  <li key={o.id} className="flex flex-wrap justify-between gap-2 py-2">
                    <span><Link href={`/admin/users/${o.userId}`} className="font-semibold text-accent-ink hover:underline">{o.buyer}</Link> · {o.product} · {o.status}</span>
                    <span className="text-text-2">{fmtMoney(o.amountMinor, o.currency)} · {fmtDate(o.createdAt)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">No open checkouts.</p>
            )}
          </Panel>
        </>
      )}
    </AppShell>
  );
}
