import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const excludeParam = searchParams.get('exclude')
  const excludeIds = excludeParam ? excludeParam.split(',').filter(Boolean) : []

  let query = supabase.from('questions').select('*').eq('active', true)

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  if (excludeIds.length > 0) {
    query = query.not('id', 'in', `(${excludeIds.join(',')})`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Shuffle and return up to 10
  const shuffled = (data ?? []).sort(() => Math.random() - 0.5).slice(0, 10)
  return NextResponse.json(shuffled)
}
