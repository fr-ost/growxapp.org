import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "Directories and launch sites that list GrowX";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Featured on",
    title: "Where GrowX is listed.",
    subtitle: "Product directories and launch sites that list GrowX, the Chrome extension for X (Twitter) growth.",
    chips: ["Directories", "Launch sites"],
  });
}
