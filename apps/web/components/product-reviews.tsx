'use client'

import { useEffect, useState } from 'react'
import { Star, MessageSquare } from 'lucide-react'
import { getProductReviews, createReview } from '@/lib/reviews'
import { supabase } from '@/lib/supabase'

export function ProductReviews({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    getProductReviews(productId).then(({ data }) => setReviews(data))
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) { setMessage('Vui lòng đăng nhập để đánh giá'); return }
    if (!content.trim()) return
    setSubmitting(true)
    const { data, error } = await createReview(productId, rating, content, user.id)
    setSubmitting(false)
    if (error) { setMessage(error.message); return }
    setReviews([data, ...reviews])
    setContent('')
    setRating(5)
    setMessage('Đánh giá thành công!')
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Write review */}
      {user && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Viết đánh giá của bạn
          </h3>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map(i => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                className={`w-8 h-8 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              >
                <Star className="w-full h-full fill-current" />
              </button>
            ))}
          </div>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Chia sẻ trải nghiệm của bạn..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#ca3838]"
          />
          {message && <p className={`text-xs ${message.includes('lỗi') || message.includes('đăng nhập') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
          <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#ca3838] text-white rounded-md text-sm font-medium disabled:opacity-50">
            {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
          </button>
        </form>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
                  {review.profile?.full_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-medium text-sm">{review.profile?.full_name || 'Người dùng'}</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-xs text-gray-400 ml-2">{new Date(review.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}