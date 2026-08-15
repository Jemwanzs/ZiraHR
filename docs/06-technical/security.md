# Security

A code-level audit pass (Phase 11, client-requested) of the actual codebase — not a generic checklist, findings verified by reading the real code and, where relevant, fixed.

## Findings fixed

- **JSON-LD script injection (defense-in-depth)**: `dangerouslySetInnerHTML` is used in two places (`StructuredData.tsx`, `Breadcrumbs.tsx`) to embed structured data. Both now go through a shared `safeJsonLd()` helper (`src/lib/seo.ts`) that escapes `<` before embedding, so a literal `</script>` inside a string value can't break out of the script tag. Everything currently embedded is developer-controlled (translated copy, route paths) so this wasn't exploitable today, but it's the correct pattern regardless and protects the site by construction if any of that content ever becomes editable.
- **Unbounded array input**: `demoRequestSchema`'s `interestedModules` field had no `.max()` — a client could submit an array with an unbounded number of repeated (still individually-valid) enum values. Capped at `MODULE_OPTIONS.length`.
- **Unbounded honeypot field**: the spam-check `website` field had no length limit at all after the Phase-6/Phase-10 fix that removed its incorrect `max(0)` constraint (see `notifications.md`/commit history) — meaning a client could submit an arbitrarily large string in that one field. Added `max(1000)`, which is generous enough to never interfere with the spam-detection logic (anything non-empty is already treated as spam) while bounding payload size.
- **Missing baseline HTTP security headers**: `next.config.ts` had no `headers()` at all. Added `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` disabling camera/microphone/geolocation (none of which this site uses).

## Verified as already correct

- **Secrets never reach the client**: only one `NEXT_PUBLIC_*` variable exists (`NEXT_PUBLIC_SITE_URL`), a non-secret URL. The Supabase service-role key is read only in `src/lib/supabase/server.ts`, which imports `server-only` — any accidental import from a Client Component fails the build rather than shipping the key.
- **No injection surface in Supabase calls**: every write is `.insert()`/`.upsert()` with object literals through the Supabase JS client (parameterized under the hood) — no raw SQL string-building anywhere in the codebase.
- **RLS is fully locked**: all four Supabase tables have RLS enabled with zero policies (verified by re-reading the actual migration SQL you ran, not just the intent) — nothing is readable or writable from the browser regardless of key exposure.
- **Slack payloads are JSON-safe by construction**: notification bodies are built as JS objects passed to `JSON.stringify()` in the fetch call, not string concatenation, so there's no message-injection vector from user-supplied names/text.
- **`npm audit` clean**: zero vulnerabilities across both production and dev dependencies at time of audit.
- **No remote image sources**: `next.config.ts` has no `images.remotePatterns`, so there's no SSRF-via-image-optimizer surface — everything goes through `next/image` against local `/public` assets.
- **Cookie consent storage is defensively parsed**: `readConsent()` wraps its `JSON.parse` in try/catch and falls back to `null` on anything malformed, rather than throwing.

## Known, accepted gaps (not fixed — documented instead of silently ignored)

- **No rate limiting on `/api/forms/*`**: the honeypot + minimum-fill-time checks deter unsophisticated bots but are not a rate limiter — a scripted attacker that waits out the timing check and leaves the honeypot empty could still submit at volume. A real fix needs external infra (Vercel KV / Upstash Redis or similar) that isn't provisioned yet. Deliberately not implementing an in-memory counter as a stand-in — on Vercel's serverless model that resets on every cold start and doesn't share state across concurrent instances, so it would look like protection without actually providing much, which is worse than clearly having none. Revisit if spam volume becomes a real problem (the architecture doc already flags this same tradeoff for CAPTCHA).
- **No CSRF token on the lead-capture forms**: acceptable here specifically because these forms are anonymous and unauthenticated (no session/account state changes) — a cross-site submission has the same practical impact as a bot submission (one spurious lead), already covered by the spam checks above. This would need revisiting if any form ever performs an authenticated, state-changing action.
- **No Content-Security-Policy**: see the comment in `next.config.ts` — a real CSP needs a nonce-based setup compatible with Next's hydration/RSC inline scripts, which needs live cross-page verification this pass didn't have room for. Flagged as a follow-up, not shipped half-configured.
- **Route Handlers have no explicit request-body size cap** beyond whatever Vercel's platform enforces at the infrastructure level — Zod's field-level `max()` constraints reject oversized *values* after parsing, not the raw request body before it's read into memory. Acceptable given the platform-level backstop; a custom pre-parse size check would add complexity for marginal benefit here.
