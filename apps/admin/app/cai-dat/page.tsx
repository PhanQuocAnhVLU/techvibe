'use client'

import { useState } from 'react'
import { Settings, User, Bell, Lock, Globe, Mail, CreditCard, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'security', label: 'Bảo mật', icon: Lock },
    { id: 'store', label: 'Cửa hàng', icon: Globe },
    { id: 'payment', label: 'Thanh toán', icon: CreditCard },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-500">Quản lý cài đặt tài khoản và cửa hàng</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <div className="bg-white rounded-lg p-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-6">Thông tin hồ sơ</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">A</span>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Đổi ảnh</Button>
                    <p className="text-sm text-gray-500 mt-2">JPG, PNG. Tối đa 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      defaultValue="Admin"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="admin@techstore.vn"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      defaultValue="0912 345 678"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                    <input
                      type="text"
                      defaultValue="Quản trị viên"
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                  <textarea
                    rows={3}
                    defaultValue="123 Nguyễn Trãi, Q.1, TP.HCM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-6">Cài đặt thông báo</h2>
              <div className="space-y-4">
                {[
                  { label: 'Thông báo đơn hàng mới', desc: 'Nhận email khi có đơn hàng mới' },
                  { label: 'Thông báo thanh toán', desc: 'Nhận email khi có thanh toán thành công' },
                  { label: 'Cảnh báo tồn kho', desc: 'Nhận thông báo khi sản phẩm sắp hết hàng' },
                  { label: 'Email marketing', desc: 'Nhận email về khuyến mãi và cập nhật' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-6">Bảo mật tài khoản</h2>
              <div className="space-y-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Mật khẩu</p>
                      <p className="text-sm text-gray-500">Thay đổi mật khẩu định kỳ để bảo vệ tài khoản</p>
                    </div>
                    <Button variant="outline" size="sm">Đổi mật khẩu</Button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Xác thực 2 yếu tố (2FA)</p>
                      <p className="text-sm text-gray-500">Tăng cường bảo mật với xác thực 2 bước</p>
                    </div>
                    <Button variant="outline" size="sm">Kích hoạt</Button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Phiên đăng nhập</p>
                      <p className="text-sm text-gray-500">Xem và quản lý các phiên đăng nhập</p>
                    </div>
                    <Button variant="outline" size="sm">Xem phiên</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'store' && (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-6">Cài đặt cửa hàng</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên cửa hàng</label>
                  <input
                    type="text"
                    defaultValue="TechStore"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                  <textarea
                    rows={3}
                    defaultValue="Cửa hàng công nghệ hàng đầu Việt Nam"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hotline</label>
                  <input
                    type="tel"
                    defaultValue="1900 1234"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                  <input
                    type="text"
                    defaultValue="123 Nguyễn Trãi, Q.1, TP.HCM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-6">Cài đặt thanh toán</h2>
              <div className="space-y-4">
                {[
                  { name: 'Thanh toán khi nhận hàng (COD)', enabled: true },
                  { name: 'Thẻ tín dụng/Ghi nợ', enabled: true },
                  { name: 'Ví MoMo', enabled: true },
                  { name: 'VNPay', enabled: false },
                  { name: 'ZaloPay', enabled: false },
                ].map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <p className="font-medium text-gray-900">{method.name}</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={method.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
