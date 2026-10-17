import React from "react";

interface HeritageCloudScrollProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  flipHorizontal?: boolean;
}

/**
 * HeritageCloudScroll - Vân Mây Cuộn Đuôi Nheo Truyền Thống Việt Nam
 * Căn cứ tạo hình: Đồ án vân mây chạm khắc thời Lê - Nguyễn trên bia đá & khánh gỗ di sản.
 * Cụm xoắn ốc mây tròn liên hoàn kết hợp thân mây uốn lượn và dải đuôi nheo bay lướt.
 * Cấp độ: SECTION-SCALE ORNAMENT.
 * STATIC VERSION - Zero animation.
 */
export default function HeritageCloudScroll({
  className = "",
  width = 380,
  height = 160,
  opacity = 0.45,
  flipHorizontal = false,
}: HeritageCloudScrollProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 180"
      width={width}
      height={height}
      fill="none"
      className={className}
      style={{
        opacity,
        transform: flipHorizontal ? "scaleX(-1)" : undefined,
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cloud-fill-comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A880" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#8C6B3E" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#554134" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <g transform="translate(10, 10)">
        {/* Mảng thân mây chính */}
        <path
          d="M30,110 
             C10,95 5,65 25,45 
             C45,25 80,30 95,50 
             C105,30 135,15 165,25 
             C195,35 205,65 195,85 
             C225,70 260,75 285,95 
             C315,120 310,145 280,150 
             C320,140 370,115 400,70 
             C370,95 325,125 270,130 
             C235,135 210,120 195,105 
             C180,125 150,135 125,130 
             C95,125 80,105 75,95 
             C60,115 35,125 30,110 Z"
          fill="url(#cloud-fill-comp)"
          stroke="#8C6B3E"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Xoắn ốc mây truyền thống 1 */}
        <path
          d="M48,55 
             C35,68 38,90 52,98 
             C68,105 88,95 90,78 
             C92,62 78,50 64,54 
             C55,58 52,70 60,76 
             C66,80 74,76 72,70"
          stroke="#554134"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Xoắn ốc mây truyền thống 2 */}
        <path
          d="M130,45 
             C120,58 122,80 138,88 
             C154,95 174,85 176,68 
             C178,52 165,40 150,44 
             C140,48 138,60 146,66 
             C152,70 160,66 158,60"
          stroke="#554134"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Đường gờ nổi viền mây nội tại */}
        <path
          d="M80,65 C100,55 125,60 140,75 C155,90 180,95 200,85"
          stroke="#8C6B3E"
          strokeWidth="1.0"
          strokeOpacity="0.6"
          fill="none"
        />
        <path
          d="M205,95 C230,85 260,95 275,115"
          stroke="#8C6B3E"
          strokeWidth="1.0"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* Đuôi nheo mây vút dài */}
        <path
          d="M260,135 C300,130 350,110 385,75"
          stroke="#8C6B3E"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          strokeOpacity="0.65"
          fill="none"
        />
        <path
          d="M230,128 C265,138 310,135 350,115"
          stroke="#554134"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* Điểm nhấn hạt ngọc sơn mài đỏ */}
        <circle cx="66" cy="72" r="2.2" fill="#9E3324" fillOpacity="0.8" />
        <circle cx="152" cy="62" r="2.2" fill="#9E3324" fillOpacity="0.8" />
      </g>
    </svg>
  );
}
