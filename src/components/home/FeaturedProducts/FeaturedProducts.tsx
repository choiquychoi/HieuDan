"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import CornerOrnament from "@/components/ui/CornerOrnament";
import JackfruitWoodTexture from "./JackfruitWoodTexture";

export default function FeaturedProducts({ products }: { products?: Product[] } = {}) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const items = products && products.length > 0 ? products : PRODUCTS;
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Bounded shelf with expansive container and natural momentum dragging
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    startIndex: 0,
    dragFree: true,
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Update prev/next button states on scroll and re-initialization
  useEffect(() => {
    if (!emblaApi) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);
    emblaApi.on("init", updateScrollButtons);

    updateScrollButtons();

    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
      emblaApi.off("init", updateScrollButtons);
    };
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 border-t border-[#D9C487]/80 text-[#140C08]">
      {/* Tang Mít Cổ Truyền Texture (#FCFCAE highlights & acoustic tonewood grain) */}
      <JackfruitWoodTexture />

      {/* Subtle Acoustic Corner Accents */}
      <CornerOrnament position="top-right" variant="strings" theme="ivory" />
      <CornerOrnament position="bottom-left" variant="pearl-inlay" theme="ivory" />

      {/* Expansive Container with Compact Left/Right Margins (Max Width 1720px) */}
      <div className="relative z-10 mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="border-b border-[#D4BC7B]/70 pb-4 sm:pb-5">
          <div>
            <span className="eyebrow-label text-[#7D551A]">
              BỘ SƯU TẬP NGHỆ NHÂN
            </span>
          </div>
          <h2 className="mt-2.5 section-headline text-[#140C08]">
            Nhạc Cụ Tiêu Biểu
          </h2>
        </div>

        {/* Expansive 5-Card Shelf Carousel with Flanking Navigation Arrows */}
        <div className="relative mt-2 sm:mt-4 px-2 sm:px-8 lg:px-12">
          {/* Prev Arrow Button (Flanking left with generous breathing space) */}
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Xem sản phẩm trước"
            className="absolute left-0 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 min-[400px]:h-10 min-[400px]:w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#D4C39B] bg-white text-[#3A2920] shadow-md transition-all duration-300 hover:border-[#3A2218] hover:bg-[#3A2218] hover:text-[#FFFCF5] hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 min-[400px]:h-5 min-[400px]:w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Carousel Viewport with Balanced Padding */}
          <div
            ref={emblaRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing py-5 sm:py-6"
            role="region"
            aria-label="Kệ trưng bày nhạc cụ tiêu biểu"
            tabIndex={0}
          >
            <div className="flex -ml-3 sm:-ml-3.5 lg:-ml-4 touch-pan-y items-stretch">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="min-w-0 shrink-0 grow-0 flex-[0_0_82%] min-[440px]:flex-[0_0_68%] sm:flex-[0_0_48%] md:flex-[0_0_33.333%] xl:flex-[0_0_20%] pl-3 sm:pl-3.5 lg:pl-4"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={product.name}
                >
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow Button (Flanking right with generous breathing space) */}
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Xem sản phẩm kế tiếp"
            className="absolute right-0 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 min-[400px]:h-10 min-[400px]:w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#D4C39B] bg-white text-[#3A2920] shadow-md transition-all duration-300 hover:border-[#3A2218] hover:bg-[#3A2218] hover:text-[#FFFCF5] hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 min-[400px]:h-5 min-[400px]:w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
