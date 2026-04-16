import { createClient } from '@/lib/supabase/server'
import ProfileForm from '@/components/admin/ProfileForm'

export const metadata = { title: 'Profile | Admin CMS' }
export const revalidate = 0

export default async function ProfilePage() {
  const supabase = await createClient()

  // Gracefully handle empty table (avoid .single() throwing PGRST116 if empty)
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)

  const profile = profiles?.[0] || undefined

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-white mb-2">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your personal details, biography, and hero section content.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}
