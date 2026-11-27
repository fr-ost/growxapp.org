import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "GrowX refund policy";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Refunds",
    title: "Refund policy",
    subtitle: "How refunds work for GrowX Premium, paid in crypto and prepaid, with no automatic renewal.",
    chips: ["Prepaid", "No auto-renew", "Paid in crypto"],
  });
}
