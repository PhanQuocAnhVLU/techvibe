import { supabase } from './supabase'

export interface CheckoutPayload {
  userId: string | null
  items: {
    product_id: number
    product_name: string
    product_image: string
    sku: string
    quantity: number
    unit_price: number
  }[]
  shipping: {
    name: string
    phone: string
    province: string
    district: string
    ward: string
    detail: string
  }
  paymentMethod: 'cod' | 'vnpay' | 'momo' | 'zalopay' | 'transfer'
  note?: string
  subtotal: number
  shippingFee: number
  discount: number
  total: number
}

export async function createOrder(payload: CheckoutPayload) {
  const code = `TV${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100)}`

  // 1. Insert order
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert({
      code,
      user_id: payload.userId,
      subtotal: payload.subtotal,
      shipping_fee: payload.shippingFee,
      discount: payload.discount,
      total: payload.total,
      payment_method: payload.paymentMethod,
      shipping_name: payload.shipping.name,
      shipping_phone: payload.shipping.phone,
      shipping_province: payload.shipping.province,
      shipping_district: payload.shipping.district,
      shipping_ward: payload.shipping.ward,
      shipping_detail: payload.shipping.detail,
      note: payload.note,
      status: 'pending',
    })
    .select()
    .single()

  if (orderErr) return { error: orderErr, order: null }

  // 2. Insert order items
  const items = payload.items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    product_image: item.product_image,
    sku: item.sku,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.unit_price * item.quantity,
  }))

  const { error: itemsErr } = await supabase.from('order_items').insert(items)
  if (itemsErr) return { error: itemsErr, order: null }

  return { order, error: null }
}

export async function getOrderByCode(code: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, items:order_items(*)`)
    .eq('code', code)
    .maybeSingle()
  return { data, error }
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, items:order_items(*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data: data ?? [], error }
}