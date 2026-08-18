'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  time: string
}

const initialMessages: Message[] = [
  { id: 1, text: 'Xin chào! 👋 Tôi có thể giúp gì cho bạn?', sender: 'bot', time: 'Vừa xong' },
]

const quickReplies = [
  'Tư vấn iPhone',
  'Trạng thái đơn hàng',
  'Chính sách bảo hành',
  'Trả góp 0%',
]

const botResponses: Record<string, string> = {
  'Tư vấn iPhone': 'Bạn đang quan tâm iPhone nào ạ? Hiện tại chúng tôi có iPhone 15 Pro Max 256GB giá 32.990.000đ - giảm 6% 📱',
  'Trạng thái đơn hàng': 'Bạn vui lòng cung cấp mã đơn hàng để tra cứu nhé! 📦',
  'Chính sách bảo hành': 'Tất cả sản phẩm được bảo hành chính hãng 12-24 tháng tại các trung tâm ủy quyền 🛡️',
  'Trả góp 0%': 'Chúng tôi hỗ trợ trả góp 0% lãi suất với thẻ tín dụng từ 24 ngân hàng 💳',
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    if (isOpen) setUnread(0)
  }, [isOpen])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      time: 'Vừa xong',
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Simulate bot reply
    setTimeout(() => {
      const reply = botResponses[text] || 'Cảm ơn bạn đã liên hệ! Nhân viên sẽ phản hồi trong giây lát 🙏'
      const botMsg: Message = {
        id: Date.now() + 1,
        text: reply,
        sender: 'bot',
        time: 'Vừa xong',
      }
      setMessages(prev => [...prev, botMsg])
      if (!isOpen) setUnread(prev => prev + 1)
    }, 800)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 ${
          isOpen ? 'bg-gray-700' : 'bg-[#ca3838]'
        }`}
        aria-label="Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-[#363636] text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                {unread}
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up" style={{ maxHeight: '500px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#ca3838] to-orange-500 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <p className="font-semibold">Hỗ trợ trực tuyến</p>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  Đang hoạt động
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ minHeight: '300px', maxHeight: '320px' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#ca3838] text-white rounded-br-sm'
                      : 'bg-white text-gray-700 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length <= 4 && (
            <div className="px-4 py-2 bg-gray-50 border-t flex gap-2 overflow-x-auto">
              {quickReplies.map(reply => (
                <button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="whitespace-nowrap px-3 py-1.5 bg-white border rounded-full text-xs hover:bg-[#fef6f6] hover:border-[#ca3838] hover:text-[#ca3838]"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none focus:border-[#ca3838]"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-9 h-9 bg-[#ca3838] text-white rounded-full flex items-center justify-center hover:bg-[#b32f2f] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}