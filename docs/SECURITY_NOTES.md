# Security Notes — FaizZab Website

## Authentication

- Passwords hashed with bcrypt (no plaintext storage)
- Strong password rules enforced for Admin password set/reset and `ADMIN_BOOTSTRAP_PASSWORD`
- Sessions stored server-side; browser receives HttpOnly cookie (`fz_session`)
- Secure cookie flag enabled in production
- SameSite=Lax
- Absolute session expiration (7 days)
- Logout invalidates server session
- Password change and password-reset completion invalidate existing sessions
- Disabled Admin accounts cannot keep privileged sessions (`getSessionUser` rechecks `isActive`)
- Deactivating a Content Editor deletes that user’s sessions
- Login IP rate limiting (database-backed)
- Account-level `failedLoginCount` / `lockedUntil` (5 failures → ~15 minute lockout)
- Successful login clears failure/lockout state
- Public authentication failures return one generic **401** message (no account-state enumeration)
- Admin login rate-limit subsystem **fails closed** if the limiter cannot evaluate (no unlimited guessing during DB outage)
- Public lead-form rate limiting remains fail-open for availability (still Zod + honeypot protected)
- No public Admin registration
- No hard-coded production Admin password
- Bootstrap Super Admin only via environment variables

## Authorization & CSRF

- Server-side role checks for SUPER_ADMIN vs CONTENT_EDITOR
- CONTENT_EDITOR blocked from privileged user/security/identity actions
- Middleware blocks unauthenticated Admin panel access
- Admin mutation routes require a matching same-origin `Origin` header
- Cross-origin state-changing Admin requests are rejected
- Admin routes send `X-Robots-Tag: noindex, nofollow`

## Public forms

- Zod validation on the server
- Field length limits
- Honeypot field
- IP-based rate limiting (database-backed; no Redis required)
- Leads persisted before/despite email notification outcome

## Rate-limit cleanup

- Expired `RateLimitRecord` rows are removed opportunistically (~2% of rate-limit checks)
- Cleanup failures never break request handling
- No Redis, queue workers, or VPS required

## Structured data (JSON-LD)

- All JSON-LD embedded via `dangerouslySetInnerHTML` uses `safeJsonLd()`
- Angle brackets and ampersands are Unicode-escaped to prevent `</script>` breakout from Admin-managed strings

## Email / secrets

- SMTP credentials only from environment variables
- Database URL only from environment variables
- Secrets never shipped in client JavaScript bundles intentionally
- Audit logs scrub password/token/secret-like fields

## HTTP security headers

Configured in `next.config.ts` where compatible:

- Strict-Transport-Security (production)
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- X-Frame-Options / frame-ancestors clickjacking protection
- Content-Security-Policy (production `script-src` does **not** include `unsafe-eval`)
- Nonce-based CSP is intentionally deferred; JSON-LD escaping is the mandatory control in this release

## Dependency security

- Production installs use the committed lockfile (`npm ci`)
- `overrides` pin patched `postcss` and `sharp` without requiring a Next.js major upgrade
- Re-run `npm audit` after dependency changes; document any remaining advisories honestly

## Production database migrations

Use:

```bash
npx prisma migrate deploy
```

or:

```bash
npm run db:migrate
```

Do **not** use `prisma db push` in production. `db push` is for local development only.

## Hosting notes

- Designed for Hostinger Business Web Hosting + MySQL/MariaDB + Node.js
- Does not require Redis, Vercel, Netlify, Docker, Kubernetes, or cloud VPS
- Keep `.env` outside Git
- Rotate Admin passwords and SMTP credentials if exposure is suspected

## Legal / content caution

Legal page text and toolkit licence wording should receive qualified legal review before commercial launch. The website does not claim that legal review has already occurred.
