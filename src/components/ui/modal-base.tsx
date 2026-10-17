"use client";

import { useEffect, ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

export type ModalTheme = "dark" | "editorial" | "ivory";
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  theme?: ModalTheme;
  size?: ModalSize;
  maxWidth?: string;
  className?: string;
}

const SIZE_MAP: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  full: "max-w-[95vw]",
};

const emptySubscribe = () => () => {};

export function ModalBase({
  isOpen,
  onClose,
  children,
  theme = "dark",
  size,
  maxWidth,
  className = "",
}: ModalBaseProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Background scroll lock & ESC key listener
  useEffect(() => {
    if (!isOpen) return;

    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen || typeof document === "undefined") {
    return null;
  }

  const backdropBg =
    theme === "dark"
      ? "bg-black/92 sm:bg-[#0D0907]/95 backdrop-blur-md"
      : theme === "editorial"
      ? "bg-[#140C08]/85 backdrop-blur-sm"
      : "bg-[#140C08]/80 backdrop-blur-xs";

  const resolvedMaxWidth = maxWidth || (size ? SIZE_MAP[size] : "max-w-5xl");

  return createPortal(
    <div
      data-lenis-prevent
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8 ${backdropBg} animate-in fade-in duration-200`}
      onClick={onClose}
    >
      <div
        className={`relative w-full ${resolvedMaxWidth} max-h-[90vh] overflow-y-auto outline-none ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default ModalBase;
