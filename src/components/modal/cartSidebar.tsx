"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function CartSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-lg p-4 z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Tombol Close */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Cart</h2>
        <button onClick={onClose} className="p-1">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Daftar Item */}
      <div className="space-y-4 overflow-y-auto h-[70%] pr-2">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-bold">Meja Kecil</h3>
          <p>Meja No. 1</p>
          <p>26-Juni-2025 10.00 - 11.00</p>
          <p>Rp20.000</p>
          <button className="text-xs mt-2 px-2 py-1 bg-gray-200 rounded">
            Hapus
          </button>
        </div>

        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-bold">Meja Besar</h3>
          <p>Meja No. 1</p>
          <p>26-Juni-2025 12.00 - 13.00</p>
          <p>Rp20.000</p>
          <button className="text-xs mt-2 px-2 py-1 bg-gray-200 rounded">
            Hapus
          </button>
        </div>
      </div>

      {/* Tombol Bayar */}
      <Link href="/payment" passHref>
        <button className="w-full mt-6 px-4 py-2 bg-gray-300 rounded border shadow">
          Lanjutkan Pembayaran
        </button>
      </Link>
    </div>
  );
}
