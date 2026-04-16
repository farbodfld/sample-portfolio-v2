'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { createExperience, updateExperience, deleteExperience } from '@/app/admin/experience/actions'
import type { Experience } from '@/lib/types'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function ExperienceManager({ initialData }: { initialData: Experience[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const editingItem = initialData.find(e => e.id === editingId)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      if (editingId) {
        const res = await updateExperience(editingId, formData)
        if (res.error) throw new Error(res.error)
        toast.success('Experience updated')
      } else {
        const res = await createExperience(formData)
        if (res.error) throw new Error(res.error)
        toast.success('Experience created')
      }
      
      setEditingId(null)
      e.currentTarget.reset()
      router.refresh()
    } catch (err: unknown) {
      toast.error((err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return
    
    try {
      const res = await deleteExperience(id)
      if (res.error) throw new Error(res.error)
      toast.success('Experience deleted')
      router.refresh()
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
          <h2 className="text-lg font-bold dark:text-white mb-4">
            {editingId ? 'Edit Experience' : 'Add New Experience'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company *</label>
              <input 
                type="text" 
                name="company" 
                key={editingItem?.id || 'new-company'}
                defaultValue={editingItem?.company || ''} 
                required 
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role *</label>
              <input 
                type="text" 
                name="role" 
                key={editingItem?.id || 'new-role'}
                defaultValue={editingItem?.role || ''} 
                required
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date *</label>
                <input 
                  type="text" 
                  name="start_date" 
                  key={editingItem?.id || 'new-start'}
                  defaultValue={editingItem?.start_date || ''} 
                  required
                  placeholder="e.g. 2020"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                <input 
                  type="text" 
                  name="end_date" 
                  key={editingItem?.id || 'new-end'}
                  defaultValue={editingItem?.end_date || ''} 
                  placeholder="e.g. Present"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea 
                name="description" 
                rows={4}
                key={editingItem?.id || 'new-desc'}
                defaultValue={editingItem?.description || ''} 
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
                placeholder="Details of your work..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort Order</label>
              <input 
                type="number" 
                name="sort_order" 
                key={editingItem?.id || 'new-sort'}
                defaultValue={editingItem?.sort_order || 0} 
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
              />
            </div>

            <div className="pt-4 flex gap-2">
              <button 
                type="submit" 
                disabled={saving}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
              >
                {saving ? 'Saving...' : (editingId ? 'Update' : 'Add')}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {initialData.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center text-gray-500 dark:text-gray-400">
            No experience entries added yet. Create one on the left.
          </div>
        ) : (
          initialData.map((exp) => (
            <div key={exp.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                  <span className="text-sm font-medium px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                    {exp.company}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {exp.start_date} — {exp.end_date || 'Present'}
                </div>
                {exp.description && (
                  <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap text-sm">
                    {exp.description}
                  </p>
                )}
                <div className="text-xs text-gray-400 dark:text-gray-500 pt-2">
                  Sort Order: {exp.sort_order}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingId(exp.id)}
                  className="px-3 py-1.5 flex items-center text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40"
                >
                  <FiEdit2 className="mr-1.5" /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(exp.id)}
                  className="px-3 py-1.5 flex items-center text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40"
                >
                  <FiTrash2 className="mr-1.5" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
