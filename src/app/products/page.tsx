import { Suspense } from "react";
import type { Metadata } from "next";
import CatalogueView from "@/components/catalogue/CatalogueView";
import Footer from "@/components/layout/Footer/Footer";
import { getLiveCategories, getLiveProducts } from "@/lib/cmsData";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Danh Mục Nhạc Cụ Cổ Truyền | Hiệu Đàn Đức Ngân",
  description:
    "Tuyển tập các dòng nhạc cụ dân tộc Việt Nam (Đàn Bầu, Đàn Tranh, Đàn Tỳ Bà, Đàn Kìm, Đàn Sến, Đàn Violin) được chế tác thủ công độc bản từ gỗ quý lâu năm tại xưởng Đức Ngân.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getLiveProducts(),
    getLiveCategories(),
  ]);

  return (
    <div className="min-h-screen bg-[#F5EEE2] text-[#140C08]">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center bg-[#F5EEE2] text-[#140C08] font-display text-xl">
            Đang tải danh mục nhạc cụ...
          </div>
        }
      >
        <CatalogueView initialProducts={products} initialCategories={categories} />
      </Suspense>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
