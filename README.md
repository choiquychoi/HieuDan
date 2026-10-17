# HIỆU ĐÀN ĐỨC NGÂN — CỔNG THÔNG TIN & THƯƠNG MẠI DI SẢN NHẠC CỤ DÂN TỘC
> **Công nghệ nền tảng:** Next.js 16.3.1 (App Router, Turbopack) + React 19.2.8 + Tailwind CSS v4 + TypeScript 5  
> **Di sản:** Gìn giữ và nâng tầm thanh âm nhạc cụ truyền thống Việt Nam từ năm 1999 (526 Điện Biên Phủ, Quận 10, TP.HCM).

---

## 1. TỔNG QUAN NỀN TẢNG PHẦN MỀM

Ứng dụng web hiệu năng cao được phát triển riêng biệt cho **Hiệu Đàn Đức Ngân**, kết hợp giữa mỹ thuật tạp chí văn hóa (Editorial Design) và trải nghiệm âm thanh mộc bản trực quan (Acoustic Sound Lab):

- **Hero Interactive Exhibition Glide:** Trải nghiệm chuyển động vật lý 1 vật thể lướt êm ái sang trái khi xem thông tin chi tiết mà không chuyển trang.
- **ToneLab Filter System:** Bộ lọc sản phẩm đa chiều theo dòng đàn, chất liệu gỗ quý, phân khúc giá và tình trạng sẵn hàng kèm góc nghiêng 3D con quay chuột.
- **Acoustic Soundstrip Visualizer:** Nghe thử âm sắc mộc 24-bit của 6 dòng đàn truyền thống (Đàn Bầu, Đàn Kìm, Đàn Sến, Đàn Tranh, Đàn Tỳ Bà, Đàn Violin).
- **Thương mại điện tử mộc bản:** Giỏ hàng toàn cục, xem nhanh QuickView và quy trình thanh toán tự động sinh mã VietQR Napas 24/7.
- **Hạ tầng SEO & Tối ưu hóa:** Tiền biên dịch tĩnh SSG toàn bộ 18 nhạc cụ, sitemap XML động, robots.txt và hệ thống Schema JSON-LD phong phú chuẩn Google.

---

## 2. HỆ THỐNG TÀI LIỆU KỸ THUẬT DỰ ÁN (DOCUMENTATION SUITE)

Toàn bộ tài liệu kỹ thuật phần mềm, đặc tả yêu cầu và báo cáo kiểm toán tiến độ được lưu trữ tập trung tại thư mục [`docs/`](./docs/):

| Tệp tài liệu | Nội dung chính |
|---|---|
| 📊 **[docs/01_GAP_ANALYSIS_PROGRESS_REPORT.md](./docs/01_GAP_ANALYSIS_PROGRESS_REPORT.md)** | **Báo cáo kiểm toán tiến độ & Phân tích khoảng cách:** Đối chiếu thực tế mã nguồn với 12 cam kết kỹ thuật của bản báo giá MESP, định lượng % hoàn thành (~51.2%) và chi tiết các tính năng còn thiếu. |
| 📑 **[docs/02_SOFTWARE_REQUIREMENTS_SPECIFICATION_SRS.md](./docs/02_SOFTWARE_REQUIREMENTS_SPECIFICATION_SRS.md)** | **Tài liệu đặc tả yêu cầu phần mềm (SRS):** Soạn thảo theo chuẩn ISO/IEC/IEEE 29148, đặc tả chi tiết 10 yêu cầu chức năng (FR) và 5 yêu cầu phi chức năng (NFR). |
| 🏛️ **[docs/03_SOFTWARE_ARCHITECTURE_AND_TDD.md](./docs/03_SOFTWARE_ARCHITECTURE_AND_TDD.md)** | **Tài liệu kiến trúc & thiết kế kỹ thuật (TDD):** Sơ đồ phân tầng, mô hình dữ liệu Type Contracts, cơ chế Lenis scroll lock và đề xuất giải pháp kiến trúc CMS. |
| 🗺️ **[docs/04_TECHNICAL_ROADMAP_AND_IMPLEMENTATION_PLAN.md](./docs/04_TECHNICAL_ROADMAP_AND_IMPLEMENTATION_PLAN.md)** | **Lộ trình kỹ thuật 5 giai đoạn:** Kế hoạch thực thi chi tiết để lập trình bù đắp các tính năng còn thiếu, đưa phần mềm lên 100% cam kết. |
| 🛠️ **[docs/05_DEVELOPER_OPERATIONS_GUIDE.md](./docs/05_DEVELOPER_OPERATIONS_GUIDE.md)** | **Hướng dẫn phát triển & vận hành (SOP):** Yêu cầu môi trường (Node.js 20+, pnpm), quy chuẩn 2-Font system, hướng dẫn build, deploy và checklist nghiệm thu. |

---

## 3. KHỞI CHẠY DỰ ÁN CỤC BỘ (LOCAL SETUP)

Yêu cầu môi trường: **Node.js >= 20.12.0 LTS** và **pnpm 11.21.0**.

```bash
# 1. Cài đặt các gói phụ thuộc
pnpm install

# 2. Khởi chạy máy chủ phát triển
pnpm dev

# 3. Kiểm tra kiểm tra cú pháp & type linter
pnpm lint
pnpm tsc --noEmit

# 4. Đóng gói sản phẩm cho production
pnpm build
pnpm start
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để trải nghiệm sản phẩm.
