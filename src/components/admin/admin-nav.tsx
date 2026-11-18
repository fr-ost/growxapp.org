import Link from "next/link";

const TABS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/audit", label: "Audit log" },
] as const;

export type AdminTab = (typeof TABS)[number]["href"];

/** Section tabs shared by every admin page. */
export function AdminNav({ current }: { current: AdminTab }) {
  return (
    <nav aria-label="Admin sections" className="flex flex-wrap gap-2">
      {TABS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={t.href === current ? "page" : undefined}
          className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
            t.href === current ? "border-ink bg-ink text-white" : "border-hairline-strong bg-white text-text-2 hover:border-accent/40 hover:text-accent-ink"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

export const fmtDate = (iso: string | null | undefined) =>
  iso ? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(new Date(iso)) + " UTC" : "-";
export const fmtMoney = (minor: number | null | undefined, currency = "USD") => (minor === null || minor === undefined ? "-" : `${(minor / 100).toFixed(2)} ${currency}`);
