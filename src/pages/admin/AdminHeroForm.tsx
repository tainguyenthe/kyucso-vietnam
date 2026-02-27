import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { getHero, createHero, updateHero } from '@/services/heroService'
import { supabase } from '@/lib/supabase'
import { ERAS, ROUTES } from '@/lib/constants'
import toast from 'react-hot-toast'

export function AdminHeroForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    birth_year: '',
    death_year: '',
    birth_place: '',
    era: 'chong-my',
    rank: '',
    unit: '',
    achievements: '',
    biography: '',
    portrait_url: '',
    status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (id) {
      getHero(id).then((hero) => {
        setForm({
          full_name: hero.full_name,
          birth_year: hero.birth_year?.toString() ?? '',
          death_year: hero.death_year?.toString() ?? '',
          birth_place: hero.birth_place ?? '',
          era: hero.era,
          rank: hero.rank ?? '',
          unit: hero.unit ?? '',
          achievements: hero.achievements ?? '',
          biography: hero.biography ?? '',
          portrait_url: hero.portrait_url ?? '',
          status: hero.status,
        })
      }).catch(() => {
        toast.error('Không tìm thấy dữ liệu')
        navigate(ROUTES.ADMIN_HEROES)
      })
    }
  }, [id, navigate])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ext = file.name.split('.').pop()
    const path = `heroes/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('uploads').upload(path, file)
    if (error) { toast.error('Lỗi tải ảnh'); return }
    const { data: urlData } = supabase.storage.from('uploads').getPublicUrl(path)
    setForm((f) => ({ ...f, portrait_url: urlData.publicUrl }))
    toast.success('Đã tải ảnh')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.full_name.trim()) {
      toast.error('Vui lòng nhập họ tên')
      return
    }

    setLoading(true)
    try {
      const payload = {
        full_name: form.full_name.trim(),
        birth_year: form.birth_year ? parseInt(form.birth_year) : null,
        death_year: form.death_year ? parseInt(form.death_year) : null,
        birth_place: form.birth_place || null,
        era: form.era,
        rank: form.rank || null,
        unit: form.unit || null,
        achievements: form.achievements || null,
        biography: form.biography || null,
        portrait_url: form.portrait_url || null,
        status: form.status,
      }

      if (isEdit && id) {
        await updateHero(id, payload)
        toast.success('Đã cập nhật')
      } else {
        await createHero(payload)
        toast.success('Đã tạo mới')
      }
      navigate(ROUTES.ADMIN_HEROES)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lỗi khi lưu')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  return (
    <div className="max-w-3xl">
      <button onClick={() => navigate(ROUTES.ADMIN_HEROES)} className="flex items-center gap-2 text-sm text-maroon-600 hover:text-maroon-800 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Quay lại
      </button>

      <h2 className="font-serif text-2xl font-bold text-maroon-800 mb-6">
        {isEdit ? 'Chỉnh sửa' : 'Thêm mới'} Anh hùng - Liệt sĩ
      </h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-maroon-200 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-maroon-700 mb-1">Họ tên *</label>
            <input type="text" value={form.full_name} onChange={(e) => updateField('full_name', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Năm sinh</label>
            <input type="number" value={form.birth_year} onChange={(e) => updateField('birth_year', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Năm mất</label>
            <input type="number" value={form.death_year} onChange={(e) => updateField('death_year', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Quê quán</label>
            <input type="text" value={form.birth_place} onChange={(e) => updateField('birth_place', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Thời kỳ</label>
            <select value={form.era} onChange={(e) => updateField('era', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none bg-white">
              {ERAS.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Cấp bậc</label>
            <input type="text" value={form.rank} onChange={(e) => updateField('rank', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-maroon-700 mb-1">Đơn vị</label>
            <input type="text" value={form.unit} onChange={(e) => updateField('unit', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Ảnh chân dung</label>
          {form.portrait_url && (
            <img src={form.portrait_url} alt="Portrait" className="w-32 h-40 object-cover rounded-lg mb-2" />
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-maroon-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Thành tích</label>
          <textarea value={form.achievements} onChange={(e) => updateField('achievements', e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none resize-y" />
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Tiểu sử</label>
          <textarea value={form.biography} onChange={(e) => updateField('biography', e.target.value)} rows={5} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none resize-y" />
        </div>

        <div>
          <label className="block text-sm font-medium text-maroon-700 mb-1">Trạng thái</label>
          <select value={form.status} onChange={(e) => updateField('status', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-maroon-300 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none bg-white">
            <option value="draft">Bản nháp</option>
            <option value="published">Công khai</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-maroon-700 text-white rounded-lg font-medium hover:bg-maroon-600 transition-colors disabled:opacity-50">
            {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Tạo mới'}
          </button>
          <button type="button" onClick={() => navigate(ROUTES.ADMIN_HEROES)} className="px-6 py-2.5 bg-white border border-maroon-300 text-maroon-600 rounded-lg font-medium hover:bg-maroon-50 transition-colors">
            Hủy
          </button>
        </div>
      </form>
    </div>
  )
}
