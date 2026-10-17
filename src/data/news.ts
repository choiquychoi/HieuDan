export type ArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "pull-quote"; quote: string; author?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; items: string[]; ordered?: boolean };

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  excerpt?: string;
  category: "Chuyện Nghề Chế Tác" | "Tin Tức Nhạc Cụ" | "Văn Hóa Âm Nhạc" | string;
  date: string;
  publishedAt?: string;
  readTime: string;
  image: string;
  coverImage?: string;
  blocks?: ArticleContentBlock[];
}

export const ARTICLES: Article[] = [
  {
    id: "art-01",
    slug: "nghe-thuat-tuyen-chon-go-am-hoc-che-tac-dan-truyen-thong",
    title: "Nghệ Thuật Tuyển Chọn Gỗ Âm Học Trong Chế Tác Nhạc Cụ Truyền Thống",
    summary:
      "Hành trình tuyển chọn những thanh gỗ Cẩm Lai, Mun Hoa và Ngô Đồng sấy mộc tự nhiên nhiều năm để đánh thức độ vang và chiều sâu âm sắc mộc mạc.",
    excerpt:
      "Hành trình tuyển chọn những thanh gỗ Cẩm Lai, Mun Hoa và Ngô Đồng sấy mộc tự nhiên nhiều năm để đánh thức độ vang và chiều sâu âm sắc mộc mạc.",
    category: "Chuyện Nghề Chế Tác",
    date: "28/05/2025",
    publishedAt: "28 Tháng 05, 2025",
    readTime: "5 phút đọc",
    image: "/images/about/go_Quy.jpg",
    coverImage: "/images/about/go_Quy.jpg",
    blocks: [
      {
        type: "paragraph",
        text: "Trong xưởng mộc của Hiệu Đàn Đức Ngân, âm thanh của một cây đàn không bắt đầu từ nhịp gảy đầu tiên, mà khởi sinh từ khoảnh khắc người thợ cả đặt tay lên thớ gỗ thô mộc. Mỗi loại gỗ mang trong mình một mật độ sợi xenluloza và độ đàn hồi riêng biệt, quyết định tần số rung động và độ ấm của từng nốt nhạc.",
      },
      {
        type: "heading",
        level: 2,
        text: "Gỗ Ngô Đồng — Linh Hồn Của Mặt Đàn Truyền Thống",
      },
      {
        type: "paragraph",
        text: "Từ bao đời nay, gỗ Ngô Đồng luôn là lựa chọn số một để làm mặt đàn cho Đàn Tranh, Đàn Bầu và Đàn Nguyệt. Đặc tính của Ngô Đồng là chất gỗ nhẹ, thớ xốp nhưng dẻo dai, có khả năng truyền dẫn sóng âm cực nhanh và không bị biến dạng khi thay đổi nhiệt độ.",
      },
      {
        type: "pull-quote",
        quote: "Mặt đàn như tấm gương phản chiếu tiếng lòng. Gỗ Ngô Đồng chuẩn âm học giúp tiếng đàn cất lên thoát tiếng, vang xa nhưng vẫn giữ trọn nét ấm áp mộc mạc.",
        author: "Nghệ nhân Hiệu Đàn Đức Ngân",
      },
      {
        type: "heading",
        level: 2,
        text: "Cẩm Lai & Mun — Hộp Cộng Hưởng Vững Chãi",
      },
      {
        type: "paragraph",
        text: "Nếu mặt đàn chịu trách nhiệm khuếch đại âm thanh thì thành và đáy đàn lại cần những loại gỗ thịt nặng, đanh chắc như Cẩm Lai, Mun Sừng hay Gõ Đỏ. Các khối gỗ này đóng vai trò như buồng phản xạ âm thanh, tạo nên trường âm sâu lắng và giữ cho phom dáng cây đàn ổn định suốt nhiều thập kỷ.",
      },
      {
        type: "image",
        src: "/images/about/bao_go_lam_dan.jpg",
        alt: "Nghệ nhân dùng bào mộc chuốt mỏng kiểm tra thớ gỗ tại xưởng Đức Ngân",
        caption: "Nghệ nhân dùng bào mộc chuốt mỏng kiểm tra độ dẻo và tính liên kết của thớ gỗ tại xưởng Đức Ngân.",
      },
      {
        type: "heading",
        level: 3,
        text: "Quy Chuẩn Sấy Mộc Tự Nhiên",
      },
      {
        type: "paragraph",
        text: "Để gỗ đạt trạng thái âm học tối ưu trước khi đưa vào gọt đẽo, toàn bộ phôi gỗ tại Đức Ngân đều trải qua quy trình bảo quản nghiêm ngặt:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Hong gió tự nhiên trong bóng râm từ 2 đến 5 năm để nhựa cây khô kiệt hoàn toàn.",
          "Cân bằng độ ẩm gỗ ở mức 10–12% nhằm ngăn ngừa hiện tượng cong vênh và nứt nẻ.",
          "Gõ thẩm âm từng thanh gỗ để loại bỏ những phôi có khuyết tật ngầm bên trong cấu trúc thớ.",
        ],
      },
      {
        type: "paragraph",
        text: "Chính sự kiên nhẫn và trân trọng quy luật tự nhiên đã giúp những cây đàn của Đức Ngân lưu giữ được chất âm mộc nguyên bản theo năm tháng.",
      },
    ],
  },
  {
    id: "art-02",
    slug: "dan-tranh-viet-nam-thap-luc-huyen-cam-va-nghe-thuat-nhan-vuot",
    title: "Đàn Tranh Việt Nam — Thập Lục Huyền Cầm & Nghệ Thuật Nhấn Vuốt Âm Sắc",
    summary:
      "Khám phá cấu tạo mặt đàn gỗ Ngô Đồng uốn cong, vị trí 16–19 phím nhạn Trắc và kỹ thuật rung ngón tạo nên dòng suối thanh âm réo rắt của Đàn Tranh.",
    excerpt:
      "Khám phá cấu tạo mặt đàn gỗ Ngô Đồng uốn cong, vị trí 16–19 phím nhạn Trắc và kỹ thuật rung ngón tạo nên dòng suối thanh âm réo rắt của Đàn Tranh.",
    category: "Tin Tức Nhạc Cụ",
    date: "24/05/2025",
    publishedAt: "24 Tháng 05, 2025",
    readTime: "6 phút đọc",
    image: "/images/about/mother_of_pearl_inlay_luthier_wood.jpg",
    coverImage: "/images/about/mother_of_pearl_inlay_luthier_wood.jpg",
    blocks: [
      {
        type: "paragraph",
        text: "Đàn Tranh — cây đàn thập lục huyền cầm mang dáng dấp uốn lượn như cánh nhạn mùa xuân, là một trong những nhạc cụ biểu tượng của nền âm nhạc cổ truyền Việt Nam. Từ cung đình Huế thanh tao đến các ban Đờn Ca Tài Tử Nam Bộ hào sảng, tiếng đàn tranh luôn cất lên dòng suối thanh âm trong trẻo, réo rắt.",
      },
      {
        type: "heading",
        level: 2,
        text: "Cấu Tạo Khung Hộp & Độ Cong Mặt Đàn",
      },
      {
        type: "paragraph",
        text: "Mặt Đàn Tranh có hình vòm cung uốn mềm mại, làm từ gỗ Ngô Đồng nguyên tấm không ghép nối. Độ cong của mặt đàn được tính toán chính xác để phân bổ lực căng của 16, 17 hoặc 19 dây thép, giúp âm thanh phát ra không bị vỡ tiếng khi gảy mạnh.",
      },
      {
        type: "pull-quote",
        quote: "Tay phải gảy nốt rành rọt, tay trái rung nhấn mềm mại như nước chảy mây trôi. Đó là cái thần của ngón đờn Tranh Việt Nam.",
        author: "Tài liệu truyền nghề Nhạc Cụ Đức Ngân",
      },
      {
        type: "heading",
        level: 2,
        text: "Nghệ Thuật Căn Chỉnh Nhạn Đàn",
      },
      {
        type: "paragraph",
        text: "Nhạn đàn (con nhạn đỡ dây) thường được đẽo từ gỗ Trắc hoặc gỗ Cẩm Lai để đảm bảo độ cứng. Vị trí đặt nhạn chia chiều dài dây thành hai phần: phần gảy bên phải và phần nhấn nhá tạo cao độ bên trái.",
      },
      {
        type: "image",
        src: "/images/about/the-art-of-craftsmanship-400x300.jpg",
        alt: "Nghệ nhân thẩm âm và căn chỉnh độ cong vòm mặt đàn",
        caption: "Nghệ nhân kiểm tra độ cong vòm mặt đàn Ngô Đồng và vị trí đặt nhạn chia thang âm ngũ cung.",
      },
      {
        type: "heading",
        level: 3,
        text: "Kỹ Thuật Nhấn Vuốt Đặc Trưng",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Ngón Rung: Dao động nhẹ bàn tay trái tạo độ mềm mại, ngân vang cho nốt nhạc.",
          "Ngón Nhấn: Dùng lực ngón tay ấn xuống dây sau nhạn để nâng cao độ lên nửa cung hoặc một cung.",
          "Ngón Vuốt: Trượt ngón tay dọc theo dây tạo sự liền mạch mượt mà giữa hai cao độ.",
        ],
      },
      {
        type: "paragraph",
        text: "Chính sự phối hợp nhuần nhuyễn giữa hai bàn tay đã biến cây Đàn Tranh thành giọng ca trữ tình, diễn tả trọn vẹn những cung bậc cảm xúc của tâm hồn dân tộc.",
      },
    ],
  },
  {
    id: "art-03",
    slug: "hon-am-dan-bau-doc-huyen-cam-trong-khong-gian-van-hoa-viet",
    title: "Hồn Âm Đàn Bầu — Độc Huyền Cầm Trong Không Gian Văn Hóa Dân Tộc",
    summary:
      "Cây đàn một dây kỳ diệu chỉ gảy bồi âm và uốn cần vòi sừng dẻo dai, cất lên tiếng lòng tha thiết như tiếng ru của người mẹ quê hương.",
    excerpt:
      "Cây đàn một dây kỳ diệu chỉ gảy bồi âm và uốn cần vòi sừng dẻo dai, cất lên tiếng lòng tha thiết như tiếng ru của người mẹ quê hương.",
    category: "Văn Hóa Âm Nhạc",
    date: "20/05/2025",
    publishedAt: "20 Tháng 05, 2025",
    readTime: "5 phút đọc",
    image: "/images/about/quy_trinh/vintage_luthier_workshop_interior.jpg",
    coverImage: "/images/about/quy_trinh/vintage_luthier_workshop_interior.jpg",
    blocks: [
      {
        type: "paragraph",
        text: "“Đàn bầu ai gảy nấy nghe / Làm thân con gái chớ nghe đàn bầu”. Câu ca dao xưa như một lời khẳng định về sức quyến rũ kỳ lạ của cây độc huyền cầm — nhạc cụ độc nhất vô nhị chỉ có một dây duy nhất nhưng lại cất lên được muôn vàn thanh âm tha thiết.",
      },
      {
        type: "heading",
        level: 2,
        text: "Nguyên Lý Bồi Âm & Cần Vòi Sừng Dẻo Dai",
      },
      {
        type: "paragraph",
        text: "Khác với các nhạc cụ thông thường gảy trực tiếp vào cao độ dây thực, Đàn Bầu chỉ phát ra âm thanh thông qua kỹ thuật gảy bồi âm (Harmonics). Cạnh bàn tay phải chạm nhẹ vào các điểm nút trên dây, trong khi bàn tay trái uốn cần đàn bằng sừng trâu dẻo dai để thay đổi độ căng của dây, tạo ra tất cả các cao độ luyến láy.",
      },
      {
        type: "pull-quote",
        quote: "Đàn Bầu không có phím, không có nốt cố định. Cao độ nằm ở tai nghe và cảm xúc rung động trong lồng ngực người nghệ sĩ.",
        author: "Nghệ nhân Chế Tác Đàn Bầu Đức Ngân",
      },
      {
        type: "heading",
        level: 2,
        text: "Thân Đàn & Quả Bầu Cộng Hưởng",
      },
      {
        type: "paragraph",
        text: "Thân Đàn Bầu truyền thống thuôn dài, làm từ gỗ Ngô Đồng kết hợp thành Cẩm Lai hoặc Gõ Đỏ. Phần đầu đàn gắn một quả bầu khô hoặc bầu gỗ tiện rỗng có tác dụng khuếch đại bồi âm và tăng độ ấm.",
      },
      {
        type: "image",
        src: "/images/stories/go_lam_dan.jpg",
        alt: "Bàn mộc chế tác nhạc cụ mộc truyền thống tại xưởng Đức Ngân",
        caption: "Thân đàn gỗ Cẩm Lai và các công cụ đục gọt thủ công trong quy trình chế tác Đàn Bầu độc bản.",
      },
      {
        type: "paragraph",
        text: "Ngày nay, dù bước vào không gian âm nhạc đương đại với hệ thống pickup và amply hiện đại, Đàn Bầu Đức Ngân vẫn giữ nguyên vẹn hồn cốt mộc mạc, sâu lắng của người Việt Nam.",
      },
    ],
  },
  {
    id: "art-04",
    slug: "bi-quyet-can-chinh-phim-dan-nguyet-cho-nghe-thuat-don-ca-tai-tu",
    title: "Bí Quyết Căn Chỉnh Phím Đàn Nguyệt Chuẩn Ngũ Cung Tài Tử Nam Bộ",
    summary:
      "Đo đạc khoảng cách phím tre già trên cần đàn gỗ Cẩm Lai giúp ngón bấm êm ái, tạo khoảng rung luyến rộng cho điệu Vọng Cổ da diết.",
    excerpt:
      "Đo đạc khoảng cách phím tre già trên cần đàn gỗ Cẩm Lai giúp ngón bấm êm ái, tạo khoảng rung luyến rộng cho điệu Vọng Cổ da diết.",
    category: "Chuyện Nghề Chế Tác",
    date: "15/05/2025",
    publishedAt: "15 Tháng 05, 2025",
    readTime: "7 phút đọc",
    image: "/images/stories/tre_choi_dan1.jpg",
    coverImage: "/images/stories/tre_choi_dan1.jpg",
    blocks: [
      {
        type: "paragraph",
        text: "Trong dàn nhạc Đờn Ca Tài Tử và Cải Lương Nam Bộ, Đàn Nguyệt (Đàn Kìm) được xưng tụng là 'Nhạc trưởng'. Với thùng đàn tròn như vầng trăng rằm và cần đàn dài gắn phím cao, Đàn Nguyệt sở hữu khả năng nhấn nhá âm sắc vô cùng phong phú.",
      },
      {
        type: "heading",
        level: 2,
        text: "Kỹ Thuật Đẽo Phím Tre Già",
      },
      {
        type: "paragraph",
        text: "Phím Đàn Nguyệt truyền thống không làm bằng kim loại mà được đẽo thủ công từ cật tre già ngâm nước vôi hoặc gỗ Trắc quý. Phím có hình bán nguyệt cao, cho phép ngón tay nhấn sâu xuống cần đàn để luyến nốt mà không bị cấn.",
      },
      {
        type: "pull-quote",
        quote: "Phím đàn kìm gắn đúng vị trí ngũ cung thì câu Vọng Cổ mới đượm mùi nhớ thương, ngón đờn mới sâu và ngọt.",
        author: "Nghệ nhân Hiệu Đàn Đức Ngân",
      },
      {
        type: "image",
        src: "/images/about/quy_trinh/ban_tay_che_tac_dan_dan_toc.jpg",
        alt: "Nghệ nhân cẩn từng nấc phím và họa tiết trên cần đàn nguyệt",
        caption: "Đôi bàn tay nghệ nhân đo đạc chính xác từng nấc phím trước khi cố định trên cần đàn.",
      },
      {
        type: "heading",
        level: 2,
        text: "Quy Trình Đo Đạc Cao Độ Phím",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Xác định độ dài âm học từ ngựa đàn đến lược đàn (khoảng 680–700mm).",
          "Căn chỉnh phím số 1 theo cao độ Hò chuẩn của thang âm Tài Tử (Hò, Xự, Xang, Xê, Cống).",
          "Thử lực nhấn ngón tay để đảm bảo khi vuốt sâu không bị xì tạp âm và không bị đau tay.",
        ],
      },
      {
        type: "paragraph",
        text: "Mỗi cây Đàn Nguyệt rời xưởng Đức Ngân đều được nghệ nhân đích thân so dây và thử ngón qua từng bài bản cổ truyền để bảo đảm chuẩn âm tuyệt đối.",
      },
    ],
  },
  {
    id: "art-05",
    slug: "dan-sen-va-vai-tro-tru-cot-trong-san-khau-cai-luong-nam-bo",
    title: "Đàn Sến & Vai Trò Trụ Cột Đệm Hát Trong Sân Khấu Cải Lương",
    summary:
      "Tìm hiểu về thùng đàn hoa lục giác bằng gỗ Gõ Đỏ nguyên khối và âm sắc đanh sáng, sắc sảo dẫn nhịp cho từng câu ca trên sân khấu cổ truyền.",
    excerpt:
      "Tìm hiểu về thùng đàn hoa lục giác bằng gỗ Gõ Đỏ nguyên khối và âm sắc đanh sáng, sắc sảo dẫn nhịp cho từng câu ca trên sân khấu cổ truyền.",
    category: "Tin Tức Nhạc Cụ",
    date: "10/05/2025",
    publishedAt: "10 Tháng 05, 2025",
    readTime: "4 phút đọc",
    image: "/images/about/quy_trinh/ban_tay_che_tac_dan_dan_toc.jpg",
    coverImage: "/images/about/quy_trinh/ban_tay_che_tac_dan_dan_toc.jpg",
    blocks: [
      {
        type: "paragraph",
        text: "Đàn Sến (Hoa Cầm) thu hút ánh nhìn bởi thùng đàn uốn lượn như cánh hoa sáu cánh hoặc bát giác. Với âm sắc đanh, giòn và sắc bén, Đàn Sến giữ vai trò giữ nhịp và tô điểm cho những khúc cao trào trong các vở tuồng Cải Lương.",
      },
      {
        type: "heading",
        level: 2,
        text: "Chế Tác Thùng Hoa Lục Giác Gỗ Gõ Đỏ",
      },
      {
        type: "paragraph",
        text: "Để uốn được 6 múi hoa cân xứng, nghệ nhân phải tuyển chọn những dải gỗ Gõ Đỏ hoặc Cẩm Lai có thớ thẳng mịn, sau đó hấp nhiệt và uốn mộc thủ công trong khuôn dưỡng. Mặt đàn mỏng khoảng 2.5mm bằng gỗ Ngô Đồng giúp tiếng gảy có độ nảy và sáng rực rỡ.",
      },
      {
        type: "pull-quote",
        quote: "Tiếng Đàn Sến phải đanh giòn mà không gắt, rộn rã mà vẫn có độ sâu của gỗ già.",
        author: "Nghệ nhân Hiệu Đàn Đức Ngân",
      },
      {
        type: "image",
        src: "/images/about/mother_of_pearl_inlay_luthier_wood.jpg",
        alt: "Cận cảnh họa tiết cẩn xà cừ trên thân và cần đàn",
        caption: "Thân đàn hoa và cần đàn gỗ quý được nghệ nhân cẩn họa tiết truyền thống tinh xảo.",
      },
      {
        type: "paragraph",
        text: "Đàn Sến Đức Ngân luôn là sự lựa chọn tin cậy của các nhạc sĩ và nghệ sĩ sân khấu Cải Lương chuyên nghiệp tại TP. Hồ Chí Minh suốt 25 năm qua.",
      },
    ],
  },
  {
    id: "art-06",
    slug: "huong-dan-bao-quan-nhac-cu-go-tu-nhien-dung-chuan-nghe-nhan",
    title: "Hướng Dẫn Bảo Quản & Dưỡng Gỗ Nhạc Cụ Tự Nhiên Chuẩn Luthier",
    summary:
      "Phương pháp kiểm soát độ ẩm phòng mộc, lau dầu bảo dưỡng cần đàn và nới lỏng dây khi không sử dụng để bảo vệ hộp cộng hưởng truyền đời.",
    excerpt:
      "Phương pháp kiểm soát độ ẩm phòng mộc, lau dầu bảo dưỡng cần đàn và nới lỏng dây khi không sử dụng để bảo vệ hộp cộng hưởng truyền đời.",
    category: "Chuyện Nghề Chế Tác",
    date: "05/05/2025",
    publishedAt: "05 Tháng 05, 2025",
    readTime: "5 phút đọc",
    image: "/images/about/handcrafted_instrument_in_luxury_case_velvet.jpg",
    coverImage: "/images/about/handcrafted_instrument_in_luxury_case_velvet.jpg",
    blocks: [
      {
        type: "paragraph",
        text: "Nhạc cụ dân tộc làm từ các loại gỗ tự nhiên như Cẩm Lai, Trắc, Mun hay Ngô Đồng có 'hơi thở' riêng. Khi môi trường xung quanh thay đổi nhiệt độ hoặc độ ẩm đột ngột, thớ gỗ có thể phản ứng co ngót, ảnh hưởng trực tiếp đến cao độ và độ bền của đàn.",
      },
      {
        type: "heading",
        level: 2,
        text: "Nguyên Tắc Kiểm Soát Độ Ẩm",
      },
      {
        type: "paragraph",
        text: "Độ ẩm lý tưởng để bảo quản nhạc cụ gỗ mộc dao động từ 50% đến 65%. Tránh đặt đàn ở những nơi có ánh nắng mặt trời trực tiếp rọi vào hoặc ngay dưới luồng gió máy điều hòa.",
      },
      {
        type: "image",
        src: "/images/about/quy_trinh/khong_gian_trung_bay_nhac_cu_truyen_thong.jpg",
        alt: "Không gian trưng bày và bảo quản nhạc cụ tại Đức Ngân",
        caption: "Phòng trưng bày và lưu giữ đàn tại Đức Ngân được kiểm soát độ ẩm và nhiệt độ ổn định để bảo vệ gỗ tự nhiên.",
      },
      {
        type: "heading",
        level: 2,
        text: "Các Bước Chăm Sóc Đàn Hàng Ngày",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Dùng khăn sợi mềm (microfiber) lau sạch mồ hôi tay và bụi bẩn trên cần đàn và dây sau mỗi buổi tập.",
          "Thoa một lớp dầu dưỡng khoáng chuyên dụng mỏng lên mặt phím gỗ Trắc/Cẩm Lai định kỳ 3–6 tháng một lần.",
          "Khi không sử dụng trong thời gian dài trên 2 tuần, nên nới lỏng dây đàn khoảng 1 cung để giảm bớt lực căng lên mặt đàn.",
          "Cất đàn vào bao da hoặc hộp cứng lót nỉ có gói hút ẩm để giữ nhiệt độ ổn định.",
        ],
      },
      {
        type: "pull-quote",
        quote: "Chăm chút cây đàn cũng như chăm chút tâm hồn người chơi. Một cây đàn được bảo quản đúng cách sẽ càng đánh càng hay và truyền lại qua nhiều thế hệ.",
        author: "Kinh nghiệm thợ cả Hiệu Đàn Đức Ngân",
      },
    ],
  },
];
