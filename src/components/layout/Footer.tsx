import { Link } from 'react-router'
import { APP_NAME } from '@/lib/constants'
import logoVn from '@/assets/logo-vn.jpg'

export function Footer() {
  return (
    <footer className="bg-maroon-800 text-maroon-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoVn} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-serif text-xl font-bold text-white">{APP_NAME}</span>
            </div>
            <p className="text-sm text-maroon-300 leading-relaxed">
              Nền tảng số hóa và lưu giữ ký ức chiến tranh Việt Nam.
              Kết nối quá khứ với hiện tại qua công nghệ AI.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Khám phá</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tra-cuu" className="hover:text-gold-300 transition-colors">Tra cứu anh hùng</Link></li>
              <li><Link to="/khong-gian-3d" className="hover:text-gold-300 transition-colors">Không gian 3D</Link></li>
              <li><Link to="/chia-se-ky-uc" className="hover:text-gold-300 transition-colors">Chia sẻ ký ức</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@kyucso.vn</li>
              <li>Hotline: 1900-xxxx</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-maroon-700 mt-8 pt-8 text-center text-sm text-maroon-400">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
