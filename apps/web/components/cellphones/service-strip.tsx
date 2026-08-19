'use client'

import { Truck, Package, ShieldCheck, RotateCcw, Zap } from 'lucide-react'

const services = [
  { icon: Truck, title: 'Freeship 300K', desc: 'Đơn tối thiểu 300K', color: 'from-blue-500 to-cyan-500' },
  { icon: Zap, title: 'Giao siêu tốc 2h', desc: 'Nội thành HCM, HN', color: 'from-orange-500 to-red-500' },
  { icon: ShieldCheck, title: 'Bảo hành chính hãng', desc: '12-24 tháng', color: 'from-green-500 to-emerald-500' },
  { icon: RotateCcw, title: 'Đổi trả 30 ngày', desc: 'Không hỏi lý do', color: 'from-purple-500 to-pink-500' },
]

export function ServiceStrip() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white rounded-xl p-3 shadow-sm">
        {services.map((s, idx) => {
          const Icon = s.icon
          return (
            <div key={idx} className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
              <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-cps-text">{s.title}</p>
                <p className="text-[11px] text-neutral-500">{s.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}