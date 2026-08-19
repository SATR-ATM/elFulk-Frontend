"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormValues } from "@/schemas/auth";
import { FormField } from "@/components/ui/FormField";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { ElFulkLogo } from "@/components/ui/ElFulkLogo";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";

export default function LoginPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setAuthError("يرجى تأكد من صحة المعلومات");
        return;
      }

      router.push("/dashboard");
    } catch {
      setAuthError("يرجى تأكد من صحة المعلومات");
    }
  };

  return (
    <div className="flex w-full flex-col">
      {/* Brand Logo */}
      <div className="mb-3 flex justify-center">
        <ElFulkLogo size="sm" />
      </div>

      {/* Header Titles matching Figma */}
      <div className="mb-4 text-center">
        <h1 className="text-h2 font-extrabold tracking-tight text-[#0f2b3c]">مرحبًا بك في فلك.</h1>
        <p className="mt-1 text-[11px] font-medium text-slate-500">
          سجّل دخولك للوصول إلى لوحة التحكم ومتابعة أطفالك
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full space-y-3">
        {/* Email Field with envelope icon */}
        <FormField
          id="email"
          type="email"
          placeholder="البريد الإلكتروني"
          aria-label="البريد الإلكتروني"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          }
        />

        {/* Password Field with lock and eye toggle */}
        <div className="space-y-1.5">
          <PasswordInput
            id="password"
            placeholder="كلمة المرور"
            aria-label="كلمة المرور"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* Forgot Password Link */}
          <div className="flex justify-start pt-1">
            <Link
              href="/forgot-password"
              id="forgot-password-link"
              aria-label="انتقل إلى صفحة استعادة كلمة المرور"
              className="text-xs font-semibold text-[#48a999] transition-colors hover:text-[#3d9385] hover:underline sm:text-sm"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
        </div>

        {/* General Error Alert if server/credentials failed */}
        {authError && (
          <div
            role="alert"
            id="auth-error-alert"
            className="animate-in fade-in rounded-xl bg-red-50 p-2.5 text-center text-xs font-semibold text-red-500 sm:text-sm"
          >
            {authError}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          id="login-submit-btn"
          aria-label="تسجيل الدخول إلى حسابك"
          disabled={isSubmitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#48a999] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#48a999]/20 transition-all hover:bg-[#3d9385] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSubmitting ? "جاري التحميل..." : "تسجيل الدخول"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-180"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </form>

      {/* Switch to Register */}
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

      <SocialLoginButtons context="login" />
    </div>
  );
}
