"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, CircleX, Loader2 } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { matchesSearch } from "@/lib/search";
import { formatCurrency } from "@/lib/utils";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface SearchTriggerProps {
  isDarkTheme?: boolean;
}

export default function SearchTrigger({ isDarkTheme = true }: SearchTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 600);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isSearching = query.trim() !== "" && query.trim() !== debouncedQuery;

  const matchingProducts = debouncedQuery
    ? PRODUCTS.filter(
        (p) =>
          matchesSearch(p.name, debouncedQuery) ||
          matchesSearch(p.categoryName, debouncedQuery)
      ).slice(0, 6)
    : [];

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const handleClose = useCallback(() => {
    setQuery("");
    setIsOpen(false);
  }, []);

  // Autofocus input when search opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard shortcuts: '/' or 'Cmd+K' to open search, 'Escape' to close
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (
        e.key === "/" &&
        !isOpen &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, handleClose]);

  // Click outside listener to collapse search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClose]);

  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* 1. Collapsed Search Icon Button (Rock-solid identical sizing h-11 w-11) */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Mở tìm kiếm nhạc cụ"
          className={`flex items-center justify-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B49368] cursor-pointer ${
            isDarkTheme
              ? "h-11 w-11 border border-[#B49368]/45 bg-[#3E1F10]/90 text-[#D8CDBD] hover:border-[#B49368] hover:bg-[#5C2B13] hover:text-[#E5C398]"
              : "h-9.5 w-9.5 sm:h-10 sm:w-10 border border-[#D8CDBD] bg-white/90 text-[#4A3F35] hover:border-[#B49368] hover:text-[#1F1610] shadow-xs"
          }`}
        >
          <Search size={isDarkTheme ? 18 : 16.5} strokeWidth={1.75} />
        </button>
      ) : (
        /* 2. Expanded Rounded Pill Search Bar */
        <div className="flex items-center animate-fade-in">
          {/* Desktop & Tablet Rounded Search Bar */}
          <div className="relative flex h-11 w-[185px] min-[360px]:w-[210px] min-[390px]:w-[250px] sm:w-[340px] md:w-[380px] lg:w-[440px] items-center rounded-full border border-[#B49368] bg-[#3E1F10]/95 px-3 sm:px-4 shadow-xl ring-2 ring-[#B49368]/30 transition-all duration-200">
            {isSearching ? (
              <Loader2 size={16} className="shrink-0 animate-spin text-[#B49368]" />
            ) : (
              <Search size={16} className="shrink-0 text-[#B49368]" />
            )}

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm nhạc cụ..."
              aria-label="Tìm kiếm nhạc cụ"
              className="ml-2.5 flex-1 bg-transparent font-sans text-xs sm:text-sm text-[#F5F0E7] placeholder-[#D8CDBD]/50 focus:outline-none"
            />

            {query && (
              <>
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Xóa nội dung tìm kiếm"
                  title="Xóa nội dung"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[#D8CDBD]/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <CircleX size={15} />
                </button>
                <span className="h-4 w-px bg-[#B49368]/40 mx-1" aria-hidden="true" />
              </>
            )}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Đóng thanh tìm kiếm"
              title="Đóng tìm kiếm (Esc)"
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#D8CDBD] hover:bg-white/10 hover:text-[#B49368] transition-colors cursor-pointer"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>

          {/* Search Results Dropdown Panel (Safe on mobile screens) */}
          <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-18 sm:top-[calc(100%+12px)] z-70 w-auto sm:w-[400px] md:w-[460px] max-w-[calc(100vw-24px)] rounded-[3px] border border-[#B49368]/50 bg-[#2D160B]/98 p-3 shadow-[0_16px_40px_rgba(26,16,11,0.35)] backdrop-blur-md animate-float-down">
            {isSearching ? (
              <div className="flex items-center justify-center py-8 text-center text-xs font-sans text-[#D8CDBD]">
                <Loader2 size={18} className="mr-2 animate-spin text-[#B49368]" />
                Đang tìm kiếm nhạc cụ...
              </div>
            ) : matchingProducts.length > 0 ? (
              <div className="flex flex-col divide-y divide-[#B49368]/20">
                <span className="pb-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#C5A880]">
                  Kết quả tìm kiếm ({matchingProducts.length})
                </span>
                <div className="max-h-[320px] overflow-y-auto space-y-1 pt-1.5">
                  {matchingProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={handleClose}
                      className="group/item flex items-center gap-3 rounded-[2px] p-2 transition-colors hover:bg-[#452312]"
                    >
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[2px] bg-[#3E1F10]">
                        <Image
                          src={product.thumbnail || "/images/hero/dan-tranh.png"}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans text-xs sm:text-sm font-medium text-[#F5F0E7] group-hover/item:text-[#E5C398] truncate">
                          {product.name}
                        </h4>
                        <span className="font-sans text-[11px] text-[#D8CDBD]/70 block truncate">
                          {product.categoryName}
                        </span>
                      </div>
                      <span className="font-sans text-xs font-semibold text-[#B49368] shrink-0">
                        {formatCurrency(product.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : query.trim() !== "" ? (
              <div className="py-6 text-center text-xs font-sans text-[#D8CDBD]">
                Không tìm thấy nhạc cụ phù hợp với từ khóa &ldquo;{query}&rdquo;.
              </div>
            ) : (
              <div className="py-4 text-center text-xs font-sans text-[#D8CDBD]/70">
                Nhập tên nhạc cụ (Đàn Bầu, Đàn Tranh, Đàn Nguyệt...) để tìm kiếm
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
