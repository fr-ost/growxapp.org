import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "About GrowX, the independent X (Twitter) growth extension by Shahriar Ahmed";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · About",
    title: "Growth tools built for careful people.",
    subtitle: "An independent Chrome extension for X (Twitter), designed and developed by Shahriar Ahmed.",
    chips: ["Independent", "Private by design", "Safety first"],
  });
}
