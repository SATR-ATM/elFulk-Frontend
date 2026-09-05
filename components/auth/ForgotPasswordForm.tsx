"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import { FormField } from "@/components/FormField";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("يرجى إدخال بريد إلكتروني صالح");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "حدث خطأ، يرجى المحاولة مرة أخرى");
        return;
      }
      router.push("/verify-email");
    } catch {
      setError("حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="w-full space-y-3">
        <FormField
          id="email"
          type="email"
          placeholder="1203456789@gmail.com"
          aria-label="email-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          error={error ?? undefined}
          icon={Mail}
        />

        {/* Submit Button with send icon matching Figma */}
        <button
          type="submit"
          id="forgot-submit-btn"
          aria-label="send-otp"
          disabled={isSubmitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#48a999] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#48a999]/20 transition-all hover:bg-[#3d9385] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSubmitting ? "جاري الإرسال..." : "ارسال رمز التحقق"}</span>
          <ArrowLeft className="h-4.5 w-4.5" aria-hidden="true" />
        </button>
      </form>

      <p className="mt-3 text-center text-xs font-medium text-slate-600">
        ليس لديك حساب؟{" "}
        <Link
          href="/register"
          id="register-link"
          aria-label="register-link"
          className="font-bold text-[#48a999] underline underline-offset-4 transition-colors hover:text-[#3d9385]"
        >
          أنشئ واحدًا الآن
        </Link>
      </p>

      {/* Back to Login */}
      <div className="mt-2 text-center">
        <Link
          href="/login"
          id="back-to-login-link"
          aria-label="back-to-login"
          className="text-xs font-medium text-slate-500 underline hover:text-slate-800 sm:text-sm"
        >
          العودة لتسجيل الدخول
        </Link>
      </div>
    </>
  );
}
