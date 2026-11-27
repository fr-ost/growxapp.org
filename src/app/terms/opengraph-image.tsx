import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "GrowX terms of service";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Terms",
    title: "Terms of service",
    subtitle: "The terms for using the GrowX website and the GrowX Chrome extension.",
    chips: ["Free plan", "Premium", "Prepaid"],
  });
}
