import type { FeatureSlug } from "./feature-slugs";

/**
 * Comparison pages (/alternatives/<slug>) for people searching "[tool] alternative".
 *
 * Fairness rules: every claim about another product comes from the GrowX posts that already cover it
 * (/blog/hypefury-alternatives and /blog/typefully-vs-tweet-hunter, checked on CHECKED below). Where those posts do not
 * say, the table says "Check their site". No competitor prices, ratings, reviews or user counts. GrowX facts follow
 * docs/PRODUCT_FACTS.md. Inline text supports **bold** and [label](/path).
 */

/** When the competitor details on these pages were last checked (the date of the posts they come from). */
export const CHECKED = "2026-11-07";

export const CHECK_THEIR_SITE = "Check their site";

export type AlternativeSlug = "tweet-hunter" | "hypefury" | "typefully";

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
  /** <title>, at most 60 characters with the brand suffix. */
  seoTitle: string;
  /** Meta description, 120-155 characters. */
  description: string;
  h1: string;
  lead: string;
  /** One line for cards on the hub. */
  blurb: string;
  keywords: string[];
  /** The short answer, 2-3 paragraphs. */
  summary: string[];
  theyDoWell: string[];
  growxDiffers: string[];
  table: ComparisonRow[];
  pickThem: string[];
  pickGrowx: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[]; steps?: string[] }[];
  faq: { q: string; a: string }[];
  /** Guides that cover the same comparison in more depth. */
  relatedPosts: string[];
  relatedFeatures: FeatureSlug[];
}

