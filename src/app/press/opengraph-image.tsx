import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "GrowX press kit and fact sheet";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Press kit",
    title: "GrowX at a glance.",
    subtitle: "Facts, logos, screenshots and descriptions for writing about GrowX, the X (Twitter) growth extension.",
    chips: ["Fact sheet", "Logos", "Screenshots"],
  });
}
