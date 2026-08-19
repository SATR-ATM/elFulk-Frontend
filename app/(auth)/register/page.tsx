"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterFormValues } from "@/lib/schemas/auth";
import { FormField } from "@/components/ui/FormField";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { ElFulkLogo } from "@/components/ui/ElFulkLogo";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";

export default function RegisterPage() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      acceptTerms: undefined,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setRegisterError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setRegisterError("حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى");
        return;
      }

      router.push("/verify-email");
    } catch {
      setRegisterError("حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى");
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
          ابدأ رحلتك مع الفلك.
        </h1>
        <p className="mt-1 text-[11px] font-medium text-slate-500">
          أنشئ حسابك في دقيقة وامنح طفلك فضاءا رقميًا آمنًا.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full space-y-2.5">
        {/* Name Row: الاسم | اللقب */}
        <div className="grid grid-cols-2 gap-3">
          {/* الاسم (firstName) — right column in RTL */}
          <FormField
            id="firstName"
            placeholder="الاسم"
            aria-label="الاسم"
            autoComplete="given-name"
            {...register("firstName")}
            error={errors.firstName?.message}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
          {/* اللقب (lastName) — left column in RTL */}
          <FormField
            id="lastName"
            placeholder="اللقب"
            aria-label="اللقب"
            autoComplete="family-name"
            {...register("lastName")}
            error={errors.lastName?.message}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
        </div>

        {/* Email */}
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
              width="17"
              height="17"
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

        {/* Password */}
        <PasswordInput
          id="password"
          placeholder="كلمة المرور"
          aria-label="كلمة المرور"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />

        {/* Terms Checkbox */}
        <div className="flex flex-col gap-1 pt-0.5">
          <div className="flex items-center gap-2.5">
            <input
              id="acceptTerms"
              type="checkbox"
              aria-label="الموافقة على شروط الاستخدام وسياسة الخصوصية"
              className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-[#48a999] focus:ring-2 focus:ring-[#48a999]"
              {...register("acceptTerms")}
            />
            <label
              htmlFor="acceptTerms"
              className="cursor-pointer text-xs font-medium text-slate-600 sm:text-sm"
            >
              أوافق على{" "}
              <a
                href="#"
                aria-label="اقرأ شروط الاستخدام وسياسة الخصوصية"
                className="font-semibold text-[#48a999] underline underline-offset-2 hover:text-[#3d9385]"
              >
                شروط الاستخدام وسياسة الخصوصية
              </a>
              .
            </label>
          </div>
          {errors.acceptTerms && (
            <span
              role="alert"
              id="acceptTerms-error"
              className="animate-in fade-in px-1 text-xs font-medium text-red-500"
            >
              {errors.acceptTerms.message}
            </span>
          )}
        </div>

        {/* General Error */}
        {registerError && (
          <div
            role="alert"
            id="register-error-alert"
            className="animate-in fade-in rounded-xl bg-red-50 p-2.5 text-center text-xs font-semibold text-red-500 sm:text-sm"
          >
            {registerError}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          id="register-submit-btn"
          aria-label="إنشاء حساب جديد"
          disabled={isSubmitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#48a999] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#48a999]/20 transition-all hover:bg-[#3d9385] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
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
            aria-hidden="true"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" x2="3" y1="12" y2="12" />
          </svg>
          <span>{isSubmitting ? "جاري التحميل..." : "إنشاء حساب"}</span>
        </button>
      </form>

      {/* Login link */}
      <p className="mt-4 text-center text-xs font-medium text-slate-600 sm:text-sm">
        لديك حساب بالفعل؟{" "}
        <Link
          href="/login"
          id="login-link"
          aria-label="العودة إلى صفحة تسجيل الدخول"
          className="font-bold text-slate-800 underline underline-offset-4 transition-colors hover:text-[#48a999]"
        >
          سجل الدخول
        </Link>
      </p>

      <SocialLoginButtons context="register" />
    </div>
  );
}
