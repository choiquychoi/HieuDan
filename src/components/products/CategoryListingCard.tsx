"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Phone } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { SHOWROOM_INFO } from "@/data/navigation";

interface CategoryListingCardProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
  isGridTransitioning?: boolean;
}

export default function CategoryListingCard({
  product,
  index,
  onQuickView,
  isGridTransitioning = false,
}: CategoryListingCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Staggered delay (0ms, 100ms, 200ms, 300ms, ... capped at 700ms)
  const staggerDelay = Math.min(index * 90, 720);

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div
      style={{
        transitionDelay: isGridTransitioning ? "0ms" : `${staggerDelay}ms`,
        animationDelay: `${staggerDelay}ms`,
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-md border border-[#E3DACD] bg-[#FAF8F5] p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        isHovered
          ? "-translate-y-1.5 border-[#B49368] shadow-[0_12px_28px_rgba(180,147,104,0.14)]"
          : "translate-y-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* ================= 1. PRODUCT IMAGE CONTAINER WITH MASK REVEAL & LIGHTING SWEEP ================= */}
        <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden rounded-[3px] border border-[#E3DACD]/70 bg-[#F2EDE4]">
          {/* Subtle placeholder tone before load */}
          <div
            className={`absolute inset-0 bg-[#EFE9DF] transition-opacity duration-700 ${
              isImageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />

          {/* Mask / Upward image reveal */}
          <div
            className={`relative h-full w-full transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              clipPath: isImageLoaded ? "inset(0% 0 0 0)" : "inset(8% 0 0 0)",
            }}
          >
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              onLoad={() => setIsImageLoaded(true)}
              className={`object-contain p-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isHovered ? "scale-[1.04]" : "scale-100"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Subtle Gallery Lighting Beam Sweep (Left to Right on Hover) */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out ${
              isHovered ? "translate-x-full opacity-100" : "-translate-x-full opacity-0"
            }`}
          />

          {/* Top Inset Badge: Category Name */}
          <span className="absolute left-2.5 top-2.5 rounded-[2px] border border-[#D8CDBD]/80 bg-[#FFFCF5]/95 px-2.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#8C6B3E] shadow-xs backdrop-blur-xs">
            {product.categoryName}
          </span>

          {/* QuickView Trigger Button (Appears gracefully on top-right) */}
          <button
            type="button"
            onClick={handleQuickViewClick}
            aria-label={`Xem nhanh ${product.name}`}
            className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-[#B49368]/40 bg-[#FAF8F5]/90 text-[#706458] shadow-md backdrop-blur-md transition-all duration-400 hover:border-[#B49368] hover:bg-[#B49368] hover:text-[#180F0B] cursor-pointer ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <Eye size={14} />
          </button>
        </div>

        {/* ================= 2. PRODUCT METADATA & TYPOGRAPHY ================= */}
        <div className="mt-4 flex flex-col">
          {/* Instrument Title */}
          <Link href={`/products/${product.slug}`} className="group/title block">
            <h3 className="font-sans text-base sm:text-lg font-semibold text-[#1F1610] tracking-normal transition-colors duration-300 group-hover/title:text-[#B49368] leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Poetic / Acoustic Summary */}
          <p className="mt-1.5 font-sans text-xs text-[#706458] line-clamp-2 leading-relaxed font-light">
            {product.summary}
          </p>

          {/* Pricing Row */}
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-sans text-sm sm:text-base font-semibold text-[#8C6B3E] tracking-tight">
              {formatCurrency(product.price)}
            </span>

            {product.isFeatured && (
              <span className="font-sans text-[11px] font-medium tracking-widest text-[#8C6B3E] uppercase">
                Tuyển chọn
              </span>
            )}
          </div>

          {/* Dynamic Bronze Accent Line (Expands smoothly on hover from 0 to 100%) */}
          <div className="relative mt-3.5 h-[1.5px] w-full overflow-hidden bg-[#E3DACD]/50">
            <div
              className={`h-full bg-[#B49368] transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isHovered ? "w-full" : "w-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* ================= 3. CARD ACTION BAR (VIEW DETAIL & ADD TO CART) ================= */}
      <div className="mt-4 pt-3 flex items-center justify-between gap-2 border-t border-[#E3DACD]/60">
        {/* Primary View Detail Link */}
        <Link
          href={`/products/${product.slug}`}
          className="group/link inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#B49368] transition-all duration-400 hover:text-[#180F0B]"
        >
          <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">
            Xem tác phẩm
          </span>
          <ArrowRight
            size={12}
            className="transition-transform duration-400 group-hover/link:translate-x-1"
          />
        </Link>

        {/* Direct Call Hotline Action Button */}
        <a
          href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Gọi tư vấn ${product.name}: ${SHOWROOM_INFO.hotline}`}
          title={`Gọi tư vấn: ${SHOWROOM_INFO.hotline}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8CDBD] bg-[#FAF8F5] text-[#706458] transition-all duration-300 hover:border-[#B49368] hover:bg-[#B49368] hover:text-[#180F0B] active:scale-95 cursor-pointer shadow-2xs"
        >
          <Phone size={13} />
        </a>
      </div>
    </div>
  );
}
