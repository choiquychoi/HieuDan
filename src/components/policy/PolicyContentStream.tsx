import {
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Lock,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { WORKSHOP_CONTACT } from "@/data/policyData";
import { SHOWROOM_INFO } from "@/data/navigation";

export default function PolicyContentStream() {
  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Hi%E1%BB%87u+%C4%90%C3%A0n+%C4%90%E1%BB%A9c+Ng%C3%A2n+526+%C4%90i%E1%BB%87n+Bi%C3%AAn+Ph%E1%BB%A7";

  return (
    <div className="space-y-8 text-stone-700">
      {/* Main Document Paper Container (Matching Wireframe) */}
      <div className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xs space-y-12">
        {/* =========================================================================
            1. VẬN CHUYỂN & GIAO NHẬN (Anchor ID: van-chuyen)
        ========================================================================== */}
        <section id="van-chuyen" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B241F] flex items-center gap-3">
              <span>Vận Chuyển &amp; Giao Nhận</span>
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              Quy chuẩn giao vận
            </span>
          </div>

          <div className="space-y-5 text-sm sm:text-base leading-relaxed">
            {/* Packaging 4 layers */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3] flex items-center justify-center shrink-0 text-[#8B5A2B] mt-0.5">
                <Package size={19} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[#2B241F] text-base">
                  Đóng gói chống sốc chuyên dụng 4 lớp (Shockproof Crates &amp; Foam)
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Mỗi cây đàn trước khi xuất xưởng được cố định cầu ngựa, bọc mút xốp chống trầy xước, đệm túi khí giảm chấn dày và đóng trong hòm nẹp gỗ gia cố chịu lực. Đảm bảo nhạc cụ an toàn tuyệt đối ngay cả trên các chặng vận chuyển đường xa liên tỉnh.
                </p>
              </div>
            </div>

            {/* Delivery & Co-inspection */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3] flex items-center justify-center shrink-0 text-[#8B5A2B] mt-0.5">
                <Truck size={19} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[#2B241F] text-base">
                  Giao hàng toàn quốc &amp; Đồng kiểm tận tay
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Hiệu Đàn Đức Ngân hỗ trợ giao hàng hỏa tốc nội thành TP. Hồ Chí Minh trong 2 giờ và chuyển phát an toàn 63 tỉnh thành qua đối tác vận chuyển chuyên trách hàng giá trị cao. Quý khách hoàn toàn được quyền mở kiện kiểm tra ngoại quan cùng bưu tá trước khi thanh toán tiền COD.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. BẢO HÀNH & BẢO DƯỠNG (Anchor ID: bao-hanh)
        ========================================================================== */}
        <section id="bao-hanh" className="scroll-mt-28 space-y-6 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B241F] flex items-center gap-3">
              <span>Bảo Hành &amp; Bảo Dưỡng</span>
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              24 tháng kết cấu
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            <p className="text-stone-600">
              Với kinh nghiệm chế tác đàn cổ truyền từ năm 1999, mỗi nhạc cụ của Đức Ngân đều được tuyển chọn kỹ lưỡng từ phôi gỗ tự nhiên qua nhiều năm phơi khô tự nhiên để đạt độ ổn định âm học tối ưu.
            </p>

            <div className="space-y-2 text-sm text-stone-800">
              <p>
                <strong>Bảo hành kết cấu thân đàn gỗ 24 tháng:</strong> Bảo hành miễn phí các lỗi kỹ thuật mộc như nứt vỡ thân gỗ do co ngót tự nhiên, hở keo ghép mộng, cong cần đàn không khắc phục được bằng ty chỉnh.
              </p>
              <p>
                <strong>Bảo dưỡng âm sắc &amp; Căn chỉnh phím trọn đời (Lifetime Acoustic &amp; Fret Service):</strong> Khách hàng mang đàn đến xưởng sẽ được nghệ nhân kiểm tra, vệ sinh cần phím, căn chỉnh độ cao dây (action) và tra dầu dưỡng phím đàn hoàn toàn miễn phí trọn đời.
              </p>
            </div>

            {/* Checklist matching wireframe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="flex items-center gap-2.5 text-sm text-[#2B241F] bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80">
                <CheckCircle2 size={18} className="text-[#8B5A2B] shrink-0" />
                <span>Bảo hành kết cấu gỗ tự nhiên 24 tháng</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#2B241F] bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80">
                <CheckCircle2 size={18} className="text-[#8B5A2B] shrink-0" />
                <span>Miễn phí cân chỉnh âm &amp; phím trọn đời</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#2B241F] bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80">
                <CheckCircle2 size={18} className="text-[#8B5A2B] shrink-0" />
                <span>Hỗ trợ phục chế đàn truyền thống cũ</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#2B241F] bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80">
                <CheckCircle2 size={18} className="text-[#8B5A2B] shrink-0" />
                <span>Đổi đàn nếu phát sinh lỗi phôi gỗ ẩn</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CHÍNH SÁCH ĐỔI TRẢ (Anchor ID: doi-tra)
        ========================================================================== */}
        <section id="doi-tra" className="scroll-mt-28 space-y-6 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B241F] flex items-center gap-3">
              <span>Chính Sách Đổi Trả</span>
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              Đổi mới trong 7 ngày
            </span>
          </div>

          {/* Warm Ivory Callout Box with Wood Amber Left Border (Exact Wireframe match) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FDFBF7] border-l-4 border-[#8B5A2B] shadow-xs space-y-2 text-stone-800">
            <div className="flex items-center gap-2 text-[#8B5A2B] font-bold text-base">
              <AlertTriangle size={18} />
              <span>Lưu ý quan trọng: Video mở hộp &amp; Đồng kiểm (Unboxing Video)</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-700">
              Nhạc cụ là tác phẩm nghệ thuật mộc tinh xảo. Để bảo vệ quyền lợi chính đáng cao nhất của Quý khách khi nhận đàn từ đơn vị vận chuyển, <strong>vui lòng quay lại toàn bộ video quá trình khui hòm nẹp gỗ</strong>. Nếu phát hiện đàn bị cấn móp, nứt vỡ hoặc trầy xước do va đập, video này là căn cứ xác thực để xưởng đổi mới 100% cây đàn khác cho Quý khách ngay lập tức.
            </p>
          </div>

          <div className="space-y-3 text-sm sm:text-base leading-relaxed text-stone-600">
            <p>
              <strong>Thời hạn đổi mới:</strong> Trong vòng 07 ngày kể từ khi nhận đàn, nếu cây đàn có lỗi kỹ thuật âm thanh (tịt nốt, rè phím không chỉnh được, lỗi mobin/pickup), Quý khách được đổi ngay cây đàn cùng phân khúc hoặc nâng cấp dòng cao hơn.
            </p>
            <p>
              <strong>Điều kiện đổi trả:</strong> Nhạc cụ còn nguyên vẹn hiện trạng xuất xưởng, không bị tác động nhiệt độ ẩm mốc bất thường, kèm theo đầy đủ bao da, phụ kiện và phiếu giao nhận xưởng.
            </p>
          </div>
        </section>

        {/* =========================================================================
            4. ĐẶT HÀNG & THANH TOÁN (Anchor ID: thanh-toan)
        ========================================================================== */}
        <section id="thanh-toan" className="scroll-mt-28 space-y-6 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B241F] flex items-center gap-3">
              <span>Đặt Hàng &amp; Thanh Toán</span>
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              Linh hoạt &amp; An toàn
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-600">
            <p>
              Chúng tôi cung cấp các phương thức thanh toán thuận tiện nhất để Quý khách an tâm lựa chọn:
            </p>
            <ul className="space-y-2.5 pl-2 text-sm text-stone-700">
              <li className="flex items-start gap-2.5">
                <CreditCard size={17} className="text-[#8B5A2B] shrink-0 mt-0.5" />
                <span><strong>Chuyển khoản ngân hàng (VietQR):</strong> Quét mã thanh toán nhanh qua tài khoản chính thức của Hiệu Đàn Đức Ngân. Đơn hàng được xác nhận ngay lập tức kèm ảnh đóng gói chi tiết.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Truck size={17} className="text-[#8B5A2B] shrink-0 mt-0.5" />
                <span><strong>Thu hộ tận nơi (COD):</strong> Quý khách thanh toán tiền mặt trực tiếp cho nhân viên giao hàng sau khi mở hòm đồng kiểm ngoại quan nhạc cụ.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Package size={17} className="text-[#8B5A2B] shrink-0 mt-0.5" />
                <span><strong>Đặt cọc nhạc cụ chế tác riêng (Custom Order):</strong> Với các đơn đặt làm đàn theo ni tấc riêng của nghệ sĩ, khắc tên hoặc khảm xà cừ theo tích cổ, Quý khách đặt trước 30% để xưởng lên phôi mộc và tiến hành chế tác.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* =========================================================================
            5. BẢO MẬT THÔNG TIN (Anchor ID: bao-mat)
        ========================================================================== */}
        <section id="bao-mat" className="scroll-mt-28 space-y-6 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B241F] flex items-center gap-3">
              <span>Bảo Mật Thông Tin</span>
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              Bảo mật tuyệt đối
            </span>
          </div>

          <div className="space-y-3 text-sm sm:text-base leading-relaxed text-stone-600">
            <p>
              Hiệu Đàn Đức Ngân cam kết tôn trọng và bảo vệ tuyệt đối dữ liệu cá nhân của Quý khách:
            </p>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-2 text-sm text-stone-700">
              <div className="flex items-center gap-2 text-[#8B5A2B] font-semibold">
                <Lock size={16} />
                <span>Nguyên tắc bảo vệ dữ liệu khách hàng</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-stone-600">
                <li>Thông tin chỉ sử dụng cho mục đích xác nhận đơn hàng, giao nhận đàn và lưu hồ sơ bảo hành kỹ thuật.</li>
                <li>Tuyệt đối không mua bán, trao đổi hoặc tiết lộ thông tin khách hàng cho bên thứ ba vì bất kỳ mục đích thương mại nào.</li>
                <li>Quý khách có quyền yêu cầu tra cứu, cập nhật hoặc xóa bỏ thông tin cá nhân khỏi hệ thống bảo hành bất kỳ lúc nào.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. ĐIỀU KHOẢN HOẠT ĐỘNG (Anchor ID: dieu-khoan)
        ========================================================================== */}
        <section id="dieu-khoan" className="scroll-mt-28 space-y-6 pt-4 border-t border-stone-100">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B241F] flex items-center gap-3">
              <span>Điều Khoản Hoạt Động</span>
            </h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              Trách nhiệm &amp; Pháp lý
            </span>
          </div>

          <div className="space-y-3 text-sm sm:text-base leading-relaxed text-stone-600">
            <p>
              Tất cả hình ảnh nhạc cụ, tư liệu bài viết và video ghi âm độc quyền trên website đều thuộc quyền sở hữu trí tuệ của Hiệu Đàn Đức Ngân. Mọi hành vi sao chép nhằm mục đích thương mại mà chưa có sự đồng ý bằng văn bản của xưởng đều là vi phạm quyền tác giả.
            </p>
            <p>
              Hiệu Đàn Đức Ngân luôn nỗ lực mô tả chính xác chất gỗ, độ tuổi phôi mộc và đặc tính âm học của từng cây đàn. Trong mọi trường hợp khiếu nại, tinh thần hợp tác và sự hài lòng của người yêu nhạc luôn là tôn chỉ giải quyết cao nhất của xưởng.
            </p>
          </div>
        </section>
      </div>

      {/* =========================================================================
          HỖ TRỢ TRỰC TIẾP TỪ NGHỆ NHÂN
      ========================================================================== */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 text-center shadow-xs space-y-4">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B241F]">
          Bạn Cần Tư Vấn Thêm Về Nhạc Cụ?
        </h3>
        <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          Đội ngũ nghệ nhân và kỹ thuật viên Hiệu Đàn Đức Ngân luôn sẵn lòng tư vấn chọn đàn, hỗ trợ kỹ thuật âm sắc và giải đáp mọi thắc mắc của Quý khách.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Zalo Button */}
          <a
            href={WORKSHOP_CONTACT.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-[#FAF6F0] hover:text-[#8B5A2B] text-stone-700 text-sm font-medium border border-stone-200 transition-colors shadow-2xs"
          >
            <MessageCircle size={16} className="text-[#8B5A2B]" />
            <span>Nhắn tin qua Zalo</span>
          </a>

          {/* Call Artisan Button */}
          <a
            href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-[#FAF6F0] hover:text-[#8B5A2B] text-stone-700 text-sm font-medium border border-stone-200 transition-colors shadow-2xs"
          >
            <Phone size={16} className="text-[#8B5A2B]" />
            <span>Gọi hotline nghệ nhân</span>
          </a>

          {/* Showroom Button */}
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-[#FAF6F0] hover:text-[#8B5A2B] text-stone-700 text-sm font-medium border border-stone-200 transition-colors shadow-2xs"
          >
            <MapPin size={16} className="text-[#8B5A2B]" />
            <span>Chỉ đường Showroom</span>
          </a>
        </div>
      </div>
    </div>
  );
}
