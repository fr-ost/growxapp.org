# Continue with Google

"Continue with Google" signs people in to GrowX on the website (www.growxapp.org) and in the GrowX extension. Both
go through Supabase Auth (project `zyzfufifzitjmwxfqbqx`), so a Google sign-in gives the **same Supabase user and the
same access token** as a password sign-in with the same email address. `/api/entitlement`, `/api/session` and
`/api/x-accounts` see no difference.

There is no environment variable. The website shows the button when the Supabase project reports the Google provider
as enabled (`GET /auth/v1/settings` → `external.google: true`, re-checked every 5 minutes). The extension uses the
same rule. To turn Google sign-in on or off for both, change one setting: Supabase → Authentication → Providers →
Google. (An old `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` variable is no longer read. Delete it from Vercel if it is still set.)

## Dashboard checklist (do these once)

The Google client secret goes **only** into the Supabase dashboard. It never goes into this repository, Vercel or the
extension.

### 1. Google Cloud: consent screen

Google Cloud console → **Google Auth Platform** (older menus call it *APIs & Services → OAuth consent screen*):

- [ ] **Branding**
  - App name: `GrowX`.
  - User support email: an address you control. The list offers your Google account's own address or a Google Group
    you manage.
  - App home page: `https://www.growxapp.org`.
  - Privacy policy: `https://www.growxapp.org/privacy`.
  - Terms of service: `https://www.growxapp.org/terms`.
  - Authorized domains: `growxapp.org`. Supabase's guide also adds the project's own domain,
    `zyzfufifzitjmwxfqbqx.supabase.co`, because the redirect URI is on it.
  - Developer contact email: your address.
- [ ] **Audience**: user type *External*. Then press **Publish app** so the status is *In production*. In *Testing*,
  only the test users you list can sign in.
- [ ] **Data access**: keep only the default `openid`, `.../auth/userinfo.email` and `.../auth/userinfo.profile`
  scopes. They are non-sensitive, so publishing needs no Google review.
- [ ] Optional: **Verification Center → brand verification**. Until the brand is verified, Google's account chooser
  says "to continue to zyzfufifzitjmwxfqbqx.supabase.co" instead of "GrowX". Verification needs `growxapp.org`
  verified in Google Search Console. A Supabase custom domain (for example `auth.growxapp.org`, a paid add-on) shows
  your own domain there too.

### 2. Google Cloud: web client

Google Auth Platform → **Clients** → **Create client** → *Web application*:

- [ ] Name: `GrowX (Supabase)`.
- [ ] Authorized JavaScript origins: `https://www.growxapp.org`. You can also add `https://growxapp.org` and
  `http://localhost:3000`. These are checked only by Google's in-page JavaScript sign-in, which GrowX does not use. The
  redirect flow needs only the redirect URI, so preview deployments need no entry here. Google does not accept
  wildcards in this list.
- [ ] Authorized redirect URI, exactly: `https://zyzfufifzitjmwxfqbqx.supabase.co/auth/v1/callback`.
- [ ] Copy the **Client ID** and **Client secret**.

The extension does not need its own Google client. It signs in through Supabase's `/auth/v1/authorize` like the website
does, and Supabase then redirects to the extension.

### 3. Supabase: Google provider

Supabase dashboard → project `zyzfufifzitjmwxfqbqx` → **Authentication → Sign In / Providers → Google**:

- [ ] Turn **Enable Sign in with Google** on.
- [ ] Paste the Client ID (under *Client IDs*) and the Client secret.
- [ ] Leave *Skip nonce checks* off.
- [ ] Check that the *Callback URL (for OAuth)* shown there is `https://zyzfufifzitjmwxfqbqx.supabase.co/auth/v1/callback`,
  the same URI as in step 2.
- [ ] Save.
- [ ] Keep the **Email** provider enabled with *Confirm email* on. Password sign-in, sign-up and reset are unchanged.

### 4. Supabase: URL configuration

Authentication → **URL Configuration**:

- [ ] Site URL: `https://www.growxapp.org`.
- [ ] Redirect URLs:
  - `https://www.growxapp.org/**`
  - `https://growxapp.org/**`
  - `http://localhost:3000/**` (local development)
  - The extension: `https://ofiancichfcakbdgekhcahflpoglfgbh.chromiumapp.org/**`
- [ ] Preview deployments: add only the **exact** preview address you are testing, for example the branch URL
  `https://<project>-git-<branch>-<team>.vercel.app/**`. Remove it when you are done.
  - **Never add a wildcard on `vercel.app`**, such as `https://*.vercel.app/**` or `https://*-<team>.vercel.app/**`.
    In these patterns `*` also matches `-`, and anyone can create a Vercel project whose address matches. That
    person would then receive sign-in codes for GrowX accounts, for example from a reset link or a Google sign-in
    link that they trick someone into opening.
  - For Google sign-in on every preview, give previews a domain you own, if your Vercel plan allows it (for example
    `https://*.preview.growxapp.org/**`), or use a separate Supabase project for previews.

