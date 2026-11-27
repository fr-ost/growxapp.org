import { featurePages } from "@/content/feature-pages";
import { CURRENT_VERSION } from "@/content/releases";
import { getPost } from "@/content/posts";
import { PLAN_SUMMARY, pricingTiers, TRIAL_DAYS } from "@/config/pricing";
import { site } from "@/config/site";
import { CWS_URL } from "@/lib/cws";

export const dynamic = "force-static";

/** The guides worth reading first (any that no longer exist are skipped). */
const TOP_GUIDES = [
  "how-to-get-more-followers-on-twitter",
  "first-1000-followers-on-x",
  "twitter-growth-plan",
  "mass-follow-twitter-limits",
  "who-unfollowed-me-on-twitter",
  "unfollow-non-followers-twitter",
  "how-to-schedule-tweets",
  "best-time-to-post-on-twitter",
  "twitter-algorithm-explained",
  "twitter-analytics-guide",
];

/**
 * /llms.txt (llmstxt.org): a short markdown summary of GrowX with its key links, for AI assistants. Low priority by
 * design: the major AI search engines read the normal pages. Never indexed (X-Robots-Tag: noindex). It is a summary,
 * not a markdown copy of the site's pages.
 */
export function GET() {
  const premium = pricingTiers.filter((t) => t.priceCents).map((t) => {
    const early = t.earlyBird ? ` (${t.earlyBird.priceLabel} for the first ${t.earlyBird.limit} lifetime buyers)` : "";
    return `${t.name} ${t.priceLabel} ${t.cadence}${early}`;
  });
  const guides = TOP_GUIDES.map(getPost).filter((p): p is NonNullable<ReturnType<typeof getPost>> => !!p);
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.definition}`,
    "",
    site.disambiguation,
    `Chrome Web Store name: "${site.name}: ${site.tagline}". Current version ${CURRENT_VERSION}. Desktop Chrome 116 or newer.`,
    "",
    "## Features",
    ...featurePages.map((f) => `- [${f.nav}](${site.url}/features/${f.slug}): ${f.blurb}`),
    "",
    "## Free vs Premium",
    `- ${PLAN_SUMMARY.FREE}`,
    `- Premium: ${premium.join("; ")}. Prepaid in crypto, never renews by itself.`,
    `- A ${TRIAL_DAYS}-day Premium trial, no credit card. Details: ${site.url}/pricing`,
    "",
    "## Safety and privacy",
    "- Works inside the x.com tab you are already signed in to. Never asks for your X password.",
    "- Your queue, history and analytics stay in your browser. GrowX AI runs on your computer with the AI model built into Chrome: no API key, drafts are not sent to GrowX.",
    "- Human pace: random delays, breaks, hourly and daily caps, a slow-down after any X warning and an emergency stop. Safety is never paywalled.",
    "- GrowX is independent and not affiliated with or endorsed by X Corp. No tool can promise zero risk.",
    "",
    "## Key pages",
    `- [Home](${site.url}/)`,
    `- [All features](${site.url}/features)`,
    `- [Pricing](${site.url}/pricing)`,
    `- [How it works](${site.url}/how-it-works)`,
    `- [GrowX at a glance (fact sheet)](${site.url}/press)`,
    `- [FAQ](${site.url}/faq)`,
    `- [Chrome Web Store listing](${CWS_URL})`,
    "",
    "## Top guides",
    ...guides.map((p) => `- [${p.title}](${site.url}/blog/${p.slug})`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" } });
}
