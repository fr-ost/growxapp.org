import type { FeatureSlug } from "./feature-slugs";

/**
 * Two blocks every feature page shows (A5), kept apart from the long-form copy in feature-pages.ts:
 *   - SAFETY: "Is it safe?", the pace, caps and limits of one feature, each line a fact the page itself already states
 *     (feature-pages.ts, docs/PRODUCT_FACTS.md, checked against the extension source on 27 Nov 2026).
 *   - MANUAL_COMPARISONS: "GrowX vs doing it by hand". Every GrowX cell repeats a fact from that page's highlights and
 *     limits; the "by hand" cells describe the manual way without numbers or promises.
 * Inline text supports **bold**, `code` and [label](/path).
 */
export interface ManualComparisonRow {
  task: string;
  byHand: string;
  growx: string;
}

export const MANUAL_COMPARISONS: Record<FeatureSlug, ManualComparisonRow[]> = {
  "twitter-auto-follow": [
    { task: "Find people to follow", byHand: "Scroll other accounts' follower lists and pick names yourself.", growx: "Reads the newest followers of the source profiles you add: people active on X right now." },
    { task: "Decide who is worth it", byHand: "Guess from a quick look at each profile.", growx: "Scores every candidate 1-99 for follow-back and skips anyone below your minimum (55 by default)." },
    { task: "Keep a safe pace", byHand: "Easy to follow too many in a burst.", growx: "Random delays, breaks, hourly and daily caps, a slow-down after any X warning and an Alt+Shift+S emergency stop." },
    { task: "Learn what works", byHand: "Keep notes, if you remember to.", growx: "The source leaderboard shows the follow-back rate, retention and cost of each source." },
  ],
  "twitter-post-scheduler": [
    { task: "Post at the right time", byHand: "Be online at that moment and post yourself.", growx: "Pick an exact time or add to the queue; GrowX fills your next free slot (09:00, 13:00 and 18:30 by default)." },
    { task: "Know your best hours", byHand: "Guess, or check each post's numbers one by one.", growx: "A week-by-hour heat map from your own posts' engagement and the hours your followers are active." },
    { task: "Post a thread", byHand: "Post each part and reply to yourself in order.", growx: "Threads of up to 25 parts, up to 4 images per post, counted the way X counts characters." },
    { task: "Reuse your best posts", byHand: "Remember them and post them again.", growx: "Evergreen recycling posts them again every N days with rotating variants (Premium)." },
  ],
  "ai-tweet-writer": [
    { task: "Start from a blank page", byHand: "Wait for an idea, then draft and redraft.", growx: "Write and Improve turn an idea or a rough draft into a post in the tone you set (Premium)." },
    { task: "Write a strong opening", byHand: "Try a few first lines on your own.", growx: "Hooks gives several opening lines for the same idea." },
    { task: "Turn notes into a thread", byHand: "Split the text and count characters yourself.", growx: "Thread it turns notes into a numbered thread that fits X's character rules (free without AI)." },
    { task: "Keep drafts private", byHand: "Your drafts stay with you.", growx: "GrowX AI runs on your computer with the model built into Chrome: no API key, nothing sent to GrowX." },
  ],
  "twitter-analytics": [
    { task: "See how posts did", byHand: "Open each post's numbers on X, one at a time.", growx: "Views, likes, reposts, replies, bookmarks and engagement rate for your recent posts in one place." },
    { task: "Find what works", byHand: "Compare posts in your head.", growx: "How questions, images, text, threads and links compare, plus a best-time heat map." },
    { task: "Know who followed back", byHand: "Check each account you followed.", growx: "Everyone who followed you back after GrowX followed them: when, how long it took and from which source." },
    { task: "Track the trend", byHand: "Write your follower count down each week.", growx: "A Growth Score from 0 to 100 from six parts of your own numbers, with weekly trends." },
  ],
  "twitter-unfollower-tracker": [
    { task: "See who unfollowed you", byHand: "Compare your follower list with an older copy yourself.", growx: "Once a day GrowX compares your follower list with the previous one and lists new followers and unfollowers." },
    { task: "Look back", byHand: "Only what you saved.", growx: "7 days of history free; the full history on Premium." },
    { task: "Unfollow someone who left", byHand: "Open their profile and unfollow.", growx: "One-click unfollow back from the tracker (Premium)." },
    { task: "Spot your top fans", byHand: "Scroll your notifications.", growx: "See who likes and replies to your posts most." },
  ],
  "twitter-unfollow-tool": [
    { task: "Find who does not follow back", byHand: "Open profiles one by one.", growx: "Every account you follow that does not follow you back, with filters, search and sorting." },
    { task: "Find inactive accounts", byHand: "Check each account's last post.", growx: "Accounts whose latest post is older than 30, 90, 180 or 365 days; unknown activity is never labelled inactive." },
    { task: "Avoid mistakes", byHand: "Easy to unfollow someone you meant to keep.", growx: "Nothing is unfollowed until you select it, and each account is re-checked right before the unfollow." },
    { task: "Keep a safe pace", byHand: "Easy to go too fast.", growx: "Up to 30 unfollows an hour and 200 a day on the free plan; Balanced (45 an hour, 320 a day) on Premium." },
  ],
  "twitter-reply-targets": [
    { task: "Find fresh posts to reply to", byHand: "Refresh timelines and hope you are early.", growx: "Posts younger than 120 minutes from your sources, VIPs and accounts you add, ranked by freshness." },
    { task: "Write the reply", byHand: "Write each one from scratch.", growx: "GrowX AI drafts a reply in your tone and length (Premium). You approve every one." },
    { task: "Avoid weak replies", byHand: "Check each reply yourself.", growx: "No repeat of a reply from the last 14 days, no placeholders, nothing over 280 characters, a warning on generic text." },
    { task: "Stay in control", byHand: "You press Reply.", growx: "Nothing goes out until you press the button. GrowX never replies by itself and never sends DMs." },
  ],
  "twitter-list-follow": [
    { task: "Follow a list of accounts", byHand: "Open each profile and press Follow.", growx: "Paste names, @mentions or x.com links, or drop a CSV or TXT file; GrowX follows them in order." },
    { task: "Keep a safe pace", byHand: "Easy to follow too many in a burst.", growx: "Random delays, breaks, hourly and daily caps and a stop on any warning from X." },
    { task: "Keep track", byHand: "Lose your place in a long list.", growx: "Every account is marked followed, requested or skipped with the reason; Stop keeps your progress." },
    { task: "Long lists", byHand: "Hours of clicking.", growx: "Lists of 50 at a time on the free plan, up to 5,000 on Premium." },
  ],
};

