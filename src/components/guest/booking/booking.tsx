"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useGetBanner } from "@/components/parts/admin/kelola-banner/api";
const tableCategories = ["Meja Kecil", "Meja Besar"] as const;
const tableNumbers = {
  "Meja Kecil": [1],
  "Meja Besar": [1, 2, 3],
};
export default function Booking() {
  const {data, isLoading} = useGetBanner();
  const banner = data?.data;
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromQuery = searchParams.get(
    "category"
  ) as (typeof tableCategories)[number];

  const today = new Date().toISOString().slice(0, 10);

  const [selectedCategory, setSelectedCategory] = useState<
    (typeof tableCategories)[number] | null
  >(null);
  const [selectedTableNumber, setSelectedTableNumber] = useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState(today);
  ``;
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showNumberOptions, setShowNumberOptions] = useState(false);

  const slots = [
    { time: "12.00 - 13.00", status: "Tersedia" },
    { time: "13.00 - 14.00", status: "Booked" },
    { time: "14.00 - 15.00", status: "Booked" },
    { time: "15.00 - 16.00", status: "Tersedia" },
    { time: "16.00 - 17.00", status: "Booked" },
    { time: "17.00 - 18.00", status: "Booked" },
    { time: "18.00 - 19.00", status: "Tersedia" },
    { time: "19.00 - 20.00", status: "Tersedia" },
    { time: "20.00 - 21.00", status: "Booked" },
    { time: "21.00 - 22.00", status: "Booked" },
    { time: "22.00 - 23.00", status: "Tersedia" },
    { time: "23.00 - 24.00", status: "Tersedia" },
    { time: "24.00 - 01.00", status: "Tersedia" },
    { time: "01.00 - 02.00", status: "Tersedia" },
  ];

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
      setShowCategoryOptions(false);
      setShowNumberOptions(true);
    }
  }, [categoryFromQuery]);

  const toggleSlot = (slotTime: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slotTime)
        ? prev.filter((time) => time !== slotTime)
        : [...prev, slotTime]
    );
  };

  const handleContinue = () => {
    if (
      selectedCategory &&
      selectedTableNumber &&
      selectedDate &&
      selectedSlots.length > 0
    ) {
      router.push(
        `/payment?category=${selectedCategory}&table=${selectedTableNumber}&date=${selectedDate}&slots=${selectedSlots.join(",")}`
      );
    } else {
      alert("Lengkapi kategori, meja, tanggal, dan minimal satu slot!");
    }
  };

  return (
    <main className="px-20 py-2 flex flex-col lg:flex-row gap-12">
      {/* Kiri: Detail meja */}
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-4">
          {selectedCategory && selectedTableNumber
            ? `Pesan ${selectedCategory}-${selectedTableNumber}`
            : "Pesan Meja"}
        </h1>

        <div className="w-full h-80 bg-gray-300 flex items-center justify-center mb-4 relative overflow-hidden">
          {selectedCategory && selectedTableNumber ? (
            <Image
              src={`/images/tables/${selectedCategory}-${selectedTableNumber}.jpg`}
              alt={`${selectedCategory}-${selectedTableNumber}`}
              fill
              style={{ objectFit: "cover" }}
              className="absolute"
            />
          ) : (
            <Image
              src={`/images/meja-base.jpg`}
              alt="Meja Kecil"
              fill
              style={{ objectFit: "cover" }}
              className=""
            />
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p className="mb-2">
            {selectedCategory && selectedTableNumber
              ? `Deskripsi ${selectedCategory}-${selectedTableNumber}`
              : "Deskripsi Singkat Meja"}
          </p>
          <p>Harga : Rp20.000 / jam</p>
        </div>
      </div>

      <div className="flex-1 relative">
        {/* Pilih Kategori */}
        <div className="w-full mb-4">
          <label className="block mb-1 font-semibold">
            Pilih Kategori Meja
          </label>
          <div className="border border-black bg-white rounded">
            {tableCategories.map((category, idx) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedTableNumber(null);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 hover:bg-green-300 ${
                    isSelected ? "bg-green-400 text-white" : ""
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`ml-4 inline-block w-4 h-4 rounded-full border-2 border-gray-300 ${
                      isSelected ? "bg-blue-600" : "bg-white"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
        {/* Pilih Nomor Meja */}
        {selectedCategory && (
          <div className="w-full mb-4">
            <label className="block mb-1 font-semibold">Pilih Nomor Meja</label>
            <div className="border border-black bg-white rounded">
              {(tableNumbers[selectedCategory] || []).map((num) => {
                const isSelected = selectedTableNumber === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedTableNumber(num)}
                    className={`w-full flex items-center justify-between px-4 py-2 hover:bg-green-200 ${
                      isSelected ? "bg-green-400 text-white" : ""
                    }`}
                  >
                    <span>{`${selectedCategory}-${num}`}</span>
                    <span
                      className={`ml-4 inline-block w-4 h-4 rounded-full border-2 border-gray-300 ${
                        isSelected ? "bg-blue-600" : "bg-white"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {/* Pilih Tanggal */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Pilih Tanggal</label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="
                w-full border border-black bg-white text-black
                p-2 rounded focus:border-white focus:ring-2 focus:ring-black
                [&::-webkit-calendar-picker-indicator]:invert
                [&::-webkit-calendar-picker-indicator]:cursor-pointer
                appearance-none
              "
            />

          </div>
        </div>
        {/* Tanggal terpilih */}
        {selectedDate && (
          <p className="font-medium mb-2">Tanggal Terpilih: {selectedDate}</p>
        )}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {slots.map((slot, idx) => {
            const isSelected = selectedSlots.includes(slot.time);
            const isBooked = slot.status === "Booked";

            return (
              <button
                key={idx}
                disabled={isBooked}
                onClick={() => toggleSlot(slot.time)}
                className={`flex flex-col items-center justify-center p-3 space-y-1 rounded ${
                  isBooked
                    ? "bg-gray-400 cursor-not-allowed"
                    : isSelected
                      ? "bg-green-400 text-white"
                      : "bg-gray-200 hover:bg-blue-200"
                }`}
              >
                {selectedDate && (
                  <p className="text-xs font-semibold space-x-2">
                    Tanggal: {selectedDate}
                  </p>
                )}
                <p className="text-sm font-bold">{slot.time}</p>
      
                <p
                  className={`text-xs ${
                    isBooked
                      ? "text-red-600 font-semibold text-base"
                      : "text-white-600 font-semibold"
                  }`}
                >
                  {slot.status}
                </p>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded transition hover:bg-gray-700 active:scale-95"
        >
          Lanjutkan Pembayaran
        </button>
      </div>
    </main>
  );
}