If a redirect is not on this list, Supabase sends the person to the Site URL instead. The symptom is landing on the
home page with `?code=` in the address bar, still signed out. On a preview that is not listed, Google sign-in
therefore ends on www.growxapp.org without signing in.

### 5. Check it

- [ ] The settings endpoint reports Google. The publishable key is in Supabase → Settings → API Keys and is public:

  ```sh
  curl -s -H "apikey: <publishable key>" https://zyzfufifzitjmwxfqbqx.supabase.co/auth/v1/settings
  ```

  `"google":true` must appear under `"external"`.
- [ ] Within 5 minutes, www.growxapp.org/login and /signup show **Continue with Google** above an "or" divider.
- [ ] Sign in with a Google account that has no GrowX account yet. You land on the dashboard with the email
  *Confirmed* and "You sign in with Google". Linking an X account is still required before the trial.
- [ ] Sign in with Google using the email of an existing password account. It is the same account: the same X
  accounts, plan and trial. The dashboard now says "You sign in with email and password or Google".
- [ ] In the extension, the Google button appears, and signing in shows the same account and plan.

## How it works

### Website

1. **Start.** The button submits the `googleAction` server action (`src/app/login/actions.ts`) with a hidden `next`
   (where to go afterwards). The action calls
   `signInWithOAuth({ provider: "google", options: { redirectTo, queryParams: { prompt: "select_account" } } })`.
   - `redirectTo` is `<origin of this request>/auth/callback?next=<path>&flow=google`, so a preview uses its own host
     (it must be in the Redirect URLs, see step 4).
   - `@supabase/ssr` stores the PKCE code verifier in a cookie on that host.
   - `prompt=select_account` always shows Google's account chooser.
   - The browser goes to Supabase's `/auth/v1/authorize`, then to Google.
2. **Google → Supabase.** Supabase handles the Google response at `/auth/v1/callback`. It either creates the user or
   links the Google identity to the existing user with the same verified email. It then redirects to `redirectTo`
   with `?code=` (or with `?error=…` if the person cancelled).
3. **`/auth/callback`** (`src/app/auth/callback/route.ts`):
   - Handles `?error=` / `error_code` / `error_description`, a missing code, and an invalid, used or expired code.
     Each sends the person back to `/login` with a plain-words message and the same `next`.
   - Calls `exchangeCodeForSession(code)`. This needs the verifier cookie, so the sign-in must start and finish in the
     same browser and on the same host.
   - Runs `registerWebSession` (the same step as a password sign-in, below). If that fails, it signs out and shows
     "We could not finish signing you in".
   - Redirects to `next`. `next` passes `safeNextPath` (`src/lib/validation/auth.ts`): only a relative path is
     allowed. Anything with a scheme, `//`, a backslash or control characters, or anything that resolves to another
     host, is refused, so `next` cannot be an open redirect. `/auth/*` and `/api/*` are refused too.

### Extension

The extension is unchanged. It runs PKCE with `chrome.identity.launchWebAuthFlow`, opening Supabase's
`/auth/v1/authorize?provider=google&redirect_to=https://ofiancichfcakbdgekhcahflpoglfgbh.chromiumapp.org/&code_challenge=…`.
It then exchanges the code at `POST /auth/v1/token?grant_type=pkce` and uses the access token as a Bearer token on the
website API.

- The `/api/session` contract is unchanged.
- CORS is unchanged: exact `chrome-extension://` origins from `ALLOWED_EXTENSION_ORIGINS`, no credentials.
- The extension's session counts separately from the website's, as before.

### One account per email, in both orders

- **Password first, then Google.** Supabase links the Google identity to the existing user automatically, because
  Google reports the email as verified. The user id stays the same, so profile, X accounts, trial and payments carry
  over. If that password account never confirmed its email, Supabase confirms it and removes the unconfirmed password
  first. This protects against someone pre-registering another person's address.
- **Google first, then password.**
  - Signing in with a password fails with "Invalid email or password. If you signed up with Google, use Continue with
    Google.". This is the same answer as for an unknown address, so it does not reveal which emails have accounts.
  - Signing up with a password on that email creates nothing new, and the success message points to Continue with
    Google.
  - **Forgot password** (or *Set a password* on the dashboard) adds a password to the same account. Supabase adds no
    email identity for it, so the website records `growx_password_set` in the account's user metadata. The dashboard
    then shows "email and password or Google".
- Profiles are keyed by the user id (`on_auth_user_created` → `handle_new_user()`, `on conflict do nothing`), so a
  linked account never gets a second profile.

## Post-sign-in steps

The same steps run for every way in. Nothing a first-time Google user needs can be skipped, because each required
step is enforced on the server.

