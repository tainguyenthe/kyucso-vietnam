import { useState, type FormEvent } from 'react'
import { useAuthStore } from '@/store/authStore'
import { APP_NAME } from '@/lib/constants'
import toast from 'react-hot-toast'
import logoVn from '@/assets/logo-vn.jpg'

export function ChangePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { updatePassword } = useAuthStore()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp')
      return
    }
    setLoading(true)
    try {
      await updatePassword(password)
      toast.success('Đổi mật khẩu thành công!')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Đổi mật khẩu thất bại')
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
          <p className="mt-1 text-maroon-600">Đổi mật khẩu</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-maroon-200 p-6 shadow-sm space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-maroon-700 mb-1">
              Mật khẩu mới
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 text-maroon-900 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all"
              placeholder="Tối thiểu 6 ký tự"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-maroon-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 text-maroon-900 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-maroon-700 text-white rounded-lg font-medium hover:bg-maroon-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
          </button>
        </form>
      </div>
    </div>
  )
}
