"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[718px] mb-12 flex items-center justify-center text-center overflow-hidden">
      {/* Video background */}
      <video
        className="absolute top-10 left-0 w-full h-full object-cover"
        src="/videos/backgroundhero.webm"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay opsional */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Konten hero */}
      <div className="relative z-10 px-4 text-white">
        <h1 className="text-4xl font-bold mb-10">
          Selamat Datang Di
          <br />
          Dongans Billiard
        </h1>
        <p className="max-w-xl mx-auto mb-10">
          Nikmati pengalaman bermain billiard terbaik dengan meja berkualitas
          premium, suasana nyaman, dan pelayanan profesional.
        </p>
        <div className="flex gap-4 justify-center">
          {/* Link Button 1 */}
          <Link href="/booking" passHref>
            <button className="px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-100 transition">
              Reservasi Sekarang
            </button>
          </Link>
          {/* Link Button 2 */}
          <Link href="/highlight" passHref>
            <button className="px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-100 transition">
              Lihat Meja
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
