"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { FormField } from "@/components/ui/FormField";
import { ElFulkLogo } from "@/components/ui/ElFulkLogo";

export default function ForgotPasswordPage() {
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
      const res = await authClient.forgotPassword(email);
      if (!res.ok) {
        setError(res.message || "حدث خطأ، يرجى المحاولة مرة أخرى");
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
    <div className="flex w-full flex-col">
      {/* Brand Logo */}
      <div className="mb-3 flex justify-center">
        <ElFulkLogo size="sm" />
      </div>

      {/* Header Titles matching Figma Frame */}
      <div className="mb-4 text-center">
        <h1 className="text-h2 font-extrabold tracking-tight text-[#0f2b3c]">نسيت كلمة المرور؟</h1>
        <p className="mt-1 text-[11px] font-medium text-slate-500">
          أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="w-full space-y-3">
        <FormField
          id="email"
          type="email"
          placeholder="1203456789@gmail.com"
          aria-label="البريد الإلكتروني"
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
          aria-label="إرسال رمز التحقق"
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
          aria-label="إنشاء حساب جديد"
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
          aria-label="العودة إلى صفحة تسجيل الدخول"
          className="text-xs font-medium text-slate-500 underline hover:text-slate-800 sm:text-sm"
        >
          العودة لتسجيل الدخول
        </Link>
      </div>
    </div>
  );
}
