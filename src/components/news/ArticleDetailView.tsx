"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article, ArticleContentBlock } from "@/data/news";

interface ArticleDetailViewProps {
  article: Article;
  prevArticle: Article | null;
  nextArticle: Article | null;
  relatedArticles: Article[];
}

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

export default function ArticleDetailView({
  article,
  prevArticle,
  nextArticle,
  relatedArticles,
}: ArticleDetailViewProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const articleRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track scroll progress along the article content
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const articleTop = rect.top;
      const articleHeight = rect.height;

      // Start calculating when article enters viewport
      const totalDistance = articleHeight - windowHeight + 120;
      if (totalDistance <= 0) return;

      const scrolled = Math.max(0, -articleTop + 80);
      const progress = Math.min(100, Math.max(0, (scrolled / totalDistance) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for scroll-triggered section content reveals (reveal once)
  useEffect(() => {
    if (isReducedMotion || !contentRef.current) return;

    const items = contentRef.current.querySelectorAll(".editorial-reveal-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [isReducedMotion, article.blocks]);

  const renderContentBlock = (block: ArticleContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p
            key={index}
            className="editorial-reveal-item font-sans text-base sm:text-[17px] text-[#3A3027] leading-[1.85]"
          >
            {block.text}
          </p>
        );

      case "heading":
        if (block.level === 2) {
          return (
            <h2
              key={index}
              className="editorial-reveal-item font-display text-2xl sm:text-3xl text-[#140C08] font-normal pt-5 sm:pt-7 leading-snug tracking-tight"
            >
              {block.text}
            </h2>
          );
        }
        return (
          <h3
            key={index}
            className="editorial-reveal-item font-display text-xl sm:text-2xl text-[#140C08] font-normal pt-3 leading-snug tracking-tight"
          >
            {block.text}
          </h3>
        );

      case "pull-quote":
        return (
          <blockquote
            key={index}
            className="editorial-reveal-item relative my-8 sm:my-11 pl-6 sm:pl-8 py-2 bg-transparent"
          >
            {/* Animated left bronze border line */}
            <div
              className="editorial-pull-quote-line absolute left-0 top-0 bottom-0 w-[2px] bg-[#A68052]"
              aria-hidden="true"
            />
            <div className="editorial-pull-quote-text">
              <p className="font-display text-xl sm:text-2xl italic text-[#1F1610] leading-relaxed">
                &ldquo;{block.quote}&rdquo;
              </p>
              {block.author && (
                <cite className="block font-sans text-xs uppercase tracking-widest text-[#8C6B3E] font-medium mt-3 not-italic">
                  — {block.author}
                </cite>
              )}
            </div>
          </blockquote>
        );

      case "image":
        return (
          <figure key={index} className="editorial-reveal-item my-8 sm:my-11 space-y-2.5">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-[#241711]">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                sizes="(max-width: 768px) 100vw, 760px"
                className="object-cover transition-transform duration-700 ease-out"
              />
            </div>
            {block.caption && (
              <figcaption className="font-sans text-xs text-[#706458] text-center font-light italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case "list":
        if (block.ordered) {
          return (
            <ol
              key={index}
              className="editorial-reveal-item space-y-3 pl-6 list-decimal marker:text-[#8C6B3E] marker:font-medium font-sans text-base sm:text-[17px] text-[#3A3027] leading-relaxed"
            >
              {block.items.map((item, i) => (
                <li key={i} className="pl-1">
                  {item}
                </li>
              ))}
            </ol>
          );
        }
        return (
          <ul
            key={index}
            className="editorial-reveal-item space-y-3 pl-6 list-disc marker:text-[#8C6B3E] font-sans text-base sm:text-[17px] text-[#3A3027] leading-relaxed"
          >
            {block.items.map((item, i) => (
              <li key={i} className="pl-1">
                {item}
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full">
      {/* ========================================================================= */}
      {/* 1. THIN BRONZE READING-PROGRESS INDICATOR (Fixed at top of viewport)      */}
      {/* ========================================================================= */}
      <div
        className="fixed top-0 left-0 right-0 z-80 h-[2.5px] bg-[#E3DACD]/30 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#8C6B3E] to-[#B49368] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="w-full">
        {/* ========================================================================= */}
        {/* 2. EDITORIAL ARTICLE INTRODUCTION (Staggered Entrance Sequence)           */}
        {/* ========================================================================= */}
        <header className="mx-auto w-full max-w-[760px] px-5 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8">
          {/* Step 1: Subtle breadcrumb & metadata row (Fade upward) */}
          <div className="editorial-fade-up-1 space-y-3">
            <div className="font-sans text-xs tracking-wide text-[#706458]">
              <Link href="/news" className="text-[#8C6B3E] hover:text-[#1F1610] transition-colors">
                Tin tức
              </Link>
              <span className="mx-1.5 text-[#D8CDBD]">/</span>
              <span>{article.category}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-sans text-xs text-[#706458]">
              <span className="font-medium text-[#8C6B3E]">{article.category}</span>
              <span className="text-[#D8CDBD]">·</span>
              <span>{article.publishedAt || article.date}</span>
              <span className="text-[#D8CDBD]">·</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Step 2: Large article title (Fade upward) */}
          <h1 className="editorial-fade-up-2 mt-4 sm:mt-5 font-serif text-2xl sm:text-3xl lg:text-[40px] font-semibold leading-[1.22] text-[#140C08]">
            {article.title}
          </h1>

          {/* Step 3: Short introductory deck/summary beneath the title (Fade upward) */}
          <p className="editorial-fade-up-3 mt-4 sm:mt-5 font-sans text-base sm:text-lg font-normal text-[#4A3F35] leading-relaxed">
            {article.summary || article.excerpt}
          </p>
        </header>

        {/* ========================================================================= */}
        {/* 3. HERO COVER IMAGE (Masked / Clip-path reveal wipe)                       */}
        {/* ========================================================================= */}
        <div className="mx-auto w-full max-w-[1080px] px-4 sm:px-6">
          <div className="editorial-cover-reveal relative aspect-[16/9] w-full overflow-hidden rounded-[2px] bg-[#241711]">
            <Image
              src={article.coverImage || article.image || "/images/about/go_Quy.jpg"}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1080px) 100vw, 1080px"
              className="object-cover"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. ARTICLE BODY (Scroll-revealed Content Blocks)                           */}
        {/* ========================================================================= */}
        <article ref={articleRef} className="mx-auto w-full max-w-[720px] px-5 sm:px-6 pt-10 sm:pt-14">
          <div ref={contentRef} className="space-y-7 sm:space-y-8">
            {article.blocks && article.blocks.length > 0 ? (
              article.blocks.map((block, index) => renderContentBlock(block, index))
            ) : (
              <p className="font-sans text-base text-[#706458] italic py-8 text-center">
                Nội dung đang được cập nhật.
              </p>
            )}
          </div>

          {/* ======================================================================= */}
          {/* 5A. MINIMAL PREV / NEXT NAVIGATION (Underline Draw on Hover)            */}
          {/* ======================================================================= */}
          <nav
            aria-label="Điều hướng bài viết"
            className="mt-14 sm:mt-18 pt-8 sm:pt-10 border-t border-[#E3DACD] flex items-center justify-between gap-4 font-sans text-xs sm:text-sm"
          >
            <div>
              {prevArticle ? (
                <Link
                  href={`/news/${prevArticle.slug}`}
                  className="group inline-flex flex-col text-left text-[#706458] hover:text-[#1F1610] transition-colors"
                >
                  <span className="relative inline-block text-[#8C6B3E] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#8C6B3E] group-hover:after:w-full after:transition-all after:duration-300">
                    ← Bài trước
                  </span>
                  <span className="mt-1 text-xs text-[#4A3F35] font-light line-clamp-1 max-w-[220px] sm:max-w-[280px]">
                    {prevArticle.title}
                  </span>
                </Link>
              ) : (
                <span className="text-[#D8CDBD] text-xs">← Đầu danh mục</span>
              )}
            </div>

            <div className="text-right">
              {nextArticle ? (
                <Link
                  href={`/news/${nextArticle.slug}`}
                  className="group inline-flex flex-col text-right text-[#706458] hover:text-[#1F1610] transition-colors"
                >
                  <span className="relative inline-block text-[#8C6B3E] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#8C6B3E] group-hover:after:w-full after:transition-all after:duration-300">
                    Bài tiếp theo →
                  </span>
                  <span className="mt-1 text-xs text-[#4A3F35] font-light line-clamp-1 max-w-[220px] sm:max-w-[280px]">
                    {nextArticle.title}
                  </span>
                </Link>
              ) : (
                <span className="text-[#D8CDBD] text-xs">Hết danh mục →</span>
              )}
            </div>
          </nav>
        </article>

        {/* ========================================================================= */}
        {/* 5B. RELATED NEWS SECTION (Smooth Card Elevation & Scale Hover)            */}
        {/* ========================================================================= */}
        <section className="mx-auto w-full max-w-[1080px] px-4 sm:px-6 mt-16 sm:mt-20 pt-12 sm:pt-16 pb-16 sm:pb-24 border-t border-[#E3DACD]">
          <div className="mb-8">
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#8C6B3E]">
              ĐỌC THÊM
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-normal text-[#140C08]">
              Chuyện nghề liên quan
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/news/${rel.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-[2px] border border-[#E3DACD]/80 bg-white/70 p-3.5 sm:p-4 transition-all duration-300 hover:border-[#8C6B3E] hover:shadow-xs"
              >
                <div>
                  {/* Compact Landscape Image Frame (Scale max 1.03 on hover) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1px] bg-[#241711] mb-3">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-2 font-sans text-xs text-[#706458] mb-1.5">
                    <span className="text-[#8C6B3E] font-medium">{rel.category}</span>
                    <span className="text-[#D8CDBD]">·</span>
                    <span>{rel.publishedAt || rel.date}</span>
                  </div>

                  {/* Compact Title (TranslateY -3px on hover) */}
                  <h3 className="font-display text-lg text-[#1F1610] leading-snug line-clamp-2 transition-all duration-300 group-hover:-translate-y-[3px] group-hover:text-[#8C6B3E]">
                    {rel.title}
                  </h3>
                </div>

                {/* Minimal Text Action */}
                <div className="mt-4 pt-3 border-t border-[#E3DACD]/60 flex items-center justify-between font-sans text-xs text-[#706458]">
                  <span>{rel.readTime}</span>
                  <span className="font-medium text-[#8C6B3E] group-hover:text-[#1F1610] transition-colors">
                    Đọc tiếp →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
