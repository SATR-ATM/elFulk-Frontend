import { ElFulkLogo } from "@/components/ui/ElFulkLogo";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
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

      {/* Client Component */}
      <ForgotPasswordForm />
    </div>
  );
}
