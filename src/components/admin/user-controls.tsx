"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/primitives";
import { GIFT_DURATIONS, durationLabel, type GiftDuration } from "@/lib/admin/durations";

const input = "h-10 w-full rounded-lg border border-border-strong bg-white px-3 text-sm focus:border-accent focus:outline-none";

async function post(url: string, body: unknown): Promise<{ ok: boolean; json: { error?: { message?: string }; [k: string]: unknown } }> {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
    return { ok: res.ok, json: await res.json().catch(() => ({})) };
  } catch {
    return { ok: false, json: { error: { message: "Network error." } } };
  }
}

type ActionId = "revoke_sessions" | "suspend" | "unsuspend" | "confirm_email" | "send_password_reset" | "change_email";

interface ActionDef {
  id: ActionId;
  label: string;
  confirm: string;
  help: string;
  danger?: boolean;
}

/**
 * Account controls on the admin user page. Every action asks for a reason, then an explicit confirmation, and the
 * server records it in the audit log. Which actions show depends on the account's state.
 */
export function UserActions({ userId, email, suspended, emailConfirmed, isSelf, isAdmin }: { userId: string; email: string | null; suspended: boolean; emailConfirmed: boolean; isSelf: boolean; isAdmin: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState<ActionId | null>(null);
  const [reason, setReason] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  if (isSelf) return <Notice tone="info">This is your own account. Use your account settings to change it.</Notice>;

  const defs: ActionDef[] = [
    { id: "revoke_sessions", label: "Sign out everywhere", confirm: "Sign out now", help: "Ends every session on the website and in the extension. The user can sign in again." },
    suspended
      ? { id: "unsuspend", label: "Lift suspension", confirm: "Lift suspension", help: "The user can sign in again." }
      : { id: "suspend", label: "Suspend account", confirm: "Suspend now", help: "Blocks sign-in and signs the user out everywhere until you lift it. Paid access and records are kept.", danger: true },
    ...(!emailConfirmed ? [{ id: "confirm_email" as const, label: "Confirm email", confirm: "Mark as confirmed", help: "Marks the email address as confirmed so the user can sign in." }] : []),
    { id: "send_password_reset", label: "Send password reset", confirm: "Send email", help: `Emails ${email ?? "the user"} the same reset link as "Forgot password".` },
    { id: "change_email", label: "Change email", confirm: "Change email", help: "Changes the sign-in email to a new, confirmed address. It must not belong to another account.", danger: true },
  ];
  const visible = isAdmin ? defs.filter((d) => d.id === "unsuspend" || d.id === "confirm_email") : defs;
  const current = defs.find((d) => d.id === open) ?? null;

  const reset = () => {
    setOpen(null);
    setReason("");
    setNewEmail("");
    setConfirming(false);
  };

  const run = async () => {
    if (!current) return;
    setBusy(true);
    const r = await post(`/api/admin/users/${userId}/actions`, { action: current.id, reason: reason.trim(), ...(current.id === "change_email" ? { email: newEmail.trim() } : {}) });
    if (r.ok) {
      const extra = current.id === "revoke_sessions" ? ` (${Number(r.json.sessions ?? 0)} session${Number(r.json.sessions) === 1 ? "" : "s"} ended)` : "";
      setMsg({ tone: "success", text: `${current.label}: done${extra}. Recorded in the audit log.` });
      reset();
      router.refresh();
    } else {
      setMsg({ tone: "error", text: r.json.error?.message ?? "The action failed." });
      setConfirming(false);
    }
    setBusy(false);
  };

  const ready = reason.trim().length >= 3 && (current?.id !== "change_email" || /.+@.+\..+/.test(newEmail.trim()));

  return (
    <div className="space-y-4" data-testid="user-actions">
      {isAdmin ? <Notice tone="warn">This account is an administrator. Remove it from public.admins in the Supabase SQL Editor before using the other controls.</Notice> : null}
      <div className="flex flex-wrap gap-2">
        {visible.map((d) => (
          <Button
            key={d.id}
            variant={open === d.id ? "primary" : "secondary"}
            onClick={() => {
              setMsg(null);
              if (open === d.id) reset();
              else {
                reset();
                setOpen(d.id);
              }
            }}
          >
            {d.label}
          </Button>
        ))}
      </div>
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      {current ? (
        <div className={`space-y-3 rounded-xl border p-4 ${current.danger ? "border-danger/30 bg-danger-soft/40" : "border-border"}`} data-testid={`action-${current.id}`}>
          <p className="text-sm text-text-2">{current.help}</p>
          {current.id === "change_email" ? (
            <label className="block text-sm">
              <span className="mb-1 block font-semibold">New email</span>
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} maxLength={320} className={input} aria-label="New email" />
            </label>
          ) : null}
          <label className="block text-sm">
            <span className="mb-1 block font-semibold">Reason (recorded in the audit log)</span>
            <input value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} className={input} aria-label="Reason" />
          </label>
          {confirming ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm">
                {current.label} for <strong>{email ?? userId}</strong>
                {current.id === "change_email" ? <> to <strong>{newEmail.trim()}</strong></> : null}?
              </span>
              <Button onClick={run} disabled={busy}>{busy ? <Spinner /> : null} Confirm: {current.confirm}</Button>
              <Button variant="ghost" onClick={() => setConfirming(false)} disabled={busy}>Cancel</Button>
            </div>
          ) : (
            <Button onClick={() => setConfirming(true)} disabled={!ready}>{current.label}…</Button>
          )}
        </div>
      ) : null}
    </div>
  );
}

/** Grant a Premium gift to this user (same rules as the main gift form: one running gift, server-computed expiry). */
export function GrantGiftTo({ userId, email }: { userId: string; email: string | null }) {
  const router = useRouter();
  const [duration, setDuration] = useState<GiftDuration>("30d");
  const [reason, setReason] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const grant = async () => {
    setBusy(true);
    const r = await post("/api/admin/gifts", { userId, duration, ...(reason.trim() ? { reason: reason.trim() } : {}) });
    if (r.ok) {
      setMsg({ tone: "success", text: `Premium gifted (${durationLabel(duration)}).` });
      setReason("");
      router.refresh();
    } else setMsg({ tone: "error", text: r.json.error?.message ?? "Could not grant the gift." });
    setConfirming(false);
    setBusy(false);
  };

  return (
    <div className="space-y-3" data-testid="user-grant-gift">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Gift duration">
        {GIFT_DURATIONS.map((d) => (
          <label key={d.id} className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-semibold ${duration === d.id ? "border-accent bg-accent-soft text-accent" : "border-border-strong"}`}>
            <input type="radio" className="sr-only" name="user_gift_duration" checked={duration === d.id} onChange={() => setDuration(d.id)} />
            {d.label}
          </label>
        ))}
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-semibold">Internal reason (optional, not shown to the user)</span>
        <input value={reason} maxLength={500} onChange={(e) => setReason(e.target.value)} className={input} aria-label="Gift reason" />
      </label>
      {msg ? <Notice tone={msg.tone}>{msg.text}</Notice> : null}
      {confirming ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm">Grant <strong>{durationLabel(duration)}</strong> of Premium to <strong>{email ?? userId}</strong> now?</span>
          <Button onClick={grant} disabled={busy}>{busy ? <Spinner /> : null} Confirm grant</Button>
          <Button variant="ghost" onClick={() => setConfirming(false)} disabled={busy}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={() => setConfirming(true)}>Grant gift…</Button>
      )}
    </div>
  );
}
