# GrowX product facts (extension v2.5.1)

The single reference for website copy. Every claim on the site and in the blog must match this file, which was
taken from the extension source (manifest, `shared/config.js`, `shared/plan.js`, `shared/whatsnew.js`,
`shared/learn.js`, `shared/insights.js`, `shared/growth.js`, `shared/twitterscore.js`, `shared/content.js`, `background-*.js`).
When the extension changes,
update this file first.

## Identity
- Name: **GrowX: The Ultimate X (Twitter) Growth Tool** (manifest name). Short name: GrowX. Version 2.5.1 (release notes: /whats-new, from `shared/whatsnew.js`; detailed record in the extension's CHANGELOG.md). 2.5.0 was the AI Reply Assistant release; 2.5.1 brought the X update fix, the Slow pace, AI Creator Studio, Analytics and TwitterScore.
- Store description (2.5.1): "Auto follow, unfollow tool, tweet scheduler, unfollower tracker and AI replies for X (Twitter). Safe pacing, no password."
- A Chrome extension (Chrome 116+, desktop: Windows, macOS, Linux, ChromeOS). Not a mobile app.
- Works inside the user's own signed-in x.com session. Never asks for the X password, does not use X OAuth.
- Developer: Shahriar Ahmed. Website: www.growxapp.org. GrowX is independent, not affiliated with X Corp.
- Dashboard areas (2.5.1 sidebar): **Home, Grow, List follow, AI Creator Studio, Analytics, Cleanup, Settings** (+ Help). Related pages share a tab bar:
  - Grow: Sources, Queue, Targeting, Pace & safety.
  - AI Creator Studio (Create and Engage up to 2.5.0): Write, Queue & calendar, Templates, Evergreen, AI Reply Assistant, People. The phone tab bar calls it Studio.
  - Analytics (Insights up to 2.5.0): Who followed back (first page), Growth, Posts, Followers, Follows, History, Weekly report.
  - Settings: General, Appearance, AI writer, Accounts & sync.
  - Old links to Create, Engage, Insights and Donate still open the right page. The Donate page was removed in 2.5.1.
- Popup with pace switch, Start/Pause/Stop and a quick post box; its footer links to GrowXApp.org.
- **Home**: Growth Score and **TwitterScore** side by side (2.5.1), today's follows and goals, posts up next, this week on X.

## Grow (smart auto follow)
- Add **source profiles** (accounts in your niche); GrowX follows their **newest followers**. "Find sources for me" auto-finds sources from the accounts you follow (ranks them by how active, mid-sized and follow-back-prone their audience is). "Find people now" harvests immediately.
- **Recent followers first**: each source's newest followers (top 50 of the list by default) are followed first; they skip the score but keep safety checks (no private, no photo-less, no zero-post, no giant accounts, your exclude keywords).
- Everyone else is queued by a **follow-back score 1-99** (follow ratio, audience size, how many they follow, follow-back words in bio, recent activity, account age, photo/bio, verified, recency). Default minimum 55. Queue keeps ~250 candidates; candidates older than 72 h are dropped; sources are re-read every hour (3 pages).
- **Smart score (Premium)**: a small model learned from YOUR own follow-backs (logistic regression, needs ~80 settled follows with at least 12 follow-backs and 12 non-follow-backs, checked on a holdout, blended in at up to 60% weight only when it clearly beats chance).
- **More source types (Premium)**: a post's reposts, replies and likes; searches and #hashtags; X Lists.
- **Auto-replace weak sources (Premium)**: after a fair trial, weak sources are retired and replaced with the best auto-found one (restorable).
- **Source leaderboard**: follow-back rate, retention and cost per source.
- Pace presets (seconds between follows, rest, rolling caps; `shared/config.js` PRESETS, `shared/plan.js` FREE_PACE / FAST_PACES):
  - **Slow (free forever, the default for new installs)**: 50-120 s, a 20-minute rest every 10 follows, up to 14/hour, ~100/day ("gentle on new accounts")
  - Balanced (Premium): 30-75 s, a 14-minute rest every 18, up to 28/hour, ~280/day (recommended for most accounts)
  - Turbo (Premium): 18-45 s, a 10-minute rest every 25, up to 40/hour, ~390/day (aged accounts)
  - X Premium (Premium): 12-32 s, an 8-minute rest every 35, up to 60/hour, ~800/day (accounts with X Premium only)
  - Custom: numbers faster than Slow are Premium
  - Balanced, Turbo and X Premium are included in the 30-day Premium trial. On Free a faster saved choice is kept: GrowX runs at Slow, says so, and uses the saved choice again once Premium is active.
  - Up to 2.5.0 the first pace was **Safe** (45-110 s, ~150/day) and Balanced was free and the default. A saved Safe became Slow in 2.5.1. Never describe Safe or a free Balanced as current.
  - Cleanup's **unfollow** paces are separate and keep their names: Safe unfollow (free, 30/hour, 200/day) and Balanced unfollow (Premium, 45/hour, 320/day).
- **X update fix (2.5.1)**: X changed its web app and refused the requests behind post sources (reposts, likes), replies and reading your posts; they work again, and GrowX now learns X's request ids, flags and newly required variables from X's own page and adapts by itself (each once, then remembered).
- **Follow GrowX's creator (2.5.1)**: the first time someone starts the autopilot, GrowX asks once whether they'd like to follow @0x_nation, who makes GrowX. Follow follows through their own x.com tab; No thanks never asks again. Nobody is followed without that click.
- Safety: random delays, breaks, 8% longer pauses, optional active hours (08:00-23:30 default when turned on) and days, optional warm-up (daily cap starts at 60, +20/day), session target, following-cap guard (5,000 or ~10% above your follower count), adaptive slow-down after any X warning, follow verification (shadow-limit detection), stops on sign-out/lock/challenge/repeated automation warnings, emergency stop **Alt+Shift+S**, keeps the computer awake while running, resumes after Chrome restarts, runs in the background (service worker).
- Filters (core, free): skip already-followed / follows-you, private, no photo, optional bio, min/max followers (15 / 8,000), min following (40), min ratio 0.4, min posts (5), min account age (30 d), last active (45 d), exclude keywords (adult terms by default), follow-back boost words.
- Advanced filters (Premium): include keywords, location keywords, verified-only / skip verified, account age and last-active rules.
- List import (Premium): paste a list of usernames to follow first (inside the autopilot queue).
- **X's daily follow limit (2.4.6)**: when X refuses follows after N follows in 24 h, GrowX holds at N-5 for the next 24 h, then returns to the user's full pace by itself. The pace's own number never changes; Start and "Try again now" (popup, sidebar, Sources) ask X again at once.
- Pace and the Start button sit on Grow > Sources next to the sources (2.4.5); the pace can also be changed from the popup. Detailed settings fold behind one-line summaries.

## List follow (new in 2.4.6, `shared/lists.js`)
- Follows exactly the accounts on the user's own list. Own page in the sidebar, own Start; separate from the autopilot and only one of the two runs at a time.
- Input: pasted names, @mentions or x.com / twitter.com profile and post links (separated by spaces, commas, semicolons or lines), or a CSV or TXT file (upload or drop). Prose lines only give their @mentions and links; all-digit tokens are ignored; duplicates and reserved pages removed.
- States: waiting (queued), followed, requested (protected account), skipped with the reason (not found, suspended, blocked, followed before), failed. Retry, export; Stop keeps progress.
- Same pace presets and safety as the autopilot.
- Free: lists of 50 at a time (`FREE.listFollow`). Premium ("Big lists for List follow"): up to 5,000.
- Never-follow list (blacklist).

## AI Creator Studio: Write, Queue & calendar, Templates, Evergreen (posts and threads; "Create" up to 2.5.0)
- Composer: posts and **threads** (up to 25 parts), up to 4 images per post, X's own character counting (links count 23, most emoji/CJK count 2), long posts for X Premium accounts (25,000).
- **Post now, schedule, or Add to queue** (Buffer-style queue slots; default 09:00, 13:00, 18:30, every day).
- **Best time to post**: a week x 24 h heat map from your own posts' engagement and when your followers are active.
- **Calendar**, **drafts**, **52 templates** (hooks, threads, lists, stories...), your own templates, "Thread it" splitter.
- Posting safety: daily cap (20 by default), minimum gap (5 min), pauses on any X warning; a post more than 6 hours late (computer was off) is never posted by itself, it waits as "missed". Posts only as the X account it was written for.
- Free: up to **10 posts/threads waiting** in the queue at once. **Unlimited scheduling (Premium)**.
- **Evergreen recycling (Premium)**: best posts posted again every N days (30 default) with rotating variants, or reposted.
- **Auto-plug (Premium)**: once a post takes off (50 likes default), GrowX replies to it with your call to action.
- Quick post box in the popup.

## GrowX AI (Premium)
- Write, Improve, Hooks, Thread it, reply ideas and a weekly summary.
- Runs **on the user's computer** using the AI model built into Chrome: private, free, no API key, nothing sent to GrowX. Uses your niche and voice settings. Never invents facts (uses {placeholders}).
- Needs a recent desktop Chrome with enough memory/disk; Chrome downloads the model once. When unavailable, the AI buttons fall back to templates and the plain thread splitter.

## Analytics ("Insights" up to 2.5.0)
- **Who followed back (2.5.1, free, the first Analytics page)**: everyone who followed you back after GrowX followed them, newest first: when you followed, when they followed back, how long it took and the source. The last 7, 30 or 90 days or all time, a source filter, search, CSV export and Check now. On top: how many followed back, the rate among follows old enough to judge, the typical wait and the best source.
- **Growth Score 2.0 (2.5.1, free, Growth page)**: 0-100 from six parts of your own numbers: follower growth 25%, engagement 25%, post reach 15%, consistency 15%, follow-backs 10%, retention 10%. Each part shows its score, the numbers behind it, how it's scored and how to raise it; a part without enough data says what it needs (the score appears once two parts have data). Kept once a day, with the change since last week.
- **Growth dashboard (2.5.1, free)**: followers gained and follow-backs per week, views and engagement per week, your score over time, and five tiles (followers, engagement, views, posts, follow-backs), each against the month before.
- **AI Growth Coach (2.5.1)**: the most useful next steps from your own numbers (weakest parts first, the autopilot, your queue, your next best time to post, the formats and topics that do best) - free. **Ask GrowX AI for this week's plan** is Premium (GrowX AI, on your computer).
- **TwitterScore on Home (2.5.1, free, optional)**: your own account's TwitterScore (twitterscore.io) next to your Growth Score, with the change this week; asked once a day (again after 6 hours if it failed), kept 120 days. GrowX sends only your @username, and only after Chrome's optional permission is granted (Home asks once, "Show my TwitterScore"). Settings - General - "Show my TwitterScore on Home" turns it off; then nothing is sent.
- **Post analytics**: views, likes, reposts, replies, bookmarks and engagement rate of your recent posts, refreshed every 3 hours while x.com is open. Free: your latest **30 posts**.
- **What works**: topics and formats (questions, images, text, threads, links) by engagement.
- **Which posts brought followers**: new followers in the 24 h after each post above your usual pace (Premium, part of Full analytics).
- **Follower tracker**: once a day, who followed and who **unfollowed** you. Free: **7 days** of history. **Full follower history + one-click unfollow back (Premium)**.
- **Follower quality (Premium)**: real & active / inactive (90+ days) / likely bot / private, from your newest followers, on request.
- **Top fans**: who likes and replies to you most.
- **Weekly report (Premium)**: this week vs last week (new followers, unfollowers, best posts), Monday notification.
- Growth chart, history, daily goals (posts, replies, new followers), **streaks and milestones**, monthly goal planner.
- Everything is read through an x.com tab that is already open, one small step per minute at most.

## AI Creator Studio: AI Reply Assistant and People ("Engage" up to 2.5.0)
- **AI Reply Assistant** (2.5.0; the page was called Reply targets): fresh posts (default: younger than 120 minutes) from your sources, VIPs and anyone you add, ranked by freshness and how fast they take off, so you can reply early. Reply and like by hand from GrowX: free, only when you press the button.
- **AI drafts (Premium, `aiReply`)**: GrowX AI drafts a reply under each fresh post in your niche and voice (Settings - AI writer), on your computer. Options, saved: tone (Insightful, Friendly, Witty, Supportive, Curious, Professional), length (Short, Medium, Detailed), approach (add a point, ask a question, share an experience, agree and build on it), emojis on/off. Draft with AI on one post, or Draft replies for all (the 10 highest-ranked posts, one by one, with Stop). New draft and Shorter on each draft; edits are kept.
- **Checks before a draft can be sent**: no repeat of a reply sent in the last 14 days, no `{placeholders}` left in, nothing over 280 characters, no two replies in one batch alike; generic text, links and hashtags get a warning.
- **Send approved (Premium)**: send one reply, or approve several and press Send approved: they go out one at a time, 45-90 s apart, up to 10 at once and within an 80-a-day cap. Stop at any time; GrowX stops by itself when X asks for a break, when Premium ends or when another X account is signed in (approved replies only go out from the account they were approved on). **GrowX never replies by itself: you read and approve every reply.**
- **AI reply buttons on X (Premium, 2.5.0)**: one-click buttons beside X's own reply box (under a post and in X's reply dialog, never the new-post box): AI Reply (your usual tone), Insightful, Friendly, Witty, Supportive, Curious, Professional, a swap button and More options (three replies to pick from, with tone, length and approach). GrowX AI writes the reply into X's box; you can edit it and you press X's Reply yourself (GrowX never presses it). Follows X's light, Dim and Lights out themes; can be turned off on the AI Reply Assistant page. Free: a click shows the Premium offer.
- **People**: tags, notes, VIP and watch flags, mutuals, fans you don't follow back yet.
- **VIP alerts (Premium)**: a notification when a VIP posts.

