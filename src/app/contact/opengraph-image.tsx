import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "Contact GrowX support";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Support",
    title: "Questions? Get in touch.",
    subtitle: "Email GrowX support or message the developer on Telegram.",
    chips: ["Email", "Telegram"],
  });
}
