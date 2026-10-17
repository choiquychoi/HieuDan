"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SHOWROOM_INFO } from "@/data/navigation";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

// 4 Heritage Visual Moments (Strictly verified history)
const HERITAGE_MOMENTS = [
  {
    period: "1999",
    title: "Khởi Dựng Tại Sài Gòn",
    desc: "Hiệu Đàn Đức Ngân được thành lập từ năm 1999 với niềm đam mê gìn giữ âm sắc mộc mạc của nhạc cụ dân tộc Việt Nam.",
    image: "/images/about/quy_trinh/vintage_luthier_workshop_interior.jpg",
  },
  {
    period: "25+ Năm",
    title: "Tuyển Chọn Gỗ Âm Học",
    desc: "Kiên định với phương pháp sấy mộc tự nhiên nhiều năm để từng thớ gỗ Cẩm Lai, Mun Hoa và Ngô Đồng đạt độ vang sâu lắng.",
    image: "/images/about/quy_trinh/luthier_tonewood_planks_drying_rack.jpg",
  },
  {
    period: "Thủ Công",
    title: "Chế Tác & Thẩm Âm Độc Bản",
    desc: "Từng cần đàn, phím nhạn và thùng cộng hưởng được đẽo gọt thủ công và so dây tỉ mỉ trong phòng mộc tĩnh.",
    image: "/images/about/quy_trinh/ban_tay_che_tac_dan_dan_toc.jpg",
  },
  {
    period: "Hiện Tại",
    title: "Không Gian Showroom Quận 10",
    desc: "Showroom tại 526 Điện Biên Phủ là điểm hẹn tao nhã để người yêu âm nhạc truyền thống ghé thăm, lắng nghe và chọn đàn.",
    image: "/images/about/quy_trinh/khong_gian_trung_bay_nhac_cu_truyen_thong.jpg",
  },
];

// 3 Craftsmanship Manifesto Statements
const MANIFESTO_ITEMS = [
  {
    statement: "Chọn gỗ bằng thời gian.",
    desc: "Gỗ Ngô Đồng xốp nhẹ cho mặt đàn thoát tiếng, gỗ Cẩm Lai và Mun sừng đanh chắc làm buồng cộng hưởng ngân vang truyền đời.",
    image: "/images/stories/go_lam_dan.jpg",
  },
  {
    statement: "Làm đàn bằng đôi tay.",
    desc: "Từ việc nắn vòm cong mặt đàn tranh đến căn chỉnh độ cao từng phím tre già trên cần đàn kìm, tất cả đều qua đôi tay người thợ cả.",
    image: "/images/stories/tre_choi_dan1.jpg",
  },
  {
    statement: "Giữ âm sắc bằng sự lắng nghe.",
    desc: "Trước khi xuất xưởng, mỗi cây đàn đều được thẩm âm độc bản để đảm bảo nốt trầm không đục, nốt cao trong trẻo và có hồn.",
    image: "/images/stories/bealty_And_Violin.jpg",
  },
];

// 5 Interactive Workshop Gallery Slices
const WORKSHOP_GALLERY = [
  {
    id: "g-01",
    tag: "01 / CHỌN GỖ",
    title: "Tuyển Chọn Gỗ Quý",
    desc: "Đích thân nghệ nhân gõ thử độ vang của từng phôi gỗ Ngô Đồng, Cẩm Lai và Mun Hoa trước khi đưa vào chế tác.",
    image: "/images/about/go_Quy.jpg",
  },
  {
    id: "g-02",
    tag: "02 / ĐẼO GỌT",
    title: "Tạo Dáng & Uốn Mộc",
    desc: "Uốn thành đàn hoa, đẽo gọt dáng tỳ bà và thùng cộng hưởng đúng chuẩn tỷ lệ âm học cổ truyền.",
    image: "/images/about/bao_go_lam_dan.jpg",
  },
  {
    id: "g-03",
    tag: "03 / CÂN PHÍM",
    title: "Định Vị Phím Dây",
    desc: "Đo đạc vị trí phím tre già theo thang âm ngũ cung Việt Nam, bảo đảm ngón bấm êm ái và không đau tay.",
    image: "/images/about/mother_of_pearl_inlay_luthier_wood.jpg",
  },
  {
    id: "g-04",
    tag: "04 / THẨM ÂM",
    title: "Thẩm Âm Phòng Mộc",
    desc: "So dây và kiểm tra từng ngón vê, vuốt, rung, nhấn trong không gian tĩnh để hoàn thiện âm sắc.",
    image: "/images/about/the-art-of-craftsmanship-400x300.jpg",
  },
  {
    id: "g-05",
    tag: "05 / TRAO GỬI",
    title: "Hoàn Thiện & Giao Đàn",
    desc: "Đóng gói an toàn và trao gửi tận tay người yêu nhạc cùng cam kết bảo dưỡng âm sắc trọn đời.",
    image: "/images/about/handcrafted_instrument_in_luxury_case_velvet.jpg",
  },
];

