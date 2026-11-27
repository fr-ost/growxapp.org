import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "How GrowX works: install the Chrome extension, sign in, press Start";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · How it works",
    title: "Install, sign in, press Start.",
    subtitle: "GrowX works inside the x.com tab you are already signed in to, at a human pace, with safety stops built in.",
    chips: ["Chrome extension", "No X password", "Human pace", "Free to start"],
  });
}
