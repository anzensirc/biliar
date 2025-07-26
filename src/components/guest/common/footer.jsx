"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetSetting } from "@/components/parts/admin/setting-web/api";

export default function Footer() {
  const { data, isLoading } = useGetSetting();

  const setting = data?.data[0];

  if (isLoading) return null;

  return (
    <footer className="bg-gray-200 text-gray-800 flex flex-col items-center px-4 py-10 md:px-6 md:py-10 gap-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom 1: Info Usaha */}
        <div className="text-left md:px-10">
          <h2 className="font-bold mb-2">Dongans Billiar</h2>
          <p className="text-sm text-left md:text-justify">
            {setting?.deskripsi && (
              <>
                {setting.deskripsi}
                <br />
              </>
            )}
            <br />
            Alamat : {setting?.alamat} {setting?.kodePos}
            <br />
            Telp : {setting?.telepon?.join(", ")}
            <br />
            Email : {setting?.email}
            <br />
            Faks : {setting?.faks}
            <br />
            Buka : {setting?.jamOperasional}
          </p>
        </div>

        {/* Kolom 2: Halaman Cepat + Sosial Media */}
        <div className="flex flex-col items-start text-left md:items-center md:text-center">
          {/* Halaman Cepat */}
          <div className="mb-6">
            <h3 className="font-bold mb-4">Halaman Cepat</h3>
            <ul className="space-y-2 text-sm">
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

          {/* Follow Kami */}
          <div>
            <h3 className="font-bold pb-3">Follow Kami</h3>
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
      </div>
      
      <div className="border-t w-full pt-4 text-sm text-center border-gray-400 mt-8">
        <p>{setting?.copyright}</p>
        <p>Developed by {setting?.developer}</p>
      </div>
    </footer>
  );
}
