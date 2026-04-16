'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { createProject, updateProject } from '@/app/admin/projects/actions'
import type { Project } from '@/lib/types'
import Link from 'next/link'

export default function ProjectForm({ project }: { project?: Project }) {
  const isEditing = !!project
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      if (isEditing) {
        const result = await updateProject(project.id, formData)
        if (result?.error) throw new Error(result.error)
        toast.success('Project updated!')
      } else {
        const result = await createProject(formData)
        if (result?.error) throw new Error(result.error)
        toast.success('Project created!')
      }
      router.push('/admin/projects')
      router.refresh()
    } catch (err: unknown) {
      toast.error((err as Error).message || 'Operation failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title *</label>
          <input 
            type="text" 
            name="title" 
            defaultValue={project?.title || ''} 
            required 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white" 
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug *</label>
          <input 
            type="text" 
            name="slug" 
            defaultValue={project?.slug || ''} 
            required 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white" 
            placeholder="my-awesome-project"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
          <textarea 
            name="description" 
            rows={2} 
            defaultValue={project?.description || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white" 
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Content</label>
          <textarea 
            name="content" 
            rows={8} 
            defaultValue={project?.content || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white font-mono text-sm" 
            placeholder="Markdown supported..."
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Image URL</label>
          <input 
            type="text" 
            name="image_url" 
            defaultValue={project?.image_url || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white" 
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tech Stack (comma separated)</label>
          <input 
            type="text" 
            name="tech_stack" 
            defaultValue={project?.tech_stack?.join(', ') || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white" 
            placeholder="React, Next.js, Tailwind"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
          <input 
            type="url" 
            name="github_url" 
            defaultValue={project?.github_url || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white" 
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live Demo URL</label>
          <input 
            type="url" 
            name="live_url" 
            defaultValue={project?.live_url || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white" 
          />
        </div>

        <div className="col-span-2 flex flex-wrap items-center gap-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="published" 
              id="published"
              defaultChecked={project ? project.published : true} 
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
              Published
            </label>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="featured" 
              id="featured"
              defaultChecked={project ? project.featured : false} 
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
              Featured on Home
            </label>
          </div>

          <div className="flex items-center ml-auto">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Sort Order:</label>
            <input 
              type="number" 
              name="sort_order" 
              defaultValue={project?.sort_order || 0} 
              className="w-20 px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:text-white text-sm" 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link 
          href="/admin/projects"
          className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-lg font-medium transition-colors"
        >
          Cancel
        </Link>
        <button 
          type="submit" 
          disabled={saving}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
        >
          {saving ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
        </button>
      </div>
    </form>
  )
}
