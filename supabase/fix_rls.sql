-- Patch for existing Supabase projects.
-- The original seed.sql was missing a SELECT policy on votes,
-- which caused direct COUNT(*) queries to return 0 for the anon role.
-- Run this once in the Supabase SQL editor.

drop policy if exists "public read votes" on votes;

create policy "public read votes" on votes
  for select using (true);
