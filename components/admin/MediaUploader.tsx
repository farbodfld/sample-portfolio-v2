'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { FiUploadCloud } from 'react-icons/fi'

export default function MediaUploader() {
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File exceeds 5MB limit')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    const res = await fetch('/api/admin/media', {
      method: 'POST',
      body: formData,
    })

    setUploading(false)
    const result = await res.json()

    if (res.ok) {
      toast.success('File uploaded successfully!')
      router.refresh()
    } else {
      toast.error(result.error || 'Upload failed')
    }
  }

  return (
    <div className="mt-6 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg p-10 text-center transition-colors bg-gray-50 dark:bg-gray-900 cursor-pointer relative">
      <input 
        type="file" 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        accept=".jpg,.jpeg,.png,.webp,.pdf"
        disabled={uploading}
        onChange={handleUpload}
      />
      <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
        <FiUploadCloud className={`w-10 h-10 ${uploading ? 'text-blue-500 animate-pulse' : 'text-gray-400 dark:text-gray-500'}`} />
        <div>
          {uploading ? (
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Uploading...</p>
          ) : (
            <>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Click or drag and drop to upload</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">JPG, PNG, WEBP, or PDF up to 5MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