/** Rows that are the same on every comparison: GrowX's side and the common caveats. */
const GROWX = {
  type: "Chrome extension (desktop Chrome 116 or newer)",
  connect: "Works in the x.com tab you are already signed in to. Never asks for your X password; no X OAuth",
  offline: "No. Chrome must be running at the scheduled time; a post more than 6 hours late waits as missed",
  schedule: "Posts and threads (up to 25 parts, 4 images per post), queue slots, calendar, best time to post",
  ai: "GrowX AI (Premium) writes posts, threads and replies on your computer with Chrome's built-in model; no API key, drafts not sent to GrowX",
  follow: "Smart auto follow: newest followers of niche accounts, a 1-99 follow-back score, human pace with caps",
  analytics: "Views, likes, reposts, replies, bookmarks and engagement rate; latest 30 posts free, full analytics Premium",
  unfollowers: "Daily follower tracker: 7 days free, full history and one-click unfollow back on Premium",
  evergreen: "Evergreen recycling and auto-plug (Premium)",
  networks: "X only",
  price: "Free forever. Premium $1.99 / 30 days, $14.99 / 365 days or $59.99 lifetime; prepaid, no auto-renew, paid in crypto",
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
    seoTitle: "Tweet Hunter Alternative for X: GrowX Compared",
    description:
      "Looking for a Tweet Hunter alternative? Compare GrowX on scheduling, AI, growth and price, see what each does well and who should pick which. Try it free.",
    h1: "A Tweet Hunter alternative built for growing on X",
    lead:
      "Tweet Hunter is an X content suite with a big library of popular posts. GrowX is a Chrome extension that pairs a scheduler and an on-device AI writer with the growth work: following the right people, replying early and tracking who stays.",
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
      { label: "What it is", them: "Web app: an X content suite", growx: GROWX.type },
      { label: "How it reaches X", them: "Connects to your X account", growx: GROWX.connect },
      { label: "Schedule posts and threads", them: "Yes", growx: GROWX.schedule },
      { label: "Posts while your computer is off", them: "Yes, from their servers", growx: GROWX.offline },
      { label: "Inspiration library of popular posts", them: "Yes", growx: "No. 52 templates and an AI writer that works from your niche and voice" },
      { label: "AI writing", them: "Yes; check which plan includes it", growx: GROWX.ai },
      { label: "Auto follow / audience growth", them: CHECK_THEIR_SITE, growx: GROWX.follow },
      { label: "Post analytics", them: "Yes", growx: GROWX.analytics },
      { label: "Who unfollowed you", them: CHECK_THEIR_SITE, growx: GROWX.unfollowers },
      { label: "Evergreen posts and auto-plug", them: CHECK_THEIR_SITE, growx: GROWX.evergreen },
      { label: "Pricing", them: "Subscription plans; check their pricing page", growx: GROWX.price },
    ],
    pickThem: [
      "You want a library of popular posts to borrow ideas and structures from.",
      "Your posts must go out while your computer is off.",
      "You prefer a web app to a browser extension.",
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
    seoTitle: "Hypefury Alternative for X (Twitter): GrowX",
    description:
      "Hypefury no longer supports X. See how GrowX covers its X jobs (queue, evergreen posts, auto-plug) and adds growth tools, with a fair comparison table.",
    h1: "A Hypefury alternative for X, with growth built in",
    lead:
      "Hypefury's pricing page says it no longer supports X. If your queue, evergreen posts and auto-plugs lived there, GrowX covers those X jobs in Chrome and adds smart auto follow, analytics and an unfollower tracker.",
    blurb: "Hypefury left X. Where your queue, evergreen posts and auto-plugs can go.",
    keywords: ["Hypefury alternative", "Hypefury for X", "Hypefury replacement", "evergreen tweets", "auto plug Twitter", "GrowX"],
    summary: [
      "For years **Hypefury** was a favourite of X creators: it scheduled posts and threads, re-shared your best posts on an evergreen loop and added an auto-plug, a reply with your offer, under posts that took off.",
      "In 2026 that changed. Hypefury's pricing page now says it no longer supports X, and the networks it lists are Bluesky, Threads, LinkedIn, Instagram and TikTok. It has not published a single cutoff date, so check its site for its current position.",
      "**GrowX** covers Hypefury's three main X jobs, a posting queue, evergreen recycling and auto-plug (the last two on Premium), and adds the growth side Hypefury never had.",
    ],
    theyDoWell: [
      "**Evergreen posting and auto-plugs** made it a favourite of X creators for years.",
      "**Scheduling posts and threads,** with a queue many people built their whole routine around.",
      "**Several networks.** Its pricing page lists Bluesky, Threads, LinkedIn, Instagram and TikTok, so it can still fit if you post there.",
    ],
    growxDiffers: sharedDiffers,
    table: [
      { label: "Supports X today", them: "No, per its pricing page (check their site)", growx: "Yes, X only" },
      { label: "What it is", them: "A scheduling tool for social networks", growx: GROWX.type },
      { label: "Networks", them: "Bluesky, Threads, LinkedIn, Instagram and TikTok", growx: GROWX.networks },
      { label: "Queue and scheduling", them: "For the networks it supports; check their site", growx: GROWX.schedule },
      { label: "Evergreen recycling", them: "Known for it on X before; check their site", growx: "Premium: best posts again every N days (30 by default) with rotating variants, or reposted" },
      { label: "Auto-plug", them: "Known for it on X before; check their site", growx: "Premium: a reply with your call to action once a post takes off (50 likes by default)" },
      { label: "Posts while your computer is off", them: CHECK_THEIR_SITE, growx: GROWX.offline },
      { label: "AI writing", them: CHECK_THEIR_SITE, growx: GROWX.ai },
      { label: "Auto follow / audience growth", them: CHECK_THEIR_SITE, growx: GROWX.follow },
      { label: "Who unfollowed you", them: CHECK_THEIR_SITE, growx: GROWX.unfollowers },
      { label: "Pricing", them: "Check their pricing page", growx: GROWX.price },
    ],
    pickThem: [
      "You have moved to Bluesky, Threads, LinkedIn, Instagram or TikTok and X is no longer your main network.",
      "You want one scheduler for those networks rather than a tool built only for X.",
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
          "Posting has its own safety rules: a daily cap (20 by default), a 5-minute minimum gap and a pause on any warning from X. One honest limit: GrowX posts from your own Chrome, so the computer has to be on with Chrome open at the scheduled time. See the [X post scheduler](/features/twitter-post-scheduler).",
        ],
      },
      {
        heading: "Pick the right posts for evergreen",
        paragraphs: ["Evergreen recycling only pays off when the posts deserve a second life. Prune before you move a big library:"],
        bullets: [
          "Keep how-tos, frameworks, lists and lessons; drop news, dates and replies to a moment.",
          "Keep posts that beat your usual engagement rate. The free [engagement rate calculator](/tools/twitter-engagement-rate-calculator) compares them fairly, and [GrowX analytics](/features/twitter-analytics) shows which topics and formats work.",
          "Write two or three openings for the same idea and leave a month or more between repeats.",
        ],
      },
      {
        heading: "Moving your Hypefury routine to GrowX",
        paragraphs: ["A move that keeps your posting steady:"],
        steps: [
          "Install GrowX, open x.com in the same Chrome profile and finish the setup wizard.",
          "Set your queue slots in **AI Creator Studio** to the times you used in Hypefury.",
          "Copy your best evergreen posts across, then turn on evergreen recycling and auto-plug in the free 30-day Premium trial.",
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
    relatedPosts: ["hypefury-alternatives", "how-to-schedule-tweets", "twitter-analytics-tools"],
    relatedFeatures: ["twitter-post-scheduler", "twitter-analytics", "twitter-auto-follow"],
  },
  {
    slug: "typefully",
    name: "Typefully",
    site: "typefully.com",
    seoTitle: "Typefully Alternative for X Growth: GrowX Compared",
    description:
      "A Typefully alternative for growing on X: compare GrowX on writing, scheduling, on-device AI, growth tools and prepaid pricing. See who should pick which.",
    h1: "A Typefully alternative for when you need reach, not only a better editor",
    lead:
      "Typefully is a calm editor for posts and threads that also schedules across several networks. GrowX is a Chrome extension for X that adds the growth work around your posts: who to follow, when to post and who unfollowed.",
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
      { label: "What it is", them: "Web app for writing and scheduling", growx: GROWX.type },
      { label: "Networks", them: "X and several other networks", growx: GROWX.networks },
      { label: "How it reaches X", them: "Connects to your X account", growx: GROWX.connect },
      { label: "Write and schedule threads", them: "Yes, its core", growx: GROWX.schedule },
      { label: "Posts while your computer is off", them: "Yes, from their servers", growx: GROWX.offline },
      { label: "AI writing", them: "Yes; check which plan includes it", growx: GROWX.ai },
      { label: "Auto follow / audience growth", them: CHECK_THEIR_SITE, growx: GROWX.follow },
      { label: "Post analytics", them: "Yes", growx: GROWX.analytics },
      { label: "Who unfollowed you", them: CHECK_THEIR_SITE, growx: GROWX.unfollowers },
      { label: "Evergreen posts and auto-plug", them: CHECK_THEIR_SITE, growx: GROWX.evergreen },
      { label: "Pricing", them: "Subscription plans; check their pricing page", growx: GROWX.price },
    ],
    pickThem: [
      "Writing is the part you want to get better at, and you care about the editor itself.",
      "You publish the same ideas to X and other networks.",
      "Scheduled posts must go out while your computer is off.",
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
          "Around that sit the [AI Reply Assistant](/features/twitter-reply-targets) for replying early to fresh posts, an [unfollower tracker](/features/twitter-unfollower-tracker) that shows who followed and unfollowed you each day, and Cleanup for accounts that don't follow back. No tool can promise zero risk on X; start with the Safe or Balanced pace.",
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
];

export function getAlternative(slug: string): AlternativePage | undefined {
  return alternativePages.find((a) => a.slug === slug);
}
