import { getUseCase, useCases } from "@/content/use-cases";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/og";

export function generateStaticParams() {
  return useCases.map((u) => ({ slug: u.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const u = getUseCase((await params).slug);
  return [{ id: "card", alt: u ? `${u.h1}: a GrowX use case` : "A GrowX use case", size: OG_SIZE, contentType: OG_TYPE }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const u = getUseCase((await params).slug);
  return ogImage({
    kicker: "GrowX · Use case",
    title: u?.h1 ?? "Grow on X with GrowX",
    subtitle: u?.blurb ?? "",
    chips: ["Free to start", "Chrome extension", "No X password"],
  });
}
