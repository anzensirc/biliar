"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useGetSetting } from "@/components/parts/admin/setting-web/api";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isLoading } = useGetSetting();
  const setting = data?.data[0];

  if (isLoading) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-20 py-3 h-16 shadow-md bg-blue-500 z-50">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src={setting?.logoUrl || "/icons/logo-dongan.png"}
              alt="Logo Dongans Billiar"
              width={40}
              height={40}
            />
          </Link>
          <Link href="/" className="flex items-center">
            <span className="font-bold text-lg text-white">
              Dongan&apos;s Billiard
            </span>
          </Link>
        </div>

        {/* Burger icon */}
        <button
          className="md:hidden flex items-center text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-8 h-8" />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 items-center justify-end">
          {["/", "/booking", "/upload-bukti", "/tentang"].map((href, idx) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 rounded hover:bg-blue-700 hover:text-white text-white transition"
            >
              {["Beranda", "Booking", "Upload Bukti", "Tentang"][idx]}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile dropdown menu dengan border antar item */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-blue-500 flex flex-col md:hidden z-40 transition-all duration-300 ease-in-out">
          {[
            { href: "/", label: "Beranda" },
            { href: "/booking", label: "Booking" },
            { href: "/upload-bukti", label: "Upload Bukti" },
            { href: "/tentang", label: "Tentang" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-white px-6 py-3 ${
                index !== 0 ? "border-t border-white/30 md:border-none" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
