/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetMeja } from "@/components/parts/admin/kelola-meja/api";

export default function Highlight() {
  const { data, isLoading } = useGetMeja();
  const mejaList = data?.data?.items || [];

  const filteredTables = useMemo(() => {
    const groupByType = (tipe: string) =>
      mejaList.filter((m) => m.TipeMeja?.toLowerCase() === tipe.toLowerCase());

    const mejaKecilList = groupByType("Meja Kecil");
    const mejaBesarList = mejaList.filter((m) =>
      ["meja besar", "besar"].includes(m.TipeMeja?.toLowerCase() || "")
    );

    const tables = [];

    if (mejaKecilList.length > 0) {
      tables.push({
        id: 1,
        name: "Meja Kecil",
        category: "Meja Kecil",
        items: mejaKecilList.map((m) => ({
          img: m.Foto,
          desc: m.Deskripsi,
          harga: m.Harga,
          nama: m.NamaMeja,
        })),
      });
    }

    if (mejaBesarList.length > 0) {
      tables.push({
        id: 2,
        name: "Meja Besar",
        category: "Meja Besar",
        items: mejaBesarList.map((m) => ({
          img: m.Foto,
          desc: m.Deskripsi,
          harga: m.Harga,
          nama: m.NamaMeja, 
        })),
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
  category: string;
  items: { img: string; desc: string; harga: string; nama: string }[];
};

function TableCard({ table }: { table: Table }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? table.items.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === table.items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = table.items[currentIndex];

  return (
    <div className="bg-blue-100 rounded-xl shadow-lg p-4 flex flex-col items-center space-y-4 transition-all duration-300 hover:scale-105">
      <div className="text-lg sm:text-xl font-semibold text-center">{currentItem.nama}</div>

      <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
        <img
          src={currentItem.img}
          alt={`${table.name} ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {table.items.length > 1 && (
          <>
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
          </>
        )}
      </div>

      {table.items.length > 1 && (
        <div className="flex gap-1 justify-center mt-2">
          {table.items.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                currentIndex === idx ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

<Link
  href={`/booking?tipe=${encodeURIComponent(table.category)}&nama=${encodeURIComponent(currentItem.nama)}`}
  className="bg-blue-500 hover:bg-green-500 text-white text-sm sm:text-base px-4 py-2 rounded transition-all duration-300"
>
  Lihat Jadwal
</Link>


      <div className="w-full bg-white p-4 rounded text-sm sm:text-base text-justify transition-all duration-300 space-y-3">
        <div>
          <h3 className="font-bold mb-1">Harga:</h3>
          <p className="font-bold">Rp {Number(currentItem.harga).toLocaleString("id-ID")}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Deskripsi:</h3>
          <p>{currentItem.desc}</p>
        </div>
      </div>
    </div>
  );
}
