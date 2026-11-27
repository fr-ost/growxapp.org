#!/usr/bin/env node
/**
 * Checks that every AI search crawler GrowX welcomes (src/lib/ai-crawlers.ts) gets the real pages: HTTP 200 and the main
 * content in the raw HTML, readable without JavaScript, and no bot challenge. Run it against a local production build:
 *
 *   npm run build && npm run start          # in one terminal (port 3000), or any running deployment
 *   node scripts/check-ai-bots.ts           # BASE=http://localhost:3000 by default; BASE=https://... to check a deployment
 *
 * It also reads robots.txt as each crawler and checks its own group allows the public site. Exit code 1 on any failure.
 */
import { AI_CRAWLERS, PRIVATE_PATHS } from "../src/lib/ai-crawlers.ts";

const BASE = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const PAGES = ["/", "/blog/twitter-algorithm-explained", "/features/twitter-auto-follow", "/pricing"];
const CHALLENGE = /cf-chl|captcha|just a moment|attention required|access denied|vercel security checkpoint|verify you are human/i;

/** Visible text of the page's <main>, from the raw HTML (no JavaScript runs). */
function mainText(html: string): string {
  const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
  return main
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.log(`  FAIL ${msg}`);
};

for (const bot of AI_CRAWLERS) {
  console.log(`${bot.token}`);
  for (const path of PAGES) {
    const res = await fetch(BASE + path, { headers: { "user-agent": bot.userAgent }, redirect: "manual" });
    const html = await res.text();
    const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() ?? "";
    const words = mainText(html).split(" ").filter(Boolean).length;
    if (res.status !== 200) fail(`${path}: HTTP ${res.status}`);
    else if (!/text\/html/.test(res.headers.get("content-type") ?? "")) fail(`${path}: not HTML (${res.headers.get("content-type")})`);
    else if (CHALLENGE.test(html.slice(0, 20000)) && words < 200) fail(`${path}: looks like a bot challenge`);
    else if (h1.length < 10) fail(`${path}: no H1 in the raw HTML`);
    else if (words < 250) fail(`${path}: only ${words} words of main content in the raw HTML`);
    else console.log(`  ok   ${path}: 200, H1 "${h1.slice(0, 50)}", ${words} words without JavaScript`);
  }
  const robots = await (await fetch(`${BASE}/robots.txt`, { headers: { "user-agent": bot.userAgent } })).text();
  const group = robots.split(/\n\s*\n/).find((g) => new RegExp(`^User-Agent:\\s*${bot.token}\\s*$`, "im").test(g));
  if (!group) fail(`robots.txt: no group for ${bot.token}`);
  else if (!/^Allow:\s*\/\s*$/im.test(group)) fail(`robots.txt: the ${bot.token} group does not allow /`);
  else if (!PRIVATE_PATHS.every((p) => new RegExp(`^Disallow:\\s*${p.replace(/[/.]/g, "\\$&")}\\s*$`, "im").test(group)))
    fail(`robots.txt: the ${bot.token} group misses a private Disallow line`);
  else console.log(`  ok   robots.txt: own group, Allow / and the ${PRIVATE_PATHS.length} private Disallow lines`);
}

console.log(failures ? `\n${failures} check(s) failed` : `\nAll ${AI_CRAWLERS.length} crawlers get the real pages.`);
process.exit(failures ? 1 : 0);
