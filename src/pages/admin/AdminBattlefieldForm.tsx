import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { getBattlefield, createBattlefield, updateBattlefield } from '@/services/battlefieldService'
import { supabase } from '@/lib/supabase'
import { ERAS, ROUTES } from '@/lib/constants'
import toast from 'react-hot-toast'

const CATEGORIES = [
  { value: 'chien-dich', label: 'Chiến dịch' },
  { value: 'di-tich', label: 'Di tích' },
  { value: 'bao-tang', label: 'Bảo tàng' },
  { value: 'khac', label: 'Khác' },
]

export function AdminBattlefieldForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    era: 'chong-my',
    latitude: '',
    longitude: '',
    panorama_url: '',
    thumbnail_url: '',
    category: 'chien-dich',
    status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (id) {
      getBattlefield(id).then((bf) => {
        setForm({
          name: bf.name,
          description: bf.description ?? '',
          location: bf.location ?? '',
          era: bf.era,
          latitude: bf.latitude?.toString() ?? '',
          longitude: bf.longitude?.toString() ?? '',
          panorama_url: bf.panorama_url ?? '',
          thumbnail_url: bf.thumbnail_url ?? '',
          category: bf.category ?? 'chien-dich',
          status: bf.status,
        })
      }).catch(() => {
        toast.error('Không tìm thấy dữ liệu')
        navigate(ROUTES.ADMIN_BATTLEFIELDS)
      })
    }
  }, [id, navigate])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'panorama_url' | 'thumbnail_url') => {
    const file = e.target.files?.[0]
    if (!file) return
    const ext = file.name.split('.').pop()
    const path = `battlefields/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('uploads').upload(path, file)
    if (error) { toast.error('Lỗi tải ảnh'); return }
    const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(path)
    setForm((f) => ({ ...f, [field]: urlData.publicUrl }))
    toast.success('Đã tải ảnh')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      toast.error('Vui lòng nhập tên chiến trường')
      return
    }

    setLoading(true)
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description || null,
        location: form.location || null,
        era: form.era,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
        panorama_url: form.panorama_url || null,
        thumbnail_url: form.thumbnail_url || null,
        category: form.category || null,
        status: form.status,
      }

      if (isEdit && id) {
        await updateBattlefield(id, payload)
        toast.success('Đã cập nhật')
      } else {
        await createBattlefield(payload as Parameters<typeof createBattlefield>[0])
        toast.success('Đã tạo mới')
      }
      navigate(ROUTES.ADMIN_BATTLEFIELDS)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi khi lưu')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate(ROUTES.ADMIN_BATTLEFIELDS)} className="flex items-center gap-2 text-sm text-maroon-600 hover:text-maroon-800 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Quay lại
      </button>

      <h2 className="font-serif text-2xl font-bold text-maroon-800 mb-6">
        {isEdit ? 'Chỉnh sửa' : 'Thêm mới'} Chiến trường
      </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-maroon-200 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-maroon-700 mb-1">Tên chiến trường *</label>
            <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Vị trí</label>
            <input type="text" value={form.location} onChange={(e) => updateField('location', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" placeholder="VD: Điện Biên Phủ, Điện Biên" />
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Thời kỳ</label>
            <select value={form.era} onChange={(e) => updateField('era', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none bg-white">
              {ERAS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Danh mục</label>
            <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none bg-white">
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Trạng thái</label>
            <select value={form.status} onChange={(e) => updateField('status', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none bg-white">
              <option value="draft">Bản nháp</option>
              <option value="published">Công khai</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Vĩ độ (Latitude)</label>
            <input type="number" step="any" value={form.latitude} onChange={(e) => updateField('latitude', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" placeholder="VD: 21.3891" />
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Kinh độ (Longitude)</label>
            <input type="number" step="any" value={form.longitude} onChange={(e) => updateField('longitude', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" placeholder="VD: 103.0191" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Mô tả</label>
          <textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none resize-y" />
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Ảnh thumbnail</label>
          {form.thumbnail_url && (
            <img src={form.thumbnail_url} alt="Thumbnail" className="w-40 h-24 object-cover rounded-lg mb-2" />
          )}
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'thumbnail_url')} className="text-sm text-maroon-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Ảnh panorama 360</label>
          {form.panorama_url && (
            <img src={form.panorama_url} alt="Panorama" className="w-40 h-24 object-cover rounded-lg mb-2" />
          )}
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'panorama_url')} className="text-sm text-maroon-600" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-maroon-700 mb-1">Hoặc nhập URL panorama</label>
          <input type="url" value={form.panorama_url} onChange={(e) => updateField('panorama_url', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" placeholder="https://..." />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-maroon-700 text-white rounded-lg font-medium hover:bg-maroon-600 transition-colors disabled:opacity-50">
            {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Tạo mới'}
          </button>
          <button type="button" onClick={() => navigate(ROUTES.ADMIN_BATTLEFIELDS)} className="px-6 py-2.5 bg-white border border-maroon-300 text-maroon-600 rounded-lg font-medium hover:bg-maroon-50 transition-colors">
            Hủy
          </button>
        </div>
      </form>
    </div>
  )
}
