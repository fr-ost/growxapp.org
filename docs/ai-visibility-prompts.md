# AI visibility: monthly prompt check

Once a month, ask these 20 questions in each AI engine and record what comes back. The goal is to see whether GrowX is
mentioned, whether growxapp.org is cited, and which other sources the engines trust for these questions. Those sources
are where GrowX needs to be present (comparison lists, Reddit threads, review sites).

Engines: ChatGPT (search on), Perplexity, Google Gemini, Claude (web search on), Microsoft Copilot, Google AI Mode.

How to run it:

1. Use a logged-out or fresh session where possible, so past chats do not change the answer.
2. Paste the prompt exactly as written. Do not mention GrowX in the prompt.
3. Record one row per prompt and engine in the table below (or in a copy of it in a spreadsheet).
4. Compare with last month. A new competitor or a new cited source is worth a note.

## The 20 prompts

1. best chrome extension to grow on twitter
2. how to see who unfollowed me on x
3. twitter auto follow tool that is safe
4. circleboom alternative
5. free tweet scheduler chrome extension
6. how to grow a crypto twitter account
7. what is the twitter follow limit per day
8. how to unfollow people who don't follow me back on x
9. best tool to grow twitter followers in 2026
10. hypefury alternative that is cheaper
11. tweet hunter vs typefully vs other tools
12. how to get my first 1000 followers on x
13. is it safe to use auto follow on twitter
14. ai tweet writer that runs on my computer
15. twitter analytics chrome extension
16. how to follow everyone in a twitter list
17. how to schedule tweets for free without paying
18. best way to grow on x as a startup founder
19. chrome extension to reply to tweets with ai
20. how to clean up my twitter following

## Results log

| Date | Engine | Prompt # | GrowX mentioned? (yes/no) | growxapp.org cited? (yes/no) | Position or wording | Other sources cited |
|---|---|---|---|---|---|---|
| YYYY-MM-DD | ChatGPT | 1 |  |  |  |  |
| YYYY-MM-DD | Perplexity | 1 |  |  |  |  |
| YYYY-MM-DD | Gemini | 1 |  |  |  |  |
| YYYY-MM-DD | Claude | 1 |  |  |  |  |
| YYYY-MM-DD | Copilot | 1 |  |  |  |  |
| YYYY-MM-DD | Google AI Mode | 1 |  |  |  |  |

## What to look at each month

- **Mentions:** how many of the 120 answers (20 prompts, 6 engines) name GrowX, and whether the description is right
  (the canonical definition is in `src/config/site.ts`: a Chrome extension for X, free to start).
- **Confusion:** answers that mix GrowX (growxapp.org) up with other products called GrowX. If you see it, the
  disambiguation line on /about and /press is the fact to point to.
- **Citations:** which growxapp.org pages are cited. Feature pages, /pricing, /alternatives/* and /press are built to be
  quoted.
- **Other sources:** the third-party pages that keep appearing. Getting listed or mentioned there (honestly) does more
  for AI answers than any change on growxapp.org.
- **Referral traffic:** the "AI search" channel in Vercel Analytics and Tag Manager (event `ai_search_visit`, property
  `ai_source`), and the `ai_crawler` lines in Vercel's logs (which AI crawlers fetched which pages).
