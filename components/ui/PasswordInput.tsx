"use client";

import React, { useState, forwardRef } from "react";
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
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
              /* Eye Off */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            ) : (
              /* Eye */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
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
