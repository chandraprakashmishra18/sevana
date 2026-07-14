# Sevana Backend — Animal Rescue Module

Node.js + Express + PostgreSQL backend for the Animal Rescue module. Built to
directly power the existing React screens: `HomeScreen`, `ReportScreen`,
`RescueFeed`, `VetFinder`, `ProfileScreen`.

## Setup

```bash
cd sevana-backend
cp .env.example .env        # fill in JWT_SECRET and Cloudinary keys
npm install

# Option A: run Postgres via Docker
docker-compose up -d postgres

# Option B: point DATABASE_URL in .env at your own Postgres instance

npm run migrate             # applies src/db/schema.sql
npm run dev                 # starts on http://localhost:5000
```

`GET /health` should return `{ "status": "ok" }` once it's running.

## Why these choices

- **Plain lat/lng + `earthdistance`/`cube` extensions** instead of full PostGIS —
  cheap "nearby" radius queries without extra infra, matches the lean Year-1
  budget in the proposal.
- **XP is server-authoritative** (`src/utils/xp.js`). The frontend's current
  `awardXP()` in `App.jsx` is a local `useState` bump — fine for a mockup, but
  once this backend is wired in, XP must come from API responses only, or
  anyone can inflate their own score from devtools.
- **`rescue_responses` table** separates "who raised their hand on a specific
  report" from the general `raise_hand_alerts` (the standalone "Alert nearby"
  quick action on Home). Both exist because they answer different questions.
- **Reports feed defaults to hiding `closed` status** — keeps `RescueFeed`
  and the "Active Near You" list from cluttering with resolved cases unless
  explicitly requested.

## API reference

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | — | create account |
| POST | `/api/auth/login` | — | returns JWT |
| GET | `/api/auth/me` | ✓ | current user |
| POST | `/api/animals` | ✓ | submit a report (+50 XP) |
| GET | `/api/animals?lat&lng&radius&severity&status` | — | feed / nearby list |
| GET | `/api/animals/:id` | — | single report |
| PATCH | `/api/animals/:id/status` | ✓ | move through lifecycle; `rescued` pays out XP to all responders |
| POST | `/api/animals/:id/respond` | ✓ | "Raise Hand" on a report (+30 XP), auto-acknowledges |
| GET | `/api/vets?lat&lng&radius&service` | — | VetFinder listing |
| POST | `/api/lost-found` | ✓ | create lost/found post |
| GET | `/api/lost-found?post_type&status` | — | list posts |
| PATCH | `/api/lost-found/:id/resolve` | ✓ | mark resolved (+40 XP) |
| POST | `/api/raise-hand` | ✓ | general area alert |
| GET | `/api/raise-hand/nearby?lat&lng` | — | alerts near a point |
| POST | `/api/uploads` | ✓ | multipart `photo` field → Cloudinary URL |
| GET | `/api/users/me/stats?lat&lng` | ✓ | Home screen's 3 stat tiles |

## Report status lifecycle

```
reported → acknowledged → in_progress → rescued → closed
```

`acknowledged` is set automatically the moment someone responds. Moving to
`rescued` pays XP to every volunteer who responded — not just the reporter.

## Not yet built (flag for next module pass)

- Push notifications for new critical reports near a user
- Rate limiting on report creation (prevent spam)
- Photo moderation before a report goes public
- Refresh tokens (current JWT is long-lived, no rotation)
