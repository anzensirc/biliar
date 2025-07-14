"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu } from "lucide-react";
import CartSidebar from "@/components/modal/cartSidebar";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-20 py-4 shadow-md bg-blue-500 z-50">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/icons/ikonjoker.png"
              alt="Logo JokerBilliarD"
              width={48}
              height={48}
            />
          </Link>
          <Link href="/" className="flex items-center">
            <span className="font-bold text-lg text-white">
              Dongan&apos;s Billiard
            </span>
          </Link>
        </div>

        {/* Burger icon - mobile only */}
        <button
          className="md:hidden flex items-center text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-8 h-8" />
        </button>

        {/* Menu - desktop */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="px-3 py-2 rounded hover:bg-blue-700 hover:text-white text-white transition"
          >
            Beranda
          </Link>
          <Link
            href="/booking"
            className="px-3 py-2 rounded hover:bg-blue-700 hover:text-white text-white transition"
          >
            Booking
          </Link>
          <Link
            href="/tentang"
            className="px-3 py-2 rounded hover:bg-blue-700 hover:text-white text-white transition"
          >
            Tentang
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-right">
          <Link
            href="/upload-bukti"
            className="px-3 py-2 rounded hover:bg-blue-700 hover:text-white text-white transition"
          >
            Upload Bukti
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="transition-transform duration-200 hover:scale-125"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>

      {/* Menu - mobile dropdown */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-blue-500 flex flex-col gap-4 px-6 py-4 md:hidden z-40">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-white"
          >
            Beranda
          </Link>
          <Link
            href="/booking"
            onClick={() => setIsMenuOpen(false)}
            className="text-white"
          >
            Booking
          </Link>
          <Link
            href="/tentang"
            onClick={() => setIsMenuOpen(false)}
            className="text-white"
          >
            Tentang
          </Link>
          <Link
            href="/upload-bukti"
            onClick={() => setIsMenuOpen(false)}
            className="text-white"
          >
            Upload Bukti
          </Link>
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-2 text-white"
          >
            <ShoppingCart className="w-5 h-5" /> Cart
          </button>
        </div>
      )}

      {/* Komponen Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
