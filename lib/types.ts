export interface CTAButton {
  text: string
  link: string
}

export interface Profile {
  id: string
  full_name: string
  headline: string | null
  short_bio: string | null
  image_url: string | null
  ctas?: CTAButton[]
  updated_at: string
}

export type Project = {
  id: string
  title: string
  slug: string
  description: string | null
  content: string | null
  image_url: string | null
  github_url: string | null
  live_url: string | null
  tech_stack: string[] | null
  featured: boolean
  published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type Experience = {
  id: string
  company: string
  role: string
  start_date: string
  end_date: string | null
  description: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type Skill = {
  id: string
  name: string
  category: string | null
  level: number
  visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type SiteSettings = {
  id: string
  github_url: string | null
  linkedin_url: string | null
  email: string | null
  resume_url: string | null
  meta_title: string | null
  meta_description: string | null
  og_image_url: string | null
  created_at: string
  updated_at: string
}

export type MediaAsset = {
  id: string
  file_name: string
  file_url: string
  content_type: string | null
  size_bytes: number | null
  created_at: string
}
