import type { Block, Post } from "./posts";

/**
 * Search-intent guides: the first 1,000 followers, the X follow limit per day (bulk/mass follow), unfollowing, tool
 * choice. The growth pillar is how-to-get-more-followers-on-twitter in posts-round5.ts. The follow-back score guide
 * (twitter-follow-back-score-growx) was merged into /features/twitter-auto-follow on 27 Nov 2026 (src/content/redirects.ts).
 * Same rules as posts.ts: facts come from docs/PRODUCT_FACTS.md (extension v2.4.4) and the site's own pages; no
 * invented statistics, testimonials or result promises; X's own limits are described without hard numbers that X
 * may change. Questions live in each post's `faq` field (rendered once by the page, with FAQPage structured data).
 */
const p = (text: string): Block => ({ type: "p", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });
const ol = (...items: string[]): Block => ({ type: "ol", items });
const note = (text: string): Block => ({ type: "note", text });
const table = (caption: string, head: string[], ...rows: string[][]): Block => ({ type: "table", caption, head, rows });
const qa = (q: string, a: string) => ({ q, a });

const DATE = "2026-10-25";
const UPDATED = "2026-10-29";
const TRY = "GrowX is free to install from the Chrome Web Store, and you can [create a free account](/signup) to try every Premium feature free for 30 days, no credit card needed. See the [plans](/pricing) or read [how GrowX works](/how-it-works).";