## Cleanup
- Scan following + followers. **Not following back** and **Inactive** (latest post older than 30/90/180/365 days). Unknown activity is never called inactive; partial scans are "unverified" (bulk select off).
- Review, filter, select, then unfollow at a safe pace; each account re-checked right before unfollow. Safe pace: up to 30/hour, 200/day. Free: up to **200 per run**.
- **Bulk unfollow (Premium)**: select all, up to 5,000 in one run. **Balanced unfollow pace (Premium)**: 45/hour, 320/day.
- **Automatic cleanup (Premium)**: unfollows GrowX's own follows that didn't follow back after 2, 5 or 7 days, only during autopilot breaks, 40-90 s apart, same 30/h and 200/day caps; never touches accounts you followed yourself or imported.

## Everything else
- **Multiple X accounts: a workspace per X account (Premium)**. Every GrowX account links 2 X usernames free; extra slots $0.99 each (one-time).
- **Devices (2.4.8, 2.4.9)**: a GrowX account stays signed in on as many devices or Chrome profiles as it has X account slots (2 for everyone, +1 per extra slot); signing in on one too many signs out only the least recently used device. The website's own sign-ins follow the same limit, counted separately. **Your devices** (Settings - Accounts & sync) lists every device by browser and system, with this device marked and when each was last used, and signs any other one out; "Recently signed out" says which device went and why; signing in when every place is taken asks which device to sign out.
- Optional **Chrome sync** of settings, sources, never-follow list, people and templates (through Chrome's own sync storage, no GrowX server).
- Setup wizard, What's new window, **8 colour themes**, dark mode, density/font options, **command palette (Ctrl+K)**, phone and tablet layouts.
- Backup and restore (export/import a file).
- **Languages (2.4.7, `shared/i18n.js`, `i18n/*.json`)**: the interface in 21 languages: English, Español, Português (Brasil), Français, Deutsch, Italiano, Nederlands, Polski, Türkçe, Русский, Українська, العربية, हिन्दी, Bahasa Indonesia, Filipino, Tiếng Việt, ไทย, 日本語, 한국어, 简体中文, 繁體中文. Auto-picks the browser language; change in Settings > Appearance or on the welcome page. Popup, dashboard, welcome page and notifications are translated; Arabic is right to left; user text is never translated. The extension's name and description in Chrome (`_locales`) cover 52 locales.
- **Share feature usage (2.4.7, optional, `shared/analytics.js`, `background-analytics.js`)**: asked once; sent only after "Share feature usage" AND while "Share anonymous usage stats" is on. Events (fixed schema: event names, enums, buckets, small counts, version, OS) go to the GrowX telemetry server (Cloudflare Worker), which validates and forwards to GrowX's Google Analytics 4 property. Carries the random install id, a session number and, when signed in to a GrowX account, a truncated SHA-256 of the account id plus plan type. Never X handle/account, follows, sources, lists, posts, drafts, replies, AI prompts or output, email, password, tokens, cookies, links or pages visited. Unanswered events wait locally (max 100, max ~3 days); "No thanks" or turning either setting off deletes them. Change in Settings > General.
- Data: settings, queue, history, posts and analytics stay in the browser (`chrome.storage`). Optional anonymous usage counts (random install id, version, coarse counts; no X data) can be switched off.

## Plans (website is the source of truth for prices)
- Free forever. 30-day Premium trial: free, no credit card, once per account and once per X account. Since 27 Nov 2026 it **starts automatically** when a new account is ready (email confirmed, or Google sign-in); older accounts that never used it start it from the dashboard. No X account is needed to start it: it is bound to the first X account the account links (in practice the first autopilot run), and ends early if that X account already used a trial with another account (`supabase/migrations/20261127170000_auto_trial.sql`).
- Premium: $1.99 / 30 days, $14.99 / 365 days, $59.99 lifetime ($29.99 for the first 100 lifetime buyers). Prepaid, no auto-renew. Paid in crypto via NOWPayments.

## Copy rules
- No invented user counts, ratings, testimonials or guaranteed results. Screenshots use demo data; never quote their numbers as results.
- No tool can promise zero risk on X; say so where safety is discussed.
- Use both "X" and "Twitter".
