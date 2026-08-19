import type { Metadata } from "next";
import { Readex_Pro, Baloo_Bhaijaan_2, Tajawal } from "next/font/google";
import "./globals.css";

const readexPro = Readex_Pro({
  variable: "--font-readex",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const balooBhaijaan2 = Baloo_Bhaijaan_2({
  variable: "--font-baloo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

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
    <html
      lang="ar"
      dir="rtl"
      className={`${readexPro.variable} ${balooBhaijaan2.variable} ${tajawal.variable}`}
    >
      <body className="font-parents min-h-screen bg-[#f8fafc] text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
