import { Link, useLocation } from 'react-router'
import { Users, BookOpen, Map, Shield, Home, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES, APP_NAME } from '@/lib/constants'
import { useUiStore } from '@/store/uiStore'
import logoVn from '@/assets/logo-vn.jpg'

const sidebarLinks = [
  { to: ROUTES.ADMIN, label: 'Tổng quan', icon: Home },
  { to: ROUTES.ADMIN_HEROES, label: 'Anh hùng - Liệt sĩ', icon: Shield },
  { to: ROUTES.ADMIN_STORIES, label: 'Ký ức', icon: BookOpen },
  { to: ROUTES.ADMIN_BATTLEFIELDS, label: 'Chiến trường', icon: Map },
  { to: ROUTES.ADMIN_USERS, label: 'Người dùng', icon: Users },
]

export function AdminSidebar() {
  const location = useLocation()
  const { sidebarOpen, toggleSidebar } = useUiStore()

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleSidebar} />
      )}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-maroon-900 text-white transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-maroon-800">
          <Link to={ROUTES.ADMIN} className="flex items-center gap-2">
            <img src={logoVn} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-serif font-bold text-sm">{APP_NAME}</span>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden p-1 hover:bg-maroon-800 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to ||
                (link.to !== ROUTES.ADMIN && location.pathname.startsWith(link.to))
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => useUiStore.getState().setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-maroon-700 text-gold-300'
                      : 'text-maroon-300 hover:bg-maroon-800 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-maroon-800">
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-2 text-sm text-maroon-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Về trang chủ
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
