"use client";

import React, { useRef, useState, useEffect } from "react";

interface AutoScrollTitleProps {
  text: string;
  className?: string;
  as?: "h3" | "h2" | "p" | "span" | "div";
}

/**
 * AutoScrollTitle - Industry-Standard Hover Auto-Scroll Title Component
 *
 * Designed to solve the classic e-commerce truncation vs layout shift dilemma:
 * 1. Desktop: Single line with silky-smooth auto-scroll when card is hovered.
 *    - Pauses 0.5s at start so user can recognize beginning of title.
 *    - Slides at ~40px/s (natural human reading velocity).
 *    - Smooth 0.4s ease-out return on unhover (zero snapping).
 *    - Short titles stay 100% stationary (zero false-positive movement).
 *    - Soft right-edge gradient mask so text never cuts off abruptly.
 * 2. Mobile (Touch devices): Gracefully falls back to 2-line wrapped clamp
 *    with uniform height, ensuring 100% legibility on touch screens where hover is unavailable.
 * 3. Accessibility: Full native title tooltip, screen reader safe, prefers-reduced-motion compliant.
 */
export default function AutoScrollTitle({
  text,
  className = "",
  as: Tag = "h3",
}: AutoScrollTitleProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const primaryRef = useRef<HTMLSpanElement>(null);
  const duplicateRef = useRef<HTMLSpanElement>(null);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const [cycleDistance, setCycleDistance] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    const container = containerRef.current;
    const primary = primaryRef.current;
    if (!container || !primary) return;

    const measure = () => {
      if (!isMounted) return;

      // Check if text exceeds container width in single-line mode
      const clientWidth = container.clientWidth;
      const primaryWidth = primary.scrollWidth;

      if (primaryWidth > clientWidth + 3) {
        setHasOverflow(true);
        // Measure exact subpixel distance from primary text start to duplicate text start
        if (duplicateRef.current && primaryRef.current) {
          const primaryLeft = primaryRef.current.getBoundingClientRect().left;
          const duplicateLeft = duplicateRef.current.getBoundingClientRect().left;
          const exactDist = duplicateLeft - primaryLeft;
          if (exactDist > 0) {
            setCycleDistance(exactDist);
            return;
          }
        }
        // Fallback default: primaryWidth + spacer (~40px)
        setCycleDistance(primaryWidth + 40);
      } else {
        setHasOverflow(false);
        setCycleDistance(0);
      }
    };

    // Measure on mount
    measure();

    // Re-measure when web fonts finish loading to prevent layout drift
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (isMounted) measure();
      });
    }

    // Re-measure on window resize or card layout shifts
    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(container);
    resizeObserver.observe(primary);

    return () => {
      isMounted = false;
      resizeObserver.disconnect();
    };
  }, [text, hasOverflow]);

  // Calculate dynamic duration based on cycle distance (approx 38px per second)
  // Ensures steady, comfortable reading speed for Vietnamese titles
  const duration = Math.max(2.6, Math.min(8.5, cycleDistance / 38));

  return (
    <Tag
      className={`auto-scroll-wrapper relative block ${className}`}
      title={text}
    >
      <span
        ref={containerRef}
        className={`auto-scroll-container block max-w-full ${
          hasOverflow ? "auto-scroll-has-overflow" : ""
        }`}
        style={
          hasOverflow && cycleDistance > 0
            ? ({
                "--cycle-dist": `-${cycleDistance}px`,
                "--cycle-dur": `${duration}s`,
              } as React.CSSProperties)
            : undefined
        }
      >
        <span
          className={`auto-scroll-track ${
            hasOverflow ? "auto-scroll-track-active" : ""
          }`}
        >
          <span
            ref={primaryRef}
            className="auto-scroll-primary auto-scroll-mobile-wrap"
          >
            {text}
          </span>
          {hasOverflow && (
            <>
              <span
                className="auto-scroll-spacer items-center px-4 text-[#8C6B3E]/60 select-none text-xs"
                aria-hidden="true"
              >
                ·
              </span>
              <span
                ref={duplicateRef}
                className="auto-scroll-duplicate"
                aria-hidden="true"
              >
                {text}
              </span>
            </>
          )}
        </span>
      </span>
    </Tag>
  );
}
