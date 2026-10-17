import React from "react";

/**
 * JackfruitWoodTexture — Gỗ Mít Tang Đàn Cổ Truyền
 * 
 * Inspired by traditional Vietnamese musical instrument craft (tang mít đàn đáy, đàn bầu, đàn nguyệt).
 * Incorporates the bright golden tonewood hue (#FCFCAE) transitioning into rich aged honey heartwood,
 * textured with organic tonewood growth rings, cathedral wood grain, and hand-planed satin luster.
 */
export default function JackfruitWoodTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
      {/* 1. Base Rich Jackfruit Gradient (#FCFCAE highlight down to aged amber honey) */}
      <div 
        className="absolute inset-0" 
        style={{
          background: "linear-gradient(180deg, #FCFCAE 0%, #F8EEA2 22%, #F1E08C 55%, #E6CD72 85%, #DEC063 100%)",
        }} 
      />

      {/* 2. Hand-Rubbed Beeswax Satin Luster (Ánh dầu trẩu / sáp ong bóng mờ) */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 75% 45% at 50% 25%, rgba(255, 255, 230, 0.45) 0%, rgba(245, 228, 145, 0.2) 55%, transparent 95%)",
        }}
      />

      {/* 3. Pure Vector SVG Acoustic Tonewood Grain (Cathedral rings & organic longitudinal fibers) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Repeating Woodgrain Pattern with 480px wide natural plank module */}
          <pattern
            id="jackfruit-wood-plank"
            width="480"
            height="640"
            patternUnits="userSpaceOnUse"
          >
            {/* Plank Edge Bevel (Rãnh ghép ván gỗ mít thủ công) */}
            <line x1="0" y1="0" x2="0" y2="640" stroke="#7A5412" strokeWidth="0.8" opacity="0.09" />
            <line x1="1" y1="0" x2="1" y2="640" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.25" />

            {/* Cathedral Wood Grain Rings (Vân núi uốn lượn tự nhiên tâm gỗ) */}
            <path
              d="M 120 640 C 160 480, 200 420, 240 420 C 280 420, 320 480, 360 640"
              fill="none"
              stroke="#7A5412"
              strokeWidth="0.8"
              opacity="0.08"
            />
            <path
              d="M 145 640 C 180 515, 210 465, 240 465 C 270 465, 300 515, 335 640"
              fill="none"
              stroke="#7A5412"
              strokeWidth="0.9"
              opacity="0.09"
            />
            <path
              d="M 170 640 C 195 550, 218 510, 240 510 C 262 510, 285 550, 310 640"
              fill="none"
              stroke="#7A5412"
              strokeWidth="1.0"
              opacity="0.10"
            />
            <path
              d="M 195 640 C 210 580, 225 555, 240 555 C 255 555, 270 580, 285 640"
              fill="none"
              stroke="#7A5412"
              strokeWidth="0.7"
              opacity="0.08"
            />

            {/* Flowing Longitudinal Grain Fibers (Thớ dọc lượn sóng mềm mại) */}
            <path
              d="M 35 0 C 42 160, 28 360, 38 640"
              fill="none"
              stroke="#8C651A"
              strokeWidth="0.75"
              opacity="0.09"
            />
            <path
              d="M 75 0 C 68 180, 85 410, 72 640"
              fill="none"
              stroke="#8C651A"
              strokeWidth="0.85"
              opacity="0.08"
            />
            <path
              d="M 115 0 C 122 140, 105 320, 118 640"
              fill="none"
              stroke="#7A5412"
              strokeWidth="0.95"
              opacity="0.09"
            />
            <path
              d="M 240 0 C 236 120, 244 260, 240 400"
              fill="none"
              stroke="#7A5412"
              strokeWidth="0.85"
              opacity="0.08"
            />
            <path
              d="M 365 0 C 355 170, 375 380, 360 640"
              fill="none"
              stroke="#8C651A"
              strokeWidth="0.8"
              opacity="0.08"
            />
            <path
              d="M 405 0 C 415 150, 395 390, 410 640"
              fill="none"
              stroke="#7A5412"
              strokeWidth="0.9"
              opacity="0.09"
            />
            <path
              d="M 445 0 C 438 190, 452 420, 442 640"
              fill="none"
              stroke="#8C651A"
              strokeWidth="0.7"
              opacity="0.08"
            />

            {/* Micro Acoustic Vessel Striations (Thớ tơ li ti xốp nhẹ dẫn âm) */}
            <path d="M 55 0 V 640" fill="none" stroke="#8C651A" strokeWidth="0.5" strokeDasharray="25 65" opacity="0.06" />
            <path d="M 95 0 V 640" fill="none" stroke="#7A5412" strokeWidth="0.55" strokeDasharray="18 50" opacity="0.07" />
            <path d="M 150 0 V 420" fill="none" stroke="#8C651A" strokeWidth="0.45" strokeDasharray="30 80" opacity="0.05" />
            <path d="M 330 0 V 420" fill="none" stroke="#7A5412" strokeWidth="0.5" strokeDasharray="22 60" opacity="0.06" />
            <path d="M 385 0 V 640" fill="none" stroke="#8C651A" strokeWidth="0.55" strokeDasharray="28 75" opacity="0.07" />
            <path d="M 425 0 V 640" fill="none" stroke="#7A5412" strokeWidth="0.45" strokeDasharray="15 45" opacity="0.05" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#jackfruit-wood-plank)" />
      </svg>

      {/* 4. Subtle Acoustic Edge Accents (Chỉ viền nẹp gỗ trên và dưới) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8C651A]/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8C651A]/30 to-transparent" />
    </div>
  );
}
