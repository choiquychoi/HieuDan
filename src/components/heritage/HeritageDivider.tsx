import React from "react";

interface HeritageDividerProps {
  className?: string;
  opacity?: number;
}

/**
 * HeritageDivider - Băng Hoa Văn Kỷ Hà Trống Đồng Đông Sơn (Large Heritage Band)
 * Căn cứ tạo hình: Vành hoa văn răng cưa tam giác kết hợp chuỗi vòng tròn đồng tâm kép
 * và tiếp tuyến chéo liên hoàn trên mặt và tang Trống đồng Hoàng Hạ & Ngọc Lũ I.
 * Cấp độ: FULL-WIDTH HERITAGE BAND.
 * Đóng vai trò phân đoạn trang nghiêm giữa Grid sản phẩm và Banner Bespoke Atelier.
 * STATIC VERSION - Zero animation.
 */
export default function HeritageDivider({
  className = "",
  opacity = 0.8,
}: HeritageDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden flex justify-center items-center py-8 sm:py-10 select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 96"
        className="w-full max-w-6xl h-16 sm:h-20"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="dong-son-grand-unit-comp" width="60" height="96" patternUnits="userSpaceOnUse">
            {/* 1. Băng răng cưa tam giác trên */}
            <polygon points="0,8 30,24 60,8" fill="#8C6B3E" fillOpacity="0.22" stroke="#554134" strokeWidth="1.2" strokeLinejoin="round" />
            <line x1="30" y1="8" x2="30" y2="24" stroke="#8C6B3E" strokeWidth="0.8" strokeOpacity="0.6" />
            <circle cx="30" cy="27" r="1.6" fill="#554134" />

            {/* 2. Đường phân cách trên */}
            <line x1="0" y1="32" x2="60" y2="32" stroke="#8C6B3E" strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.5" />

            {/* 3. Lõi chính: Vòng tròn đồng tâm kép & tiếp tuyến chéo Đông Sơn */}
            <line x1="0" y1="38" x2="60" y2="58" stroke="#8C6B3E" strokeWidth="1.2" strokeOpacity="0.75" />
            <line x1="0" y1="58" x2="60" y2="38" stroke="#8C6B3E" strokeWidth="1.2" strokeOpacity="0.75" />

            <circle cx="30" cy="48" r="14" stroke="#554134" strokeWidth="1.6" fill="#F7F3EB" />
            <circle cx="30" cy="48" r="9" stroke="#8C6B3E" strokeWidth="1.0" fill="#EDE2D1" fillOpacity="0.5" />
            <circle cx="30" cy="48" r="5" stroke="#554134" strokeWidth="0.8" fill="none" />
            <circle cx="30" cy="48" r="2.6" fill="#9E3324" fillOpacity="0.9" />

            <circle cx="0" cy="48" r="1.8" fill="#8C6B3E" />
            <circle cx="60" cy="48" r="1.8" fill="#8C6B3E" />

            {/* 4. Đường phân cách dưới */}
            <line x1="0" y1="64" x2="60" y2="64" stroke="#8C6B3E" strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.5" />

            {/* 5. Băng răng cưa tam giác dưới đối xứng */}
            <polygon points="0,88 30,72 60,88" fill="#8C6B3E" fillOpacity="0.22" stroke="#554134" strokeWidth="1.2" strokeLinejoin="round" />
            <line x1="30" y1="88" x2="30" y2="72" stroke="#8C6B3E" strokeWidth="0.8" strokeOpacity="0.6" />
            <circle cx="30" cy="69" r="1.6" fill="#554134" />
          </pattern>

          <linearGradient id="grand-band-fade-comp" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="10%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="90%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <mask id="grand-band-mask-comp">
            <rect x="0" y="0" width="1200" height="96" fill="url(#grand-band-fade-comp)" />
          </mask>
        </defs>

        <g mask="url(#grand-band-mask-comp)">
          <line x1="0" y1="3" x2="1200" y2="3" stroke="#554134" strokeWidth="1.8" strokeOpacity="0.7" />
          <line x1="0" y1="6" x2="1200" y2="6" stroke="#8C6B3E" strokeWidth="0.8" strokeOpacity="0.5" />

          <rect x="0" y="0" width="1200" height="96" fill="url(#dong-son-grand-unit-comp)" />

          <line x1="0" y1="90" x2="1200" y2="90" stroke="#8C6B3E" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="0" y1="93" x2="1200" y2="93" stroke="#554134" strokeWidth="1.8" strokeOpacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
