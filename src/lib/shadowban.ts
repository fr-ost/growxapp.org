/**
 * Guided X (Twitter) shadowban test. Runs in the browser; nothing is sent anywhere.
 *
 * Why guided, not automatic: X only shows search, search suggestions and replies to signed-in people, so a
 * website cannot see them without signing in to X itself. The test builds the exact checks for a username,
 * the visitor looks at X from another account (what strangers see), answers, and `shadowbanVerdict` turns the
 * answers into a result. The checks mirror the manual method in the "twitter-shadowban" guide.
 */

export type CheckId = "status" | "suggest" | "search" | "replies" | "notices";
export type Answer = "ok" | "issue" | "unsure";
export type Answers = Partial<Record<CheckId, Answer>>;

export const CHECK_IDS: CheckId[] = ["status", "suggest", "search", "replies", "notices"];

/** Short names used in the result and in the copied summary. */
export const CHECK_NAMES: Record<CheckId, string> = {
  status: "Account status",
  suggest: "Search suggestions",
  search: "Search results",
  replies: "Reply visibility",
  notices: "Notices from X",
};

/** What a problem in each check is usually called, and what to do about it. */
export const ISSUE_INFO: Record<CheckId, { label: string; fix: string }> = {
  status: {
    label: "Account suspended, restricted or not found",
    fix: "Sign in to X and follow the steps it shows, such as confirming your email address or phone number. If you think the decision is a mistake, appeal through X's Help Center. Check the spelling of the username too.",
  },
  suggest: {
    label: "Search suggestion ban",
    fix: "Your account is left out of the suggestions under the search box. Pause auto follow, auto unfollow and bulk actions for a few days, avoid repetitive posts and mass tagging, keep posting normally, then test again.",
  },
  search: {
    label: "Search ban",
    fix: "Your posts are left out of search results. If your account is protected (private), that is expected and not a ban. Otherwise pause automation and bulk actions, stop repeating the same text, links or hashtags, and test again after a few days of normal activity.",
  },
  replies: {
    label: "Reply deboosting (ghost ban)",
    fix: "Your replies are ranked low or hidden behind a prompt. Write fewer, more original replies, avoid near-identical replies and links in replies, and pause automation for a few days.",
  },
  notices: {
    label: "Limit notice from X",
    fix: "X has told you about a limit on your account or a post. Follow the instructions in the notice, remove any post it asks you to, and appeal through X's Help Center if you disagree.",
  },
};

const HANDLE = /^[A-Za-z0-9_]{1,15}$/;
const RESERVED = new Set(["home", "explore", "search", "notifications", "messages", "settings", "i", "intent", "share", "login", "signup", "tos", "privacy"]);

/**
 * Reads a username from "@name", "name", "x.com/name" or a full profile or post URL.
 * Returns null when there is no valid X username (1-15 letters, digits or underscores).
 */
export function parseUsername(input: string): string | null {
  let s = input.trim();
  if (!s) return null;
  const url = s.match(/^(?:https?:\/\/)?(?:www\.|mobile\.)?(?:x|twitter)\.com\/@?([^/?#\s]+)/i);
  if (url) s = url[1];
  s = s.replace(/^@+/, "");
  if (!HANDLE.test(s) || RESERVED.has(s.toLowerCase())) return null;
  return s;
}

/** Links that open each check on X for the given username. */
export function testLinks(username: string) {
  const u = encodeURIComponent(username);
  return {
    profile: `https://x.com/${u}`,
    search: `https://x.com/search?q=${encodeURIComponent(`from:${username}`)}&src=typed_query&f=live`,
    replies: `https://x.com/${u}/with_replies`,
  };
}

export type VerdictLevel = "none" | "clear" | "incomplete" | "warning" | "restricted";

export interface Verdict {
  level: VerdictLevel;
  title: string;
  summary: string;
  /** Checks answered "issue", in check order. */
  issues: CheckId[];
  /** Checks not answered yet, or answered "not sure". */
  open: CheckId[];
}

/** Turns the answers into an overall result. Only "issue" answers count as problems; "not sure" stays open. */
export function shadowbanVerdict(answers: Answers): Verdict {
  const issues = CHECK_IDS.filter((id) => answers[id] === "issue");
  const open = CHECK_IDS.filter((id) => answers[id] !== "ok" && answers[id] !== "issue");
  const answered = CHECK_IDS.filter((id) => answers[id]);

  if (!answered.length) {
    return { level: "none", title: "Answer the checks to see your result", summary: "Open each check on X from another account, then pick what you see.", issues, open };
  }
  if (answers.status === "issue") {
    return {
      level: "restricted",
      title: "Your account looks suspended, restricted or missing",
      summary: "This is more than a shadowban: X shows other people a warning or no profile at all. Fix the account first, then run the other checks again.",
      issues,
      open,
    };
  }
  if (answers.notices === "issue") {
    return {
      level: "restricted",
      title: "X has limited your account or a post",
      summary: "You have a notice from X about a limit. Follow its instructions first; the other checks show how far the limit reaches.",
      issues,
      open,
    };
  }
  if (issues.length) {
    const names = issues.map((id) => ISSUE_INFO[id].label.toLowerCase());
    const list = names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
    return {
      level: "warning",
      title: issues.length === 1 ? `Signs of a ${ISSUE_INFO[issues[0]].label.toLowerCase()}` : `Signs of a shadowban: ${issues.length} limits found`,
      summary: `Your checks show signs of a ${list}. These limits are usually temporary when the behaviour behind them stops.`,
      issues,
      open,
    };
  }
  if (open.length) {
    return {
      level: "incomplete",
      title: "No problems so far",
      summary: `Finish the ${open.length === 1 ? "last check" : `remaining ${open.length} checks`} for a full result.`,
      issues,
      open,
    };
  }
  return {
    level: "clear",
    title: "No signs of a shadowban",
    summary: "Other people can find you, see your posts in search and read your replies. If your reach still dropped, the cause is most likely content, timing or audience.",
    issues,
    open,
  };
}

const ANSWER_TEXT: Record<Answer, string> = { ok: "normal", issue: "problem", unsure: "not sure" };

/** Plain-text summary for the copy button. */
export function verdictSummary(username: string, answers: Answers, verdict: Verdict, url: string): string {
  const lines = CHECK_IDS.map((id) => `- ${CHECK_NAMES[id]}: ${answers[id] ? ANSWER_TEXT[answers[id]!] : "not checked"}`);
  return [`X shadowban test for @${username}`, `Result: ${verdict.title}`, ...lines, `Free test, no login: ${url}`].join("\n");
}
