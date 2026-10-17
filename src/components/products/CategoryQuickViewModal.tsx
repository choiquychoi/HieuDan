"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Phone, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { SHOWROOM_INFO } from "@/data/navigation";
import ModalPortal from "@/components/ui/ModalPortal";

interface CategoryQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function CategoryQuickViewModal({
  product,
  onClose,
}: CategoryQuickViewModalProps) {
  const [renderedProduct, setRenderedProduct] = useState<Product | null>(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    let animTimer: number;
    let exitTimer: NodeJS.Timeout;

    if (product) {
      animTimer = requestAnimationFrame(() => {
        setRenderedProduct(product);
        setIsAnimatingIn(true);
      });
    } else {
      animTimer = requestAnimationFrame(() => {
        setIsAnimatingIn(false);
      });
      exitTimer = setTimeout(() => {
        setRenderedProduct(null);
      }, 550);
    }

    return () => {
      cancelAnimationFrame(animTimer);
      clearTimeout(exitTimer);
    };
  }, [product]);

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

  if (!renderedProduct) return null;

  return (
    <ModalPortal>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Xem nhanh tác phẩm ${renderedProduct.name}`}
        data-lenis-prevent
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none overflow-y-auto"
      >
        {/* 1. Backdrop Overlay (500ms Fade) */}
        <div
          onClick={onClose}
          className={`fixed inset-0 bg-[#0E0805]/85 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isAnimatingIn ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 2. Main QuickView Exhibition Panel */}
        <div
          className={`relative z-10 w-full max-w-3xl overflow-hidden rounded-lg border border-[#554134] bg-[#1C120D] text-[#FFFCF5] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isAnimatingIn
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-[0.97]"
          }`}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng xem nhanh"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#554134] bg-[#241711]/90 text-[#D8CDBD] hover:border-[#B49368] hover:bg-[#B49368] hover:text-[#180F0B] transition-all duration-300 cursor-pointer shadow-lg"
          >
            <X size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8 items-center">
            
            {/* Left: Product Image Stage (Moves upward 40px -> 0, 700ms) */}
            <div
              className={`md:col-span-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isAnimatingIn
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative aspect-square w-full rounded-md border border-[#3A2920] bg-[#140C08] p-4 flex items-center justify-center overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-radial from-[#B49368]/15 to-transparent blur-xl" />
                <Image
                  src={renderedProduct.thumbnail}
                  alt={renderedProduct.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </div>

            {/* Right: Product Editorial Content (Delay 100ms, Duration 600ms) */}
            <div
              className={`md:col-span-6 flex flex-col justify-between transition-all duration-600 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isAnimatingIn
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div>
                {/* Eyebrow Tag */}
                <div className="flex items-center text-[11.5px] font-semibold uppercase tracking-widest text-[#E5C398]">
                  <span>{renderedProduct.categoryName} · HIỆU ĐÀN ĐỨC NGÂN</span>
                </div>

                {/* Title */}
                <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-normal text-[#FFFCF5] leading-tight">
                  {renderedProduct.name}
                </h3>

                {/* Price */}
                <div className="mt-2.5 font-sans text-xl font-semibold text-[#E5C398]">
                  {formatCurrency(renderedProduct.price)}
                </div>

                {/* Summary */}
                <p className="mt-3 font-sans text-xs sm:text-[13px] text-[#D8CDBD]/85 font-light leading-relaxed">
                  {renderedProduct.summary}
                </p>
              </div>

              {/* Secondary Details & Actions (Delay 150ms, Duration 500ms) */}
              <div
                className={`mt-6 pt-5 border-t border-[#3A2920] space-y-4 transition-all duration-500 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isAnimatingIn
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {/* Warranty Assurance */}
                <div className="flex items-center gap-2 text-[11px] text-[#C5A880]">
                  <ShieldCheck size={14} className="text-[#B49368] shrink-0" />
                  <span>Bảo hành âm thanh trọn đời tại 526 Điện Biên Phủ, Q10</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  {/* Hotline Call */}
                  <a
                    href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
                    className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#B49368] px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#180F0B] hover:bg-[#C5A880] active:scale-95 transition-all cursor-pointer shadow-lg"
                  >
                    <Phone size={14} />
                    <span>Gọi tư vấn: {SHOWROOM_INFO.hotline}</span>
                  </a>

                  {/* Zalo */}
                  <a
                    href={`https://zalo.me/${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-[#B49368]/60 bg-[#241711] px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#E5C398] hover:bg-[#B49368] hover:text-[#180F0B] transition-all cursor-pointer"
                  >
                    <MessageCircle size={14} />
                    <span>Zalo</span>
                  </a>

                  {/* View Full Dossier */}
                  <Link
                    href={`/products/${renderedProduct.slug}`}
                    onClick={onClose}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-[#554134] bg-[#241711] px-3.5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#D8CDBD] hover:border-[#B49368] hover:text-white transition-all cursor-pointer"
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
