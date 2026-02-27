import { Outlet, Navigate } from 'react-router'
import { Menu } from 'lucide-react'
import { AdminSidebar } from './AdminSidebar'
import { useAuthStore } from '@/store/authStore'
import { useUiStore } from '@/store/uiStore'

export function AdminLayout() {
  const { user, profile, loading } = useAuthStore()
  const { toggleSidebar } = useUiStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-maroon-50">
        <div className="animate-spin w-8 h-8 border-4 border-maroon-300 border-t-maroon-700 rounded-full" />
      </div>
    )
  }

  if (!user || profile?.role !== 'admin') {
    return <Navigate to="/dang-nhap" replace />
  }

  return (
    <div className="min-h-screen flex bg-maroon-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-maroon-200 flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-maroon-100 mr-3"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-maroon-700" />
          </button>
          <h1 className="text-lg font-semibold text-maroon-800">Quản trị</h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-maroon-600">{profile?.full_name ?? profile?.email}</span>
            <div className="w-8 h-8 bg-maroon-200 rounded-full flex items-center justify-center text-maroon-700 font-medium text-sm">
              {(profile?.full_name ?? 'A')[0].toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
