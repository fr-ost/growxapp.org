<div align="center">

<img width="100%" alt="GrowX — marketing site, accounts and Premium billing for the X growth extension" src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:6C2BD9,50:FF2E93,100:FFB703&amp;height=220&amp;section=header&amp;text=GrowX&amp;fontSize=68&amp;fontColor=ffffff&amp;fontAlignY=32&amp;animation=fadeIn&amp;desc=Marketing%20site%20%C2%B7%20accounts%20%C2%B7%20Premium%20billing&amp;descAlignY=58&amp;descAlign=50&amp;descSize=18"/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://readme-typing-svg.demolab.com?font=Fira+Code&amp;weight=600&amp;size=22&amp;duration=3600&amp;pause=700&amp;color=FFB703&amp;center=true&amp;vCenter=true&amp;width=780&amp;height=48&amp;lines=Marketing+site+for+the+GrowX+Chrome+extension;Accounts%2C+30-day+trial+and+entitlement+API;Crypto+checkout+with+NOWPayments;Next.js+16+%C2%B7+Supabase+%C2%B7+Tailwind+CSS+4;Live+at+www.growxapp.org" />
  <source media="(prefers-color-scheme: light)" srcset="https://readme-typing-svg.demolab.com?font=Fira+Code&amp;weight=600&amp;size=22&amp;duration=3600&amp;pause=700&amp;color=6C2BD9&amp;center=true&amp;vCenter=true&amp;width=780&amp;height=48&amp;lines=Marketing+site+for+the+GrowX+Chrome+extension;Accounts%2C+30-day+trial+and+entitlement+API;Crypto+checkout+with+NOWPayments;Next.js+16+%C2%B7+Supabase+%C2%B7+Tailwind+CSS+4;Live+at+www.growxapp.org" />
  <img width="780" alt="Marketing site for the GrowX Chrome extension. Accounts, a 30-day trial and an entitlement API. Crypto checkout with NOWPayments. Next.js 16, Supabase and Tailwind CSS 4. Live at www.growxapp.org." src="https://readme-typing-svg.demolab.com?font=Fira+Code&amp;weight=600&amp;size=22&amp;duration=3600&amp;pause=700&amp;color=6C2BD9&amp;center=true&amp;vCenter=true&amp;width=780&amp;height=48&amp;lines=Marketing+site+for+the+GrowX+Chrome+extension;Accounts%2C+30-day+trial+and+entitlement+API;Crypto+checkout+with+NOWPayments;Next.js+16+%C2%B7+Supabase+%C2%B7+Tailwind+CSS+4;Live+at+www.growxapp.org" />
</picture>

**The website, accounts and Premium backend for GrowX, the Chrome extension for growing on X (Twitter).**

<br/>

<a href="https://www.growxapp.org"><img alt="Live site: www.growxapp.org" src="https://img.shields.io/badge/Live-www.growxapp.org-6C2BD9?style=for-the-badge"/></a>
<a href="https://github.com/fr-ost/growxapp.org/actions/workflows/ci.yml"><img alt="GitHub Actions CI" src="https://img.shields.io/github/actions/workflow/status/fr-ost/growxapp.org/ci.yml?branch=main&amp;style=for-the-badge&amp;label=CI"/></a>
<img alt="Next.js 16" src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&amp;logo=nextdotjs&amp;logoColor=white"/>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&amp;logo=typescript&amp;logoColor=white"/>
<img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&amp;logo=tailwindcss&amp;logoColor=white"/>
<img alt="Supabase" src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&amp;logo=supabase&amp;logoColor=white"/>
<img alt="Payments with NOWPayments" src="https://img.shields.io/badge/NOWPayments-FFB703?style=for-the-badge&amp;logoColor=1A1024"/>
<img alt="Accounts backend for the GrowX Chrome extension" src="https://img.shields.io/badge/Chrome_extension_accounts-FF2E93?style=for-the-badge&amp;logo=googlechrome&amp;logoColor=white"/>

<br/>

