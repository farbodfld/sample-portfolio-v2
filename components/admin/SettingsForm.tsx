'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { updateSettings } from '@/app/admin/settings/actions'
import type { SiteSettings } from '@/lib/types'

export default function SettingsForm({ settings }: { settings?: SiteSettings }) {
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await updateSettings(formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Settings updated successfully!')
        router.refresh()
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || 'Failed to update settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <input 
            type="email" 
            name="email" 
            defaultValue={settings?.email || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
            placeholder="hello@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resume URL</label>
          <input 
            type="text" 
            name="resume_url" 
            defaultValue={settings?.resume_url || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
            placeholder="URL to PDF"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
          <input 
            type="url" 
            name="github_url" 
            defaultValue={settings?.github_url || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
          <input 
            type="url" 
            name="linkedin_url" 
            defaultValue={settings?.linkedin_url || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div className="col-span-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO Metadata</h3>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Meta Title</label>
          <input 
            type="text" 
            name="meta_title" 
            defaultValue={settings?.meta_title || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
            placeholder="My Portfolio"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description (SEO)</label>
          <textarea 
            name="meta_description" 
            rows={3} 
            defaultValue={settings?.meta_description || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
            placeholder="A short description of your site for search engines..."
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Social Preview Image (OG Image) URL</label>
          <input 
            type="text" 
            name="og_image_url" 
            defaultValue={settings?.og_image_url || ''} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-colors" 
            placeholder="URL from Media library (Recommended: 1200x630)"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            This image appears when you share your link on LinkedIn, Twitter, etc.
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          type="submit" 
          disabled={saving}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 shadow-sm"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  )
}
