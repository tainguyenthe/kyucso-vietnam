import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuthStore } from '@/store/authStore'
import { ROUTES, APP_NAME } from '@/lib/constants'
import toast from 'react-hot-toast'
import logoVn from '@/assets/logo-vn.jpg'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.HOME

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn(email, password)
      toast.success('Đăng nhập thành công!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoVn} alt="Logo" className="w-16 h-16 mx-auto mb-4 rounded-full object-cover" />
          <h1 className="font-serif text-2xl font-bold text-maroon-800">{APP_NAME}</h1>
          <p className="mt-1 text-maroon-600">Đăng nhập tài khoản</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-maroon-200 p-6 shadow-sm space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-maroon-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 text-maroon-900 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-maroon-700 mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 text-maroon-900 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-maroon-700 text-white rounded-lg font-medium hover:bg-maroon-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-maroon-600">
          Chưa có tài khoản?{' '}
          <Link to={ROUTES.REGISTER} className="text-maroon-700 font-semibold hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
