"use client";

import React from "react";
import { LayoutGrid, Grid3X3, List, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export type LayoutDensity = "3-cols" | "4-cols" | "list";
export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

interface CatalogueToolbarProps {
  totalCount: number;
  layout: LayoutDensity;
  onLayoutChange: (layout: LayoutDensity) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenMobileFilters: () => void;
  activeFilterCount: number;
}

export default function CatalogueToolbar({
  totalCount,
  layout,
  onLayoutChange,
  sort,
  onSortChange,
  onOpenMobileFilters,
  activeFilterCount,
}: CatalogueToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3DACD]/80 pb-4 bg-[#FAF8F5] select-none">
      
      {/* LEFT: ITEM COUNT & MOBILE FILTER TRIGGER */}
      <div className="flex items-center gap-3">
        {/* Mobile Filter Button (< lg) */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden inline-flex items-center gap-2 rounded-[3px] border border-[#B49368] bg-[#241711] px-4 py-2 font-sans text-xs sm:text-sm font-bold text-[#E5C398] shadow-xs cursor-pointer"
        >
          <SlidersHorizontal size={14} />
          <span>BỘ LỌC</span>
          {activeFilterCount > 0 && (
            <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#B49368] text-[11px] font-bold text-[#140C08]">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Count Label */}
        <div className="text-sm sm:text-base font-sans text-[#706458]">
          Hiển thị <span className="font-bold text-[#140C08]">{totalCount}</span> tác phẩm
        </div>
      </div>

      {/* RIGHT: LAYOUT SWITCHER & SORT DROPDOWN */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
        
        {/* Grid Density Switcher (Desktop only) */}
        <div className="hidden sm:flex items-center border border-[#E3DACD] rounded-[3px] bg-white p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => onLayoutChange("3-cols")}
            title="Lưới 3 cột chuẩn"
            aria-label="Xem lưới 3 cột"
            className={`flex h-8 w-8 items-center justify-center rounded-[2px] transition-colors cursor-pointer ${
              layout === "3-cols"
                ? "bg-[#241711] text-[#E5C398]"
                : "text-[#706458] hover:text-[#140C08]"
            }`}
          >
            <LayoutGrid size={16} />
          </button>

          <button
            type="button"
            onClick={() => onLayoutChange("4-cols")}
            title="Lưới 4 cột thu gọn"
            aria-label="Xem lưới 4 cột"
            className={`hidden md:flex h-8 w-8 items-center justify-center rounded-[2px] transition-colors cursor-pointer ${
              layout === "4-cols"
                ? "bg-[#241711] text-[#E5C398]"
                : "text-[#706458] hover:text-[#140C08]"
            }`}
          >
            <Grid3X3 size={16} />
          </button>

          <button
            type="button"
            onClick={() => onLayoutChange("list")}
            title="Dạng danh sách chi tiết"
            aria-label="Xem dạng danh sách"
            className={`flex h-8 w-8 items-center justify-center rounded-[2px] transition-colors cursor-pointer ${
              layout === "list"
                ? "bg-[#241711] text-[#E5C398]"
                : "text-[#706458] hover:text-[#140C08]"
            }`}
          >
            <List size={16} />
          </button>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm text-[#706458] font-sans">
            <ArrowUpDown size={13} className="text-[#B49368]" />
            <span>Sắp xếp:</span>
          </div>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sắp xếp danh sách"
            className="rounded-[3px] border border-[#E3DACD] bg-white px-3.5 py-1.5 font-sans text-xs sm:text-sm font-medium text-[#140C08] shadow-2xs outline-none transition-colors hover:border-[#B49368] focus:border-[#B49368] cursor-pointer"
          >
            <option value="featured">Nghệ nhân tuyển chọn</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="name-asc">Tên: A đến Z</option>
          </select>
        </div>

      </div>

    </div>
  );
}
