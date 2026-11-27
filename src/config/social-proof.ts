/**
 * Real numbers from the GrowX listing on the Chrome Web Store, copied by hand on `updatedAt`. They do not update
 * themselves: open the listing, copy the rating, the number of ratings and the number of users, and set updatedAt.
 * Never round up or estimate. The trust strip (src/components/trust-strip.tsx) hides itself when there are no ratings.
 */
export const socialProof = {
  cwsRating: 5.0,
  cwsRatingCount: 12,
  cwsUsers: 242,
  updatedAt: "2026-11-27",
  /**
   * Whether the rating is also marked up as aggregateRating in the SoftwareApplication JSON-LD (home page only, where
   * the strip shows it). Off on purpose: Google's review snippet guidelines say not to mark up reviews or ratings that
   * were collected on another website, and these were collected on the Chrome Web Store. Read
   * https://developers.google.com/search/docs/appearance/structured-data/review-snippet before turning it on.
   */
  markUpRating: false,
} as const;

export const hasRatings = socialProof.cwsRatingCount > 0 && socialProof.cwsRating > 0;
