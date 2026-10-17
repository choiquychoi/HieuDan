"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, ArrowLeft, Eye, EyeOff, CheckCircle2, Sparkles } from "lucide-react";

export type AuthMode = "login" | "register" | "forgot";

interface AuthViewProps {
  initialMode?: AuthMode;
}

export default function AuthView({ initialMode = "login" }: AuthViewProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);

    // Simulate authentication processing
    setTimeout(() => {
      setIsLoading(false);
      if (mode === "login") {
        setSuccessMessage("Đăng nhập thành công! Đang chuyển hướng...");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      } else if (mode === "register") {
        setSuccessMessage("Tạo tài khoản thành công! Chào mừng bạn gia nhập Hiệu Đàn Đức Ngân.");
        setTimeout(() => {
          setMode("login");
          setSuccessMessage(null);
        }, 1800);
      } else if (mode === "forgot") {
        setSuccessMessage(`Đã gửi liên kết đặt lại mật khẩu tới ${email}. Vui lòng kiểm tra hộp thư!`);
      }
    }, 1000);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Đăng nhập Google thành công!");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }, 800);
  };

  return (
    <main id="main" className="pt-0 min-h-screen bg-[#FAF8F5] text-[#241711] flex flex-col justify-center selection:bg-[#B49368]/20 selection:text-[#241711]">
      <div className="w-full pt-28 pb-16 md:pt-36">
        <div className="mx-auto w-full max-w-md px-6">
          
          {/* Header Card */}
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.28em] text-[#8C6B3E]">
              <Sparkles size={12} className="text-[#B49368]" />
              <span>Đức Ngân</span>
              <Sparkles size={12} className="text-[#B49368]" />
            </div>

            <h1 className="mt-3 font-display text-4xl text-[#140C08] md:text-5xl font-medium tracking-tight">
              {mode === "login" && "Đăng nhập"}
              {mode === "register" && "Tạo tài khoản"}
              {mode === "forgot" && "Khôi phục mật khẩu"}
            </h1>

            <p className="mt-3 text-sm text-[#241711]/65">
              {mode === "login" && "Chào mừng trở lại với không gian di sản Đức Ngân."}
              {mode === "register" && "Gia nhập cộng đồng người yêu nhạc cụ truyền thống Việt."}
              {mode === "forgot" && "Nhập email đã đăng ký để nhận liên kết khôi phục."}
            </p>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mt-6 p-4 rounded-[4px] bg-[#E6F4EA] border border-[#C8E6C9] text-[#137333] text-sm flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 size={18} className="shrink-0 text-[#137333]" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Full Name for Register */}
            {mode === "register" && (
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-widest text-[#241711]/55 font-medium">
                  Họ và tên
                </span>
                <div className="flex items-center gap-3 border-b border-[#E3DACD] px-1 py-3 transition-colors focus-within:border-[#3A2920]">
                  <span className="text-[#241711]/45">
                    <User className="size-4" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#241711]/35 text-[#140C08]"
                  />
                </div>
              </label>
            )}

            {/* Email Field */}
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-widest text-[#241711]/55 font-medium">
                Email
              </span>
              <div className="flex items-center gap-3 border-b border-[#E3DACD] px-1 py-3 transition-colors focus-within:border-[#3A2920]">
                <span className="text-[#241711]/45">
                  <Mail className="size-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="ban@example.com"
                  maxLength={255}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#241711]/35 text-[#140C08]"
                />
              </div>
            </label>

            {/* Phone for Register */}
            {mode === "register" && (
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-widest text-[#241711]/55 font-medium">
                  Số điện thoại
                </span>
                <div className="flex items-center gap-3 border-b border-[#E3DACD] px-1 py-3 transition-colors focus-within:border-[#3A2920]">
                  <span className="text-[#241711]/45">
                    <Phone className="size-4" />
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#241711]/35 text-[#140C08]"
                  />
                </div>
              </label>
            )}

            {/* Password Field (Login & Register) */}
            {mode !== "forgot" && (
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-widest text-[#241711]/55 font-medium">
                  Mật khẩu
                </span>
                <div className="flex items-center gap-3 border-b border-[#E3DACD] px-1 py-3 transition-colors focus-within:border-[#3A2920]">
                  <span className="text-[#241711]/45">
                    <Lock className="size-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    minLength={6}
                    maxLength={72}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#241711]/35 text-[#140C08]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#241711]/40 hover:text-[#241711] transition-colors p-1"
                    title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>
            )}

            {/* Confirm Password for Register */}
            {mode === "register" && (
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-widest text-[#241711]/55 font-medium">
                  Xác nhận mật khẩu
                </span>
                <div className="flex items-center gap-3 border-b border-[#E3DACD] px-1 py-3 transition-colors focus-within:border-[#3A2920]">
                  <span className="text-[#241711]/45">
                    <Lock className="size-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    minLength={6}
                    maxLength={72}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#241711]/35 text-[#140C08]"
                  />
                </div>
              </label>
            )}

            {/* Forgot password link */}
            {mode === "login" && (
              <div className="text-right pt-1">
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-xs text-[#241711]/60 underline-offset-4 hover:text-[#3A2920] hover:underline transition-colors"
                >
                  Quên mật khẩu?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#3A2920] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#140C08] disabled:opacity-60 cursor-pointer shadow-xs active:scale-[0.99] mt-6"
            >
              {isLoading ? (
                <span className="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : mode === "login" ? (
                "Đăng nhập"
              ) : mode === "register" ? (
                "Tạo tài khoản"
              ) : (
                "Gửi liên kết khôi phục"
              )}
            </button>
          </form>

          {/* Divider */}
          {mode !== "forgot" && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E3DACD]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#FAF8F5] px-3 text-xs uppercase tracking-widest text-[#241711]/45">
                    hoặc
                  </span>
                </div>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-[2px] border border-[#3A2920]/30 bg-transparent px-6 py-3 text-sm font-medium text-[#241711] transition-all hover:bg-[#3A2920] hover:text-white disabled:opacity-60 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12S6.7 21.6 12 21.6c6.9 0 11.5-4.8 11.5-11.6 0-.8-.1-1.4-.2-1.9H12z"
                  />
                </svg>
                <span>Tiếp tục với Google</span>
              </button>
            </>
          )}

          {/* Mode Switcher */}
          <div className="mt-8 text-center text-sm text-[#241711]/65">
            {mode === "login" ? (
              <>
                Chưa có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-[#8C6B3E] font-medium hover:underline hover:text-[#3A2920] transition-colors"
                >
                  Đăng ký ngay
                </button>
              </>
            ) : mode === "register" ? (
              <>
                Đã có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-[#8C6B3E] font-medium hover:underline hover:text-[#3A2920] transition-colors"
                >
                  Đăng nhập
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-[#8C6B3E] font-medium hover:underline hover:text-[#3A2920] transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft size={14} /> Quay lại đăng nhập
              </button>
            )}
          </div>

          {/* Back to Home Link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-xs text-[#241711]/50 hover:text-[#3A2920] transition-colors inline-flex items-center gap-1"
            >
              ← Về trang chủ
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
