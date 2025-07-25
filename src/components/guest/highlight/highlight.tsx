/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetMeja } from "@/components/parts/admin/kelola-meja/api";

const mejaKecilDescription = `🎱 Meja Biliar Kecil ...`; // singkat biar fokus ke animasi
const mejaBesarDescription = `🎱 Meja Biliar Besar ...`;

export default function Highlight() {
  const { data, isLoading } = useGetMeja();
  const mejaList = data?.data?.items || [];

  const filteredTables = useMemo(() => {
    const kecil = mejaList.find((m) => m.TipeMeja === "Meja Kecil");
    const besar = mejaList.find((m) => m.TipeMeja === "Meja Besar");

    const tables = [];

    if (kecil) {
      tables.push({
        id: kecil.id,
        name: "Meja Kecil",
        description: mejaKecilDescription.replace(/\n/g, " "),
        category: kecil.TipeMeja,
        images: [kecil.Foto],
      });
    }

    if (besar) {
      tables.push({
        id: besar.id,
        name: "Meja Besar",
        description: mejaBesarDescription.replace(/\n/g, " "),
        category: besar.TipeMeja,
        images: [besar.Foto],
      });
    }

    return tables;
  }, [mejaList]);

  if (isLoading) return <div className="px-4 py-20 text-center">Loading...</div>;

  return (
    <main className="px-4 sm:px-8 md:px-20 py-6 sm:py-20">
      <h1 className="text-xl sm:text-2xl font-bold pt-12 pb-8 text-center">
        Pilihan Meja Tersedia
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredTables.map((table, i) => (
          <div
            key={table.id}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
          >
            <TableCard table={table} />
          </div>
        ))}
      </div>
    </main>
  );
}

type Table = {
  id: number;
  name: string;
  description: string;
  category: string;
  images: string[];
};

function TableCard({ table }: { table: Table }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? table.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === table.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-blue-100 rounded-xl shadow-lg p-4 flex flex-col items-center space-y-4 transition-all duration-300 hover:scale-105">
      <div className="text-lg sm:text-xl font-semibold text-center">{table.name}</div>

      <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
        <img
          src={table.images[currentIndex]}
          alt={table.name}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 shadow transition-transform hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 shadow transition-transform hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <Link
        href={`/booking?category=${encodeURIComponent(table.category)}`}
        className="bg-blue-500 hover:bg-green-500 text-white text-sm sm:text-base px-4 py-2 rounded transition-all duration-300"
      >
        Lihat Jadwal
      </Link>

      <div className="w-full bg-white p-4 rounded text-sm sm:text-base text-justify transition-all duration-300">
        <h3 className="font-semibold mb-2">Deskripsi:</h3>
        <p>{table.description}</p>
      </div>
    </div>
  );
}

/* Tambahkan style animasi manual ke tailwind */
