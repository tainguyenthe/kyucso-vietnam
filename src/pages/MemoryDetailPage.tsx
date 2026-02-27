import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { ArrowLeft, Calendar, User, MapPin } from 'lucide-react'
import { getStory } from '@/services/storyService'
import { formatDate } from '@/lib/utils'
import type { Story } from '@/types/database'

export function MemoryDetailPage() {
  const { id } = useParams()
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getStory(id)
      .then(setStory)
      .catch(() => setStory(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse space-y-4">
        <div className="h-6 bg-maroon-100 rounded w-24" />
        <div className="aspect-video bg-maroon-100 rounded-xl" />
        <div className="h-8 bg-maroon-100 rounded w-3/4" />
        <div className="h-4 bg-maroon-100 rounded w-full" />
        <div className="h-4 bg-maroon-100 rounded w-full" />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-maroon-500 text-lg">Không tìm thấy ký ức</p>
        <Link to="/chia-se-ky-uc" className="mt-4 inline-block text-maroon-700 hover:underline">
          Quay lại danh sách
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/chia-se-ky-uc" className="inline-flex items-center gap-2 text-sm text-maroon-600 hover:text-maroon-800 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Quay lại
      </Link>

      {story.cover_image_url && (
        <div className="aspect-video rounded-xl overflow-hidden mb-6">
          <img src={story.cover_image_url} alt={story.title} className="w-full h-full object-cover" />
        </div>
      )}

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-800 mb-4">
        {story.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-maroon-500 mb-6 pb-6 border-b border-maroon-200">
        <div className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          <span>{story.author?.full_name ?? 'Ẩn danh'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(story.created_at)}</span>
        </div>
        {story.location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{story.location}</span>
          </div>
        )}
        {story.era && (
          <span className="px-2 py-0.5 rounded-full bg-maroon-100 text-maroon-600 text-xs">
            {story.era}
          </span>
        )}
      </div>

      {story.audio_url && (
        <div className="mb-6 p-4 bg-maroon-50 rounded-xl border border-maroon-200">
          <p className="text-sm text-maroon-600 mb-2 font-medium">Ghi âm lời kể:</p>
          <audio controls className="w-full" src={story.audio_url}>
            Trình duyệt không hỗ trợ audio.
          </audio>
        </div>
      )}

      <div
        className="prose prose-maroon max-w-none text-maroon-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: story.content }}
      />

      {story.characters && story.characters.length > 0 && (
        <div className="mt-8 p-4 bg-gold-50 rounded-xl border border-gold-200">
          <h3 className="font-semibold text-maroon-800 mb-2">Nhân vật liên quan</h3>
          <div className="flex flex-wrap gap-2">
            {story.characters.map((name) => (
              <Link
                key={name}
                to={`/tra-cuu?q=${encodeURIComponent(name)}`}
                className="text-sm px-3 py-1 rounded-full bg-white border border-gold-300 text-maroon-700 hover:bg-gold-100 transition-colors"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {story.entities && story.entities.length > 0 && (
        <div className="mt-4 p-4 bg-maroon-50 rounded-xl border border-maroon-200">
          <h3 className="font-semibold text-maroon-800 mb-2">Thực thể AI trích xuất</h3>
          <div className="flex flex-wrap gap-2">
            {story.entities.map((entity, i) => (
              <span
                key={i}
                className={`text-xs px-2.5 py-1 rounded-full ${
                  entity.type === 'person' ? 'bg-blue-100 text-blue-700' :
                  entity.type === 'place' ? 'bg-green-100 text-green-700' :
                  entity.type === 'date' ? 'bg-purple-100 text-purple-700' :
                  entity.type === 'unit' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}
              >
                {entity.type}: {entity.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
