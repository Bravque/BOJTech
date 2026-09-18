# Deployment & Admin Guide

BOJ Technologies is a Next.js 14 app backed by a **MySQL** database, with a
login-protected **admin dashboard** at `/admin` for managing all site content.
Content edits are written to the database and appear on the live site
immediately (all content pages render dynamically).

## Environment variables

Copy `.env.example` to `.env` (local) or set these in the host's panel:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | MySQL connection string: `mysql://USER:PASSWORD@localhost:3306/DBNAME` |
| `NEXTAUTH_SECRET` | Session signing secret. Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Public site URL, e.g. `https://bojtechnologies.com` (use `http://localhost:3000` locally) |
| `RESEND_API_KEY` / `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL` | Contact-form email delivery (optional; see main README) |

## First-time setup (any environment)

```bash
npm install
npx prisma migrate deploy   # create tables from prisma/migrations
npm run db:seed             # load the current site content (idempotent)
npm run create-admin -- "Your Name" you@bojtechnologies.com "a-strong-password" ADMIN
npm run build
npm run start               # serves on PORT (default 3000)
```

Then sign in at `/admin/login`.

- `npm run db:seed` reproduces the exact content that used to live in
  `data/*.ts`. It is safe to re-run (content with a slug is upserted).
- `npm run create-admin` creates or updates a login (re-run to reset a password).
  Add more users from **Admin → Users**.

## Deploying to Hostinger (Business plan — Node.js Apps + MySQL)

1. **Create the database** — hPanel → **Databases → Management**. Create a
   database and a user; note the name, user and password. On Hostinger the DB
   host is `localhost` and port `3306`.
2. **Create the Node.js app** — hPanel → **Websites → Add Website → Node.js App**
   (import the Git repo or upload the files). Pick a current Node.js LTS.
3. **Set environment variables** in the app's config: `DATABASE_URL`,
   `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (your domain), plus the Resend vars if used.
4. **Install & build**: run `npm install` then `npm run build` (the build runs
   `prisma generate` automatically).
5. **Apply the schema & seed** (one time, from the app's terminal/SSH):
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   npm run create-admin -- "Admin" admin@bojtechnologies.com "a-strong-password" ADMIN
   ```
6. **Start command**: `npm run start` (Next.js server). Point the app's
   startup/entry at this. The server reads `PORT` from the environment.

### Image uploads
The admin image picker uploads to `public/uploads/` and files are served from
there by `next start`. Ensure that directory is writable and persists across
restarts on the host. (You can always paste an image path/URL instead of
uploading.)

## Local development

```bash
cp .env.example .env         # fill in DATABASE_URL etc.
npx prisma migrate deploy    # or: npx prisma db push
npm run db:seed
npm run create-admin -- "Dev" dev@example.com "password123" ADMIN
npm run dev                  # http://localhost:3000  (admin at /admin)
```

Need a quick local MySQL? For example with Docker:
```bash
docker run --name bojmysql -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=bojtech -p 3306:3306 -d mysql:8
# DATABASE_URL="mysql://root:password@localhost:3306/bojtech"
```

## Schema changes later

Edit `prisma/schema.prisma`, then locally run
`npx prisma migrate dev --name <change>` to create a new migration, commit it,
and run `npx prisma migrate deploy` on the server.

## Notes
- `npm run build` is the correctness gate (type-checks + lints every route) and
  does **not** require a database connection — content pages are dynamic and
  only query MySQL at request time.
- Content taxonomies (solution status/accent, project categories, social icon
  keys) are defined in `types/content.ts`. Available icons are curated in
  `lib/icons.ts` — add an icon there to offer it in the admin icon picker.
