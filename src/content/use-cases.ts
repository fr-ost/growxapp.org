import type { FeatureSlug } from "./feature-slugs";

/**
 * Use-case pages (/use-cases/<slug>): how one kind of account grows on X with GrowX. Real and specific, 900 to 1,400
 * words each. Every product claim must already be in the site copy or docs/PRODUCT_FACTS.md (extension 2.5.1); no
 * invented statistics, results, testimonials or promises. Inline text supports **bold** and [label](/path).
 */
export type UseCaseSlug = "crypto-twitter" | "new-x-account" | "creators-and-founders";

export interface UseCase {
  slug: UseCaseSlug;
  /** Short name for cards, menus and the footer. */
  nav: string;
  /** One line for cards. */
  blurb: string;
  /** <title> text: rendered as seoTitle + " | GrowX" only when that fits in 60 characters. */
  seoTitle: string;
  /** Meta description, 140 to 160 characters. */
  description: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  /** The first paragraph under the H1: a 40 to 70 word direct answer to the page's main question. */
  answer: string;
  sections: { id: string; heading: string; paragraphs: string[]; bullets?: string[] }[];
  /** The plan with GrowX, step by step (3 to 5 steps). */
  workflow: { title: string; text: string }[];
  /** Feature pages this use case relies on. */
  features: FeatureSlug[];
  /** Free tools that fit (hrefs from src/config/nav.ts toolNav). */
  tools: string[];
  /** Related blog posts (slugs). */
  posts: string[];
  faq: { q: string; a: string }[];
  /** YYYY-MM-DD, shown as "Updated" and used as dateModified and the sitemap date. */
  dateModified: string;
}

