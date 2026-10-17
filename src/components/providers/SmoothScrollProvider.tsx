"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Phát hiện click vào vùng native scrollbar dựa trên vị trí X của chuột.
 * scrollbarWidth = window.innerWidth (có scrollbar) - clientWidth (không có scrollbar).
 * Nếu = 0 (macOS auto-hide, overflow hidden) → bỏ qua, không cần xử lý.
 */
function isScrollbarArea(e: MouseEvent): boolean {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth <= 0) return false;
  return e.clientX >= document.documentElement.clientWidth;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Completely disable Lenis inertia on /chinh-sach for native 1:1 crisp scrolling (stops immediately)
    if (pathname === "/chinh-sach" || prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        if (typeof window !== "undefined") {
          window.__lenis = undefined;
        }
      }
      return;
    }

    // Initialize Lenis for other routes with luxury gliding feel
    if (!lenisRef.current) {
      const lenis = new Lenis({
        lerp: 0.062,              // Tăng nhẹ từ 0.062 → animation ~2s, vẫn mượt mà
        wheelMultiplier: 1.1,
        touchMultiplier: 1.1,
        infinite: false,
        autoRaf: true,
        gestureOrientation: "vertical",
        syncTouch: false,         // Touch dùng native momentum scroll, không lerp
      });

      lenisRef.current = lenis;
      if (typeof window !== "undefined") {
        window.__lenis = lenis;
      }
    }

    // Observe body overflow: hidden locks (Cart Drawer, QuickView Modal, Mobile Menu)
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") {
        lenisRef.current?.stop();
      } else {
        lenisRef.current?.start();
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    // ─── Scrollbar drag: sync Lenis state (không dùng stop/start) ─────────────
    //
    // Vấn đề: Khi user kéo native scrollbar trong khi Lenis đang lerp,
    //   Lenis tiếp tục override window.scrollY về targetScroll cũ → giật/snap loạn.
    //
    // Giải pháp: Trong khi kéo scrollbar, liên tục sync Lenis về vị trí thực tế
    //   qua scrollTo({immediate:true}) → Lenis state luôn khớp native scroll.
    //   Lenis KHÔNG bao giờ bị stop() → tránh state desync hoàn toàn.
    // ──────────────────────────────────────────────────────────────────────────
    let isDraggingScrollbar = false;

    const handleMouseDown = (e: MouseEvent) => {
      if (!isScrollbarArea(e)) return;
      isDraggingScrollbar = true;
    };

    // Trong khi kéo scrollbar: sync Lenis về vị trí thực tế, không lerp
    const handleScrollbarSync = () => {
      if (!isDraggingScrollbar) return;
      lenisRef.current?.scrollTo(window.scrollY, {
        immediate: true, // không lerp, nhảy tức thì → Lenis state = native scroll
        force: true,     // bắt buộc sync dù target = current
      });
    };

    const handleMouseUp = () => {
      isDraggingScrollbar = false;
      // KHÔNG gọi stop() hay start() — Lenis state đã đúng nhờ handleScrollbarSync
    };

    window.addEventListener("mousedown", handleMouseDown);
    // passive: true = không block paint thread (không cần preventDefault trong scroll)
    window.addEventListener("scroll", handleScrollbarSync, { passive: true });
    window.addEventListener("mouseup", handleMouseUp);
    // ──────────────────────────────────────────────────────────────────────────

    return () => {
      observer.disconnect();
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("scroll", handleScrollbarSync);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pathname]);

  // Clean up Lenis entirely on unmount
  useEffect(() => {
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        if (typeof window !== "undefined") {
          window.__lenis = undefined;
        }
      }
    };
  }, []);

  // Hard-reset scroll to top (0, 0) on route change unless navigating to a hash anchor
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return <>{children}</>;
}