export const growthPosts: Post[] = [
  {
    slug: "first-1000-followers-on-x",
    seoTitle: "First 1,000 Followers on Twitter (X): New Account Guide",
    title: "How a New Account Gets Its First 1,000 Followers on X (Twitter)",
    description:
      "How a new X (Twitter) account gets its first 1,000 followers: finish the profile, post daily, reply early and follow the right people safely with GrowX.",
    excerpt:
      "A starter guide for new X accounts: set up the profile, post on a schedule, reply early and follow the right people safely on the way to your first 1,000 followers.",
    category: "Guides",
    keywords: ["first 1000 followers on Twitter", "first 1,000 followers on X", "get 1000 followers on X", "grow a new Twitter account", "new X account followers", "Twitter follow back", "GrowX"],
    datePublished: DATE,
    dateModified: "2026-11-27",
    readMinutes: 8,
    related: ["how-to-get-more-followers-on-twitter", "twitter-growth-plan", "mass-follow-twitter-limits"],
    sections: [
      {
        id: "intro",
        heading: "How do you get your first 1,000 followers on X?",
        blocks: [
          p("To get your first 1,000 followers on X (Twitter), finish your profile before anything else, post about one topic every day, reply early to bigger accounts in your niche and follow people who recently followed similar accounts. Start slowly, because a new account needs a gentler pace than an old one. Each week, check which posts and sources brought followers and do more of that."),
          p("**Is 1,000 followers in 30 days realistic?** It depends on your niche, your content and how much time you give it, so no honest guide can promise it. What a plan can do is remove wasted effort. This one is a 30-day routine for a **new or small X account**. Treat the number as a target to work towards, not a promise, and adjust the plan using your own results."),
          p("The routine combines manual work (profile, posts, replies) with **GrowX**, an X (Twitter) growth tool for Chrome, for the repetitive parts: finding people likely to follow back and following them at a safe pace, keeping a queue of scheduled posts, surfacing fresh posts to reply to and tracking what works. Everything in the plan works on the free plan; Premium extras are pointed out where they help."),
          p("This guide is for accounts starting from zero or close to it. For every tactic in one place, read [how to get more followers on Twitter](/blog/how-to-get-more-followers-on-twitter). If your account already has an audience and growth has stalled, the [week-by-week Twitter growth plan](/blog/twitter-growth-plan) fits better."),
        ],
      },
      {
        id: "week1",
        heading: "Week 1: Set up and warm up",
        blocks: [
          ul(
            "Finish your profile: photo, header, clear bio, pinned post and a link.",
            "Install GrowX and follow the setup wizard. Add **3 to 5 source profiles** in your niche, or press **Find sources for me** to get suggestions from the accounts you already follow, and keep the free **Slow** pace.",
            "Turn on the **warm-up** so a new account ramps up gradually (the daily cap starts at 60 and rises by 20 a day) instead of jumping to the full cap. Consider turning on **active hours** too; they are off by default.",
            "Write your first week of posts in one sitting and add them to the queue, then reply to 5 to 10 posts a day from accounts in your niche.",
          ),
          note("A brand-new account that follows hundreds of people on day one looks unnatural. Warm-up exists for exactly this reason, and no tool can promise zero risk on X."),
          p("Sources matter most in week one. GrowX follows each source's newest followers first, so a source that fits your niche gives you people who just showed interest in your topic. A source that is too big or too general gives you a crowd that does not care about what you post, however carefully it is paced."),
        ],
      },
      {
        id: "week2",
        heading: "Week 2: Raise quality, not just volume",
        blocks: [
          p("Open the queue and look at who GrowX is lining up. If many candidates look irrelevant, raise the **minimum follow-back score** (55 by default) or tighten the filters. If the queue is thin, lower it a little or add a source. Then check the **source leaderboard** in Grow: it shows the follow-back rate, retention and cost of every source, so you can drop the ones that do not deliver."),
          ul(
            "Keep posting daily. Try one thread or one \"how I did it\" post this week; the free [thread maker](/tools/twitter-thread-maker) helps you split a long draft into posts.",
            "Use the **AI Reply Assistant** to find fresh posts from your sources and reply within their first hour, when replies are most visible. See the [AI Reply Assistant](/features/twitter-reply-targets).",
            "Reply to the accounts your new followers engage with, since their audience overlaps with yours.",
          ),
        ],
      },
      {
        id: "week3",
        heading: "Week 3: Double down on what works",
        blocks: [
          p("By now you have data. Your **Growth Score** in Analytics shows which of its six parts is weakest, and post analytics show views, likes, reposts, replies, bookmarks and engagement rate for your latest posts, and **What works** compares topics and formats (questions, images, text, threads, links) by engagement. Write more of what earned a response. With Premium full analytics, **Which posts brought followers** highlights posts that were followed by more new followers than usual in the next 24 hours."),
          p("Check the **best time to post** heat map and move your queue slots towards the hours when your followers are active. On the Grow side, add sources similar to your best performers. If your account has stayed clean (no warnings) and you have Premium or the trial, you can move up to the **Balanced** pace."),
        ],
      },
      {
        id: "week4",
        heading: "Week 4: Clean up and keep the habit",
        blocks: [
          p("Run the **cleanup scan** to see who you follow that does not follow back, and unfollow the accounts you choose after reviewing them (up to 200 per run on the free plan). Keeping a healthy following-to-followers ratio makes your profile look more credible and keeps room under X's following limits. Details in [our unfollow guide](/blog/unfollow-non-followers-twitter)."),
          p("Look at the follower tracker as well: it records once a day who followed and who unfollowed you, with 7 days of history on the free plan. Then set a monthly goal in the goal planner so you can see the daily pace you need, and keep your daily goals and streak going into month two."),
        ],
      },
      {
        id: "daily",
        heading: "A daily routine that fits in 30 minutes",
        blocks: [
          p("Growth plans fail when they need more time than you have. This routine takes about half an hour a day once GrowX is running in the background, because the following and the posting no longer need you at a specific time."),
          ol(
            "Five minutes: check the GrowX popup. Is the autopilot running, is the queue full, any warnings?",
            "Ten minutes: write one post and add it to the queue, or check that tomorrow's slots are filled. More on the [post scheduler](/features/twitter-post-scheduler).",
            "Ten minutes: open the AI Reply Assistant and reply to five to ten fresh posts from accounts in your niche, adding something useful rather than \"great post\".",
            "Five minutes: thank and reply to people who engaged with you, since early supporters are the most valuable followers you will get.",
          ),
          p("On Sundays, spend twenty extra minutes in Analytics and on the source leaderboard: who followed back, which sources produced follow-backs, which posts earned the most engagement, who unfollowed you, and what you will change next week. Small weekly adjustments compound much better than a big overhaul once a month."),
        ],
      },
      {
        id: "review",
        heading: "Day 30: Review the month and plan the next one",
        blocks: [
          p("At the end of the month, compare where you started with where you are, but look beyond the follower count. Which three posts earned the most engagement, and what do they have in common? Which two sources produced the most follow-backs with the best retention? On how many days did you keep your posting and reply goals? Those answers are the plan for month two."),
          p("Keep what worked, replace the weakest sources, move your queue slots to your best hours and set a new monthly goal in the planner based on the pace you actually achieved, not the pace you hoped for. A realistic goal you hit builds more momentum than an ambitious one you abandon in week two."),
        ],
      },
      {
        id: "mistakes",
        heading: "Mistakes that slow new accounts down",
        blocks: [
          ul(
            "Following thousands of random accounts with no filters.",
            "Pushing to the fastest pace before the account has history. Read about the [Twitter follow limit per day](/blog/mass-follow-twitter-limits).",
            "Posting about five different topics, so nobody knows why to follow you.",
            "Posting in bursts and then going silent for a week. A queue with a few posts waiting smooths this out.",
            "Ignoring replies and DMs from the people who do follow.",
          ),
        ],
      },
      {
        id: "try",
        heading: "Try the plan",
        blocks: [p(TRY)],
      },
    ],
    faq: [
      qa("Can I really get 1,000 followers in 30 days?", "Some accounts do and many do not. It depends on niche, content quality, consistency and how targeted your following is. Use the plan as a structure and measure your own progress instead of expecting a fixed result."),
      qa("Which GrowX pace should a new account use?", "Start with Slow, the free pace, and turn on warm-up. Consider turning on active hours as well, since they are off by default. With Premium, move to Balanced after several clean days with no warnings from X."),
      qa("How many source profiles do I need?", "Three to five close matches are enough to start, or let Find sources for me suggest some. Add more only when the source leaderboard shows the existing ones are running dry or performing poorly."),
      qa("Do I need Premium for this plan?", "No. The plan works on the free plan: the Slow pace (about 100 follows a day), core filters, up to 10 queued posts, analytics for your latest 30 posts and 7 days of follower history. The 30-day Premium trial adds the faster paces, the smart score, unlimited scheduling, GrowX AI and full analytics if you want to try them."),
      qa("What if people follow but do not engage?", "Followers who never see anything they like will not stay. Keep posting for one clear audience, reply to the people who do engage, and check What works in Analytics to see which topics and formats get a response."),
    ],
  },
  {
    slug: "mass-follow-twitter-limits",
    seoTitle: "Twitter (X) Follow Limit Per Day: How Many Is Safe?",
    title: "The Twitter (X) Follow Limit Per Day, Explained: Limits, Risks and Safe Bulk Following",
    description:
      "What is the Twitter (X) follow limit per day? How the daily and 5,000 following limits work, what gets accounts restricted and how to bulk follow safely.",
    excerpt:
      "The daily follow limit, the 5,000 following cap, the behaviour that gets accounts restricted, and how to follow in bulk at a pace that stays inside the limits.",
    category: "Guides",
    keywords: ["Twitter follow limit per day", "X follow limit per day", "Twitter follow limit", "Twitter follow limit reached", "mass follow Twitter", "bulk follow Twitter", "safe Twitter auto follow", "GrowX"],
    datePublished: DATE,
    dateModified: "2026-11-27",
    readMinutes: 11,
    related: ["twitter-follower-ratio", "first-1000-followers-on-x", "how-to-build-a-twitter-follow-list"],
    sections: [
      {
        id: "intro",
        heading: "What is the Twitter (X) follow limit per day?",
        blocks: [
          p("The **Twitter (X) follow limit per day** is roughly 400 follows on a normal account. New accounts and fast bursts can be limited sooner, because X also watches short-term pace. Separately, everyone can follow up to 5,000 accounts in total, and past that the cap grows with your follower count. X can change these limits, so check its Help Center."),
          p("Staying under the number is not the whole story. **Mass follow** means following a very large number of accounts quickly, hoping some follow back. X treats sudden, repetitive following as spam-like behaviour. Possible consequences range from a temporary \"you are unable to follow more accounts\" message to locked or suspended accounts."),
          p("**Bulk following** can be the same goal done carefully: following many relevant accounts without clicking the follow button hundreds of times. That is a fair goal. The risk is how it is done. Following as fast as possible gets accounts rate-limited, locked or suspended, and it fills your list with people who will never follow back."),
          p("This guide explains how the limits work, which behaviours look automated, and how to follow in bulk with GrowX, an X (Twitter) growth tool whose smart auto follow is built around pacing. It cannot make mass following risk-free, and neither can any other tool."),
        ],
      },
      {
        id: "limits",
        heading: "How X follow limits work",
        blocks: [
          p("Two kinds of limits matter:"),
          ul(
            "**The daily follow limit**: roughly 400 follows a day on a normal account, with shorter bursts also watched. Newer and lower-trust accounts tend to be treated more strictly, and accounts with X Premium have higher limits.",
            "**The following cap**: everyone can follow up to 5,000 accounts; beyond that, how many people you can follow depends on how many follow you. GrowX estimates it at about 10% above your follower count. The [follower ratio guide](/blog/twitter-follower-ratio) and the free [follower ratio calculator](/tools/twitter-follower-ratio-calculator) show where you stand.",
          ),
          p("Hitting a limit once is a sign to slow down, not to try again harder. Repeatedly pushing against limits is what leads to restrictions."),
        ],
      },
      {
        id: "signs",
        heading: "Behaviours that look automated",
        blocks: [
          ul(
            "Following at perfectly even intervals, day and night.",
            "Following in huge bursts right after signing up or after a long quiet period.",
            "Following accounts that obviously do not match your niche.",
            "Following then unfollowing en masse within a day or two.",
            "Following hundreds of people while never posting or replying yourself.",
          ),
          p("Most of these are about rhythm and relevance rather than raw numbers. A slower account that follows random people around the clock can look worse than a faster one that follows relevant people during waking hours and posts every day."),
        ],
      },
      {
        id: "bulk",
        heading: "How to follow in bulk without looking like a bot",
        blocks: [
          p("Bulk following only works if the list is good. GrowX's [smart auto follow](/features/twitter-auto-follow) treats it as a pipeline: choose where candidates come from, filter and score them, then follow the best ones slowly, over hours and days. You still end up following hundreds of relevant accounts, but at a pace that looks human."),
          ol(
            "**Choose sources your audience already follows.** Add creators, brands or communities in your niche as **source profiles**. GrowX reads each source's newest followers and re-reads every source every hour. Three to five close matches beat twenty loose ones. **Find sources for me** suggests sources from the accounts you already follow, and **Find people now** harvests candidates at once. On Premium, a post's reposts, replies or likes, a search or #hashtag, or an X List can be a source too.",
            "**Follow the freshest followers first.** Each source's newest followers (the top 50 of its list by default) are followed first, because someone who followed a niche account in the last few hours is active right now. They skip the follow-back score but not the safety checks: GrowX still leaves out private accounts, accounts without a photo, accounts with zero posts, giant accounts and anyone matching your exclude keywords.",
            "**Filter and score everyone else.** GrowX removes accounts you already follow, private accounts, accounts without a profile photo and accounts that are too new, inactive, small or large (limits you can change). The rest get a **follow-back score from 1 to 99**, and only those above your minimum (55 by default) join the queue, which holds around 250 candidates and drops any older than 72 hours.",
            "**Bring your own list if you have one.** [List follow](/features/twitter-list-follow) follows exactly the accounts on a list you paste or upload: 50 at a time on the free plan, up to 5,000 on Premium. On Premium you can also import usernames into the autopilot queue to be followed first, and the **smart score** learns from your own follow-backs once you have enough history. Anyone on your never-follow list is always skipped.",
          ),
        ],
      },
      {
        id: "pace",
        heading: "How many follows a day GrowX makes",
        blocks: [
          p("Each GrowX pace has its own rolling hourly and daily caps. The free pace stays far below X's daily limit, and the faster ones are for accounts that already have a clean history:"),
          table(
            "GrowX pace presets: delay between follows, rests and caps",
            ["Pace", "Plan", "Between follows", "Rest", "Per hour", "Per day", "Best for"],
            ["**Slow** (the default)", "Free forever", "50 to 120 seconds", "20 minutes every 10 follows", "Up to 14", "About 100", "New accounts"],
            ["**Balanced**", "Premium", "30 to 75 seconds", "14 minutes every 18 follows", "Up to 28", "About 280", "Most accounts"],
            ["**Turbo**", "Premium", "18 to 45 seconds", "10 minutes every 25 follows", "Up to 40", "About 390", "Aged accounts with a clean record"],
            ["**X Premium pace**", "Premium", "12 to 32 seconds", "8 minutes every 35 follows", "Up to 60", "About 800", "Only accounts with X's own Premium subscription, which have higher limits on X"],
          ),
          p("These are the extension's own caps; X also enforces limits that it can change at any time. Balanced, Turbo and the X Premium pace are included in the free 30-day Premium trial."),
        ],
      },
      {
        id: "safer",
        heading: "A safer way to mass follow with GrowX",
        blocks: [
          p("GrowX is designed around avoiding the patterns that look automated:"),
          ul(
            "**Random delays and regular breaks**, plus occasional longer pauses (on about 8% of follows), so follows are not evenly spaced.",
            "**Optional active hours and warm-up**: active hours are off by default, but turning them on (08:00 to 23:30, on days you choose) stops the autopilot running around the clock, and warm-up starts a new account at a daily cap of 60 and raises it by 20 a day.",
            "**Rolling hourly and daily caps** on every pace, as listed above.",
            "**Adaptive slow-down and hard stops** after any warning, rate limit, challenge, lock or sign-out. GrowX never clicks through a challenge, and Alt + Shift + S stops everything at once.",
            "**Follow verification** to detect silent limits, and a **following-cap guard** (5,000, or about 10% above your follower count) that pauses instead of hammering X's cap.",
          ),
          p("The [Twitter auto follow](/features/twitter-auto-follow) page summarises every setting."),
          note("These measures reduce risk; they cannot remove it. No tool can promise zero risk on X. Start on the free Slow pace, and only move up once your account has a clean history."),
        ],
      },
      {
        id: "warmup",
        heading: "How to warm up a new account before following at scale",
        blocks: [
          p("A new account has no history, so any burst of activity stands out. Warming up means increasing activity gradually so the account builds a normal-looking record."),
          ol(
            "Complete the profile and post a few times before following anyone. Filling GrowX's post queue with a week of posts makes this easy.",
            "Turn on GrowX warm-up so the daily cap starts at 60 and rises by 20 a day instead of starting at the pace's full cap.",
            "Stay on the Slow pace for the first week or two and consider turning on active hours.",
            "Only after a clean period with no warnings consider moving to Balanced (Premium).",
            "Treat any rate-limit or warning message as a reason to pause for the day, not to retry.",
          ),
          p("Warm-up does not make mass following risk-free. It simply avoids the most obvious pattern, a brand-new account doing a lot at once. Keep your own judgement in the loop: if something about your account's behaviour on X feels off, stop the autopilot with Alt + Shift + S and look at it manually."),
        ],
      },
      {
        id: "mistakes",
        heading: "Common bulk-follow mistakes and how to avoid them",
        blocks: [
          p("Most bulk-follow problems come from the same few habits. Knowing them helps you choose settings that keep your account healthy."),
          ul(
            "**One giant source.** Following the followers of one huge celebrity gives you a crowd that does not care about your niche. Use several smaller, closely related sources.",
            "**Ignoring the score.** A queue with no minimum score is just a random list. Keep the minimum at a level where the follow-back rate on the source leaderboard is worth the effort.",
            "**Running at the fastest pace on a young account.** Speed is a common trigger for warnings. Faster presets are for aged accounts with a clean record.",
            "**Never checking results.** The point of bulk following is follow-backs. If a source does not deliver after a few days, remove it, or let Premium's auto-replace retire weak sources after a fair trial and swap in the best auto-found one (retired sources can be restored).",
            "**Forgetting the exit.** A large following list needs maintenance. Plan a gradual cleanup after a couple of weeks.",
          ),
          p("GrowX keeps old candidates out of the queue (anything older than 72 hours is dropped), re-reads sources every hour and tracks follow-back rate, retention and cost per source, so you can fix these mistakes with data instead of guesses."),
        ],
      },
      {
        id: "hit-limit",
        heading: "What to do if you hit a limit",
        blocks: [
          p("If X tells you that you cannot follow more accounts right now, the right response is patience. Stop following for the rest of the day, avoid clicking follow buttons by hand as well, and let the restriction clear. Then resume at a lower pace than before."),
          p("GrowX does part of this by itself. When X refuses follows after a certain number in 24 hours, GrowX holds at five fewer than that number for the next 24 hours, then returns to your full pace. Your pace setting does not change, and Start or \"Try again now\" asks X again at once."),
          p("If the message keeps coming back, or you see a lock, a verification challenge or a suspension notice, stop all automation and follow X's own instructions to resolve it. GrowX will not click through challenges for you and will halt after repeated automation warnings, because pushing through is how small problems turn into permanent ones."),
          p("Finally, review what triggered it. Was the pace too high for the age of the account? Were sources too broad, so the queue was full of weak candidates you had to churn through? Fixing the cause matters more than waiting out the limit."),
        ],
      },
      {
        id: "unfollow",
        heading: "Mass following needs careful tidying",
        blocks: [
          p("Give new follows a week or two, then review who did not follow back. Do it gradually rather than in one burst: GrowX's cleanup unfollows one account at a time at a safe pace of up to 30 an hour and 200 a day, and re-checks each account right before unfollowing it. On Premium, **automatic cleanup** can unfollow GrowX's own follows that did not follow back after 2, 5 or 7 days, only during autopilot breaks and within the same caps; it never touches accounts you followed yourself or imported. See our guide to [unfollowing non-followers safely](/blog/unfollow-non-followers-twitter) and the [Twitter unfollow tool](/features/twitter-unfollow-tool) overview."),
          p("It also helps to watch the other direction. The [unfollower tracker](/features/twitter-unfollower-tracker) records once a day who followed and who unfollowed you, so you can see whether a following campaign brings people who stay or people who leave after a few days."),
        ],
      },
      {
        id: "balance",
        heading: "Following is one lever, not the whole strategy",
        blocks: [
          p("Even when it is paced well, following is only one lever. People who notice your follow look at your profile and your last few posts before deciding, so a following campaign works best when the profile is finished and the posts keep coming. GrowX's scheduler can keep a queue of posts going while the autopilot runs, and the AI Reply Assistant helps you join conversations in your niche while they are still fresh."),
          p("A useful rule of thumb: if you spend more time tuning follow settings than writing posts and replies, the balance is off. Let the tool handle the repetitive following at a conservative pace, and put your own time into the things that make people stay."),
        ],
      },
      {
        id: "try",
        heading: "Follow smarter",
        blocks: [p(TRY)],
      },
    ],
    faq: [
      qa("What does \"you are unable to follow more accounts at this time\" mean?", "It means X has temporarily limited your following, usually because of volume or pace. Stop following for a while. GrowX treats such warnings as a signal to throttle and rest."),
      qa("How many follows per day is safe?", "There is no number that is safe for every account. X's daily limit is roughly 400 follows on a normal account, but new and low-trust accounts need to stay well below it. That is why GrowX starts every new install on the Slow pace (about 100 a day), recommends warm-up for new accounts and slows down by itself after warnings."),
      qa("How many people can I bulk follow per day with GrowX?", "On the free Slow pace GrowX follows up to about 100 a day, with hourly caps as well. The faster presets are part of GrowX Premium: Balanced at about 280, Turbo at about 390 and the X Premium pace at about 800. Turbo is meant for aged accounts and the X Premium pace only for accounts with X Premium. X applies its own limits too."),
      qa("Can I bulk follow a list of usernames I already have?", "Yes. List follow follows exactly the accounts on your own list, pasted or uploaded as a CSV or TXT file, at the same pace and with the same safety as the autopilot. The free plan takes 50 accounts at a time; Premium takes lists of up to 5,000."),
      qa("Will everyone I follow follow back?", "No. Only some will. Recent followers first, the filters and the follow-back score raise the odds by putting likelier accounts first, but no tool can promise a follow-back rate."),
      qa("Is following and then unfollowing risky?", "Rapid follow and unfollow cycles look manipulative. Give follows time to be returned and unfollow gradually. GrowX's Premium automatic cleanup waits 2, 5 or 7 days and only runs during autopilot breaks within the safe unfollow caps."),
      qa("Does bulk following work while my computer is asleep?", "No. GrowX needs Chrome running and you signed in to X. While the autopilot runs it keeps the computer awake, keeps working when you close the popup or switch tabs, and resumes after Chrome restarts."),
      qa("Can GrowX get my account suspended?", "No tool can promise zero risk on X. GrowX reduces the risk with paced, targeted following and hard stops, but you remain responsible for staying within X's rules."),
    ],
  },
  {
    slug: "unfollow-non-followers-twitter",
    seoTitle: "How to Unfollow Non-Followers on Twitter (X) Safely",
    title: "How to Unfollow Non-Followers on Twitter (X): A Safe Bulk Unfollow Guide",
    description:
      "How to find and unfollow people who don't follow you back on Twitter (X), see who unfollowed you and clean up inactive accounts at a safe pace with GrowX.",
    excerpt: "Find accounts that don't follow back or have gone quiet, see who unfollowed you, review the list and unfollow at a safe pace.",
    category: "Guides",
    keywords: ["unfollow non-followers Twitter", "bulk unfollow Twitter", "mass unfollow Twitter", "who doesn't follow me back on Twitter", "who unfollowed me on Twitter", "Twitter unfollow tool", "GrowX"],
    datePublished: DATE,
    dateModified: UPDATED,
    readMinutes: 7,
    related: ["mass-follow-twitter-limits", "unfollow-inactive-accounts-twitter", "how-to-get-more-followers-on-twitter"],
    sections: [
      {
        id: "why",
        heading: "Why clean up who you follow?",
        blocks: [
          p("After a growth push, your following list is full of people who never followed back and accounts that have gone quiet. Tidying it keeps your ratio healthy, makes your profile look more credible and leaves room under X's following cap. The trick is doing it **gradually and with review**, not by unfollowing everyone in one go."),
          p("GrowX, an X (Twitter) growth tool for Chrome, has a dedicated **Cleanup** area for this, next to its smart auto follow, scheduler and Analytics. This guide shows how to find who to unfollow, how to do it at a safe pace, and how to keep an eye on who unfollows you."),
        ],
      },
      {
        id: "scan",
        heading: "Find who to unfollow with the GrowX cleanup scan",
        blocks: [
          p("The Cleanup area scans who you follow and who follows you, then shows results for you to review before anything happens."),
          ul(
            "**Not following back**: accounts you follow that do not follow you. If your followers list could not be read to the end, those rows are marked \"unverified\" and bulk select is turned off for that view.",
            "**Inactive accounts**: those whose latest post is older than 30, 90, 180 or 365 days. If X does not say when an account last posted, its activity is unknown, and unknown is never called inactive.",
          ),
          p("The two views overlap in useful ways. An account that does not follow back and has not posted for a year is an easy decision; a large creator who does not follow back but posts every day is often worth keeping."),
        ],
      },
      {
        id: "review",
        heading: "Review before you unfollow",
        blocks: [
          p("You filter, search, sort and select the accounts yourself. Keep accounts you value even if they do not follow back, such as friends, customers or creators you learn from. GrowX only touches the accounts you selected and confirmed, and each one is re-checked with X right before it is unfollowed, so someone who followed you back in the meantime is not removed by mistake."),
          p("Narrow the list before you review it. For example, start with accounts that are both not following back and inactive for 90 days, go through that short list, then widen the filters. Reviewing a few dozen accounts carefully beats skimming thousands."),
        ],
      },
      {
        id: "pace",
        heading: "Unfollow at a safe pace",
        blocks: [
          p("Unfollows run one at a time with delays and rolling caps. The Safe unfollow pace allows up to 30 an hour and 200 a day, and the runner stops on a rate limit, warning, sign-out or lock rather than working around them."),
          ul(
            "**Free plan**: scanning, filtering and review, and up to **200 unfollows per run** at the Safe pace.",
            "**Premium**: select-all **bulk unfollow** of up to 5,000 accounts in one run, and a **Balanced unfollow pace** of 45 an hour and 320 a day.",
          ),
          p("A larger batch does not run faster than its pace allows; it simply spreads over more days. The [Twitter unfollow tool](/features/twitter-unfollow-tool) page summarises the options."),
          note("Avoid following heavily and unfollowing heavily on the same day. Alternate, and keep both paced. No tool can promise zero risk on X."),
        ],
      },
      {
        id: "auto",
        heading: "Automatic cleanup of GrowX's own follows (Premium)",
        blocks: [
          p("If you use GrowX's smart auto follow, **automatic cleanup** can handle the follow-backs that never came. It unfollows accounts that GrowX itself followed and that did not follow back after **2, 5 or 7 days** (you choose)."),
          ul(
            "It only runs during the autopilot's breaks, 40 to 90 seconds apart.",
            "It uses the same caps as the Safe unfollow pace: 30 an hour and 200 a day.",
            "It never touches accounts you followed yourself or imported from a list.",
          ),
          p("Longer waits give people more time to notice and follow back; shorter waits keep your ratio tighter. Seven days is the gentlest choice for most accounts."),
        ],
      },
      {
        id: "tracker",
        heading: "See who unfollowed you",
        blocks: [
          p("Cleanup is about who you follow. The other side is who follows you. The **follower tracker** in GrowX Analytics checks once a day who followed you and who unfollowed you. The free plan keeps 7 days of history; Premium keeps the full history and adds a one-click unfollow back for people who left."),
          p("Use it to spot patterns rather than to take things personally. A few unfollows a day is normal; a spike after a particular post or after a heavy following day tells you something about your content or your targeting. Compare it with post performance in [Twitter analytics](/features/twitter-analytics), and read more in the [unfollower tracker](/features/twitter-unfollower-tracker) overview."),
        ],
      },
      {
        id: "ratio",
        heading: "Why your following-to-followers ratio matters",
        blocks: [
          p("A profile that follows ten times more people than follow it can look like a follow-spammer, and it uses up room under X's following cap. Bringing the ratio closer to even makes the account look more credible to new visitors and keeps options open if you want to follow new people later."),
          p("That does not mean unfollowing everyone who does not follow back. Some of the best accounts to follow are large creators who will never follow you. The cleanup scan is a tool for review, not a rule: use filters to focus on small accounts that ignored you and on accounts that have gone silent, and keep the rest."),
          ul(
            "Growing: follow relevant accounts, wait a week or two.",
            "Reviewing: scan, deselect keepers, unfollow the remainder in paced batches.",
            "Maintaining: repeat every few weeks so the list never gets out of hand.",
          ),
        ],
      },
      {
        id: "dont",
        heading: "What not to do when unfollowing",
        blocks: [
          p("Bulk unfollowing is easy to get wrong. A few habits to avoid:"),
          ul(
            "Do not unfollow everyone in one sitting. Spread it across days using the paced runner.",
            "Do not unfollow people within hours of following them; give them time to notice and decide.",
            "Do not trust a scan whose results are marked unverified for bulk actions. Review those accounts one by one or run the scan again.",
            "Do not unfollow accounts you rely on, such as customers, partners and sources of news, just because they do not follow back.",
          ),
          p("The cleanup tools are built so you stay in control: nothing is unfollowed until you select it and confirm, unless you turn on automatic cleanup for GrowX's own follows."),
        ],
      },
      {
        id: "routine",
        heading: "A simple routine",
        blocks: [
          ol(
            "Give new follows a week or two to follow back.",
            "Run a cleanup scan.",
            "Review the not-following-back list and deselect anyone you want to keep.",
            "Unfollow the rest in a Safe-paced run.",
            "Check the follower tracker and growth chart to see the effect on your ratio.",
          ),
          p("How often? For most accounts every two to four weeks is enough. If the autopilot follows a lot for you, a weekly scan keeps the list manageable, or Premium automatic cleanup can handle GrowX's own follows in the background so the manual scan only has to cover accounts you followed yourself."),
          p("New to GrowX? Start with [how auto follow works](/features/twitter-auto-follow)."),
        ],
      },
      {
        id: "try",
        heading: "Clean up with GrowX",
        blocks: [p(TRY)],
      },
    ],
    faq: [
      qa("How do I find who does not follow me back on Twitter?", "Run the GrowX cleanup scan: it compares who you follow with who follows you and lists accounts that do not follow back, flagging results as unverified when the followers list could not be read fully."),
      qa("Can I see who unfollowed me on Twitter (X)?", "Yes. The follower tracker in GrowX Analytics checks once a day who followed and who unfollowed you. The free plan keeps 7 days of history; Premium keeps the full history and adds one-click unfollow back."),
      qa("Can I unfollow inactive accounts only?", "Yes. Filter the scan by inactivity (30, 90, 180 or 365 days) and select only those. Accounts with an unknown last post time are never labelled inactive."),
      qa("How many accounts can I unfollow at once?", "Up to 200 per run on the free plan. Premium adds select-all bulk unfollow of up to 5,000 in one run. Either way, unfollows go out one at a time within hourly and daily caps."),
      qa("Does GrowX unfollow anyone automatically?", "Only what you select and confirm, unless you turn on Premium automatic cleanup, which unfollows GrowX's own follows that did not follow back after 2, 5 or 7 days. It never touches accounts you followed yourself or imported."),
    ],
  },
  {
    slug: "best-twitter-growth-tools",
    seoTitle: "Best Twitter (X) Growth Tools: What to Look For",
    title: "Best Twitter (X) Growth Tools: What to Look for Before You Install One (and Where GrowX Fits)",
    description:
      "Comparing Twitter (X) growth tools? Use this checklist for safety, targeting, scheduling, analytics, privacy and price, and see honestly where GrowX fits.",
    excerpt: "A buyer's checklist for X growth tools, from auto follow and scheduling to AI writing and analytics, with an honest look at where GrowX fits.",
    category: "Guides",
    keywords: ["best Twitter growth tools", "Twitter growth tool", "X growth tool", "best Twitter auto follow", "Twitter post scheduler", "Twitter analytics tool", "GrowX"],
    datePublished: DATE,
    dateModified: "2026-11-27",
    readMinutes: 9,
    related: ["how-to-get-more-followers-on-twitter", "best-chrome-extensions-for-twitter", "typefully-vs-tweet-hunter"],
    sections: [
      {
        id: "intro",
        heading: "How to judge a Twitter growth tool",
        blocks: [
          p("We make GrowX. This list includes it, and we explain the trade-offs. The **best Twitter (X) growth tool** is the one that protects your account with a human pace, chooses who to follow, helps you post consistently, shows what is working, is clear about your login and data, and lets you try it free. Judge every tool, ours included, by that checklist."),
          p("Search for the best Twitter growth tool and you will meet many options with similar promises. Some only follow people, some only schedule posts, and a few try to do everything. Instead of trusting a ranking, run each one through the eight questions below."),
          p("GrowX is an X (Twitter) growth tool for Chrome that combines smart auto follow, a post scheduler, an on-device AI writer, analytics, an unfollower tracker, an AI Reply Assistant and cleanup tools. We built it to do well on these points, and we will say plainly where it has limits. The [features overview](/features) lists everything in one place."),
        ],
      },
      {
        id: "safety",
        heading: "1. Does it protect your account?",
        blocks: [
          ul(
            "Randomised delays, breaks and rolling hourly and daily caps instead of fixed-interval bursts.",
            "It slows down or stops on warnings, rate limits, challenges, locks and sign-outs, and never clicks through challenges.",
            "An emergency stop you can reach in one keystroke.",
            "Safety limits on posting too, not only on following: a daily cap and a minimum gap between scheduled posts.",
          ),
          p("GrowX does all of these (see [how it works](/how-it-works)), and its safety features are on every plan, not reserved for paying users. No tool, ours included, can promise zero risk on X."),
        ],
      },
      {
        id: "targeting",
        heading: "2. Does it choose who to follow?",
        blocks: [
          p("A tool that follows anyone wastes your follows. Look for filters (audience size, activity, profile quality, keywords) and some way to rank candidates. GrowX uses source profiles (or finds them for you), follows each source's newest followers first and ranks everyone else with hard filters and a [follow-back score from 1 to 99](/features/twitter-auto-follow). A source leaderboard shows the follow-back rate, retention and cost of each source, and on Premium a smart score learns from your own follow-backs."),
        ],
      },
      {
        id: "content",
        heading: "3. Does it help you post consistently?",
        blocks: [
          p("Following brings people to your profile; posts make them stay. A growth tool that ignores content leaves half the job to you. Look for a composer that counts characters the way X does, threads, a queue and some guidance on when to post."),
          p("GrowX's **AI Creator Studio** handles posts and threads of up to 25 parts, schedules them or adds them to a queue of time slots, and shows a best-time-to-post heat map from your own data. The free plan keeps up to 10 posts waiting; Premium adds unlimited scheduling, evergreen recycling and auto-plug. See the [Twitter post scheduler](/features/twitter-post-scheduler)."),
          p("If a tool offers AI writing, ask where the text goes. **GrowX AI** (Premium) runs on your own computer using the AI model built into Chrome, with no API key and nothing sent to GrowX, and it leaves placeholders instead of inventing facts. More on the [AI tweet writer](/features/ai-tweet-writer)."),
        ],
      },
      {
        id: "measure",
        heading: "4. Does it show what is working?",
        blocks: [
          p("Without measurement, you cannot tell good settings from bad ones. Look for post-level analytics, a way to see who followed and who unfollowed you, and per-source results if the tool follows people for you."),
          p("GrowX Analytics shows who followed you back, a Growth Score, and views, likes, reposts, replies, bookmarks and engagement rate for your posts (your latest 30 on the free plan, everything with Premium full analytics), compares topics and formats, and tracks daily who followed and unfollowed you (7 days of history free, full history on Premium). Daily goals, streaks and milestones keep the routine visible. See [Twitter analytics](/features/twitter-analytics)."),
        ],
      },
      {
        id: "engage",
        heading: "5. Does it help you engage, without replying for you?",
        blocks: [
          p("Replies are one of the best ways for a small account to be seen, but replies a tool sends by itself tend to sound generic and can run against X's automation rules. A good tool helps you find the right posts and leaves the replying to you. The GrowX **AI Reply Assistant** collects fresh posts from your sources, VIPs and anyone you add, ranked by freshness and how fast they take off, and nothing is sent until you approve it."),
        ],
      },
      {
        id: "privacy",
        heading: "6. What does it do with your login and data?",
        blocks: [
          ul(
            "Does it ask for your X password? GrowX does not: it works inside your own signed-in x.com session and does not use X OAuth.",
            "Where are your lists, history and analytics stored? In GrowX they stay in your browser's storage. Optional Chrome sync uses Chrome's own sync storage, not a GrowX server, and the optional anonymous usage counts contain no X data and can be switched off.",
            "Where does AI text go? GrowX AI runs on your computer, so drafts are not sent to GrowX.",
          ),
          p("See the [privacy policy](/privacy) for the website's data handling."),
        ],
      },
      {
        id: "price",
        heading: "7. Can you try it without paying?",
        blocks: [
          p("GrowX has a free plan for daily use: the Slow pace (about 100 follows a day), core filters, the scheduler with up to 10 queued posts, analytics for your latest 30 posts, 7 days of follower history and cleanup of up to 200 accounts per run. Every new account gets a 30-day Premium trial with no credit card. It starts by itself once you confirm your email or continue with Google."),
          p("Premium adds the Balanced, Turbo and X Premium paces, advanced filters, list import, the smart score, more source types, auto-replace for weak sources, unlimited scheduling, evergreen recycling, auto-plug, GrowX AI, full analytics and follower history, VIP alerts, a workspace per X account, bulk unfollow of up to 5,000, a Balanced unfollow pace and automatic cleanup. Plans are prepaid with no automatic renewal. See [pricing](/pricing)."),
        ],
      },
      {
        id: "limits",
        heading: "8. Honest limits",
        blocks: [
          ul(
            "GrowX is a **Chrome extension** for desktop Chrome (version 116 or later); it is not a mobile app.",
            "It works while Chrome is running and you are signed in to X. A scheduled post that is more than 6 hours late because your computer was off is not posted by itself; it waits as \"missed\".",
            "GrowX AI needs a recent desktop Chrome with enough memory and disk space. Without it, the AI buttons fall back to templates and the plain thread splitter.",
            "It helps you write, but it does not replace having something worth saying.",
            "Results vary by niche and account, and X's rules can change.",
          ),
          p("So another tool can be the better pick:"),
          ul(
            "**Posts that go out while your computer is off.** A web app that posts from its own servers, such as Tweet Hunter or Typefully, fits better.",
            "**Several networks.** GrowX only covers X. Typefully supports X and several other networks.",
            "**A library of popular posts.** Tweet Hunter is known for one. GrowX has 52 templates and, on Premium, an AI writer that works from your own niche instead.",
          ),
          p("Our [comparison pages](/alternatives) say what each of these tools does well and when to choose it instead of GrowX."),
        ],
      },
      {
        id: "questions",
        heading: "Questions to ask before you install anything",
        blocks: [
          p("Before installing any extension that acts on your X account, read what permissions it asks for and what the vendor says it does with your data. A few questions are worth answering every time:"),
          ul(
            "Who makes it, and is there a real website, privacy policy and support address? GrowX has all three: see [about](/about), [privacy](/privacy) and [contact](/contact).",
            "Does it say what happens when X pushes back? Vague promises of \"unlimited\" following are a red flag.",
            "Can you leave? Look for a backup or export option so your lists are not locked in. GrowX can export a backup file at any time.",
            "Are the claims believable? Be wary of guaranteed follower counts, fake-looking reviews and countdown-timer discounts.",
          ),
          p("A tool earns trust by being specific about what it does and does not do. We try to hold GrowX to that standard, and you are welcome to compare it against any alternative using the same checklist."),
        ],
      },
      {
        id: "summary",
        heading: "Quick summary of what GrowX offers",
        blocks: [
          ul(
            "A Chrome extension that works in your own signed-in X session, organised into Home, Grow, List follow, AI Creator Studio, Analytics, Cleanup and Settings.",
            "**Grow**: smart auto follow with source profiles, recent followers first, filters, a follow-back score from 1 to 99 and four pacing presets (Slow, free forever; Balanced, Turbo and the X Premium pace with Premium).",
            "**AI Creator Studio**: posts and threads, a scheduler with queue slots, a best-time heat map, 52 templates, the AI Reply Assistant and a People list with tags, notes and VIPs; GrowX AI on Premium.",
            "**Analytics**: who followed back, Growth Score 2.0 and an AI Growth Coach, post analytics, a follower and unfollower tracker, top fans, goals, streaks and milestones.",
            "**Cleanup**: a scan for inactive and not-following-back accounts, with paced unfollowing.",
            "A free plan, a 30-day Premium trial without a credit card and prepaid Premium plans.",
          ),
          p("If that matches what you need, the quickest way to know is to try it on the free plan. If it does not, the checklist above will help you evaluate the next tool the same way."),
        ],
      },
      {
        id: "try",
        heading: "Judge GrowX yourself",
        blocks: [p(TRY)],
      },
    ],
    faq: [
      qa("Is GrowX free?", "Yes. The free plan includes the Slow pace (about 100 follows a day), core filters, the scheduler with up to 10 queued posts, analytics for your latest 30 posts, 7 days of follower history and cleanup of up to 200 per run. You can try every Premium feature free for 30 days without a credit card."),
      qa("Does GrowX need my X password?", "No. It works in your own signed-in x.com session and does not use X OAuth or store your X login."),
      qa("Does GrowX work on mobile?", "No. It is an extension for desktop Chrome (version 116 or later) on Windows, macOS, Linux and ChromeOS."),
      qa("How is GrowX different from a simple auto follow script?", "A simple script usually only follows. GrowX is a full X growth tool: its smart auto follow chooses who to follow with sources, filters and a follow-back score and follows at a human pace with caps and stops, and it also includes a post scheduler, an on-device AI writer (Premium), post analytics, an unfollower tracker, an AI Reply Assistant and cleanup tools."),
      qa("Does the AI writer send my drafts to a server?", "No. GrowX AI (Premium) runs on your computer using the AI model built into Chrome, with no API key and nothing sent to GrowX. If your Chrome cannot run the model, the AI buttons fall back to templates and the plain thread splitter."),
    ],
  },
];
