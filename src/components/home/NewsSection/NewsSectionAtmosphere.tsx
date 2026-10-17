import React from "react";

/**
 * NewsSectionAtmosphere — Dark Archival Music Library Atmosphere
 *
 * Concept:
 * "A dark museum archive room where ivory technical drawings of Vietnamese instruments
 * emerge subtly from the dark ebony/walnut walls, while three bright research documents
 * sit in the foreground."
 *
 * Visual System:
 * - Deep warm near-black background (#1D1814 -> #151310 -> #0F0E0C)
 * - Micro tactile museum wall grain (opacity 0.035)
 * - LEFT: Large Đàn Tỳ Bà technical blueprint (warm ivory #D8D0C1, opacity 0.10 - 0.14)
 * - RIGHT: Large Đàn Tranh arched soundboard & movable bridges (warm ivory #D8D0C1, opacity 0.10 - 0.14)
 * - BOTTOM: Scientific acoustic resonance / string vibration propagation curves (opacity 0.04 - 0.06)
 * - CENTER: Clean and open to maintain 100% foreground card legibility
 */
export default function NewsSectionAtmosphere() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Base Deep Warm Near-Black Museum Gallery Wall */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 75% at 50% 25%, #1D1814 0%, #151310 55%, #0F0E0C 100%)",
        }}
      />

      {/* 2. Micro Tactile Gallery Wall Grain Texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.032] mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="museum-wall-grain-news">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#museum-wall-grain-news)" />
      </svg>

      {/* 3. Large-Scale Ivory Archival Blueprint System (1600x800 Canvas) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* =========================================================================
            LEFT ARTWORK: LARGE-SCALE ĐÀN TỲ BÀ TECHNICAL BLUEPRINT (Cropped left ~35%)
            Dimensions: Height ~620px, Center X ~130px.
        ========================================================================== */}
        <g id="dan-ty-ba-blueprint" className="transition-opacity duration-700">
          {/* Main Body Pear-Shaped Contour (Thân Đàn Hình Quả Lê) */}
          <path
            d="M 140 710 C 40 680, -20 540, 30 420 C 70 330, 115 250, 125 150 L 155 150 C 165 250, 210 330, 250 420 C 300 540, 240 680, 140 710 Z"
            stroke="#D8D0C1"
            strokeWidth="1.6"
            className="opacity-[0.14]"
          />

          {/* Inner Resonant Rim Line (Mép vòm mộc kép) */}
          <path
            d="M 140 696 C 48 668, -10 536, 38 424 C 76 338, 120 260, 129 162 L 151 162 C 160 260, 204 338, 242 424 C 290 536, 232 668, 140 696 Z"
            stroke="#D8D0C1"
            strokeWidth="0.9"
            strokeDasharray="6 3"
            className="opacity-[0.08]"
          />

          {/* Headstock (Đầu đàn chạm khắc uốn lượn cổ truyền) */}
          <path
            d="M 125 150 C 115 115, 105 85, 135 65 C 155 52, 168 68, 158 88 L 155 150"
            stroke="#D8D0C1"
            strokeWidth="1.4"
            className="opacity-[0.13]"
          />

          {/* 4 Pegs / Trục lên dây (2 bên trái, 2 bên phải) */}
          <line x1="80" y1="92" x2="195" y2="92" stroke="#D8D0C1" strokeWidth="1.3" className="opacity-[0.11]" />
          <circle cx="78" cy="92" r="4.5" stroke="#D8D0C1" strokeWidth="1.1" className="opacity-[0.11]" />
          <line x1="85" y1="120" x2="200" y2="120" stroke="#D8D0C1" strokeWidth="1.3" className="opacity-[0.11]" />
          <circle cx="83" cy="120" r="4.5" stroke="#D8D0C1" strokeWidth="1.1" className="opacity-[0.11]" />

          {/* Traditional Crescent Frets (Phím nguyệt trên cần đàn) */}
          <path d="M 128 175 C 135 170, 145 170, 152 175" stroke="#D8D0C1" strokeWidth="1.4" className="opacity-[0.12]" />
          <path d="M 127 205 C 135 199, 145 199, 153 205" stroke="#D8D0C1" strokeWidth="1.4" className="opacity-[0.12]" />
          <path d="M 126 238 C 135 231, 145 231, 154 238" stroke="#D8D0C1" strokeWidth="1.4" className="opacity-[0.12]" />
          <path d="M 124 274 C 135 266, 145 266, 156 274" stroke="#D8D0C1" strokeWidth="1.4" className="opacity-[0.12]" />

          {/* Body Frets on Soundboard (Phím trên mặt đàn) */}
          <line x1="110" y1="315" x2="170" y2="315" stroke="#D8D0C1" strokeWidth="1.3" className="opacity-[0.10]" />
          <line x1="102" y1="360" x2="178" y2="360" stroke="#D8D0C1" strokeWidth="1.3" className="opacity-[0.10]" />
          <line x1="95" y1="410" x2="185" y2="410" stroke="#D8D0C1" strokeWidth="1.3" className="opacity-[0.10]" />
          <line x1="90" y1="465" x2="190" y2="465" stroke="#D8D0C1" strokeWidth="1.3" className="opacity-[0.10]" />
          <line x1="88" y1="525" x2="192" y2="525" stroke="#D8D0C1" strokeWidth="1.3" className="opacity-[0.10]" />

          {/* Tailpiece / Ngựa đàn (Đáy mặt đàn) */}
          <rect x="110" y="615" width="60" height="24" rx="3" stroke="#D8D0C1" strokeWidth="1.4" className="opacity-[0.13]" />
          <line x1="120" y1="627" x2="160" y2="627" stroke="#D8D0C1" strokeWidth="1.0" className="opacity-[0.10]" />

          {/* 4 Silk Strings (Tứ huyền tơ tằm) */}
          <line x1="134" y1="92" x2="125" y2="615" stroke="#D8D0C1" strokeWidth="0.8" className="opacity-[0.10]" />
          <line x1="138" y1="92" x2="135" y2="615" stroke="#D8D0C1" strokeWidth="0.8" className="opacity-[0.10]" />
          <line x1="142" y1="120" x2="145" y2="615" stroke="#D8D0C1" strokeWidth="0.8" className="opacity-[0.10]" />
          <line x1="146" y1="120" x2="155" y2="615" stroke="#D8D0C1" strokeWidth="0.8" className="opacity-[0.10]" />

          {/* Technical Centerline Axis */}
          <line x1="140" y1="40" x2="140" y2="745" stroke="#D8D0C1" strokeWidth="0.9" strokeDasharray="5 5" className="opacity-[0.08]" />

          {/* Horizontal Dimension Indicator (Bề ngang bầu đàn) */}
          <line x1="20" y1="535" x2="260" y2="535" stroke="#D8D0C1" strokeWidth="0.9" strokeDasharray="3 3" className="opacity-[0.07]" />
          <line x1="20" y1="527" x2="20" y2="543" stroke="#D8D0C1" strokeWidth="1.2" className="opacity-[0.10]" />
          <line x1="260" y1="527" x2="260" y2="543" stroke="#D8D0C1" strokeWidth="1.2" className="opacity-[0.10]" />

          {/* Technical Authentic Annotations */}
          <g fill="#D8D0C1" fontFamily="monospace" fontSize="8.5" letterSpacing="0.14em" className="opacity-[0.12]" fontWeight="bold">
            <text x="275" y="425">01 — THÂN ĐÀN GỖ CẨM LAI</text>
            <text x="275" y="445">02 — MẶT ĐÀN GỖ NGÔ ĐỒNG</text>
            <text x="275" y="465">03 — TỨ HUYỀN TƠ TẰM</text>
            <text x="275" y="485">04 — 16 PHÍM NGUYỆT</text>
            <text x="100" y="555">────── 32.5 cm ──────</text>
            <text x="100" y="735">────── 92.0 cm ──────</text>
          </g>
        </g>

        {/* =========================================================================
            RIGHT ARTWORK: LARGE-SCALE ĐÀN TRANH TECHNICAL BLUEPRINT (Cropped right ~35%)
            Dimensions: Parabolic Soundboard Arc & 16 Movable Bridges (Nhạn Đàn)
        ========================================================================== */}
        <g id="dan-tranh-blueprint" className="transition-opacity duration-700">
          {/* Parabolic Arched Soundboard Top Curve (Vòm cong mặt đàn Tranh) */}
          <path
            d="M 1080 520 C 1220 350, 1440 330, 1680 440"
            stroke="#D8D0C1"
            strokeWidth="1.8"
            className="opacity-[0.14]"
          />

          {/* Soundboard Base Rim (Thành đàn hộp cộng hưởng) */}
          <path
            d="M 1080 548 C 1220 378, 1440 358, 1680 468"
            stroke="#D8D0C1"
            strokeWidth="1.1"
            strokeDasharray="6 3"
            className="opacity-[0.08]"
          />

          {/* Vertical Thickness / Endplate Line */}
          <line x1="1080" y1="520" x2="1080" y2="548" stroke="#D8D0C1" strokeWidth="1.5" className="opacity-[0.13]" />

          {/* Arch Trajectory Guide (Quỹ đạo cánh cung của hàng nhạn) */}
          <path
            d="M 1120 485 C 1250 360, 1420 350, 1600 420"
            stroke="#D8D0C1"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            className="opacity-[0.07]"
          />

          {/* Movable Bridges (Nhạn Đàn Tranh) fanning across the curve */}
          {[
            { x: 1140, y: 470, h: 28 },
            { x: 1205, y: 430, h: 30 },
            { x: 1280, y: 400, h: 31 },
            { x: 1365, y: 382, h: 32 },
            { x: 1455, y: 378, h: 32 },
            { x: 1545, y: 390, h: 30 },
          ].map((bridge, idx) => (
            <g key={`bridge-${idx}`}>
              {/* Triangular Movable Bridge (Nhạn gỗ trắc) */}
              <path
                d={`M ${bridge.x} ${bridge.y} L ${bridge.x - 9} ${bridge.y + bridge.h} L ${bridge.x + 9} ${bridge.y + bridge.h} Z`}
                stroke="#D8D0C1"
                strokeWidth="1.3"
                className="opacity-[0.13]"
              />
              <circle cx={bridge.x} cy={bridge.y} r="2" fill="#D8D0C1" className="opacity-[0.12]" />
              {/* Converging String Passing Through Bridge Tip */}
              <line
                x1={bridge.x - 65}
                y1={bridge.y + 16}
                x2={bridge.x + 75}
                y2={bridge.y - 12}
                stroke="#D8D0C1"
                strokeWidth="0.75"
                className="opacity-[0.09]"
              />
            </g>
          ))}

          {/* Headplate Inlay Motif (Đầu đàn khảm xà cừ / triện luthier) */}
          <g transform="translate(1088, 515)">
            <circle cx="0" cy="0" r="7" stroke="#D8D0C1" strokeWidth="1.1" className="opacity-[0.11]" />
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#D8D0C1" strokeWidth="0.8" className="opacity-[0.09]" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#D8D0C1" strokeWidth="0.8" className="opacity-[0.09]" />
          </g>

          {/* Soundboard Curvature Callout */}
          <g fill="#D8D0C1" fontFamily="monospace" fontSize="8.5" letterSpacing="0.14em" className="opacity-[0.12]" fontWeight="bold">
            <text x="1100" y="580">01 — MẶT ĐÀN CONG NGUYÊN TẤM GỖ NGÔ ĐỒNG</text>
            <text x="1100" y="600">02 — HÀNG NHẠN ĐIỀU ÂM GỖ TRẮC (16 DÂY)</text>
            <text x="1100" y="620">03 — THÀNH ĐÀN KHẢM TÍCH XƯỞNG 1999</text>
            <text x="1260" y="340">────── L = 105.0 cm ──────</text>
          </g>
        </g>

        {/* =========================================================================
            BOTTOM SCIENTIFIC ACOUSTIC RESONANCE / SOUND PROPAGATION CURVES
        ========================================================================== */}
        <g stroke="#D8D0C1" strokeWidth="0.8" className="opacity-[0.05]" fill="none">
          <path d="M 0 740 C 400 700, 800 780, 1200 710 C 1400 680, 1550 730, 1600 740" />
          <path d="M 0 760 C 350 720, 750 800, 1150 730 C 1350 700, 1500 750, 1600 760" strokeDasharray="6 4" />
          <path d="M 0 780 C 300 740, 700 815, 1100 750 C 1300 720, 1480 770, 1600 780" />
        </g>
      </svg>
    </div>
  );
}
