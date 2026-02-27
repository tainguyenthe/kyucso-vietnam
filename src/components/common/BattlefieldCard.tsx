import { Link } from 'react-router'
import { MapPin, Eye } from 'lucide-react'
import type { Battlefield } from '@/types/database'
import { cn } from '@/lib/utils'

interface BattlefieldCardProps {
  battlefield: Battlefield
  className?: string
}

export function BattlefieldCard({ battlefield, className }: BattlefieldCardProps) {
  return (
    <Link
      to={`/khong-gian-3d/${battlefield.id}`}
      className={cn(
        'group bg-white rounded-xl border border-maroon-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5',
        className
      )}
    >
      <div className="aspect-video bg-maroon-100 relative overflow-hidden">
        {battlefield.thumbnail_url ? (
          <img
            src={battlefield.thumbnail_url}
            alt={battlefield.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-maroon-300">
            <MapPin className="w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-serif font-bold text-white text-lg">{battlefield.name}</h3>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
          <Eye className="w-3.5 h-3.5" />
          <span>360°</span>
        </div>
      </div>
      <div className="p-4">
        {battlefield.location && (
          <div className="flex items-center gap-1.5 text-sm text-maroon-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{battlefield.location}</span>
          </div>
        )}
        {battlefield.description && (
          <p className="text-sm text-maroon-600 line-clamp-2">{battlefield.description}</p>
        )}
      </div>
    </Link>
  )
}
