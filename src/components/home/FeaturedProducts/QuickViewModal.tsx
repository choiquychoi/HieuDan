"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Phone, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { SHOWROOM_INFO } from "@/data/navigation";
import { ModalBase } from "@/components/ui/modal-base";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  if (!product) return null;

  const handleClose = onClose;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={handleClose}
      theme="editorial"
      maxWidth="max-w-2xl"
    >
      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Xem nhanh ${product.name}`}
        className="relative w-full max-h-[88dvh] overflow-y-auto editorial-scrollbar rounded-[3px] border border-[#B49368]/45 bg-[#2D160B] text-[#F2EEE6] shadow-2xl p-4 sm:p-6"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#B49368]/45 bg-[#3E1F10]/95 text-[#E5C398] transition-colors hover:border-[#B49368] hover:bg-[#5C2B13] hover:text-[#FFFCF5] cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
          {/* Left Column: Product Image */}
          <div className="relative aspect-square w-full overflow-hidden bg-transparent">
            <Image
              src={product.thumbnail || "/images/hero/hero-03.jpg"}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, 320px"
            />
            {product.badge && (
              <span className="absolute left-3.5 top-3.5 rounded-[2px] bg-[#B49368] px-2.5 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#241711] shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Column: Product Information & Cart Action */}
          <div className="flex flex-col justify-between p-5 sm:p-6 sm:pl-0 sm:pr-6">
            <div>
              {/* Category */}
              <span className="eyebrow-label text-[#C5A880]">
                {product.categoryName}
              </span>

              {/* Title */}
              <Link href={`/products/${product.slug}`} onClick={handleClose}>
                <h2 className="mt-1 font-sans text-lg sm:text-xl font-semibold text-[#F2EEE6] leading-snug hover:text-[#E5C398] transition-colors">
                  {product.name}
                </h2>
              </Link>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="font-sans text-xl font-bold text-[#E5C398]">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-xs text-[#D8CDBD]/50 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Summary */}
              {product.summary && (
                <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-[#D8CDBD]/85">
                  {product.summary}
                </p>
              )}

              {/* View Full Detail Page Link */}
              <div className="mt-3">
                <Link
                  href={`/products/${product.slug}`}
                  onClick={handleClose}
                  className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#C5A880] hover:text-[#E5C398] transition-colors"
                >
                  <span>Xem đầy đủ thông số & hồ sơ chế tác</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              {/* Materials */}
              {product.materials && (
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {product.materials.map((mat, idx) => (
                    <span
                      key={idx}
                      className="rounded-[2px] border border-[#B49368]/30 bg-[#3E1F10] px-2 py-0.5 font-sans text-[11px] text-[#E9E0D2]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              )}

              {/* Trust Micro-badge */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-[#C5A880]">
                <ShieldCheck size={14} />
                <span>Bảo hành âm sắc và cân chỉnh phím trọn đời</span>
              </div>
            </div>

            {/* Consultation Action Buttons */}
            <div className="mt-6 border-t border-[#B49368]/30 pt-4 space-y-2.5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <a
                  href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
                  className="flex-1 flex h-10 items-center justify-center gap-2 rounded-[2px] bg-[#B49368] px-4 font-sans text-xs font-bold uppercase tracking-wider text-[#241711] hover:bg-[#C5A880] transition-colors shadow-xs cursor-pointer"
                >
                  <Phone size={14} />
                  <span>Gọi tư vấn: {SHOWROOM_INFO.hotline}</span>
                </a>

                <a
                  href={`https://zalo.me/${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center justify-center gap-1.5 rounded-[2px] border border-[#B49368]/60 bg-[#241711] px-4 font-sans text-xs font-semibold uppercase tracking-wider text-[#E5C398] hover:bg-[#B49368] hover:text-[#241711] transition-colors cursor-pointer"
                >
                  <MessageCircle size={14} />
                  <span>Zalo</span>
                </a>

                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-[2px] border border-[#B49368]/40 bg-[#3E1F10] px-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#E9E0D2] hover:bg-[#5C2B13] hover:text-[#FFFCF5] transition-colors"
                >
                  <span>Chi tiết</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
