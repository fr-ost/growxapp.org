import type { ComponentProps, ReactNode } from "react";
import { ExternalButton } from "@/components/ui/button";
import { cwsReviewsUrl, cwsUrl, type CwsLinkSpec } from "@/lib/cws";

type ButtonProps = Omit<ComponentProps<typeof ExternalButton>, "href"> & CwsLinkSpec;

/** A store button ("Add to Chrome") with the page and placement in its UTM tags. Opens in a new tab (noopener). */
export function CwsButton({ campaign, content, children, ...props }: ButtonProps) {
  return (
    <ExternalButton href={cwsUrl({ campaign, content })} {...props}>
      {children}
    </ExternalButton>
  );
}

type LinkProps = Omit<ComponentProps<"a">, "href" | "target" | "rel"> & CwsLinkSpec & { reviews?: boolean; children: ReactNode };

/** A plain text link to the store listing (or its reviews tab), tagged the same way. Opens in a new tab (noopener). */
export function CwsLink({ campaign, content, reviews = false, children, ...props }: LinkProps) {
  const href = reviews ? cwsReviewsUrl({ campaign, content }) : cwsUrl({ campaign, content });
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
