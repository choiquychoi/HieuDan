# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SOFTWARE REQUIREMENTS SPECIFICATION — SRS)
> **Dự án:** Nền tảng Số & Cổng Thông tin Di sản Hiệu Đàn Đức Ngân  
> **Mã tài liệu:** SRS-HDDN-2026-V1  
> **Phiên bản:** 1.0 (Dựa trên kiến trúc Next.js 16.3.1 App Router + React 19.2.8)  
> **Tiêu chuẩn áp dụng:** ISO/IEC/IEEE 29148:2018 (Systems and software engineering — Requirements engineering)  
> **Phạm vi kỹ thuật:** Đặc tả toàn bộ yêu cầu chức năng (FR), phi chức năng (NFR), mô hình dữ liệu và quy trình nghiệp vụ phần mềm.

---

## 1. GIỚI THIỆU TỔNG QUAN (INTRODUCTION)

### 1.1. Mục đích tài liệu
Tài liệu này xác định chi tiết và chính thức các yêu cầu chức năng, yêu cầu phi chức năng, kiến trúc tương tác và ràng buộc kỹ thuật của nền tảng phần mềm **Hiệu Đàn Đức Ngân**. Tài liệu phục vụ cho:
- Đội ngũ kỹ sư phát triển phần mềm (Frontend, Backend, CMS).
- Kỹ sư kiểm thử chất lượng (QA/QC).
- Quản trị viên hệ thống và bộ phận vận hành nội dung.

### 1.2. Phạm vi hệ thống (System Scope)
Hệ thống là một ứng dụng web hiệu năng cao (High-performance Web Application) kết hợp cổng thông tin di sản thủ công và thương mại điện tử mộc bản độc lập, bao gồm 2 phân hệ chính:
1. **Phân hệ Người dùng công khai (Public Portal):** Giới thiệu di sản văn hóa 25+ năm, trải nghiệm âm sắc trực quan của 6 dòng nhạc cụ dân tộc (Đàn Bầu, Đàn Kìm, Đàn Sến, Đàn Tranh, Đàn Tỳ Bà, Đàn Violin), tra cứu Tin Tức, nghe thử âm thanh 24-bit, tìm kiếm sản phẩm, gửi đánh giá trải nghiệm và đặt mua nhạc cụ có tích hợp VietQR.
2. **Phân hệ Quản trị nội dung (CMS/Admin System):** Tiếp nhận thông tin liên hệ, phê duyệt đánh giá khách hàng (Review Moderation), quản lý danh mục nhạc cụ, cập nhật bài viết Tin Tức và quản lý banner khuyến mãi.

### 1.3. Định nghĩa thuật ngữ (Definitions & Acronyms)
- **SSG (Static Site Generation):** Phương thức tiền biên dịch mã nguồn thành HTML tĩnh tại thời điểm build để đạt tốc độ tải tức thì.
- **ToneLab Filter:** Hệ thống lọc sản phẩm đa chiều theo dòng đàn, chất gỗ, phân khúc giá và tình trạng sẵn hàng.
- **Physical In-Place Glide:** Cơ chế chuyển động của Hero Carousel: khi xem chi tiết, nhạc cụ trượt êm ái sang trái màn hình mà không chuyển trang hay tải lại DOM.
- **JSON-LD Schema:** Cấu trúc dữ liệu có cấu trúc nhúng vào HTML phục vụ Google Rich Results.
- **VietQR Napas 24/7:** Tiêu chuẩn mã phản hồi nhanh ngân hàng quốc gia, tự động nhúng số tiền và mã đơn hàng.

---

## 2. MÔ TẢ TỔNG QUAN HỆ THỐNG (OVERALL DESCRIPTION)

### 2.1. Phân loại người dùng (User Personas)
| Vai trò | Mô tả nghiệp vụ | Đặc quyền hệ thống |
|---|---|---|
| **Khách vãng lai (Visitor)** | Người yêu âm nhạc dân tộc, học viên nhạc viện, khách du lịch trong và ngoài nước. | Xem trang chủ, nghe thử âm sắc, tra cứu sản phẩm, đọc bài viết Tin Tức văn hóa, tìm đường đến Showroom, chuyển đổi ngôn ngữ Việt - Anh. |
| **Khách mua hàng (Buyer)** | Khách hàng có nhu cầu sở hữu nhạc cụ hoặc đặt chế tác theo yêu cầu. | Thêm đàn vào giỏ hàng, tùy chỉnh số lượng, đặt hàng trực tuyến, quét mã VietQR tự động, gửi biểu mẫu đánh giá 1-5 sao kèm ảnh chụp. |
| **Quản trị viên (Admin/Artisan)** | Nghệ nhân xưởng đàn hoặc nhân viên phụ trách nội dung của Đức Ngân. | Đăng nhập hệ thống CMS, cập nhật sản phẩm, giá bán, duyệt/xóa đánh giá của khách hàng, quản lý banner khuyến mãi và xuất dữ liệu đơn hàng. |