export const useCases: UseCase[] = [
  {
    slug: "crypto-twitter",
    nav: "Crypto and Web3",
    blurb: "Grow a crypto or Web3 account on X by following the right crowd, replying early and pacing every follow.",
    seoTitle: "Grow a Crypto Twitter Account: A Safe Plan for X",
    description:
      "Grow a crypto or Web3 account on X with GrowX: follow the newest followers of big crypto accounts, follow your own lists and reply early, at a safe pace.",
    keywords: [
      "crypto Twitter growth",
      "how to grow on crypto Twitter",
      "grow a crypto Twitter account",
      "Web3 Twitter growth",
      "grow a Web3 project on X",
      "crypto KOL growth on X",
      "crypto Twitter auto follow",
    ],
    eyebrow: "Crypto and Web3",
    h1: "How to grow on crypto Twitter without looking like a bot",
    answer:
      "To grow a crypto or Web3 account on X, pick one lane, post useful takes on a steady schedule and reply early under the big accounts your audience reads. **GrowX**, a Chrome extension, handles the repetitive part: it follows the newest followers of crypto accounts you choose, follows your own lists, finds fresh posts to reply to and paces every follow with breaks and caps.",
    sections: [
      {
        id: "what-makes-it-different",
        heading: "What makes crypto Twitter different from the rest of X?",
        paragraphs: [
          "Crypto Twitter moves fast. News and launches break in public, and reply sections under big accounts fill up in minutes, often with bots, impersonators and engagement farmers. Readers have seen a lot of spam, so they judge a new name quickly.",
          "So stay in one lane, show up early and look clearly human. X treats sudden, repetitive following as spam-like behaviour, and its rules on platform manipulation and spam cover follow trains and [engagement pods](/blog/twitter-engagement-groups). This page is about growing an account, not about markets: nothing here is financial advice.",
        ],
      },
      {
        id: "trusted-profile",
        heading: "How do I set up a crypto account people trust?",
        paragraphs: [
          "Pick a lane you can post about every day, such as on-chain research, DeFi, NFTs and digital art, security or developer tools. Then finish the profile before you follow anyone. Many people check it before they follow back, and crypto readers are quick to spot a throwaway account.",
        ],
        bullets: [
          "A clear photo or logo, and a bio of up to 160 characters that names your lane (try the free [bio generator](/tools/twitter-bio-generator))",
          "A pinned thread with your best research or explainer",
          "Your affiliations: if a project employs or pays you, say so",
        ],
      },
      {
        id: "big-account-followers",
        heading: "Should I follow the followers of big crypto accounts?",
        paragraphs: [
          "It is the most direct way to reach people who care about crypto right now. Add those accounts as **source profiles**, and the [auto follow](/features/twitter-auto-follow) autopilot follows their **newest followers** first, because they are active today. Everyone else is scored from 1 to 99 for follow-back and followed only above your minimum, 55 by default.",
          "The biggest accounts also attract bots and people who never follow back, so mix one or two of them with mid-sized accounts in your exact lane, or press **Find sources for me**. The **source leaderboard** shows each source's follow-back rate, retention and cost, so you keep the ones that work.",
          "Safety checks skip private accounts, accounts without a photo or posts, giant accounts and bios that match your exclude keywords. Scored candidates must also be at least 30 days old and active in the last 45 days, by default. With **Premium**, a post's replies, reposts and likes, searches, #hashtags and X Lists can be sources too.",
        ],
      },
      {
        id: "list-follow",
        heading: "How do I follow a list of crypto accounts?",
        paragraphs: [
          "When you already know who you want, such as speakers from a conference or a Space, community members or the accounts in a \"who to follow\" thread, use [List follow](/features/twitter-list-follow). Paste usernames, @mentions or links, or drop a CSV or TXT file. From a pasted thread, GrowX takes only the @mentions and links, not every word.",
          "List follow uses the same paces and safety as the autopilot, one of the two at a time, and Stop keeps your progress. The free plan follows lists of 50 at a time; Premium takes up to 5,000. See [how to build a follow list](/blog/how-to-build-a-twitter-follow-list).",
        ],
      },
      {
        id: "reply-early",
        heading: "How do I get noticed in crypto reply sections?",
        paragraphs: [
          "A sharp, early reply under a fresh post from a bigger account reaches that account's readers. The [AI Reply Assistant](/features/twitter-reply-targets) lists posts younger than 120 minutes from your sources, your VIPs and anyone you add, ranked by freshness and how fast they take off. Replying and liking by hand from that list is free.",
          "With **Premium**, GrowX AI drafts replies in your tone, on your own computer. A draft cannot be sent if it repeats a reply from the last 14 days, still has a placeholder or runs over 280 characters, and links, hashtags and generic text get a warning. You approve every reply; GrowX never replies by itself. If your replies seem to vanish, try the free [shadowban checker](/tools/twitter-shadowban-checker).",
        ],
        bullets: [
          "Add data, context or a risk the post left out",
          "Skip replies that only say \"gm\" or \"this\"",
          "Never reply with links, \"DM me\" offers or giveaway bait, which look like scams here",
        ],
      },
      {
        id: "safe-pace",
        heading: "How fast can a crypto account follow people?",
        paragraphs: [
          "There is no number that is safe for every account, and **no tool can promise zero risk on X**. GrowX starts on **Slow**, free forever: 50 to 120 seconds between follows, up to 14 an hour and about 100 a day. With Premium, **Balanced** (about 280 a day) is recommended for most accounts, **Turbo** (about 390) is for aged accounts and the **X Premium** pace (about 800) only for accounts with X Premium.",
          "Turn on warm-up for a new or quiet account, so the daily cap starts at 60 and rises by 20 a day. GrowX slows down after any X warning, stops on a lock or a challenge, and **Alt+Shift+S** stops everything. Read [X follow limits and risks](/blog/mass-follow-twitter-limits) before you move up a pace.",
          "Keep your following lean, too. The [cleanup scan](/features/twitter-unfollow-tool) finds accounts that do not follow you back and unfollows the ones you select, at up to 30 an hour and 200 a day.",
        ],
      },
      {
        id: "kols-projects-communities",
        heading: "How should KOLs, project accounts and communities use it?",
        paragraphs: [
          "**KOLs** grow on analysis and replies, so the AI Reply Assistant and a strong pinned thread matter most. **Project accounts** grow on clear updates and trust, so a steady posting queue and a lean following count for more than follow volume. **Community accounts** can follow their own members with List follow.",
          "Running a project account next to a founder's? Every GrowX account links 2 X usernames for free, and a workspace per X account is Premium. Scheduled posts go out only as the account they were written for, and approved replies only from the account they were approved on.",
        ],
      },
    ],
    workflow: [
      {
        title: "Pick a lane and finish your profile",
        text: "Choose your part of crypto, add a clear photo, bio and pinned thread, and queue a few posts so visitors see recent work.",
      },
      {
        title: "Add sources and start on Slow",
        text: "Mix large and mid-sized crypto accounts as sources, or press **Find sources for me**. Keep the free Slow pace, turn on warm-up and press Start.",
      },
      {
        title: "Follow your own lists",
        text: "Paste speakers, members or a who-to-follow thread into [List follow](/features/twitter-list-follow) while the autopilot is stopped.",
      },
      {
        title: "Reply early every day",
        text: "Pick a few fresh posts in the AI Reply Assistant where you have something to add. With Premium, edit and approve the AI drafts.",
      },
      {
        title: "Review the results weekly",
        text: "Check **Who followed back** and the source leaderboard, replace sources that bring nobody and clean up non-followers at a safe pace.",
      },
    ],
    features: ["twitter-auto-follow", "twitter-list-follow", "twitter-reply-targets", "twitter-analytics", "twitter-unfollow-tool"],
    tools: ["/tools/twitter-shadowban-checker", "/tools/twitter-follower-ratio-calculator", "/tools/twitter-bio-generator"],
    posts: ["twitter-reply-strategy", "mass-follow-twitter-limits", "how-to-build-a-twitter-follow-list", "twitter-lists-guide", "twitter-engagement-groups"],
    faq: [
      {
        q: "Is it safe to use GrowX on a crypto account?",
        a: "No tool can promise zero risk on X. GrowX lowers the risk with random delays, breaks, hourly and daily caps, warm-up, a slow-down after X warnings and an emergency stop (Alt+Shift+S). You stay responsible for following X's rules.",
      },
      {
        q: "Does GrowX need my X password?",
        a: "No. GrowX works inside the x.com session you are already signed in to in Chrome and never asks for your X password. It is independent and not affiliated with X Corp.",
      },
      {
        q: "Can GrowX follow the people who replied to a crypto post?",
        a: "Yes, with Premium. A post's replies, reposts and likes, searches, #hashtags and X Lists can all be autopilot sources, filtered and scored like any other.",
      },
      {
        q: "How do I know if my new followers are bots?",
        a: "With Premium, follower quality checks your newest followers on request and sorts them into real and active, inactive (90+ days), likely bots and private. On the free plan, the source leaderboard shows each source's follow-back rate and retention.",
      },
      {
        q: "Will GrowX reply to or like posts for me automatically?",
        a: "No. GrowX never replies by itself. You reply and like by hand, or approve AI drafts (Premium) and press Send approved, and they go out one at a time, 45 to 90 seconds apart.",
      },
      {
        q: "Can I pay for GrowX Premium in crypto?",
        a: "Yes. Premium is prepaid in crypto through NOWPayments: $1.99 for 30 days, $14.99 for 365 days or $59.99 lifetime ($29.99 for the first 100 lifetime buyers). Nothing renews by itself.",
      },
    ],
    dateModified: "2026-11-27",
  },
  {
    slug: "new-x-account",
    nav: "New X accounts",
    blurb: "A careful plan for a brand-new X account: profile first, a slow warm-up, then steady growth.",
    seoTitle: "Grow a New X (Twitter) Account Safely From Day One",
    description:
      "Grow a new X (Twitter) account safely from day one: finish your profile, warm up slowly, post daily and reply early, with the free Slow pace in GrowX.",
    keywords: [
      "grow a new Twitter account",
      "how to grow a new X account",
      "new X account growth",
      "new Twitter account tips",
      "get followers on a new Twitter account",
      "warm up a new Twitter account",
      "Twitter growth for beginners",
    ],
    eyebrow: "New accounts",
    h1: "How to grow a new X (Twitter) account safely, from day one",
    answer:
      "Grow a new X account by finishing your profile first, picking one niche, posting daily and replying early to bigger accounts in it. **GrowX**, a Chrome extension that is free to start, handles the repetitive parts: it follows people likely to follow back at a pace gentle on new accounts, queues your posts and shows what works. Nobody can promise a date for 1,000 followers.",
    sections: [
      {
        id: "why-new-accounts-are-hard",
        heading: "Why is it hard to grow a brand-new X account?",
        paragraphs: [
          "A new account has no history, few followers and little reach. When you post, almost nobody sees it. When you follow someone, they look at an empty profile and move on. X also tends to treat newer, lower-trust accounts more strictly, so a burst of activity on day one stands out.",
          "So the first weeks are about building trust and a normal-looking record, not volume, and each step below is slow on purpose. Treat 1,000 followers as a target, not a promise, and judge progress by what you control: your profile, posts, replies and who you follow.",
        ],
      },
      {
        id: "before-you-follow",
        heading: "What should I do before I follow anyone?",
        paragraphs: [
          "Finish your profile. Every follow and every reply is an invitation to look at it, and a default avatar with an empty bio looks like a bot. GrowX's own filters skip accounts without a photo, which shows how quickly an empty profile gets passed over.",
          "Pick one main topic you could post about every week for a year, plus one or two neighbouring ones. Five unrelated topics make it hard for anyone to know why they should follow. Read [how to find your niche](/blog/how-to-find-your-niche-on-twitter) if you are torn.",
        ],
        bullets: [
          "A clear photo, a header and a bio that says who it is for and what you post (try the free [bio generator](/tools/twitter-bio-generator))",
          "A pinned post that introduces you or shows your best thread",
          "A few posts already live, and a week more waiting in the queue",
          "A handful of good accounts in your niche followed by hand, so GrowX has something to suggest sources from",
        ],
      },
      {
        id: "how-many-follows",
        heading: "How many people should a new account follow per day?",
        paragraphs: [
          "Fewer than you think. GrowX installs on **Slow**, the free pace built to be gentle on new accounts: 50 to 120 seconds between follows, a 20-minute rest every 10 follows, up to 14 an hour and about 100 a day. Turn on **warm-up** too, so the daily cap starts at 60 and rises by 20 a day, and consider **active hours** (off by default, 08:00 to 23:30 when on) so the autopilot does not run all night.",
          "The free 30-day Premium trial unlocks faster paces, but do not rush. Stay on Slow for the first week or two, and move to **Balanced** (about 280 a day) only after several clean days with no warnings. Turbo is meant for aged accounts. If X refuses follows for the day, GrowX holds just under the number X allowed for 24 hours. **No tool can promise zero risk on X**, so read [X follow limits and risks](/blog/mass-follow-twitter-limits) first.",
        ],
      },
      {
        id: "who-to-follow",
        heading: "Who should a new account follow?",
        paragraphs: [
          "People who already care about your topic. Add 3 to 5 accounts in your niche as sources, and the [auto follow](/features/twitter-auto-follow) autopilot follows their newest followers first, then other candidates that clear your minimum follow-back score (55 by default). Mid-sized, closely related sources usually beat one giant account whose crowd does not care about your niche.",
          "**Find sources for me** suggests sources from the accounts you already follow, which is why a few hand-picked follows help on a fresh account. At first the standard score does the work: the **smart score** (Premium) learns from your own follow-backs, but only after about 80 settled follows with at least 12 follow-backs and 12 that did not follow back.",
        ],
      },
      {
        id: "posts-and-replies",
        heading: "What should a new account post, and how often?",
        paragraphs: [
          "Post once a day if you can keep it up, and reply more than you post: replies to fresh posts from bigger accounts in your niche are how strangers find a small account. The [AI Reply Assistant](/features/twitter-reply-targets) lists posts younger than 120 minutes from your sources and anyone you add, and replying by hand is free. Add an example, a next step or a sharp question, never just \"great post\".",
          "For your own posts, write several in one sitting and press **Add to queue**: GrowX fills your next free slot (09:00, 13:00 and 18:30 by default), with up to 10 posts waiting on the free plan. The [52 tweet templates](/tools/tweet-templates) help when you are stuck. Keep Chrome running, because GrowX posts from your browser.",
        ],
      },
      {
        id: "is-it-working",
        heading: "How do I know if the plan is working?",
        paragraphs: [
          "Look past the follower count. **Who followed back** lists everyone who followed you back after GrowX followed them, with their source, and the source leaderboard shows which sources bring people who stay. [Post analytics](/features/twitter-analytics) cover your latest 30 posts, and **What works** compares topics and formats, so you write more of what earns a response.",
          "Your **Growth Score** may be empty at first: it appears once two of its six parts have enough data, and each part says what it needs. Daily goals and streaks help you keep the habit. After a couple of weeks, run the cleanup scan and unfollow the non-followers you choose, up to 200 per run on the free plan.",
        ],
      },
      {
        id: "mistakes",
        heading: "What mistakes slow a new account down?",
        paragraphs: ["Most new accounts stall for the same few reasons, and all of them are easy to avoid:"],
        bullets: [
          "Following hundreds of people on day one, or jumping to a fast pace before the account has any history",
          "Following anyone who might follow back, whatever their topic. [Follow for follow](/blog/follow-for-follow-twitter) grows the count, not the audience",
          "Posting in bursts and then going quiet for a week",
          "Replies that give nobody a reason to tap your name",
          "Never cleaning up, so your following count runs far ahead of your followers",
        ],
      },
    ],
    workflow: [
      {
        title: "Finish the profile",
        text: "Add a photo, a clear bio and a pinned introduction. Post a few times and queue a week of posts so visitors see recent work.",
      },
      {
        title: "Add sources and press Start",
        text: "Add 3 to 5 niche accounts as sources. Keep the free Slow pace, turn on warm-up and let the autopilot follow their newest followers first.",
      },
      {
        title: "Reply every day",
        text: "Spend 10 to 20 minutes in the AI Reply Assistant replying to fresh posts where you have something real to add.",
      },
      {
        title: "Review once a week",
        text: "Check **Who followed back**, the source leaderboard and **What works**. Replace weak sources and write more of what earned replies.",
      },
      {
        title: "Clean up, then move up slowly",
        text: "After a couple of weeks, unfollow the non-followers you choose at the safe pace. Move to Balanced only after several clean days.",
      },
    ],
    features: ["twitter-auto-follow", "twitter-post-scheduler", "twitter-reply-targets", "twitter-analytics", "twitter-unfollow-tool"],
    tools: ["/tools/twitter-bio-generator", "/tools/tweet-templates", "/tools/twitter-follower-ratio-calculator"],
    posts: ["first-1000-followers-on-x", "how-to-find-your-niche-on-twitter", "twitter-bio-ideas", "mass-follow-twitter-limits", "twitter-follower-ratio"],
    faq: [
      {
        q: "How long does it take a new X account to reach 1,000 followers?",
        a: "Nobody can say honestly. It depends on your niche, your posts, how often you reply and how well your following is targeted. Treat 1,000 as a target, measure your progress every week and adjust the plan.",
      },
      {
        q: "Is the GrowX free plan enough for a new account?",
        a: "Yes. It includes the Slow pace (about 100 follows a day), sources and core filters, up to 10 queued posts, replying by hand from the AI Reply Assistant, analytics for your latest 30 posts and the cleanup scan. Premium adds faster paces, GrowX AI and full analytics.",
      },
      {
        q: "Which pace should a brand-new X account use?",
        a: "Slow, the free default, with warm-up turned on. With Premium, move to Balanced only after several clean days with no warnings from X. Turbo is meant for aged accounts, and the X Premium pace only for accounts with X Premium.",
      },
      {
        q: "Can following people get a new account limited?",
        a: "Yes, it can, and new accounts tend to be treated more strictly. Following relevant people slowly, with breaks and daily caps, and pausing after any warning lowers the risk, but no tool can promise zero risk on X.",
      },
      {
        q: "Should I start the 30-day Premium trial on a new account?",
        a: "You can. It is free, needs no credit card and starts by itself once your GrowX account is ready. It is linked to the first X account you run the autopilot with, so use the account you want to grow, and still start on Slow.",
      },
    ],
    dateModified: "2026-11-27",
  },
  {
    slug: "creators-and-founders",
    nav: "Creators and founders",
    blurb: "Grow on X while you build: a steady posting rhythm, honest numbers and replies that turn readers into supporters.",
    seoTitle: "Grow on X as a Founder or Creator: A Weekly System",
    description:
      "Founders and creators can grow on X with a weekly rhythm: queue updates for your best times, see which posts work and reply early in your niche, with GrowX.",
    keywords: [
      "grow on X as a founder",
      "X growth for creators",
      "Twitter for founders",
      "X growth for founders",
      "Twitter growth for creators",
      "founder personal brand on X",
      "indie hacker Twitter",
    ],
    eyebrow: "Creators and founders",
    h1: "Grow on X as a founder or creator, with a rhythm you can keep",
    answer:
      "To grow on X as a founder or creator, share real progress on a fixed rhythm, reply to people in your space and let your numbers guide you. **GrowX**, a Chrome extension, keeps that rhythm going: it queues posts and threads for your best times, offers build in public templates, shows which posts and formats work and finds fresh posts to reply to early.",
    sections: [
      {
        id: "why-rhythm",
        heading: "Why does building in public need a rhythm?",
        paragraphs: [
          "Building in public works like a story told in episodes. People follow to see what happens next, so a weekly update that lands on the same day earns more trust than a burst of posts after a good week and silence after a bad one. Regularity matters more than volume.",
          "The catch is time. Founders and creators are busy making the thing, and writing updates competes with building. The fix is to separate writing from posting: write when you have the numbers or the screenshot, then let a queue publish at the hours your audience is around.",
        ],
      },
      {
        id: "keep-posting",
        heading: "How do I keep posting while I build?",
        paragraphs: [
          "In the GrowX [post scheduler](/features/twitter-post-scheduler) you can post now, pick a time or press **Add to queue**, which fills your next free slot (09:00, 13:00 and 18:30 by default). Threads can have up to 25 parts and each post up to 4 images, which suits screenshots and before-and-after shots. The free plan keeps up to 10 posts or threads waiting at once; Premium removes the limit.",
          "The 52 templates include a **Build in public** category with four formats: **Weekly update**, **Milestone**, **Numbers** and **Feature shipped**. Fill in the {placeholders} and save your own variations, so a weekly update takes minutes. With Premium, **evergreen recycling** posts your best posts again every N days (30 by default), and **auto-plug** replies to your own post with your call to action once it takes off (50 likes by default).",
          "One honest limit: GrowX posts from Chrome on your computer, so Chrome must be running at the scheduled time. A post more than 6 hours late is not posted by itself. It waits as \"missed\", so a stale update never goes out by surprise.",
        ],
      },
      {
        id: "what-to-share",
        heading: "What should I share, and what should I keep private?",
        paragraphs: [
          "Share progress, lessons, decisions and the numbers you are comfortable with customers and competitors seeing. Ranges or growth rates work when exact figures feel like too much. Keep customer data, other people's information, security details and confidential deals out of your posts, and check every corner of a screenshot before it goes in the queue.",
          "The full list, with formats that work, is in [build in public on Twitter](/blog/build-in-public-on-twitter). For the bigger picture of an audience built around your work, read [personal branding on Twitter](/blog/personal-branding-on-twitter).",
        ],
      },
      {
        id: "ai-help",
        heading: "Can AI help me write updates without making things up?",
        paragraphs: [
          "With Premium, [GrowX AI](/features/ai-tweet-writer) can turn rough notes into a draft update, suggest hooks or split a long post into a thread, in the voice from your settings. It runs on your own computer with the AI model built into Chrome, so drafts about unreleased work are not sent to GrowX, and there is no API key.",
          "It is built not to invent facts. Where a post needs a number or a name it cannot know, it leaves a {placeholder}, which matters when honesty is the whole point. If Chrome's model is not available on your computer, the buttons fall back to templates and the plain thread splitter.",
        ],
      },
      {
        id: "numbers-to-watch",
        heading: "Which numbers should founders and creators watch?",
        paragraphs: [
          "Not just followers. GrowX post analytics show views, likes, reposts, replies, bookmarks and engagement rate for your latest 30 posts, free, and **What works** compares questions, images, text, threads and links. The **best time to post** heat map comes from your own posts and the hours your followers are active, so you can move queue slots toward the warm hours.",
          "Your free **Growth Score** counts consistency as one of its six parts, a useful nudge for a weekly update habit. With Premium, **Which posts brought followers** highlights posts followed by more new followers than your usual pace in the next 24 hours, and the **weekly report** compares this week with last week, with a notification on Monday. The [unfollower tracker](/features/twitter-unfollower-tracker) shows who followed and who left after an update.",
        ],
      },
      {
        id: "replies",
        heading: "How do replies help when you build in public?",
        paragraphs: [
          "Your updates reach your followers; replies reach everyone else. Early, specific replies under posts from other builders, creators and the accounts your customers read put your name in front of new readers. The [AI Reply Assistant](/features/twitter-reply-targets) lists fresh posts from the accounts you watch, ranked by how fast they take off. Replying by hand is free; AI drafts you approve are Premium, and GrowX never replies by itself.",
          "Use **People** to tag and add notes on early supporters, beta users and peers, and mark VIPs whose posts you never want to miss. **Top fans** shows who likes and replies to you most. Those are the people to thank, ask for feedback and tell first when you ship.",
        ],
      },
      {
        id: "reach-customers",
        heading: "How do I reach customers, not only other builders?",
        paragraphs: [
          "A common trap: other founders cheer you on but never buy. Make some posts about the problem you solve, in your customers' words, not only about your build process. If you use [auto follow](/features/twitter-auto-follow), add sources your customers follow, such as accounts in their industry, and let **Who followed back** and the source leaderboard show which sources bring people who stay.",
          "Running a personal account and a company account? Every GrowX account links 2 X usernames for free, a separate workspace per X account is Premium, and each post goes out only as the account it was written for.",
        ],
      },
    ],
    workflow: [
      {
        title: "Set your rhythm",
        text: "Pick a day for your weekly update and set your queue slots. Start from the **Build in public** templates when you have the numbers.",
      },
      {
        title: "Queue a week at a time",
        text: "Write your posts and one thread in one sitting and add them to the queue. Keep Chrome running so they go out on time.",
      },
      {
        title: "Reply where your audience is",
        text: "Spend a short block each day in the AI Reply Assistant on fresh posts from peers and the accounts your customers read.",
      },
      {
        title: "Review every Monday",
        text: "Check **What works**, the best time heat map and, with Premium, the weekly report. Do more of what earned replies and followers.",
      },
    ],
    features: ["twitter-post-scheduler", "ai-tweet-writer", "twitter-analytics", "twitter-reply-targets", "twitter-auto-follow", "twitter-unfollower-tracker"],
    tools: ["/tools/tweet-templates", "/tools/twitter-thread-maker", "/tools/twitter-engagement-rate-calculator"],
    posts: ["build-in-public-on-twitter", "personal-branding-on-twitter", "twitter-content-calendar", "how-to-schedule-tweets", "twitter-analytics-guide"],
    faq: [
      {
        q: "Do I have to share revenue to build in public?",
        a: "No. You choose what to share. Many people share users, signups, ranges or growth instead of exact revenue. Share only what you would be comfortable with customers and competitors seeing.",
      },
      {
        q: "Will my scheduled posts go out if my laptop is closed?",
        a: "No. GrowX posts from Chrome on your computer, so Chrome and the computer must be on. A post more than 6 hours late is not posted by itself; it waits as missed until you decide what to do with it.",
      },
      {
        q: "Can I manage my personal and company X accounts in GrowX?",
        a: "Yes. Every GrowX account links 2 X usernames for free, and extra slots cost $0.99 each, one-time. A separate workspace per X account is a Premium feature, and each post is published only as the X account it was written for.",
      },
      {
        q: "Does GrowX AI send my drafts anywhere?",
        a: "No. GrowX AI runs on your computer with the AI model built into Chrome, and nothing is sent to GrowX. It is part of Premium; the free plan has the same composer with 52 templates and the plain thread splitter.",
      },
      {
        q: "How often should I post build in public updates?",
        a: "A weekly update on a fixed day is a good backbone, with smaller progress posts in between when you have something to show. Regularity matters more than volume, so pick a rhythm you can keep for months.",
      },
    ],
    dateModified: "2026-11-27",
  },
];

export const getUseCase = (slug: string) => useCases.find((u) => u.slug === slug);
