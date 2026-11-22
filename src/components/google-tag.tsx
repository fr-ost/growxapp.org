import Script from "next/script";
import { site } from "@/config/site";

/**
 * Google tag (gtag.js) for Google Ads. Rendered only on the production deployment, so previews and local runs send nothing.
 * The small inline snippet runs after hydration and defines gtag(), so conversion events queue in dataLayer at once; the
 * gtag.js library itself loads when the browser is idle (lazyOnload), which also keeps it out of the <head> preloads.
 */
export function GoogleTag() {
  if (process.env.VERCEL_ENV !== "production" || !/^[A-Z]{1,3}-[A-Z0-9]+$/.test(site.googleTagId)) return null;
  const id = site.googleTagId;
  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload" />
    </>
  );
}
