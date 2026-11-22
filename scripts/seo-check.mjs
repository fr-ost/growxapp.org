#!/usr/bin/env node
/**
 * On-page SEO check for the prerendered site. Run after `npm run build`:
 *
 *   node scripts/seo-check.mjs            # reads .next/server/app/**\/*.html
 *   node scripts/seo-check.mjs --verbose  # also prints every page's title and description lengths
 *
 * Fails (exit 1) on any indexable page with: a missing or duplicate title or description, a title over 60
 * characters, a description over 155, not exactly one <h1>, a missing or non-absolute canonical, invalid JSON-LD,
 * review/rating markup, an FAQPage whose questions are not visible on the page, or an @id reference that resolves to
 * nothing. Also fails when a sitemap URL has no prerendered page, or the 404 page has the wrong title.
 * Descriptions under 120 characters are reported as warnings.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const APP = join(ROOT, ".next/server/app");
const SITE = "https://www.growxapp.org";
const verbose = process.argv.includes("--verbose");

if (!existsSync(APP)) {
  console.error("No build output. Run `npm run build` first.");
  process.exit(2);
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const routeOf = (file) => {
  const r = "/" + relative(APP, file).replace(/\.html$/, "");
  return r === "/index" ? "/" : r;
};

/** Text a visitor can read: drops scripts, styles and tags, collapses whitespace. */
const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

const meta = (html, attr, name) => {
  const re = new RegExp(`<meta[^>]*${attr}="${name}"[^>]*>`, "i");
  const tag = html.match(re)?.[0];
  return tag ? decode(tag.match(/content="([^"]*)"/i)?.[1] ?? "") : null;
};

const errors = [];
const warnings = [];
const fail = (route, msg) => errors.push(`${route}: ${msg}`);
const warn = (route, msg) => warnings.push(`${route}: ${msg}`);

// ---------------------------------------------------------------- JSON-LD rules
const GLOBAL_IDS = new Set([`${SITE}/#organization`, `${SITE}/#website`, `${SITE}/#software`]);
const req = {
  BlogPosting: ["headline", "image", "datePublished", "dateModified", "author", "publisher"],
  SoftwareApplication: ["name", "applicationCategory", "operatingSystem", "offers"],
  WebApplication: ["name", "applicationCategory", "url"],
  Organization: ["name", "url", "logo"],
  WebSite: ["name", "url"],
  WebPage: ["name", "url"],
  AboutPage: ["name", "url"],
  CollectionPage: ["name", "url"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  Offer: ["price", "priceCurrency"],
  Person: ["name"],
};

function nodesOf(data) {
  const out = [];
  const visit = (v) => {
    if (Array.isArray(v)) return v.forEach(visit);
    if (!v || typeof v !== "object") return;
    if (v["@graph"]) visit(v["@graph"]);
    if (v["@type"]) out.push(v);
    for (const [k, x] of Object.entries(v)) if (k !== "@graph" && typeof x === "object") visit(x);
  };
  visit(data);
  return out;
}

function checkJsonLd(route, html, text) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (!blocks.length) return fail(route, "no JSON-LD");
  const defined = new Set();
  const referenced = [];
  const all = [];
  for (const raw of blocks) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      fail(route, `JSON-LD does not parse (${e.message})`);
      continue;
    }
    for (const top of Array.isArray(data) ? data : [data]) {
      if (top["@context"] !== "https://schema.org") fail(route, `JSON-LD block without "@context": "https://schema.org"`);
    }
    if (/"(aggregateRating|review|reviewRating)"\s*:/.test(raw)) fail(route, "review or rating markup is not allowed");
    for (const n of nodesOf(data)) {
      all.push(n);
      if (n["@id"] && Object.keys(n).length > 2) defined.add(n["@id"]);
    }
    const collectRefs = (v) => {
      if (Array.isArray(v)) return v.forEach(collectRefs);
      if (!v || typeof v !== "object") return;
      if (v["@id"] && Object.keys(v).length === 1) referenced.push(v["@id"]);
      Object.values(v).forEach(collectRefs);
    };
    collectRefs(data);
  }
  const types = all.map((n) => [].concat(n["@type"])).flat();
  for (const n of all) {
    for (const t of [].concat(n["@type"])) {
      for (const k of req[t] ?? []) if (n[k] === undefined || n[k] === "" || (Array.isArray(n[k]) && !n[k].length)) fail(route, `${t} is missing "${k}"`);
    }
    for (const k of ["url", "item", "mainEntityOfPage", "image", "logo"]) {
      const v = typeof n[k] === "string" ? n[k] : null;
      if (v && !/^https:\/\//.test(v)) fail(route, `${[].concat(n["@type"])[0]}.${k} is not an absolute https URL (${v})`);
    }
    if (n["@type"] === "BreadcrumbList") {
      n.itemListElement.forEach((it, i) => {
        if (it.position !== i + 1 || !it.name || !it.item) fail(route, `BreadcrumbList item ${i + 1} needs position, name and item`);
      });
    }
    if (n["@type"] === "Offer" && !/^\d+(\.\d{1,2})?$/.test(String(n.price))) fail(route, `Offer price "${n.price}" is not a number`);
    if (n["@type"] === "FAQPage") {
      for (const q of n.mainEntity) {
        if (q["@type"] !== "Question" || !q.name || q.acceptedAnswer?.["@type"] !== "Answer" || !q.acceptedAnswer.text) {
          fail(route, "FAQPage entry needs a Question with an Answer");
          continue;
        }
        if (!text.includes(q.name.replace(/\s+/g, " "))) fail(route, `FAQ question not visible on the page: "${q.name}"`);
        const answer = q.acceptedAnswer.text.replace(/\s+/g, " ");
        if (!text.includes(answer)) fail(route, `FAQ answer differs from the visible text: "${q.name}"`);
      }
    }
  }
  if (types.filter((t) => t === "FAQPage").length > 1) fail(route, "more than one FAQPage");
  if (types.filter((t) => t === "SoftwareApplication").length > 1) fail(route, "more than one SoftwareApplication");
  for (const id of referenced) if (!defined.has(id) && !GLOBAL_IDS.has(id)) fail(route, `@id reference resolves to nothing: ${id}`);
  for (const id of GLOBAL_IDS) if (referenced.includes(id) && !defined.has(id) && id !== `${SITE}/#software`) fail(route, `${id} is referenced but not defined`);
  if (route !== "/" && !types.includes("BreadcrumbList")) fail(route, "no BreadcrumbList");
  return types;
}

