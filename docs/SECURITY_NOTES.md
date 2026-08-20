# Security Notes — FaizZab Website

## Authentication

- Passwords hashed with bcrypt (no plaintext storage)
- Strong password rules enforced for Admin password set/reset
- Sessions stored server-side; browser receives HttpOnly cookie (`fz_session`)
- Secure cookie flag enabled in production
- SameSite=Lax
- Session expiration
- Logout invalidates server session
- Forgot-password tokens hashed at rest and time-limited
- Login rate limiting / brute-force resistance
- No public Admin registration
- No hard-coded production Admin password
- Bootstrap Super Admin only via environment variables

## Authorization

- Server-side role checks for SUPER_ADMIN vs CONTENT_EDITOR
- CONTENT_EDITOR blocked from privileged user/security/identity actions
- Middleware blocks unauthenticated Admin panel access
- Admin routes send `X-Robots-Tag: noindex, nofollow`

## Public forms

- Zod validation on the server
- Field length limits
- Honeypot field
- IP-based rate limiting (database-backed; no Redis required)
- Leads persisted before/despite email notification outcome

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
- Content-Security-Policy (application-compatible baseline)

## Hosting notes

- Designed for Hostinger Business Web Hosting + MySQL/MariaDB + Node.js
- Does not require Redis, Vercel, Netlify, Docker, Kubernetes, or cloud VPS
- Keep `.env` outside Git
- Rotate Admin passwords and SMTP credentials if exposure is suspected

## Legal / content caution

Legal page text and toolkit licence wording should receive qualified legal review before commercial launch. The website does not claim that legal review has already occurred.
