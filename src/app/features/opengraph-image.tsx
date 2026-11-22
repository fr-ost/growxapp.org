import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "GrowX features: auto follow, X post scheduler, AI writer, analytics and unfollower tracker";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Features",
    title: "Every tool you need to grow on X",
    subtitle: "One Chrome extension: follow, post, engage, measure and clean up.",
    chips: ["Smart auto follow", "Post scheduler", "GrowX AI writer", "Analytics", "Unfollower tracker"],
  });
}
