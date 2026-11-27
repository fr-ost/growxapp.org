#!/usr/bin/env node
/**
 * Checks every merged URL (src/content/redirects.ts) on a production build: one permanent hop (301 or 308) straight to
 * the final canonical URL, which itself answers 200 (no chain). Also checks the same old URL on the bare domain
 * (Host: growxapp.org) reaches the final URL in one hop, and that no merged URL is left in the sitemap.
 *
 *   npm run build && npm run start            # port 3000 (or any running deployment)
 *   node scripts/check-redirects.ts           # BASE=http://localhost:3000 by default
 */
import { request } from "node:http";
import { MERGED_URLS } from "../src/content/redirects.ts";

const BASE = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const CANONICAL = "https://www.growxapp.org";

/** One request without following redirects; `host` overrides the Host header (to act as the bare domain). */
function head(path: string, host?: string): Promise<{ status: number; location: string }> {
  const url = new URL(BASE + path);
  return new Promise((resolve, reject) => {
    const req = request(
      { hostname: url.hostname, port: url.port, path: url.pathname + url.search, method: "GET", headers: host ? { host } : {} },
      (res) => {
        res.resume();
        resolve({ status: res.statusCode ?? 0, location: String(res.headers.location ?? "") });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.log(`FAIL ${msg}`);
};

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();

for (const r of MERGED_URLS) {
  const want = `${CANONICAL}${r.to}`;
  const hop = await head(r.from);
  const bare = await head(r.from, "growxapp.org");
  const final = await head(r.to);
  const ok = (h: { status: number; location: string }) => (h.status === 301 || h.status === 308) && h.location === want;
  if (!ok(hop)) fail(`${r.from}: ${hop.status} -> ${hop.location || "(no Location)"}, want 301/308 -> ${want}`);
  else if (!ok(bare)) fail(`${r.from} on growxapp.org: ${bare.status} -> ${bare.location || "(no Location)"}, want one hop to ${want}`);
  else if (final.status !== 200) fail(`${r.from}: final page ${r.to} answers ${final.status}${final.location ? ` -> ${final.location}` : ""} (a chain or a dead end)`);
  else if (sitemap.includes(`<loc>${CANONICAL}${r.from}</loc>`)) fail(`${r.from} is still in the sitemap`);
  else if (!sitemap.includes(`<loc>${CANONICAL}${r.to === "/" ? "" : r.to}</loc>`)) fail(`${r.to} (the target of ${r.from}) is not in the sitemap`);
  else console.log(`ok   ${r.from} -> ${hop.status} ${r.to} (200), one hop from both hosts`);
}

console.log(failures ? `\n${failures} redirect check(s) failed` : `\nAll ${MERGED_URLS.length} merged URLs redirect in one permanent hop.`);
process.exit(failures ? 1 : 0);
