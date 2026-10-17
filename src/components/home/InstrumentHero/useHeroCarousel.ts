"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { INSTRUMENTS } from "@/data/instruments";
import { Instrument } from "@/types";

export interface StageSlotItem {
  instrument: Instrument;
  baseSlot: number; // -2: far-left, -1: left, 0: center, 1: right, 2: far-right
}

export function useHeroCarousel(isDetailOpen: boolean) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [dragProgress, setDragProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = INSTRUMENTS.length;

  // Settle drag into destination slot (-1: next, +1: prev, 0: spring back)
  const settleDrag = useCallback(
    (target: -1 | 0 | 1) => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);

      setIsDragging(false);
      setIsTransitioning(true);
      setDragProgress(target);

      const duration = target === 0 ? 350 : 450;

      transitionTimerRef.current = setTimeout(() => {
        if (target === -1) {
          setDisplayIndex((prev) => (prev + 1) % total);
        } else if (target === 1) {
          setDisplayIndex((prev) => (prev - 1 + total) % total);
        }
        setDragProgress(0);
        setIsTransitioning(false);
      }, duration);
    },
    [total]
  );

  const updateDrag = useCallback(
    (progress: number) => {
      if (isTransitioning) return;
      setIsDragging(true);
      setDragProgress(progress);
    },
    [isTransitioning]
  );

  const handleNext = useCallback(() => {
    if (isTransitioning || isDragging) return;
    settleDrag(-1);
  }, [isTransitioning, isDragging, settleDrag]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || isDragging) return;
    settleDrag(1);
  }, [isTransitioning, isDragging, settleDrag]);

  const handleSelectDot = useCallback(
    (targetIdx: number) => {
      if (isTransitioning || isDragging || targetIdx === displayIndex) return;
      if (targetIdx > displayIndex) {
        handleNext();
      } else {
        handlePrev();
      }
    },
    [displayIndex, handleNext, handlePrev, isDragging, isTransitioning]
  );

  // Keyboard navigation when detail modal is closed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDetailOpen || isDragging || isTransitioning) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isDetailOpen, isDragging, isTransitioning]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Compute the 5-slot physical render window
  const stageItems: StageSlotItem[] = [
    { instrument: INSTRUMENTS[(displayIndex - 2 + total) % total], baseSlot: -2 },
    { instrument: INSTRUMENTS[(displayIndex - 1 + total) % total], baseSlot: -1 },
    { instrument: INSTRUMENTS[displayIndex], baseSlot: 0 },
    { instrument: INSTRUMENTS[(displayIndex + 1) % total], baseSlot: 1 },
    { instrument: INSTRUMENTS[(displayIndex + 2) % total], baseSlot: 2 },
  ];

  return {
    displayIndex,
    currentInstrument: INSTRUMENTS[displayIndex],
    dragProgress,
    isDragging,
    isTransitioning,
    stageItems,
    handleNext,
    handlePrev,
    handleSelectDot,
    updateDrag,
    settleDrag,
  };
}
