import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { SHOWROOM_INFO, NAVIGATION_ITEMS } from "@/data/navigation";

export default function Footer() {
  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Hi%E1%BB%87u+%C4%90%C3%A0n+%C4%90%E1%BB%A9c+Ng%C3%A2n+526+%C4%90i%E1%BB%87n+Bi%C3%AAn+Ph%E1%BB%A7";

  return (
    <footer className="w-full bg-[#241711] text-[#F2EEE6] border-t border-[#B49368]/30">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Col 1: Brand & Heritage (4 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex flex-col items-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C398] rounded-[2px]">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-[0.16em] text-[#F2EEE6]">
                ĐỨC NGÂN
              </span>
              <span className="font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.22em] text-[#E5C398] mt-1">
                Nhạc cụ truyền thống Việt Nam
              </span>
            </Link>

            <p className="mt-4 font-sans text-sm sm:text-[14.5px] leading-relaxed text-[#E9E0D2] max-w-sm">
              Không gian gìn giữ và chế tác các dòng nhạc cụ cổ truyền Việt Nam từ năm 1999. Tôn vinh hồn cốt dân tộc qua từng cung bậc thanh âm và thớ gỗ mộc.
            </p>

            <div className="mt-6 font-sans text-xs sm:text-[13px] text-[#D8CDBD]">
              <span>© {new Date().getFullYear()} Hiệu Đàn Đức Ngân. All rights reserved.</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#E5C398]">
              Điều hướng
            </h3>
            <ul className="mt-4 flex flex-col gap-3 font-sans text-sm sm:text-[14.5px] text-[#F2EEE6]">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#E5C398] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C398] rounded-[2px]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#E5C398]">
              Dòng nhạc cụ
            </h3>
            <ul className="mt-4 flex flex-col gap-3 font-sans text-sm sm:text-[14.5px] text-[#F2EEE6]">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#E5C398] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C398] rounded-[2px]"
                  >
                    <span className="group-hover:text-[#E5C398]">{cat.name}</span>
                    <span className="text-xs text-[#C5A880] group-hover:text-[#E5C398] font-normal transition-colors">({cat.subtitle})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Showroom & Direct Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#E5C398]">
              Liên hệ Showroom
            </h3>
            <div className="mt-4 flex flex-col gap-3.5 font-sans text-sm sm:text-[14.5px] text-[#F2EEE6]">
              <a
                href={`tel:${SHOWROOM_INFO.hotline.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2.5 font-bold text-[#E5C398] text-base transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C398] rounded-[2px]"
              >
                <Phone size={15} className="text-[#C5A880]" aria-hidden="true" />
                <span>Hotline: {SHOWROOM_INFO.hotline}</span>
              </a>

              <a
                href={`mailto:${SHOWROOM_INFO.email}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-[#E5C398] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C398] rounded-[2px]"
              >
                <Mail size={15} className="text-[#C5A880]" aria-hidden="true" />
                <span>{SHOWROOM_INFO.email}</span>
              </a>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SHOWROOM_INFO.address} (mở bản đồ trong tab mới)`}
                className="group inline-flex items-start gap-2.5 transition-colors hover:text-[#E5C398] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C398] rounded-[2px]"
              >
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#C5A880]" aria-hidden="true" />
                <span>
                  {SHOWROOM_INFO.address}{" "}
                  <ArrowUpRight size={13} className="inline text-[#C5A880] group-hover:text-[#E5C398]" aria-hidden="true" />
                </span>
              </a>

              <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-[#D8CDBD]">
                <Clock size={15} className="shrink-0 text-[#C5A880]" aria-hidden="true" />
                <span>{SHOWROOM_INFO.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[#B49368]/25 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-[#D8CDBD]">
          <p className="font-display italic text-[#E9E0D2]">
            &ldquo;Đức Ngân — Gìn giữ và nâng tầm thanh âm Việt từ năm 1999.&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <Link href="/chinh-sach" className="hover:text-[#E5C398] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C398] rounded-[2px]">Chính sách bảo mật</Link>
            <span aria-hidden="true">•</span>
            <Link href="/chinh-sach#dieu-khoan" className="hover:text-[#E5C398] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5C398] rounded-[2px]">Điều khoản dịch vụ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
