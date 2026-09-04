import React from "react";
import { AuthSideHero } from "@/components/auth/AuthSideHero";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen w-full grid-cols-1 bg-white md:grid-cols-2 lg:h-screen lg:grid-cols-[44%_56%] lg:overflow-hidden">
      {/* Right Side (Form) */}
      <div className="order-2 flex h-auto min-h-[60vh] w-full items-center justify-center p-4 md:order-none md:h-full md:min-h-0 md:overflow-y-auto">
        <div className="w-full max-w-[360px] py-4 md:py-0">{children}</div>
      </div>

      {/* Left Side (Hero): Show on top on mobile for better UX (welcoming message first) */}
      <div className="order-1 h-[350px] w-full p-4 sm:h-[400px] md:order-none md:h-full lg:p-4">
        <AuthSideHero />
      </div>
    </main>
  );
}
