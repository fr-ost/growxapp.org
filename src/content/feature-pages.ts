import type { FeaturePage } from "./feature-types";

/**
 * Feature landing pages (/features/<slug>), one per main search intent, in FEATURE_SLUGS order.
 * Every claim must match docs/PRODUCT_FACTS.md (extension v2.5.1). No invented statistics, user counts,
 * ratings, testimonials or result promises; screenshots use demo data and their numbers are never quoted.
 */
export const featurePages: FeaturePage[] = [
  {
    slug: "twitter-auto-follow",
    nav: "Smart auto follow",
    blurb: "Follow the newest followers of accounts in your niche, scored and paced like a person.",
    icon: "target",
    seoTitle: "Twitter Auto Follow Tool: Smart X Auto Follow Extension",
    description:
      "GrowX is a Twitter auto follow Chrome extension: it follows the newest followers of accounts in your niche, scored 1-99 for follow-back, at a human pace.",
    keywords: [
      "Twitter auto follow",
      "X auto follow tool",
      "auto follow Chrome extension",
      "auto follow on X",
      "Twitter follow back",
      "follow-back score",
      "Twitter growth tool",
      "GrowX",
    ],
    eyebrow: "X auto follow",
    h1: "Twitter auto follow that targets people likely to follow back",
    lead:
      "GrowX follows the newest followers of accounts in your niche, scores every candidate for follow-back likelihood and works through the queue one account at a time, with random delays, breaks and caps. It runs inside your own signed-in x.com session in Chrome.",
    image: { src: "/screens/grow-251.webp", alt: "GrowX Grow page with Find sources for me, the Slow (free forever), Balanced, Turbo, X Premium and Custom pace presets and safety badges" },
    highlights: [
      {
        title: "Sources and newest followers",
        text: "Add accounts your audience already follows. GrowX reads their newest followers: people who are active on X right now and interested in your topic.",
      },
      {
        title: "Find sources for me",
        text: "GrowX looks through the accounts you follow and ranks them by how active, mid-sized and follow-back-prone their audiences are.",
      },
      {
        title: "Follow-back score 1-99",
        text: "Queued candidates are scored on follow ratio, audience size, activity, account age, profile and bio. Below your minimum (55 by default), they are skipped.",
      },
      {
        title: "Human pace, built-in safety",
        text: "Random delays, breaks, hourly and daily caps, a slow-down after any X warning and an Alt+Shift+S emergency stop. Safety is never paywalled.",
      },
      {
        title: "Smart score from your results",
        text: "A small model learns from your own follow-backs and is blended in only when it clearly beats chance on held-out data.",
        premium: true,
      },
      {
        title: "More source types",
        text: "Follow people from a post's reposts, replies and likes, from searches and #hashtags, or from X Lists.",
        premium: true,
      },
    ],
    steps: [
      {
        title: "Add sources",
        text: "Paste a few accounts in your niche, or press **Find sources for me**. Good sources are mid-sized accounts whose followers are active and follow back. Three to five close matches are a good start. **Find people now** collects candidates right away.",
      },
      {
        title: "Set filters and pace",
        text: "Keep the default filters or tune them, start on the free Slow pace, and turn on active hours and warm-up if you want them.",
      },
      {
        title: "Start the autopilot",
        text: "Press Start in the popup. GrowX follows recent followers first, then the best-scored candidates, and verifies each follow as it goes.",
      },
    ],
    sections: [
      {
        heading: "How GrowX auto follow on Twitter finds the right people",
        paragraphs: [
          "Many auto follow tools follow whoever shows up in a search. GrowX starts from **source profiles**: accounts your ideal audience already follows. It reads each source's newest followers, because someone who followed a niche account minutes or hours ago is active right now and clearly interested in the topic. If you are not sure which sources to use, **Find sources for me** checks the accounts you already follow and ranks them by how active, mid-sized and follow-back-prone their audiences are.",
          "**Recent followers first**: the newest followers of each source (the top 50 of the list by default) are followed before anyone else. They skip the score but still pass the safety checks: no private accounts, no accounts without a photo or posts, no giant accounts and nothing that matches your exclude keywords. Everyone else goes into a queue of about 250 candidates sorted by score. Sources are re-read every hour and candidates older than 72 hours are dropped, so the queue stays fresh.",
          "With **Premium** you can add more source types: the people who reposted, replied to or liked a specific post, the results of a search or #hashtag, and the members of an X List. The replies under a popular post in your niche are a strong source, because those people are engaged with exactly your topic at that moment.",
        ],
      },
      {
        heading: "The follow-back score and filters",
        paragraphs: [
          "Each candidate gets a **follow-back score from 1 to 99**. It weighs the follow ratio, audience size, how many accounts they follow, follow-back words in the bio, recent activity, account age, photo and bio, verified status and how recently they followed the source. Queued candidates below your minimum (55 by default) are not followed; only the recent followers described above skip the score. The next section explains how to read and tune it.",
          "Before scoring, hard filters remove accounts you do not want: people you already follow or who already follow you, private accounts, accounts without a photo, and accounts outside your limits for followers (15 to 8,000 by default), following (at least 40), follow ratio (0.4), posts (5), account age (30 days) and last activity (45 days). Exclude keywords skip bios you want to avoid, boost words lift bios that talk about following back, and a never-follow list blocks specific accounts for good.",
          "The **smart score (Premium)** goes a step further. After roughly 80 settled follows with at least 12 follow-backs and 12 non-follow-backs, GrowX trains a small model on your own results, tests it on a holdout set and blends it in at up to 60% weight, but only when it clearly beats chance. Premium also adds include and location keywords, verified filters and importing a list of usernames to follow first.",
        ],
      },
      {
        heading: "How to read and tune the follow-back score",
        paragraphs: [
          "The score is an estimate, not a promise about any one account. Its job is to put likelier accounts first, so your follows go where they are most likely to pay off. An account scores higher when it follows many more people than follow it, or follows hundreds or thousands of accounts. A small or mid-sized audience, follow-back words in the bio and a recent post raise the score too. Very new accounts, long silence and a missing photo or bio lower it, and having followed the source recently adds a little.",
          "Picture two candidates from the same source. The first has a few hundred followers, follows about as many people, has a photo and a bio and posted two days ago. The second has a hundred thousand followers, follows almost nobody and last posted months ago. The first scores noticeably higher, because it looks like an active person who notices new followers. The second is unlikely to notice a follow, so it falls below the minimum and never enters your queue.",
          "The **minimum score** (55 by default) is your quality dial. Around 40 favours volume; around 70 favours quality and a smaller, cleaner queue. Because sources are re-read every hour, a stricter minimum mostly means fewer follows, not stale ones. Change it in small steps and give each change a few days. Then compare follow-back rates on the source leaderboard and in [Who followed back](/features/twitter-analytics) instead of judging by a single day. If most candidates from one source score low, the source is probably too broad or too large. Replacing it with a smaller, more specific community is usually a better fix than lowering the minimum.",
          "You can edit the boost words and the filters that run before scoring, such as an optional rule that requires a bio, or the exclude keywords, which skip adult terms by default. The scoring signals themselves are built in. With Premium, the smart score adapts them to your own results and switches on by itself once your history supports it. One note on names: the follow-back score rates other accounts, while the **Growth Score** in Analytics rates your own account from 0 to 100.",
        ],
      },
      {
        heading: "What the follow-back score cannot see",
        paragraphs: [
          "The score only knows what a public profile shows. It cannot tell whether someone is busy, buried in notifications or simply not interested in your topic, and it cannot see your profile through their eyes. That is why two accounts with the same settings can get very different follow-back rates. The one with a [clear bio](/blog/twitter-bio-ideas), a pinned post and recent useful posts turns more of the same visitors into followers.",
          "Following brings people to your profile; what they find there decides whether they follow back. So treat the score as a way to spend your daily follows sensibly, not as a forecast. If your follow-back rate stays low even with a high minimum score, look at your profile and posts first, or pick sources whose audience really overlaps with yours. Keep a few posts in the [post scheduler](/features/twitter-post-scheduler) queue and reply early to fresh posts with the [AI Reply Assistant](/features/twitter-reply-targets). The autopilot plus your own posts and replies tends to do more than any follow setting on its own.",
        ],
      },
      {
        heading: "Pace presets and safety controls",
        paragraphs: [
          "GrowX follows one account at a time from the extension's background, so it keeps working when the popup is closed and resumes after Chrome restarts. The pace preset sets the delay between follows, how often it rests and the rolling caps. **Slow** (about 100 a day, 50 to 120 seconds apart) is free forever and gentle on new accounts. **Balanced** (about 280 a day) is recommended for most accounts, **Turbo** (about 390) is for aged accounts and the **X Premium** pace (about 800) is only for accounts with X Premium; these three come with GrowX Premium and the 30-day trial.",
          "These controls lower risk; they cannot remove it. **No tool can promise zero risk on X**, and X can change its limits at any time. Start on Slow with warm-up turned on for a new or quiet account, watch for warnings, and move up only after a few days without any. See [how GrowX auto follow works](/how-it-works) for the full pacing logic.",
        ],
        bullets: [
          "Random delays, a break every few follows and occasional longer pauses",
          "Optional active hours and days, and a warm-up that starts the daily cap at 60 and raises it by 20 a day",
          "A following-cap guard (5,000, or about 10% above your follower count)",
          "Adaptive slow-down after any X warning, and a full stop on sign-out, an account lock, a challenge or repeated automation warnings",
          "Follow verification that checks follows actually stuck, to spot shadow limits",
          "Emergency stop with **Alt+Shift+S**",
        ],
      },
      {
        heading: "Rolling caps, active hours and X's own limits",
        paragraphs: [
          "The hourly and daily caps are **rolling**: the hourly cap counts the last 60 minutes and the daily cap the last 24 hours, not calendar days. Per hour, that means at most 14 follows on Slow, 28 on Balanced, 40 on Turbo and 60 on the X Premium pace. On top of every preset, about 8% of follows get a longer pause.",
          "**Active hours are off by default.** Turn them on if you want a daily rhythm. GrowX then follows only between 08:00 and 23:30 (the default window) on the days you choose, the hours a real person is awake.",
          "GrowX also respects X's own limits. X lets every account follow up to 5,000 accounts and then ties the limit to your follower count. That is why the following-cap guard pauses at 5,000 or about 10% above your follower count. If X refuses follows for the day, GrowX holds just under the number X allowed for the next 24 hours, then returns to your full pace by itself. Your pace setting never changes, and Start or **Try again now** asks X again at once. When X shows a challenge, GrowX never clicks through it; it stops and leaves it to you.",
        ],
      },
      {
        heading: "Auto follow vs. following by hand",
        paragraphs: [
          "Following by hand works, but it is slow and inconsistent: you scroll a big account's followers, open profiles one by one and guess who might follow back. Most of the time goes into checking profiles rather than deciding. GrowX runs the same checks you would (photo, bio, activity, ratio, audience size) on every candidate, keeps the decisions consistent and spreads the follows across the day instead of doing them in a burst.",
          "It also shows which sources are worth keeping. The **source leaderboard** lists the follow-back rate, retention and cost of each source, so you can drop the ones that bring nobody. With Premium, **auto-replace weak sources** retires a source after a fair trial and swaps in the best auto-found one, and you can restore it later. Pair the autopilot with a regular [cleanup of non-followers](/features/twitter-unfollow-tool) to keep your following count healthy.",
        ],
      },
    ],
    plans: {
      free: [
        "Source profiles, Find sources for me and recent followers first",
        "Follow-back score with core filters and a never-follow list",
        "The Slow pace (~100/day), free forever",
        "Every safety control: warm-up, active hours, slow-down, follow verification, Alt+Shift+S",
        "Source leaderboard with follow-back rate and retention",
      ],
      premium: [
        "Smart score trained on your own follow-backs",
        "More source types: a post's reposts, replies and likes, searches, #hashtags and X Lists",
        "Balanced (~280/day), Turbo (~390/day), X Premium (~800/day) and custom paces faster than Slow",
        "Auto-replace weak sources, advanced filters and list import",
        "All included in the free 30-day Premium trial, no credit card",
      ],
    },
    faq: [
      {
        q: "Is auto follow on Twitter (X) safe?",
        a: "No tool can promise zero risk on X. GrowX lowers the risk with random delays, breaks, hourly and daily caps, warm-up, an automatic slow-down after any X warning and an emergency stop (Alt+Shift+S).",
      },
      {
        q: "How many people can I auto follow per day on X?",
        a: "GrowX's free Slow pace aims for about 100 a day. With Premium, Balanced aims for about 280, Turbo about 390 and the X Premium pace about 800 (X Premium accounts only). X's own limits can change, so start low and move up only after clean days.",
      },
      {
        q: "Does the GrowX auto follow extension need my X password?",
        a: "No. GrowX works inside the x.com session you are already signed in to in Chrome. It never asks for your X password and does not use X OAuth.",
      },
      {
        q: "Does auto follow keep running when I close the popup?",
        a: "Yes. It runs in the extension's background service worker while Chrome is open, keeps the computer awake while it runs and resumes after Chrome restarts.",
      },
      {
        q: "Will GrowX unfollow people automatically?",
        a: "Only if you turn on automatic cleanup (Premium), which unfollows GrowX's own follows that did not follow back after 2, 5 or 7 days. Accounts you followed yourself or imported are never touched.",
      },
      {
        q: "Is there a free Twitter auto follow tool?",
        a: "Yes. GrowX's smart auto follow is free forever on the Slow pace (about 100 follows a day), with source profiles, Find sources for me, recent followers first, the follow-back score, core filters, a never-follow list, the source leaderboard and every safety control. Premium adds the Balanced, Turbo and X Premium paces, the smart score, more source types, advanced filters, list import and auto-replace for weak sources, all included in the free 30-day trial.",
      },
    ],
    xHeading: "Auto follow on X that picks the right people",
    limits: [
      { label: "Pace presets", free: "Slow (~100/day), free forever", premium: "Also Balanced (~280/day), Turbo (~390/day), X Premium (~800/day) and custom paces faster than Slow" },
      { label: "Follow-back score", free: "1-99 score with core filters", premium: "Plus a smart score trained on your own follow-backs" },
      { label: "Source types", free: "Source profiles and their newest followers", premium: "Plus a post's reposts, replies and likes, searches, #hashtags and X Lists" },
      { label: "Filters", free: "Core filters, exclude keywords and a never-follow list", premium: "Plus include, location and verified filters, account age and last-active rules" },
      { label: "Safety controls", free: "All: warm-up, active hours, slow-down, follow verification, Alt+Shift+S", premium: "All" },
    ],
    tools: ["/tools/twitter-follower-ratio-calculator", "/tools/twitter-shadowban-checker"],
    relatedPosts: ["mass-follow-twitter-limits", "follow-for-follow-twitter", "twitter-follower-ratio", "how-to-get-more-followers-on-twitter", "first-1000-followers-on-x", "how-to-find-your-niche-on-twitter"],
    related: ["twitter-list-follow", "twitter-unfollow-tool", "twitter-unfollower-tracker"],
  },
  {
    slug: "twitter-post-scheduler",
    nav: "Post scheduler",
    blurb: "Schedule posts and threads on X, fill queue slots and find your best time to post.",
    icon: "calendar",
    seoTitle: "Free Tweet Scheduler Extension: Posts & Threads on X",
    description:
      "Schedule tweets and threads free with GrowX, an X post scheduler for Chrome: queue slots, a best-time heat map, calendar, drafts and templates.",
    keywords: [
      "Twitter scheduler",
      "schedule tweets",
      "schedule posts on X free",
      "free Twitter scheduler",
      "schedule Twitter threads",
      "X post scheduler",
      "tweet queue",
      "GrowX",
    ],
    eyebrow: "Post scheduler",
    h1: "A free Twitter scheduler for posts and threads on X",
    lead:
      "Write a post or a thread, then post it now, pick a time or drop it into your next queue slot. GrowX publishes from your own x.com session in Chrome, shows when your followers are most active and keeps drafts, templates and a calendar in one place.",
    image: { src: "/screens/studio-251.webp", alt: "GrowX AI Creator Studio with the post composer, AI ideas and queue slots (demo data)" },
    highlights: [
      {
        title: "Posts and threads",
        text: "Threads of up to 25 parts, up to 4 images per post and X's own character counting, so what you write is what X accepts.",
      },
      {
        title: "Post, schedule or queue",
        text: "Post now, pick an exact time, or add to the queue and let GrowX fill your next free slot (09:00, 13:00 and 18:30 by default).",
      },
      {
        title: "Best time to post",
        text: "A week-by-hour heat map built from your own posts' engagement and the hours your followers are active.",
      },
      {
        title: "Calendar, drafts and templates",
        text: "See everything on a calendar, keep drafts, and start from 52 built-in templates or your own.",
      },
      {
        title: "Unlimited scheduling",
        text: "The free plan keeps up to 10 posts or threads waiting at once. Premium removes the limit.",
        premium: true,
      },
      {
        title: "Evergreen and auto-plug",
        text: "Post your best posts again every N days with rotating variants, and add a call-to-action reply to your own post once it takes off.",
        premium: true,
      },
    ],
    steps: [
      {
        title: "Write it",
        text: "Open AI Creator Studio and write a post or a thread, or start from a template. The counter follows X's rules: links count as 23 characters and most emoji as 2.",
      },
      {
        title: "Pick when",
        text: "Post now, choose a date and time, or add it to the queue. The heat map shows which hours tend to work for your account.",
      },
      {
        title: "Let GrowX post it",
        text: "Keep Chrome running. GrowX posts at the planned time from your x.com session, within your daily cap and minimum gap.",
      },
    ],
    sections: [
      {
        heading: "How scheduling posts on X works in GrowX",
        paragraphs: [
          "GrowX is a Chrome extension, so scheduled posts are published by your own browser, inside the x.com session you are already signed in to. There is no separate login and no X password to hand over. When a post is due, GrowX publishes it as the X account it was written for, never from a different account you happen to be signed in to at the time.",
          "That design has one real limit: **Chrome and your computer must be on** at the scheduled time. If the computer was asleep or off and a post is more than 6 hours late, GrowX does not post it by itself. It waits in the queue as \"missed\" so you can decide whether it still makes sense, instead of a stale post going out the next morning.",
          "Server-based schedulers can post while your computer is off, but they work through an app connection to your X account. GrowX trades always-on posting for keeping everything in your browser: your posts, queue and settings stay in Chrome's storage on your computer, not on a GrowX server.",
        ],
      },
      {
        heading: "Queue slots, calendar and the best time to post",
        paragraphs: [
          "The queue works with time slots. You set the times you want to post (09:00, 13:00 and 18:30 every day by default) and **Add to queue** puts each new post into the next free slot. It is the easiest way to keep a steady rhythm: write several posts in one sitting and let the queue spread them across the week without picking a time for each one.",
          "The **best time to post** heat map is a week by 24-hour grid built from two things: the engagement your own posts received at each hour and when your followers are active. It is specific to your account, which makes it more useful than generic advice. Use it to move queue slots toward the hours that are consistently warm, and read [the best time to post on Twitter](/blog/best-time-to-post-on-twitter) for a simple testing routine.",
          "The **calendar** shows scheduled and queued posts by day, so gaps and clusters are easy to spot. **Drafts** keep half-finished ideas, and the **52 templates** (hooks, threads, lists, stories and more) give you a starting structure when you are stuck. You can also save your own templates for formats you use every week, and a quick post box in the popup covers one-off posts.",
        ],
      },
      {
        heading: "Writing threads and long posts",
        paragraphs: [
          "Threads can have up to 25 parts, and each post can carry up to 4 images. The **Thread it** splitter turns a long draft into numbered parts, and the counter follows X's own rules (links count as 23 characters, most emoji and CJK characters as 2), so a part that looks fine will not be rejected for length. Accounts with X Premium can write long posts of up to 25,000 characters.",
          "Prefer to plan outside the extension first? The free [Twitter thread maker](/tools/twitter-thread-maker) and [tweet character counter](/tools/tweet-character-counter) on this site help you split a draft and check length before you paste it into GrowX. With GrowX Premium, the on-device AI writer can also suggest hooks, improve a draft or turn rough notes into a thread.",
        ],
      },
      {
        heading: "Posting safety and Premium extras",
        paragraphs: [
          "Scheduled posting has its own safety rules. GrowX posts at most 20 times a day by default, keeps at least 5 minutes between posts and pauses posting if X shows any warning. These limits stop a full queue from turning into a burst that looks automated. **No tool can promise zero risk on X**, so keep the defaults unless you have a clear reason to change them.",
          "The free plan keeps up to **10 posts or threads waiting** at once, which covers a few days of steady posting. **Premium** removes that limit and adds **evergreen recycling**, which posts your best posts again every N days (30 by default) with rotating variants or as a repost, and **auto-plug**, which replies to your own post with your call to action once it takes off (50 likes by default).",
        ],
      },
    ],
    plans: {
      free: [
        "Posts and threads (up to 25 parts, 4 images per post)",
        "Post now, schedule, or add to queue slots",
        "Up to 10 posts or threads waiting at once",
        "Best time to post heat map, calendar and drafts",
        "52 templates, your own templates and the Thread it splitter",
        "Quick post box in the popup",
      ],
      premium: [
        "Unlimited scheduling",
        "Evergreen recycling of your best posts",
        "Auto-plug: a call-to-action reply on your own post when it takes off",
        "GrowX AI: Write, Improve, Hooks and Thread it on your computer",
        "All included in the free 30-day Premium trial, no credit card",
      ],
    },
    faq: [
      {
        q: "Can I schedule tweets on X for free?",
        a: "Yes. GrowX's free plan lets you schedule posts and threads with up to 10 waiting at once. Premium removes the limit.",
      },
      {
        q: "Does my computer need to be on for scheduled tweets to post?",
        a: "Yes. GrowX posts from Chrome on your computer, so Chrome and the computer must be on. A post that is more than 6 hours late is not posted by itself; it waits as \"missed\" until you decide.",
      },
      {
        q: "Can I schedule a Twitter thread with images?",
        a: "Yes. Threads can have up to 25 parts and each post up to 4 images, and you can schedule or queue them just like a single post.",
      },
      {
        q: "What is the best time to post on Twitter?",
        a: "It depends on your audience. GrowX's heat map shows the hours that worked for your own posts and when your followers are active, which is more reliable for you than a generic chart.",
      },
      {
        q: "Can I schedule posts for more than one X account?",
        a: "Each post is published only as the X account it was written for. A separate workspace per X account is a Premium feature, and every GrowX account can link 2 X usernames for free.",
      },
    ],
    xHeading: "An X post scheduler for posts and threads",
    limits: [
      { label: "Posts waiting in the queue", free: "Up to 10 at once", premium: "Unlimited" },
      { label: "Threads and images", free: "Up to 25 parts, 4 images per post", premium: "Up to 25 parts, 4 images per post" },
      { label: "Best time to post, calendar, drafts", free: "Included", premium: "Included" },
      { label: "Evergreen recycling", free: "-", premium: "Best posts again every N days (30 by default)" },
      { label: "Auto-plug", free: "-", premium: "A call-to-action reply once a post takes off (50 likes by default)" },
      { label: "Posting safety", free: "Daily cap (20 by default), 5-minute gap, pause on X warnings", premium: "Same" },
    ],
    tools: ["/tools/twitter-thread-maker", "/tools/tweet-character-counter", "/tools/tweet-templates"],
    relatedPosts: ["how-to-schedule-tweets", "best-time-to-post-on-twitter", "how-often-to-post-on-twitter", "how-to-write-a-twitter-thread", "tweet-ideas", "how-to-go-viral-on-twitter"],
    related: ["ai-tweet-writer", "twitter-analytics", "twitter-reply-targets"],
  },
  {
    slug: "ai-tweet-writer",
    nav: "AI writer",
    blurb: "Private, on-device AI that writes, improves and threads your X posts. No API key.",
    icon: "wand",
    seoTitle: "AI Tweet Writer, On-Device: Private, No API Key",
    description:
      "GrowX AI is an AI tweet writer that runs on your computer in Chrome: write, improve, hooks and threads for X posts. Private, no API key, no per-use fees.",
    keywords: [
      "AI tweet writer",
      "AI tweet generator",
      "AI for Twitter posts",
      "AI Twitter thread writer",
      "X post generator",
      "on-device AI",
      "Chrome built-in AI",
      "GrowX",
    ],
    eyebrow: "GrowX AI",
    h1: "An AI tweet writer that runs privately on your own computer",
    lead:
      "GrowX AI writes, improves and threads your X posts with the AI model built into Chrome. It runs on your computer, uses your niche and voice settings, needs no API key and does not invent facts: anything it cannot know becomes a `{placeholder}`.",
    image: { src: "/screens/studio-251.webp", alt: "GrowX AI Creator Studio with the composer, the Write, Improve, Thread it and Hooks buttons and AI ideas written on the computer (demo data)" },
    highlights: [
      {
        title: "Write and Improve",
        text: "Turn an idea into a post, or tighten a draft you already have, in the tone set in your voice settings.",
        premium: true,
      },
      {
        title: "Hooks and Thread it",
        text: "Get several opening lines for the same idea, or turn notes and a long draft into a numbered thread that fits X's character rules.",
        premium: true,
      },
      {
        title: "AI replies",
        text: "Drafts under fresh posts in the AI Reply Assistant, and one-click tone buttons beside X's reply box. You approve every reply.",
        premium: true,
      },
      {
        title: "On-device and private",
        text: "Runs on your computer with the model built into Chrome. No API key, no per-use fees and nothing sent to GrowX.",
        premium: true,
      },
      {
        title: "Built not to invent facts",
        text: "When a post needs a number, name or result it cannot know, GrowX AI writes a {placeholder} for you to fill in.",
        premium: true,
      },
      {
        title: "Free templates and splitter",
        text: "52 templates and the plain Thread it splitter are free, and they are what the AI buttons fall back to when Chrome's model is unavailable.",
      },
    ],
    steps: [
      {
        title: "Set your niche and voice",
        text: "Tell GrowX what you post about and how you sound. The AI uses these settings for every suggestion it makes.",
      },
      {
        title: "Press an AI button",
        text: "In AI Creator Studio, choose Write, Improve, Hooks or Thread it. Chrome downloads its model once the first time; after that it runs on your computer.",
      },
      {
        title: "Edit, then post or schedule",
        text: "Fill any placeholders with real details, adjust the wording, then post now, schedule it or add it to your queue.",
      },
    ],
    sections: [
      {
        heading: "How an on-device AI tweet writer works",
        paragraphs: [
          "Most AI tweet generators send your text to a cloud model and charge per use or per month, sometimes through an API key you have to manage. GrowX AI uses the AI model that is built into recent versions of desktop Chrome. The model runs on your own computer, so your drafts are not sent to GrowX and there is no API key to set up or pay for.",
          "Chrome downloads the model once, the first time it is needed. After that, GrowX AI calls it directly from the extension. Because it runs locally, GrowX gives it short, focused jobs: a post, a set of hooks, a rewrite, a thread outline or a reply idea. That is the kind of writing help most people actually want while composing on X, and it keeps you in charge of the final words.",
        ],
      },
      {
        heading: "What GrowX AI can do",
        paragraphs: [
          "GrowX AI is part of GrowX Premium and appears as buttons where you already write, so you never copy text between tabs. Every suggestion uses the niche and voice settings you chose, which keeps the output closer to how you actually write than a blank prompt in a general chatbot.",
          "None of these actions post anything. GrowX AI fills the composer or shows suggestions; you decide what to keep, edit it and then post, schedule or queue it yourself. Replies drafted in the [AI Reply Assistant](/features/twitter-reply-targets) go out only after you approve them, and with the reply buttons on X you press X's own Reply button. GrowX never replies by itself and never sends DMs.",
        ],
        bullets: [
          "**Write**: a post from a topic or a rough idea",
          "**Improve**: a clearer, tighter version of your draft",
          "**Hooks**: several opening lines to choose from",
          "**Thread it**: a long draft or notes turned into a numbered thread",
          "**AI replies**: drafts under fresh posts in the [AI Reply Assistant](/features/twitter-reply-targets), and tone buttons right beside X's reply box (new in 2.5.0)",
          "**Weekly summary**: a short read on how your week went",
          "**This week's plan**: ask the AI Growth Coach in [Analytics](/features/twitter-analytics) for a short plan from your own numbers",
        ],
      },
      {
        heading: "From idea to scheduled post: a simple workflow",
        paragraphs: [
          "A good post usually needs two or three passes. GrowX AI saves time on the first draft and on the variations; the final edit is yours. Here is a simple routine in AI Creator Studio:",
        ],
        bullets: [
          "Collect raw ideas during the week: things you learned, questions people asked you, mistakes you made and fixed.",
          "Use **Write** on one idea to get a first draft, or type your own rough version.",
          "Use **Hooks** to see a few different openings, and pick the most specific one.",
          "Fill every {placeholder} with a real detail, then use **Improve** to tighten the wording.",
          "For a bigger idea, use **Thread it**, then check that each part reads well on its own.",
          "Edit the final version by hand and read it aloud. Then post it, schedule it or add it to your [queue](/features/twitter-post-scheduler).",
        ],
      },
      {
        heading: "Why it does not invent facts",
        paragraphs: [
          "The biggest problem with AI-written posts is confident nonsense: invented numbers, fake results and quotes nobody said. GrowX AI is designed not to make up facts. When a post needs something only you know, such as a revenue figure, a client name or how long a project took, it leaves a `{placeholder}` instead, so the gap is obvious before anything is posted.",
          "For example, a draft might read: \"I cut our support backlog from {number} to {number} tickets a week by changing one thing: {what you changed}.\" Replace each placeholder with the real detail, or rewrite the sentence if you do not have one. Before you post or schedule, search the draft for curly braces: a placeholder left in a post is easy for everyone to spot.",
          "That makes the output a draft, not a finished post. Read it, fill the placeholders with real details and cut anything that does not sound like you. Posts built on specific, true experience are more interesting to read than generic advice, and they protect your credibility. For structure ideas, see [how to write a Twitter thread](/blog/how-to-write-a-twitter-thread).",
        ],
      },
      {
        heading: "How to edit an AI draft before you post",
        paragraphs: [
          "Whatever wrote the first version, run every draft through the same short checklist before it goes anywhere near your feed. It takes a minute or two per post, and it is the step that turns a generic AI draft into something your followers want to read.",
        ],
        bullets: [
          "**Is it true?** Every number, name and claim should be something you can stand behind. Delete anything you cannot.",
          "**Is it specific?** Swap general words for concrete ones: the tool you used, the step you took, the mistake you made.",
          "**Does it sound like you?** Read it aloud. If you would never say a phrase out loud, rewrite it in your own words.",
          "**Does the first line do its job?** Readers decide from the opening line whether to keep reading, so put the most interesting part there.",
          "**Can anything go?** Cut filler openers, stacked adjectives and hashtags that add nothing. Shorter is usually clearer.",
          "**Does it fit?** X counts links as 23 characters and most emoji as 2. The GrowX composer counts the same way, and so does the free [tweet character counter](/tools/tweet-character-counter).",
        ],
      },
      {
        heading: "Habits that get better AI-written posts",
        paragraphs: ["What you give the AI shapes what you get back. A few habits help:"],
        bullets: [
          "**Feed it specifics.** \"Three things I learned shipping a Chrome extension\" gets a better draft than \"productivity tips\".",
          "**One idea per post.** If a draft tries to say three things, split it or cut two of them.",
          "**Keep your own stories.** AI can help structure a story, but it cannot live it for you. Personal experience is a big part of why people follow an account.",
          "**Ask again when it sounds generic.** If anyone could have written the draft, add a detail only you know, or ask for another version.",
          "**Do not automate conversations.** AI reply drafts are a starting point. Generic replies sent at volume look like spam and build no relationships, which is why GrowX never posts a reply by itself.",
        ],
      },
      {
        heading: "Requirements, fallback and the free plan",
        paragraphs: [
          "GrowX AI needs a recent desktop version of Chrome on a computer with enough free memory and disk space for Chrome's built-in model. If the model is not available on your machine, the AI buttons do not break: they fall back to the matching templates and the plain thread splitter, so you can still write and structure posts.",
          "On the free plan you get the same composer with **52 templates** (hooks, threads, lists, stories and more), your own templates and the **Thread it** splitter without AI. Premium adds the AI actions above, and the [30-day Premium trial](/pricing) lets you test them on your own computer before you decide. AI suggestions are drafts; you stay responsible for what you post.",
        ],
      },
    ],
    plans: {
      free: [
        "52 built-in templates and your own templates",
        "Thread it splitter without AI",
        "Composer with X's character counting, threads and images",
        "Post now, schedule or queue (up to 10 waiting)",
      ],
      premium: [
        "GrowX AI: Write, Improve, Hooks and Thread it",
        "AI Reply Assistant and AI reply buttons on X",
        "Weekly AI summary",
        "Runs on your computer: no API key, no per-use fees",
        "All included in the free 30-day Premium trial, no credit card",
      ],
    },
    faq: [
      {
        q: "Is there an AI tweet writer that needs no API key?",
        a: "GrowX AI needs no API key and has no per-use fees, because it runs on the AI model built into Chrome. It is part of GrowX Premium, which you can try free for 30 days without a credit card.",
      },
      {
        q: "Does GrowX AI send my drafts to a server?",
        a: "No. It runs on your computer using Chrome's built-in AI model, and nothing is sent to GrowX.",
      },
      {
        q: "Why do the AI buttons show templates instead of AI text?",
        a: "Your Chrome version or computer cannot run the built-in model yet, for example because of limited memory or disk space. GrowX falls back to templates and the plain thread splitter so you can keep writing.",
      },
      {
        q: "Can AI write a whole Twitter thread for me?",
        a: "Thread it turns a long draft or notes into a numbered thread, and Write can start from a topic. Review every part and fill the placeholders before you post.",
      },
      {
        q: "Will GrowX AI post or reply on X automatically?",
        a: "No. It fills the composer or drafts replies. You decide what to post, and a reply goes out only after you approve it: you send it, or press Send approved, or press X's own Reply button.",
      },
      {
        q: "Can I use GrowX AI on my phone?",
        a: "No. GrowX is a Chrome extension for desktop computers, not a mobile app. GrowX AI runs on the AI model built into desktop Chrome, so it needs a recent version of Chrome on a computer with enough free memory and disk space.",
      },
    ],
    xHeading: "An AI writer for X posts, hooks and threads",
    limits: [
      { label: "GrowX AI: Write, Improve, Hooks, Thread it", free: "-", premium: "Included, on your computer" },
      { label: "AI replies: AI Reply Assistant and buttons on X", free: "-", premium: "Included" },
      { label: "Weekly AI summary", free: "-", premium: "Included" },
      { label: "Templates", free: "52 built-in plus your own", premium: "52 built-in plus your own" },
      { label: "Thread splitter", free: "Thread it without AI", premium: "Thread it with AI" },
    ],
    tools: ["/tools/tweet-templates", "/tools/twitter-thread-maker", "/tools/twitter-bio-generator"],
    relatedPosts: ["twitter-hooks", "tweet-ideas", "how-to-write-a-twitter-thread", "twitter-bio-ideas", "how-to-go-viral-on-twitter", "how-to-increase-twitter-engagement"],
    related: ["twitter-post-scheduler", "twitter-reply-targets"],
  },
  {
    slug: "twitter-analytics",
    nav: "Analytics",
    blurb: "Who followed you back, a Growth Score, post analytics and your best time to post, in your browser.",
    icon: "chart",
    seoTitle: "Twitter Analytics Chrome Extension: Free Post Stats",
    description:
      "GrowX Twitter analytics shows who followed you back, a Growth Score with next steps, engagement for every X post, your best time to post and new followers.",
    keywords: [
      "Twitter analytics",
      "X analytics tool",
      "best time to post on Twitter",
      "Twitter post analytics",
      "Twitter engagement rate",
      "free Twitter analytics",
      "X follower growth chart",
      "who followed back on Twitter",
      "Twitter growth score",
      "GrowX",
    ],
    eyebrow: "Analytics · New in 2.5.1",
    h1: "Twitter analytics that show what grows your X account",
    lead:
      "GrowX Analytics reads your recent posts and followers through the x.com tab you already have open and turns them into clear numbers: who followed you back and how fast, a Growth Score with your next steps, engagement per post, the hours that work, the topics and formats that land, and how your audience is changing.",
    image: { src: "/screens/analytics-251.webp", alt: "GrowX Analytics, Posts page with post stats, a best time to post heat map and engagement by format (demo data)" },
    highlights: [
      {
        title: "Who followed back",
        text: "Everyone who followed you back after GrowX followed them: when, how long it took and from which source, with search and CSV export.",
      },
      {
        title: "Growth Score and AI Growth Coach",
        text: "One score from 0 to 100 from six parts of your own numbers, weekly growth trends, and the most useful next steps.",
      },
      {
        title: "Post analytics",
        text: "Views, likes, reposts, replies, bookmarks and engagement rate for your recent posts, refreshed every 3 hours while x.com is open.",
      },
      {
        title: "Best time and what works",
        text: "A week by 24-hour heat map from your own posts and followers, and how questions, images, text, threads and links compare.",
      },
      {
        title: "Posts that brought followers",
        text: "Spot the posts followed by more new followers than your usual pace in the next 24 hours.",
        premium: true,
      },
      {
        title: "Weekly report",
        text: "This week vs last week: new followers, unfollowers and best posts, with a notification on Monday.",
        premium: true,
      },
    ],
    steps: [
      {
        title: "Install and open x.com",
        text: "Add GrowX to Chrome and keep an x.com tab open. GrowX reads your data from that tab, one small step per minute at most.",
      },
      {
        title: "Let it collect",
        text: "Post analytics refresh every 3 hours while x.com is open, and the follower tracker checks once a day. The views fill in as data arrives.",
      },
      {
        title: "Act on it",
        text: "Follow the AI Growth Coach's next steps, move queue slots toward your best hours and do more of the formats that work.",
      },
    ],
    sections: [
      {
        heading: "Who followed back, and your Growth Score",
        paragraphs: [
          "Analytics opens on **Who followed back**: everyone who followed you back after GrowX followed them, newest first, with when you followed, when they followed back, how long it took and the [source](/features/twitter-auto-follow) they came from. Pick the last 7, 30 or 90 days or all time, filter by source, search, or export a CSV. On top you see how many followed back, the rate among follows old enough to judge, the typical wait and your best source.",
          "**Growth Score 2.0** turns six parts of your own numbers into one score from 0 to 100: follower growth (25%), engagement (25%), post reach (15%), consistency (15%), follow-backs (10%) and retention (10%). Each part shows its score, the numbers behind it, how it is scored and how to raise it, and a part without enough data says what it needs. The score is kept once a day with the change since last week, next to a **growth dashboard** of weekly followers, follow-backs, views and engagement.",
          "The **AI Growth Coach** lists the most useful next steps from those numbers, weakest parts first: the autopilot, your queue, your next best time to post, and the formats and topics that do best. With Premium, **Ask GrowX AI for this week's plan** writes a short plan on your computer. Home also shows your account's **TwitterScore** from twitterscore.io next to your Growth Score, if you allow it.",
        ],
      },
      {
        heading: "What GrowX Twitter analytics measures",
        paragraphs: [
          "Next come **post analytics**: views, likes, reposts, replies, bookmarks and engagement rate for each of your recent posts. The numbers refresh every 3 hours while an x.com tab is open, so you can watch how a post develops over its first day instead of checking it by hand. The free plan covers your latest 30 posts.",
          "**What works** groups your posts by topic and format (questions, images, plain text, threads and links) and compares their engagement. Over a few weeks this answers practical questions: do your threads do better than single posts, do images help, do links hurt? Answers based on your own account beat general rules, because every niche and audience behaves differently.",
          "The **growth chart** and history show your follower count over time. Daily goals for posts, replies and new followers, **streaks**, milestones and a monthly goal planner turn the numbers into a routine you can actually keep, which matters more for growth on X than any single post that happens to go viral.",
        ],
      },
      {
        heading: "Best time to post on Twitter, for your account",
        paragraphs: [
          "Generic charts of the best time to post on Twitter mix many accounts, time zones and niches. GrowX builds a **week by 24-hour heat map** from two signals that belong to you: the engagement your own posts got at each hour, and when your followers are active. Warm cells are hours worth testing; cold cells are hours to avoid for important posts.",
          "The heat map is most useful together with the [post scheduler](/features/twitter-post-scheduler). Move your queue slots toward the warm hours, post there for a couple of weeks and look again. If the pattern holds, keep it; if not, try the next warm block. The [best time to post guide](/blog/best-time-to-post-on-twitter) walks through a simple testing routine.",
        ],
      },
      {
        heading: "Which posts brought followers (Premium)",
        paragraphs: [
          "Engagement and follower growth are not the same thing. A post can collect plenty of likes from people who already follow you and bring nobody new. **Which posts brought followers**, part of Full analytics in Premium, looks at the 24 hours after each post and highlights the posts followed by more new followers than your usual pace.",
          "The **weekly report (Premium)** compares this week with last week: new followers, unfollowers and best posts, with a notification on Monday. Together with the [unfollower tracker](/features/twitter-unfollower-tracker), it shows both sides of growth, who arrived and who left, so you can tell whether a change in your content helped or hurt.",
        ],
      },
      {
        heading: "Privacy and how the data is collected",
        paragraphs: [
          "GrowX reads everything through an x.com tab that is already open, one small step per minute at most, so there is no separate login and no X password. Your settings, history, posts and analytics stay in Chrome's storage on your computer rather than on a GrowX server. Optional anonymous usage counts, which contain no X data, can be switched off. TwitterScore on Home is optional too: if you allow it, GrowX sends only your @username to twitterscore.io once a day, and Settings, General turns it off.",
          "The trade-off is coverage. GrowX only knows what it has seen while Chrome was running with x.com open, so a fresh install starts with your recent posts and builds history from there. X's own analytics remain the official record for your account; GrowX adds the comparisons, timing and follower links in one place next to your scheduler and goals.",
        ],
      },
    ],
    plans: {
      free: [
        "Who followed back, with CSV export",
        "Growth Score 2.0, growth dashboard and AI Growth Coach",
        "Post analytics for your latest 30 posts",
        "Best time to post heat map, topics and formats",
        "Growth chart, history, daily goals, streaks and milestones",
        "Follower tracker with 7 days of history and top fans",
      ],
      premium: [
        "Full analytics, including which posts brought followers",
        "Weekly report with a Monday notification",
        "Full follower history and follower quality",
        "This week's plan and a weekly summary from GrowX AI",
        "All included in the free 30-day Premium trial, no credit card",
      ],
    },
    faq: [
      {
        q: "Is there a free Twitter analytics tool?",
        a: "Yes. GrowX's free plan includes who followed back, the Growth Score and AI Growth Coach, post analytics for your latest 30 posts, the best time to post heat map, topics and formats, a growth chart and daily goals.",
      },
      {
        q: "Can I see who followed me back on X?",
        a: "Yes, free. GrowX Analytics opens on Who followed back: everyone who followed you back after GrowX followed them, with when, how long it took and the source, plus a CSV export.",
      },
      {
        q: "What is the GrowX Growth Score?",
        a: "A score from 0 to 100 built from six parts of your own numbers: follower growth, engagement, post reach, consistency, follow-backs and retention. Each part shows how it is scored and how to raise it, and it is free.",
      },
      {
        q: "How does GrowX get my X analytics, and where is the data stored?",
        a: "It reads your posts and followers through an x.com tab you already have open in Chrome, one small step per minute at most. It never asks for your X password. Settings, history, posts and analytics stay in Chrome's extension storage on your computer, and you can export a backup file at any time.",
      },
      {
        q: "How often are my X post stats updated?",
        a: "Post analytics refresh every 3 hours while x.com is open, and the follower tracker checks once a day.",
      },
      {
        q: "Can I see which tweets gained me followers?",
        a: "Yes, with Premium. Which posts brought followers highlights the posts followed by more new followers than your usual pace in the next 24 hours.",
      },
    ],
    xHeading: "X analytics that point to your next post",
    limits: [
      { label: "Who followed back, Growth Score and coach", free: "Included", premium: "Plus this week's plan from GrowX AI" },
      { label: "Post analytics", free: "Your latest 30 posts", premium: "Full analytics" },
      { label: "Best time to post, topics and formats", free: "Included", premium: "Included" },
      { label: "Which posts brought followers", free: "-", premium: "Included" },
      { label: "Weekly report", free: "-", premium: "This week vs last, with a Monday notification" },
      { label: "Follower history", free: "7 days", premium: "Full history, plus follower quality" },
    ],
    tools: ["/tools/twitter-engagement-rate-calculator", "/tools/twitter-follower-ratio-calculator"],
    relatedPosts: ["twitter-analytics-guide", "best-time-to-post-on-twitter", "twitter-algorithm-explained", "how-to-increase-twitter-engagement", "how-often-to-post-on-twitter", "twitter-hashtags-guide"],
    related: ["twitter-post-scheduler", "twitter-unfollower-tracker", "ai-tweet-writer"],
  },
  {
    slug: "twitter-unfollower-tracker",
    nav: "Unfollower tracker",
    blurb: "See who followed and who unfollowed you on X each day, with follower quality checks.",
    icon: "users",
    seoTitle: "Who Unfollowed Me on Twitter (X): Free Daily Tracker",
    description:
      "See who unfollowed you on X with GrowX, a Twitter unfollower tracker for Chrome that compares your follower list daily. Free with 7 days of history.",
    keywords: [
      "Twitter unfollower tracker",
      "who unfollowed me on Twitter",
      "see who unfollowed you on X",
      "X unfollower tracker",
      "Twitter unfollow notification",
      "track Twitter followers",
      "Twitter follower quality",
      "GrowX",
    ],
    eyebrow: "Follower tracker",
    h1: "Find out who unfollowed you on Twitter (X), every day",
    lead:
      "To see who unfollowed you on Twitter (X), you have to compare your follower list over time, because X never tells you. GrowX, a Chrome extension that is free to start, does it once a day and shows who followed you and who left, plus your top fans. The free plan keeps 7 days of history; Premium adds the full history and follower quality checks.",
    image: { src: "/screens/followers-251.webp", alt: "GrowX Analytics, Followers page with new followers, unfollowers, an unfollow back button and a follower quality breakdown (demo data)" },
    highlights: [
      {
        title: "Daily follower comparison",
        text: "Once a day, GrowX compares your follower list with the previous one and lists your new followers and unfollowers.",
      },
      {
        title: "7 days of history, free",
        text: "The free plan keeps a week of follower and unfollower history, enough to see what happened after a post.",
      },
      {
        title: "Top fans",
        text: "See who likes and replies to your posts most, so you know who to thank and engage with.",
      },
      {
        title: "Full follower history",
        text: "Keep your complete follower history instead of the last 7 days.",
        premium: true,
      },
      {
        title: "One-click unfollow back",
        text: "Unfollow someone who left you straight from the tracker.",
        premium: true,
      },
      {
        title: "Follower quality",
        text: "On request, sorts your newest followers into real and active, inactive (90+ days), likely bots and private accounts.",
        premium: true,
      },
    ],
    steps: [
      {
        title: "Install GrowX",
        text: "Add the extension to Chrome and open x.com while signed in. There is no X app to connect and no password to enter.",
      },
      {
        title: "Wait for the first check",
        text: "The first daily check saves your follower list. From the next check on, GrowX can show who followed and who unfollowed.",
      },
      {
        title: "Review and decide",
        text: "Open Analytics, Followers to see the changes. With Premium, you can also check follower quality and unfollow back in one click.",
      },
    ],
    sections: [
      {
        heading: "How the GrowX unfollower tracker works",
        paragraphs: [
          "X does not send a notification when someone unfollows you, and your follower count only shows the net change. The only reliable way to know who left is to compare your full follower list over time. GrowX does that for you: once a day it reads your follower list through an x.com tab you already have open and compares it with the previous check.",
          "The result is two simple lists: who followed you and who unfollowed you since the last check. The free plan keeps **7 days** of this history, which is enough to see what happened after a post or a busy week. **Premium** keeps your full follower history and adds **one-click unfollow back** for people who left.",
        ],
      },
      {
        heading: "What the tracker can and cannot tell you",
        paragraphs: [
          "An unfollow is not always a decision. Accounts that are **suspended, deactivated or deleted** also disappear from your follower list, so they can show up among your unfollowers. Before you unfollow anyone back, open the profile: if it no longer exists or is suspended, the change probably had nothing to do with you or your posts.",
          "Because the check runs **once a day**, someone who follows and unfollows between two checks will not appear, and the time of an unfollow is only known to the day. Checks also need Chrome running with an x.com tab open, so no check happens on a day your computer stays off.",
          "Every account loses some followers over time; it is a normal part of being on X. The useful signal is a pattern, such as a spike in unfollows after a certain kind of post or a change in posting rhythm, which you can cross-check against your posts in [Twitter analytics](/features/twitter-analytics).",
        ],
      },
      {
        heading: "Follower quality and top fans",
        paragraphs: [
          "Raw follower counts hide a lot. **Follower quality (Premium)** checks your newest followers on request and sorts them into real and active accounts, inactive accounts (no activity for 90+ days), likely bots and private accounts. It helps you judge whether a growth spurt brought real people, and whether a source or a popular post attracted the audience you actually want.",
          "**Top fans** works the other way round: it lists the people who like and reply to your posts most. Those are the accounts worth replying to, thanking and keeping close, and you can tag them or mark them as VIPs in People. A small group of engaged fans often matters more than a large number of silent followers.",
        ],
      },
      {
        heading: "Tracker vs. checking by hand",
        paragraphs: [
          "Without a tracker, finding unfollowers means scrolling your follower list and trying to remember who used to be there, which stops working after a few hundred followers. Many web-based unfollower apps ask you to connect your X account through an app login. GrowX keeps the comparison in your own browser, inside your signed-in x.com session, and never asks for your X password.",
          "If you want to act on the result, the [unfollow tool](/features/twitter-unfollow-tool) scans everyone you follow and finds accounts that do not follow you back or have gone inactive, so you can clean up at a safe pace. For a step-by-step walkthrough, read [who unfollowed me on Twitter](/blog/who-unfollowed-me-on-twitter).",
        ],
      },
    ],
    plans: {
      free: [
        "Daily check of who followed and who unfollowed you",
        "7 days of follower history",
        "Top fans: who likes and replies to you most",
        "People: tags, notes, VIPs and mutuals",
      ],
      premium: [
        "Full follower history",
        "One-click unfollow back",
        "Follower quality: real and active, inactive, likely bot, private",
        "Weekly report with new followers and unfollowers",
        "All included in the free 30-day Premium trial, no credit card",
      ],
    },
    faq: [
      {
        q: "Can you see who unfollowed you on Twitter?",
        a: "X does not notify you, but a tracker can compare your follower list over time. GrowX does this once a day and lists who unfollowed you since the last check.",
      },
      {
        q: "Is there a free Twitter unfollower tracker?",
        a: "Yes. GrowX's free plan shows who followed and unfollowed you with 7 days of history. Premium keeps the full history and adds one-click unfollow back.",
      },
      {
        q: "Why does someone show as an unfollower when they did not unfollow me?",
        a: "Suspended, deactivated and deleted accounts also disappear from your follower list. Open the profile before you react.",
      },
      {
        q: "Does the unfollower tracker need my X password?",
        a: "No. GrowX reads your follower list through the x.com session you are already signed in to in Chrome and never asks for your password.",
      },
      {
        q: "How often does GrowX check for unfollowers on X?",
        a: "Once a day, while Chrome is running with x.com open. Someone who follows and unfollows between two checks will not show up.",
      },
    ],
    xHeading: "An X unfollower tracker that checks every day",
    limits: [
      { label: "Daily check: who followed and unfollowed", free: "Included", premium: "Included" },
      { label: "Follower history", free: "7 days", premium: "Full history" },
      { label: "One-click unfollow back", free: "-", premium: "Included" },
      { label: "Follower quality", free: "-", premium: "Real and active, inactive (90+ days), likely bot, private" },
      { label: "Top fans and People", free: "Included", premium: "Included" },
    ],
    tools: ["/tools/twitter-follower-ratio-calculator", "/tools/twitter-shadowban-checker"],
    relatedPosts: ["who-unfollowed-me-on-twitter", "twitter-follower-ratio", "unfollow-non-followers-twitter", "twitter-shadowban", "twitter-analytics-guide", "follow-for-follow-twitter"],
    related: ["twitter-unfollow-tool", "twitter-analytics", "twitter-auto-follow"],
  },
  {
    slug: "twitter-unfollow-tool",
    nav: "Unfollow tool",
    blurb: "Find non-followers and inactive accounts on X, review them and unfollow at a safe pace.",
    icon: "userX",
    seoTitle: "Twitter Unfollow Tool: Unfollow Non-Followers Safely",
    description:
      "GrowX is a Twitter unfollow tool for Chrome: find who doesn't follow you back or went inactive on X, review the list and mass unfollow at a safe pace.",
    keywords: [
      "Twitter unfollow tool",
      "mass unfollow Twitter",
      "unfollow non-followers",
      "unfollow inactive accounts",
      "X unfollow tool",
      "bulk unfollow Twitter",
      "who doesn't follow me back on X",
      "GrowX",
    ],
    eyebrow: "Cleanup",
    h1: "Unfollow non-followers and inactive accounts on X, safely",
    lead:
      "GrowX Cleanup scans everyone you follow, finds accounts that do not follow you back or have stopped posting, and lets you review and select before it unfollows anyone. Each account is re-checked right before the unfollow, at a pace built to look human.",
    // TODO: a real screenshot of the Cleanup page (demo data); this one shows the Followers page.
    image: { src: "/screens/followers-251.webp", alt: "GrowX follower list with a select checkbox per account, an unfollow back button and follower quality (demo data)" },
    highlights: [
      {
        title: "Not following back",
        text: "See every account you follow that does not follow you back, with filters, search and sorting.",
      },
      {
        title: "Inactive accounts",
        text: "Find accounts whose latest post is older than 30, 90, 180 or 365 days. Unknown activity is never labelled inactive.",
      },
      {
        title: "Review before unfollowing",
        text: "Nothing is unfollowed until you select it, and each account is re-checked right before the unfollow.",
      },
      {
        title: "Safe pace, free",
        text: "Up to 30 unfollows an hour and 200 a day, with up to 200 accounts per run on the free plan.",
      },
      {
        title: "Bulk unfollow",
        text: "Select all and unfollow up to 5,000 accounts in one run, with a Balanced pace of 45 an hour and 320 a day.",
        premium: true,
      },
      {
        title: "Automatic cleanup",
        text: "Unfollows GrowX's own follows that did not follow back after 2, 5 or 7 days. Accounts you followed yourself are never touched.",
        premium: true,
      },
    ],
    steps: [
      {
        title: "Scan",
        text: "Open Cleanup and scan your following and followers. GrowX reads both lists from your signed-in x.com session.",
      },
      {
        title: "Review and select",
        text: "Filter by not following back or inactive, search and sort, then select the accounts you want to unfollow.",
      },
      {
        title: "Unfollow at a safe pace",
        text: "Start the run. GrowX re-checks each account, unfollows one at a time and stays within the hourly and daily caps.",
      },
    ],
    sections: [
      {
        heading: "How the cleanup scan finds who to unfollow",
        paragraphs: [
          "GrowX scans the accounts you follow and your followers, then sorts the result into two groups. **Not following back** is everyone you follow who does not follow you. **Inactive** is everyone whose latest post is older than the window you choose: 30, 90, 180 or 365 days. You can combine filters, search by name and sort the list before selecting anyone.",
          "The scan is careful about what it does not know. If GrowX cannot see an account's activity, the account is listed as unknown and is **never called inactive**. If a scan is interrupted and only part of your list was read, the results are marked \"unverified\" and select-all is switched off, so you cannot bulk unfollow based on incomplete data.",
        ],
      },
      {
        heading: "Unfollowing at a safe pace",
        paragraphs: [
          "Unfollowing hundreds of accounts in a few minutes looks nothing like a person using X. GrowX unfollows one account at a time instead. On the free **Safe** pace it does up to 30 an hour and 200 a day, and the free plan handles up to 200 accounts per run. Right before each unfollow it checks the account again, so the decision is based on its current state rather than an old scan.",
          "**Premium** adds **bulk unfollow**, which lets you select all and unfollow up to 5,000 accounts in one run, and a **Balanced** unfollow pace of 45 an hour and 320 a day. A big run simply takes several days, because the caps stay in place. **No tool can promise zero risk on X**, so start with Safe and move up only if everything stays quiet.",
        ],
      },
      {
        heading: "Automatic cleanup for GrowX follows (Premium)",
        paragraphs: [
          "If you use the [auto follow](/features/twitter-auto-follow) autopilot, your following count grows quickly. **Automatic cleanup** keeps it in balance: it unfollows accounts GrowX followed for you that did not follow back after 2, 5 or 7 days, whichever you choose. It only runs during autopilot breaks, waits 40 to 90 seconds between unfollows and stays within the same caps of 30 an hour and 200 a day.",
          "It never touches accounts you followed yourself or accounts you imported, so your hand-picked follows stay put. That separation matters: the people you chose to follow are not part of a numbers game, and cleanup should only reverse what automation did. Read [how to unfollow non-followers](/blog/unfollow-non-followers-twitter) for when to clean up and how often.",
        ],
      },
      {
        heading: "Unfollow tool vs. unfollowing by hand",
        paragraphs: [
          "Unfollowing by hand means opening your following list, checking each profile and trying to remember who followed you back. It is slow, and it is easy to unfollow someone you meant to keep. A scan shows the whole picture at once, and the review step means GrowX only unfollows the accounts you selected, nothing more.",
          "GrowX also keeps the work in your own browser. It uses the x.com session you are already signed in to, never asks for your X password and does not post, like or send DMs while cleaning up. To see who unfollowed you rather than who you follow, use the [unfollower tracker](/features/twitter-unfollower-tracker).",
        ],
      },
    ],
    plans: {
      free: [
        "Scan your following and followers",
        "Not following back and inactive filters (30, 90, 180 or 365 days)",
        "Review, search, sort and select before unfollowing",
        "Safe pace: up to 30 an hour and 200 a day",
        "Up to 200 unfollows per run",
      ],
      premium: [
        "Bulk unfollow: select all, up to 5,000 per run",
        "Balanced unfollow pace: 45 an hour and 320 a day",
        "Automatic cleanup of GrowX follows after 2, 5 or 7 days",
        "All included in the free 30-day Premium trial, no credit card",
      ],
    },
    faq: [
      {
        q: "How do I unfollow everyone who doesn't follow me back on Twitter?",
        a: "Run a cleanup scan in GrowX, filter by not following back, review the list and start the run. GrowX unfollows the selected accounts one at a time at a safe pace.",
      },
      {
        q: "How many accounts can I unfollow per day on X?",
        a: "X does not publish a fixed number and its limits can change. GrowX's Safe pace stops at 30 an hour and 200 a day, and the Premium Balanced pace at 45 an hour and 320 a day.",
      },
      {
        q: "Can I mass unfollow on Twitter for free?",
        a: "Yes, up to 200 accounts per run at the Safe pace. Premium adds select-all bulk unfollow of up to 5,000 accounts per run.",
      },
      {
        q: "How do I find inactive accounts I follow on X?",
        a: "Choose the inactive filter and a window of 30, 90, 180 or 365 days. Accounts whose activity GrowX could not see are marked unknown, not inactive.",
      },
      {
        q: "Will automatic cleanup unfollow people I followed myself?",
        a: "No. Automatic cleanup (Premium) only unfollows accounts GrowX followed for you that did not follow back, never accounts you followed yourself or imported.",
      },
      {
        q: "When should I unfollow people who don't follow me back on X?",
        a: "Give new follows a week or two to follow back, then run a scan and unfollow the accounts that did not. Do it on a different day from heavy following, and start on the free Safe pace.",
      },
    ],
    xHeading: "An X unfollow tool for non-followers and inactive accounts",
    limits: [
      { label: "Scan: not following back and inactive", free: "Included", premium: "Included" },
      { label: "Unfollows per run", free: "Up to 200", premium: "Bulk: select all, up to 5,000" },
      { label: "Unfollow pace", free: "Safe: up to 30 an hour, 200 a day", premium: "Also Balanced: 45 an hour, 320 a day" },
      { label: "Automatic cleanup of GrowX follows", free: "-", premium: "After 2, 5 or 7 days, during autopilot breaks" },
      { label: "Re-check before each unfollow", free: "Included", premium: "Included" },
    ],
    tools: ["/tools/twitter-follower-ratio-calculator", "/tools/twitter-shadowban-checker"],
    relatedPosts: ["unfollow-non-followers-twitter", "twitter-follower-ratio", "follow-for-follow-twitter", "unfollow-inactive-accounts-twitter", "mass-follow-twitter-limits", "twitter-shadowban"],
    related: ["twitter-unfollower-tracker", "twitter-auto-follow"],
  },
  {
    slug: "twitter-reply-targets",
    nav: "AI Reply Assistant",
    blurb: "Fresh posts in your niche, ranked to reply early, with GrowX AI drafting replies you approve.",
    icon: "message",
    seoTitle: "AI Reply Assistant for X: Reply Early, Approve All",
    description:
      "GrowX's AI Reply Assistant finds fresh posts in your niche and drafts replies in your tone with on-device AI. You approve every reply. Free 30-day trial.",
    keywords: [
      "AI reply assistant",
      "AI reply generator for Twitter",
      "AI replies on X",
      "Twitter reply generator",
      "reply to big accounts early",
      "Twitter engagement tool",
      "reply guy tool",
      "GrowX",
    ],
    eyebrow: "AI Creator Studio · AI replies",
    h1: "An AI Reply Assistant for X that drafts, and lets you decide",
    lead:
      "Early, thoughtful replies under bigger posts are one of the fastest ways to get seen on X. GrowX finds fresh posts from the accounts you watch, ranks them by how fast they take off, and GrowX AI drafts a reply to each one in your tone, on your computer. You read and approve every reply; GrowX never replies by itself.",
    // TODO: a real screenshot of the AI Reply Assistant page (demo data); this one shows the Home dashboard.
    image: { src: "/screens/overview-251.webp", alt: "GrowX Home dashboard with daily goals, upcoming posts, this week on X and the popup with pace controls (demo data)" },
    highlights: [
      {
        title: "Fresh posts, ranked",
        text: "Posts younger than 120 minutes by default from your sources, VIPs and anyone you add, ranked by freshness and how fast they take off.",
      },
      {
        title: "Reply and like by hand",
        text: "Reply and like from GrowX without switching tabs. Nothing goes out until you press the button, and GrowX never sends DMs.",
      },
      {
        title: "AI drafts in your tone",
        text: "GrowX AI drafts a reply under each post: insightful, friendly, witty, supportive, curious or professional, short, medium or detailed.",
        premium: true,
      },
      {
        title: "Checked before it can be sent",
        text: "No repeat of a reply from the last 14 days, no placeholders left in, nothing over 280 characters, and a warning on generic text, links or hashtags.",
        premium: true,
      },
      {
        title: "Approve several, send in turn",
        text: "Approve a few drafts and GrowX sends them one at a time, 45 to 90 seconds apart, up to 10 at once and 80 a day.",
        premium: true,
      },
      {
        title: "AI reply buttons on X",
        text: "Tone buttons right beside X's own reply box: one click writes a reply into it. You edit it if you like and press Reply yourself.",
        premium: true,
      },
    ],
    steps: [
      {
        title: "Choose who to watch",
        text: "Your auto follow sources are already included. Add VIPs and anyone else whose posts you want to reply to.",
      },
      {
        title: "Open the AI Reply Assistant",
        text: "In AI Creator Studio, the AI Reply Assistant lists fresh posts from those accounts, ranked by how fast they take off. With Premium, press **Draft with AI** on a post or **Draft replies for all** (the top 10).",
      },
      {
        title: "Read, edit, approve",
        text: "Change a draft, ask for a new or shorter one, then send it, or approve several and press **Send approved**. Stop at any time.",
      },
    ],
    sections: [
      {
        heading: "Why replying early works on X",
        paragraphs: [
          "A good reply under a popular post can be read by many more people than a post from a small account, and some of those readers click through to profiles that add something useful. Timing matters: replies posted while a post is still fresh have a better chance of being seen near the top, while a reply added hours later often sits below many others.",
          "The hard part is noticing those posts in time and then writing something worth reading, fast. GrowX does the watching: it keeps posts younger than 120 minutes by default from your [auto follow](/features/twitter-auto-follow) sources, your VIPs and anyone you add, and ranks each one by freshness and how fast it is taking off. Those sources are the accounts your ideal audience already follows, so a visible reply there puts you in front of the same people GrowX is following for you.",
        ],
      },
      {
        heading: "How the AI reply assistant drafts on X",
        paragraphs: [
          "With **Premium**, **GrowX AI** drafts a reply under each fresh post, using your niche and voice from Settings and the options you pick: the **tone** (insightful, friendly, witty, supportive, curious or professional), the **length** (short, medium or detailed), the **approach** (add a point, ask a question, share an experience, or agree and build on it) and whether to use emojis. Your choice is saved. Press **Draft with AI** on one post, or **Draft replies for all** to draft the 10 highest-ranked posts one by one, with a Stop button.",
          "GrowX AI runs **on your computer**, using the AI model built into Chrome, the same as the [GrowX AI writer](/features/ai-tweet-writer): your drafts are not sent to GrowX and there is no API key. It never invents facts; where a number or name is needed it leaves a {placeholder} for you, and a draft with a placeholder left in cannot be sent.",
        ],
        bullets: [
          "**New draft** and **Shorter** on every draft; your edits are kept as you type",
          "No repeat of a reply you sent in the last 14 days, nothing over 280 characters, no two replies in one batch alike",
          "A warning on generic text, links and hashtags, so you can fix them before sending",
        ],
      },
      {
        heading: "You approve every reply",
        paragraphs: [
          "GrowX **never replies by itself**. You can send one reply, or approve several and press **Send approved**: they go out one at a time, 45 to 90 seconds apart, up to 10 at once and within an 80-a-day cap. Stop at any time. GrowX stops by itself when X asks for a break, when Premium ends or when another X account is signed in, and approved replies only go out from the account they were approved on.",
          "Replying and liking by hand from the list of fresh posts **stays free**, and GrowX only sends a reply or a like when you press the button. Everything happens in your own signed-in x.com session; GrowX never asks for your X password and never sends DMs. No tool can promise zero risk on X, so keep replies specific and spread them out.",
        ],
      },
      {
        heading: "AI reply buttons right in X (Premium)",
        paragraphs: [
          "Since version 2.5.0, a row of one-click buttons sits right beside **X's own reply box**, under a post and in X's reply dialog: AI Reply (your usual tone), Insightful, Friendly, Witty, Supportive, Curious and Professional, plus a button to swap in another reply and **More options**, which shows three replies to pick from with the tone, length and approach. Only reply boxes get them, never the box for a new post.",
          "One click and GrowX AI writes a reply to that post into X's box. You can still edit it, and **you press X's Reply button yourself**; GrowX never presses it. The buttons follow X's light, Dim and Lights out themes and your GrowX language, and you can turn them off on the AI Reply Assistant page. For what makes a reply worth reading, see the [Twitter reply strategy guide](/blog/twitter-reply-strategy).",
        ],
      },
      {
        heading: "People, VIPs and alerts",
        paragraphs: [
          "**People** is a lightweight contact list for X: add tags and notes, mark VIPs and watch flags, and see your mutuals and the fans you don't follow back yet. With **Premium**, **VIP alerts** send a notification when one of your VIPs posts, so you can reply while the post is still minutes old. Keep the list short; alerts for too many accounts turn into noise.",
        ],
      },
    ],
    plans: {
      free: [
        "Fresh posts from your sources, VIPs and accounts you add",
        "Ranking by freshness and how fast posts take off",
        "Reply and like from GrowX when you press the button",
        "People: tags, notes, VIPs, watch flags, mutuals and fans",
      ],
      premium: [
        "AI Reply Assistant: drafts in your tone, length and approach",
        "Approve several and send them one at a time (up to 10 at once, 80 a day)",
        "AI reply buttons beside X's own reply box",
        "VIP alerts when a VIP posts",
        "All included in the free 30-day Premium trial, no credit card",
      ],
    },
    faq: [
      {
        q: "Does GrowX reply to tweets automatically?",
        a: "No. GrowX AI drafts replies, but you read and approve every one. You send a reply yourself, or approve several and press Send approved, and GrowX sends them one at a time, 45 to 90 seconds apart. GrowX never replies by itself and never sends DMs.",
      },
      {
        q: "What is the GrowX AI Reply Assistant?",
        a: "The page in AI Creator Studio that lists fresh posts from the accounts you watch, ranked by how fast they take off, with GrowX AI drafting a reply to each one in your tone. The list and replying by hand are free; the AI drafts and sending approved replies are Premium.",
      },
      {
        q: "Where does GrowX AI write my replies?",
        a: "On your own computer, using the AI model built into Chrome. Your drafts are not sent to GrowX and there is no API key.",
      },
      {
        q: "Can GrowX write a reply right inside X?",
        a: "Yes, with Premium. Tone buttons sit beside X's own reply box; one click writes a reply into it. You can edit it, and you press X's Reply button yourself.",
      },
      {
        q: "How early should I reply to a big account's post on X?",
        a: "As early as you can while still adding something useful. Early replies have more time to be seen, which is why GrowX focuses on posts from roughly the last two hours by default.",
      },
      {
        q: "Can I get notified when a specific Twitter account posts?",
        a: "Yes, with Premium. Mark the account as a VIP in GrowX and VIP alerts will notify you when they post.",
      },
    ],
    xHeading: "An AI reply assistant for X that you stay in charge of",
    limits: [
      { label: "Fresh posts from sources, VIPs and accounts you add", free: "Included", premium: "Included" },
      { label: "Reply and like when you press the button", free: "Included", premium: "Included" },
      { label: "AI reply drafts (tone, length, approach)", free: "-", premium: "Included, on your computer" },
      { label: "Send approved replies", free: "-", premium: "One at a time, 45-90 s apart, up to 10 at once, 80 a day" },
      { label: "AI reply buttons beside X's reply box", free: "-", premium: "Included" },
      { label: "VIP alerts when a VIP posts", free: "-", premium: "Included" },
    ],
    tools: ["/tools/tweet-character-counter", "/tools/twitter-engagement-rate-calculator"],
    relatedPosts: ["twitter-reply-strategy", "twitter-engagement-groups", "how-to-increase-twitter-engagement", "twitter-lists-guide", "twitter-algorithm-explained", "how-to-go-viral-on-twitter"],
    related: ["ai-tweet-writer", "twitter-auto-follow", "twitter-analytics"],
  },
  {
    slug: "twitter-list-follow",
    nav: "List follow",
    blurb: "Follow exactly the accounts on your own list, from pasted names or a CSV or TXT file.",
    icon: "list",
    seoTitle: "Follow a List of Twitter Accounts: Paste or Upload",
    description:
      "Follow a list of Twitter accounts from pasted usernames, links or a CSV or TXT file. GrowX List follow works at a safe pace, free for 50 at a time.",
    keywords: [
      "follow a list of Twitter accounts",
      "bulk follow Twitter list",
      "follow accounts from CSV",
      "import usernames to follow on X",
      "Twitter list follow tool",
      "mass follow from a list",
      "GrowX",
    ],
    eyebrow: "New in version 2.4.6",
    h1: "Follow a list of Twitter accounts, exactly as you wrote it",
    lead:
      "List follow follows exactly the accounts on your own list: paste usernames, @mentions or profile links, or bring a CSV or TXT file. GrowX works through it at your pace, with the same safety as the autopilot, and shows what happened to every account.",
    // TODO: a real screenshot of the List follow page (demo data); this one shows the Grow page.
    image: { src: "/screens/grow-251.webp", alt: "GrowX Grow page with the Slow (free forever), Balanced, Turbo, X Premium and Custom pace presets that List follow also uses" },
    highlights: [
      {
        title: "Paste, upload or drop",
        text: "Paste names, @mentions or x.com links, or upload or drop a CSV or TXT file. Sentences only give up their @mentions and links, not every word.",
      },
      {
        title: "Exactly your list",
        text: "No sources and no scoring: GrowX follows the accounts you listed, in order, separate from the autopilot.",
      },
      {
        title: "Every account accounted for",
        text: "Waiting, followed, requested (for protected accounts) or skipped with the reason. Retry the ones that failed and export the list.",
      },
      {
        title: "Same pace and safety",
        text: "Random delays, breaks, hourly and daily caps and a stop on any warning from X. Only one of List follow and the autopilot runs at a time.",
      },
      {
        title: "Stop keeps your progress",
        text: "Press Stop whenever you like; the list remembers who was followed and carries on from there when you press Start.",
      },
      {
        title: "Lists of up to 5,000",
        text: "The free plan follows lists of 50 accounts at a time. Premium takes lists of up to 5,000.",
        premium: true,
      },
    ],
    steps: [
      { title: "Bring your list", text: "Open **List follow** in the GrowX dashboard and paste usernames or links, or upload a CSV or TXT file." },
      { title: "Check it", text: "GrowX shows the accounts it found and ignores anything that isn't a username, such as plain words or IDs." },
      { title: "Press Start", text: "GrowX follows the list at your pace and marks each account as followed, requested or skipped with the reason." },
    ],
    sections: [
      {
        heading: "When to use List follow instead of the autopilot",
        paragraphs: [
          "The [smart auto follow](/features/twitter-auto-follow) autopilot finds people for you: it reads the newest followers of accounts in your niche and ranks them by a follow-back score. **List follow** is for when you already know exactly who you want to follow: speakers from an event, members of a community, people from a spreadsheet you built, or accounts a colleague shared with you.",
          "The two are separate. List follow has its own page in the dashboard sidebar and its own Start button, and only one of them runs at a time, so your account never follows from two queues at once.",
        ],
      },
      {
        heading: "Bring a list in any format",
        paragraphs: [
          "Paste a plain list of usernames separated by spaces, commas, semicolons or new lines, with or without the @. Profile and post links work too: `x.com/name` and `twitter.com/name/status/1` both become `name`. If a line reads like a sentence, such as a pasted post or bio, GrowX takes only its @mentions and profile links instead of every word, and plain numbers are skipped because they are usually IDs or counts.",
          "You can also upload or drop a **CSV or TXT file**. GrowX finds the column that holds the usernames, removes duplicates and pages that are not accounts, and tells you how many it found and how many lines it ignored.",
        ],
      },
      {
        heading: "Careful pace, clear results",
        paragraphs: [
          "List follow uses the same pace presets and safety as the autopilot: random delays between follows, breaks, rolling hourly and daily caps, and an automatic slow-down or stop when X shows a warning. No tool can promise zero risk on X, so start with the free Slow pace.",
          "Every account ends up in one state you can see: **followed**, **requested** (a protected account, so a follow request was sent), **skipped** with the reason (not found, suspended, blocked or followed before) or **failed** when X kept refusing. Retry the failed ones, export the list, and press Stop at any time without losing your progress.",
        ],
        bullets: [
          "Free: lists of up to 50 accounts at a time",
          "Premium: lists of up to 5,000 accounts",
          "If X limits follows for the day, GrowX waits just under the number X allowed, then returns to your full pace by itself",
        ],
      },
    ],
    plans: {
      free: ["List follow with up to 50 accounts at a time", "Paste, CSV or TXT import", "The free Slow pace and the same safety as the autopilot", "Retry, export and Stop without losing progress"],
      premium: ["Lists of up to 5,000 accounts", "Balanced, Turbo and X Premium paces", "Everything in smart auto follow Premium"],
    },
    faq: [
      { q: "How do I follow a list of Twitter accounts?", a: "Open List follow in the GrowX dashboard, paste the usernames or profile links or upload a CSV or TXT file, and press Start. GrowX follows exactly those accounts at your pace and shows the result for each one." },
      { q: "How many accounts can I follow from a list?", a: "On the free plan, lists of up to 50 accounts at a time. Premium takes lists of up to 5,000. The pace's hourly and daily caps still apply, so a long list is followed over several days." },
      { q: "What file formats does List follow accept?", a: "Pasted text, a CSV file or a TXT file. Usernames can be written with or without the @, or as x.com or twitter.com profile and post links." },
      { q: "Can List follow and the autopilot run together?", a: "No, one runs at a time so your account never follows from two queues at once. Stop one before you start the other; Stop keeps your progress." },
      { q: "What happens to protected or suspended accounts on my list?", a: "A protected account gets a follow request and is marked requested. Accounts that are not found, suspended, blocked or already followed are skipped, with the reason shown next to each one." },
      {
        q: "Can I follow all members of an X (Twitter) List?",
        a: "Not with List follow: it reads usernames, @mentions and profile or post links, not List links. To follow the members of an X List, add the List as a source in smart auto follow (Premium). The autopilot then works through its members with your filters and pace.",
      },
    ],
    xHeading: "List follow: follow a whole list on X at a safe pace",
    limits: [
      { label: "List size", free: "Up to 50 accounts at a time", premium: "Up to 5,000 accounts" },
      { label: "Input", free: "Paste names or links, or a CSV or TXT file", premium: "Same" },
      { label: "Pace presets", free: "Slow, free forever", premium: "Also Balanced, Turbo and X Premium" },
      { label: "Retry, export, stop without losing progress", free: "Included", premium: "Included" },
    ],
    tools: ["/tools/twitter-follower-ratio-calculator", "/tools/twitter-shadowban-checker"],
    relatedPosts: ["how-to-build-a-twitter-follow-list", "mass-follow-twitter-limits", "twitter-follower-ratio"],
    related: ["twitter-auto-follow", "twitter-unfollow-tool", "twitter-unfollower-tracker"],
  },
];

export const getFeaturePage = (slug: string) => featurePages.find((f) => f.slug === slug);
