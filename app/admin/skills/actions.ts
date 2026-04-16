'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createSkill(formData: FormData) {
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    category: formData.get('category') as string || null,
    level: parseInt(formData.get('level') as string) || 0,
    visible: formData.get('visible') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }

  const { error } = await supabase.from('skills').insert([data])

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateSkill(id: string, formData: FormData) {
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    category: formData.get('category') as string || null,
    level: parseInt(formData.get('level') as string) || 0,
    visible: formData.get('visible') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('skills').update(data).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteSkill(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('skills').delete().eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function toggleSkillVisibility(id: string, visible: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('skills').update({ visible, updated_at: new Date().toISOString() }).eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}
