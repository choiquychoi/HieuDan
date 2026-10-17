import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { SHOWROOM_INFO } from "@/data/navigation";

interface TopBarProps {
  isDarkTheme?: boolean;
}

export default function TopBar({ isDarkTheme = true }: TopBarProps) {
  return (
    <div
      className={`relative z-60 w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isDarkTheme
          ? "border-b border-[#3A2920]/40 bg-[#241711]/90 backdrop-blur-md text-[#D8CDBD]"
          : "border-b border-[#E3DACD]/70 bg-[#F5F0E7]/90 backdrop-blur-md text-[#574F46]"
      }`}
    >
      <div className="mx-auto flex min-h-[30px] sm:min-h-[38px] py-1 sm:py-2 w-full max-w-[1280px] sm:max-w-[1720px] items-center justify-between px-3 sm:px-6 lg:px-8 xl:px-12 text-[11px] sm:text-[13px]">
        {/* Left: Heritage Announcement */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-2">
          <span
            className={`font-sans font-medium truncate ${
              isDarkTheme ? "text-[#E9E0D2]" : "text-[#2B241F]"
            }`}
          >
            <span className="hidden min-[480px]:inline">
              Hiệu Đàn Đức Ngân — Gìn giữ tinh hoa nhạc cụ dân tộc Việt Nam từ 1999
            </span>
            <span className="inline min-[480px]:hidden">
              Đức Ngân — Di sản nhạc cụ từ 1999
            </span>
          </span>
        </div>

        {/* Right: Showroom & Hotline */}
        <div className="flex items-center gap-2.5 sm:gap-6 text-[11.5px] sm:text-[13px] shrink-0">
          <Link
            href="/contact"
            className={`hidden md:flex items-center gap-1.5 transition-colors ${
              isDarkTheme
                ? "text-[#D8CDBD] hover:text-[#F2EEE6]"
                : "text-[#574F46] hover:text-[#1F1610]"
            }`}
          >
            <MapPin
              size={13}
              className={isDarkTheme ? "text-[#C5A880]" : "text-[#A68052]"}
            />
            <span>Showroom: 526 Điện Biên Phủ, Q.10</span>
          </Link>

          <a
            href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
            className={`flex items-center gap-1.5 font-semibold transition-colors py-1 min-h-[32px] sm:min-h-0 ${
              isDarkTheme
                ? "text-[#E5C398] hover:text-white"
                : "text-[#8C6B3E] hover:text-[#1F1610]"
            }`}
          >
            <Phone
              size={12}
              className={isDarkTheme ? "text-[#C5A880]" : "text-[#A68052]"}
            />
            <span className="hidden min-[420px]:inline">Hotline: </span>
            <span>{SHOWROOM_INFO.hotline}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
