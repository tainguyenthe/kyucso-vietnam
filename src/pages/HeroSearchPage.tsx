import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { Filter } from 'lucide-react'
import { SearchBar } from '@/components/common/SearchBar'
import { HeroCard } from '@/components/common/HeroCard'
import { searchHeroes } from '@/services/heroService'
import { ERAS } from '@/lib/constants'
import type { Hero } from '@/types/database'

export function HeroSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const query = searchParams.get('q') ?? ''
  const era = searchParams.get('era') ?? ''

  useEffect(() => {
    const fetchHeroes = async () => {
      setLoading(true)
      try {
        const result = await searchHeroes({ query, era, page })
        setHeroes(result.heroes)
        setTotal(result.total)
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchHeroes()
  }, [query, era, page])

  const handleSearch = (q: string) => {
    setSearchParams((prev) => {
      prev.set('q', q)
      return prev
    })
    setPage(1)
  }

  const handleEraFilter = (eraValue: string) => {
    setSearchParams((prev) => {
      if (eraValue) prev.set('era', eraValue)
      else prev.delete('era')
      return prev
    })
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-maroon-800">
          Tra cứu Anh hùng - Liệt sĩ
        </h1>
        <p className="mt-2 text-maroon-600">
          Tìm kiếm thông tin về các anh hùng, liệt sĩ đã hy sinh vì Tổ quốc
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar
          placeholder="Nhập tên, quê quán, đơn vị..."
          large
          onSearch={handleSearch}
          defaultValue={query}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-maroon-500" />
        <button
          onClick={() => handleEraFilter('')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !era ? 'bg-maroon-700 text-white' : 'bg-maroon-100 text-maroon-600 hover:bg-maroon-200'
          }`}
        >
          Tất cả
        </button>
        {ERAS.map((e) => (
          <button
            key={e.value}
            onClick={() => handleEraFilter(e.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              era === e.value ? 'bg-maroon-700 text-white' : 'bg-maroon-100 text-maroon-600 hover:bg-maroon-200'
            }`}
          >
            {e.label.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-maroon-200 overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-maroon-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-maroon-100 rounded w-3/4" />
                <div className="h-3 bg-maroon-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : heroes.length > 0 ? (
        <>
          <p className="text-sm text-maroon-500 mb-4">
            Tìm thấy <strong>{total}</strong> kết quả
            {query && <> cho &quot;{query}&quot;</>}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {heroes.map((hero) => (
              <HeroCard key={hero.id} hero={hero} />
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
          <p className="text-maroon-500 text-lg">
            {query ? `Không tìm thấy kết quả cho "${query}"` : 'Nhập từ khóa để bắt đầu tìm kiếm'}
          </p>
        </div>
      )}
    </div>
  )
}
