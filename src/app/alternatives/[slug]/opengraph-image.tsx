import { alternativePages, getAlternative } from "@/content/alternatives";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export function generateStaticParams() {
  return alternativePages.map((a) => ({ slug: a.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = getAlternative((await params).slug);
  return [{ id: "card", alt: page ? `${page.name} vs GrowX: a fair comparison for X (Twitter)` : "GrowX comparison", size: OG_SIZE, contentType: OG_TYPE }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const page = getAlternative((await params).slug);
  return ogImage({
    kicker: `GrowX · ${page?.name ?? "Tool"} alternative`,
    title: page ? `${page.name} vs GrowX` : "GrowX compared",
    subtitle: page?.blurb,
    chips: ["No X password", "On-device AI", "Smart auto follow", "Prepaid, no auto-renew"],
  });
}
