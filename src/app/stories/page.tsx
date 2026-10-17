import type { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import StoriesAnthologyView from "@/components/stories/StoriesAnthologyView";

export const metadata: Metadata = {
  title: "Giai Thoại Mộc & Thanh — Tuyển Tập Ký Ức Chuyện Nghề | Hiệu Đàn Đức Ngân",
  description:
    "Khám phá 4 chương ký sự về nghệ thuật tuyển chọn gỗ Ngô Đồng, bàn tay đẽo gọt thủ công, sáng kiến Đàn Bầu xếp lưu diễn và điểm hẹn di sản 25+ năm tại 526 Điện Biên Phủ, Quận 10, TP.HCM.",
  openGraph: {
    title: "Giai Thoại Mộc & Thanh — Tuyển Tập Ký Ức Chuyện Nghề | Hiệu Đàn Đức Ngân",
    description:
      "Tuyển tập những ký ức, chuyện nghề và hành trình đánh thức hồn gỗ tại xưởng chế tác Hiệu Đàn Đức Ngân từ năm 1999.",
    images: ["/images/trust/trust-01-experience.jpg"],
  },
};

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1610]">
      {/* 01. Stories Anthology View (4 Heritage Chapters) */}
      <StoriesAnthologyView />

      {/* 02. Global Footer */}
      <Footer />
    </div>
  );
}
