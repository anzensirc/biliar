"use client";

import { useState } from "react";
import { useBooking } from "@/components/parts/admin/kelola-booking/api";
import { useGetAllJadwal } from "@/components/parts/admin/kelola-jadwal/api";
import { Button } from "@/components/ui/button";

export default function AdminBookingCreatePage() {
  const [selectedTipe, setSelectedTipe] = useState<string>("");
  const [selectedMeja, setSelectedMeja] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([]);
  const [bookingResult, setBookingResult] = useState<any>(null);

  const { data } = useGetAllJadwal();
  const { mutate: createBooking } = useBooking("POST");

  const jadwalList = data?.data || [];

  const tipeOptions = Array.from(
    new Set(jadwalList.map((item) => item.meja?.TipeMeja))
  );

  const mejaOptions = Array.from(
    new Map(
      jadwalList
        .filter((item) => item.meja?.TipeMeja === selectedTipe)
        .map((item) => [item.meja.id, item.meja])
    ).values()
  );

  const jadwalFiltered = jadwalList.filter(
    (item) => item.meja?.id === selectedMeja
  );

  const handleSlotClick = (jadwalId: number) => {
    setSelectedSlotIds((prev) =>
      prev.includes(jadwalId)
        ? prev.filter((id) => id !== jadwalId)
        : [...prev, jadwalId]
    );
  };

  const handleSubmit = () => {
    if (!selectedMeja || selectedSlotIds.length === 0) return;

    const payload = {
      mejaId: String(selectedMeja),
      tanggal: selectedDate,
      jadwalIds: selectedSlotIds,
    };

    createBooking(payload, {
      onSuccess: (res) => {
        setBookingResult(res.data);
        setSelectedSlotIds([]);
      },
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Tambah Booking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kiri - Form Pilihan */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4 shadow">
          <div className="font-semibold text-lg text-blue-800">Form Pilihan</div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Meja
            </label>
            <select
              className="w-full p-2 border rounded bg-white"
              value={selectedTipe}
              onChange={(e) => {
                setSelectedTipe(e.target.value);
                setSelectedMeja(null);
                setSelectedSlotIds([]);
              }}
            >
              <option value="">Pilih Tipe Meja</option>
              {tipeOptions.map((tipe) => (
                <option key={tipe} value={tipe}>
                  {tipe}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Meja
            </label>
            <select
              className="w-full p-2 border rounded bg-white"
              value={selectedMeja ?? ""}
              onChange={(e) => setSelectedMeja(Number(e.target.value))}
              disabled={!selectedTipe}
            >
              <option value="">Pilih Meja</option>
              {mejaOptions.map((meja) => (
                <option key={meja.id} value={meja.id}>
                  {meja.NamaMeja}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded bg-yellow-300 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* Kanan - Slot Jadwal dan Simpan */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow flex flex-col justify-between">
          <div>
            <div className="font-semibold text-lg text-green-800 mb-4">
              Pilih Jam Booking
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {selectedMeja &&
                jadwalFiltered
                  .sort((a, b) => a.StartTime.localeCompare(b.StartTime))
                  .map((jadwal) => {
                    const isAvailable =
                      jadwal.Status?.toLowerCase() === "available";
                    const isSelected = selectedSlotIds.includes(jadwal.id);
                    const baseClass =
                      "p-3 border rounded text-sm transition text-center";

                    const style = !isAvailable
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "bg-green-600 text-white ring-2 ring-green-800"
                      : "bg-white hover:bg-green-100";

                    return (
                      <button
                        key={jadwal.id}
                        onClick={() => isAvailable && handleSlotClick(jadwal.id)}
                        disabled={!isAvailable}
                        className={`${baseClass} ${style}`}
                      >
                        {jadwal.StartTime} - {jadwal.EndTime}
                      </button>
                    );
                  })}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!selectedMeja || selectedSlotIds.length === 0}
              className="w-48 rounded-full"
            >
              Simpan Booking
            </Button>
          </div>
        </div>
      </div>

      {/* Hasil Booking */}
      {bookingResult && (
        <div className="mt-10 bg-white border rounded-xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4 text-green-700">
            ✅ Booking Berhasil Dibuat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <strong>Kode Booking:</strong> {bookingResult.KodeBooking}
              </p>
              <p>
                <strong>ID Booking:</strong> {bookingResult.id}
              </p>
              <p>
                <strong>Tanggal:</strong>{" "}
                {new Date(bookingResult.Tanggal).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
