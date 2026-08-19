# TechVibe - Hệ thống E-Commerce bán đồ điện tử

Clone hoàn chỉnh theo phong cách CellphoneS / Thế Giới Di Động.

**Live demo:**
- Web (khách hàng): https://techvibe-web.vercel.app
- Admin: https://techvibe-admin.vercel.app

---

## 🚀 Hướng dẫn deploy lên Vercel

Repo này là **monorepo** với 2 project Next.js độc lập. Bạn cần import GitHub repo này lên Vercel **2 lần** để tạo 2 project:

### 1. Web (khách hàng)
- Vào https://vercel.com/new
- Import repo `PhanQuocAnhVLU/techvibe`
- **Project Name**: `techvibe-web`
- **Root Directory**: `apps/web`  ← **BẮT BUỘC** chọn cái này
- Framework: Next.js (auto detect)
- **Environment Variables** (xem bảng bên dưới)
- Click **Deploy**

### 2. Admin
- Vào https://vercel.com/new
- Import cùng repo `PhanQuocAnhVLU/techvibe`
- **Project Name**: `techvibe-admin`
- **Root Directory**: `apps/admin`
- Framework: Next.js
- **Environment Variables** (giống web)
- Click **Deploy**

> ⚠️ Vercel miễn phí chỉ cho deploy Hobby plan với 1 domain/subdomain cho mỗi project. Hai project sẽ ra 2 URL khác nhau.

---

## 🔐 Environment Variables

Thêm vào **cả 2 project** (web + admin):

| Key | Value | Ghi chú |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxx.supabase.co` | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR...` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR...` | Service role key (ch� admin cần để bypass RLS) |

Lấy 3 giá trị này ở: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api

---

## 📁 Cấu trúc dự án

```
techvibe/
├── apps/
│   ├── web/           # Customer Frontend (Next.js 14, port 3000)
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── ...
│   │
│   └── admin/         # Admin Portal (Next.js 14, port 3001)
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── ...
│
├── PHAN_*.sql         # SQL migrations cho Supabase (chạy theo thứ tự)
├── SPEC.md            # Design spec
└── vercel.json        # Vercel config (root)
```

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand + React hooks
- **DB**: Supabase (PostgreSQL + Auth + Storage + RLS)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Slider**: Swiper

---

## � Design System

| Token | Value | Mô tả |
|---|---|---|
| Primary | `#e30019` | Đỏ nội bật (TGDD style) |
| Accent | `#FFD600` | Vàng flash sale |
| Background | `#F5F5F5` | Xám nhạt |

---

## ✨ Tính năng

### Khách hàng (`apps/web`)
- ✅ Homepage (Hero slider, Flash sale, Quick view, Mini cart)
- ✅ Danh sách sản phẩm + filter
- ✅ Chi tiết sản phẩm (gallery, specs, reviews, variants)
- ✅ So sánh sản phẩm
- ✅ Gi� hàng + Coupon
- ✅ Checkout 4-step
- ✅ Tài khoản (đơn hàng, yêu thích, địa chỉ)
- ✅ Đăng ký/Đăng nhập (Supabase Auth)
- ✅ Tin tức công nghệ
- ✅ Mobile bottom nav, Sticky filter bar

### Admin (`apps/admin`)
- ✅ Dashboard (doanh thu chart, stats)
- ✅ Quản lý sản phẩm (CRUD + upload ảnh Supabase Storage)
- ✅ Quản lý đơn hàng (status, export CSV)
- ✅ Quản lý danh mục, thương hiệu, banner, tin tức
- ✅ Quản lý khách hàng
- ✅ Responsive

---

## 🗄 Database Setup

1. Tạo project tại https://supabase.com
2. Vào **SQL Editor** → chạy tuần tự các file:
   - `PHAN_1_SCHEMA.sql` (schema + tables)
   - `PHAN_2_SEED.sql` (sample data)
   - `PHAN_3_STORAGE.sql` (storage bucket)
   - `PHAN_4_AUTH.sql` (RLS + auth policies)
   - `PHAN_5_RPC.sql` (functions)
3. Vào **SQL Editor** → tạo admin user:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

---

## 🛠 Local Development

```bash
# Clone
git clone https://github.com/PhanQuocAnhVLU/techvibe.git
cd techvibe

# Install
npm install

# Copy env
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
# Sửa .env.local với Supabase credentials của bạn

# Run web (terminal 1)
cd apps/web
npm run dev  → http://localhost:3000

# Run admin (terminal 2)
cd apps/admin
npm run dev  → http://localhost:3001
```

---

## 📄 License

MIT
