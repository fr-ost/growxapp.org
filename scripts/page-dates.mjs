#!/usr/bin/env node
/**
 * Writes src/content/page-dates.json: the date each static page's content last changed, for the sitemap's <lastmod>.
 * A page's date is the newest git commit touching its own source files (a file with uncommitted changes counts as
 * today). Shared layout, header and footer changes do not count. Blog posts are not listed here: their lastmod is
 * the post's own dateModified.
 *
 *   node scripts/page-dates.mjs          # run after changing page content, then commit the JSON
 *   node scripts/page-dates.mjs --check  # exit 1 if the JSON is out of date (does not write)
 *
 * Needs the full git history (`git fetch --unshallow` in a shallow clone), otherwise old files would get the date of
 * the oldest commit in the shallow history.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const out = new URL("../src/content/page-dates.json", import.meta.url);
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

if (git("rev-parse", "--is-shallow-repository") === "true") {
  console.error("Shallow clone: run `git fetch --unshallow` first so old pages keep their real dates.");
  process.exit(2);
}

const today = new Date().toISOString().slice(0, 10);
const dirty = (path) => git("status", "--porcelain", "--", path) !== "";
const fileDate = (path) => (dirty(path) ? today : git("log", "-1", "--format=%cs", "--", path) || today);
const newest = (dates) => dates.filter(Boolean).sort().at(-1);
const filesIn = (dir) => (existsSync(`${root}${dir}`) ? readdirSync(`${root}${dir}`).map((f) => `${dir}/${f}`) : []);

/** The newest commit touching one entry of a content file, found by the lines of that entry (`git log -L`). */
function entryDate(file, slug) {
  const range = `/slug: "${slug}"/,/^  },$/:${file}`;
  try {
    const committed = git("log", "-1", "--format=%cs", "-s", "-L", range);
    return dirty(file) && git("diff", "HEAD", "--", file).includes(slug) ? today : committed;
  } catch {
    return fileDate(file);
  }
}

const pages = {
  "/": ["src/app/page.tsx", ...filesIn("src/components/home")],
  "/features": ["src/app/features/page.tsx", "src/components/feature-lists.tsx"],
  "/how-it-works": ["src/app/how-it-works/page.tsx"],
  "/pricing": ["src/app/pricing/page.tsx", "src/config/pricing.ts", "src/components/pricing-cards.tsx"],
  "/tools": ["src/app/tools/page.tsx", "src/config/nav.ts"],
  "/about": ["src/app/about/page.tsx"],
  "/faq": ["src/app/faq/page.tsx", "src/content/faq.ts"],
  "/whats-new": ["src/app/whats-new/page.tsx", "src/content/releases.ts"],
  "/press": ["src/app/press/page.tsx"],
  "/featured": ["src/app/featured/page.tsx", "src/data/badges.ts"],
  "/contact": ["src/app/contact/page.tsx"],
  "/privacy": ["src/app/privacy/page.tsx"],
  "/terms": ["src/app/terms/page.tsx"],
  "/refund-policy": ["src/app/refund-policy/page.tsx"],
  "/alternatives": ["src/app/alternatives/page.tsx", "src/content/alternatives.ts"],
};
for (const dir of readdirSync(`${root}src/app/tools`, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  const slug = dir.name;
  pages[`/tools/${slug}`] = [...filesIn(`src/app/tools/${slug}`).filter((f) => !f.endsWith("opengraph-image.tsx")), ...filesIn("src/components/tools").filter((f) => f.includes(slug.replace(/^twitter-|^tweet-/, "")))];
}

const dates = {};
for (const [route, files] of Object.entries(pages)) {
  const existing = files.filter((f) => existsSync(`${root}${f}`));
  if (!existing.length) continue;
  dates[route] = newest(existing.map(fileDate));
}

// Entries that live in one shared content file: date by their own lines.
const slugsIn = (file) => [...readFileSync(`${root}${file}`, "utf8").matchAll(/^ {4}slug: "([^"]+)"/gm)].map((m) => m[1]);
for (const slug of slugsIn("src/content/feature-pages.ts")) dates[`/features/${slug}`] = entryDate("src/content/feature-pages.ts", slug);
if (existsSync(`${root}src/content/alternatives.ts`)) {
  for (const slug of slugsIn("src/content/alternatives.ts")) dates[`/alternatives/${slug}`] = entryDate("src/content/alternatives.ts", slug);
}

const json = JSON.stringify(Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b))), null, 2) + "\n";
if (process.argv.includes("--check")) {
  const current = existsSync(out) ? readFileSync(out, "utf8") : "";
  if (current !== json) {
    console.error("src/content/page-dates.json is out of date. Run: node scripts/page-dates.mjs");
    process.exit(1);
  }
  console.log("page-dates.json is up to date.");
} else {
  writeFileSync(out, json);
  console.log(`Wrote ${Object.keys(dates).length} page dates to src/content/page-dates.json.`);
}
