"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface PageTransitionProviderProps {
  children: React.ReactNode;
}

export default function PageTransitionProvider({
  children,
}: PageTransitionProviderProps) {
  const pathname = usePathname();

  // Scroll to top instantly on route change unless navigating to a hash anchor
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return (
    <>
      {/* Top Gold Progress Beam on Page Switch */}
      <div key={`beam-${pathname}`} className="route-progress-indicator" aria-hidden="true" />

      {/* Main Content Unrolling Animation */}
      <div key={`page-${pathname}`} className="page-transition-enter min-h-full w-full">
        {children}
      </div>
    </>
  );
}
