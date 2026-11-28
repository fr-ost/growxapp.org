import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "GrowX featured on Product Hunt";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Featured on",
    title: "GrowX on Product Hunt.",
    subtitle: "GrowX, the Chrome extension for X (Twitter) growth, is featured on Product Hunt.",
    chips: ["Product Hunt"],
  });
}
