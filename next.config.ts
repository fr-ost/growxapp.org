import type { NextConfig } from "next";
import { liveBadges } from "./src/data/badges";
import { MERGED_URLS } from "./src/content/redirects";
import { PRODUCTION_URL } from "./src/config/site";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

// Hosts the Google tag (gtag.js, Google Ads) and Tag Manager (gtm.js) load from and report to, per Google's CSP guides.
const google = {
  script: "https://www.googletagmanager.com https://*.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com",
  img: "https://*.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://www.google.com.bd https://td.doubleclick.net",
  connect: "https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://www.google.com.bd https://td.doubleclick.net",
  frame: "https://td.doubleclick.net https://www.googletagmanager.com",
  // Tag Manager's Preview and debug mode (Google's CSP guide for Tag Manager).
  previewScript: "https://tagmanager.google.com",
  previewStyle: "https://tagmanager.google.com https://fonts.googleapis.com",
  previewImg: "https://ssl.gstatic.com https://www.gstatic.com",
  previewFont: "https://fonts.gstatic.com",
};

// Image hosts of the directory badges on /featured (their official <img> URLs, never proxied).
const badgeHosts = [...new Set(liveBadges.flatMap((b) => [...(b.html ?? "").matchAll(/src="(https:\/\/[^/"]+)/g)].map((m) => m[1])))].join(" ");

// Production-only CSP (dev needs eval for HMR). Inline scripts are required by
// Next.js hydration unless nonces are used, which would make every page dynamic.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${google.script} ${google.previewScript}`,
  `style-src 'self' 'unsafe-inline' ${google.previewStyle}`,
  `img-src 'self' data: blob: ${google.img} ${google.previewImg} ${badgeHosts}`,
  `font-src 'self' data: ${google.previewFont}`,
  `connect-src 'self' ${google.connect}`,
  `frame-src ${google.frame}`,
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ");

/** Screenshots and badges never change in place: a new image gets a new file name, so a year-long immutable cache is safe. */
const IMMUTABLE = "public, max-age=31536000, immutable";
/** Icons, the logo and social cards can change under the same URL: cache for a week, then revalidate in the background. */
const REVALIDATE = "public, max-age=604800, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // Post social cards moved to /opengraph-image/card (per-post alt text); keep links that X and others cached working.
    return [
      // Merged pages (src/content/redirects.ts): one permanent hop to the absolute canonical URL, so a request on either
      // host lands on the final page directly (no host hop after the path hop).
      ...MERGED_URLS.map((r) => ({ source: r.from, destination: `${PRODUCTION_URL}${r.to}`, permanent: true })),
      { source: "/blog/:slug/opengraph-image", destination: "/blog/:slug/opengraph-image/card", permanent: true },
      // One hop from the bare domain to the canonical host (http or https, any path). Vercel also turns http into https
      // at its edge; with growxapp.org pointed at this project, this rule sends it straight to https://www.growxapp.org.
      { source: "/:path*", has: [{ type: "host", value: "growxapp.org" }], destination: "https://www.growxapp.org/:path*", permanent: true },
    ];
  },
  async rewrites() {
    // The IndexNow key file: /<key>.txt, served from the INDEXNOW_KEY env var (src/app/api/indexnow-key/[key]/route.ts).
    // A key is 8-128 letters, digits or dashes, so /robots.txt and /llms.txt never match.
    return [{ source: "/:key([A-Za-z0-9-]{8,128})\\.txt", destination: "/api/indexnow-key/:key" }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimised screenshots are cached for a year (the source files are never replaced in place).
    minimumCacheTTL: 31536000,
  },
  async headers() {
    const headers = process.env.NODE_ENV === "production" ? [...securityHeaders, { key: "Content-Security-Policy", value: csp }] : securityHeaders;
    const cache = (source: string, value: string) => ({ source, headers: [{ key: "Cache-Control", value }] });
    return [
      { source: "/:path*", headers },
      cache("/screens/:file*", IMMUTABLE),
      cache("/badges/:file*", IMMUTABLE),
      cache("/fonts/:file*", IMMUTABLE),
      ...["/icon.png", "/logo.svg", "/favicon.ico", "/apple-touch-icon.png", "/icon-192.png", "/icon-512.png", "/icon-maskable-512.png"].map((p) =>
        cache(p, REVALIDATE),
      ),
    ];
  },
};

export default nextConfig;
