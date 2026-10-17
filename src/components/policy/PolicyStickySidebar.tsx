"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BookOpen,
  Phone,
  MessageCircle,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { POLICY_NAV_ITEMS, WORKSHOP_CONTACT } from "@/data/policyData";
import { SHOWROOM_INFO } from "@/data/navigation";

export default function PolicyStickySidebar() {
  const [activeId, setActiveId] = useState<string>("van-chuyen");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 180;
      let currentId = POLICY_NAV_ITEMS[0].id;

      for (const item of POLICY_NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentId = item.id;
          }
        }
      }

      // If scrolled near bottom of page, activate the last policy item
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        currentId = POLICY_NAV_ITEMS[POLICY_NAV_ITEMS.length - 1].id;
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  }, []);

  const activeItem = POLICY_NAV_ITEMS.find((item) => item.id === activeId);

  return (
    <div className="relative mb-8 lg:mb-0 flex flex-col gap-5 w-full">
      {/* Mobile Drawer Accordion Toggle */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D8CDBD]/80 text-[#2B241F] shadow-md"
          aria-expanded={isMobileOpen}
        >
          <div className="flex items-center gap-2.5">
            <BookOpen size={18} className="text-[#8C6B3E]" />
            <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
              Mục lục chính sách:
            </span>
            <span className="text-sm font-bold text-[#8C6B3E] truncate max-w-[180px]">
              {activeItem?.label || "Chọn mục"}
            </span>
          </div>
          <ChevronDown
            size={18}
            className={`text-stone-500 transition-transform duration-300 ${
              isMobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Main TOC Box */}
      <div
        className={`relative p-5 sm:p-6 rounded-3xl lg:rounded-2xl border flex flex-col w-full bg-white/85 backdrop-blur-md shadow-lg border-[#D8CDBD]/70 lg:max-h-[calc(100vh-10rem)] transition-all duration-300 ${
          isMobileOpen ? "flex" : "hidden lg:flex"
        }`}
      >
        {/* Header with icon and title */}
        <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-stone-200/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F7F2EA] border border-[#D8CDBD]/70 flex items-center justify-center text-[#8C6B3E]">
              <BookOpen size={18} />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#2B241F] font-serif tracking-wide">
              Chính sách
            </h2>
          </div>
        </div>

        {/* Scrollable Navigation List with Left Border Indicator */}
        <nav
          aria-label="Mục lục điều khoản"
          className="flex flex-col overflow-y-auto custom-scrollbar flex-1 pb-2 space-y-1.5"
        >
          {POLICY_NAV_ITEMS.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                data-toc-id={`toc-${index}`}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-2.5 sm:py-3 px-3.5 text-xs sm:text-[13.5px] leading-snug transition-all duration-300 border-l-[3px] pl-5 rounded-r-xl ${
                  isActive
                    ? "border-[#8C6B3E] bg-[#F7F2EA] text-[#8C6B3E] font-bold shadow-[0_0_14px_rgba(140,107,62,0.12)]"
                    : "border-transparent text-stone-600 hover:text-[#2B241F] hover:border-[#B49368]/50 hover:bg-[#FAF6F0]"
                }`}
              >
                <span className="block">
                  {index + 1}. {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Hotline Hỗ Trợ Nghệ Nhân Box */}
      <div
        className={`bg-[#FAF6F0] border border-[#E8DFD3] rounded-2xl p-4 sm:p-5 shadow-xs ${
          isMobileOpen ? "block" : "hidden lg:block"
        }`}
      >
        <h3 className="font-serif font-bold text-[#2B241F] text-sm mb-3">
          Hotline Hỗ Trợ Nghệ Nhân
        </h3>
        <div className="space-y-2.5 text-xs sm:text-sm text-stone-600">
          <a
            href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
            className="flex items-center gap-2.5 text-[#2B241F] hover:text-[#8B5A2B] font-medium transition-colors"
          >
            <Phone size={15} className="text-[#8B5A2B] shrink-0" />
            <span>{SHOWROOM_INFO.hotline}</span>
          </a>
          <a
            href={WORKSHOP_CONTACT.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-stone-600 hover:text-[#8B5A2B] transition-colors"
          >
            <MessageCircle size={15} className="text-[#8B5A2B] shrink-0" />
            <span>Zalo Hỗ trợ Kỹ thuật</span>
          </a>
          <div className="flex items-start gap-2.5 text-stone-600 pt-1 border-t border-[#E8DFD3]/60">
            <MapPin size={15} className="text-[#8B5A2B] shrink-0 mt-0.5" />
            <span className="text-xs leading-relaxed">
              {SHOWROOM_INFO.address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
