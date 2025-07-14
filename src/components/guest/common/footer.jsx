"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    // Mengubah 'px-22' menjadi 'pl-[20px] pr-8'
    <footer className="bg-blue-500 text-white-800  flex justify-center flex-col">
      <div className="px-20 py-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kolom 1: Deskripsi */}
        <div className="">
          <h2 className="font-bold mb-2">Joker-BilliarD</h2>
          <p className="text-sm">
            Dongans Billiard bukan sekadar tempat main billiard—di sini kamu
            bisa nongkrong santai sambil nikmati kopi dan camilan lezat di
            warkop kami. Suasana nyaman, meja berkualitas, plus obrolan seru
            bareng teman. Mau latihan serius atau sekadar hangout? Semua bisa di
            Dongans Billiard!
            <br />
            <br />
            Bandar Lampung 35131, Lampung, Indonesia
            <br />
            Telp +6281271589534
            <br />
            Email: dongansbilliar@gmail.com
            <br />
            Alamat: Jl. Pangeran Senopati Raya, jalur 2 Korpri Sukarame
            (Belakang RM Padang Airan)
            <br />
            Buka Setiap Hari 12.00 - 02.00 WIB
            <br />
          </p>
        </div>

        {/* Kolom 2: Halaman Cepat */}
        <div className="text-left items-center">
          <h3 className="font-bold mb-4 text-center">Halaman Cepat</h3>
          <ul className="space-y-5 text-sm flex flex-col items-center">
            <li>
              <Link href="/dashboard">Beranda</Link>
            </li>
            <li>
              <Link href="/booking">Booking</Link>
            </li>
            <li>
              <Link href="/tentang">Tentang</Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Follow Kami */}
        <div className="text-center">
          <h3 className="font-bold mb-2">Follow Kami</h3>
          <div className="flex justify-center gap-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/ikonfb1.png"
                alt="Facebook"
                width={32}
                height={32}
                className="hover:scale-110 transition"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/ikonig.png"
                alt="Instagram"
                width={32}
                height={32}
                className="hover:scale-110 transition"
              />
            </a>
            <a
              href="https://wa.me/62812803196"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/ikonwa1.png"
                alt="WhatsApp"
                width={32}
                height={32}
                className="hover:scale-110 transition"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/ikontwt.png"
                alt="Twitter"
                width={32}
                height={32}
                className="hover:scale-110 transition"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t p-4 border-gray-400 mt-8 pt-1 text-sm text-center">
        <p>Hak Cipta Joker-BilliarD 2025</p>
        <p>
          Developed by Kuliah Praktek Teknik Informatika Institut Teknologi
          Sumatera
        </p>
      </div>
    </footer>
  );
}
