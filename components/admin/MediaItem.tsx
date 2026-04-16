/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

interface MediaFile {
  id: string
  file_name: string
  file_url: string
  content_type: string | null
}

export default function MediaItem({ file }: { file: MediaFile }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(file.file_url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg overflow-hidden flex flex-col group relative">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 p-2 flex items-center justify-center relative">
        {file.content_type?.includes('image') ? (
          <img 
            src={file.file_url} 
            alt={file.file_name} 
            className="object-cover w-full h-full rounded" 
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 font-bold">PDF</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Document</span>
          </div>
        )}
        
        {/* Overlay copy button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={copyToClipboard}
            className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform"
          >
            {copied ? (
              <>
                <FiCheck className="text-green-600" /> Copied!
              </>
            ) : (
              <>
                <FiCopy /> Copy URL
              </>
            )
            }
          </button>
        </div>
      </div>
      <div className="p-3 bg-white dark:bg-gray-800 text-xs flex-1 truncate dark:text-gray-200 border-t dark:border-gray-700">
        {file.file_name}
      </div>
    </div>
  )
}
