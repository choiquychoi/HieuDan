import React from "react";

interface HeritageLotusProps {
  className?: string;
  size?: number | string;
  opacity?: number;
}

/**
 * HeritageLotus - Đóa Sen Thời Lý (Thế kỷ XI)
 * Căn cứ tạo hình: Đồ án bệ đá hoa sen chùa Phật Tích & đĩa gốm hoa nâu thời Trần
 * Cánh sen hình lá bồ đề nhọn đỉnh, xếp 2 tầng kép so le, gương sen liên phòng ở tâm.
 * STATIC VERSION - Zero animation.
 */
export default function HeritageLotus({
  className = "",
  size = 480,
  opacity = 1,
}: HeritageLotusProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width={size}
      height={size}
      fill="none"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ly-lotus-glow-comp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C5A880" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#8C6B3E" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#554134" stopOpacity="0.02" />
        </radialGradient>
        <linearGradient id="ly-petal-fill-comp" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#8C6B3E" stopOpacity="0.16" />
          <stop offset="70%" stopColor="#C5A880" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
        </linearGradient>

        {/* Cánh Sen Thời Lý Chuẩn: Dáng lá bồ đề nhọn đỉnh, thon đáy, viền gờ nổi kép */}
        <g id="ly-petal-outer-comp">
          <path
            d="M250,250 
               C232,190 200,165 190,120 
               C182,85 210,48 244,18 
               C247,15 250,12 250,12 
               C250,12 253,15 256,18 
               C290,48 318,85 310,120 
               C300,165 268,190 250,250 Z"
            fill="url(#ly-petal-fill-comp)"
            stroke="#8C6B3E"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M250,230 
               C236,182 212,160 205,124 
               C198,92 220,62 250,32 
               C280,62 302,92 295,124 
               C288,160 264,182 250,230 Z"
            fill="none"
            stroke="#8C6B3E"
            strokeWidth="1.0"
            strokeOpacity="0.65"
          />
          <line x1="250" y1="210" x2="250" y2="42" stroke="#8C6B3E" strokeWidth="1.2" strokeOpacity="0.7" />
          <path
            d="M236,115 C244,95 250,75 250,75 C250,75 256,95 264,115 C256,110 244,110 236,115 Z"
            fill="#8C6B3E"
            fillOpacity="0.25"
            stroke="#8C6B3E"
            strokeWidth="0.8"
          />
        </g>

        {/* Cánh Sen Tầng Trong (Nhỏ hơn, ôm sát tâm) */}
        <g id="ly-petal-inner-comp">
          <path
            d="M250,250 
               C236,210 216,190 212,158 
               C208,132 226,108 250,86 
               C274,108 292,132 288,158 
               C284,190 264,210 250,250 Z"
            fill="#C5A880"
            fillOpacity="0.18"
            stroke="#554134"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <line x1="250" y1="230" x2="250" y2="102" stroke="#554134" strokeWidth="1.0" strokeOpacity="0.6" />
        </g>
      </defs>

      <circle cx="250" cy="250" r="238" fill="url(#ly-lotus-glow-comp)" />
      <circle cx="250" cy="250" r="238" stroke="#8C6B3E" strokeWidth="1.2" strokeDasharray="3 7" strokeOpacity="0.4" />
      <circle cx="250" cy="250" r="230" stroke="#8C6B3E" strokeWidth="0.8" strokeOpacity="0.3" />

      {/* 8 Cánh sen lớn xòe 8 hướng */}
      <g>
        <use href="#ly-petal-outer-comp" />
        <use href="#ly-petal-outer-comp" transform="rotate(45 250 250)" />
        <use href="#ly-petal-outer-comp" transform="rotate(90 250 250)" />
        <use href="#ly-petal-outer-comp" transform="rotate(135 250 250)" />
        <use href="#ly-petal-outer-comp" transform="rotate(180 250 250)" />
        <use href="#ly-petal-outer-comp" transform="rotate(225 250 250)" />
        <use href="#ly-petal-outer-comp" transform="rotate(270 250 250)" />
        <use href="#ly-petal-outer-comp" transform="rotate(315 250 250)" />
      </g>

      {/* 8 Cánh sen trong so le */}
      <g>
        <use href="#ly-petal-inner-comp" transform="rotate(22.5 250 250)" />
        <use href="#ly-petal-inner-comp" transform="rotate(67.5 250 250)" />
        <use href="#ly-petal-inner-comp" transform="rotate(112.5 250 250)" />
        <use href="#ly-petal-inner-comp" transform="rotate(157.5 250 250)" />
        <use href="#ly-petal-inner-comp" transform="rotate(202.5 250 250)" />
        <use href="#ly-petal-inner-comp" transform="rotate(247.5 250 250)" />
        <use href="#ly-petal-inner-comp" transform="rotate(292.5 250 250)" />
        <use href="#ly-petal-inner-comp" transform="rotate(337.5 250 250)" />
      </g>

      {/* Vòng nhụy hoa sen */}
      <g stroke="#8C6B3E" strokeWidth="1.0" strokeOpacity="0.8">
        <circle cx="250" cy="250" r="54" stroke="#8C6B3E" strokeWidth="1.0" strokeDasharray="2 4" fill="none" />
        <circle cx="250" cy="198" r="2.2" fill="#8C6B3E" />
        <circle cx="270" cy="202" r="2.2" fill="#8C6B3E" />
        <circle cx="288" cy="214" r="2.2" fill="#8C6B3E" />
        <circle cx="300" cy="232" r="2.2" fill="#8C6B3E" />
        <circle cx="302" cy="250" r="2.2" fill="#8C6B3E" />
        <circle cx="300" cy="268" r="2.2" fill="#8C6B3E" />
        <circle cx="288" cy="286" r="2.2" fill="#8C6B3E" />
        <circle cx="270" cy="298" r="2.2" fill="#8C6B3E" />
        <circle cx="250" cy="302" r="2.2" fill="#8C6B3E" />
        <circle cx="230" cy="298" r="2.2" fill="#8C6B3E" />
        <circle cx="212" cy="286" r="2.2" fill="#8C6B3E" />
        <circle cx="200" cy="268" r="2.2" fill="#8C6B3E" />
        <circle cx="198" cy="250" r="2.2" fill="#8C6B3E" />
        <circle cx="200" cy="232" r="2.2" fill="#8C6B3E" />
        <circle cx="212" cy="214" r="2.2" fill="#8C6B3E" />
        <circle cx="230" cy="202" r="2.2" fill="#8C6B3E" />
      </g>

      {/* Tâm liên phòng gương sen */}
      <g>
        <circle cx="250" cy="250" r="38" fill="#EDE2D1" stroke="#554134" strokeWidth="1.8" />
        <circle cx="250" cy="250" r="34" stroke="#8C6B3E" strokeWidth="0.8" strokeDasharray="2 3" fill="none" />
        <circle cx="250" cy="250" r="6" fill="#9E3324" fillOpacity="0.85" />
        <circle cx="250" cy="232" r="3.2" fill="#554134" />
        <circle cx="266" cy="241" r="3.2" fill="#554134" />
        <circle cx="266" cy="259" r="3.2" fill="#554134" />
        <circle cx="250" cy="268" r="3.2" fill="#554134" />
        <circle cx="234" cy="259" r="3.2" fill="#554134" />
        <circle cx="234" cy="241" r="3.2" fill="#554134" />
      </g>
    </svg>
  );
}
