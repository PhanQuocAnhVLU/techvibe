import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

// Static export - never cached
export const dynamic = 'force-dynamic'

export async function GET() {
  const { data: orders, error } = await supabaseAdmin
    .from('orders')
    .select('*, items:order_items(*)')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Build CSV
  const headers = [
    'Mã đơn',
    'Ngày tạo',
    'Khách hàng',
    'SĐT',
    'Email',
    'Địa chỉ',
    'Tổng tiền',
    'Phí ship',
    'Giảm giá',
    'Trạng thái',
    'Thanh toán',
    'Sản phẩm',
    'Ghi chú',
  ]

  const rows = (orders ?? []).map((o: any) => {
    const itemsText = (o.items || []).map((it: any) =>
      `${it.product_name} x${it.quantity} (${formatVND(it.unit_price)})`
    ).join(' | ')

    const fullAddress = [
      o.shipping_address,
      o.shipping_ward,
      o.shipping_district,
      o.shipping_province,
    ].filter(Boolean).join(', ')

    return [
      o.code,
      new Date(o.created_at).toLocaleString('vi-VN'),
      o.shipping_name || '',
      o.shipping_phone || '',
      o.shipping_email || '',
      fullAddress,
      o.total || 0,
      o.shipping_fee || 0,
      o.discount || 0,
      o.status,
      o.payment_method || '',
      itemsText,
      o.note || '',
    ]
  })

  const csv = [
    headers.join(','),
    ...rows.map((r: any[]) => r.map((cell: any) =>
      // Escape quotes, commas, newlines
      `"${String(cell ?? '').replace(/"/g, '""').replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ).join(',')),
  ].join('\n')

  // Return CSV with BOM for Excel
  const bom = '\uFEFF'
  return new NextResponse(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="orders-${Date.now()}.csv"`,
    },
  })
}

function formatVND(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ'
}