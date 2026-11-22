#!/usr/bin/env node
/**
 * Builds the site icons from public/logo.svg (run after changing the logo, then commit the results):
 *   public/favicon.ico            16, 32 and 48 px (PNG entries)
 *   public/apple-touch-icon.png   180 px, full-bleed square (iOS rounds the corners itself)
 *   public/icon-192.png, icon-512.png           the logo as drawn (rounded corners)
 *   public/icon-maskable-512.png  full-bleed, logo scaled into the 80% safe zone
 */
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const pub = new URL("../public/", import.meta.url);
const logo = readFileSync(new URL("logo.svg", pub), "utf8");
const square = logo.replaceAll('rx="33.28"', 'rx="0"');
const inner = logo.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
const maskable = logo.replace(
  inner,
  `<rect width="128" height="128" fill="#E11D2E"/><rect width="128" height="128" fill="url(#gx128bg)"/><g transform="translate(12.8 12.8) scale(0.8)">${inner.replace(/<defs>[\s\S]*?<\/defs>/, "")}</g>`,
).replace("<svg ", "<svg ").replace(/(<svg[^>]*>)/, `$1${inner.match(/<defs>[\s\S]*?<\/defs>/)[0]}`);

const png = (svg, size) => sharp(Buffer.from(svg), { density: 72 * Math.ceil(size / 128) * 2 }).resize(size, size).png().toBuffer();

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const sizes = [16, 32, 48];
writeFileSync(new URL("favicon.ico", pub), ico(await Promise.all(sizes.map(async (size) => ({ size, data: await png(logo, size) })))));
writeFileSync(new URL("apple-touch-icon.png", pub), await png(square, 180));
writeFileSync(new URL("icon-192.png", pub), await png(logo, 192));
writeFileSync(new URL("icon-512.png", pub), await png(logo, 512));
writeFileSync(new URL("icon-maskable-512.png", pub), await png(maskable, 512));
console.log("Icons written to public/.");
