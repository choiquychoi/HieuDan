# HƯỚNG DẪN PHÁT TRIỂN & VẬN HÀNH KỸ THUẬT (DEVELOPER & OPERATIONS GUIDE)
> **Dự án:** Nền tảng Số & Cổng Thông tin Di sản Hiệu Đàn Đức Ngân  
> **Dành cho:** Kỹ sư phần mềm (Frontend / Fullstack), Kỹ sư DevOps và Quản trị viên vận hành  
> **Mã nguồn:** Next.js 16.3.1 (Turbopack) · React 19.2.8 · Tailwind CSS v4 · TypeScript 5 · pnpm 11.21.0

---

## 1. YÊU CẦU MÔI TRƯỜNG PHÁT TRIỂN (DEVELOPMENT PREREQUISITES)

Để đảm bảo mã nguồn biên dịch đồng nhất và không phát sinh lỗi phiên bản, môi trường máy phát triển của lập trình viên cần đáp ứng:

- **Node.js:** Phiên bản `>= 20.12.0 LTS` (Khuyến nghị Node.js 22 LTS).
- **Trình quản lý gói (Package Manager):** `pnpm` phiên bản `11.21.0` (Dự án đã khóa phiên bản thông qua trường `packageManager: "pnpm@11.21.0"` trong `package.json`).
- **Trình soạn thảo mã nguồn:** VS Code hoặc JetBrains WebStorm với các plugin:
  - ESLint
  - Tailwind CSS IntelliSense
  - PostCSS Language Support

---

## 2. HƯỚNG DẪN CÀI ĐẶT & KHỞI CHẠY (GETTING STARTED)

### 2.1. Cài đặt các gói phụ thuộc
Mở terminal tại thư mục gốc của dự án (`c:\dev\Hieu\duc-ngan-music`):
```bash
# Cài đặt toàn bộ dependencies thông qua pnpm
pnpm install
```

### 2.2. Khởi chạy máy chủ phát triển (Development Server)
```bash
# Khởi chạy Next.js dev server với Turbopack
pnpm dev
```
Truy cập trình duyệt tại địa chỉ: `http://localhost:3000`.

### 2.3. Kiểm tra chất lượng mã nguồn & Linter
```bash
# Quét lỗi cú pháp và quy chuẩn mã nguồn với ESLint
pnpm lint

# Kiểm tra kiểu dữ liệu tĩnh nghiêm ngặt
pnpm tsc --noEmit
```

### 2.4. Đóng gói sản phẩm biên dịch (Production Build)
```bash
# Biên dịch sản phẩm tĩnh & SSR tối ưu hóa
pnpm build

# Khởi chạy thử nghiệm bản build sản xuất cục bộ
pnpm start
```

---

## 3. QUY CHUẨN THIẾT KẾ & HỆ THỐNG GIAO DIỆN (DESIGN SYSTEM CONVENTIONS)

Mọi kỹ sư khi phát triển tính năng hoặc component mới bắt buộc phải tuân thủ nghiêm ngặt hệ thống nhận diện thủ công của Hiệu Đàn Đức Ngân:

### 3.1. Hệ thống 2 Phông Chữ (2-Font System)
- **`font-display` / `font-serif` (Cormorant Garamond):**
  - Sử dụng cho: Tiêu đề trang, tên nhạc cụ, tiêu đề bài viết tạp chí, trích dẫn âm học nghệ nhân, số đếm La Mã chương ký sự.
  - Mang lại cảm giác cổ kính, thủ công, sang trọng và đậm chất di sản.
- **`font-sans` (Inter):**
  - Sử dụng cho: Nội dung văn bản thân bài, nhãn danh mục, thông số kỹ thuật gỗ, ngày tháng, nút bấm CTA và form liên hệ.
  - Mang lại độ sắc nét và khả năng đọc tối ưu trên mọi màn hình.

### 3.2. Bảng Mã Màu Nghệ Nhân (Color Palette)
- **Nền tối điện ảnh (Dark Walnut Cinematic):** `#140C08`, `#180F0B`, `#241711`, `#160E0A`. (Sử dụng cho Hero, Footer, Card mở rộng).
- **Nền sáng ngà thanh tao (Soft Ivory & Warm Wood):** `#FAF8F5`, `#FAF7F2`, `#FFFCF5`, `#F5F0E7`. (Sử dụng cho thân trang, danh mục, form).
- **Gỗ óc chó & Cẩm Lai (Walnut & Rosewood Accents):** `#3A2920`, `#453227`, `#2E2019`.
- **Chỉ đồng & Ánh vàng hoàng kim (Bronze & Brass Highlights):** `#A68052`, `#8C6B3E`, `#B49368`, `#C5A880`, `#E5C398`. (Dùng cho đường viền, icon, giá bán, nút highlight).

---

## 4. NGUYÊN TẮC LẬP TRÌNH & PHÒNG NGỪA LỖI (ENGINEERING GUIDELINES)

