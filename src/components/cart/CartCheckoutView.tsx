"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Wallet,
  QrCode,
  CreditCard,
  Check,
  ArrowRight,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Mail,
  Package,
  Truck,
} from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

type PaymentMethod = "cod" | "vietqr" | "card";

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function CartCheckoutView() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal } =
    useCart();

  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("TP. Hồ Chí Minh");
  const [postal, setPostal] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vietqr");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Keep snapshot of ordered items to render confirmation screen
  const [orderedItems, setOrderedItems] = useState<CartItem[]>([]);
  const [orderedTotal, setOrderedTotal] = useState<number>(0);
  const [orderedPaymentMethod, setOrderedPaymentMethod] = useState<PaymentMethod>("vietqr");

  const [orderCode] = useState(() => `DN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  const shippingCost = 0; // Free shipping
  const totalAmount = subtotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Quý khách vui lòng nhập Họ và tên cùng Số điện thoại.");
      return;
    }

    setIsSubmitting(true);
    const newOrderId = orderCode;

    // Snapshot current order details
    setOrderedItems([...cartItems]);
    setOrderedTotal(totalAmount);
    setOrderedPaymentMethod(paymentMethod);

    setTimeout(() => {
      setOrderId(newOrderId);
      setIsOrderPlaced(true);
      setIsSubmitting(false);
      clearCart();
    }, 600);
  };

  // VietQR URL
  const vietQrUrl = `https://img.vietqr.io/image/VCB-0071001234567-compact2.png?amount=${orderedTotal || totalAmount}&addInfo=DH%20${orderId || orderCode}&accountName=HIEU%20DAN%20DUC%20NGAN`;

  if (!mounted) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center">
        <div className="font-display text-xl text-[#140C08] animate-pulse">
          Đang tải trang thanh toán...
        </div>
      </div>
    );
  }

  // ================= EXACT LOVABLE ORDER CONFIRMATION SCREEN =================
  if (isOrderPlaced) {
    const paymentLabel =
      orderedPaymentMethod === "vietqr"
        ? "Chuyển khoản VietQR Napas 24/7"
        : orderedPaymentMethod === "cod"
        ? "Thanh toán khi nhận hàng"
        : "Thẻ tín dụng / ghi nợ";

    return (
      <div className="pt-20 pb-32 sm:pt-28 bg-[#FAF8F5] text-[#140C08] selection:bg-[#B49368] selection:text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          {/* Top Status Header */}
          <div className="text-center">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#241711] text-white shadow-lg">
              <Check className="size-8 stroke-[2.4]" />
            </div>

            <div className="text-xs sm:text-[13px] font-medium tracking-[0.2em] text-[#B49368] uppercase mt-6">
              Cảm ơn quý khách
            </div>

            <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.2] text-[#140C08] font-normal">
              Đơn hàng của bạn đã được đặt.
            </h1>

            <p className="mt-6 text-[15px] text-[#706458]">
              Đơn hàng <span className="text-[#140C08] font-medium">{orderId}</span> đã được ghi nhận. Xác nhận đang được gửi tới{" "}
              <span className="text-[#140C08] font-medium">{email || phone}</span>.
            </p>
          </div>

          {/* 3 Step Process Cards */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            
            {/* Card 1 */}
            <div className="rounded-[2px] border border-[#E3DACD] bg-white p-6 shadow-xs">
              <span className="grid size-10 place-items-center rounded-[2px] border border-[#B49368]/50 text-[#B49368] bg-[#FAF8F5]">
                <Mail className="size-4" />
              </span>
              <div className="mt-4 font-display text-xl text-[#140C08]">
                Xác nhận
              </div>
              <p className="mt-2 text-sm text-[#706458]">
                Bạn sẽ nhận thông báo chi tiết đơn hàng trong giây lát.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-[2px] border border-[#E3DACD] bg-white p-6 shadow-xs">
              <span className="grid size-10 place-items-center rounded-[2px] border border-[#B49368]/50 text-[#B49368] bg-[#FAF8F5]">
                <Package className="size-4" />
              </span>
              <div className="mt-4 font-display text-xl text-[#140C08]">
                Lên tiếng thủ công
              </div>
              <p className="mt-2 text-sm text-[#706458]">
                Nghệ nhân sẽ lên tiếng và so dây nhạc cụ trước khi gửi đi.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-[2px] border border-[#E3DACD] bg-white p-6 shadow-xs">
              <span className="grid size-10 place-items-center rounded-[2px] border border-[#B49368]/50 text-[#B49368] bg-[#FAF8F5]">
                <Truck className="size-4" />
              </span>
              <div className="mt-4 font-display text-xl text-[#140C08]">
                Giao hàng
              </div>
              <p className="mt-2 text-sm text-[#706458]">
                Giao tận nơi trong 3–5 ngày làm việc trong Việt Nam.
              </p>
            </div>

          </div>

          {/* VietQR Display if VietQR selected */}
          {orderedPaymentMethod === "vietqr" && orderedTotal > 0 && (
            <div className="mt-12 rounded-[2px] border border-[#B49368]/40 bg-white p-6 sm:p-8 text-center shadow-xs">
              <div className="flex items-center justify-center gap-2 mb-3">
                <QrCode size={18} className="text-[#B49368]" />
                <h3 className="font-display text-xl font-normal text-[#140C08]">
                  Quét Mã VietQR Thanh Toán Tức Thì
                </h3>
              </div>

              <div className="mx-auto my-4 w-52 aspect-square bg-white p-2 rounded-[2px] border border-[#E3DACD] shadow-sm flex items-center justify-center">
                <Image
                  src={vietQrUrl}
                  alt="VietQR Thanh Toán Đức Ngân"
                  width={190}
                  height={190}
                  unoptimized
                  className="object-contain"
                />
              </div>

              <div className="font-sans text-xs text-[#706458] space-y-1">
                <p>Số tiền: <strong className="text-[#8C6B3E] font-medium text-sm">{formatCurrency(orderedTotal)}</strong></p>
                <p>Chủ TK: <strong>HIỆU ĐÀN ĐỨC NGÂN</strong> · VCB Tân Bình</p>
                <p>Nội dung: <strong>{orderId} - {phone}</strong></p>
              </div>
            </div>
          )}

          {/* Order Details & Summary Grid */}
          <div className="mt-14 grid gap-10 md:grid-cols-12 items-start">
            
            {/* Left: Ordered Items List */}
            <div className="md:col-span-7">
              <div className="text-[11.5px] font-medium tracking-[0.22em] text-[#9E7A4A] uppercase">
                Món · {orderedItems.length}
              </div>

              <ul className="mt-4 divide-y divide-[#E3DACD] rounded-[2px] border border-[#E3DACD] bg-white">
                {orderedItems.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-4 p-5">
                    <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-[2px] bg-[#F7F3EE] border border-[#E3DACD] p-1 flex items-center justify-center">
                      <Image
                        alt={product.name}
                        src={product.thumbnail}
                        width={75}
                        height={75}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="text-[11px] tracking-[0.16em] text-[#706458] uppercase font-medium">
                        {product.categoryName}
                      </div>
                      <div className="mt-0.5 font-display text-lg text-[#140C08]">
                        {product.name}
                      </div>
                      <div className="mt-auto text-sm text-[#706458] tabular-nums">
                        {product.price ? formatCurrency(product.price) : "Liên hệ"} × {quantity}
                      </div>
                    </div>

                    <div className="text-right font-display text-base text-[#140C08] tabular-nums font-medium">
                      {product.price ? formatCurrency(product.price * quantity) : "Liên hệ"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Summary & Delivery Address */}
            <div className="md:col-span-5 space-y-6">
              
              {/* Summary Box */}
              <div>
                <div className="text-[11.5px] font-medium tracking-[0.22em] text-[#9E7A4A] uppercase">
                  Tổng kết
                </div>

                <div className="mt-4 rounded-[2px] border border-[#E3DACD] bg-white p-6 text-sm">
                  <div className="flex items-baseline justify-between py-1 text-[#706458]">
                    <span>Tạm tính</span>
                    <span className="tabular-nums text-[#140C08] font-medium">
                      {formatCurrency(orderedTotal)}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between py-1 text-[#706458]">
                    <span>Phí giao hàng</span>
                    <span className="tabular-nums text-[#140C08] font-medium">
                      Miễn phí
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between py-1 text-[#706458]">
                    <span>Thanh toán</span>
                    <span className="tabular-nums text-[#140C08] font-medium">
                      {paymentLabel}
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between border-t border-[#E3DACD] pt-4">
                    <span className="text-xs tracking-[0.2em] text-[#706458] uppercase">
                      Tổng cộng
                    </span>
                    <span className="font-display text-2xl text-[#140C08] tabular-nums font-bold">
                      {formatCurrency(orderedTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Box */}
              <div className="rounded-[2px] border border-[#E3DACD] bg-white p-6 text-sm text-[#706458]">
                <div className="text-[11.5px] font-medium tracking-[0.22em] text-[#9E7A4A] uppercase">
                  Giao đến
                </div>
                <div className="mt-3 text-[#140C08] font-medium">{name}</div>
                <div>{address}</div>
                <div>{city}</div>
                <div className="mt-2 text-[#706458]/80">{phone}</div>
              </div>

            </div>

          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 rounded-[2px] bg-[#241711] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#3A2920]"
            >
              <span>Tiếp tục xem</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[2px] border border-[#E3DACD] bg-white px-6 py-3.5 text-sm text-[#140C08] transition hover:bg-[#FAF8F5]"
            >
              Về trang chủ
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // ================= EMPTY CART VIEW =================
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] py-20 sm:py-28 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <div className="rounded-[2px] border border-[#E3DACD] bg-white/80 p-8 sm:p-12 shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FAF8F5] text-[#706458] mb-5">
              <ShoppingBag size={36} strokeWidth={1.5} />
            </div>

            <h1 className="font-display text-3xl font-normal text-[#140C08]">
              Giỏ hàng còn trống
            </h1>

            <p className="mt-3 font-sans text-sm text-[#706458] font-light leading-relaxed">
              Khám phá các dòng nhạc cụ dân tộc Việt Nam chế tác thủ công độc bản tại xưởng Hiệu Đàn Đức Ngân.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-[2px] bg-[#241711] px-7 py-3.5 font-sans text-xs font-medium tracking-wide text-white hover:bg-[#3A2920] transition-colors shadow-md"
            >
              <span>Xem danh mục nhạc cụ</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= EXACT LOVABLE CHECKOUT STRUCTURE =================
  return (
    <div className="pt-24 pb-32 sm:pt-28 bg-[#FAF8F5] text-[#140C08] selection:bg-[#B49368] selection:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px]">
        
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#706458] uppercase transition hover:text-[#140C08]"
        >
          <ArrowLeft className="size-3.5" />
          Tiếp tục mua sắm
        </Link>

        {/* Page Header */}
        <div className="mt-6 flex items-end justify-between gap-6 border-b border-[#E3DACD] pb-8">
          <div>
            <div className="text-xs sm:text-[13px] font-medium tracking-[0.2em] text-[#B49368] uppercase">
              Thanh toán
            </div>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-[38px] leading-[1.2] text-[#140C08] font-normal">
              Hoàn tất đơn hàng
            </h1>
          </div>

          <div className="hidden text-right text-xs tracking-[0.2em] text-[#706458] uppercase md:block">
            Đơn hàng · {orderCode}
          </div>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSubmitOrder} className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          
          {/* ================= LEFT COLUMN: 3 SECTIONS (7 COLS) ================= */}
          <div className="space-y-14 lg:col-span-7">
            
            {/* 01: THÔNG TIN LIÊN HỆ */}
            <section>
              <div className="mb-6 flex items-baseline gap-4 border-b border-[#E3DACD] pb-3">
                <span className="font-display text-2xl text-[#B49368]">01</span>
                <div>
                  <h2 className="font-display text-2xl text-[#140C08]">Thông tin liên hệ</h2>
                  <p className="text-xs text-[#706458]">Chúng tôi sẽ gửi xác nhận đơn hàng tới đây.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="block text-xs sm:text-[13px] font-medium tracking-[0.12em] text-[#574F46] uppercase">
                    Họ và tên<span className="ml-1 text-[#B49368]">*</span>
                  </span>
                  <input
                    required
                    autoComplete="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-[2px] border border-[#E3DACD] bg-white px-4 py-3 text-sm text-[#140C08] placeholder:text-[#706458]/40 focus:border-[#B49368] focus:outline-none transition-colors"
                  />
                </label>

                <label className="block">
                  <span className="block text-xs sm:text-[13px] font-medium tracking-[0.12em] text-[#574F46] uppercase">
                    Email<span className="ml-1 text-[#B49368]">*</span>
                  </span>
                  <input
                    required
                    autoComplete="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-[2px] border border-[#E3DACD] bg-white px-4 py-3 text-sm text-[#140C08] placeholder:text-[#706458]/40 focus:border-[#B49368] focus:outline-none transition-colors"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="block text-xs sm:text-[13px] font-medium tracking-[0.12em] text-[#574F46] uppercase">
                    Số điện thoại<span className="ml-1 text-[#B49368]">*</span>
                  </span>
                  <input
                    required
                    autoComplete="tel"
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full rounded-[2px] border border-[#E3DACD] bg-white px-4 py-3 text-sm text-[#140C08] placeholder:text-[#706458]/40 focus:border-[#B49368] focus:outline-none transition-colors"
                  />
                </label>
              </div>
            </section>

            {/* 02: GIAO HÀNG */}
            <section>
              <div className="mb-6 flex items-baseline gap-4 border-b border-[#E3DACD] pb-3">
                <span className="font-display text-2xl text-[#B49368]">02</span>
                <div>
                  <h2 className="font-display text-2xl text-[#140C08]">Giao hàng</h2>
                  <p className="text-xs text-[#706458]">Miễn phí giao hàng trong Việt Nam cho mọi đơn nhạc cụ mộc quý.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="block text-xs sm:text-[13px] font-medium tracking-[0.12em] text-[#574F46] uppercase">
                    Địa chỉ<span className="ml-1 text-[#B49368]">*</span>
                  </span>
                  <input
                    required
                    autoComplete="street-address"
                    placeholder="Số nhà, ngõ, đường"
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-2 w-full rounded-[2px] border border-[#E3DACD] bg-white px-4 py-3 text-sm text-[#140C08] placeholder:text-[#706458]/40 focus:border-[#B49368] focus:outline-none transition-colors"
                  />
                </label>

                <label className="block">
                  <span className="block text-xs sm:text-[13px] font-medium tracking-[0.12em] text-[#574F46] uppercase">
                    Tỉnh / Thành phố<span className="ml-1 text-[#B49368]">*</span>
                  </span>
                  <input
                    required
                    autoComplete="address-level2"
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-2 w-full rounded-[2px] border border-[#E3DACD] bg-white px-4 py-3 text-sm text-[#140C08] placeholder:text-[#706458]/40 focus:border-[#B49368] focus:outline-none transition-colors"
                  />
                </label>

                <label className="block">
                  <span className="block text-xs sm:text-[13px] font-medium tracking-[0.12em] text-[#574F46] uppercase">
                    Mã bưu chính
                  </span>
                  <input
                    autoComplete="postal-code"
                    type="text"
                    name="postal"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="mt-2 w-full rounded-[2px] border border-[#E3DACD] bg-white px-4 py-3 text-sm text-[#140C08] placeholder:text-[#706458]/40 focus:border-[#B49368] focus:outline-none transition-colors"
                  />
                </label>

                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-[13px] font-medium tracking-[0.12em] text-[#574F46] uppercase">
                    Ghi chú (không bắt buộc)
                  </label>
                  <textarea
                    name="note"
                    rows={3}
                    placeholder="Yêu cầu giao hàng, lời nhắn quà, khắc chữ…"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2 w-full resize-none rounded-[2px] border border-[#E3DACD] bg-white px-4 py-3 text-sm text-[#140C08] placeholder:text-[#706458]/40 focus:border-[#B49368] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* 03: THANH TOÁN */}
            <section>
              <div className="mb-6 flex items-baseline gap-4 border-b border-[#E3DACD] pb-3">
                <span className="font-display text-2xl text-[#B49368]">03</span>
                <div>
                  <h2 className="font-display text-2xl text-[#140C08]">Thanh toán</h2>
                  <p className="text-xs text-[#706458]">Chọn phương thức thanh toán thuận tiện nhất cho quý khách.</p>
                </div>
              </div>

              <div className="grid gap-3">
                {/* 1. COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-4 rounded-[2px] border p-4 text-left transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-[#B49368] bg-white shadow-sm"
                      : "border-[#E3DACD] bg-white/50 hover:border-[#B49368]/60 hover:bg-white"
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-[2px] transition-colors ${
                      paymentMethod === "cod"
                        ? "bg-[#B49368] text-[#140C08]"
                        : "bg-[#F7F3EE] text-[#140C08]"
                    }`}
                  >
                    <Wallet className="size-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="font-display text-base text-[#140C08]">
                      Thanh toán khi nhận hàng
                    </div>
                    <div className="text-xs text-[#706458]">
                      Trả tiền mặt khi nhạc cụ đến nơi.
                    </div>
                  </div>

                  <span
                    className={`grid size-5 place-items-center rounded-full border transition-colors ${
                      paymentMethod === "cod"
                        ? "border-[#B49368] bg-[#B49368] text-[#140C08]"
                        : "border-[#E3DACD] bg-white"
                    }`}
                  >
                    {paymentMethod === "cod" && <Check className="size-3" strokeWidth={3} />}
                  </span>
                </button>

                {/* 2. VietQR */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("vietqr")}
                  className={`flex items-center gap-4 rounded-[2px] border p-4 text-left transition-all cursor-pointer ${
                    paymentMethod === "vietqr"
                      ? "border-[#B49368] bg-white shadow-sm"
                      : "border-[#E3DACD] bg-white/50 hover:border-[#B49368]/60 hover:bg-white"
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-[2px] transition-colors ${
                      paymentMethod === "vietqr"
                        ? "bg-[#B49368] text-[#140C08]"
                        : "bg-[#F7F3EE] text-[#140C08]"
                    }`}
                  >
                    <ShieldCheck className="size-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="font-display text-base text-[#140C08]">
                      Chuyển khoản VietQR Napas 24/7
                    </div>
                    <div className="text-xs text-[#706458]">
                      Quét mã QR tự động theo đúng số tiền đơn hàng trên ứng dụng ngân hàng.
                    </div>
                  </div>

                  <span
                    className={`grid size-5 place-items-center rounded-full border transition-colors ${
                      paymentMethod === "vietqr"
                        ? "border-[#B49368] bg-[#B49368] text-[#140C08]"
                        : "border-[#E3DACD] bg-white"
                    }`}
                  >
                    {paymentMethod === "vietqr" && <Check className="size-3" strokeWidth={3} />}
                  </span>
                </button>

                {/* 3. Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center gap-4 rounded-[2px] border p-4 text-left transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-[#B49368] bg-white shadow-sm"
                      : "border-[#E3DACD] bg-white/50 hover:border-[#B49368]/60 hover:bg-white"
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-[2px] transition-colors ${
                      paymentMethod === "card"
                        ? "bg-[#B49368] text-[#140C08]"
                        : "bg-[#F7F3EE] text-[#140C08]"
                    }`}
                  >
                    <CreditCard className="size-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="font-display text-base text-[#140C08]">
                      Thẻ tín dụng / ghi nợ
                    </div>
                    <div className="text-xs text-[#706458]">
                      Visa, Mastercard, JCB. Xử lý khi giao hàng.
                    </div>
                  </div>

                  <span
                    className={`grid size-5 place-items-center rounded-full border transition-colors ${
                      paymentMethod === "card"
                        ? "border-[#B49368] bg-[#B49368] text-[#140C08]"
                        : "border-[#E3DACD] bg-white"
                    }`}
                  >
                    {paymentMethod === "card" && <Check className="size-3" strokeWidth={3} />}
                  </span>
                </button>
              </div>
            </section>

          </div>

          {/* ================= RIGHT COLUMN: STICKY ORDER SUMMARY (5 COLS) ================= */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              
              {/* Order Box */}
              <div className="rounded-[2px] border border-[#E3DACD] bg-white/70 p-6">
                
                {/* Header */}
                <div className="text-[11.5px] font-medium tracking-[0.22em] text-[#9E7A4A] uppercase">
                  Chi tiết đơn hàng
                </div>

                {/* Items List */}
                <ul className="mt-5 divide-y divide-[#E3DACD]">
                  {cartItems.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-4 py-4 first:pt-0">
                      {/* Image Frame with Floating Quantity Badge */}
                      <div className="relative aspect-square w-20 shrink-0">
                        <div className="h-full w-full overflow-hidden rounded-[2px] bg-[#F7F3EE] border border-[#E3DACD] flex items-center justify-center p-1">
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={75}
                            height={75}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 z-10 grid size-5 place-items-center rounded-full bg-[#241711] text-[11px] font-medium text-white shadow-sm ring-2 ring-white">
                          {quantity}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="text-[11px] tracking-[0.16em] text-[#706458] uppercase font-medium">
                          {product.categoryName}
                        </div>
                        <div className="mt-0.5 truncate font-display text-base text-[#140C08]">
                          {product.name}
                        </div>
                        <div className="mt-auto text-sm text-[#706458] tabular-nums">
                          {product.price ? formatCurrency(product.price) : "Liên hệ"} × {quantity}
                        </div>
                      </div>

                      {/* Item Total & Action */}
                      <div className="flex flex-col justify-between items-end">
                        <div className="text-right font-display text-base text-[#140C08] tabular-nums font-medium">
                          {product.price ? formatCurrency(product.price * quantity) : "Liên hệ"}
                        </div>

                        <div className="flex items-center gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="flex h-5 w-5 items-center justify-center rounded border border-[#E3DACD] text-[#706458] hover:bg-[#FAF8F5] cursor-pointer"
                            aria-label="Giảm"
                          >
                            <Minus size={10} />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="flex h-5 w-5 items-center justify-center rounded border border-[#E3DACD] text-[#706458] hover:bg-[#FAF8F5] cursor-pointer"
                            aria-label="Tăng"
                          >
                            <Plus size={10} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="text-[#706458] hover:text-[#9E4D45] ml-1 cursor-pointer"
                            title="Xóa"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Subtotal, Shipping, Total */}
                <div className="mt-5 space-y-2 border-t border-[#E3DACD] pt-5 text-sm">
                  <div className="flex items-baseline justify-between text-[#706458]">
                    <span>Tạm tính</span>
                    <span className="tabular-nums text-[#140C08] font-medium">
                      {subtotal > 0 ? formatCurrency(subtotal) : "Liên hệ"}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between text-[#706458]">
                    <span>Phí giao hàng</span>
                    <span className="tabular-nums text-[#140C08] font-medium">
                      Miễn phí
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between border-t border-[#E3DACD] pt-4">
                    <span className="text-xs tracking-[0.2em] text-[#706458] uppercase">
                      Tổng cộng
                    </span>
                    <span className="font-display text-2xl text-[#140C08] tabular-nums font-bold">
                      {totalAmount > 0 ? formatCurrency(totalAmount) : "Liên hệ"}
                    </span>
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-[2px] bg-[#241711] px-6 py-4 text-sm font-medium tracking-wide text-white transition hover:bg-[#3A2920] disabled:opacity-60 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn hàng...</span>
                ) : (
                  <span>
                    Đặt hàng · {totalAmount > 0 ? formatCurrency(totalAmount) : "Liên hệ"}
                  </span>
                )}
              </button>

              {/* Secure Trust Badge */}
              <p className="mt-3 flex items-center justify-center gap-2 text-[11px] tracking-[0.16em] text-[#706458] uppercase">
                <ShieldCheck className="size-3.5" />
                Demo thanh toán an toàn
              </p>

            </div>
          </aside>

        </form>

      </div>
    </div>
  );
}
