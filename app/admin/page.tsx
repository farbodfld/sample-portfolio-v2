import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FiBriefcase, FiStar, FiFileText, FiImage } from 'react-icons/fi'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: projectsCount },
    { count: skillsCount },
    { count: expCount },
    { count: mediaCount }
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('skills').select('*', { count: 'exact', head: true }),
    supabase.from('experiences').select('*', { count: 'exact', head: true }),
    supabase.from('media_assets').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Projects', value: projectsCount || 0, icon: FiBriefcase, href: '/admin/projects', color: 'bg-blue-500' },
    { label: 'Skills', value: skillsCount || 0, icon: FiStar, href: '/admin/skills', color: 'bg-purple-500' },
    { label: 'Experiences', value: expCount || 0, icon: FiFileText, href: '/admin/experience', color: 'bg-green-500' },
    { label: 'Media Assets', value: mediaCount || 0, icon: FiImage, href: '/admin/media', color: 'bg-pink-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <Link 
          href="/" 
          target="_blank"
          className="text-sm px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          View Live Site ↗
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link 
              key={stat.label} 
              href={stat.href}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all block group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>Manage {stat.label.toLowerCase()}</span>
                <span className="ml-2">→</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/projects/new" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition text-sm">
            Add New Project
          </Link>
          <Link href="/admin/profile" className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition text-sm">
            Update Profile
          </Link>
          <Link href="/admin/settings" className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition text-sm">
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  )
}
