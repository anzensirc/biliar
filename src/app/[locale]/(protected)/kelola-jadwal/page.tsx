"use client";

import { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetSyarat } from "@/components/parts/admin/syarat-ketentuan/api";
import { useGetAllJadwal } from "@/components/parts/admin/kelola-jadwal/api";
import { useBooking } from "@/components/parts/admin/kelola-booking/api";
import { useBiodata } from "@/components/parts/admin/kelola-biodata/api";
import {
  useGetQris,
  useGetQrisObj,
} from "@/components/parts/admin/kelola-qris/api";
import {
  BiodataForm,
  BiodataFormSchema,
} from "@/components/parts/admin/kelola-biodata/validation";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

export default function JadwalPage() {
  const router = useRouter();
  const [selectedTipe, setSelectedTipe] = useState<string>("");
  const [selectedMeja, setSelectedMeja] = useState<number | null>(null);  
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([]);
  const [kodeBooking, setKodeBooking] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false); // ⬅️ tambahkan ini
  const [isLocked, setIsLocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data, isLoading } = useGetAllJadwal();
  const { data: syaratData, isLoading: isLoadingSyarat } = useGetSyarat();
  const { mutate: createBooking } = useBooking("POST");
  const { mutate: createBiodata } = useBiodata("POST");
  const { data: qrisData, isLoading: isLoadingQris } = useGetQris();
  const { data: qrisDataObj, isLoading: isLoadingQrisObj } = useGetQrisObj();
  const QrisFoto = qrisData?.data.items[0].Foto;
  const form = useForm<BiodataForm>({
    resolver: zodResolver(BiodataFormSchema),
    defaultValues: {
      Nama: "",
      NoTelp: "",
      Alamat: "",
      Email: "",
      BookingId: 0,
    },
  });

  const handleCopy = () => {
    if (kodeBooking) {
      navigator.clipboard.writeText(kodeBooking);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const tipeOptions = Array.from(
    new Set(data?.data.map((item) => item.meja?.TipeMeja))
  );
  const mejaOptions = Array.from(
    new Map(
      data?.data
        .filter((item) => item.meja?.TipeMeja === selectedTipe)
        .map((item) => [item.meja.id, item.meja])
    ).values()
  );

  const jadwalList = data?.data || [];
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

  const onSubmitBooking = () => {
    if (!selectedMeja || !selectedDate || selectedSlotIds.length === 0) {
      alert("Harap pilih meja, tanggal, dan minimal satu slot jadwal.");
      return;
    }

    const transformData = {
      mejaId: String(selectedMeja),
      tanggal: selectedDate,
      jadwalIds: [...selectedSlotIds],
    };

    createBooking(transformData, {
      onSuccess: (response) => {
        Cookies.set("bookingId", response.data.id.toString(), { expires: 1 });
        Cookies.set("kodeBooking", response.data.KodeBooking, { expires: 1 });
        form.reset({
          BookingId: response.data.id,
        });
        setKodeBooking(response.data.KodeBooking);
        setIsLocked(true);
      },
    });
  };

  const bookingId = form.watch("BookingId");

  const onSubmitBiodata = (data: BiodataForm) => {
    if (!termsAccepted) {
      alert("❌ Anda harus menyetujui syarat dan ketentuan terlebih dahulu.");
      return;
    }

    createBiodata(data, {
      onSuccess: () => {
        alert("✅ Biodata berhasil disimpan.");
        router.push("/upload-bukti/temp");
      },
    });
  };
  const selectedMejaObj = mejaOptions.find((m) => m.id === selectedMeja);
  const hargaPerSlot = Number(selectedMejaObj?.Harga || 0);
  const totalHarga = hargaPerSlot * selectedSlotIds.length;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold pl-16 mb-6">Booking Meja</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* KIRI: Gambar */}
        <div className="flex justify-center">
          {selectedMeja ? (
            <Image
              src={mejaOptions.find((m) => m.id === selectedMeja)?.Foto || ""}
              alt="Foto Meja"
              width={500}
              height={400}
              className="rounded shadow"
            />
          ) : (
            // Default image jika belum memilih meja
            <Image
              src="/images/meja-base.jpg" // Ganti dengan path gambar default yang tersedia di public/
              alt="Default Meja"
              width={500}
              height={400}
              className="rounded shadow"
            />
          )}
        </div>

        {/* KANAN: Form Pilihan dan Jadwal */}
        <div className="space-y-4">
          {/* Pilihan Tipe, Meja, dan Tanggal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="border p-2 rounded bg-blue-400 hover:bg-blue-500 text-white"
              onChange={(e) => {
                setSelectedTipe(e.target.value);
                setSelectedMeja(null);
                setSelectedSlotIds([]);
              }}
              value={selectedTipe}
              disabled={isLocked}
            >
              <option value="">Pilih Tipe Meja</option>
              {tipeOptions.map((tipe) => (
                <option key={tipe} value={tipe}>
                  {tipe}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded bg-blue-400 hover:bg-blue-500 text-white"
              onChange={(e) => {
                setSelectedMeja(Number(e.target.value));
                setSelectedSlotIds([]);
              }}
              value={selectedMeja ?? ""}
              disabled={!selectedTipe || isLocked}
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
              className="border p-2 rounded bg-blue-400 hover:bg-blue-500 text-white"
              value={selectedDate}
              disabled={isLocked}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* Jadwal atau pesan jika belum pilih meja */}
          {selectedMeja ? (
            <>
              <h2 className="text-xl font-semibold">Jadwal Tersedia</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {jadwalFiltered
                  .sort((a, b) => a.StartTime.localeCompare(b.StartTime))
                  .map((jadwal) => {
                    const isAvailable =
                      jadwal.Status?.toLowerCase() === "available";
                    const isSelected = selectedSlotIds.includes(jadwal.id);
                    const jadwalClass = !isAvailable
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : isSelected
                        ? "bg-green-300 ring-2 ring-green-600"
                        : "bg-white hover:bg-green-100";

                    return (
                      <button
                        key={jadwal.id}
                        onClick={() =>
                          isAvailable && handleSlotClick(jadwal.id)
                        }
                        className={`w-full p-4 h-24 border rounded-lg transition text-base text-left ${jadwalClass}`}
                        disabled={!isAvailable || isLocked}
                      >
                        <div className="flex flex-col text-sm">
                          <span>
                            {selectedDate
                              ? `${new Date(selectedDate).getDate()} ${new Date(selectedDate).toLocaleString("id-ID", { month: "long" })} ${new Date(selectedDate).getFullYear()}`
                              : "-"}
                          </span>
                          <span>
                            {jadwal.StartTime} - {jadwal.EndTime}
                          </span>
                          <span className="text-xs text-gray-500">
                            {isAvailable
                              ? "Tersedia"
                              : "Penuh / Sedang Dipesan"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>

              {selectedSlotIds.length > 0 && !isLocked && (
                <div className="pt-4">
                  <button
                    className="w-full bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onSubmitBooking}
                    disabled={isLocked}
                  >
                    Lanjutkan Bayar ({selectedSlotIds.length} slot)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-500 italic">
              Silakan pilih meja terlebih dahulu untuk melihat jadwal tersedia.
            </div>
          )}
        </div>
      </div>

      {bookingId !== 0 && (
        //masukkan di sini booking summary-nya
        <div className="mt-10 border-t pt-6">
          {/* Cart Ringkasan Pemesanan */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 border rounded p-4 bg-gray-50">
            {/* Kolom Kiri - Ringkasan */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Ringkasan Pemesanan
              </h2>

              {/* Info Meja */}
              <div className="grid grid-cols-[150px_1fr] gap-y-1 text-gray-800 text-sm mb-4">
                <div className="font-medium">Kode Booking</div>
                <div>
                  : {kodeBooking || "-"}
                  {kodeBooking && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-blue-600 hover:text-blue-800 ml-2"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                <div className="font-medium">Nama Meja</div>
                <div>: {selectedMejaObj?.NamaMeja || "-"}</div>

                <div className="font-medium">Tipe Meja</div>
                <div>: {selectedMejaObj?.TipeMeja || "-"}</div>

                <div className="font-medium">Tanggal</div>
                <div>
                  :{" "}
                  {new Date(selectedDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* Jadwal Terpilih */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 font-medium mb-1">
                  Slot Terpilih:
                </div>
                <ul className="list-disc list-inside text-gray-800">
                  {jadwalFiltered
                    .filter((j) => selectedSlotIds.includes(j.id))
                    .map((j) => (
                      <li key={j.id}>
                        {j.StartTime} - {j.EndTime}
                      </li>
                    ))}
                </ul>
              </div>

              <hr className="my-4 border-t" />

              {/* Harga */}
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Harga x {selectedSlotIds.length} Jam Main</span>
                <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total Bayar</span>
                <span className="text-green-700">
                  Rp {totalHarga.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Kolom Kanan - Gambar QRIS */}
            <div className="flex items-center justify-center">
              {QrisFoto ? (
                <div className="relative w-64 h-64 border rounded overflow-hidden">
                  <Image
                    src={QrisFoto}
                    alt="QRIS"
                    width={640}
                    height={640}
                    className="object-contain"
                  />
                </div>
              ) : (
                <p className="text-black-500 text-center">
                  QRIS tidak tersedia
                </p>
              )}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Isi Biodata Pemesan</h2>

          {kodeBooking && (
            <p className="mb-2 text-green-700 font-medium">
              Kode Booking Anda:{" "}
              <span className="font-bold">
                {kodeBooking}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline text-blue-600 hover:text-blue-800 ml-2"
                >
                  {copied ? (
                    <Check className="w-4 h-4 inline" />
                  ) : (
                    <Copy className="w-4 h-4 inline" />
                  )}
                </button>
              </span>
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
                  name="Email"
                  label="Email"
                  placeholder="Masukkan Email"
                />
                <CustomFormInput<BiodataForm>
                  name="BookingId"
                  label="Booking ID"
                  disabled
                />
              </div>
              <div className="bg-yellow-100 mx-2 my-6 px-4 py-8 rounded border border-yellow-400 text-sm text-yellow-900">
                <h3 className="text-base font-semibold mb-2">
                  Syarat dan Ketentuan
                </h3>
                {isLoadingSyarat ? (
                  <p>Memuat syarat dan ketentuan...</p>
                ) : (
                  <p className="whitespace-pre-line">
                    {syaratData?.data?.syarat || "Tidak ada syarat tersedia."}
                  </p>
                )}
              </div>
              <div className="mt-4 flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  Saya telah membaca dan menyetujui{" "}
                  <span className="font-medium text-blue-700">
                    Syarat dan Ketentuan
                  </span>
                  .
                </label>
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full rounded-full"
                  disabled={!termsAccepted}
                >
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
