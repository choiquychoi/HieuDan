"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <main id="main" className="pt-0 min-h-screen bg-[#FAF8F5] text-[#241711] flex flex-col justify-center selection:bg-[#B49368]/20 selection:text-[#241711]">
      <div className="flex min-h-[75vh] items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.28em] text-[#A65D55]">
            <AlertCircle size={13} className="text-[#A65D55]" />
            <span>Đã xảy ra sự cố</span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 font-display text-4xl sm:text-5xl text-[#140C08] font-medium tracking-tight">
            Thanh âm bị gián đoạn.
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm text-[#241711]/65 max-w-sm mx-auto leading-relaxed">
            Hệ thống gặp sự cố tải trang ngoài ý muốn. Bạn có thể thử tải lại hoặc quay về trang chủ.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-[2px] bg-[#3A2920] px-7 py-3 text-sm font-medium text-white transition-all hover:bg-[#140C08] active:scale-[0.99] shadow-xs cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Thử lại</span>
            </button>

            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-[2px] border border-[#3A2920]/30 bg-transparent px-6 py-3 text-sm font-medium text-[#241711] transition-all hover:bg-[#3A2920] hover:text-white cursor-pointer"
            >
              Về trang chủ
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
