import { TRIAL_DAYS } from "@/config/pricing";

/**
 * The /faq page: every common question in one place, grouped by topic. Answers are plain text (they are also
 * rendered as FAQPage structured data) and must match docs/PRODUCT_FACTS.md, the pricing page and the refund
 * policy. `more` adds a "Learn more" link under the answer on the page only.
 */
export interface FaqItem {
  q: string;
  a: string;
  more?: { href: string; label: string };
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        q: "What is GrowX?",
        a: "GrowX is a Chrome extension that brings the main X (Twitter) growth jobs into one dashboard: smart auto follow, a post and thread scheduler, the GrowX AI writer, post analytics, an unfollower tracker, reply targets and cleanup tools for non-followers and inactive accounts.",
        more: { href: "/features", label: "See all features" },
      },
      {
        q: "How do I install GrowX?",
        a: "Install GrowX from the Chrome Web Store in desktop Chrome, open x.com in the same Chrome profile and sign in to your X account as usual. A setup wizard then walks you through choosing sources, a pace and your posting slots. It takes about five minutes.",
        more: { href: "/how-it-works", label: "How it works, step by step" },
      },
      {
        q: "Which browsers and devices does GrowX support?",
        a: "GrowX is an extension for desktop Chrome 116 or newer on Windows, macOS, Linux and ChromeOS. Other Chromium browsers may install Chrome extensions, but only Chrome is supported. There is no mobile app, although the dashboard has phone and tablet layouts.",
      },
      {
        q: "Do I need a GrowX account?",
        a: `A free account on growxapp.org is where you start the ${TRIAL_DAYS}-day Premium trial, link your X account, buy Premium and see your invoices. Signing up takes a minute with your email and a password.`,
        more: { href: "/signup", label: "Create a free account" },
      },
      {
        q: "Is GrowX made by X or Twitter?",
        a: "No. GrowX is an independent product built by Shahriar Ahmed. It is not affiliated with or endorsed by X Corp.",
        more: { href: "/about", label: "About GrowX" },
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing and payments",
    items: [
      {
        q: "Is GrowX free?",
        a: "Yes. The free plan is free forever and includes the Safe and Balanced auto follow paces, sources and core filters, scheduling with up to 10 posts waiting, best time to post, 52 templates, reply targets, analytics for your latest 30 posts, 7 days of follower history, goals and the cleanup scan with up to 200 unfollows per run.",
      },
      {
        q: "How much does GrowX Premium cost?",
        a: "Premium costs $1.99 for 30 days, $14.99 for 365 days or $59.99 for lifetime access. The first 100 lifetime buyers pay $29.99. Every plan is prepaid.",
        more: { href: "/pricing", label: "Compare plans" },
      },
      {
        q: "What do I get with Premium?",
        a: "GrowX AI, unlimited scheduling, evergreen recycling and auto-plug, the Turbo and X Premium paces, the smart score and more source types, advanced filters and list import, full analytics with the weekly report, full follower history and follower quality, VIP alerts, bulk unfollow, automatic cleanup and a workspace per X account.",
      },
      {
        q: "How do I pay?",
        a: "With cryptocurrency through a secure NOWPayments invoice page, where you choose the coin: Ethereum (ETH) and BNB Smart Chain (BEP20) coins. Premium turns on automatically once your payment is confirmed on the network.",
      },
      {
        q: "Does Premium renew automatically?",
        a: "No. Monthly and yearly plans are prepaid for 30 or 365 days and never renew by themselves, so there is nothing to cancel. When the period ends you go back to the free plan. Lifetime is a single payment and does not expire.",
      },
      {
        q: "Can I get a refund?",
        a: "You can ask for a refund within 14 days of a purchase if you have not used Premium extensively in that time. Email support from your account email with your order details. Crypto refunds, where granted, are sent manually in the same asset, minus network fees.",
        more: { href: "/refund-policy", label: "Read the refund policy" },
      },
      {
        q: "I paid but Premium is not active. What should I do?",
        a: "Premium activates once the payment is confirmed on the blockchain, which can take a few minutes. If it still is not active, or if you underpaid, overpaid, paid after the payment window or used the wrong coin or network, contact support with your transaction ID.",
      },
      {
        q: "Can I get an invoice?",
        a: "Yes. Your invoices are listed on your dashboard after you sign in, and each one can be printed or saved as a PDF.",
      },
    ],
  },
  {
    id: "trial-account",
    title: "Free trial and your account",
    items: [
      {
        q: `How does the ${TRIAL_DAYS}-day free trial work?`,
        a: `Create a free account, confirm your email, link your X account and start the trial from your dashboard. It lasts ${TRIAL_DAYS} days, unlocks every Premium feature, needs no credit card or payment details, and each account and X account can use it once.`,
      },
      {
        q: "What happens when the trial ends?",
        a: "You go back to the free plan automatically. Nothing is charged, because no payment details were ever asked for. Buy Premium whenever you want the Premium features again.",
      },
      {
        q: "Can I use GrowX with more than one X account?",
        a: "Yes. Every GrowX account links 2 X usernames for free, and extra slots cost $0.99 each, one time. On Premium, each X account gets its own workspace with its own settings, queue and history.",
      },
      {
        q: "How do I change the X username linked to my account?",
        a: "Contact support from your account email with the username you want to link, and we will update it for you.",
      },
      {
        q: "How do I delete my GrowX account?",
        a: "Account deletion is not self-service yet. Email support from your account email to request it. Data inside the extension stays in your browser and is removed when you uninstall the extension.",
        more: { href: "/privacy", label: "Privacy policy" },
      },
    ],
  },
  {
    id: "auto-follow",
    title: "Auto follow and safety",
    items: [
      {
        q: "How does GrowX auto follow work?",
        a: "You add source profiles, accounts in your niche, or let GrowX find them for you. GrowX follows the newest followers of those sources first, then everyone else in order of a follow-back score from 1 to 99 (minimum 55 by default), one account at a time with random delays, breaks and caps.",
        more: { href: "/features/twitter-auto-follow", label: "Smart auto follow" },
      },
      {
        q: "How many people can GrowX follow per day?",
        a: "It depends on the pace: about 150 a day on Safe, 280 on Balanced, 390 on Turbo and 800 on the X Premium pace, always within rolling hourly and daily caps. Turbo and X Premium are Premium paces meant for aged accounts and accounts with X Premium.",
      },
      {
        q: "Is GrowX safe for my X account?",
        a: "No tool can promise zero risk; X makes its own decisions. GrowX is built to behave like a careful person: random delays, breaks, hourly and daily caps, optional active hours and warm-up, a following-cap guard, an automatic slow-down after any X warning, and an emergency stop with Alt+Shift+S. Start new accounts on the Safe pace.",
        more: { href: "/blog/bulk-follow-twitter-safely", label: "How to follow safely" },
      },
      {
        q: "What happens if X shows a warning?",
        a: "GrowX backs off automatically: it lowers its limits and rests before continuing, and posting pauses too. If you are signed out, the account is locked or X shows repeated automation warnings, it stops completely and never clicks through a challenge.",
      },
      {
        q: "Does auto follow keep running if I close the X tab?",
        a: "Yes. The engine runs in the extension's background and keeps going until you press Stop, and it resumes after Chrome restarts. Chrome itself has to stay open, and GrowX keeps the computer awake while it runs.",
      },
      {
        q: "Why did auto follow stop following people?",
        a: "Common reasons: you reached the daily or hourly cap, you are outside your active hours, the following-cap guard stopped it near X's following limit (5,000, or about 10% above your follower count), X showed a warning, or you were signed out. The popup shows the current state and when it will continue.",
        more: { href: "/tools/twitter-follower-ratio-calculator", label: "Check your following limit" },
      },
    ],
  },
  {
    id: "posting",
    title: "Scheduler and GrowX AI",
    items: [
      {
        q: "How does the post scheduler work?",
        a: "Write a post or a thread of up to 25 parts, add up to 4 images, then post now, pick a date and time, or add it to your queue slots (09:00, 13:00 and 18:30 by default). A calendar, drafts, 52 templates and a best-time-to-post heat map are built in.",
        more: { href: "/features/twitter-post-scheduler", label: "Post scheduler" },
      },
      {
        q: "Do scheduled posts go out when my computer is off?",
        a: "No. GrowX posts through your signed-in x.com tab in Chrome, so the computer must be on with Chrome open at the scheduled time. A post that would be more than six hours late is never posted by itself; it waits for you as missed.",
      },
      {
        q: "How many posts can I schedule for free?",
        a: "On the free plan, up to 10 posts or threads can wait in the queue at once. Premium removes the limit and adds evergreen recycling and auto-plug.",
      },
      {
        q: "Where does GrowX AI run?",
        a: "On your own computer, using the AI model built into Chrome. Your drafts are not sent to GrowX and there is no API key. GrowX AI is a Premium feature.",
        more: { href: "/features/ai-tweet-writer", label: "GrowX AI writer" },
      },
      {
        q: "Why are the GrowX AI buttons not working?",
        a: "GrowX AI needs a recent desktop Chrome with enough memory and disk space, and Chrome downloads its built-in model once. Until the model is available, the AI buttons fall back to templates and the plain thread splitter.",
      },
      {
        q: "Does GrowX post, reply or send messages by itself?",
        a: "Only what you schedule goes out at the time you chose. Replies and likes from the Engage page are only sent when you press the button, and GrowX never sends direct messages.",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics and unfollowers",
    items: [
      {
        q: "Can I see who unfollowed me on X?",
        a: "Yes. GrowX checks your follower list once a day and shows who followed and who unfollowed you. The free plan keeps 7 days of history; Premium keeps the full history and adds one-click unfollow back.",
        more: { href: "/features/twitter-unfollower-tracker", label: "Unfollower tracker" },
      },
      {
        q: "What analytics does GrowX show?",
        a: "Views, likes, reposts, replies, bookmarks and engagement rate for your recent posts, which topics and formats work best, your best time to post and your top fans. Premium adds which posts brought followers, follower quality and a weekly report.",
        more: { href: "/features/twitter-analytics", label: "Analytics" },
      },
      {
        q: "How often are my numbers updated?",
        a: "Post numbers are refreshed every 3 hours while x.com is open, and the follower list is checked once a day. GrowX reads them through an open x.com tab, one small step per minute at most.",
      },
    ],
  },
  {
    id: "cleanup",
    title: "Cleanup and unfollowing",
    items: [
      {
        q: "Can GrowX unfollow people who don't follow me back?",
        a: "Yes. Cleanup scans your following and followers, lists accounts that are not following back or inactive, and unfollows the ones you select at a safe pace, up to 30 an hour and 200 a day. Each account is re-checked right before it is unfollowed.",
        more: { href: "/features/twitter-unfollow-tool", label: "Unfollow tool" },
      },
      {
        q: "How many accounts can I unfollow at once?",
        a: "Up to 200 per run on the free plan. Premium adds bulk unfollow of up to 5,000 in one run, a Balanced unfollow pace of 45 an hour and 320 a day, and automatic cleanup of GrowX's own follows that did not follow back.",
      },
      {
        q: "Will automatic cleanup unfollow people I followed myself?",
        a: "No. Automatic cleanup only unfollows accounts GrowX followed for you that did not follow back after 2, 5 or 7 days. It never touches accounts you followed yourself or imported.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy and data",
    items: [
      {
        q: "Do I need to give GrowX my X password?",
        a: "No. GrowX works through the x.com session that is already signed in to your Chrome browser. It never asks for, sees or stores your X password, and it does not use X OAuth or API keys.",
      },
      {
        q: "Where is my data stored?",
        a: "Your settings, sources, queue, posts, history and analytics are stored in your browser. GrowX does not upload your X data. Optional Chrome sync uses Chrome's own sync storage, and you can export a backup file at any time.",
        more: { href: "/privacy", label: "Privacy policy" },
      },
      {
        q: "Does GrowX collect usage data?",
        a: "Only optional anonymous usage counts: a random install id, the version and coarse counts, with no X data. You can switch them off in settings.",
      },
      {
        q: "What happens to my data if I uninstall GrowX?",
        a: "The extension's data is stored in Chrome, so uninstalling removes it. Export a backup first if you might come back, and import it after reinstalling.",
      },
    ],
  },
];

/** Every question, flat (for structured data and counts). */
export const allFaqs: FaqItem[] = faqGroups.flatMap((g) => g.items);
