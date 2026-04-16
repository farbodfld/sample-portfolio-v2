'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateSettings(formData: FormData) {
  const supabase = await createClient()

  const data = {
    github_url: formData.get('github_url') as string || null,
    linkedin_url: formData.get('linkedin_url') as string || null,
    email: formData.get('email') as string || null,
    resume_url: formData.get('resume_url') as string,
    meta_title: formData.get('meta_title') as string,
    meta_description: formData.get('meta_description') as string,
    og_image_url: formData.get('og_image_url') as string,
    updated_at: new Date().toISOString(),
  }

  const { data: existing } = await supabase.from('site_settings').select('id').limit(1).single()

  let error
  if (existing?.id) {
    const { error: updateError } = await supabase.from('site_settings').update(data).eq('id', existing.id)
    error = updateError
  } else {
    const { error: insertError } = await supabase.from('site_settings').insert([data])
    error = insertError
  }

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
