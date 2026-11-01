import Link from "next/link";
import { abs } from "@/components/json-ld";
import { ShadowbanChecker } from "@/components/tools/shadowban-checker";
import { ToolPage } from "@/components/tools/tool-page";
import { pageMetadata } from "@/lib/seo";

const PATH = "/tools/twitter-shadowban-checker";

export const metadata = pageMetadata({
  title: "Free Twitter Shadowban Checker: Test Your X Account",
  description: "Free Twitter shadowban checker: test your X account for a search ban, search suggestion ban and hidden replies. No login, no sign-up, nothing to install.",
  path: PATH,
  keywords: [
    "Twitter shadowban checker",
    "shadowban checker",
    "shadowban test",
    "X shadowban checker",
    "free shadowban checker",
    "am I shadowbanned on Twitter",
    "Twitter search ban test",
    "ghost ban Twitter",
    "reply deboosting",
    "check shadowban without login",
  ],
});

const steps = [
  { name: "Check your account status", text: "From a second X account or a private window, open your profile and make sure it loads without a suspended, not found or temporarily restricted message." },
  { name: "Check search suggestions", text: "On the second account, type your @username into X's search box and see whether your account appears in the suggestions." },
  { name: "Check search results", text: "On the second account, run a Latest search for from:yourusername and see whether your recent posts appear." },
  { name: "Check reply visibility", text: "Open a post you replied to recently on the second account and see whether your reply is listed or hidden behind Show more replies." },
  { name: "Check for notices from X", text: "On your own account, look in your X notifications and email for any message about limits on your account or a post." },
];

