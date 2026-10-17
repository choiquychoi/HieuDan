"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { SHOWROOM_INFO } from "@/data/navigation";
import Footer from "@/components/layout/Footer/Footer";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 400);
  };

  // Official Google Maps place link for Hiệu Đàn Đức Ngân (matching Showroom.tsx)
  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Hi%E1%BB%87u+%C4%90%C3%A0n+%C4%90%E1%BB%A9c+Ng%C3%A2n+526+%C4%90i%E1%BB%87n+Bi%C3%AAn+Ph%E1%BB%A7";

  // Official embed URL provided directly for Hiệu Đàn Đức Ngân (matching Showroom.tsx)
  const officialMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8776465468188!2d106.67754796958994!3d10.772151316808397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f20ee3d384d%3A0xffc91ea52bb33dd2!2zSGnhu4d1IMSQw6BuIMSQ4bupYyBOZ8Oibg!5e0!3m2!1svi!2s!4v1787124408332!5m2!1svi!2s";

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1610]">
      <main className="pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16">
        <div className="mx-auto w-full max-w-[1360px] px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* 02. Soft Aesthetic Intro */}
          <div className="border-b border-[#E3DACD]/80 pb-4 sm:pb-6">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-wide text-[#1F1610]">
              LIÊN HỆ
            </h1>
            <p className="mt-1.5 font-sans text-sm sm:text-base text-[#706458] font-light leading-relaxed">
              Đồng hành cùng quý khách trong từng thanh âm mộc mạc.
            </p>
          </div>

          {/* 03. Main 2-Column Section: Form (Left) & Showroom with Map (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
            
            {/* LEFT COLUMN: Message Form (Side-by-side Name & Email) */}
            <div className="lg:col-span-7 rounded-lg border border-[#E3DACD] bg-white/95 p-5 sm:p-7 lg:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] backdrop-blur-xs">
              <div className="mb-5 pb-3 border-b border-[#E3DACD]/60">
                <h2 className="font-display text-xl sm:text-2xl font-normal text-[#1F1610]">
                  Gửi tin nhắn trực tiếp
                </h2>
                <p className="mt-1 font-sans text-xs sm:text-sm text-[#706458] font-light">
                  Điền thông tin bên dưới, nghệ nhân Đức Ngân sẽ phản hồi quý khách sớm nhất.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name & Email Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block font-sans text-xs sm:text-[13px] font-medium uppercase tracking-[0.12em] text-[#574F46] mb-1.5"
                    >
                      Họ và tên <span className="text-[#A68052]">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-md border border-[#D9CEBF] bg-[#FAF8F5]/60 px-3.5 py-2.5 font-sans text-sm text-[#1F1610] placeholder:text-[#9C8F82]/60 focus:border-[#A68052] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A68052]/15 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-sans text-xs sm:text-[13px] font-medium uppercase tracking-[0.12em] text-[#574F46] mb-1.5"
                    >
                      Email <span className="text-[#A68052]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full rounded-md border border-[#D9CEBF] bg-[#FAF8F5]/60 px-3.5 py-2.5 font-sans text-sm text-[#1F1610] placeholder:text-[#9C8F82]/60 focus:border-[#A68052] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A68052]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block font-sans text-xs sm:text-[13px] font-medium uppercase tracking-[0.12em] text-[#574F46] mb-1.5"
                  >
                    Chủ đề
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Tư vấn chọn đàn / Căn chỉnh âm sắc / Khác..."
                    className="w-full rounded-md border border-[#D9CEBF] bg-[#FAF8F5]/60 px-3.5 py-2.5 font-sans text-sm text-[#1F1610] placeholder:text-[#9C8F82]/60 focus:border-[#A68052] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A68052]/15 transition-all"
                  />
                </div>

                {/* Row 3: Message Content */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-sans text-xs sm:text-[13px] font-medium uppercase tracking-[0.12em] text-[#574F46] mb-1.5"
                  >
                    Nội dung <span className="text-[#A68052]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Quý khách vui lòng chia sẻ nhu cầu chi tiết..."
                    className="w-full rounded-md border border-[#D9CEBF] bg-[#FAF8F5]/60 px-3.5 py-2.5 font-sans text-sm text-[#1F1610] placeholder:text-[#9C8F82]/60 focus:border-[#A68052] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A68052]/15 transition-all resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[46px] px-8 rounded-md bg-[#241711] font-sans text-xs font-semibold uppercase tracking-widest text-[#E5C398] hover:bg-[#A68052] hover:text-[#1F1610] transition-all duration-300 cursor-pointer disabled:opacity-50 shadow-xs active:scale-[0.99]"
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                  </button>
                </div>

                {/* Success Feedback */}
                {isSubmitted && (
                  <div className="flex items-center gap-2 p-3.5 rounded-md border border-[#A68052]/40 bg-[#FAF8F5] font-sans text-xs sm:text-sm text-[#2B241F] animate-in fade-in duration-300">
                    <CheckCircle2 size={16} className="text-[#A68052] shrink-0" />
                    <span>Tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm nhất qua email.</span>
                  </div>
                )}
              </form>
            </div>

            {/* RIGHT COLUMN: Showroom Info (with Soft Icons) + Integrated Map */}
            <div className="lg:col-span-5 rounded-lg border border-[#E3DACD] bg-white/95 p-5 sm:p-7 lg:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-6">
              
              {/* Showroom Header */}
              <div>
                <div className="mb-4 pb-3 border-b border-[#E3DACD]/60">
                  <span className="block font-sans text-[11px] font-bold uppercase tracking-widest text-[#A68052] mb-0.5">
                    Showroom
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-normal text-[#1F1610]">
                    Đức Ngân TP. Hồ Chí Minh
                  </h2>
                </div>

                {/* Info List with Clean Icons */}
                <div className="space-y-3.5 font-sans text-xs sm:text-sm text-[#2B241F]">
                  
                  {/* Address */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5] text-[#A68052] border border-[#E3DACD]/70">
                      <MapPin size={14} />
                    </div>
                    <div className="leading-snug">
                      <p className="font-medium text-[#1F1610]">
                        {SHOWROOM_INFO.address}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5] text-[#A68052] border border-[#E3DACD]/70">
                      <Clock size={14} />
                    </div>
                    <div className="leading-snug">
                      <p className="font-medium text-[#1F1610]">
                        {SHOWROOM_INFO.workingHours}
                      </p>
                    </div>
                  </div>

                  {/* Hotline */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A68052]/15 text-[#A68052] border border-[#A68052]/30">
                      <Phone size={14} />
                    </div>
                    <div className="leading-snug">
                      <a
                        href={`tel:${SHOWROOM_INFO.hotline.replace(/\s+/g, "")}`}
                        className="font-semibold text-sm sm:text-base text-[#A68052] hover:text-[#1F1610] transition-colors"
                      >
                        Hotline: {SHOWROOM_INFO.hotline}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5] text-[#A68052] border border-[#E3DACD]/70">
                      <Mail size={14} />
                    </div>
                    <div className="leading-snug">
                      <a
                        href={`mailto:${SHOWROOM_INFO.email}`}
                        className="font-medium text-[#1F1610] hover:text-[#A68052] transition-colors"
                      >
                        {SHOWROOM_INFO.email}
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Integrated Google Map inside the Showroom Column */}
              <div className="pt-3 border-t border-[#E3DACD]/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-medium text-[#706458]">
                    Bản đồ vị trí
                  </span>
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#A68052] hover:text-[#1F1610] transition-colors"
                  >
                    <span>Mở Google Maps</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                <div className="w-full h-[190px] sm:h-[210px] bg-[#FAF8F5] rounded-md overflow-hidden border border-[#D9CEBF]">
                  <iframe
                    src={officialMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bản đồ vị trí Showroom Hiệu Đàn Đức Ngân"
                    className="w-full h-full"
                    data-lenis-prevent
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* 04. Global Footer */}
      <Footer />
    </div>
  );
}
