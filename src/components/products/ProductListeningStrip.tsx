"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { InstrumentAudio } from "@/types";

interface ProductListeningStripProps {
  audio: InstrumentAudio | null | undefined;
  instrumentName: string;
  variant?: "light" | "walnut" | "terracotta";
  className?: string;
}

function formatAudioTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// 28 acoustic melodic waveform peaks and valleys (rhythmic up-down-up-down pattern)
const WAVEFORM_HEIGHTS = [
  30, 60, 95, 45, 80, 100, 65, 40, 85, 95, 55, 35, 70, 90, 100, 75, 45, 80,
  95, 60, 35, 75, 90, 50, 80, 65, 40, 25,
];

export default function ProductListeningStrip({
  audio,
  instrumentName,
  variant = "light",
  className = "",
}: ProductListeningStripProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);

  // Pause audio on unmount
  useEffect(() => {
    const audioElement = audioRef.current;
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setHasError(true);
          setIsPlaying(false);
        });
    }
  }, [hasError, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !waveformRef.current || duration <= 0) return;
    const rect = waveformRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const seekFraction = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = seekFraction * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration <= 0) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const newTime = Math.max(0, currentTime - 5);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const newTime = Math.min(duration, currentTime + 5);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      togglePlay();
    }
  };

  if (!audio?.src) return null;

  const progressFraction = duration > 0 ? currentTime / duration : 0;
  const currentBarIndex = Math.floor(progressFraction * WAVEFORM_HEIGHTS.length);

  return (
    <div
      className={`w-full transition-all ${
        variant === "terracotta"
          ? "max-w-3xl mx-auto bg-transparent border-0 p-0 shadow-none"
          : variant === "walnut"
          ? "max-w-2xl rounded-[2px] border border-[#453227] bg-[#241711] p-4 sm:p-5 shadow-2xl"
          : "max-w-xl rounded-[3px] border border-[#E3DACD] bg-white p-3.5 sm:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
      } ${className}`}
      role="region"
      aria-label={`Trình nghe thử âm sắc ${instrumentName}`}
    >
      <audio
        ref={audioRef}
        src={audio.src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => setHasError(true)}
      />

      <div className="flex items-center gap-4 sm:gap-5">
        {/* Left: Tactile Cream / Walnut Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          disabled={hasError}
          aria-label={isPlaying ? "Tạm dừng âm sắc" : `Nghe thử âm sắc ${instrumentName}`}
          className={`flex shrink-0 items-center justify-center transition-all disabled:opacity-40 cursor-pointer focus-visible:outline-none ${
            variant === "terracotta"
              ? "h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#FFF8EF] text-[#A95724] hover:bg-[#FAF0E2] hover:scale-105 shadow-md focus-visible:ring-2 focus-visible:ring-[#FFF8EF]"
              : variant === "walnut"
              ? "h-12 w-12 rounded-full bg-[#A68052] text-[#1F1610] hover:bg-[#C5A880] hover:scale-105 shadow-sm focus-visible:ring-1 focus-visible:ring-[#C5A880]"
              : "h-11 w-11 rounded-[3px] bg-[#241711] text-[#E5C398] hover:bg-[#A68052] hover:text-[#1F1610] shadow-xs focus-visible:ring-1 focus-visible:ring-[#A68052]"
          }`}
        >
          {isPlaying ? (
            <Pause size={variant === "terracotta" ? 19 : 17} className="fill-current" />
          ) : (
            <Play size={variant === "terracotta" ? 19 : 17} className="ml-0.5 fill-current" />
          )}
        </button>

        {/* Centre: Title & Rhythmic Up-Down Waveform */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Label, Title & Time Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-widest shrink-0 ${
                  variant === "terracotta"
                    ? "text-[#E7C49A]"
                    : variant === "walnut"
                    ? "text-[#C5A880]"
                    : "text-[#A68052]"
                }`}
              >
                BẢN THU MỘC
              </span>
              <span
                className={`text-xs shrink-0 ${
                  variant === "terracotta"
                    ? "text-[#FFF8EF]/40"
                    : variant === "walnut"
                    ? "text-[#554134]"
                    : "text-[#D9CEBF]"
                }`}
              >
                ·
              </span>
              <span
                className={`font-sans text-xs sm:text-sm truncate ${
                  variant === "terracotta"
                    ? "text-[#FFF8EF] font-medium"
                    : variant === "walnut"
                    ? "text-[#FAF8F5] font-medium"
                    : "text-[#1F1610] font-semibold"
                }`}
              >
                {audio.title || `Âm sắc ${instrumentName}`}
              </span>
            </div>
            {/* Real Playback Time */}
            <div
              className={`shrink-0 font-sans text-xs select-none pl-1 ${
                variant === "terracotta"
                  ? "text-[#FFF8EF]/75"
                  : variant === "walnut"
                  ? "text-[#A89A8A]"
                  : "text-[#706458]"
              }`}
            >
              <span
                className={
                  variant === "terracotta"
                    ? "text-[#FFF8EF] font-semibold"
                    : variant === "walnut"
                    ? "text-[#FAF8F5] font-medium"
                    : "text-[#1F1610] font-semibold"
                }
              >
                {formatAudioTime(currentTime)}
              </span>
              <span
                className={`mx-1 ${
                  variant === "terracotta"
                    ? "text-[#FFF8EF]/40"
                    : variant === "walnut"
                    ? "text-[#554134]"
                    : "text-[#D9CEBF]"
                }`}
              >
                /
              </span>
              <span>{formatAudioTime(duration || 45)}</span>
            </div>
          </div>

          {/* Rhythmic Up-Down Waveform Bars (Seekable & Height Balanced) */}
          <div
            ref={waveformRef}
            onClick={handleSeek}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label="Thanh trượt phát âm thanh dạng sóng"
            aria-valuemin={0}
            aria-valuemax={duration > 0 ? Math.round(duration) : 100}
            aria-valuenow={Math.round(currentTime)}
            className={`group/wave flex items-center justify-between h-9 sm:h-10 w-full cursor-pointer py-1 select-none focus-visible:outline-none focus-visible:ring-1 ${
              variant === "terracotta"
                ? "focus-visible:ring-[#FFF8EF]"
                : variant === "walnut"
                ? "focus-visible:ring-[#C5A880]"
                : "focus-visible:ring-[#A68052]"
            }`}
          >
            {WAVEFORM_HEIGHTS.map((heightPercent, idx) => {
              const isPlayed = idx <= currentBarIndex && duration > 0;
              return (
                <div
                  key={idx}
                  style={{ height: `${Math.max(20, heightPercent)}%` }}
                  className={`flex-1 mx-[1.5px] rounded-full transition-all duration-150 ${
                    isPlayed
                      ? variant === "terracotta"
                        ? "bg-[#FFF8EF]"
                        : variant === "walnut"
                        ? "bg-[#C5A880] group-hover/wave:bg-[#D4BC96]"
                        : "bg-[#A68052] group-hover/wave:bg-[#8C6B3E]"
                      : variant === "terracotta"
                      ? "bg-[#FFF8EF]/25 group-hover/wave:bg-[#FFF8EF]/40"
                      : variant === "walnut"
                      ? "bg-[#453227] group-hover/wave:bg-[#554134]"
                      : "bg-[#E3DACD] group-hover/wave:bg-[#D9CEBF]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
