import { Link } from 'react-router'
import { MapPin, Calendar } from 'lucide-react'
import type { Hero } from '@/types/database'
import { cn } from '@/lib/utils'

interface HeroCardProps {
  hero: Hero
  className?: string
}

export function HeroCard({ hero, className }: HeroCardProps) {
  const lifespan = [hero.birth_year, hero.death_year].filter(Boolean).join(' - ')

  return (
    <Link
      to={`/tra-cuu/${hero.id}`}
      className={cn(
        'group bg-white rounded-xl border border-maroon-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5',
        className
      )}
    >
      <div className="aspect-[3/4] bg-maroon-100 relative overflow-hidden">
        {hero.portrait_url ? (
          <img
            src={hero.portrait_url}
            alt={hero.full_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-maroon-300">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-maroon-200 rounded-full flex items-center justify-center text-2xl font-serif text-maroon-400">
                {hero.full_name[0]}
              </div>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="text-xs px-2 py-1 rounded-full bg-maroon-700/80 text-white backdrop-blur-sm">
            {hero.era === 'chong-phap' ? 'Chống Pháp' :
             hero.era === 'chong-my' ? 'Chống Mỹ' :
             hero.era === 'bien-gioi' ? 'Biên giới' : hero.era}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif font-bold text-maroon-800 group-hover:text-maroon-600 transition-colors">
          {hero.full_name}
        </h3>
        {hero.rank && (
          <p className="text-sm text-gold-600 font-medium mt-1">{hero.rank}</p>
        )}
        <div className="mt-2 space-y-1">
          {lifespan && (
            <div className="flex items-center gap-1.5 text-xs text-maroon-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{lifespan}</span>
            </div>
          )}
          {hero.birth_place && (
            <div className="flex items-center gap-1.5 text-xs text-maroon-500">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{hero.birth_place}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
