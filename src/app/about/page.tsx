import type { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import AboutExhibitionView from "@/components/about/AboutExhibitionView";

export const metadata: Metadata = {
  description:
    "Khám phá triển lãm di sản 25+ năm (1999–nay) của Hiệu Đàn Đức Ngân: Triết lý tuyển chọn gỗ âm học, nghệ thuật đẽo gọt thủ công và thẩm âm độc bản tại 526 Điện Biên Phủ, Quận 10, TP.HCM.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#140C08] text-[#FFFCF5]">
      {/* 01. Digital Exhibition Experience (Từ Thớ Gỗ Đến Thanh Âm) */}
      <AboutExhibitionView />

      {/* 02. Global Footer */}
      <Footer />
    </div>
  );
}
