import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Simple public client without cookies to allow static rendering and fast ISR
export const supabasePublic = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getProfile() {
  const { data } = await supabasePublic.from('profiles').select('*').limit(1)
  return data?.[0] || null
}

export async function getProjects() {
  const { data } = await supabasePublic
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  return data || []
}

export async function getFeaturedProjects() {
  const { data } = await supabasePublic
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  return data || []
}

export async function getExperiences() {
  const { data } = await supabasePublic
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  return data || []
}

export async function getSkills() {
  const { data } = await supabasePublic
    .from('skills')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  return data || []
}

export async function getSiteSettings() {
  const { data } = await supabasePublic.from('site_settings').select('*').limit(1)
  return data?.[0] || null
}
