export interface StoryChapter {
  id: string;
  numeral: string;
  title: string;
  period: string;
  summary: string;
  quote: string;
  image: string;
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "chuyen-cua-go",
    numeral: "I",
    title: "Chuyện Của Gỗ Quý & Ngô Đồng",
    period: "Khởi thủy từ 1999",
    summary:
      "Tại xưởng Đức Ngân, mỗi phách gỗ Cẩm Lai, Mun Hoa và Gõ Đỏ được phơi sấy tự nhiên từ 3 đến 5 năm để đạt độ ẩm cân bằng âm học hoàn hảo. Mặt đàn bằng gỗ Ngô Đồng già xốp nhẹ giúp sóng âm thoát đi nhanh và trong trẻo.",
    quote:
      "Người thợ phải đợi gỗ nguội đi cái gắt gao của nắng gió thì tiếng đàn cất lên mới đầm, ấm và sâu.",
    image: "/images/stories/ch1-timber.jpg",
  },
  {
    id: "ban-tay-tho-ca",
    numeral: "II",
    title: "Dấu Ấn Bàn Tay Thợ & Chạm Khảm",
    period: "Thủ công 25+ năm",
    summary:
      "Từng vòm cong của thùng đàn được uốn bằng hơi nước và cảm nhận trực tiếp từ đôi bàn tay người thợ cả. Tích cổ Rồng Phụng, Hoa Lan được cẩn xà cừ ngũ sắc tỉ mỉ, tôn vinh nét trang nhã truyền thống.",
    quote:
      "Chỉ có đôi bàn tay chai sần của người thợ mới cảm nhận trọn vẹn độ đàn hồi của từng thớ mộc.",
    image: "/images/stories/ch2-carving.jpg",
  },
  {
    id: "doc-huyen-vuot-song",
    numeral: "III",
    title: "Đàn Bầu Đức Ngân: Hồn Âm Vượt Sóng",
    period: "Cải tiến độc bản",
    summary:
      "Thân đàn Bầu được thiết kế gấp gọn tiện lợi cùng hệ thống khuếch đại mộc, giúp nghệ sĩ dễ dàng mang theo trong các chuyến lưu diễn năm châu. Một dây đàn tre nứa vẫn ngân trọn nỗi nhớ quê hương xứ sở.",
    quote:
      "Chỉ cần một tiếng đàn Bầu ngân lên, người Việt ở đâu cũng nhận ra cội nguồn xứ sở.",
    image: "/images/stories/ch3-strings.jpg",
  },
  {
    id: "diem-hen-showroom",
    numeral: "IV",
    title: "Điểm Hẹn 526 Điện Biên Phủ",
    period: "1999 — Đến nay",
    summary:
      "Mỗi cây đàn trước khi xuất xưởng đều được người thợ cả trực tiếp so dây, thử ngón trong phòng mộc tĩnh. Showroom Đức Ngân luôn sẵn chén trà ấm để cùng bạn đàm đạo và tìm ra thanh âm thuộc về riêng mình.",
    quote:
      "Cây đàn làm ra mới chỉ là một nửa, nửa còn lại là người biết trân quý và đánh thức nó.",
    image: "/images/trust/trust-01-experience.jpg",
  },
];
