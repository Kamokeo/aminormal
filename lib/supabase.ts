import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Question = {
  id: string
  text: string
  option_a: string
  option_b: string
  category: string
  active: boolean
  created_at: string
}

export type Vote = {
  id: string
  question_id: string
  option: 'a' | 'b'
  created_at: string
}

export type VoteCount = {
  question_id: string
  option: 'a' | 'b'
  count: number
}
