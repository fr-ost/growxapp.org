import { TRIAL_DAYS, getTier, type PaidPlanId } from "@/config/pricing";
import type { FeatureSlug } from "./feature-slugs";

/**
 * Comparison pages (/alternatives/<slug>) for people searching "[tool] alternative".
 *
 * Fairness rules: every claim about another product comes from GrowX copy that already covered it, checked on CHECKED
 * below. Sources: /blog/typefully-vs-tweet-hunter, /blog/twitter-analytics-tools (BlackMagic) and the posts merged into
 * these pages on 27 Nov 2026: hypefury-alternatives into /alternatives/hypefury, and circleboom-alternatives,
 * circleboom-vs-growx and growx-vs-circleboom-cost into /alternatives/circleboom (their old URLs redirect, see
 * redirects.ts). Where that copy does not say, the cell is CHECK_THEIR_SITE ("Check") with a TODO naming the page to
 * verify it on. No competitor prices, ratings, reviews or user counts. GrowX facts follow docs/PRODUCT_FACTS.md and the
 * prices in src/config/pricing.ts.
 *
 * Inline text supports **bold** and [label](/path) in summary, theyDoWell, growxDiffers, sections and GrowX table cells.
 * The lead, the other tool's table cells, the pick lists and FAQ answers are shown as plain text.
 */

/** When the competitor details on these pages were last checked (the date of the posts they come from). */
export const CHECKED = "2026-11-07";

/** When GrowX's own prices in the tables were checked against src/config/pricing.ts. */
export const GROWX_PRICES_CHECKED = "2026-11-27";

/** Table text for a detail about the other tool that our own copy does not confirm. Shown muted; never a guess. */
export const CHECK_THEIR_SITE = "Check";

export type AlternativeSlug = "tweet-hunter" | "hypefury" | "typefully" | "circleboom";

export interface ComparisonRow {
  label: string;
  them: string;
  growx: string;
}

export interface AlternativePage {
  slug: AlternativeSlug;
  /** The other product. */
  name: string;
  /** Its own site, for "check their site". */
  site: string;
  /** Its own pricing page, linked next to the table (nofollow). The homepage, with a TODO, where the path is not confirmed. */
  pricingUrl: string;
  /**
   * The day someone read their pricing page and filled in the Free plan and Starting price rows (YYYY-MM-DD).
   * Empty until then: the page then says only when GrowX's own prices were checked, never that theirs were.
   */
  theirPricesChecked: string;
  /** <title>, at most 60 characters with the brand suffix. */
  seoTitle: string;
  /** Meta description, 140-155 characters (scripts/seo-check.mjs wants 140-160, tests/seo.test.ts at most 155). */
  description: string;
  h1: string;
  /** First paragraph under the H1: a 40-70 word direct answer to "What is the best <name> alternative?". Plain text. */
  lead: string;
  /** One line for cards on the hub. */
  blurb: string;
  keywords: string[];
  /** The short answer, 2-3 paragraphs. */
  summary: string[];
  theyDoWell: string[];
  growxDiffers: string[];
  /**
   * Every table starts with the same eight rows, in this order: Free plan, Starting price, Platform, Auto follow,
   * Scheduler, AI writing, Analytics, Unfollower tracking. A few extra rows may follow.
   */
  table: ComparisonRow[];
  /** "When to choose <name> instead": an honest list. */
  pickThem: string[];
  pickGrowx: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[]; steps?: string[] }[];
  faq: { q: string; a: string }[];
  /** Guides that cover the same comparison in more depth. */
  relatedPosts: string[];
  relatedFeatures: FeatureSlug[];
}

/** "$1.99 for 30 days" style text for a paid plan, straight from the pricing config. */
const tier = (id: PaidPlanId) => {
  const t = getTier(id);
  return id === "PRO_LIFETIME" ? t.priceLabel : `${t.priceLabel} ${t.cadence}`;
};

/** GrowX's side of the table, the same on every comparison (docs/PRODUCT_FACTS.md, prices as in src/config/pricing.ts). */
const GROWX = {
  free: "Yes, free forever: auto follow at the Slow pace (about 100 a day), up to 10 scheduled posts, analytics for your latest 30 posts, who followed back and 7 days of follower history",
  price: `$0 on the free plan. Premium is ${tier("PRO_MONTHLY")}, ${tier("PRO_YEARLY")} or ${tier("PRO_LIFETIME")} lifetime. Every Premium feature can be tried free for ${TRIAL_DAYS} days, no card`,
  platform: "Chrome extension for desktop Chrome 116 or newer (Windows, macOS, Linux, ChromeOS). X only, not a phone app",
  follow: "Smart auto follow: newest followers of niche accounts first, a 1-99 follow-back score, a human pace with caps. The Slow pace is free",
  schedule: "Posts and threads (up to 25 parts, 4 images per post), queue slots, calendar, best time to post. Up to 10 waiting on the free plan, unlimited on Premium",
  ai: "GrowX AI (Premium) writes posts, threads and replies on your computer with Chrome's built-in model. No API key; drafts are not sent to GrowX",
  analytics: "Views, likes, reposts, replies, bookmarks and engagement rate, plus who followed back. Latest 30 posts free, full analytics on Premium",
  unfollowers: "Daily follower tracker: 7 days free, full history and one-click unfollow back on Premium",
  connect: "Works in the x.com tab you are already signed in to. Never asks for your X password; no X OAuth",
  offline: "No. Chrome must be running at the scheduled time; a post more than 6 hours late waits as missed",
  billing: "Prepaid in crypto. Nothing renews by itself; when Premium ends you are back on the free plan",
};

const sharedDiffers = [
  "**No X password, no X OAuth.** GrowX works inside the x.com tab you are already signed in to, and your queue, history and analytics stay in your browser.",
  "**AI on your computer.** GrowX AI (Premium) uses the AI model built into Chrome, so drafts are not sent to GrowX and there is no API key or per-use fee.",
  "**Growth, not only publishing.** [Smart auto follow](/features/twitter-auto-follow) follows the newest followers of accounts in your niche, scored 1-99 for follow-back, at a human pace with breaks and caps. The AI Reply Assistant, an unfollower tracker and cleanup sit next to the scheduler.",
  "**Prepaid pricing.** A free plan forever, then Premium for 30 days, 365 days or lifetime, prepaid in crypto. Nothing renews by itself.",
];

