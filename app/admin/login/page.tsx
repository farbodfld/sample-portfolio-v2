import LoginForm from '@/components/admin/LoginForm'

export const metadata = {
  title: 'Admin Login | Portfolio CMS',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-1">
              Admin Login
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in to manage your portfolio
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
