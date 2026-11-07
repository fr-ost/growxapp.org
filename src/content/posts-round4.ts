import type { Block, Post } from "./posts";

/**
 * Round 4 guides: tool alternatives after Hypefury left X, a feature comparison with Typefully and Tweet Hunter,
 * verification, engagement groups, finding a niche, building a follow list and growing in your own language.
 * Rules as in posts.ts: GrowX claims match docs/PRODUCT_FACTS.md (extension v2.4.7). Other products are described only by
 * what they are publicly known for, with no invented prices, limits or ratings. X's own rules and plans change, so claims
 * about X stick to what its Help Center says and send readers there to check.
 */
const p = (text: string): Block => ({ type: "p", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });
const ol = (...items: string[]): Block => ({ type: "ol", items });
const note = (text: string): Block => ({ type: "note", text });

const DATE = "2026-11-07";
const TRY =
  "GrowX is free to install from the Chrome Web Store, and you can [create a free account](/signup) to try every Premium feature free for 30 days, no credit card needed.";

export const round4Posts: Post[] = [
  {
    slug: "hypefury-alternatives",
    seoTitle: "Hypefury Alternatives for X (Twitter) in 2026",
    title: "Hypefury Alternatives for X (Twitter) in 2026: Where to Move Your Evergreen Posts and Auto-Plugs",
    description:
      "Hypefury no longer supports X. Compare Hypefury alternatives for scheduling, evergreen posts and auto-plugs on X, and see how GrowX covers the same jobs.",
    excerpt:
      "Hypefury now focuses on other networks, so X creators need a new home for their queue, evergreen posts and auto-plugs. Here is what to look for and where GrowX fits.",
    category: "Guides",
    keywords: [
      "Hypefury alternative",
      "Hypefury alternatives",
      "Hypefury for X",
      "Hypefury replacement",
      "evergreen tweets tool",
      "auto plug Twitter",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 7,
    related: ["circleboom-alternatives", "how-to-schedule-tweets", "typefully-vs-tweet-hunter"],
    sections: [
      {
        id: "what-happened",
        heading: "What happened to Hypefury on X",
        blocks: [
          p("For years **Hypefury** was a favourite of X creators. It scheduled posts and threads, re-shared your best posts on an evergreen loop and added an auto-plug, a reply with your offer, under posts that took off."),
          p("In 2026 that changed. Hypefury's pricing page now says it no longer supports X, and the networks it lists are Bluesky, Threads, LinkedIn, Instagram and TikTok. Reviews noticed the change in mid-2026. Hypefury has not published a single cutoff date, so check hypefury.com for its current position."),
          p("If your X routine was built on Hypefury, you need a new home for three jobs: your **posting queue**, your **evergreen posts** and your **auto-plugs**. This guide covers what to look for and where [GrowX](/) fits."),
        ],
      },
      {
        id: "checklist",
        heading: "What a good Hypefury alternative for X needs",
        blocks: [
          ol(
            "**A queue with time slots**, so new posts drop into the next free slot instead of needing a date each time.",
            "**Threads and images**, with character counting that matches X, including links counted as 23 characters.",
            "**Evergreen recycling**: your best posts go out again after a gap, ideally with variants so followers don't see the exact same text.",
            "**Auto-plug**: a reply with your call to action once a post passes a number of likes.",
            "**Analytics** that show which posts worked, so you know what deserves an evergreen slot.",
            "**Safety**: a daily posting cap, a minimum gap between posts and a pause when X shows a warning.",
          ),
        ],
      },
      {
        id: "growx",
        heading: "GrowX: evergreen posts and auto-plug, plus growth",
        blocks: [
          p("GrowX is a Chrome extension for X that covers Hypefury's main X jobs and adds the growth side Hypefury never had:"),
          ul(
            "**Post scheduler**: posts and threads up to 25 parts with up to 4 images, X's own character counting, post now, schedule, or add to queue slots (09:00, 13:00 and 18:30 by default). See the [post scheduler](/features/twitter-post-scheduler).",
            "**Evergreen recycling (Premium)**: your best posts go out again every N days (30 by default) with rotating variants, or are reposted.",
            "**Auto-plug (Premium)**: once a post takes off (50 likes by default), GrowX replies to it with your call to action.",
            "**Best time to post** from your own posts, plus a calendar, drafts and 52 templates.",
            "**GrowX AI (Premium)** writes, improves and threads posts on your own computer, with no API key.",
            "**Growth tools**: [smart auto follow](/features/twitter-auto-follow), an [unfollower tracker](/features/twitter-unfollower-tracker), reply targets and cleanup.",
          ),
          p("Posting has its own safety rules: a daily cap (20 by default), a minimum gap of 5 minutes and a pause on any warning from X. The free plan keeps up to 10 posts waiting at once; Premium removes the limit."),
          note("One honest difference: GrowX posts from your own Chrome, so the computer has to be on with Chrome open at the scheduled time. A post that would go out more than 6 hours late is never posted by itself; it waits as missed."),
        ],
      },
      {
        id: "others",
        heading: "Other options, by job",
        blocks: [
          ul(
            "**Typefully**: a writing and scheduling app built around threads, good if drafting is the part you care most about. We compare it in [Typefully vs Tweet Hunter vs GrowX](/blog/typefully-vs-tweet-hunter).",
            "**Tweet Hunter**: an X writing and scheduling suite known for its library of popular posts and automation features.",
            "**Buffer**: a calendar for many networks with a free plan, fine if X is one channel among several.",
            "**X's own composer**: it can schedule single posts, enough for occasional use.",
          ),
          p("Check each vendor's site for current features and prices; they change often."),
        ],
      },
      {
        id: "evergreen",
        heading: "How to choose posts for an evergreen queue",
        blocks: [
          p("Evergreen recycling only works if the posts deserve a second life. Before you move a big evergreen library across, prune it:"),
          ul(
            "**Pick posts that aged well**: how-tos, frameworks, lists and lessons, not news, dates or replies to a moment.",
            "**Use your numbers.** Keep posts that beat your usual engagement rate; drop the rest. The free [engagement rate calculator](/tools/twitter-engagement-rate-calculator) helps you compare fairly.",
            "**Write variants.** Two or three openings for the same idea keep regular followers from seeing the exact same text again.",
            "**Leave a long gap.** A month or more between repeats is a sensible starting point, so new followers see it and older ones have forgotten it.",
            "**Retire tired posts.** If a recycled post performs much worse than the first time, take it out of the loop.",
          ),
        ],
      },
      {
        id: "move",
        heading: "How to move your Hypefury routine to GrowX",
        blocks: [
          ol(
            "Install GrowX, open x.com in the same Chrome profile and finish the setup wizard.",
            "Set your queue slots in **Create** to the times you used in Hypefury.",
            "Copy your best evergreen posts into GrowX. Use [analytics](/features/twitter-analytics) after a few weeks to pick which ones deserve evergreen slots.",
            "Turn on evergreen recycling and auto-plug in the 30-day Premium trial and set the like threshold that suits your account.",
            "Queue a week of posts, then add growth: a few source accounts in your niche on the Safe or Balanced pace.",
          ),
          p(TRY),
        ],
      },
    ],
    faq: [
      { q: "Does Hypefury still work with X?", a: "Hypefury's pricing page says it no longer supports X and lists Bluesky, Threads, LinkedIn, Instagram and TikTok instead. Check hypefury.com for its current position." },
      { q: "What is the best Hypefury alternative for X?", a: "If you used Hypefury for a queue, evergreen posts and auto-plugs on X, GrowX covers all three (evergreen and auto-plug are Premium) and adds auto follow, analytics, an unfollower tracker and an on-device AI writer." },
      { q: "Is there a free Hypefury alternative?", a: "GrowX has a free plan forever with the scheduler (up to 10 posts waiting), best time to post, 52 templates and analytics for your latest 30 posts. Evergreen recycling and auto-plug are part of Premium, which you can try free for 30 days." },
      { q: "Does GrowX post when my computer is off?", a: "No. GrowX posts through your signed-in x.com tab in Chrome, so Chrome must be running. A post more than 6 hours late is never posted by itself and waits for you as missed." },
    ],
  },
  {
    slug: "typefully-vs-tweet-hunter",
    seoTitle: "Typefully vs Tweet Hunter vs GrowX: X Tools Compared",
    title: "Typefully vs Tweet Hunter vs GrowX: Which X (Twitter) Tool Fits You in 2026?",
    description:
      "Typefully vs Tweet Hunter vs GrowX compared on writing, scheduling, AI, growth, analytics and privacy, with a simple way to pick the right X tool for you.",
    excerpt:
      "Three popular X tools, three different jobs: a writing app, an X content suite and a growth extension. Here is how they compare and how to choose.",
    category: "Guides",
    keywords: [
      "Typefully vs Tweet Hunter",
      "Typefully alternative",
      "Tweet Hunter alternative",
      "best Twitter tool 2026",
      "X scheduling tool comparison",
      "Twitter growth tool comparison",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 8,
    related: ["circleboom-alternatives", "hypefury-alternatives", "best-twitter-growth-tools"],
    sections: [
      {
        id: "short",
        heading: "The short answer",
        blocks: [
          p("These three tools are often compared, but they are built for different jobs:"),
          ul(
            "**Typefully** is a writing and scheduling app. Its strength is a calm editor for posts and threads, drafts and scheduling, with support for several networks besides X.",
            "**Tweet Hunter** is an X content suite. It is known for a large library of popular posts for inspiration, AI writing, scheduling and automation.",
            "**GrowX** is a Chrome extension for growing on X. It combines smart auto follow, a scheduler, an on-device AI writer, analytics, an unfollower tracker, reply targets and cleanup.",
          ),
          p("Pick Typefully if writing is the job. Pick Tweet Hunter if you want an inspiration library and an all-in-one content suite. Pick GrowX if you want to grow your audience and handle daily X work in one inexpensive tool on your desktop."),
        ],
      },
      {
        id: "writing",
        heading: "Writing and scheduling",
        blocks: [
          p("All three let you write posts and threads and schedule them. Typefully is the most writing-focused, which suits people who draft long threads and care about the editor itself. Tweet Hunter pairs its editor with a library of popular posts to borrow structures from."),
          p("GrowX's composer counts characters the way X does, splits threads up to 25 parts, adds up to 4 images, and posts now, at a time you pick, or into queue slots. It suggests your **best time to post** from your own numbers and includes 52 templates. Premium adds unlimited scheduling, evergreen recycling and auto-plug. See the [post scheduler](/features/twitter-post-scheduler)."),
        ],
      },
      {
        id: "ai",
        heading: "AI writing and privacy",
        blocks: [
          p("Typefully and Tweet Hunter offer AI writing help in their web apps; check each for what is included in which plan."),
          p("**GrowX AI** (Premium) works differently: it runs on your own computer using the AI model built into Chrome. Your drafts are not sent to GrowX, there is no API key, and when the model isn't available the buttons fall back to templates. It writes, improves, finds hooks, turns notes into threads and suggests replies. See the [GrowX AI writer](/features/ai-tweet-writer)."),
        ],
      },
      {
        id: "growth",
        heading: "Growth: the biggest difference",
        blocks: [
          p("Typefully and Tweet Hunter help you publish better content. Neither is built to find and follow new people for you."),
          p("That is GrowX's core. [Smart auto follow](/features/twitter-auto-follow) follows the newest followers of accounts in your niche, ranks everyone else by a follow-back score from 1 to 99, and works at a human pace with random delays, breaks and caps. [List follow](/features/twitter-list-follow) follows exactly the accounts on your own list. Reply targets surface fresh posts from big accounts so you can reply early, and Cleanup finds accounts that don't follow back."),
          note("No tool can promise zero risk on X. GrowX slows down by itself after any warning from X and stops completely if your account needs attention."),
        ],
      },
      {
        id: "analytics",
        heading: "Analytics",
        blocks: [
          p("All three show post performance. GrowX focuses on what to do next: views, likes, reposts, replies, bookmarks and engagement rate for your recent posts, which topics and formats work, and on Premium which posts brought followers and a weekly report. Its [unfollower tracker](/features/twitter-unfollower-tracker) shows who followed and unfollowed you each day."),
        ],
      },
      {
        id: "pick",
        heading: "Which one should you pick?",
        blocks: [
          p("Answer these four questions honestly and the choice usually makes itself:"),
          ol(
            "**Is your main problem writing or reach?** If you struggle to write, a writing-first app helps. If you write fine but nobody sees it, you need growth tools: following the right people, replying early and posting at your best times.",
            "**Do you post to several networks?** Typefully supports networks besides X. GrowX is built only for X.",
            "**Do you want an inspiration library?** Tweet Hunter is known for one. GrowX offers 52 templates and an AI writer that works from your own niche and voice instead.",
            "**How much do you want to spend?** Compare a full year, not one month. GrowX's free plan covers a lot, and yearly Premium is $14.99. For the others, check their current pricing pages.",
          ),
        ],
      },
      {
        id: "how",
        heading: "How each one runs, and what it costs",
        blocks: [
          ul(
            "**Typefully and Tweet Hunter** are web apps that connect to your X account and post from their servers, so posts go out while your computer is off.",
            "**GrowX** works inside the x.com tab you are already signed in to, never asks for your X password and keeps your data in your browser. Scheduled posts need Chrome running at the time.",
          ),
          p("GrowX has a free plan forever, and Premium costs $1.99 for 30 days, $14.99 for 365 days or $59.99 lifetime, prepaid with no automatic renewal. Typefully and Tweet Hunter sell subscription plans; check their pricing pages for current prices."),
          p("Many creators combine tools: a writing app for drafting and GrowX for growth and daily X work. " + TRY),
        ],
      },
    ],
    faq: [
      { q: "Is Typefully or Tweet Hunter better?", a: "They suit different people. Typefully is focused on writing and scheduling across several networks; Tweet Hunter is an X content suite with an inspiration library and automation. Try both with your own drafts." },
      { q: "What is a good Typefully alternative for growth?", a: "If you want to grow your audience, not only publish, GrowX adds smart auto follow, List follow, reply targets, an unfollower tracker and cleanup on top of a scheduler and an on-device AI writer." },
      { q: "Is there a free alternative to Tweet Hunter?", a: "GrowX has a free plan forever with Safe and Balanced auto follow, the scheduler with up to 10 posts waiting, analytics for your latest 30 posts and 52 templates. Every Premium feature can be tried free for 30 days." },
      { q: "Can I use GrowX together with Typefully?", a: "Yes. Just let only one tool post a given post, so nothing goes out twice." },
    ],
  },
  {
    slug: "how-to-get-verified-on-twitter",
    seoTitle: "How to Get Verified on Twitter (X): The Blue Check",
    title: "How to Get Verified on Twitter (X): How the Blue Checkmark Works and Whether It's Worth It",
    description:
      "How to get verified on Twitter (X): what the blue checkmark requires, why it can disappear, what it does and doesn't mean, and whether it helps you grow.",
    excerpt:
      "Verification on X is now tied to a paid subscription and a review. Here is what X says you need, what makes the checkmark disappear and whether it is worth it for growth.",
    category: "Guides",
    keywords: [
      "how to get verified on Twitter",
      "blue checkmark X",
      "get verified on X",
      "Twitter verification",
      "X Premium checkmark",
      "verified badge Twitter",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 7,
    related: ["twitter-bio-ideas", "personal-branding-on-twitter", "how-to-grow-on-twitter-x"],
    sections: [
      {
        id: "how-it-works",
        heading: "How verification works on X today",
        blocks: [
          p("The old Twitter verified badge, given to notable accounts after an application, is gone. On X today, the **blue checkmark** is tied to a paid subscription. According to X's Help Center, only accounts actively subscribed to X Premium are eligible for it, and the checkmark appears after X reviews the account against its eligibility criteria."),
          p("X has more than one paid tier, and not every tier includes the checkmark. X also changes the names, prices and contents of its plans from time to time, so check the current details on X before you subscribe."),
          note("Gold checkmarks are for organisations in X's Verified Organizations programme, and grey checkmarks for government and multilateral accounts. This guide is about the blue checkmark for individuals."),
        ],
      },
      {
        id: "steps",
        heading: "How to get the blue checkmark, step by step",
        blocks: [
          ol(
            "**Complete your profile first**: a clear profile photo, a display name and a [bio](/blog/twitter-bio-ideas) that says who you are. A finished profile also helps the review.",
            "**Confirm a phone number** on your account. X's Premium page says subscribers need a verified phone number.",
            "**Subscribe to a tier that includes the checkmark**, from the Premium option in X's menu.",
            "**Wait for the review.** The checkmark appears once X confirms the account meets its criteria.",
            "**Avoid profile changes during and after the review.** Changing your profile photo, display name or username removes the checkmark until the account is reviewed again.",
          ),
          p("X can remove a checkmark at any time, including from accounts that break the X Rules."),
        ],
      },
      {
        id: "mistakes",
        heading: "Common verification mistakes",
        blocks: [
          ul(
            "**Changing your name right after subscribing.** A new display name, photo or handle sends the account back into review, and the checkmark disappears until it passes.",
            "**An impersonating or misleading profile.** Accounts that look like someone else, or a brand they don't represent, can be refused or lose the checkmark.",
            "**An empty profile.** No photo, no bio and no recent posts make the review harder and the badge less meaningful to visitors.",
            "**Expecting instant reach.** The checkmark doesn't make weak posts strong. Use it as a credibility signal while you keep improving your posts and replies.",
            "**Letting the subscription lapse.** The checkmark depends on an active subscription that includes it.",
          ),
          p("Before you subscribe, run through a quick checklist: final display name and handle, a clear photo, a bio with your niche, a pinned post that shows your best work and a confirmed phone number. Our guides to [Twitter bio ideas](/blog/twitter-bio-ideas) and [pinned tweet ideas](/blog/pinned-tweet-ideas) help with the profile."),
        ],
      },
      {
        id: "meaning",
        heading: "What the checkmark does and doesn't mean",
        blocks: [
          p("X's Help Center is clear that the blue checkmark **does not mean the account has been ID verified**. It means the account has an active subscription and passed X's review. Some people find it adds credibility; others pay it no attention. Treat it as one signal among many on your profile, not proof of authority."),
          p("Paid plans also add features beyond the checkmark, such as editing posts and writing long posts, and X gives subscribers' replies a higher place in conversations to varying degrees by tier. What each tier includes changes, so compare the list on X itself."),
        ],
      },
      {
        id: "worth-it",
        heading: "Is getting verified worth it for growth?",
        blocks: [
          p("It depends on how you use X. A subscription can help if you reply a lot, because replies are where many accounts are discovered, and if you write long posts. It will not fix a profile nobody understands or posts nobody wants to read."),
          ul(
            "**Worth trying** if you post daily, reply to bigger accounts often and want long posts.",
            "**Probably not yet** if you post a few times a month or haven't found your [niche](/blog/how-to-find-your-niche-on-twitter).",
          ),
          p("Measure it. Note your views, replies and new followers for two weeks before and after, ideally with the free [engagement rate calculator](/tools/twitter-engagement-rate-calculator), and decide on numbers, not on the badge."),
        ],
      },
      {
        id: "growx",
        heading: "Where GrowX fits for verified accounts",
        blocks: [
          p("If your account has X Premium, GrowX offers an **X Premium pace** (about 800 follows a day, Premium in GrowX) for [smart auto follow](/features/twitter-auto-follow), meant only for accounts with X's own Premium subscription, and its composer supports long posts of up to 25,000 characters for X Premium accounts. Every pace keeps the same safety rules: random delays, breaks, hourly and daily caps and a slow-down after any X warning."),
          p(TRY),
        ],
      },
    ],
    faq: [
      { q: "Can I get verified on Twitter for free?", a: "No. On X, the blue checkmark is tied to an active paid subscription that includes it, plus a review of the account." },
      { q: "Why did my blue checkmark disappear?", a: "Changing your profile photo, display name or username removes it until X reviews the account again. X can also remove it at any time, for example for breaking the X Rules, or when a subscription ends." },
      { q: "Does the blue check mean I'm ID verified?", a: "No. X's Help Center says the checkmark does not mean the account has been ID verified." },
      { q: "Does verification help me grow on X?", a: "It can help accounts that reply and post often, but it is not a substitute for a clear niche and good posts. Measure your numbers before and after to decide." },
    ],
  },
  {
    slug: "twitter-engagement-groups",
    seoTitle: "Twitter Engagement Groups (Pods): Do They Work on X?",
    title: "Twitter Engagement Groups and Pods: Do They Work on X, and What to Do Instead",
    description:
      "Twitter engagement groups and pods promise quick likes and replies. Here is how they work, the risks under X's rules, and better ways to earn real engagement.",
    excerpt:
      "Engagement groups trade likes and replies to game the algorithm. They can look like they work for a week. Here is why they backfire and what works better.",
    category: "Engage",
    keywords: [
      "Twitter engagement groups",
      "engagement pods Twitter",
      "X engagement group",
      "Telegram engagement group Twitter",
      "do engagement pods work",
      "real engagement on X",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 6,
    related: ["how-to-increase-twitter-engagement", "twitter-reply-strategy", "follow-for-follow-twitter"],
    sections: [
      {
        id: "what",
        heading: "What an engagement group is",
        blocks: [
          p("An **engagement group** (or engagement pod) is a group of accounts, usually organised in a Telegram or Discord chat or a group DM, that agree to like, reply to and repost each other's posts. Members drop a link when they post, and everyone is expected to engage within minutes, so the post looks popular early and, the idea goes, gets pushed to more people."),
          p("It is the posting version of [follow for follow](/blog/follow-for-follow-twitter): attention traded between accounts, not earned from an audience."),
        ],
      },
      {
        id: "why-not",
        heading: "Why engagement groups backfire",
        blocks: [
          ul(
            "**X's rules.** X's platform manipulation and spam policy covers coordinated activity meant to artificially boost engagement. Groups built around trading likes and replies sit squarely in that territory and can lead to limits on the accounts involved.",
            "**Wrong audience.** The people engaging are other members, not people who care about your topic. Recommendations learn from who engages, so you can end up being shown to more accounts that never become followers or customers.",
            "**Empty replies.** \"Great post!\" from strangers in other niches is easy to spot and makes a post look less credible, not more.",
            "**A treadmill.** You owe likes on dozens of posts a day, which eats the time you could spend writing or replying where it matters.",
            "**Misleading numbers.** Your analytics stop telling you what your real audience likes, so you lose the feedback that helps you improve.",
          ),
        ],
      },
      {
        id: "spot",
        heading: "How to spot an engagement group, and how to leave one",
        blocks: [
          p("Groups don't always call themselves pods. Common signs: a chat where members drop links to their posts, rules about engaging with everyone within a set time, lists of \"rounds\" or \"trains\", or invites to reply with a set phrase. If engagement is owed rather than given, it is a pod."),
          p("If you are already in one, leave quietly and reset your habits:"),
          ol(
            "Stop dropping links and stop engaging out of obligation.",
            "Expect your numbers to dip for a while. That dip shows you your real audience, which is the baseline you can grow from.",
            "Spend the time you saved on replies to bigger accounts in your niche and on better posts.",
            "Look at **top fans** in your analytics: the people who engaged with you before the pod are the ones worth looking after.",
          ),
          p("If X has shown you a warning or you suspect a limit, run the free [shadowban checker](/tools/twitter-shadowban-checker) from a second account and read [how to fix a shadowban](/blog/twitter-shadowban)."),
        ],
      },
      {
        id: "instead",
        heading: "What works better than an engagement group",
        blocks: [
          ol(
            "**Reply early to bigger accounts in your niche.** A thoughtful reply in the first minutes of a popular post reaches that account's audience. See our [reply strategy](/blog/twitter-reply-strategy).",
            "**Build real peer circles.** A handful of people in the same niche who genuinely read each other and comment when they have something to add. The difference from a pod is that nobody is obliged and nothing is coordinated.",
            "**Post at your best times** so your real followers see you while they are online.",
            "**Write posts that invite replies**: questions, opinions and specific stories from your own experience.",
            "**Join X Communities** for your topic and contribute there. See our [X Communities guide](/blog/x-communities-guide).",
          ),
        ],
      },
      {
        id: "circle",
        heading: "Peer circle or pod? The difference",
        blocks: [
          p("Supporting people you like is normal and healthy. The line is crossed when engagement becomes an obligation or is coordinated to manipulate reach. A quick test:"),
          ul(
            "**Peer circle**: a few people in your niche who read each other because they want to, reply when they have something to add and say nothing when they don't.",
            "**Pod**: a group where you must like or reply to every link, often within minutes, whatever the post says and whoever wrote it.",
          ),
          p("A peer circle makes your feed better and your replies more honest. A pod turns engagement into a chore and your numbers into noise. If a group asks you to engage on a schedule, treat it as a pod."),
        ],
      },
      {
        id: "growx",
        heading: "How GrowX helps you earn real engagement",
        blocks: [
          ul(
            "**Reply targets** list fresh posts (younger than 120 minutes by default) from your sources, VIPs and anyone you add, ranked by freshness and how fast they take off, so you can reply early. Nothing is sent unless you press the button.",
            "**Best time to post** builds a heat map from your own posts and when your followers are active.",
            "**Analytics** show which topics and formats get real engagement, so you write more of what works.",
            "**Top fans** shows who likes and replies to you most: the real peer circle worth looking after.",
          ),
          p("See [reply targets](/features/twitter-reply-targets) and [analytics](/features/twitter-analytics). " + TRY),
        ],
      },
    ],
    faq: [
      { q: "Do Twitter engagement groups work?", a: "They can make a post look busier for a short time, but the engagement comes from the wrong people, X's rules on platform manipulation cover coordinated engagement, and your analytics stop reflecting your real audience." },
      { q: "Are engagement pods against X's rules?", a: "X's platform manipulation and spam policy covers coordinated activity meant to artificially inflate engagement. Groups built around trading likes and replies fall into that area, and accounts involved risk limits." },
      { q: "What is the fastest real way to get engagement on X?", a: "Reply early and thoughtfully to popular posts in your niche, post when your followers are online, and write posts that invite a response." },
      { q: "Does GrowX like or reply automatically?", a: "No. Replies and likes from GrowX's Engage page are only sent when you press the button, and GrowX never sends direct messages." },
    ],
  },
  {
    slug: "how-to-find-your-niche-on-twitter",
    seoTitle: "How to Find Your Niche on Twitter (X): A Simple Method",
    title: "How to Find Your Niche on Twitter (X): A Simple Method to Choose What to Post About",
    description:
      "How to find your niche on Twitter (X): a simple four-step method, niche ideas, how narrow to go and how to test a niche in two weeks before committing to it.",
    excerpt:
      "Accounts with a clear niche grow faster because people know what they get when they follow. Here is a simple way to choose yours and test it before you commit.",
    category: "Guides",
    keywords: [
      "how to find your niche on Twitter",
      "Twitter niche ideas",
      "choose a niche on X",
      "niche account Twitter",
      "what to tweet about",
      "grow a niche on X",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 7,
    related: ["how-to-grow-on-twitter-x", "tweet-ideas", "personal-branding-on-twitter"],
    sections: [
      {
        id: "why",
        heading: "Why a niche matters on X",
        blocks: [
          p("People follow an account for a reason: they expect more of something they liked. If your last ten posts are about ten different things, a visitor can't tell what they would get by following you. A **niche** answers that question in one glance."),
          p("A niche also makes everything else easier: you know which big accounts to reply to, which [bio](/blog/twitter-bio-ideas) to write, which hashtags matter and which accounts to use as sources for growth."),
          p("If you are torn between two topics, pick the one where you already have stories and results to share. Experience is easier to post about every day than research, and readers can tell the difference. You can always add the second topic later as a neighbouring theme."),
        ],
      },
      {
        id: "method",
        heading: "A four-step method to find your niche",
        blocks: [
          ol(
            "**List what you know.** Write down ten topics you could talk about for an hour: your job, a skill, a hobby, something you are learning.",
            "**Mark what you'd enjoy posting about weekly for a year.** Consistency beats brilliance on X, so boredom kills niches faster than competition.",
            "**Check the audience.** Search each topic on X. Are there active accounts and conversations? Do posts get replies? A topic with no conversation is hard to grow in.",
            "**Find your angle.** Combine a topic with who you are or who you help: \"design for indie founders\", \"personal finance for nurses\", \"learning Japanese after 40\". The combination is what makes you memorable.",
          ),
        ],
      },
      {
        id: "narrow",
        heading: "How narrow should a niche be?",
        blocks: [
          p("Narrow enough that a stranger understands it in one line, broad enough that you can post daily without repeating yourself. \"Marketing\" is too broad; \"Notion templates for therapists\" may be too narrow to post about every day. A useful middle is **one main topic plus one or two neighbouring ones** you mention now and then."),
          p("Your niche can evolve. Many accounts start narrow, grow an audience and widen slowly as followers come to trust them."),
        ],
      },
      {
        id: "ideas",
        heading: "Niche ideas that work well on X",
        blocks: [
          ul(
            "Building in public: products, side projects, revenue and lessons. See [build in public](/blog/build-in-public-on-twitter).",
            "Career and skills: design, writing, programming, sales, recruiting.",
            "Money: investing basics, budgeting, freelancing rates.",
            "Learning journeys: languages, fitness, a new craft, documented week by week.",
            "Local or language communities: your city, your country's tech scene, or creators in your language. See [growing on X in your own language](/blog/grow-on-twitter-in-your-language).",
          ),
        ],
      },
      {
        id: "test",
        heading: "Test a niche in two weeks",
        blocks: [
          ol(
            "Post at least once a day for two weeks about the niche, mixing how-tos, stories and questions.",
            "Reply to five posts a day from bigger accounts in the niche.",
            "Track views, engagement rate and new followers per post.",
            "Keep the niche if posts get more engagement and followers as the weeks go on. Adjust the angle if they don't.",
          ),
          p("The free [engagement rate calculator](/tools/twitter-engagement-rate-calculator) helps you compare posts fairly."),
        ],
      },
      {
        id: "working",
        heading: "Signs your niche is working",
        blocks: [
          ul(
            "Strangers reply with questions or their own experience, not just likes.",
            "New followers' bios match your niche: they are the people you wanted to reach.",
            "Bigger accounts in your niche start to recognise you, reply back or repost you.",
            "You have more post ideas than time, because every conversation gives you another.",
            "Your engagement rate holds steady or rises as your follower count grows.",
          ),
          p("If, after a month, your new followers are a random mix and posts get little response, the topic may be fine but the angle too vague. Make it more specific before you abandon it."),
        ],
      },
      {
        id: "mistakes",
        heading: "Common niche mistakes",
        blocks: [
          ul(
            "**Chasing whatever is trending.** Trends bring views, not followers who stay. Comment on trends only through your niche's lens.",
            "**Copying a big account's niche exactly.** Use your own experience and angle; that is what makes people follow you instead of them.",
            "**Switching every few weeks.** Give a niche at least a month of steady posting before you judge it.",
            "**Hiding the niche.** Put it in your bio, your pinned post and your display name if it fits, so visitors see it in one glance.",
            "**Only posting, never replying.** In a new niche, replies to established accounts are how people find you.",
          ),
        ],
      },
      {
        id: "growx",
        heading: "Grow your niche with GrowX",
        blocks: [
          p("Once you know your niche, GrowX turns it into a routine. Add a few accounts in your niche as **sources**, or press **Find sources for me**, and [smart auto follow](/features/twitter-auto-follow) follows their newest followers, people already interested in your topic. **Reply targets** list fresh posts from big niche accounts to reply early, and **analytics** show which topics within your niche work best. " + TRY),
        ],
      },
    ],
    faq: [
      { q: "Do I need a niche to grow on Twitter?", a: "It is not required, but a clear niche makes it much easier for strangers to decide to follow you and for you to find the right people to reply to and follow." },
      { q: "Can I have more than one niche?", a: "Yes, but keep one main topic and one or two neighbouring ones. Too many unrelated topics make it hard for people to know what they get by following." },
      { q: "How long should I test a niche?", a: "Two weeks of daily posting and replying is usually enough to see whether engagement and new followers trend up." },
      { q: "How does GrowX use my niche?", a: "Source accounts in your niche decide who smart auto follow targets, reply targets show posts from big accounts in your niche, and GrowX AI uses your niche and voice settings when writing." },
    ],
  },
  {
    slug: "how-to-build-a-twitter-follow-list",
    seoTitle: "How to Build a Twitter Follow List and Follow It Safely",
    title: "How to Build a Twitter Follow List (CSV or Pasted) and Follow It Safely on X",
    description:
      "How to build a list of X (Twitter) accounts worth following, format it as a CSV or plain list, and follow every account safely with GrowX List follow.",
    excerpt:
      "Sometimes you already know exactly who you want to follow: speakers, community members, customers. Here is how to build that list and follow it at a safe pace.",
    category: "Guides",
    keywords: [
      "Twitter follow list",
      "follow a list of Twitter accounts",
      "bulk follow from CSV",
      "import usernames to follow",
      "follow list X",
      "list follow tool",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 7,
    related: ["bulk-follow-twitter-safely", "twitter-lists-guide", "mass-follow-twitter-limits"],
    sections: [
      {
        id: "when",
        heading: "When a follow list beats auto follow",
        blocks: [
          p("Auto follow tools find people for you. A **follow list** is the opposite: you already know who you want to follow, and you want to follow exactly those accounts. Good reasons:"),
          ul(
            "Speakers, sponsors and attendees of an event you went to.",
            "Members of a community, course or mastermind you belong to.",
            "Customers, clients or newsletter readers who shared their handles with you.",
            "People a colleague recommended, or experts you collected while researching a topic.",
          ),
        ],
      },
      {
        id: "build",
        heading: "How to build a good follow list",
        blocks: [
          ol(
            "**Start from a real connection.** An event, a community, your customers. People are more likely to follow back someone they have something in common with.",
            "**Collect handles you are allowed to use**: from public speaker pages, a community's member directory, or handles people gave you themselves.",
            "**Keep it relevant.** Fifty accounts that share your niche beat five hundred random ones.",
            "**Check a few profiles.** Skip accounts that look inactive or unrelated before you follow.",
            "**Save the list** as a spreadsheet, a CSV export or a plain text file, one handle per line.",
          ),
          note("X Lists are a different thing: a way to read a group of accounts without following them. See our [X Lists guide](/blog/twitter-lists-guide)."),
        ],
      },
      {
        id: "format",
        heading: "How to format the list",
        blocks: [
          p("GrowX's List follow is forgiving about format. All of these work:"),
          ul(
            "One username per line, with or without the @.",
            "Names separated by spaces, commas or semicolons.",
            "Profile and post links: `x.com/name` and `twitter.com/name/status/1` both become `name`.",
            "A **CSV file** with a column of usernames; GrowX finds the right column.",
            "A pasted post or bio: GrowX takes only its @mentions and profile links, not every word.",
          ),
          p("Duplicates are removed, all-number tokens are skipped because they are usually IDs, and links to pages that aren't accounts are ignored."),
        ],
      },
      {
        id: "follow",
        heading: "How to follow the list safely",
        blocks: [
          p("Following hundreds of accounts in one sitting is exactly the kind of burst X watches for. Spread it out:"),
          ul(
            "Follow at a human pace with random delays and breaks, not as fast as possible.",
            "Respect daily limits. X caps how many accounts you can follow per day and in total (5,000 for everyone, more as your followers grow). Check yours with the [follower ratio calculator](/tools/twitter-follower-ratio-calculator).",
            "Stop if X shows any warning, and give it a day.",
            "Engage with the people you follow: reply to a post or two, so the follow means something.",
          ),
          p("More on safe pacing in [how to bulk follow on X safely](/blog/bulk-follow-twitter-safely)."),
        ],
      },
      {
        id: "after",
        heading: "After you follow: turn follows into relationships",
        blocks: [
          p("A follow is a light introduction. What happens next decides whether it turns into a follow-back, a conversation or a customer:"),
          ol(
            "**Engage within a few days.** Reply to a recent post with something specific; a like alone is easy to miss.",
            "**Tag people in your notes.** In GrowX's **People** list you can add tags and notes, mark VIPs and see mutuals, so you remember where you met someone.",
            "**Reply early to their new posts.** Add your most important accounts as reply targets or VIPs so their fresh posts show up for you.",
            "**Post for them.** If your list is from an event, share your takeaways and mention the speakers; if it is a community, post about what that community cares about.",
          ),
        ],
      },
      {
        id: "healthy",
        heading: "Keep your following healthy",
        blocks: [
          p("Following a list adds to your following count, and X caps how many accounts you can follow relative to your followers. Every few weeks, check who never followed back or went inactive and tidy up at a safe pace. GrowX **Cleanup** scans for accounts that are not following back or have been inactive for 30 to 365 days, and unfollows the ones you select, up to 30 an hour and 200 a day, re-checking each account first. See the [unfollow tool](/features/twitter-unfollow-tool)."),
        ],
      },
      {
        id: "growx",
        heading: "Follow your list with GrowX List follow",
        blocks: [
          p("[List follow](/features/twitter-list-follow), new in GrowX 2.4.6, follows exactly the accounts on your list. Open List follow in the dashboard, paste the names or upload or drop a CSV or TXT file, and press Start."),
          ul(
            "Same pace presets and safety as the autopilot, and only one of the two runs at a time.",
            "Every account is marked followed, requested (protected accounts), skipped with the reason, or failed. Retry and export any time.",
            "Stop keeps your progress; Start carries on where you left off.",
            "Free: lists of 50 accounts at a time. Premium: lists of up to 5,000.",
          ),
          p(TRY),
        ],
      },
    ],
    faq: [
      { q: "Can I follow a list of Twitter accounts from a CSV?", a: "Yes. GrowX List follow accepts a CSV or TXT file (upload or drop it) or pasted names and links, and follows exactly those accounts at your pace." },
      { q: "How many accounts can I follow from a list?", a: "On GrowX's free plan, 50 at a time; on Premium, lists of up to 5,000. Daily caps still apply, so a long list is followed over several days." },
      { q: "Is following a list safe?", a: "Following at a human pace with breaks and daily caps, and stopping after any warning, keeps risk low, but no tool can promise zero risk on X." },
      { q: "What is the difference between an X List and a follow list?", a: "An X List lets you read a group of accounts without following them. A follow list is a set of accounts you actually want to follow." },
    ],
  },
  {
    slug: "grow-on-twitter-in-your-language",
    seoTitle: "How to Grow on X (Twitter) in Your Own Language",
    title: "How to Grow on X (Twitter) in Your Own Language: A Guide for Non-English Creators",
    description:
      "How to grow on X (Twitter) when you post in Spanish, Portuguese, Hindi, Arabic or any language besides English: audience, timing, hashtags, replies and tools.",
    excerpt:
      "Posting in your own language is an advantage, not a handicap. Here is how to grow on X in Spanish, Portuguese, Hindi, Japanese or any other language.",
    category: "Guides",
    keywords: [
      "grow on Twitter in Spanish",
      "Twitter growth non-English",
      "grow on X in your language",
      "multilingual Twitter account",
      "Twitter growth tool in Spanish",
      "post in two languages on X",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 7,
    related: ["how-to-grow-on-twitter-x", "best-time-to-post-on-twitter", "how-to-find-your-niche-on-twitter"],
    sections: [
      {
        id: "advantage",
        heading: "Your language is an advantage",
        blocks: [
          p("Most growth advice is written for English-speaking accounts, so it is easy to assume you have to post in English to grow. Often the opposite is true. In your own language there are fewer accounts competing for attention in your niche, readers feel more connected to someone who writes like them, and you sound like yourself."),
          p("The basics of [growing on X](/blog/how-to-grow-on-twitter-x) stay the same in any language. What changes is who you reply to, when you post and how you mix languages."),
        ],
      },
      {
        id: "one-or-two",
        heading: "One language or two?",
        blocks: [
          p("Pick a **main language** and stick to it for most posts, so new visitors know what to expect. Some ways to mix:"),
          ul(
            "**One account, one language**: simplest and usually best for growth.",
            "**Main language plus occasional English** for posts aimed at a global audience, such as a launch or a big milestone.",
            "**Two accounts** if you truly want two audiences, each with its own niche and language.",
          ),
          p("Avoid posting every post twice in two languages on the same account. It doubles your output without helping either audience."),
        ],
      },
      {
        id: "audience",
        heading: "Find the audience that speaks your language",
        blocks: [
          ol(
            "**Search your niche in your language** and note which accounts lead the conversation. These are your reply targets and growth sources.",
            "**Use the hashtags your audience uses**, which are often different from the English ones. Keep to one or two. See our [hashtags guide](/blog/twitter-hashtags-guide).",
            "**Join X Communities** in your language and contribute there.",
            "**Reply early** to the biggest accounts in your language: replies are where new readers discover you.",
          ),
        ],
      },
      {
        id: "timing",
        heading: "Post when your audience is awake",
        blocks: [
          p("Your audience may live in different time zones from you, especially for languages spoken across continents, such as Spanish, Portuguese or Arabic. Generic best-time charts are based on mixed audiences, so build your own: post at different times for two weeks and compare. See [best time to post on Twitter](/blog/best-time-to-post-on-twitter)."),
          p("If your audience is split across regions, find the overlap: a morning post in one region can land in the evening of another. Queue slots make this easy: set them to your readers' best hours and new posts drop into the next free one. With GrowX, keep your computer on with Chrome open at those times, because it posts from your own browser."),
        ],
      },
      {
        id: "write",
        heading: "Write naturally, and let readers translate",
        blocks: [
          p("Write the way you speak to your audience, with your own expressions and examples. Readers who prefer another language can use X's own translation option on your posts, so you don't need to translate everything yourself."),
          p("Check character counts carefully: X counts most Chinese, Japanese and Korean characters, and most emoji, as two, so a post in those scripts holds roughly half as many characters as one in a Latin script. The free [tweet character counter](/tools/tweet-character-counter) counts exactly like X."),
        ],
      },
      {
        id: "profile",
        heading: "Make your profile clear in your language",
        blocks: [
          p("Your profile is where a visitor decides to follow, so write it for the audience you want:"),
          ul(
            "**Bio in your main language**, saying who you are and what you post about. Add a short English line only if you want an international audience too. See [Twitter bio ideas](/blog/twitter-bio-ideas).",
            "**A pinned post in your main language** that shows your best work or explains your account.",
            "**A display name people can type**, ideally in the script your audience uses, so they find you in search.",
            "**Location or language hints**, such as your city or country, help local readers recognise you.",
          ),
        ],
      },
      {
        id: "mistakes",
        heading: "Mistakes to avoid",
        blocks: [
          ul(
            "**Switching languages post by post.** Readers who followed for one language get confused and drift away.",
            "**Copying English trends word for word.** Adapt them to what your audience actually talks about, or skip them.",
            "**Following accounts that don't read your language.** Follow-backs and replies come from people who understand your posts, so use sources that post in your language.",
            "**Ignoring time zones.** A great post at 3 a.m. for your audience reaches almost nobody.",
            "**Machine-translating everything into English.** It rarely sounds natural and splits your attention between two audiences.",
          ),
        ],
      },
      {
        id: "growx",
        heading: "GrowX speaks your language too",
        blocks: [
          p("Since version 2.4.7, GrowX itself is available in 21 languages, including Español, Português (Brasil), Français, Deutsch, Türkçe, Русский, العربية, हिन्दी, Bahasa Indonesia, Filipino, Tiếng Việt, ไทย, 日本語, 한국어 and Chinese. It picks your browser's language by itself, Arabic reads right to left, and your own posts are never translated. See the full list in [what's new](/whats-new)."),
          p("Add accounts that post in your language as **sources**, and [smart auto follow](/features/twitter-auto-follow) follows their newest followers: people who read your language and care about your topic. **Best time to post** learns from your own posts and followers, wherever they live. " + TRY),
        ],
      },
    ],
    faq: [
      { q: "Can I grow on Twitter without posting in English?", a: "Yes. Posting in your own language often means less competition in your niche and a closer connection with readers. The growth basics, a clear niche, early replies and good timing, work in any language." },
      { q: "Should I post in two languages on one account?", a: "Usually it is better to pick one main language and add occasional posts in a second one, or to run two accounts for two audiences." },
      { q: "Does X count characters differently in some languages?", a: "Yes. Most Chinese, Japanese and Korean characters, and most emoji, count as two characters, so posts in those scripts fit about half as many characters." },
      { q: "Which languages is GrowX available in?", a: "21: English, Spanish, Portuguese (Brazil), French, German, Italian, Dutch, Polish, Turkish, Russian, Ukrainian, Arabic, Hindi, Indonesian, Filipino, Vietnamese, Thai, Japanese, Korean and Chinese (Simplified and Traditional)." },
    ],
  },
];
