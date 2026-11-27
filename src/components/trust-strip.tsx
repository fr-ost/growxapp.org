import type { CSSProperties } from "react";
import { IconStar } from "@/components/icons";
import { CwsLink } from "@/components/cws-link";
import { hasRatings, socialProof } from "@/config/social-proof";

const rating = socialProof.cwsRating.toFixed(1);
const users = socialProof.cwsUsers.toLocaleString("en-US");

/** The trust line's text, as shown (also used by tests). */
export const TRUST_TEXT = `Rated ${rating} on the Chrome Web Store · ${users} users`;

/**
 * "Rated 5.0 on the Chrome Web Store · 242 users", from src/config/social-proof.ts (real numbers from the listing),
 * linking to the listing's reviews tab. Renders nothing when there are no ratings.
 */
export function TrustStrip({ campaign, className = "", tone = "light", style }: { campaign: string; className?: string; tone?: "light" | "ink"; style?: CSSProperties }) {
  if (!hasRatings) return null;
  const muted = tone === "ink" ? "text-white/75 hover:text-white" : "text-text-2 hover:text-text";
  return (
    <p className={`text-sm font-medium ${className}`} style={style}>
      <CwsLink
        campaign={campaign}
        content="trust-strip"
        reviews
        className={`inline-flex items-center gap-1.5 underline-offset-4 hover:underline ${muted}`}
        aria-label={`${TRUST_TEXT}. Read the reviews on the Chrome Web Store`}
      >
        <span className="flex text-accent" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <IconStar key={i} size={14} className="fill-current" />
          ))}
        </span>
        <span>{TRUST_TEXT}</span>
      </CwsLink>
    </p>
  );
}
