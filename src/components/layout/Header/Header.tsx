"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import SearchTrigger from "./SearchTrigger";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";

function subscribeScroll(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  if (typeof window === "undefined") return false;
  return window.scrollY > 40;
}

function getScrollServerSnapshot() {
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const isScrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  );

  // Transparent floating header on homepage and about exhibition when not scrolled
  const isDarkOpening = pathname === "/" || pathname === "/about";
  const isTransparent = isDarkOpening && !isScrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isTransparent
          ? "bg-transparent text-[#F5F0E7]"
          : "bg-[#FAF8F5]/92 border-b border-[#D8CDBD]/70 backdrop-blur-xl text-[#2B241F] shadow-xs"
      }`}
    >
      {/* 1. Heritage TopBar (Collapses smoothly on scroll so main header floats) */}
      <div
        className={`w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
            : "max-h-12 opacity-100 translate-y-0"
        }`}
      >
        <TopBar isDarkTheme={isTransparent} />
      </div>

      {/* 2. Main Navigation Bar with Dynamic Height & Apple Fluid Deceleration */}
      <div
        className={`mx-auto flex w-full max-w-[1280px] sm:max-w-[1720px] items-center justify-between gap-3 sm:gap-4 px-3.5 sm:px-6 lg:px-8 xl:px-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isTransparent ? "h-16 sm:h-20 md:h-24" : "h-16"
        }`}
      >
        {/* ================= LEFT: OFFICIAL LOGO + NAVIGATION ================= */}
        <div className="flex items-center gap-6 xl:gap-8 2xl:gap-10 min-w-0">
          <Logo isDarkTheme={isTransparent} />
          <div className="hidden xl:flex items-center">
            <DesktopNavigation isDarkTheme={isTransparent} />
          </div>
        </div>

        {/* ================= RIGHT: SEARCH + LANGUAGE & MOBILE ================= */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
          <SearchTrigger isDarkTheme={isTransparent} />
          <LanguageSwitcher isDarkTheme={isTransparent} />
          <MobileNav isDarkTheme={isTransparent} />
        </div>
      </div>
    </header>
  );
}