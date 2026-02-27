import { Search, Map, BookOpen, Users } from 'lucide-react'
import { SearchBar } from '@/components/common/SearchBar'
import { FeatureCard } from '@/components/common/FeatureCard'
import { APP_NAME } from '@/lib/constants'

const features = [
  {
    icon: Search,
    title: 'Tra cứu Anh hùng - Liệt sĩ',
    description: 'Tìm kiếm thông tin về các anh hùng, liệt sĩ đã hy sinh vì Tổ quốc với công nghệ AI.',
    to: '/tra-cuu',
  },
  {
    icon: Map,
    title: 'Không gian 3D',
    description: 'Khám phá các chiến trường lịch sử qua công nghệ 360° tái hiện sống động.',
    to: '/khong-gian-3d',
  },
  {
    icon: BookOpen,
    title: 'Chia sẻ ký ức',
    description: 'Ghi lại và chia sẻ những ký ức chiến tranh quý giá từ nhân chứng lịch sử.',
    to: '/chia-se-ky-uc',
  },
  {
    icon: Users,
    title: 'Kết nối đồng đội',
    description: 'AI hỗ trợ tìm kiếm và kết nối thông tin về đồng đội, thân nhân liệt sĩ.',
    to: '/tra-cuu',
  },
]

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-maroon-800 via-maroon-700 to-sunset-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gold-400 rounded-full flex items-center justify-center text-maroon-900 font-bold text-2xl shadow-lg">
            VN
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {APP_NAME}
          </h1>
          <p className="text-lg sm:text-xl text-maroon-200 max-w-2xl mx-auto mb-8">
            Nền tảng số hóa và lưu giữ ký ức chiến tranh Việt Nam.
            Kết nối quá khứ với hiện tại qua công nghệ AI.
          </p>
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar
              placeholder="TRA CỨU ANH HÙNG - LIỆT SĨ (Nhập tên, quê quán, đơn vị...)"
              large
            />
          </div>
          <p className="text-sm text-maroon-300">
            Hơn 1 triệu hồ sơ anh hùng, liệt sĩ đã được số hóa
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-maroon-50 to-transparent" />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y border-maroon-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-maroon-800">
              Tri ân các thế hệ anh hùng
            </h2>
            <p className="mt-2 text-maroon-600">
              Mỗi ký ức được lưu giữ là một phần lịch sử được bảo tồn
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '1,000,000+', label: 'Hồ sơ anh hùng' },
              { value: '50,000+', label: 'Ký ức được chia sẻ' },
              { value: '200+', label: 'Chiến trường 3D' },
              { value: '10,000+', label: 'Đồng đội kết nối' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl font-bold text-maroon-700">{stat.value}</div>
                <div className="mt-1 text-sm text-maroon-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-maroon-700 to-maroon-800 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
            Hãy cùng gìn giữ ký ức lịch sử
          </h2>
          <p className="text-maroon-200 max-w-xl mx-auto mb-6">
            Mỗi câu chuyện, mỗi ký ức bạn chia sẻ là một viên gạch xây dựng nên
            bức tranh toàn cảnh về lịch sử hào hùng của dân tộc.
          </p>
          <a
            href="/chia-se-ky-uc/tao-moi"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-400 text-maroon-900 rounded-xl font-semibold hover:bg-gold-300 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Chia sẻ ký ức của bạn
          </a>
        </div>
      </section>
    </div>
  )
}
