import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="pt-0 min-h-screen bg-[#FAF8F5] text-[#241711] flex flex-col justify-center selection:bg-[#B49368]/20 selection:text-[#241711]">
      <div className="flex min-h-[75vh] items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.28em] text-[#8C6B3E]">
            <Sparkles size={12} className="text-[#B49368]" />
            <span>404 · Không tìm thấy</span>
            <Sparkles size={12} className="text-[#B49368]" />
          </div>

          {/* Heading */}
          <h1 className="mt-4 font-display text-4xl sm:text-5xl text-[#140C08] font-medium tracking-tight">
            TRANG KHÔNG TỒN TẠI
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm text-[#241711]/65 max-w-sm mx-auto leading-relaxed">
            Trang bạn đang tìm kiếm không còn ở đây, hoặc đã được chuyển sang một không gian khác trong bộ sưu tập của Đức Ngân.
          </p>

          {/* Main Action */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-[2px] bg-[#3A2920] px-7 py-3 text-sm font-medium text-white transition-all hover:bg-[#140C08] active:scale-[0.99] shadow-xs cursor-pointer"
            >
              Về trang chủ
            </Link>

            <Link
              href="/products"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-[2px] border border-[#3A2920]/30 bg-transparent px-6 py-3 text-sm font-medium text-[#241711] transition-all hover:bg-[#3A2920] hover:text-white cursor-pointer"
            >
              <span>Xem nhạc cụ</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
