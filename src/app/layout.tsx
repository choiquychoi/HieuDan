import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Header from "@/components/layout/Header/Header";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import JsonLd from "@/components/seo/JsonLd";
import FloatingContactWidget from "@/components/ui/FloatingContactWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#241711",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hieudanducngan.com"),
  title: {
    default: "Hiệu Đàn Đức Ngân — Nhạc Cụ Dân Tộc Truyền Thống Việt Nam",
    template: "%s | Hiệu Đàn Đức Ngân",
  },
  description:
    "Cơ sở chế tác và phân phối nhạc cụ dân tộc truyền thống Việt Nam uy tín từ 1999: Đàn Tranh, Đàn Bầu, Đàn Nguyệt, Đàn Kìm, Đàn Tỳ Bà, Đàn Sến, Đàn Violin tại 526 Điện Biên Phủ, Quận 10, TP.HCM.",
  keywords: [
    "Hiệu Đàn Đức Ngân",
    "nhạc cụ dân tộc",
    "đàn bầu",
    "đàn tranh",
    "đàn nguyệt",
    "đàn kìm",
    "đàn tỳ bà",
    "đàn sến",
    "đàn violin",
    "chế tác nhạc cụ thủ công",
    "nhạc cụ truyền thống việt nam",
    "đàn gỗ cẩm lai",
    "đàn gỗ mun hoa",
    "526 Điện Biên Phủ Quận 10",
  ],
  authors: [{ name: "Hiệu Đàn Đức Ngân", url: "https://hieudanducngan.com" }],
  creator: "Hiệu Đàn Đức Ngân",
  publisher: "Hiệu Đàn Đức Ngân",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://hieudanducngan.com",
    siteName: "Hiệu Đàn Đức Ngân",
    title: "Hiệu Đàn Đức Ngân — Nhạc Cụ Dân Tộc Truyền Thống Việt Nam",
    description:
      "Tuyển tập các dòng nhạc cụ dân tộc Việt Nam chế tác thủ công độc bản từ gỗ quý lâu năm tại xưởng Đức Ngân từ 1999.",
    images: [
      {
        url: "/images/trust/trust-01-experience.jpg",
        width: 1200,
        height: 630,
        alt: "Showroom Hiệu Đàn Đức Ngân 526 Điện Biên Phủ, Quận 10, TP.HCM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiệu Đàn Đức Ngân — Nhạc Cụ Dân Tộc Truyền Thống Việt Nam",
    description:
      "Tuyển tập các dòng nhạc cụ dân tộc Việt Nam chế tác thủ công độc bản từ gỗ quý lâu năm tại xưởng Đức Ngân từ 1999.",
    images: ["/images/trust/trust-01-experience.jpg"],
    creator: "@hieudanducngan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        <SmoothScrollProvider>
          <CartProvider>
            {/* Header is permanently mounted outside PageTransitionProvider so it NEVER moves on page switch */}
            <Header />
            <PageTransitionProvider>{children}</PageTransitionProvider>
            <FloatingContactWidget />
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
