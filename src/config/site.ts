const trim = (v: string | undefined) => (v ?? "").trim();

export const PRODUCTION_URL = "https://www.growxapp.org";

const isLocal = (u: string) => /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/i.test(u);

/**
 * Canonical site URL. In a Vercel production deployment a localhost value
 * (e.g. copied from .env.example) is ignored, so production metadata and auth
 * links can never point at localhost. Local development keeps localhost.
 */
export function resolveSiteUrl(raw: string | undefined, vercelEnv: string | undefined): string {
  const v = trim(raw).replace(/\/$/, "");
  if (!v || !/^https?:\/\//i.test(v)) return PRODUCTION_URL;
  if (vercelEnv === "production" && isLocal(v)) return PRODUCTION_URL;
  return v;
}

export const isLocalUrl = isLocal;

export const site = {
  name: "GrowX",
  tagline: "The Ultimate X (Twitter) Growth Tool",
  /** Person shown in copyright, About and structured data. */
  author: "Shahriar Ahmed",
  authorUrl: "https://www.shahriarahmed.net",
  description:
    "GrowX is the all-in-one X (Twitter) growth tool for Chrome: smart auto follow, a post scheduler, an on-device AI writer, analytics, an unfollower tracker and cleanup.",
  /**
   * The one canonical definition of GrowX, said the same way everywhere: the home page intro, /about, /press, the
   * footer, the Organization and SoftwareApplication descriptions and llms.txt. Change it here only.
   */
  definition:
    "GrowX is a Chrome extension for X (Twitter) that grows your account with safe auto follow, a post scheduler, on-device AI writing and replies, analytics, and an unfollower tracker. It is free to start.",
  /** Other names GrowX is known by (the Chrome Web Store name must not change). */
  alternateNames: ["GrowX App", "growxapp", "GrowX: The Ultimate X (Twitter) Growth Tool"],
  /** One factual line that tells GrowX apart from other products called GrowX (on /about and /press). */
  disambiguation:
    "GrowX (growxapp.org) is the Chrome extension for X made by Shahriar Ahmed. It is not connected to other products or companies that use the name GrowX.",
  /** When GrowX first launched (YYYY-MM-DD). TODO: fill in; the fact sheet row stays hidden while it is empty. */
  launchDate: "" as string,
  /** The founder's own public profiles (Person sameAs). */
  founderProfiles: ["https://x.com/0x_nation", "https://bd.linkedin.com/in/shahriar-bmb", "https://www.shahriarahmed.net"],
  /** The founder's X handle: twitter:creator on every page. */
  creatorHandle: "@0x_nation",
  /**
   * GrowX's own profiles. TODO: fill in when they exist (never a guess). Empty values are left out of the
   * Organization's sameAs; twitter:site is set only when `x` has a handle.
   */
  profiles: {
    /** GrowX's own X handle, with @ (for twitter:site), e.g. "@growxapp" once the account exists. */
    x: "" as string,
    productHunt: "" as string,
    youtube: "" as string,
    crunchbase: "" as string,
    f6s: "" as string,
  },
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV),
  supportEmail: trim(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) || "support@growxapp.org",
  /** Google tag (Google Ads) ID, provided by the owner. Loaded only on the production deployment. */
  googleTagId: trim(process.env.NEXT_PUBLIC_GOOGLE_TAG_ID) || "AW-18494416712",
  /** Google Tag Manager container, provided by the owner. Loaded only on the production deployment. */
  googleTagManagerId: trim(process.env.NEXT_PUBLIC_GTM_ID) || "GTM-5XNK7H8N",
  /** Google Ads conversion actions ("AW-ID/label"). Sign-up is off until its label is provided. */
  googleConversions: {
    purchase: trim(process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE) || "AW-18494416712/XJfkCPCv4aEdEMjO6fJE",
    signup: trim(process.env.NEXT_PUBLIC_GOOGLE_ADS_SIGNUP),
  },
  /** Contact channel published by the extension itself (shared/config.js). */
  telegram: [
    { label: "Shahriar Ahmed", href: "https://t.me/igfrostt" },
  ],
  /** Browser and installed-app theme colour (meta theme-color and the web manifest): the page background behind the header. */
  themeColor: "#fffcfb",
  /** Shown in legal drafts. Provided by the owner. */
  legalName: "Shahriar Ahmed Tushar",
  legalAddress: "Rajshahi, Bangladesh",
} as const;