// ---------------------------------------------------------------- pages
const files = walk(APP).filter((f) => !/\/_global-error\.html$/.test(f));
const titles = new Map();
const descriptions = new Map();
const indexable = new Set();
let softwareDefinedOnAnyPage = false;

for (const file of files) {
  const route = routeOf(file);
  const html = readFileSync(file, "utf8");
  const robots = meta(html, "name", "robots") ?? "";
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "").trim();

  if (route === "/_not-found") {
    if (title !== "Page not found | GrowX") fail(route, `404 title is "${title}"`);
    if (!/noindex/.test(robots)) fail(route, "404 page is not noindex");
    continue;
  }
  if (/noindex/.test(robots)) continue;
  indexable.add(route);

  const description = meta(html, "name", "description");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const text = visibleText(html);

  if (!title) fail(route, "missing <title>");
  else if (title.length > 60) fail(route, `title is ${title.length} chars (max 60): "${title}"`);
  if (!description) fail(route, "missing meta description");
  else if (description.length > 155) fail(route, `description is ${description.length} chars (max 155)`);
  else if (description.length < 120) warn(route, `description is ${description.length} chars (aim for 120-155)`);
  if (h1s !== 1) fail(route, `${h1s} <h1> elements`);
  const expected = `${SITE}${route === "/" ? "" : route}`;
  if (!canonical) fail(route, "missing canonical");
  else if (canonical !== expected) fail(route, `canonical is ${canonical}, expected ${expected}`);
  if (!meta(html, "property", "og:image")) fail(route, "missing og:image");
  if (!meta(html, "property", "og:image:alt")) fail(route, "missing og:image:alt");
  if (meta(html, "name", "twitter:card") !== "summary_large_image") fail(route, "twitter:card is not summary_large_image");
  if (!/<link rel="alternate" type="application\/rss\+xml"[^>]*href="[^"]*\/blog\/feed\.xml"/.test(html)) fail(route, "no RSS alternate link");
  if (/\/blog\/[^/]+$/.test(route) && meta(html, "property", "og:type") !== "article") fail(route, "post og:type is not article");
  if (/\/blog\/[^/]+$/.test(route) && !meta(html, "property", "article:published_time")) fail(route, "post has no article:published_time");

  const types = checkJsonLd(route, html, text) ?? [];
  if (html.includes(`"@id":"${SITE}/#software","name"`) || html.includes(`"@type":"SoftwareApplication"`)) softwareDefinedOnAnyPage = true;
  if (/\/blog\/[^/]+$/.test(route) && !types.includes("BlogPosting")) fail(route, "post without BlogPosting");
  if (/^\/tools\/./.test(route) && !types.includes("WebApplication")) fail(route, "tool without WebApplication");

  if (title) titles.set(title, [...(titles.get(title) ?? []), route]);
  if (description) descriptions.set(description, [...(descriptions.get(description) ?? []), route]);
  if (verbose) console.log(`${String(title.length).padStart(3)} ${String(description?.length ?? 0).padStart(3)}  ${route}  ${title}`);
}

for (const [t, rs] of titles) if (rs.length > 1) fail(rs.join(", "), `duplicate title "${t}"`);
for (const [d, rs] of descriptions) if (rs.length > 1) fail(rs.join(", "), `duplicate description "${d.slice(0, 60)}…"`);
if (!softwareDefinedOnAnyPage) fail("/", "the SoftwareApplication (#software) is not defined on any page");

// ---------------------------------------------------------------- sitemap vs pages
const sitemapFile = join(APP, "sitemap.xml.body");
if (existsSync(sitemapFile)) {
  const urls = [...readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const u of urls) {
    const route = u.replace(SITE, "") || "/";
    if (!indexable.has(route)) fail(route, "in the sitemap but not a prerendered indexable page");
  }
  for (const r of indexable) if (!urls.includes(`${SITE}${r === "/" ? "" : r}`)) warn(r, "indexable page missing from the sitemap");
  const lastmods = [...readFileSync(sitemapFile, "utf8").matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  const counts = lastmods.reduce((m, d) => m.set(d, (m.get(d) ?? 0) + 1), new Map());
  const [top, n] = [...counts].sort((a, b) => b[1] - a[1])[0] ?? [null, 0];
  if (n > 10 && /T\d\d:\d\d:\d\d\.\d{3}Z$/.test(top)) fail("/sitemap.xml", `${n} URLs share the same build-time lastmod (${top})`);
} else warn("/sitemap.xml", "sitemap not found in the build output");

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`FAIL  ${e}`);
console.log(`\n${indexable.size} indexable pages checked: ${errors.length} errors, ${warnings.length} warnings.`);
process.exit(errors.length ? 1 : 0);
