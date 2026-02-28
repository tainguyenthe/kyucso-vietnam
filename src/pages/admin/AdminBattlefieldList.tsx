import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { getAllBattlefields, deleteBattlefield } from '@/services/battlefieldService'
import { ROUTES } from '@/lib/constants'
import type { Battlefield } from '@/types/database'
import toast from 'react-hot-toast'

export function AdminBattlefieldList() {
  const [battlefields, setBattlefields] = useState<Battlefield[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchBattlefields = () => {
    setLoading(true)
    getAllBattlefields(page)
      .then(({ battlefields: b, total: t }) => { setBattlefields(b); setTotal(t) })
      .catch(() => toast.error('Lỗi tải dữ liệu'))
      .finally(() => setLoading(false))
  }

  useEffect(fetchBattlefields, [page])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Xóa "${name}"?`)) return
    try {
      await deleteBattlefield(id)
      toast.success('Đã xóa')
      fetchBattlefields()
    } catch {
      toast.error('Lỗi khi xóa')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-maroon-800">Quản lý chiến trường</h2>
        <Link
          to={ROUTES.ADMIN_BATTLEFIELD_CREATE}
          className="flex items-center gap-2 px-4 py-2 bg-maroon-700 text-white rounded-lg text-sm font-medium hover:bg-maroon-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Thêm mới
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-maroon-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-maroon-50 border-b border-maroon-200">
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Tên</th>
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Vị trí</th>
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Thời kỳ</th>
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Trạng thái</th>
                <th className="text-right px-4 py-3 font-medium text-maroon-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-maroon-100 animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-32" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-24" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-20" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-16" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : battlefields.length > 0 ? (
                battlefields.map((bf) => (
                  <tr key={bf.id} className="border-b border-maroon-100 hover:bg-maroon-50">
                    <td className="px-4 py-3 font-medium text-maroon-800">{bf.name}</td>
                    <td className="px-4 py-3 text-maroon-600">{bf.location ?? '-'}</td>
                    <td className="px-4 py-3 text-maroon-600">{bf.era}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        bf.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {bf.status === 'published' ? 'Công khai' : 'Bản nháp'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/chien-truong/${bf.id}/chinh-sua`}
                          className="p-1.5 rounded hover:bg-maroon-100 text-maroon-500 hover:text-maroon-700 transition-colors"
                          title="Sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(bf.id, bf.name)}
                          className="p-1.5 rounded hover:bg-red-100 text-maroon-500 hover:text-red-600 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-maroon-500">
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {total > 20 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-maroon-200">
            <span className="text-sm text-maroon-500">Tổng: {total}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded border border-maroon-200 text-sm disabled:opacity-50 hover:bg-maroon-50"
              >
                Trước
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page * 20 >= total}
                className="px-3 py-1 rounded border border-maroon-200 text-sm disabled:opacity-50 hover:bg-maroon-50"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
