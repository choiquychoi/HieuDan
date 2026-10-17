import React from "react";

interface CornerOrnamentProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "strings" | "pearl-inlay" | "instrument-curve";
  theme?: "ivory" | "walnut";
  className?: string;
}

export default function CornerOrnament({
  position = "top-left",
  variant = "pearl-inlay",
  theme = "ivory",
  className = "",
}: CornerOrnamentProps) {
  const isWalnut = theme === "walnut";
  const strokeColor = isWalnut ? "#C5A880" : "#B49368";
  const opacity = isWalnut ? "opacity-25" : "opacity-30";

  // Position CSS classes
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-[-1]",
  }[position];

  return (
    <div
      className={`pointer-events-none absolute select-none ${positionClasses} ${opacity} ${className}`}
      aria-hidden="true"
    >
      {variant === "pearl-inlay" && (
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 sm:w-18 sm:h-18"
        >
          {/* Outer Corner Frame */}
          <path
            d="M1 48V1H48"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          {/* Inner Corner Frame */}
          <path
            d="M6 36V6H36"
            stroke={strokeColor}
            strokeWidth="0.75"
          />
          {/* Mother-of-pearl Diamond Inlay Motif */}
          <polygon
            points="14,10 18,14 14,18 10,14"
            stroke={strokeColor}
            strokeWidth="0.75"
            fill="none"
          />
          <circle cx="14" cy="14" r="1" fill={strokeColor} />
          {/* Delicate corner string line */}
          <line x1="6" y1="6" x2="26" y2="26" stroke={strokeColor} strokeWidth="0.5" />
        </svg>
      )}

      {variant === "strings" && (
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 sm:w-20 sm:h-20"
        >
          {/* Acoustic String Parallel Arcs */}
          <path d="M0 20C30 20 60 50 60 80" stroke={strokeColor} strokeWidth="0.6" strokeOpacity="0.8" />
          <path d="M0 12C36 12 68 44 68 80" stroke={strokeColor} strokeWidth="0.7" strokeOpacity="0.9" />
          <path d="M0 4C42 4 76 38 76 80" stroke={strokeColor} strokeWidth="0.8" />
          {/* Micro Pearl Accent */}
          <circle cx="28" cy="28" r="1.2" fill={strokeColor} />
        </svg>
      )}

      {variant === "instrument-curve" && (
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 sm:w-16 sm:h-16"
        >
          {/* Traditional Headstock Curve Motif */}
          <path
            d="M2 50C2 24 24 2 50 2"
            stroke={strokeColor}
            strokeWidth="0.8"
          />
          <path
            d="M8 42C8 24 24 8 42 8"
            stroke={strokeColor}
            strokeWidth="0.5"
            strokeDasharray="1.5 1.5"
          />
          <circle cx="26" cy="26" r="1.5" stroke={strokeColor} strokeWidth="0.75" />
        </svg>
      )}
    </div>
  );
}
