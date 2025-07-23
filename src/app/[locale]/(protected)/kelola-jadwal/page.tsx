"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetJadwal } from "@/components/parts/admin/kelola-jadwal/api";
import { useBooking } from "@/components/parts/admin/kelola-booking/api";
import { useBiodata } from "@/components/parts/admin/kelola-biodata/api";
import {
  BiodataForm,
  BiodataFormSchema,
} from "@/components/parts/admin/kelola-biodata/validation";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function JadwalPage() {
  const router = useRouter();
  const [selectedTipe, setSelectedTipe] = useState<string>("");
  const [selectedMeja, setSelectedMeja] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([]);
  const [showBiodataForm, setShowBiodataForm] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [kodeBooking, setKodeBooking] = useState<string>("");

  const { data, isLoading } = useGetJadwal();
  const { mutateAsync: createBooking } = useBooking("POST");
  const { mutate: createBiodata } = useBiodata("POST");

  const form = useForm<BiodataForm>({
    resolver: zodResolver(BiodataFormSchema),
    defaultValues: {
      Nama: "",
      NoTelp: "",
      Alamat: "",
      BookingId: 0,
    },
  });

  const tipeOptions = Array.from(
    new Set(data?.data?.items.map((item) => item.meja?.TipeMeja))
  );
  const mejaOptions = Array.from(
    new Map(
      data?.data?.items
        .filter((item) => item.meja?.TipeMeja === selectedTipe)
        .map((item) => [item.meja.id, item.meja])
    ).values()
  );
  const jadwalList = data?.data?.items || [];
  const jadwalFiltered = jadwalList.filter(
    (item) => item.meja?.id === selectedMeja
  );

  const handleSlotClick = (jadwalId: number) => {
    setSelectedSlotIds((prevSelected) =>
      prevSelected.includes(jadwalId)
        ? prevSelected.filter((id) => id !== jadwalId)
        : [...prevSelected, jadwalId]
    );
  };

  const onSubmitBooking = async () => {
    if (!selectedMeja || !selectedDate || selectedSlotIds.length === 0) {
      alert("Harap pilih meja, tanggal, dan minimal satu slot jadwal.");
      return;
    }

    const transformData = {
      mejaId: String(selectedMeja),
      tanggal: selectedDate,
      jadwalIds: [...selectedSlotIds],
    };

    try {
      const response = await createBooking(transformData);
      const bookingId = response.data.booking.id;
      const kodeBooking = response.data.booking.KodeBooking;

      Cookies.set("bookingId", bookingId.toString(), { expires: 1 });
      Cookies.set("kodeBooking", kodeBooking, { expires: 1 });

      setBookingId(bookingId);
      setKodeBooking(kodeBooking);
      form.setValue("BookingId", bookingId);
      setShowBiodataForm(true);

      console.log("Booking ID dan kodeBooking disimpan di cookies:", bookingId, kodeBooking);
    } catch (error) {
      console.error("Gagal membuat booking:", error);
      alert("❌ Terjadi kesalahan saat membuat booking.");
    }
  };

  const onSubmitBiodata = (data: BiodataForm) => {
    createBiodata(data, {
      onSuccess: () => {
        alert("✅ Biodata berhasil disimpan.");
        router.push("/kelola-bukti/create");
      },
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Form Pilihan Meja dan Jadwal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            setSelectedTipe(e.target.value);
            setSelectedMeja(null);
            setSelectedSlotIds([]);
          }}
          value={selectedTipe}
        >
          <option value="">Pilih Tipe Meja</option>
          {tipeOptions.map((tipe) => (
            <option key={tipe} value={tipe}>
              {tipe}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => {
            setSelectedMeja(Number(e.target.value));
            setSelectedSlotIds([]);
          }}
          value={selectedMeja ?? ""}
          disabled={!selectedTipe}
        >
          <option value="">Pilih Meja</option>
          {mejaOptions.map((meja) => (
            <option key={meja.id} value={meja.id}>
              {meja.NamaMeja}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {selectedMeja && (
        <div className="grid md:grid-cols-2 gap-4 items-start">
          <div>
            <Image
              src={mejaOptions.find((m) => m.id === selectedMeja)?.Foto || ""}
              alt="Foto Meja"
              width={500}
              height={300}
              className="rounded shadow"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Jadwal Tersedia</h2>
            <div className="grid grid-cols-2 gap-2">
              {jadwalFiltered
                .sort((a, b) => a.StartTime.localeCompare(b.StartTime))
                .map((jadwal) => {
                  const isSelected = selectedSlotIds.includes(jadwal.id);
                  const isAvailable = jadwal.Status === "available";
                  return (
                    <button
                      key={jadwal.id}
                      onClick={() =>
                        isAvailable && handleSlotClick(jadwal.id)
                      }
                      className={`p-2 border rounded transition ${
                        isAvailable
                          ? isSelected
                            ? "bg-green-300 ring-2 ring-green-600"
                            : "bg-white hover:bg-green-100"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!isAvailable}
                    >
                      {jadwal.StartTime} - {jadwal.EndTime}
                    </button>
                  );
                })}
            </div>

            {selectedSlotIds.length > 0 && (
              <div className="pt-4">
                <button
                  className="w-full bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700"
                  onClick={onSubmitBooking}
                >
                  Lanjutkan Bayar ({selectedSlotIds.length} slot)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form Biodata */}
      {showBiodataForm && bookingId && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Isi Biodata Pemesan</h2>

          {kodeBooking && (
            <p className="mb-2 text-green-700 font-medium">
              Kode Booking Anda: <span className="font-bold">{kodeBooking}</span>
            </p>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitBiodata)}>
              <div className="space-y-3">
                <CustomFormInput<BiodataForm>
                  name="Nama"
                  label="Nama Pemesan"
                  placeholder="Masukkan Nama"
                />
                <CustomFormInput<BiodataForm>
                  name="Alamat"
                  label="Alamat"
                  placeholder="Masukkan Alamat"
                />
                <CustomFormInput<BiodataForm>
                  name="NoTelp"
                  label="No Telepon"
                  placeholder="Masukkan Nomor Telepon"
                />
                <CustomFormInput<BiodataForm>
                  name="BookingId"
                  label="Booking ID"
                  disabled
                />
              </div>
              <div className="mt-6">
                <Button type="submit" className="w-full rounded-full">
                  Simpan Biodata
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
