"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { InstrumentAudio } from "@/types";

interface InstrumentAudioPlayerProps {
  audio?: InstrumentAudio | null;
  instrumentName: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function InstrumentAudioPlayer({
  audio,
  instrumentName,
}: InstrumentAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reset audio state when audio changes or unmounts
  useEffect(() => {
    const audioElement = audioRef.current;
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, [audio?.src]);

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

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  }, []);

  // If no audio or failed to load, show refined empty state
  if (!audio || !audio.src || hasError) {
    return (
      <div className="rounded-2xl border border-[#3A2920] bg-[#140C08]/90 p-5 sm:p-6 backdrop-blur-md">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#B49368]/40 bg-[#241711] text-[#B49368] shadow-inner">
            <Music size={20} />
          </div>
          <div>
            <h4 className="font-sans text-base sm:text-lg font-semibold text-[#FFFCF5]">
              Bản thu âm đang được hoàn thiện tại xưởng
            </h4>
            <p className="mt-1.5 font-sans text-sm text-[#D8CDBD]/85 leading-relaxed">
              Nghệ nhân Đức Ngân đang thực hiện bản thu âm thẩm âm mộc độc bản cho {instrumentName}. Quý khách vui lòng ghé trực tiếp Showroom 526 Điện Biên Phủ để trải nghiệm âm sắc trực tiếp.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="rounded-2xl border border-[#3A2920] bg-[#140C08]/95 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* Hidden native audio tag */}
      <audio
        ref={audioRef}
        src={audio.src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => setHasError(true)}
      />

      <div className="flex flex-col gap-4">
        {/* Track Status & Duration */}
        <div className="flex items-center justify-between text-xs font-sans text-[#E5C398]/80">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#B49368] animate-pulse shrink-0" />
            <span className="font-medium tracking-wide">
              {isPlaying ? "Đang phát âm thanh mộc" : "Thử nghiệm âm sắc"}
            </span>
          </div>
          <span className="font-mono text-[#D8CDBD]/60">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Player Controls & Seek Bar */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Large Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Tạm dừng phát âm thanh" : "Phát âm thanh mẫu"}
            className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#B49368] text-[#180F0B] shadow-lg transition-all duration-300 hover:bg-[#C5A880] hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
          </button>

          {/* Progress Seek Bar */}
          <div className="flex flex-1 flex-col gap-1.5 min-w-0">
            <div className="relative flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Tua thời gian âm thanh"
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#241711] accent-[#B49368] transition-all focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #B49368 ${progressPercent}%, #241711 ${progressPercent}%)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#D8CDBD]/80 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration) || audio.duration || "0:45"}</span>
            </div>
          </div>

          {/* Mute/Unmute Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Bật âm thanh" : "Tắt tiếng"}
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-[#3A2920] bg-[#180F0B] text-[#D8CDBD] transition-colors hover:border-[#B49368] hover:text-[#FFFCF5] cursor-pointer"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
