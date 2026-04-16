import { createClient } from '@/lib/supabase/server'
import SettingsForm from '@/components/admin/SettingsForm'

export const metadata = { title: 'Settings | Admin CMS' }
export const revalidate = 0

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold dark:text-white mb-2">Site Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your social links, and SEO metadata.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <SettingsForm settings={settings || undefined} />
      </div>
    </div>
  )
}