| Step | Email and password | Continue with Google | Where it is enforced |
| --- | --- | --- | --- |
| Profile row | Created by the `on_auth_user_created` trigger | Same trigger (Supabase creates the user) | Database |
| Email confirmation | Link in the confirmation email | Google-verified email: Supabase sets `email_confirmed_at`, so no email is sent | Supabase Auth |
| Website session registration (one active website login per account; the extension counts separately) | `loginAction` → `registerWebSession` | `/auth/callback` → `registerWebSession`; signed out again if it fails | `src/lib/session/web.ts`, `register_active_session(…, 'web')` |
| X account step | Dashboard: link an X account | Same | `register_x_account` |
| Trial | Needs a confirmed email, a linked X account, and no trial used before by this account or this X account | Same server checks | `startTrialAction`, `start_trial` |
| Referral | GrowX has no referral programme | Same | — |
| Welcome email | None (only Supabase's confirmation email) | None | — |
| Analytics | Google Ads sign-up conversion when the sign-up form succeeds, only if `NEXT_PUBLIC_GOOGLE_ADS_SIGNUP` is set | The same conversion, once, on the first page after the account is created (`gx_new_signup` cookie, 10 minutes, no personal data). It counts only a brand-new account: its first session, with a Google identity created together with it. A returning user, an email account linked to Google, or an unconfirmed email account taken over by Google is not counted | `flow.ts` (`isNewOAuthUser`), `auth-form.tsx`, `new-signup-conversion.tsx` |

## Messages on the login page

`/login?error=<code>` shows one of these (`src/lib/auth/messages.ts`). Unknown codes show nothing.

| Code | When |
| --- | --- |
| `google_cancelled` | The person closed or declined Google's screen (`error=access_denied`) |
| `google_expired` | The code was already used, or the sign-in took too long |
| `google_other_browser` | The sign-in finished in a different browser or on a different host (PKCE verifier cookie missing) |
| `google_failed` | Any other Google or Supabase error, or a callback without a code |
| `google_unavailable` | The Google provider is off, or Supabase is not configured |
| `session_failed` | Signed in, but the website session could not be registered |
| `account_unavailable` | The account is suspended (banned) |
| `link_expired`, `link_other_browser`, `reset_other_browser`, `auth_callback` | Email links (confirmation and password reset). `link_other_browser` ("Your email is confirmed. Please log in") is used when a confirmation link cannot finish the sign-in in this browser |

While Google sign-in is starting, the Google button and the email form are both disabled. A page restored with the
browser's Back button gets a fresh, enabled button.

## Security notes

- **Secrets.** No secret is added to the website or the extension. The Google client secret lives only in Supabase.
  The service-role key stays server-only.
- **Redirects.** Supabase checks every `redirectTo` against its Redirect URLs list. `next` is checked again by
  `safeNextPath`.
- **Content Security Policy** (`next.config.ts`, production only). The flow is top-level navigation and form
  submission, so `connect-src` does not apply to it.
  - The CSP has no `form-action` directive, so the form post and its redirects to Supabase and Google are allowed.
    If `form-action` is ever added, it must include `https://zyzfufifzitjmwxfqbqx.supabase.co` and
    `https://accounts.google.com`, because Chrome applies `form-action` to the redirects after a form post too.
  - `navigate-to` was dropped from the CSP spec and browsers do not support it.
  - `tests/google-sign-in.test.ts` checks the CSP.
- **Logs.** The callback logs one JSON line per outcome (`auth_callback_failed`, `google_sign_in` with `new_user`).
  Lines carry no email, user id, code or token.
- **PKCE cookies.** Each sign-in start (Google, sign-up email, reset email) stores a code verifier cookie. The
  callback uses the most recent one. If someone starts a second sign-in in the same browser before the first
  finishes, the first can no longer finish and shows a "try again" or "log in" message. `@supabase/auth-js` also keeps
  a copy per flow (up to 5 small cookies), and these are removed at sign-out. Its per-flow matching
  (`experimental.appendPkceFlowIdToRedirects`) is experimental, so it is not turned on.

## Tests

- **Unit tests** in `tests/google-sign-in.test.ts`:
  - Callback outcomes: success, provider error, missing code, invalid or expired code, missing verifier, session
    failure.
  - `next` validation, and first-time vs returning users.
  - `googleAction`, provider availability, the button on each surface, and the CSP.
- **End to end** (`npm run test:e2e`). `tests/e2e/mock-supabase.mjs` mocks `/auth/v1/settings`, `/auth/v1/authorize`
  (a stand-in Google account chooser) and `POST /auth/v1/token?grant_type=pkce`, which checks the S256 code challenge.
  `tests/e2e/flows.mjs` covers:
  - A new Google account.
  - A returning password account signing in with Google (same account).
  - Cancel and a bad code.
  - `next` being kept.
  - The device rule.
  - An extension-style PKCE sign-in calling `/api/entitlement` and `/api/session`.
