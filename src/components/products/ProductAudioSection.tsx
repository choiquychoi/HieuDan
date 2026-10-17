"use client";

import React from "react";
import { Product, Instrument } from "@/types";
import ProductListeningStrip from "./ProductListeningStrip";

interface ProductAudioSectionProps {
  product: Product;
  instrument?: Instrument | null;
}

export default function ProductAudioSection({
  product,
  instrument,
}: ProductAudioSectionProps) {
  // Resolve authentic audio source
  const audioData =
    instrument?.audio ||
    (product.categoryId === "dan-ty-ba"
      ? {
          src: "/audio/dan_ty_ba.mp3",
          title: "Âm sắc Đàn Tỳ Bà — Tứ huyền giao hưởng",
          duration: "0:45",
        }
      : null);

  // If no recording exists for this instrument, do not display the section
  if (!audioData?.src) {
    return null;
  }

  return (
    <section
      id="thuong-am"
      aria-label={`Không gian thưởng âm sắc ${product.name}`}
      className="relative w-full overflow-hidden bg-[#A95724] py-14 sm:py-16 lg:py-20 text-[#FFF8EF]"
    >
      {/* Subtle Environmental Tonal Variation: Warm Lacquer Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgba(186,97,42,0.3)_0%,rgba(169,87,36,0)_80%)]"
        aria-hidden="true"
      />

      {/* Centered Curatorial Listening Chapter Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        {/* Instrument Title with Real Alternate Name if exists in data */}
        <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-[#FFF8EF] sm:mt-4 sm:text-4xl lg:text-5xl">
          {product.name}
          {instrument?.alternateName && (
            <span className="block font-serif text-2xl font-normal italic text-[#E7C49A] sm:ml-3 sm:inline sm:text-3xl lg:text-4xl">
              ({instrument.alternateName})
            </span>
          )}
        </h2>

        {/* Poetic Sound Description from authentic instrument data */}
        {instrument?.soundDescription && (
          <p className="mt-3 max-w-xl text-center font-sans text-sm leading-relaxed text-[#FFF8EF]/85 sm:mt-4 sm:text-base">
            {instrument.soundDescription}
          </p>
        )}

        {/* Integrated Audio Console: Seamlessly sits on the Terracotta Canvas */}
        <div className="mt-8 flex w-full justify-center sm:mt-10">
          <ProductListeningStrip
            audio={audioData}
            instrumentName={product.name}
            variant="terracotta"
          />
        </div>
      </div>
    </section>
  );
}
