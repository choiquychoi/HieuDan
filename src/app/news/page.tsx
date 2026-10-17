import type { Metadata } from "next";
import Footer from "@/components/layout/Footer/Footer";
import NewsListClient from "@/components/news/NewsListClient";
import { getLiveArticles } from "@/lib/cmsData";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Tin Tức Văn Hóa & Triết Lý Chế Tác | Hiệu Đàn Đức Ngân",
  description:
    "Khám phá tủ sách di sản, kinh nghiệm tuyển chọn gỗ âm học và kiến thức văn hóa nhạc cụ dân tộc truyền thống cùng nghệ nhân Hiệu Đàn Đức Ngân.",
};

export default async function NewsPage() {
  const articles = await getLiveArticles();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1610]">
      {/* 01. Interactive Editorial News List View */}
      <NewsListClient initialArticles={articles} />

      {/* 02. Global Footer */}
      <Footer />
    </div>
  );
}
