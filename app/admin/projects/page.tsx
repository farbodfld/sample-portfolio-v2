import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ProjectsList from '@/components/admin/ProjectsList'
import { FiPlus } from 'react-icons/fi'

export const metadata = { title: 'Projects | Admin CMS' }
export const revalidate = 0

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white mb-1">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Manage your portfolio projects, case studies, and work examples.
          </p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <FiPlus className="mr-2" /> Add Project
        </Link>
      </div>

      <ProjectsList projects={projects || []} />
    </div>
  )
}
