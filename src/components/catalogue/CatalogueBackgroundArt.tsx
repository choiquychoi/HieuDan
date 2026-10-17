import React from "react";
import HeritageLotus from "@/components/heritage/HeritageLotus";
import HeritageDongSonBird from "@/components/heritage/HeritageDongSonBird";
import HeritageCloudScroll from "@/components/heritage/HeritageCloudScroll";
import HeritageMicroFloral from "@/components/heritage/HeritageMicroFloral";

/**
 * CatalogueBackgroundArt - Vertical Heritage Rhythm Composition (Static Architectural Mockup)
 *
 * Visual Symphony Architecture:
 * 1. HERO (y ~120 - 450px):
 *    - Top-Left: Đóa Sen Thời Lý (Lotus Mandala, Large 520px) framing the breadcrumb & filter transition.
 *    - Top-Right: Chim Lạc Đông Sơn (Soaring Dong Son Bird, Large 520px), lowered near Product Row 1,
 *                 flying towards the showroom instruments, with wingtips/tail cropped off the right viewport.
 *                 Opacity 0.48 for instant 2-second recognition.
 * 2. PRODUCT ROW 1 (y ~480 - 900px):
 *    - Quiet negative space. Breathing room allowing master instruments to hold 100% visual focus.
 * 3. PRODUCT ROW 2 (y ~950 - 1400px):
 *    - Traditional Cloud Scroll (Vân Mây Cổ) placed strictly in the right negative space margin.
 * 4. PRODUCT ROW 3 (y ~1450 - 1850px):
 *    - Micro Floral Ornament (Hoa cúc dây thời Lý) on the left margin below the filter rail.
 * 5. PRODUCT ROW 4 (y ~1900 - 2250px):
 *    - Exactly 2 ultra-fine musical lines linking the product stream to the Heritage Band.
 * 6. GRID END:
 *    - Dong Son Heritage Band (HeritageDivider) serving as architectural frieze before Bespoke Atelier.
 *
 * STRICTLY STATIC - Zero animation, zero rotation, zero layout shifts.
 */
const CatalogueBackgroundArt = React.memo(function CatalogueBackgroundArt() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Ambient warm parchment light gradients (Ivory Paper Base) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_6%,rgba(237,227,210,0.3)_0%,transparent_55%),radial-gradient(ellipse_at_85%_10%,rgba(235,221,201,0.25)_0%,transparent_50%),radial-gradient(ellipse_at_90%_48%,rgba(230,217,197,0.2)_0%,transparent_55%),radial-gradient(ellipse_at_10%_72%,rgba(232,220,202,0.2)_0%,transparent_55%),radial-gradient(ellipse_at_50%_96%,rgba(235,223,205,0.2)_0%,transparent_65%)]" />

      {/* ================= ZONE 1: HERO (TOP-LEFT LOTUS + TOP-RIGHT DONG SON BIRD) ================= */}
      {/* Top-Left: Đóa Sen Thời Lý (Static, Grounded, Cropped on Left Flank) */}
      <div className="absolute -left-28 sm:-left-36 lg:-left-32 top-24 sm:top-28 lg:top-32 z-0">
        <HeritageLotus
          size={520}
          opacity={0.10}
          className="w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] lg:w-[520px] lg:h-[520px]"
        />
      </div>

      {/* Top-Right: Chim Lạc Đông Sơn (Elevated in Hero Sky, Lowered toward Row 1, Scaled to 520px, Wing/Tail Cropped on Right Flank) */}
      <div className="absolute -right-16 sm:-right-12 lg:-right-8 xl:-right-4 top-28 sm:top-32 lg:top-36 z-0 hidden sm:block">
        <HeritageDongSonBird
          width={520}
          height={340}
          opacity={0.12}
          className="w-[380px] h-[250px] sm:w-[460px] sm:h-[300px] lg:w-[520px] lg:h-[340px]"
        />
      </div>

      {/* ================= ZONE 2: PRODUCT ROW 1 (QUIET NEGATIVE SPACE) ================= */}
      {/* y: 400px - 880px is intentionally kept completely quiet and pristine ivory paper */}

      {/* ================= ZONE 3: PRODUCT ROW 2 (TRADITIONAL CLOUD SCROLL ON RIGHT MARGIN) ================= */}
      {/* Aligned vertically with Row 2 image frame (y: 920 - 1100px), strictly above the transparent text area */}
      <div className="absolute -right-16 sm:-right-10 lg:right-[-20px] xl:right-0 2xl:right-8 top-[900px] sm:top-[930px] lg:top-[950px] z-0 hidden sm:block">
        <HeritageCloudScroll
          width={380}
          height={155}
          opacity={0.10}
          className="w-[300px] sm:w-[340px] lg:w-[380px]"
        />
      </div>

      {/* ================= ZONE 4: PRODUCT ROW 3 (MICRO FLORAL ORNAMENT ON LEFT MARGIN) ================= */}
      {/* Slender vertical Lý-Trần floral vine running along the left margin gutter (< 44px), completely clear of filter texts */}
      <div className="absolute left-1 sm:left-2 lg:left-2.5 top-[1520px] sm:top-[1560px] lg:top-[1600px] z-0 hidden sm:block">
        <HeritageMicroFloral
          width={130}
          height={38}
          opacity={0.12}
          className="-rotate-90 origin-top-left translate-y-32"
        />
      </div>

      {/* ================= ZONE 5: PRODUCT ROW 4 (TWO FINE MUSICAL LINES) ================= */}
      {/* 2 ultra-fine lines situated below Row 4 cards, gracefully linking the gallery end to the Heritage Band */}
      <div className="absolute inset-x-0 top-[2480px] sm:top-[2510px] lg:top-[2530px] z-0 flex justify-center overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 60"
          className="w-full max-w-[1440px] h-12 sm:h-14"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="musical-line-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8C6B3E" stopOpacity="0" />
              <stop offset="25%" stopColor="#8C6B3E" stopOpacity="0.26" />
              <stop offset="75%" stopColor="#554134" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#8C6B3E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="musical-line-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B49368" stopOpacity="0" />
              <stop offset="35%" stopColor="#B49368" stopOpacity="0.20" />
              <stop offset="70%" stopColor="#8C6B3E" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#B49368" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Line 1: primary resonant string */}
          <path
            d="M60,20 C420,38 880,8 1380,24"
            stroke="url(#musical-line-grad-1)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          {/* Line 2: delicate harmonic overtone string */}
          <path
            d="M100,32 C480,16 940,40 1420,18"
            stroke="url(#musical-line-grad-2)"
            strokeWidth="0.65"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
});

export default CatalogueBackgroundArt;
