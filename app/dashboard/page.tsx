import React from "react";
import Link from "next/link";
import { ElFulkLogo } from "@/components/ElFulkLogo";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc] p-6">
      <header className="flex items-center justify-between rounded-2xl border-b border-slate-200 bg-white px-8 py-4 shadow-xs">
        <ElFulkLogo size="sm" />
        <h1 className="text-h2 font-bold text-slate-800">لوحة التحكم الرئيسية</h1>
        <Link
          href="/login"
          aria-label="logout-link"
          className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          تسجيل الخروج
        </Link>
      </header>
      <main className="mt-8 flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-display-3 font-bold text-[#0f2b3c]">
            مرحبًا بك في لوحة تحكم ولي الأمر
          </p>
          <p className="mt-2 text-sm text-slate-500">تم تسجيل الدخول بنجاح إلى منصة الفلك.</p>
        </div>
      </main>
    </div>
  );
}
