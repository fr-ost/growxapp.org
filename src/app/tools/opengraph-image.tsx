import { toolNav } from "@/config/nav";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export const alt = `${toolNav.length} free X (Twitter) tools from GrowX, no sign-up`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · Free tools",
    title: `${toolNav.length} free X (Twitter) tools, no sign-up`,
    subtitle: "Small, fast tools that run in your browser. Nothing you type leaves your computer.",
    chips: ["Shadowban checker", "Character counter", "Thread maker", "Bio generator"],
  });
}
