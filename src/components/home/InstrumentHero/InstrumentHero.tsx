"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INSTRUMENTS } from "@/data/instruments";
import { useHeroCarousel } from "./useHeroCarousel";
import HeroStageCarousel from "./HeroStageCarousel";
import InstrumentDetailOverlay from "./InstrumentDetailOverlay";

const HERO_BG_IMAGE = "/images/hero/showroom-stage1.jpg";
const HERO_BG_IMAGE_MOBILE = "/images/hero/showroom-stage1-mobile.jpg";

export default function InstrumentHero() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const {
    displayIndex,
    currentInstrument,
    dragProgress,
    isDragging,
    isTransitioning,
    stageItems,
    handleNext,
    handlePrev,
    handleSelectDot,
    updateDrag,
    settleDrag,
  } = useHeroCarousel(isDetailOpen);

  // Subtle 2D pointer parallax
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;

    const { clientX, clientY, currentTarget } = e;
    if (!currentTarget) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const x = ((clientX - left) / width - 0.5) * 2;
      const y = ((clientY - top) / height - 0.5) * 2;
      setParallaxOffset({ x, y });
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setParallaxOffset({ x: 0, y: 0 });
  }, []);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleOpenDetail = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setIsDetailOpen(true);
  }, []);

  const common = {
    alt: "Không gian trưng bày Hiệu Đàn Đức Ngân",
    fill: true,
    quality: 90,
    priority: true,
  };
  
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: HERO_BG_IMAGE,
    sizes: "(min-width: 768px) 100vw, 10vw",
  });
  
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: HERO_BG_IMAGE_MOBILE,
    sizes: "(max-width: 768px) 100vw, 10vw",
  });

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-screen h-[100dvh] min-h-[560px] sm:min-h-[640px] flex flex-col justify-between items-center overflow-hidden bg-[#140C08] text-[#FFFCF5] pt-24 sm:pt-28 lg:pt-36 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-5 lg:pb-6 select-none [--offset-left:-120%] [--offset-right:120%] [--offset-far-left:-200%] [--offset-far-right:200%] md:[--offset-left:-290px] md:[--offset-right:290px] md:[--offset-far-left:-580px] md:[--offset-far-right:580px] lg:[--offset-left:-370px] lg:[--offset-right:370px] lg:[--offset-far-left:-720px] lg:[--offset-far-right:720px] xl:[--offset-left:-440px] xl:[--offset-right:440px] xl:[--offset-far-left:-840px] xl:[--offset-far-right:840px]"
      aria-label="Triển lãm nhạc cụ truyền thống Đức Ngân"
    >
      {/* Semantic Top-Level Document Heading for Accessibility & SEO */}
      <h1 className="sr-only">Hiệu Đàn Đức Ngân — Nhạc Cụ Cổ Truyền Việt Nam</h1>

      {/* 1. Recognisable Showroom Exhibition Atmosphere (Luminous warm gallery ambiance) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-parallaxOffset.x * 3}px, ${-parallaxOffset.y * 2}px, 0)`,
        }}
      >
        {/* Art-Directed Background: Mobile and Desktop */}
        <picture className="absolute inset-0">
          <source media="(min-width: 768px)" srcSet={desktop} />
          <source media="(max-width: 767px)" srcSet={mobile} />
          <img {...rest} className="object-cover object-center lg:object-[60%_35%] opacity-100" />
        </picture>

        {/* Header blend at the very top */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#140C08]/50 to-transparent" />
      </div>

      {/* 2. Sparse Amber Dust Motes (7 soft blurred particles) */}
      <div className="pointer-events-none absolute inset-0 z-5 overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute left-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#E5C398]/40 blur-[0.5px] animate-mote-1"
        />
        <span
          aria-hidden="true"
          className="absolute left-[82%] top-[28%] h-2 w-2 rounded-full bg-[#B49368]/35 blur-[0.5px] animate-mote-2"
        />
        <span
          aria-hidden="true"
          className="absolute left-[32%] top-[72%] h-1 w-1 rounded-full bg-[#E5C398]/30 blur-[0.5px] animate-mote-3"
        />
        <span
          aria-hidden="true"
          className="absolute left-[68%] top-[68%] h-1.5 w-1.5 rounded-full bg-[#B49368]/30 blur-[0.5px] animate-mote-1"
        />
        <span
          aria-hidden="true"
          className="absolute left-[48%] top-[18%] h-1.5 w-1.5 rounded-full bg-[#E5C398]/25 blur-[0.5px] animate-mote-2"
        />
        <span
          aria-hidden="true"
          className="absolute left-[24%] top-[60%] h-1 w-1 rounded-full bg-[#B49368]/20 blur-[0.5px] animate-mote-3"
        />
        <span
          aria-hidden="true"
          className="absolute left-[75%] top-[45%] h-1.5 w-1.5 rounded-full bg-[#E5C398]/25 blur-[0.5px] animate-mote-1"
        />
      </div>

      {/* 3. Top Royal Exhibition Title (Clickable to open Detail Mode) */}
      <div
        className={`relative z-20 w-full max-w-[1720px] mx-auto px-4 text-center shrink-0 pt-1.5 sm:pt-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDetailOpen ? "opacity-0 -translate-y-3 pointer-events-none" : "opacity-100 translate-y-0 delay-150"
        }`}
      >
        <h2 className="mt-1 font-serif text-2xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#FFFCF5] font-normal tracking-wide leading-tight drop-shadow-md">
          <button
            type="button"
            onClick={handleOpenDetail}
            aria-label={`Xem thông tin chi tiết ${currentInstrument.name}`}
            className="group/title inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B49368] focus-visible:ring-offset-4 focus-visible:ring-offset-[#180F0B] rounded-sm cursor-pointer transition-transform duration-500 hover:scale-[1.015] active:scale-[0.985] text-inherit font-inherit"
          >
            {currentInstrument.name}
          </button>
        </h2>
      </div>

      {/* 4. Center Visual Stage (Three-Instrument Stage Carousel with 1:1 Continuous Physics Drag) */}
      <HeroStageCarousel
        stageItems={stageItems}
        dragProgress={dragProgress}
        isDragging={isDragging}
        isTransitioning={isTransitioning}
        isDetailOpen={isDetailOpen}
        parallaxOffset={parallaxOffset}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenDetail={handleOpenDetail}
        updateDrag={updateDrag}
        settleDrag={settleDrag}
      />

      {/* 5. Bottom Controls: Information Button & Slide Indicator Dots */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-2.5 sm:gap-3.5 shrink-0 pb-1 sm:pb-2">
        {/* Prominent Buttons to View Instrument Information & Sound (Fades out in Detail Mode) */}
        <div
          className={`flex items-center justify-center gap-2 sm:gap-3.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isDetailOpen ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0 delay-150"
          }`}
        >
          <button
            type="button"
            onClick={handleOpenDetail}
            aria-label={`Xem thông tin chi tiết và âm sắc ${currentInstrument.name}`}
            className="group/detail inline-flex min-h-[40px] sm:min-h-[44px] items-center gap-2 sm:gap-3 rounded-full border border-[#B49368]/70 bg-[#241711]/90 px-4.5 sm:px-8 py-2 sm:py-2.5 font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#E5C398] backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-[#B49368] hover:bg-[#B49368] hover:text-[#241711] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Xem thông tin & âm sắc</span>
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/detail:translate-x-0.5 group-hover/detail:-translate-y-0.5" />
          </button>

          <Link
            href="/products"
            className="hidden sm:inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#554134]/80 bg-[#180F0B]/80 px-5 sm:px-7 py-2.5 sm:py-3 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D8CDBD] backdrop-blur-md transition-all duration-300 hover:border-[#B49368]/70 hover:text-[#FFFCF5] hover:bg-[#241711]"
          >
            <span>Khám phá nhạc cụ</span>
          </Link>
        </div>

        {/* Slide Indicator Dots (Always accessible) */}
        <div
          data-lenis-prevent
          role="tablist"
          aria-label="Chuyển slide nhạc cụ"
          className="flex items-center justify-center gap-1.5 sm:gap-2"
        >
          {INSTRUMENTS.map((inst, idx) => (
            <button
              key={inst.id}
              type="button"
              role="tab"
              aria-selected={idx === displayIndex}
              aria-label={`Chọn nhạc cụ: ${inst.name}`}
              onClick={() => handleSelectDot(idx)}
              className="flex min-h-[44px] min-w-[32px] items-center justify-center px-1 cursor-pointer touch-manipulation"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === displayIndex
                    ? "w-8 sm:w-9 bg-[#B49368]"
                    : "w-1.5 bg-[#D8CDBD]/40 hover:bg-[#D8CDBD]/80"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 6. In-Place Full-Hero Exhibition Detail Mode */}
      <InstrumentDetailOverlay
        instrument={currentInstrument}
        displayIndex={displayIndex}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onSelectDot={handleSelectDot}
      />
    </section>
  );
}
