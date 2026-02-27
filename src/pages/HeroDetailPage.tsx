import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { ArrowLeft, MapPin, Calendar, Shield, Building, Award } from 'lucide-react'
import { getHero } from '@/services/heroService'
import type { Hero } from '@/types/database'

export function HeroDetailPage() {
  const { id } = useParams()
  const [hero, setHero] = useState<Hero | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getHero(id)
      .then(setHero)
      .catch(() => setHero(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-6 bg-maroon-100 rounded w-24 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="aspect-[3/4] bg-maroon-100 rounded-xl" />
          <div className="md:col-span-2 space-y-4">
            <div className="h-8 bg-maroon-100 rounded w-3/4" />
            <div className="h-4 bg-maroon-100 rounded w-1/2" />
            <div className="h-4 bg-maroon-100 rounded w-full" />
            <div className="h-4 bg-maroon-100 rounded w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!hero) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-maroon-500 text-lg">Không tìm thấy thông tin anh hùng</p>
        <Link to="/tra-cuu" className="mt-4 inline-block text-maroon-700 hover:underline">
          Quay lại tìm kiếm
        </Link>
      </div>
    )
  }

  const eraLabel = hero.era === 'chong-phap' ? 'Kháng chiến chống Pháp' :
    hero.era === 'chong-my' ? 'Kháng chiến chống Mỹ' :
    hero.era === 'bien-gioi' ? 'Chiến tranh biên giới' : hero.era

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/tra-cuu" className="inline-flex items-center gap-2 text-sm text-maroon-600 hover:text-maroon-800 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Quay lại tìm kiếm
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Portrait */}
        <div>
          <div className="aspect-[3/4] bg-maroon-100 rounded-xl overflow-hidden shadow-md">
            {hero.portrait_url ? (
              <img src={hero.portrait_url} alt={hero.full_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 bg-maroon-200 rounded-full flex items-center justify-center text-4xl font-serif text-maroon-400">
                  {hero.full_name[0]}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="md:col-span-2">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-maroon-100 text-maroon-700 mb-3">
            {eraLabel}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-800 mb-2">
            {hero.full_name}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {hero.rank && (
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-maroon-200">
                <Shield className="w-5 h-5 text-gold-500" />
                <div>
                  <div className="text-xs text-maroon-500">Cấp bậc</div>
                  <div className="text-sm font-medium text-maroon-800">{hero.rank}</div>
                </div>
              </div>
            )}
            {hero.unit && (
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-maroon-200">
                <Building className="w-5 h-5 text-gold-500" />
                <div>
                  <div className="text-xs text-maroon-500">Đơn vị</div>
                  <div className="text-sm font-medium text-maroon-800">{hero.unit}</div>
                </div>
              </div>
            )}
            {(hero.birth_year ?? hero.death_year) && (
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-maroon-200">
                <Calendar className="w-5 h-5 text-gold-500" />
                <div>
                  <div className="text-xs text-maroon-500">Năm sinh - Năm mất</div>
                  <div className="text-sm font-medium text-maroon-800">
                    {[hero.birth_year, hero.death_year].filter(Boolean).join(' - ')}
                  </div>
                </div>
              </div>
            )}
            {hero.birth_place && (
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-maroon-200">
                <MapPin className="w-5 h-5 text-gold-500" />
                <div>
                  <div className="text-xs text-maroon-500">Quê quán</div>
                  <div className="text-sm font-medium text-maroon-800">{hero.birth_place}</div>
                </div>
              </div>
            )}
          </div>

          {hero.achievements && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-gold-500" />
                <h2 className="font-semibold text-maroon-800">Thành tích</h2>
              </div>
              <div className="bg-white rounded-lg border border-maroon-200 p-4 text-sm text-maroon-700 leading-relaxed whitespace-pre-line">
                {hero.achievements}
              </div>
            </div>
          )}

          {hero.biography && (
            <div className="mt-6">
              <h2 className="font-semibold text-maroon-800 mb-3">Tiểu sử</h2>
              <div className="bg-white rounded-lg border border-maroon-200 p-4 text-sm text-maroon-700 leading-relaxed whitespace-pre-line">
                {hero.biography}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
