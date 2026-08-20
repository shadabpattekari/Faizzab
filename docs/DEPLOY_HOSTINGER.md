# Deploy FaizZab to Hostinger Business Web Hosting

This guide is written for a non-technical business owner working with Hostinger Business Web Hosting (Node.js + MySQL). No VPS is required.

Canonical domain: **https://faizzab.com**

## 1. Create the MySQL database

1. Log in to Hostinger hPanel.
2. Open **Databases → MySQL Databases**.
3. Create a database, database user, and strong password.
4. Note:
   - database host (often `localhost` or a Hostinger hostname)
   - database name
   - username
   - password
5. Build your connection string:

```text
mysql://DB_USER:DB_PASSWORD@DB_HOST:3306/DB_NAME
```

If the password contains special characters, URL-encode them.

## 2. Enable Node.js for the website

1. In hPanel, open the **Node.js** / **Websites** section for faizzab.com.
2. Select a **Node.js 22** (or latest LTS compatible) runtime.
3. Set the application root to the project folder where this repository is deployed.
4. Set:
   - **Start command:** `npm start` (or `node .next/standalone/server.js` if using the standalone output folder layout Hostinger expects)
   - **Build command (if available):** `npm run build`

Hostinger Business plans vary slightly in UI. Use the Node.js app feature for this site — do not rely on plain static PHP hosting alone.

## 3. Upload / connect the code

Recommended options:

- Connect the GitHub repository in Hostinger Git deployment, **or**
- Upload the project files (excluding `node_modules` and `.env`) via File Manager / Git pull.

After files are on the server:

```bash
npm install
```

## 4. Configure environment variables

Create a `.env` file in the application root (or use Hostinger environment variable UI) using `.env.example` as the template.

Required values:

- `NODE_ENV=production`
- `APP_URL=https://faizzab.com`
- `DATABASE_URL=...`
- `SESSION_SECRET=` long random secret
- SMTP settings
- `CONTACT_NOTIFICATION_TO=info@faizzab.com`
- Bootstrap admin values (for first-time setup only)

Never commit real secrets to Git.

## 5. Run database migrations and seed

```bash
npx prisma migrate deploy
npm run db:seed
npm run bootstrap:admin
```

`bootstrap:admin` creates the first Super Admin from:

- `ADMIN_BOOTSTRAP_NAME`
- `ADMIN_BOOTSTRAP_EMAIL`
- `ADMIN_BOOTSTRAP_PASSWORD`

After success, remove or clear the bootstrap password from the hosting environment.

## 6. Configure SMTP

Use Hostinger email for `info@faizzab.com` (or your provider):

- `SMTP_HOST` (often `smtp.hostinger.com`)
- `SMTP_PORT` (`465` with `SMTP_SECURE=true`, or `587` with `SMTP_SECURE=false`)
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_NOTIFICATION_TO=info@faizzab.com`

Send a test enquiry from `/contact` and confirm the lead appears in Admin and the notification email arrives.

If email fails after a form is submitted, the lead is still stored in the database.

## 7. Build and start

```bash
npm run build
npm start
```

Or use Hostinger’s Node.js panel Start/Build controls.

The project is configured with `output: "standalone"` for Node hosting compatibility.

If your Hostinger Node starter expects the standalone server entry:

1. Run `npm run build`
2. Ensure the process starts with `node .next/standalone/server.js` **or** `npm start` from the app root (both are valid depending on panel setup)
3. Keep `public/` and `.next/static` available relative to the running server (Next copies required assets into standalone during build; if your host isolates the standalone folder, copy `.next/static` to `.next/standalone/.next/static` and `public` to `.next/standalone/public`)

Prefer the simplest Hostinger Node flow that successfully serves the site over HTTPS.

## 8. Connect the domain and SSL

1. Point `faizzab.com` and `www` DNS to Hostinger as instructed in hPanel.
2. Enable **SSL** (Let’s Encrypt) for faizzab.com.
3. Prefer HTTPS-only access.
4. Decide whether `www` redirects to apex `https://faizzab.com` (recommended) and configure the redirect in Hostinger.

## 9. Production smoke test

Check:

- Home and all main public pages load
- Contact / readiness / academy / toolkit / GRC forms store leads
- `/admin/login` works
- Unauthenticated `/admin` redirects to login
- Logout works
- `/sitemap.xml` and `/robots.txt` load
- Admin routes are noindex
- Mobile menu works on a phone

## 10. Ongoing updates

```bash
git pull
npm install
npx prisma migrate deploy
npm run build
# restart Node app in hPanel
```

## Support contacts inside the product

- Public email: info@faizzab.com
- Telephone: +91 91757 68019
- Queries / Grievances: Nazneen Pattekari, Director
