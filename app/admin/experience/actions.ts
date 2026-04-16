'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createExperience(formData: FormData) {
  const supabase = await createClient()

  const data = {
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string || null,
    description: formData.get('description') as string || null,
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }

  const { error } = await supabase.from('experiences').insert([data])

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateExperience(id: string, formData: FormData) {
  const supabase = await createClient()

  const data = {
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string || null,
    description: formData.get('description') as string || null,
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('experiences').update(data).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteExperience(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('experiences').delete().eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}
