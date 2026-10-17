"use client";

import { useSyncExternalStore, useCallback } from "react";

interface LanguageSwitcherProps {
  isDarkTheme?: boolean;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("ducngan_lang_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("ducngan_lang_change", callback);
  };
}

function getSnapshot(): "vi" | "en" {
  if (typeof window === "undefined") return "vi";
  try {
    const stored = localStorage.getItem("ducngan_lang");
    return stored === "en" ? "en" : "vi";
  } catch {
    return "vi";
  }
}

function getServerSnapshot(): "vi" | "en" {
  return "vi";
}

export default function LanguageSwitcher({ isDarkTheme = false }: LanguageSwitcherProps) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleSelect = useCallback((selectedLang: "vi" | "en") => {
    try {
      localStorage.setItem("ducngan_lang", selectedLang);
      window.dispatchEvent(new Event("ducngan_lang_change"));
    } catch {
      // Ignore localStorage write errors
    }
  }, []);

  return (
    <div
      role="group"
      aria-label="Language"
      className={`ml-1 items-center gap-0.5 rounded-[2px] border p-0.5 text-[11px] font-medium tracking-[0.16em] uppercase backdrop-blur-sm hidden lg:flex transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isDarkTheme
          ? "border-[#B49368]/45 bg-[#3E1F10]/70 text-[#D8CDBD]"
          : "border-[#E3DACD]/70 bg-white/40 text-[#241711]"
      }`}
    >
      {/* VI Button */}
      <button
        type="button"
        aria-pressed={lang === "vi"}
        onClick={() => handleSelect("vi")}
        className={`grid h-7 min-w-[30px] place-items-center rounded-[2px] px-2 transition-all cursor-pointer ${
          lang === "vi"
            ? isDarkTheme
              ? "bg-[#B49368] text-white font-semibold shadow-xs"
              : "bg-[#3A2920] text-white font-semibold shadow-xs"
            : isDarkTheme
            ? "text-[#D8CDBD]/70 hover:text-white"
            : "text-[#241711]/60 hover:text-[#140C08]"
        }`}
      >
        vi
      </button>

      {/* EN Button */}
      <button
        type="button"
        aria-pressed={lang === "en"}
        onClick={() => handleSelect("en")}
        className={`grid h-7 min-w-[30px] place-items-center rounded-[2px] px-2 transition-all cursor-pointer ${
          lang === "en"
            ? isDarkTheme
              ? "bg-[#B49368] text-white font-semibold shadow-xs"
              : "bg-[#3A2920] text-white font-semibold shadow-xs"
            : isDarkTheme
            ? "text-[#D8CDBD]/70 hover:text-white"
            : "text-[#241711]/60 hover:text-[#140C08]"
        }`}
      >
        en
      </button>
    </div>
  );
}
