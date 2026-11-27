import { formatPostDate } from "@/components/blog/format-date";
import { releases } from "@/content/releases";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

const latest = releases[0];

export const alt = `What's new in GrowX ${latest.version}: ${latest.title}`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    kicker: "GrowX · What's new",
    title: `GrowX ${latest.version}: ${latest.title}`,
    subtitle: `${formatPostDate(latest.date)}. Every version of the Chrome extension, newest first, with its date.`,
    chips: [`Version ${latest.version}`, "Release notes", "Free update"],
  });
}
