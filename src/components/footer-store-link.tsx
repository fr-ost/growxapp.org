"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { campaignFor, cwsUrl } from "@/lib/cws";

/**
 * The footer's store link. The footer is part of the shared layout, which does not know the page, so this reads the
 * path (also during prerendering, so the static HTML already has the right link) and tags the link with that page.
 */
export function FooterStoreLink({ className, children }: { className?: string; children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  return (
    <a href={cwsUrl({ campaign: campaignFor(pathname), content: "footer" })} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
