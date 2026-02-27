import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Plus } from 'lucide-react'
import { StoryCard } from '@/components/common/StoryCard'
import { getPublishedStories } from '@/services/storyService'
import { useAuthStore } from '@/store/authStore'
import type { Story } from '@/types/database'

export function MemoryListPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const { user } = useAuthStore()

  useEffect(() => {
    setLoading(true)
    getPublishedStories(page)
      .then(({ stories: s, total: t }) => {
        setStories(s)
        setTotal(t)
      })
      .catch(() => setStories([]))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-maroon-800">
            Chia sẻ ký ức
          </h1>
          <p className="mt-2 text-maroon-600">
            Những câu chuyện và ký ức chiến tranh từ nhân chứng lịch sử
          </p>
        </div>
        {user && (
          <Link
            to="/chia-se-ky-uc/tao-moi"
            className="flex items-center gap-2 px-4 py-2.5 bg-maroon-700 text-white rounded-xl font-medium hover:bg-maroon-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Tạo ký ức mới</span>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-maroon-200 overflow-hidden animate-pulse">
              <div className="aspect-video bg-maroon-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-maroon-100 rounded w-3/4" />
                <div className="h-3 bg-maroon-100 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : stories.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
          {total > 12 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white border border-maroon-200 text-sm disabled:opacity-50 hover:bg-maroon-50"
              >
                Trang trước
              </button>
              <span className="px-4 py-2 text-sm text-maroon-600">Trang {page}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page * 12 >= total}
                className="px-4 py-2 rounded-lg bg-white border border-maroon-200 text-sm disabled:opacity-50 hover:bg-maroon-50"
              >
                Trang sau
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-maroon-500 text-lg mb-4">Chưa có ký ức nào được chia sẻ</p>
          {user && (
            <Link
              to="/chia-se-ky-uc/tao-moi"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-maroon-700 text-white rounded-xl font-medium hover:bg-maroon-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Hãy là người đầu tiên chia sẻ
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
