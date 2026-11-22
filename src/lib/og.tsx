import { ImageResponse } from "next/og";
import { toolNav as TOOLS } from "@/config/nav";

/** Social card size (Open Graph and X large card). */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

export interface OgCard {
  /** Small line above the title, e.g. "GrowX · Features". */
  kicker: string;
  title: string;
  subtitle?: string;
  chips?: readonly string[];
}

/** The site's social card: the brand gradient, a kicker, a large title, an optional subtitle and chips. Same style as /opengraph-image. */
export function ogImage({ kicker, title, subtitle, chips }: OgCard) {
  const titleSize = title.length > 70 ? 54 : title.length > 44 ? 64 : 80;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #FF4B5C 0%, #E11D2E 50%, #9F1239 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>{kicker}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2, maxWidth: 1040 }}>{title}</div>
          {subtitle ? <div style={{ display: "flex", fontSize: 30, marginTop: 22, opacity: 0.9, maxWidth: 1040 }}>{subtitle}</div> : null}
        </div>
        {chips?.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {chips.map((c) => (
              <div
                key={c}
                style={{ display: "flex", fontSize: 24, fontWeight: 700, padding: "10px 22px", borderRadius: 999, background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                {c}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", fontSize: 26, opacity: 0.9 }}>growxapp.org · The Ultimate X (Twitter) Growth Tool</div>
        )}
      </div>
    ),
    OG_SIZE,
  );
}

/** Card for one free tool page, from the tool menu (label and blurb). */
export function toolOg(href: string) {
  const tool = TOOLS.find((t) => t.href === href);
  return {
    alt: tool ? `${tool.label}: free X (Twitter) tool from GrowX` : "Free X (Twitter) tool from GrowX",
    render: () => ogImage({ kicker: "GrowX · Free tool", title: tool?.label ?? "Free X tool", subtitle: tool ? `${tool.blurb}. Free, no sign-up, runs in your browser.` : undefined }),
  };
}
