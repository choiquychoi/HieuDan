"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, Volume2, Layers, Hammer, Info, ArrowRight } from "lucide-react";
import { Instrument } from "@/types";
import InstrumentAudioPlayer from "./InstrumentAudioPlayer";
import ModalPortal from "@/components/ui/ModalPortal";

interface InstrumentDetailOverlayProps {
  instrument: Instrument;
  displayIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectDot?: (index: number) => void;
}

type TabType = "intro" | "sound" | "material" | "craft";

interface TabItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: "intro", label: "Giới thiệu", icon: Info },
  { id: "sound", label: "Âm thanh", icon: Volume2 },
  { id: "material", label: "Chất liệu", icon: Layers },
  { id: "craft", label: "Chế tác", icon: Hammer },
];

export default function InstrumentDetailOverlay({
  instrument,
  isOpen,
  onClose,
}: InstrumentDetailOverlayProps) {
  const [activeTab, setActiveTab] = useState<TabType>("intro");

  // Lock background page scroll strictly while detail mode is open and teleport to top
  useEffect(() => {
    if (!isOpen) return;

    // Teleport viewport immediately to the top of homepage so the stage & controls are 100% visible
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Escape key handler to close detail mode
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* 1. Backdrop Click-to-Close (Transparent, clicking anywhere outside dossier closes modal) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 2. Standalone Top-Right Close Button (Active on Mobile & Desktop) */}
      <ModalPortal>
        <div
          className={`fixed top-24 right-3.5 sm:top-28 sm:right-8 lg:top-36 lg:right-12 z-[100] transition-all duration-300 ease-out ${
            isOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Đóng chế độ xem chi tiết"
            className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-[#B49368] bg-[#241711] text-[#E5C398] hover:border-[#E5C398] hover:bg-[#B49368] hover:text-[#180F0B] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-2xl backdrop-blur-md"
          >
            <X size={20} strokeWidth={2.2} />
          </button>
        </div>
      </ModalPortal>

      {/* 3. In-Place Exhibition Editorial Dossier Panel (Floating seamlessly like PC) */}
      <div
        data-lenis-prevent
        className={`absolute z-30 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen
            ? "opacity-100 translate-x-0 translate-y-0 pointer-events-auto delay-150"
            : "opacity-0 translate-x-12 translate-y-0 pointer-events-none"
        } 
        /* Mobile / Tablet (< lg): Seamless floating in lower half like PC */
        inset-x-3.5 sm:inset-x-6 bottom-4 sm:bottom-8 top-[46%] sm:top-[44%] overflow-y-auto px-1 pb-6 editorial-scrollbar
        /* Desktop (lg+): Right Column Dossier with 4 Vertical Controls on Far Right */
        lg:inset-auto lg:right-8 xl:right-16 lg:top-1/2 lg:-translate-y-1/2 lg:w-[500px] xl:w-[580px] lg:max-h-[82dvh] lg:overflow-y-auto lg:pr-2.5 hero-dossier-compact`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-10 w-full min-w-0">
          
          {/* Main Information Panel (Protected by subtle dark translucent plaque on mobile) */}
          <div className="flex-1 min-w-0 flex flex-col justify-center rounded-2xl lg:rounded-none bg-[#140C08]/85 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border border-[#B49368]/35 lg:border-none p-4 sm:p-5 lg:p-0 shadow-2xl lg:shadow-none">
            {/* Eyebrow Category Tag */}
            <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#E5C398] drop-shadow-sm">
              DI SẢN ÂM SẮC
            </span>

            {/* Large Instrument Name */}
            <h2 className="mt-1 font-serif text-2xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-[#FFFCF5] font-normal tracking-wide leading-tight drop-shadow-md">
              {instrument.name}
            </h2>
            {instrument.alternateName && (
              <p className="font-sans text-xs sm:text-sm text-[#E5C398]/85 italic mt-0.5 drop-shadow-xs">
                ({instrument.alternateName})
              </p>
            )}

            {/* Mobile / Tablet Horizontal Tab Row (< lg) */}
            <div
              role="tablist"
              aria-label="Chuyển mục thông tin"
              className="flex lg:hidden items-center gap-1.5 overflow-x-auto pb-1 mt-3.5 border-b border-[#3A2920]/80"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full min-h-[38px] px-3.5 py-2 font-sans text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer touch-manipulation ${
                      isActive
                        ? "bg-[#B49368] text-[#140C08] shadow-md font-bold"
                        : "border border-[#B49368]/40 bg-[#241711]/85 text-[#F5F0E7] hover:border-[#B49368] hover:text-white"
                    }`}
                  >
                    <Icon size={13} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Pane (Cross-fades smoothly on tab switch) */}
            <div className="min-h-[120px] sm:min-h-[150px] flex flex-col justify-center mt-2.5 sm:mt-5">
              
              {/* TAB 1: GIỚI THIỆU */}
              {activeTab === "intro" && (
                <div className="space-y-2.5 animate-in fade-in duration-300 font-sans text-sm sm:text-[15px] leading-relaxed text-[#F5F0E7] font-normal">
                  <p className="drop-shadow-xs">{instrument.shortDescription}</p>
                  {instrument.origin && (
                    <p className="text-xs sm:text-sm text-[#F5F0E7] pt-1">
                      <span className="text-[#E5C398] font-semibold">Không gian diễn xướng: </span>
                      {instrument.origin}
                    </p>
                  )}
                </div>
              )}

              {/* TAB 2: ÂM THANH */}
              {activeTab === "sound" && (
                <div className="space-y-3.5 animate-in fade-in duration-300 font-sans">
                  {instrument.soundDescription && (
                    <blockquote className="border-l-2 border-[#B49368] pl-3.5 font-sans text-sm sm:text-base italic text-[#FFFCF5] leading-relaxed drop-shadow-xs">
                      &ldquo;{instrument.soundDescription}&rdquo;
                    </blockquote>
                  )}

                  {instrument.audio ? (
                    <div className="pt-1">
                      <InstrumentAudioPlayer audio={instrument.audio} instrumentName={instrument.name} />
                    </div>
                  ) : (
                    <p className="text-xs text-[#F5F0E7]/75 italic">
                      Bản thu âm trực tiếp từ xưởng nghệ nhân Đức Ngân đang được hoàn thiện.
                    </p>
                  )}
                </div>
              )}

              {/* TAB 3: CHẤT LIỆU */}
              {activeTab === "material" && (
                <div className="space-y-2.5 animate-in fade-in duration-300 font-sans text-xs sm:text-sm">
                  <div>
                    <span className="text-[#E5C398] font-semibold block mb-1.5 uppercase tracking-wider text-xs">
                      Chất liệu chế tác:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {instrument.material ? (
                        instrument.material.split(",").map((mat, idx) => (
                          <span
                            key={idx}
                            className="rounded-[2px] border border-[#B49368]/40 bg-[#241711]/90 px-2.5 py-1 text-xs text-[#F5F0E7] font-medium"
                          >
                            {mat.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-[#F5F0E7]/80">Gỗ tự nhiên lâu năm tuyển chọn</span>
                      )}
                    </div>
                  </div>

                  {instrument.strings && (
                    <p className="text-xs sm:text-sm text-[#F5F0E7] pt-1">
                      <span className="text-[#E5C398] font-semibold">Quy cách dây: </span>
                      {instrument.strings}
                    </p>
                  )}
                </div>
              )}

              {/* TAB 4: CHẾ TÁC */}
              {activeTab === "craft" && (
                <div className="space-y-2 animate-in fade-in duration-300 font-sans text-xs sm:text-sm text-[#F5F0E7] leading-relaxed font-normal">
                  {instrument.characteristic && (
                    <p>
                      <span className="text-[#E5C398] font-semibold">Kỹ nghệ: </span>
                      {instrument.characteristic}
                    </p>
                  )}
                  <p>
                    <span className="text-[#E5C398] font-semibold">Thẩm âm: </span>
                    Gia công thủ công từng chi tiết phím cần, cẩn xà cừ và thẩm âm độc bản bởi nghệ nhân Đức Ngân.
                  </p>
                  <p className="text-xs text-[#E5C398] font-medium pt-1">
                    ✓ Bảo hành âm thanh trọn đời, hỗ trợ cân chỉnh phím phách định kỳ tại xưởng.
                  </p>
                </div>
              )}
            </div>

            {/* Direct CTA button to browse this instrument in the catalogue */}
            <div className="mt-4 pt-3.5 border-t border-[#B49368]/30 flex items-center justify-between">
              <Link
                href={`/products?category=${instrument.categorySlug || instrument.slug}`}
                onClick={onClose}
                className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#B49368] text-[#140C08] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#CDB38B] transition-all duration-200 shadow-md cursor-pointer active:scale-95"
              >
                <span>Xem các mẫu {instrument.name} tại xưởng</span>
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Vertical 4-Control Stack on Far Right (Desktop lg+) */}
          <div className="hidden lg:flex flex-col gap-2.5 shrink-0">
            <div
              role="tablist"
              aria-label="Các phần thông tin chi tiết nhạc cụ"
              className="flex flex-col gap-2 w-[140px]"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full font-sans text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer text-left ${
                      isActive
                        ? "bg-[#B49368] text-[#180F0B] font-semibold shadow-md scale-[1.02]"
                        : "border border-[#B49368]/40 bg-[#241711]/70 text-[#F5F0E7] hover:border-[#B49368] hover:text-[#FFFCF5] hover:bg-[#241711]/90"
                    }`}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
