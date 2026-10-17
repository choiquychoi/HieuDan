"use client";

import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import AutoScrollTitle from "@/components/ui/AutoScrollTitle";
import AmbientProductStage from "@/components/ui/AmbientProductStage";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  // Determine primary wood name for the luxury tag
  const getWoodTag = () => {
    if (product.name.includes("Cẩm Lai")) return "Gỗ Cẩm Lai · Ngô Đồng";
    if (product.name.includes("Mun")) return "Gỗ Mun Hoa · Khảm Xà Cừ";
    if (product.name.includes("Trắc")) return "Gỗ Trắc Đen · Cổ Thụ";
    if (product.name.includes("Gõ Đỏ")) return "Gỗ Gõ Đỏ · Thẩm Âm";
    return "Gỗ Quý Nguyên Khối";
  };

  return (
    <div className="group relative flex flex-col justify-between h-full select-none touch-manipulation">
      {/* 1. Clickable Product Image Frame — AMBIENT EXHIBITION STAGE */}
      <Link
        href={`/products/${product.slug}`}
        className="block cursor-pointer"
        aria-label={`Xem chi tiết ${product.name}`}
      >
        <AmbientProductStage
          src={product.thumbnail || "/images/hero/dan-tranh.png"}
          alt={product.name}
          aspectClass="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]"
          paddingClass="p-4 sm:p-6 md:p-8"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        >
          {/* Subtle Quick View Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label={`Xem nhanh ${product.name}`}
            className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#C5A866] bg-[#FFFDF0]/90 text-[#3A2920] opacity-90 sm:opacity-0 backdrop-blur-xs transition-all duration-200 group-hover:opacity-100 hover:border-[#3A2218] hover:bg-[#3A2218] hover:text-white cursor-pointer shadow-md"
          >
            <Eye size={14} />
          </button>
        </AmbientProductStage>
      </Link>

      {/* 2. Clickable Product Information */}
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col justify-between pt-3 sm:pt-4 cursor-pointer"
      >
        <div>
          {/* 2. TÊN CÂY ĐÀN (Product Title with Silk Auto-Scroll on Hover) */}
          <div className="flex items-center justify-between gap-2">
            <AutoScrollTitle
              text={product.name}
              as="h3"
              className="font-sans text-base sm:text-lg lg:text-[19px] font-semibold leading-snug text-[#140C08] transition-colors duration-300 group-hover:text-[#8C6B3E] flex-1 min-w-0"
            />
            <ArrowRight
              size={15}
              className="text-[#8C6B3E] opacity-0 -translate-x-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shrink-0"
            />
          </div>

          {/* 3. THÔNG SỐ CHẤT LIỆU (Sub-spec) */}
          <div className="font-sans text-xs sm:text-[13px] font-medium tracking-normal mt-1 text-[#665038]">
            {getWoodTag()}
          </div>
        </div>

        {/* Hairline Divider above Price & Inline Action Row */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-y-1.5 border-t border-[#D4BC7B]/70 pt-2.5">
          {/* 4. GIÁ TIỀN (Price Tag) */}
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-sm sm:text-base lg:text-[16px] font-bold tracking-tight text-[#140C08]">
              {product.price ? formatCurrency(product.price) : "Đặt làm theo yêu cầu"}
            </span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-[#665038]/75 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Compact Inline Arrow Action */}
          <div className="inline-flex items-center gap-1 font-sans text-xs sm:text-[13px] font-semibold text-[#7D551A] transition-colors group-hover:text-[#140C08]">
            <span>Chi tiết</span>
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </div>
  );
}
