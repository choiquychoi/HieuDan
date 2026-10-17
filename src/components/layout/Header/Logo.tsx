import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  isDarkTheme?: boolean;
  onClick?: () => void;
}

export default function Logo({
  className = "",
  isDarkTheme = true,
  onClick,
}: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group inline-flex items-center select-none focus-visible:outline-none shrink-0 ${className}`}
      aria-label="Hiệu Đàn Đức Ngân - Nhạc cụ truyền thống"
    >
      <Image
        src="/images/hero/logo.png"
        alt="Hiệu Đàn Đức Ngân"
        width={240}
        height={60}
        priority
        style={{ width: "auto" }}
        className={`w-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
          isDarkTheme
            ? "h-9 sm:h-12 lg:h-15 [filter:drop-shadow(0_1.5px_2.5px_rgba(43,36,31,0.35))]"
            : "h-8 sm:h-9.5 lg:h-11 [filter:drop-shadow(0_1px_1.5px_rgba(33,18,10,0.55))_drop-shadow(0_0_1px_rgba(33,18,10,0.3))]"
        }`}
      />
    </Link>
  );
}
