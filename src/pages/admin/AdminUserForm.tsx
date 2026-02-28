import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { getUser, updateProfile } from '@/services/userService'
import { supabase } from '@/lib/supabase'
import { ROUTES } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

export function AdminUserForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    role: 'user' as 'user' | 'admin',
    avatar_url: '',
    created_at: '',
  })

  useEffect(() => {
    if (id) {
      getUser(id).then((user) => {
        setForm({
          full_name: user.full_name ?? '',
          email: user.email,
          role: user.role,
          avatar_url: user.avatar_url ?? '',
          created_at: user.created_at,
        })
      }).catch(() => {
        toast.error('Không tìm thấy người dùng')
        navigate(ROUTES.ADMIN_USERS)
      })
    }
  }, [id, navigate])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ext = file.name.split('.').pop()
    const path = `avatars/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('uploads').upload(path, file)
    if (error) { toast.error('Lỗi tải ảnh'); return }
    const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(path)
    setForm((f) => ({ ...f, avatar_url: urlData.publicUrl }))
    toast.success('Đã tải ảnh')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    setLoading(true)
    try {
      await updateProfile(id, {
        full_name: form.full_name.trim() || null,
        role: form.role,
        avatar_url: form.avatar_url || null,
      })
      toast.success('Đã cập nhật')
      navigate(ROUTES.ADMIN_USERS)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi khi lưu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <button onClick={() => navigate(ROUTES.ADMIN_USERS)} className="flex items-center gap-2 text-sm text-maroon-600 hover:text-maroon-800 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Quay lại
      </button>

      <h2 className="font-serif text-2xl font-bold text-maroon-800 mb-6">
        Chỉnh sửa người dùng
      </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-maroon-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Email</label>
          <input type="text" value={form.email} disabled className="w-full px-4 py-2.5 rounded-lg border border-maroon-200 bg-maroon-50 text-maroon-500 cursor-not-allowed" />
        </div>

        {form.created_at && (
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Ngày tạo</label>
            <input type="text" value={formatDate(form.created_at)} disabled className="w-full px-4 py-2.5 rounded-lg border border-maroon-200 bg-maroon-50 text-maroon-500 cursor-not-allowed" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Họ tên</label>
          <input type="text" value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Vai trò</label>
          <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as 'user' | 'admin' }))} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none bg-white">
            <option value="user">Người dùng</option>
            <option value="admin">Quản trị</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Ảnh đại diện</label>
          {form.avatar_url && (
            <img src={form.avatar_url} alt="Avatar" className="w-20 h-20 object-cover rounded-full mb-2" />
          )}
          <input type="file" accept="image/*" onChange={handleAvatarUpload} className="text-sm text-maroon-600" />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-maroon-700 text-white rounded-lg font-medium hover:bg-maroon-600 transition-colors disabled:opacity-50">
            {loading ? 'Đang lưu...' : 'Cập nhật'}
          </button>
          <button type="button" onClick={() => navigate(ROUTES.ADMIN_USERS)} className="px-6 py-2.5 bg-white border border-maroon-300 text-maroon-600 rounded-lg font-medium hover:bg-maroon-50 transition-colors">
            Hủy
          </button>
        </div>
      </form>
    </div>
  )
}
