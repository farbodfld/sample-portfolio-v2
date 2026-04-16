import { createClient } from '@/lib/supabase/server'
import SkillsManager from '@/components/admin/SkillsManager'

export const metadata = { title: 'Skills | Admin CMS' }
export const revalidate = 0

export default async function SkillsPage() {
  const supabase = await createClient()

  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-white mb-2">Manage Skills</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Add, edit, and organize your technical skills.
        </p>
      </div>

      <SkillsManager initialSkills={skills || []} />
    </div>
  )
}
