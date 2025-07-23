"use client";

import Image from "next/image";
import { useState } from "react";

export default function UploadBukti() {
  const [bookingCode, setBookingCode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = () => {
    if (!bookingCode || !file) {
      alert("Lengkapi kode booking dan upload bukti terlebih dahulu.");
      return;
    }
    // Lakukan upload ke backend di sini
    alert(`Bukti untuk booking ${bookingCode} telah dikirim!`);
  };

  return (
    <div className="w-full flex justify-center pt-[51px]">
      <div className="w-full md:w-4/6 max-w-5xl mx-auto px-10 py-8 bg-gray-300 rounded-md space-y-6">
        <h2 className="text-lg font-semibold">Upload Bukti Pembayaran</h2>
        <div>
          <label className="block text-sm mb-1">Kode Booking</label>
          <input
            type="text"
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value)}
            placeholder="Masukkan kode booking"
            className="w-full border bg-white text-white-100 rounded px-3 py-2"
            // className="w-full border bg-red-500 text-white-300 rounded px-3 py-2"
            // className="w-full border border-blue-500 bg-gray-100 text-blue-900 rounded px-3 py-2"
          />
        </div>

        <div className="border rounded bg-white flex flex-col items-center justify-center py-8">
          {preview ? (
            <Image
              src={preview}
              alt="Preview Image"
              width={600} // isi sesuai kebutuhan
              height={400} // isi sesuai kebutuhan
              className="mb-4 object-contain max-h-80 w-auto"
            />
          ) : (
            <span className="text-gray-500 mb-4">Belum ada file dipilih</span>
          )}
          <label className="cursor-pointer bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
            Upload Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-blue-300 transition"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
