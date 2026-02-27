import { Link, useLocation } from 'react-router'
import { Menu, X, Search, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { APP_NAME, ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: ROUTES.HOME, label: 'Trang chủ' },
  { to: ROUTES.SEARCH, label: 'Tra cứu' },
  { to: ROUTES.BATTLEFIELDS, label: 'Không gian 3D' },
  { to: ROUTES.MEMORIES, label: 'Chia sẻ ký ức' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { user, profile, signOut } = useAuthStore()

  return (
    <nav className="bg-maroon-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-maroon-900 font-bold text-lg">
              VN
            </div>
            <span className="font-serif text-xl font-bold hidden sm:block">{APP_NAME}</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.to
                    ? 'bg-maroon-800 text-gold-300'
                    : 'text-maroon-100 hover:bg-maroon-600 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.SEARCH}
              className="p-2 rounded-lg hover:bg-maroon-600 transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" />
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                {profile?.role === 'admin' && (
                  <Link
                    to={ROUTES.ADMIN}
                    className="text-sm px-3 py-1.5 bg-gold-400 text-maroon-900 rounded-lg font-medium hover:bg-gold-300 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <Link to={ROUTES.ADMIN} className="p-2 rounded-lg hover:bg-maroon-600 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 rounded-lg hover:bg-maroon-600 transition-colors"
                  aria-label="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="text-sm px-4 py-2 bg-gold-400 text-maroon-900 rounded-lg font-medium hover:bg-gold-300 transition-colors"
              >
                Đăng nhập
              </Link>
            )}

            <button
              className="md:hidden p-2 rounded-lg hover:bg-maroon-600 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-maroon-800 border-t border-maroon-600">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.to
                    ? 'bg-maroon-900 text-gold-300'
                    : 'text-maroon-100 hover:bg-maroon-700'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
