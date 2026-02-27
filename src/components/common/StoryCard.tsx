import { Link } from 'react-router'
import { Calendar, User } from 'lucide-react'
import type { Story } from '@/types/database'
import { cn, formatDate, truncate } from '@/lib/utils'

interface StoryCardProps {
  story: Story
  className?: string
}

export function StoryCard({ story, className }: StoryCardProps) {
  return (
    <Link
      to={`/chia-se-ky-uc/${story.id}`}
      className={cn(
        'group bg-white rounded-xl border border-maroon-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5',
        className
      )}
    >
      <div className="aspect-video bg-maroon-100 relative overflow-hidden">
        {story.cover_image_url ? (
          <img
            src={story.cover_image_url}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-maroon-200 to-sunset-200">
            <span className="font-serif text-2xl text-maroon-400">Ký ức</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif font-bold text-maroon-800 group-hover:text-maroon-600 transition-colors line-clamp-2">
          {story.title}
        </h3>
        {story.excerpt && (
          <p className="mt-2 text-sm text-maroon-600 line-clamp-2">
            {truncate(story.excerpt, 120)}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between text-xs text-maroon-500">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>{story.author?.full_name ?? 'Ẩn danh'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(story.created_at)}</span>
          </div>
        </div>
        {story.era && (
          <div className="mt-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-maroon-100 text-maroon-600">
              {story.era}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
