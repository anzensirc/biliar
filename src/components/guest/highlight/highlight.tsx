/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type Table = {
  id: number;
  name: string;
  description: string;
  category: string;
  images: string[];
};

const mejaKecilDescription = `
🎱 Meja Biliar Kecil
Meja biliar kecil cocok untuk pemain pemula, keluarga, atau area dengan ruang terbatas.
Ukuran umumnya 6-7 feet (1.8–2.1 meter) dengan rangka kayu solid atau MDF berkualitas.
Permukaan dilapisi kain felt halus, bumper karet responsif, pocket jaring atau plastik.
Kelebihan: hemat tempat, harga terjangkau.
Kekurangan: tidak cocok untuk turnamen profesional.
`;

const mejaBesarDescription = `
🎱 Meja Biliar Besar
Meja biliar besar berstandar turnamen dengan ukuran 8-9 feet (2.4–2.7 meter).
Menggunakan rangka kayu keras premium dan permukaan slate stone untuk presisi optimal.
Dilengkapi cushion karet profesional, pocket kulit standar regulasi, dan aksesori lengkap.
Kelebihan: akurasi tinggi, cocok untuk kompetisi.
Kekurangan: butuh ruang besar, harga lebih tinggi.
`;

export default function Highlight() {
  const tables: Table[] = [
    {
      id: 1,
      name: "Meja 1",
      description: mejaBesarDescription.replace(/\n/g, ""),
      category: "Meja Kecil",
      images: [
        "/images/mejakecil1.jpeg",
        "/images/mejakecil2.jpeg",
        "/images/mejakecil3.jpeg",
      ],
    },
    {
      id: 2,
      name: "Meja 2",
      description: mejaBesarDescription.replace(/\n/g, ""),
      category: "Meja Besar",
      images: [
        "/images/mejabesar1.jpeg",
        "/images/mejabesar2.jpeg",
        "/images/mejabesar3.jpeg",
      ],
    },
  ];

  return (
    <main className="px-20 py-28">
      <h1 className="text-2xl font-bold mb-4">Pilihan Meja Tersedia</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </main>
  );
}

function TableCard({ table }: { table: Table }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? table.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === table.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-blue-200 rounded-lg shadow p-4 flex flex-col items-center relative">
      {/* Slider */}
      <div className="w-full h-5 mb-4 overflow-hidden rounded">table.name</div>
      <div className="relative w-full h-80 mb-4 overflow-hidden rounded">
        <img
          src={table.images[currentIndex]}
          alt={table.name}
          className="w-full h-full object-cover"
        />

        {/* Tombol panah */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 shadow"
        >
          <ChevronLeft className="w-4 h-10" />
        </button>
        <div className="w-full h-5 mb-4 overflow-hidden rounded">
          Meja Kecil
        </div>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 shadow"
        >
          <ChevronRight className="w-4 h-10" /> {/* Sesuaikan ukuran */}
        </button>
      </div>

      {/* Tombol Link Next.js */}
      <Link
        href={`/booking?category=${encodeURIComponent(table.category)}`}
        className="bg-blue-500 hover:bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block text-center"
      >
        Lihat Jadwal
      </Link>

      <div className="w-full bg-white p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Deskripsi:</h3>
        <p className="text-black-700">{table.description}</p>
      </div>
    </div>
  );
}
