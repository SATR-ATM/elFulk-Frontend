import { ElFulkLogo } from "@/components/ElFulkLogo";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <div className="flex w-full flex-col">
      {/* Brand Logo */}
      <div className="mb-3 flex justify-center">
        <ElFulkLogo size="sm" />
      </div>

      {/* Header */}
      <div className="mb-4 w-full text-right">
        <h1 className="text-h2 font-extrabold tracking-tight text-[#0f2b3c]">
          تفقد بريدك الالكتروني.
        </h1>
        <p className="mt-1 text-[11px] font-medium text-slate-500">
          ادخل الرمز المكون من 5 أرقام الذي أرسلناه.
        </p>
      </div>

      {/* Client Component */}
      <VerifyEmailForm />
    </div>
  );
}
