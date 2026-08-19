import { createServerSupabase } from '@/lib/supabase-server'
import { Users, Mail, Phone, Calendar, Award } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminCustomersPage() {
  const supabase = await createServerSupabase()
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="font-bold text-lg">Danh sách khách hàng</h2>
        <p className="text-sm text-neutral-500">{profiles?.length || 0} khách hàng đã đăng ký</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {profiles && profiles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-600 text-xs uppercase">
                <tr>
                  <th className="px-5 py-3 text-left">Khách hàng</th>
                  <th className="px-5 py-3 text-left">SĐT</th>
                  <th className="px-5 py-3 text-right">Điểm tích lũy</th>
                  <th className="px-5 py-3 text-center">Hạng</th>
                  <th className="px-5 py-3 text-left">Ngày tham gia</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {profiles.map((p: any) => (
                  <tr key={p.id} className="hover:bg-neutral-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e30019] to-[#f26522] flex items-center justify-center text-white font-bold">
                          {(p.full_name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{p.full_name || 'Chưa cập nhật'}</p>
                          <p className="text-xs text-neutral-500">{p.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm">{p.phone || '—'}</td>
                    <td className="px-5 py-3 text-right font-bold">{p.loyalty_points?.toLocaleString() || 0}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        p.tier === 'diamond' ? 'bg-purple-100 text-purple-700' :
                        p.tier === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                        p.tier === 'silver' ? 'bg-gray-200 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {p.tier === 'diamond' ? '💎 Kim cương' :
                         p.tier === 'gold' ? '🥇 Vàng' :
                         p.tier === 'silver' ? '🥈 Bạc' : '🥉 Đồng'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-neutral-500">
                      {new Date(p.created_at).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-3 text-neutral-300" />
            <p className="text-neutral-500 mb-2">Chưa có khách hàng đăng ký</p>
            <p className="text-xs text-neutral-400">Khách hàng sẽ xuất hiện sau khi đăng ký tài khoản</p>
          </div>
        )}
      </div>
    </div>
  )
}