export interface SafetyBlock {
  /** The section heading, asked the way people search it. */
  question: string;
  points: string[];
}

export const SAFETY: Record<FeatureSlug, SafetyBlock> = {
  "twitter-auto-follow": {
    question: "Is GrowX smart auto follow safe to use?",
    points: [
      "Starts on the free **Slow** pace: about 100 follows a day, with random delays, breaks and rolling hourly and daily caps.",
      "An optional warm-up starts the daily cap at 60 and raises it by 20 a day. Active hours keep GrowX to the hours and days you pick.",
      "Slows down after any warning from X and checks every follow as it goes. **Alt+Shift+S** stops everything at once.",
      "Every safety control is on the free plan. Safety is never paywalled.",
      "Works in the x.com tab you are already signed in to and never asks for your X password.",
    ],
  },
  "twitter-post-scheduler": {
    question: "Is the GrowX post scheduler safe to use?",
    points: [
      "Posts at most 20 times a day by default, with at least 5 minutes between posts.",
      "Pauses posting if X shows any warning.",
      "Chrome must be running at the scheduled time. A post more than 6 hours late waits as missed.",
      "Up to 10 posts can wait in the queue on the free plan. Premium has no limit.",
    ],
  },
  "ai-tweet-writer": {
    question: "Is the GrowX AI writer safe to use?",
    points: [
      "Runs on your computer with the AI model built into Chrome: no API key, and nothing is sent to GrowX.",
      "Never posts by itself. It fills the composer or drafts replies, and you decide what to post.",
      "Where a post needs a number, name or result it cannot know, it writes a `{placeholder}` for you to fill in.",
      "Needs a recent desktop Chrome with room for the built-in model. Without it, the AI buttons fall back to templates and the thread splitter.",
      "GrowX AI is part of Premium. The 52 templates and the plain Thread it splitter are free.",
    ],
  },
  "twitter-analytics": {
    question: "Is GrowX analytics safe to use?",
    points: [
      "Reads your posts and followers through an x.com tab you already have open, one small step per minute at most.",
      "Never asks for your X password. Your analytics stay in Chrome's storage on your computer, not on a GrowX server.",
      "Post stats refresh every 3 hours while x.com is open, so they are not real time.",
      "The free plan covers your latest 30 posts. Premium unlocks full analytics.",
    ],
  },
  "twitter-unfollower-tracker": {
    question: "Is the GrowX unfollower tracker safe to use?",
    points: [
      "Checks once a day by comparing your follower list with the previous check.",
      "Someone who follows and unfollows between two checks will not show up, and an unfollow is only known to the day.",
      "Needs Chrome running with an x.com tab open, so no check happens on a day your computer stays off.",
      "Reads your list inside your signed-in x.com session and never asks for your X password.",
      "7 days of history on the free plan. The full history and one-click unfollow back come with Premium.",
    ],
  },
  "twitter-unfollow-tool": {
    question: "Is the GrowX unfollow tool safe to use?",
    points: [
      "Nothing is unfollowed until you select it, and each account is re-checked right before the unfollow.",
      "One account at a time: up to 30 an hour and 200 a day on the free plan, or 45 an hour and 320 a day on Premium's Balanced pace. A big run takes several days because the caps stay in place.",
      "Accounts whose activity GrowX cannot see are marked unknown, never inactive. An interrupted scan is marked unverified and select-all is switched off.",
      "Automatic cleanup (Premium) only unfollows accounts GrowX followed for you, never accounts you followed yourself or imported.",
      "Never asks for your X password, and does not post, like or send DMs while cleaning up.",
    ],
  },
  "twitter-reply-targets": {
    question: "Is the GrowX AI Reply Assistant safe to use?",
    points: [
      "You approve every reply. GrowX never replies by itself and never sends DMs.",
      "Approved replies go out one at a time, 45 to 90 seconds apart, up to 10 at once and 80 a day. GrowX stops by itself when X asks for a break.",
      "Each reply is checked first: no repeat of a reply from the last 14 days, no placeholders left, nothing over 280 characters, and a warning on generic text.",
      "AI drafts (Premium) are written on your computer with the AI model built into Chrome.",
    ],
  },
  "twitter-list-follow": {
    question: "Is GrowX List follow safe to use?",
    points: [
      "The same pace presets and safety as the autopilot: random delays, breaks, hourly and daily caps and a stop on any warning from X.",
      "Only one of List follow and the autopilot runs at a time.",
      "Accounts you already follow are skipped, and protected accounts get a follow request.",
      "Stop keeps your progress, and every account shows what happened to it.",
      "Lists of 50 at a time on the free plan, up to 5,000 on Premium.",
    ],
  },
};
