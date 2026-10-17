"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      id: "hotline",
      name: "Hotline 24/7",
      value: "0903 990 020",
      icon: <Phone size={20} />,
      href: "tel:0903990020",
      color: "hover:bg-[#137333] hover:text-white hover:border-[#137333]",
    },
    {
      id: "zalo",
      name: "Zalo Nghệ nhân",
      value: "Chat ngay",
      icon: <MessageCircle size={20} />,
      href: "https://zalo.me/0903990020",
      color: "hover:bg-[#0068FF] hover:text-white hover:border-[#0068FF]",
    },
    {
      id: "facebook",
      name: "Facebook Fanpage",
      value: "Hiệu Đàn Đức Ngân",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      href: "https://www.facebook.com/dantranhducngan",
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <div
        className={`mb-4 flex flex-col gap-3 transition-all duration-300 origin-bottom ${
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {contactOptions.map((option) => (
          <a
            key={option.id}
            href={option.href}
            target={option.id !== "hotline" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`group flex items-center justify-end gap-3 transition-transform hover:-translate-x-1`}
          >
            <div className="flex flex-col items-end rounded bg-[#FAF8F5]/90 px-3 py-1.5 shadow-sm backdrop-blur-sm border border-[#E3DACD]">
              <span className="text-[10px] uppercase tracking-wider text-[#241711]/50 font-medium">
                {option.name}
              </span>
              <span className="text-sm font-medium text-[#241711]">
                {option.value}
              </span>
            </div>
            <div
              className={`flex size-11 shrink-0 items-center justify-center rounded-full border border-[#B49368]/30 bg-[#FAF8F5] text-[#8C6B3E] shadow-md transition-all duration-300 ${option.color}`}
            >
              {option.icon}
            </div>
          </a>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#B49368] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none"
        aria-label="Liên hệ nhanh"
      >
        {/* Pulse effect */}
        {!isOpen && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#B49368] opacity-60"></span>
        )}
        
        {/* Main button background */}
        <span className="absolute inline-flex size-full rounded-full bg-[#B49368] shadow-inner transition-colors group-hover:bg-[#8C6B3E]"></span>
        
        {/* Icon */}
        <span className="relative z-10 transition-transform duration-300">
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </span>
      </button>
    </div>
  );
}
