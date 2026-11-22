import Link from "next/link";
import { liveBadges, type DirectoryBadge } from "@/data/badges";

/**
 * One directory badge, exactly as the directory provided it (`html`): many directories verify the link, image URL,
 * alt text and rel by exact match or with a crawler, so the markup is never rebuilt, never routed through next/image,
 * and never given nofollow. It is server-rendered, so it is in the HTML a crawler fetches.
 */
export function OfficialBadge({ badge, className = "" }: { badge: DirectoryBadge; className?: string }) {
  return <span className={`featured-badge inline-flex ${className}`} dangerouslySetInnerHTML={{ __html: badge.html ?? "" }} />;
}

/**
 * The compact "Featured on" strip in the footer: only badges that are verified, have a real slug and official HTML
 * (`liveBadges`). Muted and small; the image's own width and height attributes keep its aspect ratio, so no layout shift.
 */
export function FeaturedOn() {
  if (!liveBadges.length) return null;
  return (
    <div className="featured-on flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-5">
      <p className="shrink-0 text-xs font-semibold text-white/60">
        <Link href="/featured" className="link-draw hover:text-white">
          Featured on
        </Link>
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start">
        {liveBadges.map((b) => (
          <li key={b.name}>
            <OfficialBadge
              badge={b}
              className="opacity-70 hover:opacity-100 focus-within:opacity-100 motion-ok:transition-opacity motion-ok:duration-200 [&_img]:h-7 [&_img]:w-auto"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
