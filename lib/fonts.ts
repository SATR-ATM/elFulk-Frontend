import { Readex_Pro, Baloo_Bhaijaan_2, Tajawal } from "next/font/google";
import localFont from "next/font/local";

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
  variable: "--family-lama",
});

export { readexPro, balooBhaijaan2, tajawal, childrenFont, parentFont };
