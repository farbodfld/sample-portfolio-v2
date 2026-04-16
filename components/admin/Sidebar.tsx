'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/admin/login/actions'
import { 
  FiHome, FiBriefcase, FiUser, FiStar, FiSettings, FiImage, FiLogOut 
} from 'react-icons/fi'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: FiHome },
  { href: '/admin/projects', label: 'Projects', icon: FiBriefcase },
  { href: '/admin/experience', label: 'Experience', icon: FiStar },
  { href: '/admin/skills', label: 'Skills', icon: FiStar },
  { href: '/admin/profile', label: 'Profile', icon: FiUser },
  { href: '/admin/settings', label: 'Settings', icon: FiSettings },
  { href: '/admin/media', label: 'Media', icon: FiImage },
]

export default function Sidebar() {
  const pathname = usePathname()

  if (pathname === '/admin/login') return null

  return (
    <div className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Portfolio CMS
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            const Icon = item.icon
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50 dark:bg-gray-700/50 dark:text-blue-400 border-r-4 border-blue-600' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-gray-200 dark:hover:bg-gray-700/30'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            <FiLogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}
