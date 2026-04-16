'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { createSkill, updateSkill, deleteSkill, toggleSkillVisibility } from '@/app/admin/skills/actions'
import type { Skill } from '@/lib/types'
import { FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi'

export default function SkillsManager({ initialSkills }: { initialSkills: Skill[] }) {

  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const editingSkill = initialSkills.find(s => s.id === editingId)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      if (editingId) {
        const res = await updateSkill(editingId, formData)
        if (res.error) throw new Error(res.error)
        toast.success('Skill updated')
      } else {
        const res = await createSkill(formData)
        if (res.error) throw new Error(res.error)
        toast.success('Skill created')
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
    if (!confirm('Are you sure you want to delete this skill?')) return
    
    try {
      const res = await deleteSkill(id)
      if (res.error) throw new Error(res.error)
      toast.success('Skill deleted')
      router.refresh()
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }

  const handleToggle = async (id: string, currentVisible: boolean) => {
    try {
      const res = await toggleSkillVisibility(id, !currentVisible)
      if (res.error) throw new Error(res.error)
      toast.success(currentVisible ? 'Skill hidden' : 'Skill visible')
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
            {editingId ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
              <input 
                type="text" 
                name="name" 
                key={editingSkill?.id || 'new-name'}
                defaultValue={editingSkill?.name || ''} 
                required 
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <input 
                type="text" 
                name="category" 
                key={editingSkill?.id || 'new-cat'}
                defaultValue={editingSkill?.category || ''} 
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
                placeholder="e.g. Frontend"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level (1-100)</label>
                <input 
                  type="number" 
                  name="level" 
                  min="0" max="100"
                  key={editingSkill?.id || 'new-level'}
                  defaultValue={editingSkill?.level || 0} 
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort Order</label>
                <input 
                  type="number" 
                  name="sort_order" 
                  key={editingSkill?.id || 'new-sort'}
                  defaultValue={editingSkill?.sort_order || 0} 
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none" 
                />
              </div>
            </div>

            <div className="flex items-center mt-2">
              <input 
                type="checkbox" 
                name="visible" 
                id="visible"
                key={editingSkill?.id || 'new-vis'}
                defaultChecked={editingSkill ? editingSkill.visible : true} 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="visible" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Visible to public
              </label>
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Skill</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level & Order</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {initialSkills.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                      No skills added yet. Create one on the left.
                    </td>
                  </tr>
                ) : (
                  initialSkills.map((skill) => (
                    <tr key={skill.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-2.5 w-2.5 rounded-full mr-2 ${skill.visible ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {skill.category || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        Level: {skill.level} | Order: {skill.sort_order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => handleToggle(skill.id, skill.visible)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            title="Toggle Visibility"
                          >
                            {skill.visible ? <FiEye /> : <FiEyeOff />}
                          </button>
                          <button 
                            onClick={() => setEditingId(skill.id)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            onClick={() => handleDelete(skill.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
