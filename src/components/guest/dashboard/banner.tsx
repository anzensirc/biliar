"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetBanner } from "@/components/parts/admin/kelola-banner/api";

export default function Banner() {
  const { data, isLoading } = useGetBanner();
  const banners = data?.data?.items || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevSlide = () => {
    if (banners.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const nextSlide = () => {
    if (banners.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (isLoading || banners.length === 0) return null;

  return (
    <section className="relative w-full max-w-[1120px] h-[400px] mx-auto overflow-hidden">
      <div
        className={`w-full h-full relative transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={banners[currentIndex]?.Foto}
          alt={`Banner ${currentIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1120px) 100vw, 1120px"
        />
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
