import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { SHOWROOM_INFO } from "@/data/navigation";
import CornerOrnament from "@/components/ui/CornerOrnament";

export interface DbSiteSettings {
  address?: string;
  working_hours?: string;
  hotline?: string;
  google_maps_url?: string;
  google_maps_embed?: string;
}

export default function Showroom({ settings }: { settings?: DbSiteSettings | null } = {}) {
  const address = settings?.address || SHOWROOM_INFO.address;
  const workingHours = settings?.working_hours || SHOWROOM_INFO.workingHours;
  const hotline = settings?.hotline || SHOWROOM_INFO.hotline;

  // Official Google Maps place link for Hiệu Đàn Đức Ngân
  const googleMapsDirectionsUrl =
    settings?.google_maps_url ||
    "https://www.google.com/maps/search/?api=1&query=Hi%E1%BB%87u+%C4%90%C3%A0n+%C4%90%E1%BB%A9c+Ng%C3%A2n+526+%C4%90i%E1%BB%87n+Bi%C3%AAn+Ph%E1%BB%A7";

  // Official embed URL provided directly for Hiệu Đàn Đức Ngân
  const officialMapsEmbedUrl =
    settings?.google_maps_embed ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8776465468188!2d106.67754796958994!3d10.772151316808397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f20ee3d384d%3A0xffc91ea52bb33dd2!2zSGnhu4d1IMSQw6BuIMSQ4bupYyBOZ8Oibg!5e0!3m2!1svi!2s!4v1787124408332!5m2!1svi!2s";

  return (
    <section
      id="showroom"
      className="relative w-full overflow-hidden bg-walnut-texture py-16 sm:py-20 lg:py-24 border-t border-[#B49368]/35 text-[#F2EEE6]"
    >
      {/* Subtle Acoustic Corner Accents */}
      <CornerOrnament position="top-left" variant="strings" theme="walnut" />
      <CornerOrnament position="bottom-right" variant="pearl-inlay" theme="walnut" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Balanced 50/50 Desktop Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Information & Actions (50%) */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Bronze Eyebrow */}
              <span className="eyebrow-label text-[#C5A880]">
                KHÔNG GIAN TRƯNG BÀY
              </span>

              {/* Section Headline */}
              <h2 className="mt-2.5 section-headline text-[#F2EEE6]">
                Ghé Thăm Đức Ngân
              </h2>

              {/* Concise 1-Sentence Invitation Copy */}
              <p className="mt-3.5 body-copy text-[#D8CDBD]/90">
                Kính mời quý khách ghé thăm không gian trưng bày để trực tiếp thử âm sắc, kiểm tra thớ gỗ và nhận tư vấn chuyên sâu từ nghệ nhân.
              </p>

              {/* Clean Icon-Led Info Rows with Thin Dividers */}
              <div className="mt-7 space-y-3.5 border-t border-[#B49368]/30 pt-5">
                {/* Row 1: Address */}
                <div className="flex items-start gap-3.5 border-b border-[#B49368]/25 pb-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] bg-[#5C2B13]/90 border border-[#B49368]/40 text-[#C5A880]">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <span className="eyebrow-label text-xs sm:text-[13px] text-[#C5A880]">
                      Địa chỉ showroom
                    </span>
                    <p className="mt-0.5 body-copy text-[#F2EEE6]">
                      {address}
                    </p>
                  </div>
                </div>

                {/* Row 2: Business Hours */}
                <div className="flex items-start gap-3.5 border-b border-[#B49368]/25 pb-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] bg-[#5C2B13]/90 border border-[#B49368]/40 text-[#C5A880]">
                    <Clock size={15} />
                  </div>
                  <div>
                    <span className="eyebrow-label text-xs sm:text-[13px] text-[#C5A880]">
                      Giờ đón khách
                    </span>
                    <p className="mt-0.5 body-copy text-[#F2EEE6]">
                      {workingHours}
                    </p>
                  </div>
                </div>

                {/* Row 3: Hotline */}
                <div className="flex items-start gap-3.5 border-b border-[#B49368]/25 pb-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] bg-[#5C2B13]/90 border border-[#B49368]/40 text-[#C5A880]">
                    <Phone size={15} />
                  </div>
                  <div>
                    <span className="eyebrow-label text-xs sm:text-[13px] text-[#C5A880]">
                      Hotline nghệ nhân
                    </span>
                    <p className="mt-0.5 font-sans text-base sm:text-lg font-bold text-[#E5C398]">
                      {hotline}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exactly Two Action Buttons */}
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Primary CTA: Google Maps Directions */}
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-[2px] bg-[#B49368] px-5 cta-label text-[#241711] transition-all duration-200 hover:bg-[#C5A880]"
              >
                <Navigation size={13} />
                <span>Chỉ đường Google Maps</span>
              </a>

              {/* Secondary CTA: Direct Phone Call */}
              <a
                href={`tel:${hotline.replace(/\s/g, "")}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[2px] border border-[#B49368]/50 bg-[#3A1D0E]/80 px-5 cta-label text-[#F2EEE6] transition-all duration-200 hover:border-[#B49368] hover:bg-[#B49368] hover:text-[#180F0B]"
              >
                <Phone size={13} className="text-[#C5A880]" />
                <span>Gọi {hotline}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Balanced Google Maps Embed (50%) */}
          <div className="flex flex-col">
            <div
              data-lenis-prevent
              className="relative h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[420px] w-full overflow-hidden rounded-[3px] border border-[#B49368]/40 bg-[#3A1D0E]/80 shadow-2xl"
            >
              <iframe
                title="Vị trí chính xác Hiệu Đàn Đức Ngân trên Google Maps"
                src={officialMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />

              {/* Showroom Location Badge (Top-Left) */}
              <div className="absolute left-3 top-3 z-10 hidden sm:flex items-center gap-2 rounded-[2px] border border-[#B49368]/40 bg-[#3A1D0E]/95 px-3 py-1.5 backdrop-blur-xs shadow-md">
                <span className="h-2 w-2 rounded-full bg-[#B49368] animate-pulse" />
                <span className="eyebrow-label text-xs text-[#F2EEE6]">
                  Hiệu Đàn Đức Ngân · 526 Điện Biên Phủ, Q.10
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
