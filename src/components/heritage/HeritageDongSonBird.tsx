import React from "react";

interface HeritageDongSonBirdProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  flipHorizontal?: boolean;
}

/**
 * HeritageDongSonBird - Chim Lạc Đông Sơn (Thế kỷ V - III TCN)
 * Căn cứ tạo hình: Vành chim bay trên mặt Trống đồng Ngọc Lũ I
 * Mỏ dài thẳng, mào lông đầu bay ngược, mắt mặt trời đồng tâm, nan cánh hình học song song, đuôi xòe nan quạt.
 * STATIC VERSION - Zero animation.
 */
export default function HeritageDongSonBird({
  className = "",
  width = 460,
  height = 300,
  opacity = 1,
  flipHorizontal = false,
}: HeritageDongSonBirdProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 400"
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
        <linearGradient id="lac-body-fill-comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A880" stopOpacity="0.24" />
          <stop offset="50%" stopColor="#8C6B3E" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#554134" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="lac-feather-fill-comp" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#8C6B3E" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#C5A880" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <g transform="translate(20, 30)">
        {/* 1. MÀO LÔNG ĐẦU BAY NGƯỢC (CREST PLUME) */}
        <path
          d="M190,128 
             C230,118 300,110 370,120 
             C340,128 270,132 205,138 Z"
          fill="url(#lac-feather-fill-comp)"
          stroke="#8C6B3E"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <line x1="240" y1="120" x2="246" y2="132" stroke="#8C6B3E" strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="270" y1="118" x2="276" y2="130" stroke="#8C6B3E" strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="300" y1="117" x2="306" y2="128" stroke="#8C6B3E" strokeWidth="1.2" strokeOpacity="0.7" />
        <line x1="330" y1="118" x2="336" y2="126" stroke="#8C6B3E" strokeWidth="1.2" strokeOpacity="0.7" />

        {/* 2. MỎ DÀI ĐÔNG SƠN */}
        <path
          d="M170,135 L50,146 L168,142 Z"
          fill="#8C6B3E"
          fillOpacity="0.28"
          stroke="#554134"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M166,144 L60,150 L164,152 Z"
          fill="#8C6B3E"
          fillOpacity="0.22"
          stroke="#554134"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="44" cy="148" r="3.5" fill="#9E3324" fillOpacity="0.8" />

        {/* 3. ĐẦU VÀ MẮT MẶT TRỜI ĐỒNG TÂM */}
        <path
          d="M168,126 
             C195,124 206,142 195,162 
             C180,166 166,155 168,126 Z"
          fill="url(#lac-body-fill-comp)"
          stroke="#554134"
          strokeWidth="1.6"
        />
        <circle cx="180" cy="138" r="7.5" stroke="#554134" strokeWidth="1.4" fill="#F7F3EB" />
        <circle cx="180" cy="138" r="4.2" stroke="#8C6B3E" strokeWidth="1.0" fill="none" />
        <circle cx="180" cy="138" r="2.0" fill="#554134" />

        {/* 4. THÂN CHIM LẠC */}
        <path
          d="M195,162 
             C220,185 260,205 310,210 
             C370,215 410,205 440,195 
             C390,190 330,175 270,160 
             C235,152 205,148 195,162 Z"
          fill="url(#lac-body-fill-comp)"
          stroke="#554134"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="230" cy="170" r="2.5" fill="#8C6B3E" />
        <circle cx="250" cy="176" r="2.5" fill="#8C6B3E" />
        <circle cx="270" cy="182" r="2.5" fill="#8C6B3E" />
        <circle cx="290" cy="188" r="2.5" fill="#8C6B3E" />
        <circle cx="310" cy="193" r="2.5" fill="#8C6B3E" />
        <circle cx="330" cy="196" r="2.5" fill="#8C6B3E" />

        {/* 5. CÁNH NAN HÌNH HỌC ĐÔNG SƠN */}
        <path
          d="M260,158 L360,40 L410,50 L290,165 Z"
          fill="#C5A880"
          fillOpacity="0.14"
          stroke="#8C6B3E"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <line x1="285" y1="130" x2="375" y2="43" stroke="#8C6B3E" strokeWidth="1.0" strokeOpacity="0.5" />
        <line x1="300" y1="142" x2="390" y2="46" stroke="#8C6B3E" strokeWidth="1.0" strokeOpacity="0.5" />

        {/* Cánh trước chính diện */}
        <path
          d="M245,156 
             L330,22 
             C355,26 385,32 415,40 
             L315,172 Z"
          fill="url(#lac-feather-fill-comp)"
          stroke="#554134"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <line x1="260" y1="138" x2="345" y2="25" stroke="#8C6B3E" strokeWidth="1.4" />
        <line x1="275" y1="145" x2="360" y2="29" stroke="#8C6B3E" strokeWidth="1.4" />
        <line x1="290" y1="152" x2="375" y2="33" stroke="#8C6B3E" strokeWidth="1.4" />
        <line x1="305" y1="160" x2="390" y2="36" stroke="#8C6B3E" strokeWidth="1.4" />
        <line x1="252" y1="147" x2="295" y2="90" stroke="#8C6B3E" strokeWidth="0.8" strokeDasharray="2 3" />
        <line x1="267" y1="154" x2="310" y2="96" stroke="#8C6B3E" strokeWidth="0.8" strokeDasharray="2 3" />
        <line x1="282" y1="161" x2="325" y2="102" stroke="#8C6B3E" strokeWidth="0.8" strokeDasharray="2 3" />

        {/* 6. ĐUÔI XÒE NAN QUẠT DÀI */}
        <path
          d="M420,196 L530,175 L525,185 L430,202 Z"
          fill="#C5A880"
          fillOpacity="0.22"
          stroke="#8C6B3E"
          strokeWidth="1.4"
        />
        <path
          d="M430,202 L550,195 L545,208 L435,210 Z"
          fill="url(#lac-body-fill-comp)"
          stroke="#554134"
          strokeWidth="1.6"
        />
        <path
          d="M435,210 L520,225 L515,235 L420,214 Z"
          fill="#C5A880"
          fillOpacity="0.22"
          stroke="#8C6B3E"
          strokeWidth="1.4"
        />
        <line x1="450" y1="200" x2="452" y2="210" stroke="#8C6B3E" strokeWidth="1.2" />
        <line x1="475" y1="198" x2="478" y2="212" stroke="#8C6B3E" strokeWidth="1.2" />
        <line x1="500" y1="196" x2="504" y2="214" stroke="#8C6B3E" strokeWidth="1.2" />

        {/* 7. CHÂN CO KHÍ ĐỘNG HỌC */}
        <path
          d="M340,212 L380,240 L370,245 L332,214 Z"
          fill="#8C6B3E"
          fillOpacity="0.3"
          stroke="#554134"
          strokeWidth="1.4"
        />
        <path
          d="M375,242 L395,250 M378,245 L392,256"
          stroke="#554134"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
