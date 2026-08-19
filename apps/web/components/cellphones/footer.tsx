import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram, Send, Shield, Truck, RotateCcw, Award, CreditCard, Smartphone } from 'lucide-react'

const trustBadges = [
  { icon: Shield, label: 'Bảo hành chính hãng', sub: '12-24 tháng' },
  { icon: Truck, label: 'Giao hàng siêu tốc', sub: '2h nội thành' },
  { icon: RotateCcw, label: 'Đổi trả 30 ngày', sub: 'Miễn phí đổi trả' },
  { icon: Award, label: 'Cam kết chính hãng', sub: 'Hoàn 200% nếu fake' },
  { icon: CreditCard, label: 'Trả góp 0%', sub: 'Thẻ tín dụng' },
  { icon: Smartphone, label: 'Hỗ trợ 24/7', sub: 'Hotline 1900.2000' },
]

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-6">
      {/* Trust badges */}
      <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border-y border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustBadges.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cps-red/10 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-cps-red" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{b.label}</p>
                  <p className="text-[10px] text-neutral-400">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cps-red to-cps-red-light rounded-lg flex items-center justify-center">
                <span className="font-black text-white text-xl">T</span>
              </div>
              <div className="leading-none">
                <div className="font-black text-lg">Tech<span className="text-cps-red">Vibe</span></div>
                <div className="text-[10px] text-neutral-400">.com.vn</div>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              Cửa hàng công nghệ hàng đầu Việt Nam với hơn 10 năm kinh nghiệm.
              Cam kết 100% hàng chính hãng.
            </p>
            <div className="flex items-center gap-2 mb-4">
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

            {/* Payment methods */}
            <div>
              <p className="text-[10px] text-neutral-500 mb-2 font-semibold uppercase">Thanh toán</p>
              <div className="flex flex-wrap gap-1">
                {['VISA', 'Master', 'JCB', 'NAPAS', 'Momo', 'ZaloPay', 'VNPay', 'COD'].map(m => (
                  <span key={m} className="px-1.5 py-0.5 bg-neutral-800 text-[9px] text-neutral-300 rounded">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <FooterColumn
            title="Về TechVibe"
            items={[
              { label: 'Giới thiệu', href: '/gioi-thieu' },
              { label: 'Tin tức công nghệ', href: '/tin-tuc' },
              { label: 'Liên hệ', href: '/lien-he' },
              { label: 'Tuyển dụng', href: '#' },
              { label: 'Hệ thống cửa hàng', href: '#' },
            ]}
          />

          <FooterColumn
            title="Hỗ trợ khách hàng"
            items={[
              { label: 'Hướng dẫn mua hàng', href: '#' },
              { label: 'Chính sách đổi trả', href: '#' },
              { label: 'Chính sách bảo hành', href: '#' },
              { label: 'Câu hỏi thường gặp', href: '#' },
              { label: 'Tra cứu đơn hàng', href: '/tra-cuu-don-hang' },
            ]}
          />

          <div>
            <h4 className="font-bold text-sm mb-3 text-white uppercase tracking-wide">Liên hệ</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-cps-red" />
                <span>123 Nguyễn Trãi, P.Bến Thành,<br />Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-cps-red" />
                <div>
                  <p className="font-bold text-white">1900.2000</p>
                  <p className="text-[10px]">Hotline miễn phí</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-cps-red" />
                <span>cskh@techvibe.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>© 2026 TechVibe. Tất cả quyền được bảo lưu. GPKD: 0123456789</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-white">Điều khoản sử dụng</Link>
            <Link href="#" className="hover:text-white">Sơ đồ trang</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-bold text-sm mb-3 text-white uppercase tracking-wide">{title}</h4>
      <ul className="space-y-2 text-xs text-neutral-400">
        {items.map(item => (
          <li key={item.label}>
            <Link href={item.href} className="hover:text-cps-red transition-colors">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}