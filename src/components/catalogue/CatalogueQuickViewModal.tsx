"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Phone, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { SHOWROOM_INFO } from "@/data/navigation";
import ModalPortal from "@/components/ui/ModalPortal";

interface CatalogueQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function CatalogueQuickViewModal({
  product,
  onClose,
}: CatalogueQuickViewModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Lock body scroll when QuickView modal is active
  useEffect(() => {
    if (product) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [product]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (product) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [product, onClose]);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <ModalPortal>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Xem nhanh tác phẩm ${product.name}`}
        data-lenis-prevent
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none overflow-y-auto"
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#0E0805]/80 backdrop-blur-xs transition-opacity duration-300"
        />

        {/* Modal Container */}
        <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[4px] border border-[#554134] bg-[#FAF8F5] text-[#140C08] shadow-2xl animate-fade-in">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng xem nhanh"
            className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#D8CDBD] bg-white text-[#706458] hover:border-[#B49368] hover:bg-[#B49368] hover:text-[#140C08] transition-colors cursor-pointer shadow-xs"
          >
            <X size={15} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
            
            {/* Left: Product Images Stage & Thumbnails (6 cols) */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="relative aspect-square w-full rounded-[3px] border border-[#E3DACD] bg-white p-3 flex items-center justify-center overflow-hidden">
                <Image
                  src={images[selectedImageIndex] || product.thumbnail}
                  alt={product.name}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>

              {/* Thumbnails if multiple images */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative h-14 w-14 shrink-0 rounded-[2px] border bg-white p-1 overflow-hidden transition-all cursor-pointer ${
                        idx === selectedImageIndex
                          ? "border-[#B49368] ring-1 ring-[#B49368]"
                          : "border-[#E3DACD] opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} hình ${idx + 1}`}
                        fill
                        className="object-contain p-0.5"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Cart Actions (6 cols) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <span className="font-sans text-[11.5px] font-semibold uppercase tracking-wider text-[#8C6B3E]">
                  {product.categoryName} · HIỆU ĐÀN ĐỨC NGÂN
                </span>

                <h3 className="mt-1 font-sans text-xl sm:text-2xl font-semibold text-[#140C08] leading-tight">
                  {product.name}
                </h3>

                <div className="mt-2 font-sans text-xl font-semibold text-[#8C6B3E]">
                  {formatCurrency(product.price)}
                </div>

                <p className="mt-3 font-sans text-xs sm:text-[13px] text-[#574F46] font-light leading-relaxed">
                  {product.summary}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#A68052] bg-[#F2EDE4] p-2.5 rounded-[3px] border border-[#E3DACD]">
                  <ShieldCheck size={15} className="text-[#B49368] shrink-0" />
                  <span>Bảo hành âm thanh trọn đời tại 526 Điện Biên Phủ, Q10</span>
                </div>
              </div>

              {/* Direct Consultation & Detail Actions */}
              <div className="pt-3 border-t border-[#E3DACD] space-y-2.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <a
                    href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
                    className="flex-1 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[2px] bg-[#241711] px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-[#E5C398] hover:bg-[#B49368] hover:text-[#241711] active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    <Phone size={14} className="text-[#C5A880]" />
                    <span>Gọi tư vấn: {SHOWROOM_INFO.hotline}</span>
                  </a>

                  <a
                    href={`https://zalo.me/${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-[2px] border border-[#B49368] bg-[#FAF8F5] px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#241711] hover:bg-[#B49368] hover:text-white transition-colors cursor-pointer"
                  >
                    <MessageCircle size={14} />
                    <span>Zalo</span>
                  </a>

                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-[2px] border border-[#D8CDBD] bg-[#FAF8F5] px-3.5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#574F46] hover:border-[#140C08] hover:text-[#140C08] transition-colors"
                  >
                    <span>Chi tiết</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
