import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  to: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, to, className }: FeatureCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'group block bg-white/80 backdrop-blur rounded-xl border border-maroon-200 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5',
        className
      )}
    >
      <div className="w-12 h-12 bg-maroon-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-maroon-700 transition-colors">
        <Icon className="w-6 h-6 text-maroon-700 group-hover:text-gold-300 transition-colors" />
      </div>
      <h3 className="font-serif text-lg font-bold text-maroon-800 mb-2">{title}</h3>
      <p className="text-sm text-maroon-600 leading-relaxed">{description}</p>
    </Link>
  )
}
