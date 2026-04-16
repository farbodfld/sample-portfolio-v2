import Sidebar from '@/components/admin/Sidebar'

export const metadata = {
  title: 'Admin Dashboard | Portfolio CMS',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center overflow-y-auto w-full p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto h-full">
          {children}
        </div>
      </div>
    </div>
  )
}
