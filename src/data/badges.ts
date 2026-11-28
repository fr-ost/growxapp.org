export type DirectoryBadge = {
  name: string;
  href: string | null;
  img: string | null;
  alt: string | null;
  /** The image's size in px. null = not published by the directory: TODO measure the image and fill it in. */
  width: number | null;
  height: number | null;
  relRequirement: string;
  placementRequirement: string;
  verified: boolean;
  needsSlug: boolean;
  html: string | null; // official canned HTML, or null if TODO
  officialPage: string;
  listingUrl: string | null;
};

/**
 * The only badge on the site (28 Nov 2026: every other directory badge was removed). Shown on /featured only.
 * `html` is Product Hunt's official embed, unchanged; OfficialBadge sets rel, alt text and lazy loading when it renders.
 */
export const badges: DirectoryBadge[] = [
  {
    name: "Product Hunt",
    href: "https://www.producthunt.com/products/growx-smarter-audience-growth-on-x?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-growx-smarter-audience-growth-on-x",
    img: "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1284922&theme=light&t=1795839175021",
    alt: "GrowX featured on Product Hunt",
    width: 250,
    height: 54,
    relRequirement: "None stated. The official embed uses rel=\"noopener noreferrer\"; the site renders it nofollow noopener like every badge.",
    placementRequirement: "None stated.",
    verified: true,
    needsSlug: false,
    html: "<a href=\"https://www.producthunt.com/products/growx-smarter-audience-growth-on-x?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-growx-smarter-audience-growth-on-x\" target=\"_blank\" rel=\"noopener noreferrer\"><img alt=\"GrowX \u2013 Smarter Audience Growth on X - Discover, automate, and grow your audience on X/Twitter. | Product Hunt\" width=\"250\" height=\"54\" src=\"https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1284922&amp;theme=light&amp;t=1795839175021\"></a>",
    officialPage: "https://www.producthunt.com/products/growx-smarter-audience-growth-on-x",
    listingUrl: "https://www.producthunt.com/products/growx-smarter-audience-growth-on-x",
  },
];

export const liveBadges = badges.filter((b) => b.verified && !b.needsSlug && b.html);
