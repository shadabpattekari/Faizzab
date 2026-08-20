# QA Checklist — FaizZab Website

## Commands

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

## Public pages

- [ ] `/`
- [ ] `/about`
- [ ] `/services`
- [ ] `/services/iso-27001-grc-readiness-assessment`
- [ ] Other service detail pages
- [ ] `/industries`
- [ ] `/academy`
- [ ] `/academy/[slug]`
- [ ] `/grc-platform`
- [ ] `/toolkits`
- [ ] `/toolkits/iso-27001-grc-starter-toolkit-2026`
- [ ] `/insights`
- [ ] `/insights/[slug]` (published only)
- [ ] `/contact`
- [ ] `/corporate-information`
- [ ] `/privacy-policy`
- [ ] `/terms-of-use`
- [ ] `/disclaimer`
- [ ] `/cookie-policy`

## Business status wording

- [ ] Consulting — AVAILABLE NOW
- [ ] Academy — COMING SOON
- [ ] GRC Platform — IN DEVELOPMENT
- [ ] Toolkit — COMING SOON initially
- [ ] No conflicting “live/available” wording for Academy/Platform/Toolkit before release

## Forms (store leads)

- [ ] Contact → GENERAL
- [ ] Consultation → CONSULTATION
- [ ] Readiness assessment → READINESS_ASSESSMENT
- [ ] Academy launch list → ACADEMY
- [ ] Toolkit launch list → TOOLKIT
- [ ] GRC Platform interest → GRC_PLATFORM
- [ ] Honeypot ignored/spam-safe
- [ ] Rate limiting blocks rapid abuse
- [ ] Email notification attempted; lead preserved if SMTP fails

## Admin

- [ ] `/admin/login` works
- [ ] Unauthenticated `/admin` blocked
- [ ] SUPER_ADMIN access
- [ ] CONTENT_EDITOR restrictions enforced server-side
- [ ] Logout works
- [ ] Password change works
- [ ] Forgot/reset password works when SMTP configured
- [ ] Audit log records login/logout/content changes
- [ ] Admin noindex header present

## SEO / technical

- [ ] Unique titles and meta descriptions
- [ ] Canonical URLs use https://faizzab.com
- [ ] `/sitemap.xml`
- [ ] `/robots.txt` disallows `/admin`
- [ ] Organization / WebSite / Service / Article / Breadcrumb schema where applicable
- [ ] No fake Review/AggregateRating schema

## Mobile / a11y

- [ ] 320 / 375 / 390 / 430 widths — no horizontal scroll
- [ ] Tablet and desktop layouts
- [ ] Mobile menu keyboard accessible
- [ ] Form labels and error messages accessible
- [ ] Reduced-motion respected

## Company data

- [ ] Legal name exactly: FAIZZAB INTEGRITY PRIVATE LIMITED
- [ ] CIN: U62020PN2026PTC259388
- [ ] Email: info@faizzab.com
- [ ] Telephone: +91 91757 68019
- [ ] Grievances: Nazneen Pattekari, Director
- [ ] Zero occurrences of any previous/incorrect legal entity name containing “Consultancy”
- [ ] Registered office lines match the official Mulshi / Bhukum / Pune - 412115 address exactly
