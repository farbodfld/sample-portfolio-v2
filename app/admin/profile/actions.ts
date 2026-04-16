'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const data = {
    full_name: formData.get('full_name') as string,
    headline: formData.get('headline') as string,
    short_bio: formData.get('short_bio') as string,
    image_url: formData.get('image_url') as string,
    ctas: JSON.parse(formData.get('ctas') as string || '[]'),
    updated_at: new Date().toISOString(),
  }

  const { data: existing } = await supabase.from('profiles').select('id').limit(1).single()

  let error
  if (existing?.id) {
    const { error: updateError } = await supabase.from('profiles').update(data).eq('id', existing.id)
    error = updateError
  } else {
    const { error: insertError } = await supabase.from('profiles').insert([data])
    error = insertError
  }

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
