"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft } from "lucide-react";

import { loginSchema, LoginFormValues } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { FormField } from "@/components/FormField";
import { PasswordInput } from "@/components/PasswordInput";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";

export function LoginForm() {
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
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        setAuthError(result.error.message || "يرجى تأكد من صحة المعلومات");
        return;
      }

      router.push("/dashboard");
    } catch {
      setAuthError("يرجى تأكد من صحة المعلومات");
    }
  };

  return (
    <>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full space-y-3">
        {/* Email Field with envelope icon */}
        <FormField
          id="email"
          type="email"
          placeholder="البريد الإلكتروني"
          aria-label="email-input"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
          icon={Mail}
        />

        {/* Password Field with lock and eye toggle */}
        <div className="space-y-1.5">
          <PasswordInput
            id="password"
            placeholder="كلمة المرور"
            aria-label="password-input"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* Forgot Password Link */}
          <div className="flex justify-start pt-1">
            <Link
              href="/forgot-password"
              id="forgot-password-link"
              aria-label="forgot-password-link"
              className="text-xs font-semibold text-[#48a999] transition-colors hover:text-[#3d9385] hover:underline sm:text-sm"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
        </div>

        {/* General Error Alert if server/credentials failed */}
        {authError && (
          <div
            aria-label="error-alert"
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
          aria-label="login-submit"
          disabled={isSubmitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#48a999] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#48a999]/20 transition-all hover:bg-[#3d9385] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSubmitting ? "جاري التحميل..." : "تسجيل الدخول"}</span>
          <ArrowLeft className="h-4.5 w-4.5" aria-hidden="true" />
        </button>
      </form>

      {/* Switch to Register */}
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

      <SocialLoginButtons context="login" />
    </>
  );
}