### 2.2. Môi trường vận hành (Operating Environment)
- **Nền tảng máy chủ (Hosting & Runtime):** Node.js 20 LTS trở lên, máy chủ Linux (Ubuntu/Debian) hoặc nền tảng Serverless/Edge (Vercel, Cloudflare, Node Docker container).
- **Trình duyệt mục tiêu (Target Browsers):** Google Chrome (≥ v100), Apple Safari (≥ v15 trên macOS & iOS), Cốc Cốc (≥ v95), Mozilla Firefox (≥ v100), Microsoft Edge (≥ v100).
- **Thiết bị hiển thị:** Màn hình di động từ 360px (iPhone SE, Galaxy A), máy tính bảng 768px - 1024px (iPad), màn hình máy tính để bàn 1280px - 1920px (Full HD) và 4K.

---

## 3. ĐẶC TẢ CÁC YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS — FR)

### FR-01: Quản lý hiển thị Trang chủ & Hero Interactive Exhibition
- **FR-01.1:** Hệ thống phải hiển thị Carousel 6 dòng nhạc cụ đại diện trên nền điện ảnh gỗ óc chó sẫm (`#140C08`).
- **FR-01.2:** Khi người dùng nhấp vào nhạc cụ hoặc nút "Xem thông tin & âm sắc", hệ thống kích hoạt hiệu ứng **Physical In-Place Glide**:
  - Nhạc cụ trung tâm lướt sang trái (`lg:-translate-x-[20vw]`) với đường cong chuyển động `700ms cubic-bezier(0.22, 1, 0.36, 1)`.
  - Hai nhạc cụ phụ và mũi tên điều hướng mờ dần (`opacity-0`).
  - Khung hồ sơ thông tin trượt vào từ bên phải hiển thị 4 tab: Giới thiệu, Âm thanh, Chất liệu, Chế tác.
  - Tự động cuộn trang (Teleport Viewport) về đỉnh `(0, 0)` để khung nhìn hiển thị trọn vẹn 100%.
- **FR-01.3:** Tích hợp khóa cuộn nền (Lenis scroll locking) khi overlay thông tin đang mở, ngăn chặn trang web cuộn ngầm.
- **FR-01.4:** Khi nhấn phím `Escape` hoặc nút `✕`, hệ thống phải hoàn nguyên vị trí trung tâm mượt mà.

### FR-02: Danh mục sản phẩm ToneLab & Bộ lọc đa chiều (/products)
- **FR-02.1:** Hiển thị toàn bộ danh sách 18+ nhạc cụ truyền thống được phân loại theo 6 danh mục cốt lõi.
- **FR-02.2:** Thanh bộ lọc cố định (`CatalogueSidebarFilters.tsx`):
  - Ghim khi cuộn trang (`sticky top-24`).
  - Lọc theo dòng đàn (Đàn Bầu, Đàn Kìm, Đàn Sến, Đàn Tranh, Đàn Tỳ Bà, Đàn Violin) kèm bộ đếm số lượng thực tế.
  - Lọc theo khoảng giá: Dưới 5 triệu, 5tr - 10 triệu, 10tr - 20 triệu, Trên 20 triệu.
  - Lọc theo tình trạng: Sẵn hàng tại Showroom Q10, Tuyển chọn nghệ nhân.
  - Nút "Xóa tất cả bộ lọc" tự động kích hoạt khi có điều kiện lọc đang chạy.
- **FR-02.3:** Thanh công cụ bộ sưu tập (`CatalogueToolbar.tsx`):
  - Chuyển đổi hiển thị linh hoạt 3 chế độ: Lưới 3 cột, Lưới 4 cột, Dạng danh sách (List View).
  - Sắp xếp theo: Tuyển chọn, Giá tăng dần, Giá giảm dần, Tên A-Z.
- **FR-02.4:** Thẻ sản phẩm 3D Gyroscope & Đổi ảnh phụ:
  - Thẻ sản phẩm nghiêng 3D vi tế (`rotateX`, `rotateY`) theo tọa độ chuột trong không gian 1000px perspective.
  - Tự động chuyển đổi sang ảnh chi tiết/cận cảnh thứ hai sau `300ms` khi người dùng rê chuột (hover).
  - Hỗ trợ nút xem nhanh (QuickView Modal) mở xem đa ảnh và tùy chọn mua ngay không cần rời trang.

