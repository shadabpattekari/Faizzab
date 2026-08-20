# FaizZab Website

Production website for **FAIZZAB INTEGRITY PRIVATE LIMITED** (brand: **FaizZab**).

- Domain: [https://faizzab.com](https://faizzab.com)
- Stack: Next.js 15 (App Router), React, TypeScript, Tailwind CSS, Prisma, MySQL/MariaDB

## Quick start (local)

1. Copy environment file:

```bash
cp .env.example .env
```

2. Set `DATABASE_URL`, SMTP values, and bootstrap admin values in `.env`.

3. Install and prepare database:

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run bootstrap:admin
```

4. Run locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests |
| `npm run db:push` | Push schema (dev) |
| `npm run db:migrate` | Apply migrations |
| `npm run db:seed` | Seed content |
| `npm run bootstrap:admin` | Create initial Super Admin from env |

## Documentation

- [Hostinger deployment](docs/DEPLOY_HOSTINGER.md)
- [Admin guide](docs/ADMIN_GUIDE.md)
- [QA checklist](docs/QA_CHECKLIST.md)
- [Security notes](docs/SECURITY_NOTES.md)

## Business status (public)

- Consulting — **AVAILABLE NOW**
- FaizZab Academy — **COMING SOON**
- FaizZab GRC Platform — **IN DEVELOPMENT**
- ISO 27001 GRC Starter Toolkit — **COMING SOON** (initial)

## Legal entity

FAIZZAB INTEGRITY PRIVATE LIMITED  
CIN: U62020PN2026PTC259388  
Email: info@faizzab.com  
Telephone: +91 91757 68019  
Queries / Grievances: Nazneen Pattekari, Director
