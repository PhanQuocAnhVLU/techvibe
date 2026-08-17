# TechStore - E-Commerce Electronics System
## Spec Document v1.1 | 17/08/2026

---

## 1. Design Reference: CellphoneS / Thế Giới Di Động Style

### Visual Identity
- **Primary Color**: `#CA1F28` (Đỏ nội bật - TGDD/CellphoneS brand color)
- **Secondary Color**: `#1A1A1A` (Đen - tech, premium feel)
- **Accent**: `#FFD600` (Vàng - flash sale, khuyến mãi)
- **Background**: `#F5F5F5` (Xám nhạt)
- **Card Background**: `#FFFFFF` (Trắng)
- **Text Primary**: `#1A1A1A`
- **Text Secondary**: `#666666`
- **Border**: `#E0E0E0`

### Typography
- **Display/Heading**: `Be Vietnam Pro` (Bold 700) - Vietnamese-friendly glow font
- **Body**: `Inter` (Regular 400, Medium 500)
- **Price**: `Be Vietnam Pro` (Bold) - numbers must be bold
- **Size Scale**: 12px / 14px / 16px / 18px / 24px / 32px / 40px

### Layout System
- **Container**: max-width 1280px, padding 0 16px
- **Grid**: 12 columns, gap 16px
- **Border Radius**: 8px (cards), 4px (buttons), 50% (avatars)
- **Shadows**: `0 2px 8px rgba(0,0,0,0.08)` (cards), `0 4px 16px rgba(0,0,0,0.12)` (hover)

---

## 2. Project Structure (Monorepo)

```
techstore/
├── apps/
│   ├── web/                    # Customer Frontend (Next.js 14)
│   │   ├── app/
│   │   │   ├── page.tsx                    # Homepage
│   │   │   ├── san-pham/
│   │   │   │   ├── [category]/page.tsx     # Product listing
│   │   │   │   └── [category]/[slug]/page.tsx # Product detail
│   │   │   ├── gio-hang/page.tsx           # Cart
│   │   │   ├── thanh-toan/page.tsx         # Checkout
│   │   │   ├── auth/
│   │   │   │   ├── login/page.tsx          # Login
│   │   │   │   └── register/page.tsx        # Register
│   │   │   └── tai-khoan/
│   │   │       ├── page.tsx                # Account overview
│   │   │       ├── don-hang/page.tsx        # Orders list
│   │   │       ├── don-hang/[id]/page.tsx   # Order detail
│   │   │       └── yeu-thich/page.tsx       # Wishlist
│   │   ├── components/
│   │   │   ├── ui/                         # Button, Badge, Rating
│   │   │   ├── product/                     # ProductCard
│   │   │   └── layout/                     # Header, Footer, MobileBottomNav
│   │   ├── stores/
│   │   │   └── cart-store.ts               # Zustand stores
│   │   └── lib/
│   │       ├── utils.ts                     # Helpers
│   │       ├── types.ts                     # TypeScript types
│   │       └── data.ts                      # Mock data
│   │
│   └── admin/                   # Admin Portal (Next.js 14)
│       ├── app/page.tsx                     # Dashboard
│       └── components/admin-sidebar.tsx
│
├── SPEC.md
└── README.md
```

---

## 3. Completed Features

### Customer Web (Customer-facing)
| Trang | Route | Trạng thái |
|-------|-------|-------------|
| Homepage | `/` | ✅ Hoàn thiện |
| Product Listing | `/san-pham/[category]` | ✅ Hoàn thiện |
| Product Detail | `/san-pham/[category]/[slug]` | ✅ Hoàn thiện |
| Cart | `/gio-hang` | ✅ Hoàn thiện |
| Checkout | `/thanh-toan` | ✅ Hoàn thiện |
| Login | `/auth/login` | ✅ Hoàn thiện |
| Register | `/auth/register` | ✅ Hoàn thiện |
| Account Overview | `/tai-khoan` | ✅ Hoàn thiện |
| Orders List | `/tai-khoan/don-hang` | ✅ Hoàn thiện |
| Order Detail | `/tai-khoan/don-hang/[id]` | ✅ Hoàn thiện |
| Wishlist | `/tai-khoan/yeu-thich` | ✅ Hoàn thiện |

### Components
| Component | Mô tả |
|-----------|--------|
| `Header` | Sticky header với search, cart badge, category nav |
| `Footer` | Full footer với links, contact info, social |
| `MobileBottomNav` | Bottom navigation cho mobile |
| `ProductCard` | Card hiển thị sản phẩm với price, rating, badges |
| `Button` | Button với variants: primary, secondary, ghost, outline |
| `Badge` | Badge với variants: discount, new, bestseller, flash |
| `RatingStars` | Hiển thị rating với stars |

### State Management
| Store | Mô tả |
|-------|--------|
| `useCartStore` | Quản lý giỏ hàng (add, remove, update quantity) |
| `useWishlistStore` | Quản lý wishlist (add, remove, check) |

---

## 4. Pending Features

### Phase 2: Backend & API
- [ ] API routes (Next.js Route Handlers)
- [ ] Database schema (PostgreSQL + MongoDB)
- [ ] Authentication (NextAuth.js)
- [ ] Payment integration (VNPay, MoMo, ZaloPay)
- [ ] Shipping integration (GHN, GHTK)
- [ ] Real-time notifications (WebSocket)

### Phase 3: Advanced Features
- [ ] Search with Elasticsearch
- [ ] Product comparison
- [ ] Price history chart
- [ ] Advanced filtering with faceted search
- [ ] Recommendation engine
- [ ] Flash sale system
- [ ] Loyalty points system
- [ ] Multi-vendor support

### Phase 4: Admin Portal
- [ ] Product management (CRUD)
- [ ] Order management
- [ ] Inventory management
- [ ] Promotion management
- [ ] User management (RBAC)
- [ ] Reports & Analytics
- [ ] CMS for banners & content

---

## 5. API Endpoints Structure

```
GET  /api/products?category=&brand=&price_min=&price_max=&sort=&page=
GET  /api/products/[slug]
POST /api/cart
POST /api/orders
POST /api/auth/login
POST /api/auth/register
POST /api/payments/vnpay
POST /api/payments/momo
GET  /api/shipping/fee?province=&district=&weight=
```

---

## 6. Sample Data

### Brands
- Apple, Samsung, Xiaomi, OPPO, vivo, Realme, ASUS, Dell, HP, Lenovo

### Categories
1. Điện thoại (Smartphones)
2. Tablet (Tablets)
3. Laptop (Laptops)
4. Đồng hồ (Smartwatches)
5. Tai nghe (Headphones)
6. Loa (Speakers)
7. Phụ kiện (Accessories)
8. Tivi (Smart TV)
9. Gia dụng (Home Appliances)
10. Máy ảnh (Cameras)

---

*Document follows CellphoneS.com.vn and thegioidong.com.vn design patterns*
