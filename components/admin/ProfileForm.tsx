'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { updateProfile } from '@/app/admin/profile/actions'
import type { Profile, CTAButton } from '@/lib/types'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

export default function ProfileForm({ profile }: { profile?: Profile }) {
  const [saving, setSaving] = useState(false)
  const [ctas, setCtas] = useState<CTAButton[]>(profile?.ctas || [])
  const router = useRouter()
  
  const addCta = () => {
    setCtas([...ctas, { text: '', link: '' }])
  }

  const removeCta = (index: number) => {
    setCtas(ctas.filter((_, i) => i !== index))
  }

  const updateCta = (index: number, field: keyof CTAButton, value: string) => {
    const newCtas = [...ctas]
    newCtas[index] = { ...newCtas[index], [field]: value }
    setCtas(newCtas)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    
    const formData = new FormData(e.currentTarget)
    // Add the stringified JSON array
    formData.set('ctas', JSON.stringify(ctas))
    
    try {
      const result = await updateProfile(formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Profile updated successfully!')
        router.refresh()
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <h2 className="text-lg font-semibold dark:text-white mb-4 border-b dark:border-gray-700 pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input 
                type="text" 
                name="full_name" 
                defaultValue={profile?.full_name} 
                required 
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Headline</label>
              <input 
                type="text" 
                name="headline" 
                defaultValue={profile?.headline || ''} 
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
                placeholder="e.g. Full Stack Developer"
              />
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Bio</label>
          <textarea 
            name="short_bio" 
            rows={4} 
            defaultValue={profile?.short_bio || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
            placeholder="Write a little bit about yourself..."
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
          <input 
            type="text" 
            name="image_url" 
            defaultValue={profile?.image_url || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
            placeholder="URL from Media library"
          />
        </div>
      </div>

      <div className="col-span-2">
        <div className="flex justify-between items-center mb-4 border-b dark:border-gray-700 pb-2">
          <h2 className="text-lg font-semibold dark:text-white">Call to Action Buttons</h2>
          <button 
            type="button" 
            onClick={addCta}
            className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors"
          >
            <FiPlus /> Add Button
          </button>
        </div>

        <div className="space-y-4">
          {ctas.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic py-4 text-center border-2 border-dashed dark:border-gray-700 rounded-lg">
              No buttons added. Click &quot;Add Button&quot; to create one.
            </p>
          )}
          
          {ctas.map((cta, index) => (
            <div key={index} className="flex items-end gap-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-700 group">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Button Text</label>
                  <input 
                    type="text" 
                    value={cta.text}
                    onChange={(e) => updateCta(index, 'text', e.target.value)}
                    required
                    placeholder="e.g. Contact Me"
                    className="w-full px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:text-white outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Button Link</label>
                  <input 
                    type="text" 
                    value={cta.link}
                    onChange={(e) => updateCta(index, 'link', e.target.value)}
                    required
                    placeholder="e.g. /contact or url"
                    className="w-full px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:text-white outline-none" 
                  />
                </div>
              </div>
              <button 
                type="button"
                onClick={() => removeCta(index)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                title="Remove Button"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        <button 
          type="submit" 
          disabled={saving}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:transform-none shadow-lg shadow-blue-500/20"
        >
          {saving ? 'Saving...' : 'Save Profile Changes'}
        </button>
      </div>
    </form>
  )
}
