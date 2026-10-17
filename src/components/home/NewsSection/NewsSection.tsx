import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { ARTICLES, Article } from "@/data/news";
import NewsSectionAtmosphere from "./NewsSectionAtmosphere";

/**
 * NewsSection — Section 03: "Dark Archival Music Library"
 *
 * Visual Role:
 * The dark archival destination after the light warm heritage room (Section 02).
 *
 * Aesthetics:
 * - Deep warm near-black background (#151310 / #191613)
 * - Large-scale ivory instrument blueprints (Đàn Tỳ Bà & Đàn Tranh)
 * - Bright archival paper cards (#FAF6EE) with superior typography and reading contrast
 * - Refined archival document metadata (01 / ARCHIVE, 02 / ARCHIVE, 03 / ARCHIVE)
 */
export default function NewsSection({ articles }: { articles?: Article[] } = {}) {
  // Take top 3 articles for homepage showcase
  const items = articles && articles.length > 0 ? articles : ARTICLES;
  const homepageArticles = items.slice(0, 3);

  return (
    <section className="relative w-full overflow-hidden bg-[#151310] py-16 sm:py-20 lg:py-24 border-t border-[#382E24] text-[#FAF6F0]">
      {/* Dark Archive Atmosphere & Ivory Instrument Technical Blueprints */}
      <NewsSectionAtmosphere />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#382E24] pb-5 sm:pb-6">
          <div>
            <span className="eyebrow-label text-[#B9964E]">
              KIẾN THỨC & CẨM NANG
            </span>
            <h2 className="mt-2 section-headline text-[#F2ECE1]">
              Chuyện Nghề & Văn Hóa Nhạc Cụ
            </h2>
          </div>

          {/* Right Action Link to /news */}
          <Link
            href="/news"
            className="group inline-flex items-center gap-1.5 cta-label text-[#B9964E] transition-colors hover:text-[#D8B66E]"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* 3-Column Light Archival Article Documents */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {homepageArticles.map((article) => {
            

            return (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5DEC9]/80 bg-[#FAF6EE] p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B9964E]/70 hover:shadow-[0_18px_48px_rgba(0,0,0,0.45)]"
              >
                <div>
                  {/* Card Archival Header Ribbon */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#E8E1D0] text-[11px] font-mono tracking-wider text-[#8C7A5A] uppercase">
                    <span className="text-[10.5px] px-2 py-0.5 rounded-[1px] bg-[#EFE9DC] text-[#7A6A4E] font-medium">
                      {article.category}
                    </span>
                  </div>

                  {/* Article Thumbnail Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-[#E8E1D0]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    />
                  </div>

                  {/* Date & Reading Time */}
                  <div className="mt-3.5 flex items-center gap-2 text-xs text-[#756F64]">
                    <span>{article.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-[#8C7A5A]" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Article Title — Strongest Text Inside Card */}
                  <h3 className="mt-2 font-display text-lg sm:text-[19px] font-bold text-[#1F1710] transition-colors duration-200 group-hover:text-[#8C7A5A] leading-snug">
                    {article.title}
                  </h3>

                  {/* Short Summary Description */}
                  <p className="mt-2 font-sans text-sm text-[#554C42] line-clamp-2 leading-relaxed font-normal">
                    {article.summary}
                  </p>
                </div>

                {/* Archival Action Footer */}
                <div className="mt-5 border-t border-[#EAE2D2] pt-3 flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#8C7A5A]/80 font-normal">
                    TƯ LIỆU GỐC
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#8C7A5A] transition-colors group-hover:text-[#4A3D29]">
                    <span>Đọc tiếp</span>
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
