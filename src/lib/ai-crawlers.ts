/**
 * The AI search and assistant crawlers GrowX welcomes on purpose (robots.txt gives each its own group that allows the
 * public site), with a representative user-agent string for each (it carries the crawler's token), so
 * scripts/check-ai-bots.ts can request pages the way they do.
 *
 * `token` is the robots.txt product token. Google-Extended and Applebot-Extended are robots.txt-only tokens (no crawler
 * sends them): they control use for AI training and travel as Googlebot and Applebot, so the check uses those agents.
 * The deprecated tokens anthropic-ai and Claude-Web are deliberately not listed.
 */
export interface AiCrawler {
  token: string;
  /** A representative user agent for the crawler (or the crawler it travels as), containing its token. */
  userAgent: string;
}

export const AI_CRAWLERS: readonly AiCrawler[] = [
  { token: "OAI-SearchBot", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot" },
  { token: "ChatGPT-User", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot" },
  { token: "GPTBot", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot" },
  { token: "Claude-SearchBot", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Claude-SearchBot/1.0; +https://www.anthropic.com" },
  { token: "Claude-User", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; Claude-User/1.0; +https://www.anthropic.com" },
  { token: "ClaudeBot", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ClaudeBot/1.0; +claudebot@anthropic.com" },
  { token: "PerplexityBot", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)" },
  { token: "Perplexity-User", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)" },
  { token: "Google-Extended", userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
  { token: "Applebot", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)" },
  { token: "Applebot-Extended", userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)" },
  { token: "Bingbot", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36" },
  { token: "DuckAssistBot", userAgent: "DuckAssistBot/1.2; (+http://duckduckgo.com/duckassistbot.html)" },
  { token: "Amazonbot", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot) Chrome/119.0.6045.214 Safari/537.36" },
  { token: "meta-externalagent", userAgent: "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)" },
  { token: "MistralAI-User", userAgent: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; MistralAI-User/1.0; +https://docs.mistral.ai/robots)" },
];

/**
 * The names these crawlers send in their user agent (case as sent; bingbot is lower case). The proxy logs a visit from
 * any of them. src/proxy.ts repeats this list in its matcher, which must be a literal; a test keeps the two in step.
 */
export const AI_CRAWLER_UA = /OAI-SearchBot|ChatGPT-User|GPTBot|Claude-SearchBot|Claude-User|ClaudeBot|PerplexityBot|Perplexity-User|Applebot|bingbot|DuckAssistBot|Amazonbot|meta-externalagent|MistralAI-User/;

/** Paths no crawler needs: the app, the API and the sign-in pages (the same list in every robots.txt group). */
export const PRIVATE_PATHS = ["/api/", "/dashboard", "/account", "/admin", "/invoices", "/checkout", "/auth/", "/reset-password", "/forgot-password", "/login", "/signup"];
