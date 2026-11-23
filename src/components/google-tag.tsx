import Script from "next/script";
import { site } from "@/config/site";

const AW_ID = /^[A-Z]{1,3}-[A-Z0-9]+$/;
const GTM_ID = /^GTM-[A-Z0-9]+$/;

/**
 * Google tag (gtag.js, Google Ads) and Google Tag Manager. Rendered only on the production deployment, so previews and
 * local runs send nothing.
 * One small inline snippet runs after hydration: it creates dataLayer and gtag() once for both, so conversion events
 * queue at once. gtag.js and the Tag Manager container (gtm.js) themselves load when the browser is idle (lazyOnload),
 * which also keeps them out of the <head> preloads.
 * Tags added inside the Tag Manager container must not repeat what the site already sends (the Google Ads tag and the
 * Purchase conversion), or they are counted twice.
 */
export function GoogleTag() {
  if (process.env.VERCEL_ENV !== "production") return null;
  const aw = AW_ID.test(site.googleTagId) ? site.googleTagId : null;
  const gtm = GTM_ID.test(site.googleTagManagerId) ? site.googleTagManagerId : null;
  if (!aw && !gtm) return null;
  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());${aw ? `\ngtag('config', '${aw}');` : ""}`}
      </Script>
      {aw ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${aw}`} strategy="lazyOnload" /> : null}
      {gtm ? <Script id="google-tag-manager" src={`https://www.googletagmanager.com/gtm.js?id=${gtm}`} strategy="lazyOnload" /> : null}
    </>
  );
}