export default function AboutExhibitionView() {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll reveal observer for section elements
  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const revealElements = containerRef.current.querySelectorAll(".about-reveal-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isReducedMotion]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden bg-[#140C08] text-[#FFFCF5]">
      {/* ========================================================================= */}
      {/* 1. FULL-SCREEN CINEMATIC OPENING HERO                                     */}
      {/* ========================================================================= */}
      <section className="relative min-h-[88dvh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#140C08] px-4 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-8 sm:pb-12">
        {/* Background Image with subtle atmospheric drift & warm light gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/aboutUs/image.png"
            alt="Xưởng chế tác nhạc cụ Đức Ngân"
            fill
            priority
            className="object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140C08] via-[#140C08]/70 to-[#140C08]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(180,147,104,0.15),transparent_70%)]" />
        </div>

        {/* Center Large Statement */}
        <div className="relative z-10 max-w-4xl my-auto py-8 sm:py-12">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] text-[#FFFCF5] font-normal leading-[1.15] tracking-[0.02em]">
            Từ Thớ Gỗ
            <br />
            <span className="italic text-[#E5C398] font-light">Đến Thanh Âm</span>
          </h1>

          <p className="mt-4 sm:mt-6 font-sans text-sm sm:text-base lg:text-[17px] font-normal text-[#D8CDBD]/90 max-w-2xl leading-relaxed">
            Hành trình đánh thức hồn âm dân tộc từ những khối gỗ mộc quý tại xưởng chế tác Đức Ngân — gìn giữ tinh hoa nhạc cụ truyền thống Việt Nam từ năm 1999.
          </p>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="relative z-10 flex items-center justify-between border-t border-[#554134]/60 pt-4 sm:pt-6 text-xs text-[#8C6B3E] font-sans tracking-widest uppercase">
          <span>KỶ NIỆM 25+ NĂM DI SẢN</span>
          <div className="flex items-center gap-2">
            <span>CUỘN ĐỂ KHÁM PHÁ</span>
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HERITAGE HORIZONTAL STORYTELLING CHAPTER                                */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#180F0B] py-14 sm:py-20 lg:py-28 border-t border-[#3A2920]">
        <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-12">
          <div className="mb-10 sm:mb-14">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
              DẤU ẤN THỜI GIAN
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-semibold text-[#FFFCF5] leading-tight">
              Hành Trình Gìn Giữ Hồn Âm
            </h2>
          </div>

          {/* Desktop & Tablet 4-Moment Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {HERITAGE_MOMENTS.map((moment, idx) => (
              <div
                key={idx}
                className="about-reveal-item group flex flex-col justify-between rounded-[2px] border border-[#3A2920] bg-[#241711]/60 p-4 sm:p-5 lg:p-6 transition-all duration-500 hover:border-[#B49368]/60 hover:bg-[#241711]"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1px] bg-[#140C08] mb-4 sm:mb-5">
                    <Image
                      src={moment.image}
                      alt={moment.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
                      className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                    />
                  </div>

                  <span className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#E5C398] font-normal block mb-1.5 sm:mb-2">
                    {moment.period}
                  </span>

                  <h3 className="font-display text-lg sm:text-xl text-[#FFFCF5] leading-snug mb-2 sm:mb-3">
                    {moment.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#A89C8F] font-light leading-relaxed">
                    {moment.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 3. CRAFTSMANSHIP MANIFESTO (Warm Ivory Editorial Contrast)                */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#FAF8F5] text-[#1F1610] py-16 sm:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-8 lg:px-12 space-y-16 sm:space-y-24">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8C6B3E] font-semibold block">
              TRIẾT LÝ CHẾ TÁC
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-semibold text-[#140C08] leading-tight">
              Tuyên Ngôn Của Người Thợ Cả
            </h2>
            <div className="w-16 h-[1px] bg-[#E3DACD] mx-auto mt-4" />
          </div>

          {/* 3 Oversized Editorial Manifesto Statements paired with imagery */}
          <div className="space-y-16 sm:space-y-24">
            {MANIFESTO_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`about-reveal-item flex flex-col ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-6 sm:gap-10 lg:gap-16 xl:gap-20`}
              >
                {/* Image Frame */}
                <div className="relative aspect-[16/11] w-full lg:w-1/2 overflow-hidden rounded-[2px] bg-[#241711] shadow-md">
                  <Image
                    src={item.image}
                    alt={item.statement}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-103"
                  />
                </div>

                {/* Text Block */}
                <div className="w-full lg:w-1/2 space-y-3.5 sm:space-y-5">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-[#140C08] font-medium leading-[1.25]">
                    {item.statement}
                  </h3>

                  <p className="font-sans text-sm sm:text-base lg:text-lg text-[#4A3F35] font-light leading-relaxed max-w-lg">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE WORKSHOP GALLERY (Horizontal Hover Accordion)               */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#180F0B] py-16 sm:py-24 lg:py-28 border-t border-[#3A2920]">
        <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-12">
          <div className="mb-8 sm:mb-12">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
              QUY TRÌNH CHẾ TÁC
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-semibold text-[#FFFCF5] leading-tight">
              Năm Công Đoạn Độc Bản
            </h2>
          </div>

          {/* Desktop & Tablet: Horizontal Hover Accordion (Flex Expander) */}
          <div className="hidden md:flex h-[420px] sm:h-[460px] lg:h-[520px] xl:h-[560px] w-full gap-2.5 lg:gap-3">
            {WORKSHOP_GALLERY.map((item, idx) => {
              const isActive = activeGalleryIndex === idx;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveGalleryIndex(idx)}
                  className={`relative h-full overflow-hidden rounded-[2px] border border-[#3A2920] transition-all duration-600 ease-out cursor-pointer ${
                    isActive ? "flex-[3.5] border-[#B49368]" : "flex-[1] hover:border-[#554134]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1200px) 60vw, 800px"
                    className="object-cover transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140C08] via-[#140C08]/50 to-transparent" />

                  {/* Active expanded content overlay */}
                  {isActive ? (
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8 bg-gradient-to-t from-[#140C08] via-[#140C08]/70 to-transparent animate-fade-in">
                      <span className="font-sans text-xs font-semibold tracking-widest text-[#E5C398] uppercase block mb-1.5 sm:mb-2">
                        {item.tag}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#FFFCF5] font-normal mb-2 sm:mb-3">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm lg:text-base text-[#D8CDBD] font-light max-w-md leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ) : (
                    /* Inactive collapsed tag */
                    <div className="absolute inset-0 flex items-end justify-center pb-6 sm:pb-8 pointer-events-none text-center px-1 sm:px-2">
                      <span className="font-sans text-[11px] lg:text-xs font-medium tracking-widest text-[#D8CDBD] uppercase opacity-75">
                        {item.tag}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: Interactive Stack List */}
          <div className="md:hidden space-y-3.5">
            {WORKSHOP_GALLERY.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveGalleryIndex(idx)}
                className={`relative overflow-hidden rounded-[2px] border transition-all duration-300 ${
                  activeGalleryIndex === idx
                    ? "border-[#B49368] bg-[#241711]"
                    : "border-[#3A2920] bg-[#180F0B]"
                } p-3.5 sm:p-4`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1px] mb-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-widest text-[#E5C398] uppercase block mb-1">
                  {item.tag}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-[#FFFCF5] mb-1.5">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#D8CDBD] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. QUIET BRAND STATEMENT                                                  */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#140C08] py-16 sm:py-24 lg:py-32 border-t border-[#3A2920]">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium block">
            TRIẾT LÝ HIỆU ĐÀN
          </span>

          <blockquote className="about-reveal-item font-serif italic text-xl sm:text-2xl md:text-3xl lg:text-[34px] text-[#FFFCF5] font-normal leading-[1.4] tracking-normal">
            &ldquo;Âm thanh của một cây đàn mộc không chỉ là tần số của những dây tơ, mà là sự hòa quyện giữa thời gian của gỗ và cái tâm của người thợ cả.&rdquo;
          </blockquote>

          <div className="w-16 h-[1px] bg-[#8C6B3E] mx-auto mt-4 sm:mt-6" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. VISIT / SHOWROOM ENDING                                                */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#180F0B] py-14 sm:py-20 lg:py-24 border-t border-[#3A2920] text-[#FFFCF5]">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#E5C398] font-semibold block">
            TRẢI NGHIỆM TRỰC TIẾP
          </span>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#FFFCF5]">
            Ghé Thăm Không Gian Showroom Đức Ngân
          </h2>

          <p className="font-sans text-xs sm:text-sm lg:text-base text-[#D8CDBD] font-light max-w-lg mx-auto leading-relaxed">
            {SHOWROOM_INFO.address}
          </p>

          <div className="pt-3 sm:pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E5C398] hover:text-white transition-colors border-b border-[#E5C398]/60 pb-1"
            >
              <span>Đặt lịch hẹn trải nghiệm âm sắc</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
