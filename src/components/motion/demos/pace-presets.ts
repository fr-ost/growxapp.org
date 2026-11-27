/** Follow pace presets, exactly as in docs/PRODUCT_FACTS.md (extension v2.5.1): Slow is free, the rest are Premium. */
export type PaceId = "slow" | "balanced" | "turbo" | "xpremium";

export const PACE_PRESETS: readonly {
  id: PaceId;
  name: string;
  /** Seconds between follows [min, max]. */
  delay: readonly [number, number];
  restEvery: number;
  perHour: number;
  /** Approximate daily cap. */
  perDay: number;
  premium: boolean;
  note: string;
}[] = [
  { id: "slow", name: "Slow", delay: [50, 120], restEvery: 10, perHour: 14, perDay: 100, premium: false, note: "free forever, gentle on new accounts" },
  { id: "balanced", name: "Balanced", delay: [30, 75], restEvery: 18, perHour: 28, perDay: 280, premium: true, note: "recommended for most accounts" },
  { id: "turbo", name: "Turbo", delay: [18, 45], restEvery: 25, perHour: 40, perDay: 390, premium: true, note: "aged accounts" },
  { id: "xpremium", name: "X Premium", delay: [12, 32], restEvery: 35, perHour: 60, perDay: 800, premium: true, note: "accounts with X Premium only" },
] as const;

export function pacePreset(id: PaceId) {
  return PACE_PRESETS.find((p) => p.id === id) ?? PACE_PRESETS[0];
}
