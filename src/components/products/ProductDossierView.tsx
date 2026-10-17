"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Maximize2, X, Phone, MessageCircle, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import { Product, Instrument } from "@/types";
import { formatCurrency } from "@/lib/utils";
import AmbientProductStage from "@/components/ui/AmbientProductStage";
import { SHOWROOM_INFO } from "@/data/navigation";
import ProductAudioSection from "./ProductAudioSection";
import { ModalBase } from "@/components/ui/modal-base";

interface ProductDossierViewProps {
  product: Product;
  instrument?: Instrument | null;
  relatedProducts: Product[];
}

export default function ProductDossierView({
  product,
  instrument,
  relatedProducts,
}: ProductDossierViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const [prevProductId, setPrevProductId] = useState(product.id);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  // Reset state when product changes during in-page navigation
  if (prevProductId !== product.id) {
    setPrevProductId(product.id);
    setSelectedImageIndex(0);
    setIsContentExpanded(false);
  }

  // Detect whether content exceeds the collapsed threshold (e.g. 520px)
  useEffect(() => {
    if (contentContainerRef.current) {
      const scrollHeight = contentContainerRef.current.scrollHeight;
      setIsContentOverflowing(scrollHeight > 560);
    }
  }, [product.description]);

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const safeImageIndex = selectedImageIndex < images.length ? selectedImageIndex : 0;

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const isSwiping = useRef<boolean>(false);

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
    if (
      touchStartX.current !== null &&
      Math.abs(touchStartX.current - e.targetTouches[0].clientX) > 12
    ) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null &&
      touchStartY.current !== null &&
      touchEndY.current !== null
    ) {
      const deltaX = touchStartX.current - touchEndX.current;
      const deltaY = touchStartY.current - touchEndY.current;
      // Dominant horizontal intent verification to prevent scroll misfires
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX > 0) {
          handleNextImage();
        } else {
          handlePrevImage();
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
    setTimeout(() => {
      isSwiping.current = false;
    }, 60);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && isLightboxOpen) handlePrevImage();
      if (e.key === "ArrowRight" && isLightboxOpen) handleNextImage();
      if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevImage, handleNextImage, isLightboxOpen]);

  // Real audio source
  const audioData =
    instrument?.audio ||
    (product.categoryId === "dan-ty-ba"
      ? {
          src: "/audio/dan_ty_ba.mp3",
          title: "Âm sắc Đàn Tỳ Bà — Tứ huyền giao hưởng",
          duration: "0:45",
        }
      : null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1610] pb-[max(2rem,env(safe-area-inset-bottom))]">
      {/* 01. Minimal Quiet Breadcrumb Line */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32"
      >
        <div className="flex flex-wrap items-center gap-2 font-sans text-[11px] sm:text-xs uppercase tracking-wider text-[#8C7E72]">
          <Link href="/" className="hover:text-[#A68052] transition-colors">
            Trang chủ
          </Link>
          <span className="text-[#D8CDBD]">/</span>
          <Link href={`/products?category=${product.categoryId}`} className="hover:text-[#A68052] transition-colors">
            {product.categoryName}
          </Link>
          <span className="text-[#D8CDBD]">/</span>
          <span className="text-[#1F1610] font-normal truncate max-w-[280px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </nav>

      <main className="py-6 sm:py-10 pb-28 sm:pb-32 lg:pb-12 space-y-16 sm:space-y-24">
        {/* ========================================================================= */}
        {/* 02. PRODUCT HERO: EXHIBITION STAGING COMPOSITION                          */}
        {/* ========================================================================= */}
        <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
            
            {/* LEFT: Exhibition Instrument Display Stage (7 Columns for Visual Dominance) */}
            <div className="lg:col-span-7 xl:col-span-7 w-full space-y-4 lg:sticky lg:top-28">
              {/* Main Exhibition Stage: Focused Scale, Pure Editorial Canvas, Maximized Instrument Presence */}
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="group relative h-[420px] sm:h-[480px] lg:h-[540px] xl:h-[580px] w-full overflow-hidden rounded-[2px] border border-[#EBE3D8]/70 bg-[#FAF8F5] select-none touch-pan-y transition-colors"
              >
                {/* Subtle Environmental Lighting: Warm amber radial spotlight */}
                <div 
                  className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(235,218,198,0.5)_0%,rgba(244,236,225,0.25)_45%,rgba(250,248,245,0)_80%)]" 
                  aria-hidden="true"
                />

                {/* Instrument Images: Reduced internal padding with radiating ambient blur aura */}
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      safeImageIndex === idx
                        ? "opacity-100 scale-100 z-10 pointer-events-auto"
                        : "opacity-0 scale-[1.02] z-0 pointer-events-none"
                    }`}
                  >
                    {/* Ambient Silhouette Glow: Soft, diffuse, ethereal mist spreading almost to the frame borders */}
                    <div
                      className="absolute inset-0 pointer-events-none select-none flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {/* Ultra-wide Radiant Bloom: Doubled color density, spreading almost to the frame borders */}
                      <Image
                        src={img}
                        alt=""
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 760px"
                        className="object-contain blur-[80px] sm:blur-[120px] lg:blur-[160px] opacity-50 sm:opacity-70 scale-[1.45] sm:scale-[1.60] lg:scale-[1.70] saturate-150 transform-gpu transition-all duration-700 group-hover:scale-[1.55] sm:group-hover:scale-[1.75] group-hover:opacity-85"
                      />
                      {/* Rich Intermediate Halo: Doubled intensity for deep warm presence */}
                      <Image
                        src={img}
                        alt=""
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 760px"
                        className="object-contain blur-[45px] sm:blur-[70px] lg:blur-[90px] opacity-40 sm:opacity-55 scale-[1.18] sm:scale-[1.25] saturate-150 transform-gpu transition-all duration-700 group-hover:scale-[1.28] group-hover:opacity-70"
                      />
                    </div>

                    {/* Primary Sharp Instrument Image */}
                    <Image
                      src={img}
                      alt={`${product.name} - Ảnh ${idx + 1}`}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 760px"
                      className="relative z-10 object-contain p-2 sm:p-4 lg:p-5 cursor-zoom-in transition-transform duration-700 ease-out hover:scale-[1.02] drop-shadow-[0_6px_24px_rgba(140,80,30,0.08)]"
                      onClick={() => {
                        if (!isSwiping.current) {
                          setIsLightboxOpen(true);
                        }
                      }}
                    />
                  </div>
                ))}

                {/* Understated Zoom Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="Phóng to chi tiết tác phẩm"
                  className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#D8CDBD]/70 bg-[#FAF8F5]/85 text-[#706458] hover:text-[#1F1610] hover:border-[#A68052] opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-xs shadow-2xs"
                >
                  <Maximize2 size={14} />
                </button>

                {/* Left / Right Exhibition Navigation (Visible when > 1 image) */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Ảnh trước"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#D8CDBD]/70 bg-[#FAF8F5]/85 text-[#706458] hover:text-[#1F1610] hover:border-[#A68052] opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-xs shadow-2xs"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Ảnh kế tiếp"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#D8CDBD]/70 bg-[#FAF8F5]/85 text-[#706458] hover:text-[#1F1610] hover:border-[#A68052] opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-xs shadow-2xs"
                    >
                      <ChevronRight size={16} />
                    </button>

                    {/* Editorial Accession Number Indicator */}
                    <div className="absolute bottom-3.5 right-3.5 z-20 rounded-[1px] border border-[#E3DACD]/70 bg-[#FAF8F5]/90 px-2.5 py-1 font-serif text-xs text-[#706458] tracking-widest backdrop-blur-xs">
                      {String(safeImageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Dot Indicators */}
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 pt-1 sm:hidden">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Chuyển đến ảnh ${idx + 1}`}
                      className="p-2 -m-1 cursor-pointer touch-manipulation flex items-center justify-center"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                          safeImageIndex === idx
                            ? "w-6 bg-[#A68052]"
                            : "w-2 bg-[#D8CDBD]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Restrained Editorial Thumbnails Underneath */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pt-1 pb-1 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Xem ảnh ${idx + 1}`}
                      className={`relative h-16 w-18 sm:h-18 sm:w-20 shrink-0 overflow-hidden rounded-[1px] border transition-all duration-300 cursor-pointer ${
                        safeImageIndex === idx
                          ? "border-[#A68052] bg-[#FAF8F5] opacity-100 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[1.5px] after:bg-[#A68052]"
                          : "border-[#E3DACD]/70 bg-[#FAF8F5]/60 opacity-60 hover:opacity-100 hover:border-[#A68052]/40"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - góc ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Curatorial Narrative & Acquisition (5 Columns with Strict Visual Hierarchy) */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between space-y-8 lg:pl-4 xl:pl-8">
              <div className="space-y-5">
                {/* 1. Category label */}
                <span className="font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-[#A68052]">
                  {product.categoryName}
                </span>

                {/* 2. Instrument Name: Sculptural, Restrained Editorial Cormorant Garamond */}
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-normal sm:font-medium leading-[1.16] text-[#1F1610] tracking-tight">
                  {product.name}
                </h1>

                {/* 3. Short Narrative Description: Comfortable Reading Width */}
                <p className="font-sans text-[15px] sm:text-base text-[#554A3F] leading-[1.75] max-w-lg">
                  {product.summary}
                </p>

                {/* 4. Restrained Navigation Anchor to Listening Chamber */}
                {audioData?.src && (
                  <div className="pt-1">
                    <a
                      href="#thuong-am"
                      onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== "undefined" && window.__lenis) {
                          window.__lenis.scrollTo("#thuong-am", { offset: -70, duration: 1.2 });
                        } else {
                          const el = document.getElementById("thuong-am");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }
                      }}
                      className="group inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#A68052] hover:text-[#1F1610] transition-colors py-1 cursor-pointer select-none"
                    >
                      <Volume2 size={15} className="text-[#A68052] transition-transform group-hover:scale-110" />
                      <span>Thưởng âm sắc mộc</span>
                      <span className="text-xs transition-transform group-hover:translate-y-0.5">↓</span>
                    </a>
                  </div>
                )}
              </div>

              {/* 5. Secondary Metadata: Valuation, Acquisition & Workshop Assurances */}
              <div className="space-y-4 pt-2 border-t border-[#E3DACD]/60">
                {/* Prominent Valuation Notation */}
                <div className="flex flex-wrap items-end justify-between gap-4 pt-2 pb-1">
                  <span className="pb-1.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#8C7E72]">
                    Định giá tác phẩm
                  </span>
                  <span className="font-sans text-3xl sm:text-[34px] font-bold tracking-tight text-[#B49368] drop-shadow-sm">
                    {formatCurrency(product.price)}
                  </span>
                </div>

                {/* Direct Atelier Consultation Actions */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row items-stretch gap-3">
                    {/* Primary Hotline Call */}
                    <a
                      href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
                      className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2.5 px-5 rounded-[2px] bg-[#241711] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E5C398] hover:bg-[#A68052] hover:text-[#1F1610] transition-colors shadow-2xs active:scale-[0.99] cursor-pointer"
                    >
                      <Phone size={15} className="text-[#C5A880]" />
                      <span>Tư vấn xưởng: {SHOWROOM_INFO.hotline}</span>
                    </a>

                    {/* Secondary Zalo Chat */}
                    <a
                      href={`https://zalo.me/${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 px-5 rounded-[2px] border border-[#B49368] bg-[#FAF8F5] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#241711] hover:bg-[#B49368] hover:text-white transition-colors cursor-pointer shadow-2xs"
                    >
                      <MessageCircle size={15} />
                      <span>Nhắn Zalo</span>
                    </a>
                  </div>

                  {/* Direct Showroom Appointment Link */}
                  <div className="pt-1">
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-xs sm:text-sm font-medium text-[#A68052] hover:text-[#1F1610] transition-colors"
                    >
                      Đặt lịch hẹn thưởng âm trực tiếp tại Showroom 526 Điện Biên Phủ ↗
                    </Link>
                  </div>
                </div>

                {/* Factual Craftsmanship Assurances */}
                <div className="border-t border-[#E3DACD]/60 pt-5 space-y-2.5 font-sans text-xs sm:text-[14px] text-[#554A3F] leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A68052] mt-2 shrink-0" />
                    <span>Trải nghiệm & thử âm sắc trực tiếp tại Showroom 526 Điện Biên Phủ, Q.10</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A68052] mt-2 shrink-0" />
                    <span>Chế tác từ chất gỗ tự nhiên sấy ổn định, lưu giữ độ vang mộc mạc</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A68052] mt-2 shrink-0" />
                    <span>Hỗ trợ kỹ thuật, căn chỉnh phím cần bởi nghệ nhân xưởng Đức Ngân</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* LISTENING CHAMBER: FULL-BLEED DARK WALNUT EDITORIAL CHAPTER               */}
        {/* ========================================================================= */}
        <ProductAudioSection product={product} instrument={instrument} />

        {/* ========================================================================= */}
        {/* 03. THÔNG TIN SẢN PHẨM (CMS RICH TEXT EDITOR DOSSIER)                     */}
        {/* ========================================================================= */}
        <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 border-t border-[#E3DACD]/80 pt-10 sm:pt-14">
          {/* Header Tab Đơn Duy Nhất: THÔNG TIN */}
          <div className="flex items-center border-b border-[#E3DACD]/80 pb-px">
            <div className="relative pb-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1F1610] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#A68052] select-none">
              THÔNG TIN
            </div>
          </div>

          {/* Vùng chứa nội dung Text Editor căng đều theo khung lưới 1360px của toàn trang */}
          <div className="pt-8 sm:pt-10 min-h-[280px]">
            {product.description ? (
              <div className="relative">
                {/* Collapsible Container */}
                <div
                  ref={contentContainerRef}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    !isContentExpanded && isContentOverflowing
                      ? "max-h-[520px]"
                      : "max-h-none"
                  }`}
                >
                  <div
                    className="editorial-prose w-full"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                {/* Gradient Fade Overlay when collapsed */}
                {!isContentExpanded && isContentOverflowing && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent"
                  />
                )}

                {/* Nút Xem Thêm / Thu Gọn (Chỉ xuất hiện khi nội dung vượt quá 560px) */}
                {isContentOverflowing && (
                  <div className="relative z-10 flex justify-center pt-4 pb-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsContentExpanded((prev) => !prev);
                        // Khi thu gọn lại, cuộn mượt nhẹ lên đầu section để tiện quan sát
                        if (isContentExpanded && contentContainerRef.current) {
                          if (typeof window !== "undefined" && window.__lenis) {
                            window.__lenis.scrollTo(contentContainerRef.current, { offset: -120 });
                          } else {
                            contentContainerRef.current.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }
                      }}
                      className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D8CDBD] bg-[#FFFCF5] hover:bg-[#F5EFE6] hover:border-[#A68052] font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1F1610] hover:text-[#8C6B3E] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer select-none active:scale-[0.98]"
                    >
                      <span>{isContentExpanded ? "Thu gọn thông tin" : "Xem thêm chi tiết"}</span>
                      {isContentExpanded ? (
                        <ChevronUp size={16} className="text-[#A68052] group-hover:-translate-y-0.5 transition-transform" />
                      ) : (
                        <ChevronDown size={16} className="text-[#A68052] group-hover:translate-y-0.5 transition-transform" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="editorial-prose w-full text-[#706458] italic">
                <p>Thông tin chi tiết về cây đàn đang được nghệ nhân xưởng Đức Ngân cập nhật...</p>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 04. EDITORIAL INSTRUMENT COLLECTION                                       */}
        {/* ========================================================================= */}
        {relatedProducts.length > 0 && (
          <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 border-t border-[#E3DACD]/60 pt-14 sm:pt-20">
            {/* Editorial Collection Header */}
            <div className="flex items-end justify-between mb-8 sm:mb-12">
              <div>
                <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#A68052] block mb-1.5">
                  BỘ SƯU TẬP
                </span>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#1F1610] tracking-tight">
                  Nhạc cụ cùng danh mục
                </h2>
              </div>
              <Link
                href={`/products?category=${product.categoryId}`}
                className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-[13px] font-medium uppercase tracking-[0.16em] text-[#706458] hover:text-[#1F1610] transition-colors select-none pb-0.5"
              >
                <span>XEM TẤT CẢ</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Editorial Instrument Strip: Image-first, No Card Borders, Natural Breathing Room */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group flex flex-col cursor-pointer select-none"
                >
                  {/* AMBIENT EXHIBITION STAGE */}
                  <AmbientProductStage
                    src={rel.thumbnail}
                    alt={rel.name}
                    aspectClass="aspect-[3/4] sm:aspect-[4/5]"
                    paddingClass="p-3.5 sm:p-5"
                  />

                  {/* Editorial Caption Area */}
                  <div className="mt-3.5 sm:mt-4 space-y-1">
                    {/* Title & Understated Arrow */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-base sm:text-lg lg:text-[19px] font-normal leading-snug text-[#1F1610] transition-colors duration-300 group-hover:text-[#A68052] line-clamp-1">
                        {rel.name}
                      </h3>
                      <span
                        className="hidden text-sm text-[#A68052] opacity-0 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-block"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>

                    {/* Secondary Category / Construction Metadata */}
                    <div className="font-sans text-[11px] sm:text-xs text-[#8C7E72] font-normal tracking-wide truncate">
                      {rel.categoryName}
                    </div>

                    {/* Secondary Muted Price */}
                    <div className="font-sans text-xs sm:text-[13px] text-[#706458] font-normal pt-0.5">
                      {rel.price ? formatCurrency(rel.price) : "Liên hệ tư vấn"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 05. FULLSCREEN PRODUCT LIGHTBOX (PORTAL Z-[100])                          */}
      {/* ========================================================================= */}
      <ModalBase
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        theme="dark"
        maxWidth="max-w-[95vw]"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Phóng to chi tiết nhạc cụ ${product.name}`}
          className="relative flex flex-col items-center justify-between min-h-[85vh] w-full"
        >
          {/* Top Bar with Title & Close Button */}
          <div className="relative z-10 w-full flex items-center justify-between px-2 pt-1 pb-2">
            <div className="text-left">
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
                {product.categoryName}
              </span>
              <h3 className="font-display text-base sm:text-lg text-white font-medium truncate max-w-[280px] sm:max-w-md">
                {product.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/25 hover:text-white transition-all cursor-pointer shadow-lg"
              aria-label="Close Lightbox"
            >
              <X size={22} />
            </button>
          </div>

          {/* Main Full-Screen Image Container (Center-stage high definition, touch swipeable) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative z-10 w-full max-w-[85vw] h-[60vh] sm:h-[68vh] flex items-center justify-center my-auto touch-pan-y select-none"
          >
            {/* Prev image button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Ảnh trước"
                className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xl backdrop-blur-xs"
              >
                <ChevronLeft size={26} />
              </button>
            )}

            {/* Stacked Animated Image Frame */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    safeImageIndex === idx
                      ? "opacity-100 scale-100 z-10 pointer-events-auto"
                      : "opacity-0 scale-95 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - Ảnh ${idx + 1}`}
                    fill
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                    sizes="90vw"
                    priority
                  />
                </div>
              ))}
            </div>

            {/* Next image button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Ảnh kế tiếp"
                className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xl backdrop-blur-xs"
              >
                <ChevronRight size={26} />
              </button>
            )}
          </div>

          {/* Thumbnails Navigation Strip at Bottom */}
          {images.length > 1 ? (
            <div className="relative z-10 flex items-center gap-3 overflow-x-auto max-w-full px-4 pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  aria-label={`Xem góc ${idx + 1}`}
                  className={`relative h-14 w-18 sm:h-16 sm:w-20 shrink-0 overflow-hidden rounded-[2px] border transition-all duration-200 cursor-pointer ${
                    safeImageIndex === idx
                      ? "border-[#E5C398] ring-2 ring-[#E5C398] scale-105"
                      : "border-white/25 opacity-60 hover:opacity-100 hover:scale-102"
                  }`}
                >
                  <Image src={img} alt={`Góc ${idx + 1}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          ) : (
            <div className="h-6" />
          )}
        </div>
      </ModalBase>

      {/* ========================================================================= */}
      {/* 06. MOBILE STICKY BOTTOM ACTION BAR (LG:HIDDEN)                           */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E3DACD] px-4 py-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom))] flex items-center gap-2.5 lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        {/* Primary Hotline Call CTA */}
        <a
          href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-3 rounded-[2px] bg-[#241711] font-sans text-xs font-bold uppercase tracking-wider text-[#E5C398] active:scale-[0.98] transition-transform shadow-xs cursor-pointer"
        >
          <Phone size={14} className="text-[#C5A880]" />
          <span>Gọi tư vấn</span>
        </a>

        {/* Secondary Zalo Chat Consultation */}
        <a
          href={`https://zalo.me/${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 rounded-[2px] border border-[#B49368] bg-white font-sans text-xs font-semibold uppercase tracking-wider text-[#241711] active:scale-[0.98] transition-transform shadow-2xs cursor-pointer"
        >
          <MessageCircle size={15} className="text-[#8C6B3E]" />
          <span>Nhắn Zalo</span>
        </a>
      </div>
    </div>
  );
}
