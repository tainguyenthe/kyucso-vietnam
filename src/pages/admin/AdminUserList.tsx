import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Edit, Trash2 } from 'lucide-react'
import { getAllUsers, deleteUser } from '@/services/userService'
import { formatDate } from '@/lib/utils'
import type { Profile } from '@/types/database'
import toast from 'react-hot-toast'

export function AdminUserList() {
  const [users, setUsers] = useState<Profile[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchUsers = () => {
    setLoading(true)
    getAllUsers(page)
      .then(({ users: u, total: t }) => { setUsers(u); setTotal(t) })
      .catch(() => toast.error('Lỗi tải dữ liệu'))
      .finally(() => setLoading(false))
  }

  useEffect(fetchUsers, [page])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Xóa "${name}"?`)) return
    try {
      await deleteUser(id)
      toast.success('Đã xóa')
      fetchUsers()
    } catch {
      toast.error('Lỗi khi xóa')
    }
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-maroon-800 mb-6">Quản lý người dùng</h2>

      <div className="bg-white rounded-xl border border-maroon-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-maroon-50 border-b border-maroon-200">
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Họ tên</th>
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Email</th>
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Vai trò</th>
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Ngày tạo</th>
                <th className="text-right px-4 py-3 font-medium text-maroon-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-maroon-100 animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-28" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-36" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-16" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-24" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-maroon-100 hover:bg-maroon-50">
                    <td className="px-4 py-3 font-medium text-maroon-800">{user.full_name ?? '-'}</td>
                    <td className="px-4 py-3 text-maroon-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role === 'admin' ? 'Quản trị' : 'Người dùng'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-maroon-600">{formatDate(user.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/nguoi-dung/${user.id}/chinh-sua`}
                          className="p-1.5 rounded hover:bg-maroon-100 text-maroon-500 hover:text-maroon-700 transition-colors"
                          title="Sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id, user.full_name ?? user.email)}
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
