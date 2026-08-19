import type { Metadata } from "next";
import "./globals.css";
import { parentFont, readexPro, tajawal } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "الفلك - ElFulk | المنصة الرقمية الآمنة للأطفال",
  description: "منصة الفلك - بيئة رقمية آمنة ومصممة خصيصاً للأطفال تحت إشراف الوالدين",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <body
        className={`${parentFont.variable} ${readexPro.variable} ${tajawal.variable} min-h-screen bg-[#f8fafc] text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
