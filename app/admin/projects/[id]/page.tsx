import { createClient } from '@/lib/supabase/server'
import ProjectForm from '@/components/admin/ProjectForm'
import { notFound } from 'next/navigation'

export const metadata = { title: 'Edit Project | Admin CMS' }
export const revalidate = 0

export default async function EditProjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!project) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-white mb-2">Edit Project: {project.title}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Update the details for this project.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <ProjectForm project={project} />
      </div>
    </div>
  )
}
