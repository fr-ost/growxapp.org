"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href" | "prefetch"> & { href: string };

/** When the page last scrolled (one shared listener). A link passing under a resting pointer while the page scrolls is not intent. */
let lastScroll = -Infinity;
let listening = false;
function listenForScroll() {
  if (listening) return;
  listening = true;
  addEventListener("scroll", () => (lastScroll = performance.now()), { passive: true });
}

/**
 * A next/link that prefetches its page on intent (the pointer over it, keyboard focus, a touch or a press) instead of as
 * soon as it scrolls into view. For dense link lists (the footer, blog cards, related guides, rich text): with plain
 * <Link>, scrolling a page fetched and parsed the data of every route that came into view, dozens of requests competing
 * with scrolling. The visit still feels instant: the prefetch starts on hover, a few hundred milliseconds before the click.
 * Keep plain <Link> where a few links are the likely next click (the header navigation, main calls to action).
 *
 * Next.js's documented hover-prefetch pattern: prefetch stays off until the first sign of intent, then the link gets the
 * default prefetch, which runs at once because the link is on screen. No router hook, so it also renders outside the
 * App Router (tests, static markup), like <Link> itself.
 */
export function IntentLink({ href, onPointerEnter, onPointerMove, onPointerDown, onFocus, onTouchStart, ...rest }: Props) {
  const [hot, setHot] = useState(false);
  useEffect(listenForScroll, []);
  const warm = (always = false) => {
    if (hot || (!always && performance.now() - lastScroll < 200)) return;
    setHot(true);
  };
  return (
    <Link
      href={href}
      prefetch={hot ? null : false}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        warm();
      }}
      onPointerMove={(e) => {
        onPointerMove?.(e);
        warm();
      }}
      onPointerDown={(e) => {
        onPointerDown?.(e);
        warm(true);
      }}
      onFocus={(e) => {
        onFocus?.(e);
        warm(true);
      }}
      onTouchStart={(e) => {
        onTouchStart?.(e);
        warm(true);
      }}
      {...rest}
    />
  );
}
