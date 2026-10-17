"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { SHOWROOM_INFO } from "@/data/navigation";

interface CatalogueProductListRowProps {
  product: Product;
  index?: number;
}

export default function CatalogueProductListRow({
  product,
  index = 0,
}: CatalogueProductListRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [sheenPos, setSheenPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const primaryImage = product.thumbnail;
  const secondaryImage =
    product.images && product.images.length > 1
      ? product.images[1]
      : product.thumbnail;
  const hasSecondaryImage = primaryImage !== secondaryImage;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width - 0.5) * 2;
    const percentY = (y / rect.height - 0.5) * 2;

    // Balanced tilt for list row
    setRotate({
      x: -percentY * 6,
      y: percentX * 6,
    });

    setSheenPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={rowRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-5px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transformStyle: "preserve-3d",
        transition: isHovered
          ? "transform 80ms ease-out, box-shadow 200ms ease, border-color 200ms ease"
          : "transform 550ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 550ms ease, border-color 350ms ease",
        boxShadow: isHovered
          ? `${-rotate.y * 1.6}px ${rotate.x * 1.6 + 16}px 32px rgba(180, 147, 104, 0.2), 0 4px 14px rgba(20, 12, 8, 0.05)`
          : "0 3px 14px rgba(20, 12, 8, 0.03)",
        animationDelay: `${Math.min(index * 40, 400)}ms`,
      }}
      className="group relative flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-7 rounded-[4px] border border-[#E3DACD] bg-white p-5 will-change-transform hover:border-[#B49368]"
    >
      {/* Specular Liquid-Gold Light Sheen Layer */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200 rounded-[4px]"
          style={{
            background: `radial-gradient(circle 350px at ${sheenPos.x}% ${sheenPos.y}%, rgba(242, 212, 160, 0.3) 0%, rgba(180, 147, 104, 0.09) 45%, transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* 1. THUMBNAIL WITH IMAGE HOVER SWAP */}
      <div
        style={{
          transform: isHovered ? "translateZ(20px) scale(1.03)" : "translateZ(0px) scale(1)",
          transition: "transform 350ms ease",
        }}
        className="relative h-32 w-32 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-[3px] bg-[#F7F3EE] p-3 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#FAF5EE]"
      >
        {/* Ambient Halo */}
        <div className="absolute inset-x-4 bottom-2 h-4 rounded-full bg-[#B49368]/18 blur-xs pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

        <Link href={`/products/${product.slug}`} className="relative h-full w-full block">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className={`object-contain transition-all duration-300 ease-in-out ${
              isHovered && hasSecondaryImage ? "opacity-0" : "opacity-100"
            }`}
            sizes="144px"
          />

          {hasSecondaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} chi tiết`}
              fill
              className={`object-contain transition-all duration-300 ease-in-out ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              sizes="144px"
            />
          )}
        </Link>
      </div>

      {/* 2. MAIN CONTENT (Title, Summary, Specs) */}
      <div
        style={{
          transform: isHovered ? "translateZ(14px)" : "translateZ(0px)",
          transition: "transform 350ms ease",
        }}
        className="flex-1 min-w-0 text-center sm:text-left relative z-10 space-y-1.5"
      >
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] text-[#A68052]">
            {product.categoryName}
          </span>
        </div>

        <Link href={`/products/${product.slug}`} className="block group-hover:text-[#B49368] transition-colors">
          <h4 className="font-sans text-lg sm:text-xl font-semibold text-[#140C08]">
            {product.name}
          </h4>
        </Link>

        <p className="font-sans text-xs sm:text-sm text-[#574F46] line-clamp-2 leading-relaxed font-light">
          {product.summary}
        </p>

        <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-[13px] text-[#A68052]">
          <ShieldCheck size={14} className="shrink-0" />
          <span>Bảo hành âm thanh trọn đời tại Showroom</span>
        </div>
      </div>

      {/* 3. PRICING & ACTIONS */}
      <div
        style={{
          transform: isHovered ? "translateZ(16px)" : "translateZ(0px)",
          transition: "transform 350ms ease",
        }}
        className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3.5 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E3DACD]/60 w-full sm:w-auto relative z-10"
      >
        <div className="font-display text-lg sm:text-2xl font-bold text-[#8C6B3E]">
          {formatCurrency(product.price)}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="font-sans text-xs sm:text-sm font-semibold text-[#706458] hover:text-[#140C08] inline-flex items-center gap-1.5 transition-colors px-3 py-1.5"
          >
            <span>Chi tiết</span>
            <ArrowRight size={13} />
          </Link>

          <a
            href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#241711] border border-[#3A2920] hover:border-[#B49368] hover:bg-[#B49368] hover:text-[#241711] px-3.5 py-1.5 font-sans text-xs sm:text-sm font-semibold text-[#E5C398] transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <Phone size={13} />
            <span>Tư vấn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
