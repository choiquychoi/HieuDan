"use client";

import { useState } from "react";
import Image from "next/image";
import { Music2, Trees, PackageCheck, Headphones, ShieldCheck, LucideIcon } from "lucide-react";
import CornerOrnament from "@/components/ui/CornerOrnament";

interface TrustCommitment {
  id: string;
  index: string;
  title: string;
  shortLabel: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const COMMITMENTS: TrustCommitment[] = [
  {
    id: "experience",
    index: "01",
    title: "Trải nghiệm & thử đàn trực tiếp",
    shortLabel: "Thử đàn trực tiếp",
    description:
      "Đón tiếp quý khách lắng nghe âm sắc và cảm nhận phím cần trực tiếp tại không gian showroom 526 Điện Biên Phủ, Quận 10.",
    image: "/images/trust/trust-01-experience.jpg",
    icon: Music2,
  },
  {
    id: "materials",
    index: "02",
    title: "Tuyển chọn gỗ quý lâu năm",
    shortLabel: "Gỗ quý trăm năm",
    description:
      "Sử dụng gỗ Cẩm Lai, Mun Hoa, Trắc, Gõ Đỏ tự nhiên qua quy trình sấy ổn định, chống cong vênh và lưu giữ tiếng vang ngàn đời.",
    image: "/images/trust/trust-02-wood.jpg",
    icon: Trees,
  },
  {
    id: "delivery",
    index: "03",
    title: "Giao hàng & đóng gói chuyên dụng",
    shortLabel: "Đóng gói an toàn",
    description:
      "Đóng thùng gỗ gia cố và bọc chống sốc đa lớp, niêm phong cẩn trọng, bảo hiểm an toàn 100% trên toàn quốc.",
    image: "/images/trust/trust-03-delivery.jpg",
    icon: PackageCheck,
  },
  {
    id: "consulting",
    index: "04",
    title: "Tư vấn chọn đàn tận tâm",
    shortLabel: "Tư vấn tận tâm",
    description:
      "Đồng hành cùng người mới học và nghệ sĩ chuyên nghiệp chọn đúng chất gỗ, phím cần và độ căng dây phù hợp nhất.",
    image: "/images/trust/trust-04-consulting.jpg",
    icon: Headphones,
  },
  {
    id: "warranty",
    index: "05",
    title: "Bảo hành & hỗ trợ sau mua",
    shortLabel: "Bảo hành trọn đời",
    description:
      "Căn chỉnh phím cần, bảo dưỡng định kỳ và hỗ trợ kỹ thuật âm sắc trọn đời bởi chính các nghệ nhân xưởng Đức Ngân.",
    image: "/images/trust/trust-05-warranty.jpg",
    icon: ShieldCheck,
  },
];

const ICON_MAP: Record<string, LucideIcon> = {
  Music2,
  Trees,
  PackageCheck,
  Headphones,
  ShieldCheck,
};

export interface DbCommitment {
  id: number | string;
  title: string;
  short_label?: string;
  description?: string;
  image_url?: string;
  icon_name?: string;
  sort_order?: number;
}

export default function TrustSection({ commitments }: { commitments?: DbCommitment[] } = {}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);

  const items: TrustCommitment[] =
    commitments && commitments.length > 0
      ? commitments.map((c, i) => ({
          id: String(c.id),
          index: String(i + 1).padStart(2, "0"),
          title: c.title,
          shortLabel: c.short_label || c.title,
          description: c.description || "",
          image: c.image_url || "/images/trust/trust-01-experience.jpg",
          icon: c.icon_name && ICON_MAP[c.icon_name] ? ICON_MAP[c.icon_name] : ShieldCheck,
        }))
      : COMMITMENTS;

  const isAnyOpen = hoveredIndex !== null;

