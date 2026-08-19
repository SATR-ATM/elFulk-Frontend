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
import { Baloo_Bhaijaan_2 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const childrenFont = Baloo_Bhaijaan_2({
  variable: "--family-children",
  subsets: ["latin"],
});

const parentFont = localFont({
  src: [
    {
      path: "../public/fonts/LamaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LamaSans-RegularItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/LamaSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/LamaSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/LamaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--family-parents",
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
    <html lang="en" className={`${childrenFont.variable} ${parentFont.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
