import Image from "next/image";
import Link from "next/link";

export default function PolicyHero() {
  return (
    <section className="relative h-[46vh] min-h-[380px] max-h-[500px] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 mb-8 sm:mb-12">
      {/* Background Image with Ken Burns subtle scale and cinematic dark gradient overlays */}
      <div className="absolute inset-0 group select-none pointer-events-none">
        <Image
          src="/images/stories/ch3-strings.jpg"
          alt="Không gian chế tác và căn chỉnh nhạc cụ Hiệu Đàn Đức Ngân"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-transform duration-[10s] ease-out scale-105 group-hover:scale-100"
        />
        {/* Layer 1: Horizontal gradient for left-side text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/35" />
        {/* Layer 2: Vertical gradient for top navbar contrast and bottom grounding */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45" />
        {/* Layer 3: Micro atmospheric blur */}
        <div className="absolute inset-0 backdrop-blur-[0.5px]" />
      </div>

      {/* Foreground Hero Content (Cinematic Layout inspired by Vinh 4 Mua) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col py-8 sm:py-10 text-left items-start">
        {/* Frosted Glass Breadcrumb Capsule */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-5">
          <ol className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-wide bg-black/40 backdrop-blur-md rounded-full px-4 sm:px-5 py-1.5 sm:py-2 border border-white/20 shadow-xl text-white/75">
            <li>
              <Link
                href="/"
                className="text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/40">
              /
            </li>
            <li className="whitespace-nowrap font-medium text-[#E6C687] truncate max-w-[260px] sm:max-w-none">
              Trung tâm hỗ trợ &amp; Chính sách
            </li>
          </ol>
        </nav>

        {/* Big Serif Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-white font-bold tracking-tight leading-[1.15] mb-3 sm:mb-4 drop-shadow-md">
          Trung Tâm Hỗ Trợ &amp; Chính Sách
        </h1>

        {/* Refined Subtitle */}
        <p className="text-white/80 text-sm sm:text-base md:text-lg font-light max-w-3xl leading-relaxed drop-shadow-xs">
          Quy định bảo hành kết cấu gỗ 24 tháng, hỗ trợ căn chỉnh âm sắc trọn đời, tiêu chuẩn đồng kiểm COD và chính sách đổi trả minh bạch từ năm 1999.
        </p>

        {/* Gold Accent Divider Line */}
        <div className="mt-5 sm:mt-6 flex justify-start">
          <div className="w-20 sm:w-24 h-[2px] bg-[#C5A880] rounded-full shadow-xs" />
        </div>
      </div>
    </section>
  );
}