  return (
    <section className="relative w-full overflow-hidden bg-ivory-texture py-10 sm:py-14 lg:py-16 border-t border-[#D8CDBD]/70 text-[#2B241F]">
      {/* Subtle Corner Ornament */}
      <CornerOrnament position="bottom-right" variant="pearl-inlay" theme="ivory" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* 1. Centered Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow-label text-[#8C6B3E]">
            CAM KẾT TỪ ĐỨC NGÂN
          </span>

          <h2 className="mt-1.5 section-headline text-[#2B241F]">
            Tận Tâm Trong Từng Thanh Âm
          </h2>

          <p className="mt-3 font-sans text-sm sm:text-base text-[#574F46] leading-relaxed max-w-xl mx-auto">
            Đức Ngân đồng hành cùng người yêu nhạc từ lúc chọn đàn, thử âm sắc cho đến quá trình gìn giữ và bảo dưỡng trọn đời.
          </p>
        </div>

        {/* 2. Desktop: Interactive Horizontal Hover Accordion Gallery (5 Custom Panels) */}
        <div
          onMouseLeave={() => setHoveredIndex(null)}
          onPointerLeave={() => setHoveredIndex(null)}
          className="hidden md:flex mt-8 lg:mt-10 h-[450px] lg:h-[490px] w-full gap-2.5 lg:gap-3 items-stretch"
        >
          {items.map((item, index) => {
            const isOpen = hoveredIndex === index;
            const Icon = item.icon;

            let flexStyle = "flex-1";
            if (isAnyOpen) {
              flexStyle = isOpen ? "flex-[3.5] lg:flex-[3.8]" : "flex-[0.7] lg:flex-[0.75]";
            }

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`Cam kết ${item.index}: ${item.title}`}
                aria-expanded={isOpen}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setHoveredIndex(isOpen ? null : index);
                  }
                }}
                className={`relative overflow-hidden rounded-[4px] cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#B49368] motion-reduce:transition-none transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.35,1)] ${flexStyle}`}
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 600px, 750px"
                  className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.35,1)] ${
                    isOpen
                      ? "scale-105 filter brightness-[0.98] contrast-[1.05]"
                      : isAnyOpen
                      ? "scale-100 filter brightness-[0.6] grayscale-[35%]"
                      : "scale-100 filter brightness-[0.8] contrast-[1.02] grayscale-[10%]"
                  }`}
                />

                {/* Dark Walnut Gradient Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.35,1)] ${
                    isOpen
                      ? "bg-gradient-to-t from-[#140C08]/95 via-[#140C08]/40 to-[#140C08]/15 opacity-100"
                      : isAnyOpen
                      ? "bg-[#180F0B]/80 opacity-100"
                      : "bg-gradient-to-t from-[#140C08]/90 via-[#140C08]/50 to-[#140C08]/25 opacity-100"
                  }`}
                />

                {/* ================= OPEN / EXPANDED STATE (Revealed on hover) ================= */}
                <div
                  className={`absolute inset-0 p-5 lg:p-7 flex flex-col justify-between text-[#FFFCF5] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.35,1)] ${
                    isOpen
                      ? "opacity-100 translate-y-0 delay-150 pointer-events-auto"
                      : "opacity-0 translate-y-3 pointer-events-none"
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2">
                      <span className="font-sans text-xs lg:text-sm font-semibold tracking-widest text-[#E5C398]">
                        {item.index}
                      </span>
                      <span className="h-[1px] w-6 bg-[#B49368]/60" />
                      <span className="font-sans text-xs uppercase tracking-wider text-[#D8CDBD]/90">
                        CAM KẾT ĐỨC NGÂN
                      </span>
                    </div>
                  </div>

                  {/* Bottom Headline & Description */}
                  <div className="max-w-lg">
                    <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight text-[#FFFCF5]">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm lg:text-[15px] leading-relaxed text-[#E9E0D2]/95">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* ================= CLOSED / RESTING STATE (Standard Upright - NEVER turned sideways) ================= */}
                <div
                  className={`absolute inset-0 p-3 lg:p-4 flex flex-col justify-between items-center text-[#E9E0D2] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.35,1)] ${
                    !isOpen ? "opacity-100 delay-100 pointer-events-none" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Top Index */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="font-sans text-xs font-semibold tracking-widest text-[#E5C398]">
                      {item.index}
                    </span>
                    <span className="h-4 w-[1px] bg-[#B49368]/40" />
                  </div>

                  {/* Center Icon & Upright Clean Label (No rotation, No turn-a-side) */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-2.5 py-3 text-center px-1">
                    <div className="size-8 rounded-full bg-[#140C08]/70 border border-[#B49368]/40 flex items-center justify-center text-[#E5C398] shadow-xs">
                      <Icon size={15} />
                    </div>
                    <span className="font-display text-xs lg:text-[13px] xl:text-sm font-semibold tracking-wide text-[#FFFCF5]/90 max-w-[72px] lg:max-w-[92px] leading-tight">
                      {item.shortLabel}
                    </span>
                  </div>

                  {/* Bottom Dot Accent */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="h-4 w-[1px] bg-[#B49368]/40" />
                    <div className="h-1.5 w-1.5 rounded-full bg-[#B49368]/60" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Mobile / Tablet: Interactive Vertical Tap Accordion (5 Custom Panels) (md:hidden) */}
        <div className="md:hidden mt-6 flex flex-col gap-2.5 w-full">
          {items.map((item, index) => {
            const isActive = mobileActiveIndex === index;
            const Icon = item.icon;

            const handleToggleMobile = () => {
              setMobileActiveIndex((prev) => (prev === index ? null : index));
            };

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`Cam kết ${item.index}: ${item.title}`}
                aria-expanded={isActive}
                onClick={handleToggleMobile}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggleMobile();
                  }
                }}
                className={`relative overflow-hidden rounded-[4px] cursor-pointer transition-all duration-300 border ${
                  isActive
                    ? "border-[#B49368]/80 shadow-md ring-1 ring-[#B49368]/50"
                    : "border-[#D8CDBD]/60 shadow-xs"
                }`}
              >
                {/* Mobile Header Button */}
                <div
                  className={`flex items-center justify-between p-3.5 transition-colors ${
                    isActive ? "bg-[#241711] text-[#FFFCF5]" : "bg-white text-[#2B241F]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-sans text-xs font-semibold tracking-wider ${
                        isActive ? "text-[#E5C398]" : "text-[#B49368]"
                      }`}
                    >
                      {item.index}
                    </span>
                    <div className="size-6 rounded-full bg-[#B49368]/15 flex items-center justify-center text-[#B49368]">
                      <Icon size={13} />
                    </div>
                    <span className="font-display text-base font-normal">
                      {item.title}
                    </span>
                  </div>

                  <span
                    className={`text-lg font-light transition-transform duration-300 ${
                      isActive ? "rotate-45 text-[#E5C398]" : "text-[#706458]"
                    }`}
                  >
                    +
                  </span>
                </div>

                {/* Mobile Expanded Drawer Body */}
                {isActive && (
                  <div className="relative p-4 bg-[#180F0B] text-[#E9E0D2] border-t border-[#B49368]/30">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] mb-3">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="100vw"
                        className="object-cover brightness-95"
                      />
                    </div>
                    <p className="font-sans text-sm leading-relaxed text-[#E9E0D2]/95">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