### FR-03: Hồ sơ chi tiết sản phẩm Editorial Dossier (/products/[slug])
- **FR-03.1:** Pre-render tĩnh hoàn toàn 18 trang chi tiết theo slug URL chuẩn SEO.
- **FR-03.2:** Bộ sưu tập đa ảnh & Lightbox toàn màn hình:
  - Khung ảnh chính sắc nét kèm danh sách thumbnail điều hướng.
  - Lightbox toàn màn hình phủ `z-[100]` nền đen nhung `#0D0907`/95 hỗ trợ zoom, next/prev và đóng bằng phím ESC.
- **FR-03.3:** Dải nghe thử âm sắc nghệ nhân (`ProductListeningStrip`):
  - Mô phỏng 28 cột sóng âm dao động hữu cơ bằng CSS/JS.
  - Tích hợp trình phát âm thanh thực tế với các thao tác Play/Pause, thanh tiến trình và điều chỉnh âm lượng.
- **FR-03.4:** Bảng thông số âm học chi tiết: Chất liệu thùng đàn, mặt đàn, phím cần, dây đàn, xuất xứ và chế độ bảo hành.
- **FR-03.5:** Tự động sinh thẻ Schema JSON-LD định dạng `Product` chuẩn Google Shopping cho từng sản phẩm.

### FR-04: Tin Tức văn hóa & Ký sự di sản (/news & /stories)
- **FR-04.1:** Trang `/stories` hiển thị 4 chương ký sử chuyện nghề:
  - Chương I: Chuyện Của Gỗ Quý & Ngô Đồng.
  - Chương II: Dấu Ấn Bàn Tay Thợ & Chạm Khảm Xà Cừ.
  - Chương III: Đàn Bầu Đức Ngân - Hồn Âm Vượt Sóng.
  - Chương IV: Điểm Hẹn Showroom 526 Điện Biên Phủ.
- **FR-04.2:** Trang `/news`: Bộ lọc 4 chuyên mục di sản, danh sách bài viết dạng tạp chí nghệ thuật.
- **FR-04.3:** Trang chi tiết bài viết `/news/[slug]`: Typography chuẩn Editorial, trích dẫn âm học, thanh tiến trình đọc và gợi ý bài viết liên quan.

### FR-05: Giỏ hàng & Thanh toán tự động sinh VietQR (/cart)
- **FR-05.1:** Giỏ hàng toàn cục (`CartContext`):
  - Thêm, sửa số lượng, xóa sản phẩm khỏi giỏ hàng.
  - Tự động lưu trữ danh sách giỏ hàng vào `localStorage` để giữ nguyên trạng thái khi người dùng tải lại trang.
  - Ngăn kéo giỏ hàng trượt mượt mà từ cạnh phải (`CartDrawer.tsx`).
- **FR-05.2:** Biểu mẫu thanh toán đặt hàng:
  - Thông tin người nhận: Họ tên, Email, Số điện thoại, Địa chỉ, Tỉnh/Thành phố, Ghi chú khắc tên/lời chúc.
  - Hỗ trợ 3 phương thức thanh toán: COD (Tiền mặt), VietQR Napas 24/7, Thẻ tín dụng/ghi nợ.
- **FR-05.3:** Tự động phát sinh mã QR VietQR:
  - Khi chọn VietQR, hệ thống tự động sinh ảnh QR Napas từ cổng `img.vietqr.io` với số tài khoản Vietcombank của Hiệu Đàn Đức Ngân.
  - Mã QR tự động điền chính xác số tiền tổng thanh toán (`orderedTotal`) và cú pháp nội dung chuyển khoản (`DH-[MÃ ĐƠN] - [SĐT]`).
- **FR-05.4:** Màn hình xác nhận đơn hàng thành công với 3 bước quy trình nghệ nhân lên tiếng thủ công và giao hàng.

### FR-06: Form Hộp thư góp ý & Đánh giá trải nghiệm 1-5 sao có kiểm duyệt
- **FR-06.1:** Biểu mẫu gửi đánh giá của khách hàng:
  - Trường nhập Họ và tên (bắt buộc).
  - Trường nhập Số điện thoại liên hệ (bắt buộc, dùng để xác thực khách mua hàng).
  - Danh sách chọn (Dropdown) nhạc cụ đã sử dụng từ cơ sở dữ liệu.
  - Bộ chọn số sao đánh giá (1 sao đến 5 sao) tương tác trực quan.
  - Ô nhập nội dung cảm nhận chi tiết và góp ý nâng cao chất lượng.
  - Bộ chọn tải ảnh đính kèm (File upload) cho phép đính kèm ảnh nhạc cụ thực tế tại nhà khách hàng (hỗ trợ JPG, PNG, WebP).
