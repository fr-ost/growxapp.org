#!/usr/bin/env node
/**
 * Tells IndexNow (Bing, Yandex, Seznam, Naver and others) that pages changed. Run after a deploy:
 *
 *   node scripts/indexnow.mjs                      # every URL in the live sitemap
 *   node scripts/indexnow.mjs /alternatives /pricing   # only these paths
 *
 * The key is public by design: IndexNow checks that https://www.growxapp.org/<key>.txt contains it.
 */
const HOST = "www.growxapp.org";
const KEY = "fd1b599b95d87f3497b99e890ec1c6f4";

const paths = process.argv.slice(2);
const urlList = paths.length
  ? paths.map((p) => `https://${HOST}${p === "/" ? "" : p}`)
  : [...(await (await fetch(`https://${HOST}/sitemap.xml`)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
// 200 or 202 means accepted; 403 means the key file is not live yet; 422 means a URL is not on this host.
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
if (!res.ok) process.exit(1);
