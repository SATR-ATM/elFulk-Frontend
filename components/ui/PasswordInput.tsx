"use client";

import React, { useState, forwardRef } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { FormFieldProps } from "./FormField";

export const PasswordInput = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      className = "",
      id,
      name,
      placeholder = "كلمة المرور",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? name;
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    const computedAriaLabel = ariaLabel ?? label ?? placeholder;

    return (
      <div className={`flex w-full flex-col gap-1.5 ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-right text-xs font-semibold text-slate-700 sm:text-sm"
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            aria-label={computedAriaLabel}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={[
              "w-full rounded-2xl border bg-white px-4 py-2.5 pr-11 pl-11 text-right text-sm text-slate-800 transition-all",
              "border-slate-200 placeholder:text-slate-400 hover:border-slate-300",
              "focus:border-[#48a999] focus:ring-4 focus:ring-[#48a999]/15 focus:outline-none",
              error
                ? "border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-400/20"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />

          {/* Right Icon: Lock icon matching Figma */}
          <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>

          {/* Left Icon: Toggle visibility with accessibility label */}
          <button
            type="button"
            id={inputId ? `${inputId}-toggle-visibility` : "password-toggle-visibility"}
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 left-3.5 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:text-slate-700 focus:ring-2 focus:ring-[#48a999]/40 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {error && (
          <span
            id={errorId}
            role="alert"
            className="animate-in fade-in px-1 text-right text-xs font-medium text-red-500"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
