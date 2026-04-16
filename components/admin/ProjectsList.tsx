/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { deleteProject, toggleProjectFlag } from '@/app/admin/projects/actions'
import type { Project } from '@/lib/types'
import { FiEdit2, FiTrash2, FiExternalLink, FiStar } from 'react-icons/fi'

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const router = useRouter()

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return
    
    try {
      const res = await deleteProject(id)
      if (res?.error) throw new Error(res.error)
      toast.success('Project deleted')
      router.refresh()
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }

  const handleToggle = async (id: string, field: 'featured' | 'published', currentValue: boolean) => {
    try {
      const res = await toggleProjectFlag(id, field, !currentValue)
      if (res?.error) throw new Error(res.error)
      toast.success(`Project ${!currentValue ? field : `un-${field}`}`)
      router.refresh()
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiStar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Get started by creating your first portfolio project.</p>
        <Link 
          href="/admin/projects/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          Add New Project
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Featured</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {project.image_url ? (
                      <div className="flex-shrink-0 h-12 w-16 relative rounded overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <img src={project.image_url} alt="" className="object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 h-12 w-16 rounded bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-400 text-xs font-medium">
                        No Img
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-2">
                        /{project.slug}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600 flex items-center gap-1" title="View Live">
                            <FiExternalLink />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleToggle(project.id, 'published', project.published)}
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer transition-colors ${
                      project.published 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 hover:bg-yellow-200'
                    }`}
                  >
                    {project.published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button 
                    onClick={() => handleToggle(project.id, 'featured', project.featured)}
                    className={`p-1.5 rounded-full inline-flex transition-colors ${
                      project.featured
                        ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                    }`}
                    title={project.featured ? "Remove from featured" : "Feature on home"}
                  >
                    <FiStar className={project.featured ? "fill-current" : ""} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-3">
                    <Link 
                      href={`/admin/projects/${project.id}`}
                      className="px-3 py-1.5 flex items-center text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40"
                    >
                      <FiEdit2 className="mr-1.5" /> Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(project.id, project.title)}
                      className="px-3 py-1.5 flex items-center text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40"
                    >
                      <FiTrash2 className="mr-1.5" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
