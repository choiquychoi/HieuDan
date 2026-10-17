"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/categories";
import { Category } from "@/types";

export default function Categories({ categories }: { categories?: Category[] } = {}) {
  const items = categories && categories.length > 0 ? categories : CATEGORIES;

  return (
    <section
      id="categories"
      className="w-full bg-ivory-texture pt-10 pb-16 sm:pt-16 sm:pb-24 font-sans border-t border-[#D8CDBD]/70"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 className="mb-14 sm:mb-20 text-center font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#2B241F] tracking-tight">
          Danh mục nhạc cụ
        </h2>

        <div className="mx-auto max-w-[900px] grid grid-cols-2 gap-x-4 gap-y-16 sm:gap-x-8 sm:gap-y-24 md:grid-cols-3">
          {items.map((cat) => {
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative flex h-full flex-col outline-none"
              >
                {/* The colored bottom block */}
                <div
                  className={`mt-12 sm:mt-16 flex h-[100px] sm:h-[120px] w-full flex-col items-center justify-end rounded-xl pb-5 sm:pb-8 transition-all duration-300 bg-[#F5F0E7] border border-[#E3DACD]/50 group-hover:bg-[#B49368] group-hover:border-[#B49368] group-hover:shadow-lg`}
                >
                  <h3 className="px-2 text-center text-[14px] sm:text-[16px] font-bold text-[#2B241F] tracking-wide transition-colors duration-300 group-hover:text-white">
                    {cat.name}
                  </h3>
                </div>

                {/* The floating product image (No background) */}
                <div className="absolute top-0 left-1/2 h-[110px] w-[110px] sm:h-[140px] sm:w-[140px] -translate-x-1/2 transition-all duration-300 group-hover:-translate-y-4">
                  <div className="relative h-full w-full">
                    <Image
                      src={
                        cat.image && (cat.image.startsWith('/') || cat.image.startsWith('http'))
                          ? cat.image
                          : '/images/hero/dan-bau.png'
                      }
                      alt={cat.name}
                      fill
                      className="object-contain pb-2 transition-transform duration-500 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-lg"
                      sizes="(max-width: 640px) 110px, 140px"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
