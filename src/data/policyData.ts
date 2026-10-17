export interface PolicyNavItem {
  id: string;
  label: string;
  shortTitle: string;
  icon: "truck" | "shield" | "refresh" | "card" | "lock" | "file";
}

export const POLICY_NAV_ITEMS: PolicyNavItem[] = [
  {
    id: "van-chuyen",
    label: "Vận Chuyển & Giao Nhận",
    shortTitle: "Vận chuyển & Giao nhận",
    icon: "truck",
  },
  {
    id: "bao-hanh",
    label: "Bảo Hành & Bảo Dưỡng",
    shortTitle: "Bảo hành & Bảo dưỡng",
    icon: "shield",
  },
  {
    id: "doi-tra",
    label: "Chính Sách Đổi Trả",
    shortTitle: "Chính sách đổi trả",
    icon: "refresh",
  },
  {
    id: "thanh-toan",
    label: "Đặt Hàng & Thanh Toán",
    shortTitle: "Đặt hàng & Thanh toán",
    icon: "card",
  },
  {
    id: "bao-mat",
    label: "Bảo Mật Thông Tin",
    shortTitle: "Bảo mật thông tin",
    icon: "lock",
  },
  {
    id: "dieu-khoan",
    label: "Điều Khoản Hoạt Động",
    shortTitle: "Điều khoản hoạt động",
    icon: "file",
  },
];

// Backwards compatibility alias for components importing POLICY_TOC_ITEMS
export const POLICY_TOC_ITEMS = POLICY_NAV_ITEMS;

export const WORKSHOP_CONTACT = {
  hotline: "0903 990 020",
  hotlineDisplay: "0903 990 020",
  zaloUrl: "https://zalo.me/0903990020",
  zaloLabel: "Zalo Nghệ Nhân Xưởng",
  address: "526 Điện Biên Phủ, Phường 11, Quận 10, TP. Hồ Chí Minh",
  workingHours: "08:00 – 20:30 (Tất cả các ngày trong tuần)",
};
