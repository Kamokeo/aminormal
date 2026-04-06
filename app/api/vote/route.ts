import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { question_id, option } = body

  if (!question_id || !['a', 'b'].includes(option)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { error } = await supabase.from('votes').insert({ question_id, option })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Return updated counts
  const { data: counts } = await supabase
    .from('vote_counts')
    .select('option, count')
    .eq('question_id', question_id)

  const result = { a: 0, b: 0 }
  for (const row of counts ?? []) {
    result[row.option as 'a' | 'b'] = row.count
  }

  return NextResponse.json(result)
}
