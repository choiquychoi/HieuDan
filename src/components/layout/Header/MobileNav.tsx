"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Clock, MapPin } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { SHOWROOM_INFO } from "@/data/navigation";
import Logo from "./Logo";
import ModalPortal from "@/components/ui/ModalPortal";

interface MobileNavProps {
  isDarkTheme?: boolean;
}

export default function MobileNav({ isDarkTheme = true }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="xl:hidden">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Mở menu điều hướng"
        className={`flex items-center justify-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none cursor-pointer ${
          isDarkTheme
            ? "h-11 w-11 border border-[#B49368]/45 bg-[#3E1F10]/90 text-[#D8CDBD] hover:border-[#B49368] hover:bg-[#5C2B13] hover:text-[#E5C398]"
            : "h-9.5 w-9.5 sm:h-10 sm:w-10 border border-[#D8CDBD] bg-white/90 text-[#4A3F35] hover:border-[#B49368] hover:text-[#1F1610] shadow-xs"
        }`}
      >
        <Menu size={isDarkTheme ? 20 : 18} strokeWidth={1.5} />
      </button>

      {/* Render Backdrop & Drawer through ModalPortal directly into document.body */}
      <ModalPortal>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Drawer */}
        <aside
          data-lenis-prevent
          className={`fixed inset-y-0 right-0 z-[130] flex h-dvh w-[310px] max-w-[85vw] flex-col border-l border-[#B49368]/35 bg-[#2D160B] shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Menu điều hướng di động"
          aria-hidden={!isOpen}
        >
          {/* Drawer Header */}
          <div className="flex h-16 sm:h-18 shrink-0 items-center justify-between border-b border-[#B49368]/25 px-5 bg-[#241208]">
            <Logo onClick={closeMenu} />
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Đóng menu"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#B49368]/45 bg-[#3E1F10] text-[#E5C398] transition-colors hover:border-[#B49368] hover:bg-[#5C2B13] hover:text-white cursor-pointer"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto px-5 py-5 space-y-4 editorial-scrollbar"
          >
            <nav className="flex flex-col space-y-1">
              {/* 1. TRANG CHỦ */}
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center rounded-[2px] px-3 py-3 font-sans text-[15px] font-medium text-[#F5F0E7] transition-colors hover:bg-[#3E1F10] hover:text-[#E5C398]"
              >
                Trang chủ
              </Link>

              {/* 2. NHẠC CỤ (Accordion) */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsProductsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-[2px] px-3 py-3 font-sans text-[15px] font-medium text-[#F5F0E7] transition-colors hover:bg-[#3E1F10] hover:text-[#E5C398]"
                >
                  <span>Nhạc cụ</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isProductsOpen ? "rotate-180 text-[#B49368]" : "text-[#D8CDBD]/70"
                    }`}
                  />
                </button>

                {isProductsOpen && (
                  <div className="my-1 ml-3 flex flex-col space-y-1 border-l-2 border-[#B49368]/40 pl-3 animate-fade-in">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.slug}`}
                        onClick={closeMenu}
                        className="rounded-[2px] px-2 py-2 font-sans text-xs sm:text-sm text-[#D8CDBD] transition-colors hover:bg-[#3E1F10] hover:text-[#E5C398]"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      onClick={closeMenu}
                      className="rounded-[2px] px-2 py-2 font-sans text-xs font-semibold text-[#C5A880] hover:text-[#E5C398]"
                    >
                      Xem tất cả tác phẩm →
                    </Link>
                  </div>
                )}
              </div>

              {/* 3. CÂU CHUYỆN */}
              <Link
                href="/stories"
                onClick={closeMenu}
                className="flex items-center rounded-[2px] px-3 py-3 font-sans text-[15px] font-medium text-[#F5F0E7] transition-colors hover:bg-[#3E1F10] hover:text-[#E5C398]"
              >
                Câu chuyện
              </Link>

              {/* 4. VỀ ĐỨC NGÂN */}
              <Link
                href="/about"
                onClick={closeMenu}
                className="flex items-center rounded-[2px] px-3 py-3 font-sans text-[15px] font-medium text-[#F5F0E7] transition-colors hover:bg-[#3E1F10] hover:text-[#E5C398]"
              >
                Về Đức Ngân
              </Link>

              {/* 5. Tin Tức */}
              <Link
                href="/news"
                onClick={closeMenu}
                className="flex items-center rounded-[2px] px-3 py-3 font-sans text-[15px] font-medium text-[#F5F0E7] transition-colors hover:bg-[#3E1F10] hover:text-[#E5C398]"
              >
                Tin Tức
              </Link>

              {/* 6. LIÊN HỆ */}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex items-center rounded-[2px] px-3 py-3 font-sans text-[15px] font-medium text-[#F5F0E7] transition-colors hover:bg-[#3E1F10] hover:text-[#E5C398]"
              >
                Liên hệ
              </Link>
            </nav>
          </div>

          {/* Drawer Footer Showroom Info */}
          <div className="border-t border-[#B49368]/25 bg-[#241208] p-4 sm:p-5 space-y-2.5 sm:space-y-3 font-sans text-xs text-[#E9E0D2] shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-[#C5A880] shrink-0 mt-0.5" />
              <span>{SHOWROOM_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#C5A880] shrink-0" />
              <span>{SHOWROOM_INFO.workingHours}</span>
            </div>

            <a
              href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-[2px] bg-[#B49368] py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#241711] shadow-xs hover:bg-[#C5A880] transition-colors mt-2 cursor-pointer"
            >
              <Phone size={14} />
              <span>Hotline: {SHOWROOM_INFO.hotline}</span>
            </a>
          </div>
        </aside>
      </ModalPortal>
    </div>
  );
}
