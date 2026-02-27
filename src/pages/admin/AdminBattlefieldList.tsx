import { Map } from 'lucide-react'

export function AdminBattlefieldList() {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-maroon-800 mb-6">Quản lý chiến trường</h2>
      <div className="bg-white rounded-xl border border-maroon-200 p-8 text-center">
        <Map className="w-12 h-12 text-maroon-300 mx-auto mb-3" />
        <p className="text-maroon-500">Tính năng quản lý chiến trường đang được phát triển</p>
      </div>
    </div>
  )
}
