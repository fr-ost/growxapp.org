import { site } from "@/config/site";
import { LegalPage } from "@/components/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the GrowX website handles personal data: accounts, trials, payments and your rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 2026">
      <p>
        This policy describes how the GrowX website handles personal data. The GrowX Chrome extension has its own
        privacy policy inside the extension; this page covers the website, the optional account system and the
        extension&apos;s optional usage data summarised below.
      </p>
      <h2>Who is responsible</h2>
      <p>{site.legalName}, {site.legalAddress}. Contact: <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.</p>
      <h2>What the website collects</h2>
      <ul>
        <li>Account data: your email address and a password hash or Google sign-in identifier, handled by Supabase Auth.</li>
        <li>An X username, only if you choose to enter it. It is self-reported and is not verified as belonging to you.</li>
        <li>Trial records: when a trial started and when it ends.</li>
        <li>Subscription and payment records (plan, status, amount, currency, provider reference IDs). Wallet details and private keys are never requested or stored by GrowX; blockchain transactions are public by nature.</li>
        <li>Technical data such as IP address and request logs processed by the hosting provider.</li>
      </ul>
      <h2>What the website does not collect</h2>
      <ul>
        <li>Your X password or X login. GrowX does not use X OAuth.</li>
        <li>Your X follow lists, queue, sources or settings. In the extension these stay in your browser storage.</li>
      </ul>
      <h2>Optional usage data from the extension</h2>
      <p>
        The extension can send two kinds of usage data to our telemetry server, and both can be turned off in its settings:
      </p>
      <ul>
        <li>
          <strong>Anonymous usage counts</strong> (the &ldquo;Share anonymous usage stats&rdquo; setting): a random install id, the extension
          version and coarse counts, with nothing about your X account. If this setting is on, uninstalling the extension also sends that random
          id and version once.
        </li>
        <li>
          <strong>Feature usage, only if you say yes</strong> (since version 2.4.7): the extension asks once. Only if you answer &ldquo;Share
          feature usage&rdquo;, and only while anonymous usage stats are also on, it sends events such as a page being opened, the autopilot
          starting or stopping, a post being scheduled or the AI writer being used. Our server checks each event against a fixed list and
          passes it to GrowX&apos;s Google Analytics 4 property. Events carry only the event name and fixed categories or rounded numbers (version,
          operating system, page, result, a reason category, a duration or count range), the same random install id and a session number. If
          you are signed in to a GrowX account, a one-way scrambled form of the account&apos;s internal id (never your email) and your plan type
          are included.
        </li>
      </ul>
      <p>
        This data never includes your X handle or account, who you follow, your sources or lists, any post, draft, reply, AI prompt or answer,
        your email or password, tokens, cookies, links or the pages you visit. Until you answer, feature-usage events wait on your computer only
        (at most 3 days); &ldquo;No thanks&rdquo; deletes them unsent. Turning either setting off stops sending and deletes anything waiting.
      </p>
      <h2>Why we use data</h2>
      <ul>
        <li>To provide sign-in, your dashboard and plan information.</li>
        <li>To limit each account to one free trial and prevent abuse.</li>
        <li>To process purchases, issue access and handle refunds and support.</li>
      </ul>
      <h2>Service providers</h2>
      <p>
        Supabase (database and authentication), Vercel (hosting) and Cloudflare (the extension&apos;s telemetry server) process data on our behalf. Google receives the extension&apos;s feature-usage events only if you opted in, through Google Analytics. Google processes
        sign-in data if you use Google sign-in, and advertising measurement data through the Google tag (see Cookies). NOWPayments processes crypto payments; it receives the data needed to take payment and send us only payment status and reference IDs. These providers may process data outside your country.
      </p>
      <h2>Retention and your rights</h2>
      <p>
        We keep account data while your account exists. Trial and payment records are kept as long as needed for fraud prevention, accounting and legal obligations (typically up to 7 years for payment records). Depending on where you live you may have rights to access, correct or
        delete your data. Account deletion is not yet self-service; contact us to request it. Trial and payment
        records may be retained where needed for fraud prevention and accounting.
      </p>
      <h2>Cookies</h2>
      <p>
        The website uses strictly necessary cookies to keep you signed in. It also uses the Google tag (Google Ads) to
        measure the results of our advertising, for example whether a visit from an ad led to a sign-up. Google may set
        advertising cookies and receive technical data such as your IP address, browser and the pages you visit; see{" "}
        <a href="https://policies.google.com/technologies/partner-sites">how Google uses data from sites that use its services</a>.
        You can limit ad personalisation at <a href="https://adssettings.google.com">adssettings.google.com</a> or block
        these cookies in your browser; the website keeps working without them.
      </p>
      <h2>Changes</h2>
      <p>We will update this policy when our practices change and show the date above.</p>
    </LegalPage>
  );
}
