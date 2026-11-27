import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = "GrowX use cases: crypto accounts, new accounts, creators and founders";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Use cases",
    title: "Who GrowX helps grow on X.",
    subtitle: "Crypto and Web3 accounts, brand new accounts, and creators or founders who build in public.",
    chips: ["Crypto Twitter", "New accounts", "Build in public"],
  });
}
