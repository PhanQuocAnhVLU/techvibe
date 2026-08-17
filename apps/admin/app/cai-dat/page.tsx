'use client'

import { useState } from 'react'
import { User, Bell, Shield, Store, CreditCard, Globe, Save } from 'lucide-react'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'Cửa hàng', icon: Store },
    { id: 'account', label: 'Tài khoản', icon: User },
    { id: 'notification', label: 'Thông báo', icon: Bell },
    { id: 'payment', label: 'Thanh toán', icon: CreditCard },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'language', label: 'Ngôn ngữ', icon: Globe },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#363636] mb-6">Cài đặt</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <aside className="bg-white rounded-lg border overflow-hidden">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                activeTab === tab.id ? 'bg-[#fef6f6] text-[#ca3838] font-medium border-l-4 border-[#ca3838]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-lg border p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-[#363636] mb-4">Thông tin cửa hàng</h2>
              <FormField label="Tên cửa hàng" value="TechStore" />
              <FormField label="Slogan" value="Hệ thống bán lẻ điện tử hàng đầu Việt Nam" />
              <FormField label="Hotline" value="1800.2000" />
              <FormField label="Email" value="cskh@techstore.vn" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                <textarea rows={3} defaultValue="123 Nguyễn Trãi, P.Bến Thành, Q.1, TP.HCM" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                <textarea rows={4} defaultValue="TechStore là hệ thống bán lẻ điện tử..." className="w-full px-3 py-2 border rounded-md" />
              </div>
              <button className="bg-[#ca3838] text-white px-6 py-2 rounded-md hover:bg-[#b32f2f] flex items-center gap-2">
                <Save className="w-4 h-4" />
                Lưu thay đổi
              </button>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-[#363636] mb-4">Thông tin tài khoản</h2>
              <div className="flex items-center gap-4 pb-6 border-b">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ca3838] to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div>
                  <button className="bg-[#ca3838] text-white px-4 py-2 rounded-md text-sm">Đổi ảnh đại diện</button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG tối đa 2MB</p>
                </div>
              </div>
              <FormField label="Họ tên" value="Admin TechStore" />
              <FormField label="Email" value="admin@techstore.vn" />
              <FormField label="Số điện thoại" value="0987654321" />
              <button className="bg-[#ca3838] text-white px-6 py-2 rounded-md hover:bg-[#b32f2f] flex items-center gap-2">
                <Save className="w-4 h-4" />
                Cập nhật
              </button>
            </div>
          )}

          {activeTab === 'notification' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#363636] mb-4">Cài đặt thông báo</h2>
              {[
                'Đơn hàng mới',
                'Yêu cầu hoàn tiền',
                'Đánh giá mới',
                'Hết hàng',
                'Khách hàng mới đăng ký',
                'Báo cáo hàng tuần'
              ].map(item => (
                <label key={item} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span className="text-sm">{item}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </label>
              ))}
              <button className="bg-[#ca3838] text-white px-6 py-2 rounded-md hover:bg-[#b32f2f]">Lưu</button>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#363636] mb-4">Phương thức thanh toán</h2>
              {[
                { name: 'VNPay', enabled: true, desc: 'Cổng thanh toán VNPay' },
                { name: 'MoMo', enabled: true, desc: 'Ví điện tử MoMo' },
                { name: 'ZaloPay', enabled: true, desc: 'Ví điện tử ZaloPay' },
                { name: 'COD', enabled: true, desc: 'Thanh toán khi nhận hàng' },
                { name: 'Bank Transfer', enabled: false, desc: 'Chuyển khoản ngân hàng' },
              ].map(item => (
                <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ca3838]"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-[#363636] mb-4">Bảo mật</h2>
              <FormField label="Mật khẩu hiện tại" type="password" placeholder="Nhập mật khẩu" />
              <FormField label="Mật khẩu mới" type="password" placeholder="Nhập mật khẩu mới" />
              <FormField label="Xác nhận mật khẩu" type="password" placeholder="Nhập lại mật khẩu" />
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Xác thực 2 yếu tố</h3>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">Bật xác thực 2 yếu tố qua SMS</span>
                </label>
              </div>
              <button className="bg-[#ca3838] text-white px-6 py-2 rounded-md hover:bg-[#b32f2f]">Cập nhật</button>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#363636] mb-4">Ngôn ngữ và khu vực</h2>
              <FormField label="Ngôn ngữ" value="Tiếng Việt" type="select" />
              <FormField label="Múi giờ" value="(GMT+7) Hồ Chí Minh" type="select" />
              <FormField label="Đơn vị tiền tệ" value="VND (₫)" type="select" />
              <FormField label="Định dạng ngày" value="DD/MM/YYYY" type="select" />
              <button className="bg-[#ca3838] text-white px-6 py-2 rounded-md hover:bg-[#b32f2f]">Lưu</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FormField({ label, value, type = 'text', placeholder }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {type === 'select' ? (
        <select defaultValue={value} className="w-full px-3 py-2 border rounded-md">
          <option>{value}</option>
        </select>
      ) : (
        <input type={type} defaultValue={value} placeholder={placeholder} className="w-full px-3 py-2 border rounded-md" />
      )}
    </div>
  )
}