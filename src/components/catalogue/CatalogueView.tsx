"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import CatalogueSidebarFilters, {
  FilterState,
  MIN_PRICE,
  MAX_PRICE,
} from "./CatalogueSidebarFilters";
import CatalogueProductCard from "./CatalogueProductCard";
import CatalogueBackgroundArt from "./CatalogueBackgroundArt";
import HeritageDivider from "@/components/heritage/HeritageDivider";
import ModalPortal from "@/components/ui/ModalPortal";
import { Category, Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

interface CatalogueViewProps {
  initialProducts?: Product[];
  initialCategories?: Category[];
}

export default function CatalogueView({
  initialProducts,
  initialCategories,
}: CatalogueViewProps = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const gridTopRef = useRef<HTMLDivElement>(null);

  const categoryParam = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Lock body scroll and listen for Escape key when mobile filter drawer is open
  useEffect(() => {
    if (!isMobileFilterOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileFilterOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileFilterOpen]);

  const filters: FilterState = useMemo(
    () => ({
      searchQuery,
      category: categoryParam,
      minPrice,
      maxPrice,
    }),
    [searchQuery, categoryParam, minPrice, maxPrice]
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setSearchQuery(newFilters.searchQuery);
    setMinPrice(newFilters.minPrice);
    setMaxPrice(newFilters.maxPrice);
    setCurrentPage(1); // Reset to page 1 on filter change

    if (newFilters.category !== categoryParam) {
      if (newFilters.category === "all") {
        router.push("/products", { scroll: false });
      } else {
        router.push(`/products?category=${newFilters.category}`, { scroll: false });
      }
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
    setCurrentPage(1);
    router.push("/products", { scroll: false });
  };

  const isPriceFiltered = minPrice > MIN_PRICE || maxPrice < MAX_PRICE;

  const productList = initialProducts && initialProducts.length > 0 ? initialProducts : PRODUCTS;
  const categoryList = initialCategories && initialCategories.length > 0 ? initialCategories : CATEGORIES;

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...productList];

    // 1. Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (filters.category !== "all") {
      list = list.filter((p) => p.categoryId === filters.category);
    }

    // 3. Price Range Filter
    if (isPriceFiltered) {
      list = list.filter(
        (p) =>
          p.price != null &&
          p.price >= filters.minPrice &&
          p.price <= filters.maxPrice
      );
    }

    // Default curated sort
    return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }, [filters, isPriceFiltered]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, validCurrentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      const el = gridTopRef.current;
      if (el) {
        const headerOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const targetY = Math.max(0, elementPosition + window.scrollY - headerOffset);

        // Cancel any active Lenis inertial scroll momentum and jump immediately
        if (window.__lenis) {
          window.__lenis.scrollTo(targetY, { immediate: true, force: true });
        } else {
          window.scrollTo({
            top: targetY,
            behavior: "instant",
          });
        }
      }
    }
  };

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.category !== "all" ||
    isPriceFiltered;

  return (
    <main
      id="main"
      className="relative pt-36 md:pt-40 lg:pt-44 pb-16 bg-[#F5EEE2] text-[#241711] min-h-screen selection:bg-[#B49368]/20 selection:text-[#241711] overflow-x-clip"
    >
      {/* Contemporary Vietnamese Heritage × Musical Instrument Showroom Background Art */}
      <CatalogueBackgroundArt />

      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 mt-12 sm:mt-16 lg:mt-20">
        {/* ================= TOP ACTION BAR: BREADCRUMB & PRODUCT COUNT ================= */}
        <div className="flex items-end justify-between gap-4 border-b border-[#E3DACD]/80 pb-6 mb-6">
          <div className="flex flex-col gap-4">
            <nav aria-label="Đường dẫn trang">
              <ol className="flex items-center gap-1.5 font-sans text-xs text-[#706458] uppercase tracking-wider">
                <li>
                  <Link href="/" className="hover:text-[#8C6B3E] transition-colors">
                    Trang chủ
                  </Link>
                </li>
                <li className="text-[#D8CDBD]">/</li>
                <li>
                  <span className="hover:text-[#8C6B3E] transition-colors">
                    Nhạc cụ
                  </span>
                </li>
                <li className="text-[#D8CDBD]">/</li>
                <li className="text-[#140C08] font-semibold" aria-current="page">
                  Nhạc cụ truyền thống
                </li>
              </ol>
            </nav>
          </div>

          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="font-sans text-xs font-semibold tracking-[0.14em] text-[#8C6B3E] uppercase shrink-0">
              {filteredProducts.length} Tác phẩm
            </div>

            {/* Mobile filter trigger */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="relative inline-flex items-center gap-1.5 rounded-none border border-[#E3DACD] bg-transparent min-h-[36px] px-3.5 py-1.5 text-xs font-medium text-[#140C08] transition hover:border-[#3A2920] lg:hidden cursor-pointer"
              aria-label="Mở bộ lọc"
            >
              <SlidersHorizontal size={14} />
              <span>Bộ lọc</span>
              {hasActiveFilters && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#8C6B3E]" />
              )}
            </button>
          </div>
        </div>

        {/* Applied Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mb-4 sm:mb-8 text-xs overflow-x-auto no-scrollbar pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap">
            <span className="text-[#706458] font-medium mr-1 shrink-0">Đang lọc:</span>

            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => handleFilterChange({ ...filters, searchQuery: "" })}
                className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#EDE4D6]/70 hover:bg-[#E3DACD] text-[#140C08] px-2.5 py-1 text-xs transition-colors cursor-pointer shrink-0"
              >
                <span>Tìm: &ldquo;{filters.searchQuery}&rdquo;</span>
                <X size={12} className="text-[#706458]" />
              </button>
            )}

            {filters.category !== "all" && (
              <button
                type="button"
                onClick={() => handleFilterChange({ ...filters, category: "all" })}
                className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#EDE4D6]/70 hover:bg-[#E3DACD] text-[#140C08] px-2.5 py-1 text-xs transition-colors cursor-pointer shrink-0"
              >
                <span>Dòng: {categoryList.find((c) => c.slug === filters.category)?.name || filters.category}</span>
                <X size={12} className="text-[#706458]" />
              </button>
            )}

            {(filters.minPrice > MIN_PRICE || filters.maxPrice < MAX_PRICE) && (
              <button
                type="button"
                onClick={() =>
                  handleFilterChange({
                    ...filters,
                    minPrice: MIN_PRICE,
                    maxPrice: MAX_PRICE,
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#EDE4D6]/70 hover:bg-[#E3DACD] text-[#140C08] px-2.5 py-1 text-xs transition-colors cursor-pointer shrink-0"
              >
                <span>
                  Giá:{" "}
                  {filters.maxPrice === 5000000
                    ? "Dưới 5 triệu"
                    : filters.minPrice === 5000000 && filters.maxPrice === 10000000
                    ? "5 – 10 triệu"
                    : filters.minPrice === 10000000 && filters.maxPrice === 20000000
                    ? "10 – 20 triệu"
                    : filters.minPrice === 20000000
                    ? "Trên 20 triệu"
                    : `${formatCurrency(filters.minPrice)} – ${formatCurrency(filters.maxPrice)}`}
                </span>
                <X size={12} className="text-[#706458]" />
              </button>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[#8C6B3E] hover:text-[#140C08] font-semibold text-xs ml-1 underline underline-offset-2 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              Xóa tất cả
            </button>
          </div>
        )}

        {/* ================= MAIN 2-COLUMN GRID ================= */}
        <div
          ref={gridTopRef}
          className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14 scroll-mt-24"
        >
          {/* ASIDE / FILTERS (DESKTOP) */}
          <aside className="hidden lg:block self-stretch">
            <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain pr-4 border-r border-[#E3DACD]/80 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <CatalogueSidebarFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                categories={categoryList}
                products={productList}
              />
            </div>
          </aside>

          {/* PRODUCT STREAM (RIGHT COLUMN) */}
          <div>
            {/* Product Grid (Gallery-Wall Layout: 2-col on mobile, 2-col on sm/lg, 3-col on xl) */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-x-2.5 gap-y-6 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-2 xl:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <CatalogueProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                  {/* ================= PAGINATION CONTROLS ================= */}
                  {totalPages > 1 && (
                    <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E3DACD]/70 pt-6 sm:pt-8">
                      <div className="text-xs text-[#241711]/60 font-medium">
                        Trang {validCurrentPage} / {totalPages} (Tổng {filteredProducts.length} nhạc cụ)
                      </div>

                      <div className="flex items-center gap-1 sm:gap-1.5 select-none overflow-x-auto no-scrollbar max-w-full pb-1">
                        {/* Prev Button */}
                        <button
                          type="button"
                          aria-label="Trang trước"
                          disabled={validCurrentPage === 1}
                          onClick={() => handlePageChange(validCurrentPage - 1)}
                          className="grid size-8 sm:size-9 place-items-center rounded-[2px] border border-[#E3DACD] bg-white text-[#241711] transition-colors hover:border-[#3A2920] hover:bg-[#FAF8F5] disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-2xs shrink-0"
                        >
                          <ChevronLeft size={15} />
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          const isActive = page === validCurrentPage;
                          return (
                            <button
                              key={page}
                              type="button"
                              onClick={() => handlePageChange(page)}
                              className={`grid size-8 sm:size-9 place-items-center rounded-[2px] font-sans text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                                isActive
                                  ? "bg-[#3A2920] text-white shadow-xs border border-[#3A2920]"
                                  : "border border-[#E3DACD] bg-white text-[#241711]/75 hover:border-[#3A2920] hover:text-[#140C08] hover:bg-[#FAF8F5] shadow-2xs"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}

                        {/* Next Button */}
                        <button
                          type="button"
                          aria-label="Trang tiếp theo"
                          disabled={validCurrentPage === totalPages}
                          onClick={() => handlePageChange(validCurrentPage + 1)}
                          className="grid size-8 sm:size-9 place-items-center rounded-[2px] border border-[#E3DACD] bg-white text-[#241711] transition-colors hover:border-[#3A2920] hover:bg-[#FAF8F5] disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-2xs shrink-0"
                        >
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Empty State */
                <div className="py-20 text-center rounded-[2px] border border-[#E3DACD] bg-white p-8 mt-8">
                  <p className="font-display text-2xl text-[#140C08]">
                    Không tìm thấy nhạc cụ phù hợp
                  </p>
                  <p className="mt-2 text-sm text-[#241711]/65 max-w-md mx-auto">
                    Không có tác phẩm nào khớp với tiêu chí tìm kiếm hoặc bộ lọc đã chọn. Quý khách có thể xóa bộ lọc hoặc liên hệ nghệ nhân đặt chế tác riêng.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-[2px] border border-[#B49368]/40 bg-[#4A2310] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FFFCF5] hover:bg-[#5C2B13] cursor-pointer transition-all"
                  >
                    <RotateCcw size={13} />
                    <span>Xóa bộ lọc & xem tất cả</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ================= HERITAGE DIVIDER (BĂNG KỶ HÀ ĐÔNG SƠN) ================= */}
          <HeritageDivider className="mt-4 sm:mt-6 mb-2" opacity={0.8} />

          {/* ================= BESPOKE COMMISSION BANNER ================= */}
          <div className="mt-8 sm:mt-12 w-full bg-[#8A421C] p-8 sm:p-14 text-[#FFFCF5] relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
              <div className="inline-flex items-center text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#E5C398]/80 mb-4 sm:mb-6">
                <span>Bespoke Commission · Chế Tác Độc Bản Theo Yêu Cầu</span>
              </div>

              <h2 className="font-display text-3xl sm:text-[40px] leading-tight text-[#FFFCF5] font-light max-w-lg">
                Bạn đang tìm một cây đàn độc bản cho riêng mình?
              </h2>

              <p className="mt-4 sm:mt-6 font-sans text-sm sm:text-base text-[#E9E0D2]/90 leading-relaxed font-light max-w-xl text-center">
                Mỗi người nghệ sĩ mang một âm sắc riêng. Đức Ngân sẽ lắng nghe và tư vấn cùng bạn — từ việc lựa chọn chất gỗ phù hợp, tinh chỉnh dáng đàn vừa vặn với đôi tay, đến thiết kế cộng hưởng âm thanh và các chi tiết khảm chạm mang đậm dấu ấn cá nhân.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-sans text-xs sm:text-sm uppercase tracking-widest text-[#FFFCF5] hover:text-[#E5C398] transition-colors border-b border-[#FFFCF5]/30 hover:border-[#E5C398] pb-1 cursor-pointer"
                >
                  <span>Liên Hệ Đặt Chế Tác Riêng</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex items-center justify-center text-xs text-[#E5C398]/60 font-sans italic mt-2">
                  <span>Tư vấn cùng nghệ nhân</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {isMobileFilterOpen && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Bộ lọc nhạc cụ"
            className="fixed inset-0 z-[100] flex justify-end select-none"
          >
            {/* Backdrop */}
            <div
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            />

            {/* Drawer */}
            <div
              data-lenis-prevent
              className="relative z-10 flex h-full w-full max-w-xs flex-col bg-[#FAF8F5] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#E3DACD] p-5">
                <div className="font-display text-lg text-[#140C08] font-medium">Bộ Lọc · Filters</div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-[#241711]/60 hover:text-[#140C08]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <CatalogueSidebarFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  isMobileDrawer={true}
                  categories={categoryList}
                  products={productList}
                />
              </div>

              <div className="border-t border-[#E3DACD] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full rounded-[2px] bg-[#3A2920] py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#140C08] transition-colors cursor-pointer"
                >
                  Xem kết quả ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </main>
  );
}
