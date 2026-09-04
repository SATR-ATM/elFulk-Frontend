import { ElFulkLogo } from "@/components/ui/ElFulkLogo";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex w-full flex-col">
      {/* Brand Logo */}
      <div className="mb-3 flex justify-center">
        <ElFulkLogo size="sm" />
      </div>

      {/* Header Titles matching Figma */}
      <div className="mb-4 text-center">
        <h1 className="text-h2 font-extrabold tracking-tight text-[#0f2b3c]">مرحبًا بك في فلك.</h1>
        <p className="mt-1 text-[11px] font-medium text-slate-500">
          سجّل دخولك للوصول إلى لوحة التحكم ومتابعة أطفالك
        </p>
      </div>

      {/* Client Component */}
      <LoginForm />
    </div>
  );
}
