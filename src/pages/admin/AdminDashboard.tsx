import { Shield, BookOpen, Map, Users } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES } from '@/lib/constants'

const cards = [
  { icon: Shield, label: 'Anh hùng - Liệt sĩ', to: ROUTES.ADMIN_HEROES, color: 'bg-maroon-100 text-maroon-700' },
  { icon: BookOpen, label: 'Ký ức', to: ROUTES.ADMIN_STORIES, color: 'bg-gold-100 text-gold-700' },
  { icon: Map, label: 'Chiến trường', to: ROUTES.ADMIN_BATTLEFIELDS, color: 'bg-sunset-100 text-sunset-700' },
  { icon: Users, label: 'Người dùng', to: ROUTES.ADMIN_USERS, color: 'bg-blue-100 text-blue-700' },
]

export function AdminDashboard() {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-maroon-800 mb-6">Tổng quan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.to}
              to={card.to}
              className="bg-white rounded-xl border border-maroon-200 p-6 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-maroon-800">{card.label}</h3>
              <p className="text-sm text-maroon-500 mt-1">Quản lý {card.label.toLowerCase()}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
