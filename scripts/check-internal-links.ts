#!/usr/bin/env node
/**
 * Internal link audit on a production build: crawls every page in the sitemap and reports
 *   - broken internal links (the target answers 4xx or 5xx),
 *   - internal links that point at a redirect (link to the final URL instead),
 *   - orphan pages: sitemap pages that no other page links to.
 *
 *   npm run build && npm run start      # port 3000 (or any running deployment)
 *   node scripts/check-internal-links.ts     # BASE=http://localhost:3000 by default; --verbose lists every page
 *
 * Exit code 1 when anything is reported.
 */
export {};

const BASE = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const CANONICAL = "https://www.growxapp.org";
const verbose = process.argv.includes("--verbose");

/** A link's internal path (no query or hash), or null for external, mail, asset and API links. */
function internalPath(href: string): string | null {
  let h = href.trim().replace(/&amp;/g, "&");
  if (h.startsWith(CANONICAL)) h = h.slice(CANONICAL.length) || "/";
  if (!h.startsWith("/") || h.startsWith("//")) return null;
  const path = h.split(/[?#]/)[0] || "/";
  if (/^\/(_next|api)\//.test(path) || /\.(png|jpe?g|webp|avif|svg|ico|txt|xml|js|css|zip|pdf)$/i.test(path)) return null;
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => internalPath(m[1]) ?? "/");

const inbound = new Map<string, Set<string>>(pages.map((p) => [p, new Set<string>()]));
const linksFrom = new Map<string, Set<string>>();
for (const page of pages) {
  const html = await (await fetch(BASE + page)).text();
  const targets = new Set<string>();
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const path = internalPath(m[1]);
    if (path) targets.add(path);
  }
  linksFrom.set(page, targets);
  for (const t of targets) if (t !== page) inbound.get(t)?.add(page);
}

const status = new Map<string, { code: number; location: string }>();
for (const t of new Set([...linksFrom.values()].flatMap((s) => [...s]))) {
  const res = await fetch(BASE + t, { redirect: "manual" });
  status.set(t, { code: res.status, location: res.headers.get("location") ?? "" });
}

const broken: string[] = [];
const redirected: string[] = [];
for (const [page, targets] of linksFrom) {
  for (const t of targets) {
    const s = status.get(t)!;
    if (s.code >= 400) broken.push(`${page} -> ${t} (${s.code})`);
    else if (s.code >= 300) redirected.push(`${page} -> ${t} (${s.code} to ${s.location})`);
  }
}
const orphans = pages.filter((p) => p !== "/" && (inbound.get(p)?.size ?? 0) === 0);

if (verbose) for (const p of pages) console.log(`${String(inbound.get(p)?.size ?? 0).padStart(4)} inbound  ${p}`);
const report = (title: string, rows: string[]) => {
  console.log(`\n${title}: ${rows.length}`);
  for (const r of rows) console.log(`  ${r}`);
};
report("Broken internal links", broken);
report("Internal links to a redirect", redirected);
report("Orphan pages (in the sitemap, no internal link in)", orphans);
const problems = broken.length + redirected.length + orphans.length;
console.log(problems ? `\n${problems} problem(s) on ${pages.length} pages.` : `\nAll ${pages.length} sitemap pages are linked, and every internal link answers 200.`);
process.exit(problems ? 1 : 0);
