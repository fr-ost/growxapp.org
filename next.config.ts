import type { NextConfig } from "next";
import { liveBadges } from "./src/data/badges";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

// Hosts the Google tag (gtag.js, Google Ads) loads from and reports to, per Google's CSP guide.
const google = {
  script: "https://www.googletagmanager.com https://*.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com",
  img: "https://*.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://www.google.com.bd https://td.doubleclick.net",
  connect: "https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://www.google.com.bd https://td.doubleclick.net",
  frame: "https://td.doubleclick.net https://www.googletagmanager.com",
};

// Image hosts of the directory badges shown in the footer and on /featured (their official <img> URLs, never proxied).
const badgeHosts = [...new Set(liveBadges.flatMap((b) => [...(b.html ?? "").matchAll(/src="(https:\/\/[^/"]+)/g)].map((m) => m[1])))].join(" ");

// Production-only CSP (dev needs eval for HMR). Inline scripts are required by
// Next.js hydration unless nonces are used, which would make every page dynamic.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${google.script}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${google.img} ${badgeHosts}`,
  "font-src 'self' data:",
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
    return [{ source: "/blog/:slug/opengraph-image", destination: "/blog/:slug/opengraph-image/card", permanent: true }];
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
