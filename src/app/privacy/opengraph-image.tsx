import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "GrowX privacy policy";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Privacy",
    title: "Privacy policy",
    subtitle: "What GrowX stores, where it is kept and why. GrowX never asks for your X password.",
    chips: ["Data in your browser", "No X password"],
  });
}
