import type { Metadata } from "next";
import PolicyHero from "@/components/policy/PolicyHero";
import PolicyStickySidebar from "@/components/policy/PolicyStickySidebar";
import PolicyContentStream from "@/components/policy/PolicyContentStream";
import Footer from "@/components/layout/Footer/Footer";

export const metadata: Metadata = {
  title: "Chính Sách & Quy Định Hoạt Động | Hiệu Đàn Đức Ngân",
  description:
    "Chính sách bảo mật thông tin, quy định đặt hàng, tiêu chuẩn đóng gói vận chuyển đồng kiểm COD và cam kết bảo hành chế tác 24 tháng tại Hiệu Đàn Đức Ngân.",
  openGraph: {
    title: "Chính Sách & Quy Định Hoạt Động | Hiệu Đàn Đức Ngân",
    description:
      "Cam kết bảo vệ dữ liệu khách hàng, quy chuẩn đồng kiểm COD và bảo hành nhạc cụ 24 tháng từ năm 1999.",
    url: "/chinh-sach",
    siteName: "Hiệu Đàn Đức Ngân",
    type: "website",
    locale: "vi_VN",
  },
};

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2B241F] selection:bg-[#8B5A2B]/20 selection:text-[#2B241F]">
      <main>
        {/* 1. Clean Minimalist Header (Matching Wireframe) */}
        <PolicyHero />

        {/* 2. Main Content Body with 2-Column Responsive Layout & Sticky Sidebar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Sticky Sidebar Navigation + Artisan Contact */}
            <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 self-start z-30">
              <PolicyStickySidebar />
            </aside>

            {/* Right Column: White Paper Document Stream */}
            <div className="lg:col-span-8 xl:col-span-9">
              <PolicyContentStream />
            </div>
          </div>
        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
}
