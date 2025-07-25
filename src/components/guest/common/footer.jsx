"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetSetting } from "@/components/parts/admin/setting-web/api";

export default function Footer() {
  const { data, isLoading } = useGetSetting();

  const setting = data?.data[0];

  if (isLoading) return null;

  return (
    <footer className="bg-gray-200 text-white-800 flex justify-center flex-col">
      <div className="px-20 py-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kolom 1: Deskripsi */}
        <div>
          <h2 className="font-bold mb-2">Dongans Billiar</h2>
          <p className="text-sm">
            {setting?.deskripsi && (
              <>
                {setting.deskripsi}
                <br />
              </>
            )}
            <br />
            Alamat : {setting?.alamat} {setting?.kodePos}
            <br />
            Telp :{" "}
            {setting?.telepon?.map((tel, i) => (
              <span key={i}>
                {tel}
                {i < setting.telepon.length - 1 ? ", " : ""}
              </span>
            ))}
            <br />
            Email : {setting?.email}
            <br />
            Faks : {setting?.faks}
            <br />
            Buka : {setting?.jamOperasional}
          </p>
        </div>

        {/* Kolom 2: Halaman Cepat */}
        <div className="text-left items-center">
          <h3 className="font-bold mb-4 text-center">Halaman Cepat</h3>
          <ul className="space-y-2 text-sm flex flex-col items-center">
            <li>
              <Link href="/">Beranda</Link>
            </li>
            <li>
              <Link href="/booking">Booking</Link>
            </li>
            <li>
              <Link href="/upload-bukti">Upload Bukti</Link>
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
            {setting?.sosialMedia?.[0] && (
              <Link
                href={setting.sosialMedia[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={setting.sosialMedia[0].icon || "/icons/ikonfb1.png"}
                  alt={setting.sosialMedia[0].platform}
                  width={32}
                  height={32}
                  className="hover:scale-110 transition"
                />
              </Link>
            )}

            {setting?.sosialMedia?.[1] && (
              <Link
                href={setting.sosialMedia[1].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={setting.sosialMedia[1].icon || "/icons/ikonig.png"}
                  alt={setting.sosialMedia[1].platform}
                  width={32}
                  height={32}
                  className="hover:scale-110 transition"
                />
              </Link>
            )}

            {setting?.sosialMedia?.[2] && (
              <Link
                href={setting.sosialMedia[2].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={setting.sosialMedia[2].icon || "/icons/ikonwa.png"}
                  alt={setting.sosialMedia[2].platform}
                  width={32}
                  height={32}
                  className="hover:scale-110 transition"
                />
              </Link>
            )}

            {setting?.sosialMedia?.[3] && (
              <Link
                href={setting.sosialMedia[3].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={setting.sosialMedia[3].icon || "/icons/ikontwt.png"}
                  alt={setting.sosialMedia[3].platform}
                  width={32}
                  height={32}
                  className="hover:scale-110 transition"
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t p-4 border-gray-400 mt-8 pt-1 text-sm text-center">
        <p>{setting.copyright}</p>
        <p>Developed by {setting.developer}</p>
      </div>
    </footer>
  );
}
