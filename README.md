# Learnify — Neural Campus Dashboard

A futuristic dark-mode student learning dashboard built with TanStack Start, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, and Supabase.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase values:

```bash
cp .env.example .env.local
```

Then set:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_anon_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_anon_key
```

Keep `.env.local` and `.env` out of source control. The repo is configured with a `.gitignore` entry for local env files.

## Deployment

This repo can be deployed on Vercel. Recommended steps:

1. Create a public GitHub repository and push this project.
2. Sign in to Vercel and connect the repository.
3. In Vercel Dashboard, add the same env vars from `.env.example` to the project settings:
   - `SUPABASE_URL`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Set the build command to:

```bash
npm run build
```

5. Set the output directory if prompted to `dist`.

6. Deploy.

If the project requires a server-side runtime on Vercel, Vercel should detect the Nitro build and deploy it as a Node environment.

## Supabase setup

Run this SQL in the Supabase SQL editor:

```sql
create table courses (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  description      text not null,
  category         text not null,
  difficulty       text not null,
  duration_minutes integer not null,
  progress         integer not null default 0,
  lessons_total    integer not null,
  lessons_completed integer not null default 0,
  instructor       text not null,
  color_accent     text not null default 'cyan',
  icon_name        text not null,
  created_at       timestamp default now()
);

insert into courses (title, description, category, difficulty, duration_minutes, progress, lessons_total, lessons_completed, instructor, color_accent, icon_name) values
  ('Advanced React Patterns', 'Compound components, render props, and modern composition patterns.', 'Frontend', 'Advanced', 480, 75, 24, 18, 'Aisha Patel', 'cyan', 'Code2'),
  ('System Design Fundamentals', 'Scalable systems, load balancing, caching, and distributed architecture.', 'Backend', 'Intermediate', 600, 40, 30, 12, 'Marcus Lee', 'violet', 'Database'),
  ('TypeScript Deep Dive', 'Advanced types, generics, mapped types, and type-level programming.', 'Language', 'Advanced', 360, 90, 18, 16, 'Jordan Wu', 'emerald', 'FileCode'),
  ('Node.js Internals', 'The event loop, libuv, streams, and performance optimisation.', 'Backend', 'Advanced', 420, 25, 20, 5, 'Priya Sharma', 'amber', 'Server');
```

## Architecture

**Routing** — TanStack Router with file-based routes under `src/routes/`. Each route uses a self-contained page component for easy navigation and metadata management.

**Server/client split** —
- `src/routes/*` contains client-rendered pages and UI state.
- `src/lib/courses.functions.ts` contains `createServerFn` server functions that fetch data from Supabase on the server.
- `src/integrations/supabase/client.ts` abstracts Supabase client creation for browser runtime while falling back to server env vars for SSR.

This split keeps API keys off the browser and ensures data fetching is done server-side, while the client can still use React Query for caching and suspense-aware rendering.

**Component split** — `src/components/learnify/` holds the app-specific dashboard and course components. `src/components/ui/` contains reusable UI primitives and Radix-based design system building blocks.

**Animations** — Framer Motion brings subtle motion to the dashboard: hover lifts on cards, entrance transitions on page load, and smooth progress bar animations.

**Deployment considerations** — The project uses `@lovable.dev/vite-tanstack-config` and Nitro server output, so Vercel should deploy it as a Node-capable app if the repository is connected correctly. Local env files are ignored, and the required variables are documented in `.env.example`.

**Challenges**
- Supabase host resolution must be valid; malformed or placeholder URLs caused `ENOTFOUND` errors.
- The app uses server-sided TanStack Start functions, so environment variables must be provided to both build/runtime and the Vite client via `VITE_` prefixed keys.

**Pages**
- `/` — Dashboard overview with hero, stats, courses, activity
- `/courses` — Full course catalogue with search
- `/activity` — Learning activity heatmap and session history
- `/achievements` — Badge collection and XP progress
- `/schedule` — Weekly calendar and upcoming sessions
- `/mentors` — Book 1-on-1 sessions with expert mentors
- `/settings` — Profile, notifications, and preferences
