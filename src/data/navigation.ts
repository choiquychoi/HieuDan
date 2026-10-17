import { NavItem, ShowroomInfo } from "@/types";
import { CATEGORIES } from "./categories";

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    name: "Danh mục Nhạc cụ",
    href: "/products",
    children: CATEGORIES.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      href: `/products?category=${cat.slug}`,
      subtitle: cat.subtitle,
    })),
  },
  {
    name: "Câu chuyện",
    href: "/stories",
  },
  {
    name: "Tin tức",
    href: "/news",
  },
  {
    name: "Về Đức Ngân",
    href: "/about",
  },
  {
    name: "Liên hệ",
    href: "/contact",
  },
];

export const SHOWROOM_INFO: ShowroomInfo = {
  brandName: "HIỆU ĐÀN ĐỨC NGÂN",
  tagline: "Chế tác & Phân phối Nhạc cụ Dân tộc Truyền thống từ 1999",
  hotline: "0903 990 020",
  address: "526 Điện Biên Phủ, Phường 11, Quận 10, TP. Hồ Chí Minh",
  email: "sales@hieudanducngan.com",
  workingHours: "08:00 - 20:30 (Tất cả các ngày trong tuần)",
};
