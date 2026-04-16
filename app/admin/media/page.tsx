import { createClient } from '@/lib/supabase/server'
import MediaUploader from '@/components/admin/MediaUploader'
import MediaItem from '@/components/admin/MediaItem'

export const metadata = { title: 'Media | Admin CMS' }

export const revalidate = 0 // Opt out of static caching

export default async function MediaPage() {
  const supabase = await createClient()

  const { data: mediaFiles } = await supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Media Library</h1>
      </div>

      <MediaUploader />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {mediaFiles?.map((file) => (
          <MediaItem key={file.id} file={file as { id: string, file_name: string, file_url: string, content_type: string | null }} />
        ))}
      </div>
    </div>
  )
}
