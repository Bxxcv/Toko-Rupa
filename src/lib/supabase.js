import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseReady = Boolean(url && anonKey && !url.includes('PROJECT_ID'))
export const supabase = isSupabaseReady ? createClient(url, anonKey) : null
