import { useState, useEffect } from 'react'
import { Filter } from 'lucide-react'
import { BattlefieldCard } from '@/components/common/BattlefieldCard'
import { getBattlefields } from '@/services/battlefieldService'
import type { Battlefield } from '@/types/database'

const categories = [
  { value: '', label: 'Tất cả' },
  { value: 'chien-dich', label: 'Chiến dịch' },
  { value: 'tran-danh', label: 'Trận đánh' },
  { value: 'dia-dao', label: 'Địa đạo' },
  { value: 'di-tich', label: 'Di tích' },
]

export function BattlefieldListPage() {
  const [battlefields, setBattlefields] = useState<Battlefield[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')

  useEffect(() => {
    setLoading(true)
    getBattlefields(category || undefined)
      .then(setBattlefields)
      .catch(() => setBattlefields([]))
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-maroon-800">
          Không gian 3D
        </h1>
        <p className="mt-2 text-maroon-600">
          Khám phá các chiến trường lịch sử qua công nghệ 360° tái hiện sống động
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-maroon-500" />
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === cat.value ? 'bg-maroon-700 text-white' : 'bg-maroon-100 text-maroon-600 hover:bg-maroon-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
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
      ) : battlefields.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {battlefields.map((bf) => (
            <BattlefieldCard key={bf.id} battlefield={bf} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-maroon-500 text-lg">Chưa có dữ liệu không gian 3D</p>
        </div>
      )}
    </div>
  )
}
