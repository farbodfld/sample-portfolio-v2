'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  const techStackString = formData.get('tech_stack') as string
  const techStackArray = techStackString ? techStackString.split(',').map((s: string) => s.trim()).filter(Boolean) : []

  let slug = formData.get('slug') as string
  if (!slug) slug = (formData.get('title') as string).toLowerCase().replace(/\s+/g, '-')

  const data = {
    title: formData.get('title') as string,
    slug,
    description: formData.get('description') as string || null,
    content: formData.get('content') as string || null,
    image_url: formData.get('image_url') as string || null,
    github_url: formData.get('github_url') as string || null,
    live_url: formData.get('live_url') as string || null,
    tech_stack: techStackArray,
    featured: formData.get('featured') === 'on',
    published: formData.get('published') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }

  const { error } = await supabase.from('projects').insert([data])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()

  const techStackString = formData.get('tech_stack') as string
  const techStackArray = techStackString ? techStackString.split(',').map((s: string) => s.trim()).filter(Boolean) : []

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string || null,
    content: formData.get('content') as string || null,
    image_url: formData.get('image_url') as string || null,
    github_url: formData.get('github_url') as string || null,
    live_url: formData.get('live_url') as string || null,
    tech_stack: techStackArray,
    featured: formData.get('featured') === 'on',
    published: formData.get('published') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('projects').update(data).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function toggleProjectFlag(id: string, field: 'featured' | 'published', value: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').update({ [field]: value, updated_at: new Date().toISOString() }).eq('id', id)
  
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}
