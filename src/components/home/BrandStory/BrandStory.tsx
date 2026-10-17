"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import BrandStoryAtmosphere from "./BrandStoryAtmosphere";

/**
 * BrandStory — Section 02: "Heritage Paper Room"
 *
 * Visual Role:
 * Bridges the warm golden product gallery (Section 01) and the dark archive (Section 03).
 *
 * Aesthetics:
 * - Warm ivory / parchment tone (#F2ECDF)
 * - Ultra-subtle handmade dó-paper fiber texture
 * - Large-scale Đàn Nguyệt technical blueprint strictly visible on the left flank
 * - Editorial typography with antique brass accent (#B9964E)
 * - Framed archival workshop photograph on the right
 */
export interface DbAbout {
  title?: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
}

export default function BrandStory({ about }: { about?: DbAbout | null } = {}) {
  const title = about?.title || "THƯƠNG HIỆU CỦA NHẠC CỤ DÂN TỘC";
  const subtitle = about?.subtitle || "HIỆU ĐÀN ĐỨC NGÂN";
  const content =
    about?.content ||
    "Hiệu đàn Đức Ngân chuyên cung cấp và chế tác các loại nhạc cụ dân tộc truyền thống như Đàn Bầu, Đàn Tranh, Đàn Kìm (Nguyệt), Đàn Sến, Đàn Cò, Đàn Gáo, Đàn Tam Thập Lục, Đàn Guitar, Đàn Mandoline... được sử dụng tại các buổi nhạc hội dân tộc và không gian văn hóa nghệ thuật truyền thống.";
  const imageUrl = about?.image_url || "/images/aboutUs/image.png";

  return (
    <section
      aria-label="Về Hiệu Đàn Đức Ngân"
      className="relative w-full overflow-hidden bg-[#F2ECDF] border-t border-[#E3D9C6] py-16 sm:py-20 lg:py-24 text-[#241A12]"
    >
      {/* Archival Dó-Paper Atmosphere & Monumental Đàn Nguyệt Blueprint */}
      <BrandStoryAtmosphere />

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* ================= LEFT / CENTER: EDITORIAL HERITAGE CONTENT ================= */}
          <div className="lg:col-span-7 xl:col-span-6 lg:pl-20 xl:pl-24 flex flex-col justify-center">
            
            {/* 2. Small Eyebrow */}
            <span className="block font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#B9964E] mb-2 sm:mb-2.5">
              {subtitle}
            </span>

            {/* 3. Main Title */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold uppercase text-[#241A12] leading-[1.22] tracking-tight mb-4 sm:mb-5">
              {title}
            </h2>

            {/* 4. Fine Archival Divider */}
            <div className="w-14 h-px bg-[#C8BCAB] mb-5 sm:mb-6" />

            {/* 5. Heritage Craftsmanship Body Text */}
            <p className="font-sans text-sm sm:text-[15px] lg:text-[15.5px] leading-[1.85] text-[#554C42] mb-7 sm:mb-8 max-w-[540px] font-normal">
              {content}
            </p>

            {/* 6. CTA Button & Archival Doc Numbering */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-1">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-[2px] bg-[#B9964E] px-7 py-3.5 font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#FFFDF8] shadow-xs transition-all duration-200 hover:bg-[#A3823E] hover:shadow-sm active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B9964E]"
              >
                TÌM HIỂU THÊM
              </Link>
            </div>
          </div>

          {/* ================= RIGHT: FRAMED ARCHIVAL WORKSHOP PHOTOGRAPH ================= */}
          <div className="lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[560px] p-2.5 sm:p-3.5 bg-[#FAF7F0] border border-[#D5C9B3] rounded-[2px] shadow-[0_8px_28px_rgba(40,30,20,0.06)]">
              {/* Photo Frame Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-[1px] bg-[#EBE3D3]">
                <Image
                  src={imageUrl}
                  alt="Nghệ nhân Hiệu Đàn Đức Ngân gia công nhạc cụ truyền thống thủ công tại xưởng"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Archival Museum Caption Underneath */}
              <div className="mt-2.5 pt-2 border-t border-[#EAE2D2] flex items-center justify-between text-[10.5px] sm:text-[11px] font-mono tracking-wider text-[#756A5B]/85 uppercase">
                <span className="opacity-75">VN-LUTH · 1999</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