### 4.1. An toàn Hydration & Client Component State
Khi sử dụng dữ liệu từ `localStorage` (như giỏ hàng `CartContext` hoặc bộ nhớ đệm), **tuyệt đối không** sử dụng `useEffect` gây hiện tượng nhảy layout hoặc lỗi Hydration mismatch giữa Server và Client.
Hãy sử dụng hook chuẩn `useSyncExternalStore` của React 19:
```typescript
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function MyClientComponent() {
  const isMounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  if (!isMounted) return <SkeletonLoader />;
  return <RealContent />;
}
```

### 4.2. Quản lý Cuộn Mượt (Lenis Scroll) & Chống Xung Đột
- Trang web được điều khiển cuộn quán tính toàn cục bởi `SmoothScrollProvider.tsx`.
- **Quy tắc 1:** Khi mở bất kỳ Modal, Drawer hoặc Lightbox toàn màn hình, hãy thiết lập `document.body.style.overflow = "hidden"`. MutationObserver sẽ tự động dừng `lenis.stop()` để khóa trang nền.
- **Quy tắc 2:** Mọi khung chứa có thanh cuộn riêng (như iframe Google Maps, danh sách giỏ hàng, bảng thông số) **phải có thuộc tính `data-lenis-prevent`** để người dùng có thể cuộn nội bộ bình thường mà không kích hoạt cuộn cả trang web.

### 4.3. Quy chuẩn Tối ưu Hóa Hình Ảnh
- Mọi hình ảnh phải đặt trong thư mục `public/images/`.
- Luôn sử dụng component `Image` từ `next/image` kèm thuộc tính `sizes` và kích thước `width`/`height` rõ ràng nhằm triệt tiêu chỉ số giật cục giao diện CLS (Cumulative Layout Shift = 0).
- Hệ thống tự động nén ảnh sang định dạng `AVIF` và `WebP` với thời gian cache 1 năm bất biến thông qua cấu hình `next.config.ts`.

---

## 5. HƯỚNG DẪN TRIỂN KHAI VẬN HÀNH (DEPLOYMENT & OPERATIONS)

### 5.1. Triển khai trên Nền tảng Serverless (Vercel / Cloudflare Pages)
1. Kết nối kho lưu trữ GitHub của dự án với tài khoản Vercel của MESP/Khách hàng.
2. Thiết lập cấu hình Build & Output Settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `pnpm build`
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`
3. Khai báo các biến môi trường (Environment Variables) cần thiết:
   - `NEXT_PUBLIC_GA_ID`: Mã Google Analytics 4 (Ví dụ: `G-XXXXXXXXXX`).
   - `NEXT_PUBLIC_GSC_VERIFICATION`: Mã xác thực Google Search Console.

### 5.2. Triển khai trên Máy chủ Riêng / VPS Linux (Node.js + PM2 + Nginx)
Nếu triển khai trên gói Hosting/VPS Linux 5GB SSD theo cam kết kỹ thuật:
1. Cài đặt Node.js 20 LTS và PM2 trên máy chủ:
   ```bash
   npm install -g pm2 pnpm
   ```
2. Kéo mã nguồn và biên dịch:
   ```bash
   git clone <repo_url> /var/www/duc-ngan-music
   cd /var/www/duc-ngan-music
   pnpm install
   pnpm build
   ```
3. Khởi chạy ứng dụng với PM2:
   ```bash
   pm2 start npm --name "duc-ngan-music" -- start -- -p 3000
   pm2 save
   pm2 startup
   ```
4. Cấu hình Reverse Proxy Nginx trỏ tên miền `hieudanducngan.com` về cổng nội bộ `127.0.0.1:3000` kèm chứng chỉ bảo mật SSL Let's Encrypt miễn phí.

---

## 6. CHECKLIST NGHIỆM THU KỸ THUẬT BÀN GIAO (ACCEPTANCE AUDIT CHECKLIST)

Trước khi bàn giao sản phẩm phần mềm cho khách hàng, kỹ sư phải kiểm tra từng mục sau:

- [ ] Lệnh `pnpm build` chạy thành công 100%, không phát sinh cảnh báo TypeScript hoặc lỗi biên dịch tĩnh.
- [ ] Không có bất kỳ liên kết chết (Broken 404 links) nào trên toàn bộ Header, Footer và thân trang.
- [ ] Đường dẫn `/sitemap.xml` và `/robots.txt` truy cập được và trả về định dạng chuẩn.
- [ ] Cấu trúc dữ liệu JSON-LD kiểm tra qua Google Rich Results Test hợp lệ 100% cho `LocalBusiness`, `Store`, `Product`, `NewsArticle`.
- [ ] Hiển thị chính xác trên cả 3 màn hình: Điện thoại di động (iPhone / Android), Máy tính bảng (iPad) và Máy tính để bàn.
- [ ] Form gửi tin nhắn và Đặt hàng VietQR phản hồi nhanh dưới 1 giây.
- [ ] Bản đồ Google Maps tại 526 Điện Biên Phủ tải mượt mà và mở được chỉ đường.
