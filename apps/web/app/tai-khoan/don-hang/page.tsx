import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getUserOrders } from '@/lib/orders'
import { OrdersList } from './orders-list'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/login')

  const { data: orders } = await getUserOrders(user.id)
  return <OrdersList orders={orders} />
}