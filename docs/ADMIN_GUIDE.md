# FaizZab Admin Guide

Admin URL: `https://faizzab.com/admin/login`

There is **no public Admin registration**. Accounts are created by a Super Admin (or the one-time bootstrap script).

## Roles

### SUPER_ADMIN

Can manage:

- All website content
- Enquiries/leads
- Insights, services, toolkit, Academy, GRC Platform, FAQs, SEO
- Users
- Protected company identity settings
- Audit logs
- Security-sensitive settings

### CONTENT_EDITOR

Can manage ordinary website content:

- Homepage sections
- Services
- Toolkit
- Academy
- GRC Platform copy/status
- Insights
- FAQs
- Ordinary SEO fields
- Non-protected settings

Cannot:

- Create unauthorized Super Admins
- Elevate their own role
- View password hashes
- Delete audit history
- Change protected company identity fields without Super Admin permission

## Sign in

1. Open `/admin/login`
2. Enter email and password
3. Sessions use an HttpOnly cookie and expire automatically

## Forgot / reset password

1. Use **Forgot password**
2. If SMTP is configured, a reset link is emailed
3. Choose a strong new password (12+ characters, upper, lower, number, special)

## Modules

| Module | Purpose |
| --- | --- |
| Dashboard | Overview |
| Enquiries | View and update lead status |
| Homepage | Homepage section content |
| Services | Service pages and featured packaging |
| Toolkits | Toolkit status/content (COMING SOON → AVAILABLE NOW) |
| Academy | Course status/content |
| GRC Platform | In-development product content |
| Insights | Draft, preview, publish, unpublish |
| FAQs | FAQ management |
| SEO | Path-level metadata |
| Settings | Contact/social and site settings |
| Users | Super Admin user management |
| Audit log | Security and content event history |
| Change password | Update your own password |

## Enquiry lead types

- GENERAL
- CONSULTATION
- READINESS_ASSESSMENT
- TOOLKIT
- ACADEMY
- GRC_PLATFORM

## Enquiry statuses

NEW → CONTACTED → QUALIFIED → PROPOSAL_SENT → WON / CLOSED / SPAM

## Insights workflow

1. Create draft
2. Edit content, category, slug, SEO fields
3. Publish when ready
4. Only **published** Insights appear on the public site
5. Unpublish to remove from public view

Do not publish invented articles.

## Toolkit status

Initial public status: **COMING SOON** (Join Toolkit Launch List).

When ready for commercial requests, Super Admin / authorized editor sets status to **AVAILABLE NOW**. CTA becomes **Request Toolkit Purchase**. Online payment is not included in this phase.

## Security habits

- Use unique strong passwords
- Log out on shared computers
- Do not share Admin accounts
- Review audit logs periodically
- Keep SMTP and database credentials only in hosting env vars
