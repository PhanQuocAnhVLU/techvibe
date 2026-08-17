'use client'

import Link from 'next/link'
import { ChevronRight, Award, Users, Package, ShieldCheck, Target, Heart, Sparkles, MapPin, Phone, Mail } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-2xl">T</span>
            </div>
            <div>
              <span className="font-bold text-xl text-[#363636]">Tech</span>
              <span className="font-bold text-xl text-[#ca3838]">Store</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#363636]">Giới thiệu</span>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#ca3838] to-[#ff6b35] rounded-lg p-12 text-white text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Về TechStore</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
            Hệ thống bán lẻ điện tử hàng đầu Việt Nam với hơn 10 năm kinh nghiệm
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: 'Khách hàng', value: '500K+' },
            { icon: Package, label: 'Sản phẩm', value: '10K+' },
            { icon: MapPin, label: 'Cửa hàng', value: '50+' },
            { icon: Award, label: 'Năm kinh nghiệm', value: '10+' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <s.icon className="w-10 h-10 text-[#ca3838] mx-auto mb-2" />
              <p className="text-3xl font-bold text-[#363636]">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-8">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#363636] mb-3">Sứ mệnh</h2>
            <p className="text-gray-600 leading-relaxed">
              Mang đến cho khách hàng những sản phẩm công nghệ chính hãng với chất lượng tốt nhất, giá cả hợp lý và dịch vụ hoàn hảo. Chúng tôi cam kết trở thành người bạn đồng hành tin cậy trong hành trình trải nghiệm công nghệ.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8">
            <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#363636] mb-3">Tầm nhìn</h2>
            <p className="text-gray-600 leading-relaxed">
              Trở thành hệ thống bán lẻ điện tử số 1 Việt Nam và vươn ra khu vực Đông Nam Á. Không ngừng đổi mới, ứng dụng công nghệ để mang đến trải nghiệm mua sắm hiện đại và tiện lợi nhất.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#363636] mb-3">Giá trị cốt lõi</h2>
            <p className="text-gray-600 leading-relaxed">
              Chính trực - Chuyên nghiệp - Tận tâm - Đổi mới. Chúng tôi đặt khách hàng làm trung tâm, không ngừng cải thiện chất lượng sản phẩm và dịch vụ để mang đến sự hài lòng tuyệt đối.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#363636] mb-3">Cam kết</h2>
            <p className="text-gray-600 leading-relaxed">
              100% sản phẩm chính hãng. Bảo hành theo tiêu chuẩn nhà sản xuất. Đổi trả trong 30 ngày. Hoàn tiền nếu phát hiện hàng giả. Tư vấn miễn phí 24/7.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#363636] mb-6 text-center">Hành trình phát triển</h2>
          <div className="space-y-6">
            {[
              { year: '2014', title: 'Thành lập', desc: 'Cửa hàng đầu tiên tại TP.HCM' },
              { year: '2016', title: 'Mở rộng', desc: 'Phát triển 10 chi nhánh trên toàn quốc' },
              { year: '2018', title: 'Chuyển đổi số', desc: 'Ra mắt website thương mại điện tử' },
              { year: '2020', title: 'Vượt mốc', desc: '500,000 khách hàng trên toàn quốc' },
              { year: '2024', title: 'Hiện đại', desc: 'Trở thành hệ thống bán lẻ số 1 Việt Nam' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-20 h-20 bg-[#fef6f6] text-[#ca3838] rounded-full flex items-center justify-center font-bold shrink-0">
                  {item.year}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-[#363636]">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#363636] to-[#1a1a1a] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Trở thành đối tác của chúng tôi</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">Chúng tôi luôn tìm kiếm những đối tác xứng đáng để cùng phát triển. Hãy liên hệ ngay để tìm hiểu cơ hội hợp tác.</p>
          <Link href="/lien-he">
            <button className="bg-[#ca3838] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#b32f2f]">Liên hệ ngay</button>
          </Link>
        </div>
      </div>
    </div>
  )
}