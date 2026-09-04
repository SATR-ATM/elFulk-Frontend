"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "عالم آمن يبدأ من هنا",
    description:
      "الفلك بيئة رقمية مصمّمة خصّيصًا للأطفال، خالية من المحتوى غير المناسب والإعلانات المزعجة.",
  },
  {
    id: 2,
    title: "أنت من يقرر، دائمًا",
    description:
      "تحكم فيما يشاهده طفلك، حدد أوقات الاستخدام، وراقب نشاطه بكل سهولة. الفلك يضع القرار في يدك.",
  },
  {
    id: 3,
    title: "تعلّم، العب، اكتشف",
    description:
      "محتوى منتقى بعناية يناسب عمر طفلك ويدعم فضوله بطريقة هادفة. لا عشوائية، لا مفاجآت.",
  },
];

export function AuthSideHero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-b from-[#0e3b33] via-[#092923] to-[#041714] p-6 text-white shadow-2xl md:p-8">
      {/* Background ambient radial glow matching Figma frame */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#185c50]/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/4 h-80 w-80 -translate-y-1/2 rounded-full bg-[#134e44]/20 blur-2xl"
        aria-hidden="true"
      />

      {/* Top Header / Title */}
      <div className="relative z-10 pt-4">
        <h2
          key={`title-${currentSlide.id}`}
          className="text-display-3 sm:text-display-2 font-bold tracking-tight text-white transition-opacity duration-300"
        >
          {currentSlide.title}
        </h2>
      </div>

      {/* Bottom Section: Description & Navigation Controls */}
      <div className="relative z-10 space-y-8 pb-4">
        <p
          key={`desc-${currentSlide.id}`}
          className="max-w-md text-sm leading-relaxed text-slate-200/90 transition-opacity duration-300 md:text-base"
        >
          {currentSlide.description}
        </p>

        {/* Carousel controls matching Figma circle buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="previous-slide-toggle"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-xs transition-all hover:border-white/50 hover:bg-white/15 focus:ring-2 focus:ring-white/30 focus:outline-none active:scale-95"
          >
            {/* Right arrow in RTL for previous slide */}
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="next-slide-toggle"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-xs transition-all hover:border-white/50 hover:bg-white/15 focus:ring-2 focus:ring-white/30 focus:outline-none active:scale-95"
          >
            {/* Left arrow in RTL for next slide */}
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Slide dots indicator for accessibility & feedback */}
          <div className="mr-2 flex items-center gap-1.5" aria-hidden="true">
            {slides.map((s, idx) => (
              <span
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlideIndex ? "w-6 bg-[#48a999]" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
