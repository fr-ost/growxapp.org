"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface BusyContext {
  busy: boolean;
  set: (key: string, on: boolean) => void;
}

const Ctx = createContext<BusyContext | null>(null);

/**
 * Wraps a sign-in card that offers more than one way in (Continue with Google and the email form): while one of them
 * is in progress, the others are disabled, so two sign-ins never race.
 */
export function AuthBusyProvider({ children }: { children: ReactNode }) {
  const [keys, setKeys] = useState<string[]>([]);
  const set = useCallback((key: string, on: boolean) => {
    setKeys((k) => (on ? (k.includes(key) ? k : [...k, key]) : k.includes(key) ? k.filter((x) => x !== key) : k));
  }, []);
  const value = useMemo(() => ({ busy: keys.length > 0, set }), [keys.length, set]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Reports this control's pending state; returns true while ANY sign-in in the card is in progress (or this one is). */
export function useAuthBusy(key: string, pending: boolean): boolean {
  const ctx = useContext(Ctx);
  const set = ctx?.set;
  useEffect(() => {
    if (!set) return;
    set(key, pending);
    return () => set(key, false);
  }, [set, key, pending]);
  return pending || !!ctx?.busy;
}
