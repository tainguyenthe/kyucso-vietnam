import { useState, useEffect, lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router'
import { ArrowLeft, MapPin, Clock, Tag } from 'lucide-react'
import { getBattlefield } from '@/services/battlefieldService'
import { ERAS } from '@/lib/constants'
import type { Battlefield } from '@/types/database'

const PanoramaViewer = lazy(() => import('@/components/battlefield/PanoramaViewer').then(m => ({ default: m.PanoramaViewer })))

function getEraLabel(era: string) {
  return ERAS.find((e) => e.value === era)?.label ?? era
}

function getCategoryLabel(category: string | null) {
  if (!category) return null
  const map: Record<string, string> = {
    'chien-dich': 'Chiến dịch',
    'di-tich': 'Di tích',
    'bao-tang': 'Bảo tàng',
    'khac': 'Khác',
  }
  return map[category] ?? category
}

export function BattlefieldDetailPage() {
  const { id } = useParams()
  const [battlefield, setBattlefield] = useState<Battlefield | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getBattlefield(id)
      .then(setBattlefield)
      .catch(() => setBattlefield(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-6 bg-maroon-100 rounded w-24 mb-8" />
        <div className="h-[60vh] bg-maroon-100 rounded-xl mb-8" />
        <div className="space-y-4">
          <div className="h-8 bg-maroon-100 rounded w-1/2" />
          <div className="h-4 bg-maroon-100 rounded w-full" />
          <div className="h-4 bg-maroon-100 rounded w-3/4" />
        </div>
      </div>
    )
  }

  if (!battlefield) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-maroon-500 text-lg">Không tìm thấy chiến trường</p>
        <Link to="/khong-gian-3d" className="mt-4 inline-block text-maroon-700 hover:underline">
          Quay lại danh sách
        </Link>
      </div>
    )
  }

  const categoryLabel = getCategoryLabel(battlefield.category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/khong-gian-3d" className="inline-flex items-center gap-2 text-sm text-maroon-600 hover:text-maroon-800 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Quay lại danh sách
      </Link>

      {/* Title */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-800 mb-2">
          {battlefield.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-maroon-600">
          {battlefield.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-500" />
              {battlefield.location}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gold-500" />
            {getEraLabel(battlefield.era)}
          </div>
          {categoryLabel && (
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-gold-500" />
              {categoryLabel}
            </div>
          )}
        </div>
      </div>

      {/* Panorama Viewer */}
      <div className="relative h-[60vh] bg-maroon-900 rounded-xl overflow-hidden mb-8 shadow-lg">
        {battlefield.panorama_url ? (
          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-maroon-600 border-t-gold-400 rounded-full mx-auto mb-3" />
                  <p className="text-white/60 text-sm">Đang tải không gian 3D...</p>
                </div>
              </div>
            }
          >
            <PanoramaViewer
              panoramaUrl={battlefield.panorama_url}
              markers={battlefield.markers ?? []}
            />
          </Suspense>
        ) : battlefield.thumbnail_url ? (
          <img src={battlefield.thumbnail_url} alt={battlefield.name} className="w-full h-full object-cover" />
        ) : (
          <div className="h-full flex items-center justify-center text-white/60">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Chưa có dữ liệu panorama</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {battlefield.description && (
        <div className="bg-white rounded-xl border border-maroon-200 p-6 shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-maroon-800 mb-3">Giới thiệu</h2>
          <p className="text-maroon-700 leading-relaxed whitespace-pre-line">{battlefield.description}</p>
        </div>
      )}
    </div>
  )
}
