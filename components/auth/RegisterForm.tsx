"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, ArrowLeft } from "lucide-react";

import { registerSchema, RegisterFormValues } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { FormField } from "@/components/FormField";
import { PasswordInput } from "@/components/PasswordInput";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";

export function RegisterForm() {
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
      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      });

      if (result.error) {
        setRegisterError(
          result.error.message || "حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى"
        );
        return;
      }

      router.push("/verify-email");
    } catch {
      setRegisterError("حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى");
    }
  };

  return (
    <>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full space-y-2.5">
        {/* Name Row: الاسم | اللقب */}
        <div className="grid grid-cols-2 gap-3">
          {/* الاسم (firstName) — right column in RTL */}
          <FormField
            id="firstName"
            placeholder="الاسم"
            aria-label="first-name-input"
            autoComplete="given-name"
            {...register("firstName")}
            error={errors.firstName?.message}
            icon={User}
          />
          {/* اللقب (lastName) — left column in RTL */}
          <FormField
            id="lastName"
            placeholder="اللقب"
            aria-label="last-name-input"
            autoComplete="family-name"
            {...register("lastName")}
            error={errors.lastName?.message}
            icon={User}
          />
        </div>

        {/* Email */}
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

        {/* Password */}
        <PasswordInput
          id="password"
          placeholder="كلمة المرور"
          aria-label="password-input"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirmPassword"
          placeholder="تأكيد كلمة المرور"
          aria-label="confirm-password-input"
          autoComplete="new-password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {/* Terms Checkbox */}
        <div className="flex flex-col gap-1 pt-0.5">
          <div className="flex items-center gap-2.5">
            <input
              id="acceptTerms"
              type="checkbox"
              aria-label="terms-checkbox"
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
                aria-label="terms-and-conditions-link"
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
          aria-label="register-submit"
          disabled={isSubmitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#48a999] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#48a999]/20 transition-all hover:bg-[#3d9385] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{isSubmitting ? "جاري التحميل..." : "إنشاء حساب"}</span>
          <ArrowLeft className="h-4.5 w-4.5" aria-hidden="true" />
        </button>
      </form>

      {/* Login link */}
      <p className="mt-4 text-center text-xs font-medium text-slate-600 sm:text-sm">
        لديك حساب بالفعل؟{" "}
        <Link
          href="/login"
          id="login-link"
          aria-label="login-link"
          className="font-bold text-slate-800 underline underline-offset-4 transition-colors hover:text-[#48a999]"
        >
          سجل الدخول
        </Link>
      </p>

      <SocialLoginButtons context="register" />
    </>
  );
}
