import { Users } from 'lucide-react'

export function AdminUserList() {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-maroon-800 mb-6">Quản lý người dùng</h2>
      <div className="bg-white rounded-xl border border-maroon-200 p-8 text-center">
        <Users className="w-12 h-12 text-maroon-300 mx-auto mb-3" />
        <p className="text-maroon-500">Tính năng quản lý người dùng đang được phát triển</p>
      </div>
    </div>
  )
}
