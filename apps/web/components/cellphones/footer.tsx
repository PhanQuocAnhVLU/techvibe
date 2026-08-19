import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-6">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-cps-red rounded-lg flex items-center justify-center">
                <span className="font-black text-white text-xl">T</span>
              </div>
              <div>
                <span className="font-bold text-lg">Tech</span>
                <span className="font-bold text-lg text-cps-red">Vibe</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mb-3">
              Cửa hàng công nghệ hàng đầu Việt Nam với hơn 10 năm kinh nghiệm.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 bg-neutral-800 hover:bg-cps-red rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-neutral-800 hover:bg-cps-red rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-neutral-800 hover:bg-cps-red rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Thông tin</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/gioi-thieu" className="hover:text-white">Giới thiệu</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-white">Tin tức</Link></li>
              <li><Link href="/lien-he" className="hover:text-white">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Hỗ trợ</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="#" className="hover:text-white">Hướng dẫn mua hàng</Link></li>
              <li><Link href="#" className="hover:text-white">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="hover:text-white">Chính sách bảo hành</Link></li>
              <li><Link href="#" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Liên hệ</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                <span>123 Nguyễn Trãi, P.Bến Thành, Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 shrink-0" />
                <span>1900.2000</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 shrink-0" />
                <span>cskh@techvibe.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>© 2024 TechVibe. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-white">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}