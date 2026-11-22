import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "The GrowX blog: practical guides to grow on X (Twitter)";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Blog",
    title: "Learn to grow on X, one guide at a time",
    subtitle: "Practical guides on auto follow, scheduling, analytics, replies and cleanup.",
  });
}
