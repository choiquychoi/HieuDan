# HỒ SƠ TOÀN DIỆN DỰ ÁN & MASTER PROMPT — HIỆU ĐÀN ĐỨC NGÂN
> **TÀI LIỆU LỊCH SỬ PHÁT TRIỂN, BẢN ĐỒ KIẾN TRÚC HỆ THỐNG VÀ HƯỚNG DẪN BÀN GIAO TOÀN DIỆN CHO AI TIẾP TỤC DỰ ÁN**
> *Cập nhật: Tháng 8/2026 | Công nghệ: Next.js 16.3.1 (App Router, Turbopack) + React 19.2.8 + Tailwind CSS v4 + TypeScript 5*

---

## MỤC LỤC CHI TIẾT
1. [Tổng Quan Thương Hiệu & Dữ Liệu Thực Tế 100%](#1-tổng-quan-thương-hiệu--dữ-liệu-thực-tế-100)
2. [Hệ Thống Thiết Kế & Nhận Diện Thủ Công (Design System & 2-Font System)](#2-hệ-thống-thiết-kế--nhận-diện-thủ-công-design-system--2-font-system)
3. [Trang Chủ (Homepage): Chi Tiết 8 Phân Đoạn & Hero Exhibition Glide](#3-trang-chủ-homepage-chi-tiết-8-phân-đoạn--hero-exhibition-glide)
4. [Trang Chi Tiết Sản Phẩm Editorial Dossier (/products/[slug])](#4-trang-chi-tiết-sản-phẩm-editorial-dossier-productsslug)
5. [Trang Giới Thiệu / Về Đức Ngân (/about)](#5-trang-giới-thiệu--về-đức-ngân-about)
6. [Trang Liên Hệ Soft Aesthetics (/contact)](#6-trang-liên-hệ-soft-aesthetics-contact)
7. [Trang Tin Tức Văn Hóa & Tin Tức Tạp Chí (/news & /news/[slug])](#7-trang-cẩm-nang-văn-hóa--tin-tức-tạp-chí-news--newsslug)
8. [Hạ Tầng Tìm Kiếm & Modal Toàn Cục (Global Search & Modal Infrastructure)](#8-hạ-tầng-tìm-kiếm--modal-toàn-cục-global-search--modal-infrastructure)
9. [Bản Đồ Cấu Trúc File & Component Toàn Dự Án](#9-bản-đồ-cấu-trúc-file--component-toàn-dự-án)
10. [Bộ Dữ Liệu Thực Tế vs. Dữ Liệu Cấu Trúc (Data Integrity)](#10-bộ-dữ-liệu-thực-tế-vs-dữ-liệu-cấu-trúc-data-integrity)
11. [Hệ Thống Cuộn Quán Tính (Lenis Smooth Scroll) & Khóa Cuộn Chi Tiết](#11-hệ-thống-cuộn-quán-tính-lenis-smooth-scroll--khóa-cuộn-chi-tiết)
12. [Lịch Sử & Nhật Ký Phát Triển Chi Tiết (Changelog)](#12-lịch-sử--nhật-ký-phát-triển-chi-tiết-changelog)
13. [Lộ Trình Phát Triển Tiếp Theo (Roadmap)](#13-lộ-trình-phát-triển-tiếp-theo-roadmap)

---

## 1. TỔNG QUAN THƯƠNG HIỆU & DỮ LIỆU THỰC TẾ 100%

* **Tên thương hiệu:** Hiệu Đàn Đức Ngân
* **Thành lập:** Năm 1999 (25+ năm di sản chế tác nhạc cụ dân tộc)
* **Website gốc tham chiếu dữ liệu:** [https://hieudanducngan.com/](https://hieudanducngan.com/)
* **Địa chỉ Showroom & Xưởng chế tác:** 526 Điện Biên Phủ, Phường 11, Quận 10, TP. Hồ Chí Minh
* **Hotline tư vấn nghệ nhân:** `0903 990 020`
* **Email chính thức:** `sales@hieudanducngan.com`
* **Thời gian mở cửa Showroom:** 08:00 - 20:30 (Tất cả các ngày trong tuần)
* **Tôn chỉ nghệ nhân:** *“Âm thanh mộc mạc lưu giữ hồn quê và văn hóa ngàn đời của người Việt.”*

---

## 2. HỆ THỐNG THIẾT KẾ & NHẬN DIỆN THỦ CÔNG (DESIGN SYSTEM & 2-FONT SYSTEM)

* **Nền tối điện ảnh (Dark Walnut Cinematic):** `#140C08`, `#180F0B`, `#241711`, `#160E0A`
* **Nền sáng ngà thanh tao (Soft Ivory & Warm Wood):** `#FAF8F5`, `#FAF7F2`, `#FFFCF5`, `#F5F0E7`
* **Gỗ óc chó & Cẩm Lai (Walnut & Rosewood Accents):** `#3A2920`, `#453227`, `#2E2019`, `#1F1610`
* **Chỉ đồng & Ánh vàng hoàng kim (Bronze & Brass Highlights):** `#A68052`, `#8C6B3E`, `#B49368`, `#C5A880`, `#E5C398`
* **Hệ 2 Phông Chữ:**
  * `font-display` / Cormorant Garamond: Tiêu đề lớn, tên nhạc cụ, tiêu đề bài viết tạp chí.
  * `font-sans` / Inter: Thân bài, nhãn category, thông số, ngày tháng, nút bấm CTA.

---

## 3. TRANG CHỦ (HOMEPAGE): HERO EXHIBITION GLIDE ARCHITECTURE

### Hero Stage Carousel & In-Place Detail Glide (`src/components/home/InstrumentHero/`)
* **Chuyển động liên tục 1 vật thể (Physical In-Place Glide):**
  * Khi người dùng nhấp vào nhạc cụ trung tâm hoặc nút "Xem thông tin & âm sắc":
    1. Nhạc cụ trung tâm lướt êm ái sang trái màn hình (`lg:-translate-x-[20vw] xl:-translate-x-[22vw]`) với đường cong chuyển động `700ms cubic-bezier(0.22, 1, 0.36, 1)`.
    2. Nhạc cụ xem trước hai bên và các nút mũi tên chuyển mờ sang `opacity-0 invisible`.
    3. Nút đóng `✕` xuất hiện độc lập ở góc trên bên phải.
    4. Hồ sơ thông tin (`InstrumentDetailOverlay`) trượt vào từ bên phải (`opacity-100 translate-x-0`).
    5. Cột điều khiển dọc 4 mục (**Giới thiệu**, **Âm thanh**, **Chất liệu**, **Chế tác**) hiển thị ở rìa phải với sắc đồng sang trọng.
    6. Các chấm điều hướng carousel ở dưới cùng luôn hiển thị và tương tác được.
  * Khi đóng (`✕` hoặc `Escape`):
    1. Hồ sơ thông tin trượt mờ sang phải.
    2. Nhạc cụ trung tâm lướt ngược trở lại vị trí chính giữa màn hình (`translate-x-0`).
    3. Các mũi tên điều hướng, nhạc cụ hai bên và nút CTA phục hồi mượt mà.

---

## 4. TRANG CHI TIẾT SẢN PHẨM EDITORIAL DOSSIER (/products/[slug])

* **SSG Pre-rendering:** 18 sản phẩm thực tế được biên dịch tĩnh hoàn toàn.
* **Bộ sưu tập đa ảnh & Lightbox toàn màn hình:**
  * Lightbox toàn màn hình `z-[100]` nền đen nhung sâu thẳm `#0D0907`/95 phủ đè 100% Header và Viewport.
  * Hỗ trợ điều hướng đa ảnh (Next, Prev, Thumbnails, Esc).
* **Dải Nghe Thử Âm Sắc (ProductListeningStrip):** 28 cột sóng âm dao động hữu cơ kèm âm thanh thu âm từ nghệ nhân.
* **Quy trình đặt mua:** Thêm vào giỏ hàng (`CartDrawer`), chọn số lượng, bảo hành âm thanh trọn đời.

---

## 5. TRANG GIỚI THIỆU / VỀ ĐỨC NGÂN (/about)

* **Hero Di Sản 25+ Năm:** Triết lý thủ công truyền đời từ 1999.
* **Bộ sưu tập 6 Loại Gỗ Âm Học:** Mun Hoa, Cẩm Lai, Gõ Đỏ, Trắc Đỏ Đen, Ngô Đồng, Tre Già Bọc Đồng với thông số âm học và hình ảnh chụp macro.
* **Quy Trình 4 Bước Chế Tác:** Tầm Gỗ $\to$ Gia Công & Cẩn Xà Cừ $\to$ Thẩm Âm Nghệ Nhân $\to$ Dưỡng Đàn.

---

## 6. TRANG LIÊN HỆ SOFT AESTHETICS (/contact)

* **Đồng bộ 100% dữ liệu Showroom:** Địa chỉ `526 Điện Biên Phủ, P. 11, Q. 10, TP.HCM`, Giờ mở cửa, Hotline `0903 990 020`, Email `sales@hieudanducngan.com`.
* **Bản đồ nhúng Google Maps chính xác:** Tích hợp trực tiếp Google Maps Place ID chính thức của Hiệu Đàn Đức Ngân.
* **Căn chỉnh hoàn hảo:** Các icon huy hiệu tròn và nội dung thông tin showroom được căn giữa hoàn hảo theo trục dọc (`items-center`).

---

## 7. TRANG Tin Tức VĂN HÓA & TIN TỨC TẠP CHÍ (/news & /news/[slug])

* **Danh sách tạp chí văn hóa:** Bộ lọc 4 chuyên mục di sản, phân trang tạp chí, thẻ bài viết chuẩn Editorial.
* **Trang đọc bài viết chi tiết:** Header thanh nhã, trích dẫn âm học gỗ, gợi ý bài viết liên quan và banner ghé thăm xưởng.

---

## 8. TRANG DANH MỤC SẢN PHẨM HIỆU SUẤT CAO CHUẨN TONELAB (/products)

* **Thanh Bộ Lọc Cố Định Thông Minh (`CatalogueSidebarFilters.tsx`):**
  * Ghim cố định khi cuộn trang (`sticky top-24`).
  * **Cây Danh Mục (Category Tree):** Đầy đủ bộ đếm số lượng tác phẩm thực tế (*Tất cả (18)*, *Đàn Bầu (3)*, *Đàn Kìm (3)*, *Đàn Sến (3)*, *Đàn Tranh (3)*, *Đàn Tỳ Bà (3)*, *Đàn Violin (3)*).
  * **Bộ Lọc Đa Chiều (Multi-Facet Accordions):**
    * *Khoảng giá:* Dưới 5 triệu, 5tr – 10 triệu, 10tr – 20 triệu, Trên 20 triệu.
    * *Tình trạng hàng:* Sẵn hàng tại Showroom Q10, Tác phẩm nghệ nhân tuyển chọn.
  * **Nút Xóa Lọc Tức Thì (Clear All Filters):** Tự động xuất hiện khi có bất kỳ bộ lọc nào đang hoạt động.
  * **Ngăn Kéo Bộ Lọc Di Động (Mobile Filter Drawer):** Trượt mượt mà trên màn hình nhỏ.
* **Thanh Công Cụ Bộ Sưu Tập (`CatalogueToolbar.tsx`):**
  * Hiển thị số lượng tác phẩm tương ứng theo thời gian thực.
  * **Bộ Chuyển Đổi Bố Cục:** Chuyển đổi tức thì giữa **Lưới 3 cột**, **Lưới 4 cột** và **Dạng danh sách (List View)**.
  * **Sắp Xếp:** *Nghệ nhân tuyển chọn*, *Giá: Thấp đến Cao*, *Giá: Cao đến Thấp*, *Tên: A đến Z*.
* **Thẻ Tác Phẩm Đổi Góc Ảnh & Nghiêng 3D (`CatalogueProductCard.tsx` & `CatalogueProductListRow.tsx`):**
  * **3D Cursor Gyroscope & Specular Liquid-Gold Sheen:** Card và ảnh nhạc cụ nghiêng 3D vi tế (`rotateX`, `rotateY`, `translateY(-4px)`) theo tọa độ chuột trong không gian 1000px perspective, kết hợp dải ánh sáng vàng ánh đồng mềm mại quét qua mặt gỗ và xà cừ.
  * **Secondary Image Hover Swap (300ms ease-in-out):** Tự động chuyển đổi mượt mà giữa ảnh chính và ảnh chi tiết/cận cảnh khi di chuột.
  * **Huy hiệu:** *Tuyển chọn*, *Thủ công*, *Sẵn hàng*.
  * **Hành Động Trực Tiếp:** Liên kết trực tiếp xem hồ sơ tác phẩm (`/products/[slug]`) và nút thêm nhanh vào giỏ hàng ngay trên thẻ.

---

## 9. HẠ TẦNG TÌM KIẾM & MODAL TOÀN CỤC

1. **Thanh Tìm Kiếm Header (`SearchTrigger.tsx`):**
   * Phân biệt rõ ràng giữa nút **"Xóa nội dung"** (`<CircleX size={15} />`) và nút **"Đóng tìm kiếm"** (`<X size={16} />`) kèm đường kẻ ngăn cách tinh tế (`h-4 w-px bg-[#554134]`).
2. **Hạ Tầng Modal React Portal (`ModalPortal.tsx` & `modal-base.tsx`):**
   * Quản lý z-index `z-[100]`, khóa cuộn nền, gắn trực tiếp vào `document.body` an toàn hydration.

---

## 10. HẠ TẦNG SEO TOÀN DIỆN & SẴN SÀNG PRODUCTION (DEPLOYMENT READY)

1. **Sitemap Động (`src/app/sitemap.ts`):** Tự động phát sinh `sitemap.xml` chuẩn cho 36+ trang (Trang tĩnh + 18 sản phẩm + 6 bài viết tạp chí) với tần suất cập nhật và độ ưu tiên index.
2. **Robots.txt Chuẩn SEO (`src/app/robots.ts`):** Cho phép toàn bộ công cụ tìm kiếm thu thập dữ liệu, bảo vệ đường dẫn nội bộ và chỉ định trực tiếp sitemap.
3. **Web App Manifest (`src/app/manifest.ts`):** Khai báo PWA, theme color `#241711`, hỗ trợ lưu ứng dụng vào màn hình chính điện thoại.
4. **Cấu Trúc Dữ Liệu Rich Snippets (JSON-LD Schemas):**
   * **`MusicStore` / `Store` / `LocalBusiness` (`JsonLd.tsx`):** Khai báo địa chỉ 526 Điện Biên Phủ, Quận 10, tọa độ GPS, hotline, giờ mở cửa, danh mục kinh doanh.
   * **`WebSite` (`JsonLd.tsx`):** Tích hợp Sitelinks Searchbox (`SearchAction`).
   * **`Product` Schema (`products/[slug]/page.tsx`):** Tự động sinh schema chuẩn Google Shopping cho từng cây đàn (tên, ảnh, giá VNĐ, tình trạng sẵn hàng, thương hiệu).
   * **`NewsArticle` Schema (`news/[slug]/page.tsx`):** Khai báo bài viết tạp chí âm nhạc cho Google Discover.
   * **`BreadcrumbList` Schema:** Cấu trúc phân cấp đường dẫn chuẩn Google Rich Results.
5. **Cấu Hình Bảo Mật & Nén (`next.config.ts`):**
   * Nén ảnh tự động sang định dạng thế hệ mới `AVIF` và `WebP`.
   * Thiết lập HTTP Security Headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`.
   * Caching bất biến 1 năm cho tài nguyên hình ảnh tĩnh (`/images/`).

---

## 10. BẢN ĐỒ CẤU TRÚC FILE & COMPONENT TOÀN DỰ ÁN

```
src/
├── app/
│   ├── globals.css                # Biến màu, textures, Lenis CSS, font settings
│   ├── layout.tsx                 # Root layout tích hợp phông chữ Inter + Cormorant Garamond
│   ├── page.tsx                   # Trang chủ (Homepage) tích hợp 8 sections
│   ├── about/page.tsx             # Trang Giới thiệu / Về Đức Ngân (Di sản 25+ năm & 6 loại gỗ)
│   ├── contact/page.tsx           # Trang liên hệ soft aesthetics tích hợp bản đồ nhúng
│   ├── news/
│   │   ├── page.tsx               # Trang danh sách Tin Tức tạp chí văn hóa
│   │   └── [slug]/page.tsx        # Trang đọc bài viết chi tiết Editorial Magazine (SSG)
│   ├── products/
│   │   ├── page.tsx               # Trang danh mục sản phẩm điện ảnh (/products)
│   │   └── [slug]/page.tsx        # Trang chi tiết sản phẩm Editorial Dossier (SSG 18 items)
│
├── components/
│   ├── home/
│   │   ├── InstrumentHero/        # Hero carousel & detail glide
│   │   ├── Categories/            # Lưới danh mục trang chủ
│   │   ├── FeaturedProducts/      # Kệ sản phẩm tiêu biểu
│   │   ├── ArtisanStory/          # Chuyện nghề nghệ nhân
│   │   ├── CulturalHeritage/      # Văn hóa & 4 loại gỗ di sản
│   │   ├── StudioListeningStrip/  # Phòng nghe âm sắc 24bit Master
│   │   ├── WorkshopJournal/       # Nhật ký từ xưởng
│   │   └── TestimonialsAndShowroom/# Tri âm & Showroom 526 Điện Biên Phủ
│   ├── catalogue/
│   │   ├── CatalogueView.tsx          # Bộ điều phối trang danh mục ToneLab
│   │   ├── CatalogueSidebarFilters.tsx# Bộ lọc cố định đa chiều (gỗ, giá, tình trạng)
│   │   ├── CatalogueToolbar.tsx       # Bộ chuyển đổi lưới 3 cột/4 cột/danh sách & sắp xếp
│   │   ├── CatalogueProductCard.tsx   # Thẻ sản phẩm với ảnh phụ đổi góc 300ms
│   │   ├── CatalogueProductListRow.tsx# Thẻ sản phẩm dạng danh sách (List View)
│   │   └── CatalogueQuickViewModal.tsx# Modal xem nhanh đa ảnh & chọn số lượng
│   ├── products/
│   │   ├── ProductDossierView.tsx     # Hồ sơ chi tiết sản phẩm & lightbox
│   │   └── ProductListeningStrip.tsx  # Dải nghe thử âm sắc
│   ├── layout/
│   │   ├── Header/                # Header sticky ghim đỉnh kèm SearchTrigger & CartTrigger
│   │   └── Footer/                # Chân trang màu nâu óc chó sẫm #241711
│   ├── cart/CartDrawer.tsx        # Ngăn kéo giỏ hàng trượt mượt mà
│   ├── ui/
│   │   ├── modal-base.tsx         # Component base modal toàn cục
│   │   ├── ModalPortal.tsx        # React Portal an toàn SSR/hydration
│   │   ├── CornerOrnament.tsx     # Họa tiết góc đàn & cẩn xà cừ
│   │   └── BrandDivider.tsx       # Đường phân cách chỉ đồng nghệ nhân
│   └── providers/SmoothScrollProvider.tsx # Provider quản lý Lenis & khóa cuộn tự động
```

---

## 11. BỘ DỮ LIỆU THỰC TẾ (DATA INTEGRITY)

* `src/data/products.ts`: 18 nhạc cụ dân tộc chuẩn mực với hình ảnh PNG cutout, thông số âm học, giá niêm yết.
* `src/data/categories.ts`: 6 dòng nhạc cụ chính (Đàn Bầu, Đàn Kìm, Đàn Sến, Đàn Tranh, Đàn Tỳ Bà, Đàn Violin).
* `src/data/instruments.ts`: 6 dòng nhạc cụ chính trên Hero Carousel.
* `src/data/navigation.ts`: Điều hướng menu, thông tin showroom chuẩn xác (`SHOWROOM_INFO`).
* `src/data/news.ts` & `src/data/stories.ts`: Tuyển tập Tin Tức văn hóa và câu chuyện di sản 25+ năm.

---

## 12. HỆ THỐNG CUỘN QUÁN TÍNH (LENIS) & KHÓA CUỘN NỀN

* Tích hợp `lenis` với hệ số lerp mượt mà `0.062`.
* Tự động phát hiện thay đổi `document.body.style.overflow` thông qua `MutationObserver`:
  * Khi mở Detail Mode / QuickView / Modal / Drawer: `lenis.stop()` kích hoạt ngay lập tức, ngăn chặn hoàn toàn việc cuộn trang nền.
  * Khi đóng: `lenis.start()` phục hồi tức thì.
  * Sử dụng `data-lenis-prevent` trên các vùng cuộn nội bộ.

---

## 13. LỊCH SỬ & NHẬT KÝ PHÁT TRIỂN CHI TIẾT (CHANGELOG)

* **Phiên bản 3.1 (Tháng 8/2026):**
  * Tự động dịch chuyển tức thì (Teleport viewport `(0, 0)`) lên đỉnh trang chủ ngay khi kích hoạt chế độ xem chi tiết nhạc cụ (`InstrumentDetailOverlay`), đảm bảo toàn bộ sân khấu và nút đóng (`X`) luôn hiển thị 100% trong tầm mắt người dùng.
  * Ghim nút đóng cố định (`fixed top-3 right-3 sm:top-5 sm:right-6 lg:top-6 lg:right-10 z-[80]`) ngăn chặn mọi nguy cơ bị che khuất do cuộn trang.
  * Tái cấu trúc trang danh mục sản phẩm theo phong cách **ToneLab** (`CatalogueView.tsx`): Bộ lọc cố định đa chiều (dòng nhạc cụ, khoảng giá, tình trạng), bộ chuyển đổi bố cục 3 cột / 4 cột / danh sách, đổi góc ảnh phụ tức thì 300ms khi hover.
  * Đồng bộ và sửa chữa toàn bộ liên kết điều hướng Footer, Header TopBar, Breadcrumbs và Giỏ hàng.
  * Nâng cấp **Mega-Dropdown "Nhạc cụ"** ([`DesktopNavigation.tsx`](file:///C:/dev/Hieu/duc-ngan-music/src/components/layout/Header/DesktopNavigation.tsx)): Mở rộng không gian hiển thị 2 cột (`540px`) kèm ảnh thu nhỏ và subtitle của từng dòng đàn; triệt tiêu hoàn toàn khe hở hover (Zero-Gap Hover Bridge) cùng bộ đệm 180ms giúp rê chuột mượt mà không bao giờ bị mất menu.

---

## 14. LỘ TRÌNH PHÁT TRIỂN TIẾP THEO (ROADMAP)

1. **Trang Thanh Toán & Tư Vấn Đặt Đàn (`/cart` & `/checkout`):** Quy trình đặt hẹn nghệ nhân và thanh toán đơn hàng.
2. **Bộ Lọc Nâng Cao Theo Chất Liệu Gỗ:** Hỗ trợ lọc theo Mun, Cẩm Lai, Gõ Đỏ, Trắc trên trang danh mục.
