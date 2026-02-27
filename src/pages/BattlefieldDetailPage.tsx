import { useState, useEffect, lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router'
import { ArrowLeft, MapPin, Info } from 'lucide-react'
import { getBattlefield } from '@/services/battlefieldService'
import type { Battlefield } from '@/types/database'

const PanoramaViewer = lazy(() => import('@/components/battlefield/PanoramaViewer').then(m => ({ default: m.PanoramaViewer })))

export function BattlefieldDetailPage() {
  const { id } = useParams()
  const [battlefield, setBattlefield] = useState<Battlefield | null>(null)
  const [loading, setLoading] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

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
      <div className="h-[calc(100vh-64px)] bg-maroon-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-maroon-600 border-t-gold-400 rounded-full" />
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

  return (
    <div className="relative h-[calc(100vh-64px)] bg-maroon-900">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/khong-gian-3d"
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
            <div>
              <h1 className="text-white font-serif font-bold text-lg">{battlefield.name}</h1>
              {battlefield.location && (
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {battlefield.location}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Thông tin"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info panel */}
      {showInfo && battlefield.description && (
        <div className="absolute top-20 right-4 z-10 w-80 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
          <h3 className="font-semibold text-maroon-800 mb-2">Thông tin</h3>
          <p className="text-sm text-maroon-600 leading-relaxed">{battlefield.description}</p>
        </div>
      )}

      {/* Panorama */}
      {battlefield.panorama_url ? (
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center text-white">
              Đang tải không gian 3D...
            </div>
          }
        >
          <PanoramaViewer
            panoramaUrl={battlefield.panorama_url}
            markers={battlefield.markers ?? []}
          />
        </Suspense>
      ) : (
        <div className="h-full flex items-center justify-center text-white/60">
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Chưa có dữ liệu panorama</p>
          </div>
        </div>
      )}
    </div>
  )
}
