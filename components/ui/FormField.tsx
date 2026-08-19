import React, { forwardRef } from "react";

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  hint?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      icon,
      hint,
      className = "",
      id,
      name,
      placeholder,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
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
            placeholder={placeholder}
            aria-label={computedAriaLabel}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={[
              "w-full rounded-2xl border bg-white px-4 py-2.5 text-right text-sm text-slate-800 transition-all",
              "border-slate-200 placeholder:text-slate-400 hover:border-slate-300",
              "focus:border-[#48a999] focus:ring-4 focus:ring-[#48a999]/15 focus:outline-none",
              icon ? "pr-11" : "",
              error
                ? "border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-400/20"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />

          {icon && (
            <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400">
              {icon}
            </span>
          )}
        </div>

        {hint && !error && <p className="px-1 text-right text-xs text-slate-500">{hint}</p>}

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

FormField.displayName = "FormField";