export const alternativePages: AlternativePage[] = [
  {
    slug: "tweet-hunter",
    name: "Tweet Hunter",
    site: "tweethunter.io",
    pricingUrl: "https://tweethunter.io/pricing",
    theirPricesChecked: "", // TODO: set after checking their pricing page and filling the price rows
    seoTitle: "Tweet Hunter Alternative for X: GrowX Compared",
    description:
      "Looking for a Tweet Hunter alternative? Compare GrowX on scheduling, AI, growth and price, see what each does well and who should pick which. Try it free.",
    h1: "A Tweet Hunter alternative built for growing on X",
    lead:
      "For growing on X (Twitter), the best Tweet Hunter alternative is GrowX. It is a Chrome extension with a post scheduler and an on-device AI writer, plus the growth work around them: it follows the right people, helps you reply early and tracks who unfollowed you. It has a free plan forever. Tweet Hunter still fits better if you want a big library of popular posts.",
    blurb: "An X content suite with an inspiration library, compared with a growth extension.",
    keywords: ["Tweet Hunter alternative", "Tweet Hunter alternatives", "Tweet Hunter vs GrowX", "Twitter growth tool", "X scheduler", "GrowX"],
    summary: [
      "**Tweet Hunter** is an X content suite. It is known for a large library of popular posts to borrow structures from, AI writing, scheduling and automation, all in a web app that connects to your X account and posts from its servers.",
      "**GrowX** is a Chrome extension for growing on X. It schedules posts and threads, writes with AI on your own computer, and adds what a content suite is not built for: smart auto follow, an AI Reply Assistant, an unfollower tracker and cleanup.",
      "If your main problem is what to write, Tweet Hunter's library is a real strength. If you write fine but too few people see it, GrowX covers more of the daily work that brings new followers.",
    ],
    theyDoWell: [
      "**An inspiration library.** A large collection of popular posts helps when you are stuck for ideas or formats.",
      "**Writing and scheduling in one web app,** with AI writing help (check which plan includes what).",
      "**Posting from their servers,** so scheduled posts go out while your computer is off.",
    ],
    growxDiffers: sharedDiffers,
    table: [
      { label: "Free plan", them: CHECK_THEIR_SITE, growx: GROWX.free }, // TODO: verify on https://tweethunter.io/pricing
      { label: "Starting price", them: CHECK_THEIR_SITE, growx: GROWX.price }, // TODO: verify on https://tweethunter.io/pricing
      { label: "Platform", them: "Web app: an X content suite", growx: GROWX.platform },
      { label: "Auto follow", them: CHECK_THEIR_SITE, growx: GROWX.follow }, // TODO: verify on https://tweethunter.io/pricing
      { label: "Scheduler", them: "Yes, posts and threads", growx: GROWX.schedule },
      { label: "AI writing", them: "Yes; check which plan includes it", growx: GROWX.ai },
      { label: "Analytics", them: "Yes, post performance", growx: GROWX.analytics },
      { label: "Unfollower tracking", them: CHECK_THEIR_SITE, growx: GROWX.unfollowers }, // TODO: verify on https://tweethunter.io/pricing
      { label: "Inspiration library of popular posts", them: "Yes, its best-known feature", growx: "No. 52 templates and an AI writer that works from your niche and voice" },
      { label: "How it reaches X", them: "Connects to your X account", growx: GROWX.connect },
      { label: "Posts while your computer is off", them: "Yes, from their servers", growx: GROWX.offline },
      { label: "Billing", them: "Subscription plans", growx: GROWX.billing },
    ],
    pickThem: [
      "You want a big library of popular posts to borrow ideas and structures from.",
      "Your scheduled posts must go out while your computer is off.",
      "You prefer a web app to a browser extension, or you don't use desktop Chrome.",
      "You want writing, scheduling and automation in one X content suite, and reach is not your main problem.",
    ],
    pickGrowx: [
      "Reach is your problem: you want to follow the right people, reply early and see who unfollows.",
      "You would rather keep drafts on your computer and never hand over your X password.",
      "You want to pay once for a period you choose, with no subscription renewing in the background.",
      "You work on X from desktop Chrome most days anyway.",
    ],
    sections: [
      {
        heading: "Writing: a library versus your own voice",
        paragraphs: [
          "Tweet Hunter's best-known feature is its library of popular posts. Seeing what already worked is a fast way to learn hooks and formats, and many people use it exactly that way.",
          "GrowX approaches writing from your side instead. It has 52 fill-in templates for hooks, threads, lists and stories, a thread splitter, and **GrowX AI** (Premium), which writes, improves, finds hooks, turns notes into threads and suggests replies using your niche and voice settings. It never invents facts; where a number or name is needed it leaves a {placeholder} for you to fill. See the [GrowX AI writer](/features/ai-tweet-writer).",
        ],
      },
      {
        heading: "Growth: the part a content suite leaves out",
        paragraphs: [
          "Good posts still need people to see them. On a small or medium account, most new followers come from the people you follow, the replies you write and the times you post. That daily work is GrowX's core.",
          "Smart auto follow reads the newest followers of accounts in your niche every hour, follows the most recent ones first and ranks everyone else by a follow-back score from 1 to 99. The Slow pace (about 100 follows a day) is free forever, with Balanced, Turbo and X Premium in Premium; random delays, breaks, hourly and daily caps and an automatic slow-down after any X warning are always on, and active hours and warm-up are there when you want them. The [AI Reply Assistant](/features/twitter-reply-targets) lists fresh posts from your sources and VIPs so you can reply while it still counts (with Premium, GrowX AI drafts replies you approve), and [Cleanup](/features/twitter-unfollow-tool) finds accounts that don't follow back.",
        ],
        bullets: ["No tool can promise zero risk on X. Start with the free Slow pace and let GrowX slow down by itself when X shows a warning."],
      },
      {
        heading: "Scheduling: servers versus your own Chrome",
        paragraphs: [
          "Tweet Hunter posts from its servers, so a post scheduled for 3 a.m. goes out even with your laptop closed. GrowX posts through your signed-in x.com tab, which keeps your X login on your computer but means Chrome has to be running at the scheduled time.",
          "GrowX makes up for it with posting safety and planning: queue slots (09:00, 13:00 and 18:30 by default), a best time to post heat map built from your own posts, a calendar, drafts, a daily cap (20 by default), a 5-minute minimum gap and a pause on any X warning. The free plan keeps up to 10 posts waiting; Premium removes the limit. See the [X post scheduler](/features/twitter-post-scheduler).",
        ],
      },
      {
        heading: "Switching from Tweet Hunter to GrowX",
        paragraphs: ["You don't have to switch everything at once. A simple order that keeps your posting steady:"],
        steps: [
          "Install GrowX from the Chrome Web Store, open x.com in the same Chrome profile and finish the setup wizard.",
          "Recreate your posting times as queue slots in **AI Creator Studio**, then move your next week of drafts across.",
          "Add three to five source accounts in your niche, or press **Find sources for me**, and start on the free Slow pace.",
          "After two weeks, read [Analytics](/features/twitter-analytics): who followed back, which topics and formats worked, and your best time to post.",
          "Try every Premium feature free for 30 days, no credit card, before deciding whether you need it.",
        ],
      },
      {
        heading: "Using both together",
        paragraphs: [
          "Plenty of people keep a writing tool and add GrowX for growth. That works fine, with one rule: let only one tool post any given post, so nothing goes out twice. A common split is drafting and inspiration in one place, and following, replying, analytics and cleanup in GrowX.",
        ],
      },
    ],
    faq: [
      {
        q: "Is GrowX a full Tweet Hunter replacement?",
        a: "For scheduling, AI writing and analytics on X, yes. GrowX does not have a library of other people's popular posts; it has 52 templates and an AI writer that works from your own niche instead. It adds smart auto follow, an AI Reply Assistant, an unfollower tracker and cleanup.",
      },
      {
        q: "Is there a free alternative to Tweet Hunter?",
        a: "GrowX has a free plan forever with auto follow at the Slow pace, the scheduler with up to 10 posts waiting, analytics for your latest 30 posts, who followed back and 52 templates. Every Premium feature can be tried free for 30 days, no credit card.",
      },
      {
        q: "Does GrowX need my X password?",
        a: "No. GrowX works through the x.com session already signed in to your Chrome. It never asks for or stores your X password and does not use X OAuth.",
      },
      {
        q: "Does GrowX post when my computer is off?",
        a: "No. GrowX posts through your signed-in x.com tab in Chrome, so Chrome must be running. A post more than 6 hours late is never posted by itself and waits for you as missed.",
      },
    ],
    relatedPosts: ["typefully-vs-tweet-hunter", "best-twitter-growth-tools", "how-to-schedule-tweets"],
    relatedFeatures: ["twitter-auto-follow", "ai-tweet-writer", "twitter-post-scheduler"],
  },
  {
    slug: "hypefury",
    name: "Hypefury",
    site: "hypefury.com",
    pricingUrl: "https://hypefury.com/pricing",
    theirPricesChecked: "", // TODO: set after checking their pricing page and filling the price rows
    seoTitle: "Hypefury Alternative for X (Twitter): GrowX",
    description:
      "Hypefury no longer supports X. See how GrowX covers its X jobs (queue, evergreen posts, auto-plug) and adds growth tools, with a fair comparison table.",
    h1: "A Hypefury alternative for X, with growth built in",
    lead:
      "For X (Twitter), the best Hypefury alternative is GrowX. Hypefury's pricing page says it no longer supports X. GrowX is a Chrome extension that covers its X jobs: a posting queue, evergreen recycling and auto-plug (the last two on Premium). It also adds smart auto follow, analytics and an unfollower tracker, with a free plan forever.",
    blurb: "Hypefury left X. Where your queue, evergreen posts and auto-plugs can go.",
    keywords: ["Hypefury alternative", "Hypefury alternatives", "Hypefury for X", "Hypefury replacement", "evergreen tweets", "auto plug Twitter", "GrowX"],
    summary: [
      "For years **Hypefury** was a favourite of X creators: it scheduled posts and threads, re-shared your best posts on an evergreen loop and added an auto-plug, a reply with your offer, under posts that took off.",
      "In 2026 that changed. Hypefury's pricing page now says it no longer supports X, and the networks it lists are Bluesky, Threads, LinkedIn, Instagram and TikTok. The change was noticed in mid-2026, but Hypefury has not published a single cutoff date, so check its site for its current position.",
      "If your X routine was built on Hypefury, you need a new home for three jobs: your **posting queue**, your **evergreen posts** and your **auto-plugs**. **GrowX** covers all three (evergreen recycling and auto-plug are on Premium) and adds the growth side Hypefury never had.",
    ],
    theyDoWell: [
      "**Evergreen posting and auto-plugs** made it a favourite of X creators for years.",
      "**Scheduling posts and threads,** with a queue many people built their whole routine around.",
      "**Several networks.** Its pricing page lists Bluesky, Threads, LinkedIn, Instagram and TikTok, so it can still fit if you post there.",
    ],
    growxDiffers: sharedDiffers,
    table: [
      { label: "Free plan", them: CHECK_THEIR_SITE, growx: GROWX.free }, // TODO: verify on https://hypefury.com/pricing
      { label: "Starting price", them: CHECK_THEIR_SITE, growx: GROWX.price }, // TODO: verify on https://hypefury.com/pricing
      { label: "Platform", them: "A scheduling tool for Bluesky, Threads, LinkedIn, Instagram and TikTok", growx: GROWX.platform },
      { label: "Auto follow", them: CHECK_THEIR_SITE, growx: GROWX.follow }, // TODO: verify on https://hypefury.com/pricing
      { label: "Scheduler", them: "Yes, for the networks it supports; not X", growx: GROWX.schedule },
      { label: "AI writing", them: CHECK_THEIR_SITE, growx: GROWX.ai }, // TODO: verify on https://hypefury.com/pricing
      { label: "Analytics", them: "Not for X. BlackMagic, an X analytics tool owned by Hypefury, shut down in July 2026", growx: GROWX.analytics },
      { label: "Unfollower tracking", them: CHECK_THEIR_SITE, growx: GROWX.unfollowers }, // TODO: verify on https://hypefury.com/pricing
      { label: "Supports X today", them: "No, per its pricing page", growx: "Yes, X only" },
      { label: "Evergreen recycling", them: "Known for it on X before; check their site for other networks", growx: "Premium: best posts again every N days (30 by default) with rotating variants, or reposted" },
      { label: "Auto-plug", them: "Known for it on X before; check their site for other networks", growx: "Premium: a reply with your call to action once a post takes off (50 likes by default)" },
    ],
    pickThem: [
      "You have moved to Bluesky, Threads, LinkedIn, Instagram or TikTok and X is no longer your main network.",
      "You want one scheduler for those networks rather than a tool built only for X.",
      "You already use Hypefury on those networks. Keep it there and use a separate tool, such as GrowX, for X.",
    ],
    pickGrowx: [
      "X is still where your audience is and you need a home for your queue, evergreen posts and auto-plugs.",
      "You also want to grow: follow the right people, reply early and see who unfollows.",
      "You prefer prepaid plans that never renew by themselves.",
    ],
    sections: [
      {
        heading: "What a Hypefury alternative for X needs",
        paragraphs: ["Before you move a routine you have used for years, check that the new tool covers each part of it:"],
        bullets: [
          "**A queue with time slots,** so new posts drop into the next free slot instead of needing a date each time.",
          "**Threads and images,** with character counting that matches X, including links counted as 23 characters.",
          "**Evergreen recycling** with variants, so followers don't see the exact same text again.",
          "**Auto-plug:** a reply with your call to action once a post passes a number of likes.",
          "**Analytics** that show which posts worked, so you know what deserves an evergreen slot.",
          "**Safety:** a daily posting cap, a minimum gap between posts and a pause when X shows a warning.",
        ],
      },
      {
        heading: "How GrowX covers Hypefury's X jobs",
        paragraphs: [
          "The GrowX composer writes posts and threads up to 25 parts with up to 4 images, counts characters the way X does, and posts now, at a time you pick or into queue slots (09:00, 13:00 and 18:30 by default). The free plan keeps up to 10 posts waiting; Premium removes the limit and adds **evergreen recycling** and **auto-plug**.",
          "Around the queue you get a **best time to post** from your own posts, a calendar, drafts and 52 templates. **GrowX AI** (Premium) writes, improves and threads posts on your own computer, with no API key.",
          "Posting has its own safety rules: a daily cap (20 by default), a 5-minute minimum gap and a pause on any warning from X. One honest limit: GrowX posts from your own Chrome, so the computer has to be on with Chrome open at the scheduled time. A post that would go out more than 6 hours late is never posted by itself; it waits as missed. See the [X post scheduler](/features/twitter-post-scheduler).",
        ],
      },
      {
        heading: "Growth: the part Hypefury never had",
        paragraphs: ["A queue keeps you posting, but it does not bring new people to your posts. GrowX adds the growth tools a scheduler leaves out:"],
        bullets: [
          "[Smart auto follow](/features/twitter-auto-follow) follows the newest followers of accounts in your niche and ranks everyone else by a follow-back score from 1 to 99, at a human pace with breaks and caps. The Slow pace (about 100 a day) is free.",
          "The [AI Reply Assistant](/features/twitter-reply-targets) lists fresh posts from your sources and VIPs, so you can reply early. You read and approve every reply.",
          "The [unfollower tracker](/features/twitter-unfollower-tracker) shows who followed and who unfollowed you each day.",
          "[Cleanup](/features/twitter-unfollow-tool) finds accounts that don't follow back or have gone inactive, and unfollows them at a safe pace.",
          "No tool can promise zero risk on X. Start on the free Slow pace; GrowX slows down by itself after any warning from X.",
        ],
      },
      {
        heading: "Pick the right posts for evergreen",
        paragraphs: ["Evergreen recycling only pays off when the posts deserve a second life. Prune before you move a big library:"],
        bullets: [
          "**Pick posts that aged well:** how-tos, frameworks, lists and lessons. Drop news, dates and replies to a moment.",
          "**Use your numbers.** Keep posts that beat your usual engagement rate and drop the rest. The free [engagement rate calculator](/tools/twitter-engagement-rate-calculator) compares them fairly, and [GrowX analytics](/features/twitter-analytics) shows which topics and formats work.",
          "**Write variants.** Two or three openings for the same idea keep regular followers from seeing the exact same text again.",
          "**Leave a long gap.** A month or more between repeats is a sensible start, so new followers see the post and older ones have forgotten it.",
          "**Retire tired posts.** If a recycled post does much worse than the first time, take it out of the loop.",
        ],
      },
      {
        heading: "If your X analytics went too",
        paragraphs: [
          "X tools come and go. In July 2026 **BlackMagic**, an X analytics tool owned by Hypefury, shut down as well. Before you move, write down your baseline (followers, typical views and engagement rate, best topics) and list the jobs the old tools did for you.",
          "GrowX Analytics covers post stats, best times, follow-backs and unfollower tracking, and keeps your numbers in Chrome's storage on your computer. Our guide to [Twitter analytics tools](/blog/twitter-analytics-tools) has the full checklist for moving.",
        ],
      },
      {
        heading: "Other Hypefury alternatives, by job",
        paragraphs: ["No single tool fits everyone. These are well-known options and the job each one is mainly used for. Check each vendor's site for current features and prices; they change often."],
        bullets: [
          "**Typefully:** a writing and scheduling app built around threads, good if drafting is the part you care most about. See [Typefully vs GrowX](/alternatives/typefully).",
          "**Tweet Hunter:** an X writing and scheduling suite known for its library of popular posts and its automation features. See [Tweet Hunter vs GrowX](/alternatives/tweet-hunter), or all three side by side in [Typefully vs Tweet Hunter vs GrowX](/blog/typefully-vs-tweet-hunter).",
          "**Buffer:** a calendar for many networks with a free plan, fine if X is one channel among several.",
          "**X's own composer:** it can schedule single posts, which is enough for occasional use.",
        ],
      },
      {
        heading: "Moving your Hypefury routine to GrowX",
        paragraphs: ["A move that keeps your posting steady:"],
        steps: [
          "Install GrowX, open x.com in the same Chrome profile and finish the setup wizard.",
          "Set your queue slots in **AI Creator Studio** to the times you used in Hypefury.",
          "Copy your best evergreen posts across. After a few weeks, use [analytics](/features/twitter-analytics) to pick which ones deserve evergreen slots.",
          "Turn on evergreen recycling and auto-plug in the free 30-day Premium trial, and set the like threshold that suits your account.",
          "Queue a week of posts, then add growth: a few source accounts in your niche on the free Slow pace.",
        ],
      },
    ],
    faq: [
      {
        q: "Does Hypefury still work with X?",
        a: "Hypefury's pricing page says it no longer supports X and lists Bluesky, Threads, LinkedIn, Instagram and TikTok instead. Check hypefury.com for its current position.",
      },
      {
        q: "What is the best Hypefury alternative for X?",
        a: "If you used Hypefury for a queue, evergreen posts and auto-plugs on X, GrowX covers all three (evergreen and auto-plug are Premium) and adds auto follow, analytics, an unfollower tracker and an on-device AI writer.",
      },
      {
        q: "Does GrowX have evergreen posts and auto-plug like Hypefury?",
        a: "Yes, both are part of Premium. Evergreen recycling posts your best posts again every N days (30 by default) with rotating variants, and auto-plug replies with your call to action once a post takes off (50 likes by default).",
      },
      {
        q: "Is there a free Hypefury alternative for X?",
        a: "GrowX has a free plan forever with the scheduler (up to 10 posts waiting), best time to post, 52 templates and analytics for your latest 30 posts. Evergreen recycling and auto-plug are Premium, which you can try free for 30 days.",
      },
      {
        q: "Does GrowX post when my computer is off?",
        a: "No. GrowX posts through your signed-in x.com tab in Chrome, so Chrome must be running. A post more than 6 hours late is never posted by itself and waits for you as missed.",
      },
    ],
    relatedPosts: ["how-to-schedule-tweets", "typefully-vs-tweet-hunter", "twitter-analytics-tools"],
    relatedFeatures: ["twitter-post-scheduler", "twitter-analytics", "twitter-auto-follow"],
  },
  {
    slug: "typefully",
    name: "Typefully",
    site: "typefully.com",
    pricingUrl: "https://typefully.com/pricing",
    theirPricesChecked: "", // TODO: set after checking their pricing page and filling the price rows
    seoTitle: "Typefully Alternative for X Growth: GrowX Compared",
    description:
      "A Typefully alternative for growing on X: compare GrowX on writing, scheduling, on-device AI, growth tools and prepaid pricing. See who should pick which.",
    h1: "A Typefully alternative for when you need reach, not only a better editor",
    lead:
      "For growing on X (Twitter), the best Typefully alternative is GrowX. It is a Chrome extension for X with a composer, queue slots and an on-device AI writer, plus growth tools: smart auto follow, an AI Reply Assistant and an unfollower tracker. It has a free plan forever. Typefully still fits better if you mainly care about the editor or post to several networks.",
    blurb: "A writing-first editor for several networks, compared with an X growth extension.",
    keywords: ["Typefully alternative", "Typefully alternatives", "Typefully vs GrowX", "thread writer", "X scheduler", "GrowX"],
    summary: [
      "**Typefully** is a writing and scheduling app. Its strength is a calm editor built around threads and long posts, with drafts, scheduling and support for several networks besides X. It is a web app that posts from its servers.",
      "**GrowX** is a Chrome extension built only for X. It has a composer with threads, queue slots and a best time to post, an AI writer that runs on your computer, and growth tools a writing app is not built for: smart auto follow, an AI Reply Assistant, an unfollower tracker and cleanup.",
      "If drafting is the job you want to enjoy, Typefully is a good home for it. If your posts are fine but your audience isn't growing, GrowX covers the work around them.",
    ],
    theyDoWell: [
      "**A writing-first editor** for posts and threads, popular with writers who care about drafting itself.",
      "**Several networks,** so one draft can go to X and other networks.",
      "**Server-side posting,** so scheduled posts go out while your computer is off.",
    ],
    growxDiffers: sharedDiffers,
    table: [
      { label: "Free plan", them: CHECK_THEIR_SITE, growx: GROWX.free }, // TODO: verify on https://typefully.com/pricing
      { label: "Starting price", them: CHECK_THEIR_SITE, growx: GROWX.price }, // TODO: verify on https://typefully.com/pricing
      { label: "Platform", them: "Web app for writing and scheduling, for X and several other networks", growx: GROWX.platform },
      { label: "Auto follow", them: CHECK_THEIR_SITE, growx: GROWX.follow }, // TODO: verify on https://typefully.com/pricing
      { label: "Scheduler", them: "Yes, its core: posts and threads", growx: GROWX.schedule },
      { label: "AI writing", them: "Yes; check which plan includes it", growx: GROWX.ai },
      { label: "Analytics", them: "Yes, post performance", growx: GROWX.analytics },
      { label: "Unfollower tracking", them: CHECK_THEIR_SITE, growx: GROWX.unfollowers }, // TODO: verify on https://typefully.com/pricing
      { label: "How it reaches X", them: "Connects to your X account", growx: GROWX.connect },
      { label: "Posts while your computer is off", them: "Yes, from their servers", growx: GROWX.offline },
      { label: "Billing", them: "Subscription plans", growx: GROWX.billing },
    ],
    pickThem: [
      "Writing is the part you want to get better at, and you care about the editor itself.",
      "You publish the same ideas to X and other networks.",
      "Scheduled posts must go out while your computer is off.",
      "You prefer a web app to a browser extension, or you don't use desktop Chrome.",
    ],
    pickGrowx: [
      "X is your main network and you want more of the right people to see your posts.",
      "You want AI help that runs on your own computer, without an API key.",
      "You want follow, reply, analytics and cleanup tools next to your scheduler.",
      "You prefer prepaid plans that never renew by themselves.",
    ],
    sections: [
      {
        heading: "Writing: an editor versus a composer with growth around it",
        paragraphs: [
          "Typefully is built for the act of writing: a focused editor for threads and long posts, drafts you come back to, and scheduling. People who draft a lot like it for exactly that reason.",
          "GrowX's composer is practical rather than minimal: X's own character counting (links count as 23), threads up to 25 parts, up to 4 images per post, drafts, 52 templates, your own templates and a thread splitter. **GrowX AI** (Premium) writes, improves, finds hooks and turns notes into threads on your own computer, and never invents facts. See the [GrowX AI writer](/features/ai-tweet-writer).",
        ],
      },
      {
        heading: "Growth: what happens after you post",
        paragraphs: [
          "A well-written thread still needs readers. GrowX's [smart auto follow](/features/twitter-auto-follow) follows the newest followers of accounts in your niche, the people most likely to be interested, and scores everyone else 1-99 for follow-back. It runs at a human pace with random delays, breaks and hourly and daily caps, and slows down by itself after any X warning.",
          "Around that sit the [AI Reply Assistant](/features/twitter-reply-targets) for replying early to fresh posts, an [unfollower tracker](/features/twitter-unfollower-tracker) that shows who followed and unfollowed you each day, and Cleanup for accounts that don't follow back. No tool can promise zero risk on X; start with the free Slow pace.",
        ],
      },
      {
        heading: "Scheduling and when posts go out",
        paragraphs: [
          "Typefully posts from its servers, so your computer can be off. GrowX posts through your signed-in x.com tab, so Chrome has to be running at the scheduled time; a post more than 6 hours late is never posted by itself and waits as missed.",
          "In return your X login never leaves your computer, and GrowX plans your week from your own numbers: queue slots, a best time to post heat map from your posts and your followers' activity, a calendar, a daily cap and a minimum gap between posts. See the [X post scheduler](/features/twitter-post-scheduler).",
        ],
      },
      {
        heading: "Trying GrowX next to Typefully",
        paragraphs: ["You can keep Typefully for writing and add GrowX for growth. Just let only one tool post any given post."],
        steps: [
          "Install GrowX from the Chrome Web Store and finish the setup wizard in the Chrome profile you use for x.com.",
          "Add three to five source accounts in your niche, or press **Find sources for me**, and start the free Slow pace.",
          "Open the AI Reply Assistant once or twice a day and reply early to fresh posts in your niche.",
          "After two weeks, read your analytics and the follower tracker to see what brought people in.",
        ],
      },
    ],
    faq: [
      {
        q: "Is GrowX a good Typefully alternative?",
        a: "If you post only to X and want to grow, yes: it schedules posts and threads, writes with on-device AI and adds smart auto follow, an AI Reply Assistant, analytics and an unfollower tracker. If you publish to several networks or mainly want a writing editor, Typefully may suit you better.",
      },
      {
        q: "Can I use GrowX together with Typefully?",
        a: "Yes. Just let only one tool post a given post, so nothing goes out twice.",
      },
      {
        q: "Does GrowX AI send my drafts anywhere?",
        a: "No. GrowX AI uses the AI model built into Chrome on your own computer. Your drafts are not sent to GrowX and there is no API key. When the model isn't available, the AI buttons fall back to templates.",
      },
      {
        q: "Does GrowX post when my computer is off?",
        a: "No. GrowX posts through your signed-in x.com tab in Chrome, so Chrome must be running. A post more than 6 hours late is never posted by itself and waits for you as missed.",
      },
    ],
    relatedPosts: ["typefully-vs-tweet-hunter", "how-to-write-a-twitter-thread", "best-twitter-growth-tools"],
    relatedFeatures: ["ai-tweet-writer", "twitter-auto-follow", "twitter-post-scheduler"],
  },
  {
    slug: "circleboom",
    name: "Circleboom",
    site: "circleboom.com",
    // TODO: confirm the exact pricing page path on circleboom.com; the merged posts only said "see circleboom.com".
    pricingUrl: "https://circleboom.com",
    theirPricesChecked: "", // TODO: set after checking their pricing page and filling the price rows
    seoTitle: "Circleboom Alternative for X (Twitter): GrowX Compared",
    description:
      "Need a Circleboom alternative? Compare GrowX on auto follow, cleanup, scheduling, analytics and price, and see when Circleboom fits better. Try it free.",
    h1: "A Circleboom alternative that grows your X account, not only manages it",
    lead:
      "For growing an X (Twitter) account, the best Circleboom alternative is GrowX. It is a Chrome extension that follows the right people for you, cleans up accounts that don't follow back, schedules posts, writes with on-device AI and tracks who unfollowed you. It has a free plan forever. Circleboom still fits better if you work from a phone or manage clients as a team.",
    blurb: "An X account manager for cleanup and audience analysis, compared with a growth extension.",
    keywords: [
      "Circleboom alternative",
      "Circleboom alternatives",
      "apps like Circleboom",
      "Circleboom replacement",
      "Circleboom vs GrowX",
      "Circleboom pricing",
      "Twitter unfollow tool",
      "GrowX",
    ],
    summary: [
      "**Circleboom** is one of the best-known tools for managing an X (Twitter) account. Its X product is a web app that connects to your account. It helps you search and filter your followers and the accounts you follow, find accounts that don't follow back or look inactive, unfollow them in bulk, see audience analytics and delete old posts. Scheduling is a separate product, Circleboom Publish, which covers several social networks.",
      "**GrowX** is a Chrome extension built around **growing** an X account. Smart auto follow, a post scheduler, an on-device AI writer, analytics, an unfollower tracker, an AI Reply Assistant and cleanup sit in one dashboard and one plan, with a free plan forever.",
      "Choose GrowX if you want growth and daily X work in one inexpensive tool on your desktop. Choose Circleboom if you need to work from any device, publish to several networks or manage client accounts as a team.",
    ],
    theyDoWell: [
      "**Cleanup, its best-known feature.** It finds accounts that don't follow back or look fake, inactive or spammy, and unfollows them in bulk. It can also delete old posts.",
      "**Audience search and analytics.** You can find accounts by keywords, location and other criteria, and see breakdowns of your followers and the accounts you follow.",
      "**Any device.** It is a web app that works in any browser, including on a phone, and it posts from its servers, so your computer can be off.",
      "**Several networks and teams.** Circleboom Publish schedules for networks such as Facebook, Instagram and LinkedIn, and Circleboom suits agencies that manage client accounts as a team.",
    ],
    growxDiffers: [
      "**Growth, not only management.** [Smart auto follow](/features/twitter-auto-follow) follows the newest followers of accounts in your niche, scored 1-99 for follow-back, at a human pace with breaks and caps. Cleanup alone does not bring new followers.",
      "**One plan for all of X.** Auto follow, cleanup, the scheduler, GrowX AI, analytics, the unfollower tracker and the AI Reply Assistant are in the same plan. There is no separate scheduling product to add.",
      "**No X password, no X app connection.** GrowX works inside the x.com tab you are already signed in to, and your queue, history and analytics stay in your browser.",
      "**AI on your computer.** GrowX AI (Premium) uses the AI model built into Chrome, so drafts are not sent to GrowX and there is no API key or per-use fee.",
      "**Prepaid pricing.** A free plan forever, then Premium for 30 days, 365 days or lifetime, prepaid in crypto. Nothing renews by itself.",
    ],
    table: [
      { label: "Free plan", them: CHECK_THEIR_SITE, growx: GROWX.free }, // TODO: verify on Circleboom's pricing page (exact path not confirmed, see pricingUrl)
      { label: "Starting price", them: CHECK_THEIR_SITE, growx: GROWX.price }, // TODO: verify on Circleboom's pricing page (exact path not confirmed, see pricingUrl)
      { label: "Platform", them: "Web app that works in any browser, including on a phone", growx: GROWX.platform },
      {
        label: "Auto follow",
        them: "Search and filters to find accounts by keywords, location and more; the following itself is largely up to you",
        growx: GROWX.follow,
      },
      { label: "Scheduler", them: "In Circleboom Publish, a separate product for several networks", growx: GROWX.schedule },
      { label: "AI writing", them: "AI help in its products; check which plan includes it", growx: GROWX.ai },
      {
        label: "Analytics",
        them: "Audience analytics (breakdowns of your followers and the accounts you follow) and tools to look at your posts",
        growx: GROWX.analytics,
      },
      { label: "Unfollower tracking", them: CHECK_THEIR_SITE, growx: GROWX.unfollowers }, // TODO: verify on Circleboom's pricing page (exact path not confirmed, see pricingUrl)
      {
        label: "Unfollow non-followers and inactive accounts",
        them: "Yes, its best-known feature, with filters for accounts that look fake, inactive or spammy, and bulk unfollow",
        growx: "Cleanup: not following back, or no post for 30, 90, 180 or 365 days. Up to 30 an hour and 200 a day, each account re-checked first. 200 per run free, up to 5,000 at once on Premium",
      },
      { label: "How it reaches X", them: "Connects to your X account through an app permission (X's official interface for apps)", growx: GROWX.connect },
      { label: "Posts while your computer is off", them: "Yes, from its servers", growx: GROWX.offline },
      { label: "Billing", them: "Subscription plans; the X tool and Publish are priced separately", growx: GROWX.billing },
    ],
    pickThem: [
      "You manage X from a phone or tablet most of the time, or on a computer where you can't install Chrome extensions.",
      "Your scheduled posts must go out while your computer is off.",
      "You need to schedule for several networks, such as Facebook, Instagram or LinkedIn, from one place.",
      "You manage accounts for clients as a team or agency.",
      "You need to pay by card rather than crypto.",
      "You mainly want to search, filter and study your audience, and you prefer to do the following yourself.",
    ],
    pickGrowx: [
      "You want to grow an X account, not only manage it: follow the right people, reply early and see who unfollows.",
      "You want auto follow, cleanup, scheduling, AI writing and analytics in one plan.",
      "You would rather never give a tool your X password or an X app connection.",
      "You work from desktop Chrome most days.",
      "You prefer prepaid plans that never renew by themselves.",
    ],
    sections: [
      {
        heading: "Why people look for a Circleboom alternative",
        paragraphs: ["Circleboom is a solid toolkit for **managing** an account. People usually start looking for an alternative for one of four reasons:"],
        bullets: [
          "**They want growth, not only management.** Cleaning up your following is useful, but it does not bring new followers by itself. Many people want a tool that also finds and follows the right people for them.",
          "**Cost.** Monthly subscriptions add up over a year, and needing both the X tool and a scheduler can mean paying for two products.",
          "**Everything in one place.** Following, scheduling, writing, analytics and cleanup in one dashboard instead of several tabs and logins.",
          "**Privacy and access.** Some people prefer a tool that works inside their own browser to one that connects to their X account through an app permission.",
        ],
      },
      {
        heading: "What to look for in a Circleboom alternative",
        paragraphs: ["Before you compare names, decide which jobs you need done. A good X tool should be clear about each of these:"],
        bullets: [
          "**Growth:** does it help new, relevant people find you, or does it only manage the followers you already have?",
          "**Cleanup:** can it find accounts that don't follow back and inactive accounts, and unfollow them at a safe, human pace?",
          "**Scheduling:** posts and threads, images, a queue and a sense of your best time to post.",
          "**Analytics:** which posts and formats work, and who followed or unfollowed you.",
          "**Safety:** daily and hourly caps, random delays and a stop when X shows a warning. No tool can promise zero risk on X, but a good one is built to behave like a careful person.",
          "**Access and privacy:** what you have to give the tool, and where your data lives.",
          "**Price and billing:** what a full year really costs, and whether the plan renews by itself.",
        ],
      },
      {
        heading: "Growth: finding new followers",
        paragraphs: [
          "This is the biggest difference. GrowX's [smart auto follow](/features/twitter-auto-follow) follows the newest followers of accounts in your niche, because people who just followed a similar account are active and interested in your topic. Everyone else is ranked by a follow-back score from 1 to 99. On Premium, a **smart score** learns from your own follow-backs. A source leaderboard shows which sources bring followers who stay.",
          "It runs at a human pace. The Slow pace (about 100 follows a day) is free forever; Balanced (about 280 a day), Turbo and X Premium are part of Premium. Random delays, breaks and hourly and daily caps are always on.",
          "Circleboom's strength is search and filtering: finding accounts by keywords, location and other criteria in its interface. That is useful for research, but the following itself is largely up to you.",
        ],
        bullets: [
          "Any tool that follows accounts for you carries some risk on X, and no tool can promise zero risk. GrowX is built to behave like a careful person: optional warm-up and active hours, a slow-down after any X warning and an emergency stop (Alt+Shift+S).",
        ],
      },
      {
        heading: "Cleanup: non-followers and inactive accounts",
        paragraphs: [
          "Both tools help you find accounts that don't follow you back and inactive accounts, and unfollow them. This is Circleboom's best-known feature, with filters for accounts that look fake, inactive or spammy.",
          "GrowX's **Cleanup** scans your following and followers for **Not following back** and **Inactive** (latest post older than 30, 90, 180 or 365 days). Accounts with unknown activity are never called inactive. You review, filter and select, and GrowX unfollows at a safe pace, up to 30 an hour and 200 a day, re-checking each account right before it unfollows.",
          "The free plan allows up to 200 per run. Premium adds bulk unfollow of up to 5,000 in one run and **automatic cleanup** of GrowX's own follows that didn't follow back after 2, 5 or 7 days. More in our guide to [unfollowing non-followers](/blog/unfollow-non-followers-twitter).",
        ],
      },
      {
        heading: "Scheduling and writing",
        paragraphs: [
          "Circleboom handles scheduling in **Circleboom Publish**, a separate product that supports several social networks. That is a real advantage if you post beyond X.",
          "GrowX's scheduler is built only for X and is part of the same plan: posts and threads up to 25 parts, up to 4 images, X's own character counting, queue slots, a calendar, drafts, 52 templates and a best time to post heat map from your own posts. Premium adds unlimited scheduling, evergreen recycling and auto-plug. **GrowX AI** (Premium) writes, improves and threads posts with the AI built into Chrome on your own computer, so drafts are not sent to a server. See the [X post scheduler](/features/twitter-post-scheduler).",
          "One practical difference: GrowX posts from your own Chrome, so the computer must be on with Chrome open at the scheduled time. A post that would go out more than 6 hours late is never posted by itself; it waits as missed. Circleboom posts from its servers.",
        ],
      },
      {
        heading: "Analytics and unfollower tracking",
        paragraphs: [
          "Circleboom offers audience analytics, such as breakdowns of your followers and the accounts you follow, plus tools to look at your posts.",
          "GrowX's [analytics](/features/twitter-analytics) focus on what to do next: views, likes, reposts, replies, bookmarks and engagement rate for your recent posts, and which topics and formats work. Premium adds which posts brought followers, follower quality and a weekly report. The [unfollower tracker](/features/twitter-unfollower-tracker) checks once a day who followed and who unfollowed you.",
        ],
      },
      {
        heading: "Access, privacy and where it runs",
        paragraphs: [
          "**Connection.** Circleboom connects to your X account through an app permission and works through X's official interface for apps. GrowX works inside the x.com tab you are already signed in to and never asks for your password.",
          "**Data.** GrowX keeps your settings, queue, history and analytics in your browser's storage, with optional Chrome sync and export. Circleboom, as a web service, stores what it needs on its servers.",
          "**Devices and accounts.** Circleboom works in any browser, including on a phone. GrowX needs desktop Chrome on Windows, macOS, Linux or ChromeOS. GrowX links 2 X usernames free per account, with a workspace per X account on Premium; Circleboom's plans set how many accounts you can manage.",
          "Circleboom is a trademark of its owner. GrowX is an independent product and is not affiliated with or endorsed by Circleboom or X Corp.",
        ],
      },
      {
        heading: "What GrowX costs, in plain numbers",
        paragraphs: [
          "We don't quote Circleboom's prices here, because they change and differ between plans and products. Circleboom sells subscription plans, and its X tool and Publish are priced separately, so take current prices from its own site.",
          "Every GrowX Premium plan is **prepaid and does not renew by itself**. When your days run out, you go back to the free plan, and nothing is charged unless you buy again. Payment is in crypto through NOWPayments. Full details are on the [pricing page](/pricing).",
          "Premium includes everything: the Balanced, Turbo and X Premium paces, the smart score, unlimited scheduling, evergreen recycling, GrowX AI, full analytics with the weekly report, follower quality, bulk unfollow and automatic cleanup.",
        ],
        bullets: [
          "**Free plan, forever:** auto follow at the Slow pace (about 100 a day), the scheduler with up to 10 posts waiting, analytics for your latest 30 posts, 7 days of unfollower history, fresh posts to reply to and cleanup runs of up to 200 accounts.",
          "**30-day Premium trial:** every Premium feature free for 30 days, no credit card, once per account. It starts by itself when a new account is ready.",
          "**Premium, 30 days:** $1.99.",
          "**Premium, 365 days:** $14.99, about $1.25 a month.",
          "**Premium, lifetime:** $59.99 once. An early-bird price of $29.99 applies to the first 100 lifetime buyers while it lasts.",
          "**More X accounts:** every GrowX account links 2 X usernames for free. Extra slots are $0.99 each, one time.",
        ],
      },
      {
        heading: "Where the savings come from",
        paragraphs: ["GrowX's prices are low, but the savings also come from how it is built:"],
        bullets: [
          "**One product instead of several.** Auto follow, cleanup, the scheduler, the AI writer, analytics, the unfollower tracker and the AI Reply Assistant are all in the same plan, so there is nothing to add on.",
          "**No X API costs to pass on.** GrowX works inside your own signed-in x.com tab instead of through an X developer app, so there are no X API fees to cover.",
          "**AI that costs nothing to run.** GrowX AI uses the model built into Chrome on your own computer: no API key and no per-word fees.",
          "**No servers holding your data.** Your queue, history and analytics stay in your browser, which keeps running costs low.",
          "**Prepaid, no auto-renew.** You never pay for months you forgot about.",
          "**A free plan you can stay on.** It never ends, so you can grow on it and buy Premium only when you need a faster pace, unlimited scheduling or AI.",
        ],
      },
      {
        heading: "Three common cases",
        paragraphs: [
          "**The new creator.** You post a few times a week and want your first 1,000 followers. The free plan covers auto follow at the Slow pace, up to 10 queued posts and basic analytics, so the cost can be $0. Add the 30-day trial when you want to try the AI writer and full analytics. See [how to get your first 1,000 followers](/blog/first-1000-followers-on-x).",
          "**The consistent poster.** You post daily and want unlimited scheduling, evergreen posts and the weekly report. Yearly Premium at $14.99 covers all of it, about $1.25 a month.",
          "**The long-term user.** You plan to use X seriously for years. Lifetime Premium is $59.99 once, about the same as four years of the yearly plan, with no renewals after that. The early-bird price of $29.99, while it lasts, equals two years.",
        ],
      },
      {
        heading: "Work out what a year really costs",
        paragraphs: ["Use these steps for Circleboom or any other tool. Write the numbers down; it takes five minutes."],
        steps: [
          "**List the jobs you need:** finding new followers, unfollowing non-followers, scheduling, analytics, AI writing.",
          "**List the products or plans that cover them.** With some vendors, X management and multi-network scheduling are separate products. Circleboom, for example, sells Circleboom Publish separately from its X tool.",
          "**Take the plan that fits how you work,** not the cheapest one on the page. Check the limits that matter to you, such as how many accounts you can unfollow per day or how many posts you can schedule.",
          "**Multiply monthly prices by 12,** or use the yearly price if you will really commit for a year.",
          "**Add the products together,** then add any extra cost per X account if you manage more than one.",
          "**Check the renewal terms:** does the plan renew by itself, and can you get a refund if you forget to cancel?",
        ],
      },
      {
        heading: "Other Circleboom alternatives, by job",
        paragraphs: [
          "No single tool is right for everyone. These are well-known options and the job each one is mainly used for. Most are schedulers: few tools combine audience growth, cleanup, scheduling, analytics and AI writing in one place, which is the gap GrowX was built for. Check each vendor's site for current features and prices.",
        ],
        bullets: [
          "**Buffer:** a scheduler for many social networks with a free plan. A good fit if X is just one of several channels you post to and you mainly need a calendar.",
          "**Typefully:** a writing and scheduling app built around threads and long posts, popular with writers who care about drafting. See [Typefully vs GrowX](/alternatives/typefully).",
          "**Tweet Hunter:** an X content suite known for a large library of popular posts, AI writing, scheduling and automation. See [Tweet Hunter vs GrowX](/alternatives/tweet-hunter).",
          "**Hypefury** was long known for evergreen reposting and auto-plugs on X, but its pricing page now says it no longer supports X. See [Hypefury vs GrowX](/alternatives/hypefury).",
          "**X Pro:** X's own multi-column dashboard (formerly TweetDeck), included with some X Premium tiers. Useful for watching lists and searches and for scheduling from X itself.",
          "**X's built-in tools:** the native composer can schedule posts, and X Premium includes analytics. Fine for occasional use.",
        ],
      },
      {
        heading: "How to switch from Circleboom to GrowX in one week",
        paragraphs: ["A one-week plan that keeps your account steady. If you still need Circleboom Publish for other networks, keep it for those and use GrowX for X."],
        steps: [
          "**Day 1:** install GrowX, open x.com in the same Chrome profile and finish the setup wizard. Write down your current follower and following counts so you can compare later.",
          "**Day 1:** pause any follow or unfollow automation in other tools, so only one tool acts on your account at a time.",
          "**Day 2:** add three to five source accounts in your niche, or press **Find sources for me**, and start auto follow on the free **Slow** pace (or Balanced with Premium for an established account).",
          "**Day 3:** run a **Cleanup** scan and unfollow non-followers in small batches at the safe pace.",
          "**Day 4:** move your scheduled X posts into GrowX's queue and set your queue slots in **AI Creator Studio**.",
          "**Day 5 to 7:** check Analytics (who followed back) and the source leaderboard, and drop weak sources. Use the free 30-day Premium trial, which starts with your account, to try the AI writer, smart score and full analytics.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the best Circleboom alternative?",
        a: "It depends on the job. For growing an X account with auto follow, cleanup, scheduling, analytics and AI writing in one place, GrowX is built for that. For scheduling across many networks, a multi-network scheduler such as Buffer may fit better.",
      },
      {
        q: "Is there a free Circleboom alternative?",
        a: "Yes. GrowX has a free plan forever with auto follow at the Slow pace, up to 10 posts waiting in the queue, analytics for your latest 30 posts, 7 days of unfollower history and cleanup runs of up to 200 accounts. Every Premium feature can also be tried free for 30 days without a card.",
      },
      {
        q: "What is the main difference between Circleboom and GrowX?",
        a: "Circleboom is a web-based account manager focused on audience analysis and cleanup, with scheduling in a separate product. GrowX is a Chrome extension focused on growth, with smart auto follow, scheduling, AI writing, analytics, an unfollower tracker and cleanup in one plan.",
      },
      {
        q: "Can GrowX unfollow people who don't follow me back?",
        a: "Yes. GrowX Cleanup finds accounts that don't follow you back and inactive accounts, and unfollows the ones you select at a safe pace, up to 30 an hour and 200 a day, re-checking each account first. Premium adds bulk unfollow of up to 5,000 in one run.",
      },
      {
        q: "Is GrowX cheaper than Circleboom?",
        a: "Compare a full year for the plans you would really use. GrowX has a free plan forever, and yearly Premium is $14.99 with growth, cleanup, scheduling, analytics and AI in one plan. Circleboom sells subscription plans and prices its X tool and Publish separately, so take its current prices from its own site and follow the steps on this page.",
      },
      {
        q: "How much does GrowX cost, and does it renew?",
        a: "GrowX has a free plan forever. Premium is $1.99 for 30 days, $14.99 for 365 days or $59.99 for lifetime access. Every plan is prepaid and never renews by itself: when it ends you move back to the free plan, and nothing is charged unless you buy again.",
      },
      {
        q: "How do I pay for GrowX?",
        a: "Premium is paid in crypto through NOWPayments. The free plan and the 30-day trial need no payment at all.",
      },
      {
        q: "Does GrowX need my X password?",
        a: "No. GrowX works inside the x.com tab you are already signed in to in Chrome. It never asks for your X password and does not use an X app connection.",
      },
      {
        q: "Does GrowX work on my phone?",
        a: "No. GrowX is an extension for desktop Chrome. If you manage X mainly from a phone, a web-based tool is a better fit.",
      },
      {
        q: "Can I use GrowX and Circleboom together?",
        a: "Yes. They do not depend on each other, and switching itself does nothing to your account. Just run only one tool that follows or unfollows at a time, so your daily activity stays at a careful level, and start GrowX on the free Slow pace.",
      },
    ],
    relatedPosts: ["unfollow-non-followers-twitter", "unfollow-inactive-accounts-twitter", "best-twitter-growth-tools"],
    relatedFeatures: ["twitter-auto-follow", "twitter-unfollow-tool", "twitter-post-scheduler"],
  },
];

export function getAlternative(slug: string): AlternativePage | undefined {
  return alternativePages.find((a) => a.slug === slug);
}
