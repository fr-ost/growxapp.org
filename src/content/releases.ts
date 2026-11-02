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

export const CURRENT_VERSION = "2.4.6";

export const releases: Release[] = [
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
