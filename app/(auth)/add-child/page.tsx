import { ElFulkLogo } from "@/components/ElFulkLogo";
import { AddChildForm } from "@/components/auth/AddChildForm";

async function getBirthYears() {
  "use cache";

  const currentYear = new Date().getFullYear();
  return Array.from({ length: 18 }, (_, index) => currentYear - index);
}

export default async function AddChildPage() {
  const birthYears = await getBirthYears();

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

      {/* Client Component */}
      <AddChildForm birthYears={birthYears} />
    </div>
  );
}
