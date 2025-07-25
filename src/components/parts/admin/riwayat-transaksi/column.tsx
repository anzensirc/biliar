import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import ModalDelete from "@/components/shared/modalDelete";
import Image from "next/image";
import { BookingItem } from "./interface"; // ganti sesuai path importmu

export const transaksiColumns = (
  currentPage: number,
  perPage: number
): ColumnDef<BookingItem>[] => [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => {
      const number = (currentPage - 1) * perPage + row.index + 1;
      return <div>{number}</div>;
    },
  },
  {
    accessorKey: "KodeBooking",
    header: "Kode Booking",
    cell: ({ row }) => row.original.KodeBooking,
  },
  {
    accessorKey: "meja.NamaMeja",
    header: "Nama Meja",
    cell: ({ row }) => row.original.meja?.NamaMeja || "-",
  },
  {
    accessorKey: "Tanggal",
    header: "Tanggal Booking",
    cell: ({ row }) => new Date(row.original.Tanggal).toLocaleDateString("id-ID"),
  },
  {
    id: "JamBooking",
    header: "Jam Booking",
    cell: ({ row }) => {
      const jadwal = row.original.meja?.JamBooking?.[0]?.JadwalMeja;
      return jadwal
        ? `${jadwal.StartTime} - ${jadwal.EndTime}`
        : "-";
    },
  },
  {
    accessorKey: "durasiJam",
    header: "Durasi",
    cell: ({ row }) => `${row.original.durasiJam} jam`,
  },
  {
    accessorKey: "TotalBayar",
    header: "Total Bayar",
    cell: ({ row }) =>
      `Rp${Number(row.original.TotalBayar).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "konfirmasi",
    header: "Konfirmasi",
    cell: ({ row }) =>
      row.original.konfirmasi ? (
        <span className="text-green-600 font-semibold">Terkonfirmasi</span>
      ) : (
        <span className="text-red-600 font-semibold">Belum</span>
      ),
  },
  {
    id: "bukti",
    header: "Bukti Pembayaran",
    cell: ({ row }) => {
      const bukti = row.original.BuktiPembayaran?.[0]?.Foto;
      return bukti ? (
        <Image
          src={bukti}
          alt="Bukti"
          width={60}
          height={60}
          className="rounded object-cover"
        />
      ) : (
        <span className="text-gray-400 italic">Belum Upload</span>
      );
    },
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-[30px]">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`/kelola-booking/detail/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Lihat Detail</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`master/booking/delete/${row.original.id}`}
            queryKey="useGetBooking"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
