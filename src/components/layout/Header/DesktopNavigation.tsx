"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

interface DesktopNavigationProps {
  isDarkTheme?: boolean;
}

export default function DesktopNavigation({ isDarkTheme = true }: DesktopNavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close dropdown on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const getNavLinkClass = (isActive: boolean) =>
    `link-underline text-[13.5px] 2xl:text-[14.5px] font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] py-1 ${
      isDarkTheme
        ? isActive
          ? "text-[#E5C398] font-semibold"
          : "text-[#F5F0E7]/85 hover:text-[#E5C398]"
        : isActive
        ? "text-[#8C6B3E] font-semibold"
        : "text-[#2B241F]/85 hover:text-[#8C6B3E]"
    }`;

  const isProductsActive = pathname.startsWith("/products");

  return (
    <nav ref={containerRef} className="flex items-center gap-5 xl:gap-7 2xl:gap-8">
      {/* 1. TRANG CHỦ */}
      <Link
        href="/"
        data-active={pathname === "/" ? "true" : undefined}
        className={getNavLinkClass(pathname === "/")}
      >
        Trang chủ
      </Link>

      {/* 2. NHẠC CỤ (Mega-Dropdown with Seamless Hover Bridge) */}
      <div
        className="relative shrink-0 py-2 -my-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          data-active={isProductsActive ? "true" : undefined}
          className={`link-underline flex items-center gap-1.5 text-[13.5px] 2xl:text-[14.5px] font-medium tracking-wide whitespace-nowrap transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer py-1 ${
            isDarkTheme
              ? isOpen || isProductsActive
                ? "text-[#E5C398] font-semibold"
                : "text-[#F5F0E7]/85 hover:text-[#E5C398]"
              : isOpen || isProductsActive
              ? "text-[#8C6B3E] font-semibold"
              : "text-[#2B241F]/85 hover:text-[#8C6B3E]"
          }`}
        >
          <span>Nhạc cụ</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen
                ? "rotate-180 text-[#B49368]"
                : isDarkTheme
                ? "text-[#D8CDBD]/70"
                : "text-[#7D746A]"
            }`}
          />
        </button>

        {/* Seamless Dropdown Panel with Zero-Gap Hover Bridge (Căn chính giữa button Nhạc cụ, màu sáng pha nâu ấm) */}
        {isOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 z-70 w-72 sm:w-80">
            <div className="rounded-[4px] border border-[#B49368]/60 bg-[#E2D4C0]/98 p-2 shadow-[0_16px_40px_rgba(26,16,11,0.26)] backdrop-blur-xl animate-float-down">
              
              {/* Vertical Category List */}
              <div className="flex flex-col divide-y divide-[#C9B9A2]/60">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="group/item flex items-center justify-between rounded-[3px] px-3.5 py-2.5 transition-all duration-150 hover:bg-[#D5C4AE] hover:pl-4"
                  >
                    <div>
                      <span className="font-sans text-sm font-semibold text-[#241711] transition-colors group-hover/item:text-[#7A4E1D] block">
                        {cat.name}
                      </span>
                      {cat.subtitle && (
                        <span className="font-sans text-[11px] font-medium text-[#6D5543] transition-colors group-hover/item:text-[#3B281B] block mt-0.5">
                          {cat.subtitle}
                        </span>
                      )}
                    </div>
                    <ArrowRight
                      size={13}
                      className="text-[#7A4E1D] opacity-0 -translate-x-1 transition-all duration-150 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                    />
                  </Link>
                ))}
              </div>

              {/* Bottom Action: View All */}
              <div className="mt-1 border-t border-[#B49368]/50 pt-1.5 px-0.5">
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-[3px] px-3 py-2 font-sans text-xs font-bold text-[#7A4E1D] transition-colors hover:bg-[#D5C4AE] hover:text-[#241711]"
                >
                  <span>Xem tất cả tác phẩm</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* 3. CÂU CHUYỆN */}
      <Link
        href="/stories"
        data-active={pathname.startsWith("/stories") ? "true" : undefined}
        className={getNavLinkClass(pathname.startsWith("/stories"))}
      >
        Câu chuyện
      </Link>

      {/* 4. VỀ ĐỨC NGÂN */}
      <Link
        href="/about"
        data-active={pathname.startsWith("/about") ? "true" : undefined}
        className={getNavLinkClass(pathname.startsWith("/about"))}
      >
        Về Đức Ngân
      </Link>

      {/* 5. Tin Tức */}
      <Link
        href="/news"
        data-active={pathname.startsWith("/news") ? "true" : undefined}
        className={getNavLinkClass(pathname.startsWith("/news"))}
      >
        Tin Tức
      </Link>

      {/* 6. LIÊN HỆ */}
      <Link
        href="/contact"
        data-active={pathname.startsWith("/contact") ? "true" : undefined}
        className={getNavLinkClass(pathname.startsWith("/contact"))}
      >
        Liên hệ
      </Link>
    </nav>
  );
}
