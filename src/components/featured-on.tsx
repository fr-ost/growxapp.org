import type { DirectoryBadge } from "@/data/badges";

/**
 * A directory badge for /featured, the only page that shows them (they are not in the footer or any shared layout).
 * The directory's own markup is kept (its link, image URL and alt text), with three changes: every link gets
 * rel="nofollow noopener", and every image gets loading="lazy" and explicit width and height (from the badge data when
 * the markup has none), so it never shifts the layout. It is server-rendered, so it is in the HTML a crawler fetches.
 */
export function OfficialBadge({ badge, className = "" }: { badge: DirectoryBadge; className?: string }) {
  return <span className={`featured-badge inline-flex ${className}`} dangerouslySetInnerHTML={{ __html: badgeHtml(badge) }} />;
}

/** The rel every directory link gets. */
export const DIRECTORY_REL = "nofollow noopener";

/** The directory's badge markup with nofollow links and lazy, sized images (see OfficialBadge). */
export function badgeHtml(badge: DirectoryBadge): string {
  const html = badge.html ?? "";
  const withRel = html.replace(/<a\b([^>]*)>/g, (_m, attrs: string) => {
    const rest = attrs.replace(/\srel=("[^"]*"|'[^']*')/i, "");
    return `<a${rest} rel="${DIRECTORY_REL}">`;
  });
  return withRel.replace(/<img\b([^>]*?)(\s*\/?)>/g, (_m, attrs: string, close: string) => {
    let a = attrs;
    if (!/\sloading=/i.test(a)) a += ' loading="lazy"';
    if (!/\swidth=/i.test(a) && badge.width) a += ` width="${badge.width}"`;
    if (!/\sheight=/i.test(a) && badge.height) a += ` height="${badge.height}"`;
    return `<img${a}${close}>`;
  });
}
