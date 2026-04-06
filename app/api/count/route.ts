import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

export async function GET() {
  // Direct SELECT COUNT(*) on the votes table returns 0 because RLS has no SELECT
  // policy for the anon role (only INSERT). The vote_counts view is owned by the
  // postgres superuser and bypasses RLS, so we sum its counts instead.
  const { data, error } = await supabase
    .from('vote_counts')
    .select('count')

  if (error) {
    console.error('[api/count] vote_counts query error:', error.message, error.code)
    return NextResponse.json({ count: 0 })
  }

  const total = (data ?? []).reduce(
    (sum: number, row: { count: number | string }) => sum + Number(row.count),
    0
  )

  return NextResponse.json({ count: total })
}
