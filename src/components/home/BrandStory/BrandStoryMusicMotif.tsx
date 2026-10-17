import React from "react";

/**
 * BrandStoryMusicMotif — Heritage Musical Graphic Element
 * 
 * Recreates the iconic bottom-left decorative musical emblem from Reference Image 2:
 * - Amber/ochre grounding geometric block (#8C5320 / #A66A28)
 * - Flowing ivory white staff lines (khuông nhạc uốn lượn)
 * - Stylized classical treble clef (khóa Sol)
 * - Musical notation noteheads floating gracefully
 * - Partially overlaps the dark brown outer frame and parchment content box
 */
export default function BrandStoryMusicMotif({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 sm:w-32 md:w-36 lg:w-44 h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
      >
        {/* 1. Ochre / Amber Geometric Foundation Plaque */}
        <rect
          x="10"
          y="85"
          width="80"
          height="125"
          rx="2"
          fill="#8C5320"
          fillOpacity="0.92"
        />
        <rect
          x="14"
          y="89"
          width="72"
          height="117"
          stroke="#C5A880"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* 2. Sweeping Musical Staff Lines (5 curved lines flowing up and to the right) */}
        <path
          d="M 20 185 C 45 185, 75 155, 115 125 C 145 102, 170 80, 195 62"
          stroke="#FFFDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.92"
        />
        <path
          d="M 23 191 C 48 191, 78 161, 118 131 C 148 108, 173 86, 198 68"
          stroke="#FFFDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.92"
        />
        <path
          d="M 26 197 C 51 197, 81 167, 121 137 C 151 114, 176 92, 201 74"
          stroke="#FFFDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.92"
        />
        <path
          d="M 29 203 C 54 203, 84 173, 124 143 C 154 120, 179 98, 204 80"
          stroke="#FFFDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.92"
        />
        <path
          d="M 32 209 C 57 209, 87 179, 127 149 C 157 126, 182 104, 207 86"
          stroke="#FFFDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.92"
        />

        {/* 3. Floating Musical Notes on the Staff */}
        {/* Note 1 */}
        <ellipse
          cx="102"
          cy="140"
          rx="7.5"
          ry="5.5"
          transform="rotate(-28 102 140)"
          fill="#FFFDF8"
        />
        <line
          x1="108"
          y1="137"
          x2="108"
          y2="110"
          stroke="#FFFDF8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Note 2 */}
        <ellipse
          cx="138"
          cy="114"
          rx="7.5"
          ry="5.5"
          transform="rotate(-28 138 114)"
          fill="#FFFDF8"
        />
        <line
          x1="144"
          y1="111"
          x2="144"
          y2="84"
          stroke="#FFFDF8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Note 3 */}
        <ellipse
          cx="168"
          cy="90"
          rx="7"
          ry="5"
          transform="rotate(-28 168 90)"
          fill="#FFFDF8"
        />
        <line
          x1="174"
          y1="87"
          x2="174"
          y2="62"
          stroke="#FFFDF8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* 4. Elegant Stylized Classical Treble Clef Motif */}
        <g stroke="#FFFDF8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path
            d="M 52 202 C 52 210, 43 214, 38 210 C 33 206, 36 196, 44 194 C 50 192, 54 186, 54 175 L 54 45 C 54 28, 43 22, 36 28 C 30 33, 32 46, 45 68 L 54 84 C 65 104, 76 122, 76 138 C 76 156, 62 168, 44 168 C 26 168, 14 154, 14 136 C 14 116, 30 102, 48 102 C 64 102, 72 114, 72 128 C 72 140, 63 148, 52 148 C 42 148, 36 141, 36 134 C 36 127, 41 122, 48 122 C 53 122, 56 125, 56 130"
          />
        </g>
      </svg>
    </div>
  );
}
