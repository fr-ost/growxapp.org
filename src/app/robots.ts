import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { AI_CRAWLERS, PRIVATE_PATHS } from "@/lib/ai-crawlers";

/**
 * Every crawler may read the public site; nobody needs the app, the API or the sign-in pages. AI search and assistant
 * crawlers get their own groups on purpose, each allowing the public site. A crawler with its own group ignores the `*`
 * group, so each named group repeats the same private Disallow lines.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      ...[...new Set(AI_CRAWLERS.map((c) => c.token))].map((token) => ({ userAgent: token, allow: "/", disallow: PRIVATE_PATHS })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
