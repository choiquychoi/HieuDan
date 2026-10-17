"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { STORY_CHAPTERS, StoryChapter } from "@/data/stories";

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

export default function StoriesAnthologyView() {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [activeChapterId, setActiveChapterId] = useState<string>(STORY_CHAPTERS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll observer to reveal chapter items and update active nav tab
  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    const revealItems = containerRef.current.querySelectorAll(".story-reveal-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            const chapterId = entry.target.getAttribute("data-chapter-id");
            if (chapterId) {
              setActiveChapterId(chapterId);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    revealItems.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isReducedMotion]);

  const scrollToChapter = (id: string) => {
    setActiveChapterId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-[#FAF8F5] text-[#1F1610] selection:bg-[#B49368] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. EDITORIAL HERO HEADER                                                  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-[#E3DACD]/80 bg-gradient-to-b from-[#F5F0E7] via-[#FAF8F5] to-[#FAF8F5] pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(180,147,104,0.12),transparent_70%)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border border-[#D8CDBD] bg-white/80 px-4 py-1 shadow-xs backdrop-blur-xs mb-5">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6B3E]">
              Giai Thoại Mộc &amp; Thanh
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.2] tracking-normal text-[#140C08] max-w-3xl mx-auto">
            Mỗi Cây Đàn Là Một Cuộc Đời,
            <br />
            <span className="italic font-light text-[#8C6B3E]">Mỗi Thanh Âm Là Một Câu Chuyện.</span>
          </h1>

          <p className="mt-4 sm:mt-5 font-sans text-base sm:text-[17px] text-[#574F46] max-w-2xl mx-auto font-normal leading-relaxed">
            Hành trình 25+ năm đẽo gọt mộc quý, đánh thức hồn thanh và gìn giữ tinh hoa nhạc cụ dân tộc Việt Nam tại Hiệu Đàn Đức Ngân.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CHAPTER QUICK NAVIGATION TABS                                         */}
      {/* ========================================================================= */}
      <nav
        aria-label="Điều hướng chương câu chuyện"
        className="sticky top-16 z-40 w-full border-b border-[#E3DACD] bg-[#FAF8F5]/95 backdrop-blur-md transition-all duration-300 select-none"
      >
        <div className="mx-auto flex w-full max-w-[1360px] items-center justify-start sm:justify-center overflow-x-auto px-4 py-3 gap-2 sm:gap-3 no-scrollbar">
          {STORY_CHAPTERS.map((ch) => {
            const isActive = activeChapterId === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(ch.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#241711] text-[#E5C398] font-bold shadow-xs border border-[#B49368]/40"
                    : "bg-white/80 text-[#706458] hover:bg-white hover:text-[#1F1610] border border-[#E3DACD]"
                }`}
              >
                <span className="font-display font-bold text-xs">{ch.numeral}.</span>
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. FOUR STORY CHAPTERS (PERFECTLY FITTED ASPECT-[4/5] FRAMES)            */}
      {/* ========================================================================= */}
      <main className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 space-y-24 sm:space-y-32 lg:space-y-36">
        {STORY_CHAPTERS.map((chapter: StoryChapter, idx: number) => {
          const isEven = idx % 2 === 1;

          return (
            <article
              key={chapter.id}
              id={chapter.id}
              data-chapter-id={chapter.id}
              className={`story-reveal-item flex flex-col ${
                isEven ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-10 sm:gap-14 lg:gap-20 scroll-mt-32`}
            >
              {/* ================= IMAGE FRAME: ASPECT-[4/5] WITH FULL CONTENT FIT ================= */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="group relative aspect-[4/5] w-full max-w-md lg:max-w-none overflow-hidden rounded-[4px] border border-[#E3DACD] bg-[#140C08] shadow-xl">
                  
                  {/* Layer 1: Ambient Blurred Background to Fill the 4:5 Frame */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={chapter.image}
                      alt=""
                      fill
                      className="object-cover blur-xl scale-125 opacity-35"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Layer 2: Main Clear Uncropped Image Fitting 100% in the Frame */}
                  <div className="relative h-full w-full p-4 sm:p-6 flex items-center justify-center z-10">
                    <Image
                      src={chapter.image}
                      alt={chapter.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 550px"
                      className="object-contain p-2 sm:p-4 transition-transform duration-700 ease-out group-hover:scale-104 drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  {/* Layer 3: Warm Tone Ambient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140C08]/80 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Layer 4: Chapter Roman Numeral Badge */}
                  <div className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#140C08]/90 text-[#E5C398] font-display text-base font-bold border border-[#8C6B3E]/60 shadow-md backdrop-blur-xs">
                    {chapter.numeral}
                  </div>
                </div>
              </div>

              {/* ================= NARRATIVE CONTENT BLOCK ================= */}
              <div className="w-full lg:w-1/2 space-y-5 sm:space-y-6">
                {/* Chapter Metadata */}
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl sm:text-3xl text-[#8C6B3E] font-bold">
                    CHƯƠNG {chapter.numeral}
                  </span>
                  <span className="h-4 w-[1px] bg-[#D8CDBD]" />
                  <span className="font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8C6B3E]">
                    {chapter.period}
                  </span>
                </div>

                {/* Chapter Title */}
                <h2 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-semibold leading-tight text-[#140C08]">
                  {chapter.title}
                </h2>

                {/* Narrative Summary */}
                <p className="font-sans text-base sm:text-lg font-light text-[#3A3027] leading-relaxed">
                  {chapter.summary}
                </p>

                {/* Pull Quote */}
                <div className="pl-5 border-l-2 border-[#8C6B3E] py-2 bg-[#F5F0E7]/70 rounded-r-[3px]">
                  <blockquote className="font-display text-lg sm:text-xl text-[#140C08] italic leading-snug">
                    &ldquo;{chapter.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* ========================================================================= */}
      {/* 4. SHOWROOM INVITATION BANNER                                             */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#140C08] text-[#FFFCF5] py-18 sm:py-24 lg:py-28 border-t border-[#3A2920]">
        <div className="mx-auto w-full max-w-3xl px-6 text-center space-y-5 sm:space-y-6">
          <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            TRẢI NGHIỆM TRỰC TIẾP
          </span>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-semibold text-[#FFFCF5] leading-tight">
            Ghé Thăm 526 Điện Biên Phủ &amp; Lắng Nghe Chuyện Đàn
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#D8CDBD]/85 max-w-xl mx-auto font-light leading-relaxed">
            Mời bạn ghé xưởng thưởng chén trà ấm, lắng nghe câu chuyện về từng thớ gỗ và chọn cây đàn mang thanh âm của riêng bạn.
          </p>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[2px] bg-[#B49368] px-8 py-3.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#241711] shadow-lg transition-all duration-300 hover:bg-[#C5A880] hover:scale-102 cursor-pointer"
            >
              <span>Đặt lịch hẹn thưởng âm →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
