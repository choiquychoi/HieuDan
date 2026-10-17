import React from "react";

interface HeritageMicroFloralProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
}

/**
 * HeritageMicroFloral - Họa Tiết Hoa Cúc Dây / Búp Sen Thời Lý
 * Căn cứ tạo hình: Đồ án hoa cúc dây chạm trên diềm cửa và bệ gốm thời Lý - Trần.
 * Cấp độ: MICRO HERITAGE ORNAMENT.
 * Dùng điểm xuyết tiết chế: gần pagination, lề sidebar, hoặc chuyển đoạn.
 * STATIC VERSION - Zero animation.
 */
export default function HeritageMicroFloral({
  className = "",
  width = 160,
  height = 50,
  opacity = 0.5,
}: HeritageMicroFloralProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 70"
      width={width}
      height={height}
      fill="none"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="micro-floral-comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A880" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8C6B3E" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <g transform="translate(120, 35)">
        {/* Đóa hoa sen / cúc dây trung tâm */}
        <path
          d="M0,0 C-5,-10 -6,-20 0,-26 C6,-20 5,-10 0,0 Z"
          fill="url(#micro-floral-comp)"
          stroke="#8C6B3E"
          strokeWidth="1.2"
        />
        <path
          d="M0,0 C-5,10 -6,20 0,26 C6,20 5,10 0,0 Z"
          fill="url(#micro-floral-comp)"
          stroke="#8C6B3E"
          strokeWidth="1.2"
        />
        <path
          d="M0,0 C-10,-5 -20,-6 -26,0 C-20,6 -10,5 0,0 Z"
          fill="url(#micro-floral-comp)"
          stroke="#8C6B3E"
          strokeWidth="1.2"
        />
        <path
          d="M0,0 C10,-5 20,-6 26,0 C20,6 10,5 0,0 Z"
          fill="url(#micro-floral-comp)"
          stroke="#8C6B3E"
          strokeWidth="1.2"
        />
        <circle cx="-10" cy="-10" r="3.5" fill="#8C6B3E" fillOpacity="0.3" stroke="#554134" strokeWidth="0.8" />
        <circle cx="10" cy="-10" r="3.5" fill="#8C6B3E" fillOpacity="0.3" stroke="#554134" strokeWidth="0.8" />
        <circle cx="-10" cy="10" r="3.5" fill="#8C6B3E" fillOpacity="0.3" stroke="#554134" strokeWidth="0.8" />
        <circle cx="10" cy="10" r="3.5" fill="#8C6B3E" fillOpacity="0.3" stroke="#554134" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="4.5" fill="#9E3324" fillOpacity="0.85" stroke="#554134" strokeWidth="1.0" />

        {/* Nhánh hoa lá bên phải */}
        <path
          d="M26,0 C45,-2 60,-15 80,-10 C95,-6 105,8 98,16 C92,22 80,18 82,10 C84,4 92,2 96,6"
          stroke="#8C6B3E"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M50,-6 C60,-18 72,-16 68,-6 Z" fill="url(#micro-floral-comp)" stroke="#554134" strokeWidth="1.0" />
        <path d="M65,0 C74,10 82,8 78,0 Z" fill="url(#micro-floral-comp)" stroke="#554134" strokeWidth="1.0" />
        <circle cx="106" cy="4" r="1.8" fill="#8C6B3E" />

        {/* Nhánh hoa lá bên trái */}
        <path
          d="M-26,0 C-45,-2 -60,-15 -80,-10 C-95,-6 -105,8 -98,16 C-92,22 -80,18 -82,10 C-84,4 -92,2 -96,6"
          stroke="#8C6B3E"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M-50,-6 C-60,-18 -72,-16 -68,-6 Z" fill="url(#micro-floral-comp)" stroke="#554134" strokeWidth="1.0" />
        <path d="M-65,0 C-74,10 -82,8 -78,0 Z" fill="url(#micro-floral-comp)" stroke="#554134" strokeWidth="1.0" />
        <circle cx="-106" cy="4" r="1.8" fill="#8C6B3E" />
      </g>
    </svg>
  );
}
