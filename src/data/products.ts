import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  // ----------------------------------------------------
  // 1. ĐÀN BẦU (3 items)
  // ----------------------------------------------------
  {
    id: "db-01",
    name: "Bầu Xếp",
    slug: "bau-xep",
    categoryId: "dan-bau",
    categoryName: "Đàn Bầu",
    price: 3500000,
    thumbnail: "/images/hero/dan-bau.png",
    images: [
      "/images/hero/dan-bau.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Đàn bầu thiết kế gập đôi tiện lợi mang theo khi lưu diễn hoặc di chuyển, hoàn thiện tỉ mỉ.",
    description: `
      <h2>Hồn cốt Độc huyền cầm — Nghệ thuật uốn cần & bồi âm</h2>
      <p>Đàn Bầu (hay Độc huyền cầm) là một trong những nhạc cụ độc đáo nhất thế giới, chỉ có duy nhất một dây nhưng diễn tấu được trọn vẹn mọi cung bậc cảm xúc của người Việt. Điểm đặc biệt của cây đàn nằm ở kỹ thuật gảy bồi âm (harmonic) bằng que gảy mềm kết hợp với tay trái uốn lượn cần vòi để biến hóa cao độ, tạo nên những nốt luyến láy ngân vang như tiếng than thở, tiếng ru hời của mẹ.</p>
      
      <blockquote>
        <p>“Cây đàn bầu chỉ một dây duy nhất nhưng chất chứa cả hồn quê sông nước, gảy lên nghe mộc mạc mà lắng sâu đến tận đáy lòng.”</p>
        <cite>— Nghệ nhân xưởng Hiệu Đàn Đức Ngân (Kỷ niệm chế tác từ 1999)</cite>
      </blockquote>

      <h3>Cấu tạo & Chất liệu âm học tuyển chọn</h3>
      <p>Mẫu Bầu Xếp được xưởng Đức Ngân tối ưu hóa cho người biểu diễn hay di chuyển với bản lề kim loại âm khéo léo, có thể gấp gọn làm đôi mà không ảnh hưởng đến độ căng dây hay buồng cộng hưởng âm học:</p>
      <ul>
        <li><strong>Khung thân đàn:</strong> Gỗ Cẩm Lai sấy mộc tự nhiên hơn 3 năm, vân gỗ sắc nét, chịu lực căng dây tốt và chống co ngót trước sự thay đổi nhiệt độ.</li>
        <li><strong>Mặt cảm âm (Soundboard):</strong> Gỗ Ngô Đồng xốp nhẹ được tuyển lựa kỹ lưỡng, bào mỏng theo độ vòm tiêu chuẩn để phát huy tối đa độ cộng hưởng rung động từ dây đàn.</li>
        <li><strong>Cần vòi đàn:</strong> Làm từ sừng trâu uốn dẻo hoặc kim loại bọc da, cho độ nảy đầm tay khi thực hiện các ngón rung, ngón nhấn, ngón vuốt.</li>
        <li><strong>Bầu đàn:</strong> Sử dụng vỏ bầu khô tự nhiên hoặc gỗ tiện chuẩn tỷ lệ truyền thống, tạo điểm tì và khuếch đại bồi âm mộc.</li>
      </ul>

      <h3>Bảng thông số kỹ thuật tiêu chuẩn</h3>
      <table>
        <thead>
          <tr>
            <th>Hạng mục thông số</th>
            <th>Quy cách chế tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chiều dài mở rộng</td>
            <td>105 cm (khi gập đôi còn khoảng 55 cm)</td>
          </tr>
          <tr>
            <td>Số lượng dây</td>
            <td>01 dây thép chuyên dụng cho nhạc cụ dân tộc</td>
          </tr>
          <tr>
            <td>Hệ thống khuếch đại</td>
            <td>Tích hợp sẵn mobin cảm ứng điện từ (Pickup) giắc 6.5mm ra âm ly</td>
          </tr>
          <tr>
            <td>Bảo hành & Hậu mãi</td>
            <td>Bảo hành âm sắc trọn đời, hỗ trợ cân chỉnh cần vòi miễn phí tại xưởng Q10</td>
          </tr>
        </tbody>
      </table>

      <h3>Hướng dẫn bảo dưỡng & Thẩm âm</h3>
      <p>Sau khi biểu diễn, quý khách nên lau nhẹ dây đàn bằng khăn vải khô mềm. Khi không sử dụng trong thời gian dài, có thể nới lỏng trục lên dây một chút để cần đàn luôn giữ được độ dẻo đàn hồi nguyên bản của sừng tự nhiên.</p>
    `,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "db-02",
    name: "Bầu Xếp loa Bluetooth",
    slug: "bau-xep-loa-bluetooth",
    categoryId: "dan-bau",
    categoryName: "Đàn Bầu",
    price: 6000000,
    thumbnail: "/images/hero/dan-bau.png",
    images: [
      "/images/hero/dan-bau.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Đàn bầu gập đôi tích hợp sẵn loa Bluetooth và hệ thống mobin khuếch đại không dây tiện lợi.",
    description: `
      <h2>Sự giao thoa giữa di sản truyền thống & Tiện ích biểu diễn hiện đại</h2>
      <p>Được phát triển dựa trên nhu cầu tập luyện lưu động và biểu diễn đường phố, phiên bản <strong>Bầu Xếp Bluetooth</strong> của xưởng Đức Ngân tích hợp sẵn hệ thống khuếch đại âm thanh mini bên trong thân đàn. Người chơi không cần mang theo âm ly cồng kềnh mà vẫn có thể gảy đàn phát trực tiếp ra loa, hoặc kết nối điện thoại qua Bluetooth để phát nhạc nền đệm (backing track) cùng lúc.</p>

      <blockquote>
        <p>“Giữ nguyên âm sắc mộc truyền thống nhưng mở rộng tính năng không dây — giúp người trẻ dễ dàng tiếp cận và biểu diễn đàn bầu ở bất kỳ không gian nào.”</p>
        <cite>— Tư liệu kỹ thuật xưởng Đức Ngân</cite>
      </blockquote>

      <h3>Chi tiết tính năng nổi bật</h3>
      <ul>
        <li><strong>Hệ thống loa kép tích hợp:</strong> Loa âm trầm và loa treble định hướng cho âm thanh trong trẻo, trung thực với âm gảy bồi âm mộc.</li>
        <li><strong>Pin sạc Lithium dung lượng cao:</strong> Thời lượng sử dụng liên tục từ 4 đến 6 tiếng, sạc nhanh qua cổng Type-C tiện dụng.</li>
        <li><strong>Mobin cảm ứng cao cấp:</strong> Giảm thiểu tối đa tiếng ù rè (noise) khi kết nối ra dàn âm thanh lớn tại sân khấu chuyên nghiệp.</li>
      </ul>
    `,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "db-03",
    name: "Đàn Bầu thùng cần",
    slug: "dan-bau-thung-can",
    categoryId: "dan-bau",
    categoryName: "Đàn Bầu",
    price: 15000000,
    thumbnail: "/images/hero/dan-bau.png",
    images: [
      "/images/hero/dan-bau.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Dáng đàn bầu thùng cần truyền thống, gia công tỉ mỉ cho âm sắc dày, ngân sâu và độ vang chuẩn.",
    description: `
      <h2>Tuyệt tác Thùng Cần — Đỉnh cao buồng cộng hưởng gỗ Cẩm Lai nguyên khối</h2>
      <p>Khác với dòng đàn bầu gấp gọn, <strong>Đàn Bầu Thùng Cần</strong> sở hữu thân đàn nguyên khối với buồng cộng hưởng lớn theo tỷ lệ vàng cổ truyền. Đây là dòng đàn biểu diễn thính phòng được các nghệ sĩ chuyên nghiệp tại các Nhạc viện và đoàn văn công ưa chuộng nhờ âm lượng mộc rất lớn, độ ngân sâu và âm sắc tròn trịa từng nốt nhạc.</p>

      <h3>Kỹ nghệ chế tác & Cẩn xà cừ thủ công</h3>
      <p>Mỗi cây đàn thùng cần mất từ 45 đến 60 ngày hoàn thiện thủ công tại xưởng 526 Điện Biên Phủ:</p>
      <ul>
        <li><strong>Thân đàn:</strong> Gỗ Cẩm Lai vân chỉ tuyển chọn, hai bên mạn đàn được khảm ốc xà cừ ngũ sắc họa tiết hoa mai hoặc phong cảnh sơn thủy hữu tình.</li>
        <li><strong>Mặt đàn:</strong> Gỗ Ngô Đồng tuyển mộc không mắt sâu, xử lý sấy khô tự nhiên bằng bóng râm giúp tiếng đàn đượm ấm và vang xa.</li>
        <li><strong>Cần vòi:</strong> Cần sừng trâu đen già uốn theo dáng vòi voi cổ, có độ cong hoàn hảo tạo lực tỳ êm ái khi rung ngón.</li>
      </ul>
    `,
    isFeatured: true,
    inStock: true,
  },

  // ----------------------------------------------------
  // 2. ĐÀN KÌM / ĐÀN NGUYỆT (3 items)
  // ----------------------------------------------------
  {
    id: "dk-01",
    name: "Đàn Nguyệt gỗ Cẩm Lai cẩn",
    slug: "dan-nguyet-go-cam-lai-can",
    categoryId: "dan-kim",
    categoryName: "Đàn Kìm (Đàn Nguyệt)",
    price: 12000000,
    thumbnail: "/images/hero/dan-kim.png",
    images: [
      "/images/hero/dan-kim.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Thân đàn gỗ Cẩm Lai cẩn họa tiết truyền thống, phím chuẩn âm phục vụ Đờn Ca Tài Tử và Hát Văn.",
    description: `
      <h2>Tiếng đàn tròn vành vạnh như vầng trăng rằm — Nguyệt cầm phương Nam</h2>
      <p>Đàn Kìm (ở miền Bắc gọi là Đàn Nguyệt) giữ vị trí trung tâm, được xưng tụng là “chủ soái” trong dàn nhạc Đờn Ca Tài Tử Nam Bộ và là linh hồn trong nghệ thuật Hát Văn xứ Bắc. Nhờ thùng đàn tròn trịa và cần đàn dài gắn các phím cao, người nghệ sĩ có thể thực hiện những ngón nhấn rung phóng khoáng, biểu đạt những cung bậc trữ tình xao xuyến hoặc hào hùng linh thiêng.</p>

      <blockquote>
        <p>“Cây đàn kìm phát ra thanh âm trong vắt mà rền vang. Phím đàn cao cho phép ngón tay vuốt nhấn sâu tới tận nửa cung bậc, tạo nên chất ngâm ngợi rất riêng của tâm hồn người Việt.”</p>
        <cite>— Tư liệu thẩm âm xưởng Đức Ngân</cite>
      </blockquote>

      <h3>Đặc điểm kỹ thuật & Gỗ âm học</h3>
      <ul>
        <li><strong>Thùng đàn tròn:</strong> Chế tác từ gỗ Cẩm Lai lâu năm, ghép mộng chốt kín khít tạo buồng cộng hưởng âm thanh vang ấm.</li>
        <li><strong>Cần đàn & Phím:</strong> Cần đàn dài thẳng tắp chống cong vênh; 8 đến 10 phím đàn gắn trên cần được làm từ tre già chọn lọc hoặc gỗ Trắc, gọt đẽo tỉ mỉ chuẩn xác theo thang âm ngũ cung.</li>
        <li><strong>Họa tiết cẩn xà cừ:</strong> Mạn đàn và đầu cần được khảm ốc lấp lánh hoa văn cổ truyền, bề mặt quét sáp bóng mộc bảo vệ thớ gỗ.</li>
      </ul>
    `,
    isFeatured: true,
    inStock: true,
  },
  {
    id: "dk-02",
    name: "Đàn Nguyệt gỗ Cẩm Lai chạm Rồng Phụng",
    slug: "dan-nguyet-go-cam-lai-cham-rong-phung",
    categoryId: "dan-kim",
    categoryName: "Đàn Kìm (Đàn Nguyệt)",
    price: 12000000,
    thumbnail: "/images/hero/dan-kim.png",
    images: [
      "/images/hero/dan-kim.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Thân đàn gỗ Cẩm Lai điêu khắc hoa văn Rồng Phụng thủ công, âm thanh ấm áp và đanh chắc.",
    description: `
      <h2>Họa tiết Rồng Phụng điêu khắc tinh xảo & Âm sắc hào sảng</h2>
      <p>Đây là phiên bản đàn Nguyệt thủ công được các nghệ nhân chạm khắc nổi hoa văn Rồng Phụng sum vầy dọc thân và đầu cần đàn. Từng đường nét đục chạm sống động kết hợp cùng chất gỗ Cẩm Lai sẫm màu tạo nên dáng vẻ uy nghiêm, rất phù hợp cho không gian diễn xướng Hát Văn, tế lễ cung đình hay trưng bày trong các tư gia yêu mến nghệ thuật cổ truyền.</p>
    `,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "dk-03",
    name: "Đàn Nguyệt gỗ Tím (Purple Heart)",
    slug: "dan-nguyet-go-tim-purple-heart",
    categoryId: "dan-kim",
    categoryName: "Đàn Kìm (Đàn Nguyệt)",
    price: 22000000,
    thumbnail: "/images/hero/dan-kim.png",
    images: [
      "/images/hero/dan-kim.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Chất liệu gỗ Tím nhập khẩu với màu sắc tự nhiên độc đáo, mặt gỗ Ngô Đồng cộng hưởng âm sắc trong.",
    description: `
      <h2>Chất gỗ Tím thiên nhiên quý hiếm — Độ cộng hưởng đanh chắc tuyệt vời</h2>
      <p>Gỗ Tím (Purple Heart) là dòng gỗ tự nhiên nhập khẩu có tỷ trọng cực kỳ nặng và đanh chắc, mang sắc tím ánh mộc tự nhiên không qua nhuộm màu. Khi dùng làm thân đàn Nguyệt, loại gỗ này mang lại độ nảy âm sắc rất tốt, tiếng đàn đanh gọn, không bị nhòe âm khi gảy tốc độ cao.</p>
    `,
    isFeatured: false,
    inStock: true,
  },

  // ----------------------------------------------------
  // 3. ĐÀN SẾN (3 items)
  // ----------------------------------------------------
  {
    id: "ds-01",
    name: "Đàn Sến gỗ Gõ Đỏ",
    slug: "dan-sen-go-go-do",
    categoryId: "dan-sen",
    categoryName: "Đàn Sến",
    price: null,
    thumbnail: "/images/hero/dan-sen.png",
    images: [
      "/images/hero/dan-sen.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Thùng đàn hoa lục giác làm từ gỗ Gõ Đỏ chắc chắn, phím cao đặc trưng cho dàn nhạc Cải lương.",
    description: `
      <h2>Dáng hoa lục giác tao nhã — Tiếng đàn réo rắt của sân khấu Cải Lương</h2>
      <p>Đàn Sến là nhạc cụ dây gảy hai dây độc đáo với thùng đàn cách điệu hình bông hoa sáu cánh (lục giác). Âm thanh của đàn Sến có âm sắc rất trong sáng, sắc sảo và ngân vang, đóng vai trò tạo màu sắc sinh động, đệm cho các làn điệu bài bản Cải lương và Đờn Ca Tài Tử miền Tây Nam Bộ.</p>

      <h3>Đặc điểm chế tác thủ công</h3>
      <ul>
        <li><strong>Thùng đàn hoa sáu cánh:</strong> Ghép từ 6 mảnh gỗ Gõ Đỏ nguyên khối chọn lọc, vân gỗ sáng màu, thớ gỗ dẻo dai giúp ổn định âm mộc.</li>
        <li><strong>Hệ phím cao:</strong> Phím đàn được vuốt cong và dán cao trên cần đàn, cho phép người chơi bấm sát vào cần tạo độ rung luyến láy đặc sắc.</li>
      </ul>
    `,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "ds-02",
    name: "Đàn Sến cẩn ốc",
    slug: "dan-sen-can-oc",
    categoryId: "dan-sen",
    categoryName: "Đàn Sến",
    price: null,
    thumbnail: "/images/hero/dan-sen.png",
    images: [
      "/images/hero/dan-sen.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Đàn Sến truyền thống cẩn xà cừ hoa văn tinh xảo, âm sắc trong sáng và sắc sảo khi đệm hát.",
    description: `
      <h2>Kỹ nghệ cẩn xà cừ tinh xảo trên từng cánh hoa thùng đàn</h2>
      <p>Cây đàn Sến cẩn ốc là tác phẩm nghệ thuật mỹ nghệ công phu: nghệ nhân xưởng Đức Ngân tỉ mỉ cẩn từng miếng ốc xà cừ ngũ sắc lên mặt và các cạnh thùng đàn hoa, tạo ánh lấp lánh khi đèn sân khấu rọi vào. Cây đàn vừa là công cụ diễn tấu thính phòng, vừa là bảo vật trưng bày giàu giá trị văn hóa.</p>
    `,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "ds-03",
    name: "Đàn Sến Cải lương truyền thống",
    slug: "dan-sen-cai-luong-truyen-thong",
    categoryId: "dan-sen",
    categoryName: "Đàn Sến",
    price: null,
    thumbnail: "/images/hero/dan-sen.png",
    images: [
      "/images/hero/dan-sen.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Cây đàn hai dây phím cao tiêu chuẩn, phục vụ đệm hát sân khấu truyền thống Nam Bộ.",
    description: `
      <h2>Tiêu chuẩn phím âm phục vụ nghệ sĩ Cải Lương chuyên nghiệp</h2>
      <p>Gia công theo đúng ni tấc chuẩn của các nghệ nhân đờn cổ nhạc Nam Bộ, từng phím đàn được căn chỉnh chính xác theo thang âm truyền thống, giúp người chơi bấm phím nhẹ nhàng, không bị đau tay và tiếng đàn bay bổng trong trẻo.</p>
    `,
    isFeatured: false,
    inStock: true,
  },

  // ----------------------------------------------------
  // 4. ĐÀN TRANH (3 items)
  // ----------------------------------------------------
  {
    id: "dt-01",
    name: "Đàn Tranh 17 Dây gỗ Tím",
    slug: "dan-tranh-17-day-go-tim",
    categoryId: "dan-tranh",
    categoryName: "Đàn Tranh",
    price: null,
    thumbnail: "/images/hero/dan-tranh.png",
    images: [
      "/images/hero/dan-tranh.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Đàn tranh 17 dây với khung gỗ Tím nguyên khối, mặt đàn gỗ Ngô Đồng cho âm thanh trong trẻo.",
    description: `
      <h2>Thập thất huyền thanh thoát — Âm vang như suối reo mây lượn</h2>
      <p>Đàn Tranh 17 dây là nhạc cụ gảy dây cổ truyền có âm vực rộng mở và đa dạng kỹ thuật diễn tấu nhất trong dàn nhạc dân tộc Việt Nam. Nhờ ngón vê móng, ngón á, ngón rải kết hợp với tay trái nhấn nhạn, tiếng đàn tranh khi thì réo rắt vui tươi, khi thì buồn thương man mác như tiếng mưa rơi bên thềm.</p>

      <blockquote>
        <p>“Tiếng đàn tranh như suối chảy róc rách qua ghềnh đá, trong trẻo thanh tao đưa người nghe vào cõi thong dong thoát tục.”</p>
        <cite>— Tư liệu khảo cứu xưởng Đức Ngân</cite>
      </blockquote>

      <h3>Cấu trúc nhạn đàn & Mặt cảm âm vòm cong</h3>
      <ul>
        <li><strong>Mặt đàn vòm cong:</strong> Uốn từ gỗ Ngô Đồng sấy tự nhiên, thớ gỗ xốp thẳng tắp giúp sóng âm lan tỏa đều khắp thân đàn dài.</li>
        <li><strong>Hàng nhạn di động:</strong> 17 con nhạn làm từ gỗ Trắc gọt giũa tỉ mỉ, có thể di chuyển dọc thân đàn để thay đổi thang âm ngũ cung nhanh chóng.</li>
        <li><strong>Khung đàn gỗ Tím cao cấp:</strong> Giữ khung thân đàn luôn thẳng tắp, chịu được sức căng tổng thể của 17 dây kim loại.</li>
      </ul>
    `,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "dt-02",
    name: "Đàn Tranh 19 Dây gỗ Cẩm Lai cẩn hoa",
    slug: "dan-tranh-19-day-go-cam-lai-can-hoa",
    categoryId: "dan-tranh",
    categoryName: "Đàn Tranh",
    price: null,
    thumbnail: "/images/hero/dan-tranh.png",
    images: [
      "/images/hero/dan-tranh.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Đàn tranh 19 dây gỗ Cẩm Lai cẩn họa tiết hoa Hồng và hoa Lan tao nhã, âm vực rộng mở.",
    description: `
      <h2>Mở rộng âm vực 19 dây — Đáp ứng trọn vẹn hòa tấu đương đại & cổ điển</h2>
      <p>Phiên bản 19 dây mang lại dải âm vực trầm bổng phong phú hơn, giúp nghệ sĩ dễ dàng biểu diễn các tác phẩm hòa tấu phối khí hiện đại mà không bị giới hạn cao độ. Hai bên mạn đàn cẩn hoa Lan và hoa Mai xà cừ tinh tế, toát lên vẻ đẹp quý phái của phòng hòa nhạc thính phòng.</p>
    `,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "dt-03",
    name: "Đàn Tranh 18 Dây cổ truyền",
    slug: "dan-tranh-18-day-co-truyen",
    categoryId: "dan-tranh",
    categoryName: "Đàn Tranh",
    price: null,
    thumbnail: "/images/hero/dan-tranh.png",
    images: [
      "/images/hero/dan-tranh.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Đàn tranh 18 dây chuẩn âm, phím nhạn định hình chính xác, thích hợp học tập và biểu diễn.",
    description: `
      <h2>Cây đàn tranh tiêu chuẩn cho học viên Nhạc viện & Biểu diễn sân khấu</h2>
      <p>Dòng đàn tranh 18 dây chuẩn mực với khoảng cách dây đồng đều, lực gảy êm tay và âm thanh cân bằng từ dải trầm đến dải cao. Đây là mẫu đàn bán chạy nhất tại xưởng Đức Ngân dành cho học viên và nghệ nhân biểu diễn lâu năm.</p>
    `,
    isFeatured: false,
    inStock: true,
  },

  // ----------------------------------------------------
  // 5. ĐÀN TỲ BÀ VIỆT NAM (3 items)
  // ----------------------------------------------------
  {
    id: "dtb-01",
    name: "Đàn Tỳ Bà gỗ Gõ Đỏ chạm Rồng Phụng",
    slug: "dan-ty-ba-go-go-do-cham-rong-phung",
    categoryId: "dan-ty-ba",
    categoryName: "Đàn Tỳ Bà Việt Nam",
    price: null,
    thumbnail: "/images/hero/dan-ty-ba.png",
    images: [
      "/images/hero/dan-ty-ba.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Dáng đàn quả lê gỗ Gõ Đỏ chạm trổ hoa văn Rồng Phụng, 4 dây tơ với âm sắc thanh tao quý phái.",
    description: `
      <h2>Dáng đàn quả lê quý phái — Tứ huyền giao hưởng chốn cung đình</h2>
      <p>Đàn Tỳ Bà Việt Nam có lịch sử lâu đời gắn liền với Nhã nhạc cung đình Huế và các dàn nhạc cổ truyền thính phòng. Dáng đàn hình quả lê thon thả, 4 dây tơ với hệ thống phím phụ trên cần và phím chính trên mặt đàn tạo nên âm sắc đài các, khi dồn dập như tiếng vó ngựa, khi thánh thót như hạt ngọc rơi trên mâm vàng.</p>

      <blockquote>
        <p>“Đại huyền đương đương như cấp vũ, tiểu huyền thiết thiết như tư ngữ...” — Tiếng đàn tỳ bà gảy lên có thể mô tả cả bão giông lẫn lời thầm thì tha thiết.</p>
        <cite>— Điển tích âm nhạc cổ truyền</cite>
      </blockquote>

      <h3>Kỹ nghệ khoét rỗng lưng đàn quả lê</h3>
      <ul>
        <li><strong>Lưng đàn nguyên khối:</strong> Nghệ nhân xưởng Đức Ngân đục khoét tỉ mỉ từ một khối gỗ Gõ Đỏ già, tạo độ cong khí động học chuẩn âm mà không bị nứt vỡ.</li>
        <li><strong>Hệ thống phím đàn (Phẩm):</strong> Phím làm từ tre già ngâm dầu gọt giũa tỉ mẩn, gắn chắc chắn theo thang âm truyền thống.</li>
        <li><strong>Bốn trục lên dây:</strong> Trục gỗ mun tiện tinh xảo, vặn êm và giữ dây ổn định không bị trôi cao độ khi diễn tấu.</li>
      </ul>
    `,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "dtb-02",
    name: "Đàn Tỳ Bà gỗ Tím",
    slug: "dan-ty-ba-go-tim",
    categoryId: "dan-ty-ba",
    categoryName: "Đàn Tỳ Bà Việt Nam",
    price: null,
    thumbnail: "/images/hero/dan-ty-ba.png",
    images: [
      "/images/hero/dan-ty-ba.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Gỗ Tím tự nhiên độc đáo, phím tre già đanh tiếng, cần đàn thanh thoát hỗ trợ kỹ thuật vê ngón.",
    description: `
      <h2>Chất gỗ Tím thiên nhiên quý hiếm — Độ vang sắc sảo & Bền bỉ</h2>
      <p>Gỗ Tím nguyên khối với tỷ trọng nặng giúp tiếng đàn Tỳ Bà đanh rõ từng nốt, hỗ trợ tuyệt vời cho kỹ thuật vê ngón tốc độ cao của nghệ sĩ biểu diễn solo thính phòng.</p>
    `,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "dtb-03",
    name: "Đàn Tỳ Bà Gõ Đỏ cẩn ốc",
    slug: "dan-ty-ba-go-go-do-can-oc",
    categoryId: "dan-ty-ba",
    categoryName: "Đàn Tỳ Bà Việt Nam",
    price: null,
    thumbnail: "/images/hero/dan-ty-ba.png",
    images: [
      "/images/hero/dan-ty-ba.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Thân đàn quả lê cẩn xà cừ lấp lánh trên nền gỗ Gõ Đỏ, âm thanh trang nhã và truyền cảm.",
    description: `
      <h2>Họa tiết cẩn xà cừ cung đình trang nhã</h2>
      <p>Toàn bộ mặt lưng quả lê được cẩn xà cừ hoa văn tinh xảo, bề mặt hoàn thiện láng mịn sáp ong mộc giữ trọn hương gỗ tự nhiên thơm dịu.</p>
    `,
    isFeatured: false,
    inStock: true,
  },

  // ----------------------------------------------------
  // 6. ĐÀN VIOLIN (3 items)
  // ----------------------------------------------------
  {
    id: "vn-01",
    name: "Violon Mastro VN-M01A",
    slug: "violon-mastro-vn-m01a",
    categoryId: "dan-violin",
    categoryName: "Đàn Violin",
    price: null,
    thumbnail: "/images/hero/dan-violin.png",
    images: [
      "/images/hero/dan-violin.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Dòng violin Mastro kích thước chuẩn, chất gỗ sấy tự nhiên cho âm thanh cân bằng, phù hợp người mới học.",
    description: `
      <h2>Nghệ thuật vĩ cầm thủ công — Tỷ lệ âm học chuẩn mực châu Âu</h2>
      <p>Cây đàn Violin Mastro VN-M01A là kết tinh giữa kỹ thuật đẽo gọt mộc tinh xảo của xưởng Đức Ngân và chuẩn mực âm học của vĩ cầm cổ điển phương Tây. Đàn được cân chỉnh cẩn thận về độ cong của ngựa đàn (bridge), độ cao của dây và độ nhạy của vĩ kéo, giúp người mới bắt đầu học đàn dễ dàng phát ra những nốt nhạc tròn tiếng, êm tai mà không bị khé.</p>

      <h3>Vật liệu âm học tuyển lựa</h3>
      <ul>
        <li><strong>Mặt trước (Top Plate):</strong> Gỗ Vân Sam (Spruce) sấy tự nhiên thớ thẳng đều, đảm bảo khả năng dao động cộng hưởng âm vực cao sáng rõ.</li>
        <li><strong>Mặt lưng & Hông (Back & Sides):</strong> Gỗ Phong (Maple) với vân lửa tự nhiên đẹp mắt, tạo độ vang ấm và chiều sâu âm sắc.</li>
        <li><strong>Phụ kiện chốt vĩ & Bàn phím:</strong> Làm từ gỗ Mun đen đanh chắc, chịu ma sát cao và không bị tuột dây khi căn chỉnh cao độ.</li>
      </ul>
    `,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "vn-02",
    name: "Violon Mastro VN-M02",
    slug: "violon-mastro-vn-m02",
    categoryId: "dan-violin",
    categoryName: "Đàn Violin",
    price: null,
    thumbnail: "/images/hero/dan-violin.png",
    images: [
      "/images/hero/dan-violin.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Violin Mastro VN-M02 chế tác kỹ lưỡng, cần đàn êm tay, dây đàn ổn định và âm lượng sáng rõ.",
    description: `
      <h2>Âm lượng phong phú & Dây đàn cao cấp cho trình diễn thính phòng</h2>
      <p>Mẫu VN-M02 được nâng cấp với lớp sơn dầu bóng mờ thủ công pha chế đặc biệt, giúp bảo vệ thớ gỗ đồng thời để buồng âm thở tự nhiên, tạo độ ngân vang biểu cảm cho các bản sonata và hòa tấu.</p>
    `,
    isFeatured: false,
    inStock: true,
  },
  {
    id: "vn-03",
    name: "Violon Mastro VN-M03",
    slug: "violon-mastro-vn-m03",
    categoryId: "dan-violin",
    categoryName: "Đàn Violin",
    price: null,
    thumbnail: "/images/hero/dan-violin.png",
    images: [
      "/images/hero/dan-violin.png",
      "/images/hero/hero-03.jpg",
      "/images/trust/trust-02-wood.jpg",
    ],
    summary: "Mẫu đàn Violin Mastro VN-M03 cao cấp hơn với vân gỗ tự nhiên đẹp mắt và âm thanh giàu biểu cảm.",
    description: `
      <h2>Tuyệt phẩm Violin thủ công cao cấp xưởng Đức Ngân</h2>
      <p>Chế tác từ những tấm gỗ Phong và Vân Sam tuyển chọn lưu giữ qua nhiều năm, Mastro VN-M03 sở hữu âm sắc dày dặn, ấm áp ở dây Sol rền vang và trong vắt ở dây Mi réo rắt. Đây là sự lựa chọn tin cậy cho các nghệ sĩ biểu diễn và học viên nâng cao.</p>
    `,
    isFeatured: false,
    inStock: true,
  },
];
