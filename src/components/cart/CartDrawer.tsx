"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import ModalPortal from "@/components/ui/ModalPortal";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalCount,
  } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <ModalPortal>
      <div
        className={`fixed inset-0 z-[100] transition-visibility duration-300 ${
          isCartOpen ? "visible" : "invisible pointer-events-none delay-300"
        }`}
      aria-labelledby="cart-drawer-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-[#2B241F]/40 backdrop-blur-xs transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-over Panel */}
      <div
        ref={drawerRef}
        data-lenis-prevent
        className={`fixed inset-y-0 right-0 flex w-full max-w-md flex-col bg-[#FFFCF5] shadow-2xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#D8CDBD] px-6 py-5 bg-[#F5F0E7]/60">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="text-[#B58A4A]" size={20} />
            <h2
              id="cart-drawer-title"
              className="font-display text-xl font-semibold text-[#2B241F]"
            >
              Giỏ hàng của bạn
            </h2>
            <span className="rounded-full bg-[#B58A4A]/15 px-2 py-0.5 font-sans text-xs font-semibold text-[#B58A4A]">
              {totalCount}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="rounded-[2px] p-1.5 text-[#7D746A] transition-colors hover:bg-[#D8CDBD]/40 hover:text-[#2B241F]"
            aria-label="Đóng giỏ hàng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List or Empty State */}
        <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F0E7] text-[#7D746A]">
                <ShoppingBag size={30} strokeWidth={1.5} />
              </div>
              <p className="mt-4 font-display text-xl font-medium text-[#2B241F]">
                Giỏ hàng còn trống
              </p>
              <p className="mt-1.5 max-w-xs font-sans text-xs text-[#7D746A]">
                Khám phá các dòng nhạc cụ dân tộc chế tác thủ công bởi các nghệ nhân Đức Ngân.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 rounded-[2px] bg-[#B58A4A] px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#9E7438]"
              >
                <span>Xem danh mục nhạc cụ</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#D8CDBD]/40">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 py-4">
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[2px] border border-[#D8CDBD] bg-[#F5F0E7]">
                    <Image
                      src={product.thumbnail || "/images/hero/hero-03.jpg"}
                      alt={product.name}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>

                  {/* Info & Actions */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#9E7A4A]">
                            {product.categoryName}
                          </span>
                          <h3 className="font-display text-sm font-semibold text-[#2B241F] line-clamp-2">
                            {product.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#7D746A] transition-colors hover:text-[#9E4D45]"
                          aria-label={`Xóa ${product.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity Controller */}
                      <div className="flex items-center rounded-[2px] border border-[#D8CDBD] bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center text-[#7D746A] transition-colors hover:bg-[#F5F0E7] hover:text-[#2B241F]"
                          aria-label="Giảm số lượng"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-sans text-xs font-semibold text-[#2B241F]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center text-[#7D746A] transition-colors hover:bg-[#F5F0E7] hover:text-[#2B241F]"
                          aria-label="Tăng số lượng"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-sans text-xs font-semibold text-[#B58A4A]">
                        {formatCurrency(product.price ? product.price * quantity : null)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer (if items present) */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#D8CDBD] bg-[#F5F0E7]/60 p-6">
            {/* Guarantees Note */}
            <div className="mb-4 flex items-center gap-2 rounded-[2px] border border-[#B58A4A]/20 bg-[#B58A4A]/10 px-3 py-2 font-sans text-[11px] text-[#574F46]">
              <ShieldCheck size={16} className="shrink-0 text-[#B58A4A]" />
              <span>Đóng thùng gỗ chuyên dụng & bảo dưỡng tận tâm.</span>
            </div>

            {/* Subtotal */}
            <div className="mb-4 flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-wider text-[#7D746A]">
                Tạm tính ({totalCount} sản phẩm)
              </span>
              <span className="font-display text-xl font-bold text-[#2B241F]">
                {subtotal > 0 ? formatCurrency(subtotal) : "Liên hệ"}
              </span>
            </div>

            {/* Checkout / Action Button */}
            <div className="flex flex-col gap-2.5">
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#B58A4A] py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#9E7438]"
              >
                <span>Tiến hành đặt hàng &amp; Thanh toán</span>
                <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="w-full text-center font-sans text-xs text-[#7D746A] underline underline-offset-4 transition-colors hover:text-[#2B241F]"
              >
                Tiếp tục xem nhạc cụ khác
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </ModalPortal>
);
}
