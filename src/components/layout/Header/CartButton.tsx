"use client";

import { useSyncExternalStore } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

interface CartButtonProps {
  className?: string;
  isDarkTheme?: boolean;
}

export default function CartButton({
  className = "",
  isDarkTheme = true,
}: CartButtonProps) {
  const { totalCount, openCart } = useCart();
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  const count = mounted ? totalCount : 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={mounted && totalCount > 0 ? `Mở giỏ hàng (${totalCount} sản phẩm)` : "Mở giỏ hàng"}
      className={`group relative flex items-center justify-center rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B49368] cursor-pointer ${
        isDarkTheme
          ? "h-11 w-11 border border-[#554134] bg-[#241711]/90 text-[#D8CDBD] hover:border-[#B49368] hover:text-[#E5C398]"
          : "h-9.5 w-9.5 sm:h-10 sm:w-10 border border-[#D8CDBD] bg-white/90 text-[#4A3F35] hover:border-[#B49368] hover:text-[#1F1610] shadow-xs"
      } ${className}`}
    >
      <ShoppingBag
        size={isDarkTheme ? 19 : 17.5}
        strokeWidth={1.75}
        className="transition-transform duration-200 group-hover:scale-110"
      />
      {mounted && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#B49368] px-1 font-sans text-[11px] font-bold text-[#241711] shadow-xs animate-fade-in">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
