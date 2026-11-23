import type { Block, Post } from "./posts";

/**
 * Round 5 guides: getting more followers, tweet hooks, unfollowing inactive accounts, Chrome extensions for X,
 * a 30-day growth plan and analytics tools.
 * Rules as in posts.ts: GrowX claims match docs/PRODUCT_FACTS.md (extension v2.4.7). Other products are described by
 * category, not by invented features, prices or ratings. X's own rules and screens change, so claims about X stay
 * generic and send readers to X to check.
 */
const p = (text: string): Block => ({ type: "p", text });
const ul = (...items: string[]): Block => ({ type: "ul", items });
const ol = (...items: string[]): Block => ({ type: "ol", items });
const note = (text: string): Block => ({ type: "note", text });

const DATE = "2026-11-18";
const TRY =
  "GrowX is free to install from the Chrome Web Store, and you can [create a free account](/signup) to try every Premium feature free for 30 days, no credit card needed.";

export const round5Posts: Post[] = [
  {
    slug: "how-to-get-more-followers-on-twitter",
    seoTitle: "How to Get More Followers on Twitter (X): 30 Tactics",
    title: "How to Get More Followers on Twitter (X): 30 Practical Tactics for 2026",
    description:
      "How to get more followers on Twitter (X): 30 practical tactics for your profile, posts, replies and network, plus the shortcuts that cost you followers.",
    excerpt:
      "More followers come from three things: more of the right people seeing you, more of them following and fewer leaving. Here are 30 practical tactics for each.",
    category: "Guides",
    keywords: [
      "how to get more followers on Twitter",
      "get more followers on X",
      "gain Twitter followers",
      "increase Twitter followers",
      "Twitter follower growth tips",
      "grow Twitter followers organically",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 9,
    related: ["how-to-grow-on-twitter-x", "first-1000-followers-on-x", "twitter-reply-strategy"],
    sections: [
      {
        id: "levers",
        heading: "Where new followers actually come from",
        blocks: [
          p("Every new follower on X makes the same small decision. They see one of your posts or replies, tap through to your profile, and decide in a few seconds whether more of the same is worth a place in their feed. So **getting more followers** comes down to three levers: more of the right people seeing you, more of those visitors deciding to follow, and fewer of them leaving later."),
          p("The 30 tactics below are grouped by those levers. None of them is a trick, and no honest guide can promise a number, because results depend on your niche, your posts and the time you put in. Pick three or four that fit you, do them for a month and measure what changes. Where we already have a full guide on a topic, we link to it instead of repeating it here."),
        ],
      },
      {
        id: "profile",
        heading: "Turn profile visits into follows (tactics 1-5)",
        blocks: [
          p("Your profile is where the decision happens, so fix it before you try to bring in more visitors. Someone who has never heard of you should understand who you are and what you post in one glance."),
          ul(
            "**1. Say what you post and who it is for in your bio.** \"Product designer sharing UI teardowns for early-stage founders\" tells a visitor more than a list of hobbies and emoji. Our [bio ideas](/blog/twitter-bio-ideas) and the free [bio generator](/tools/twitter-bio-generator) help you fit it into 160 characters.",
            "**2. Pin a post that shows your best work.** A pinned thread, a result you are proud of or a short \"start here\" post tells visitors what they get by following. See [pinned tweet ideas](/blog/pinned-tweet-ideas).",
            "**3. Use a photo that reads at small sizes.** Your photo sits next to every reply you write, often tiny. A face or a simple logo on a plain background is easier to recognise the third time someone sees it.",
            "**4. Put your topic in your display name, if it fits naturally.** A few words such as \"Sam | SaaS marketing\" tell readers what you do before they open your profile and can help people find you in X's search.",
            "**5. Make the header and the link do a job.** Use the header to repeat your promise or show your work, and link to the one place you want new readers to go next, such as a newsletter or a portfolio.",
          ),
        ],
      },
      {
        id: "posts",
        heading: "Write posts people want more of (tactics 6-13)",
        blocks: [
          p("People follow for what they expect next, not for what they just read. These tactics make that expectation clear and worth having."),
          ul(
            "**6. Pick a niche and two or three content pillars.** A visitor who sees ten posts on ten topics can't tell what following you means. Our method for [finding your niche](/blog/how-to-find-your-niche-on-twitter) takes an afternoon.",
            "**7. Spend most of your writing time on the first line.** In a busy feed, the opening line decides whether anyone reads the rest. Our [Twitter hooks guide](/blog/twitter-hooks) has 40 fill-in formulas.",
            "**8. Post at a pace you can keep for months.** One good post a day that you can sustain beats five a day for a week followed by silence. See [how often to post](/blog/how-often-to-post-on-twitter).",
            "**9. Post when your own followers are online.** Generic best-time charts average other people's audiences. Test your own hours, as described in [best time to post](/blog/best-time-to-post-on-twitter).",
            "**10. Write one thread a week.** A thread on something you know well shows depth that a single post can't. Start with [how to write a thread](/blog/how-to-write-a-twitter-thread) and the free [thread maker](/tools/twitter-thread-maker).",
            "**11. Make some posts worth saving.** Checklists, templates, step-by-step how-tos and resource lists get bookmarked, and the people who save your posts are often the ones who come back for more.",
            "**12. Show your work with images when they add information.** A screenshot, a before-and-after or a simple chart can say more than a paragraph. Check your own numbers to see whether images help with your audience.",
            "**13. Repurpose what already worked.** A post that did well months ago can return as a thread, a list or a new angle for the people who followed since. See [repurposing content for X](/blog/repurpose-content-for-twitter).",
          ),
        ],
      },
      {
        id: "replies",
        heading: "Get seen through replies and conversations (tactics 14-18)",
        blocks: [
          p("For a small account, replies are often the quickest way in front of new people, because a good reply on a popular post sits in front of that account's audience."),
          ul(
            "**14. Reply early to bigger accounts in your niche.** A reply written in the first minutes of a post tends to be seen by more people than one written hours later. Our [reply strategy](/blog/twitter-reply-strategy) explains how to choose the posts.",
            "**15. Add something in every reply.** An example from your own work, a number you measured, a useful counterpoint or a follow-up question. \"Great post\" is invisible; a specific reply makes people tap your name.",
            "**16. Answer the replies on your own posts.** Conversations under your posts show visitors that you are a person worth talking to, and every answer gives the post another reason to stay alive.",
            "**17. Quote-post with your own angle, not a dunk.** Adding your experience to someone else's post puts you in their conversation. Picking fights brings attention, but rarely the followers you want.",
            "**18. Ask real questions now and then.** A question your audience can answer from experience, such as \"What was the first tool you paid for?\", invites replies from people who may never have noticed you before.",
          ),
        ],
      },
      {
        id: "network",
        heading: "Grow your network on purpose (tactics 19-23)",
        blocks: [
          p("Followers also come from the people you follow and the groups you join, as long as you choose them well."),
          ul(
            "**19. Follow active people in your niche.** When you follow someone, they may look at your profile, and if it matches their interests some will follow back. Keep it to a human pace; [bulk following safely](/blog/bulk-follow-twitter-safely) covers delays and daily limits.",
            "**20. Follow the newest followers of accounts in your niche.** Someone who followed a niche account a few hours ago is active and interested in the topic right now. This is how GrowX [smart auto follow](/features/twitter-auto-follow) picks people, explained in [how GrowX auto follow works](/blog/how-growx-auto-follow-works).",
            "**21. Join X Communities for your topic.** Posts inside a community reach people who chose that topic. The [X Communities guide](/blog/x-communities-guide) explains how to contribute without spamming.",
            "**22. Build a small peer circle.** A few people at your level who genuinely read and reply to each other help everyone get started. Keep it voluntary; coordinated like-trading is a different thing, explained in [engagement groups](/blog/twitter-engagement-groups).",
            "**23. Keep your key accounts in an X List.** A private list of the 30 or 50 accounts you most want to build relationships with makes it easy to see their posts first and reply early. See the [X Lists guide](/blog/twitter-lists-guide).",
          ),
        ],
      },
      {
        id: "outside",
        heading: "Bring people in from outside X (tactics 24-26)",
        blocks: [
          ul(
            "**24. Put your handle everywhere you already have readers.** Your website, newsletter footer, email signature, slides, podcast notes and other social profiles. People who already know you are the easiest followers to win.",
            "**25. Share your process in public.** Progress updates, numbers and lessons from a real project give people a reason to follow the story. See [build in public](/blog/build-in-public-on-twitter).",
            "**26. Follow up after events.** After a conference, a meetup or a community call, follow the people you met and the speakers you liked, and post your takeaways with mentions. [How to build a follow list](/blog/how-to-build-a-twitter-follow-list) shows how to collect the handles.",
          ),
        ],
      },
      {
        id: "keep",
        heading: "Keep the followers you win (tactics 27-30)",
        blocks: [
          p("Your follower count is new followers minus the people who leave. The second half gets less attention than it deserves."),
          ul(
            "**27. Stay on the topic people followed you for.** Occasional personal posts are fine; a sudden switch to a different subject is a common reason people leave.",
            "**28. Watch who unfollows and when.** A cluster of unfollows after a certain kind of post tells you something. See [who unfollowed me on Twitter](/blog/who-unfollowed-me-on-twitter).",
            "**29. Measure which posts bring followers, not only likes.** A post can collect likes from your existing audience and bring in nobody new. The [analytics guide](/blog/twitter-analytics-guide) shows how to spot the posts that grow you.",
            "**30. Keep your following tidy.** A profile that follows far more people than follow it can look like a follow-spammer to visitors. Check your [follower ratio](/blog/twitter-follower-ratio) and [unfollow non-followers](/blog/unfollow-non-followers-twitter) at a safe pace when it gets out of balance.",
          ),
        ],
      },
      {
        id: "avoid",
        heading: "Shortcuts that cost you followers",
        blocks: [
          ul(
            "**Buying followers.** Bought accounts don't read or engage, X can remove them, and they make your engagement look weaker to the real visitors who check your profile.",
            "**Follow and unfollow churn.** Following hundreds of people and unfollowing them a day later is the kind of pattern X's rules on aggressive following warn about, and it burns goodwill. Read [follow limits and mass-follow risks](/blog/mass-follow-twitter-limits).",
            "**Follow-for-follow trades.** They inflate the count with people who don't care about your topic. See [follow for follow](/blog/follow-for-follow-twitter).",
            "**Hashtag stuffing and mass tagging.** A wall of hashtags, or tagging big accounts that aren't part of the conversation, looks like spam. One or two relevant tags are plenty; see the [hashtags guide](/blog/twitter-hashtags-guide).",
            "**Automated DMs and replies.** Messages and replies sent by a bot to strangers are a fast way to get muted, reported or limited.",
          ),
          note("If your reach drops suddenly after a burst of activity, slow down and test for limits with the free [shadowban checker](/tools/twitter-shadowban-checker). No tool can promise zero risk on X."),
        ],
      },
      {
        id: "growx",
        heading: "Where GrowX helps",
        blocks: [
          p("Most of these tactics are habits only you can build: your profile, your posts, your replies. GrowX, a Chrome extension for X, takes over the repetitive parts so you have more time for them."),
          ul(
            "**Grow**: [smart auto follow](/features/twitter-auto-follow) follows the newest followers of your source accounts and ranks everyone else by a follow-back score from 1 to 99, with random delays, breaks and daily caps.",
            "**Create**: a [post scheduler](/features/twitter-post-scheduler) with queue slots, a best-time-to-post heat map built from your own posts, and 52 templates.",
            "**Engage**: the [AI Reply Assistant](/features/twitter-reply-targets) lists fresh posts from your sources and VIPs so you can reply early. Nothing is sent until you press the button.",
            "**Insights**: post analytics, a daily follower tracker and, on Premium, which posts brought followers.",
            "**Cleanup**: find accounts that don't follow back or have gone inactive, and unfollow them at a safe pace.",
          ),
          p(TRY),
        ],
      },
    ],
    faq: [
      { q: "What is the fastest way to get more followers on Twitter?", a: "For most small accounts: a clear profile, regular posts on one topic, and early, thoughtful replies to bigger accounts in the same niche. Results vary, so measure which of these brings followers for you." },
      { q: "How many followers can I expect in a month?", a: "No honest number fits every account. It depends on your niche, how often you post and reply, and how well your profile turns visits into follows. Set a target from your own pace after two weeks." },
      { q: "Should I buy Twitter followers?", a: "No. Bought followers don't read or engage, X can remove them, and they make your account look less credible to the real people who visit your profile." },
      { q: "Does GrowX get me followers automatically?", a: "GrowX follows relevant people at a paced rhythm, schedules your posts and shows what works, but whether people follow you still depends on your profile and posts. No tool can promise zero risk on X." },
    ],
  },
  {
    slug: "twitter-hooks",
    seoTitle: "Twitter Hooks: 40 Tweet Hook Examples and Formulas",
    title: "Twitter Hooks: 40 Tweet Hook Formulas and Examples You Can Fill In",
    description:
      "40 Twitter hook formulas with fill-in examples: curiosity, results, opinions, lists, stories and questions, plus how to write and test your own.",
    excerpt:
      "The first line decides whether anyone reads the rest. Here are 40 fill-in hook formulas for X, how to write your own and how to test which ones work for you.",
    category: "Create",
    keywords: [
      "Twitter hooks",
      "tweet hook examples",
      "hook formulas for X",
      "how to write a hook tweet",
      "viral tweet hooks",
      "thread hooks",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 9,
    related: ["how-to-write-a-twitter-thread", "tweet-ideas", "ai-tweet-writer-growx-ai"],
    sections: [
      {
        id: "what",
        heading: "What a hook is on X, and why it matters",
        blocks: [
          p("A **hook** is the opening line of a post: the words someone reads before deciding to stop scrolling or move on. On X it does most of the work. In the feed, people often take in only your first line or two before they decide; long posts are cut off with a Show more link; and in a thread, the first post is usually the only part that appears in the timeline. If the hook doesn't land, the rest is never read."),
          p("A good hook is not clickbait. It is a **promise** that the post then keeps: a specific result, a clear opinion, a useful list or a story worth finishing. Write it for the reader you want, not for everyone, because a hook that pulls in the wrong people brings views without followers."),
          p("Every formula below uses {placeholders}. Fill them with details from your own work and experience; that is what turns a template into something only you could have written."),
        ],
      },
      {
        id: "anatomy",
        heading: "The anatomy of a strong hook",
        blocks: [
          p("Most hooks that work combine three things:"),
          ol(
            "**Who it is for.** A clear signal that the post is meant for a particular reader: \"If you run a one-person business\", \"New designers\", \"Anyone learning Spanish\".",
            "**A specific payoff.** What the reader gets: a method, a number, a mistake to avoid, a story with an ending. \"How I cut my onboarding emails from {before} to {after}\" says far more than \"Some email tips\".",
            "**A reason to read now.** Tension, surprise or a gap: something that doesn't match what the reader expects, or a question they want answered.",
          ),
          p("Specific beats clever. Concrete nouns, real timeframes and numbers from your own experience make a hook believable. Vague superlatives such as \"the ultimate\", \"game-changing\" or \"insane\" make it sound like every other post in the feed."),
        ],
      },
      {
        id: "curiosity",
        heading: "Curiosity hooks (1-5)",
        blocks: [
          p("Curiosity hooks open a gap the reader wants closed. They work when the answer in the post is genuinely useful; otherwise they feel like a trick."),
          ul(
            "**1. The overlooked part:** \"Everyone talks about {popular part of the topic}. Nobody talks about {overlooked part}, and it matters more.\"",
            "**2. The unexpected source:** \"The best {topic} advice I ever got came from {unexpected person or place}.\"",
            "**3. The hidden cause:** \"Most {group} think {problem} comes from {common belief}. It usually doesn't.\"",
            "**4. The small change:** \"One small change to my {process} did more than {big thing I tried first}:\"",
            "**5. The thing I stopped doing:** \"I stopped {common habit} {timeframe} ago. Here's what happened:\"",
          ),
        ],
      },
      {
        id: "results",
        heading: "Result and experience hooks (6-10)",
        blocks: [
          p("These lead with something you did and measured. Use only your own real numbers; if you don't have one, use a timeframe or a concrete outcome instead."),
          ul(
            "**6. Result plus method:** \"I {result} in {timeframe}. Here's exactly what I did, step by step:\"",
            "**7. Before and after:** \"{timeframe} ago: {before}. Today: {after}. What changed:\"",
            "**8. Lessons from doing it:** \"{number} things I learned from {doing the thing} for {timeframe}:\"",
            "**9. The cost:** \"I spent {time or money} on {thing} so you don't have to. The short version:\"",
            "**10. The experiment:** \"I tried {experiment} for {timeframe}. The result wasn't what I expected:\"",
          ),
        ],
      },
      {
        id: "opinion",
        heading: "Opinion and contrarian hooks (11-15)",
        blocks: [
          p("A clear opinion invites replies, and conversations are what X runs on. Disagree with ideas, not people, and explain your view in the post itself."),
          ul(
            "**11. Unpopular opinion:** \"Unpopular opinion: {opinion}. Here's why:\"",
            "**12. Overrated, underrated:** \"Overrated in {niche}: {thing}. Underrated: {other thing}.\"",
            "**13. The advice I ignore:** \"Everyone says {common advice}. I do the opposite, and here's the reason:\"",
            "**14. The hard truth:** \"Hard truth for {group}: {truth}.\"",
            "**15. Changed my mind:** \"I used to believe {old belief}. After {experience}, I don't anymore.\"",
          ),
        ],
      },
      {
        id: "lists",
        heading: "List and resource hooks (16-20)",
        blocks: [
          p("Lists promise structure and are easy to save. Keep the number honest: only as many items as are actually good."),
          ul(
            "**16. The numbered promise:** \"{number} {things} that {benefit}:\"",
            "**17. The toolkit:** \"The {number} tools I use every week for {task}, and what each one is for:\"",
            "**18. The free resources:** \"{number} free resources to learn {skill}. Bookmark this:\"",
            "**19. The checklist:** \"Before you {action}, run through this checklist:\"",
            "**20. Steal this:** \"Steal my {template or process} for {result}:\"",
          ),
        ],
      },
      {
        id: "stories",
        heading: "Story hooks (21-25)",
        blocks: [
          p("Stories stick because they have tension and an ending. Start as close to the interesting moment as you can."),
          ul(
            "**21. In the middle of it:** \"{moment of crisis}. {time left} before {deadline}. Here's what we did.\"",
            "**22. The turning point:** \"{timeframe} ago I almost quit {thing}. Then {turning point}.\"",
            "**23. The confession:** \"Honest moment: {confession}.\"",
            "**24. The first time:** \"The first time I {did the thing}, I {made a mistake}. What it taught me:\"",
            "**25. The conversation:** \"A {client, reader or colleague} asked me {question} last week. My answer:\"",
          ),
        ],
      },
      {
        id: "warnings",
        heading: "Mistake and warning hooks (26-30)",
        blocks: [
          p("Warnings work because people want to avoid losing time or money. Pair every mistake with the fix, or the post reads like a scolding."),
          ul(
            "**26. Stop doing this:** \"Stop {mistake}. Do this instead:\"",
            "**27. The costly mistake:** \"The {topic} mistake that cost me {cost}, and how to avoid it:\"",
            "**28. The quiet warning sign:** \"If your {thing} {symptom}, you probably have a {problem} problem.\"",
            "**29. The beginner trap:** \"Most beginners in {field} {common trap}. Here's the better way:\"",
            "**30. Myth check:** \"{number} {topic} myths that are holding you back:\"",
          ),
        ],
      },
      {
        id: "questions",
        heading: "Question and conversation hooks (31-35)",
        blocks: [
          p("Question hooks start conversations instead of broadcasts. Ask things your audience can answer from their own experience in a sentence."),
          ul(
            "**31. This or that:** \"{option A} or {option B}? Pick one and say why.\"",
            "**32. Start again:** \"If you had to start {goal} again from zero, what would you do first?\"",
            "**33. The keeper:** \"What's one {tool or habit} you wouldn't give up for {task}?\"",
            "**34. Fill the gap:** \"The most underrated {thing} in {niche} is ______. Go.\"",
            "**35. Honest question:** \"Honest question for {group}: {question}?\"",
          ),
        ],
      },
      {
        id: "teaching",
        heading: "How-to and teaching hooks (36-40)",
        blocks: [
          p("Teaching hooks promise a skill. They work especially well as the first post of a thread or a long post."),
          ul(
            "**36. Plain words:** \"{topic}, explained in plain words for {group}:\"",
            "**37. The shortcut:** \"The fastest way to {goal} isn't {obvious method}. It's {your method}:\"",
            "**38. The 80/20:** \"The 20% of {topic} that gives you most of the results:\"",
            "**39. The framework:** \"The {number}-step framework I use for {task}, every time:\"",
            "**40. The teardown:** \"I took apart {example, such as a landing page}. Here's what makes it work:\"",
          ),
        ],
      },
      {
        id: "write",
        heading: "How to write your own hook in five minutes",
        blocks: [
          ol(
            "**Write the post first.** It is much easier to write a hook for something that exists than to write a post to match a hook.",
            "**Find the most specific sentence in the draft**, often a number, a result or a surprising detail buried in the middle. That is your raw material.",
            "**Write five versions** with five different formulas from this list: a result, an opinion, a story, a list and a question.",
            "**Cut every word that doesn't change the meaning.** Hooks get stronger as they get shorter. Check the length with the free [tweet character counter](/tools/tweet-character-counter).",
            "**Read each one as a stranger.** Would someone who has never heard of you know who it is for and what they get? Pick that one.",
          ),
        ],
      },
      {
        id: "test",
        heading: "How to test which hooks work for you",
        blocks: [
          p("Hooks are easy to argue about and easy to measure. Instead of guessing, run small tests:"),
          ul(
            "**Compare engagement rate, not views.** Views depend on reach; engagement rate tells you whether the people who saw the hook kept going. The free [engagement rate calculator](/tools/twitter-engagement-rate-calculator) helps you compare posts fairly.",
            "**Change one thing at a time.** Test hook styles on posts with similar topics and posting times, or you won't know what made the difference.",
            "**Bring winners back with new openings.** A strong idea can return weeks later with a different first line. In GrowX, evergreen recycling (Premium) posts your best posts again with rotating variants.",
            "**Look for patterns, not one-offs.** After a month, group your posts by hook type. If question hooks keep beating list hooks for your audience, write more of them.",
            "**Save your winners as templates** so the formats that work for you are one click away next time.",
          ),
        ],
      },
      {
        id: "avoid",
        heading: "Hook mistakes to avoid",
        blocks: [
          ul(
            "**Bait and switch.** A hook that promises more than the post delivers wins one click and loses a follower.",
            "**Invented numbers.** Fake results are easy to spot and hard to live down. Use your own numbers or none.",
            "**Empty thread openers.** \"A thread 🧵👇\" on its own says nothing. Say what the thread is about and what the reader gets.",
            "**Hype words.** \"Insane\", \"game-changer\" and \"nobody is talking about this\" are so common that readers skip right past them.",
            "**A hook for the wrong audience.** A broad, provocative line can bring views from people who will never care about your topic.",
          ),
        ],
      },
      {
        id: "growx",
        heading: "Hooks in GrowX: templates and GrowX AI",
        blocks: [
          p("You don't have to start from a blank line. The free [52 tweet templates](/tools/tweet-templates) on this site include a **Hooks** category with eight opening-line formats, next to threads, lists, stories, lessons, questions and more. The same 52 templates are built into the GrowX composer, where you can also save your own."),
          p("With Premium, the **Hooks** button in [GrowX AI](/features/ai-tweet-writer) suggests several opening lines for the post you are writing, using your niche and voice settings. It runs on your own computer with the AI model built into Chrome, so your drafts are not sent to GrowX and there is no API key. It doesn't invent facts: where a detail is needed, it leaves a {placeholder} for you to fill in. If Chrome's model isn't available on your computer, the AI buttons fall back to templates."),
          p(TRY),
        ],
      },
    ],
    faq: [
      { q: "What is a hook on Twitter?", a: "The opening line of a post, or the first post of a thread: the part readers see before deciding whether to keep reading. A good hook makes a specific promise that the rest of the post keeps." },
      { q: "How long should a tweet hook be?", a: "Usually one line, or two short ones. Cut anything that doesn't change the meaning, and on long posts make sure the promise comes before the Show more cut." },
      { q: "Do hook formulas still work if everyone uses them?", a: "The structure works; generic filler doesn't. Fill each formula with specific details from your own experience so the post couldn't have been written by anyone else." },
      { q: "Can GrowX write hooks for me?", a: "GrowX AI (Premium) has a Hooks button that suggests several opening lines on your own computer, using Chrome's built-in AI model. The free plan includes the 52 templates, eight of them hook formats." },
    ],
  },
  {
    slug: "unfollow-inactive-accounts-twitter",
    seoTitle: "How to Unfollow Inactive Accounts on Twitter (X)",
    title: "How to Unfollow Inactive Accounts on Twitter (X) Without Losing the Ones That Matter",
    description:
      "How to find and unfollow inactive accounts on Twitter (X): what counts as inactive, which threshold to pick, who to keep and how to unfollow safely.",
    excerpt:
      "Accounts that stopped posting months ago still take up room in your following. Here is how to find them, decide who to keep and unfollow the rest safely.",
    category: "Guides",
    keywords: [
      "unfollow inactive accounts Twitter",
      "inactive Twitter accounts",
      "unfollow inactive X accounts",
      "find inactive accounts I follow",
      "Twitter cleanup",
      "Twitter unfollow tool",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 8,
    related: ["unfollow-non-followers-twitter", "twitter-follower-ratio", "who-unfollowed-me-on-twitter"],
    sections: [
      {
        id: "why",
        heading: "Why unfollow inactive accounts?",
        blocks: [
          p("Over the years almost every following list fills up with accounts that went quiet: people who left X, side projects that ended, brands that stopped posting, accounts made for a single event. They don't clutter your feed, because they don't post. They still cost you something:"),
          ul(
            "**Room under X's following limit.** X caps how many accounts you can follow, and past 5,000 the limit depends on your own follower count. Check X's Help Center for the current rules, and see where you stand with the free [follower ratio calculator](/tools/twitter-follower-ratio-calculator).",
            "**A ratio that looks worse than it is.** Visitors see your following count next to your followers. Hundreds of dead follows widen the gap for no benefit. More in [Twitter follower ratio explained](/blog/twitter-follower-ratio).",
            "**A following list that no longer reflects you.** Who you follow is public. A list full of abandoned accounts says less about your interests than a current one.",
            "**Accounts that can change hands.** An abandoned account can later be taken over or renamed and start posting things you'd rather not have in your following list.",
          ),
          p("This guide is about accounts that **stopped posting**. Removing people who never followed you back is a separate job with its own guide: [how to unfollow non-followers](/blog/unfollow-non-followers-twitter)."),
        ],
      },
      {
        id: "what-counts",
        heading: "What counts as an inactive account",
        blocks: [
          p("X doesn't show a \"last active\" date on profiles. The practical signal is the date of an account's **latest post**. If someone hasn't posted for six months, it is a fair bet they aren't using the account much."),
          p("It is only a proxy, though. Some people read X every day and never post. Others mostly reply or repost, so their own latest post can look older than their real activity. And for some accounts there is no date you can see at all. A careful cleanup treats those cases differently:"),
          ul(
            "**No post for a long time**: probably inactive and worth reviewing.",
            "**Mostly replies or reposts**: may still be active; look at the profile before you unfollow.",
            "**No visible activity at all**: unknown, which is not the same as inactive.",
          ),
        ],
      },
      {
        id: "threshold",
        heading: "Pick a threshold: 30, 90, 180 or 365 days",
        blocks: [
          p("How long without a post counts as inactive is your call. A sensible way to choose:"),
          ul(
            "**30 days**: aggressive. Holidays, busy months and short breaks all look like inactivity. Use it only for a small list you review by hand.",
            "**90 days**: a balanced choice for most people. Three months of silence usually means someone has stepped away.",
            "**180 days**: cautious. Good for a first cleanup when you only want to remove clear cases.",
            "**365 days**: the safest. A year without a post almost always means the account was abandoned.",
          ),
          p("If you have never cleaned up before, start at 365 days, unfollow that group, then work down to 180 or 90 days on a later run. Each pass is smaller and easier to review."),
        ],
      },
      {
        id: "keep",
        heading: "Who to keep, even if they are quiet",
        blocks: [
          p("Not every quiet account is dead weight. Before you unfollow, skim the list for accounts like these:"),
          ul(
            "Friends, family, colleagues and customers, who may notice an unfollow more than any stranger would.",
            "Brands, apps and services you follow for announcements or outage updates, which post rarely by design.",
            "Event and conference accounts that are quiet most of the year and busy around the event.",
            "People on a break, such as parental leave, a sabbatical or a long project, who may well come back.",
            "Your own other accounts, and anyone you follow so that their rare posts reach you first.",
          ),
        ],
      },
      {
        id: "manual",
        heading: "How to find inactive accounts by hand",
        blocks: [
          p("For a small following, you can do it in X itself:"),
          ol(
            "Open your profile and tap **Following**.",
            "Open each account you don't recognise or haven't seen in your feed for a while.",
            "Scroll past any pinned post and check the date of the latest post. A pinned post stays at the top whatever its age.",
            "Unfollow the accounts that are clearly abandoned, and note where you stopped so you can continue later.",
          ),
          p("It works, but it is slow: every profile is a separate page, and X loads your following list a page at a time. Past a few hundred accounts, a tool that scans the list and shows the dates in one place saves hours."),
        ],
      },
      {
        id: "growx",
        heading: "Unfollow inactive accounts with GrowX Cleanup",
        blocks: [
          p("GrowX, a Chrome extension for X, has a **Cleanup** area built for this. It reads your following and followers through the x.com tab you are already signed in to, and nothing is unfollowed until you select it and confirm."),
          ol(
            "Open the GrowX dashboard, go to **Cleanup** and scan your following and followers.",
            "Choose the **Inactive** view and a threshold: latest post older than 30, 90, 180 or 365 days.",
            "Review the list. Search, filter and sort, and deselect anyone you want to keep.",
            "Narrow it further if you like. Accounts that are inactive **and** not following back are the easiest decisions.",
            "Start the unfollow run. Accounts are unfollowed one at a time at a safe pace, and each one is re-checked right before it is unfollowed.",
          ),
          p("Two safeguards are worth knowing. If GrowX can't tell when an account last posted, its activity is **unknown**, and unknown is never called inactive. If a scan couldn't be read to the end, its results are marked **unverified** and bulk select is turned off, so you review those accounts one by one or run the scan again."),
        ],
      },
      {
        id: "pace",
        heading: "Free vs Premium, and why pace matters",
        blocks: [
          ul(
            "**Free plan**: the scan, the Inactive and Not following back views, review and up to **200 unfollows per run** at the Safe pace of up to 30 an hour and 200 a day.",
            "**Premium**: select-all **bulk unfollow** of up to 5,000 accounts in one run, and a **Balanced unfollow pace** of up to 45 an hour and 320 a day.",
          ),
          p("A bigger run doesn't go faster than its pace. At the Safe pace, 600 inactive accounts take at least three days to clear; at Balanced, about two. That is deliberate: unfollowing hundreds of accounts in one sitting is the kind of burst X watches for. The runner also stops on a rate limit, a warning, a sign-out or a lock instead of pushing through. The [Twitter unfollow tool](/features/twitter-unfollow-tool) page has the details."),
          note("Avoid heavy following and heavy unfollowing on the same day, and spread big cleanups over several days. No tool can promise zero risk on X."),
        ],
      },
      {
        id: "followers",
        heading: "What about inactive followers?",
        blocks: [
          p("Cleanup works on the accounts **you** follow. Inactive accounts that follow **you** are a different question, and usually a smaller one: they simply never see your posts, so the main cost is a follower count that overstates your real audience a little."),
          p("If you want to know how many there are, **Follower quality** (Premium) in GrowX Insights sorts your newest followers, on request, into real and active, inactive (90+ days), likely bots and private accounts. GrowX doesn't remove followers for you. X has its own option to remove a follower; check X's Help Center for how it works today. For most accounts, writing for the active followers is a better use of time than removing the quiet ones."),
        ],
      },
      {
        id: "prevent",
        heading: "Stop following inactive accounts in the first place",
        blocks: [
          ul(
            "**Check before you follow.** A quick look at the latest post date saves a cleanup later.",
            "**Use activity filters.** GrowX [smart auto follow](/features/twitter-auto-follow) skips accounts that haven't been active recently (45 days by default) and accounts with fewer than 5 posts, among its free filters.",
            "**Let automatic cleanup handle GrowX's own follows (Premium).** It unfollows accounts GrowX followed that didn't follow back after 2, 5 or 7 days, only during autopilot breaks and within the same 30-an-hour and 200-a-day caps, and never touches accounts you followed yourself or imported.",
            "**Repeat the inactive scan every few months.** Accounts go quiet all the time; a 365-day pass once or twice a year keeps the list current with little effort.",
          ),
          p(TRY),
        ],
      },
    ],
    faq: [
      { q: "How do I find inactive accounts I follow on Twitter?", a: "On X you have to open each profile and check the date of the latest post below any pinned post. GrowX Cleanup scans your following and lists accounts whose latest post is older than 30, 90, 180 or 365 days." },
      { q: "What counts as an inactive Twitter account?", a: "Usually an account that hasn't posted for several months. GrowX lets you choose 30, 90, 180 or 365 days, and never calls an account inactive when its activity is unknown." },
      { q: "How many inactive accounts can I unfollow at once?", a: "Up to 200 per run on GrowX's free plan at the Safe pace (30 an hour, 200 a day). Premium adds select-all bulk unfollow of up to 5,000 in one run and a Balanced pace of 45 an hour and 320 a day." },
      { q: "Is it safe to unfollow a lot of inactive accounts?", a: "Spread it over several days at a slow pace and stop if X shows a warning. That keeps the risk low, but no tool can promise zero risk on X." },
    ],
  },
  {
    slug: "best-chrome-extensions-for-twitter",
    seoTitle: "Best Chrome Extensions for Twitter (X) in 2026",
    title: "The Best Chrome Extensions for Twitter (X) in 2026, Organised by the Job You Need Done",
    description:
      "The best Chrome extensions for Twitter (X) by job: growth, scheduling, AI writing, analytics and focus, plus how to vet one before you install it.",
    excerpt:
      "Instead of a list of names that goes stale, here is how to pick a Chrome extension for each X job, what to check before you install one and where GrowX fits.",
    category: "Guides",
    keywords: [
      "best Chrome extensions for Twitter",
      "Chrome extensions for X",
      "Twitter Chrome extension",
      "X growth extension",
      "Twitter scheduling extension",
      "safe Chrome extensions",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 8,
    related: ["best-twitter-growth-tools", "circleboom-alternatives", "typefully-vs-tweet-hunter"],
    sections: [
      {
        id: "how",
        heading: "How this list works",
        blocks: [
          p("Most \"best extensions\" lists are a set of names that go out of date within months: tools change owners, change features or stop supporting X. So this guide is organised by **job** instead. For each job it explains what a good extension does, what to watch out for and what X already does on its own."),
          p("One disclosure: we build **GrowX**, so it comes first and is the only product we describe in detail. For the other jobs we describe the kind of tool to look for rather than naming products, because we can't keep other companies' features and prices accurate. Check each extension's Chrome Web Store page for what it does today."),
        ],
      },
      {
        id: "growth",
        heading: "1. Growth and all-in-one: GrowX",
        blocks: [
          p("GrowX is a Chrome extension for growing on X. It brings the daily jobs of an X account into one dashboard that works inside your own signed-in x.com tab:"),
          ul(
            "**Grow**: [smart auto follow](/features/twitter-auto-follow) follows the newest followers of accounts in your niche and ranks everyone else by a follow-back score from 1 to 99, with the Safe and Balanced paces on the free plan. [List follow](/features/twitter-list-follow) follows exactly the accounts on your own list.",
            "**Create**: a [post scheduler](/features/twitter-post-scheduler) for posts and threads with queue slots, a best-time-to-post heat map, a calendar, drafts and 52 templates.",
            "**GrowX AI (Premium)**: Write, Improve, Hooks, Thread it and AI replies, on your own computer with Chrome's built-in AI model.",
            "**Engage**: the [AI Reply Assistant](/features/twitter-reply-targets) surfaces fresh posts so you can reply early. Likes and replies are only sent when you press the button, and GrowX never sends DMs.",
            "**Insights**: post analytics, what works, top fans and a daily [unfollower tracker](/features/twitter-unfollower-tracker).",
            "**Cleanup**: find accounts that don't follow back or are inactive and unfollow them at a safe pace.",
          ),
          p("GrowX has a free plan forever. Premium costs $1.99 for 30 days, $14.99 for 365 days or $59.99 lifetime, prepaid with no automatic renewal, and every Premium feature can be tried free for 30 days without a card. See [pricing](/pricing)."),
          note("An honest limit: because GrowX works in your browser, scheduled posts and auto follow need the computer on with Chrome open. And no tool can promise zero risk on X; GrowX slows down by itself after any warning and stops if your account needs attention."),
        ],
      },
      {
        id: "scheduling",
        heading: "2. Writing and scheduling",
        blocks: [
          p("Scheduling tools come as extensions that add buttons to X's composer, or as web apps that post from their own servers with an extension as a shortcut. Either way, look for:"),
          ul(
            "Character counting that matches X, including links counted as 23 characters and most emoji as 2.",
            "Threads, images and a queue with time slots, so you don't pick a date for every post.",
            "A clear answer to where posts are sent from: a server, so posts go out while your computer is off, or your own browser, so the computer must be on.",
            "Safety rules such as a daily cap and a minimum gap between posts.",
          ),
          p("X's own composer can schedule single posts, which is enough for occasional use. GrowX's scheduler handles posts and threads with queue slots; the free plan keeps up to 10 posts waiting and Premium removes the limit. More in [how to schedule tweets](/blog/how-to-schedule-tweets)."),
        ],
      },
      {
        id: "ai",
        heading: "3. AI writing helpers",
        blocks: [
          p("AI extensions suggest posts, rewrite drafts or offer replies as you browse. Before you install one, find out:"),
          ul(
            "**Where your text goes.** Many send drafts to a cloud AI service. That can be fine, but you should know.",
            "**What it costs to run.** Some need your own API key or charge per use.",
            "**Whether it posts for you.** Tools that write and send replies by themselves produce the generic replies readers tune out, and automated replies can run against X's automation rules.",
          ),
          p("GrowX AI takes a different approach: it runs on your computer using the AI model built into Chrome, needs no API key and sends nothing to GrowX. It never posts by itself; you edit and send. See the [GrowX AI writer](/features/ai-tweet-writer)."),
        ],
      },
      {
        id: "analytics",
        heading: "4. Analytics and follower tracking",
        blocks: [
          p("Analytics extensions add numbers next to posts or collect them into a dashboard. The useful ones answer questions X's own screens don't answer at a glance: which topics and formats work for you, which posts brought followers and who unfollowed you. Check how much history a tool keeps and whether it stores your data on its servers or in your browser."),
          p("GrowX Insights reads your numbers through an open x.com tab and keeps them in Chrome's storage. The free plan covers your latest 30 posts and 7 days of follower history; Premium adds full analytics and the full history. Our guide to [Twitter analytics tools](/blog/twitter-analytics-tools) compares the options in more depth."),
        ],
      },
      {
        id: "focus",
        heading: "5. Reading, focus and feed control",
        blocks: [
          p("A big group of extensions changes how X looks and feels: hiding like counts or trends, simplifying the layout, limiting time on the site or blocking the feed during work hours. If you lose hours scrolling, one of these can do more for your growth than any growth tool, because the time goes into writing and replying instead."),
          p("Try X's own settings first: muted words, the Following tab that shows only accounts you follow, and [X Lists](/blog/twitter-lists-guide) for reading a focused group of accounts. Add an extension only for what X can't do."),
        ],
      },
      {
        id: "utilities",
        heading: "6. Small utilities: text, threads and accessibility",
        blocks: [
          p("Many small jobs don't need an extension at all. These free tools on our site work in any browser without installing anything:"),
          ul(
            "[Tweet character counter](/tools/tweet-character-counter): counts characters the way X does.",
            "[Thread maker](/tools/twitter-thread-maker): splits a long draft into numbered posts.",
            "[Bold text generator](/tools/twitter-bold-text-generator): bold and italic letters for posts and bios. Use them sparingly, since screen readers can read styled letters oddly.",
            "[Shadowban checker](/tools/twitter-shadowban-checker): builds the checks to run from a second account.",
          ),
          p("For accessibility, X has its own field for image descriptions (alt text) when you add an image; use it on every image. For account security, a password manager and two-factor authentication on your X account matter more than any X-specific extension."),
        ],
      },
      {
        id: "check",
        heading: "How to check an extension before you install it",
        blocks: [
          ol(
            "**Read the permissions.** An X tool needs access to x.com; be wary of one that asks to read and change data on every website without a clear reason.",
            "**Never type your X password into an extension.** Tools that work in your browser can use the session you are already signed in to.",
            "**Check the developer**: a website, a privacy policy, a support contact and a name you can look up.",
            "**Look at the update history.** X changes its pages often, and an extension that hasn't been updated in a long time may be broken.",
            "**Read the low reviews, not only the high ones.** They tell you what goes wrong.",
            "**Find out where your data is stored**: on the developer's servers or in your browser.",
          ),
        ],
      },
      {
        id: "how-many",
        heading: "How many extensions is too many?",
        blocks: [
          p("Every extension that runs on x.com adds code to the page, and two tools doing the same job can collide. Never run two auto-follow or auto-unfollow tools at the same time: they don't know about each other's pace, so together they can go faster than either would alone. Let only one tool publish a given post, so nothing goes out twice."),
          p("A good setup is one tool per job, plus a habit of removing anything you haven't used in a month. Fewer extensions also means fewer places that can read the pages you visit."),
        ],
      },
      {
        id: "setup",
        heading: "Setting up GrowX in Chrome",
        blocks: [
          p("GrowX needs desktop Chrome 116 or later on Windows, macOS, Linux or ChromeOS; it isn't a mobile app. It works inside your signed-in x.com session, never asks for your X password and doesn't use X's OAuth app access. Your settings, queue, history and analytics stay in Chrome's storage on your computer, and optional anonymous usage statistics can be switched off. The interface is available in 21 languages."),
          p("After installing, open x.com in the same Chrome profile and finish the setup wizard. Then add a few source accounts in your niche, set your queue slots and choose a pace. " + TRY),
        ],
      },
    ],
    faq: [
      { q: "What is the best Chrome extension for growing on Twitter?", a: "It depends on the job. For growth, look for paced following with good targeting, scheduling, analytics and cleanup in one place, which is what GrowX does. For writing help or focus, pick a tool built for that job." },
      { q: "Are Twitter Chrome extensions safe?", a: "Many are, but check the permissions, the developer, the update history and where data is stored, and never type your X password into an extension. No tool can promise zero risk on X." },
      { q: "Does GrowX work on the X mobile app?", a: "No. GrowX is a Chrome extension for desktop Chrome 116 or later on Windows, macOS, Linux and ChromeOS." },
      { q: "Can I use GrowX with other X extensions?", a: "Yes, but don't run two tools that follow or unfollow automatically at the same time, and let only one tool publish a given post." },
    ],
  },
  {
    slug: "twitter-growth-plan",
    seoTitle: "30-Day Twitter Growth Plan: A Week-by-Week Plan for X",
    title: "A 30-Day Twitter Growth Plan: What to Do Each Week (and Each Day) to Grow on X",
    description:
      "A 30-day Twitter growth plan for X: set a baseline, fix your profile, post and reply daily, read your data and build a system for month two, week by week.",
    excerpt:
      "A month is long enough to see what works and short enough to stay focused. Here is a week-by-week Twitter growth plan with a daily checklist and a weekly review.",
    category: "Guides",
    keywords: [
      "Twitter growth plan",
      "30-day Twitter growth plan",
      "X growth strategy",
      "Twitter growth checklist",
      "grow on Twitter in 30 days",
      "weekly Twitter plan",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 9,
    related: ["first-1000-followers-on-x", "how-to-grow-on-twitter-x", "twitter-content-calendar"],
    sections: [
      {
        id: "who",
        heading: "Who this plan is for",
        blocks: [
          p("This plan is for accounts that already exist and want to grow on purpose: you post now and then, you have some followers, and the numbers have stopped moving. It turns a vague goal into one month of specific actions, with a check-in at the end of every week. If you are starting from zero, our plan for [your first 1,000 followers](/blog/first-1000-followers-on-x) is written for new accounts."),
          p("Budget **30 to 45 minutes a day** and one longer session each weekend. No plan can promise a follower count, because results depend on your niche, your posts and your consistency. What a plan does is make sure the month's effort goes into things you can measure and repeat."),
        ],
      },
      {
        id: "day-zero",
        heading: "Before day 1: pick one goal and write down your baseline",
        blocks: [
          p("Choose one main goal for the month. More followers, more replies, more clicks to your newsletter: each leads to slightly different choices, and chasing all three at once makes it hard to tell what worked."),
          p("Then write down where you are today, so day 30 has something to compare with:"),
          ul(
            "Followers, following and your ratio. The free [follower ratio calculator](/tools/twitter-follower-ratio-calculator) does the maths.",
            "Typical views and engagement rate for your last 10 posts. Use the free [engagement rate calculator](/tools/twitter-engagement-rate-calculator).",
            "How many posts and how many replies you wrote last week.",
            "Your three best posts of the last three months, and what they have in common.",
          ),
        ],
      },
      {
        id: "week-1",
        heading: "Week 1 (days 1-7): Fix the foundations",
        blocks: [
          ul(
            "**Days 1-2: profile.** Rewrite your bio so a stranger knows what you post and who it is for, pin your best post or a short \"start here\" post, and check your photo and header. Use [bio ideas](/blog/twitter-bio-ideas) and [pinned tweet ideas](/blog/pinned-tweet-ideas).",
            "**Day 3: content pillars.** Choose two or three topics you will post about all month. If you aren't sure, work through [how to find your niche](/blog/how-to-find-your-niche-on-twitter).",
            "**Day 4: idea bank.** Write down 20 post ideas across your pillars. [Tweet ideas](/blog/tweet-ideas) and the [52 tweet templates](/tools/tweet-templates) help.",
            "**Days 5-7: start the rhythm.** Post once or twice a day and reply to 10 posts a day from accounts in your niche. Write tomorrow's posts today, so you never post in a rush.",
          ),
          p("End-of-week check: is your profile clear, do you have at least a week of ideas left, and did you hit your daily posts and replies on most days?"),
        ],
      },
      {
        id: "week-2",
        heading: "Week 2 (days 8-14): Get in front of new people",
        blocks: [
          ul(
            "**Reply early.** Pick a handful of bigger accounts in your niche and reply within the first hour of their posts, adding an example, a number or a counterpoint. Our [reply strategy](/blog/twitter-reply-strategy) covers the details.",
            "**Join one or two X Communities** for your topic and contribute there a few times this week. See the [X Communities guide](/blog/x-communities-guide).",
            "**Follow relevant people at a human pace**, starting with people who recently followed accounts in your niche. Slow and steady, not in bursts.",
            "**Publish your first thread of the month** on the topic you know best. [How to write a thread](/blog/how-to-write-a-twitter-thread) has a structure to reuse.",
            "**Start a posting queue** so a busy day doesn't break your rhythm. [How to schedule tweets](/blog/how-to-schedule-tweets) shows how.",
          ),
          p("End-of-week check: are more new people replying to you and following you than in week 1? If views went up but follows didn't, go back to your profile before you change anything else."),
        ],
      },
      {
        id: "week-3",
        heading: "Week 3 (days 15-21): Read the data and double down",
        blocks: [
          ul(
            "**Rank your posts so far** by engagement rate and by new followers the day after. Note the topics, formats and hooks of the top three.",
            "**Write more of what worked.** If threads beat single posts, or questions beat tips, shift next week's queue that way.",
            "**Test new opening lines.** Rewrite the hooks of three planned posts with formulas from our [hooks guide](/blog/twitter-hooks).",
            "**Move your posting times** towards the hours when your posts did best. [Best time to post](/blog/best-time-to-post-on-twitter) explains how to read your own data.",
            "**Repurpose your best post** from weeks 1 and 2 as a thread, a list or a new angle.",
            "**Drop your weakest pillar** if it has trailed the others for two weeks.",
          ),
        ],
      },
      {
        id: "week-4",
        heading: "Week 4 (days 22-30): Build the system for month two",
        blocks: [
          ul(
            "**Batch-write next week.** Spend one session writing a full week of posts and queue them, so month two starts with momentum. A simple [content calendar](/blog/twitter-content-calendar) keeps the pillars balanced.",
            "**Tidy your following.** If the month added many follows, review accounts that didn't follow back or have gone quiet and unfollow them at a slow pace. See [unfollowing non-followers](/blog/unfollow-non-followers-twitter) and [unfollowing inactive accounts](/blog/unfollow-inactive-accounts-twitter).",
            "**Choose evergreen posts.** Mark the two or three posts from this month that will still be useful in a few months, and plan to bring them back.",
            "**Day 30 review.** Compare every baseline number with today. Write down the three actions that moved them most and the one that didn't.",
            "**Set month two's goal** from the pace you actually achieved, not the pace you hoped for.",
          ),
        ],
      },
      {
        id: "daily",
        heading: "The daily checklist (30-45 minutes)",
        blocks: [
          ol(
            "**5 minutes**: check that today's posts are queued and nothing failed.",
            "**10-15 minutes**: write or polish one post for tomorrow.",
            "**10-15 minutes**: reply to 5-10 fresh posts from accounts in your niche.",
            "**5 minutes**: answer every reply on your own posts.",
            "**5 minutes**: add one idea to the idea bank.",
          ),
          p("On a day with only 15 minutes, keep the replies and skip the writing; a queue with a few posts waiting covers the gap."),
        ],
      },
      {
        id: "weekly",
        heading: "The weekly review (20 minutes, every weekend)",
        blocks: [
          ol(
            "Compare this week with last: new followers, unfollowers, views and engagement rate.",
            "Pick your three best and three weakest posts and write one sentence on why for each.",
            "Check which accounts you replied to brought replies or follows back.",
            "Choose **one** change for next week and write it down.",
          ),
          p("One change a week is enough. If you change topic, format and timing at once, you can't tell which change helped. Our [analytics guide](/blog/twitter-analytics-guide) explains which numbers to trust."),
        ],
      },
      {
        id: "flat",
        heading: "If your numbers are flat after two weeks",
        blocks: [
          ul(
            "**Few views**: the problem is distribution. Reply more and earlier, check your posting times and sharpen your first lines.",
            "**Views but few follows**: usually the profile, or a niche that isn't clear. Make your bio and pinned post say what people get by following.",
            "**Follows but many unfollows**: your posts may not match what new followers expected, or you are following people outside your niche. Check [who unfollowed you](/blog/who-unfollowed-me-on-twitter) and after which posts.",
            "**Few replies**: ask more questions, take clearer positions and answer every reply you do get.",
          ),
          note("If reach drops suddenly after a burst of activity, slow down and run the free [shadowban checker](/tools/twitter-shadowban-checker) from a second account. Pace matters, and no tool can promise zero risk on X."),
        ],
      },
      {
        id: "growx",
        heading: "Run the plan with GrowX",
        blocks: [
          p("GrowX, a Chrome extension for X, has a tool for most steps of this plan:"),
          ul(
            "**Goals**: the monthly goal planner, daily goals for posts, replies and new followers, and streaks and milestones in Insights keep the daily checklist honest.",
            "**Create**: queue slots, a best-time-to-post heat map from your own posts and followers, a calendar, drafts and 52 templates. See the [post scheduler](/features/twitter-post-scheduler).",
            "**Engage**: the [AI Reply Assistant](/features/twitter-reply-targets) lists fresh posts from your sources and VIPs, ranked by freshness and how fast they take off.",
            "**Grow**: [smart auto follow](/features/twitter-auto-follow) follows the newest followers of accounts in your niche. Balanced is the default pace; a quiet or young account can start on Safe with warm-up turned on.",
            "**Insights**: post analytics, what works and a daily follower tracker. Premium adds which posts brought followers and a weekly report every Monday, handy for the weekly review.",
            "**Cleanup and evergreen**: unfollow non-followers and inactive accounts at a safe pace, and with Premium let evergreen recycling bring your best posts back with variants.",
          ),
          p("Scheduled posts and auto follow run from your own Chrome, so keep the computer on with Chrome open when they are due. " + TRY),
        ],
      },
    ],
    faq: [
      { q: "What is a good Twitter growth plan?", a: "One goal, a written baseline, a clear profile, daily posts and replies in one niche, a weekly review and one change at a time. This plan lays that out over 30 days." },
      { q: "How many followers can I gain in 30 days?", a: "It varies too much by niche, content and effort for any honest number. Compare day 30 with your own baseline and set next month's goal from the pace you actually reached." },
      { q: "How much time does this plan take?", a: "About 30 to 45 minutes a day plus a 20-minute weekly review. A queue of scheduled posts makes busy days easier." },
      { q: "Do I need GrowX for this plan?", a: "No. Every step can be done by hand on X. GrowX helps with the repetitive parts: scheduling, finding fresh posts to reply to, paced following, analytics and cleanup." },
    ],
  },
  {
    slug: "twitter-analytics-tools",
    seoTitle: "Twitter Analytics Tools: What to Use and What to Measure",
    title: "Twitter Analytics Tools in 2026: What to Measure, What X Shows You and When You Need More",
    description:
      "Twitter analytics tools by type: what X's own analytics show, what extensions and dashboards add, what to measure and how to pick a tool for X.",
    excerpt:
      "X shows you some numbers, tools show you more, and some long-running tools have closed. Here is what to measure and how to choose an analytics tool for X.",
    category: "Insights",
    keywords: [
      "Twitter analytics tools",
      "X analytics tool",
      "best Twitter analytics",
      "Twitter follower tracker",
      "Twitter analytics extension",
      "BlackMagic alternative",
      "GrowX",
    ],
    datePublished: DATE,
    dateModified: DATE,
    readMinutes: 9,
    related: ["twitter-analytics-guide", "who-unfollowed-me-on-twitter", "hypefury-alternatives"],
    sections: [
      {
        id: "questions",
        heading: "Start with the questions, not the tool",
        blocks: [
          p("Analytics tools are easy to collect and hard to use. Before you pick one, write down the questions you want answered. For most X accounts they are the same four:"),
          ol(
            "**What should I post?** Which topics and formats get a response from my audience.",
            "**When should I post?** The hours when my followers are online and my posts do best.",
            "**What actually grows the account?** Which posts and habits bring new followers, not only likes.",
            "**Who is leaving, and why?** Who unfollowed, and whether it followed a certain kind of post.",
          ),
          p("A tool that answers these clearly is worth more than one with fifty charts. If you want help reading the numbers themselves, start with our [Twitter analytics guide](/blog/twitter-analytics-guide); this post is about the tools."),
        ],
      },
      {
        id: "measure",
        heading: "What to measure, by goal",
        blocks: [
          ul(
            "**Growth**: new followers, unfollowers, net change per week and which posts came before the biggest gains.",
            "**Engagement**: engagement rate per post (interactions divided by views), replies and bookmarks. Compare posts fairly with the free [engagement rate calculator](/tools/twitter-engagement-rate-calculator).",
            "**Content**: results by topic and format (questions, images, text, threads, links), so you know what to write more of.",
            "**Timing**: results by day and hour, from your own posts rather than a generic chart. See [best time to post](/blog/best-time-to-post-on-twitter).",
            "**Traffic**: clicks to your site or newsletter. X can't see what happens after the click, so this lives in your website analytics, ideally with tagged links.",
            "**Relationships**: who replies to and likes your posts most, and which bigger accounts reply back.",
          ),
        ],
      },
      {
        id: "native",
        heading: "What X's own analytics give you",
        blocks: [
          p("X shows a view count under each post, along with its likes, reposts, replies and bookmarks. X also has analytics screens for your account, but what they include, and which accounts can see them, has changed several times and can depend on your account type and subscription. Check what your own account shows today rather than relying on any guide, this one included."),
          p("X's numbers are the **official record**, so use them as the reference when tools disagree. Where they are thinner is in the comparisons that turn numbers into decisions: grouping posts by topic or format, linking a post to the followers who arrived after it, and keeping a list of who unfollowed you. X doesn't notify you when someone unfollows, which is why [unfollower trackers](/blog/who-unfollowed-me-on-twitter) exist."),
        ],
      },
      {
        id: "types",
        heading: "The main types of Twitter analytics tools",
        blocks: [
          ul(
            "**Browser extensions** read the numbers you can already see in your signed-in x.com session and collect them into a dashboard. No password and no separate login, but they only see what passes through your browser.",
            "**Web dashboards** connect to your X account through an authorisation screen and fetch data from their own servers. They work while your computer is off, but depend on what X's developer access allows, and X has changed that over the years.",
            "**Social media suites** cover several networks at once. Useful for teams that report on X alongside other channels, though often less deep on X-specific questions such as follow-backs.",
            "**Follower trackers** do one job: compare your follower list day by day to show who followed and who left.",
            "**Link and website analytics** measure what happens after the click, which no X tool can see.",
            "**A spreadsheet.** For a small account, copying ten numbers a week into a sheet is a perfectly good analytics tool.",
          ),
        ],
      },
      {
        id: "data",
        heading: "How a tool gets your data matters",
        blocks: [
          p("The way a tool reads your account decides what it can show, how far back it goes and what can break. Ask three questions:"),
          ul(
            "**Does it need your X password?** It shouldn't. Extensions can use the session you are signed in to; web dashboards use X's own authorisation screen.",
            "**Where is your data stored?** On the vendor's servers or in your browser? Both can be fine, but you should know, especially for follower lists.",
            "**How much history does it have?** Tools that read your session usually start on the day you install them and build history from there. Tools with developer access may fetch older data, within what X allows.",
          ),
        ],
      },
      {
        id: "closed",
        heading: "If your analytics tool closed or left X",
        blocks: [
          p("X tools come and go. In July 2026 **BlackMagic**, an X analytics tool owned by Hypefury, shut down, and Hypefury itself says it no longer supports X. If your routine depended on a tool like that, a short checklist helps:"),
          ol(
            "**Save what you still can**: any exports, screenshots of your best posts and your follower numbers.",
            "**Write down your baseline**: followers, typical views and engagement rate, best topics. That is what you will compare the new tool against.",
            "**List the jobs the old tool did**, such as post stats, follower tracking or best times, and check that the replacement covers each one.",
            "**Check that the replacement is maintained** and supports X today, not only in an old review.",
          ),
          p("If scheduling and evergreen posts were part of the same routine, our [Hypefury alternatives](/blog/hypefury-alternatives) guide covers that side."),
        ],
      },
      {
        id: "choose",
        heading: "A checklist for choosing an analytics tool",
        blocks: [
          ul(
            "It answers your four questions without a spreadsheet.",
            "It shows engagement rate per post, calculated the same way every time.",
            "It tracks followers and unfollowers, not just a follower count.",
            "It keeps enough history for monthly comparisons and lets you export or back up your data.",
            "You understand where your data is stored and what the tool can do on your account.",
            "The yearly cost makes sense for your account size. Compare a full year, not the first month, and check each vendor's current pricing page.",
          ),
        ],
      },
      {
        id: "growx",
        heading: "GrowX Insights: what it measures",
        blocks: [
          p("GrowX is a Chrome extension for X with analytics built in next to its scheduler and growth tools. It reads your numbers through an **x.com tab that is already open**, one small step per minute at most, refreshes your post analytics every 3 hours while x.com is open, and keeps everything in Chrome's storage on your computer."),
          ul(
            "**Post analytics**: views, likes, reposts, replies, bookmarks and engagement rate for your recent posts. The free plan covers your latest 30 posts.",
            "**What works**: topics and formats (questions, images, text, threads, links) compared by engagement.",
            "**Best time to post**: a week-by-24-hour heat map from your own posts and when your followers are active.",
            "**Follower tracker**: once a day, who followed and who unfollowed you, with 7 days of history free. Premium keeps the full history and adds one-click unfollow back. See the [unfollower tracker](/features/twitter-unfollower-tracker).",
            "**Top fans**, a growth chart, daily goals, streaks and a monthly goal planner.",
            "**Premium extras**: which posts brought followers (new followers in the 24 hours after each post, above your usual pace), follower quality and a weekly report every Monday.",
          ),
          p("The trade-off is coverage: GrowX only knows what it has seen while Chrome was running with x.com open, so history starts on the day you install it. X's own analytics remain the official record. Details on the [analytics feature page](/features/twitter-analytics)."),
        ],
      },
      {
        id: "stack",
        heading: "A simple analytics setup by account stage",
        blocks: [
          ul(
            "**Just starting**: X's own numbers, the free engagement rate calculator and a weekly note of your best posts. Anything more is premature.",
            "**Growing steadily**: a tool that groups posts by topic and format, shows your best times and tracks unfollowers, so the weekly review takes minutes instead of an hour.",
            "**Selling something**: add website analytics with tagged links, so you can see which posts send visitors who sign up or buy.",
          ),
          p("Whatever you use, review the numbers on a fixed day each week and choose one change for the following week."),
        ],
      },
      {
        id: "mistakes",
        heading: "Analytics tool mistakes to avoid",
        blocks: [
          ul(
            "**Running three tools that disagree.** Tools read at different times and define metrics differently. Pick one main source and use X as the reference.",
            "**Judging posts after an hour.** Posts keep collecting views for a while; compare them after a day or two.",
            "**Chasing views alone.** Reach without interactions or new followers is mostly people scrolling past.",
            "**Comparing yourself with other accounts.** Compare each post with your own typical numbers instead.",
          ),
          p(TRY),
        ],
      },
    ],
    faq: [
      { q: "What is the best Twitter analytics tool?", a: "The one that answers your questions: what to post, when, which posts bring followers and who left. For many accounts that means X's own numbers plus one tool that groups posts, shows best times and tracks unfollowers." },
      { q: "Do I still need X's own analytics if I use a tool?", a: "Yes. X's numbers are the official record for your account, so use them as the reference when a tool shows something different." },
      { q: "What can I use instead of BlackMagic?", a: "BlackMagic, an X analytics tool owned by Hypefury, shut down in July 2026. Note your baseline, list the jobs it did for you and pick a maintained tool that covers them, such as GrowX Insights for post stats, best times and unfollower tracking." },
      { q: "Does GrowX need my X password to show analytics?", a: "No. GrowX reads your numbers through an x.com tab you are already signed in to, one small step per minute at most, and keeps them in your browser." },
    ],
  },
];
