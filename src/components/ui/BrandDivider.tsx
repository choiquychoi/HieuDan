import React from "react";

interface BrandDividerProps {
  theme?: "ivory" | "walnut";
  label?: string;
  className?: string;
}

export default function BrandDivider({
  theme = "ivory",
  label = "HIỆU ĐÀN ĐỨC NGÂN",
  className = "",
}: BrandDividerProps) {
  const isWalnut = theme === "walnut";

  const lineColor = isWalnut
    ? "from-transparent via-[#C5A880]/50 to-[#C5A880]/20"
    : "from-transparent via-[#B49368]/60 to-[#B49368]/20";

  const rightLineColor = isWalnut
    ? "from-[#C5A880]/20 via-[#C5A880]/50 to-transparent"
    : "from-[#B49368]/20 via-[#B49368]/60 to-transparent";

  const textColor = isWalnut ? "text-[#E5C398]" : "text-[#B49368]";

  return (
    <div
      className={`mx-auto flex w-full max-w-[1280px] items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10 ${className}`}
      role="separator"
      aria-hidden="true"
    >
      {/* Left 3-String Acoustic Lines */}
      <div className="flex flex-1 flex-col gap-[3.5px]">
        <div className={`h-[1px] w-full bg-gradient-to-r ${lineColor}`} />
        <div className={`h-[1px] w-4/5 self-end bg-gradient-to-r ${lineColor} opacity-70`} />
        <div className={`h-[1px] w-3/5 self-end bg-gradient-to-r ${lineColor} opacity-40`} />
      </div>

      {/* Center Motif / Brandmark */}
      <div className="mx-2.5 sm:mx-8 flex shrink-0 items-center rounded-full border border-[#D8CDBD]/70 bg-[#FFFCF5] px-3.5 sm:px-4.5 py-1 sm:py-1.5 shadow-2xs">
        <span
          className={`font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.28em] ${textColor}`}
        >
          {label}
        </span>
      </div>

      {/* Right 3-String Acoustic Lines */}
      <div className="flex flex-1 flex-col gap-[3.5px]">
        <div className={`h-[1px] w-full bg-gradient-to-r ${rightLineColor}`} />
        <div className={`h-[1px] w-4/5 self-start bg-gradient-to-r ${rightLineColor} opacity-70`} />
        <div className={`h-[1px] w-3/5 self-start bg-gradient-to-r ${rightLineColor} opacity-40`} />
      </div>
    </div>
  );
}
