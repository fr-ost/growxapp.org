# Architecture

```
Browser ──> Next.js 16 (Vercel)
              ├─ Public pages (static): /, /features, /pricing, /contact, /privacy, /terms
              ├─ Auth pages: /login, /signup  (Server Actions -> Supabase Auth)
              ├─ Protected page (dynamic): /dashboard (one page: plan + trial, X accounts, payments, account; /account redirects here)
              ├─ src/proxy.ts  (refreshes Supabase session cookies; redirects signed-out users)
              └─ Route handlers: /api/entitlement, /api/health, /auth/callback (OAuth/PKCE), /auth/confirm (email token links), /auth/signout
Extension (later) ──Bearer token──> /api/entitlement
Next.js server ──> Supabase (Postgres + Auth). Service role key only on the server.
```

## Key decisions
- **Supabase `@supabase/ssr` cookie sessions** for the website. Server code authorises with `auth.getUser()` (validated by the Auth server), not `getSession()`. The proxy uses `getClaims()` only for redirects/refresh; each protected page re-checks with `requireUser()`.
- **No browser Supabase client.** All auth mutations are Server Actions, so the browser never needs the key beyond cookies, and fewer secrets/paths are exposed.
- **RLS is the primary data defence.** Users can `select` their own rows, and write only their own `x_profiles` row (column-restricted; `x_username_normalized` is a generated column). Trials, subscriptions, payments and webhook events are written only by the service role. `anon` has no table privileges.
- **The service role stays on the server** (`src/lib/supabase/admin.ts`, `server-only`): starting trials (`start_account_trial`, run automatically for new accounts by `src/lib/trial/auto.ts`, and the dashboard's Start button), billing checkout and webhooks, X-account linking, the session registry, invoices and the admin console. The trial functions are executable only by `service_role`. Entitlement reads use the *user's* token under RLS, so no service role is needed.
- **Trial integrity in the database:** `unique(user_id)` and `unique(x_username_normalized)` on `trials`; time from the DB clock; username snapshot kept on the trial row and in `x_profile_history`, so renames never erase history. `x_profiles` is not unique across users so nobody can squat another person's handle and block their profile; the trial uniqueness is best-effort abuse reduction, not identity proof.
- **Entitlement is a pure function** (`src/lib/entitlement/resolve.ts`) over trial and subscription rows: provider-neutral, fully unit-tested, fails closed.
- **Pricing and features are data** in `src/config/`, used by UI, docs and tests.
- **Public pages are static.** The header has no per-request auth lookup.

## Layout
```
src/app            routes (App Router)
src/components     UI primitives + feature components
src/config         site, pricing, features
src/lib            env, supabase clients, entitlement, trial, validation, api helpers
supabase/migrations  SQL schema + RLS
tests              vitest (unit, API, and real-Postgres migration/RLS tests via PGlite)
docs               this documentation
```

## Testing approach
- Entitlement/trial/validation/API route: vitest with mocks.
- Migration and RLS: the real SQL runs in PGlite with stand-ins for Supabase's `auth` schema and roles. This verifies grants, policies and constraints but is **not** a replacement for testing against a real Supabase project (see SECURITY.md).

## Performance and motion
All motion JS is one module, `src/components/motion/runtime.ts` (mounted by `MotionRuntime`); the CSS is in `src/app/globals.css`. Rules that keep scrolling and idle pages smooth (each one fixed a measured stutter):
- **Ambient loops start off.** `[data-ambient]` boxes (aurora, light beams, looping border beam, marquee, word roll, privacy map) animate only while the runtime marks them `data-live` (on screen, 120px margin). Endless loops have `animation: none` otherwise. A loop that started before it could be paused, inside a far-away `content-visibility: auto` section, kept running unseen and made the main thread produce a frame on every vsync.
- **Hover effects wait while the page scrolls.** With a fine pointer the runtime sets `html[data-scrolling]` during a scroll (cleared 150ms after it stops). The `fx:` variant and the card hover rules (lift, spotlight, `.nudge`) require it to be absent, so cards sliding under a resting pointer don't each start their transitions.
- **Selector shape for those conditions:** put the `html` condition in front of the element, `:where(html:not([data-scrolling])) .card`, never inside it, `.card:where(html:not([data-scrolling]) *)`. Chrome restyles the whole document for the second form every time the attribute flips.
- **Reveals are one-shot transitions, not scroll-linked animations.** Use `.reveal*` or a one-shot class from `ONE_SHOTS` (`.fill-up`, `.marker-sweep`, `.draw-x`, ...). Scroll-linked `view()` timelines only for compositor properties (opacity, transforms) on a few elements; never `clip-path` or `background-position`, which repaint on every scroll frame. No per-card reveals in long lists (the blog index).
- **Read layout before writing classes.** The runtime's scroll-settle pass reads every position first, then adds classes; interleaving them forced one restyle and layout per element.
- **Prefetch on intent in dense link lists.** Plain `<Link>` prefetches every route that scrolls into view; the footer alone fetched about 40 routes per page. Use `IntentLink` (`src/components/ui/intent-link.tsx`: prefetch on hover, focus, touch or press, not while the page scrolls) for the footer, blog cards, feature and tool grids and rich text. Keep `<Link>` for the header and main calls to action.
- **The spotlight only follows the pointer on nearby cards.** Cards in a `[data-spotlight-group]` farther than the glow's reach are parked once, not restyled and repainted on every pointer move.
