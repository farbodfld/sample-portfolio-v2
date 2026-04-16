import { createClient } from '@/lib/supabase/server'
import ExperienceManager from '@/components/admin/ExperienceManager'

export const metadata = { title: 'Experience | Admin CMS' }
export const revalidate = 0

export default async function ExperiencePage() {
  const supabase = await createClient()

  const { data: experiences } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-white mb-2">Manage Experience</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Add, edit, and organize your work history and career timeline.
        </p>
      </div>

      <ExperienceManager initialData={experiences || []} />
    </div>
  )
}
