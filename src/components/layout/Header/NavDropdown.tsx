import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

interface NavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavDropdown({ isOpen, onClose }: NavDropdownProps) {
  return (
    <div
      className={`absolute left-0 top-full pt-2 transition-all duration-150 ${
        isOpen
          ? "pointer-events-auto visible opacity-100 translate-y-0"
          : "pointer-events-none invisible opacity-0 translate-y-1"
      }`}
      role="menu"
      aria-orientation="vertical"
    >
      <div className="w-56 rounded-[2px] border border-[#D8CDBD] bg-[#FFFCF5] py-2 shadow-lg">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/products/${cat.slug}`}
            onClick={onClose}
            className="block px-4 py-2.5 font-sans text-sm text-[#2B241F] transition-colors duration-150 hover:bg-[#F5F0E7] hover:text-[#B58A4A]"
            role="menuitem"
          >
            {cat.name}
          </Link>
        ))}

        <div className="my-1.5 border-t border-[#D8CDBD]/70" />

        <Link
          href="/products"
          onClick={onClose}
          className="flex items-center justify-between px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#B58A4A] transition-colors hover:bg-[#F5F0E7] hover:text-[#9E7438]"
        >
          <span>Xem tất cả nhạc cụ</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
