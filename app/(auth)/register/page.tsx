import { ElFulkLogo } from "@/components/ui/ElFulkLogo";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
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

      {/* Client Component */}
      <RegisterForm />
    </div>
  );
}
