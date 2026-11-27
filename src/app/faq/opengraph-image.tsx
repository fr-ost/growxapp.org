import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "GrowX FAQ: plans, the free trial, safety, the scheduler, GrowX AI and privacy";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · FAQ",
    title: "Questions about GrowX, answered.",
    subtitle: "Plans and payments, the free trial, auto follow safety, the scheduler, GrowX AI, analytics and privacy.",
    chips: ["Free plan forever", "30-day trial", "No X password"],
  });
}
