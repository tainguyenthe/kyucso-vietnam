import { useState, useEffect } from 'react'
import { Check, X, Eye } from 'lucide-react'
import { getAllStories, updateStory } from '@/services/storyService'
import { formatDate, truncate } from '@/lib/utils'
import type { Story } from '@/types/database'
import toast from 'react-hot-toast'

export function AdminStoryList() {
  const [stories, setStories] = useState<Story[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchStories = () => {
    setLoading(true)
    getAllStories(page)
      .then(({ stories: s, total: t }) => { setStories(s); setTotal(t) })
      .catch(() => toast.error('Lỗi tải dữ liệu'))
      .finally(() => setLoading(false))
  }

  useEffect(fetchStories, [page])

  const handleStatusChange = async (id: string, status: 'published' | 'rejected') => {
    try {
      await updateStory(id, { status })
      toast.success(status === 'published' ? 'Đã duyệt' : 'Đã từ chối')
      fetchStories()
    } catch {
      toast.error('Lỗi cập nhật')
    }
  }

  const statusLabel = (s: string) => {
    switch (s) {
      case 'published': return { text: 'Công khai', cls: 'bg-green-100 text-green-700' }
      case 'pending_review': return { text: 'Chờ duyệt', cls: 'bg-yellow-100 text-yellow-700' }
      case 'rejected': return { text: 'Từ chối', cls: 'bg-red-100 text-red-700' }
      default: return { text: 'Bản nháp', cls: 'bg-gray-100 text-gray-700' }
    }
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-maroon-800 mb-6">Quản lý ký ức</h2>

      <div className="bg-white rounded-xl border border-maroon-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-maroon-50 border-b border-maroon-200">
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Tiêu đề</th>
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Tác giả</th>
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Ngày tạo</th>
                <th className="text-left px-4 py-3 font-medium text-maroon-700">Trạng thái</th>
                <th className="text-right px-4 py-3 font-medium text-maroon-700">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-maroon-100 animate-pulse">
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-40" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-24" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-20" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-16" /></td>
                    <td className="px-4 py-3"><div className="h-4 bg-maroon-100 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : stories.length > 0 ? (
                stories.map((story) => {
                  const st = statusLabel(story.status)
                  return (
                    <tr key={story.id} className="border-b border-maroon-100 hover:bg-maroon-50">
                      <td className="px-4 py-3 font-medium text-maroon-800">{truncate(story.title, 40)}</td>
                      <td className="px-4 py-3 text-maroon-600">{story.author?.full_name ?? 'Ẩn danh'}</td>
                      <td className="px-4 py-3 text-maroon-600">{formatDate(story.created_at)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${st.cls}`}>{st.text}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <a href={`/chia-se-ky-uc/${story.id}`} target="_blank" rel="noopener noreferrer"
                            className="p-1.5 rounded hover:bg-maroon-100 text-maroon-500 hover:text-maroon-700 transition-colors" title="Xem">
                            <Eye className="w-4 h-4" />
                          </a>
                          {story.status === 'pending_review' && (
                            <>
                              <button onClick={() => handleStatusChange(story.id, 'published')}
                                className="p-1.5 rounded hover:bg-green-100 text-maroon-500 hover:text-green-600 transition-colors" title="Duyệt">
                                <Check className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleStatusChange(story.id, 'rejected')}
                                className="p-1.5 rounded hover:bg-red-100 text-maroon-500 hover:text-red-600 transition-colors" title="Từ chối">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-maroon-500">Chưa có dữ liệu</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {total > 20 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-maroon-200">
            <span className="text-sm text-maroon-500">Tổng: {total}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded border border-maroon-200 text-sm disabled:opacity-50 hover:bg-maroon-50">Trước</button>
              <button onClick={() => setPage((p) => p + 1)} disabled={page * 20 >= total} className="px-3 py-1 rounded border border-maroon-200 text-sm disabled:opacity-50 hover:bg-maroon-50">Sau</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
