import { NextResponse, type NextRequest } from "next/server";
import { AI_CRAWLER_UA } from "@/lib/ai-crawlers";
import { updateSession } from "@/lib/supabase/proxy-session";

/** Pages that need a session (the first matcher entries below). */
const SESSION_PAGES = ["/dashboard", "/account", "/admin", "/invoices", "/checkout"];
const needsSession = (path: string) => SESSION_PAGES.some((p) => path === p || path.startsWith(`${p}/`));

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // One structured line per page an AI crawler fetches (bot name and path only, no personal data): see Vercel logs.
  const bot = (request.headers.get("user-agent") ?? "").match(AI_CRAWLER_UA)?.[0];
  if (bot) console.log(JSON.stringify({ event: "ai_crawler", bot, path }));
  return needsSession(path) ? updateSession(request) : NextResponse.next();
}

export const config = {
  matcher: [
    // Only pages that need a session. Public pages stay static; /api/* does its own auth.
    "/dashboard/:path*",
    "/account/:path*",
    "/admin/:path*",
    "/invoices/:path*",
    "/checkout/:path*",
    "/checkout",
    // Public pages, but only when an AI crawler asks (the user-agent condition keeps everyone else off this code). The
    // names must stay a literal here; tests/ai-crawlers.test.ts checks they match AI_CRAWLER_UA in src/lib/ai-crawlers.ts.
    {
      source: "/((?!_next/|api/|.*\\.[a-zA-Z0-9]{2,5}$).*)",
      has: [
        {
          type: "header",
          key: "user-agent",
          value:
            ".*(OAI-SearchBot|ChatGPT-User|GPTBot|Claude-SearchBot|Claude-User|ClaudeBot|PerplexityBot|Perplexity-User|Applebot|bingbot|DuckAssistBot|Amazonbot|meta-externalagent|MistralAI-User).*",
        },
      ],
    },
  ],
};
