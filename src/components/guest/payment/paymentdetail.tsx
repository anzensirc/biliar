"use client";
import { Copy } from "lucide-react";
const bookingCode = "TRX123456";
const handleCopy = () => {
  navigator.clipboard.writeText(bookingCode);
  // Optionally: show toast / alert
};
export default function PaymentDetail() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <h2 className="text-xl font-semibold">Pembayaran</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Transaction Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Kode Booking</label>

            <div className="flex">
              <input
                type="text"
                value={bookingCode}
                readOnly
                className="w-full border rounded-l px-3 py-2 bg-gray-100"
              />
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm">Nama Pemesan</label>
            <input
              type="text"
              value="Nama Pemesan"
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm">Tanggal Pemesanan</label>
            <input
              type="text"
              value="01-07-2025"
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm">
              Batas Akhir Waktu Pembayaran
            </label>
            <input
              type="text"
              value="02-07-2025 23:59"
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm">Status Pembayaran</label>
            <input
              type="text"
              value="Menunggu Pembayaran"
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>
        </div>

        {/* QRIS */}
        <div className="flex items-center justify-center border rounded-lg bg-gray-100 h-64">
          <span className="text-gray-500">QRIS</span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border rounded-lg p-4 mb-10 bg-white">
        <h3 className="font-semibold mb-4">Ringkasan Pemesanan</h3>
        <div className="space-y-2">
          <div>
            <p className="font-medium">Meja Kecil</p>
            <p className="text-sm text-gray-600">Meja kecil 2</p>
            <p className="text-sm text-gray-600">Hari, tanggal xx.xx - xx.xx</p>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span>Harga</span>
            <span>Rp. 20.000</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span>Platform Fee</span>
            <span>Rp. 6.500</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Total Bayar</span>
            <span>Rp. 26.000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
