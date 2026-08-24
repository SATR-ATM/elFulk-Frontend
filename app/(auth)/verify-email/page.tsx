"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useResendTimer } from "@/lib/hooks/useResendTimer";
import { ElFulkLogo } from "@/components/ui/ElFulkLogo";

const OTP_LENGTH = 5;

export default function VerifyEmailPage() {
  const router = useRouter();

  // OTP state — one digit per box
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer hook
  const { secondsLeft, formattedTime, canResend, startTimer } = useResendTimer();
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const next = [...digits];
    next[index] = value.slice(-1); // one digit
    setDigits(next);
    // Auto-advance
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = [...digits];
    pasted.split("").forEach((ch, i) => {
      if (i < OTP_LENGTH) next[i] = ch;
    });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setDigits(Array(OTP_LENGTH).fill(""));
    setError(null);
    startTimer();
    inputRefs.current[0]?.focus();
    // TODO: call resend API when backend is ready
  };

  const handleVerify = async () => {
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError("يرجى إدخال الرمز المكون من 5 أرقام كاملاً");
      return;
    }
    setError(null);
    setVerifying(true);
    try {
      const res = await authClient.verifyEmail({ code });
      if (!res.ok) {
        setError(res.message || "الرمز غير صحيح، يرجى المحاولة مرة أخرى");
        return;
      }
      router.push("/add-child");
    } catch {
      setError("حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      {/* Brand Logo */}
      <div className="mb-3 flex justify-center">
        <ElFulkLogo size="sm" />
      </div>

      {/* Header */}
      <div className="mb-4 w-full text-right">
        <h1 className="text-h2 font-extrabold tracking-tight text-[#0f2b3c]">
          تفقد بريدك الالكتروني.
        </h1>
        <p className="mt-1 text-[11px] font-medium text-slate-500">
          ادخل الرمز المكون من 5 أرقام الذي أرسلناه.
        </p>
      </div>

      {/* OTP Boxes — displayed LTR like Figma */}
      <div
        dir="ltr"
        className="mb-2 flex items-center gap-2.5 sm:gap-3"
        aria-label="حقول إدخال رمز التحقق"
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            aria-label={`رقم التحقق ${i + 1}`}
            className={`h-12 w-12 rounded-xl border-2 text-center text-lg font-bold text-[#0f2b3c] transition-all outline-none focus:border-[#48a999] focus:ring-2 focus:ring-[#48a999]/30 sm:h-14 sm:w-14 sm:text-xl ${
              digit ? "border-[#48a999] bg-[#48a999]/5" : "border-slate-200 bg-white"
            }`}
          />
        ))}
      </div>

      {/* Resend countdown */}
      <div className="mt-1 mb-5 w-full text-center">
        {!mounted || secondsLeft > 0 ? (
          <span className="text-xs font-medium text-slate-500 sm:text-sm" aria-live="polite">
            اعادة ارسال الرمز بعد{" "}
            <span className="font-bold text-[#48a999]" dir="ltr">
              {mounted ? formattedTime : "01:00"}
            </span>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            aria-label="إعادة إرسال رمز التحقق"
            className="text-xs font-bold text-[#48a999] underline underline-offset-2 transition-colors hover:text-[#3d9385] sm:text-sm"
          >
            إعادة إرسال الرمز
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          id="verify-error-alert"
          className="animate-in fade-in mb-3 w-full rounded-xl bg-red-50 p-2.5 text-center text-xs font-semibold text-red-500 sm:text-sm"
        >
          {error}
        </div>
      )}

      {/* Verify Button */}
      <button
        type="button"
        id="verify-submit-btn"
        aria-label="تأكيد رمز التحقق"
        onClick={handleVerify}
        disabled={verifying}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#48a999] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#48a999]/20 transition-all hover:bg-[#3d9385] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Check className="h-4.5 w-4.5" aria-hidden="true" />
        <span>{verifying ? "جاري التحقق..." : "تأكيد الرمز"}</span>
      </button>
    </div>
  );
}
