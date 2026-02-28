import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { useAuthStore } from '@/store/authStore'
import { ROUTES, APP_NAME } from '@/lib/constants'
import toast from 'react-hot-toast'
import logoVn from '@/assets/logo-vn.jpg'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { resetPassword } = useAuthStore()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
      toast.success('Vui lòng kiểm tra email để đặt lại mật khẩu')
    } catch (err) {
      const message = err instanceof Error ? err.message : ''
      if (message.includes('email_send_rate_limit') || message.includes('rate_limit')) {
        toast.error('Vui lòng đợi một phút trước khi gửi lại')
      } else {
        toast.error(message || 'Gửi yêu cầu thất bại')
      }
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
          <p className="mt-1 text-maroon-600">Quên mật khẩu</p>
        </div>

        {sent ? (
          <div className="bg-white rounded-xl border border-maroon-200 p-6 shadow-sm text-center space-y-4">
            <p className="text-maroon-700">
              Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến <strong>{email}</strong>.
              Vui lòng kiểm tra hộp thư của bạn.
            </p>
            <Link
              to={ROUTES.LOGIN}
              className="inline-block px-6 py-2.5 bg-maroon-700 text-white rounded-lg font-medium hover:bg-maroon-600 transition-colors"
            >
              Quay lại đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-maroon-200 p-6 shadow-sm space-y-4">
            <p className="text-sm text-maroon-600">
              Nhập email đã đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu cho bạn.
            </p>
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-maroon-700 text-white rounded-lg font-medium hover:bg-maroon-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Đang gửi...' : 'Gửi link đặt lại mật khẩu'}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-maroon-600">
          <Link to={ROUTES.LOGIN} className="text-maroon-700 font-semibold hover:underline">
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
