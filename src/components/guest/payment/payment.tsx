"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Payment() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePaymentConfirmation = () => {
    const isChecked = confirm(
      "Apakah Anda yakin ingin melanjutkan ke pembayaran?"
    );
    if (!isChecked) return;
    if (!termsAccepted) {
      alert("Anda harus menyetujui syarat & ketentuan terlebih dahulu.");
      return;
    }
    if (!fullName || !whatsapp || !address) {
      alert("Harap lengkapi semua detail customer sebelum melanjutkan.");
      return;
    }
    alert("Pembayaran dikonfirmasi!");
    router.push("/payment/detail");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-10 space-y-8">
      <h2 className="text-xl font-semibold">Pembayaran</h2>

      {/* Customer Detail */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Customer Detail</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm">Nama Lengkap</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white text-black"
              placeholder="Nama Lengkap"
            />
          </div>
          <div>
            <label className="block text-sm">No Whatsapp</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white text-black"
              placeholder="No Whatsapp"
            />
          </div>
          <div>
            <label className="block text-sm">Alamat</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-white text-black"
              placeholder="Alamat"
            />
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Ringkasan Pemesanan</h3>
        <div className="space-y-2">
          <div>
            <p className="font-medium">Meja Kecil x</p>
            <p className="text-sm text-gray-600">Meja kecil</p>
            <p className="text-sm text-gray-600">Hari, tanggal</p>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span>Harga</span>
            <span>Rp. 20.000</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Total Bayar</span>
            <span>Rp. 20.000</span>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-semibold">
          ✅ Syarat & Ketentuan Reservasi Billiard
        </h3>
        <div className="space-y-2 text-sm">
          <p>
            Sebelum melanjutkan ke pembayaran, harap membaca dan menyetujui
            syarat & ketentuan berikut:
          </p>
          <div>
            <p className="font-semibold">📌 Ketentuan Umum</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>
                Reservasi hanya berlaku setelah pembayaran dikonfirmasi...
              </li>
              <li>Harap datang minimal 10 menit sebelum waktu reservasi...</li>
              <li>
                Durasi permainan akan dihitung sesuai waktu yang telah
                dipesan...
              </li>
            </ol>
          </div>
          <div>
            <p className="font-semibold">🚫 Peraturan Penting di Lokasi</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Dilarang duduk di atas meja billiard...</li>
              <li>
                Dilarang meletakkan atau benda panas di atas meja billiard...
              </li>
              <li>Apabila terjadi kerusakan peralatan...</li>
            </ol>
          </div>
          <div>
            <p className="font-semibold">💸 Pembayaran & Refund</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Pembayaran dilakukan secara online dan bersifat final.</li>
              <li>Tidak ada refund untuk pembatalan sepihak oleh pelanggan.</li>
              <li>Jika ingin mengganti jadwal...</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="w-4 h-4 appreance-none border border-black bg-white  "
          />
          <label className="text-sm">
            Dengan melanjutkan ke pembayaran, Anda menyatakan telah membaca dan
            menyetujui seluruh syarat dan ketentuan di atas.
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            // className="w-4 h-4 appearance-none border border-gray-400 bg-white checked:bg-blue-500 checked:border-transparent"
            className="w-4 h-4 accent-white border border-gray-400"
          />
          <label className="text-sm">
            Dengan melanjutkan ke pembayaran, Anda menyatakan telah membaca dan
            menyetujui seluruh syarat dan ketentuan di atas.
          </label>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handlePaymentConfirmation}
        className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-700 transition"
      >
        Konfirmasi Pembayaran
      </button>
    </div>
  );
}
