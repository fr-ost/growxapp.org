import { OG_SIZE, OG_TYPE, toolOg } from "@/lib/og";

const card = toolOg("/tools/tweet-templates");
export const alt = card.alt;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return card.render();
}
