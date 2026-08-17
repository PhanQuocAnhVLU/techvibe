import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-white mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white">Tech</span>
                <span className="font-bold text-xl text-primary">Store</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Hệ thống bán lẻ điện tử hàng đầu Việt Nam. Cam kết 100% sản phẩm chính hãng, 
              giá tốt nhất thị trường và dịch vụ khách hàng xuất sắc.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Về TechStore</h3>
            <ul className="space-y-2">
              <li><Link href="/gioi-thieu" className="text-gray-400 hover:text-primary text-sm transition-colors">Giới thiệu</Link></li>
              <li><Link href="/tuyen-dung" className="text-gray-400 hover:text-primary text-sm transition-colors">Tuyển dụng</Link></li>
              <li><Link href="/lien-he" className="text-gray-400 hover:text-primary text-sm transition-colors">Liên hệ</Link></li>
              <li><Link href="/he-thong-cua-hang" className="text-gray-400 hover:text-primary text-sm transition-colors">Hệ thống cửa hàng</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              <li><Link href="/chinh-sach/giao-hang" className="text-gray-400 hover:text-primary text-sm transition-colors">Chính sách giao hàng</Link></li>
              <li><Link href="/chinh-sach/doi-tra" className="text-gray-400 hover:text-primary text-sm transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="/chinh-sach/bao-hanh" className="text-gray-400 hover:text-primary text-sm transition-colors">Chính sách bảo hành</Link></li>
              <li><Link href="/huong-dan/mua-hang" className="text-gray-400 hover:text-primary text-sm transition-colors">Hướng dẫn mua hàng</Link></li>
              <li><Link href="/huong-dan/tra-gop" className="text-gray-400 hover:text-primary text-sm transition-colors">Hướng dẫn trả góp</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">123 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:18002001" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Hotline: 1800.2001
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:hotro@techstore.vn" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  hotro@techstore.vn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 opacity-60" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-60" />
            <div className="px-3 py-1 bg-white/10 rounded text-xs">MoMo</div>
            <div className="px-3 py-1 bg-white/10 rounded text-xs">VNPay</div>
            <div className="px-3 py-1 bg-white/10 rounded text-xs">ZaloPay</div>
            <div className="px-3 py-1 bg-white/10 rounded text-xs">COD</div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            <p className="text-gray-500 text-xs">
              © 2026 TechStore. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-gray-500 text-xs">
              Công ty TNHH TechStore Việt Nam | Mã số thuế: 0123456789
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