const faqs = [
  { q: "Is this shadowban checker really free?", a: "Yes. The GrowX shadowban checker is completely free, with no sign-up, no account and no limit on how many usernames you test." },
  { q: "Do I need to log in or connect my X account?", a: "No login is required. GrowX never asks for your X password or to connect your account. The test builds the checks for your username, and you open them on X yourself, ideally from a second account." },
  { q: "Why should I check from a second account?", a: "X only shows search results and search suggestions to signed-in people, and your own account always sees your own posts and replies. Checking from an account that does not follow you, or asking a friend, shows you what strangers see." },
  { q: "Can an automatic checker see more than this test?", a: "Not without signing in. X does not show search, search suggestions or most replies to people who are not signed in, so an automatic check would have to sign in to X behind the scenes. This test uses X itself, from an account you control, and shows you the evidence directly." },
  { q: "What is a ghost ban on Twitter?", a: "Ghost ban, or reply deboosting, is the name people use when X ranks someone's replies very low or hides them behind a prompt such as Show more replies, so most readers never see them. The reply visibility check tests for it." },
  { q: "How long does a shadowban last on X?", a: "X does not publish how long visibility limits last. Pause automation and bulk actions, post and reply normally, and run the test again every few days. If X sent you a notice, follow its instructions." },
  { q: "Can using GrowX get my account shadowbanned?", a: "Any tool that follows or unfollows for you carries some risk, and no tool can promise zero risk on X. GrowX is built to behave like a careful person: random delays, breaks, hourly and daily caps, optional warm-up and active hours, and an automatic slow-down or stop when X shows a warning. Start new accounts on the Safe pace." },
  { q: "Is my result saved anywhere?", a: "No. The test runs in your browser. Your answers stay in this browser tab only, so you can switch to X and back without losing them, and nothing is sent to GrowX." },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Twitter shadowban checker"
      title={<>Free Twitter <span className="text-gradient">shadowban checker</span></>}
      lead="Find out if X is hiding your account. Test for a search ban, a search suggestion ban and hidden replies in a few minutes: no login required, no sign-up and completely free."
      tool={<ShadowbanChecker />}
      faqs={faqs}
      cta={{
        title: "Grow without tripping X's limits.",
        body: "GrowX's auto follow runs at a human pace with random delays, breaks and hourly and daily caps, and backs off by itself after any warning from X. Free to start, with a 30-day Premium trial and no credit card.",
      }}
      extraLd={[
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "@id": `${abs(PATH)}#howto`,
          name: "How to check if you are shadowbanned on X (Twitter)",
          description: "A free five-step shadowban test for X (Twitter): account status, search suggestions, search results, reply visibility and notices from X. No login required.",
          totalTime: "PT5M",
          tool: [{ "@type": "HowToTool", name: "A second X account, or a friend who does not follow you" }],
          step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text, url: `${abs(PATH)}#how-it-works` })),
        },
      ]}
    >
      <h2 id="how-it-works" className="h-rule">How this free shadowban test works</h2>
      <p>
        X only shows search results, search suggestions and most replies to people who are signed in. A website can&apos;t see them without signing
        in to X itself, and we don&apos;t think you should hand your login to anyone. So instead of asking for it, this checker builds the five checks
        for your username, you look at X the way a stranger sees it, and it turns what you see into a clear result:
      </p>
      <ul>
        <li><strong>Account status</strong>: does your profile load, or does X show a suspended, not found or restricted message?</li>
        <li><strong>Search suggestions</strong>: do you appear under the search box when someone types your name?</li>
        <li><strong>Search results</strong>: do your recent posts show up in a Latest search for <code>from:yourusername</code>?</li>
        <li><strong>Reply visibility</strong>: are your replies listed, or hidden behind &ldquo;Show more replies&rdquo;?</li>
        <li><strong>Notices from X</strong>: has X told you about a limit on your account or a post?</li>
      </ul>
      <p>
        Do the checks from a second account or ask a friend who doesn&apos;t follow you. Your own account always sees your own posts, so it can&apos;t
        tell you what everyone else sees.
      </p>

      <h2 className="h-rule">What is a shadowban on X?</h2>
      <p>
        A <strong>Twitter shadowban</strong> is the feeling that X is hiding you without saying so. X doesn&apos;t use the word, but it has described
        limiting the visibility of some accounts and posts, sometimes called visibility filtering. The limits people call a shadowban are:
      </p>
      <ul>
        <li><strong>Search suggestion ban</strong>: your account is left out of the suggestions under the search box.</li>
        <li><strong>Search ban</strong>: your posts don&apos;t appear in search results, even for exact phrases.</li>
        <li><strong>Reply deboosting</strong> (ghost ban): your replies are ranked at the bottom or tucked behind a prompt.</li>
        <li><strong>Reduced reach</strong>: your posts are shown to fewer people in recommended timelines.</li>
      </ul>
      <p>
        Reach also moves for ordinary reasons, like a weaker week of posts or a change of topic. If every check comes back normal, compare your numbers
        with the free <Link href="/tools/twitter-engagement-rate-calculator">engagement rate calculator</Link> before blaming a shadowban.
      </p>

      <h2 className="h-rule">What usually causes it</h2>
      <p>X acts on patterns its spam and platform manipulation rules describe. The most common ones:</p>
      <ul>
        <li>Following many accounts quickly and unfollowing them soon after.</li>
        <li>Posting the same text, links or hashtags again and again, or near-identical replies under many posts.</li>
        <li>Mentioning lots of unrelated accounts.</li>
        <li>Automation that runs at machine pace or keeps going after X shows a warning.</li>
        <li>Many reports or blocks in a short time.</li>
      </ul>

      <h2 className="h-rule">How to fix a shadowban</h2>
      <ul>
        <li><strong>Pause automation</strong> and bulk actions for a few days, whatever tool you use.</li>
        <li><strong>Stop the pattern</strong>: no follow and unfollow churn, mass tagging or copy-and-paste replies.</li>
        <li><strong>Follow X&apos;s notices</strong>, such as confirming your email or phone, and appeal through X&apos;s Help Center if you disagree.</li>
        <li><strong>Post normally</strong> and run this test again after a few days.</li>
        <li><strong>Don&apos;t open a new account</strong> to get around a limit: X&apos;s rules prohibit it.</li>
      </ul>
      <p>
        Our full guide explains each step: <Link href="/blog/twitter-shadowban">Twitter shadowban: how to check and fix it</Link>.
      </p>

      <h2 className="h-rule">Grow without tripping limits</h2>
      <p>
        If you use a growth tool, how it behaves when X pushes back matters more than its top speed. GrowX&apos;s{" "}
        <Link href="/features/twitter-auto-follow">smart auto follow</Link> works one account at a time with random delays, breaks, hourly and daily
        caps, optional warm-up and active hours, and it slows down or stops by itself after any warning from X. See{" "}
        <Link href="/how-it-works">how it works</Link>, or clean up safely with the <Link href="/features/twitter-unfollow-tool">unfollow tool</Link>.
      </p>
    </ToolPage>
  );
}
