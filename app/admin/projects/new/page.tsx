import ProjectForm from '@/components/admin/ProjectForm'

export const metadata = { title: 'New Project | Admin CMS' }

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-white mb-2">Create New Project</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Add a new project to your portfolio. Fill in the details below.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <ProjectForm />
      </div>
    </div>
  )
}
