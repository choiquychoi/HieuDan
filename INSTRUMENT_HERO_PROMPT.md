# PROMPT KIẾN TRÚC & TRIỂN KHAI PHÂN ĐOẠN: HERO SÂN KHẤU VẬT LÝ & CHUYỂN ĐỘNG ĐỒNG BỘ 5 VỊ TRÍ

> **Mục đích:** Hướng dẫn chi tiết cho AI / Developer về cơ chế chuyển động trượt 5 vị trí đồng bộ trong Hero (`useHeroCarousel`, `HeroStageCarousel`, `HeroStageItem`).

---

```markdown
# TASK: ĐỒNG BỘ HOÀN HẢO CHUYỂN ĐỘNG TRƯỢT 5 VỊ TRÍ (HERO CAROUSEL)

1. Nguyên Lý Chuyển Động:
   - Khi Next:
     + Cây đàn bên phải (Right, 0.48) trượt vào giữa (Center, 1.0).
     + Cây đàn ở giữa (Center, 1.0) trượt sang trái (Left, 0.48).
     + Cây đàn bên trái (Left, 0.48) trượt lùi về xa bên trái (Far-Left, 0.35, mờ dần).
     + Cây đàn xa bên phải (Far-Right) trượt vào vị trí bên phải (Right).
   - Khi Prev: Đảo ngược chính xác toàn bộ chuyển động.

2. Thống Nhất Transition Property:
   - Tất cả 5 vị trí đều sử dụng chung `transition-all duration-750 ease-[cubic-bezier(0.22,1,0.36,1)]`.
   - Không chèn `transition-opacity` hay class ghi đè lên các slot để đảm bảo `transform` (translation + scale) luôn trượt mượt mà cùng một nhịp.
```
