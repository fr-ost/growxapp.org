import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminNav, fmtDate } from "@/components/admin/admin-nav";
import { AppShell, Panel } from "@/components/app-shell";
import { IconUsers } from "@/components/icons";
import { Badge, Notice } from "@/components/ui/primitives";
import { isAdmin } from "@/lib/admin/auth";
import { USER_FILTERS, USER_FILTER_LABELS, isSuspended, isUserFilter, listUsers, planLabel } from "@/lib/admin/console";
import { pageMetadata } from "@/lib/seo";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireUser } from "@/lib/supabase/require-user";

export const metadata = pageMetadata({ title: "Admin: users", description: "GrowX administration.", path: "/admin/users", noindex: true });
export const dynamic = "force-dynamic";

type SP = Promise<{ q?: string; filter?: string; page?: string }>;

/** User directory: search by email, user id or linked X username; filter by plan and state; newest first. */
export default async function AdminUsersPage({ searchParams }: { searchParams: SP }) {
  const user = await requireUser("/admin/users");
  if (!(await isAdmin(user.id))) notFound();
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().slice(0, 320);
  const filter = isUserFilter(sp.filter) ? sp.filter : "all";
  const page = Math.max(1, Number(sp.page) || 1);
  const result = await listUsers(createAdminClient(), user.id, { q, filter, page }).catch(() => null);
  const link = (o: { q?: string; filter?: string; page?: number }) => {
    const p = new URLSearchParams();
    const qq = o.q ?? q;
    const ff = o.filter ?? filter;
    if (qq) p.set("q", qq);
    if (ff !== "all") p.set("filter", ff);
    if (o.page && o.page > 1) p.set("page", String(o.page));
    const s = p.toString();
    return `/admin/users${s ? `?${s}` : ""}`;
  };

  return (
    <AppShell email={user.email} admin active="/admin">
      <div className="animate-fade-up space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Users</h1>
        <AdminNav current="/admin/users" />
      </div>

      <Panel title="Find users" icon={<IconUsers size={17} />}>
        <form method="get" action="/admin/users" className="flex flex-col gap-2 sm:flex-row" role="search">
          <label className="sr-only" htmlFor="admin_user_q">Search</label>
          <input
            id="admin_user_q"
            name="q"
            defaultValue={q}
            placeholder="Email, user id or @XUsername"
            className="h-10 w-full rounded-lg border border-border-strong bg-white px-3 text-sm focus:border-accent focus:outline-none"
          />
          {filter !== "all" ? <input type="hidden" name="filter" value={filter} /> : null}
          <button type="submit" className="h-10 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-ink-2">Search</button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Filters">
          {USER_FILTERS.map((f) => (
            <Link
              key={f}
              href={link({ filter: f, page: 1 })}
              aria-current={f === filter ? "true" : undefined}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${f === filter ? "border-accent bg-accent text-white" : "border-border-strong bg-white text-text-2 hover:border-accent/40"}`}
            >
              {USER_FILTER_LABELS[f]}
            </Link>
          ))}
        </div>

        {!result ? (
          <div className="mt-6">
            <Notice tone="error">Users could not be loaded. Check that the admin console migration is applied.</Notice>
          </div>
        ) : (
          <div className="mt-6">
            <p className="mb-3 text-sm text-text-2" data-testid="user-count">
              {result.total} {result.total === 1 ? "user" : "users"}
              {q ? <> matching &ldquo;{q}&rdquo;</> : null}
            </p>
            {result.rows.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm" data-testid="user-table">
                  <thead className="text-xs uppercase tracking-wider text-muted">
                    <tr className="border-b border-border">
                      <th className="py-2 pr-3 font-semibold">User</th>
                      <th className="py-2 pr-3 font-semibold">Plan</th>
                      <th className="py-2 pr-3 font-semibold">X accounts</th>
                      <th className="py-2 pr-3 font-semibold">Joined</th>
                      <th className="py-2 font-semibold">Last sign-in</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {result.rows.map((u) => (
                      <tr key={u.id}>
                        <td className="py-2.5 pr-3">
                          <Link href={`/admin/users/${u.id}`} className="font-semibold text-accent-ink hover:underline">{u.email ?? u.id}</Link>
                          <span className="mt-1 flex flex-wrap gap-1">
                            {u.isAdmin ? <Badge tone="solid">Admin</Badge> : null}
                            {isSuspended(u.bannedUntil) ? <Badge tone="warn">Suspended</Badge> : null}
                            {!u.emailConfirmedAt ? <Badge tone="neutral">Unconfirmed</Badge> : null}
                            {u.providers.includes("google") ? <Badge tone="neutral">Google</Badge> : null}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3">
                          <Badge tone={u.paidActive || u.giftActive ? "ok" : u.trialActive ? "accent" : "neutral"}>{planLabel(u)}</Badge>
                          {u.payments ? <span className="ml-1 text-xs text-muted">{u.payments} payment{u.payments === 1 ? "" : "s"}</span> : null}
                        </td>
                        <td className="py-2.5 pr-3 text-text-2">{u.xAccounts.length ? u.xAccounts.map((x) => `@${x}`).join(", ") : "-"}</td>
                        <td className="py-2.5 pr-3 text-text-2">{fmtDate(u.createdAt)}</td>
                        <td className="py-2.5 text-text-2">{fmtDate(u.lastSignInAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted">No users match.</p>
            )}
            {result.pages > 1 ? (
              <nav aria-label="Pages" className="mt-4 flex items-center justify-between text-sm">
                {result.page > 1 ? <Link href={link({ page: result.page - 1 })} className="font-semibold text-accent-ink hover:underline">← Newer</Link> : <span />}
                <span className="text-muted">Page {result.page} of {result.pages}</span>
                {result.page < result.pages ? <Link href={link({ page: result.page + 1 })} className="font-semibold text-accent-ink hover:underline">Older →</Link> : <span />}
              </nav>
            ) : null}
          </div>
        )}
      </Panel>
    </AppShell>
  );
}
