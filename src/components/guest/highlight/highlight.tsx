/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetMeja } from "@/components/parts/admin/kelola-meja/api";

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

// type MejaResponse = {
//   id: number;
//   NamaMeja: string;
//   Harga: number;
//   TipeMeja: string;
//   Foto: string;
//   Deskripsi: string;
// };

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

  if (isLoading) return <div className="px-20 py-28">Loading...</div>;

  return (
    <main className="px-20 py-28">
      <h1 className="text-2xl font-bold mb-4">Pilihan Meja Tersedia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </main>
  );

  <div className="">
    {mejaList.map((meja: any) => <div key={meja.id}>{meja.NamaMeja}</div>)}</div>
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
      <div className="w-full text-center font-semibold text-xl mb-2">
        {table.name}
      </div>
      <div className="relative w-full h-80 mb-4 overflow-hidden rounded">
        <img
          src={table.images[currentIndex]}
          alt={table.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 shadow"
        >
          <ChevronLeft className="w-4 h-10" />
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 shadow"
        >
          <ChevronRight className="w-4 h-10" />
        </button>
      </div>
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
 