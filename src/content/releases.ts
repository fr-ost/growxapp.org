/**
 * Release notes for /whats-new, taken from the extension's own changelog (shared/whatsnew.js). Newest first.
 * Inline text supports [label](/path) links. Keep every line true to the shipped extension.
 */
export interface Release {
  version: string;
  title: string;
  intro: string;
  groups: { title: string; items: string[] }[];
}

export const CURRENT_VERSION = "2.4.7";

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
    version: "2.4.7",
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
