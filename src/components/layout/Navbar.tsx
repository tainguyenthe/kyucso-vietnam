import { Link, useLocation } from 'react-router'
import { Menu, X, Search, User, LogOut, KeyRound, LayoutDashboard, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { APP_NAME, ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import logoVn from '@/assets/logo-vn.jpg'

const navLinks = [
  { to: ROUTES.HOME, label: 'Trang chủ' },
  { to: ROUTES.SEARCH, label: 'Tra cứu' },
  { to: ROUTES.BATTLEFIELDS, label: 'Không gian 3D' },
  { to: ROUTES.MEMORIES, label: 'Chia sẻ ký ức' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { user, profile, signOut } = useAuthStore()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setProfileOpen(false)
  }, [location.pathname])

  return (
    <nav className="bg-maroon-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoVn} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
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
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-maroon-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', profileOpen && 'rotate-180')} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-maroon-200 shadow-lg py-2 z-50">
                    {/* User info */}
                    <div className="px-4 py-2 border-b border-maroon-100">
                      <p className="text-sm font-medium text-maroon-800 truncate">{profile?.full_name ?? 'Người dùng'}</p>
                      <p className="text-xs text-maroon-500 truncate">{user.email}</p>
                    </div>

                    {profile?.role === 'admin' && (
                      <Link
                        to={ROUTES.ADMIN}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-maroon-700 hover:bg-maroon-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Quản trị
                      </Link>
                    )}
                    <Link
                      to={ROUTES.CHANGE_PASSWORD}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-maroon-700 hover:bg-maroon-50 transition-colors"
                    >
                      <KeyRound className="w-4 h-4" />
                      Đổi mật khẩu
                    </Link>
                    <div className="border-t border-maroon-100 mt-1 pt-1">
                      <button
                        onClick={() => { setProfileOpen(false); signOut() }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
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
            {user && (
              <>
                <div className="border-t border-maroon-600 my-2" />
                {profile?.role === 'admin' && (
                  <Link
                    to={ROUTES.ADMIN}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-maroon-100 hover:bg-maroon-700 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Quản trị
                  </Link>
                )}
                <Link
                  to={ROUTES.CHANGE_PASSWORD}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-maroon-100 hover:bg-maroon-700 transition-colors"
                >
                  <KeyRound className="w-4 h-4" />
                  Đổi mật khẩu
                </Link>
                <button
                  onClick={() => { setMobileOpen(false); signOut() }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-maroon-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
