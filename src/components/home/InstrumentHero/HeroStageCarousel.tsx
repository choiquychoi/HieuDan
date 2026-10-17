"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StageSlotItem } from "./useHeroCarousel";
import HeroStageItem from "./HeroStageItem";

interface HeroStageCarouselProps {
  stageItems: StageSlotItem[];
  dragProgress: number;
  isDragging: boolean;
  isTransitioning: boolean;
  isDetailOpen?: boolean;
  parallaxOffset: { x: number; y: number };
  onPrev: () => void;
  onNext: () => void;
  onOpenDetail: () => void;
  updateDrag: (progress: number) => void;
  settleDrag: (target: -1 | 0 | 1) => void;
}

export default function HeroStageCarousel({
  stageItems,
  dragProgress,
  isDragging,
  isTransitioning,
  isDetailOpen = false,
  parallaxOffset,
  onPrev,
  onNext,
  onOpenDetail,
  updateDrag,
  settleDrag,
}: HeroStageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isHorizontalDragRef = useRef<boolean | null>(null);
  const hasDraggedFarRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isTransitioning || isDetailOpen) return;
    if (e.button !== 0) return; // Only primary mouse/touch button

    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startTimeRef.current = performance.now();
    isHorizontalDragRef.current = null;
    hasDraggedFarRef.current = false;
    pointerIdRef.current = e.pointerId;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startXRef.current === null || startYRef.current === null) return;

    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - startYRef.current;

    // Detect gesture axis with directional angle locking (never hijack vertical page scrolling)
    if (isHorizontalDragRef.current === null) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const distSq = deltaX * deltaX + deltaY * deltaY;

      // Only evaluate once finger moves at least 8px
      if (distSq > 64) {
        // If vertical movement dominates or is comparable, user is scrolling the page.
        // Lock to false immediately so this touch stream is completely ignored by the carousel.
        if (absY >= absX || absX < 10) {
          isHorizontalDragRef.current = false;
          return;
        }

        // Distinct horizontal intent (at least 1.3x more horizontal than vertical)
        if (absX > absY * 1.3) {
          isHorizontalDragRef.current = true;
          try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          } catch {
            // Safe fallback
          }
        } else {
          isHorizontalDragRef.current = false;
          return;
        }
      }
    }

    if (isHorizontalDragRef.current === false) return;

    if (isHorizontalDragRef.current) {
      hasDraggedFarRef.current = true;
      const width = containerRef.current?.getBoundingClientRect().width || 380;
      const stride = Math.max(220, Math.min(width * 0.75, 420));
      let p = deltaX / stride;

      // Elastic resistance beyond [-1, 1]
      if (p > 1) p = 1 + (p - 1) * 0.25;
      if (p < -1) p = -1 + (p + 1) * 0.25;

      updateDrag(p);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startXRef.current !== null && isHorizontalDragRef.current) {
      const deltaX = e.clientX - startXRef.current;
      const elapsed = Math.max(1, performance.now() - startTimeRef.current);
      const velocity = deltaX / elapsed; // px/ms
      const width = containerRef.current?.getBoundingClientRect().width || 380;
      const stride = Math.max(220, Math.min(width * 0.75, 420));
      const p = deltaX / stride;

      // Fling or drag past 22% threshold
      if (p < -0.22 || (p < -0.05 && velocity < -0.35)) {
        settleDrag(-1);
      } else if (p > 0.22 || (p > 0.05 && velocity > 0.35)) {
        settleDrag(1);
      } else {
        settleDrag(0);
      }
    }

    try {
      if (pointerIdRef.current !== null) {
        (e.currentTarget as HTMLElement).releasePointerCapture(pointerIdRef.current);
      }
    } catch {
      // Safe fallback
    }

    startXRef.current = null;
    startYRef.current = null;
    isHorizontalDragRef.current = null;
    pointerIdRef.current = null;

    setTimeout(() => {
      hasDraggedFarRef.current = false;
    }, 60);
  };

  const handlePointerCancel = () => {
    if (isHorizontalDragRef.current) {
      settleDrag(0);
    }
    startXRef.current = null;
    startYRef.current = null;
    isHorizontalDragRef.current = null;
    hasDraggedFarRef.current = false;
    pointerIdRef.current = null;
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 min-h-0 flex items-center justify-center px-2 sm:px-6 lg:px-10 my-1 sm:my-2 select-none">
      {/* Navigation Arrow Left */}
      <button
        type="button"
        aria-label="Nhạc cụ trước"
        onClick={onPrev}
        disabled={isTransitioning || isDetailOpen || isDragging}
        className={`absolute top-1/2 left-1 min-[360px]:left-2 sm:left-4 lg:left-8 z-40 flex h-9 w-9 min-[400px]:h-10 min-[400px]:w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8CDBD]/30 bg-[#241711]/70 text-[#FFFCF5] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#B49368] hover:bg-[#B49368] hover:text-[#241711] shadow-xl active:scale-95 ${
          isDetailOpen ? "opacity-0 pointer-events-none scale-90 invisible" : "opacity-100 scale-100 disabled:opacity-50"
        }`}
      >
        <ChevronLeft className="h-4 w-4 min-[400px]:h-5 min-[400px]:w-5 sm:h-6 sm:w-6" />
      </button>

      {/* The 5-Slot Physical Stage Carousel Container with 1:1 Continuous Drag */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`relative w-full max-w-[340px] min-[400px]:max-w-[380px] sm:max-w-[480px] lg:max-w-[550px] h-full max-h-[280px] min-[400px]:max-h-[320px] sm:max-h-[380px] lg:max-h-[440px] xl:max-h-[480px] hero-stage-compact flex items-center justify-center touch-pan-y transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDetailOpen
            ? "-translate-y-28 scale-[0.78] sm:-translate-y-32 sm:scale-85 lg:translate-y-0 lg:-translate-x-[20vw] xl:-translate-x-[22vw] lg:scale-100"
            : isDragging
            ? "cursor-grabbing translate-x-0 translate-y-0 scale-100"
            : "cursor-grab translate-x-0 translate-y-0 scale-100"
        }`}
      >
        {stageItems.map(({ instrument, baseSlot }) => {
          const continuousSlot = baseSlot + dragProgress;

          const handleSelect = () => {
            if (hasDraggedFarRef.current || isDragging || isTransitioning) return;

            if (Math.abs(continuousSlot) < 0.35) {
              onOpenDetail();
            } else if (continuousSlot < -0.35) {
              onPrev();
            } else if (continuousSlot > 0.35) {
              onNext();
            }
          };

          return (
            <HeroStageItem
              key={instrument.id}
              instrument={instrument}
              continuousSlot={continuousSlot}
              isDragging={isDragging}
              isDetailOpen={isDetailOpen}
              parallaxOffset={parallaxOffset}
              onSelect={handleSelect}
            />
          );
        })}
      </div>

      {/* Navigation Arrow Right */}
      <button
        type="button"
        aria-label="Nhạc cụ kế tiếp"
        onClick={onNext}
        disabled={isTransitioning || isDetailOpen || isDragging}
        className={`absolute top-1/2 right-1 min-[360px]:right-2 sm:right-4 lg:right-8 z-40 flex h-9 w-9 min-[400px]:h-10 min-[400px]:w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8CDBD]/30 bg-[#241711]/70 text-[#FFFCF5] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#B49368] hover:bg-[#B49368] hover:text-[#241711] shadow-xl active:scale-95 ${
          isDetailOpen ? "opacity-0 pointer-events-none scale-90 invisible" : "opacity-100 scale-100 disabled:opacity-50"
        }`}
      >
        <ChevronRight className="h-4 w-4 min-[400px]:h-5 min-[400px]:w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
}