- **FR-06.2:** Cơ chế kiểm duyệt (Moderation Pipeline):
  - Bản ghi đánh giá sau khi gửi sẽ có trạng thái mặc định là `status: "pending"`.
  - Quản trị viên trong CMS có quyền: Xem chi tiết ảnh/nội dung, Phê duyệt (`status: "approved"`), hoặc Từ chối/Xóa.
- **FR-06.3:** Hiển thị công khai:
  - Chỉ những đánh giá có trạng thái `approved` mới được hiển thị tại phân đoạn Đánh giá khách hàng trên Trang chủ hoặc Trang sản phẩm.

### FR-07: Hệ thống Banner nổi thông báo khuyến mãi có hạn (Floating Promotion)
- **FR-07.1:** Component banner nổi xuất hiện góc màn hình hoặc modal pop-up sau khi người dùng truy cập trang web 3 - 5 giây.
- **FR-07.2:** Hiển thị thông tin ưu đãi (ví dụ: "Tặng bộ phụ kiện bảo dưỡng & bao da cao cấp nhân dịp lễ").
- **FR-07.3:** Người dùng có thể nhấn nút đóng (`✕`). Hệ thống ghi nhớ trạng thái đóng vào `sessionStorage` hoặc `localStorage` trong 24 giờ để không gây phiền toái cho trải nghiệm duyệt web.

### FR-08: Hệ thống Đa ngôn ngữ (Song ngữ Tiếng Việt — Tiếng Anh)
- **FR-08.1:** Cung cấp bộ chuyển đổi ngôn ngữ (Language Switcher) trực quan trên Header và Footer (chuyển đổi giữa `VI` và `EN`).
- **FR-08.2:** Quản lý tập trung toàn bộ chuỗi giao diện (Labels, Buttons, Navigation, Metadata) thông qua từ điển cấu trúc `vi.json` và `en.json`.
- **FR-08.3:** Cung cấp trường dữ liệu song ngữ cho sản phẩm (Tên, mô tả ngắn, câu chuyện nghệ nhân) sẵn sàng cho việc nhập liệu bản dịch tiếng Anh.

### FR-09: Hệ thống Quản trị nội dung (CMS)
- **FR-09.1:** Giao diện đăng nhập quản trị viên an toàn.
- **FR-09.2:** Quản lý sản phẩm: Thêm mới, chỉnh sửa thông số, cập nhật giá bán, tải ảnh đại diện và ảnh phụ, chuyển đổi trạng thái còn hàng/hết hàng.
- **FR-09.3:** Quản lý bài viết tin tức và Tin Tức văn hóa: Trình soạn thảo trực quan, gắn thẻ chuyên mục, tải ảnh bìa.
- **FR-09.4:** Quản lý và kiểm duyệt đánh giá khách hàng (Phê duyệt hiển thị / Xóa bỏ).
- **FR-09.5:** Cập nhật thông tin hotline, giờ mở cửa Showroom và banner khuyến mãi.

### FR-10: Tích hợp Đa kênh liên hệ & Bản đồ dẫn đường
- **FR-10.1:** Nhúng iframe Google Maps chính thức của Showroom 526 Điện Biên Phủ, Quận 10 kèm nút gọi ứng dụng chỉ đường Navigation.
- **FR-10.2:** Tích hợp bộ nút liên hệ nổi đa kênh (Floating Speed Dial): Gọi Hotline `0903 990 020`, Nhắn tin Zalo nghệ nhân, Mở trang Facebook chính thức.
- **FR-10.3:** Tích hợp liên kết mạng xã hội chính thức ở chân trang với hiệu ứng hover màu đồng thương hiệu.

---

## 4. ĐẶC TẢ CÁC YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS — NFR)

### NFR-01: Hiệu năng & Chỉ số Web Thiết yếu (Core Web Vitals)
- **Largest Contentful Paint (LCP):** < 2.0 giây trên đường truyền mạng tiêu chuẩn 4G.
- **Cumulative Layout Shift (CLS):** = 0 (Triệt tiêu hiện tượng giật cục giao diện bằng việc khai báo kích thước ảnh và skeleton loading cố định).
- **Interaction to Next Paint (INP):** < 150ms đối với mọi thao tác mở modal, trượt drawer và lọc danh mục.
- **Tối ưu hóa hình ảnh:** Tự động chuyển đổi định dạng ảnh thế hệ mới `AVIF` và `WebP`, bộ nhớ đệm cache tĩnh `immutable` 1 năm.

