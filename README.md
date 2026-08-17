# TechStore - Hệ thống E-Commerce bán đồ điện tử

Clone hoàn chỉnh theo phong cách CellphoneS / Thế Giới Di Động.

## 🚀 Quick Start

```bash
# Install dependencies
cd techstore
npm install

# Run customer web
npm run dev

# Run admin portal (separate terminal)
cd apps/admin
npm run dev
```

## 📁 Cấu trúc dự án

```
techstore/
├── apps/
│   ├── web/           # Customer Frontend (Next.js 14)
│   │   ├── app/
│   │   │   ├── page.tsx                    # Homepage
│   │   │   ├── san-pham/[category]/        # Product listing
│   │   │   ├── san-pham/[category]/[slug]/ # Product detail
│   │   │   ├── gio-hang/                    # Cart
│   │   │   └── thanh-toan/                  # Checkout
│   │   ├── components/
│   │   │   ├── ui/                         # Button, Badge, Rating
│   │   │   ├── product/                     # ProductCard
│   │   │   └── layout/                     # Header, Footer
│   │   └── lib/
│   │       ├── utils.ts                     # Helpers
│   │       ├── types.ts                     # TypeScript types
│   │       └── data.ts                      # Mock data
│   │
│   └── admin/        # Admin Portal (Next.js 14)
│       ├── app/
│       │   └── page.tsx                    # Dashboard
│       └── components/
│           └── admin-sidebar.tsx
│
└── SPEC.md           # Design specification
```

## 🎨 Design System

| Token | Value | Mô tả |
|-------|-------|--------|
| Primary | `#CA1F28` | Đỏ nội bật (TGDD style) |
| Accent | `#FFD600` | Vàng flash sale |
| Background | `#F5F5F5` | Xám nhạt |
| Font | Be Vietnam Pro | Tiếng Việt |

## ✨ Tính năng đã xây dựng

### Customer Web
- [x] Homepage (Hero slider, Flash sale, Categories)
- [x] Product Listing với filter đa chiều
- [x] Product Detail với gallery, variants, specs, reviews
- [x] Shopping Cart với coupon
- [x] Checkout 4-step flow

### Admin Portal
- [x] Dashboard với stats & charts
- [x] Sidebar navigation
- [x] Recent orders table
- [x] Top products list

## 📱 Tiếp theo

- [ ] Authentication (Login/Register)
- [ ] User Account pages
- [ ] Order tracking
- [ ] Wishlist
- [ ] API integration
- [ ] Database (PostgreSQL + MongoDB)
- [ ] Payment integration (VNPay, MoMo)
- [ ] Shipping integration (GHN, GHTK)

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React hooks
- **Icons**: Lucide React

## 📄 License

MIT
