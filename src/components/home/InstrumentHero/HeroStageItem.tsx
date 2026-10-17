"use client";

import React from "react";
import Image from "next/image";
import { Instrument } from "@/types";

interface HeroStageItemProps {
  instrument: Instrument;
  continuousSlot: number;
  isDragging: boolean;
  isDetailOpen?: boolean;
  parallaxOffset: { x: number; y: number };
  onSelect: () => void;
}

export default function HeroStageItem({
  instrument,
  continuousSlot,
  isDragging,
  isDetailOpen = false,
  parallaxOffset,
  onSelect,
}: HeroStageItemProps) {
  const presentation = instrument.heroPresentation || {
    cutoutScale: 1.0,
    offsetY: "0px",
    offsetX: "0px",
    shadowBottom: "8%",
    shadowX: "50%",
    shadowWidth: "50%",
    shadowHeight: "16px",
    shadowRotation: "0deg",
  };

  const dist = Math.abs(continuousSlot);
  const isActive = dist < 0.35;
  const isLeft = continuousSlot <= -0.35 && continuousSlot > -1.65;
  const isRight = continuousSlot >= 0.35 && continuousSlot < 1.65;

  // Scale: 1.0 at center (dist=0), 0.48 at preview (dist=1), 0.35 at far (dist>=2)
  let scale = 1.0;
  if (dist <= 1) {
    scale = 1.0 - 0.52 * dist;
  } else if (dist <= 2) {
    scale = 0.48 - 0.13 * (dist - 1);
  } else {
    scale = 0.35;
  }

  // Opacity on Desktop: 1.0 at center, 0.6 at preview, 0 at far
  let opacityDesktop = 1.0;
  if (dist <= 1) {
    opacityDesktop = 1.0 - 0.4 * dist;
  } else if (dist <= 2) {
    opacityDesktop = Math.max(0, 0.6 * (2 - dist));
  } else {
    opacityDesktop = 0.0;
  }

  // Opacity on Mobile (< md): only visible near center
  let opacityMobile = 1.0;
  if (dist <= 1) {
    opacityMobile = Math.max(0, 1.0 - dist);
  } else {
    opacityMobile = 0.0;
  }

  // Dynamic Z-Index
  const zIndex = Math.max(0, Math.round(30 - 15 * dist));

  const transitionStyle = isDragging
    ? "none"
    : "transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms cubic-bezier(0.22, 1, 0.36, 1)";

  const ariaLabel = isActive
    ? `Nhạc cụ đang chọn: ${instrument.name}. Nhấp để xem thông tin chi tiết và nghe thử âm sắc.`
    : isLeft
    ? `Chuyển về nhạc cụ trước: ${instrument.name}`
    : isRight
    ? `Chuyển sang nhạc cụ kế tiếp: ${instrument.name}`
    : instrument.name;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center select-none ${
        isDetailOpen && !isActive ? "opacity-0 pointer-events-none" : "pointer-events-auto"
      } opacity-[var(--item-op-mobile)] md:opacity-[var(--item-op-desktop)] transition-opacity duration-500`}
      style={{
        transform: `translate3d(calc(${continuousSlot.toFixed(4)} * var(--offset-right)), 0, 0) scale(${scale.toFixed(4)})`,
        zIndex: isDetailOpen && isActive ? 40 : zIndex,
        transition: transitionStyle,
        transformOrigin: "center center",
        ["--item-op-desktop" as string]: isDetailOpen && !isActive ? "0" : opacityDesktop.toFixed(3),
        ["--item-op-mobile" as string]: isDetailOpen && !isActive ? "0" : opacityMobile.toFixed(3),
      }}
    >
      <button
        type="button"
        onClick={isDetailOpen ? undefined : onSelect}
        disabled={isDetailOpen && isActive}
        aria-label={ariaLabel}
        className={`relative group/stage-item flex items-center justify-center w-full h-full outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 border-0 border-none select-none ${
          isDetailOpen ? "cursor-default" : "cursor-pointer"
        }`}
      >
        {/* Layer 1: Warm Amber Ground Glow beneath the shadow (Exact per-instrument alignment) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute rounded-[100%] transition-all duration-700 ${
            isActive
              ? "bg-radial from-[#B49368]/40 via-[#B49368]/12 to-transparent blur-xl opacity-90"
              : "bg-radial from-[#B49368]/20 to-transparent blur-md opacity-35"
          }`}
          style={{
            bottom: presentation.shadowBottom,
            left: presentation.shadowX || "50%",
            width: isActive
              ? `calc(${presentation.shadowWidth} * 1.15)`
              : `calc(${presentation.shadowWidth} * 0.85)`,
            height: isActive
              ? `calc(${presentation.shadowHeight || "16px"} * 2.2)`
              : `calc(${presentation.shadowHeight || "16px"} * 1.2)`,
            transform: `translateX(-50%) rotate(${presentation.shadowRotation || "0deg"})`,
          }}
        />

        {/* Layer 2: Dark Core Contact Shadow (Exact per-instrument alignment) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute rounded-[100%] bg-[#040201]/95 blur-md transition-all duration-700 ${
            isActive ? "animate-shadow-breathe" : "opacity-50"
          }`}
          style={{
            bottom: presentation.shadowBottom,
            left: presentation.shadowX || "50%",
            width: isActive ? presentation.shadowWidth : `calc(${presentation.shadowWidth} * 0.85)`,
            height: isActive
              ? (presentation.shadowHeight || "16px")
              : `calc(${presentation.shadowHeight || "16px"} * 0.75)`,
            transform: `translateX(-50%) rotate(${presentation.shadowRotation || "0deg"})`,
          }}
        />

        {/* Layer 3: Warm Bronze Rim Glow / Soft Amber Backlight behind active instrument */}
        {isActive && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] sm:h-[380px] lg:h-[440px] w-[300px] sm:w-[380px] lg:w-[440px] rounded-full bg-radial from-[#E5C398]/22 via-[#B49368]/12 to-transparent blur-3xl animate-halo-breathe"
          />
        )}

        {/* Layer 4: Subtle Bronze Backlight for Side Preview items */}
        {(isLeft || isRight) && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-radial from-[#B49368]/18 via-transparent to-transparent blur-xl"
          />
        )}

        {/* Layer 5: Instrument Transparent PNG Cutout with Multi-layered Drop Shadows */}
        <div
          className={`relative w-full h-full flex items-center justify-center transition-transform duration-500 ${
            isActive && !isDragging ? "animate-poetic-float" : ""
          }`}
          style={{
            transform: isActive
              ? `translate3d(${parallaxOffset.x * 8}px, ${parallaxOffset.y * 6}px, 0) scale(${presentation.cutoutScale || 1})`
              : `scale(${presentation.cutoutScale || 1})`,
          }}
        >
          <Image
            src={instrument.image}
            alt={instrument.name}
            fill
            draggable={false}
            sizes="(max-width: 640px) 340px, (max-width: 1024px) 460px, 540px"
            className={`object-contain transition-all duration-500 pointer-events-none select-none ${
              isActive
                ? "drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_0_22px_rgba(180,147,104,0.32)] drop-shadow-[0_0_4px_rgba(229,195,152,0.22)] filter contrast-[1.06] brightness-[1.04] group-hover/stage-item:scale-[1.025]"
                : "drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] drop-shadow-[0_0_12px_rgba(180,147,104,0.18)] filter contrast-[0.98] brightness-[0.88]"
            }`}
            priority={isActive}
          />

          {/* Golden Sheen Overlay across active instrument */}
          {isActive && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-[#FFFCF5]/8 to-transparent opacity-0 transition-opacity duration-700 group-hover/stage-item:opacity-100"
            />
          )}
        </div>

        {/* Subtle Preview Label for Left/Right Side Items (Desktop & Tablet only) */}
        {(isLeft || isRight) && (
          <div
            className={`hidden md:block absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#B49368]/30 bg-[#180F0B]/90 px-3.5 py-1 cta-label text-[#E5C398] backdrop-blur-md shadow-lg transition-opacity duration-300 ${
              isLeft || isRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <span>{instrument.name}</span>
          </div>
        )}
      </button>
    </div>
  );
}
