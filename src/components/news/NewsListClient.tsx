"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Article } from "@/data/news";
import { SHOWROOM_INFO } from "@/data/navigation";

const DEFAULT_CATEGORIES = [
  "Tất cả",
  "Chuyện Nghề Chế Tác",
  "Tin Tức Nhạc Cụ",
  "Văn Hóa Âm Nhạc",
] as const;

const ITEMS_PER_PAGE = 6;

interface NewsListClientProps {
  initialArticles: Article[];
}

export default function NewsListClient({ initialArticles }: NewsListClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Dynamic categories list from existing articles
  const categories = useMemo(() => {
    const customCats = initialArticles
      .map((a) => a.category)
      .filter((c): c is string => Boolean(c) && !DEFAULT_CATEGORIES.includes(c as any));
    return ["Tất cả", "Chuyện Nghề Chế Tác", "Tin Tức Nhạc Cụ", "Văn Hóa Âm Nhạc", ...Array.from(new Set(customCats))];
  }, [initialArticles]);

  // Filter articles based on active category
  const filteredArticles = useMemo(() => {
    if (activeCategory === "Tất cả") {
      return initialArticles;
    }
    return initialArticles.filter((item) => item.category === activeCategory);
  }, [initialArticles, activeCategory]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const currentArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1610]">
      {/* ========================================================================= */}
      {/* SECTION 1: MINIMALIST BREADCRUMB                                         */}
      {/* ========================================================================= */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 pt-24 sm:pt-28 lg:pt-32"
      >
        <div className="flex items-center gap-1.5 font-sans text-xs sm:text-sm text-[#706458]">
          <Link href="/" className="hover:text-[#A68052] transition-colors">
            Trang chủ
          </Link>
          <span className="text-[#D9CEBF]">/</span>
          <span className="text-[#1F1610] font-medium">Tin Tức Văn Hóa</span>
        </div>
      </nav>

      <main className="py-8 sm:py-12 space-y-12 sm:space-y-16 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* ========================================================================= */}
        {/* SECTION 2: HERO MAGAZINE HEADER                                           */}
        {/* ========================================================================= */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center gap-2">
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-[44px] text-[#140C08] font-normal tracking-normal leading-[1.2]">
            Tin Tức Văn Hóa & Triết Lý Chế Tác
          </h1>

          <p className="font-sans text-[#4A3F35] text-base md:text-[22px] font-normal leading-relaxed max-w-4xl mx-auto pt-1">
            Nơi lưu giữ những câu chuyện nghề mộc, kinh nghiệm tuyển chọn gỗ quý âm học và kiến thức văn hóa nhạc cụ cổ truyền của Hiệu Đàn Đức Ngân.
          </p>

          <div className="w-24 h-[1px] bg-[#E3DACD] mx-auto mt-6" />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: CATEGORY FILTER TABS                                          */}
        {/* ========================================================================= */}
        <section className="flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`min-h-[44px] px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#241711] text-[#E5C398] font-medium shadow-sm border border-[#A68052]/50 scale-102"
                    : "bg-white/70 text-[#4A3F35] border border-[#E3DACD] hover:bg-[#E3DACD]/40 hover:text-[#1F1610]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: EDITORIAL NEWS GRID (3-COLUMN LAYOUT)                          */}
        {/* ========================================================================= */}
        <section>
          {currentArticles.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-[#E3DACD] rounded-[3px] bg-white/50">
              <p className="font-sans text-sm text-[#706458]">
                Chưa có bài viết nào trong chuyên mục này.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {currentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group flex flex-col justify-between overflow-hidden rounded-[3px] border border-[#E3DACD] bg-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#A68052] hover:shadow-md cursor-pointer"
                >
                  {/* 1. Preview Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#241711]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                      className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                    />

                    {/* Overlay Category Tag */}
                    <span className="absolute top-3 left-3 z-10 rounded-[2px] border border-[#A68052]/30 bg-[#140C08]/85 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-[#E5C398] backdrop-blur-md">
                      {article.category}
                    </span>
                  </div>

                  {/* 2. Content Block */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {/* Meta Information */}
                      <div className="mb-3 flex items-center gap-4 font-sans text-xs text-[#706458]">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-[#A68052]" />
                          <span>{article.publishedAt || article.date}</span>
                        </div>
                        <span className="text-[#D9CEBF]">·</span>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-[#A68052]" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-xl text-[#1F1610] leading-snug mb-3 line-clamp-2 transition-colors duration-200 group-hover:text-[#A68052]">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="font-sans text-xs sm:text-[13px] text-[#4A3F35] leading-relaxed line-clamp-3 mb-6 font-light">
                        {article.excerpt || article.summary}
                      </p>
                    </div>

                    {/* Card Footer Action */}
                    <div className="flex items-center justify-between border-t border-[#E3DACD]/60 pt-4 font-sans text-xs font-medium text-[#8C6B3E] transition-colors group-hover:text-[#1F1610]">
                      <span>Đọc bài viết</span>
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: EDITORIAL PAGINATION                                          */}
        {/* ========================================================================= */}
        {totalPages > 1 && (
          <section className="flex items-center justify-center gap-2 pt-8 border-t border-[#E3DACD]">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Trang trước"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3DACD] bg-white text-[#4A3F35] transition-colors hover:border-[#A68052] hover:text-[#1F1610] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-label={`Trang ${page}`}
                className={`flex h-10 w-10 items-center justify-center rounded-full font-sans text-xs font-medium transition-all duration-200 cursor-pointer ${
                  currentPage === page
                    ? "bg-[#241711] text-[#E5C398] shadow-xs scale-105"
                    : "border border-[#E3DACD] bg-white text-[#4A3F35] hover:border-[#A68052] hover:text-[#1F1610]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Trang kế tiếp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3DACD] bg-white text-[#4A3F35] transition-colors hover:border-[#A68052] hover:text-[#1F1610] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 6: SHOWROOM CTA BANNER                                            */}
        {/* ========================================================================= */}
        <section className="rounded-[3px] border border-[#E3DACD] bg-[#241711] text-[#FAF8F5] p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-md">
          <div className="max-w-2xl space-y-5 relative z-10">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#E5C398] block">
              TRẢI NGHIỆM TRỰC TIẾP
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-[#FFFCF5]">
              Ghé Thăm Showroom & Thử Âm Sắc Cùng Nghệ Nhân
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#D8CDBD] leading-relaxed">
              Trải nghiệm thực tế không gian trưng bày tại 526 Điện Biên Phủ, Quận 10 để cảm nhận sự mộc mạc của từng thớ gỗ và chọn cho mình cây đàn ưng ý nhất.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[3px] bg-[#A68052] px-6 py-3 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1F1610] hover:bg-[#E5C398] transition-colors shadow-xs"
              >
                <span>Đặt Lịch Hẹn Thử Đàn</span>
                <ArrowRight size={15} />
              </Link>

              <a
                href={`tel:${SHOWROOM_INFO.hotline.replace(/\s/g, "")}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[3px] border border-[#A68052]/50 bg-white/5 px-5 py-3 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FAF8F5] hover:bg-white/10 transition-colors"
              >
                <Phone size={14} className="text-[#E5C398]" />
                <span>Hotline: {SHOWROOM_INFO.hotline}</span>
              </a>
            </div>
          </div>

          {/* Decorative Background Accent */}
          <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none hidden md:block">
            <Image
              src="/images/hero/dan-tranh.png"
              alt="Decorative background"
              width={340}
              height={400}
              className="object-contain"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
