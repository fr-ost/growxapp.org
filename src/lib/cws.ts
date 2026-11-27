/**
 * The Chrome Web Store listing: the ONLY place its URL and ID are written. Every clickable store link on the site is
 * built here, with UTM parameters, so each click can be attributed to the page and the placement it came from:
 *
 *   cwsUrl({ campaign: "home", content: "hero" })
 *   -> https://chromewebstore.google.com/detail/ofiancichfcakbdgekhcahflpoglfgbh?utm_source=growxapp.org&utm_medium=website&utm_campaign=home&utm_content=hero
 *
 * Structured data and llms.txt use the clean CWS_URL: it identifies the product, it is not a click from a page.
 * src/components/site-analytics.tsx sends an add_to_chrome_click event for every click on a link built here.
 */
export const CWS_ID = "ofiancichfcakbdgekhcahflpoglfgbh";

/** The clean listing URL. NEXT_PUBLIC_CHROME_STORE_URL overrides it only if the listing ever moves. */
export const CWS_URL = (process.env.NEXT_PUBLIC_CHROME_STORE_URL ?? "").trim().replace(/\/$/, "") || `https://chromewebstore.google.com/detail/${CWS_ID}`;

/** The page a link sits on: home, pricing, how-it-works, feature-<slug>, blog-<slug>, tool-<slug>, alt-<slug>, use-case-<slug>, ... */
export type CwsCampaign = string;

/** Where on the page the link sits. */
export type CwsContent = "hero" | "nav" | "pricing-card" | "inline-cta" | "end-cta" | "footer" | "sticky-bar" | "trust-strip";

export interface CwsLinkSpec {
  campaign: CwsCampaign;
  content: CwsContent;
}

function withUtm(base: string, { campaign, content }: CwsLinkSpec): string {
  const url = new URL(base);
  url.searchParams.set("utm_source", "growxapp.org");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);
  return url.toString();
}

/** The store listing, tagged with the page (campaign) and the placement (content). */
export const cwsUrl = (spec: CwsLinkSpec): string => withUtm(CWS_URL, spec);

/** The listing's reviews tab, tagged the same way (the trust strip links here). */
export const cwsReviewsUrl = (spec: CwsLinkSpec): string => withUtm(`${CWS_URL}/reviews`, spec);

/** True for any link to the store listing (with or without parameters). */
export const isCwsUrl = (href: string): boolean => href.startsWith(CWS_URL);

const SECTIONS: Record<string, string> = { features: "feature", blog: "blog", tools: "tool", alternatives: "alt", "use-cases": "use-case" };

/**
 * The campaign name for a page path: "/" -> home, "/pricing" -> pricing, "/features/<slug>" -> feature-<slug>,
 * "/blog/<slug>" -> blog-<slug>, "/tools/<slug>" -> tool-<slug>, "/alternatives/<slug>" -> alt-<slug>,
 * "/use-cases/<slug>" -> use-case-<slug>; index pages keep their own name ("/features" -> features).
 */
export function campaignFor(path: string): CwsCampaign {
  const parts = path.split(/[?#]/)[0].split("/").filter(Boolean);
  if (!parts.length) return "home";
  if (parts.length >= 2 && SECTIONS[parts[0]]) return `${SECTIONS[parts[0]]}-${parts[1]}`;
  return parts.join("-");
}
