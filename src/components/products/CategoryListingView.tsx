"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, ArrowUpDown } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import CategoryListingCard from "./CategoryListingCard";
import CategoryQuickViewModal from "./CategoryQuickViewModal";
import CornerOrnament from "@/components/ui/CornerOrnament";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const HERO_BG = "/images/hero/showroom-stage.png";

const CATEGORY_TABS = [
  { id: "all", name: "Tất cả tác phẩm", subtitle: "Tuyển tập đầy đủ" },
  ...CATEGORIES.map((c) => ({
    id: c.slug,
    name: c.name,
    subtitle: c.subtitle || "Cổ truyền",
  })),
];

export default function CategoryListingView() {
  const searchParams = useSearchParams();
  const initialCatParam = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCatParam);
  const [selectedSort, setSelectedSort] = useState<SortOption>("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Entrance choreography states
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isGridTransitioning, setIsGridTransitioning] = useState(false);

  // Sliding bronze indicator tracking
  const navContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Page Load Entrance Sequence (Steps 1–6)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // Update sliding indicator position whenever activeCategory or viewport changes
  const updateIndicator = useCallback(() => {
    const activeEl = tabRefs.current[activeCategory];
    const containerEl = navContainerRef.current;
    if (activeEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      setIndicatorStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      });
    }
  }, [activeCategory]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  // Synchronize category switch with 350ms fade-out + 700ms reveal
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory || isGridTransitioning) return;

    setIsGridTransitioning(true);
    setTimeout(() => {
      setActiveCategory(categoryId);
      setTimeout(() => {
        setIsGridTransitioning(false);
      }, 50);
    }, 350);
  };

  // Synchronize sort change with smooth transition
  const handleSortChange = (newSort: SortOption) => {
    if (newSort === selectedSort || isGridTransitioning) return;

    setIsGridTransitioning(true);
    setTimeout(() => {
      setSelectedSort(newSort);
      setTimeout(() => {
        setIsGridTransitioning(false);
      }, 50);
    }, 350);
  };

  // Filtered & Sorted Product List
  const filteredProducts = useMemo(() => {
    const list =
      activeCategory === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.categoryId === activeCategory);

    switch (selectedSort) {
      case "price-asc":
        return [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "price-desc":
        return [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "name-asc":
        return [...list].sort((a, b) => a.name.localeCompare(b.name, "vi"));
      case "featured":
      default:
        return [...list].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [activeCategory, selectedSort]);

  // Current Category Meta
  const currentCategoryData = CATEGORIES.find((c) => c.slug === activeCategory);
  const categoryTitle =
    activeCategory === "all"
      ? "Bộ Sưu Tập Nhạc Khí"
      : currentCategoryData?.name || "Bộ Sưu Tập";
  const categorySubtitle =
    activeCategory === "all"
      ? "Khám phá các dòng nhạc cụ dân tộc Việt Nam được chế tác thủ công độc bản từ gỗ quý lâu năm tại xưởng Đức Ngân."
      : currentCategoryData?.description ||
        "Gia công thủ công từng phím cần, giữ âm sắc mộc mạc và vang sáng độc bản.";

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1610] select-none">
      
      {/* =========================================================================
          1. CATEGORY HERO (Cinematic Sequence Steps 1–6)
          ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#381A0B] via-[#4A2310] to-[#2D160B] text-[#FFFCF5] pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-[#B49368]/35">
        
        {/* Step 1: Background & Zoom-Out Camera Motion (1400ms) */}
        <div
          className={`pointer-events-none absolute inset-0 z-0 overflow-hidden transition-all duration-1400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isPageLoaded ? "opacity-65 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={HERO_BG}
            alt="Không gian trưng bày Hiệu Đàn Đức Ngân"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Amber stage radial vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D160B]/95 via-[#3A1A0C]/50 to-[#2A1208]/80" />
        </div>

        {/* Corner Accents */}
        <CornerOrnament position="top-right" variant="pearl-inlay" theme="walnut" />
        <CornerOrnament position="bottom-left" variant="strings" theme="walnut" />

        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          {/* Step 2: Breadcrumbs (Delay 150ms, Duration 700ms) */}
          <div
            className={`flex items-center gap-2 text-xs font-sans text-[#D8CDBD]/70 transition-all duration-700 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <Link href="/" className="hover:text-[#E5C398] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight size={12} className="text-[#B49368]/60" />
            <span className="text-[#E5C398] font-medium">Nhạc cụ</span>
            {activeCategory !== "all" && (
              <>
                <ChevronRight size={12} className="text-[#B49368]/60" />
                <span className="text-[#FFFCF5]">{categoryTitle}</span>
              </>
            )}
          </div>

          {/* Step 3: Category Eyebrow (Delay 250ms, Duration 700ms) */}
          <div
            className={`mt-4 flex items-center transition-all duration-700 delay-250 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              {activeCategory === "all" ? "DI SẢN CHẾ TÁC TỪ 1999" : "DANH MỤC NHẠC KHÍ"}
            </span>
          </div>

          {/* Step 4: Large Category Title (Duration 900ms, TranslateY 35px -> 0) */}
          <h1
            className={`mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FFFCF5] transition-all duration-900 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] leading-tight ${
              isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {categoryTitle}
          </h1>

          {/* Step 5: Description (Delay 450ms, Duration 700ms) */}
          <p
            className={`mt-3 max-w-2xl font-sans text-sm sm:text-[15px] text-[#D8CDBD]/90 font-normal leading-relaxed transition-all duration-700 delay-450 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {categorySubtitle}
          </p>

          {/* Step 6: Physical Category Navigation Bar with Sliding Bronze Underline (Delay 550ms, Duration 700ms) */}
          <div
            className={`mt-8 sm:mt-10 pt-4 border-t border-[#B49368]/30 transition-all duration-700 delay-550 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div
              ref={navContainerRef}
              role="tablist"
              aria-label="Chọn dòng nhạc cụ"
              className="relative flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none"
            >
              {/* The Physical Sliding Bronze Underline */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 h-[2px] bg-[#B49368] transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_8px_rgba(180,147,104,0.6)]"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />

              {CATEGORY_TABS.map((tab) => {
                const isActive = tab.id === activeCategory;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[tab.id] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(tab.id)}
                    className={`shrink-0 px-3.5 sm:px-4 py-2 font-sans text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer rounded-t-[2px] ${
                      isActive
                        ? "text-[#E5C398] font-semibold"
                        : "text-[#D8CDBD]/70 hover:text-[#FFFCF5]"
                    }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. MAIN PRODUCT CATALOGUE GRID & SORTING CONTROLS
          ========================================================================= */}
      <section className="relative w-full py-10 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          {/* Sorting & Result Count Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3DACD]/80 pb-4">
            
            {/* Smooth Product Count Indicator */}
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#B49368]">
                {filteredProducts.length} Tác phẩm
              </span>
              <span className="text-[#D8CDBD]">•</span>
              <span className="font-sans text-xs text-[#706458] font-light">
                Chế tác thủ công độc bản
              </span>
            </div>

            {/* Sort Dropdown Selector */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-[#706458]">
                <ArrowUpDown size={13} className="text-[#B49368]" />
                <span className="hidden sm:inline">Sắp xếp theo:</span>
              </div>

              <select
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                aria-label="Sắp xếp sản phẩm"
                className="rounded-md border border-[#E3DACD] bg-white px-3 py-1.5 font-sans text-xs font-medium text-[#2B241F] shadow-2xs outline-none transition-colors hover:border-[#B49368] focus:border-[#B49368] cursor-pointer"
              >
                <option value="featured">Nghệ nhân tuyển chọn</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="name-asc">Tên: A đến Z</option>
              </select>
            </div>

          </div>

          {/* Staggered Product Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
          <div
            className={`mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isGridTransitioning
                ? "opacity-35 -translate-y-2 scale-[0.99]"
                : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            {filteredProducts.map((product, idx) => (
              <CategoryListingCard
                key={product.id}
                product={product}
                index={idx}
                onQuickView={(p) => setQuickViewProduct(p)}
                isGridTransitioning={isGridTransitioning}
              />
            ))}
          </div>

          {/* Empty State Fallback (if any) */}
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-[#706458] font-normal">
                Không tìm thấy tác phẩm phù hợp trong danh mục này.
              </p>
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#B49368] px-5 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#180F0B]"
              >
                Xem tất cả tác phẩm
              </button>
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          3. CINEMATIC QUICKVIEW MODAL
          ========================================================================= */}
      <CategoryQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
}
