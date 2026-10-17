"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import AutoScrollTitle from "@/components/ui/AutoScrollTitle";
import AmbientProductStage from "@/components/ui/AmbientProductStage";

interface CatalogueProductCardProps {
  product: Product;
}

export default function CatalogueProductCard({
  product,
}: CatalogueProductCardProps) {

  return (
    <div className="group block select-none touch-manipulation">
      <Link
        href={`/products/${product.slug}`}
        tabIndex={-1}
        className="block"
      >
        <AmbientProductStage
          src={product.thumbnail}
          alt={product.name}
          aspectClass="aspect-[4/5] sm:h-[280px] lg:h-[340px] sm:aspect-auto"
          paddingClass="p-4 sm:p-6 md:p-8"
        />
      </Link>

      {/* ================= PRODUCT INFO & STORYTELLING LAYER ================= */}
      <div className="mt-3 sm:mt-4">
        <Link href={`/products/${product.slug}`} className="block group/info">
          {/* 1. Dòng đàn */}
          <div className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#A68052] font-medium mb-1.5">
            {product.categoryName}
          </div>

          {/* 2. Tên tác phẩm nhạc cụ (Serif Editorial) */}
          <AutoScrollTitle
            text={product.name}
            as="h3"
            className="font-display text-base sm:text-[18px] font-medium leading-snug text-[#140C08] group-hover/info:text-[#8C6B3E] transition-colors duration-300"
          />

          {/* 4. Giá tiền & Nút xem tác phẩm */}
          <div className="pt-2 sm:pt-3 flex items-center justify-between mt-1">
            <span className="font-sans text-[13px] sm:text-sm text-[#706458]">
              {product.price ? (
                formatCurrency(product.price)
              ) : (
                <span className="italic">Đặt làm theo yêu cầu</span>
              )}
            </span>
            <span className="inline-flex items-center gap-1.5 font-sans text-xs text-[#8C6B3E] transition-colors">
              <span>Chi tiết</span>
              <ArrowRight size={12} className="transition-transform group-hover/info:translate-x-1.5" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
