"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "🔥 Hot Deals",
    title: "Summer Sale",
    highlight: "50% OFF",
    subtitle: "On all beach accessories & sunglasses",
    cta: "Shop Now",
    href: "/products",
    bg: "from-orange-500 via-yellow-400 to-orange-300",
    emoji: "🕶️",
  },
  {
    id: 2,
    badge: "☀️ New Arrivals",
    title: "Beat the Heat",
    highlight: "Stay Cool",
    subtitle: "Explore our summer skincare & clothing collection",
    cta: "Explore",
    href: "/products",
    bg: "from-sky-500 via-cyan-400 to-teal-300",
    emoji: "🌊",
  },
  {
    id: 3,
    badge: "🌴 Beach Ready",
    title: "Pack Your Bags",
    highlight: "Free Shipping",
    subtitle: "On orders over $50 — all summer long",
    cta: "Get Started",
    href: "/products",
    bg: "from-pink-500 via-rose-400 to-orange-300",
    emoji: "🏖️",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      className={`relative bg-gradient-to-br ${slide.bg} transition-all duration-700 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text */}
          <div className="text-center md:text-left animate__animated animate__fadeInLeft">
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
              {slide.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-2">
              {slide.title}
            </h1>
            <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-100 mb-4">
              {slide.highlight}
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-md">
              {slide.subtitle}
            </p>
            <Link
              href={slide.href}
              className="inline-block bg-white text-orange-500 font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              {slide.cta} →
            </Link>
          </div>

          {/* Emoji illustration */}
          <div className="text-[120px] md:text-[180px] animate__animated animate__bounceIn select-none">
            {slide.emoji}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
