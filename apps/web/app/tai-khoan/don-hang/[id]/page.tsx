import { notFound } from 'next/navigation'
import { getOrderByCode } from '@/lib/orders'
import { OrderDetail } from './order-detail'

export const dynamic = 'force-dynamic'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: order } = await getOrderByCode(id)
  if (!order) notFound()
  return <OrderDetail order={order} />
}