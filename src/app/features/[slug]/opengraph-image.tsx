import { featurePages, getFeaturePage } from "@/content/feature-pages";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export function generateStaticParams() {
  return featurePages.map((f) => ({ slug: f.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = getFeaturePage((await params).slug);
  return [{ id: "card", alt: page ? `GrowX ${page.nav}: ${page.blurb}` : "GrowX feature", size: OG_SIZE, contentType: OG_TYPE }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const page = getFeaturePage((await params).slug);
  return ogImage({ kicker: `GrowX · ${page?.eyebrow ?? "Features"}`, title: page?.h1 ?? "GrowX features", subtitle: page?.blurb });
}
