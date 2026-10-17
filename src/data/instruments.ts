import { Instrument } from "@/types";

export const INSTRUMENTS: Instrument[] = [
  // 01 / 06 — ĐÀN BẦU
  {
    id: "dan-bau",
    slug: "dan-bau",
    name: "Đàn Bầu",
    alternateName: "Độc huyền cầm",
    shortDescription:
      "Nhạc cụ một dây độc đáo của người Việt, tạo cao độ bằng ngón uốn cần vòi và kỹ thuật gảy bồi âm.",
    soundDescription:
      "Trong trẻo, sâu lắng, luyến láy như tiếng ru và tiếng lòng người Việt.",
    origin: "Dân ca, Hát Xẩm, Chèo, hòa tấu truyền thống & đương đại",
    strings: "1 dây (dây thép / tơ tằm)",
    material: "Gỗ Cẩm Lai, Mun Hoa, mặt Ngô Đồng, cần vòi sừng",
    characteristic: "Gảy bồi âm kết hợp uốn cần vòi linh hoạt để biến hóa cao độ",
    image: "/images/hero/dan-bau.png",
    audio: {
      src: "/audio/dan_ty_ba.mp3", // TODO: Thay bằng audio Đàn Bầu thực tế sau
      title: "Âm sắc Đàn Bầu — Giai điệu mộc thử nghiệm (Demo xưởng)",
      duration: "0:45",
    },
    heroPresentation: {
      cutoutScale: 1.05,
      offsetY: "0px",
      shadowBottom: "22%",
      shadowX: "50%",
      shadowWidth: "78%",
      shadowHeight: "14px",
      shadowRotation: "0deg",
    },
    categorySlug: "dan-bau",
  },

  // 02 / 06 — ĐÀN TRANH
  {
    id: "dan-tranh",
    slug: "dan-tranh",
    name: "Đàn Tranh",
    alternateName: "Thập lục huyền cầm",
    shortDescription:
      "Nhạc cụ dây gảy thanh tao với hàng nhạn di động, tạo nên những giai điệu bay bổng réo rắt.",
    soundDescription:
      "Trong trẻo như nước chảy mây trôi, ngân nga phong phú với ngón vê móng và rung nhạn.",
    origin: "Nhã nhạc cung đình Huế, Đờn ca tài tử, thính phòng cổ truyền",
    strings: "16 – 19 dây kim loại",
    material: "Khung gỗ Mun, Cẩm Lai cẩn xà cừ, mặt Ngô Đồng uốn cong, nhạn Trắc",
    characteristic: "Hệ thống nhạn di động căn chỉnh thang âm ngũ cung linh hoạt",
    image: "/images/hero/dan-tranh.png",
    audio: {
      src: "/audio/dan_ty_ba.mp3", // TODO: Thay bằng audio Đàn Tranh thực tế sau
      title: "Âm sắc Đàn Tranh — Thập lục huyền thanh thoảng (Demo xưởng)",
      duration: "0:45",
    },
    heroPresentation: {
      cutoutScale: 1.15,
      offsetY: "0px",
      shadowBottom: "36%",
      shadowX: "50%",
      shadowWidth: "86%",
      shadowHeight: "14px",
      shadowRotation: "-1deg",
    },
    categorySlug: "dan-tranh",
  },

  // 03 / 06 — ĐÀN TỲ BÀ
  {
    id: "dan-ty-ba",
    slug: "dan-ty-ba",
    name: "Đàn Tỳ Bà",
    alternateName: "Tứ huyền cầm",
    shortDescription:
      "Cây đàn dáng quả lê quý phái với bốn dây tơ, đòi hỏi kỹ thuật vê ngón ngọc ngà và khổ luyện công phu.",
    soundDescription:
      "Thanh tao, tròn trịa, giàu sắc thái từ trang nghiêm đài các đến dồn dập hùng tráng.",
    origin: "Nhã nhạc cung đình, hòa tấu cổ truyền, độc tấu thính phòng",
    strings: "4 dây",
    material: "Gỗ Gõ Đỏ, Cẩm Lai nguyên khối, phím tre già và ngà",
    characteristic: "Thùng đàn liền cần với hệ thống phím nhiều nấc cho ngón vê thần tốc",
    image: "/images/hero/dan-ty-ba.png",
    audio: {
      src: "/audio/dan_ty_ba.mp3",
      title: "Âm sắc Đàn Tỳ Bà — Tứ huyền giao hưởng",
      duration: "0:45",
    },
    heroPresentation: {
      cutoutScale: 1.0,
      offsetY: "0px",
      shadowBottom: "5%",
      shadowX: "50%",
      shadowWidth: "44%",
      shadowHeight: "16px",
      shadowRotation: "0deg",
    },
    categorySlug: "dan-ty-ba",
  },

  // 04 / 06 — ĐÀN KÌM / ĐÀN NGUYỆT
  {
    id: "dan-kim",
    slug: "dan-kim",
    name: "Đàn Kìm (Đàn Nguyệt)",
    alternateName: "Nguyệt cầm",
    shortDescription:
      "Cây đàn thùng tròn tựa vầng trăng rằm, giữ vai trò lĩnh xướng trong Đờn ca tài tử và Hát văn xứ Bắc.",
    soundDescription:
      "Âm sắc đanh, giòn giã, vang xa, biến hóa từ rộn rã hào sảng đến sâu lắng u hoài.",
    origin: "Đờn ca tài tử Nam Bộ, Hát văn, Chèo, Tuồng truyền thống",
    strings: "2 dây (dây tơ / nilon)",
    material: "Gỗ Cẩm Lai, Mun hoa cẩn xà cừ, mặt gỗ Ngô Đồng",
    characteristic: "Phím cao và cần dài tạo khoảng rung ngón rộng, kỹ thuật nhấn luyến độc đáo",
    image: "/images/hero/dan-kim.png",
    audio: {
      src: "/audio/dan_ty_ba.mp3", // TODO: Thay bằng audio Đàn Kìm thực tế sau
      title: "Âm sắc Đàn Kìm — Nguyệt cầm ngân vang (Demo xưởng)",
      duration: "0:45",
    },
    heroPresentation: {
      cutoutScale: 1.02,
      offsetY: "0px",
      shadowBottom: "7%",
      shadowX: "50%",
      shadowWidth: "48%",
      shadowHeight: "15px",
      shadowRotation: "0deg",
    },
    categorySlug: "dan-kim",
  },

  // 05 / 06 — ĐÀN SẾN
  {
    id: "dan-sen",
    slug: "dan-sen",
    name: "Đàn Sến",
    alternateName: "Nhạc cụ sân khấu Cải lương",
    shortDescription:
      "Cây đàn hai dây với thùng hoa lục giác đặc trưng, linh hồn của các trích đoạn Cải lương kinh điển Nam Bộ.",
    soundDescription:
      "Trong sáng, lảnh lót, sắc sảo và biến hóa linh hoạt theo từng trường đoạn ca diễn.",
    origin: "Dàn nhạc Cải lương Nam Bộ, Đờn ca tài tử dân gian",
    strings: "2 dây tơ",
    material: "Gỗ Gõ Đỏ, Cẩm Lai, cần phím tre già gia công tỉ mỉ",
    characteristic: "Phím đàn gắn cao trên cần, ngón nhấn sâu tạo rung ngân sắc nét",
    image: "/images/hero/dan-sen.png",
    audio: {
      src: "/audio/dan_ty_ba.mp3", // TODO: Thay bằng audio Đàn Sến thực tế sau
      title: "Âm sắc Đàn Sến — Giai điệu ca diễn mộc (Demo xưởng)",
      duration: "0:45",
    },
    heroPresentation: {
      cutoutScale: 1.02,
      offsetY: "0px",
      shadowBottom: "6%",
      shadowX: "50%",
      shadowWidth: "44%",
      shadowHeight: "15px",
      shadowRotation: "0deg",
    },
    categorySlug: "dan-sen",
  },

  // 06 / 06 — VIOLON / VIOLIN
  {
    id: "dan-violin",
    slug: "dan-violin",
    name: "Đàn Violon (Violin)",
    alternateName: "Vĩ cầm thủ công Mastro",
    shortDescription:
      "Dòng vĩ cầm gỗ sấy tự nhiên được nghệ nhân Đức Ngân thẩm âm thủ công, hòa quyện kỹ nghệ thính phòng và biểu cảm dân tộc.",
    soundDescription:
      "Dày dặn, vang sáng, truyền cảm với dải động tinh tế và độ nhạy phím xuất sắc.",
    origin: "Thính phòng cổ điển, độc tấu đương đại & biến tấu dân gian",
    strings: "4 dây kim loại (G - D - A - E)",
    material: "Mặt gỗ Vân Sam sấy tự nhiên, lưng & hông Phong cườm",
    characteristic: "Kéo vĩ tạo trường âm liền mạch, âm lượng lớn và truyền cảm",
    image: "/images/hero/dan-violin.png",
    audio: {
      src: "/audio/dan_ty_ba.mp3", // TODO: Thay bằng audio Violon thực tế sau
      title: "Âm sắc Violon — Vĩ cầm truyền cảm thủ công (Demo xưởng)",
      duration: "0:45",
    },
    heroPresentation: {
      cutoutScale: 1.02,
      offsetY: "0px",
      shadowBottom: "6.5%",
      shadowX: "50%",
      shadowWidth: "46%",
      shadowHeight: "15px",
      shadowRotation: "0deg",
    },
    categorySlug: "dan-violin",
  },
];
