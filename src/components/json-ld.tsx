import { pricingTiers, type PricingTier } from "@/config/pricing";
import { site } from "@/config/site";
import { CURRENT_VERSION, LANGUAGES } from "@/content/releases";
import { CWS_URL } from "@/lib/cws";

/** Serialises structured data safely for an inline <script> (escapes "<" so content can't close the tag). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(new RegExp(String.fromCharCode(0x2028), "g"), "\\u2028")
    .replace(new RegExp(String.fromCharCode(0x2029), "g"), "\\u2029");
}

export const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

/** Stable entity ids. The site-wide entities are defined in every page's graph; #software is defined on the home page only. */
export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;
export const PERSON_ID = `${site.url}/#founder`;
export const SOFTWARE_ID = `${site.url}/#software`;
export const LOGO_URL = `${site.url}/icon-512.png`;

type Node = Record<string, unknown>;

/** Drops a node's own "@context" (the graph carries one). */
const bare = (n: unknown): unknown => {
  if (!n || typeof n !== "object" || Array.isArray(n)) return n;
  const { "@context": _ctx, ...rest } = n as Node;
  void _ctx;
  return rest;
};

/**
 * One JSON-LD script per page: a single @graph with the Organization, founder and WebSite, then the page's own nodes.
 * Nodes reference each other by @id (the software entity is defined once, on the home page).
 */
export function JsonLd({ data }: { data: unknown }) {
  const nodes = (Array.isArray(data) ? data : [data]).map(bare);
  const graph = { "@context": "https://schema.org", "@graph": [organizationLd, founderLd, websiteLd, ...nodes] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }} />;
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${abs(items[items.length - 1]?.path ?? "/")}#breadcrumb`,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

/** Use only where the same questions and answers are visible on the page (scripts/seo-check.mjs verifies this). */
export function faqLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** The page itself: part of the website and, unless `about` is false, about the GrowX extension. */
export function webPageLd(opts: { path: string; name: string; description: string; type?: string; about?: boolean; extra?: Node }) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${abs(opts.path)}#webpage`,
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    ...(opts.about === false ? {} : { about: { "@id": SOFTWARE_ID } }),
    ...(opts.path === "/" ? {} : { breadcrumb: { "@id": `${abs(opts.path)}#breadcrumb` } }),
    ...opts.extra,
  };
}

/** The author of every post and the founder of GrowX. */
export const authorLd = { "@type": "Person", "@id": PERSON_ID, name: site.author, url: site.authorUrl };

export const founderLd = {
  ...authorLd,
  jobTitle: "Founder and developer",
  worksFor: { "@id": ORG_ID },
  sameAs: [site.authorUrl, ...site.telegram.map((t) => t.href)],
};

export const organizationLd = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: site.url,
  logo: { "@type": "ImageObject", "@id": `${site.url}/#logo`, url: LOGO_URL, contentUrl: LOGO_URL, width: 512, height: 512, caption: site.name },
  image: { "@id": `${site.url}/#logo` },
  email: site.supportEmail,
  contactPoint: [
    { "@type": "ContactPoint", contactType: "customer support", email: site.supportEmail, url: abs("/contact"), availableLanguage: ["English"] },
  ],
  founder: { "@id": PERSON_ID },
  sameAs: [CWS_URL, site.authorUrl].filter(Boolean),
};

export const websiteLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
};

const OFFER_TEXT: Record<PricingTier["id"], (t: PricingTier) => string> = {
  FREE: () => "Free forever: auto follow at the Slow pace (about 100 a day), up to 10 scheduled posts, analytics for your latest 30 posts, who followed back and 7 days of follower history.",
  PRO_MONTHLY: () => "Premium for 30 days, prepaid in crypto. Does not renew automatically.",
  PRO_YEARLY: () => "Premium for 365 days, prepaid in crypto. Does not renew automatically.",
  PRO_LIFETIME: (t) =>
    `Premium for life, one payment in crypto.${t.earlyBird ? ` Early-bird price ${t.earlyBird.priceLabel} for the first ${t.earlyBird.limit} lifetime buyers.` : ""}`,
};

const DURATION_DAYS: Partial<Record<PricingTier["id"], number>> = { PRO_MONTHLY: 30, PRO_YEARLY: 365 };

/** The real plans from src/config/pricing.ts, as schema.org Offers. */
export const softwareOffers = pricingTiers.map((t) => ({
  "@type": "Offer",
  name: t.name,
  price: t.priceCents ? (t.priceCents / 100).toFixed(2) : "0",
  priceCurrency: t.currency,
  url: abs("/pricing"),
  availability: "https://schema.org/InStock",
  description: OFFER_TEXT[t.id](t),
  ...(DURATION_DAYS[t.id] ? { eligibleDuration: { "@type": "QuantitativeValue", value: DURATION_DAYS[t.id], unitCode: "DAY" } } : {}),
}));

/** The GrowX extension. Defined once (home page); every other page refers to it by SOFTWARE_ID. No ratings, reviews or user counts. */
export const softwareLd = {
  "@type": "SoftwareApplication",
  "@id": SOFTWARE_ID,
  name: "GrowX - X (Twitter) Growth Chrome Extension",
  alternateName: ["GrowX", "GrowX: The Ultimate X (Twitter) Growth Tool"],
  description: site.description,
  applicationCategory: "BrowserApplication",
  applicationSubCategory: "Social media growth tool",
  softwareVersion: CURRENT_VERSION,
  releaseNotes: abs("/whats-new"),
  inLanguage: LANGUAGES.map((l) => l.code),
  operatingSystem: "Chrome (Windows, macOS, Linux, ChromeOS)",
  browserRequirements: "Requires Google Chrome 116 or newer on a desktop computer",
  url: site.url,
  image: abs("/opengraph-image"),
  screenshot: abs("/screens/overview-251.webp"),
  downloadUrl: CWS_URL,
  installUrl: CWS_URL,
  author: { "@id": PERSON_ID },
  publisher: { "@id": ORG_ID },
  offers: softwareOffers,
  featureList: [
    "Smart auto follow from source profiles with a follow-back score from 1 to 99",
    "Human-like pacing with hourly and daily caps, warm-up and automatic slow-down",
    "Post and thread scheduler with queue slots and best time to post",
    "GrowX AI writer that runs on your computer",
    "Post analytics, topics and formats that work",
    "Who followed back, a Growth Score and an AI Growth Coach from your own numbers",
    "Unfollower tracker: who followed and who unfollowed you",
    "AI Reply Assistant: fresh posts in your niche, ranked to reply early, with AI-drafted replies you approve",
    "AI reply buttons beside X's reply box",
    "Cleanup of non-followers and inactive accounts",
  ],
};
