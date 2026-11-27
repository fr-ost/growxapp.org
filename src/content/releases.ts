/**
 * Release notes for /whats-new, taken from the extension's own changelog (shared/whatsnew.js). Newest first.
 * Inline text supports [label](/path) links. Keep every line true to the shipped extension.
 */
export interface Release {
  version: string;
  /**
   * The day this version was set in the extension's manifest.json (from the extension's git history), YYYY-MM-DD.
   * Shown next to each version on /whats-new.
   */
  date: string;
  title: string;
  intro: string;
  groups: { title: string; items: string[] }[];
}

export const CURRENT_VERSION = "2.5.1";

/** The extension's interface languages (shared/i18n.js LANGS): BCP 47 code, native name, English name. */
export const LANGUAGES: { code: string; native: string; english: string }[] = [
  { code: "en", native: "English", english: "English" },
  { code: "es", native: "Español", english: "Spanish" },
  { code: "pt-BR", native: "Português (Brasil)", english: "Portuguese (Brazil)" },
  { code: "fr", native: "Français", english: "French" },
  { code: "de", native: "Deutsch", english: "German" },
  { code: "it", native: "Italiano", english: "Italian" },
  { code: "nl", native: "Nederlands", english: "Dutch" },
  { code: "pl", native: "Polski", english: "Polish" },
  { code: "tr", native: "Türkçe", english: "Turkish" },
  { code: "ru", native: "Русский", english: "Russian" },
  { code: "uk", native: "Українська", english: "Ukrainian" },
  { code: "ar", native: "العربية", english: "Arabic" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "id", native: "Bahasa Indonesia", english: "Indonesian" },
  { code: "fil", native: "Filipino", english: "Filipino" },
  { code: "vi", native: "Tiếng Việt", english: "Vietnamese" },
  { code: "th", native: "ไทย", english: "Thai" },
  { code: "ja", native: "日本語", english: "Japanese" },
  { code: "ko", native: "한국어", english: "Korean" },
  { code: "zh-CN", native: "简体中文", english: "Chinese (Simplified)" },
  { code: "zh-TW", native: "繁體中文", english: "Chinese (Traditional)" },
];

