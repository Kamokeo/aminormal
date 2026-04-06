# Am I Normal?

A viral, production-ready web app. Anonymous questions, honest percentages, no judgment.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Open your Supabase project dashboard at https://supabase.com/dashboard
2. Go to **SQL Editor**
3. Paste and run the full contents of `supabase/seed.sql`

This creates the `questions`, `votes`, and `vote_counts` tables with RLS policies and seeds all 60 questions across 7 categories.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npx vercel
```

Set the same environment variables from `.env.local` in the Vercel dashboard.

## Tech stack

- Next.js 16 (App Router, TypeScript)
- Supabase (Postgres + Realtime)
- Tailwind CSS v4
- Geist font