### NFR-02: Thiết kế đáp ứng đa thiết bị (Responsive Standards)
- Đảm bảo 100% bố cục hiển thị hài hòa, không tràn viền ngang (`overflow-x: hidden`) trên mọi độ phân giải từ 360px đến 2560px.
- Kích thước vùng bấm (Touch Target) trên thiết bị di động tối thiểu `44px × 44px` cho các nút CTA, icon điều hướng và thanh trượt âm thanh.

### NFR-03: Bảo mật & An toàn thông tin
- Thiết lập bắt buộc các HTTP Security Headers trong phản hồi máy chủ:
  - `X-Content-Type-Options: nosniff` (Chống MIME sniffing).
  - `X-Frame-Options: SAMEORIGIN` (Chống tấn công Clickjacking).
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Làm sạch toàn bộ dữ liệu đầu vào (Input Sanitization) tại các form liên hệ và form đánh giá, chống tấn công XSS và SQL/NoSQL Injection.

### NFR-04: Tối ưu hóa công cụ tìm kiếm (Technical SEO)
- Tự động sinh tệp `sitemap.xml` động cập nhật theo thời gian thực mỗi khi có sản phẩm hoặc bài viết mới.
- Khai báo đầy đủ tệp `robots.txt` cho phép các công cụ tìm kiếm thu thập dữ liệu an toàn.
- Khai báo đầy đủ các lược đồ Schema JSON-LD (`MusicStore`, `Product`, `NewsArticle`, `BreadcrumbList`, `WebSite`).

### NFR-05: Khả năng vận hành & Bảo trì
- Mã nguồn viết bằng TypeScript nghiêm ngặt (`strict: true`), cấu trúc module hóa rõ ràng theo chuẩn Next.js App Router.
- Quy trình kiểm tra lỗi tĩnh (ESLint & TypeScript compiler) tự động kiểm soát chất lượng trước khi triển khai sản phẩm.

---

## 5. MA TRẬN TRUY VẾT YÊU CẦU (TRACEABILITY MATRIX)

| Mã Yêu cầu SRS | Tên Yêu cầu Phần mềm | Hạng mục Báo giá MESP | Tình trạng Hiện tại | Kế hoạch Thực thi |
|:---:|---|:---:|:---:|:---:|
| **FR-01** | Trang chủ & Hero Glide | Mục 1.1 - STT 1 | Đã hoàn thành 100% | Duy trì & Tối ưu hiệu năng |
| **FR-02** | Danh mục ToneLab & Lọc đa chiều | Mục 1.1 - STT 1 | Đã hoàn thành 100% | Duy trì |
| **FR-03** | Chi tiết sản phẩm & Dải âm sắc | Mục 1.1 - STT 1 | Đã hoàn thành 100% | Duy trì |
| **FR-04** | Ký sự & Tin Tức văn hóa | Mục 1.1 - STT 1 | Đã hoàn thành 100% | Duy trì |
| **FR-05** | Giỏ hàng & Thanh toán VietQR | Tính năng mở rộng cao cấp | Đã hoàn thành 95% | Bổ sung xác thực webhook |
| **FR-06** | Form Đánh giá 1-5 sao có kiểm duyệt | Mục 1.1 - STT 5 | **Chưa có (15%)** | **Lập trình bổ sung Phase 3** |
| **FR-07** | Banner nổi khuyến mãi | Mục 1.1 - STT 1 | **Chưa có (0%)** | **Lập trình bổ sung Phase 1** |
| **FR-08** | Đa ngôn ngữ Song ngữ Anh - Việt | Mục 1.1 - STT 12 | **Chưa có (0%)** | **Lập trình bổ sung Phase 2** |
| **FR-09** | Hệ thống CMS quản trị | Mục 1.1 - STT 4 | **Chưa có (10%)** | **Lập trình bổ sung Phase 4** |
| **FR-10** | Mạng xã hội & Bản đồ Maps | Mục 1.1 - STT 6 & 7 | Đã hoàn thành 80% | **Bổ sung Floating Speed Dial** |
| **NFR-01** | Hiệu năng Core Web Vitals | Mục 1.1 - STT 2 | Đã hoàn thành 100% | Duy trì |
| **NFR-04** | Kỹ thuật SEO & Schema | Mục 1.1 - STT 9 & 10 | Đã hoàn thành 95% | Đồng bộ hotline trong JsonLd |
| **NFR-07** | Điều hướng 301 Redirects | Mục 1.1 - STT 11 | **Chưa có (0%)** | **Lập trình bổ sung Phase 5** |
