import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hiệu Đàn Đức Ngân — Nhạc Cụ Dân Tộc Truyền Thống",
    short_name: "Đức Ngân",
    description:
      "Cơ sở chế tác và phân phối nhạc cụ dân tộc truyền thống Việt Nam uy tín từ 1999: Đàn Tranh, Đàn Bầu, Đàn Nguyệt/Kìm, Đàn Tỳ Bà, Đàn Nhị, Sáo Trúc.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#241711",
    icons: [
      {
        src: "/images/hero/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/hero/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
