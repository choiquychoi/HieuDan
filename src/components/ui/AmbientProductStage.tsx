import React from "react";
import Image from "next/image";

interface AmbientProductStageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  paddingClass?: string;
  sizes?: string;
  children?: React.ReactNode;
}

export default function AmbientProductStage({
  src,
  alt,
  aspectClass = "aspect-[4/5]",
  paddingClass = "p-4 sm:p-6",
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  children
}: AmbientProductStageProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-none bg-transparent border border-transparent flex items-center justify-center transition-colors duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[rgba(166,128,82,0.25)] ${aspectClass}`}>
      {/* Soft Radial Ambient Field (Gallery Light) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_58%,rgba(229,195,152,0.45)_0%,rgba(229,195,152,0.15)_40%,rgba(229,195,152,0)_75%)] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.15]" />

      {/* Blurred Grounding Shadow */}
      <div className="absolute bottom-[10%] w-[60%] sm:w-[50%] h-[12px] sm:h-[16px] bg-[rgba(91,58,35,0.08)] sm:bg-[rgba(91,58,35,0.12)] blur-[12px] sm:blur-[20px] rounded-[50%] transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 opacity-70" />

      {/* Foreground Product Image */}
      <div className={`relative z-10 h-full w-full flex items-center justify-center ${paddingClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="h-full w-full object-contain transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.89]"
        />
      </div>
      
      {/* Optional overlay elements like Quick View button */}
      {children}
    </div>
  );
}
