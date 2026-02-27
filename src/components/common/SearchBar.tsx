import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  className?: string
  large?: boolean
  onSearch?: (query: string) => void
  defaultValue?: string
}

export function SearchBar({ placeholder = 'Tìm kiếm...', className, large, onSearch, defaultValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    if (onSearch) {
      onSearch(query.trim())
    } else {
      navigate(`/tra-cuu?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-white/90 backdrop-blur border border-maroon-300 rounded-xl text-maroon-900 placeholder:text-maroon-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all',
          large ? 'px-6 py-4 pr-14 text-lg' : 'px-4 py-2.5 pr-12 text-sm'
        )}
      />
      <button
        type="submit"
        className={cn(
          'absolute right-1 top-1/2 -translate-y-1/2 bg-maroon-700 text-white rounded-lg hover:bg-maroon-600 transition-colors flex items-center justify-center',
          large ? 'w-12 h-12' : 'w-9 h-9'
        )}
        aria-label="Tìm kiếm"
      >
        <Search className={large ? 'w-5 h-5' : 'w-4 h-4'} />
      </button>
    </form>
  )
}
