import type { NextConfig } from "next";

const CMS_URL =
  process.env.CMS_URL ||
  process.env.NEXT_PUBLIC_CMS_URL ||
  "http://localhost:3001";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 hours cache
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${CMS_URL}/uploads/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/chinh-sach#bao-mat",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/chinh-sach#dieu-khoan",
        permanent: true,
      },
      {
        source: "/chinh-sach-bao-hanh",
        destination: "/chinh-sach#dieu-khoan",
        permanent: true,
      },
      {
        source: "/van-chuyen-thanh-toan",
        destination: "/chinh-sach#dieu-khoan",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
