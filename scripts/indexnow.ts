#!/usr/bin/env node
/**
 * Tells IndexNow (Bing, Yandex, Seznam, Naver and others) which pages are new or changed. Bing feeds ChatGPT search,
 * so run it after every production deploy:
 *
 *   INDEXNOW_KEY=<key> node scripts/indexnow.ts                       # sitemap URLs whose <lastmod> is in the last 3 days
 *   INDEXNOW_KEY=<key> node scripts/indexnow.ts --since 2026-11-27    # ...changed on or after a date
 *   INDEXNOW_KEY=<key> node scripts/indexnow.ts --all                 # every URL in the sitemap
 *   INDEXNOW_KEY=<key> node scripts/indexnow.ts /pricing /use-cases   # only these paths
 *   add --dry-run to print the URLs without sending them
 *
 * The key must already be live at https://www.growxapp.org/<key>.txt: set the same INDEXNOW_KEY in Vercel (Production)
 * and redeploy (src/app/api/indexnow-key/[key]/route.ts serves it). A key is 8-128 letters, digits or dashes; any
 * random value works, e.g. `openssl rand -hex 16`. SITE=https://... checks another host.
 */
export {};

const SITE = (process.env.SITE ?? "https://www.growxapp.org").replace(/\/$/, "");
const HOST = new URL(SITE).host;
const KEY = (process.env.INDEXNOW_KEY ?? "").trim();
const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const sinceArg = args[args.indexOf("--since") + 1];

if (!/^[A-Za-z0-9-]{8,128}$/.test(KEY)) {
  console.error("Set INDEXNOW_KEY (8-128 letters, digits or dashes), the same value as on Vercel.");
  process.exit(2);
}

const paths = args.filter((a, i) => a.startsWith("/") && args[i - 1] !== "--since");
let urls: string[];
if (paths.length) {
  urls = paths.map((p) => `${SITE}${p === "/" ? "" : p}`);
} else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "",
    lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? "",
  }));
  const since = flag("--all") ? "" : sinceArg && /^\d{4}-\d{2}-\d{2}$/.test(sinceArg) ? sinceArg : new Date(Date.now() - 3 * 86_400_000).toISOString().slice(0, 10);
  urls = entries.filter((e) => e.loc && (!since || e.lastmod.slice(0, 10) >= since)).map((e) => e.loc);
  console.log(`${entries.length} URLs in the sitemap, ${urls.length} ${since ? `changed on or after ${since}` : "selected (--all)"}`);
}

if (!urls.length) {
  console.log("Nothing to submit.");
  process.exit(0);
}
if (flag("--dry-run")) {
  console.log(urls.join("\n"));
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
// 200 or 202: accepted. 403: the key file is not live (or holds another key). 422: a URL is not on this host.
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (!res.ok) process.exit(1);