export const releases: Release[] = [
  {
    version: "2.5.1",
    date: "2026-11-27",
    title: "AI Creator Studio and Analytics",
    intro:
      "See who followed you back, your Growth Score and what to do next, and write your posts and replies in one place. Slow is the free pace now, free forever.",
    groups: [
      {
        title: "Fixed for X's update",
        items: [
          "Following the people who reposted, replied to or liked a post works again, and so does reading your posts",
          "GrowX now learns X's changes from X's own page and adapts by itself",
        ],
      },
      {
        title: "New: AI Creator Studio",
        items: [
          "Create and Engage are one place in the sidebar now: Write, Queue & calendar, Templates, Evergreen, AI Reply Assistant and People",
          "Old links to Create and Engage open it",
        ],
      },
      {
        title: "New: Analytics (was Insights)",
        items: [
          "Who followed back: everyone who followed you back after GrowX followed them, with when, how long it took and the source; 7, 30 or 90 days or all time, search and CSV export",
          "Growth Score 2.0: one score from 0 to 100 from six parts of your own numbers (follower growth, engagement, post reach, consistency, follow-backs and retention), each with how it's scored and how to raise it",
          "Growth dashboard: followers gained and follow-backs, views and engagement per week, and your score over time",
          "AI Growth Coach: the most useful next steps from your own numbers. Asking GrowX AI for this week's plan is Premium. [See the analytics](/features/twitter-analytics)",
        ],
      },
      {
        title: "New: your TwitterScore on Home",
        items: [
          "Home shows your account's TwitterScore (twitterscore.io) next to your Growth Score, with the change this week, refreshed once a day",
          "GrowX sends only your @username, after you allow it once; turn it off in Settings, General",
        ],
      },
      {
        title: "Paces",
        items: [
          "Safe is now Slow: about 100 follows a day, 50 to 120 seconds apart with a 20-minute break every 10 follows. Free forever",
          "Balanced, Turbo and X Premium come with Premium and the 30-day trial. On Free a faster choice is kept, and used again once Premium is active. [How the paces work](/how-it-works)",
        ],
      },
      {
        title: "Also new",
        items: [
          "The first time you start the autopilot, GrowX asks once whether you'd like to follow its creator, @0x_nation. Nobody is followed without your click",
        ],
      },
      {
        title: "Fixes",
        items: [
          "Signing in on a third device no longer signs you straight back out",
          "More of GrowX in your language: a new install's empty pages, the popup's hints and every time label",
        ],
      },
    ],
  },
  {
    version: "2.5.0",
    date: "2026-11-23",
    title: "AI Reply Assistant",
    intro: "GrowX AI now writes your replies: one click beside X's reply box, or a draft under every fresh post in Engage. You approve each one.",
    groups: [
      {
        title: "New: AI reply buttons on X (Premium)",
        items: [
          "Tone buttons right beside X's reply box: AI Reply, Insightful, Friendly, Witty, Supportive, Curious and Professional",
          "One click and GrowX AI writes a reply to that post into the box; another click swaps in a new one",
          "More options shows three replies to pick from, with the tone, length and approach",
          "You can edit the reply, and you press X's Reply button yourself",
        ],
      },
      {
        title: "New: AI Reply Assistant (Premium)",
        items: [
          "Engage, AI Reply Assistant (the page was called Reply targets): GrowX AI drafts a reply under every fresh post, in your tone and voice",
          "Pick the tone, the length (short, medium or detailed), the approach and whether to use emojis; your choice is saved",
          "Edit and send one, or approve several and send them one at a time, 45 to 90 seconds apart (up to 10 at once, 80 a day)",
          "Every reply is checked first: no repeat of a reply from the last 14 days, no placeholders left in, nothing over 280 characters",
          "The list of fresh posts and replying or liking by hand stay free. [See the AI Reply Assistant](/features/twitter-reply-targets)",
        ],
      },
      {
        title: "Safe by design",
        items: [
          "You read and approve every reply; GrowX never replies by itself",
          "GrowX AI runs on your computer: private, no API key",
        ],
      },
    ],
  },
  {
    version: "2.4.9",
    date: "2026-11-22",
    title: "See and manage your devices",
    intro: "See every device your GrowX account is signed in on, and sign any of them out.",
    groups: [
      {
        title: "New: Your devices",
        items: [
          "Settings, Accounts & sync lists every device or Chrome profile your GrowX account is signed in on, by browser and system, with this device marked",
          "Sign any other device out from there; it stops at once",
          "Recently signed out shows which device went and why",
          "When every place is taken, signing in asks which device to sign out, or cancel and nobody is signed out",
        ],
      },
      {
        title: "Better",
        items: ["Spotted a clumsy translation? Settings, Appearance has a link to suggest a better one", "More of GrowX is translated, in every language"],
      },
      {
        title: "Fixes",
        items: ["The popup no longer needs scrolling while the autopilot runs", "\"See it in Accounts & sync\" now leads to your devices"],
      },
    ],
  },
  {
    version: "2.4.8",
    date: "2026-11-11",
    title: "Use GrowX on more devices",
    intro: "Your GrowX account can now stay signed in on one device per X account slot.",
    groups: [
      {
        title: "New: one device per X account slot",
        items: [
          "Your GrowX account stays signed in on as many devices or Chrome profiles as it has X account slots: 2 for everyone, one more for every extra slot",
          "Signing in on one device too many signs out only the device used least recently",
          "Accounts & sync shows how many devices your account can use",
        ],
      },
      {
        title: "Fixes",
        items: ["A few short words that stayed in English, such as Followers, Following and Replies, are translated now", "After a sign-out, the message says why, in your language"],
      },
    ],
  },
  {
    version: "2.4.7",
    date: "2026-11-06",
    title: "GrowX now speaks your language",
    intro: "GrowX is now available in 21 languages and picks your browser's language by itself. Plus a new, optional way to help shape GrowX.",
    groups: [
      {
        title: "New: GrowX in your language",
        items: [
          "21 languages: English, Español, Português (Brasil), Français, Deutsch, Italiano, Nederlands, Polski, Türkçe, Русский, Українська, العربية, हिन्दी, Bahasa Indonesia, Filipino, Tiếng Việt, ไทย, 日本語, 한국어, 简体中文 and 繁體中文",
          "GrowX uses your browser's language by itself; pick another one in Settings, Appearance or on the welcome page",
          "The popup, the dashboard, the welcome page and notifications are translated, and Arabic reads right to left",
          "Your posts, names and anything you type are never translated",
          "GrowX's name and description in Chrome are translated for 52 locales",
        ],
      },
      {
        title: "New: share feature usage (optional)",
        items: [
          "GrowX asks once whether you want to share which features you use, and nothing is sent until you say yes",
          "Only feature names, results and rounded numbers, never your X account, handles, posts, AI prompts, email or lists. [Privacy policy](/privacy)",
          "Change it any time in Settings, General; turning it off deletes anything not yet sent",
        ],
      },
      {
        title: "Fixes",
        items: ["Notifications now appear in your language too, and times inside them read correctly in right-to-left languages"],
      },
    ],
  },
  {
    version: "2.4.6",
    date: "2026-11-01",
    title: "List follow, and calmer around X's limits",
    intro: "Follow exactly the accounts on your own list, and your pace now stays yours when X limits follows for the day.",
    groups: [
      {
        title: "New: List follow",
        items: [
          "Follow exactly the accounts on your own list, with its own page in the sidebar and its own Start button. [Learn more](/features/twitter-list-follow)",
          "Add accounts by pasting names, @mentions or links, or with a CSV or TXT file (upload it or drop it in)",
          "See every account as waiting, followed, requested or skipped (with the reason); retry, export, and Stop keeps your progress",
          "Same pace and safety as the autopilot, and only one of them runs at a time. Free: 50 accounts at a time; Premium: up to 5,000",
        ],
      },
      {
        title: "Fixes",
        items: [
          "X's daily follow limit no longer replaces your pace's number, and Stop or Start no longer keep it",
          "GrowX waits just under what X allowed for the day, then goes back to your full pace by itself",
          "Try again now (popup, sidebar, Sources) and Start ask X again right away, with no reset needed and your stats kept",
          "Waits that end tomorrow say so, and the popup's messages fit on one line",
        ],
      },
    ],
  },
  {
    version: "2.4.5",
    date: "2026-10-29",
    title: "Simpler, and up front",
    intro: "The pace and the Start button moved next to your sources, and detailed settings fold away.",
    groups: [
      {
        title: "Simpler",
        items: [
          "Pace and the Start button sit on Grow, Sources, next to your sources",
          "Detailed settings fold away behind one-line summaries (Pace & safety, Targeting, Settings)",
          "Change the pace right from the popup, and open the dashboard with one big button",
          "A What's new window, once after each update",
        ],
      },
      {
        title: "Also",
        items: ["The AI writer is now called GrowX AI", "A small, one-time request for a Chrome Web Store review after a real win, easy to skip"],
      },
    ],
  },
  {
    version: "2.4.4",
    date: "2026-10-29",
    title: "The ultimate X growth tool",
    intro: "GrowX grew from an auto follow engine into a full X growth tool.",
    groups: [
      {
        title: "Create",
        items: [
          "Write posts and threads with images; post now, schedule or add to your queue slots. [Post scheduler](/features/twitter-post-scheduler)",
          "Best time to post from your own posts and followers",
          "Calendar, drafts, 52 templates, evergreen recycling and auto-plug (Premium)",
        ],
      },
      {
        title: "GrowX AI (Premium)",
        items: ["Write, improve, hooks, thread it, reply ideas and a weekly summary, on your own computer. [GrowX AI writer](/features/ai-tweet-writer)"],
      },
      {
        title: "Insights and Engage",
        items: [
          "Post analytics, the topics and formats that work, and which posts brought followers. [Analytics](/features/twitter-analytics)",
          "Who followed and who unfollowed you, follower quality, top fans and a weekly report. [Unfollower tracker](/features/twitter-unfollower-tracker)",
          "Reply targets ranked for replying early, plus a People list with tags, notes and VIPs. [Reply targets](/features/twitter-reply-targets)",
        ],
      },
      {
        title: "Grow",
        items: [
          "A smart score that learns from your follow-backs, and posts, searches, #hashtags and X Lists as sources (Premium). [Smart auto follow](/features/twitter-auto-follow)",
          "Retention and cost per source on the source leaderboard",
        ],
      },
      {
        title: "Everything else",
        items: ["Daily goals, streaks, milestones and a setup wizard", "A workspace per X account (Premium) and optional Chrome sync", "8 colour themes, dark mode and a Ctrl+K command palette"],
      },
    ],
  },
];