[Live site](https://www.growxapp.org) · [Chrome Web Store](https://chromewebstore.google.com/detail/ofiancichfcakbdgekhcahflpoglfgbh) · [Shahriar Ahmed](https://github.com/fr-ost) · [Unique Labs](https://www.uniquelabs.org)

</div>

## ✨ Overview

This repository is the **GrowX website**: public marketing pages, user accounts, and the backend the Chrome extension calls to learn whether an account has Premium.

The extension (not this repo) is a desktop Chrome app, Chrome 116+, for growing on X (Twitter): smart auto-follow, a post scheduler, an on-device AI writer, analytics, an unfollower tracker and cleanup. It runs inside the person’s own signed-in x.com session, never asks for the X password, and does not use X OAuth. Claims about the extension belong in [`docs/PRODUCT_FACTS.md`](docs/PRODUCT_FACTS.md). GrowX is independent and is not affiliated with X Corp.

**Status: live** at [www.growxapp.org](https://www.growxapp.org). Public pages, email and optional Google auth, one protected dashboard (plan, trial, X accounts, payments, account), the database schema with row-level security, a 30-day trial and an entitlement API are implemented. **Payments are live**: NOWPayments (crypto) hosted invoices with a verified IPN ([`docs/BILLING.md`](docs/BILLING.md)). The extension signs in with a GrowX account and checks `/api/entitlement`.

Owner-approved product decisions live in [`docs/PRODUCT_REQUIREMENTS.md`](docs/PRODUCT_REQUIREMENTS.md).

## 🚀 Key features

| | What this repo actually ships |
| --- | --- |
| 🌐 **Marketing site** | Home, features, how it works, pricing, blog, FAQ, about, alternatives, press, what’s new, contact, and legal pages. |
| 🔐 **Accounts** | Email sign-up with confirmation, optional Google sign-in, forgot-password and reset. Sessions are Supabase Auth cookies via `@supabase/ssr`. |
| 🎛️ **Dashboard** | One protected page for plan, the 30-day trial, linked X accounts, payments and the account. `/account` redirects here. |
| 🎟️ **Entitlement** | `GET /api/entitlement` for the website session or an extension bearer token. Fails closed. Contract in [`docs/API.md`](docs/API.md). |
| ₿ **Crypto billing** | NOWPayments hosted invoices. The customer picks the coin. Premium is granted only after a verified IPN. |
| 🧮 **Free tools** | Eight in-browser tools (shadowban checker, character counter, thread maker, engagement and follower-ratio calculators, bold text, templates, bio generator). No sign-up. Nothing typed is sent to GrowX. |
| 🛠️ **Admin** | Users, gifts, payments, early-bird spots, X-account corrections and an audit log. |
| ❤️‍🩹 **Health** | `GET /api/health` reports whether Supabase Auth, the service key and the migrations are working. |

### Plans

The website is the source of truth (`src/config/pricing.ts`). Prices are prepaid. Nothing renews by itself. Checkout is crypto only.

| Plan | Price | Term |
| --- | --- | --- |
| Free | $0 | Forever |
| Premium monthly | $1.99 | 30 days |
| Premium yearly | $14.99 | 365 days |
| Premium lifetime | $59.99 | One-time. **$29.99** for the first 100 successful lifetime purchases while the early-bird offer is on |
| Extra X account slot | $0.99 | One-time, each. Every GrowX account links **2** X usernames for free |

The 30-day Premium trial is free, needs no card, can be started once per account from the dashboard, and is tied to that account and its first permanently linked X username.

`EARLY_ADOPTER_ENABLED=false` forces the regular lifetime price. Any other value, including unset, leaves the early-bird price on (the admin console can still pause it). `.env.example` sets the kill switch locally. See [`docs/BILLING.md`](docs/BILLING.md).

## 🧰 Tech stack

<div align="center">

<img alt="Next.js" src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&amp;logo=nextdotjs&amp;logoColor=white"/>
<img alt="React 19" src="https://img.shields.io/badge/React_19-149ECA?style=for-the-badge&amp;logo=react&amp;logoColor=white"/>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&amp;logo=typescript&amp;logoColor=white"/>
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&amp;logo=tailwindcss&amp;logoColor=white"/>
<img alt="Supabase" src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&amp;logo=supabase&amp;logoColor=white"/>

<br/>

<img alt="Zod" src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&amp;logo=zod&amp;logoColor=white"/>
<img alt="Vitest" src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&amp;logo=vitest&amp;logoColor=white"/>
<img alt="Playwright" src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&amp;logo=playwright&amp;logoColor=white"/>
<img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&amp;logo=vercel&amp;logoColor=white"/>
<img alt="GitHub Actions" src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&amp;logo=githubactions&amp;logoColor=white"/>

</div>

| Layer | In this repo |
| --- | --- |
| App | Next.js 16 App Router, React 19, TypeScript |
| UI | Tailwind CSS 4 |
| Auth and data | Supabase Postgres + Auth, `@supabase/ssr`. No browser Supabase client; auth mutations are Server Actions |
| Payments | NOWPayments hosted invoices, HMAC-verified IPN |
| Validation | Zod |
| Tests | Vitest; migration and RLS checks on PGlite; Playwright end-to-end against a local mock Supabase |
| Hosting | Vercel. CI on GitHub Actions runs lint, typecheck, Vitest and a production build on Node 22 |
| Analytics | Vercel Analytics when deployed on Vercel. The Google tag and Tag Manager load only when `VERCEL_ENV=production` |

## 🏁 Getting started

```bash
npm install
cp .env.example .env.local   # fill in values (see the checklist below)
npm run dev                  # http://localhost:3000
```

Without Supabase variables the public pages still work. Auth pages show a “not configured” notice, and protected routes redirect to `/login`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server at http://localhost:3000 |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run test:e2e` | Builds the app against a local mock Supabase and runs ~100 browser checks with Playwright. Needs Chromium; set `CHROMIUM_PATH` if it is not auto-detected |

### Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. **Database.** Apply every file in `supabase/migrations/` in filename order, then run `supabase/verify.sql` (SQL Editor, or `supabase db push` with the Supabase CLI linked to the project). [`docs/GO_LIVE.md`](docs/GO_LIVE.md) records that the first five (through `billing_core`) were applied on production on 2026-10-10. The folder now also has later migrations for sessions, X-account bindings, gifts and the admin console. A new project needs the full set. The Vercel integration does not apply SQL for you.
3. **Auth → Providers → Email.** Enable it, and turn **Confirm email** ON.
4. **Auth → URL Configuration.** Site URL `https://www.growxapp.org`. Redirect URLs `https://www.growxapp.org/**`, `https://growxapp.org/**`, `http://localhost:3000/**`. For cross-device email links, use the templates in [`docs/GO_LIVE.md`](docs/GO_LIVE.md):
   - Confirm signup: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard`
   - Reset password: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password`
5. **Google (optional).** Create an OAuth client in Google Cloud, set its redirect URI to the callback URL shown in Supabase → Auth → Providers → Google, enable the provider, then set `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true`.
6. Copy the **Project URL**, **publishable (anon) key** and **service_role key** (Settings → API) into your env. The service role key is a server secret: never prefix it with `NEXT_PUBLIC_`, and never commit it.
7. Review [`docs/SECURITY.md`](docs/SECURITY.md) (SMTP, CAPTCHA, password rules) before inviting real users.

### Deploy to Vercel

The full go-live and verification checklist is [`docs/GO_LIVE.md`](docs/GO_LIVE.md). `GET /api/health` reports whether Supabase Auth, the service key and the migrations are working.

1. Import the repo into Vercel (framework: Next.js; defaults are fine).
2. Add the environment variables below for Production (and Preview if you want them). Mark `SUPABASE_SERVICE_ROLE_KEY` as sensitive.
3. Set `NEXT_PUBLIC_SITE_URL` to the final https URL, update the Supabase Site and Redirect URLs, and redeploy. `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.
4. Smoke test: sign up, confirm email, log in, save an X username, start a trial, call `/api/entitlement`.

## ⚙️ Configuration

Names only. Copy [`.env.example`](.env.example) to `.env.local` and fill values in locally or in Vercel. Never commit real secrets.

| Variable | Required | Scope | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | public | `https://www.growxapp.org` in production. No trailing slash. A localhost value is ignored on a Vercel production deployment |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | public | `SUPABASE_URL` is also accepted |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | yes | public | Anon / publishable key. Also accepted: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_ANON_KEY` (the Vercel Supabase integration names work) |
| `SUPABASE_SERVICE_ROLE_KEY` | for trials | **server secret** | Trial activation and `/api/health`. `SUPABASE_SECRET_KEY` is also accepted. Never prefix with `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` | no | public | `true` only after enabling Google in Supabase |
| `NEXT_PUBLIC_CHROME_STORE_URL` | no | public | Overrides the official listing in `src/config/site.ts` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | no | public | Shown on `/contact`. Defaults to `support@growxapp.org` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | no | public | Google Search Console token. See [`docs/SEO.md`](docs/SEO.md) |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | no | public | Bing Webmaster token |
| `NEXT_PUBLIC_GOOGLE_TAG_ID` | no | public | Google tag. Loaded only when `VERCEL_ENV=production`. Defaults in `src/config/site.ts` |
| `NEXT_PUBLIC_GTM_ID` | no | public | Google Tag Manager container. Same production-only load. Defaults in `src/config/site.ts` |
| `NEXT_PUBLIC_GOOGLE_ADS_PURCHASE` | no | public | Purchase conversion as `AW-ID/label`. Defaults in `src/config/site.ts` |
| `NEXT_PUBLIC_GOOGLE_ADS_SIGNUP` | no | public | Sign-up conversion. Off until set |
| `BILLING_GRACE_DAYS_CARD` | no | server | Days of grace after a failed recurring card payment before reverting to Free. Default `3` (0–14) |
| `BILLING_GRACE_DAYS_CRYPTO` | no | server | Same for crypto. Default `0` |
| `ALLOWED_EXTENSION_ORIGINS` | for the extension | server | Comma-separated exact origins. GrowX is `chrome-extension://ofiancichfcakbdgekhcahflpoglfgbh`. Empty means no cross-origin access |
| `BILLING_LIVE_APPROVED` | for payments | server | `true` to take real payments, together with the NOWPayments keys. Checkout stays unavailable until all three are set |
| `EARLY_ADOPTER_ENABLED` | no | server | `false` forces the regular lifetime price. Anything else leaves the early-bird price on |
| `NOWPAYMENTS_ENV` | no | server | `production` (default) or `sandbox` |
| `NOWPAYMENTS_API_KEY` | for payments | **server secret** | NOWPayments API key |
| `NOWPAYMENTS_IPN_SECRET` | for payments | **server secret** | IPN secret (dashboard → Store settings → IPN) |
| `SINGLE_SESSION_SCOPE` | no | server | Empty: one active **website** session and one active **extension** session. `account`: one session across everything, so a website login also signs the extension out |

Coins are chosen on the NOWPayments invoice page. Enable or disable them in the NOWPayments dashboard, not in env. [`docs/BILLING.md`](docs/BILLING.md) is the runbook, including which coins production is set up to accept.

## 📖 Usage

Public pages render without an account. Sign-up, the dashboard, trial start and checkout need Supabase. Checkout also needs the payment variables above.

| Surface | Who | What happens |
| --- | --- | --- |
| `/`, `/features`, `/pricing`, `/tools`, `/blog`, `/faq` | anyone | Marketing and the free tools |
| `/login`, `/signup`, `/forgot-password`, `/reset-password` | visitors | Supabase Auth. Email confirmation is required |
| `/dashboard` | signed-in | Plan, trial, X usernames, payments, account |
| `/checkout` | signed-in, confirmed email | Server-priced invoice summary, then the NOWPayments page |
| `GET /api/entitlement` | session cookie or `Authorization: Bearer` | Effective plan. No user id in the query. `503` is not Premium |
| `GET /api/health` | public | Auth, database and billing configuration, without secret values |
| `POST /api/webhooks/nowpayments` | NOWPayments | Verified IPN only. This is what grants Premium |
| `/admin` | administrators | Gifts, users, payments, early bird, X accounts, audit |

After a production deploy, the checks in [`docs/GO_LIVE.md`](docs/GO_LIVE.md) are the ones that matter: `/api/health` returns auth and database `ok`, a real sign-up confirms and can start a trial, a second start (or the same X username on another account) is refused, `/api/entitlement` returns `"plan":"TRIAL"` in that browser and `401` in a private window.

One account has one active website session and one active extension session. A newer login of the same kind replaces the older one. Signing in on the website does not sign the extension out unless `SINGLE_SESSION_SCOPE=account`. Details: [`docs/SINGLE_SESSION.md`](docs/SINGLE_SESSION.md).

## 🗂️ Project structure

```
src/app            App Router pages, Server Actions and route handlers
src/components     UI, marketing, billing, admin, auth, tools
src/config         site, pricing, features, navigation
src/content        marketing copy and page data
src/lib            env, Supabase clients, entitlement, billing, session, trial
public/            icons, logo, and the extension screenshots used on the site
supabase/          SQL migrations and verify.sql
tests/             Vitest, PGlite migration/RLS tests, Playwright e2e
docs/              product, billing, security, go-live, API
extension-reference/  notes for wiring the extension (reference only; not applied from this repo)
.github/workflows/ci.yml   lint, typecheck, test, build
```

## 📚 Documentation

| Doc | What it covers |
| --- | --- |
| [`docs/SEO.md`](docs/SEO.md) | Keyword strategy, what is implemented, Search Console steps |
| [`docs/SUPABASE_PRODUCTION.md`](docs/SUPABASE_PRODUCTION.md) | Production errors, root causes, required Supabase and Vercel settings |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Structure and design decisions |
| [`docs/API.md`](docs/API.md) | API contract, including `/api/entitlement` |
| [`docs/PRODUCT_REQUIREMENTS.md`](docs/PRODUCT_REQUIREMENTS.md) | Owner-approved product decisions |
| [`docs/PRODUCT_FACTS.md`](docs/PRODUCT_FACTS.md) | Extension facts the website copy is allowed to claim |
| [`docs/FEATURE_SPLIT.md`](docs/FEATURE_SPLIT.md) | Extension feature inventory and the proposed Free / Premium split |
| [`docs/EXTENSION_INTEGRATION.md`](docs/EXTENSION_INTEGRATION.md) | How the extension authenticates, and what has to change in it |
| [`docs/X_ACCOUNTS.md`](docs/X_ACCOUNTS.md) | Linked X usernames and extra slots |
| [`docs/SINGLE_SESSION.md`](docs/SINGLE_SESSION.md) | One active website session and one active extension session |
| [`docs/BILLING.md`](docs/BILLING.md) | NOWPayments integration, setup and runbook |
| [`docs/BILLING_TESTING.md`](docs/BILLING_TESTING.md) | What was tested and what was not |
| [`docs/PAYMENTS.md`](docs/PAYMENTS.md) | Original payment design and principles |
| [`docs/ADMIN.md`](docs/ADMIN.md) | Admin console |
| [`docs/GO_LIVE.md`](docs/GO_LIVE.md) | Vercel and Supabase go-live checklist |
| [`docs/SECURITY.md`](docs/SECURITY.md) | What is in place, and what to review before launch |
| [`docs/DECISIONS_NEEDED.md`](docs/DECISIONS_NEEDED.md) | Business details still needed from the owner |

## ⚠️ Known limitations

- Legal pages are published with default wording chosen while drafting (14-day refunds, Bangladesh law, a 12-month liability cap) and have not been reviewed by a lawyer. Adjust them in `src/app/terms`, `src/app/privacy` and `src/app/refund-policy`.
- Account deletion is manual on purpose. Deleting an account would also delete trial records and allow a repeat trial, and payment records have to be kept.
- There is no app-level rate limiting yet. Use Vercel Firewall (see [`docs/GO_LIVE.md`](docs/GO_LIVE.md)). A production Content-Security-Policy is set, but it allows inline scripts because Next.js hydration needs them ([`docs/SECURITY.md`](docs/SECURITY.md)).
- Trial abuse is reduced, not removed. A self-reported X username cannot prove ownership.
- RLS and migration tests run on PGlite, not a real Supabase project.
- The Free / Premium feature split is a proposal. It is not enforced in this repo. The extension is what applies plan limits; this site reports the plan.

## 🖼️ Screenshots

These files already live in `public/screens/` and are the extension UI shown on the marketing site. **The numbers in them are demo data.** Do not quote them as results.

<div align="center">

| Home | Grow |
| --- | --- |
| <img src="public/screens/overview.webp" width="420" alt="GrowX Home dashboard with daily goals, upcoming posts, this week on X and the popup with pace controls (demo data)"/> | <img src="public/screens/grow.webp" width="420" alt="GrowX Grow page with Find sources for me, pace presets and safety badges (demo data)"/> |
| **Create** | **Insights** |
| <img src="public/screens/create.webp" width="420" alt="GrowX Create page with the post composer, AI ideas and queue slots (demo data)"/> | <img src="public/screens/insights.webp" width="420" alt="GrowX Insights page with post stats, a best-time heat map and engagement by format (demo data)"/> |

<img src="public/screens/followers.webp" width="640" alt="GrowX Followers page with new followers, unfollowers, an unfollow-back button and a follower quality breakdown (demo data)"/>

*Followers (demo data). A 1400×560 promo banner is at `public/screens/marquee.webp`.*

</div>

## 💜 Credits

Built by **[Shahriar Ahmed](https://github.com/fr-ost)**, Co-Founder and COO of **[Unique Labs](https://www.uniquelabs.org)**.

[shahriarahmed.net](https://www.shahriarahmed.net) · [growxapp.org](https://www.growxapp.org) · [Unique Labs](https://www.uniquelabs.org)

<div align="center">

<img width="100%" alt="Footer wave" src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:FFB703,50:FF2E93,100:6C2BD9&amp;height=120&amp;section=footer"/>

</div>
