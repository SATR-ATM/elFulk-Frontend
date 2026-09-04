"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ElFulkLogo } from "@/components/ui/ElFulkLogo";

interface ChildEntry {
  id: number;
  name: string;
  gender: string;
  birthdate: string;
  isEditing?: boolean;
}

export default function AddChildPage() {
  const router = useRouter();
  const [children, setChildren] = useState<ChildEntry[]>([
    { id: 1, name: "", gender: "", birthdate: "", isEditing: true },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const updateChild = (id: number, field: keyof ChildEntry, value: string) => {
    setChildren((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`${id}-${field}`];
      return next;
    });
  };

  const removeChild = (id: number) => {
    setChildren((prev) => prev.filter((c) => c.id !== id));
  };

  const editChild = (id: number) => {
    setChildren((prev) => prev.map((c) => ({ ...c, isEditing: c.id === id ? true : false })));
  };

  const addAnotherChild = () => {
    // Validate current active child before collapsing? (Optional, but good UX.
    // We will just let them collapse it for now, validation happens on submit).
    setChildren((prev) => [
      ...prev.map((c) => ({ ...c, isEditing: false })),
      { id: Date.now(), name: "", gender: "", birthdate: "", isEditing: true },
    ]);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    children.forEach((child) => {
      if (!child.name.trim()) newErrors[`${child.id}-name`] = "اسم الطفل مطلوب";
      if (!child.gender) newErrors[`${child.id}-gender`] = "الجنس مطلوب";
      if (!child.birthdate) newErrors[`${child.id}-birthdate`] = "تاريخ الميلاد مطلوب";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      // TODO: POST children to /api/children when backend is ready
      router.push("/dashboard");
    } finally {
      setSubmitting(false);
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
        <h1 className="text-h2 font-extrabold tracking-tight text-[#0f2b3c]">أضف طفلك الان</h1>
        <p className="mt-1 text-[11px] font-medium text-slate-500">
          أدخل اسم طفلك وعمره لنهيئ له محتوى يناسبه تماما.
        </p>
      </div>

      {/* Children list */}
      <div className="w-full space-y-4">
        {children.map((child, index) => {
          const isCollapsed = !child.isEditing;
          const childNumberText =
            index === 0 ? "الاول" : index === 1 ? "الثاني" : index === 2 ? "الثالث" : index + 1;

          if (isCollapsed) {
            // Summary view for collapsed children (matches Image 4)
            return (
              <div key={child.id} className="w-full">
                <div className="mb-1 text-right text-[11px] font-bold text-slate-500">
                  الطفل {childNumberText}
                </div>
                <div className="flex items-center gap-2">
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => removeChild(child.id)}
                    aria-label={`delete-child-${index + 1}`}
                    className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border border-red-200 bg-white text-red-500 transition-colors hover:bg-red-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>

                  {/* Summary Box */}
                  <div className="flex h-[50px] flex-1 items-center rounded-xl border border-slate-200 bg-white px-3.5">
                    {/* Right side: User icon + Text */}
                    <div className="flex flex-1 items-center gap-2.5 text-right">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 text-slate-400"
                        aria-hidden="true"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span className="max-w-[180px] truncate text-sm font-medium text-slate-500 sm:max-w-[220px]">
                        {child.name || "اسم الطفل"} /{" "}
                        {child.gender === "male"
                          ? "ذكر"
                          : child.gender === "female"
                            ? "أنثى"
                            : "جنسه"}{" "}
                        / {child.birthdate || "عمره"}
                      </span>
                    </div>

                    {/* Left side: Edit icon */}
                    <button
                      type="button"
                      onClick={() => editChild(child.id)}
                      aria-label={`edit-child-${index + 1}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // Edit view for active child
          return (
            <div key={child.id} className="w-full space-y-3">
              {children.length > 1 && (
                <div className="mb-1 text-right text-[11px] font-bold text-slate-500">
                  الطفل {childNumberText}
                </div>
              )}

              {/* اسم طفلك */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 end-3.5 flex items-center text-slate-400">
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
                </div>
                <input
                  type="text"
                  value={child.name}
                  onChange={(e) => updateChild(child.id, "name", e.target.value)}
                  placeholder="اسم طفلك"
                  aria-label="child-name-input"
                  className={`w-full rounded-xl border py-2.5 ps-3.5 pe-10 text-right text-sm font-medium transition-all outline-none placeholder:text-slate-400 focus:border-[#48a999] focus:ring-2 focus:ring-[#48a999]/30 ${
                    errors[`${child.id}-name`]
                      ? "border-red-400 bg-red-50/30"
                      : "border-slate-200 bg-white"
                  }`}
                />
                {errors[`${child.id}-name`] && (
                  <span
                    role="alert"
                    className="mt-1 block text-right text-xs font-medium text-red-500"
                  >
                    {errors[`${child.id}-name`]}
                  </span>
                )}
              </div>

              {/* الجنس */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 end-3.5 flex items-center text-slate-400">
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
                    <circle cx="10" cy="4" r="2" />
                    <path d="M10 6v5M16 16v-2a4 4 0 0 0-8 0v2" />
                    <path d="M20 4h-4M18 2v4" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <select
                  value={child.gender}
                  onChange={(e) => updateChild(child.id, "gender", e.target.value)}
                  aria-label="child-gender-input"
                  className={`w-full appearance-none rounded-xl border py-2.5 ps-9 pe-10 text-right text-sm font-medium transition-all outline-none focus:border-[#48a999] focus:ring-2 focus:ring-[#48a999]/30 ${
                    child.gender ? "text-slate-800" : "text-slate-400"
                  } ${
                    errors[`${child.id}-gender`]
                      ? "border-red-400 bg-red-50/30"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <option value="" disabled>
                    الجنس
                  </option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
                {errors[`${child.id}-gender`] && (
                  <span
                    role="alert"
                    className="mt-1 block text-right text-xs font-medium text-red-500"
                  >
                    {errors[`${child.id}-gender`]}
                  </span>
                )}
              </div>

              {/* تاريخ الميلاد */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 end-3.5 flex items-center text-slate-400">
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
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute inset-y-0 start-3 flex items-center text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <select
                  value={child.birthdate}
                  onChange={(e) => updateChild(child.id, "birthdate", e.target.value)}
                  aria-label="child-birthdate-input"
                  className={`w-full appearance-none rounded-xl border py-2.5 ps-9 pe-10 text-right text-sm font-medium transition-all outline-none focus:border-[#48a999] focus:ring-2 focus:ring-[#48a999]/30 ${
                    child.birthdate ? "text-slate-800" : "text-slate-400"
                  } ${
                    errors[`${child.id}-birthdate`]
                      ? "border-red-400 bg-red-50/30"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <option value="" disabled>
                    تاريخ الميلاد
                  </option>
                  {Array.from({ length: 18 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    );
                  })}
                </select>
                {errors[`${child.id}-birthdate`] && (
                  <span
                    role="alert"
                    className="mt-1 block text-right text-xs font-medium text-red-500"
                  >
                    {errors[`${child.id}-birthdate`]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Buttons */}
      <div className="mt-6 w-full space-y-3">
        {/* Primary: الانتقال الى لوحة التحكم */}
        <button
          type="button"
          id="go-to-dashboard-btn"
          aria-label="dashboard-link"
          onClick={handleSubmit}
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#48a999] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#48a999]/20 transition-all hover:bg-[#3d9385] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          {/* Chevron Left icon for RTL "forward" */}
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
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>{submitting ? "جاري التحميل..." : "الانتقال الى لوحة التحكم"}</span>
        </button>

        {/* Secondary: اضافة طفل اخر */}
        <button
          type="button"
          id="add-another-child-btn"
          aria-label="add-another-child"
          onClick={addAnotherChild}
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-500 transition-all hover:bg-slate-50 active:scale-[0.99] sm:text-base"
        >
          {/* User Plus Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>
          <span>اضافة طفل اخر</span>
        </button>
      </div>
    </div>
  );
}
