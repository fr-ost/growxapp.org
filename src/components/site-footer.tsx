"use client";

/*
 * A client component with no props on purpose: its HTML is still rendered on the server (every link is in the page
 * source), but the page's RSC payload carries a reference instead of a second copy of the footer. Directory badges are
 * not in the footer: they are listed only on /featured (linked as "Featured on" in the Company column).
 */
import { IntentLink } from "@/components/ui/intent-link";
import { Logo } from "@/components/logo";
import { IconChrome, IconMail } from "@/components/icons";
import { Aurora } from "@/components/motion/aurora";
import { MotionToggle } from "@/components/motion/motion-toggle";
import { Wordmark } from "@/components/motion/wordmark";
import { Container } from "@/components/ui/primitives";
import { featureNav, toolNav } from "@/config/nav";
import { site } from "@/config/site";
import { CURRENT_VERSION } from "@/content/releases";
import { FooterStoreLink } from "@/components/footer-store-link";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "All features" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/tools", label: "Free tools" },
      { href: "/blog", label: "Blog" },
      { href: "/whats-new", label: "What's new" },
      { href: "/alternatives", label: "Compare tools" },
      { href: "/faq", label: "FAQ" },
      { href: "/signup", label: "Start free" },
    ],
  },
  { title: "Free tools", links: toolNav.map((t) => ({ href: t.href, label: t.label })) },
  { title: "Features", links: featureNav.map((f) => ({ href: `/features/${f.slug}`, label: f.label })) },
  {
    title: "Guides",
    links: [
      { href: "/blog/how-to-grow-on-twitter-x", label: "How to grow on Twitter" },
      { href: "/blog/first-1000-followers-on-x", label: "Your first 1,000 followers" },
      { href: "/blog/how-to-schedule-tweets", label: "How to schedule tweets" },
      { href: "/blog/best-time-to-post-on-twitter", label: "Best time to post on X" },
      { href: "/blog/who-unfollowed-me-on-twitter", label: "Who unfollowed me?" },
      { href: "/blog/twitter-algorithm-explained", label: "The X algorithm explained" },
      { href: "/blog/best-twitter-growth-tools", label: "Best growth tools" },
      { href: "/blog", label: "All articles" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/press", label: "Press kit" },
      { href: "/featured", label: "Featured on" },
      { href: "/contact", label: "Support" },
      { href: "/login", label: "Log in" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
      { href: "/refund-policy", label: "Refund policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-clip bg-ink text-white/70 on-ink">
      <Aurora tone="ink" />
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" data-decor="" />
      <div
        className="draw-x absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff5a68,transparent)]"
        aria-hidden="true"
        data-decor=""
      />
      <Container className="relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {site.definition}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <FooterStoreLink className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-[translate] duration-200 ease-glide hover:-translate-y-0.5">
              <IconChrome size={16} /> Chrome Web Store
            </FooterStoreLink>
            <a
              href={`mailto:${site.supportEmail}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:border-white/40"
            >
              <IconMail size={16} /> Email us
            </a>
          </div>
          <p className="mt-6 max-w-xs text-xs leading-relaxed text-white/60">GrowX is independent and not affiliated with or endorsed by X Corp.</p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-sm font-bold text-white">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}>
                  <IntentLink href={l.href} className="link-draw text-sm text-white/60 hover:text-white">
                    {l.label}
                  </IntentLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-white/60 lg:flex-row lg:text-left">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} GrowX · {site.author}</p>
          <p>Free plan forever · 30-day Premium trial, no credit card · Premium paid in crypto via NOWPayments</p>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] text-white/70">v{CURRENT_VERSION} · Chrome 116+</span>
            <MotionToggle />
          </div>
        </Container>
      </div>
      <Wordmark className="pointer-events-none relative -mb-[0.14em] px-4 text-center" />
    </footer>
  );
}
