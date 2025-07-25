"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingResponse } from "../parts/admin/kelola-booking/interface";
import { BuktiResponse } from "../parts/admin/kelola-bukti/interface";
import Image from "next/image";
import { useGetBukti } from "../parts/admin/kelola-bukti/api";

export default function ModalDetailBiodata({
  data,
}: {
  data: BookingResponse;
}) {
  const biodata = data.BiodataBooking[0];

  const { data: Bukti } = useGetBukti();
  const buktiByKodeBooking = Bukti?.data.items.find(
    (item: BuktiResponse) => item.KodeBookingID === data.KodeBooking
  );

  const fotoBukti = buktiByKodeBooking?.Foto;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-left text-sm px-2 py-1 hover:bg-gray-100 text-blue-600">
          Detail
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Biodata & Bukti</DialogTitle>
        </DialogHeader>

        {/* Biodata */}
        {biodata ? (
          <div className="grid gap-2 grid-cols-2 mb-4">
            <div>
              <strong>Nama:</strong> {biodata.Nama}
            </div>
            <div>
              <strong>No. Telepon:</strong> {biodata.NoTelp}
            </div>
            <div>
              <strong>Alamat:</strong> {biodata.Alamat.length > 20 ? `${biodata.Alamat.substring(0, 20)}...` : biodata.Alamat}
            </div>
            <div>
              <strong>Email:</strong> {biodata.Email}
            </div>
            <div>
              <strong>Tanggal Memesan:</strong> {data.createdAt}
            </div>
            <div>
              <strong>Kode Booking:</strong> {data.KodeBooking}
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground mb-4">
            Data biodata tidak tersedia.
          </div>
        )}

        {/* Bukti */}
        {fotoBukti ? (
          <div>
            <p className="font-semibold mb-1">Bukti Pembayaran:</p>
            <Image
              src={fotoBukti}
              alt="Bukti Pembayaran"
              width={500}
              height={700}
              className="max-w-full rounded border"
            />
          </div>
        ) : (
          <div className="text-muted-foreground">
            Bukti pembayaran tidak tersedia.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
