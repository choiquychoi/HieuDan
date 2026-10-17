import React from "react";

/**
 * BrandStoryAtmosphere — Heritage Paper Room Atmosphere
 *
 * Concept:
 * "A quiet museum room where archival instrument documents, old photographs,
 * and dó-paper materials are displayed."
 *
 * Strict Rule:
 * The instrument drawing sits strictly on the left flank (x: -80px to 180px in 1600 canvas).
 * ZERO lines or annotations cross behind the text paragraphs.
 */
export default function BrandStoryAtmosphere() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Base Archival Parchment / Warm Dó-Paper Tone */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 20%, #FAF7F0 0%, #F2ECDF 55%, #EBE3D3 100%)",
        }}
      />

      {/* 2. Ultra-Subtle Dó-Paper / Handmade Fiber Texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.038] mix-blend-multiply pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="do-paper-fiber-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" result="grayNoise" />
        </filter>
        <rect width="100%" height="100%" fill="#8C8272" filter="url(#do-paper-fiber-texture)" />
      </svg>

      {/* 3. Expansive Museum Archival Vector Blueprint (1600x800 Canvas) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* =========================================================================
            LEFT FLANK ARTWORK: LARGE-SCALE ĐÀN NGUYỆT ARCHIVAL BLUEPRINT
            Strictly positioned on the left edge (Center X = 35px, Radius = 145px).
            Rightmost edge is 180px. Completely clears the text starting at 220px+.
        ========================================================================== */}
        <g id="dan-nguyet-archival-blueprint" className="transition-opacity duration-700">
          {/* Circular Soundbox (Thùng Đàn Nguyệt - Trăng rằm) */}
          <circle
            cx="35"
            cy="520"
            r="145"
            stroke="#8C8272"
            strokeWidth="1.6"
            className="opacity-[0.14]"
          />

          {/* Inner Resonant Soundboard Rim */}
          <circle
            cx="35"
            cy="520"
            r="133"
            stroke="#8C8272"
            strokeWidth="0.9"
            strokeDasharray="5 4"
            className="opacity-[0.09]"
          />

          {/* Central Acoustic Rosette Soundhole */}
          <circle
            cx="35"
            cy="520"
            r="24"
            stroke="#8C8272"
            strokeWidth="1.1"
            strokeDasharray="3 3"
            className="opacity-[0.10]"
          />
          <circle
            cx="35"
            cy="520"
            r="6"
            stroke="#8C8272"
            strokeWidth="1.0"
            className="opacity-[0.11]"
          />

          {/* Slender Long Neck running vertically */}
          <line
            x1="26"
            y1="375"
            x2="26"
            y2="105"
            stroke="#8C8272"
            strokeWidth="1.5"
            className="opacity-[0.13]"
          />
          <line
            x1="44"
            y1="375"
            x2="44"
            y2="105"
            stroke="#8C8272"
            strokeWidth="1.5"
            className="opacity-[0.13]"
          />

          {/* Centerline Construction Axis */}
          <line
            x1="35"
            y1="40"
            x2="35"
            y2="720"
            stroke="#8C8272"
            strokeWidth="0.8"
            strokeDasharray="6 4"
            className="opacity-[0.08]"
          />

          {/* Traditional High Frets on Neck */}
          {[
            { y: 350, w: 22 },
            { y: 322, w: 22 },
            { y: 292, w: 21 },
            { y: 262, w: 21 },
            { y: 230, w: 20 },
            { y: 198, w: 20 },
            { y: 166, w: 19 },
            { y: 135, w: 19 },
          ].map((fret, idx) => (
            <g key={`nguyet-fret-${idx}`}>
              <line
                x1={35 - fret.w / 2}
                y1={fret.y}
                x2={35 + fret.w / 2}
                y2={fret.y}
                stroke="#8C8272"
                strokeWidth="1.5"
                className="opacity-[0.13]"
              />
            </g>
          ))}

          {/* Frets on Soundboard */}
          <line x1="15" y1="405" x2="55" y2="405" stroke="#8C8272" strokeWidth="1.3" className="opacity-[0.11]" />
          <line x1="10" y1="440" x2="60" y2="440" stroke="#8C8272" strokeWidth="1.3" className="opacity-[0.11]" />
          <line x1="8" y1="475" x2="62" y2="475" stroke="#8C8272" strokeWidth="1.3" className="opacity-[0.11]" />

          {/* Tailpiece / Ngựa đàn */}
          <rect
            x="10"
            y="595"
            width="50"
            height="16"
            rx="2"
            stroke="#8C8272"
            strokeWidth="1.4"
            className="opacity-[0.13]"
          />

          {/* 2 Silk Strings */}
          <line x1="30" y1="95" x2="28" y2="595" stroke="#8C8272" strokeWidth="1.0" className="opacity-[0.12]" />
          <line x1="40" y1="95" x2="42" y2="595" stroke="#8C8272" strokeWidth="1.0" className="opacity-[0.12]" />

          {/* Carved Headstock */}
          <path
            d="M 26 105 C 16 75, 5 50, 35 35 C 65 50, 54 75, 44 105 Z"
            stroke="#8C8272"
            strokeWidth="1.5"
            className="opacity-[0.14]"
          />

          {/* 4 Tuning Pegs */}
          <line x1="-20" y1="58" x2="90" y2="58" stroke="#8C8272" strokeWidth="1.4" className="opacity-[0.12]" />
          <circle cx="-24" cy="58" r="4.5" stroke="#8C8272" strokeWidth="1.2" className="opacity-[0.12]" />
          <circle cx="94" cy="58" r="4.5" stroke="#8C8272" strokeWidth="1.2" className="opacity-[0.12]" />

          <line x1="-15" y1="82" x2="85" y2="82" stroke="#8C8272" strokeWidth="1.4" className="opacity-[0.12]" />
          <circle cx="-19" cy="82" r="4.5" stroke="#8C8272" strokeWidth="1.2" className="opacity-[0.12]" />
          <circle cx="89" cy="82" r="4.5" stroke="#8C8272" strokeWidth="1.2" className="opacity-[0.12]" />

          {/* Diameter Dimension Callout — Kept Strictly on Left Flank */}
          <line
            x1="-110"
            y1="520"
            x2="180"
            y2="520"
            stroke="#8C8272"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            className="opacity-[0.08]"
          />
          <line x1="180" y1="512" x2="180" y2="528" stroke="#8C8272" strokeWidth="1.2" className="opacity-[0.11]" />

          {/* Archival Luthier Notes Strictly Aligned in Left Flank Whitespace */}
          <g
            fill="#8C8272"
            fontFamily="monospace"
            fontSize="8"
            letterSpacing="0.14em"
            className="opacity-[0.14]"
            fontWeight="bold"
          >
            <text x="55" y="115">L = 105 cm</text>
            <text x="75" y="670">Ø = 37.5 cm</text>
            <text x="15" y="690">CAT. 02 · ĐÀN NGUYỆT</text>
            <text x="15" y="705">GỖ TRẮC · MẶT NGÔ ĐỒNG</text>
          </g>
        </g>

        {/* =========================================================================
            RIGHT BACKGROUND WATERMARK: ELEGANT SINGLE ARCHIVAL MOTIF "02"
        ========================================================================== */}
        <g className="opacity-[0.05]" fill="#8C8272" fontFamily="serif" fontWeight="bold">
          <text x="1420" y="280" fontSize="160" letterSpacing="-0.04em">02</text>
          <text
            x="1420"
            y="310"
            fontFamily="monospace"
            fontSize="10"
            letterSpacing="0.22em"
            className="opacity-[0.8]"
          >
            HERITAGE ARCHIVE
          </text>
        </g>
      </svg>

      {/* 4. Smooth Transition Shade into Section 03 (Dark Archive Room) */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-b from-transparent via-[#261E16]/8 to-[#151310]/40 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
