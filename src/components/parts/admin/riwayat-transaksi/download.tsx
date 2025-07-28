import { ColumnDef } from "@tanstack/react-table";
import { BookingResponse } from "./interface";
import Image from "next/image";

export const riwayatallColumns = (
  data: BookingResponse[]
): ColumnDef<BookingResponse>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "KodeBooking",
    header: "Kode Booking",
    cell: ({ row }) => row.original.KodeBooking,
  },
  {
    accessorKey: "meja",
    header: "Meja",
    cell: ({ row }) => row.original.meja.NamaMeja,
  },
  {
    accessorKey: "Tanggal",
    header: "Tanggal Booking",
    cell: ({ row }) => `${row.original.Tanggal.split("T")[0]}`,
  },
{
  accessorKey: "Jam Main",
  header: "Jam Main",
  cell: ({ row }) => (
    <div className="grid grid-cols-3 gap-1 max-w-xs">
      {row.original.JamBooking.map((item, i) => (
        <span
          key={i}
          className="p-1 text-xs text-center bg-gray-100 rounded"
        >
          {item.JadwalMeja.StartTime}-{item.JadwalMeja.EndTime}
        </span>
      ))}
    </div>
  ),
},
  {
    accessorKey: "durasiJam",
    header: "Durasi Jam",
    cell: ({ row }) => row.original.durasiJam,
  },
  {
    accessorKey: "TotalBayar",
    header: "Total Bayar",
    cell: ({ row }) =>
      row.original.totalBayar ??
      `Rp. ${(Number(row.original.Harga) * Number(row.original.durasiJam)).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "konfirmasi",
    header: "Status Konfirmasi",
    cell: ({ row }) => {
      const isConfirmed = row.original.konfirmasi;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isConfirmed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isConfirmed ? "Terkonfirmasi" : "Menunggu"}
        </span>
      );
    },
  },
  {
    accessorKey: "Nama",
    header: "Nama Pemesan",
    cell: ({ row }) => row.original.BiodataBooking?.[0]?.Nama ?? "-",
  },
  {
    accessorKey: "NoTelp",
    header: "No. Telepon",
    cell: ({ row }) => row.original.BiodataBooking?.[0]?.NoTelp ?? "-",
  },
  {
    accessorKey: "Alamat",
    header: "Alamat",
    cell: ({ row }) => row.original.BiodataBooking?.[0]?.Alamat ?? "-",
  },
  {
    accessorKey: "Email",
    header: "Email",
    cell: ({ row }) => row.original.BiodataBooking?.[0]?.Email ?? "-",
  },
  {
    accessorKey: "Foto",
    header: "Foto",
    cell: ({ row }) => (
      <div className="relative w-full max-w-sm h-20">
        {row.original.BuktiPembayaran?.[0]?.Foto && (
          <Image
            src={row.original.BuktiPembayaran[0].Foto}
            alt="Foto"
            fill
            className="object-cover rounded"
          />
        )}
      </div>
    ),
  },
];
