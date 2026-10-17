"use client";

import React, { useState, useMemo } from "react";
import { Search, RotateCcw, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";

import { Category, Product } from "@/types";

export const MIN_PRICE = 2500000;
export const MAX_PRICE = 35000000;

export interface PriceTier {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const PRICE_TIERS: PriceTier[] = [
  { id: "all", label: "Tất cả mức giá", min: MIN_PRICE, max: MAX_PRICE },
  { id: "under-5m", label: "Dưới 5 triệu", min: MIN_PRICE, max: 5000000 },
  { id: "5m-10m", label: "5 – 10 triệu", min: 5000000, max: 10000000 },
  { id: "10m-20m", label: "10 – 20 triệu", min: 10000000, max: 20000000 },
  { id: "over-20m", label: "Trên 20 triệu", min: 20000000, max: MAX_PRICE },
];

export interface FilterState {
  searchQuery: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

interface CatalogueSidebarFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  isMobileDrawer?: boolean;
  categories?: Category[];
  products?: Product[];
}

export default function CatalogueSidebarFilters({
  filters,
  onFilterChange,
  onResetFilters,
  isMobileDrawer = false,
  categories,
  products,
}: CatalogueSidebarFiltersProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const productList = products && products.length > 0 ? products : PRODUCTS;
  const categoryList = categories && categories.length > 0 ? categories : CATEGORIES;

  // Compute live counts from productList
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: productList.length };
    productList.forEach((p) => {
      counts[p.categoryId] = (counts[p.categoryId] || 0) + 1;
    });
    return counts;
  }, [productList]);

  const isPriceFiltered =
    filters.minPrice > MIN_PRICE || filters.maxPrice < MAX_PRICE;

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.category !== "all" ||
    isPriceFiltered;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCategory = (categorySlug: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === categorySlug ? "all" : categorySlug,
    });
  };

  // Compute price counts from productList
  const priceCounts = useMemo(() => {
    return {
      all: productList.length,
      "under-5m": productList.filter((p) => p.price != null && p.price < 5000000).length,
      "5m-10m": productList.filter(
        (p) => p.price != null && p.price >= 5000000 && p.price <= 10000000
      ).length,
      "10m-20m": productList.filter(
        (p) => p.price != null && p.price >= 10000000 && p.price <= 20000000
      ).length,
      "over-20m": productList.filter((p) => p.price != null && p.price > 20000000).length,
    };
  }, [productList]);

  const activeTierId = useMemo(() => {
    if (filters.minPrice <= MIN_PRICE && filters.maxPrice >= MAX_PRICE) return "all";
    if (filters.minPrice <= MIN_PRICE && filters.maxPrice === 5000000) return "under-5m";
    if (filters.minPrice === 5000000 && filters.maxPrice === 10000000) return "5m-10m";
    if (filters.minPrice === 10000000 && filters.maxPrice === 20000000) return "10m-20m";
    if (filters.minPrice === 20000000 && filters.maxPrice >= MAX_PRICE) return "over-20m";
    return null;
  }, [filters.minPrice, filters.maxPrice]);

  const handlePriceTier = (tierId: string) => {
    if (activeTierId === tierId || tierId === "all") {
      onFilterChange({
        ...filters,
        minPrice: MIN_PRICE,
        maxPrice: MAX_PRICE,
      });
      return;
    }
    const tier = PRICE_TIERS.find((t) => t.id === tierId);
    if (!tier) return;
    onFilterChange({
      ...filters,
      minPrice: tier.min,
      maxPrice: tier.max,
    });
  };

  return (
    <div className={`space-y-5 select-none ${isMobileDrawer ? "p-1" : ""}`}>
      {/* Reset button if filters active */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between border-b border-[#E3DACD]/80 pb-2">
          <span className="text-xs font-sans font-semibold text-[#574F46]">
            Bộ lọc tùy chỉnh
          </span>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-[#8C6B3E] hover:text-[#140C08] transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Xóa lọc</span>
          </button>
        </div>
      )}

      {/* 1. Minimal Search Rail */}
      <div>
        <div className="relative border-b border-[#D8CDBD] pb-2 focus-within:border-[#8C6B3E] transition-colors">
          <Search
            size={14}
            className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-[#140C08]/50"
          />
          <input
            type="text"
            placeholder="Tìm theo tên nhạc cụ..."
            value={filters.searchQuery}
            onChange={handleSearch}
            className="w-full bg-transparent pr-2 pl-6 text-[13px] sm:text-sm text-[#140C08] placeholder:text-[#241711]/50 focus:outline-none font-sans"
          />
        </div>
      </div>

      {/* 2. Accordion: Dòng Nhạc Cụ with Counts */}
      <div className="border-b border-[#E3DACD]/60 pb-4">
        <button
          type="button"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex w-full items-center justify-between py-1.5 text-left cursor-pointer group"
        >
          <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#140C08] group-hover:text-[#8C6B3E] transition-colors">
            Dòng Nhạc Cụ
          </span>
          <ChevronDown
            size={14}
            className={`text-[#574F46] transition-transform duration-300 ${
              isCategoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isCategoryOpen && (
          <div className="mt-2.5 space-y-1">
            {/* All Category */}
            <button
              type="button"
              onClick={() => handleCategory("all")}
              className={`flex w-full items-center justify-between py-1.5 px-1 text-[13px] sm:text-sm transition-colors cursor-pointer ${
                filters.category === "all"
                  ? "text-[#140C08] font-bold"
                  : "text-[#3A2920] hover:text-[#140C08] font-medium"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`text-[10px] ${filters.category === "all" ? "text-[#8C6B3E]" : "text-[#B49368]/40"}`}>
                  {filters.category === "all" ? "●" : "○"}
                </span>
                <span>Tất cả dòng đàn</span>
              </span>
              <span className="text-xs font-semibold text-[#8C6B3E]/70 font-sans tabular-nums">
                {categoryCounts.all}
              </span>
            </button>

            {/* Individual Categories */}
            {categoryList.map((cat) => {
              const isSelected = filters.category === cat.slug;
              const count = categoryCounts[cat.slug] || 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategory(cat.slug)}
                  className={`flex w-full items-center justify-between py-1.5 px-1 text-[13px] sm:text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? "text-[#140C08] font-bold"
                      : "text-[#3A2920] hover:text-[#140C08] font-medium"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`text-[10px] ${isSelected ? "text-[#8C6B3E]" : "text-[#B49368]/40"}`}>
                      {isSelected ? "●" : "○"}
                    </span>
                    <span>{cat.name}</span>
                  </span>
                  <span className="text-xs font-semibold text-[#8C6B3E]/70 font-sans tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Accordion: Khoảng Giá with Direct Price Tier Selection */}
      <div className="pb-1">
        <button
          type="button"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex w-full items-center justify-between py-1.5 text-left cursor-pointer group"
        >
          <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#140C08] group-hover:text-[#8C6B3E] transition-colors">
            Khoảng Giá
          </span>
          <ChevronDown
            size={14}
            className={`text-[#574F46] transition-transform duration-300 ${
              isPriceOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isPriceOpen && (
          <div className="mt-2.5 space-y-1">
            {PRICE_TIERS.map((tier) => {
              const isSelected = activeTierId === tier.id;
              const count = priceCounts[tier.id as keyof typeof priceCounts] || 0;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handlePriceTier(tier.id)}
                  className={`flex w-full items-center justify-between py-1.5 px-1 text-[13px] sm:text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? "text-[#140C08] font-bold"
                      : "text-[#3A2920] hover:text-[#140C08] font-medium"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`text-[10px] ${isSelected ? "text-[#8C6B3E]" : "text-[#B49368]/40"}`}>
                      {isSelected ? "●" : "○"}
                    </span>
                    <span>{tier.label}</span>
                  </span>
                  <span className="text-xs font-semibold text-[#8C6B3E]/70 font-sans tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
