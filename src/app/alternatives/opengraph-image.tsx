import { alternativePages } from "@/content/alternatives";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "GrowX compared with Tweet Hunter, Hypefury and Typefully";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Alternatives",
    title: "Looking for an alternative? Compare GrowX.",
    subtitle: "What each X tool does well, where GrowX differs and who should pick which.",
    chips: alternativePages.map((a) => `${a.name} alternative`),
  });
}
